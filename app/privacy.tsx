import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Container } from '~/components/Container';

/**
 * Privacy Policy section component
 */
const PolicySection = ({ title, content }: { title: string; content: string | string[] }) => {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</Text>
      {typeof content === 'string' ? (
        <Text className="leading-6 text-gray-700 dark:text-gray-300">{content}</Text>
      ) : (
        content.map((paragraph, idx) => (
          <Text key={idx} className="mb-2 leading-6 text-gray-700 dark:text-gray-300">
            {paragraph}
          </Text>
        ))
      )}
    </View>
  );
};

/**
 * Privacy Policy screen
 * @returns JSX.Element
 */
export default function PrivacyPolicyScreen() {
  const policies = [
    {
      title: 'Introduction',
      content: [
        'AI Journal is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.',
        'By using the app, you agree to the collection and use of information in accordance with this policy.',
      ],
    },
    {
      title: 'Information Collection',
      content: [
        'We collect the following types of information:',
        '• Journal entries, including text, mood data, and tags that you create in the app',
        '• User preferences and settings',
        '• Device information such as operating system version and device type',
        '• Usage data to improve our services',
      ],
    },
    {
      title: 'Data Storage',
      content:
        'All your journal entries are stored locally on your device by default. If you enable cloud backup, your data will be encrypted before being uploaded to our secure servers.',
    },
    {
      title: 'Data Usage',
      content:
        'We use your data to provide and improve our services. This includes generating personalized insights, maintaining and enhancing the app, and developing new features.',
    },
    {
      title: 'AI Features',
      content:
        'When you use our AI-powered features, your journal data is processed to generate insights and patterns. This processing is done with strict privacy controls and your data is not shared with third parties.',
    },
    {
      title: 'Data Sharing',
      content:
        'We do not sell your personal data to third parties. We may share anonymous, aggregated data for research or analytical purposes, but this data cannot be used to identify you.',
    },
    {
      title: 'Data Security',
      content:
        'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      title: 'Your Rights',
      content: [
        'You have the right to:',
        '• Access your personal data',
        '• Export your journal entries',
        '• Delete your data from our servers',
        '• Opt out of certain data collection',
      ],
    },
    {
      title: 'Policy Updates',
      content:
        'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the app.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have any questions about this Privacy Policy, please contact us at privacy@aijournal.app.',
    },
  ];

  return (
    <Container>
      <Stack.Screen options={{ title: 'Privacy Policy' }} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mb-6 pt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </Text>

        <Text className="mb-6 text-gray-500 dark:text-gray-400">Last updated: June 15, 2023</Text>

        {policies.map((policy, index) => (
          <PolicySection key={index} title={policy.title} content={policy.content} />
        ))}

        <Text className="my-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023 AI Journal. All rights reserved.
        </Text>
      </ScrollView>
    </Container>
  );
}
