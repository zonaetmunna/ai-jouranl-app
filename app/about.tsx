import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Linking, ScrollView, Text, View } from 'react-native';

import { Container } from '~/components/Container';

/**
 * About screen with information about the app
 * @returns JSX.Element
 */
export default function AboutScreen() {
  return (
    <Container>
      <Stack.Screen options={{ title: 'About' }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8">
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-2xl bg-indigo-600">
            <Ionicons name="book" size={48} color="#fff" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">AI Journal</Text>
          <Text className="mt-1 text-gray-500 dark:text-gray-400">Version 1.0.0</Text>
        </View>

        <View className="mb-6 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Text className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            About AI Journal
          </Text>
          <Text className="mb-4 leading-6 text-gray-700 dark:text-gray-300">
            AI Journal is a modern journaling app that helps you track your thoughts, feelings, and
            experiences. With mood tracking, calendar views, and AI-powered insights, AI Journal
            transforms your daily reflections into meaningful patterns and trends.
          </Text>
          <Text className="leading-6 text-gray-700 dark:text-gray-300">
            Our mission is to help you understand yourself better through the power of journaling
            and artificial intelligence.
          </Text>
        </View>

        <View className="mb-6 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Text className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Key Features</Text>

          <View className="mb-3 flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
            <Text className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
              <Text className="font-medium">Simple Journaling:</Text> Easily create and edit journal
              entries with mood tracking
            </Text>
          </View>

          <View className="mb-3 flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
            <Text className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
              <Text className="font-medium">Calendar View:</Text> View your journal entries by date
            </Text>
          </View>

          <View className="mb-3 flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
            <Text className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
              <Text className="font-medium">AI Insights:</Text> Discover patterns in your mood and
              journal content
            </Text>
          </View>

          <View className="mb-3 flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
            <Text className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
              <Text className="font-medium">Dark Mode:</Text> Comfortable journaling day or night
            </Text>
          </View>

          <View className="flex-row items-start">
            <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
            <Text className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
              <Text className="font-medium">Data Privacy:</Text> Your journal entries stay on your
              device
            </Text>
          </View>
        </View>

        <View className="mb-6 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Text className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Contact Us</Text>
          <Text className="mb-4 leading-6 text-gray-700 dark:text-gray-300">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </Text>
          <Text
            className="text-indigo-600 dark:text-indigo-400"
            onPress={() => Linking.openURL('mailto:support@aijournal.app')}>
            support@aijournal.app
          </Text>
        </View>

        <Text className="my-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023 AI Journal. All rights reserved.
        </Text>
      </ScrollView>
    </Container>
  );
}
