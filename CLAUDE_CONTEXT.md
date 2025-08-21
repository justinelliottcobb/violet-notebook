# Violet Notebook - Claude Context

## Project Overview
Violet Notebook is a wiki-style notebook application converted from Remix to React Router 7 with SurrealDB. It allows users to create, edit, and manage markdown articles with a rich text editor interface.

## Current Branch Status
- **Current Branch:** `react-router-7-conversion`
- **Main Branch:** `main`
- **Status:** Recently merged bugfix branch changes
- **Latest Commit:** Resolved merge conflicts and updated dependencies

## Recent Development Activity
- **Major Refactor:** Converted from Remix 2 to React Router 7
- Merged bugfix branch with remote development and database connection fixes
- Authentication system converted from server-side to client-side
- Build system updated to use Vite with React plugin
- Added pre-commit hooks with TypeScript and linting

## Tech Stack
- **Framework:** React Router 7 (converted from Remix)
- **Database:** SurrealDB
- **Frontend:** React 18, TypeScript
- **Styling:** SASS, Tailwind CSS, Mantine UI components
- **Authentication:** Client-side JWT with bcrypt (needs auth.client.ts implementation)
- **Editor:** CodeMirror 6 for markdown editing
- **Build:** Vite with React plugin
- **Development Tools:** Husky, lint-staged, pre-commit hooks

## Key Dependencies
- `react-router`, `react-router-dom` - Core routing framework (replaced Remix)
- `surrealdb` - Database client
- `codemirror` - Code/markdown editor
- `@mantine/core` - UI component library
- `marked` - Markdown parsing
- `jsonwebtoken`, `bcryptjs` - Authentication
- `@vitejs/plugin-react` - Vite React plugin
- `husky`, `lint-staged` - Development workflow tools

## Project Structure
```
app/
├── components/          # React components
│   ├── MarkdownDisplay.tsx
│   ├── MarkdownEditor.client.tsx
│   ├── NotebookEditor.client.tsx
│   ├── Sidebar.tsx
│   └── ThemeSwitcher.tsx
├── db/                  # Database configuration
│   └── client.server.ts
├── models/              # Data models
│   ├── article.server.ts
│   └── user.server.ts
├── routes/              # React Router routes
│   ├── _index.tsx       # Home page with notebook editor
│   ├── article.$id.tsx  # Individual article view
│   ├── articles.new.tsx # Create new article
│   ├── login.tsx        # Client-side authentication
│   └── register.tsx
├── services/            # Business logic
│   ├── auth.server.ts   # Legacy server auth (deprecated)
│   └── auth.client.ts   # Client-side auth (MISSING - needs implementation)
└── styles/              # Styling files
    ├── global.scss
    └── theme/
```

## Database Configuration
- **Database:** SurrealDB running on `http://127.0.0.1:8000/rpc`
- **Namespace:** `violet`
- **Database:** `notebook`
- **Authentication:** Environment variables `SURREAL_USER` and `SURREAL_PASS`

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm start` - Start production server

## Key Features
1. **Article Management:** Create, read, update articles with markdown support
2. **Rich Text Editing:** CodeMirror-based markdown editor
3. **User Authentication:** JWT-based auth with registration/login
4. **Responsive Design:** Mobile-friendly interface with theme switching
5. **Wiki-style Navigation:** Article linking and browsing

## Server Configuration
- **Development Server:** Vite dev server on `0.0.0.0:3000`
- **Security:** Helmet, CORS, rate limiting configured
- **Deployment:** Node.js with Express server

## Current Issues/Notes
- **URGENT:** Login functionality broken due to missing `auth.client.ts` file
- Authentication system converted from server-side to client-side but incomplete
- Database connection works but needs migration script for different instances
- All legacy Remix server-side auth code is commented out/deprecated

## Immediate Tasks
1. Create `auth.client.ts` with client-side authentication logic
2. Implement SurrealDB migration script for database setup
3. Test and fix login functionality
4. Update routing system for React Router 7 patterns

## Environment Requirements
- Node.js >= 20.0.0
- SurrealDB instance running locally
- Environment variables for database authentication
- Updated build process requires `@vitejs/plugin-react`

## Recent Code Changes
- Converted from Remix to React Router 7 framework
- Database client uses updated SurrealDB connection syntax with { Surreal } import
- Server configured to bind to all interfaces for remote development
- Added TypeScript strict checking and pre-commit hooks
- Authentication moved from server-side to client-side (incomplete)

## Migration Status
- ✅ Build system converted to Vite + React Router 7
- ✅ Database models updated with proper TypeScript types
- ❌ Authentication system needs completion (missing auth.client.ts)
- ❌ Migration script needed for database setup
- ❌ Login functionality currently broken

Last Updated: 2025-08-21