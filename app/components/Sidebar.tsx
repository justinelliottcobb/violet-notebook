import { Link } from '@remix-run/react';
import { Box, Title, Stack, UnstyledButton } from '@mantine/core';
import { FileText, PlusCircle, LogOut, List } from 'lucide-react';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  return (
    <Box className={styles.sidebar}>
      <Box p="md">
        <Title order={3} color="violet">Violet Notebook</Title>
      </Box>
      <Stack spacing="xs">
        <UnstyledButton component={Link} to="/articles/new" className={styles.navButton}>
          <PlusCircle size={18} />
          New Article
        </UnstyledButton>
        <UnstyledButton component={Link} to="/articlelist" className={styles.navButton}>
          <List size={18} />
          Article List
        </UnstyledButton>
        <UnstyledButton component={Link} to="/logout" className={styles.navButton}>
          <LogOut size={18} />
          Logout
        </UnstyledButton>
      </Stack>
    </Box>
  );
 }
 