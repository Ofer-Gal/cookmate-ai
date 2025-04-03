import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import { GetRecipesByCategoryOrLimit, GetSavedFavorites } from '@/services/GlobalApi'
import { UserContext } from '@/context/UserContext'
import RecipeCard from '@/components/RecipeCard'
import Ionicons from '@expo/vector-icons/Ionicons'


const Cookbook = () => { //My Recipes
    const [recipeList, setRecipeLists] = React.useState([])
    const { user } = React.useContext(UserContext)
    const [activeTab, setActiveTab] = React.useState(1)
    
    const getMyRecipes = async () => {
        setRecipeLists(await GetRecipesByCategoryOrLimit('user', user?.email))        
    }
    const getSavedFavorites = async () => {
        setRecipeLists(await GetSavedFavorites(user?.email));
    }

    React.useEffect(() => {
        getMyRecipes()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cookbook</Text>
            <View style={[styles.tabConatiner, { marginBottom: 6, gap: 10 }]} >
                <TouchableOpacity onPress={() => {
                    getMyRecipes()
                    setActiveTab(1)
                }} style={[styles.tabConatiner, {opacity: activeTab === 1 ? 1 : 0.4}]} >
                    <Ionicons name="sparkles-sharp" size={24} color="black" />
                    <Text style={styles.tabText}>My Recipes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    getSavedFavorites()
                    setActiveTab(2)
                }} style={[styles.tabConatiner, { opacity: activeTab === 2 ? 1 : 0.4}]} >
                    <Ionicons name="bookmark" size={24} color="black" />
                    <Text style={styles.tabText}>Favorite Recipes</Text>
                </TouchableOpacity>
            </View >

            <FlatList data={recipeList}
                renderItem={({ item, index }: any) => {
                    return (
                        <View style={{ flex: 1 }} key={index}>
                            <RecipeCard item={item} />
                        </View>
                    )
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
export default Cookbook
const styles = StyleSheet.create({
    tabConatiner: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        
    },
    tabText: {
        fontFamily:'outfit' ,fontSize:20   
    },
    container: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 15,
    }
})