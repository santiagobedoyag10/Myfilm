import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
  title: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

class PlayButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: 'gray',
      isLoading: true,
      uri: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const db = getFirestore();

    try {
      const docRef = doc(db, 'Teaser', id.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.Uri) {
          this.setState({
            color: 'red',
            uri: data.Uri,
          });
        } else {
          this.setState({ color: 'gray' });
        }
      } else {
        this.setState({ color: 'gray' });
      }
    } catch (error) {
      console.error('Error al consultar Firestore:', error);
      this.setState({ color: 'gray' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handlePress = () => {
    const { navigation, title } = this.props;
    const { uri } = this.state;

    if (uri) {
      navigation.navigate('Player', {
        item: title,
        uri: uri,
      });
    } else {
      Alert.alert('No Disponible', 'Este teaser no está disponible.');
    }
  };

  render() {
    const { color, isLoading } = this.state;

    return (
      <Pressable onPress={this.handlePress} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : (
          <Icon name="caret-forward-circle" size={70} color={color} />
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});

PlayButton.propTypes = propTypes;

export default PlayButton;
