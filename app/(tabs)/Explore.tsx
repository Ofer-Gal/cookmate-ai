import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import { GetRecipesByCategoryOrLimit } from '@/services/GlobalApi'
import RecipeCard from '@/components/RecipeCard'
// import { UserContext } from '@/context/UserContext'

const Explore = () => { //All recipes

    // const { user, setUser } = React.useContext(UserContext)
    const [recipeList, setRecipeList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState(1)

    const fetchRecipes = async () => {
        const res = await GetRecipesByCategoryOrLimit('', '')
        setLoading(true)
        setRecipeList(res)
        setLoading(false)
    }

    React.useEffect(() => {
        fetchRecipes();
    }, [])



    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore</Text>
            <FlatList
                data={recipeList}
                refreshing={loading}
                // onRefresh={GetRecipeByCategory}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flex: 1 }} key={index}>
                            <RecipeCard item={item} />
                        </View>
                    )
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any) => item.documentId}
            />
        </View>
    )
}
export default Explore
const styles = StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 15,
    }

})

/**
 * {
                // flex: 1,
                height: '100%',
                backgroundColor: Colors.WHITE,
                // justifyContent: 'center', alignItems: 'center'>
            }
 */