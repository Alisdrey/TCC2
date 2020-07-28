
import React, { Component } from 'react';
import {View, TouchableOpacity, FlatList } from 'react-native';
import {
    Text,
    Content,
    Card,
    CardItem,
    Tab,
    Tabs,
    ScrollableTab,
    TabHeading,

} from 'native-base';
import DrawerBase from '../../components/DrawerBase'
import moment from "moment/min/moment-with-locales";
import Server from "../../settings/Server"
import ColorsScheme from "../../settings/ColorsScheme";
import AsyncStorage from '@react-native-community/async-storage';

export default class MinhasPubScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            my_achado: {},
            my_perdido: {},

        }
    }

    UNSAFE_componentWillMount() {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user }, () => {
                this.getdadosAchado();
                this.getdadosPerdido();
            });
          });
        
    }


    getdadosPerdido() {
        const url = Server.API_PERDIDO_USER + this.state.user.idUsuario
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson) {
                    this.setState({
                        my_perdido: responseJson

                    })
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    getdadosAchado() {
        const url = Server.API_ACHADO_USER + this.state.user.idUsuario
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    this.setState({
                        my_achado: responseJson

                    })
                }
            })
            .catch(err => {
                console.log(err);
            });

    }

    // removeItem = item => {

    //     let tempoMaximoDesistencia = moment().unix() + item.desistencia * 60 * 60
    //     let tempoDataReserva = moment(item.data + " " + item.horarioinicio + ":00").unix() - 3 * 60 * 60
    //     let result = tempoMaximoDesistencia - tempoDataReserva;

    //     if (tempoMaximoDesistencia < tempoDataReserva) {
    //         Alert.alert(
    //             "Confirmar",
    //             "Deseja realmente cancelar está reserva?",
    //             [
    //                 {
    //                     text: "Cancelar",
    //                     onPress: () =>
    //                         console.log("Cancel Pressed"),
    //                     style: "cancel"
    //                 },
    //                 {
    //                     text: "OK",
    //                     onPress: () => this.RemoverReserva(item)

    //                 }
    //             ],
    //             { cancelable: false }
    //         )

    //     } else {
    //         Alert.alert(
    //             "Ops!",
    //             "Tempo esgotado para desistência.",
    //             [
    //                 {
    //                     text: "Sair",
    //                     onPress: () =>
    //                         console.log("Cancel Pressed"),
    //                     style: "cancel"
    //                 },
    //             ],
    //             { cancelable: false }
    //         )
    //     }
    // };

    _keyExtractor_perdido = (item, index) => index.toString();
    _keyExtractor_achado = (item, index) => index.toString();

    // RemoverReserva = item => {
    //     Server.API + "deleteReserva/" + item.idreserva
    //     fetch(Server.API + "deleteReserva/" + item.idreserva).then(val => {
    //         this.getreserva();
    //     });
    // }


    _renderItemPerdidos = ({item }) => (

        <Card>
            <CardItem header >
            <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("detalhesPerdido", {
                        dadospet: item,
                        user: this.state.user

                    })}>
                <View style={{ flex: 1 }}>

                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 10

                    }}>{item.Animal.nome}
                    </Text>
                    <Text style={{ fontSize: 12, }}>
                        Espécie: <Text style={{ fontSize: 14, fontWeight: 'bold' }} >{item.Animal.especie}</Text></Text>

                </View>
                <Text style={{
                    fontSize: 13,
                    fontWeight: 'bold',


                }}>{moment(item.dataRegistro, "YYYY-MM-DD,hh:mm").calendar()}</Text>
            </TouchableOpacity>

            </CardItem>

            {/* <CardItem style={{ height: 35 }} footer bordered>
                <TouchableOpacity
                    onPress={() =>
                        this.removeItem(item)
                    }
                    style={{ position: "absolute", right: 15 }}
                >

                    <Grid>
                        <Col>
                            <Text style={{
                                right: 10,
                                color: "#73757a",
                                fontSize: 14,
                                marginTop: 2,

                            }}> Excluir </Text>
                        </Col>
                        <Col>
                            <FontAwesome5 name={"trash"} style={{ fontSize: 14, marginTop: 5 }} /></Col>
                    </Grid>
                </TouchableOpacity>
            </CardItem> */}
            <View />
        </Card>
    );

    _renderItemEncontrado = ({ item }) => (

        <Card>
            <CardItem header >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("detalhesAchado", {
                        dadospet: item,
                        user: this.state.user

                    })}>
                    <View style={{ flex: 1 }}>

                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginBottom: 10

                        }}>{item.cidade + '-' + item.estado}
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: 'bold',


                    }}>{moment(item.dataRegistro, "YYYY-MM-DD,hh:mm").calendar()}</Text>


                </TouchableOpacity>
            </CardItem>

            {/* <CardItem style={{ height: 35 }} footer bordered>
                <TouchableOpacity
                    onPress={() =>
                        this.removeItem(item)
                    }
                    style={{ position: "absolute", right: 15 }}
                >

                    <Grid>
                        <Col>
                            <Text style={{
                                right: 10,
                                color: "#73757a",
                                fontSize: 14,
                                marginTop: 2,

                            }}> Excluir </Text>
                        </Col>
                        <Col>
                            <FontAwesome5 name={"trash"} style={{ fontSize: 14, marginTop: 5 }} /></Col>
                    </Grid>
                </TouchableOpacity>
            </CardItem> */}
            <View />
        </Card>
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
                                Meus Perdidos
                            </Text>
                        </TabHeading>
                    }>
                        <Content padder style={{ marginBottom: 55 }}>
                            <FlatList
                                data={this.state.my_perdido}
                                keyExtractor={this._keyExtractor_perdido}
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
                                Meus Achados
                            </Text>
                        </TabHeading>
                    }>
                        <Content padder style={{ marginBottom: 55 }}>
                            {
                                <FlatList
                                    data={this.state.my_achado}
                                    keyExtractor={this._keyExtractor_achado}
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