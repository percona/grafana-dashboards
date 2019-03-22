#!/usr/bin/env python

"""This script is a place where we can put the cleanup steps for
Grafana dashboards accordingly to our style guide, grafana limitations,
etc."""

import sys
import json
import copy
import datetime

__version__ = '1.0.0'
refresh_intervals = ['5s','10s','30s','1m','5m','15m','30m','1h','2h','1d']
year = str(datetime.date.today())[:4]

def set_title(dashboard):
    """Set Dashboard Title."""
    prompt = 'Title [%s]: ' % (dashboard['title'],)
    dashboard['title'] = raw_input(prompt) or dashboard['title']
    return dashboard


def set_time(dashboard):
    """Set Dashboard Time Range."""
    prompt = 'Time from (conventional: **now-12h**) [%s]: ' % (
        dashboard['time']['from'],
    )
    dashboard['time']['from'] = raw_input(prompt) or dashboard['time']['from']

    prompt = 'Time to [%s]: ' % (dashboard['time']['to'],)
    dashboard['time']['to'] = raw_input(prompt) or dashboard['time']['to']
    return dashboard


def set_timezone(dashboard):
    """Set Dashboard Time zone."""
    prompt = 'Timezone (conventional: **browser**) [%s]: ' % (
        dashboard['timezone'],
    )
    dashboard['timezone'] = raw_input(prompt) or dashboard['timezone']
    return dashboard


def set_shared_crosshear(dashboard):
    """Enabled Shared Crosshear."""
    if 'graphTooltip' not in dashboard.keys():
        return dashboard
    dashboard['graphTooltip'] = 1
    return dashboard


def set_default_refresh_intervals(dashboard):
    """Set Dashboard refresh intervals."""
    if 'timepicker' not in dashboard.keys():
        return dashboard
    dashboard['timepicker']['refresh_intervals'] = refresh_intervals 
    return dashboard


def set_refresh(dashboard):
    """Set Dashboard refresh."""
    if 'refresh' not in dashboard.keys():
        return dashboard
    while 1:
        print ('Enabled refresh intervals: %s' % (refresh_intervals))
        prompt = 'Refresh (conventional: **1m**) [%s]: ' % (
            dashboard['refresh'],
        )
        user_input = raw_input(prompt)
        if user_input:
            if user_input == 'False':
                dashboard['refresh'] = False
                return dashboard
            else:
                if user_input in refresh_intervals:
                    dashboard['refresh'] = user_input
                    return dashboard
                else:
                    print "Provided interval isn't enabled"
        else:
            return dashboard


def add_links(dashboard):
    """Add default set of consistent linking to dashboard."""
    prompt = 'Set default consistent linking to the dashboard (conventional: **Yes**) [%s]: ' % (
        "No",
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'Yes':
            setOfLinks = ['QAN', 'OS', 'MySQL', 'MongoDB', 'PostgreSQL', 'HA', 'Cloud', 'Insight', 'PMM']
            for link in copy.deepcopy(dashboard['links']):
                dashboard['links'].remove(link)

            for tag in setOfLinks:
                if tag == 'QAN':
                    add_item = {
                        'icon': 'dashboard',
                        'includeVars': True if tag in dashboard['tags'] else False,
                        'keepTime': True,
                        'tags': [ tag ],
                        'targetBlank': False,
                        'title': 'Query Analytics',
                        'type': 'link',
                        'url': '/graph/dashboard/db/_pmm-query-analytics'
                    }
                else:
                    add_item = {
                        'asDropdown': True,
                        'includeVars': True if tag in dashboard['tags'] else False,
                        'keepTime': True,
                        'tags': [ tag ],
                        'targetBlank': False,
                        'title': tag,
                        'type': 'dashboards'
                    }
                dashboard['links'].append(add_item)
    return dashboard


def set_hide_controls(dashboard):
    """Set Dashboard Hide Controls."""
    if 'hideControls' not in dashboard.keys():
        return dashboard
    prompt = 'Hide Controls (conventional: **True**) [%s]: ' % (
        dashboard['hideControls'],
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'True':
            dashboard['hideControls'] = True
        else:
            dashboard['hideControls'] = False
    return dashboard


def set_unique_ids(dashboard):
    """To avoid the most common merge error: duplicate row ids."""
    ids = set()
    for panel_index, panel in enumerate(dashboard['panels']):
        id_ = panel['id']
        if id_ in ids:
            id_ = 1
            while id_ in ids:
                id_ += 1

            print('ID #%s was not unique - changed to #%s' % (
                panel['id'], id_
            ))
            dashboard['panels'][panel_index]['id'] = id_

        ids.add(id_)

    return dashboard


def drop_some_internal_elements(dashboard):
    for element in enumerate(dashboard.copy()):
        if '__inputs' in element:
            del dashboard['__inputs']
        if '__requires' in element:
            del dashboard['__requires']
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'datasource' in panel:
                    if panel['datasource'] == '${DS_PROMETHEUS}':
                        dashboard['panels'][panel_index]['datasource'] = 'Prometheus'
                    if panel['datasource'] == '${DS_CLOUDWATCH}':
                        dashboard['panels'][panel_index]['datasource'] = 'CloudWatch'
                    if panel['datasource'] == '${DS_QAN-API}':
                        dashboard['panels'][panel_index]['datasource'] = 'QAN-API'
        if 'templating' in element:
            for panel_index, panel in enumerate(dashboard['templating']['list']):
                    if 'datasource' in panel.keys():
                        if panel['datasource'] == '${DS_PROMETHEUS}':
                            dashboard['templating']['list'][panel_index]['datasource'] = 'Prometheus'
                        if panel['datasource'] == '${DS_CLOUDWATCH}':
                            dashboard['templating']['list'][panel_index]['datasource'] = 'CloudWatch'
                        if panel['datasource'] == '${DS_QAN-API}':
                            dashboard['templating']['list'][panel_index]['datasource'] = 'QAN-API'

    return dashboard


def set_hide_timepicker(dashboard):
    """Set Timepicker Hiden."""
    if 'timepicker' not in dashboard.keys():
        return dashboard

    if 'hidden' not in dashboard['timepicker'].keys():
        add_item = {}
        add_item['hidden'] = False
        for row in enumerate(dashboard['timepicker']):
            add_item[row] = dashboard['timepicker'][row]
        dashboard['timepicker'] = add_item
    prompt = 'Hide Timepicker (conventional: **True**) [%s]: ' % (
        dashboard['timepicker']['hidden']
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'True':
            dashboard['timepicker']['hidden'] = True
        else:
            dashboard['timepicker']['hidden'] = False
    return dashboard


def add_annotation(dashboard):
    """Add PMM annotation."""
    tag = "pmm_annotation"
    prompt = 'Add default PMM annotation (conventional: **Yes**) [%s]: ' % (
        "No",
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'Yes':
            for annotation in copy.deepcopy(dashboard['annotations']['list']):
                dashboard['annotations']['list'].remove(annotation)
            add_item = {
                'builtIn': 1,
                'datasource': "-- Grafana --",
                'enable': True,
                'hide': False,
                'iconColor': "#e0752d",
                'limit': 100,
                'name': "PMM Annotations",
                'showIn': 0,
                'tags': [ tag ],
                'type': "tags"
            }
            dashboard['annotations']['list'].append(add_item)
            add_item = {
                "builtIn": 1,
                "datasource": "-- Grafana --",
                "enable": True,
                "hide": True,
                "iconColor": "#6ed0e0",
                "limit": 100,
                "name": "Annotations & Alerts",
                "showIn": 0,
                "tags": [],
                "type": "dashboard"
            }
            dashboard['annotations']['list'].append(add_item) 
    return dashboard


def add_copyrights_links(dashboard):
    """Add Copyrights Links footer."""

    prompt = 'Add Copyrights Links - "Obligate for pmmdemo" (conventional: **No**) [%s]: ' % (
        "No",
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'Yes':
            add_item = {
                'collapsed': False,
                'gridPos': {
                    'h': 1,
                    'w': 24,
                    'x': 0,
                    'y': 99
                },
                'id': 9998,
                'panels': [],
                'title': 'Copyrights & Legal',
                'type': 'row'
            }
            dashboard['panels'].append(add_item)
            add_item = {
                'content': "<center>\n  <p>MySQL and InnoDB are trademarks of Oracle Corp. Proudly running Percona Server. Copyright (c) 2006-"+year+" Percona LLC.</p>\n  <div style='text-align:center;'>\n    <a href='https://percona.com/terms-use' style='display: inline;'>Terms of Use</a> | \n    <a href='https://percona.com/privacy-policy' style='display: inline;'>Privacy</a> | \n    <a href='https://percona.com/copyright-policy' style='display: inline;'>Copyright</a> | \n    <a href='https://percona.com/legal' style='display: inline;'>Legal</a>\n  </div>\n</center>\n<hr>\n<link rel='stylesheet' type='text/css' href='//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css' />\n<script src='//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js'></script>\n<script>\nfunction bbb(){\n  \n  setTimeout(function (){ \n  window.cookieconsent.initialise({\n    'palette': {\n      'popup': {\n        'background': '#eb6c44',\n        'text': '#ffffff'\n      },\n      'button': {\n        'background': '#f5d948'\n      }\n    },\n    'theme': 'classic',\n    'content': {\n      'message': 'This site uses cookies and other tracking technologies to assist with navigation, analyze your use of our products and services, assist with promotional and marketing efforts, allow you to give feedback, and provide content from third parties. If you do not want to accept cookies, adjust your browser settings to deny cookies or exit this site.',\n      'dismiss': 'Allow cookies',\n      'link': 'Cookie Policy',\n      'href': 'https://www.percona.com/cookie-policy'\n    }\n  })},3000)};\n  \n  \n  window.addEventListener('load',bbb());\n\n\n\n</script>",
                'gridPos': {
                  'h': 3,
                  'w': 24,
                  'x': 0,
                  'y': 99
                },
                'id': 9999,
                'links': [],
                'mode': 'html',
                'title': '',
                'transparent': True,
                'type': 'text'
            }
            dashboard['panels'].append(add_item)

    return dashboard


def main():
    """Execute cleanups."""
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())

    # registered cleanupers.
    CLEANUPERS = [set_title, set_hide_timepicker, drop_some_internal_elements, set_time, set_timezone, set_default_refresh_intervals, set_refresh,
                  add_annotation, add_links, add_copyrights_links, set_shared_crosshear, set_unique_ids]

    for func in CLEANUPERS:
        dashboard = func(dashboard)

    dashboard_json = json.dumps(dashboard, sort_keys=True, indent=4,
                                separators=(',', ': '))

    with open(sys.argv[1], 'w') as dashboard_file:
        dashboard_file.write(dashboard_json)
        dashboard_file.write('\n')

    print('Done!')


if __name__ == '__main__':
    main()
