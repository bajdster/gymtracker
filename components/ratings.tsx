import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RatingProps {
  ratingHandler: (rating: number) => void;
  currentState: number;
}

const Rating: React.FC<RatingProps> = ({ ratingHandler, currentState }) => {
  const [rating, setRating] = useState(currentState);

  // Synchronizacja stanu z propsami
  useEffect(() => {
    setRating(currentState);
  }, [currentState]);

  const rateTraining = (star: number) => {
    setRating(star);
    ratingHandler(star);
  };

  return (
    <>
      <Text style={{ padding: 10, color:'white' }}>Oceń trening</Text>
      <View style={styles.container}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => rateTraining(star)}>
            <Icon
              name="star"
              size={35}
              color={star <= rating ? 'gold' : 'gray'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
});
