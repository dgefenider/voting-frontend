import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {stateStore} from '../../store'
import {Header} from '../common'
import {Container, Row, Col} from 'reactstrap'
import {Menu, Content} from './'
import styled from 'styled-components'
import {Switch, Route} from 'react-router-dom'
import {Projects} from '../projects'
import {Users} from '../users'

const MenuHeader = styled(Row)`
    padding-top: 15px;
    padding-bottom: 15px;
`

const Admin = observer(
    class Admin extends Component {
        render() {
            console.log(this.props.location)
            return (
                <Container>
                    <Header />
                    <Row>
                        <Col md={2}>
                            <MenuHeader>Меню</MenuHeader>
                            <Menu />
                        </Col>
                        <Col md={10}>
                            <Switch location={this.props.location}>
                                <Route path="/admin/projects" component={Projects} />
                                <Route path="/admin/users" component={Users} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            )
        }
    },
)

export default Admin
