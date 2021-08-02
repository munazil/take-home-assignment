import React from "react";
import {setUser} from "../jsComponents/Session.js";
import { Link } from 'react-router-dom';
import { login } from "../jsComponents/api";
import { navigate } from "../jsComponents/CommonFunction"

export class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            pwd: "",
            errorMessage: ""
        }
    }

    handleLogin(){
        var body = {
            email: this.state.email,
            pwd: this.state.pwd
        }
        if(body.email === "")
            this.setState({errorMessage: <h3 className="text-center" style={{color:'red'}}>Please enter your email.</h3>})

        else if(body.pwd === "")
            this.setState({errorMessage: <h3 className="text-center" style={{color:'red'}}>Please enter your password.</h3>})

        else if(body.email !== ""){
            login(body,(res) => {
                if (res.status === 402) 
                    this.setState({errorMessage: <h3 className="text-center" style={{color:'red'}}>Email does not exist.</h3>})
                else if(res.status === 401)
                    this.setState({errorMessage: <h3 className="text-center" style={{color:'red'}}>Authentication failed</h3>})
                else if(res.status === 500)
                    this.setState({errorMessage: <h3 className="text-center" style={{color:'red'}}>Authentication failed</h3>})
                else{
                    setUser(res, () => {
                        navigate('/home')
                    })
                }
            })
        }
    }

    handleInputChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <div>
                <div className="jumbotron text-center">
                    <h1>Login</h1>
                </div>
                <form className="container">
                    <div className="form-group">
                        <input type="email" name="email" onChange={this.handleInputChange} className="form-control" placeholder="Enter your email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" name="pwd" onChange={this.handleInputChange} className="form-control" id="pwd" placeholder="Enter your password"></input>
                    </div>                    
                    <button type="button" onClick={() => this.handleLogin()} style={{backgroundColor: "green"}} className="btn btn-info btn-block">Login</button>
                    <p style={{marginTop:'5px'}}>Not yet registered? <Link to={"/Register"}>Click here</Link></p>
                </form>
                {this.state.errorMessage}
            </div>
        );
    }
}