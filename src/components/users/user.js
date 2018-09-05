import React, {Component} from 'react'
import {Row, Col, Button} from 'reactstrap'
import styled from 'styled-components'
import {EditUpdateModal} from '../common'
import axios from 'axios'
import {constants} from '../../config'
import {stateStore} from '../../store'
import {errorWrapper} from '../../services'

const UserRow = styled(Row)`margin-top: 10px;`

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdate: false,
            user: props.user,
        }
    }

    updateUser = async user => {
        const {id} = this.props.user
        const updateObject = {
            username: user.username.value,
        }
        if (user.password.value) {
            updateObject.password = user.password.value
        }
        try {
            const response = await axios({
                method: 'put',
                url: constants.serverUrl + 'user/' + id,
                data: updateObject,
                headers: {
                    Authorization: stateStore.token,
                },
            })
            this.setState({
                user: response.data,
                showUpdate: false,
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    render() {
        const {username, id} = this.state.user
        const {onDelete} = this.props
        const {showUpdate} = this.state
        return (
            <UserRow>
                <Col md={4}>{username}</Col>
                <Col md={2}>
                    <Button
                        block
                        color="danger"
                        onClick={() => {
                            onDelete(id)
                        }}
                    >
                        Удалить
                    </Button>
                </Col>
                <Col md={2}>
                    <Button
                        block
                        color="warning"
                        onClick={() => {
                            this.setState({showUpdate: true})
                        }}
                    >
                        Изменить
                    </Button>
                </Col>
                <EditUpdateModal
                    title={'Изменить пользователя ' + username}
                    type="update"
                    onDone={this.updateUser}
                    showModal={showUpdate}
                    hideModal={() => {
                        this.setState({showUpdate: false})
                    }}
                    object={{
                        username: {
                            label: 'Username',
                            value: username,
                        },
                        password: {
                            label: 'Password',
                            value: '',
                        },
                    }}
                />
            </UserRow>
        )
    }
}

export default User
