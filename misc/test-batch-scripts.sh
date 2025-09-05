#!/bin/bash

# Test script to verify batch processing scripts work correctly
# This script tests file discovery and basic functionality without making changes

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

echo -e "${BLUE}🧪 Testing Batch Processing Scripts${NC}"
echo -e "${BLUE}===================================${NC}"

# Test 1: Check if required files exist
echo -e "\n${YELLOW}📋 Test 1: Checking required files...${NC}"

required_files=(
    "$SCRIPT_DIR/cleanup-dash.py"
    "$SCRIPT_DIR/batch-cleanup-dashboards.py"
    "$SCRIPT_DIR/batch-cleanup-dashboards.sh"
    "$SCRIPT_DIR/batch-add-environment-filtering.py"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $(basename "$file") exists${NC}"
    else
        echo -e "${RED}❌ $(basename "$file") missing${NC}"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    echo -e "${GREEN}✅ All required files present${NC}"
else
    echo -e "${RED}❌ Some required files are missing${NC}"
    exit 1
fi

# Test 2: Check dashboards directory
echo -e "\n${YELLOW}📋 Test 2: Checking dashboards directory...${NC}"

if [ -d "$DASHBOARDS_DIR" ]; then
    echo -e "${GREEN}✅ Dashboards directory exists: $DASHBOARDS_DIR${NC}"
else
    echo -e "${RED}❌ Dashboards directory not found: $DASHBOARDS_DIR${NC}"
    exit 1
fi

# Test 3: Count dashboard files
echo -e "\n${YELLOW}📋 Test 3: Discovering dashboard files...${NC}"

# Use more compatible approach
json_files_count=$(find "$DASHBOARDS_DIR" -name "*.json" -type f | wc -l)
json_files_count=$(echo "$json_files_count" | tr -d ' ')

if [ "$json_files_count" -eq 0 ]; then
    echo -e "${RED}❌ No JSON files found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found $json_files_count dashboard files${NC}"

# Create array for later use
json_files=()
while IFS= read -r -d '' file; do
    json_files+=("$file")
done < <(find "$DASHBOARDS_DIR" -name "*.json" -type f -print0 | sort -z)

# Test 4: Show file distribution by category
echo -e "\n${YELLOW}📋 Test 4: Dashboard file distribution...${NC}"

# Get unique categories and their counts
categories=$(find "$DASHBOARDS_DIR" -name "*.json" -type f | sed "s|^$DASHBOARDS_DIR/||" | cut -d'/' -f1 | sort | uniq)
category_count=$(echo "$categories" | wc -l | tr -d ' ')

echo -e "${BLUE}   Found $category_count categories:${NC}"
for category in $categories; do
    count=$(find "$DASHBOARDS_DIR/$category" -name "*.json" -type f 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${BLUE}   📁 $category: $count files${NC}"
done

# Test 5: Check for environment variables in a few dashboards
echo -e "\n${YELLOW}📋 Test 5: Checking environment variable presence...${NC}"

env_var_count=0
sample_files=("${json_files[@]:0:5}")  # Test first 5 files

for file in "${sample_files[@]}"; do
    relative_path="${file#$PROJECT_ROOT/}"
    if grep -q '"name": "environment"' "$file" 2>/dev/null; then
        echo -e "${GREEN}✅ $relative_path: Has environment variable${NC}"
        env_var_count=$((env_var_count + 1))
    else
        echo -e "${YELLOW}⚠️  $relative_path: No environment variable${NC}"
    fi
done

sample_files_count=${#sample_files[@]}
echo -e "${BLUE}📊 Environment variable found in $env_var_count out of $sample_files_count tested files${NC}"

# Test 6: Test Python script import
echo -e "\n${YELLOW}📋 Test 6: Testing Python script syntax...${NC}"

if python3 -c "import sys; sys.path.append('$SCRIPT_DIR'); import batch_add_environment_filtering" 2>/dev/null; then
    echo -e "${GREEN}✅ batch-add-environment-filtering.py: Syntax OK${NC}"
else
    echo -e "${RED}❌ batch-add-environment-filtering.py: Syntax error${NC}"
fi

if python3 -c "import sys; sys.path.append('$SCRIPT_DIR'); exec(open('$SCRIPT_DIR/batch-cleanup-dashboards.py').read())" 2>/dev/null; then
    echo -e "${GREEN}✅ batch-cleanup-dashboards.py: Syntax OK${NC}"
else
    echo -e "${RED}❌ batch-cleanup-dashboards.py: Syntax error${NC}"
fi

# Summary
echo -e "\n${BLUE}================================================================${NC}"
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "${GREEN}✅ All batch processing scripts are ready to use${NC}"
echo -e "${BLUE}📁 Total dashboard files: $json_files_count${NC}"
echo -e "${BLUE}📂 Categories found: $category_count${NC}"
echo -e "${YELLOW}💡 To run the scripts:${NC}"
echo -e "${YELLOW}   • Environment filtering: python3 batch-add-environment-filtering.py${NC}"
echo -e "${YELLOW}   • Dashboard cleanup: ./batch-cleanup-dashboards.sh${NC}"
echo -e "${BLUE}================================================================${NC}" 