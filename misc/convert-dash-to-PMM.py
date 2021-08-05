#!/usr/bin/env python

import sys
import json

# Prometheus has been replaced by VictoriaMetrics since PMM 2.13.0
datasources = {
    '${DS_METRICS}': 'Metrics',
    '${DS_PTSUMMARY}': 'PTSummary',
    '${DS_CLICKHOUSE}': 'ClickHouse',
    '${DS_PROMETHEUS_ALERTMANAGER$': 'Prometheus AlertManager',
    '${DS_PROMETHEUS}': 'Metrics',
    'Prometheus': 'Metrics'
}


def drop_some_internal_elements(dashboard):
    for element in dashboard.copy():
        if '__inputs' in element:
            for inputs_index, inputs in enumerate(dashboard['__inputs']):
                if datasources.get(dashboard['__inputs'][inputs_index]['name']) is None:  # treat unknown datasources as Metrics
                    datasources[dashboard['__inputs'][inputs_index]['name']] = 'Metrics'
            del dashboard['__inputs']
        if '__requires' in element:
            del dashboard['__requires']
    return dashboard


def fix_datasource(dashboard):
    for element in dashboard.copy():
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'datasource' in panel:
                    dataSourceName = datasources.get(dashboard['panels'][panel_index]['datasource'])
                    if dataSourceName is not None:
                        dashboard['panels'][panel_index]['datasource'] = dataSourceName

                if 'panels' in panel:
                        if len(dashboard['panels'][panel_index]['panels']) > 0:
                            for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                                if 'datasource' in panelIn:
                                    dataSourceName = datasources.get(dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'])
                                    if dataSourceName is not None:
                                        dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] = dataSourceName

                if 'mappingTypes' in panel:
                        for mappingTypes_index, mappingTypes in enumerate(dashboard['panels'][panel_index]['mappingTypes']):
                            if 'datasource' in mappingTypes:
                                 dataSourceName = datasources.get(dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'])
                                 if  dataSourceName is not None:
                                     dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] = dataSourceName

        if 'templating' in element:
            for panel_index, panel in enumerate(dashboard['templating']['list']):
                    if 'datasource' in panel.keys():
                        dataSourceName = datasources.get(dashboard['templating']['list'][panel_index]['datasource'])
                        if dataSourceName is not None:
                            dashboard['templating']['list'][panel_index]['datasource'] = dataSourceName

    return dashboard


def check_formulas(dashboard, currentVariableName, newVariableName):
    for element in dashboard.copy():
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'targets' in panel:
                    for target_index, target in enumerate(dashboard['panels'][panel_index]['targets']):
                        if 'expr' in target:
                            expr = dashboard['panels'][panel_index]['targets'][target_index]['expr']
                            if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                                print ' >>>> %s' % expr
                                prompt = ' Replace variable %s to %s (Y/N)? [N]: ' % (currentVariableName, newVariableName)
                                user_input = raw_input(prompt).upper()
                                if user_input == 'Y':
                                    dashboard['panels'][panel_index]['targets'][target_index]['expr'] = expr.replace(currentVariableName, newVariableName)
                                    print ' >>>> Done! %s\n' % dashboard['panels'][panel_index]['targets'][target_index]['expr']

                if 'panels' in panel:
                        if len(dashboard['panels'][panel_index]['panels']) > 0:
                            for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                                if 'targets' in panelIn:
                                    for target_index, target in enumerate(dashboard['panels'][panel_index]['panels'][panelIn_index]['targets']):
                                        if 'expr' in target:
                                            expr = dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr']
                                            if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                                                print ' >>>> %s' % expr
                                                prompt = ' Replace variable %s to %s (Y/N)? [N]: ' % (currentVariableName, newVariableName)
                                                user_input = raw_input(prompt).upper()
                                                if user_input == 'Y':
                                                    dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr'] = expr.replace(currentVariableName, newVariableName)
                                                    print ' >>>> Done! %s\n' % dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr']

        if 'templating' in element:
            for list_index, lists in enumerate(dashboard['templating']['list']):
                    if 'query' in lists.keys():
                        expr = dashboard['templating']['list'][list_index]['query']
                        if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                            print ' >>>> %s' % expr 
                            prompt = ' Replace variable %s to %s (Y/N)? [N]: ' % (currentVariableName, newVariableName)
                            user_input = raw_input(prompt).upper()
                            if user_input == 'Y':
                                dashboard['templating']['list'][list_index]['query'] = expr.replace(currentVariableName, newVariableName)
                                print ' >>>> Done! %s\n' % dashboard['templating']['list'][list_index]['query']

    return dashboard


def fix_parameters(dashboard):
    while True:
        prompt = '\nDoes it required to rename parameters in formulas (Y/N)? [N]: '
        user_input = raw_input(prompt).upper()
        if user_input != 'Y':
            break
        prompt = 'Please enter parameter name for renaming: '
        currentParameterName = raw_input(prompt)
        prompt = 'Please enter new name for parameter %s: ' % (currentParameterName)
        newParameterName = raw_input(prompt)
        print '\nCollecting formulas ...'
        check_formulas(dashboard, currentParameterName, newParameterName)

    return dashboard


def fix_variables(dashboard):
    for element in dashboard.copy():
        if 'templating' in element:
            for panel_index, panel in enumerate(dashboard['templating']['list']):
                if 'query' in panel.keys():
                    currentVariableName = (dashboard['templating']['list'][panel_index]['name'])
                    print ('\nVariable: %s' % (dashboard['templating']['list'][panel_index]['name']))
                    print ('Next expression is used for collecting variable: %s' % (dashboard['templating']['list'][panel_index]['query']))
                    prompt = 'Modify (Y/N)? [N]: '
                    user_input = raw_input(prompt).upper()
                    if user_input == 'Y':
                        prompt = 'Please enter new name for variable %s: ' % (currentVariableName)
                        newVariableName = raw_input(prompt)
                        print 'Collecting formulas ...'
                        check_formulas(dashboard, currentVariableName, newVariableName)
                        dashboard['templating']['list'][panel_index]['name'] = newVariableName

    return dashboard 


def main():
    """Execute cleanups."""
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())

    # registered cleanupers.
    CLEANUPERS = [drop_some_internal_elements, fix_datasource, fix_variables, fix_parameters]

    for func in CLEANUPERS:
        dashboard = func(dashboard)

    dashboard_json = json.dumps(dashboard, sort_keys=True, indent=4,
                                separators=(',', ': '))

    with open(sys.argv[1], 'w') as dashboard_file:
        dashboard_file.write(dashboard_json)
        dashboard_file.write('\n')

if __name__ == '__main__':
    main()
