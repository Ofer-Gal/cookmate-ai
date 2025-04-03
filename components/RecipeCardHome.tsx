import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/services/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { RecipeContext } from '@/context/UserContext';

const RecipeCardHome = ({ item }: any) => {
    const router = useRouter();
    const { recipe, setRecipe } = useContext(RecipeContext);
    return (
        // <View style={styles.container}>
        //     <Image source={{ uri: item.recipeImage }}
        //         style={styles.image}
        //     />
        //     {/* <Text>{recipe.recipeName} - {recipe.createdAt}</Text>     */}
        //     <LinearGradient style={styles.textOnImageView}
        //         colors={['transparent', 'rgba(0,0,0,0.8)']}
        //     >
        //         <View>
        //             <Text style={styles.textOnImageText} >{item?.recipeName}</Text>
        //         </View>
        //     </LinearGradient>
        // </View>

        <TouchableOpacity
            onPress={() => {
                setRecipe(item);
                router.push({
                    pathname: `/recipe-detail`,
                })
            }}
            style={styles.container}>
            <Image source={{ uri: item.recipeImage }}
                style={styles.image}
            />
            <LinearGradient style={styles.textOnImageView}
                colors={['transparent', 'rgba(0,0,0,0.8)']}
            >
                <View>
                    <Text style={styles.textOnImageText} >{item?.recipeName}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default RecipeCardHome

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    image: {
        width: 170, height: 120,
        borderRadius: 15,
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
