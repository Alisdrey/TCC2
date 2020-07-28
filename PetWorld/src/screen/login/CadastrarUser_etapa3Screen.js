import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    Platform,
    Alert,

} from "react-native";
import {
    Text,
    Root,
    Content,
    Form,
    Item,
    Input,
    Button,
    Icon,
    Grid, Col, Row, Thumbnail, Header, Left, Body, Right, Label
} from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
import Server from "../../settings/Server";

export default class CadastrarUser_etapa3 extends Component {
    constructor(props) {
        super(props);

        const nome = this.props.navigation.getParam("nome", "")
        const sobrenome = this.props.navigation.getParam("sobrenome", "")
        const sexo = this.props.navigation.getParam("sexo", "")
        const nascimento = this.props.navigation.getParam("nascimento", "")
        const rua = this.props.navigation.getParam("rua", "")
        const numero = this.props.navigation.getParam("numero", "")
        const bairro = this.props.navigation.getParam("bairro", "")
        const cidade = this.props.navigation.getParam("cidade", "")
        const uf = this.props.navigation.getParam("uf", "")
        const cep = this.props.navigation.getParam("cep", "")
        const telefone = this.props.navigation.getParam("telefone", "")


        this.state = {
            usuario: "",
            senha: "",
            confirm_senha: "",
            nome: nome,
            sobrenome: sobrenome,
            sexo: sexo,
            nascimento: nascimento,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            cep: cep,
            telefone: telefone
        };
    }

    onSubmit() {
        if (this.state.usuario != "" && this.state.senha != "" && this.state.confirm_senha != "") {
            if (this.state.senha == this.state.confirm_senha) {
                let formdata = new FormData();
            
                formdata.append('login', this.state.usuario)
                formdata.append('senha', this.state.senha)
                formdata.append('nome', this.state.nome)
                formdata.append('sobrenome', this.state.sobrenome)
                formdata.append('sexo', this.state.sexo)
                formdata.append('nascimento', this.state.nascimento)
                formdata.append('rua', this.state.rua)
                formdata.append('numero',this.state.numero)
                formdata.append('bairro', this.state.bairro)
                formdata.append('cidade', this.state.cidade)
                formdata.append('estado', this.state.uf)
                formdata.append('cep', this.state.cep)
                formdata.append('telefone', this.state.telefone)
               
                fetch(Server.API_INSERIR_USER, {
                    method: "POST",
                    'Content-Type': 'multipart/form-data',
                    body: formdata
                    
                }).then(val => {
                console.log(val)

                    Alert.alert(
                        "Êxito",
                        "Cadastro realizado com sucesso",
                        [
                            {
                                text: "OK",
                                onPress: () =>
                                    this.props.navigation.navigate("Login"),
                                style: "default"
                            },
                        ],
                        { cancelable: false }
                    )
                })
            } else {
                Alert.alert(
                    "Ação Bloqueada",
                    "Senhas não conferem, verifique e tente novamente.",
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
        } else {
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
 

    render() {
        return (
            <Root>
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />



                <Grid>
                    <Row size={30}>

                        <View
                            backgroundColor={ColorsScheme.LIGHT_LORANGE}
                            style={{
                                width: "100%",
                                height: "100%",
                                flexDirection: "row",
                                flexDirection: "row-reverse"

                            }}
                        >

                            <View
                                style={{
                                    flex: 1,
                                    //backgroundColor: "rgba(0,0,0,.6)",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    //flexDirection: "column-reverse"
                                }}
                            >

                                <Thumbnail

                                    large
                                    source={require("../../assets/logoapp.png")}
                                    style={Platform.OS == "ios" ? {
                                        borderRadius: 40,
                                        // borderWidth: 1, 
                                        backgroundColor: "#fcfcfc",
                                        // marginTop:30,
                                        height: 90,
                                        width: 90,
                                        position: "absolute",
                                        top: 10,
                                        // left: 10,
                                        marginLeft: 110,
                                        paddingBottom: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    } : {

                                            borderRadius: 50,
                                            borderWidth: 2,
                                            backgroundColor: "#fcfcfc",
                                            marginTop: 30,
                                            height: 90,
                                            width: 90,
                                            position: "absolute",
                                            top: 10,
                                            // left: 10,
                                            marginLeft: 110,
                                            paddingBottom: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}
                                />



                                <Text
                                    style={{
                                        color: "white",
                                        // position: "absolute",
                                        paddingTop: 130,
                                        fontSize: 14,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 20,
                                        textAlign: "center",
                                    }}
                                >
                                    Falta pouco! {"\n"}Informe um login e senha para acesso ao aplicativo ;D
                                        </Text>

                            </View>


                        </View>

                    </Row>

                    <View size={10} style={{ backgroundColor: ColorsScheme.MAIN_COLOR }}>

                        <View style={{
                            width: "100%", justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <Text style={{ marginTop: 3, fontSize: 12, paddingBottom: 5, color: "white", }}>3/3</Text>

                        </View>

                    </View>
                    <Row
                        size={50}
                        style={{
                            //paddingBottom: 55,
                            flexDirection: "column",
                            backgroundColor: "#f5f5f5"
                        }}
                    >

                        <View style={{ flex: 1, backgroundColor: "white", flex: 1, margin: 10, borderRadius: 3 }}>


                            <Content style={{ width: "100%" }}>
                                <Form style={{ padding: 10 }}>
                                    <Item
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "flex-start"
                                        }}
                                    >

                                        <Input
                                            placeholder={"login"}
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
                                        <Input
                                            placeholder={"Senha"}
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




                                    <Item
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "flex-start"
                                        }}
                                    >
                                        <Input

                                            placeholder={"confirmar senha"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ confirm_senha: val })
                                            }
                                        />
                                    </Item>



                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",

                                        }}
                                    >
                                        <Button
                                            style={{
                                                margin: 10,
                                                marginTop: 30,
                                                backgroundColor:
                                                    ColorsScheme.ASENT_COLOR
                                            }}
                                            rounded
                                            dark
                                            onPress={() =>
                                                this.onSubmit()
                                            }
                                        >
                                            <Text>Finalizar</Text>
                                        </Button>
                                    </View>
                                </Form>

                            </Content>

                        </View>




                    </Row>

                </Grid>





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
