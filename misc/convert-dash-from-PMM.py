##############################################################################################################
# This script converts a PMM dashboard so it can be used in an external Prometheus + Grafana installation. 
# It doesn't need any input from you. It replaces PMM2 labels (node_name, service_name) 
# used in variables with default labels (instance).
#
##############################################################################################################
#
#    !!! WARNING !!! 
#
# The script is for experiments and education. There is no guarantee that it will work on all cases as 
# the PMM uses specific labels to provide a better user experience to PMM users. 
#
##############################################################################################################



#!/usr/bin/env python2

import sys
import json
import re

# List of services that are present in PMM2
services = {'MySQL', 'MongoDB', 'PXC', 'PostgreSQL'}

# Add a variable for selecting a datasource
def add_datasource_variable(dashboard):
    datasourceVariable = {"current": {"selected": "false", "text": "prometheus", "value": "prometheus"}, "hide": 0, "includeAll": "false", "label": "Datasource", "multi": "false", "name": "datasource", "options": [], "query": "prometheus", "refresh": 1, "regex": "", "skipUrlSync": "false", "type": "datasource"}
    for element in dashboard.copy():
        if 'templating' in element:
            dashboard['templating']['list'].append(datasourceVariable)

    return dashboard


# Set the new datasource as a default one
def fix_datasource(dashboard):
    dataSourceName = "$datasource"
    for element in dashboard.copy():
        if 'panels' in element:
            for panel_index, panel in enumerate(dashboard['panels']):
                if 'datasource' in panel:
                    if dataSourceName is not None:
                        dashboard['panels'][panel_index]['datasource'] = dataSourceName

                if 'panels' in panel:
                        if len(dashboard['panels'][panel_index]['panels']) > 0:
                            for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                                if 'datasource' in panelIn:
                                    if dataSourceName is not None:
                                        dashboard['panels'][panel_index]['panels'][panelIn_index]['datasource'] = dataSourceName

                if 'mappingTypes' in panel:
                        for mappingTypes_index, mappingTypes in enumerate(dashboard['panels'][panel_index]['mappingTypes']):
                            if 'datasource' in mappingTypes:
                                 if  dataSourceName is not None:
                                     dashboard['panels'][panel_index]['mappingTypes'][mappingTypes_index]['datasource'] = dataSourceName

        if 'templating' in element:
            for panel_index, panel in enumerate(dashboard['templating']['list']):
                    if 'datasource' in panel.keys():
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
                            expr = re.sub('node_type=~\"[a-z,$_|]*\"', '', expr)
                            if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                                print ' <<<< %s' % expr
                                dashboard['panels'][panel_index]['targets'][target_index]['expr'] = expr.replace(currentVariableName, newVariableName)
                                print ' >>>> %s\n' % dashboard['panels'][panel_index]['targets'][target_index]['expr']

                if 'options' in panel:
                    for option in enumerate(dashboard['panels'][panel_index]['options']):
                        if 'content' in option :
                            content = dashboard['panels'][panel_index]['options']['content']
                            if content.find(currentVariableName) != -1:    # check if variable is used in a content 
                                print ' <<<< %s' % content 
                                dashboard['panels'][panel_index]['options']['content'] = content.replace(currentVariableName, newVariableName)
                                print ' >>>> %s\n' % dashboard['panels'][panel_index]['options']['content']

                if 'panels' in panel:
                        if len(dashboard['panels'][panel_index]['panels']) > 0:
                            for panelIn_index, panelIn in enumerate(dashboard['panels'][panel_index]['panels']):
                                if 'targets' in panelIn:
                                    for target_index, target in enumerate(dashboard['panels'][panel_index]['panels'][panelIn_index]['targets']):
                                        if 'expr' in target:
                                            expr = dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr']
                                            expr = re.sub('node_type=~\"[a-z,$_|]*\"', '', expr)
                                            if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                                                print ' <<<< %s' % expr
                                                dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr'] = expr.replace(currentVariableName, newVariableName)
                                                print ' >>>> %s\n' % dashboard['panels'][panel_index]['panels'][panelIn_index]['targets'][target_index]['expr']

        if 'templating' in element:
            for list_index, lists in enumerate(dashboard['templating']['list']):
                    if 'query' in lists.keys():
                        expr = dashboard['templating']['list'][list_index]['query']
                        if isinstance(expr, dict) and ('query' in expr):
                            expr = expr['query']
                        expr = re.sub('node_type=~\"[a-z,$_|]*\"', '', expr)
                        name = dashboard['templating']['list'][list_index]['name']
                        name = re.sub('node_type=~\"[a-z,$_|]*\"', '', name)
                        if expr.find(currentVariableName) != -1:    # check if variable is used in an expression
                            print (' <<<< %s' % (expr,)) 
                            dashboard['templating']['list'][list_index]['query'] = expr.replace(currentVariableName, newVariableName)
                            dashboard['templating']['list'][list_index]['definition'] = expr.replace(currentVariableName, newVariableName)
                            print (' >>>> %s\n' % (dashboard['templating']['list'][list_index]['query'],))
                        if name.find(currentVariableName) != -1:    # check if variable is used in an expression
                            print (' <<<< %s' % (name,)) 
                            dashboard['templating']['list'][list_index]['name'] = newVariableName
                            print (' >>>> %s\n' % (dashboard['templating']['list'][list_index]['name'],))
    return dashboard


def get_dashboard_type(filename):
    for service in services: 
        if filename.find(service) != -1:    # check if it's a dashboard with node metrics only
            print('%s service dashboard is detected' % (service,))
            return True
    return False


# Additional procedure for modifing auxiliary variables 
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
    with open(sys.argv[1], 'r') as dashboard_file:
        dashboard = json.loads(dashboard_file.read())
    print ('Dashboard: %s' % (sys.argv[1],))
    if get_dashboard_type(sys.argv[1]):    # replace service_name or node_name variables for different dashboard types
       check_formulas(dashboard, "service_name", "instance")
    else:
       check_formulas(dashboard, "node_name", "instance")
    # registered procedures.
    PROCEDURES = [add_datasource_variable, fix_datasource]

    for func in PROCEDURES:
        dashboard = func(dashboard)

    dashboard_json = json.dumps(dashboard, sort_keys=True, indent=4,
                                separators=(',', ': '))

    with open(sys.argv[1], 'w') as dashboard_file:
        dashboard_file.write(dashboard_json)
        dashboard_file.write('\n')

    print ('Done.')

if __name__ == '__main__':
    main()
