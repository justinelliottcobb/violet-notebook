import { Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { Sidebar } from '~/components/Sidebar';
import { lightTheme, darkTheme } from '~/styles/theme';

// Import styles
import '~/styles/global.scss';

// Test comment for pre-commit hook validation

export default function App() {
  const [colorScheme] = useState<'light' | 'dark'>('light');

  return (
    <MantineProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 min-h-screen">
          <ThemeSwitcher />
          <Outlet />
        </main>
      </div>
    </MantineProvider>
  );
}