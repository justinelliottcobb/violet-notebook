# Database Migration Guide

This guide explains how to set up and migrate your SurrealDB database for Violet Notebook.

## Prerequisites

1. **SurrealDB Server**: Make sure SurrealDB is running
   ```bash
   # Install SurrealDB (if not already installed)
   curl -sSf https://install.surrealdb.com | sh
   
   # Start SurrealDB server
   surreal start --log trace --user root --pass root memory
   ```

2. **Environment Variables**: Set up your database connection
   ```bash
   export SURREAL_USER="root"
   export SURREAL_PASS="root"
   export SURREAL_HOST="http://127.0.0.1:8000/rpc"  # Optional, defaults to localhost
   export SURREAL_NAMESPACE="violet"                 # Optional, defaults to violet
   export SURREAL_DATABASE="notebook"                # Optional, defaults to notebook
   ```

## Running the Migration

### Option 1: Using npm script (recommended)
```bash
npm run migrate
```

### Option 2: Using npm with custom parameters
```bash
npm run migrate -- --host http://localhost:8000/rpc --username root --password root
```

### Option 3: Direct execution
```bash
npx tsx scripts/migrate.ts
```

## What the Migration Does

The migration script will:

1. **Connect to SurrealDB** using the provided credentials
2. **Create Tables** with proper schema:
   - `user` table with email constraints and indexing
   - `article` table with title and author indexing
3. **Seed Initial Data**:
   - Admin user: `admin@violet-notebook.com` / `admin123`
   - Welcome article with getting started content
4. **Verify Migration** by counting records

## Database Schema

### User Table
```sql
DEFINE TABLE user SCHEMAFULL;
DEFINE FIELD email ON TABLE user TYPE string ASSERT string::is::email($value);
DEFINE FIELD password ON TABLE user TYPE string;
DEFINE FIELD createdAt ON TABLE user TYPE datetime DEFAULT time::now();
DEFINE INDEX unique_email ON TABLE user COLUMNS email UNIQUE;
```

### Article Table
```sql
DEFINE TABLE article SCHEMAFULL;
DEFINE FIELD title ON TABLE article TYPE string;
DEFINE FIELD content ON TABLE article TYPE string;
DEFINE FIELD authorId ON TABLE article TYPE string;
DEFINE FIELD createdAt ON TABLE article TYPE datetime DEFAULT time::now();
DEFINE FIELD updatedAt ON TABLE article TYPE datetime DEFAULT time::now();
DEFINE INDEX title_index ON TABLE article COLUMNS title;
DEFINE INDEX author_index ON TABLE article COLUMNS authorId;
```

## Troubleshooting

### Connection Issues
- Ensure SurrealDB is running on the correct port
- Check your username/password credentials
- Verify the host URL format

### Permission Issues
- Make sure your user has the necessary permissions
- For development, using `root` user is fine
- For production, create dedicated users with specific permissions

### Migration Already Run
The migration script is idempotent - it can be run multiple times safely. It will:
- Skip creating tables if they already exist
- Skip creating the admin user if it already exists
- Skip creating the welcome article if it already exists

## Post-Migration

After successful migration:

1. **Test the application**: Start the dev server with `npm run dev`
2. **Login**: Use `admin@violet-notebook.com` / `admin123`
3. **Create your own user**: Register a new account via the UI
4. **Start writing**: Create your first article!

## Production Notes

For production environments:
- Use strong passwords and dedicated database users
- Consider using SurrealDB in secure mode
- Set up proper backup strategies
- Use environment variables for all credentials