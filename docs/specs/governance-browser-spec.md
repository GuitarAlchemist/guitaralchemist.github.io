# Universal Governance Browser Specification

> Spec for [guitaralchemist.github.io#6](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/6) and [#7](https://github.com/GuitarAlchemist/guitaralchemist.github.io/issues/7) (duplicate)

## Summary

A single React component -- the "Demerzel IDE" -- that ingests any Demerzel artifact type and renders an appropriate interactive visualization. Navigate all governance artifacts in one unified UI.

## Artifact Renderers

| Artifact Type | Input Format | Visualization |
|---|---|---|
| Policies (.yaml) | YAML with thresholds, formulas, anti-patterns | Gauge dashboards, formula calculators, status cards |
| Grammars (.ebnf) | EBNF productions | Syntax tree, production explorer, weight bars |
| IxQL Pipelines (.ixql) | Pipeline definitions | Visual DAG -- nodes=stages, edges=flow, colors=gates |
| MCP Tools (JSON) | Tool catalogs | Federation graph, search, risk classification |
| Departments (JSON) | Department configs | Card grid, research areas, curriculum browser |
| Personas (YAML) | Behavioral profiles | Constraint visualization, capability radar chart |
| Schemas (JSON Schema) | Validation schemas | Interactive schema explorer, example generator |
| Tests (.md) | Behavioral test cases | Coverage matrix, pass/fail status, tetravalent results |

## Component Architecture

```
GovernanceBrowser (root component)
+-- ArtifactLoader
|   +-- Detects type from extension/content, parses into normalized AST
+-- PolicyRenderer
|   +-- ThresholdGauge -- zone-colored gauge for numeric thresholds
|   +-- FormulaCalculator -- interactive widget for policy formulas
|   +-- AntiPatternCard -- status card with live detection
|   +-- MetricTile -- observability metric display
+-- GrammarRenderer
|   +-- ProductionTree -- collapsible syntax tree
|   +-- ProductionExplorer -- search and filter productions
|   +-- WeightBar -- visual weight distribution
+-- PipelineRenderer
|   +-- DAGLayout -- D3 force-directed graph
|   +-- StageNode -- pipeline stage with type coloring
|   +-- GateEdge -- governance gate indicator on edges
+-- ToolRenderer
|   +-- FederationGraph -- MCP tool relationships
|   +-- ToolSearch -- full-text search across tools
|   +-- RiskClassifier -- risk level badges
+-- DepartmentRenderer
|   +-- CardGrid -- department overview cards
|   +-- ResearchBrowser -- research area drill-down
|   +-- CurriculumView -- course listing per department
+-- PersonaRenderer
|   +-- RadarChart -- capability dimensions
|   +-- ConstraintList -- behavioral constraints
|   +-- VoicePreview -- tone/verbosity/style display
+-- SchemaRenderer
|   +-- SchemaTree -- JSON Schema tree explorer
|   +-- ExampleGenerator -- generate valid examples from schema
+-- TestRenderer
|   +-- CoverageMatrix -- test coverage heatmap
|   +-- ResultBadge -- pass/fail/tetravalent status
|   +-- ScenarioViewer -- thought experiment narrative
+-- UniversalSearch
    +-- Cross-artifact full-text search with type facets
```

## Key Feature: Policy-to-Dashboard Generation

Given ANY policy YAML, auto-generate a dashboard:

1. **Parse thresholds** -> gauge components with zone coloring
   - Green zone: above healthy threshold
   - Yellow zone: warning range
   - Red zone: below critical threshold

2. **Parse formulas** -> interactive calculator widgets
   - Input sliders for formula variables
   - Real-time output computation
   - Visual formula rendering

3. **Parse anti_patterns** -> status cards with live detection
   - Card per anti-pattern with description
   - Current detection status (active/inactive)
   - Severity indicator

4. **Parse observability.metrics** -> metric tiles
   - Current value display
   - Trend sparkline
   - Alert threshold indicators

5. **Parse integration** -> cross-reference links to other artifacts
   - Clickable links to related policies, schemas, personas
   - Dependency graph visualization

This means dashboards like the compounding metrics dashboard would be auto-generated from `compounding-metrics-policy.yaml` -- no custom HTML needed.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React (ga-react-components) |
| YAML parsing | js-yaml |
| EBNF parsing | Custom parser or nearley.js |
| Graph/DAG | D3.js (force layout, tree layout) |
| UI components | MUI (cards, tables, search, tabs) |
| Charts | D3.js or recharts (radar, gauge, sparkline) |
| Routing | `/governance` route in ga-client |
| State | React context for artifact loading state |

## File Structure

```
ga-react-components/src/components/GovernanceBrowser/
+-- GovernanceBrowser.tsx         -- Root component with artifact router
+-- ArtifactLoader.ts            -- Type detection and parsing
+-- renderers/
|   +-- PolicyRenderer.tsx
|   +-- GrammarRenderer.tsx
|   +-- PipelineRenderer.tsx
|   +-- ToolRenderer.tsx
|   +-- DepartmentRenderer.tsx
|   +-- PersonaRenderer.tsx
|   +-- SchemaRenderer.tsx
|   +-- TestRenderer.tsx
+-- widgets/
|   +-- ThresholdGauge.tsx
|   +-- FormulaCalculator.tsx
|   +-- RadarChart.tsx
|   +-- DAGLayout.tsx
|   +-- CoverageMatrix.tsx
+-- UniversalSearch.tsx
+-- index.ts
```

## Artifact Loading

```typescript
interface ArtifactMeta {
  type: ArtifactType;
  name: string;
  path: string;
  version?: string;
  repo: 'Demerzel' | 'ix' | 'tars' | 'ga';
}

type ArtifactType =
  | 'policy'
  | 'grammar'
  | 'pipeline'
  | 'mcp-tool'
  | 'department'
  | 'persona'
  | 'schema'
  | 'test';

// ArtifactLoader detects type from:
// 1. File extension (.yaml, .ebnf, .ixql, .json, .md)
// 2. Content inspection (YAML with thresholds = policy, YAML with capabilities = persona)
// 3. Directory context (policies/ vs personas/ vs tests/)
```

## Implementation Plan

### Phase 1: Core Infrastructure
- ArtifactLoader with type detection
- GovernanceBrowser shell with tab navigation
- UniversalSearch with basic text matching

### Phase 2: Policy and Persona Renderers
- PolicyRenderer with auto-dashboard generation
- PersonaRenderer with radar chart
- ThresholdGauge and FormulaCalculator widgets

### Phase 3: Grammar and Pipeline Renderers
- GrammarRenderer with production tree
- PipelineRenderer with D3 DAG visualization
- Integration with IxQL parser

### Phase 4: Remaining Renderers and Polish
- ToolRenderer, DepartmentRenderer, SchemaRenderer, TestRenderer
- Cross-artifact linking
- Performance optimization for large artifact sets

## References

- All 39 policies, grammars, pipelines, schemas in Demerzel
- Ecosystem Roadmap Explorer (similar master-detail pattern)
- IxQL LSP (shares grammar parsing)
- GA Marketplace (browser could serve as marketplace UI)
- [Demerzel governance framework](https://github.com/GuitarAlchemist/Demerzel)
