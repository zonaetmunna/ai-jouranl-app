import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Container } from '~/components/Container';
import { useColorScheme } from '~/lib/useColorScheme';
import { useJournalStore } from '~/store/journalStore';
import { MoodType } from '~/types/journal';

/**
 * MoodSelector component for choosing the mood of the journal entry
 */
const MoodSelector = ({
  selectedMood,
  onSelectMood,
}: {
  selectedMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="my-4 flex-row justify-around">
      <Pressable
        onPress={() => onSelectMood('happy')}
        className={`items-center rounded-full px-4 py-2 ${
          selectedMood === 'happy'
            ? 'bg-green-100 dark:bg-green-900'
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
        <Ionicons
          name="happy-outline"
          size={24}
          color={
            selectedMood === 'happy'
              ? isDark
                ? '#4ade80'
                : '#16a34a'
              : isDark
                ? '#9ca3af'
                : '#6b7280'
          }
        />
        <Text
          className={`mt-1 ${
            selectedMood === 'happy'
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
          Happy
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onSelectMood('neutral')}
        className={`items-center rounded-full px-4 py-2 ${
          selectedMood === 'neutral'
            ? 'bg-blue-100 dark:bg-blue-900'
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
        <Ionicons
          name="help-outline"
          size={24}
          color={
            selectedMood === 'neutral'
              ? isDark
                ? '#60a5fa'
                : '#2563eb'
              : isDark
                ? '#9ca3af'
                : '#6b7280'
          }
        />
        <Text
          className={`mt-1 ${
            selectedMood === 'neutral'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
          Neutral
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onSelectMood('sad')}
        className={`items-center rounded-full px-4 py-2 ${
          selectedMood === 'sad' ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-800'
        }`}>
        <Ionicons
          name="sad-outline"
          size={24}
          color={
            selectedMood === 'sad'
              ? isDark
                ? '#f87171'
                : '#dc2626'
              : isDark
                ? '#9ca3af'
                : '#6b7280'
          }
        />
        <Text
          className={`mt-1 ${
            selectedMood === 'sad'
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
          Sad
        </Text>
      </Pressable>
    </View>
  );
};

/**
 * Journal entry screen for creating and editing entries
 * @returns JSX.Element
 */
export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === 'new';

  const { getEntry, addEntry, updateEntry, deleteEntry } = useJournalStore();
  const existingEntry = !isNew ? getEntry(id) : null;

  const [title, setTitle] = useState(existingEntry?.title || '');
  const [content, setContent] = useState(existingEntry?.content || '');
  const [mood, setMood] = useState<MoodType>(existingEntry?.mood || 'neutral');
  const [tags, setTags] = useState<string[]>(existingEntry?.tags || []);
  const [isEditing, setIsEditing] = useState(isNew);

  /**
   * Save the journal entry
   */
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your journal entry.');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Missing Content', 'Please write something in your journal entry.');
      return;
    }

    if (isNew) {
      addEntry(title, content, mood, tags);
      router.replace('/');
    } else if (existingEntry) {
      updateEntry(id, { title, content, mood, tags });
      setIsEditing(false);
    }
  };

  /**
   * Delete the journal entry with confirmation
   */
  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEntry(id);
            router.replace('/');
          },
        },
      ]
    );
  };

  if (!isNew && !existingEntry) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <Text className="mb-4 text-xl text-gray-800 dark:text-gray-200">Entry not found</Text>
          <Pressable
            onPress={() => router.replace('/')}
            className="rounded-lg bg-indigo-600 px-4 py-2">
            <Text className="font-medium text-white">Go Back</Text>
          </Pressable>
        </View>
      </Container>
    );
  }

  return (
    <Container className="flex-1">
      <Stack.Screen
        options={{
          title: isNew ? 'New Entry' : isEditing ? 'Edit Entry' : existingEntry?.title || 'Entry',
          headerRight: () =>
            isEditing ? (
              <Pressable onPress={handleSave} className="px-3 py-1">
                <Text className="font-medium text-indigo-600 dark:text-indigo-400">Save</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setIsEditing(true)} className="px-3 py-1">
                <Text className="font-medium text-indigo-600 dark:text-indigo-400">Edit</Text>
              </Pressable>
            ),
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled">
        {!isNew && !isEditing && existingEntry ? (
          // View mode
          <View className="px-4 pt-2">
            <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {existingEntry.title}
            </Text>

            <View className="mb-4 flex-row items-center">
              <Text className="text-gray-500 dark:text-gray-400">
                {format(new Date(existingEntry.createdAt), 'MMMM dd, yyyy • hh:mm a')}
              </Text>
              <View
                className={`ml-2 flex-row items-center rounded-full px-2 py-1 ${
                  existingEntry.mood === 'happy'
                    ? 'bg-green-100 dark:bg-green-900'
                    : existingEntry.mood === 'neutral'
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'bg-red-100 dark:bg-red-900'
                }`}>
                <Ionicons
                  name={
                    existingEntry.mood === 'happy'
                      ? 'happy-outline'
                      : existingEntry.mood === 'neutral'
                        ? 'help-outline'
                        : 'sad-outline'
                  }
                  size={14}
                  color={
                    existingEntry.mood === 'happy'
                      ? '#16a34a'
                      : existingEntry.mood === 'neutral'
                        ? '#2563eb'
                        : '#dc2626'
                  }
                />
                <Text
                  className={`ml-1 text-sm ${
                    existingEntry.mood === 'happy'
                      ? 'text-green-700 dark:text-green-300'
                      : existingEntry.mood === 'neutral'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-red-700 dark:text-red-300'
                  }`}>
                  {existingEntry.mood.charAt(0).toUpperCase() + existingEntry.mood.slice(1)}
                </Text>
              </View>
            </View>

            {existingEntry.tags.length > 0 && (
              <View className="mb-4 flex-row flex-wrap">
                {existingEntry.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="mb-2 mr-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                    <Text className="text-sm text-gray-700 dark:text-gray-300">#{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text className="mb-6 leading-6 text-gray-800 dark:text-gray-200">
              {existingEntry.content}
            </Text>

            <Pressable
              onPress={handleDelete}
              className="mt-4 flex-row items-center justify-center rounded-lg bg-red-100 px-4 py-2 dark:bg-red-900/30">
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
              <Text className="ml-2 font-medium text-red-600 dark:text-red-400">Delete Entry</Text>
            </Pressable>
          </View>
        ) : (
          // Edit/Create mode
          <View className="px-4 pt-2">
            <TextInput
              className="mb-4 rounded-lg bg-gray-100 p-2 text-xl font-bold text-gray-900 dark:bg-gray-800 dark:text-white"
              placeholder="Title"
              placeholderTextColor="#9ca3af"
              value={title}
              onChangeText={setTitle}
            />

            <MoodSelector selectedMood={mood} onSelectMood={setMood} />

            <TextInput
              className="min-h-[200px] rounded-lg bg-gray-100 p-4 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              placeholder="What's on your mind today?"
              placeholderTextColor="#9ca3af"
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

            {!isNew && (
              <Pressable
                onPress={handleDelete}
                className="mt-8 flex-row items-center justify-center rounded-lg bg-red-100 px-4 py-2 dark:bg-red-900/30">
                <Ionicons name="trash-outline" size={18} color="#ef4444" />
                <Text className="ml-2 font-medium text-red-600 dark:text-red-400">
                  Delete Entry
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </ScrollView>

      {isEditing && (
        <View className="border-t border-gray-200 p-4 dark:border-gray-700">
          <Pressable onPress={handleSave} className="items-center rounded-lg bg-indigo-600 py-3">
            <Text className="font-medium text-white">Save Entry</Text>
          </Pressable>
        </View>
      )}
    </Container>
  );
}
