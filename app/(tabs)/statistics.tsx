import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { fetchAllTrainings } from '@/lib/trainingManagement';

const Statistics = () => {
  interface RepsState {
    weight: number;
    reps: number;
  }

  interface Training {
    date: string;
    id: string;
    repsState: RepsState[];
    selectedExercise: string;
    trainingType: string;
  }
  
  const [allTrainings, setAllTrainings] = useState<Training[]>([]);
  const [sortedByType, setSortedByType] = useState<any>([])
  const [isLoading, setIsLoading]= useState<Boolean>(true)

  const getAllTrainings = async () => {
    setIsLoading(true)
    const response = await fetchAllTrainings();
    
    if (response) {
      const sorted: Training[] = response.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });
      setAllTrainings(sorted);
    } else {
      setAllTrainings([]);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    getAllTrainings();
    console.log(allTrainings);
  }, []);

  const lastDaysTrainings = (days: number) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);
  
    const allTrainingsArray = Object.values(allTrainings);
  
    const filteredTrainings = allTrainingsArray.filter((training) => {
      const trainingDate = new Date(training.date);
      return trainingDate >= pastDate;
    });
  
    return filteredTrainings;
  };

  const trainingTypes = ['chest', 'back', 'shoulder', 'legs', 'biceps', 'triceps', 'abs', 'pullups', 'running'];

  const getSortedTrainingsByType = () => {
    const sortedByType: any = {};

    trainingTypes.forEach((type) => {
      sortedByType[type] = allTrainings.filter((training) => training.trainingType === type);
    });
  
    return sortedByType;
  }
  
  useEffect(() => {
    if (allTrainings.length > 0) {
      const groupedTrainings = getSortedTrainingsByType();
      setSortedByType(groupedTrainings);
      console.log(groupedTrainings); 
    }
  }, [allTrainings]);

  return (
    <View style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Statystyki</Text>
      </View>
      <View>
        <Text style={{color:'white'}}>Wszystkie dodane treningi: {allTrainings.length}</Text>
        <Text style={{color:'white'}}>Odbyte treningi w ciągu ostatnich 7 dni: {lastDaysTrainings(7).length}</Text>
        <Text style={{color:'white'}}>Odbyte treningi w ciągu ostatnich 14 dni: {lastDaysTrainings(14).length}</Text>
        <View style={styles.trainingsStats}>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Klatka</Text>
            <Text style={{color:'white'}}>{sortedByType.chest.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Plecy </Text>
            <Text style={{color:'white'}}>{sortedByType.back.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Barki</Text>
            <Text style={{color:'white'}}>{sortedByType.shoulder.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Triceps</Text>
            <Text style={{color:'white'}}>{sortedByType.triceps.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Nogi</Text>
            <Text style={{color:'white'}}>{sortedByType.legs.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Biceps</Text>
            <Text style={{color:'white'}}>{sortedByType.biceps.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Brzuch</Text>
            <Text style={{color:'white'}}>{sortedByType.abs.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Drążek</Text>
            <Text style={{color:'white'}}>{sortedByType.pullups.length}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={{color:'white'}}>Bieganie</Text>
            <Text style={{color:'white'}}>{sortedByType.running.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Statistics

const styles = StyleSheet.create({
  homeMainBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  homePageSection: {
    width: '100%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 4,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  trainingDetails:{
    backgroundColor:'#393e46',
    padding:4,
    borderRadius:4,
    width:'90%',
    marginBottom:4
  },
  trainingsStats:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  tableCell:{
    width:"33%",
    padding:4,
    borderRadius:2,
    borderWidth:1,
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center'
  }
})