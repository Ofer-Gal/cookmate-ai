import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'expo-router'

const Profile = () => {
    const { user, setUser } = React.useContext(UserContext)
    const router = useRouter()
    const options = [
        {
            name: 'Create New Recipe',
            icon: require('@/assets/images/my.png'),
            path: '/(tabs)/Home'
        },
        {
            name: 'My Recipes',
            icon: require('@/assets/images/cookbook.png'),
            path: '/(tabs)/Cookbook'
        },
        {
            name: 'Browse More Recipes',
            icon: require('@/assets/images/more.png'),
            path: '/(tabs)/Explore'
        },
        {
            name: 'Logout',
            icon: require('@/assets/images/logout.png'),
            path: 'logout'
        }
    ]

    function onOptionClick(path: any) {
        if (path === 'logout') {
            setUser(null)
            router.navigate('/');
            // logOut();
        }
        else {
            router.push(path)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.samecolumn}>
                <Image source={{ uri: user?.picture }}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.text}>{user?.name}</Text>
                    <Text style={styles.text}>{user?.email}</Text>
                </View>
            </View>
            <FlatList data={options}
                renderItem={({ item: option, index }: any) => {

                    return (
                        <TouchableOpacity onPress={() => onOptionClick(option.path)}
                            style={styles.row} key={index}>
                            <Image source={option.icon}
                                style={{ width: 30, height: 30 }} />
                            <Text style={styles.text}>{option.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    header: {
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 15,
    },
    text: {
        fontFamily: 'outfit',
        textAlign: 'center',
        fontSize: 20,
    },
    samecolumn: {
        display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        gap: 35,
        padding: 14,
        // borderWidth:0.5
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 99
    }
})

