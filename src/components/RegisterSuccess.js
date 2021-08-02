import React from "react";
import {navigate} from "../jsComponents/CommonFunction";

export class RegisterSuccess extends React.Component {

    render() {
        return(
            <div>
                <div className="jumbotron text-center" style={{backgroundColor:'#78ceca'}}>
                    <h2>Congratulation! You have successfully registered</h2>
                </div>
                <button type="button" onClick={()=>navigate("/home")} className="btn center-block" style={{marginTop: '5px'}}>
                    <span className="glyphicon glyphicon-home"></span><span style={{marginLeft:'5px', fontWeight:'bold'}}>Back to Home</span>
                </button>
            </div>
        );
    }
}