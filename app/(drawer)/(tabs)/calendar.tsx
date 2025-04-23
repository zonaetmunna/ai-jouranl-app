import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

import { Container } from '~/components/Container';
import { useColorScheme } from '~/lib/useColorScheme';
import { useJournalStore } from '~/store/journalStore';
import { MarkedDates } from '~/types/calendar';
import { JournalEntry } from '~/types/journal';

/**
 * Calendar screen component to view journal entries by date
 * @returns JSX.Element
 */
export default function CalendarScreen() {
  const { entries } = useJournalStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Group entries by date for the calendar view
  const markedDates: MarkedDates = entries.reduce((acc: MarkedDates, entry) => {
    const dateKey = format(new Date(entry.createdAt), 'yyyy-MM-dd');

    const dotColor =
      entry.mood === 'happy' ? '#16a34a' : entry.mood === 'neutral' ? '#2563eb' : '#dc2626';

    if (acc[dateKey]) {
      acc[dateKey].dots = [...(acc[dateKey].dots || []), { color: dotColor }];
    } else {
      acc[dateKey] = {
        dots: [{ color: dotColor }],
      };
    }

    return acc;
  }, {});

  // Add special marking for selected date
  const markedDatesWithSelection: MarkedDates = {
    ...markedDates,
    [selectedDate]: {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: isDark ? '#3b82f6' : '#60a5fa',
    },
  };

  // Filter entries for the selected date
  const entriesForSelectedDate = entries.filter(
    (entry) => format(new Date(entry.createdAt), 'yyyy-MM-dd') === selectedDate
  );

  const renderItem = useCallback(
    ({ item }: { item: JournalEntry }) => (
      <Pressable
        onPress={() => router.push(`/entry/${item.id}`)}
        className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</Text>
          <View
            className={
              item.mood === 'happy'
                ? 'h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'
                : item.mood === 'neutral'
                  ? 'h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'
                  : 'h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900'
            }>
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
          {format(new Date(item.createdAt), 'hh:mm a')}
        </Text>
      </Pressable>
    ),
    []
  );

  return (
    <Container>
      <View className="pb-6 pt-2">
        <Text className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Calendar</Text>

        <Calendar
          theme={{
            calendarBackground: isDark ? '#1f2937' : '#ffffff',
            textSectionTitleColor: isDark ? '#e5e7eb' : '#374151',
            dayTextColor: isDark ? '#e5e7eb' : '#374151',
            todayTextColor: '#3b82f6',
            selectedDayTextColor: '#ffffff',
            monthTextColor: isDark ? '#e5e7eb' : '#374151',
            textDisabledColor: isDark ? '#6b7280' : '#d1d5db',
            arrowColor: isDark ? '#e5e7eb' : '#3b82f6',
          }}
          markingType="multi-dot"
          markedDates={markedDatesWithSelection}
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        />

        <View className="mt-4">
          <Text className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {format(new Date(selectedDate), 'MMMM dd, yyyy')}
          </Text>

          {entriesForSelectedDate.length > 0 ? (
            <FlatList
              data={entriesForSelectedDate}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-10"
            />
          ) : (
            <View className="items-center py-10">
              <Ionicons name="calendar-outline" size={48} color="#aaa" />
              <Text className="mt-4 text-center text-gray-500 dark:text-gray-400">
                No journal entries for this date.
              </Text>
              <Pressable
                onPress={() => router.push('/entry/new')}
                className="mt-4 flex-row items-center rounded-lg bg-indigo-600 px-4 py-2">
                <Ionicons name="add" size={20} color="#fff" />
                <Text className="ml-2 font-medium text-white">Create Entry</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
}
