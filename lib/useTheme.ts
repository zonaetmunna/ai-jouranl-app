import { useColorScheme } from './useColorScheme';

/**
 * Hook to provide theme information compatible with NativeWind's useTheme
 * A wrapper around useColorScheme to match NativeWind's API
 */
export function useTheme() {
  const { colorScheme } = useColorScheme();

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
  };
}
