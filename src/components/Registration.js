import React from "react";
import { 
    navigate, 
    validateEmail, 
    validateCapitalLetters, 
    validateLowerCaseLetters,
    validateNonAlphaNumericLetters,
    validateLength} from "../jsComponents/CommonFunction";
import { signup } from "../jsComponents/api";

export class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            pwd: "",
            cnfrmPwd: "",
            emailFormat: "",

            pwdFormat:{
                case1: "",
                case2: "",
                case3: "",
                case4: ""
            },
            cnfrmPwdCondition: "",

            registrationCondition: ""
        }

    }

    handleRegister(){
        var body = {
            name: this.state.name,
            email: this.state.email,
            pwd: this.state.pwd,
        }
        signup(body, (res) => {
            if (res === 409)
                this.setState({ registrationCondition: "Email already exist."})
            else if (res === 500)
                this.setState({ registrationCondition: "Registration failed."})
            else
                navigate('/RegisterSuccess')
        })
    }

    checkInputField(){
        var register = true

        if (this.state.pwd !== this.state.cnfrmPwd){
            this.setState({ registrationCondition: "Please confirm your password."})
            register = false
        }
        
        var pwdCondition = true
        if (!validateLowerCaseLetters(this.state.pwd))
            pwdCondition = false
        if (!validateCapitalLetters(this.state.pwd))
            pwdCondition = false
        if (!validateNonAlphaNumericLetters(this.state.pwd))
            pwdCondition = false
        if (!validateLength(this.state.pwd))
            pwdCondition = false
        if(pwdCondition === false){
            this.setState({ registrationCondition: "Please meet the password requirements."})
            register = false
        }
        
        if (!validateEmail(this.state.email)){
            this.setState({ registrationCondition: "Email invalid."})
            register = false
        }
        
        if (this.state.name.length < 1){
            this.setState({ registrationCondition: "Please enter your name."})
            register = false
        }

        if(register)
            this.handleRegister()
        
    }

    handleInputChange = (event) =>{
        var case1 = ''
        var case2 = ''
        var case3 = ''
        var case4 = ''

        this.setState({
            [event.target.name]: event.target.value
        })

        if (event.target.name === "email") {            
            if (validateEmail(event.target.value)) {
                this.setState({ emailFormat: <p style={{fontWeight:'bold', marginLeft: '5px', color:'green'}}>Email format is valid</p>})
            }           
            else
                this.setState({ emailFormat: <p style={{fontWeight:'bold', marginLeft: '5px', color:'red'}}>Email format is invalid!</p>})
            if (event.target.value === "")
                this.setState({ emailFormat: ""})
        }

        if (event.target.name === "pwd"){
            if(validateLowerCaseLetters(event.target.value))
                case1 = <p style={{margin:'0px', color:'green'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-ok"></span> At least have one lowerCase letter.</p>
            else
                case1 = <p style={{margin:'0px',color:'red'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-remove"></span> At least have one lowerCase letter.</p>
            if(validateCapitalLetters(event.target.value))
                case2 = <p style={{margin:'0px', color:'green'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-ok"></span> At least have one capital letter.</p>
            else
                case2 = <p style={{margin:'0px', color:'red'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-remove"></span> At least have one capital letter.</p>
            if(validateNonAlphaNumericLetters(event.target.value))
                case3 = <p style={{margin:'0px', color:'green'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-ok"></span> At least have one non-alphanumeric character.</p>
            else
                case3 = <p style={{margin:'0px', color:'red'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-remove"></span> At least have one non-alphanumeric character.</p>
            if(validateLength(event.target.value))
                case4 = <p style={{margin:'0px', color:'green'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-ok"></span> At least 12 characters.</p>
            else
                case4 = <p style={{margin:'0px', color:'red'}}><span style={{marginRight:'5px'}} className="glyphicon glyphicon-remove"></span> At least 12 characters.</p>

            if (event.target.value !== "") {
                this.setState({ pwdFormat: {
                    case1: case1,
                    case2: case2,
                    case3: case3,
                    case4: case4
                }})
            }
            else
                this.setState({ pwdFormat: {}})
        }

        if (event.target.name === "cnfrmPwd"){
            if (event.target.value !== this.state.pwd) {
                this.setState({ cnfrmPwdCondition: <p style={{margin:'0px', color:'red'}}>Confirmation password must be the same.</p>})
            }
            else
                this.setState({ cnfrmPwdCondition: ""})
            if (event.target.value === "")
                this.setState({ cnfrmPwdCondition: ""})
        }

        this.setState({ registrationCondition: ""})
    }

    render() {
        const {name, email, pwd, cnfrmPwd, emailFormat, cnfrmPwdCondition, registrationCondition} = this.state
        const {case1, case2, case3, case4} = this.state.pwdFormat            

        return(
            <div>
                <div className="jumbotron text-center">
                    <h1>Registration</h1>
                </div>
                <form className="container">
                    <div className="form-group">
                        <input value={name} onChange={this.handleInputChange} name="name" type="text" className="form-control" placeholder="Enter your name"></input>
                    </div>
                    <div className="form-group">
                        <input value={email} onChange={this.handleInputChange} name="email" type="email" className="form-control" placeholder="Enter your email"></input>
                    </div>
                    {emailFormat}
                    <div className="form-group">
                        <input value={pwd} onChange={this.handleInputChange} name="pwd" type="password" className="form-control" id="pwd" placeholder="Enter your password"></input>
                        {case1}
                        {case2}
                        {case3}
                        {case4}
                    </div>
                    <div className="form-group">
                        <input value={cnfrmPwd} onChange={this.handleInputChange} name="cnfrmPwd" type="password" className="form-control" id="cnfrmPwd" placeholder="Confirm password"></input>
                        {cnfrmPwdCondition}
                    </div>
                    <button type="button" onClick={() => this.checkInputField()} className="btn btn-info btn-block">Register</button>
                    <h4 className="text-center" style={{color:'red'}}>{registrationCondition}</h4>
                    <button type="button" onClick={()=>navigate("/home")} className="btn center-block" style={{marginTop: '5px'}}>
                        <span className="glyphicon glyphicon-home"></span>
                    </button>
                </form>
            </div>
        );
    }
}
