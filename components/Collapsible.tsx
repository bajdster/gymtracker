import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title, type, selectedExcercise }: PropsWithChildren & { title: string, type?:string, selectedExcercise?:string}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

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
            <Text style={{color:'white'}}>{title}</Text>
            {type && selectedExcercise && <View style={{borderWidth:1, borderColor:'white', padding: 4,}}>
              <Text style={{color:'white'}}>{type}</Text>
              <Text style={{color:'white'}}>{selectedExcercise}</Text>
              </View>}
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
    marginTop: 6,
    marginLeft: 24,
  },
});
