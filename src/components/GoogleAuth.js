import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signIn,signOut} from '../redux/actions';

export class GoogleAuth extends Component {
    state = {
        isSignedIn: null
    }

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '605157245862-s4d6k4s8ifq1t65ugmqhhb835opkfgt4.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if(isSignedIn){
            this.props.signIn();
        }
        else{
            this.props.signOut();
        }
    
    }

    onSignIn =()=>{
        this.auth.signIn();
    }

    onSignOut =()=>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon">Sign Out</i>
                </button>
            )
        }
        else{
            return(
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon">Sign In</i>
                </button>
            )
        }
    }

    render() {
        return (
        <>
           {this.renderAuthButton()}
        </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn : state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth)
