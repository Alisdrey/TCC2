import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    Image,
    View,
    Keyboard,
    Platform,
    ImageBackground,
    Alert,

} from "react-native";
import {
    Text,
    Root,
    Content,
    H3,
    Form,
    Item,
    Input,
    Button,
    Toast,
    Icon
} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import ColorsScheme from "../../settings/ColorsScheme";
import Server from "../../settings/Server";

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            usuario: "",
            senha: ""
        };
    }

    
    
    onSubmit() {
        if(this.state.usuario!= "" && this.state.senha!= ""){
            const url = Server.API +
            this.state.usuario +
            "/" +
            this.state.senha

        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                   if(responseJson.success!= "false"){
                    AsyncStorage.setItem(
                        "User",
                        JSON.stringify(responseJson)
                    ).then(() => {
                        this.props.navigation.navigate("HomeAP");
                    });
                   }else{
                    Alert.alert(
                        "Nome ou senha de usuário incorreto",
                        "O nome de usuário ou senha não parece pertencer a uma conta. Verifique seus dados e tente novamente. ",
                        [
                            {
                                text: "OK",
                                onPress: () =>
                                   console.log("cancel"),
                                style: "default"
                            },
                        ],
                        { cancelable: false }
                    )
                   }                  
            })
            .catch(err => {
                console.log(err);
            });
        }else{
            Alert.alert(
                "Nome ou senha vazios",
                "Preencha todos os campos e tente novamente. ",
                [
                    {
                        text: "OK",
                        onPress: () =>
                           console.log("cancel"),
                        style: "default"
                    },
                ],
                { cancelable: false }
            )    
        }
}
    // onSubmit() {
    //         this.props.navigation.navigate("Home");
    // }
   
    
    render() {
        return (
            <Root>
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />

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
                    <Content style={{ width: "100%" }}>
                        <View
                            style={[
                                {
                                    padding: 20,
                                    marginTop: 50,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            ]}
                        >
                            <Image
                                style={{ width: 157.6, height: 124 }}
                                source={require("../../assets/logo.jpg")}
                            />
                        </View>
                        <H3
                            style={{
                                padding: 10,
                                textAlign: "center",
                                fontWeight: "bold"
                            }}
                        >
                            AUTENTICAÇÃO
                        </H3>
                        <Form style={{ padding: 10 }}>
                            <Item
                                style={{
                                    flexDirection: "column",
                                    alignItems: "flex-start"
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Usuário:
                                </Text>
                                <Input
                                    style={{
                                        width: "100%",
                                        marginTop: 10,
                                        marginBottom: -10
                                    }}
                                    onChangeText={val =>
                                        this.setState({ usuario: val })
                                    }
                                />
                            </Item>
                           
                              
                            <Item
                                style={{
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    paddingTop: 10
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Senha:
                                </Text>
                                <Input
                                    secureTextEntry
                                    style={{
                                        width: "100%",
                                        marginTop: 10,
                                        marginBottom: -10
                                    }}
                                    onChangeText={val =>
                                        this.setState({ senha: val })
                                    }
                                />
                            </Item>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Button
                                    style={{
                                        margin: 10,
                                        backgroundColor:
                                            ColorsScheme.ASENT_COLOR
                                    }}
                                    rounded
                                    dark
                                   onPress={this.onSubmit.bind(this)}
                                >
                                    <Text>Entrar</Text>
                                </Button>
                            </View>
                        </Form>
                        <Text
                            style={{
                                textAlign: "center",
                                padding: 20,
                                fontSize: 14
                            }}
                        >
                            Seu condomínio já é habilitado{" "}
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                WeCondo
                            </Text>
                            , solicite a senha com seu síndico ou administrador.
                        </Text>
                    </Content>
                </ImageBackground>

                <Button
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                    style={[
                        {
                            position: "absolute"
                        },
                        Platform.OS == "ios" ? { top: 15 } : {}
                    ]}
                >
                    <Icon name="arrow-back" style={{ color: "black" }} />
                </Button>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsScheme.MAIN_COLOR
    }
});
