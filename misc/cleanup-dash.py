#!/usr/bin/env python

"""This script is a place where we can put the cleanup steps for
Grafana dashboards accordingly to our style guide, grafana limitations,
etc."""

import sys
import json
import copy

__version__ = '1.0.0'
refresh_intervals = ['5s','10s','30s','1m','5m','15m','30m','1h','2h','1d']

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
            setOfLinks = ['QAN', 'OS', 'MySQL', 'MongoDB', 'HA', 'Cloud', 'Insight', 'PMM']
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
    for row_index, row in enumerate(dashboard['rows']):
        for panel_index, panel in enumerate(row['panels']):
            id_ = panel['id']
            if id_ in ids:
                id_ = 1
                while id_ in ids:
                    id_ += 1

                print('ID #%s was not unique - changed to #%s' % (
                    panel['id'], id_
                ))
                dashboard['rows'][row_index]['panels'][panel_index]['id'] = id_

            ids.add(id_)

    return dashboard


def main():
    """Execute cleanups."""
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())

    # registered cleanupers.
    CLEANUPERS = [set_title, set_time, set_timezone, set_default_refresh_intervals, set_refresh,
                  add_links, set_hide_controls, set_unique_ids]

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
