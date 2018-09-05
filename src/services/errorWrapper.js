import {NotificationManager} from 'react-notifications'

const errorWrapper = {
    wrap: error => {
        console.log(error)
        if (error && error.response && error.response.data) {
            const errData = error.response.data
            if (errData === 'No username or password') {
                NotificationManager.error('Enter login and password', 'Login error', 3000)
            } else if (errData === 'Wrong password') {
                NotificationManager.error('Wrong password', 'Login error', 3000)
            } else if (errData === 'Wrong username') {
                NotificationManager.error('Wrong username', 'Login error', 3000)
            } else {
                NotificationManager.error('Unknown error', 'Error!', 3000)
            }
        } else {
            NotificationManager.error('Server error', 'Error!', 3000)
        }
    },
}

export default errorWrapper
