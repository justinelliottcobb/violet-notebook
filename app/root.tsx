import type { LinksFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { Sidebar } from '~/components/Sidebar';
import { lightTheme, darkTheme } from '~/styles/theme';
import { getUserFromSession } from '~/services/auth.server';

// Import styles
import styles from '~/styles/global.scss?url';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ];
};

export async function loader({ request }: { request: Request }) {
  const user = await getUserFromSession(request);
  const pathname = new URL(request.url).pathname;
  
  // Skip auth check for public routes if you have any
  const publicRoutes = ['/login', '/register'];
  if (publicRoutes.includes(pathname)) {
    if (user) {
      return redirect('/');
    }
    return json({ user: null });
  }
  
  // Protected routes
  if (!user) {
    return redirect('/login');
  }
  
  return json({ user });
}

export default function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={colorScheme === 'light' ? lightTheme : darkTheme}
          colorScheme={colorScheme}
        >
          <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1 min-h-screen">
              <ThemeSwitcher />
              <Outlet />
            </main>
          </div>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}