import React, { Component } from "react";
import {
    StatusBar,
    View,
    Platform,
    Alert,
    PermissionsAndroid

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
    Icon,
    Grid, Col, Row, Thumbnail
} from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
import Geolocation from 'react-native-geolocation-service';



export default class CadastrarUser_etapa2 extends Component {

    constructor(props) {
        super(props);

        const nome = this.props.navigation.getParam("nome", "")
        const sobrenome = this.props.navigation.getParam("sobrenome", "")
        const sexo = this.props.navigation.getParam("sexo", "")
        const nascimento = this.props.navigation.getParam("nascimento", "")
        const telefone = this.props.navigation.getParam("telefone", "")

        
        this.state = {
            nome: nome,
            sobrenome: sobrenome,
            sexo: sexo,
            nascimento: nascimento,
            telefone: telefone,
            rua: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            latitude: "",
            longitude: "",
        };
    }

    componentDidMount() {
        this.setLocalization();
    }

    trim(vlr) {

        while (vlr.indexOf(" ") != -1)
            vlr = vlr.replace(" ", "");

        this.setState({
            cidade: vlr[3].long_name,
            uf: vlr[4].short_name,
            cep: vlr[6].short_name

        })

    }

    BuscaCidade() {

        Geocoder.init("AIzaSyAN9sW3YlON1c8qGeuPbg3lGS1w8owzPGM", { language: "pt" }); // use a valid API key

        var obj = {
            lat: this.state.latitude,
            lng: this.state.longitude
        };

        Geocoder.from(obj)
            .then(json => {
                var location = json.results[0].geometry.location;
            })
            .catch(error => console.warn(error));

        Geocoder.from(this.state.latitude, this.state.longitude)
            .then(json => {
                console.log(json)
                var addressComponent = json.results[0].address_components
                this.trim(addressComponent)
            })
            .catch(error => console.warn(error));

        Geocoder.from({
            latitude: this.state.latitude,
            longitude: this.state.longitude
        });

        Geocoder.from({
            lat: this.state.latitude,
            lng: this.state.longitude
        });

        Geocoder.from([this.state.latitude, this.state.longitude]);
    }

    setLocalization = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permissão de localização',
                    message: 'A aplicação precisa da permissão de localização.'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(pos => {
                    this.setState({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude

                    });

                    if (this.state.latitude != "" && this.state.longitude != "") {
                        this.BuscaCidade()
                    }

                },
                    error => {
                        this.setState({ isloading: false });
                        console.log(error);
                        Alert.alert(
                            "Erro",
                            "Houve um erro ao coletar a latitude e longitude.",
                            [
                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: false }
                        )
                    });
            }
        } catch (err) {
            this.setState({ isloading: false });
            console.log(err)
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
                                    Boa! Agora vamos para seu endereço residencial. {"\n"}Conta para gente onde você mora.
                                        </Text>

                            </View>


                        </View>

                    </Row>

                    <View size={10} style={{ backgroundColor: ColorsScheme.MAIN_COLOR }}>

                        <View style={{
                            width: "100%", justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <Text style={{ marginTop: 3, fontSize: 12, paddingBottom: 5, color: "white", }}>2/3</Text>

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
                                            placeholder={"rua"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ rua: val })
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
                                            placeholder={"nº"}
                                            style={{

                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ numero: val })
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

                                            placeholder={"bairro"}
                                            style={{
                                                width: "100%",
                                                marginTop: 10,
                                                marginBottom: -10
                                            }}
                                            onChangeText={val =>
                                                this.setState({ bairro: val })
                                            }
                                        />
                                    </Item>

                                    <RenderIf condition={this.state.cidade != ""}>
                                        <Item
                                            style={{
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                paddingTop: 10
                                            }}
                                        >
                                            <Input
                                                placeholder={"cidade"}
                                                style={{
                                                    width: "100%",
                                                    marginTop: 10,
                                                    marginBottom: -10
                                                }}
                                                onChangeText={val =>
                                                    this.setState({ cidade: val })
                                                }
                                            />
                                        </Item>
                                    </RenderIf>

                                    <RenderIf condition={this.state.uf != ""}>

                                        <Item
                                            style={{
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                paddingTop: 10
                                            }}
                                        >
                                            <Input
                                                placeholder={"estado"}
                                                style={{
                                                    width: "100%",
                                                    marginTop: 10,
                                                    marginBottom: -10
                                                }}
                                                onChangeText={val =>
                                                    this.setState({ uf: val })
                                                }
                                            />
                                        </Item>
                                    </RenderIf>

                                    <RenderIf condition={this.state.cep != ""}>

                                        <Item
                                            style={{
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                paddingTop: 10
                                            }}
                                        >
                                            <Input
                                                placeholder={"cep"}
                                                style={{
                                                    width: "100%",
                                                    marginTop: 10,
                                                    marginBottom: -10
                                                }}
                                                onChangeText={val =>
                                                    this.setState({ cep: val })
                                                }
                                            />
                                        </Item>

                                    </RenderIf>

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
                                                this.props.navigation.navigate(
                                                    "CadastrarUser_etapa3", {
                                                    nome: this.state.nome,
                                                    sobrenome: this.state.sobrenome,
                                                    sexo: this.state.sexo,
                                                    nascimento: this.state.nascimento,
                                                    rua: this.state.rua,
                                                    numero: this.state.numero,
                                                    bairro: this.state.bairro,
                                                    cidade: this.state.cidade,
                                                    uf: this.state.uf,
                                                    cep: this.state.cep,
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

