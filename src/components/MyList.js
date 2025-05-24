import * as React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

class MyList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      iconName: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.checkIfMovieIsInList();
  }

  checkIfMovieIsInList = async () => {
    const { user, id } = this.props;
    const db = getFirestore();
    const docRef = doc(db, 'Lists', user.email);

    try {
      const docSnap = await getDoc(docRef);
      let movieList = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        movieList = Array.isArray(data.Movies) ? data.Movies : [];
      }

      const isInList = movieList.includes(id);
      this.setState({
        iconName: isInList ? 'check' : 'plus',
        isLoading: false,
      });

    } catch (error) {
      console.log('Error al consultar Firestore:', error);
      this.setState({ iconName: 'plus', isLoading: false });
    }
  };

  doPlusAction = async () => {
    const { user, id } = this.props;
    const db = getFirestore();
    const docRef = doc(db, 'Lists', user.email);

    try {
      const docSnap = await getDoc(docRef);
      let movieList = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        movieList = Array.isArray(data.Movies) ? data.Movies : [];
      }

      if (!movieList.includes(id)) {
        movieList.push(id);
        await updateDoc(docRef, { Movies: movieList });
        console.log('Película agregada.');
      } else {
        console.log('Película ya existe.');
      }
    } catch (error) {
      console.log('Error al agregar película:', error);
    }
  };

  doCheckAction = async () => {
    const { user, id } = this.props;
    const db = getFirestore();
    const docRef = doc(db, 'Lists', user.email);

    try {
      const docSnap = await getDoc(docRef);
      let movieList = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        movieList = Array.isArray(data.Movies) ? data.Movies : [];
      }

      const updatedList = movieList.filter((movieID) => movieID !== id);
      await updateDoc(docRef, { Movies: updatedList });
      console.log('Película eliminada.');
    } catch (error) {
      console.log('Error al eliminar película:', error);
    }
  };

  handlePress = async () => {
    const { iconName } = this.state;

    if (iconName === 'plus') {
      await this.doPlusAction();
      this.setState({ iconName: 'check' });
    } else {
      await this.doCheckAction();
      this.setState({ iconName: 'plus' });
    }
  };

  render() {
    const { iconName, isLoading } = this.state;

    if (isLoading) {
      return (
        <Pressable style={styles.button}>
          <ActivityIndicator size="large" color="gray" />
        </Pressable>
      );
    }

    return (
      <Pressable onPress={this.handlePress} style={styles.button}>
        <Icon name={iconName} size={60} color={'black'} />
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

export default MyList;
