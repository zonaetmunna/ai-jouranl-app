import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { cn } from '~/lib/cn';
import { useJournalStore } from '~/store/journalStore';
import { JournalEntry } from '~/types/journal';

export default function JournalScreen() {
  const { entries } = useJournalStore();
  const [searchText, setSearchText] = useState('');

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchText.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = useCallback(
    ({ item }: { item: JournalEntry }) => (
      <Pressable
        onPress={() => router.push(`/entry/${item.id}`)}
        className="mb-4 flex-1 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</Text>
          <View
            className={cn(
              'h-8 w-8 items-center justify-center rounded-full',
              item.mood === 'happy'
                ? 'bg-green-100 dark:bg-green-900'
                : item.mood === 'neutral'
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-red-100 dark:bg-red-900'
            )}>
            <Ionicons
              name={
                item.mood === 'happy'
                  ? 'happy-outline'
                  : item.mood === 'neutral'
                    ? 'help-outline'
                    : 'sad-outline'
              }
              size={18}
              color={
                item.mood === 'happy' ? '#16a34a' : item.mood === 'neutral' ? '#2563eb' : '#dc2626'
              }
            />
          </View>
        </View>
        <Text className="mb-2 text-gray-600 dark:text-gray-300" numberOfLines={3}>
          {item.content}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(item.createdAt), 'MMMM dd, yyyy • hh:mm a')}
        </Text>
      </Pressable>
    ),
    []
  );

  return (
    <Container>
      <View className="flex-row items-center justify-between pb-6 pt-2">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">My Journal</Text>
        <Pressable
          onPress={() => router.push('/entry/new')}
          className="h-12 w-12 items-center justify-center rounded-full bg-indigo-600 shadow-md">
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      {entries.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons name="book-outline" size={64} color="#aaa" />
          <Text className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400">
            You haven't created any journal entries yet.{'\n'}Tap the + button to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-10"
        />
      )}
    </Container>
  );
}
