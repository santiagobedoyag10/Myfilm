import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/native";

const placeholderImage = require('../assets/images/placeholder.jpg');

const propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};

const width= Dimensions.get('screen').width
const heigth= Dimensions.get('screen').height

class CardCarrusel extends React.PureComponent {
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
    flex: 1,
    position: 'static',
    alignItems: 'center',
    height: heigth / 1.7,
    marginBottom: 8,
    width: width

  },
  image: {
    height: heigth / 1.68,
    width: width/ 1.03,
    borderRadius: 20,
    padding: 5
    
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
    color: 'black'
  },
});

CardCarrusel.propTypes = propTypes;

export default CardCarrusel;