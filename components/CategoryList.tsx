import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GetCategories } from "@/services/GlobalApi";
import { useRouter } from "expo-router";

export default function CategoryList() {
    const [categories, setCategories] = React.useState<any[]>([]);

    const router = useRouter();
    
    const GetCategoryList = async () => {
        const results = await GetCategories();
        // console.log(results.data);
        // console.log(results.data[0].name, 'results.data[0].name');
        // console.log(results.data[0].image.url, 'results.data[0].image.url');
        setCategories(results?.data);
    };

    React.useEffect(() => {
        GetCategoryList();
    }, []);

    return (
        <View>
            <Text style={styles.heading}>Category</Text>
            <View style={styles.container}>
                {categories && categories.map((item) => (
                    <TouchableOpacity style={styles.categoryContainer} key={item.id}
                        onPress={() => { 
                            router.push( {
                                pathname: '/recipe-by-category',
                                params: {
                                    categoryName:item?.name
                                },
                            });
                        }}
                    >
                        <Image
                            source={{ uri: item?.image?.url }}
                            style={styles.image}
                        />
                        {/*    <Text style={styles.subTitle}>{item.name}</Text>*/}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",
        // alignItems: "center",
        // justifyContent: "center",
        // : 1,
        marginTop: 10,
        width: "100%",
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    categoryContainer: {
        margin: 10,
        // flex: 1,
        //alignItems: "center", justifyContent: 'space-around' //gap: 100, , padding: 10
        // flexDirection: 'column',
    },
    heading: {
        fontFamily: "outfit-bold",
        fontSize: 17,
        color: "black",
    },
    image: {
        width: 60,
        height: 60,
    },
    subTitle: {
        fontSize: 16,
        color: "black",
    },
});
