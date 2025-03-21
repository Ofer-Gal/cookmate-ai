import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import IntroHead from '@/components/introHead'
import CreateRecipe from '@/components/CreateRecipe'


const Home = () => {
    return (
        <View style={{
            // flex: 1,
            height: '100%',
            backgroundColor: Colors.WHITE,padding: 20
        }}>
            {/* Into */}
            <IntroHead />
            {/* Recipe Generator */}
            <CreateRecipe />
            {/* Recipe List */}
            {/* Category */}
        </View>
    )
}
export default Home
const styles = StyleSheet.create({})