import React from 'react';
import {
    Text,
    View,
    Picker
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Renderif from "../../components/RenderIf";
import DrawerBase from "../../components/DrawerBase";
import HeaderGoBack from "../../components/HeaderGoBack";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Label,
    Textarea

} from "native-base";
import ColorsSheme from '../../settings/ColorsScheme';


export default class registroPet_AchadoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            descricaolocal : "",
            descricaoanimal  : "",
            estado: "",
            cidade: "",
            acolhido: "",
            selected: "key0",

        };

    }


    UNSAFE_componentWillMount() {
        AsyncStorage.getItem("User").then(userText => {

            const user = JSON.parse(userText);

            if (user.cidade != "") {
                this.setState({ cidade: user.cidade });
            }

            if (user.estado != "") {
                this.setState({ estado: user.estado });

            }
            this.setState({ user: user });
        });

    }
    enviar() {

        let formdata = new FormData();

        formdata.append('idusuario', this.state.user.idUsuario)
        formdata.append('descricaolocal', this.state.descricaolocal)
        formdata.append('descricaoanimal', this.state.descricaoanimal)
        formdata.append('cidade', this.state.cidade)
        formdata.append('estado', this.state.estado)
        formdata.append('acolhido', this.state.acolhido)


        fetch(Server.API_INSERIR_PET_PERDIDO, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                console.log("erro", response)
                this.props.navigation.navigate("HomeAP")

            })
    }


    onValueChange(value) {
        this.setState({
            acolhido: value
        })
    }


    render() {

        return (
            <DrawerBase navigation={this.props.navigation}>
                <Container>
                    <Content style={{ width: "100%", marginBottom: 55 }}>
                        <HeaderGoBack
                            title={" Nova Publicação"}
                            navigation={this.props.navigation}
                        />

                        <View>
                            <Form style={{ padding: 20 }}>

                                <Renderif test={!this.state.cidade}>
                                    <Item stackedLabel>
                                        <Label>Cidade *</Label>
                                        <Input
                                            value={this.state.cidade}
                                            onChangeText={val =>
                                                this.setState({ cidade: val })
                                            }
                                        />
                                    </Item>
                                </Renderif>

                                <Renderif test={!this.state.estado}>
                                    <Item stackedLabel>
                                        <Label>Estado *</Label>
                                        <Input
                                            value={this.state.estado}
                                            onChangeText={val =>
                                                this.setState({ estado: val })
                                            }
                                        />
                                    </Item>
                                </Renderif>



                                <Item stackedLabel >
                                    <Label style={{ fontSize: 15 }}>Animal foi acolhido ? *</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Selecione"
                                        iosIcon={<FontAwesome5 name="arrow-down" />}
                                        selectedValue={this.state.acolhido}
                                        style={{
                                            width: "100%",
                                            marginTop: 10
                                        }}
                                        //selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}

                                    >
                                        <Picker.Item style={{ fontSize: 12 }} label="Selecione" value="key0" />
                                        
                                            <Picker.Item label="Não" value= "0" />
                                            <Picker.Item label="Sim" value= "1" /> 


                                    </Picker>
                                </Item>
                                <Item stackedLabel>
                                    <Label style={{}}>Descrição do Local: * </Label>
                                    <Form style={{ width: "100%" }}>
                                        <Textarea style={{ height: 90 }}
                                            //value={this.state.descricao}
                                            onChangeText={val => {
                                                this.setState({
                                                    descricaolocal: val
                                                });
                                            }}
                                            rowSpan={2}
                                            bordered
                                        />
                                    </Form>
                                </Item>

                                <Item stackedLabel>
                                    <Label style={{}}>Descrição do animal: * </Label>
                                    <Form style={{ width: "100%" }}>
                                        <Textarea style={{ height: 90 }}
                                            //value={this.state.descricao}
                                            onChangeText={val => {
                                                this.setState({
                                                    descricaoanimal: val
                                                });
                                            }}
                                            rowSpan={2}
                                            bordered
                                        />
                                    </Form>
                                </Item>
                            </Form>
                        </View>


                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row-reverse",
                                marginLeft: 21,
                                padding: 20
                            }}
                        >

                            <Button
                                //disabled= {this.state.desabilitarBotao}
                                block

                                style={{
                                    width: 125,
                                    backgroundColor: ColorsSheme.LIGHT_LORANGE,
                                }}
                                onPress={() => this.props.navigation.navigate("RegistroImagem_Achado", {
                                    
                                    idusuario: this.state.user.idUsuario,
                                    descricaolocal: this.state.descricaolocal,
                                    descricaoanimal: this.state.descricaoanimal,
                                    cidade: this.state.cidade,
                                    estado: this.state.estado,
                                    acolhido: this.state.acolhido
                                
                                })}
                            >
                                <Text>PRÓXIMO</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </DrawerBase>
        );
    }
}
