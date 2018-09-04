import {observable, decorate} from 'mobx'
import {constants} from '../config'

class StateStore {
    token = null
    loadToken() {
        this.token = localStorage.getItem(constants.tokenStorageProperty)
    }
    setToken(token) {
        localStorage.setItem(constants.tokenStorageProperty, token)
        this.token = token
    }
    deleteToken() {
        localStorage.removeItem(constants.tokenStorageProperty)
        this.token = null
    }
}
decorate(StateStore, {
    token: observable,
})

const stateStore = new StateStore()

export default stateStore
