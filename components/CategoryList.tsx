import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { GetCategories } from '@/services/GlobalApi';

export default function CategoryList() {

    const [categories, setCategories] = React.useState<any[]>([]);

    const GetCategoryList = async () => {
        const results = await GetCategories();
        // console.log(results.data);
        // console.log(results.data[0].name, 'results.data[0].name');
        // console.log(results.data[0].image.url, 'results.data[0].image.url');
        setCategories(results?.data);
    }

    React.useEffect(() => {
        GetCategoryList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Category</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Image source={{ uri: item?.image?.url }} style={styles.image} />
                        {/* <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subTitle}>{item.description}</Text> */}
                    </View>
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        width: '100%',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    heading: {
        fontFamily: 'ouyfit-bold',
        fontSize: 17,
        color: 'black',
    },
    image: {
        width: 60,
        height: 60,
    },
    categoryContainer: {
        marginTop: 10,
        flex: 1 , 
        display: 'flex',
        alignItems :'center', //justifyContent: 'space-around' //gap: 100, , padding: 10
        // flexDirection: 'column',
    },
    subTitle: {
        fontSize: 16,
        color: 'black',
    }
})