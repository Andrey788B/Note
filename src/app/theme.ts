import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily:
    'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'sm',
  components: {
    Button: { defaultProps: { variant: 'light' } },
    Paper: { defaultProps: { radius: 'md', withBorder: true, p: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
  },
});