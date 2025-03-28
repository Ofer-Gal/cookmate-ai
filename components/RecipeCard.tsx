import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import { LinearGradient } from 'expo-linear-gradient';

const RecipeCard = (item: any) => {
    return (
        <View style={styles.container}>

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

        </View>
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
        fontSize:16
    }
})