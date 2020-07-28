import React from 'react';
import {
    Text,
    View,
    Picker
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../../settings/Server";
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
    Textarea,
} from "native-base";
import ColorsSheme from '../../settings/ColorsScheme';


export default class registro_doacaoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            animalusuario: [],
            idanimal: "",
            selected: "key0",

        };

    }


    UNSAFE_componentWillMount() {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user });
        });
        setTimeout(() => {
            this.getAnimal_Usuario();
        }, 1000);

    }



    enviar() {

        // this.state.animalusuario.map((item, index) => {

        //     if (this.state.idanimal == index) {

        //         this.setState({
        //             idanimal: item.idAnimal
        //         }, () => {
        //             let formdata = new FormData();

        //             formdata.append('idusuario', this.state.user.idUsuario)
        //             formdata.append('idanimal', this.state.idanimal)
        //             formdata.append('cidade', this.state.cidade)
        //             formdata.append('estado', this.state.estado)
        //             formdata.append('descricao', this.state.descricao)
        //             console.log(formdata)


        //             fetch(Server.API_INSERIR_PET_PERDIDO, {
        //                 method: "POST",
        //                 'Content-Type': 'multipart/form-data',
        //                 body: formdata
        //             }).then(response => response.json())
        //                 .then(response => {
        //                     console.log("erro", response)
        //                     this.props.navigation.navigate("HomeAP")

        //                 })
        //         })

        //     }

        // })

    }


    getAnimal_Usuario = () => {
        let url =
            Server.API_PET_DO_USUARIO +
            this.state.user.idUsuario +
            '/pets'
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson != null) {
                    console.log(responseJson)
                    this.setState({
                        animalusuario: responseJson,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    onValueChange(value) {
        this.setState({
            idanimal: value
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

                            <Item stackedLabel >
                                    <Label style={{ fontSize: 15 }}>Escolha seu animal</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Selecione um animal..."
                                        iosIcon={<FontAwesome5 name="arrow-down" />}
                                        selectedValue={this.state.idanimal}
                                        style={{
                                            width: "100%",
                                            marginTop: 10
                                        }}
                                        //selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}

                                    >
                                        <Picker.Item style={{ fontSize: 12 }} label="Selecione seu animal..." value="key0" />
                                        {

                                            this.state.animalusuario.map((item, index) =>
                                                <Picker.Item key={item.nome} label={item.nome} value={index} /> // item seleciona o atributo q eu quero 
                                            )

                                        }


                                    </Picker>
                                </Item>

                                {/* <Renderif test={!this.state.cidade}>
                                    <Item stackedLabel>
                                        <Label>Cidade</Label>
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
                                        <Label>Estado</Label>
                                        <Input
                                            value={this.state.estado}
                                            onChangeText={val =>
                                                this.setState({ estado: val })
                                            }
                                        />
                                    </Item>
                                </Renderif>

                               
                                <Item stackedLabel>
                                    <Label style={{}}>Descrição </Label>
                                    <Form style={{ width: "100%" }}>
                                        <Textarea style={{ height: 90 }}
                                            value={this.state.descricao}
                                            onChangeText={val => {
                                                this.setState({
                                                    descricao: val
                                                });
                                            }}
                                            rowSpan={2}
                                            bordered
                                        />
                                    </Form>
                                </Item> */}
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
                                onPress={() => this.enviar()}
                            >
                                <Text>Confirmar</Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </DrawerBase>
        );
    }
}
