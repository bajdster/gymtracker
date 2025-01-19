import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { trainings } from '@/constants/Excercises';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Collapsible({ children, title, type, selectedExcercise, rating }: PropsWithChildren & { title: string, type?:string, selectedExcercise?:string, rating:number}) {
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
          <View style={{ padding: 4, width: '64%', marginBottom: 10, borderRadius: 4}}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{getTrainingText(type)}</Text>
            <Text style={{ color: 'white' }}>{selectedExcercise}</Text>
          </View>
        )}
              {rating && 
              <View style={{width:'10%', flexDirection:"row", alignItems:'center'}}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginRight:1}}>{rating? rating : ''}</Text>
                  <Icon name="star" size={10} color={'gold'}/>
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
    marginLeft: 24,
    marginTop: 2,
  },
});
