import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,

} from "react-native";
import {
    Text,
    Root,
    Content,
    Form,
    Item,
    Input,
    Button,
    Toast,
    Container, Grid, Col, Row, Thumbnail, Header, Left, Body, Right,Label
} from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class CadastrarUser extends Component {
    constructor() {
        super();
        this.state = {
            nome:"",
            sobrenome:"",
            sexo:"",
            nascimento:"",
            telefone: ""
        };
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
                                    Comece sua experiência no PetWord ;) {"\n"}Agora vamos pedir algumas informações para fazermos seu cadastro.
                                        </Text>

                            </View>


                        </View>

                    </Row>

                    <View size={10} style={{ backgroundColor: ColorsScheme.MAIN_COLOR }}>

                        <View style={{
                            width: "100%", justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <Text style={{ marginTop: 3, fontSize: 12, paddingBottom: 5, color: "white", }}>1/3</Text>

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
                                            placeholder={"Nome"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ nome: val })
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
                                            placeholder={"Sobrenome"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ sobrenome: val })
                                            }
                                        />
                                    </Item>

                                    <Text></Text>

                                    <View>

                                    <Grid>
                                        <Col style={{ left: 110 }}>
                                            <TouchableOpacity


                                                onPress={() =>
                                                    this.setState({
                                                        sexo: "M"
                                                    })}>

                                                <FontAwesome5 name={"mars"} style={{ fontSize: 40, }} color=
                                                    {this.state.sexo == "M" ? color = "#0101f7" : color = "#999"} />

                                                <Text style={{ fontSize: 14, marginTop: 10 }}> M </Text>

                                            </TouchableOpacity>
                                        </Col>

                                        <Col style={{ left: 30 }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.setState({ sexo: "F" })

                                                }

                                            >
                                                <FontAwesome5 name={"venus"} style={{ fontSize: 40, }} color=
                                                    {this.state.sexo == "F" ? color = "#f702a5" : color = "#999"} />
                                                <Text style={{ fontSize: 14, marginTop: 10 }}> F </Text>

                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>

                                <Item
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "flex-start"
                                        }}
                                    >
                                      <Input
                                          
                                            placeholder={"Nascimento"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ nascimento: val })
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
                                          
                                            placeholder={"Telefone"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ telefone: val })
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
                                                marginTop:30,
                                                backgroundColor:
                                                    ColorsScheme.ASENT_COLOR
                                            }}
                                            rounded
                                            dark
                                            onPress={() =>
                                                this.props.navigation.navigate(
                                                    "CadastrarUser_etapa2",{
                                                        nome:this.state.nome,
                                                        sobrenome:this.state.sobrenome,
                                                        sexo:this.state.sexo,
                                                        nascimento:this.state.nascimento,
                                                        telefone: this.state.telefone
                                                    }
                                                )
                                            }
                                        >
                                            <Text>Próximo</Text>
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
