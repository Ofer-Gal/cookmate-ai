import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import { GetRecipesByCategoryOrLimit } from '@/services/GlobalApi'
import RecipeCardHome from './RecipeCardHome'

const LatestRecipes = () => {

    const [recipeList, setRecipeList] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const fetchRecipes = async () => {
        setLoading(true)
        const res = await GetRecipesByCategoryOrLimit('limit','6')
        setRecipeList(res)
        setLoading(false)
    }

    React.useEffect(() => {
        fetchRecipes()
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Latest Recipes</Text>
            <FlatList
                data={recipeList}
                refreshing={loading}
                horizontal={true}
                // onRefresh={GetRecipeByCategory}
                renderItem={({ item, index }:any) => {
                    return (
                        <View >
                            <RecipeCardHome item={item} />        
                        </View>
                    )
                }}
                // numColumns={2}
                showsVerticalScrollIndicator={false}
            />


        </View>
    )
}

export default LatestRecipes

const styles = StyleSheet.create({

    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 15,
    }
})