import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import { createUser } from "~/models/user.server";
import { login } from "~/services/auth.client";
import styles from '~/styles/modules/login.module.scss';

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await createUser(email, password);
      if (user) {
        const success = await login(email, password);
        if (success) {
          window.location.href = '/';
        } else {
          setError("Registration succeeded but login failed");
        }
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Paper shadow="md" p="xl" className={styles.loginForm}>
        <Title order={2} mb="lg">Register</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            label="Email"
            required
            mb="md"
          />
          <PasswordInput
            name="password"
            label="Password"
            required
            mb="md"
          />
          {error && (
            <div className={styles.error}>{error}</div>
          )}
          <Button type="submit" fullWidth loading={isLoading}>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
