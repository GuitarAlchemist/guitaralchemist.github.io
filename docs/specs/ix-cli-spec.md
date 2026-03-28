# ix CLI for IxQL Script Execution

> Spec for [guitaralchemist.github.io#1](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/1)

## Summary

Build an ix CLI that can parse and execute IxQL pipeline scripts -- the command-line interface to the ix machine-learning forge.

## Usage

```bash
# Execute inline pipeline
ix run 'governance_state -> cleaning -> gradient_boosting -> f1_score'

# Execute from file
ix run pipeline.ixql

# Governed execution (constitutional gates enforced)
ix run --governed pipeline.ixql

# List available productions
ix models --type supervised
ix preprocess --list
ix patterns --list
```

## Command Reference

| Command | Description |
|---|---|
| `ix run <expr\|file>` | Parse and execute an IxQL pipeline |
| `ix run --governed <file>` | Execute with constitutional gates between stages |
| `ix run --dry-run <file>` | Validate pipeline without execution |
| `ix models [--type TYPE]` | List available model productions |
| `ix preprocess --list` | List available preprocessing stages |
| `ix patterns --list` | List available pattern/analysis stages |
| `ix validate <file>` | Check pipeline against grammar without executing |
| `ix explain <file>` | Show execution plan for a pipeline |

## Architecture

```
ix CLI
├── Parser (pest or nom crate)
│   └── Parses IxQL against sci-ml-pipelines.ebnf productions
├── Validator
│   └── Checks pipeline well-formedness (data_source -> ... -> evaluation)
├── Executor
│   └── Maps each production to Rust ML implementations
├── Governance Layer (--governed flag)
│   └── Injects constitutional gates between pipeline stages
└── Hyperlight Integration (optional)
    └── Execute each stage in isolated micro-VM
```

### Parser

- **Crate**: `pest` or `nom` for parsing IxQL syntax
- **Grammar source**: `grammars/sci-ml-pipelines.ebnf`
- **Output**: AST representing the pipeline as a directed sequence of stages

### Validator

- Ensures pipeline starts with a valid data source
- Checks stage compatibility (output type of stage N matches input type of stage N+1)
- Validates all referenced productions exist in the grammar

### Executor

- Maps each AST node to a Rust ML implementation
- Stages execute sequentially, passing data frames between them
- Error propagation halts the pipeline with diagnostic output

### Governance Layer

When `--governed` is passed:
1. Before each stage, evaluate constitutional constraints
2. Check confidence thresholds (Article 6: Escalation)
3. Log each stage execution for auditability (Article 7)
4. Gate destructive operations behind human confirmation (Article 3: Reversibility)

### Hyperlight Integration

Optional isolation via Hyperlight micro-VMs:
- Each pipeline stage runs in its own micro-VM
- Memory isolation prevents cross-stage data leaks
- Execution time limits enforced per stage

## IxQL File Format

```ixql
-- governance-health.ixql
-- Compute governance health score across repos

pipeline governance_health:
  governance_state
  -> cleaning(missing: drop, outliers: iqr)
  -> gradient_boosting(n_estimators: 100)
  -> f1_score
  -> shap_values
  -> mcp_tool_integration
```

### Syntax Elements

- `--` line comments
- `pipeline <name>:` named pipeline declaration
- `->` stage separator (arrow operator)
- `stage(param: value, ...)` parameterized stages
- Bare `stage` for default-parameter stages

## Implementation Plan

### Phase 1: Parse and Validate
- Implement pest grammar from EBNF
- Build AST representation
- `ix validate` and `ix explain` commands

### Phase 2: Execute
- Map core productions to Rust implementations
- `ix run` for inline and file-based pipelines
- Error handling and diagnostics

### Phase 3: Governance
- `ix run --governed` with constitutional gates
- Audit logging integration
- Confidence threshold checks

### Phase 4: Hyperlight
- Micro-VM isolation per stage
- Resource limits and sandboxing

## References

- `grammars/sci-ml-pipelines.ebnf` (IxQL grammar)
- Hyperlight micro-VM integration (ix#101)
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
