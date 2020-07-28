import React, { Component } from "react";
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from "native-base";
import ColorsScheme from "../settings/ColorsScheme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class HeaderGoBack extends Component {
    render() {
        return (
            <Header
                androidStatusBarColor={ColorsScheme.ASENT_COLOR}
                style={{ backgroundColor: ColorsScheme.ASENT_COLOR }}
            >
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <FontAwesome5 name="arrow-left" style={{ color: "white" }} />
                    </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title style={{ color: "white" }}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
