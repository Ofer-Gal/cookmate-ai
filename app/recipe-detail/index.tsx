import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useContext } from 'react'
// import { useLocalSearchParams } from 'expo-router';
import { RecipeContext } from '@/context/UserContext';
import RecipeIntro from '@/components/RecipeIntro';
import Colors from '@/services/Colors';
import Ingredient from '@/components/Ingredient';
import RecipeSteps from '@/components/RecipeSteps'; 
import CreateRecipe from '@/components/CreateRecipe';

const RecipeDetail = () => {
    // const { recipeData } = useLocalSearchParams();
    // console.log(recipeData, 'recipeData');
    // const recipe = JSON.parse(recipeData as string);
    const { recipe, setRecipe } = useContext(RecipeContext);
    return (
        <FlatList data={[]}
            renderItem={() => null}
            ListHeaderComponent={
                <View style={styles.container}>
                    <RecipeIntro recipe={recipe} />
                    <Ingredient ingredients={recipe.ingredients} />
                    <RecipeSteps steps={recipe.steps} />
                    <Text style={styles.text}
                    > You are looking for something else? Create a new One</Text>
                    <CreateRecipe />
                </View>}
        />
    )
}

export default RecipeDetail

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        height: '100%',
        backgroundColor: Colors.WHITE,
        padding: 20
    },
    text: {
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15,
        textAlign: 'center',
        color: Colors.GRAY
    }
})
