import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/services/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const Button = ({ label, onPress, iconName = '', loading = false }: any) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={onPress} disabled={loading}
        >
            {loading ?
                <ActivityIndicator  color={Colors.WHITE}/> :
                <Ionicons name={iconName} size={24} color="white" />
            }
            <Text style={{
                color: Colors.WHITE, textAlign: 'center', fontSize: 20
            }}
            >  {label}
            </Text>
        </TouchableOpacity>
    )
}
export default Button
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row', gap: 10, alignContent: 'center', justifyContent: 'center'
    }
})