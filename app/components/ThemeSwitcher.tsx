import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeSwitcher.module.scss';

export function ThemeSwitcher() {
 const { setColorScheme } = useMantineColorScheme();
 const computedColorScheme = useComputedColorScheme('light');

 return (
   <ActionIcon
     onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
     variant="outline"
     size="lg"
     className={styles.themeButton}
   >
     {computedColorScheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
   </ActionIcon>
 );
}