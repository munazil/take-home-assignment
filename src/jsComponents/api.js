import $ from "jquery";


var serverUrl = 'http://localhost:8080'

function signup(data, callback) {
    console.log(data)
    var settings = {
        "url": serverUrl + "/user/signup",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": data.name,
            "email": data.email,
            "pwd":data.pwd
        }),
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response.status);
        callback(response.status)
    })
    .catch(err => {
        console.log(err.status);
        callback(err.status)
    });
}

function login(req, callback){
    console.log(req)
    var settings = {
        "url": serverUrl + "/user/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({"email":req.email,"pwd":req.pwd}),
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            callback(response)
        })
        .catch(err => {
            console.log(err.status);
            callback({status: err.status})
        });
}

function getAllUsers(token, callback){

    var settings = {
        "url":  serverUrl + "/user/getall",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        callback(response)
      });
}

export {signup, login, getAllUsers}