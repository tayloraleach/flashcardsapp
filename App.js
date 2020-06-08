import 'react-native-gesture-handler';

import React from 'react';
import CardStacks from './components/CardStacks';
import {store} from './redux/configureStore';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import CardStackDetail from './components/CardStackDetail';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name="CardStacks"
            options={({navigation, route}) => ({
              title: 'Flash Cards',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CardStackDetail', {
                      intent: 'create',
                      title: 'New Stack',
                    });
                  }}
                  style={styles.button}>
                  <Text>+</Text>
                </TouchableOpacity>
              ),
            })}
            component={CardStacks}
          />
          <Stack.Screen
            options={({route}) => ({title: route.params.title})}
            name={'CardStackDetail'}
            component={CardStackDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = {
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 100,
  },
};
