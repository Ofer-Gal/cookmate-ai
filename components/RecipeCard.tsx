import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/services/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { RecipeContext } from '@/context/UserContext';

const RecipeCard = (item: any) => {
    const router = useRouter();
    const { recipe, setRecipe } = useContext(RecipeContext);
    return (
        <TouchableOpacity
            onPress={() => {
                setRecipe(item.recipe);
                router.push({
                    pathname: `/recipe-detail`,
                    // params: {
                    //     recipeData: JSON.stringify(item.recipe),
                    // },
                })
            }}
            style={styles.container}>

            <Image source={{ uri: item.recipe?.recipeImage }}
                style={styles.image}
            />
            <LinearGradient style={styles.textOnImageView}
                // Background Linear Gradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
            >
                <View>
                    <Text style={styles.textOnImageText} >{item.recipe?.recipeName}</Text>
                </View>
            </LinearGradient>

        </TouchableOpacity>
    )
}

export default RecipeCard

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    image: {
        width: '100%', height: 220,
        borderRadius: 20,
    },
    textOnImageView: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%',
        borderRadius: 20,
    },
    textOnImageText: {
        color: Colors.WHITE,
        fontFamily: 'outfit',
        fontSize: 16
    }
})
