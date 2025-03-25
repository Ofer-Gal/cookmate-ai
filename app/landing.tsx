import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Marquee } from '@animatereactnative/marquee'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Colors from '@/services/Colors'

// import { useLogto } from '@logto/rn';

export default function Langing() {
    // const { signIn, signOut, isAuthenticated } = useLogto();

    const imageList = [
        require('@/assets/images/1.jpg'),
        require('@/assets/images/c1.png'),
        require('@/assets/images/2.jpg'),
        require('@/assets/images/c2.png'),
        require('@/assets/images/3.jpg'),
        require('@/assets/images/c3.png'),
        require('@/assets/images/4.jpg'),
        require('@/assets/images/5.jpg'),
    ]


    return (
        <GestureHandlerRootView>
            <View >
                <Marquee spacing={10} speed={0.7} style={styles.marquee}>
                    <View style={styles.container}>
                        {imageList.map((image, index) => (
                            <Image source={image} style={styles.image} key={index} />
                        ))}
                    </View>
                </Marquee>
                <Marquee spacing={10} speed={0.4} style={styles.marquee}>
                    <View style={styles.container}>
                        {imageList.map((image, index) => (
                            <Image source={image} style={styles.image} key={index} />
                        ))}
                    </View>
                </Marquee>
                <Marquee spacing={10} speed={0.5} style={styles.marquee}>
                    <View style={styles.container}>
                        {imageList.map((image, index) => (
                            <Image source={image} style={styles.image} key={index} />
                        ))}
                    </View>
                </Marquee>
            </View>
            <View style={{
                backgroundColor: Colors.WHITE,
                height: '100%', padding: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30, textAlign: 'center'
                }}>
                    CookMate AI 🥯🔍 | Find, Create & Enjoy Delicious Recipes!
                </Text>
                <Text style={{
                    fontFamily: 'outfit', color: Colors.GRAY,
                    fontSize: 17, textAlign: 'center'
                }} >Generate delicious recipes in seconds with the power of AI🍔 🪄</Text>
                <TouchableOpacity style={styles.button}
                    // onPress={async () => signIn('io.logto://callback')} 
                    onPress={() => console.log('pressed')}
                >
                    <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20 }}>Get Started</Text>
                </TouchableOpacity>

            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 25,

    },
    marquee: {
        transform: [{ rotate: '-4deg' }],
        marginTop: 10,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 10,
        marginTop: 20
    }
})

/*
 {isAuthenticated ? (
        <Button title="Sign out" onPress={async () => signOut()} />
      ) : (
        <Button title="Sign in" onPress={async () => signIn('io.logto://callback')} />
      )}
*/