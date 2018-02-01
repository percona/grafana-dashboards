#!/usr/bin/env python

"""Grafana dashboard exporter and cleaner script."""

import json
import requests

HOST = 'https://pmmdemo.percona.com/graph'
API_KEY = '***'

DIR = 'pmm-app/src/dashboards/'
TEMPLATE_VARS = ['host', 'device', 'mountpoint', 'proxysql', 'hostgroup', 'cluster', 'instance', 'replset']

def main():
    headers = {'Authorization': 'Bearer %s' % (API_KEY,)}
    r = requests.get('%s/api/search?query=&' % (HOST,), headers=headers)
    dashboards = r.json()

    for d in dashboards:
        if d['title'].startswith('_'):
            continue

        print d['title']
        r = requests.get('%s/api/dashboards/%s' % (HOST, d['uri']), headers=headers)
        data = r.json()['dashboard']

        dash = dash_cleanup(data)
        name = data['title'].replace(' ', '_').replace('/', '_').replace(':', '').replace('[', '').replace(']', '')
        tmp = open(DIR + name + '.json', 'w')
        tmp.write(dash)
        tmp.write('\n')
        tmp.close()


def dash_cleanup(a):
    a['id'] = None
    a['version'] = 0
    #a['title'] = a['title'] + ' | Percona App'

    # clean up of template vars
    i = 0
    for e in a['templating']['list']:
        a['templating']['list'][i]['datasource'] = 'Prometheus'
        if 'Amazon RDS' in a['title']:
            a['templating']['list'][i]['datasource'] = 'CloudWatch'

        if e['name'] in TEMPLATE_VARS:
            if 'options' in a['templating']['list'][i]:
                del a['templating']['list'][i]['options']

            if 'current' in a['templating']['list'][i]:
                del a['templating']['list'][i]['current']

        i += 1

    # clean up of graphs
    j = 0
    for r in a['rows']:
        if 'panels' not in r:
            continue

        for i in range(len(r['panels'])):
            a['rows'][j]['panels'][i]['datasource'] = 'Prometheus'
            if 'Amazon RDS' in a['title']:
                a['rows'][j]['panels'][i]['datasource'] = 'CloudWatch'

        j += 1

    return json.dumps(a, sort_keys=True, indent=4, separators=(',', ': '))


if __name__ == '__main__':
    main()
