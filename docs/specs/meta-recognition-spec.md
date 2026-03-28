# Meta-Recognition Engine Specification

> Spec for [guitaralchemist.github.io#4](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/4)

## Summary

Demerzel should automatically detect when a situation calls for a meta-operation (MetaBuild, MetaFix, MetaSync, MetaMerge, MetaPrune) -- second-order cybernetics applied to governance.

## Detection Patterns

| Signal | Pattern | Meta-Opportunity | Confidence Threshold |
|---|---|---|---|
| Same fix applied 3+ times | Repetition | MetaFix | >= 0.7 |
| Same artifact shape created 3+ times | Template | MetaBuild | >= 0.7 |
| Artifact counts diverge from claims | Drift | MetaSync | >= 0.9 (auto-detectable) |
| Grammar production never referenced | Dead code | MetaPrune | >= 0.5 (needs confirmation) |
| Two grammars overlap significantly | Duplication | MetaMerge | >= 0.5 (needs confirmation) |
| Gap found by completeness instinct | Missing piece | MetaBuild or MetaFix | >= 0.7 |

## Architecture

### RECON Sub-Phase

The meta-recognition engine runs as a sub-phase within the Driver's RECON phase:

```
RECON Phase
+-- Self-check (existing)
+-- Environment scan (existing)
+-- Opportunity scan (existing)
+-- Meta-recognition (NEW)
    +-- Scan recent operations
    +-- Pattern match against detection table
    +-- Score confidence for each match
    +-- Propose meta-operations (suggestions only)
```

### Signal Sources

1. **Git history** -- commit messages, file changes, repetition patterns
2. **Evolution log** -- artifact lifecycle events, promotions, deprecations
3. **Conscience signals** -- tension/dissonance indicators from operations
4. **Completeness instinct** -- gap detection outputs
5. **Staleness detection** -- time-based degradation signals

### Pattern Matching Engine

```yaml
patterns:
  repetition_detector:
    input: git_log_last_30_days
    method: cluster similar commit messages and file-change sets
    threshold: 3 occurrences of same pattern
    output: MetaFix opportunity with template extraction

  template_detector:
    input: recently_created_artifacts
    method: structural similarity analysis (AST or schema comparison)
    threshold: 3 artifacts with >80% structural similarity
    output: MetaBuild opportunity with factory specification

  drift_detector:
    input: claims_vs_reality pairs
    method: exact comparison (counts, paths, versions)
    threshold: any divergence
    output: MetaSync opportunity with drift report

  dead_code_detector:
    input: grammar_productions + usage_references
    method: reference counting across all artifacts
    threshold: 0 references for a production
    output: MetaPrune opportunity with impact analysis

  duplication_detector:
    input: grammar_pairs
    method: production overlap analysis (Jaccard similarity)
    threshold: >60% overlap between two grammars
    output: MetaMerge opportunity with merge plan
```

### Governance Gate

Per Article 9 (Bounded Autonomy):
- Meta-recognition **suggests** operations, never auto-executes
- Each suggestion includes confidence score and evidence
- High-confidence suggestions (>= 0.9) are highlighted
- Low-confidence suggestions (<= 0.5) include caveats

## Relationship to Cybernetics

### Second-Order Cybernetics

Meta-recognition IS second-order cybernetics -- the system observing its own patterns:

- **First order**: Governance policies regulate agent behavior
- **Second order**: Meta-recognition detects patterns in governance itself
- **Third order**: Meta-recognition could detect patterns in its own detection (future)

### VSM Mapping

| VSM System | Role | Meta-Recognition Function |
|---|---|---|
| System 1 | Operations | Execute governance skills |
| System 2 | Coordination | MetaSync -- reconcile drift |
| System 3 | Control | MetaFix -- fix systemic issues |
| System 4 | Intelligence | **Meta-recognition engine** -- scan for opportunities |
| System 5 | Identity | Constitutional constraints on meta-operations |

### Relationship to Other Systems

- **Completeness Instinct**: Provides gap signals as input to meta-recognition
- **Conscience**: Meta-recognition translates conscience observations into actionable meta-operations
- **Evolution Log**: Both input (historical patterns) and output (meta-operation records)
- **Algedonic Channel**: Critical meta-findings bypass normal channels via algedonic signals

## Output Format

```yaml
meta_recognition_report:
  timestamp: "2026-03-28T12:00:00Z"
  recon_phase: meta-recognition
  opportunities:
    - type: MetaFix
      confidence: 0.85
      signal: repetition
      evidence: "Same logging-fix pattern applied in 4 commits over 2 weeks"
      suggestion: "Extract logging-fix template, apply as MetaFix"
      affected_repos: [ga, tars]

    - type: MetaSync
      confidence: 0.95
      signal: drift
      evidence: "CLAUDE.md claims 37 schemas, actual count is 39"
      suggestion: "Run /demerzel metasync --type count"
      affected_repos: [Demerzel]
```

## Implementation Plan

### Phase 1: Repetition and Drift Detection
- Git log analysis for repeated patterns
- Count-based drift detection (leveraging MetaSync)
- Basic confidence scoring

### Phase 2: Template and Dead Code Detection
- Structural similarity analysis for template detection
- Reference counting for dead code identification
- Integration with completeness instinct

### Phase 3: Duplication Detection and Full Integration
- Grammar overlap analysis
- Full RECON sub-phase integration
- Dashboard visualization on gh-pages

## References

- Cybernetics and second-order cybernetics (Demerzel#85)
- Completeness instinct policy
- [MetaSync spec](metasync-spec.md) (Issue #3)
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
