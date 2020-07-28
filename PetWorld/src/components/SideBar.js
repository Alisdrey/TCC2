import React, { Component, } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SectionList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Drawer, Container, Header, Content,Button , ListItem, Right, Left, Body} from 'native-base';
const iconSize = 20;
const iconColor = "#666666";
export default class SideBar extends Component {

    getMenuItems() {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            this.setState({ user: user });
        });
        
        const { navigate } = this.props.navigation;

        let arr = [
            {
                title: "Menu",
                data: [

                    {
                        type: "item",
                        action: () => this.props.navigation.navigate("HomeAP"),
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"plus-square"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Achados Perdidos"
                    },

                    {
                        type: "item",
                        
                        action: () =>
                         this.props.navigation.navigate("registroPet_Perdido"),
                        
                
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"plus-square"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Perdi meu pet"
                    },
                    
                    {
                        type: "item",
                        
                        action: () =>
                         this.props.navigation.navigate("registroPet_Achado"),
                        
                
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"plus-square"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Encontrei um pet"
                    },

                    {
                        type: "item",
                        action: () => this.props.navigation.navigate("MinhasPub"),
                        icon: (
                            <ComunityIcon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"paw"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Minhas publicaçoes"
                    },
                    {
                        type: "item",
                        action: () => this.props.navigation.navigate("Cadastro_animal"),
                        icon: (
                            <ComunityIcon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"paw"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Cadastrar Animal"
                    },
                    {
                        type: "item",
                        action: () => this.props.navigation.navigate("registro_doacao"),
                        icon: (
                            <ComunityIcon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"paw"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Doar Animal"
                    },

                    {
                        type: "item",
                        action: () => {
                            AsyncStorage.clear().then(() => {
                                navigate("Select");
                            });
                        },
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={"sign-out-alt"}
                                style={{
                                    marginLeft: 5
                                }}
                            />
                        ),
                        displayName: "Sair",
                    },
                  

                ]
            }
        ];
        return arr;
    }

    renderItem(item) {
        return (
            <TouchableHighlight>
                <ListItem noBorder icon onPress={item.item.action}>
                    <Left>{item.item.icon}</Left>
                    <Body>
                        <Text>{item.item.displayName}</Text>
                    </Body>
                    <Right />
                </ListItem>
            </TouchableHighlight>
        );
    }

    renderSection(section) {
        return (
            <Text style={styles.sectionHeader}>{section.section.title}</Text>
        );
    }
    
    
    render(){
        
        return (
            <View style={styles.container}>
            <ImageBackground
            source={require("../assets/logo.jpg")}
            style={{
                height: 145,
                width: "100%",
                alignSelf: "stretch",
                position: "absolute",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
        />

        <SectionList
            style={{ marginTop: 115 }}
            sections={this.getMenuItems()}
            renderItem={item => this.renderItem(item)}
            renderSectionHeader={section => this.renderSection(section)}
            keyExtractor={(item, index) => index}
        />
</View>
                
               );
               
    } 
};


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
            backgroundColor: "white"
        },
        sectionHeader: {
            paddingTop: 8,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 8,
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: "rgba(247,247,247,1.0)"
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44
        }
    });
  
