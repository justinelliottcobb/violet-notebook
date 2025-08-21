# Violet Notebook - Claude Context

## Project Overview
Violet Notebook is a wiki-style notebook application built with Remix and SurrealDB. It allows users to create, edit, and manage markdown articles with a rich text editor interface.

## Current Branch Status
- **Current Branch:** `bugfix/remote-dev-and-db-connect-fixes`
- **Main Branch:** `main`
- **Status:** Clean working directory

## Recent Development Activity
- Latest commit: `76c4c84 chore: ip redirect rules for remote dev`
- Recent work includes remote development setup and database connection fixes
- Active feature branches: `feat/editing-deleting-articles`, `feat/revision-history`

## Tech Stack
- **Framework:** Remix (React-based full-stack framework)
- **Database:** SurrealDB
- **Frontend:** React 18, TypeScript
- **Styling:** SASS, Tailwind CSS, Mantine UI components
- **Authentication:** JWT with bcrypt
- **Editor:** CodeMirror 6 for markdown editing
- **Build:** Vite
- **Server:** Express with security middleware (helmet, cors, rate limiting)

## Key Dependencies
- `@remix-run/node`, `@remix-run/react` - Core Remix framework
- `surrealdb` - Database client
- `codemirror` - Code/markdown editor
- `@mantine/core` - UI component library
- `marked` - Markdown parsing
- `jsonwebtoken`, `bcryptjs` - Authentication
- `lucide-react` - Icons

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
├── routes/              # Remix routes
│   ├── _index.tsx       # Home page with notebook editor
│   ├── article.$id.tsx  # Individual article view
│   ├── articles.new.tsx # Create new article
│   ├── login.tsx        # Authentication
│   └── register.tsx
├── services/            # Business logic
│   └── auth.server.ts
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
- Working on remote development setup fixes
- Database connection improvements in progress
- Recent changes to IP redirect rules for remote development

## Environment Requirements
- Node.js >= 20.0.0
- SurrealDB instance running locally
- Environment variables for database authentication

## Recent Code Changes
- Database client uses updated SurrealDB connection syntax
- Server configured to bind to all interfaces for remote development
- Article model includes debug logging for troubleshooting

Last Updated: 2025-08-21