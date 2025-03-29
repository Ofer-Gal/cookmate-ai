import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const RecipeIntro = ({recipe}: any) => {
    return (
        <View>
            <Image source={{ uri: recipe?.recipeImage }}
                style={styles.image}
            />
            <Text style={styles.text}>{recipe?.recipeName}</Text>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{recipe?.description}</Text>

                <View style={styles.sameLine}>
                    <View style={styles.featureContainer}>
                        <Ionicons name="leaf" size={18} color={Colors.PRIMARY} />
                        <View>
                            <Text style={[styles.description, styles.values]}>{recipe?.calories} Cal</Text>
                            <Text style={styles.text}>Calories</Text>
                        </View>
                    </View>
                    <View style={styles.featureContainer}>
                        <Ionicons name="timer" size={18} color={Colors.PRIMARY} />
                        <View>
                            <Text style={[styles.description, styles.values]}>{recipe?.cookTime} Min</Text>
                            <Text style={styles.text}>Time</Text>
                        </View>
                    </View>
                    <View style={styles.featureContainer}>
                        <Ionicons name="people" size={18} color={Colors.PRIMARY} />
                        <View>
                            <Text style={[styles.description, styles.values]}>{recipe?.serveTo} Serves</Text>
                            <Text style={styles.text}>Serve To</Text>
                        </View>
                    </View>
                </View>
            </View>
    )
}

export default RecipeIntro

const styles = StyleSheet.create({
    values: {
        color: Colors.PRIMARY,
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 20,
    },
    text: {
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 7
    },
    label: {
        fontFamily: 'outfit-bold',
        fontSize: 17,
        marginTop: 7
    },
    description: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.GRAY,
        marginTop: 3
    },
    sameLine: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: 5,
        width: '100%',
        borderRadius: 15,
    },
    featureContainer: {
        backgroundColor: Colors.SECONDARY,
        // display: 'flex',
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        borderRadius: 15,
    }
})
