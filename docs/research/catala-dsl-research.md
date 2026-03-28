# Catala DSL for Constitutional/Legal Rule Encoding

> Research for [guitaralchemist.github.io#5](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/5)

## Summary

[Catala](https://catala-lang.org/) is a domain-specific language designed for encoding legal rules. This document explores its applicability to encoding Demerzel's constitutional hierarchy with formal verification.

## What is Catala?

Catala is a programming language developed at Inria specifically for turning legislative texts into executable code. Key features:

- **Literate programming**: Law text and code side by side
- **Scoped rules with exceptions**: Rules apply within defined scopes, with explicit exception chains
- **Default logic**: A rule applies unless overridden by a more specific rule
- **Formal verification**: Prove properties about rule interactions
- **Multilingual**: Supports French, English, and other natural languages for rule text

## Mapping to Demerzel's Constitutional Hierarchy

### Override Chain

Catala's exception system maps directly to Demerzel's constitutional override hierarchy:

| Demerzel Layer | Catala Concept | Priority |
|---|---|---|
| Asimov Laws (Articles 0-5) | Top-level defaults | Highest -- always applies unless explicitly excepted |
| Constitution (Articles 1-11) | Scoped exceptions to Asimov defaults | High -- refines broad laws into operational rules |
| Policies (39 YAML files) | Further exceptions within article scope | Medium -- specific operational guidance |
| Persona constraints | Most specific scope | Lowest -- persona-level behavioral tuning |

### Example Encoding

#### Asimov Zeroth Law in Catala

```catala
# Article 0: Zeroth Law

scope GovernanceDecision:
  definition action_permitted equals
    not (harms_humanity action)
    and not (through_inaction_harms_humanity action)

  # Exception: First Law refines for individual humans
  exception definition action_permitted under condition
    harms_individual action and not (prevents_greater_harm action)
  consequence equals false
```

#### Constitution Article 3 (Reversibility) in Catala

```catala
# Article 3: Reversibility

scope OperationalAction:
  definition prefer_reversible equals true

  # Default: prefer reversible actions
  definition action_allowed under condition
    is_reversible action
  consequence equals true

  # Exception: irreversible action permitted with escalation
  exception definition action_allowed under condition
    not (is_reversible action)
    and human_approved action
    and confidence >= 0.7
  consequence equals true
```

#### Policy Override in Catala

```catala
# Kaizen Policy (overrides Article 3 scope)

scope KaizenImprovement includes OperationalAction:
  # Self-modification is allowed if improvement is measurable
  exception definition action_allowed under condition
    is_self_modification action
    and measurable_improvement action
    and confidence >= 0.9
  consequence equals true
```

## Research Questions and Findings

### Q1: Can Articles 0-11 be expressed in Catala?

**Finding: Yes, with strong alignment.**

- Asimov Laws (0-5) map to top-level default scopes
- Constitution Articles (1-11) map to scoped exception chains
- The priority hierarchy (Zeroth > First > Second > Third) is native to Catala's exception resolution
- Tetravalent logic (T/F/U/C) would need a custom enum type, but Catala supports this

### Q2: Does Catala's exception system capture constitutional override hierarchy?

**Finding: Yes, this is Catala's primary design purpose.**

- Default logic means: "this rule applies unless a more specific exception overrides it"
- This is exactly how Demerzel's hierarchy works: Asimov applies by default, constitution refines, policies specialize further
- Exception chains are explicit and traceable -- supporting Article 7 (Auditability)

### Q3: Can we formally verify that no policy violates a constitutional article?

**Finding: Partially -- Catala's verification is promising but has scope limits.**

- Catala can verify that exception chains are well-formed (no circular overrides)
- Catala can verify that every exception references a valid default rule
- Catala can check exhaustiveness (every case is handled)
- **Limitation**: Catala cannot verify semantic intent (e.g., "does this policy truly protect humanity?") -- only structural properties
- **Opportunity**: We could verify structural invariants like "no policy removes a constitutional protection without explicit exception"

### Q4: Is the tooling mature enough for production use?

**Finding: Approaching maturity, but with caveats.**

- Catala compiler is open-source and actively developed (Inria + community)
- Targets: OCaml, Python, JavaScript backends
- Used in real French tax law encoding (production use case)
- **Caveats**:
  - Documentation is improving but still academic-oriented
  - IDE support is basic (VS Code extension exists)
  - Community is small but growing
  - No Rust backend yet (relevant for ix integration)

## Opportunities

### Constitutional Compliance Checker

Use Catala to build a static analyzer that validates:
- Every policy YAML maps to a valid exception chain
- No persona constraint contradicts its parent policy
- Confidence thresholds are consistent across the hierarchy
- Exception chains terminate (no infinite overrides)

### Literate Constitution

Catala's literate programming approach could produce a single document where:
- Natural language constitution text appears alongside formal rules
- Readers can understand both the intent and the formal encoding
- Changes to one are immediately visible in the other

### Integration with IxQL

A Catala-encoded constitution could serve as a governance gate in IxQL pipelines:
```ixql
pipeline governed_action:
  action_proposal
  -> catala_constitutional_check
  -> execute_if_permitted
  -> audit_log
```

## Risks and Concerns

- **Complexity**: Adding a formal DSL increases the learning curve for contributors
- **Maintenance**: Two representations (YAML policies + Catala encoding) must stay in sync
- **Over-formalization**: Not all governance decisions benefit from formal verification
- **Tooling gap**: No Rust backend means ix integration requires FFI or subprocess calls

## Recommendation

**Proceed with a limited pilot**: Encode Asimov Laws (Articles 0-5) and the confidence threshold hierarchy in Catala. Evaluate whether the formal verification catches real issues before committing to full constitutional encoding.

## Department

Philosophy department research cycle -- formal logic meets legal reasoning.

## References

- [Catala language website](https://catala-lang.org/)
- [Catala GitHub repository](https://github.com/CatalaLang/catala)
- `constitutions/asimov.constitution.md`
- `constitutions/default.constitution.md`
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
