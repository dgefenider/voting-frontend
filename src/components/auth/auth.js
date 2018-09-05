import React, {Component} from 'react'
import {Form, Label, Input, Button} from 'reactstrap'
import logo from '../../styles/img/logo.jpg'
import styled from 'styled-components'
import axios from 'axios'
import {constants} from '../../config'
import {errorWrapper} from '../../services'
import {stateStore} from '../../store'

const StyledForm = styled(Form)`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`

const StyledDiv = styled.div`text-align: center;`

const StyledInput = styled(Input)`
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
`

class Auth extends Component {
    state = {
        username: '',
        password: '',
    }
    logIn = async e => {
        e.preventDefault()
        const {username, password} = this.state
        try {
            const response = await axios.post(constants.serverUrl + 'auth', {username, password})
            const payload = response.data
            stateStore.logIn(payload)
        } catch (e) {
            errorWrapper.wrap(e)
        }
    }
    render() {
        const {username, password} = this.state
        return (
            <StyledDiv>
                <StyledForm>
                    <img src={logo} style={{width: '50%'}} />
                    <h2>Please Sign in</h2>
                    <Label for="inputUsername" className="sr-only">
                        Username
                    </Label>
                    <StyledInput
                        value={username}
                        onChange={e => {
                            this.setState({username: e.target.value})
                        }}
                        type="text"
                        id="inputUsername"
                        placeholder="Username"
                        autoFocus
                    />
                    <Label for="inputPassword" className="sr-only">
                        Password
                    </Label>
                    <StyledInput
                        value={password}
                        onChange={e => {
                            this.setState({password: e.target.value})
                        }}
                        type="password"
                        id="inputPassword"
                        placeholder="Password"
                        className="mb-3"
                    />
                    <Button block color="primary" size="lg" type="submit" onClick={this.logIn}>
                        Sign in
                    </Button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                </StyledForm>
            </StyledDiv>
        )
    }
}

export default Auth
