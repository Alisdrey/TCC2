import React, { Component } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    ImageBackground,
} from "react-native";
//import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner, Text } from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
//import firebase from "react-native-firebase";


export default class SelectScreen extends Component {


    UNSAFE_componentWillMount() {

        // setInterval(() => {
        //     NetInfo.isConnected.fetch().then(isConnected => {

        //         if (!isConnected) {
        //             this.props.navigation.navigate("IsConnect")
        //         }
        //     });
        // }, 1);
    }
    componentDidMount() {

        // firebase
        //     .messaging()
        //     .requestPermission()
        //     .then(() => {
        //         // User has authorised
        //     })
        //     .catch(error => {
        //         // User has rejected permissions
        //     });
        AsyncStorage.getItem("User").then(val => {
            if (val !== null) {

                this.props.navigation.navigate("HomeAP");
                // setTimeout(() => {
                // }, 500);
            } else {
                setTimeout(() => {
                    this.props.navigation.navigate("Select");
                }, 3000);
            }
         });
    }
    render() {
        return (
            <ImageBackground
                source={require("../../assets/loading.jpg")}
                style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />
                {/* <Image
                    style={{ width: 197, height: 155 }}
                    source={require("../../assets/logo-wecondo.png")}
                /> */}
                {/* <Text
                    style={{
                        textAlign: "center",
                        padding: 20,
                        color: ColorsScheme.ASENT_COLOR
                    }}
                >
                    NUNCA FOI TÃO FÁCIL{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        TER TUDO DO SEU CONDOMÍNIO
                    </Text>{" "}
                    NA PALMA DA MÃO.
                </Text> */}
                <Spinner color={ColorsScheme.ASENT_COLOR} />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
});
