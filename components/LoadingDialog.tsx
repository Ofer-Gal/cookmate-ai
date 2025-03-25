import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/services/Colors";

const LoadingDialog = ({ visible = false, text = "Loading..." }): any => {
    return (
        <Modal transparent visible = {visible}>           
                <View style={styles.overlay}>
                  <View style={styles.grayview}>
                    <ActivityIndicator size="large" color={Colors.WHITE} />
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    grayview: {
        // width: 120,
        // height: 120,
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        // height: '100%', width: '100%'
    },
    text: {
        margin: 10,
        color: Colors.WHITE,
        fontSize: 15,
        fontFamily: "outfit",
    },
});

export default LoadingDialog;
