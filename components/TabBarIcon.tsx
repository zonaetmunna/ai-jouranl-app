import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size?: number;
  focused?: boolean;
}) => {
  const { size = 24, ...otherProps } = props;
  return <Ionicons size={size} style={styles.tabBarIcon} {...otherProps} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
