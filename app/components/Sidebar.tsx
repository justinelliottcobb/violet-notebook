import { Link } from '@remix-run/react';
import { Box, Title, Stack, UnstyledButton } from '@mantine/core';
import { FileText, PlusCircle, LogOut, List } from 'lucide-react';

export function Sidebar() {
  return (
    <Box sx={{
      width: '240px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: 'var(--vn-bg-primary)',
      borderRight: '1px solid var(--vn-border-color)'
    }}>
      <Box p="md">
        <Title order={3} color="violet">Violet Notebook</Title>
      </Box>
      <Stack spacing="xs">
        <UnstyledButton component={Link} to="/articles/new" 
          sx={theme => ({
            padding: theme.spacing.sm,
            color: 'var(--vn-text-primary)',
            '&:hover': { backgroundColor: 'var(--vn-bg-secondary)' },
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs
          })}>
          <PlusCircle size={18} />
          New Article
        </UnstyledButton>
        <UnstyledButton component={Link} to="/articles/new" 
          sx={theme => ({
            padding: theme.spacing.sm,
            color: 'var(--vn-text-primary)',
            '&:hover': { backgroundColor: 'var(--vn-bg-secondary)' },
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs
          })}>
          <List size={18} />
          Article List
        </UnstyledButton>
        <UnstyledButton component={Link} to="/logout" 
          sx={theme => ({
            padding: theme.spacing.sm,
            color: 'var(--vn-text-primary)',
            '&:hover': { backgroundColor: 'var(--vn-bg-secondary)' },
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs
          })}>
          <LogOut size={18} />
          Logout
        </UnstyledButton>
        {/* Repeat for other links */}
      </Stack>
    </Box>
  );
}