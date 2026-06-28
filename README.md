# Coiny

A Next.js expense tracking application with IndexedDB storage, React Query, and modern TypeScript tooling.

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| **Framework**  | Next.js 16 (App Router)                 |
| **Language**   | TypeScript 5                            |
| **UI**         | React 19, Tailwind CSS 4                |
| **State**      | React Query (TanStack), React Hook Form |
| **Validation** | Zod 4                                   |
| **Database**   | Dexie (IndexedDB wrapper)               |
| **Forms**      | react-hook-form + @hookform/resolvers   |

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project structure

The project combines a Rails API backend with a Next.js frontend. Below is the layout of the frontend codebase:

```
project-root/
├── app/                         # Next.js App Router pages & layouts
│   ├── providers.tsx            # React Query & other providers
│   └── DataSeeder.tsx           # Database seeding utility
│
├── components/                  # React components
│   ├── ui/                      # Base reusable UI primitives
│   ├── layout/                  # Structural / chrome components
│   └── features/                # Feature-specific component groups
│       └── expenses/            # Expense management module
│
├── hooks/                       # Custom React hooks
│
├── lib/                         # Shared infrastructure (framework-agnostic)
│   ├── database/                # Database layer (Dexie / IndexedDB)
│   ├── utils/                   # Pure utility functions
│
├── types/                       # TypeScript type definitions
│
├── public/                      # Static assets
│
├── next.config.ts               # Next.js configuration
├── eslint.config.mjs            # ESLint configuration
├── postcss.config.mjs           # PostCSS configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Key Features

- **Expense Management**: Create, read, update, and delete expenses with a clean UI.
- **Filtering & Sorting**: Filter by category, sort by date/amount/title in ascending or descending order.
- **Statistics Dashboard**: View total, average, max, and min amounts plus per-category breakdown.
- **CSV Export**: Export filtered or full expense lists to CSV files.
- **Persistent Storage**: Expenses stored in IndexedDB via Dexie; sort/filter preferences persisted in localStorage.
- **React Query**: Server-state management with automatic cache invalidation on mutations.
- **Form Validation**: Zod schemas with react-hook-form for type-safe form handling.
- **PWA Support**: Service worker for offline capabilities.
