import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { UserContext } from '@/context/UserContext'
import { RemoveUserFavRecipe, SaveUserFavRecipe } from '@/services/GlobalApi'

const RecipeIntro = ({ recipe }: any) => {
    const [saved, setSaved] = React.useState(false)
    const { user, setUser } = React.useContext(UserContext)
    const [currentFav, setCurrentFav] = React.useState('')

    const saveFavRecipe = async () => {
        const data = {
            userEmail: user?.email,
            recipeDocId: recipe?.documentId
        }
        const res: any = await SaveUserFavRecipe(data);
        console.log(res);
        setCurrentFav(res?.data?.data?.documentId)
        setSaved(true);
        Alert.alert('Saved',"Recipe saved in your cookbook!")
    }

    const removeFavRecipe = async () => {
        const data = {
            userEmail: user?.email,
            recipeDocId: recipe?.documentId
        }
        setSaved(false);
        await RemoveUserFavRecipe(data)
        Alert.alert('Removed', "Recipe Removed from your cookbook!")
    }
    return (
        <View>
            <Image source={{ uri: recipe?.recipeImage }}
                style={styles.image}
            />
            <View style={styles.sameLine}>
                <Text style={styles.text}>{recipe?.recipeName}</Text>
                <TouchableOpacity onPress={() => saved ? removeFavRecipe() : saveFavRecipe()}>
                    <Ionicons name=
                        {saved ? "bookmark" : "bookmark-outline"}
                        size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>

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
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
