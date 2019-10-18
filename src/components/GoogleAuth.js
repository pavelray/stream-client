import React, { Component } from 'react'

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
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () =>{
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    }

    onSignIn =()=>{
        this.auth.signIn();
    }

    onSignOut =()=>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null;
        }else if(this.state.isSignedIn){
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                   Sign Out
                </button>
            )
        }
        else{
            return(
                
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon"></i>
                </button>
            )
        }
    }

    render() {
        return (
            <span className="item">
                {this.renderAuthButton()} 
            </span>
        )
    }
}

export default GoogleAuth
