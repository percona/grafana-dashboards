#!/usr/bin/env python

"""This script is a place where we can put the cleanup steps for
Grafana dashboards accordingly to our style guide, grafana limitations,
etc."""

import sys
import json
import copy
import datetime
import re

__version__ = '1.0.0'
refresh_intervals = ['1s','5s','1m','5m','1h','6h','1d']
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
            compare_pattern = re.compile(r'^.*_Compare$')
            compare_tags  = [s for s in dashboard['tags'] if compare_pattern.match(s)]
            ha_pattern = re.compile(r'^.*_HA$')
            ha_tags  = [s for s in dashboard['tags'] if ha_pattern.match(s)]
            service_tag = "None";
            if len(compare_tags) > 0:
                match_compare = re.match("(MySQL|PostgreSQL|MongoDB|OS)", compare_tags[0]);
                if match_compare:
                    print "Compare dashboard is detected for the service %s" % match_compare.group(0);
                    service_tag = match_compare.group(0);
            if len(ha_tags) > 0:
                match_ha = re.match("(MySQL|PostgreSQL|MongoDB)", ha_tags[0]);
                if match_ha:
                    print "HA dashboard is detected for the service %s" % match_ha.group(0);
                    service_tag = match_ha.group(0);
            setOfLinks = ['Home', 'Query Analytics', 'Compare', 'OS', 'MySQL', 'MongoDB', 'PostgreSQL', 'MySQL_HA', 'MongoDB_HA', 'Services', 'PMM']

            for link in copy.deepcopy(dashboard['links']):
                dashboard['links'].remove(link)

            for tag in setOfLinks:
                if tag == 'Query Analytics':
                    add_item = {
                        'icon': 'dashboard',
                        'includeVars': True,
                        'keepTime': True,
                        'tags': [ tag ],
                        'targetBlank': False,
                        'title': 'Query Analytics',
                        'type': 'link',
                        'url': '/graph/d/pmm-qan/pmm-query-analytics'
                    }
                    dashboard['links'].append(add_item)
                elif tag == 'Home' and (tag not in dashboard['tags']):
                    add_item = {
                        'icon': 'doc',
                        'includeVars': True,
                        'keepTime': True,
                        'tags': [ tag ],
                        'targetBlank': False,
                        'title': 'Home',
                        'type': 'link',
                        'url': '/graph/d/pmm-home/home-dashboard'
                    }
                    dashboard['links'].append(add_item)
                elif tag == 'Compare' and (tag not in dashboard['tags']):
                    if 'OS' in dashboard['tags']:
                        add_item = {
                            'icon': 'bolt',
                            'includeVars': True,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': 'Compare',
                            'type': 'link',
                            'url': '/graph/d/node-instance-compare/nodes-compare'
                        }
                        print "OS Compare link has been added."
                        dashboard['links'].append(add_item)
                    elif 'PXC' in dashboard['tags']:
                        add_item = {
                            'icon': 'bolt',
                            'includeVars': True,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': 'Compare',
                            'type': 'link',
                            'url': '/graph/d/pxc-nodes-compare/pxc-galera-nodes-compare'
                        }
                        print "PXC Compare link has been added."
                        dashboard['links'].append(add_item)
                    elif 'MySQL' in dashboard['tags'] or 'MySQL_HA' in dashboard['tags']:
                        add_item = {
                            'icon': 'bolt',
                            'includeVars': True,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': 'Compare',
                            'type': 'link',
                            'url': '/graph/d/mysql-instance-compare/mysql-instances-compare'
                        }
                        print "MySQL Compare link has been added."
                        dashboard['links'].append(add_item)
                    elif 'MongoDB' in dashboard['tags'] or 'MongoDB_HA' in dashboard['tags']:
                        add_item = {
                            'icon': 'bolt',
                            'includeVars': True,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': 'Compare',
                            'type': 'link',
                            'url': '/graph/d/mongodb-instance-compare/mongodb-instances-compare'
                        }
                        print "MongoDB Compare link has been added."
                        dashboard['links'].append(add_item)
                    elif 'PostgreSQL' in dashboard['tags']:
                        add_item = {
                            'icon': 'bolt',
                            'includeVars': True,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': 'Compare',
                            'type': 'link',
                            'url': '/graph/d/postgresql-instance-compare/postgresql-instances-compare'
                        }
                        print "PostgreSQL Compare link has been added."
                        dashboard['links'].append(add_item)
                else:
                    if (tag in dashboard['tags'] or tag in ['Services','PMM',service_tag]) and tag not in ['Compare','Home','MySQL_HA','MongoDB_HA']:
                        add_item = {
                            'asDropdown': True,
                            'includeVars': True if ((tag not in ['Services'] and tag not in ['PMM']) or 'Query Analytics' in dashboard['tags'])  else False,
                            'keepTime': True,
                            'tags': [ tag ],
                            'targetBlank': False,
                            'title': tag,
                            'type': 'dashboards'
                        }
                        dashboard['links'].append(add_item)
                    else:
                        if (tag == 'MySQL_HA' and ('MySQL' in dashboard['tags'] or service_tag == 'MySQL')) or (tag == 'MongoDB_HA' and ('MongoDB' in dashboard['tags'] or service_tag == 'MongoDB')):
                            add_item = {
                                'asDropdown': True,
                                'includeVars': True,
                                'keepTime': True,
                                'tags': [ tag ],
                                'targetBlank': False,
                                'title': 'HA',
                                'type': 'dashboards'
                            }
                            dashboard['links'].append(add_item)
    return dashboard


def set_editable(dashboard):
    """Set Editable Dashboard."""
    if 'editable' not in dashboard.keys():
        return dashboard
    prompt = 'Editable (conventional: **False**) [%s]: ' % (
        dashboard['editable'],
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'True':
            dashboard['editable'] = True
        else:
            dashboard['editable'] = False
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


def set_dashboard_id_to_null(dashboard):
    """To remove any dashboard id. New one is set by grafana."""
    for element in enumerate(dashboard.copy()):
        if 'id' in element:
            dashboard['id'] = None

    return dashboard


def drop_some_internal_elements(dashboard):
    for element in enumerate(dashboard.copy()):
        if '__inputs' in element:
            del dashboard['__inputs']
        if '__requires' in element:
            del dashboard['__requires']
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'scopedVars' in panel:
                    del dashboard['panels'][panel_index]['scopedVars']
                if 'panels' in panel:
                    for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                        if 'scopedVars' in panelIn:
                            del dashboard['panels'][panel_index]['panels'][panelIn_index]['scopedVars']

    prompt = 'Drop all current variables values (conventional: **True**) [True]: '
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'False':
            for index, listelement in enumerate(dashboard['templating']['list']):
                if 'current' in listelement:
                    for current_index, currentelement in enumerate(dashboard['templating']['list'][index]['current']):
                        if 'value' in currentelement:
                            print('Current value: %s' % (
                                dashboard['templating']['list'][index]['current']['text']))
                            prompt = ('Drop elements for variable %s [True]: ' % (
                                dashboard['templating']['list'][index]['name']
                            ))
                            user_input = raw_input(prompt)
                            if user_input:
                                if user_input == 'True':
                                    dashboard['templating']['list'][index]['current'] = {}
                            else:
                                dashboard['templating']['list'][index]['current'] = {}
    else:
        for index, listelement in enumerate(dashboard['templating']['list']):
            if 'current' in listelement:
                dashboard['templating']['list'][index]['current'] = {}

    return dashboard


def fix_datasource(dashboard):
    for element in enumerate(dashboard.copy()):
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'datasource' in panel:
                    if panel['datasource'] == '${DS_PROMETHEUS}':
                        dashboard['panels'][panel_index]['datasource'] = 'Prometheus'
                    if panel['datasource'] == '${DS_QAN-API}':
                        dashboard['panels'][panel_index]['datasource'] = 'QAN-API'
                if 'panels' in panel:
                        if (len(dashboard['panels'][panel_index]['panels']) > 0):
                            for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                                if 'datasource' in panelIn:
                                    if dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] == '${DS_PROMETHEUS}':
                                        dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] = 'Prometheus'
                                    if dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] == '${DS_QAN-API}':
                                        dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] = 'QAN-API'
                if 'mappingTypes' in panel:
                        for mappingTypes_index, mappingTypes in enumerate(dashboard['panels'][panel_index]['mappingTypes']):
                            if 'datasource' in mappingTypes:
                                if dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] == '${DS_PROMETHEUS}':
                                    dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] = 'Prometheus'
                                if dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] == '${DS_QAN-API}':
                                    dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] = 'QAN-API'

        if 'templating' in element:
            for panel_index, panel in enumerate(dashboard['templating']['list']):
                    if 'datasource' in panel.keys():
                        if panel['datasource'] == '${DS_PROMETHEUS}':
                            dashboard['templating']['list'][panel_index]['datasource'] = 'Prometheus'
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
    TAG = "pmm_annotation"
    prompt = 'Add default PMM annotation (conventional: **Yes**) [%s]: ' % (
        "No",
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'Yes':
            active_variables = [TAG]
            for templating in dashboard['templating']['list']:
                if templating['type'] == 'query' and templating['hide'] == 0:
                    active_variables.append('$' + templating['name'])

            for annotation in copy.deepcopy(dashboard['annotations']['list']):
                dashboard['annotations']['list'].remove(annotation)
            add_item = {
                'builtIn': 1,
                'datasource': "-- Grafana --",
                'enable': True,
                'hide': False,
                'iconColor': "#e0752d",
                'limit': 100,
                'matchAny': True,
                'name': "PMM Annotations",
                'showIn': 0,
                'tags': active_variables,
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
                    'y': 200
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
                  'y': 201
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
    CLEANUPERS = [set_title, set_editable, set_hide_timepicker, drop_some_internal_elements, set_time, set_timezone, set_default_refresh_intervals, set_refresh,
                  fix_datasource, add_annotation, add_links, add_copyrights_links, set_shared_crosshear, set_unique_ids, set_dashboard_id_to_null]

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
