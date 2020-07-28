import React, { Component } from "react";
import {
    View,
    Alert,
    ScrollView
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
    Textarea,
    Input

} from "native-base";
import { SliderBox, FastImage } from "react-native-image-slider-box";
import Renderif from "../../components/RenderIf";
import Server from "../../settings/Server";
import moment from "moment/min/moment-with-locales";
import HeaderGoBack from "../../components/HeaderGoBack";
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

export default class DetalhesPerdido extends Component {
    constructor(props) {
        super(props);
        const dadospet = this.props.navigation.getParam("dadospet", {});
        const user = this.props.navigation.getParam("user", {});
        this.state = {
            user: user,
            hasImage: false,
            dadospet: dadospet,
            myPerfil: false,
            isUpdate: false,
            descricao: dadospet.descricao,
            images: {},

        };
    }

    UNSAFE_componentWillMount() {
        this.isPerfil();
        this.getImage();
        this.getdadosPerdidos();

    }

    getImage() {
        var imagem = [];
        for (let i = 0; i < this.state.dadospet.Animal.Galeria.length; i++) {
            imagem[i] = 'http://192.140.89.25:8022/PetWorld/' + this.state.dadospet.Animal.Galeria[i].url

        }

        this.setState({
            images: imagem
        })


    }

    getdadosPerdidos() {
        console.log(this.state.images)
        const url = Server.API_GET_PET_PERDIDO_ID + this.state.dadospet.idPerdido
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    this.setState({
                        dadospet: responseJson,
                        descricao: responseJson.descricao,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });

    }


    isPerfil() {
        this.state.user.idUsuario == this.state.dadospet.idUsuario ?
            this.setState({
                myPerfil: true
            }) : {}
    }


    openModal = () => {
        this.setState({ isUpdate: true });
    }

    saveDetalhesPet = () => {

        let formdata = new FormData();

        formdata.append('idperdido', this.state.dadospet.idPerdido)
        formdata.append('idusuario', this.state.dadospet.idUsuario)
        formdata.append('idanimal', this.state.dadospet.idAnimal)
        formdata.append('cidade', this.state.dadospet.cidade)
        formdata.append('estado', this.state.dadospet.estado)
        formdata.append('descricao', this.state.descricao)
        formdata.append('status', this.state.dadospet.status)
        fetch(Server.API_EDITAR_PERDIDO, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {

                Alert.alert(
                    "Êxito",
                    "Editado com sucesso",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                this.setState({ isUpdate: false }, () => {
                                    this.getdadosPerdidos();
                                }),

                            style: "default"
                        },
                    ],
                    { cancelable: false }
                )

            })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {console.log(this.state.images)}
                <Root>

                    <HeaderGoBack
                        title={"Detalhes Perdido"}
                        navigation={this.props.navigation}
                    />

                    <Container style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={{ backgroundColor: "white", width: "100%", borderRadius: 10, marginBottom: 20 }}>
                            <SliderBox
                                ImageComponent={FastImage}
                                images={this.state.images}
                                sliderBoxHeight={200}
                                dotColor="#FFEE58"
                                inactiveDotColor="#90A4AE"
                                paginationBoxVerticalPadding={20}
                                autoplay
                                circleLoop
                                resizeMethod={'resize'}
                                resizeMode={'cover'}
                                paginationBoxStyle={{
                                    position: "absolute",
                                    bottom: 0,
                                    padding: 0,
                                    alignItems: "center",
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    paddingVertical: 10
                                }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: "rgba(128, 128, 128, 0.92)"
                                }}
                                ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
                                imageLoadingColor="#2196F3"
                            />
                        </View>
                        {this.state.isUpdate == false ?
                            <View style={{ backgroundColor: "white", flex: 1, marginRight: 10, marginLeft: 10, borderRadius: 10 }}>

                                <Content style={{ width: "100%" }}>

                                    <Form style={{ padding: 20 }}>

                                        <View>
                                            <Label style={{ fontWeight: 'bold', fontSize: 15, color: "#161616" }}>Dados do Pet</Label>

                                            <View style={{ height: 30 }}>

                                                <Label></Label>
                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.Animal.nome == "" ? <Label style={{ fontSize: 14 }}>Nome não informado</Label> : this.state.dadospet.Animal.nome} - <Label style={{ fontSize: 14 }}>{this.state.dadospet.Animal.raca == "" ? <Label style={{ fontSize: 14 }}>Raça não informado</Label> : this.state.dadospet.Animal.raca} </Label> </Label>

                                            </View>

                                            <View style={{ height: 30 }}>

                                                <Label></Label>

                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.Animal.especie} -  <Label style={{ fontSize: 14 }}>{this.state.dadospet.Animal.sexo == "" ? <Label style={{ fontSize: 14 }}>Sexo não informado</Label> : this.state.dadospet.Animal.sexo == "M" ? <Label style={{ fontSize: 14 }}>Macho</Label> : <Label style={{ fontSize: 14 }}>Fêmea</Label>} </Label> </Label>


                                            </View>

                                            <View style={{ height: 30 }}>
                                                <Label></Label>

                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.Animal.pelo == "" ? <Label style={{ fontSize: 14 }}>Tipo do Pelo não informado</Label> : "Pelo: " + this.state.dadospet.Animal.pelo} </Label>


                                            </View>

                                            <View style={{ height: 30 }}>
                                                <Label></Label>

                                                <Label style={{ fontSize: 14 }}>{this.state.dadospet.descricao} </Label>


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
                                                                width: 90
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
                        <Container style={{ backgroundColor: "#f5f5f5" }}>
                            <View style={{ backgroundColor: "white", flex: 1, marginRight: 10, marginLeft: 10, borderRadius: 10, marginBottom: 10 }}>

                                <Content style={{ width: "100%" }}>
                                    <Form style={{ padding: 20 }}>

                                        <View>
                                            <View >
                                                <Label style={{ fontWeight: 'bold', fontSize: 15, color: "#161616" }}>Dados do Pet</Label>
                                            </View>

                                            <Label style={{ fontSize: 12 }}>Descricao do local *</Label>

                                            <Textarea style={{ height: 90 }}
                                                value={this.state.descricao}
                                                style={{
                                                    width: "100%",
                                                    marginTop: 10,
                                                    marginBottom: -10,

                                                }}
                                                onChangeText={val =>
                                                    this.setState({ descricao: val })
                                                }
                                                rowSpan={4}
                                                bordered

                                            />

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
