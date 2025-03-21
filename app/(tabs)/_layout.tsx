import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


const myTabIcon = (focused: boolean , iconText:string) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ backgroundColor: focused ? 'black' : 'white' }}>{iconText}</Text>
        </View>
    )
}


const TabLayOut = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='Home' options={{
                tabBarIcon: ({ focused }) => (
                    myTabIcon(focused, '🏠')
                )
            }} />
            <Tabs.Screen name='Explore' options={{
                tabBarIcon: ({ focused }) => (
                    myTabIcon(focused, '🔍')
                )
            }} />
            <Tabs.Screen name='Cookbook' options={{
                tabBarIcon: ({ focused }) => (
                    myTabIcon(focused, '📚')
                )
            }} />            
            <Tabs.Screen name='Profile' options={{
                tabBarIcon: ({ focused }) => (
                    myTabIcon(focused, '🧛')
                )
            }}/>
        </Tabs>
    )
}
export default TabLayOut
const styles = StyleSheet.create({})