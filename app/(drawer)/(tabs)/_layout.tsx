import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';
import { useTheme } from '~/lib/useTheme';

export default function TabsLayout() {
  const { colorScheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Journal',
          tabBarIcon: (props) => <TabBarIcon {...props} name="book-outline" />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: (props) => <TabBarIcon {...props} name="calendar-outline" />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: (props) => <TabBarIcon {...props} name="analytics-outline" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: (props) => <TabBarIcon {...props} name="settings-outline" />,
        }}
      />
    </Tabs>
  );
}
