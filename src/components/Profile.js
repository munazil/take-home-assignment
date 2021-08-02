import React from "react";
import {logout} from "../jsComponents/Session.js";
import { getAllUsers } from "../jsComponents/api";

export class Profile extends React.Component {
    constructor(props){
        super()
        this.state = {
            user: props.user
        }
    }

    logoutEvent(){
        logout(()=>{
            window.location.replace("/home")
        })
    }

    getListOfusers(){
        var token = this.state.user.token
        getAllUsers(token, (res)=>{
            console.log(res)
        })
    }

    render() {
        return(
            <div>
                <div className="jumbotron text-center" style={{backgroundColor:'#84d658'}}>
                    <h1>Welcome</h1>
                </div>
                <div>
                    <h3>Name: <small className="lead">{this.state.user.name}</small></h3>
                    <h3>Email: <small className="lead">{this.state.user.email}</small></h3>
                </div>
                <button type="button" onClick={this.logoutEvent} className="btn btn-warning">Log Out</button>
                <hr></hr>
                {/* <button type="button" onClick={() => this.getListOfusers()} className="btn" style={{fontSize:'20px', backgroundColor: 'blueviolet', color:'white'}}>Get List of users</button> */}
            </div>
        );
    }
}