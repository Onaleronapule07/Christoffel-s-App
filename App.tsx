import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from './screen/HomeScreen';
import AddMenuItemScreen from './screen/AddMenuItemScreen';
import { MenuItem, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [screen, setScreen] = useState<ScreenName>('Home');

    const addMenuItem = (item: MenuItem) => {
        setMenuItems((previous: MenuItem[]) => [item, ...previous]);
        setScreen('Home');
    };

    const navigation = {
        navigate: (destination: ScreenName) => setScreen(destination),
        goBack: () => setScreen('Home'),
    };
    const route = { key: screen, name: screen, params: undefined };
    const title = screen === 'Home' ? "Christoffel's Menu" : 'Add Menu Item';
    const Screen = screen === 'Home' ? HomeScreen : AddMenuItemScreen;
    const screenProps = screen === 'Home'
        ? { navigation, route, menuItems }
        : { navigation, route, onAddItem: addMenuItem };

    return React.createElement(
        NavigationContainer,
        null,
        React.createElement(
            Stack.Navigator,
            {
                initialRouteName: 'Home',
                screenOptions: {
                    headerStyle: { backgroundColor: '#00C4D1' },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
                },
            },
            React.createElement(
                Stack.Screen,
                { name: 'Home', options: { title: "Christoffel's Menu" } },
                (props: NativeStackScreenProps<RootStackParamList, 'Home'>) =>
                    React.createElement(HomeScreen, { ...props, menuItems }),
            ),
            React.createElement(
                Stack.Screen,
                { name: 'AddMenuItem', options: { title: 'Add Menu Item' } },
                (props: NativeStackScreenProps<RootStackParamList, 'AddMenuItem'>) =>
                    React.createElement(AddMenuItemScreen, { ...props, onAddItem: addMenuItem }),
            ),
        ),
    );
}



