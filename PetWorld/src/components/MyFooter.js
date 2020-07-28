import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import ComunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default class MyFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Footer
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -10
                }}
            >
                <FooterTab style={mystyles.background}>
                 
                   
                    <Button
                        vertical
                        onPress={() => this.props.navigation.navigate("HomeAP")}
                    >
                        <FontAwesome5
                            name={"file"}
                            style={[mystyles.forground, { fontSize: 18 }]}
                        />
                    </Button>
                    <Button
                        center
                        onPress={() => this.props.navigation.navigate("HomeAP")}
                    >
                        <FontAwesome5
                            name={"home"}
                            style={[mystyles.forground, { fontSize: 18 }]}
                        />
                    </Button>

                   
                    <Button vertical onPress={() => this.props.openDrawer()}>
                        <FontAwesome5
                            name={"bars"}
                            solid
                            style={[mystyles.forground, { fontSize: 18 }]}
                        />
                    </Button>

                    
                </FooterTab>
            </Footer>
        );
    }
}
const mystyles = StyleSheet.create({
    background: {
        backgroundColor: "#212121",
        bottom: 7
    },
    forground: {
        color: "white"
    }
});
