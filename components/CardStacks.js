import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const CardStacks = ({cardStacks, navigation}) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={cardStacks}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            {/* <View style={styles.fakeCard} /> */}
            <CardItem
              navigation={navigation}
              title={item.title}
              cardStack={item}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const CardItem = ({title, navigation, cardStack}) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        navigation.navigate('CardStackDetail', {
          intent: 'edit',
          title,
          cardStack,
        });
      }}
      onPress={() => {
        navigation.navigate('CardStackDetail', {
          intent: 'update',
          title,
        });
      }}
      style={styles.item}>
      <Text style={styles.large}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  fakeCard: {
    backgroundColor: 'blue',
    transform: [{rotate: '3deg'}],
    borderRadius: 4,
    elevation: 4,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  root: {
    padding: 20,
    backgroundColor: '#efefef',
    flex: 1,
  },
  large: {
    fontSize: 20,
  },
  itemContainer: {
    position: 'relative',
  },
  item: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 4,
    padding: 30,
  },
};

const mapStateToProps = state => {
  return {
    cardStacks: state.cardStacks,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardStacks);
