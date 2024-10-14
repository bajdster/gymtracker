import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { trainings } from '@/constants/Excercises';

export function Collapsible({ children, title, type, selectedExcercise }: PropsWithChildren & { title: string, type?:string, selectedExcercise?:string}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const getTrainingText = (type: string) => {
    const training = trainings.find(training => training.trainingType === type);
    return training ? training.text : title;
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        {(!type && !selectedExcercise) && <Text style={{ color: 'white', fontWeight: 'bold' }}>{getTrainingText(title)}</Text>}
        
        {type && <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>}
        {type && selectedExcercise && (
          //combination with types ^ because of using collapsible defferent in history and historyShort
          <View style={{ borderWidth: 1, borderColor: 'white', padding: 4, width: '70%', marginBottom: 10, borderRadius: 4 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{getTrainingText(type)}</Text>
            <Text style={{ color: 'white' }}>{selectedExcercise}</Text>
          </View>
        )}
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginLeft: 24,
    marginTop: 2,
  },
});
