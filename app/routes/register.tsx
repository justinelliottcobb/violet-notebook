// app/routes/register.tsx
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import { createUser } from "~/models/user.server";
import { login } from "~/services/auth.server";
import styles from '~/styles/modules/login.module.scss';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await createUser(email, password);
    if (user) {
      const session = await login(email, password);
      return session;
    }
    return json({ error: "Registration failed" });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ error: "Registration failed" });
  }
};

export default function Register() {
  const actionData = useActionData<typeof action>();

  return (
    <div className={styles.loginContainer}>
      <Paper shadow="md" p="xl" className={styles.loginForm}>
        <Title order={2} mb="lg">Register</Title>
        <Form method="post">
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
          {actionData?.error && (
            <div className={styles.error}>{actionData.error}</div>
          )}
          <Button type="submit" fullWidth>
            Register
          </Button>
        </Form>
      </Paper>
    </div>
  );
}