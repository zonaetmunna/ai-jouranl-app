import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Switch, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { useColorScheme } from '~/lib/useColorScheme';
import { useJournalStore } from '~/store/journalStore';

/**
 * SettingsItem component for rendering individual settings options
 */
const SettingsItem = ({
  icon,
  title,
  description,
  onPress,
  isSwitch = false,
  isSwitchEnabled = false,
  onSwitchChange = () => {},
  isDestructive = false,
}: {
  icon: string;
  title: string;
  description: string;
  onPress?: () => void;
  isSwitch?: boolean;
  isSwitchEnabled?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDestructive?: boolean;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center border-b border-gray-200 py-4 dark:border-gray-700"
      disabled={isSwitch}>
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
        <Ionicons
          name={icon as any}
          size={22}
          color={isDestructive ? '#ef4444' : isDark ? '#a5b4fc' : '#4f46e5'}
        />
      </View>
      <View className="flex-1">
        <Text
          className={`text-base font-medium ${isDestructive ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">{description}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={isSwitchEnabled}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </Pressable>
  );
};

/**
 * Settings screen component
 * @returns JSX.Element
 */
export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const { entries } = useJournalStore();

  /**
   * Handle the export data action
   */
  const handleExport = () => {
    if (entries.length === 0) {
      Alert.alert('No Data to Export', "You don't have any journal entries to export yet.");
      return;
    }

    // In a real app, implement an actual export function
    Alert.alert('Data Export', 'Your journal data has been exported successfully.', [
      { text: 'OK' },
    ]);
  };

  /**
   * Handle the clear data action with confirmation
   */
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all your journal entries? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, implement actual data clearing
            Alert.alert('Data Cleared', 'All your journal data has been deleted.', [
              { text: 'OK' },
            ]);
          },
        },
      ]
    );
  };

  return (
    <Container>
      <View className="pb-6 pt-2">
        <Text className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Settings</Text>

        <View className="mb-6 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
          <SettingsItem
            icon="notifications-outline"
            title="Daily Reminders"
            description="Receive a daily reminder to journal"
            isSwitch
            isSwitchEnabled={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />

          <SettingsItem
            icon="moon-outline"
            title="Dark Mode"
            description="Switch between light and dark theme"
            isSwitch
            isSwitchEnabled={isDark}
            onSwitchChange={(value) => setColorScheme(value ? 'dark' : 'light')}
          />

          <SettingsItem
            icon="cloud-upload-outline"
            title="Auto Backup"
            description="Automatically backup your journal entries"
            isSwitch
            isSwitchEnabled={backupEnabled}
            onSwitchChange={setBackupEnabled}
          />
        </View>

        <View className="mb-6 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
          <SettingsItem
            icon="help-circle-outline"
            title="Help & Support"
            description="Get help or contact support"
            onPress={() => router.push('/help')}
          />

          <SettingsItem
            icon="document-text-outline"
            title="Privacy Policy"
            description="Read our privacy policy"
            onPress={() => router.push('/privacy')}
          />

          <SettingsItem
            icon="information-circle-outline"
            title="About"
            description="Learn more about AI Journal"
            onPress={() => router.push('/about')}
          />
        </View>

        <View className="mb-6 overflow-hidden rounded-lg bg-white dark:bg-gray-800">
          <SettingsItem
            icon="download-outline"
            title="Export Data"
            description="Export all your journal entries"
            onPress={handleExport}
          />

          <SettingsItem
            icon="trash-outline"
            title="Clear All Data"
            description="Delete all journal entries permanently"
            onPress={handleClearData}
            isDestructive
          />
        </View>

        <Text className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          AI Journal v1.0.0
        </Text>
      </View>
    </Container>
  );
}
