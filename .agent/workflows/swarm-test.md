---
description: Swarm mode for research and split-testing with 50 parallel operations
---

# Swarm-Test Workflow

This workflow activates swarm mode (50 parallel operations) for two main use cases:
1. **Research Mode**: Generate multiple content variations, research tasks, or copywriting angles
2. **Split-Test Mode**: Create multiple visual variations for A/B testing

## How to Use

### Research Mode
```
/swarm-test [RESEARCH] Generate 30 Facebook ad angles for selling used cars
/swarm-test [RESEARCH] Research 20 pain points of first-time car buyers
/swarm-test [RESEARCH] Create 15 email subject line variations
```

### Split-Test Mode
```
/swarm-test [SPLIT-TEST] Create 3 hero section variations for car sales page
/swarm-test [SPLIT-TEST] Build 4 pricing table designs
/swarm-test [SPLIT-TEST] Test 2 different CTA button styles
```

## Workflow Steps

### For Research Tasks

1. **Detect Research Mode**
   - Look for [RESEARCH] keyword or research-oriented prompts
   
2. **Activate Swarm (50 Parallel)**
   // turbo-all
   ```
   Spawn parallel agents equal to requested variations
   Each agent explores one angle/variation
   ```

3. **Aggregate Results**
   - Compile all results into structured markdown
   - Organize by category or effectiveness
   - Return as artifact (no files created)

4. **Deliver Output**
   - Clean markdown with all variations
   - Ready for copy/paste into marketing tools

---

### For Split-Test Tasks

1. **Detect Split-Test Mode**
   - Look for [SPLIT-TEST] keyword or visual variation requests
   - Identify number of variations needed

2. **Create Sandbox Structure**
   ```
   <current-project>/sandbox/<timestamp>/
   ├── v1/
   ├── v2/
   └── v3/
   ```

3. **Activate Swarm (50 Parallel)**
   // turbo-all
   ```
   Build all variations simultaneously
   Each version in its own subdirectory
   Apply different design approaches
   ```

4. **Visual Verification**
   - Open browser for each variation
   - Capture screenshots at multiple viewports
   - Check for overlapping elements or broken layouts

5. **Create Comparison Report**
   - Embed all screenshots in walkthrough.md
   - Side-by-side comparison
   - Note strengths/weaknesses of each

6. **Wait for User Decision**
   - Keep ALL versions (never auto-delete)
   - User will specify winner later
   - Versions remain in sandbox for client review

## Configuration

- **Max concurrency**: 50 parallel operations
- **Sandbox location**: `<project>/sandbox/<timestamp>/`
- **Cleanup policy**: Never auto-delete (keep all versions)
- **Browser verification**: Auto-enabled for split-tests
- **Screenshot viewports**: Mobile (375px), Tablet (768px), Desktop (1440px)

## Examples

### Research Example
```
/swarm-test [RESEARCH] Generate 25 copywriting angles for Toyota Camry 2015

Output:
1. "Reliability Champion" - Focus on Toyota's reputation
2. "Fuel Economy Hero" - Emphasize MPG savings
3. "Family Safety First" - Highlight safety ratings
... (25 total)
```

### Split-Test Example
```
/swarm-test [SPLIT-TEST] Create 3 hero variations for car dealership

Creates:
sandbox/2026-02-17-1700/
  ├── v1-professional/  → Light, clean, trustworthy
  ├── v2-premium/       → Dark, luxurious, bold
  └── v3-modern/        → Gradient, dynamic, vibrant

+ Screenshots of all 3
+ Comparison report
```

## Success Criteria

### Research Mode
- ✅ All variations generated in parallel
- ✅ Structured markdown output
- ✅ No duplicate angles
- ✅ Ready for immediate use

### Split-Test Mode
- ✅ All versions built simultaneously
- ✅ Browser screenshots captured
- ✅ No visual bugs (overlapping, broken layouts)
- ✅ Comparison report created
- ✅ All versions preserved in sandbox
