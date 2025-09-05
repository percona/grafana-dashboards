#!/usr/bin/env python3

"""
Batch script to run cleanup-dash.py against all Grafana dashboard files.
This script processes all JSON files in the dashboards directory and applies
the cleanup transformations with predefined answers to avoid manual input.
"""

import os
import sys
import subprocess
import glob
from pathlib import Path

# Non-interactive mode is now handled by the --non-interactive flag

def run_cleanup_on_file(file_path):
    """Run cleanup-dash.py on a single file in non-interactive mode."""
    try:
        script_path = Path(__file__).parent / "cleanup-dash.py"
        
        # Run cleanup-dash.py in non-interactive mode
        process = subprocess.Popen(
            [sys.executable, str(script_path), "--non-interactive", str(file_path)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        stdout, stderr = process.communicate(timeout=60)
        
        if process.returncode == 0:
            print(f"✅ {file_path}: Cleanup completed successfully")
            return True
        else:
            print(f"❌ {file_path}: Cleanup failed")
            if stderr:
                print(f"   Error: {stderr.strip()}")
            return False
            
    except subprocess.TimeoutExpired:
        print(f"⏰ {file_path}: Cleanup timed out")
        process.kill()
        return False
    except Exception as e:
        print(f"❌ {file_path}: Error - {e}")
        return False

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
    json_files = list(dashboards_dir.glob('**/*.json'))
    
    if not json_files:
        print("❌ No JSON files found in dashboards directory")
        sys.exit(1)
    
    print(f"📁 Found {len(json_files)} dashboard files")
    
    # Ask user for confirmation
    response = input(f"\n🤔 Do you want to run cleanup on all {len(json_files)} files? (yes/no): ")
    if response.lower() not in ['yes', 'y']:
        print("❌ Operation cancelled by user")
        sys.exit(0)
    
    print("\n" + "=" * 60)
    print("🚀 Starting batch cleanup process...")
    print("=" * 60)
    
    # Using non-interactive mode - no responses needed
    
    total_files_processed = 0
    successful_cleanups = 0
    
    for file_path in sorted(json_files):
        rel_path = file_path.relative_to(project_root)
        print(f"\n📝 Processing: {rel_path}")
        
        success = run_cleanup_on_file(file_path)
        total_files_processed += 1
        
        if success:
            successful_cleanups += 1
    
    print("\n" + "=" * 60)
    print(f"📊 Batch Cleanup Summary:")
    print(f"   • Total files processed: {total_files_processed}")
    print(f"   • Successful cleanups: {successful_cleanups}")
    print(f"   • Failed cleanups: {total_files_processed - successful_cleanups}")
    
    if successful_cleanups > 0:
        print(f"\n✅ Dashboard cleanup completed for {successful_cleanups} files!")
        print("🔧 Please review the changes before committing.")
    else:
        print(f"\n❌ No files were successfully cleaned up.")

if __name__ == '__main__':
    main() 