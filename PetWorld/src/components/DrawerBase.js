import React, { Component } from 'react'
import { Drawer, Root, Container} from 'native-base'
import SideBar from './SideBar'
import MyFooter from './MyFooter';

Drawer.defaultProps.styles.mainOverlay.elevation = 0;

export default class DrawerBase extends Component {

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    }

    render() {
        return (
            <Root>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                     content={<SideBar navigation={this.props.navigation} />}
                    onClose={() => this.closeDrawer()} >

                    <Container>
                        {this.props.children}
                    </Container>
                    <MyFooter navigation={this.props.navigation} openDrawer={this.openDrawer} />
                </Drawer>
            </Root>
        )
    }
}
