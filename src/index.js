import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Root from './components/root'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css'
import {stateStore} from './store'
stateStore.loadData()
ReactDOM.render(<Root />, document.getElementById('root'))
// registerServiceWorker()
