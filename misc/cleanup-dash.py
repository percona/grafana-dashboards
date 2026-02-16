#!/usr/bin/env python3

import sys
import json
import copy
import datetime
import re

def set_dashboard_id_to_null(dashboard):
    """To remove any dashboard id. New one is set by grafana."""
    for element in enumerate(dashboard.copy()):
        if 'id' in element:
            dashboard['id'] = None

    return dashboard

def set_editable(dashboard):
    """Set Editable Dashboard."""
    if 'editable' not in dashboard.keys():
        return dashboard

    dashboard['editable'] = False
    return dashboard

def set_refresh(dashboard):
    """Set Dashboard refresh."""
    if 'refresh' not in dashboard.keys():
        return dashboard

    dashboard['refresh'] = ""
    return dashboard

def set_timezone(dashboard):
    """Set Dashboard Time zone."""
    
    dashboard['timezone'] = "browser"
    return dashboard

def set_time(dashboard):
    """Set Dashboard Time Range."""

    dashboard['time']['from'] = "now-12h"
    dashboard['time']['to'] = "now"
    return dashboard

def main():
    """Execute cleanups."""
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())

    # registered cleanupers.
    CLEANUPERS = [set_editable, set_time, set_timezone, set_refresh, set_dashboard_id_to_null]

    for func in CLEANUPERS:
        dashboard = func(dashboard)

    dashboard_json = json.dumps(dashboard, sort_keys=True, indent=2,
                                separators=(',', ': '))

    with open(sys.argv[1], 'w') as dashboard_file:
        dashboard_file.write(dashboard_json)
        dashboard_file.write('\n')

    print('Done!')


if __name__ == '__main__':
    main()
