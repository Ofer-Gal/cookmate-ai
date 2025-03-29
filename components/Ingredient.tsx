import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'

const Ingredient = ({ ingredients }: any) => {
    return (
        <View style={styles.top}>
            <View style={styles.topText}>
                <Text style={styles.textBold}>Ingredients </Text>
                <Text style={styles.text}>{ingredients.length} Items</Text>
            </View>
            <FlatList data={ingredients}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text style={styles.itemicon}>{item.icon}</Text>
                            <Text style={styles.itemingrid}>{item.ingredient}</Text>
                        </View>
                        <Text style={styles.itemquantity}>{item.quantity}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default Ingredient

const styles = StyleSheet.create({
    row: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10, padding: 4,
    },
    itemicon: {
        backgroundColor: Colors.SECONDARY,
        fontFamily: 'outfit',
        fontSize: 22,
        padding: 5,
        borderRadius: 99
    },
    itemingrid: {
        // backgroundColor: Colors.SECONDARY,
        fontFamily: 'outfit',
        fontSize: 18,
        // textAlign: 'left'
    },
    itemquantity: {
        color: Colors.GRAY,
    },
    top: {
        marginTop: 15,
    },
    topText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textBold: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        // color: 'black'
    },
    text: {
        fontFamily: 'outfit',
        fontSize: 16,
        // color: 'black'
    }
})