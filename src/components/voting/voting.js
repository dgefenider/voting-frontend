import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {stateStore} from '../../store'
import {Link} from 'react-router-dom'
import {Header} from '../common'
import {Container} from 'reactstrap'

const Voting = observer(
    class Voting extends Component {
        render() {
            const isAdmin = stateStore.isAdmin
            return (
                <Container>
                    <Header />
                </Container>
            )
        }
    },
)

export default Voting
