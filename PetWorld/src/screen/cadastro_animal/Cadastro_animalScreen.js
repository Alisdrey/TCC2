import React from 'react';
import {
    Text,
    TouchableOpacity,
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
    Col,
    Grid

} from "native-base";
import ColorsSheme from '../../settings/ColorsScheme';


export default class novaPub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imagem: null,
            user: {},
            nome: "",
            raca: "",
            cor: "",
            sexo: "",
            especie: "",
            outraEspecie: "",
            pelo: "",
            porte: "",
            filhote: ""

        };

    }


    UNSAFE_componentWillMount() {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user });
        });
    }


    enviar() {

        let formdata = new FormData();

        formdata.append('idusuario', this.state.user.idUsuario)
        formdata.append('nome', this.state.nome)
        formdata.append('especie', this.state.especie)
        formdata.append('raca', this.state.raca)
        formdata.append('sexo', this.state.sexo)
        formdata.append('cor', this.state.cor)
        formdata.append('pelo', this.state.pelo)
        formdata.append('porte', this.state.porte)
        formdata.append('filhote', this.state.filhote)


        fetch(Server.API_INSERT_ANIMAL, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                this.props.navigation.navigate("CadastroFoto_animal", {
                    idanimal: response.idAnimal
                })

            })

    }

    onValueChangef(value) {
        this.setState({
            filhote: value
        })

    }

    onValueChangep(value) {
        this.setState({
            porte: value
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

                                <Item stackedLabel>
                                    <Label style={{}}>Nome do animal</Label>
                                    <Input
                                        style={{
                                            width: "100%",
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14
                                        }}
                                        onChangeText={val =>
                                            this.setState({ nome: val })

                                        }

                                    />
                                </Item>

                                <Label style={{ fontSize: 15, left: 14 }}>Selecionar espécie </Label>

                                <View style={{ marginTop: 20 }}>

                                    <Grid>
                                        <Col style={{ left: 60 }}>
                                            <TouchableOpacity


                                                onPress={() =>
                                                    this.setState({
                                                        especie: "Gato",
                                                        outraEspecie: false
                                                    })
                                                }
                                            >
                                                <FontAwesome5 name={"cat"} style={{ fontSize: 40, }} color=
                                                    {this.state.especie == "Gato" ? color = ColorsSheme.MAIN_COLOR : color = "#999"} />

                                            </TouchableOpacity>
                                        </Col>
                                        <Col style={{ left: 30 }}>
                                            <TouchableOpacity


                                                onPress={() =>
                                                    this.setState({ especie: "Cão", outraEspecie: false })

                                                }
                                            >
                                                <FontAwesome5 name={"dog"} style={{ fontSize: 40, }} color=
                                                    {this.state.especie == "Cão" ? color = ColorsSheme.MAIN_COLOR : color = "#999"} />

                                            </TouchableOpacity>
                                        </Col>

                                        <Col style={{ right: 5 }}>
                                            <TouchableOpacity


                                                onPress={() =>
                                                    this.setState({ outraEspecie: true, especie: "" })}>


                                                <FontAwesome5 name={"question"} style={{ fontSize: 35, }} color=
                                                    {this.state.outraEspecie ? color = ColorsSheme.MAIN_COLOR : color = "#999"} />

                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>

                                <Renderif test={this.state.outraEspecie}>
                                    <Item stackedLabel>
                                        <Label style={{ marginTop: 20 }}>Outro animal</Label>
                                        <Input
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10,
                                                fontSize: 14
                                            }}
                                            onChangeText={val =>
                                                this.setState({ especie: val })}
                                        />

                                    </Item>
                                </Renderif>

                                <Item stackedLabel>
                                    <Label style={{}}>Raça</Label>
                                    <Input
                                        style={{
                                            width: "100%",
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14
                                        }}
                                        onChangeText={val =>
                                            this.setState({ raca: val })

                                        }

                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label style={{}}>Cor</Label>
                                    <Input
                                        style={{
                                            width: "100%",
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14
                                        }}
                                        onChangeText={val =>
                                            this.setState({ cor: val })

                                        }

                                    />
                                </Item>

                                <Label style={{ fontSize: 15, left: 14, marginTop: 10 }}> Sexo </Label>

                                <View style={{}}>

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

                                <Item stackedLabel>
                                    <Label>Pelagem:</Label>
                                    <Input
                                        style={{
                                            width: "100%",
                                            marginTop: 10,
                                            marginBottom: -10,
                                            fontSize: 14
                                        }}
                                        onChangeText={val =>
                                            this.setState({ pelo: val })

                                        }

                                    />
                                </Item>

                                <Item stackedLabel >
                                    <Label style={{ fontSize: 15 }}>Porte</Label>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: "100%" }}
                                        selectedValue={this.state.porte}
                                        onValueChange={this.onValueChangep.bind(this)}
                                        placeholder={"Selecione..."}

                                    >
                                        <Picker.Item label="Selecione..." value="key0" />

                                        <Picker.Item label="Pequeno" value="Pequeno" />

                                        <Picker.Item label="Médio" value="Médio" />

                                        <Picker.Item label="Grande" value="Grande" />

                                    </Picker>

                                </Item>


                                <Item stackedLabel >
                                    <Label style={{ fontSize: 15 }}>Filhote</Label>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: "100%" }}
                                        selectedValue={this.state.filhote}
                                        onValueChange={this.onValueChangef.bind(this)}
                                        placeholder={"Selecione..."}

                                    >
                                        <Picker.Item label="Selecione..." value="key0" />

                                        <Picker.Item label="Sim" value="1" />

                                        <Picker.Item label="Não" value="0" />

                                    </Picker>
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
                                onPress={() => this.enviar()}
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
