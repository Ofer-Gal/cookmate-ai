import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import IntroHead from '@/components/introHead'
import CreateRecipe from '@/components/CreateRecipe'
import CategoryList from '@/components/CategoryList'
// import {  } from 'react-native-gesture-handler'


const Home = () => {
    return (
        <ScrollView style={{
            // flex: 1,
            height: '100%',
            backgroundColor: Colors.WHITE,padding: 20
        }}>
            {/* Into */}
            <IntroHead />
            {/* Recipe Generator */}
            <CreateRecipe />
            {/* Category  List 
            <CategoryList />*/}
        </ScrollView>
    )
}
export default Home
const styles = StyleSheet.create({})