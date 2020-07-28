import React, { Component, } from 'react';
import { TouchableOpacity, Alert, ImageBackground, PermissionsAndroid, BackHandler, Image, FlatList, Dimensions, TouchableHighlight } from "react-native";
import {
    Content,
    Text,
    Left,
    Right,
    Icon,
    Button,
    Tab,
    Tabs,
    Card,
    CardItem,
    ScrollableTab,
    TabHeading,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../../settings/Server";
import ResponsiveImage from "react-native-responsive-image";
import ColorsScheme from "../../settings/ColorsScheme";
import moment from "moment/min/moment-with-locales";
import DrawerBase from "../../components/DrawerBase";

export default class HomeAP extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            dadospetachado_imagem: [],
            dadospetperdido_imagem: [],
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus',
        (payload) =>
            BackHandler.addEventListener(
                'hardwareBackPress',
                this.onBackButtonPressAndroid
            )
        );
    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload =>
            BackHandler.removeEventListener(
                'hardwareBackPress',
                this.onBackButtonPressAndroid
            )
        );
    }

    onBackButtonPressAndroid = () => {
        BackHandler.exitApp();
    };
    
    UNSAFE_componentWillMount() {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user });
        });

        this.getdadosPerdidos()
        this.getdadosEncontrado()

    }


    getdadosEncontrado() {
    const url = Server.API_GET_PET_ACHADO
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson) {
                this.setState({
                    dadospetachado_imagem: responseJson
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

    getdadosPerdidos() {
    const url = Server.API_GET_PET_PERDIDO
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson) {
                this.setState({
                    dadospetperdido_imagem: responseJson
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    _renderItemEncontrado = ({ item }) => ( item.url ?
        <Card>
            <CardItem header first>
                <ResponsiveImage
                    source={{
                        uri:
                        Server.API_PRINC + item.url
                    }}
                    style={{ height: 250, width: null, flex: 1 }}
                />
            </CardItem>
            <CardItem style={{ height: 35 }} footer bordered>
                <Left>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("detalhesAchado", {
                                dadospet: item,
                                user: this.state.user.idUsuario

                            })}>
                            <Text>Ver mais</Text>
                        </TouchableOpacity>
                    </Button>
                </Left>

                <Right>
                    <Text style={{ fontSize: 12 }}>{moment(item.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}</Text>
                </Right>
            </CardItem>
        </Card>
        : false

    );

    _keyExtractor_Perdidos = (item, index) => index.toString();
    _keyExtractor_encontrado = (item, index) => index.toString();

    _renderItemPerdidos = ({ item }) => ( item.Animal.Galeria[0] ?
        <Card>
            <CardItem header first>
                <ResponsiveImage
                    source={{
                        uri: Server.API_PRINC + item.Animal.Galeria[0].url
                    }}
                    style={{ height: 250, width: null, flex: 1 }}
                />
            </CardItem>

            <CardItem style={{ height: 35 }} footer bordered>
                <Left>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("detalhesPerdido", {
                                dadospet: item,
                                user: this.state.user
                            })}>
                            <Text>Ver mais</Text>
                        </TouchableOpacity>
                    </Button>
                </Left>

                <Right>
                    <Text style={{ fontSize: 12 }}>{moment(item.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}</Text>
                </Right>
            </CardItem>
        </Card>
        : false
    );

    render() {
        return (
            <DrawerBase navigation={this.props.navigation}>
                <Tabs style={{ backgroundColor: ColorsScheme.ASENT_COLOR }}
                    tabBarBackgroundColor={ColorsScheme.ASENT_COLOR}
                    tabBarUnderlineStyle={{ backgroundColor: "white" }}
                    renderTabBar={() => <ScrollableTab />}>
                    <Tab heading={
                        <TabHeading
                            style={{
                                backgroundColor: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            <Text style={{ color: "white" }}>
                              Perdidos
                            </Text>
                        </TabHeading>
                    }>
                        <Content padder style={{ marginBottom: 55 }}>
                            <FlatList
                                data={this.state.dadospetperdido_imagem}
                                keyExtractor={this._keyExtractor_Perdidos}
                                renderItem={this._renderItemPerdidos}
                            />
                        </Content>
                    </Tab>
                    <Tab heading={
                        <TabHeading
                            style={{
                                backgroundColor: ColorsScheme.ASENT_COLOR
                            }}
                        >
                            <Text style={{ color: "white" }}>
                                Achados
                            </Text>
                        </TabHeading>
                    }>
                        <Content padder style={{ marginBottom: 55 }}>
                            {
                                <FlatList
                                    data={this.state.dadospetachado_imagem}
                                    keyExtractor={this._keyExtractor_encontrado}
                                    renderItem={this._renderItemEncontrado}
                                />
                            }
                        </Content>
                    </Tab>
                </Tabs>
            </DrawerBase>
        );
    }
}