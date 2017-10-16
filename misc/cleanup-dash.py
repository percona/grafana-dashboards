#!/usr/bin/env python

"""This scripn is place were we can put clean up steps for exported
Grafana dashboard accordingly to our style guide, grafana limitation,
etc."""

import sys
import json

# TODO: fix ids if not unique

def set_title(dashboard):
    """Set Dashboard Title."""
    prompt = 'Title [%s]: ' % (dashboard['title'],)
    dashboard['title'] = raw_input(prompt) or dashboard['title']
    return dashboard


def set_time(dashboard):
    """Set Dashboard Time Range."""
    prompt = 'Time from (conventional: **now-12h**) [%s]: ' % (dashboard['time']['from'],)
    dashboard['time']['from'] = raw_input(prompt) or dashboard['time']['from']

    prompt = 'Time to [%s]: ' % (dashboard['time']['to'],)
    dashboard['time']['to'] = raw_input(prompt) or dashboard['time']['to']
    return dashboard


def set_timezone(dashboard):
    """Set Dashboard Time zone."""
    prompt = 'Timezone (conventional: **browser**) [%s]: ' % (dashboard['timezone'],)
    dashboard['timezone'] = raw_input(prompt) or dashboard['timezone']
    return dashboard

def set_refresh(dashboard):
    """Set Dashboard refresh."""
    prompt = 'Refresh (conventional: **False**) [%s]: ' % (dashboard['refresh'],)
    user_input = raw_input(prompt)
    if user_input:
        if user_input == 'False':
            dashboard['refresh'] = False
        else:
            dashboard['refresh'] = user_input
    return dashboard

def main():
    """Execute cleanups."""
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())

    dashboard = set_title(dashboard)
    dashboard = set_time(dashboard)
    dashboard = set_timezone(dashboard)
    dashboard = set_refresh(dashboard)

    dashboard_json = json.dumps(dashboard, sort_keys=True, indent=4,
                                separators=(',', ': '))

    with open(sys.argv[1], 'w') as dashboard_file:
        dashboard_file.write(dashboard_json)
        dashboard_file.write('\n')

    print('Done!')


if __name__ == '__main__':
    main()
