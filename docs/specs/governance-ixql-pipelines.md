# Demerzel Governance Pipelines as IxQL

> Spec for [guitaralchemist.github.io#2](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/2)

## Summary

Express Demerzel governance operations as IxQL pipelines -- making governance inspectable, testable, and composable. Each governance skill gets a `.ixql` companion file that defines its data flow.

## Pipeline Definitions

### Governance Audit

```ixql
-- governance-audit.ixql
-- Full governance health assessment

pipeline governance_audit:
  governance_state
  -> staleness_detection
  -> confidence_calibration
  -> governance_health_scorer
  -> alert_on_degradation
```

Stages:
- **governance_state**: Load current belief states, evolution logs, policy versions
- **staleness_detection**: Flag artifacts exceeding freshness thresholds
- **confidence_calibration**: Verify confidence scores match evidence density
- **governance_health_scorer**: Compute composite health metric
- **alert_on_degradation**: Trigger algedonic signals if health drops below threshold

### Conscience Cycle

```ixql
-- conscience-cycle.ixql
-- Proto-conscience processing loop

pipeline conscience_cycle:
  conscience_signals
  -> bias_assessment
  -> pattern_detection
  -> explanation_requirement
  -> belief_update
```

Stages:
- **conscience_signals**: Collect tension/dissonance signals from operations
- **bias_assessment**: Check for systematic bias in recent decisions
- **pattern_detection**: Identify recurring patterns in conscience signals
- **explanation_requirement**: Ensure each pattern has an articulated explanation
- **belief_update**: Update belief states based on conscience findings

### Research Cycle

```ixql
-- research-cycle.ixql
-- Streeling University research pipeline

pipeline research_cycle:
  department_state
  -> question_generation
  -> cross_model_validation
  -> course_production
  -> knowledge_transfer
```

Stages:
- **department_state**: Load department config, coverage ratios, existing courses
- **question_generation**: Generate research questions from gaps and frontiers
- **cross_model_validation**: Validate findings across multiple AI models
- **course_production**: Package validated findings into course format
- **knowledge_transfer**: Deliver knowledge via Galactic Protocol

### Weakness Probe

```ixql
-- weakness-probe.ixql
-- Detect governance weaknesses via ML analysis

pipeline weakness_probe:
  git_history + governance_state
  -> feature_engineering
  -> anomaly_model
  -> shap_values
  -> remediation_plan
```

Stages:
- **git_history + governance_state**: Dual data source -- commit patterns and governance metrics
- **feature_engineering**: Extract temporal, structural, and behavioral features
- **anomaly_model**: Train anomaly detector on governance health time series
- **shap_values**: Explain which features drive detected anomalies
- **remediation_plan**: Generate prioritized fix recommendations

### Compounding Dimension Tracker

```ixql
-- compounding-tracker.ixql
-- Track governance compounding over time

pipeline compounding_tracker:
  evolution_log
  -> time_features
  -> linear_regression
  -> r_squared
  -> drift_detection
```

Stages:
- **evolution_log**: Parse evolution log entries with timestamps
- **time_features**: Extract temporal features (velocity, acceleration, recency)
- **linear_regression**: Fit growth model per compounding dimension
- **r_squared**: Evaluate model fit to detect dimensions that stopped compounding
- **drift_detection**: Alert on dimensions diverging from growth trajectory

### Driver Cycle

```ixql
-- driver-cycle.ixql
-- Demerzel's 8-phase autonomous driver

pipeline driver_cycle:
  wake
  -> recon
  -> plan
  -> execute
  -> verify
  -> compound
  -> persist
  -> sleep
```

Stages:
- **wake**: Initialize driver state, load context
- **recon**: Three-tier reconnaissance (self, environment, opportunity)
- **plan**: Generate execution plan from recon findings
- **execute**: Carry out planned operations with governance gates
- **verify**: Validate execution results against expectations
- **compound**: Extract meta-learnings, update evolution log
- **persist**: Save state changes, commit artifacts
- **sleep**: Teardown, emit summary, schedule next wake

## Benefits

1. **Inspectable** -- Read the pipeline to understand what a governance skill does
2. **Testable** -- Test pipeline stages independently, mock data sources
3. **Composable** -- Chain governance pipelines, ensemble audit strategies
4. **Auditable** -- Article 7 (Auditability) -- pipeline execution is a trace
5. **Evolvable** -- Grammar evolution applies to governance pipelines too

## Implementation

- Each governance skill gets a `.ixql` companion file alongside its `SKILL.md`
- Driver phases become IxQL pipelines chained together
- New IxQL productions for governance-specific stages (`belief_update`, `conscience_signals`, etc.)
- Extend `sci-ml-pipelines.ebnf` Section 7 (Governance Integration) with these patterns
- Pipeline execution logs serve as Article 7 audit trails

## Grammar Extensions

New productions needed in Section 7 of `sci-ml-pipelines.ebnf`:

```ebnf
governance_stage    ::= belief_update | conscience_signals | staleness_detection
                      | confidence_calibration | governance_health_scorer
                      | alert_on_degradation | bias_assessment | pattern_detection
                      | explanation_requirement | department_state | question_generation
                      | cross_model_validation | course_production | knowledge_transfer
                      | remediation_plan | drift_detection

driver_stage        ::= wake | recon | plan | execute | verify | compound | persist | sleep

governance_pipeline ::= governance_stage (ARROW (governance_stage | ml_stage))*
driver_pipeline     ::= driver_stage (ARROW driver_stage)*
```

## References

- `grammars/sci-ml-pipelines.ebnf` Section 7
- `.claude/skills/demerzel-drive/SKILL.md` (Driver 8 phases)
- [ix CLI spec](ix-cli-spec.md) (Issue #1)
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
