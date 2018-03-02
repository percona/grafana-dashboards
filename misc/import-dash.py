#!/usr/bin/env python

"""Grafana dashboard importer script."""

import json
import os
import requests

HOST = os.getenv('IMPORT_DASH_HOST', 'https://pmmdemo.percona.com/graph')
API_KEY = os.getenv('IMPORT_DASH_API_KEY', '***')
USERNAME = os.getenv('IMPORT_DASH_USERNAME')
PASSWORD = os.getenv('IMPORT_DASH_PASSWORD')

DIR = 'pmm-app/src/dashboards/'


def main():
    headers = {'Content-Type': 'application/json'}
    auth = None
    if USERNAME is None:
        headers['Authorization'] = 'Bearer %s' % (API_KEY,)
    else:
        auth = (USERNAME, PASSWORD)

    for file in os.listdir(DIR):
        if not file.endswith('.json'):
            continue

        print file
        f = open(DIR + file, 'r')
        dash = json.load(f)
        f.close()

        # check for the most common merge error: duplicate row ids
        ids = set()
        for row in dash['rows']:
            for panel in row['panels']:
                id = panel['id']
                if id in ids:
                    print "Duplicate row id %d in %s" % (id, file)
                    exit(1)
                ids.add(id)

        data = {'dashboard': dash, 'overwrite': True}
        r = requests.post('%s/api/dashboards/db' % (HOST,), json=data, headers=headers, auth=auth)
        if r.status_code != 200:
            print r.status_code, r.content
            exit(1)


if __name__ == '__main__':
    main()
