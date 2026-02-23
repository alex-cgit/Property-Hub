# Property Hub Frontend Coding Standards

This document outlines the coding standards and best practices for frontend development on the Property Hub application. Adhering to these standards ensures consistency, maintainability, and a high-quality user experience.

## 1. Frameworks & Libraries

*   **Core Framework:** React
*   **Build Tool:** Vite (for fast development server and optimized builds)
*   **Language:** TypeScript (for type safety and better code quality)
*   **Styling:** Tailwind CSS (utility-first approach for rapid styling and consistent design)
*   **Component Library:** shadcn/ui (based on Radix UI primitives). Emphasize using existing shadcn/ui components wherever possible to maintain visual consistency and accessibility.
*   **State Management:** React Context for global state (e.g., `UserContext`, `PortfolioContext`), `tanstack/react-query` for server state management and caching.

## 2. Project Structure & Organization

Adhere to the established directory structure:

*   **`client/src/`**: Main application source code.
    *   **`pages/`**: Top-level route components.
    *   **`components/`**: Reusable UI components.
        *   **`ui/`**: Primitives from shadcn/ui.
        *   **`lease/`, `property/`, etc.:** Feature-specific components.
    *   **`hooks/`**: Custom React Hooks (e.g., `useMobile`, `useToast`).
    *   **`lib/`**: Utility functions, API clients, mock data.
    *   **`integrations/`**: Integrations with external services (e.g., Supabase).
*   **`public/`**: Static assets (images, favicons, docs).
*   **`scripts/`**: Build or utility scripts.

## 3. Component Best Practices

*   **Atomicity:** Components should be small, reusable, and focused on a single responsibility.
*   **Props:** Clearly define prop types using TypeScript interfaces.
*   **State:** Keep component state local where possible. Lift state up to context or query client when shared across components.
*   **Accessibility (A11y):** Use semantic HTML, ARIA attributes where necessary, and ensure keyboard navigability. Leverage shadcn/ui components which are built with accessibility in mind.

## 4. Styling with Tailwind CSS

*   **Utility-First:** Use Tailwind utility classes directly in JSX for styling. Avoid custom CSS files unless absolutely necessary for complex, non-reusable styles.
*   **Configuration:** Adhere to `tailwind.config.ts` for theme consistency.
*   **Responsiveness:** Utilize Tailwind's responsive prefixes (e.g., `md:`, `lg:`) for adaptable layouts.

## 5. State Management & Data Fetching

*   **Global State:** Use React Context (`UserContext`, `PortfolioContext`) for shared application-level state.
*   **Server State:** Leverage `tanstack/react-query` for fetching, caching, and synchronizing data from Supabase.
    *   Define query keys clearly.
    *   Use mutations for data modifications.
*   **Mock Data:** Utilize `src/lib/mock-data.ts` for frontend development and testing before full Supabase integration.

## 6. TypeScript Usage

*   **Strict Typing:** Enforce strict type checking (`tsconfig.json`).
*   **Interfaces:** Define interfaces for props, state, API responses, and data models.
*   **Avoid `any`:** Use specific types whenever possible.

## 7. Linting & Formatting

*   **ESLint & Prettier:** Ensure code quality and consistency by running linters and formatters.
*   **Integration:** Integrate ESLint and Prettier into your IDE and the build process.

## 8. Testing

*   **Unit & Integration Tests:** Write tests using Vitest (configured in `vitest.config.ts`) for components and critical logic.
*   **Test Coverage:** Aim for reasonable test coverage, especially for business logic and complex UI interactions.

## 9. Error Handling & User Feedback

*   **Toasts:** Use the `useToast` hook and `Toaster` component for user feedback (e.g., success messages, errors).
*   **Alert Dialogs:** Use `AlertDialog` for critical user confirmations.
*   **Error Boundaries:** Implement React Error Boundaries for graceful UI error handling.

## 10. Commit Messages

*   Follow conventional commit messages (e.g., `feat:`, `fix:`, `docs:`, `refactor:`) for clear and consistent commit history.

---