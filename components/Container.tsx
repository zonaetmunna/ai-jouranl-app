import { SafeAreaView } from 'react-native';

import { cn } from '~/lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component with safe area and padding
 * @param children - Child components
 * @param className - Optional TailwindCSS class names
 * @returns JSX.Element
 */
export const Container = ({ children, className }: ContainerProps) => {
  return <SafeAreaView className={cn('flex-1 px-4', className)}>{children}</SafeAreaView>;
};
