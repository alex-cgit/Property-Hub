# Property Hub - Frontend Coding Standards

## 1. Project Philosophy
This document defines the strict coding standards required for the Property Hub frontend. Consistency is key. Every file should look like it was written by the same person.

### Core Principles
*   **Predictability:** File structures and naming conventions must be uniform.
*   **Maintainability:** Small, single-responsibility components. No "God Components" (>300 lines).
*   **Performance:** Optimize render cycles. Use memoization where appropriate but avoid premature optimization.
*   **Type Safety:** `any` is strictly forbidden. All data structures must be typed.

---

## 2. Directory Structure & Naming
We follow a **Feature-First** architecture inside `src/`.

```
src/
├── app/                    # Global app setup (providers, layout, router)
├── assets/                 # Static assets (images, global css)
├── components/             # Shared UI components (shadcn/ui, buttons, inputs)
│   ├── ui/                 # Shadcn primitives (do not modify logic here)
│   └── layout/             # Header, Sidebar, Footer
├── features/               # Feature-based modules (The core logic)
│   ├── auth/               # Authentication (Login, Register, Forgot Password)
│   ├── dashboard/          # Dashboard specific widgets
│   ├── properties/         # Property management (List, Details, Edit)
│   │   ├── components/     # Components specific to this feature
│   │   ├── hooks/          # Hooks specific to this feature
│   │   ├── types/          # Types specific to this feature
│   │   └── api/            # API calls specific to this feature
│   ├── leases/             # Lease management
│   └── maintenance/        # Maintenance requests
├── hooks/                  # Global hooks (useTheme, useToast)
├── lib/                    # Utilities (cn, formatters, validators)
├── services/               # Global API services (axios/fetch instances)
├── store/                  # Global state stores (Zustand)
└── types/                  # Global types (User, Role, ApiError)
```

### Naming Conventions
*   **Folders:** `kebab-case` (e.g., `user-profile`, `lease-agreement`)
*   **Files (Components):** `PascalCase.tsx` (e.g., `UserProfileCard.tsx`)
*   **Files (Hooks):** `camelCase.ts` (e.g., `useLeaseCalculator.ts`)
*   **Files (Utils/Types):** `kebab-case.ts` (e.g., `date-formatters.ts`, `api-types.ts`)
*   **Interfaces/Types:** `PascalCase` (e.g., `interface LeaseDocument`)
*   **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_UPLOAD_SIZE_MB`)

---

## 3. TypeScript Guidelines
*   **Strict Mode:** Always enabled in `tsconfig.json`.
*   **Explicit Returns:** Functions should have explicit return types if complex.
*   **Interfaces vs Types:** Use `interface` for defining object shapes (better error messages). Use `type` for unions/intersections.
*   **No `any`:** Use `unknown` if the type is truly dynamic, then type guard it.
*   **Props:** Define props interface immediately above the component.
    ```typescript
    interface ButtonProps {
        variant: 'primary' | 'secondary';
        label: string;
        onClick: () => void;
    }
    ```

---

## 4. Component Structure
Components should follow a consistent ordering:

1.  **Imports:** External libs first, then internal alias imports (`@/components/...`), then relative imports.
2.  **Interface Definitions:** Props interface.
3.  **Component Definition:** `export const MyComponent = ({ prop }: Props) => { ... }`
4.  **Hooks:** State, Context, Custom Hooks.
5.  **Derived State:** `const isActive = status === 'active';`
6.  **Effects:** `useEffect` (Keep minimal).
7.  **Handlers:** `handleSubmit`, `onClick`.
8.  **Render:** Return JSX.

### Example
```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';

interface PropertyCardProps {
    id: string;
    address: string;
}

export const PropertyCard = ({ id, address }: PropertyCardProps) => {
    // 1. Hooks
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: details, isLoading } = useQuery(['property', id], fetchPropertyDetails);

    // 2. Handlers
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // 3. Render
    if (isLoading) return <Skeleton className="h-40 w-full" />;

    return (
        <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold">{address}</h3>
            <p>Built: {formatDate(details.buildDate)}</p>
            <Button onClick={toggleExpand}>
                {isExpanded ? 'Hide' : 'Show Details'}
            </Button>
        </div>
    );
};
```

---

## 5. State Management
*   **Local State (`useState`):** UI toggles, form inputs (if not using react-hook-form), simple component interactions.
*   **Server State (`React Query`):** ALL async data fetching. Do not use `useEffect` + `fetch` manually.
    *   Use strict query keys: `['properties', 'list', filters]`.
    *   Use `useMutation` for updates (`POST`, `PUT`, `DELETE`).
*   **Global Client State (`Zustand`):** User session, sidebar open/close, theme preferences.
    *   Avoid Context API for complex state updates to prevent re-render hell.
*   **Form State (`React Hook Form`):** Use `zod` for schema validation.

---

## 6. Styling (Tailwind CSS)
*   **Utility-First:** Use Tailwind classes for 99% of styling.
*   **`cn()` Utility:** Use `clsx` + `tailwind-merge` for conditional classes.
    ```typescript
    // GOOD
    className={cn(
        "bg-blue-500 text-white p-4 rounded",
        isActive && "bg-blue-700",
        className // Allow overrides
    )}
    ```
*   **Avoid `@apply`:** Do not create custom CSS classes with `@apply` unless strictly necessary for complex animations or legacy integration.
*   **Spacing:** Use standardized margin/padding (`m-4`, `p-6`). Do not use arbitrary values (`m-[13px]`) unless pixel-perfect design demands it.

---

## 7. Error Handling & Validation
*   **API Errors:** Handle errors at the service layer or in `onError` callbacks of React Query.
*   **Boundaries:** Wrap feature modules in `ErrorBoundary` components to prevent app-wide crashes.
*   **Input Validation:** All user inputs MUST be validated with Zod schemas.
    ```typescript
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });
    ```

---

## 8. Testing Standards
*   **Unit Tests:** Vitest + React Testing Library.
    *   Test logic, not implementation details.
    *   Test: "User clicks button -> Handler called."
    *   Don't Test: "State variable `isOpen` is true."
*   **E2E:** Playwright (Critical paths only: Login, Create Lease, Pay Rent).

## 9. Git Workflow
*   **Branches:** `feature/my-feature`, `fix/issue-number`, `chore/cleanup`.
*   **Commits:** Conventional Commits (`feat: add login form`, `fix: resolve crash on dashboard`).
*   **PRs:** Must have a description, screenshots (if UI changed), and pass CI checks.
