import { StyleSheet, Text, View, Image, Switch } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '@/context/UserContext'


const IntroHead = () => {

    const { user } = useContext(UserContext)
    const [isEnabled, setIsEnabled] = React.useState(false);

    // 
    return (
        <View style={{
            display: 'flex', 
            flexDirection: 'row', justifyContent: 'space-around',
        }}>
            <View style={{
                display: 'flex', gap: 10,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}
            >
                <Image source={{ uri: user?.picture }}
                    style={{ width: 40, height: 40 }} />
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,

                }}>Hello {user?.name}</Text>
            </View>
            <View style={{
                display: 'flex', gap: 10,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
            }}>
                <Text >{isEnabled ? 'Veg' : 'non-Veg'}</Text>
                <Switch value={isEnabled}
                    onValueChange={() => setIsEnabled(!isEnabled)} />
            </View>
        </View >
    )
}
export default IntroHead
const styles = StyleSheet.create({})
