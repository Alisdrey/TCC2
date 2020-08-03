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
            animalSelect: [],
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

        let formdata = new FormData();

        formdata.append('idanimal', this.state.animalSelect.idAnimal)
        fetch(Server.API_INSERT_DOACAO, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                console.log("erro", response)
                this.props.navigation.navigate("HomeAP")

            })
    }


    getAnimal = (value) => {
        let url =
            Server.API_ANIMAL +
            value
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson != null) {
                    console.log(responseJson)
                    this.setState({
                        animalSelect: responseJson,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    getAnimal_Usuario = () => {
        let url =
            Server.API_PET_DO_USUARIO +
            this.state.user.idUsuario +
            '/pets'
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson != null) {
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

        if (value != null) {
            this.setState({
                idanimal: value
            }, () => {
                this.getAnimal(value)

            })
        }
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
                                                <Picker.Item key={item.nome} label={item.nome} value={item.idAnimal} /> // item seleciona o atributo q eu quero 
                                            )

                                        }


                                    </Picker>
                                </Item>

                                <Renderif test={this.state.animalSelect != ""}>
                                    <Item stackedLabel>
                                        <Label>Nome: {this.state.animalSelect.nome}</Label>
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>Cor: {this.state.animalSelect.cor}</Label>
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>Espécie: {this.state.animalSelect.especie}</Label>
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>Raça: {this.state.animalSelect.raca}</Label>
                                    </Item>

                                    <Item stackedLabel>
                                        <Label>sexo: {this.state.animalSelect.sexo}</Label>
                                    </Item>

                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row-reverse",
                                            marginTop: "10%"
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
                                            <Text>Doar</Text>
                                        </Button>
                                    </View>

                                </Renderif>

                            </Form>
                        </View>

                    </Content>
                </Container>
            </DrawerBase>
        );
    }
}
