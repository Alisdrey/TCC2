import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../../settings/Server";
import ImagePicker from 'react-native-image-crop-picker';
import ResponsiveImage from "react-native-responsive-image";
import DrawerBase from "../../components/DrawerBase";
import HeaderGoBack from "../../components/HeaderGoBack";
import {
    Container,
    Content,
    Button,
    ActionSheet,
    Col,
    Grid

} from "native-base";
import ColorsSheme from '../../settings/ColorsScheme';


export default class CadastroFoto_animal extends React.Component {

    constructor(props) {
        super(props);

        const idanimal = this.props.navigation.getParam("idanimal", "")

        const gallery = {
            idanimal: idanimal,
            img: []
        };

        this.state = {
            idanimal: idanimal,
            user: {},
            gallery: gallery,

        };

    }

    UNSAFE_componentWillMount() {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user });
        });
    }


    _handleActionSheetButton(btnIndex) {
        switch (btnIndex) {
            case 0:
                ImagePicker.openCamera({
                    width: 800,
                    height: 800,
                    includeBase64: true,
                    cropping: true,
                    compressImageQuality: 0.4,
                    compressImageMaxWidth: 800,
                    compressImageMaxHeight: 800,
                    cropperChooseText: "Confirmar",
                    cropperCancelText: "Cancelar",
                    loadingLabelText: "Carregando",
                    cropperStatusBarColor: ColorsSheme.MAIN_COLOR,
                    cropperToolbarColor: ColorsSheme.MAIN_COLOR,
                    cropperActiveWidgetColor: ColorsSheme.MAIN_COLOR,
                    cropperTintColor: ColorsSheme.MAIN_COLOR,
                })
                    .then(imagem => {
                        console.log(imagem)
                        const data = {
                            imagem: imagem
                        }
                        this.state.gallery.img.push(data);
                        // this.setState({ imagem: imagem });

                    })
                    .catch(error => {
                        console.log(error);
                    })
                break;

            case 1:
                ImagePicker.openPicker({
                    width: 800,
                    height: 800,
                    includeBase64: true,
                    cropping: true,
                    compressImageQuality: 0.4,
                    compressImageMaxWidth: 800,
                    compressImageMaxHeight: 800,
                    cropperChooseText: "Confirmar",
                    cropperCancelText: "Cancelar",
                    loadingLabelText: "Carregando",
                    cropperStatusBarColor: ColorsSheme.MAIN_COLOR,
                    cropperToolbarColor: ColorsSheme.MAIN_COLOR,
                    cropperActiveWidgetColor: ColorsSheme.MAIN_COLOR,
                    cropperTintColor: ColorsSheme.MAIN_COLOR,
                })
                    .then(imagem => {
                        console.log(imagem)
                        const data = {
                            imagem: imagem
                        }
                        this.state.gallery.img.push(data);
                        console.log(this.state.gallery.img)
                    })
                break;

            default:
                break;
        }
    }

    _handleChooseImage() {
        ActionSheet.show(
            {
                options: ["Câmera", "Galeria", "Cancelar"],
                cancelButtonIndex: 2,
                title: "Escolha o que fazer"
            },
            buttonIndex => {
                this._handleActionSheetButton(buttonIndex);
            }
        );
    }

    sendToServer = async () => {
        this.state.gallery.img.forEach(item => {
            let formdata_img = new FormData();

            const fileURL = item.imagem.path;
            const fileName = fileURL.split("/").pop();
            const ext = fileURL.split(".").pop();

            formdata_img.append("file", {
                uri: fileURL, // Caminho da imagem
                name: fileName,
                type: "image/" + ext

            });
            formdata_img.append("idanimal", this.state.idanimal);

            fetch(Server.API_UPLOAD_IMG, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata_img
            }).then(response => response.json())
                .then(response => {

                    this.props.navigation.navigate("HomeAP")

                }).catch(error => {
                    console.log(error);
                })


        })

    }


    enviar() {
        if (this.state.gallery.img.length != 0) {

            this.sendToServer().then(() => {
                this.state.gallery.img.forEach(element => {
                    console.log("element", element)
                });
            })
        }
    }

    render() {

        return (
            <DrawerBase navigation={this.props.navigation}>

                <Container>
                    <Content style={{ width: "100%", marginBottom: 55, backgroundColor: "#f5f5f5" }}>
                        <HeaderGoBack
                            title={" Nova Publicação"}
                            navigation={this.props.navigation}
                        />


                        <View style={{

                            borderBottomColor: ColorsSheme.MAIN_COLOR,
                            borderBottomWidth: 3
                        }}>
                            <Text style={{ textAlign: "center", margin: 12, fontSize: 14 }}> FOTO DO ANIMAL. </Text>
                        </View>
                        <Grid>
                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20,
                                            margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.imagem ? (
                                            <ResponsiveImage
                                                source={{
                                                    uri:
                                                        "data:image/jpeg;base64," +
                                                        this.state.imagem.data
                                                }}
                                                initWidth="70"
                                                initHeight="110"

                                            />
                                        ) : (
                                                <ResponsiveImage
                                                    source={require('../../assets/no-image.jpg')}
                                                    initWidth="70"
                                                    initHeight="110"


                                                />
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </Col>
                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20, margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.gallery.img.forEach(item => {
                                            console.log(item)
                                            item != "" ? (
                                                <ResponsiveImage
                                                    source={{
                                                        uri:
                                                            "data:image/jpeg;base64," +
                                                            item.imagem.data
                                                    }}
                                                    initWidth="70"
                                                    initHeight="100"
                                                />
                                            ) : (
                                                    false
                                                )
                                        })}

                                    </TouchableOpacity>
                                </View>
                            </Col>

                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20, margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.imagem ? (
                                            <ResponsiveImage
                                                source={{
                                                    uri:
                                                        "data:image/jpeg;base64," +
                                                        this.state.imagem3.data
                                                }}
                                                initWidth="70"
                                                initHeight="100"
                                            />
                                        ) : (
                                                <ResponsiveImage
                                                    source={require('../../assets/no-image.jpg')}
                                                    initWidth="70"
                                                    initHeight="110"
                                                />
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </Col>

                        </Grid>
                        <Grid>
                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20, margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.imagem ? (
                                            <ResponsiveImage
                                                source={{
                                                    uri:
                                                        "data:image/jpeg;base64," +
                                                        this.state.imagem4.data
                                                }}
                                                initWidth="70"
                                                initHeight="100"
                                            />
                                        ) : (
                                                <ResponsiveImage
                                                    source={require('../../assets/no-image.jpg')}
                                                    initWidth="70"
                                                    initHeight="110"
                                                />
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </Col>
                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20, margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.imagem ? (
                                            <ResponsiveImage
                                                source={{
                                                    uri:
                                                        "data:image/jpeg;base64," +
                                                        this.state.imagem5.data
                                                }}
                                                initWidth="70"
                                                initHeight="100"
                                            />
                                        ) : (
                                                <ResponsiveImage
                                                    source={require('../../assets/no-image.jpg')}
                                                    initWidth="70"
                                                    initHeight="110"
                                                />
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </Col>

                            <Col style={{ width: "33%" }}>
                                <View
                                    style={[
                                        {
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderBottomWidth: 3,
                                            borderWidth: 4,
                                            borderRadius: 20, margin: 10
                                        }
                                    ]}
                                >

                                    <TouchableOpacity
                                        style={{ padding: 15, }}
                                        onPress={() => { this._handleChooseImage() }}
                                    >
                                        {this.state.imagem ? (
                                            <ResponsiveImage
                                                source={{
                                                    uri:
                                                        "data:image/jpeg;base64," +
                                                        this.state.imagem6.data
                                                }}
                                                initWidth="70"
                                                initHeight="100"
                                            />
                                        ) : (
                                                <ResponsiveImage
                                                    source={require('../../assets/no-image.jpg')}
                                                    initWidth="70"
                                                    initHeight="110"
                                                />
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </Col>

                        </Grid>


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
                                    backgroundColor: ColorsSheme.MAIN_COLOR,
                                }}
                                onPress={() => this.enviar()}
                            >
                                <Text>Cadastrar</Text>
                            </Button>
                        </View>


                    </Content>
                </Container>
            </DrawerBase>
        );
    }
}
