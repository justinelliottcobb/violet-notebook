import { Outlet } from 'react-router-dom';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { Sidebar } from '~/components/Sidebar';
import { lightTheme, darkTheme } from '~/styles/theme';

// Import styles
import '~/styles/global.scss';

export default function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  return (
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
    </MantineProvider>
  );
}