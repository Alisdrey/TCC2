import React, { Component } from "react";
import {
    StatusBar,
    Image,
    View,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {
    Text,
    Root,
    Container,
    Content,
    Button,
    Label,
    ActionSheet,
    Col,
    Grid,
    CardItem,
} from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";
import HeaderGoBack from "../../components/HeaderGoBack";
import Server from "../../settings/Server";
import ImagePicker from "react-native-image-crop-picker";
import Renderif from "../../components/RenderIf";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ResponsiveImage from "react-native-responsive-image";
import MyFooter from '../../components/MyFooter';
import DrawerBase from "../../components/DrawerBase";


export default class RegistroImagem_Achado extends React.Component {
    constructor(props) {
        super(props);
        const idusuario = this.props.navigation.getParam("idusuario", "");
        const descricaolocal = this.props.navigation.getParam("descricaolocal", "");
        const descricaoanimal =  this.props.navigation.getParam("descricaoanimal", "");
        const cidade =  this.props.navigation.getParam("cidade", "");
        const estado = this.props.navigation.getParam("estado", "");
        const acolhido = this.props.navigation.getParam("acolhido", "");

        this.state = {
            hasImage: false,
            idusuario: idusuario,
            descricaolocal: descricaolocal,
            descricaoanimal: descricaoanimal,
            cidade: cidade,
            estado: estado,
            acolhido: acolhido,
            imagem: "",
            desabilitarBotao: false
        
        };

    }

    salvarImagem = () => {
            this.setState({ desabilitarBotao: true })
                const obj = {
                    idUsuario: this.state.idUsuario,
                    descricaolocal: this.state.descricaolocal,
                    descricaoanimal: this.state.descricaoanimal,
                    cidade: this.state.cidade,
                    estado: this.state.estado,
                    acolhido: this.state.acolhido,
                    //imagem: this.state.image,
                };

            let formdata_img = new FormData();
            

            const fileURL = this.state.imagem.path;
            const fileName = fileURL.split("/").pop();
            const ext = fileURL.split(".").pop();
        
               formdata_img.append("file", {
                   uri: fileURL, // Caminho da imagem
                   name: fileName,
                   type: "image/" + ext
        
               });

              formdata_img.append("idusuario", this.state.idusuario);
              formdata_img.append("descricaolocal", this.state.descricaolocal);
              formdata_img.append("descricaoanimal", this.state.descricaoanimal);
              formdata_img.append("cidade", this.state.cidade);
              formdata_img.append("estado", this.state.estado);
              formdata_img.append("acolhido", this.state.acolhido);

              fetch(Server.API_INSERIR_IMAGEM_ACHADO, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata_img
            }).then(response => response.json())
                .then(response => {
                   
                 this.props.navigation.navigate("HomeAP")
     
                }).catch(error => {
                    console.log(error);
                })

    };


    getImagePet = index => {
        switch (index) {
            case 0:
                ImagePicker.openCamera({
                    width: 500,
                    height: 500,
                    compressImageMaxWidth: 500,
                    compressImageMaxHeight: 500,
                    includeBase64: true,
                    compressImageQuality: 0.2,
                    includeBase64: true
                }).then(imagem => {
                    this.setState({
                        imagem: imagem,
                        hasImage: true
                        //hasImage: true
                    });
                    //  this.checkIfCanEnableButton();

                });

                break;
            case 1:
                ImagePicker.openPicker({
                    width: 500,
                    height: 500,
                    compressImageMaxWidth: 500,
                    compressImageMaxHeight: 500,
                    includeBase64: true,
                    compressImageQuality: 0.2,
                    includeBase64: true
                }).then(imagem => {

                    this.setState({
                        imagem: imagem,
                        hasImage: true
                        //hasImage: true
                    });
                    // this.checkIfCanEnableButton();

                });
                break;

            default:
                break;
        }
    };

    render() {
        return (
            <DrawerBase navigation={this.props.navigation}>
            <Root>

                <HeaderGoBack
                    // title={"Cadastro de Pets"}
                    navigation={this.props.navigation}
                />
                <StatusBar
                    backgroundColor={ColorsScheme.ASENT_COLOR}
                    barStyle="light-content"
                />

                <Container style={{ backgroundColor: "#f5f5f5", marginBottom: 55 }}>

                    <View style={{ marginTop: 30, margin: 20 }}>
                        <Label
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 22,
                                color: "black"

                            }}
                        >
                            INSERIR IMAGEM
                    
                        </Label>
                        <Text style={{ fontSize: 12, textAlign: 'center' }}>  Insira uma foto do pet encontrado.  </Text>
                    </View>


                    <View style={{ backgroundColor: "white", flex: 1, marginRight: 10, marginLeft: 10, borderRadius: 10 }}>
                    <ScrollView >
                        <View
                            style={[
                                {
                                    padding: 10,
                                    //marginTop: 20,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            ]}
                        >

                            <TouchableHighlight onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: [
                                            "Câmera",
                                            "Galeria",
                                            "Cancelar"
                                        ],
                                        cancelButtonIndex: 2,
                                        title: "Escolha"
                                    },
                                    buttonIndex => {
                                        this.getImagePet(buttonIndex);
                                    }
                                )
                            }>
                                {this.state.hasImage ? (
                                    <ResponsiveImage


                                        source={{
                                            uri:
                                                "data:image/jpeg;base64," +
                                                this.state.imagem.data
                                        }}
                                        initWidth="350"
                                        initHeight="350"
                                    />
                                ) :

                                    <Image
                                        style={{ width: 280.6, height: 280 }}
                                        source={require("../../assets/no-image.jpg")}



                                    />}
                            </TouchableHighlight>
                        </View>
                        <Renderif test={this.state.hasImage} >
                            <CardItem style={{ height: 35 }} footer bordered>
                                <TouchableOpacity
                                    style={{ position: "absolute", right: 15 }}
                                    onPress={() =>
                                        ActionSheet.show(
                                            {
                                                options: [
                                                    "Câmera",
                                                    "Galeria",
                                                    "Cancelar"
                                                ],
                                                cancelButtonIndex: 2,
                                                title: "Escolha"
                                            },
                                            buttonIndex => {
                                                this.getImagePet(buttonIndex);
                                            }
                                        )
                                    }
                                >

                                    <Grid style={{ marginRight: 14 }}>

                                        <Col style={{ left: "10%", }}>
                                            <Text style={{

                                                right: 10,
                                                color: "#73757a",
                                                fontSize: 14,
                                                marginTop: 2,


                                            }}>Alterar foto</Text>
                                        </Col>

                                        <Col>

                                            <FontAwesome5 name={"camera"} style={{ fontSize: 14, marginTop: 5 }} />

                                        </Col>
                                    </Grid>
                                </TouchableOpacity>
                            </CardItem>


                            {<Content style={{ width: "100%" }}>



                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row-reverse",
                                        marginLeft: 23,
                                        paddingTop: 15
                                    }}
                                >

                                    <Button
                                        disabled={this.state.desabilitarBotao}


                                        style={{

                                            width: 125,
                                            backgroundColor: this.state.cor,
                                        }}
                                        onPress={() => this.salvarImagem()}
                                    >
                                        <Text style={{ fontSize: 13, textAlign:"center",  textAlign: "center", width: "100%",}}>Cadastrar</Text>
                                    </Button>
                                </View>

                            </Content>}
                        </Renderif>
                    </ScrollView>
                    </View>
                </Container>
                <MyFooter navigation={this.props.navigation} />
            </Root>
                 </DrawerBase>
        );
    }
}







