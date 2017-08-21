/**
 * Created by Frickimous on 11/07/2017.
 */

import React, {Component} from 'react'
import {Text, Container} from 'native-base'

export default class extends Component {
    render() {
        return (
            <Container style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text largeLight gray>
                    Coming soon...
                </Text>
            </Container>
        )
    }
}