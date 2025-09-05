#!/usr/bin/env python3

"""
Batch script to add environment filtering to all Grafana dashboards.
This script processes all JSON files in the dashboards directory and adds
environment filtering to Prometheus queries where missing.
"""

import os
import sys
import json
import re
import glob
from pathlib import Path

def add_environment_filtering(dashboard):
    """Add environment filtering to Prometheus queries where missing."""
    
    # Check if dashboard has environment variable defined
    has_environment_var = False
    if 'templating' in dashboard and 'list' in dashboard['templating']:
        for var in dashboard['templating']['list']:
            if var.get('name') == 'environment':
                has_environment_var = True
                break
    
    if not has_environment_var:
        return dashboard, 0
    
    queries_updated = 0
    
    def process_query(query_expr):
        """Process a single query expression to add environment filtering."""
        if not query_expr or not isinstance(query_expr, str):
            return query_expr, False
        
        # Skip if environment filtering already exists
        if 'environment=~' in query_expr or 'environment!~' in query_expr:
            return query_expr, False
        
        # Skip if no service_name filtering (likely not a service-specific query)
        if 'service_name=~' not in query_expr:
            return query_expr, False
        
        # Pattern to match Prometheus queries with service_name filtering
        # Look for: metric_name{service_name=~"$service_name"
        # And replace with: metric_name{service_name=~"$service_name",environment=~"$environment"
        
        # Handle case where service_name is the only label
        pattern1 = r'(\{service_name=~[^}]+)\}'
        if re.search(pattern1, query_expr):
            new_expr = re.sub(pattern1, r'\1,environment=~"$environment"}', query_expr)
            return new_expr, True
        
        # Handle case where service_name is followed by other labels
        pattern2 = r'(\{service_name=~[^,}]+)(,)'
        if re.search(pattern2, query_expr):
            new_expr = re.sub(pattern2, r'\1,environment=~"$environment"\2', query_expr)
            return new_expr, True
        
        # Handle case where service_name is in the middle of other labels
        pattern3 = r'(,service_name=~[^,}]+)([,}])'
        if re.search(pattern3, query_expr):
            new_expr = re.sub(pattern3, r'\1,environment=~"$environment"\2', query_expr)
            return new_expr, True
        
        return query_expr, False
    
    def process_targets(targets):
        """Process targets array in panels."""
        nonlocal queries_updated
        if not targets:
            return
        
        for target in targets:
            if isinstance(target, dict) and 'expr' in target:
                new_expr, updated = process_query(target['expr'])
                if updated:
                    target['expr'] = new_expr
                    queries_updated += 1
    
    def process_panel(panel):
        """Process a single panel."""
        if not isinstance(panel, dict):
            return
        
        # Process direct targets
        if 'targets' in panel:
            process_targets(panel['targets'])
        
        # Process nested panels (for row panels)
        if 'panels' in panel and isinstance(panel['panels'], list):
            for nested_panel in panel['panels']:
                process_panel(nested_panel)
    
    # Process all panels
    if 'panels' in dashboard and isinstance(dashboard['panels'], list):
        for panel in dashboard['panels']:
            process_panel(panel)
    
    return dashboard, queries_updated

def process_dashboard_file(file_path):
    """Process a single dashboard file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            dashboard = json.load(f)
        
        dashboard, queries_updated = add_environment_filtering(dashboard)
        
        if queries_updated > 0:
            # Write the updated dashboard back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(dashboard, f, sort_keys=True, indent=2, separators=(',', ': '))
                f.write('\n')
            
            print(f"✅ {file_path}: Updated {queries_updated} queries")
            return True, queries_updated
        else:
            print(f"⏭️  {file_path}: No queries to update")
            return False, 0
            
    except json.JSONDecodeError as e:
        print(f"❌ {file_path}: JSON decode error - {e}")
        return False, 0
    except Exception as e:
        print(f"❌ {file_path}: Error - {e}")
        return False, 0

def main():
    """Main function to process all dashboard files."""
    
    # Find the dashboards directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    dashboards_dir = project_root / 'dashboards'
    
    if not dashboards_dir.exists():
        print(f"❌ Dashboards directory not found: {dashboards_dir}")
        sys.exit(1)
    
    print(f"🔍 Searching for dashboard files in: {dashboards_dir}")
    
    # Find all JSON files in dashboards directory
    json_files = []
    for pattern in ['**/*.json']:
        json_files.extend(dashboards_dir.glob(pattern))
    
    if not json_files:
        print("❌ No JSON files found in dashboards directory")
        sys.exit(1)
    
    print(f"📁 Found {len(json_files)} dashboard files")
    print("=" * 60)
    
    total_files_updated = 0
    total_queries_updated = 0
    
    for file_path in sorted(json_files):
        rel_path = file_path.relative_to(project_root)
        updated, queries_count = process_dashboard_file(file_path)
        
        if updated:
            total_files_updated += 1
            total_queries_updated += queries_count
    
    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   • Total files processed: {len(json_files)}")
    print(f"   • Files updated: {total_files_updated}")
    print(f"   • Total queries updated: {total_queries_updated}")
    
    if total_files_updated > 0:
        print(f"\n✅ Environment filtering has been added to {total_queries_updated} queries across {total_files_updated} dashboards!")
        print("🔧 Please review the changes and test the dashboards before committing.")
    else:
        print(f"\n💡 No files needed updating - all dashboards already have proper environment filtering!")

if __name__ == '__main__':
    main() 