import React, {Component} from 'react'
import axios from 'axios'
import {constants} from '../../config'
import {errorWrapper} from '../../services'
import {stateStore} from '../../store'
import {User} from './'
import {Container, Row, Col, Button} from 'reactstrap'
import styled from 'styled-components'
import {EditUpdateModal} from '../common'
import _ from 'lodash'

const ContentContainer = styled(Container)`margin-top: 30px;`

class Users extends Component {
    state = {
        loading: false,
        users: [],
        showCreateUser: false,
    }
    createUser = async user => {
        try {
            const response = await axios({
                method: 'post',
                url: constants.serverUrl + 'user',
                data: {
                    username: user.username.value,
                    password: user.password.value,
                },
                headers: {
                    Authorization: stateStore.token,
                },
            })
            this.setState({
                users: this.state.users.concat(response.data),
                showCreateUser: false,
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    deleteUser = async id => {
        try {
            const response = await axios({
                method: 'delete',
                url: constants.serverUrl + 'user/' + id,
                headers: {
                    Authorization: stateStore.token,
                },
            })
            console.log(response)
            this.setState({
                users: _.reject(this.state.users, user => {
                    return user.id === response.data.id
                }),
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    componentDidMount() {
        this.setState({loading: true})
        axios({
            method: 'get',
            url: constants.serverUrl + 'user',
            headers: {
                Authorization: stateStore.token,
            },
        })
            .then(response => {
                console.log(response)
                this.setState({loading: false, users: response.data})
            })
            .catch(err => {
                errorWrapper.wrap(err)
            })
    }
    render() {
        const {loading, users, showCreateUser} = this.state
        const usersComponents = users.map(user => {
            return <User key={user.id} user={user} onDelete={this.deleteUser} />
        })
        return (
            <ContentContainer fluid>
                <Row>
                    <Col md={4}>Пользователи</Col>
                    <Col md={2}>
                        <Button
                            block
                            color="success"
                            onClick={() => {
                                this.setState({showCreateUser: true})
                            }}
                        >
                            Добавить
                        </Button>
                    </Col>
                </Row>
                {usersComponents}
                <EditUpdateModal
                    title="Создать нового пользователя"
                    type="create"
                    onDone={this.createUser}
                    showModal={showCreateUser}
                    hideModal={() => {
                        this.setState({showCreateUser: false})
                    }}
                    object={{
                        username: {
                            label: 'Username',
                            value: '',
                        },
                        password: {
                            label: 'Password',
                            value: '',
                        },
                    }}
                />
            </ContentContainer>
        )
    }
}

export default Users
