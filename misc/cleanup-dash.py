#!/usr/bin/env python3

"""This script is a place where we can put the cleanup steps for
Grafana dashboards accordingly to our style guide, grafana limitations,
etc."""

import sys
import json
import copy
import datetime
import re
import argparse
from pathlib import Path

__version__ = '1.1.0'  # Bump version for new features
refresh_intervals = ['5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '6h', '1d']

# Global flag for non-interactive mode
NON_INTERACTIVE = False

# Default settings for non-interactive mode
DEFAULT_SETTINGS = {
    'time_from': 'now-12h',
    'time_to': 'now',
    'timezone': '',
    'refresh': '1m',
    'add_links': True,
    'editable': False,
    'hide_timepicker': True,
    'add_annotation': True,
    'add_copyrights': False,
    'preserve_links': True, # New setting to preserve existing links
}

def safe_input(prompt, default_value=None):
    """Safe input function that returns default in non-interactive mode."""
    if NON_INTERACTIVE:
        return str(default_value) if default_value is not None else ""
    try:
        return input(prompt)
    except EOFError:
        return str(default_value) if default_value is not None else ""


def set_title(dashboard):
    """Set Dashboard Title."""
    current_title = dashboard.get('title', 'N/A')
    prompt = f'Title [{current_title}]: '
    dashboard['title'] = safe_input(prompt, default_value=current_title) or current_title
    return dashboard


def set_time(dashboard):
    """Set Dashboard Time Range."""
    if 'time' not in dashboard:
        dashboard['time'] = {}
        
    if NON_INTERACTIVE:
        dashboard['time']['from'] = DEFAULT_SETTINGS['time_from']
        dashboard['time']['to'] = DEFAULT_SETTINGS['time_to']
    else:
        current_from = dashboard['time'].get('from', 'now-12h')
        prompt_from = f'Time from (conventional: **now-12h**) [{current_from}]: '
        dashboard['time']['from'] = safe_input(prompt_from) or current_from

        current_to = dashboard['time'].get('to', 'now')
        prompt_to = f'Time to [{current_to}]: '
        dashboard['time']['to'] = safe_input(prompt_to) or current_to
        
    return dashboard


def set_timezone(dashboard):
    """Set Dashboard Time zone."""
    if NON_INTERACTIVE:
        dashboard['timezone'] = DEFAULT_SETTINGS['timezone']
    else:
        current_timezone = dashboard.get('timezone', '')
        prompt = f'Timezone (conventional: **empty**) [{current_timezone}]: '
        dashboard['timezone'] = safe_input(prompt) or current_timezone
    return dashboard


def set_shared_crosshair(dashboard):
    """Enable Shared Crosshair."""
    dashboard['graphTooltip'] = 1  # 0: Default, 1: Shared crosshair, 2: Shared tooltip
    return dashboard


def set_default_refresh_intervals(dashboard):
    """Set Dashboard refresh intervals."""
    if 'timepicker' in dashboard:
        dashboard['timepicker']['refresh_intervals'] = refresh_intervals
    return dashboard


def set_refresh(dashboard):
    """Set Dashboard refresh."""
    if 'refresh' not in dashboard:
        dashboard['refresh'] = False

    if NON_INTERACTIVE:
        refresh_value = DEFAULT_SETTINGS['refresh']
        dashboard['refresh'] = False if refresh_value == 'False' else refresh_value
        return dashboard
        
    while True:
        current_refresh = dashboard.get('refresh', '1m')
        print(f'Enabled refresh intervals: {refresh_intervals}')
        prompt = f'Refresh (conventional: **1m**, use "False" to disable) [{current_refresh}]: '
        user_input = safe_input(prompt, default_value=current_refresh)
        
        if user_input == 'False':
            dashboard['refresh'] = False
            return dashboard
        if user_input in refresh_intervals:
            dashboard['refresh'] = user_input
            return dashboard
        
        print(f"'{user_input}' is not a valid interval. Please choose from the list or 'False'.")


def get_dashboard_links():
    """Dynamically generate a list of dashboards to link to."""
    project_root = Path(__file__).parent.parent
    dashboards_dir = project_root / 'dashboards'
    
    # Define categories and their corresponding tags/titles
    link_categories = {
        'Home': {'tags': ['Home'], 'url': '/graph/d/pmm-home/home-dashboard', 'type': 'link'},
        'Query Analytics': {'tags': ['Query Analytics'], 'url': '/graph/d/pmm-qan/pmm-query-analytics', 'type': 'link'},
        'OS': {'tags': ['OS'], 'type': 'dashboards'},
        'MySQL': {'tags': ['MySQL'], 'type': 'dashboards'},
        'MongoDB': {'tags': ['MongoDB'], 'type': 'dashboards'},
        'PostgreSQL': {'tags': ['PostgreSQL'], 'type': 'dashboards'},
        'ProxySQL': {'tags': ['ProxySQL'], 'type': 'dashboards'},
        'HAProxy': {'tags': ['HAProxy'], 'type': 'dashboards'},
    }
    return link_categories


def add_links(dashboard):
    """Add a default set of consistent links to the dashboard."""
    if NON_INTERACTIVE and not DEFAULT_SETTINGS['add_links']:
        return dashboard

    if not NON_INTERACTIVE:
        prompt = 'Set default consistent linking (Yes/No)? [Yes]: '
        if safe_input(prompt, 'Yes').lower() not in ['yes', 'y']:
            return dashboard

    if 'links' not in dashboard:
        dashboard['links'] = []

    # Decide whether to preserve existing links
    preserve_existing = False
    if NON_INTERACTIVE:
        preserve_existing = DEFAULT_SETTINGS['preserve_links']
    else:
        prompt = 'Preserve existing links (Yes/No)? [Yes]: '
        if safe_input(prompt, 'Yes').lower() in ['yes', 'y']:
            preserve_existing = True
            
    if not preserve_existing:
        print("Removing existing links.")
        dashboard['links'] = []

    existing_link_titles = {link.get('title', '') for link in dashboard['links']}
    
    available_links = get_dashboard_links()

    for title, details in available_links.items():
        if title in existing_link_titles:
            print(f"Link '{title}' already exists, skipping.")
            continue

        link_item = {
            'title': title,
            'tags': details['tags'],
            'type': details['type'],
            'includeVars': True,
            'keepTime': True,
            'targetBlank': False,
        }

        if details['type'] == 'link':
            link_item['url'] = details['url']
            link_item['icon'] = 'doc' if title == 'Home' else 'dashboard'
        else: # dashboards
            link_item['asDropdown'] = True
        
        print(f"Adding link: '{title}'")
        dashboard['links'].append(link_item)
        
    return dashboard


def set_editable(dashboard):
    """Set Editable Dashboard."""
    if NON_INTERACTIVE:
        dashboard['editable'] = DEFAULT_SETTINGS['editable']
    else:
        current_editable = dashboard.get('editable', False)
        prompt = f'Editable (conventional: **False**) [{current_editable}]: '
        user_input = safe_input(prompt, default_value=str(current_editable))
        dashboard['editable'] = user_input.lower() == 'true'
    return dashboard


def set_hide_controls(dashboard):
    """This function is deprecated as 'hideControls' is no longer a root-level property."""
    # 'hideControls' was removed in Grafana 5.x. The logic to hide variables
    # is now handled per-variable via the 'hide' property in the templating list.
    # The 'drop_some_internal_elements' function already clears 'current' values.
    print("Skipping 'set_hide_controls' as it is deprecated.")
    return dashboard


def set_unique_ids(dashboard):
    """Ensure all panel IDs are unique to prevent merge errors."""
    ids = set()
    
    def process_panels(panels):
        for panel in panels:
            if 'id' in panel:
                panel_id = panel['id']
                if panel_id in ids:
                    new_id = max(ids, default=0) + 1
                    print(f'ID #{panel_id} was not unique - changed to #{new_id}')
                    panel['id'] = new_id
                    ids.add(new_id)
                else:
                    ids.add(panel_id)
            
            if 'panels' in panel and panel['panels']:
                process_panels(panel['panels'])

    if 'panels' in dashboard:
        process_panels(dashboard['panels'])
        
    return dashboard


def set_dashboard_id_to_null(dashboard):
    """Remove dashboard id. A new one will be set by Grafana on import."""
    dashboard['id'] = None
    return dashboard


def drop_some_internal_elements(dashboard):
    """Remove internal Grafana properties and optionally reset template variable values."""
    dashboard.pop('__inputs', None)
    dashboard.pop('__requires', None)
    
    if 'panels' in dashboard:
        for panel in dashboard.get('panels', []):
            panel.pop('scopedVars', None)
            if 'panels' in panel:
                for sub_panel in panel.get('panels', []):
                    sub_panel.pop('scopedVars', None)

    # Logic for resetting template variables
    if 'templating' in dashboard and 'list' in dashboard['templating']:
        if NON_INTERACTIVE:
            should_drop = True
        else:
            prompt = 'Drop all current variable values (conventional: **True**)? [Yes]: '
            should_drop = safe_input(prompt, 'Yes').lower() in ['yes', 'y']
        
        if should_drop:
            print("Dropping current values for all template variables.")
            for template_var in dashboard['templating']['list']:
                if 'current' in template_var:
                    template_var['current'] = {}
    
    return dashboard


def fix_datasource(dashboard):
    """Replace placeholder datasources with concrete names."""
    
    def _fix_ds(obj):
        if not isinstance(obj, dict):
            return

        if 'datasource' in obj and isinstance(obj['datasource'], str):
            if obj['datasource'] == '${DS_PROMETHEUS}':
                obj['datasource'] = 'Prometheus'
            elif obj['datasource'] == '${DS_QAN-API}':
                obj['datasource'] = 'QAN-API'

        for key, value in obj.items():
            if isinstance(value, dict):
                _fix_ds(value)
            elif isinstance(value, list):
                for item in value:
                    _fix_ds(item)

    _fix_ds(dashboard)
    return dashboard


def set_hide_timepicker(dashboard):
    """Set Timepicker Hidden status."""
    if 'timepicker' not in dashboard:
        dashboard['timepicker'] = {}

    if NON_INTERACTIVE:
        dashboard['timepicker']['hidden'] = DEFAULT_SETTINGS['hide_timepicker']
    else:
        current_hidden = dashboard.get('timepicker', {}).get('hidden', False)
        prompt = f'Hide Timepicker (conventional: **True**) [{current_hidden}]: '
        user_input = safe_input(prompt, default_value=str(current_hidden))
        dashboard['timepicker']['hidden'] = user_input.lower() == 'true'
        
    return dashboard


def add_annotation(dashboard):
    """Add or update PMM annotations."""
    if NON_INTERACTIVE and not DEFAULT_SETTINGS['add_annotation']:
        return dashboard

    if not NON_INTERACTIVE:
        prompt = 'Add default PMM annotations (Yes/No)? [Yes]: '
        if safe_input(prompt, 'Yes').lower() not in ['yes', 'y']:
            return dashboard

    if 'annotations' not in dashboard or 'list' not in dashboard['annotations']:
        dashboard['annotations'] = {'list': []}
        
    # Remove existing PMM-related annotations to avoid duplicates, but preserve custom fields
    existing_annots = {ann.get('name'): ann for ann in dashboard['annotations']['list'] if ann.get('name') in ["PMM Annotations", "Annotations & Alerts"]}
    dashboard['annotations']['list'] = [
        ann for ann in dashboard['annotations']['list']
        if ann.get('name') not in ["PMM Annotations", "Annotations & Alerts"]
    ]
    
    # Collect active variables for tagging
    active_variables = {'pmm_annotation'}
    if 'templating' in dashboard and 'list' in dashboard['templating']:
        for templating in dashboard['templating']['list']:
            if templating.get('type') == 'query' and templating.get('hide', 0) == 0:
                active_variables.add(f'${templating["name"]}')

    # Add PMM Annotations, preserving custom fields
    pmm_ann = {
        'builtIn': 1,
        'datasource': {
            'type': 'datasource',
            'uid': 'grafana'
        },
        'enable': True, 'hide': False,
        'iconColor': "#e0752d", 'limit': 100, 'matchAny': True,
        'name': "PMM Annotations", 'showIn': 0, 'tags': sorted(list(active_variables)), 'type': "tags"
    }
    if 'PMM Annotations' in existing_annots:
        for k, v in existing_annots['PMM Annotations'].items():
            if k not in pmm_ann:
                pmm_ann[k] = v
    # Inherit fields to target if present
    if 'target' in pmm_ann and isinstance(pmm_ann['target'], dict):
        for inherit_key in ['limit', 'matchAny', 'tags', 'type']:
            if inherit_key in pmm_ann:
                pmm_ann['target'][inherit_key] = pmm_ann[inherit_key]
        # Remove inherited fields from parent to de-duplicate
        for inherit_key in ['limit', 'matchAny', 'tags', 'type']:
            if inherit_key in pmm_ann['target'] and inherit_key in pmm_ann:
                del pmm_ann[inherit_key]
    dashboard['annotations']['list'].append(pmm_ann)
    
    # Add default Grafana annotations, preserving custom fields
    alerts_ann = {
        "builtIn": 1,
        "datasource": {
            "type": "datasource",
            "uid": "grafana"
        },
        "enable": True, "hide": True,
        "iconColor": "rgba(0, 211, 255, 1)", "limit": 100, "name": "Annotations & Alerts",
        "showIn": 0, "tags": [], "type": "dashboard"
    }
    if 'Annotations & Alerts' in existing_annots:
        for k, v in existing_annots['Annotations & Alerts'].items():
            if k not in alerts_ann:
                alerts_ann[k] = v
    if 'target' in alerts_ann and isinstance(alerts_ann['target'], dict):
        for inherit_key in ['limit', 'matchAny', 'tags', 'type']:
            if inherit_key in alerts_ann:
                alerts_ann['target'][inherit_key] = alerts_ann[inherit_key]
        # Remove inherited fields from parent to de-duplicate
        for inherit_key in ['limit', 'matchAny', 'tags', 'type']:
            if inherit_key in alerts_ann['target'] and inherit_key in alerts_ann:
                del alerts_ann[inherit_key]
    dashboard['annotations']['list'].append(alerts_ann)
    
    print("Added/updated PMM annotations.")
    return dashboard

def add_environment_filtering(dashboard):
    """Add environment filtering to Prometheus queries where missing."""
    has_environment_var = any(
        var.get('name') == 'environment'
        for var in dashboard.get('templating', {}).get('list', [])
    )
    
    if not has_environment_var:
        print("Skipping environment filtering: 'environment' template variable not found.")
        return dashboard
    
    print("Checking for missing environment filters in queries...")
    queries_updated = 0
    
    def process_query(expr):
        nonlocal queries_updated
        if not isinstance(expr, str):
            return expr
        
        # Skip if already filtered or not a service-level query
        if 'environment=~' in expr or 'service_name=~' not in expr:
            return expr
        
        # Add environment filter next to service_name filter
        new_expr = re.sub(r'(service_name=~"[^"]*")', r'\1, environment=~"$environment"', expr)
        if new_expr != expr:
            queries_updated += 1
            return new_expr
        return expr

    def process_panel(panel):
        if isinstance(panel, dict):
            if 'targets' in panel:
                for target in panel.get('targets', []):
                    if 'expr' in target:
                        target['expr'] = process_query(target.get('expr', ''))
            if 'panels' in panel:
                for sub_panel in panel.get('panels', []):
                    process_panel(sub_panel)
                        
    if 'panels' in dashboard:
        for panel in dashboard['panels']:
            process_panel(panel)
    
    if queries_updated > 0:
        print(f"Updated {queries_updated} queries with environment filtering.")
    else:
        print("No queries required updating for environment filtering.")
    return dashboard

def _get_copyright_panel_content():
    """Returns the HTML content for the copyrights panel."""
    year = datetime.date.today().year
    return f"""
<center>
  <p>MySQL and InnoDB are trademarks of Oracle Corp. Proudly running Percona Server. Copyright (c) 2006-{year} Percona LLC.</p>
  <div style='text-align:center;'>
    <a href='https://percona.com/terms-use' style='display: inline;'>Terms of Use</a> | 
    <a href='https://percona.com/privacy-policy' style='display: inline;'>Privacy</a> | 
    <a href='https://percona.com/copyright-policy' style='display: inline;'>Copyright</a> | 
    <a href='https://percona.com/legal' style='display: inline;'>Legal</a>
  </div>
</center>
<hr>
<link rel='stylesheet' type='text/css' href='//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css' />
<script src='//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js'></script>
<script>
  // Simplified and safer script loading
  function initCookieConsent() {{
    if (window.cookieconsent) {{
      window.cookieconsent.initialise({{
        'palette': {{ 'popup': {{ 'background': '#eb6c44', 'text': '#ffffff' }}, 'button': {{ 'background': '#f5d948' }} }},
        'theme': 'classic',
        'content': {{
          'message': 'This site uses cookies and other tracking technologies to assist with navigation, analyze your use of our products and services, assist with promotional and marketing efforts, allow you to give feedback, and provide content from third parties. If you do not want to accept cookies, adjust your browser settings to deny cookies or exit this site.',
          'dismiss': 'Allow cookies',
          'link': 'Cookie Policy',
          'href': 'https://www.percona.com/cookie-policy'
        }}
      }});
    }}
  }}
  if (document.readyState === 'complete') {{
    setTimeout(initCookieConsent, 1000);
  }} else {{
    window.addEventListener('load', () => setTimeout(initCookieConsent, 1000));
  }}
</script>
"""

def add_copyrights_links(dashboard):
    """Add a standard copyrights and legal footer."""
    if NON_INTERACTIVE and not DEFAULT_SETTINGS['add_copyrights']:
        return dashboard

    if not NON_INTERACTIVE:
        prompt = 'Add Copyrights Links footer (required for pmmdemo)? (Yes/No) [No]: '
        if safe_input(prompt, 'No').lower() not in ['yes', 'y']:
            return dashboard
    
    # Remove existing footer to prevent duplicates
    footer_ids = {9998, 9999}
    dashboard['panels'] = [p for p in dashboard.get('panels', []) if p.get('id') not in footer_ids]

    print("Adding Copyrights & Legal footer.")
    # Add new row for the footer
    dashboard['panels'].append({
        'collapsed': False, 'gridPos': {'h': 1, 'w': 24, 'x': 0, 'y': 200},
        'id': 9998, 'panels': [], 'title': 'Copyrights & Legal', 'type': 'row'
    })
    # Add the text panel with legal info
    dashboard['panels'].append({
        'content': _get_copyright_panel_content(),
        'gridPos': {'h': 3, 'w': 24, 'x': 0, 'y': 201}, 'id': 9999, 'links': [],
        'mode': 'html', 'title': '', 'transparent': True, 'type': 'text'
    })
    
    return dashboard


def main():
    """Execute cleanups."""
    global NON_INTERACTIVE
    
    parser = argparse.ArgumentParser(
        description='Cleanup and standardize Grafana dashboard JSON files.',
        formatter_class=argparse.RawTextHelpFormatter,
        epilog="""
Examples:
  ./cleanup-dash.py /path/to/dashboard.json
  ./cleanup-dash.py -n /path/to/dashboard.json

In non-interactive mode (-n), the script applies these defaults:
  - Time range: now-12h to now
  - Refresh: 1m
  - Add/update dashboard links: Yes (and preserves existing ones)
  - Add/update PMM annotations: Yes
  - Hide timepicker: True
  - Set as non-editable: True
  - Add copyrights footer: No
        """
    )
    
    parser.add_argument('dashboard_file', help='Path to the dashboard JSON file to process.')
    parser.add_argument('-n', '--non-interactive', action='store_true', 
                       help='Run in non-interactive mode with predefined defaults.')
    parser.add_argument('--version', action='version', version=f'%(prog)s {__version__}')
    
    args = parser.parse_args()
    
    if args.non_interactive:
        NON_INTERACTIVE = True
        print("Running in non-interactive mode.")
    
    dashboard_file = Path(args.dashboard_file)
    if not dashboard_file.is_file():
        print(f"Error: Dashboard file not found at {dashboard_file}", file=sys.stderr)
        sys.exit(1)
        
    print(f"Processing dashboard: {dashboard_file}")
    
    try:
        with open(dashboard_file, 'r', encoding='utf-8') as f:
            dashboard = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"Error reading or parsing dashboard file: {e}", file=sys.stderr)
        sys.exit(1)

    # The order of cleanups can be important.
    cleanupers = [
        set_dashboard_id_to_null, # Must be early
        set_unique_ids,
        set_title,
        set_editable,
        set_hide_timepicker,
        drop_some_internal_elements,
        set_time,
        set_timezone,
        set_default_refresh_intervals,
        set_refresh,
        fix_datasource,
        add_environment_filtering,
        add_annotation,
        add_links,
        add_copyrights_links,
        set_shared_crosshair,
    ]

    for func in cleanupers:
        try:
            print(f"--- Running {func.__name__} ---")
            dashboard = func(dashboard)
        except Exception as e:
            print(f"Warning: Error in {func.__name__}: {e}", file=sys.stderr)
            # Decide if you want to continue or exit on error
            # For now, we'll just log and continue
            continue
            
    try:
        # Use dumps for pretty printing
        dashboard_json = json.dumps(dashboard, sort_keys=True, indent=2, ensure_ascii=False)
        with open(dashboard_file, 'w', encoding='utf-8') as f:
            f.write(dashboard_json)
            f.write('\n')
        print(f"\n✅ Successfully cleaned up and saved {dashboard_file}")
    except IOError as e:
        print(f"Error writing dashboard file: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
