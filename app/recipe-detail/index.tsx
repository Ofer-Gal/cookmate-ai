import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { RecipeContext } from '@/context/UserContext';

const RecipeDetail = () => {
    // const { recipeData } = useLocalSearchParams();
    // console.log(recipeData, 'recipeData');
    // const recipe = JSON.parse(recipeData as string);
    const { recipe, setRecipe } = useContext(RecipeContext);
    return (
        <View>
            <Image source={{ uri: recipe?.recipeImage }}
                style={styles.image}
            />
            <Text>Recipe Detail</Text>
            {/* <Pre>{JSON.stringify(recipe, null, 2)}</Pre> */}

        </View>
    )
}

export default RecipeDetail

const styles = StyleSheet.create({

    image: {
        width: '100%', height: 200,
        borderRadius: 20,
    },
})