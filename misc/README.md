# Grafana Dashboard Batch Processing Scripts

This directory contains scripts for batch processing Grafana dashboard files in the Percona dashboards repository.

## Available Scripts

### 1. `batch-add-environment-filtering.py`
**Purpose**: Automatically adds environment filtering to Prometheus queries where missing.

**Usage**:
```bash
cd misc
python3 batch-add-environment-filtering.py
```

**What it does**:
- Scans all dashboard JSON files
- Finds queries with `service_name=~"$service_name"` filtering
- Adds `,environment=~"$environment"` to those queries
- Only processes dashboards that have an environment variable defined

**Example transformation**:
```bash
# Before:
mongodb_instance_uptime_seconds{service_name=~"$service_name"}

# After:  
mongodb_instance_uptime_seconds{service_name=~"$service_name",environment=~"$environment"}
```

### 2. `batch-cleanup-dashboards.py` (Python version)
**Purpose**: Runs `cleanup-dash.py` against all dashboard files with automated responses.

**Usage**:
```bash
cd misc
python3 batch-cleanup-dashboards.py
```

### 3. `batch-cleanup-dashboards.sh` (Shell version)
**Purpose**: Shell script version that runs `cleanup-dash.py` against all dashboard files.

**Usage**:
```bash
cd misc
./batch-cleanup-dashboards.sh
```

**Automated responses used**:
- Title: Keep current
- Time range: `now-12h` to `now`  
- Timezone: `browser`
- Refresh: `1m`
- Links: Add default consistent linking (`Yes`)
- Editable: `True`
- Hide Timepicker: `True` 
- PMM Annotation: `Yes`
- Copyrights: `No`

### 4. `cleanup-dash.py` (Enhanced with Non-Interactive Mode)
**Purpose**: Original cleanup script enhanced with environment filtering capability and non-interactive mode.

**Usage**:
```bash
cd misc
python3 cleanup-dash.py path/to/dashboard.json                    # Interactive mode
python3 cleanup-dash.py --non-interactive path/to/dashboard.json  # Non-interactive mode
python3 cleanup-dash.py -n path/to/dashboard.json                 # Non-interactive mode (short)
```

**New features**: 
- Automatically adds environment filtering to queries during cleanup process
- Non-interactive mode for CI/CD environments with predefined defaults

## Recommended Workflow

For a complete dashboard cleanup and environment filtering setup:

1. **First, add environment filtering** (if not already done):
   ```bash
   cd misc
   python3 batch-add-environment-filtering.py
   ```

2. **Then, run dashboard cleanup**:
   ```bash
   ./batch-cleanup-dashboards.sh
   ```

3. **Review changes**:
   ```bash
   git diff
   ```

4. **Test a few dashboards** to ensure they work correctly

5. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add environment filtering and apply dashboard cleanup"
   ```

## Script Details

### Environment Filtering Logic
- Only processes dashboards that have an `environment` template variable
- Only adds filtering to queries that already have `service_name=~"$service_name"`
- Skips queries that already have environment filtering
- Handles various query patterns (service_name at beginning, middle, or end of label selectors)

### Cleanup Logic  
- Applies consistent styling and formatting
- Adds standard PMM links and annotations
- Sets recommended time ranges and refresh intervals
- Normalizes datasource references
- Removes internal Grafana elements

## Safety Features

- **Confirmation prompts**: Both batch scripts ask for confirmation before processing
- **Backup recommendation**: Always review changes with `git diff` before committing
- **Non-destructive**: Scripts only modify dashboard JSON files, not the original structure
- **Error handling**: Scripts continue processing other files if one fails

## Output Examples

### Environment Filtering Script:
```
🔍 Searching for dashboard files in: /path/to/dashboards
📁 Found 66 dashboard files
============================================================
✅ MongoDB_Instance_Summary.json: Updated 23 queries
✅ MySQL_Instance_Summary.json: Updated 67 queries
⏭️  Advanced_Data_Exploration.json: No queries to update
============================================================
📊 Summary:
   • Total files processed: 66
   • Files updated: 40  
   • Total queries updated: 1769
```

### Cleanup Script:
```
🔍 Grafana Dashboard Batch Cleanup Tool
======================================
📁 Searching for dashboard files in: /path/to/dashboards  
📊 Found 66 dashboard files

🤔 Do you want to run cleanup on all 66 files? (yes/no): yes

================================================================
🚀 Starting batch cleanup process...
================================================================

📝 Processing: dashboards/MongoDB/MongoDB_Instance_Summary.json
✅ dashboards/MongoDB/MongoDB_Instance_Summary.json: Cleanup completed successfully
```

## Troubleshooting

**Issue**: Script can't find dashboards directory
**Solution**: Make sure you're running the script from the `misc/` directory

**Issue**: Permission denied
**Solution**: Make scripts executable: `chmod +x *.py *.sh`

**Issue**: Python script timeouts
**Solution**: Use the shell script version: `./batch-cleanup-dashboards.sh`

**Issue**: Environment filtering not added
**Solution**: Check that your dashboard has an `environment` template variable defined 