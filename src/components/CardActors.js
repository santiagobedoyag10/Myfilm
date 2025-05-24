import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/native";

const placeholderImage = require('../assets/images/placeholder.jpg');

const propTypes = {
  item: PropTypes.object,
};

class CardActors extends React.PureComponent {
  render() {
    const {item} = this.props;
    
    if (!item) {
      return (
        <View style={styles.container}>
          <Image 
            resizeMode='cover'
            style={styles.image}
            source={placeholderImage} 
          />
          <Text style={styles.movieName}>No disponible</Text>
        </View>
      );
    }
    
    return (
        <View
        style={styles.container}
      >
        <Image 
          resizeMode='cover'
          style={styles.image}
          source={
            item.profile_path
              ? { uri: 'https://image.tmdb.org/t/p/w500' + item.profile_path }
              : placeholderImage
          } 
        />
        <Text style={styles.movieName}>{item.name}</Text>
        <Text style={styles.characterName}>{item.character}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: 140,
      marginHorizontal: 2,
    },
    image: {
      height: 160,
      width: 120,
      borderRadius: 12,
    },
    movieName: {
      marginTop: 6,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
    },
    characterName: {
      marginTop: 2,
      fontSize: 12,
      color: '#111',
      textAlign: 'center',
    }
  });
  

CardActors.propTypes = propTypes;

export default CardActors;