import os
import sys

# Master Rule System Prompt
MASTER_RULE_SYSTEM_PROMPT = """You are the ultimate integration of a Performance Digital Marketing Expert, UI/UX Expert, and Programming Expert.

## MASTER RULE: Adaptive Performance Engineering

### 1. Adaptive Efficiency
- Save tokens during logic phases
- Utilize full detail during design phases
- Be concise but complete

### 2. Visual Phase Awareness
- For UI/CSS/HTML tasks: Describe layout decisions clearly
- Anticipate how elements will render on different screen sizes
- Note any potential overlap or responsiveness issues

### 3. Diff-Only Output (CRITICAL)
- ONLY output the specific code that changed
- Use diff format when showing modifications:
  ```diff
  - old line
  + new line
  ```
- Do NOT rewrite entire files unless creating new files

### 4. Smart Batching
- If implementation is large, organize by component
- Clearly label each section
- Suggest batching if needed

### 5. Style Preservation
- Follow any provided STYLE_GUIDE
- Maintain consistent naming conventions
- Preserve existing code patterns

You are now implementing based on a Claude-generated plan. Your output will be reviewed by Claude for quality assurance."""

def build_project_context(project_dir):
    context = []
    
    # CSS Files
    css_files = ['styles.css', 'index.css']
    for cf in css_files:
        path = os.path.join(project_dir, cf)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Truncate if HUGE, but usually we want full context for manual copy
                context.append(f"## Existing CSS ({cf}):\n```css\n{content}\n```")

    # JS Files
    js_files = ['script.js']
    for jf in js_files:
        path = os.path.join(project_dir, jf)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                context.append(f"## Existing JS ({jf}):\n```javascript\n{content}\n```")

    # HTML Files
    html_files = ['index.html']
    for hf in html_files:
        path = os.path.join(project_dir, hf)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                context.append(f"## Existing HTML ({hf}):\n```html\n{content}\n```")
            
    return "\n\n".join(context)

def main():
    if len(sys.argv) > 1:
        plan_file = sys.argv[1]
    else:
        plan_file = 'audit_plan.md'

    output_file = 'kimi_manual_prompt.txt'
    project_dir = os.getcwd()

    if not os.path.exists(plan_file):
        print(f"[ERROR] Plan file '{plan_file}' not found.")
        sys.exit(1)

    with open(plan_file, 'r', encoding='utf-8') as f:
        plan_content = f.read()

    project_context = build_project_context(project_dir)

    # Combine everything into one massive prompt
    full_prompt = f"""{MASTER_RULE_SYSTEM_PROMPT}

--------------------------------------------------
CONTEXT & CODEBASE
--------------------------------------------------

{project_context}

--------------------------------------------------
PLAN & INSTRUCTIONS
--------------------------------------------------

## Implementation Plan (from Claude):

{plan_content}

## Your Task:
1. Implement the plan above following the Master Rule principles
2. Use DIFF-ONLY format for modifications to existing files
3. Use FULL CODE only for new files
4. Organize output by component/file
5. Note any responsive design considerations
6. Flag any potential visual issues for Claude to verify

Begin implementation:
"""

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_prompt)
    
    print(f"[OK] Manual prompt generated: {output_file}")

if __name__ == "__main__":
    main()
