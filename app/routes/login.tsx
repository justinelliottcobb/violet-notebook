import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUserSession } from "../services/auth.server";
import { TextInput, PasswordInput, Button, Paper, Title } from '@mantine/core';
import styles from '~/styles/modules/login.module.scss';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Add your user validation logic here
  // This is where you'd typically check against your database
  if (email === "admin@example.com" && password === "password") {
    return createUserSession("1", "/");
  }

  return json({ error: "Invalid credentials" });
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className={styles.loginContainer}>
      <Paper shadow="md" p="xl" className={styles.loginForm}>
        <Title order={2} mb="lg">Login to Violet Notebook</Title>
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
            Log in
          </Button>
        </Form>
      </Paper>
    </div>
  );
}