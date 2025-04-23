import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Container } from '~/components/Container';

/**
 * FAQ Item component with expandable content
 */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="border-b border-gray-200 py-4 dark:border-gray-700">
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className="flex-row items-center justify-between">
        <Text className="flex-1 pr-4 text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </Text>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#9ca3af" />
      </Pressable>

      {expanded && (
        <Text className="mt-2 leading-6 text-gray-700 dark:text-gray-300">{answer}</Text>
      )}
    </View>
  );
};

/**
 * Help and Support screen with FAQs
 * @returns JSX.Element
 */
export default function HelpScreen() {
  // FAQ data
  const faqs = [
    {
      question: 'How do I create a new journal entry?',
      answer:
        'Tap the + button on the main Journal screen to create a new entry. You can add a title, select your mood, and write your thoughts.',
    },
    {
      question: 'Can I edit my journal entries?',
      answer:
        "Yes, you can edit any entry by opening it and tapping the 'Edit' button in the top right corner.",
    },
    {
      question: 'How do I delete a journal entry?',
      answer:
        "Open the entry you want to delete, then scroll to the bottom and tap the 'Delete Entry' button. You'll be asked to confirm before the entry is permanently deleted.",
    },
    {
      question: 'What are the AI insights based on?',
      answer:
        'AI insights analyze your journal entries to identify patterns in your moods and content. The analysis looks at frequently mentioned topics, mood correlations, and trends over time.',
    },
    {
      question: 'Is my journal data private?',
      answer:
        'Yes, your journal data is stored locally on your device by default. If you enable the auto backup feature, your data will be encrypted before being stored in the cloud.',
    },
    {
      question: 'How do I enable dark mode?',
      answer:
        "Go to Settings and toggle the 'Dark Mode' switch. You can also set it to follow your device's system settings.",
    },
    {
      question: 'Can I export my journal data?',
      answer:
        "Yes, go to Settings and tap 'Export Data' to export all your journal entries as a file that you can save or share.",
    },
    {
      question: 'How do I set up daily reminders?',
      answer:
        "Go to Settings and enable 'Daily Reminders'. You can customize the time you want to receive notifications.",
    },
  ];

  return (
    <Container>
      <Stack.Screen options={{ title: 'Help & Support' }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 pt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Help & Support
        </Text>

        <View className="mb-6 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Text className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </Text>

          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </View>

        <View className="mb-6 rounded-lg bg-white p-6 dark:bg-gray-800">
          <Text className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Contact Support
          </Text>
          <Text className="mb-4 text-gray-700 dark:text-gray-300">
            Can't find what you're looking for? Our support team is here to help.
          </Text>

          <View className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/30">
            <Text className="mb-1 font-medium text-gray-900 dark:text-white">Email Support</Text>
            <Text className="text-gray-700 dark:text-gray-300">support@aijournal.app</Text>
          </View>
        </View>

        <Text className="my-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Support hours: Monday to Friday, 9am - 5pm ET
        </Text>
      </ScrollView>
    </Container>
  );
}
