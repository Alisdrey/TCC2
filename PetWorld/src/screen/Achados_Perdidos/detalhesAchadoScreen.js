import React, { Component } from "react";
import {
    View,
    Alert,
    ScrollView,
} from "react-native";
import {
    Root,
    Container,
    Content,
    Item,
    Form,
    Label,
    Button,
    Text,
    Card,
    CardItem,
    Textarea,
    Input

} from "native-base";
import Renderif from "../../components/RenderIf";
import HeaderGoBack from "../../components/HeaderGoBack";
import Server from "../../settings/Server";
import moment from "moment/min/moment-with-locales";
import ResponsiveImage from "react-native-responsive-image";
moment.updateLocale("pt-br", {
    months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]
});
moment.locale("pt-br");

export default class DetalhesAchado extends Component {
    constructor(props) {
        super(props);
        const dadospet = this.props.navigation.getParam("dadospet", {});
        const user = this.props.navigation.getParam("user", {})
        this.state = {
            user: user,
            hasImage: false,
            dadospet: dadospet,
            myPerfil: false,
            isUpdate: false,
            descricaoAnimal: dadospet.descricaoAnimal,
            descricaoLocal: dadospet.descricaoLocal,
        };
    }

    UNSAFE_componentWillMount() {
        this.isPerfil();
        this.getdadosEncontrado();
    }

    getdadosEncontrado() {
        const url = Server.API_GET_PET_ACHADO_ID + this.state.dadospet.idAchado
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log(this.state)
                    this.setState({
                        dadospet: responseJson,
                        descricaoAnimal: responseJson.descricaoAnimal,
                        descricaoLocal: responseJson.descricaoLocal
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    isPerfil() {
        this.state.user == this.state.dadospet.idUsuario ?
            this.setState({
                myPerfil: true
            })
            : {}

    }

    openModal = () => {
        this.setState({ isUpdate: true });
    }

    saveDetalhesPet = () => {

        console.log(this.state)

        let formdata = new FormData();

        formdata.append('idAchado', this.state.dadospet.idAchado)
        formdata.append('idusuario', this.state.dadospet.idUsuario)
        formdata.append('descricaoLocal', this.state.descricaoLocal)
        formdata.append('descricaoAnimal', this.state.descricaoAnimal)
        formdata.append('estado', this.state.dadospet.estado)
        formdata.append('cidade', this.state.dadospet.cidade)
        formdata.append('acolhido', this.state.dadospet.acolhido)
        formdata.append('status', this.state.dadospet.status)
        formdata.append('file', null)

        fetch(Server.API_EDITAR_ACHADO, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                Alert.alert(
                    "Êxito",
                    "Editado com sucesso",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                this.setState({ isUpdate: false }, () => {
                                    this.getdadosEncontrado();
                                }),

                            style: "default"
                        },
                    ],
                    { cancelable: false }
                )

            })

    }



    _keyExtractor_achado = (item, index) => index.toString();


    render() {
        return (
            <View style={{ flex: 1 }}>

                <Root>
                    <HeaderGoBack
                        title={" Detalhes do Animal"}
                        navigation={this.props.navigation}
                    />
                    <Container style={{ backgroundColor: "#f5f5f5" }}>

                        {this.state.dadospet.url != null ?
                            <Card>
                                <CardItem>
                                    <ResponsiveImage
                                        source={{
                                            uri:

                                                "http://192.140.89.25:8022/PetWorld/" + this.state.dadospet.url
                                        }}
                                        style={{ height: 250, width: null, flex: 1 }}
                                    />
                                </CardItem>
                            </Card>
                            :
                            <Card>
                                <CardItem>
                                    <ResponsiveImage
                                        source={{
                                            uri:
                                                "data:image/jpeg;base64," +
                                                require("../../assets/no-image.jpg")
                                        }}
                                        style={{ height: 250, width: null, flex: 1 }}
                                    />
                                </CardItem>
                            </Card>}


                        {this.state.isUpdate === false ?
                            <View style={{ backgroundColor: "white", flex: 1, marginRight: 10, marginLeft: 10, borderRadius: 10, marginBottom: 10 }}>

                                <Content style={{ width: "100%" }}>
                                    <Form style={{ padding: 20 }}>

                                        <View>
                                            <Label style={{ fontWeight: 'bold', fontSize: 15, color: "#161616" }}>Dados do Pet</Label>

                                            <View style={{ height: 30 }}>

                                                <Label></Label>
                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.descricaoAnimal == "" ? <Label style={{ fontSize: 14 }}>Descrição não informado</Label> : this.state.dadospet.descricaoAnimal} </Label>

                                            </View>

                                            <View style={{ height: 30 }}>

                                                <Label></Label>

                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.descricaoLocal} </Label>


                                            </View>


                                            <Renderif test={this.state.myPerfil} >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        paddingTop: 20
                                                    }}
                                                >
                                                    <View style={{ marginTop: 50 }}>

                                                        <Button

                                                            onPress={this.openModal}
                                                            style={{
                                                                left: 210,
                                                                width: 90,
                                                                backgroundColor:
                                                                    this.state.cor
                                                            }}

                                                        >
                                                            <Text
                                                                style={{
                                                                    textAlign: "center",
                                                                    width: "100%",
                                                                    fontSize: 10,
                                                                }}
                                                            >
                                                                Editar
                                                        </Text>
                                                        </Button>

                                                    </View>

                                                </View>
                                            </Renderif>
                                        </View>
                                    </Form>
                                </Content>
                            </View>

                            : false}

                    </Container>
                </Root>

                {this.state.isUpdate ?
                    <Root>
                        <Container style={{ backgroundColor: "#f5f5f5", marginTop: "9%" }}>
                            <View style={{ backgroundColor: "white", flex: 1, marginRight: 10, marginLeft: 10, borderRadius: 10, marginBottom: 10 }}>

                                <Content style={{ width: "100%" }}>
                                    <Form style={{ padding: 20 }}>

                                        <View>
                                            <View style={{ marginBottom: "5%" }}>
                                                <Label style={{ fontWeight: 'bold', fontSize: 15, color: "#161616" }}>Dados do Pet</Label>
                                            </View>

                                            <Label style={{ fontSize: 12 }}>Descrição do animal *</Label>
                                            <Item
                                                style={{
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    right: "5%",
                                                    marginBottom: "5%"
                                                }}
                                            >
                                                <Input
                                                    value={this.state.descricaoAnimal}
                                                    style={{
                                                        width: "100%",
                                                        marginTop: 10,
                                                        marginBottom: -10,

                                                    }}
                                                    onChangeText={val =>
                                                        this.setState({ descricaoAnimal: val })
                                                    }
                                                />
                                            </Item>
                                            <Label style={{ fontSize: 12 }}>Descrição do Local *</Label>
                                            <Item
                                                style={{
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    right: "5%"
                                                }}
                                            >
                                                <Input
                                                    value={this.state.descricaoLocal}
                                                    style={{
                                                        width: "100%",
                                                        marginTop: 10,
                                                        marginBottom: -10,

                                                    }}
                                                    onChangeText={val =>
                                                        this.setState({ descricaoLocal: val })
                                                    }
                                                />
                                            </Item>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    paddingTop: 20
                                                }}
                                            >
                                                <View style={{ marginTop: 50 }}>

                                                    <Button

                                                        onPress={this.saveDetalhesPet}
                                                        style={{
                                                            left: 210,
                                                            width: 90,
                                                            backgroundColor:
                                                                this.state.cor
                                                        }}

                                                    >
                                                        <Text
                                                            style={{
                                                                textAlign: "center",
                                                                width: "100%",
                                                                fontSize: 10,
                                                            }}
                                                        >
                                                            Salvar
                                                            </Text>
                                                    </Button>

                                                </View>

                                            </View>

                                        </View>
                                    </Form>
                                </Content>
                            </View>
                        </Container>
                    </Root> : false}
            </View>

        );
    }
}
