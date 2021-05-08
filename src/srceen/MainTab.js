import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './Home';
import PrizeBondList from './PrizeBondList';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PrizeBondCheck from './PrizeBondCheck';

const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            activeColor="#F9FAFB"
            inactiveColor="#111827"
            initialRouteName={"Home"}
            shifting={true}

        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => <Icon name={"home"} size={26} color={color} />,
                tabBarColor:"#FBBF24"

            }} />
            <Tab.Screen name="PrizeBondCheck" component={PrizeBondCheck} options={{
                tabBarLabel: "Check Prize",
                tabBarIcon: ({ color }) => <Icon name={"check-decagram"} size={26} color={color} />,
                tabBarColor:"#FBBF24"

            }} />
            <Tab.Screen name="PrizeBondList" component={PrizeBondList} options={{
                tabBarLabel: "Prize Bond List",
                tabBarIcon: ({ color }) => <Icon name={"format-list-bulleted"} size={26} color={color} />,
                tabBarColor:"#FBBF24"

            }} />
            {/* <Tab.Screen name="Settings" component={Settings} options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color }) => <Icon name={"weather-lightning"} size={26} color={color} />,
                tabBarColor:"#FBBF24"

            }} /> */}
        </Tab.Navigator>
    );
}

export default MainTab