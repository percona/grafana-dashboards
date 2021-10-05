#!/usr/bin/env python

# Script sets correct names for plugins folders.

import json
import os
import shutil
import sys

GRAFANA_PLUGINS_DR = '/srv/grafana/plugins/'


def rename_panels():
    for app in ['panels']:
        print '  * Renaming %r' % (app,)
        if os.path.exists(GRAFANA_PLUGINS_DR):
            panels_list = os.listdir(GRAFANA_PLUGINS_DR)
            for panel in panels_list:
                panel_path = os.path.join(GRAFANA_PLUGINS_DR, panel, 'dist/plugin.json')
                if os.path.exists(panel_path):
                    print '   * %r -> ' % (panel,),
                    with open(panel_path, 'r') as f:
                        panel_params = json.loads(f.read())
                        print '%r' % (panel_params['id'],)
                        if (not(os.path.exists(os.path.join(GRAFANA_PLUGINS_DR, panel_params['id'])))):
                            print '    * Renaming panel'
                            shutil.copytree(os.path.join(GRAFANA_PLUGINS_DR, panel), os.path.join(GRAFANA_PLUGINS_DR, panel_params['id']))
                        if (panel != panel_params['id']):
                            print '    * Cleaning up leftovers'
                            shutil.rmtree(os.path.join(GRAFANA_PLUGINS_DR, panel))

print "Grafana database directory: %s" % (GRAFANA_PLUGINS_DR,)
rename_panels()
