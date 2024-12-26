import { initDB } from '~/db/client.server';
import bcrypt from 'bcryptjs';

export interface User {
  id?: string;
  email: string;
  password: string;
  createdAt?: string;
}

export async function createUser(email: string, password: string) {
  try {
    const db = await initDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Creating user:', { email }); // Debug log
    
    const result = await db.create('user', {
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });
    
    console.log('Create result:', result); // Debug log
    return result[0];
    
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
}

export async function verifyLogin(email: string, password: string) {
  const db = await initDB();
  console.log('Verifying login for:', { email });

  const result = await db.query('SELECT * FROM user WHERE email = $email LIMIT 1', { email });
  const user = result[0][0]; // Access first element of first array
  
  if (!user || !user.password) {
    console.log('No user found or missing password');
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isValid);
  
  if (!isValid) return null;
  return user;
}
