
import RecipeCard from '@/components/RecipeCard';
import Colors from '@/services/Colors';
import { GetRecipeByCategory } from '@/services/GlobalApi';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Index from '..';

const RecipeByCategory = () => {
    const { categoryName } = useLocalSearchParams();
    const [recipeList, setRecipeLists] = React.useState([])

    const getRecipesByCategory = async () => {
        setRecipeLists(await GetRecipeByCategory(categoryName as string))
    }

    React.useEffect(() => {
        getRecipesByCategory()
    }, [])

    // console.log(categoryName, 'categoryName');
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Browse {categoryName} Recipes </Text>
            <FlatList
                data={recipeList}
                renderItem={({ item  , index }) => {
                    return (
                        <View style={{flex:1}}>
                            <RecipeCard recipe={item} />
                        </View>
                    )
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            // keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default RecipeByCategory;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: '100%',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        // marginBottom: 16,
    },
});
