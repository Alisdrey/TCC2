import React, { Component, } from 'react';
import { TouchableOpacity, Alert, ImageBackground, BackHandler, Image, FlatList, Dimensions,TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Title,
  Body,
  Icon,
  View,
  Grid,
  Col,
  Button,
  Tab,
  Tabs,
  Card,
  CardItem,
  Spinner,
  ScrollableTab,
  TabHeading,


} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../../settings/Server";
// import ResponsiveImage from "react-native-responsive-image";
import HeaderGoBack from "../../components/HeaderGoBack";
import ColorsScheme from "../../settings/ColorsScheme";
// import moment from "moment/min/moment-with-locales";
import DrawerBase from "../../components/DrawerBase";
import ImagePicker from 'react-native-image-crop-picker';

export default class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      dadospet: {},
      dadospetencontrado:{}
    }
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
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
      console.log("useeeeeeeer",this.state.user)
     // this.getdadosEncontrado()
    });
    //console.log(this.state)
  
    //this.getdadosPerdidos()
   
  }
  selectPhotoTapped(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  // getdadosEncontrado(){
  //   const url = Server.API +
  //   "getPetsEncontrados/" +
  //   this.state.user.cidadeUsu

  // console.log("url", url)
  // fetch(url)
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     console.log("response", responseJson)
  //     let imgTemp = [];
  //     responseJson.dadospets.forEach(element => {
  //       imgTemp.push(element)
  //     })
  //     this.setState({
  //       dadospetencontrado: imgTemp

  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  // getdadosPerdidos() {
  //   const url = Server.API +
  //     "getPets/"

  //   console.log("url", url)
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log("response", responseJson)
  //       let imgTemp = [];
  //       responseJson.dadospets.forEach(element => {
  //         imgTemp.push(element)
  //       })
  //       this.setState({
  //         dadospet: imgTemp

  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

 // _keyExtractor = (item, index) => index.toString();

  // _renderItemEncontrado = ({ item }) => (

  //   <Card>

  //     <CardItem header first>
  //       <ResponsiveImage
  //         source={{
  //           uri:

  //             "data:image/jpeg;base64," +
  //             item.imagem_encontrado
  //         }}
  //         style={{ height: 250, width: null, flex: 1 }}
  //       />

  //     </CardItem>

  //     <CardItem style={{ height: 35 }} footer bordered>
  //       <Left>
  //         <Button transparent>
  //           <Icon active name="thumbs-up" />
  //           <TouchableOpacity
  //             onPress={() => this.props.navigation.navigate("detalhespetachados", {
  //               idpetencontrado: item.idencontrado
  //             })}>
  //             <Text>Ver mais</Text>
  //           </TouchableOpacity>
  //         </Button>
  //       </Left>

  //       <Right>
  //         <Text style={{ fontSize: 12 }}>{moment(item.data_cadastro).locale('pt-br').startOf('hour ').fromNow()}</Text>
  //       </Right>
  //     </CardItem>
  //   </Card>

  // );

  //_keyExtractor_Perdidos = (item, index) => index.toString();
  //_keyExtractor_encontrado = (item, index) => index.toString();

  // _renderItemPerdidos = ({ item }) => (

  //   <Card>

  //     <CardItem header first>
  //       <ResponsiveImage
  //         source={{
  //           uri:

  //             "data:image/jpeg;base64," +
  //             item.imagem_pet
  //         }}
  //         style={{ height: 250, width: null, flex: 1 }}
  //       />

  //     </CardItem>

  //     <CardItem style={{ height: 35 }} footer bordered>
  //       <Left>
  //         <Button transparent>
  //           <Icon active name="thumbs-up" />
  //           <TouchableOpacity
  //             onPress={() => this.props.navigation.navigate("detalhespet", {
  //               idpet: item.idpet,
  //               user: this.state.user
  //             })}>
  //             <Text>Ver mais</Text>
  //           </TouchableOpacity>
  //         </Button>
  //       </Left>

  //       <Right>
  //         <Text style={{ fontSize: 12 }}>{moment(item.data_cadastro).locale('pt-br').startOf('hour ').fromNow()}</Text>
  //       </Right>
  //     </CardItem>
  //   </Card>

  // );

  render() {
    

    return (
      <DrawerBase navigation={this.props.navigation}>
        <HeaderGoBack
          title={" Home"}
          navigation={this.props.navigation}
          hasTabs
        />

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
            <TouchableHighlight onPress={this.selectPhotoTapped.bind(this)}>
                                
                                    <Image
                                        style={{ width: 280.6, height: 280 }}
                                        source={require("../../assets/no-image.jpg")}
                                    />
              </TouchableHighlight>

              {/* <FlatList
                data={this.state.dadospet}
                keyExtractor={this._keyExtractor_Perdidos}
                renderItem={this._renderItemPerdidos}
              /> */}

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

              {/* <FlatList
                data={this.state.dadospetencontrado}
                keyExtractor={this._keyExtractor_encontrado}
                renderItem={this._renderItemEncontrado}
              /> */}

            </Content>


          </Tab>
        </Tabs>


      </DrawerBase>
    );
  }
}