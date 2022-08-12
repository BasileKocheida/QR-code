import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DecodeScreen from './screens/DecodeScreen';
import { NativeBaseProvider } from 'native-base';

//NAVIGATION

function EncodeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>EncodeScreen</Text>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HistoryScreen</Text>
    </View>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator()
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Decode') {
                  iconName = focused
                    ? 'qr-code'
                    : 'qr-code-outline';
                  } else if (route.name === 'Encode') {
                    iconName = focused ? 'qr-code-sharp' : 'qr-code-sharp';
                  } else if (route.name === 'History'){
                  iconName = focused ? '' : 'list';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })} >
          <Tab.Screen name="Decode" component={DecodeScreen} />
          <Tab.Screen name="Encode" component={EncodeScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
