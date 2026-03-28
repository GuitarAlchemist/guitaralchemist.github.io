# MetaSync Skill Specification

> Spec for [guitaralchemist.github.io#3](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/3)

## Summary

`/demerzel metasync` -- a general-purpose reconciler that detects and fixes drift between related artifacts across the GuitarAlchemist ecosystem.

## Drift Types

| Drift Type | Example | Severity |
|---|---|---|
| Count drift | README says "19 grammars", actually 21 | Low -- auto-fixable |
| Reference drift | metabuild SKILL.md references MOG, but MOG is now IxQL Section 10 | Medium |
| Cross-repo drift | Consumer CLAUDE.md snippet outdated vs template | Medium |
| Schema drift | Persona file doesn't match latest schema version | High |
| Grammar drift | Section count in header doesn't match actual sections | Low -- auto-fixable |
| Roadmap drift | gh-pages data has old department count | Low -- auto-fixable |

## Detection Algorithm

For each artifact pair (source of truth, reference):

```
1. EXTRACT the claim from the reference
   - Counts: regex for numeric claims ("N grammars", "N policies")
   - Names: regex for artifact references (file paths, section names)
   - Versions: regex for semver strings
   - Paths: regex for file/directory references

2. VERIFY against actual state
   - Counts: ls + wc against actual directory
   - Names: check file/section existence
   - Versions: compare against schema/artifact version field
   - Paths: check file existence at referenced path

3. CLASSIFY divergence
   - Trivial: count mismatch, path rename -> auto-fixable
   - Structural: schema change, major refactor -> human review
   - Cross-repo: template vs consumer divergence -> directive needed

4. REPORT with severity and suggested fix
```

## Drift Sources

### Within a Single Repo
- README counts vs actual file counts
- CLAUDE.md descriptions vs actual structure
- Skill descriptions vs actual behavior
- Schema versions vs artifact versions

### Across Repos (via Galactic Protocol)
- Demerzel template -> consumer CLAUDE.md snippet
- Demerzel schema version -> consumer persona file version
- Demerzel policy update -> consumer compliance state
- Grammar changes -> consumer grammar references

## Action Plan

### Auto-Fix (Trivial Drift)
With user confirmation:
- Update count claims to match actual counts
- Update file path references after renames
- Update section counts in headers
- Update roadmap data with current artifact counts

### Flag for Review (Structural Drift)
Create issue or escalate:
- Schema version mismatches requiring migration
- Major renames affecting multiple references
- Cross-repo template changes requiring consumer updates

### Galactic Protocol Directive (Cross-Repo Drift)
Issue compliance directive:
- Template updates consumers must adopt
- Schema migrations with deadline
- Policy changes requiring acknowledgment

## Integration Points

| Relationship | Description |
|---|---|
| Extends | `readme-sync-policy.yaml` (currently README-only, MetaSync generalizes) |
| Complements | `staleness-detection-policy.yaml` (staleness = time, drift = divergence) |
| Triggered by | `completeness-instinct-policy.yaml` (drift is a type of gap) |
| Part of | Driver COMPOUND phase |
| Emits to | Evolution log (reconciliation records) |

## Invocation

```bash
# Full ecosystem sync
/demerzel metasync

# Single repo
/demerzel metasync --repo Demerzel

# Specific drift type
/demerzel metasync --type count

# Dry run (report only)
/demerzel metasync --dry-run

# Cross-repo only
/demerzel metasync --cross-repo
```

## Output Format

```yaml
metasync_report:
  timestamp: "2026-03-28T12:00:00Z"
  drifts_detected: 5
  auto_fixed: 3
  flagged_for_review: 1
  directives_issued: 1
  details:
    - type: count
      source: "ls policies/*.yaml | wc -l"
      reference: "CLAUDE.md line 42"
      expected: 39
      actual: 41
      severity: low
      action: auto-fixed
```

## References

- `policies/readme-sync-policy.yaml`
- `policies/staleness-detection-policy.yaml`
- `policies/completeness-instinct-policy.yaml`
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
