import React, {Component} from 'react'
import {stateStore} from '../store'
import {observer} from 'mobx-react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Auth} from './auth'
import {Main} from './main'
import {NotificationContainer} from 'react-notifications'

const Root = observer(
    class Root extends Component {
        componentDidMount() {
            stateStore.loadToken()
        }
        render() {
            const {token} = stateStore
            console.log(token)
            return (
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                path="/auth"
                                exact
                                render={props => {
                                    return token ? <Redirect to="/" /> : <Auth />
                                }}
                            />
                            <Route
                                path="/"
                                render={props => {
                                    return token ? <Main /> : <Redirect to="/auth" />
                                }}
                            />
                        </Switch>
                    </BrowserRouter>
                    <NotificationContainer />
                </div>
            )
        }
    },
)
export default Root
