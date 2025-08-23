#!/usr/bin/env tsx

import { Surreal } from "surrealdb";

interface MigrationConfig {
  host?: string;
  username?: string;
  password?: string;
  namespace?: string;
  database?: string;
}

class DatabaseMigrator {
  private db: Surreal;

  constructor() {
    this.db = new Surreal();
  }

  async connect(config: MigrationConfig = {}) {
    const {
      host = process.env.SURREAL_HOST || 'http://127.0.0.1:8000/rpc',
      username = process.env.SURREAL_USER || '',
      password = process.env.SURREAL_PASS || '',
      namespace = process.env.SURREAL_NAMESPACE || 'violet',
      database = process.env.SURREAL_DATABASE || 'notebook'
    } = config;

    console.log(`🔌 Connecting to SurrealDB at ${host}...`);
    
    try {
      await this.db.connect(host);
      
      if (username && password) {
        console.log(`🔐 Signing in as ${username}...`);
        await this.db.signin({
          username,
          password,
        });
      }

      console.log(`📂 Using namespace: ${namespace}, database: ${database}`);
      await this.db.use({
        namespace,
        database
      });

      console.log('✅ Successfully connected to SurrealDB');
    } catch (error) {
      console.error('❌ Failed to connect to SurrealDB:', error);
      throw error;
    }
  }

  async createTables() {
    console.log('🗃️  Creating database tables...');

    try {
      // Create user table with constraints
      await this.db.query(`
        DEFINE TABLE user SCHEMAFULL;
        DEFINE FIELD email ON TABLE user TYPE string ASSERT string::is::email($value);
        DEFINE FIELD password ON TABLE user TYPE string;
        DEFINE FIELD createdAt ON TABLE user TYPE datetime DEFAULT time::now();
        DEFINE INDEX unique_email ON TABLE user COLUMNS email UNIQUE;
      `);
      console.log('✅ Created user table');

      // Create article table with constraints
      await this.db.query(`
        DEFINE TABLE article SCHEMAFULL;
        DEFINE FIELD title ON TABLE article TYPE string;
        DEFINE FIELD content ON TABLE article TYPE string;
        DEFINE FIELD authorId ON TABLE article TYPE string;
        DEFINE FIELD createdAt ON TABLE article TYPE datetime DEFAULT time::now();
        DEFINE FIELD updatedAt ON TABLE article TYPE datetime DEFAULT time::now();
        DEFINE INDEX title_index ON TABLE article COLUMNS title;
        DEFINE INDEX author_index ON TABLE article COLUMNS authorId;
      `);
      console.log('✅ Created article table');

    } catch (error) {
      console.error('❌ Failed to create tables:', error);
      throw error;
    }
  }

  async seedInitialData() {
    console.log('🌱 Seeding initial data...');

    try {
      // Check if admin user exists
      const existingUsers = await this.db.query('SELECT * FROM user WHERE email = $email', {
        email: 'admin@violet-notebook.com'
      });

      if (!existingUsers[0] || (existingUsers[0] as unknown[]).length === 0) {
        // Create admin user (password: admin123)
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await this.db.create('user', {
          email: 'admin@violet-notebook.com',
          password: hashedPassword,
          createdAt: new Date().toISOString()
        });
        console.log('✅ Created admin user (admin@violet-notebook.com / admin123)');
      } else {
        console.log('ℹ️  Admin user already exists');
      }

      // Check if welcome article exists
      const existingArticles = await this.db.query('SELECT * FROM article WHERE title = $title', {
        title: 'Welcome to Violet Notebook'
      });

      if (!existingArticles[0] || (existingArticles[0] as unknown[]).length === 0) {
        // Get admin user ID for the article
        const adminUser = await this.db.query('SELECT * FROM user WHERE email = $email LIMIT 1', {
          email: 'admin@violet-notebook.com'
        });
        
        const adminUserId = (adminUser[0] as Record<string, unknown>[])[0]?.id;
        
        if (adminUserId) {
          await this.db.create('article', {
            title: 'Welcome to Violet Notebook',
            content: `# Welcome to Violet Notebook! 📓

This is your personal wiki-style notebook where you can create, edit, and organize your thoughts, notes, and ideas.

## Getting Started

1. **Login**: Use the credentials you created during registration
2. **Create Articles**: Click "New Article" to start writing
3. **Edit Content**: Click on any article to edit it with our markdown editor
4. **Organize**: Use titles and links to create a connected knowledge base

## Features

- **Markdown Support**: Write in markdown for rich formatting
- **Real-time Preview**: See your changes as you type
- **Responsive Design**: Works great on desktop and mobile
- **Search**: Find your articles quickly
- **Themes**: Switch between light and dark modes

## Example Markdown

Here's some example markdown to get you started:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet points
- Another point
  - Nested point

1. Numbered lists
2. Are also supported

[Links to other articles](./other-article)

\`\`\`code blocks\`\`\`
\`\`\`

Happy note-taking! 🚀`,
            authorId: adminUserId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          console.log('✅ Created welcome article');
        }
      } else {
        console.log('ℹ️  Welcome article already exists');
      }

    } catch (error) {
      console.error('❌ Failed to seed initial data:', error);
      throw error;
    }
  }

  async verifyMigration() {
    console.log('🔍 Verifying migration...');

    try {
      const userCount = await this.db.query('SELECT count() FROM user GROUP ALL');
      const articleCount = await this.db.query('SELECT count() FROM article GROUP ALL');
      
      console.log(`📊 Migration verification:`);
      console.log(`   Users: ${(userCount[0] as Record<string, unknown>)?.count || 0}`);
      console.log(`   Articles: ${(articleCount[0] as Record<string, unknown>)?.count || 0}`);
      
      console.log('✅ Migration verification complete');
    } catch (error) {
      console.error('❌ Failed to verify migration:', error);
      throw error;
    }
  }

  async close() {
    await this.db.close();
    console.log('🔌 Disconnected from SurrealDB');
  }

  async runMigration(config?: MigrationConfig) {
    try {
      await this.connect(config);
      await this.createTables();
      await this.seedInitialData();
      await this.verifyMigration();
      console.log('🎉 Migration completed successfully!');
    } catch (error) {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    } finally {
      await this.close();
    }
  }
}

// CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const migrator = new DatabaseMigrator();
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const config: MigrationConfig = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];
    
    if (key && value) {
      (config as Record<string, string>)[key] = value;
    }
  }
  
  console.log('🚀 Starting Violet Notebook database migration...');
  migrator.runMigration(config);
}

export default DatabaseMigrator;