function setUser(obj, callback) {
    let body = {
        name: obj.name, 
        email: obj.email,
        token: obj.token
    }
    localStorage.setItem('userData', JSON.stringify(body));
    callback()
}

function getUser(callback) {
    let user = localStorage.getItem('userData')
    user = JSON.parse(user)
    if (user === null) {
        user = {name: '', email: ''}
    }
    callback(user)
}

function logout(callback) {
    let obj = {name: '', email: ''}
    localStorage.setItem('userData', JSON.stringify(obj));
    callback()
}

export {setUser, getUser, logout}