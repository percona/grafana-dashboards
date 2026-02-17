# AGENTS.md Migration Summary

> Project successfully migrated to the industry-standard AGENTS.md format

## What Was Done

Migrated from custom README.LLM.md format to the universal **AGENTS.md** standard used by 20,000+ open-source projects.

## New File Structure

### AI Agent Documentation (AGENTS.md files)

```
grafana-dashboards/
├── AGENTS.md                                  # General project documentation
│   ├─ Repository structure
│   ├─ Quick start commands
│   ├─ Git workflow
│   └─ Critical code rules
│
├── CLAUDE.md                                  # Claude Code specific instructions
│   └─ Kept for Claude Code compatibility
│
└── pmm-app/
    ├── AGENTS.md                              # PMM App documentation
    │   ├─ Project structure
    │   ├─ Technology stack
    │   ├─ Code style rules
    │   ├─ Grafana plugin patterns
    │   ├─ State management (Context API)
    │   ├─ API integration
    │   ├─ Testing patterns
    │   └─ Common code examples
    │
    └── src/pmm-qan/panel/
        └── AGENTS.md                          # QueryAnalytics component docs
            ├─ Component architecture
            ├─ Theme system (light/dark)
            ├─ Context providers
            ├─ Common tasks with examples
            └─ Testing patterns
```

### Human-Readable Documentation (kept for reference)

```
grafana-dashboards/
├── README-AI-DOCS.md              # Navigation and overview
├── AI-DOCUMENTATION-GUIDE.md      # Theory and implementation guide
├── AI-DOCS-SUMMARY.txt            # Quick reference with metrics
├── FILES-OVERVIEW.md              # File structure overview
└── PRESENTATION-CHEATSHEET.md     # Presentation guide
```

## Files Removed (Duplicates)

✅ Removed:
- `pmm-app/README.LLM.md` → Replaced by `pmm-app/AGENTS.md`
- `pmm-app/.github/copilot-instructions.md` → Copilot reads AGENTS.md
- `pmm-app/src/pmm-qan/panel/README.LLM.md` → Replaced by `panel/AGENTS.md`

✅ Kept:
- `CLAUDE.md` - Specific instructions for Claude Code
- Human documentation files - Theory and guides for developers

## Benefits of Migration

### For AI Agents
✅ **Industry standard** - Used by 20,000+ projects
✅ **Universal** - Works with 20+ AI tools automatically
✅ **Automatic discovery** - AI agents find AGENTS.md files
✅ **Hierarchical** - Each project level has its own file

### For Developers
✅ **Less duplication** - Information in one place per level
✅ **Easier maintenance** - Update one file instead of multiple
✅ **Better organization** - Clear hierarchy
✅ **Compatibility** - Works with current and future AI tools

## AI Tools That Read AGENTS.md

- ✅ **GitHub Copilot** - Reads automatically
- ✅ **Claude Code** - Reads automatically (also uses CLAUDE.md)
- ✅ **Cursor** - Reads automatically
- ✅ **Sourcegraph Cody** - Reads automatically
- ✅ **Google Jules** - Reads automatically
- ✅ **Aider** - Reads automatically
- ✅ **OpenAI Codex** - Reads automatically
- ✅ **20+ other tools** - Standard format

## How It Works

1. **AI agent starts** working in the project
2. **Automatically finds** AGENTS.md in current and parent directories
3. **Reads the closest** AGENTS.md (hierarchical precedence)
4. **Uses context** to generate accurate code

Example:
```
Working in: pmm-app/src/pmm-qan/panel/components/NewComponent.tsx

AI reads in order:
1. pmm-app/src/pmm-qan/panel/AGENTS.md       ← Most specific
2. pmm-app/AGENTS.md                         ← App-level context
3. /AGENTS.md                                ← General context
4. CLAUDE.md (if Claude Code)                ← Tool-specific
```

## Quick Reference

### Need general project info?
→ Read `/AGENTS.md`

### Working on pmm-app?
→ Read `pmm-app/AGENTS.md`

### Working on QueryAnalytics panel?
→ Read `pmm-app/src/pmm-qan/panel/AGENTS.md`

### Want to understand the approach?
→ Read `README-AI-DOCS.md` or `AI-DOCUMENTATION-GUIDE.md`

## Migration Date

**Completed**: 2025-01-25

## References

- AGENTS.md Standard: https://agents.md/
- UC Berkeley ReadMe.LLM Research: https://arxiv.org/html/2504.09798v2
- GitHub Copilot Best Practices: https://github.blog/ai-and-ml/github-copilot/

---

**Result**: Clean, standardized documentation structure that works with all major AI coding assistants.
