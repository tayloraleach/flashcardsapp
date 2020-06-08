import React, {useState} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {addCardStack, updateCardStack, deleteCardStack} from '../redux/reducer';

export const CardStackDetail = ({
  addNewCardStack,
  updateExistingCardStack,
  removeCardStack,
  navigation,
  route,
  cardStacks,
}) => {
  const {intent, cardStack} = route.params;
  const [value, setValue] = useState(intent === 'edit' ? cardStack.title : '');

  const createOrUpdate = intent === 'create' || intent === 'edit';

  const handleDelete = () => {
    removeCardStack(cardStack);
  };

  const handleUpdate = () => {
    if (intent === 'create') {
      if (value !== '') {
        addNewCardStack({
          id: Math.random(),
          cards: [],
          title: value,
        });
      }
    } else if (intent === 'edit') {
      for (let x = 0; x < cardStacks.length; x++) {
        if (cardStacks[x].id === cardStack.id) {
          const updatedStack = {
            title: value,
            id: cardStack.id,
            cards: cardStack.cards,
          };
          updateExistingCardStack(updatedStack);
        }
      }
    }
    navigation.goBack();
  };
  return (
    <View style={styles.root}>
      {createOrUpdate && (
        <>
          <TextInput
            onChangeText={x => setValue(x)}
            value={value}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => handleUpdate()}
            style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}

      {intent === 'edit' && (
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  root: {
    margin: 20,
    flex: 1,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    paddingLeft: 15,
    borderRadius: 4,
  },
  deleteButton: {
    marginTop: 'auto',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
};

const mapStateToProps = state => {
  return {
    cardStacks: state.cardStacks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewCardStack: cardStack => dispatch(addCardStack(cardStack)),
    updateExistingCardStack: cardStack => dispatch(updateCardStack(cardStack)),
    removeCardStack: cardStack => dispatch(deleteCardStack(cardStack)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardStackDetail);
