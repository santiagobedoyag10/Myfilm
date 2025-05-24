import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/native";

const placeholderImage = require('../assets/images/placeholder.jpg');

const propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};

class Card extends React.PureComponent {
  render() {
    const { navigation, item } = this.props;
    
    
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
      <TouchableOpacity 
        onPress={() => {
          if (navigation && navigation.navigate) {
            navigation.navigate('Detail', {
              movieID: item.id,
              title: item.title || item.name
            });
          }
        }
      }
        style={styles.container}
      >
        <Image 
          resizeMode='cover'
          style={styles.image}
          source={
            item.poster_path
              ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }
              : placeholderImage
          } 
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title || item.name || 'Sin título'}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 8,
    width: 130,
    
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
    
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
    
  }
});

Card.propTypes = propTypes;

export default Card;