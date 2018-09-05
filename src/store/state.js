import {observable, decorate} from 'mobx'
import {constants} from '../config'

class StateStore {
    token = null
    username = null
    id = null
    isAdmin = null
    loadData() {
        const userdata = JSON.parse(localStorage.getItem(constants.userStorageProperty))
        if (userdata) {
            const {username, id, isAdmin} = userdata
            const token = localStorage.getItem(constants.tokenStorageProperty)
            this.username = username
            this.id = id
            this.isAdmin = isAdmin
            this.token = token
        }
    }
    loadToken() {
        this.token = localStorage.getItem(constants.tokenStorageProperty)
    }
    logIn(payload) {
        const {username, id, isAdmin, token} = payload
        localStorage.setItem(constants.userStorageProperty, JSON.stringify({username, id, isAdmin}))
        localStorage.setItem(constants.tokenStorageProperty, token)
        this.username = username
        this.id = id
        this.isAdmin = isAdmin
        this.token = token
    }
    logOut() {
        localStorage.removeItem(constants.tokenStorageProperty)
        localStorage.removeItem(constants.userStorageProperty)
        this.token = null
        this.id = null
        this.username = null
        this.isAdmin = null
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
    username: observable,
    id: observable,
    isAdmin: observable,
})

const stateStore = new StateStore()

export default stateStore
