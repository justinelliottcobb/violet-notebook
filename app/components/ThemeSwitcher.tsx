import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="outline"
      size="lg"
      aria-label="Toggle color scheme"
      className="fixed top-4 right-4"
    >
      {computedColorScheme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </ActionIcon>
  );
}
