import React, { Component } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    BackHandler,
    ImageBackground
} from "react-native";
import { Text, Root, Button } from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";

export default class SelectScreen extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener(
            "didFocus",
            payload =>
                BackHandler.addEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            "willBlur",
            payload =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.onBackButtonPressAndroid
                )
        );
    }

    onBackButtonPressAndroid = () => {
        BackHandler.exitApp();
    };
    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }
    render() {
        return (
            <Root>
                <ImageBackground
                    source={require("../../assets/select.jpeg")}
                    style={{ width: "100%", height: "100%" }}
                >
                    <View style={styles.container}>
                        <StatusBar
                            backgroundColor={ColorsScheme.MAIN_COLOR}
                            barStyle="light-content"
                        />
                        {/* <Image
                            style={{ width: 228, height: 115, }}
                            source={require("../../assets/logo_invertida.png")}
                        /> */}
                        {/* <Text
                            style={{
                                textAlign: "center",
                                padding: 10,
                                marginTop:30,
                                color: ColorsScheme.ASENT_COLOR,
                                fontWeight: "bold"
                            }}
                        >
                            Que bom que você esta por aqui ;)
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingRight: 20,
                                fontSize:13,
                                color: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            APP EM CONTRUÇÃO.
                        </Text> */}
                        <View
                            style={[
                                {
                                    padding: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    top: "25%"
                                }
                            ]}
                        >
                            <Button
                                style={{
                                    width: "80%",

                                    backgroundColor: ColorsScheme.ASENT_COLOR
                                }}
                                rounded
                                dark
                                block
                                onPress={() =>
                                    this.props.navigation.navigate("Login")
                                }
                            >
                                <Text style={{ fontSize: 11 }}>
                                    Login
                                </Text>
                            </Button>
                        </View>
                        <View
                            style={[
                                {
                                    padding: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    top: "25%"
                                }
                            ]}
                        >
                            <Button
                                style={{
                                    width: "80%",

                                    backgroundColor: "#FFF"
                                }}
                                rounded
                                dark
                                block
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        "CadastrarUser"
                                    )
                                }
                            >
                                <Text style={{ fontSize: 11, color: "#000" }}>
                                    Cadastrar
                                </Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
