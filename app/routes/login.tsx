import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import { login } from '~/services/auth.client';
import styles from '~/styles/modules/login.module.scss';

export default function Login() {
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
      const success = await login(email, password);
      if (!success) {
        setError("Invalid credentials");
      } else {
        // Handle successful login - redirect or update app state
        window.location.href = '/';
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Paper shadow="md" p="xl" className={styles.loginForm}>
        <Title order={2} mb="lg">Login to Violet Notebook</Title>
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
            Log in
          </Button>
        </form>
      </Paper>
    </div>
  );
}
