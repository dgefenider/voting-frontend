import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Row, Col, Button} from 'reactstrap'
import {stateStore} from '../../store'
import styled from 'styled-components'
import logo from '../../styles/img/logo.jpg'
import {Link} from 'react-router-dom'

const HeaderRow = styled(Row)`
    background: black;
    color: white;
`

const HeaderItemsCol = styled(Col)`padding-top: 20px;`

const LogoImg = styled.img`width: 30%;`

const Header = observer(
    class Header extends Component {
        exit = e => {
            e.preventDefault()
            stateStore.deleteToken()
        }
        render() {
            const {username, isAdmin} = stateStore
            return (
                <HeaderRow>
                    <Col md={4}>
                        <LogoImg src={logo} />
                    </Col>
                    <HeaderItemsCol md={2}>{username}</HeaderItemsCol>
                    {isAdmin && (
                        <HeaderItemsCol md={2}>
                            <Link to="/">
                                <Button block color="primary">
                                    На главную
                                </Button>
                            </Link>
                        </HeaderItemsCol>
                    )}
                    {isAdmin && (
                        <HeaderItemsCol md={2}>
                            <Link to="/admin">
                                <Button block color="danger">
                                    Админка
                                </Button>
                            </Link>
                        </HeaderItemsCol>
                    )}
                    {!isAdmin && <Col md={2} />}
                    {!isAdmin && <Col md={2} />}
                    <HeaderItemsCol md={2}>
                        <Button block color="danger" onClick={this.exit}>
                            Выйти
                        </Button>
                    </HeaderItemsCol>
                </HeaderRow>
            )
        }
    },
)

export default Header
