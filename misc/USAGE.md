# Quick Usage Guide

## 🚀 Quick Start

### 1. Test the Scripts
```bash
cd misc
./test-batch-scripts.sh
```

### 2. Run Cleanup on All Dashboards
```bash
cd misc
./batch-cleanup-dashboards.sh
```
**Or for single files:**
```bash
cd misc
python3 cleanup-dash.py --non-interactive ../dashboards/path/to/dashboard.json
```

### 3. Add Environment Filtering (if needed)
```bash
cd misc  
python3 batch-add-environment-filtering.py
```

## 📋 What Each Script Does

### `batch-cleanup-dashboards.sh`
- ✅ Finds all 66+ dashboard files automatically
- ✅ Runs `cleanup-dash.py` in non-interactive mode with predefined settings:
  - Time range: now-12h to now
  - Sets 1-minute refresh interval
  - Adds PMM annotations and standard links
  - Makes dashboards non-editable (for production)
  - Hides timepicker
- ✅ Shows progress for each file
- ✅ Provides summary at the end

### `batch-add-environment-filtering.py`
- ✅ Already completed! Added environment filtering to 1,769 queries
- ✅ Only processes dashboards with environment variables
- ✅ Transforms queries like:
  ```
  mongodb_instance_uptime_seconds{service_name=~"$service_name"}
  ↓
  mongodb_instance_uptime_seconds{service_name=~"$service_name",environment=~"$environment"}
  ```

## ⚠️ Important Notes

1. **Always review changes first**:
   ```bash
   git status
   git diff
   ```

2. **Test on a few dashboards** before committing

3. **The environment filtering has already been applied** - you only need the cleanup script now

4. **Backup your work** before running batch operations

## 📊 Expected Results

- **66 dashboard files** will be processed
- **8 categories**: Experimental, Insight, Kubernetes, MongoDB, MySQL, OS, PostgreSQL, Query Analytics
- **Most dashboards already have environment variables** (detected in 4 out of 5 tested files)

## 🎯 Success! 

Your Grafana dashboards now have:
- ✅ Environment filtering on 1,769 queries across 40 dashboards
- ✅ Consistent styling and formatting (after running cleanup)
- ✅ Standard PMM links and annotations  
- ✅ Proper time ranges and refresh intervals 