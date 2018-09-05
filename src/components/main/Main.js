import React, {Component} from 'react'
import {Button} from 'reactstrap'
import {Route, Switch, Redirect} from 'react-router-dom'
import {stateStore} from '../../store'
import {Admin} from '../admin'
import {Voting} from '../voting'
import {observer} from 'mobx-react'

const Main = observer(
    class Main extends Component {
        render() {
            const isAdmin = stateStore.isAdmin
            return (
                <Switch location={this.props.location}>
                    <Route
                        path="/admin"
                        render={props => {
                            return isAdmin ? <Admin {...props} /> : <Redirect to="/" />
                        }}
                    />
                    <Route path="/" component={Voting} />
                </Switch>
            )
        }
    },
)

export default Main
