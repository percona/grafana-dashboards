#!/usr/bin/env python

"""This script is a place where we can put the cleanup steps for
Grafana dashboards accordingly to our style guide, grafana limitations,
etc."""

import sys
import json

__version__ = '1.0.0'


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


def set_refresh(dashboard):
    """Set Dashboard refresh."""
    if 'refresh' not in dashboard.keys():
        return dashboard

    prompt = 'Refresh (conventional: **False**) [%s]: ' % (
        dashboard['refresh'],
    )
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'False':
            dashboard['refresh'] = False
        else:
            dashboard['refresh'] = user_input
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
    CLEANUPERS = [set_title, set_time, set_timezone, set_refresh,
                  set_hide_controls, set_unique_ids]

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
