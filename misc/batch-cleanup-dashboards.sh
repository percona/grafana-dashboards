#!/bin/bash

# Batch script to run cleanup-dash.py against all Grafana dashboard files
# This script finds all JSON files in the dashboards directory and runs cleanup-dash.py on each

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DASHBOARDS_DIR="$PROJECT_ROOT/dashboards"
CLEANUP_SCRIPT="$SCRIPT_DIR/cleanup-dash.py"

echo -e "${BLUE}🔍 Grafana Dashboard Batch Cleanup Tool${NC}"
echo -e "${BLUE}======================================${NC}"

# Check if dashboards directory exists
if [ ! -d "$DASHBOARDS_DIR" ]; then
    echo -e "${RED}❌ Dashboards directory not found: $DASHBOARDS_DIR${NC}"
    exit 1
fi

# Check if cleanup script exists
if [ ! -f "$CLEANUP_SCRIPT" ]; then
    echo -e "${RED}❌ Cleanup script not found: $CLEANUP_SCRIPT${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Searching for dashboard files in: $DASHBOARDS_DIR${NC}"

# Find all JSON files
json_files=()
while IFS= read -r line; do
    json_files+=("$line")
done < <(find "$DASHBOARDS_DIR" -name "*.json" -type f | sort)

if [ ${#json_files[@]} -eq 0 ]; then
    echo -e "${RED}❌ No JSON files found in dashboards directory${NC}"
    exit 1
fi

echo -e "${GREEN}📊 Found ${#json_files[@]} dashboard files${NC}"

# Non-interactive mode - no need for response files anymore

# Ask for confirmation
echo ""
read -p "🤔 Do you want to run cleanup on all ${#json_files[@]} files? (yes/no): " -r
if [[ ! $REPLY =~ ^[Yy]([Ee][Ss])?$ ]]; then
    echo -e "${YELLOW}❌ Operation cancelled by user${NC}"
    exit 0
fi

echo -e "\n${BLUE}================================================================${NC}"
echo -e "${BLUE}🚀 Starting batch cleanup process...${NC}"
echo -e "${BLUE}================================================================${NC}"

# Using non-interactive mode - no temporary files needed

# Counters
total_files=0
successful_cleanups=0
failed_cleanups=0

# Process each file
for file in "${json_files[@]}"; do
    relative_path="${file#$PROJECT_ROOT/}"
    echo -e "\n${YELLOW}📝 Processing: $relative_path${NC}"
    
    total_files=$((total_files + 1))
    
    # Run cleanup script in non-interactive mode
    if python3 "$CLEANUP_SCRIPT" --non-interactive "$file" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $relative_path: Cleanup completed successfully${NC}"
        successful_cleanups=$((successful_cleanups + 1))
    else
        echo -e "${RED}❌ $relative_path: Cleanup failed${NC}"
        failed_cleanups=$((failed_cleanups + 1))
    fi
done

# Summary
echo -e "\n${BLUE}================================================================${NC}"
echo -e "${BLUE}📊 Batch Cleanup Summary:${NC}"
echo -e "${BLUE}   • Total files processed: $total_files${NC}"
echo -e "${GREEN}   • Successful cleanups: $successful_cleanups${NC}"
echo -e "${RED}   • Failed cleanups: $failed_cleanups${NC}"

if [ $successful_cleanups -gt 0 ]; then
    echo -e "\n${GREEN}✅ Dashboard cleanup completed for $successful_cleanups files!${NC}"
    echo -e "${YELLOW}🔧 Please review the changes before committing.${NC}"
else
    echo -e "\n${RED}❌ No files were successfully cleaned up.${NC}"
fi 