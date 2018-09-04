import React, {Component} from 'react'
import {Button} from 'reactstrap'
import {stateStore} from '../../store'

class Main extends Component {
    exit = e => {
        e.preventDefault()
        stateStore.deleteToken()
    }
    render() {
        return (
            <div>
                <h2>Тут будет главная</h2>
                <Button color="danger" onClick={this.exit}>
                    Выйти
                </Button>
            </div>
        )
    }
}

export default Main
