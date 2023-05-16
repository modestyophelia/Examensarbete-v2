import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ContraceptivesScreen from './ContraceptivesScreen'
import CoppercoilScreen from './CoppercoilScreen'
import BirthControlpillsScreen from './BirthControlpillsScreen'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ImplantScreen from './ImplantScreen';
import HormonalIUDScreen from './HormonalIUDScreen';
import OtherScreen from './OtherScreen';

const Stack = createStackNavigator();

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authUser ? (
          <>
            <Stack.Screen
              name="Contraceptives"
              component={ContraceptivesScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Copper coil"
              component={CoppercoilScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Birth Control pills"
              component={BirthControlpillsScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Implant"
              component={ImplantScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Hormonal IUD"
              component={HormonalIUDScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Other"
              component={OtherScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Sign in"
              component={SignIn}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Sign up"
              component={SignUp}
              options={{
                headerStyle: {
                  backgroundColor: '#5CCFBA',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
