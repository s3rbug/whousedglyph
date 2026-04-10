# Claude Code Guidelines for whousedglyph

## App Description

**whousedglyph** is a Dota 2 match analysis tool that fetches and displays glyph usage data for specific matches. Users enter a match ID to view which heroes used glyphs, when they were used (timestamp), and which team (Radiant/Dire) they belonged to. The app integrates with external Dota 2 APIs (Stratz, Dotabuff, OpenDota) for detailed match information.

**Tech Stack**: React 19, TypeScript, TanStack Router, TanStack Query, Redux (empty store for future use), Tailwind CSS, shadcn/ui

**Key Feature**: Real-time glyph tracking with handling for matches still being parsed (202 status responses)

---

## Code Quality Preferences

### Null/Undefined Handling

- **Always use strict null/undefined checks** instead of falsy checks
- Prefer explicit checks: `value !== null`, `value !== undefined`, `value != null`
- Avoid relying on falsy checks unless dealing with boolean-like values
- Use optional chaining (`?.`) and nullish coalescing (`??`) when appropriate

**Why**: Prevents subtle bugs where `0`, `""`, `false` are treated as null/missing values

**Example (Good)**:

```typescript
if (data?.status === 202) {
  // handle parsing response
}
```

**Example (Avoid)**:

```typescript
if (data) { // could skip when status is 0 or falsy value
  // handle parsing response
}
```

### Import Style

- **Use direct imports from React** instead of the `React.` namespace pattern
- Import specific items: `import { useState, useEffect } from "react"`
- Avoid: `import React from "react"` followed by `React.useState`, `React.FC`, etc.

**Why**: Direct imports are more explicit, reduce namespace pollution, and enable better tree-shaking

**Example (Good)**:

```typescript
import { useEffect, useState } from "react";

export const MyComponent = () => {
  const [state, setState] = useState("");
  return <div>{state}</div>;
};
```

**Example (Avoid)**:

```typescript
import React from "react";

export const MyComponent: React.FC = () => {
  const [state, setState] = React.useState("");
  return <div>{state}</div>;
};
```

## Redux & State Management

### Current Architecture (Post-Migration)

- TanStack Query handles all server state (data fetching, caching, error/warning)
- Redux store exists for future global UI state, currently empty
- Component state via hooks (useGlyphs, useFetchGlyphs) for async operations
- URL params store matchId for persistence

### When Adding New State

- Server state → TanStack Query (`useQuery`/`useMutation`)
- Persistent ID params → URL search params
- Temporary UI state → React useState
- Global app state → Redux only if truly needed

## Component Patterns

### Data Fetching

- Use `useGlyphs(matchId)` hook for reading query cache
- Use `useFetchGlyphs()` mutation hook for explicit fetch control
- Let TanStack Query handle loading/error/warning states

### Type Imports

- AlertType is defined in `/src/hooks/useGlyphs.ts`
- CenteredAlert component accepts AlertType for error/warning display

## Testing

- Run `npm run typecheck` to verify TypeScript compilation
- Run `npm run build` to verify full production build
- No console errors for Redux references (all removed)
