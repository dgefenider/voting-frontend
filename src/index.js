import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Root from './components/root'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
