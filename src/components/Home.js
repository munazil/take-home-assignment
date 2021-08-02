import React from "react";
// import { Registration } from "./Registration"
import { Login } from "./Login"
import { Profile } from "./Profile"
import {getUser} from "../jsComponents/Session.js";

export class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            content: ""
        }
    }

    render() {
        let content = "";
        getUser((user)=>{
            if (user.name === "" || user.name === null) {
                content = <Login/>
            }            
            else{
                content = <Profile user={user} />
            }
        })

        return(
            <div>
                {content}
            </div>
        );
    }
}
// takehome