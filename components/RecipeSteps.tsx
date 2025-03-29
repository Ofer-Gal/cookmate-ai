import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'

const RecipeSteps = ({ steps }: any) => {
    return (
        <View style={styles.top}>
            <Text style={styles.textBold}>Recipe Steps</Text>
            <Text>{steps.length} Steps</Text>
            <FlatList data={steps}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={[styles.text, {
                            margin: 6,
                            textAlign: 'center',
                            backgroundColor: Colors.SECONDARY,
                            borderRadius: 7
                        }]}>{ index +1}</Text>
                        <Text style={[styles.text, {
                            flex :1 
                        }]}>{ item}</Text>

                    </View>
                )
                }
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}

export default RecipeSteps

const styles = StyleSheet.create({
    row: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
        alignItems: 'center', marginTop: 5,
        borderRadius:15, borderWidth:0.5,
        borderColor: 'gray'
        //    gap: 10, padding: 4,
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
        fontSize: 20,
        padding: 10
    }
})