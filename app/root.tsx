import type { LinksFunction } from '@remix-run/node';
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
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { lightTheme, darkTheme } from './styles/theme';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];

// export async function loader({ request }: { request: Request }) {
//   const user = await getUserFromSession(request);
//   const pathname = new URL(request.url).pathname;
  
//   if (user && pathname === "/login") {
//     return redirect("/");
//   }
  
//   if (!user && pathname !== "/login") {
//     return redirect("/login");
//   }
  
//   return json({ user });
// }

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
          <ThemeSwitcher />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
