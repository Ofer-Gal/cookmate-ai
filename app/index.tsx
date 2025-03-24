import { Text, View } from "react-native";

import { Redirect, useRouter,  } from "expo-router";
import { useEvent } from "react-native-reanimated";
import { useContext, useEffect } from "react";
import { GetUserByEmail, CreateNewUser } from "@/services/GlobalApi";
import { UserContext } from "@/context/UserContext";

export default function Index() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const getSetUser = async () => {
        const email = 'ofergal@gmail.com';
        const user = await GetUserByEmail(email);
        if (user.data.length > 0) { //user exist
            // console.log('user', user.data[0]);
            setUser(user.data[0]);
        } else { //insert new user
            // console.log('insert new user');
            CreateNewUser({
                email: email,
                name: 'Ofer Gal',
                picture: '123456',
                pref: 'user pref 3'
            });
            setUser({
                email: email,
                name: 'Ofer Gal',
                picture: '123456',
                pref: 'user pref 3'
            }); //set user
        }
        router.replace('/(tabs)/Home');
    };

    useEffect(() => {
        getSetUser();
    }, []);


    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Redirect href={'/landing'} />
        </View>
    );
}
