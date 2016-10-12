import React from 'react';
import requests from './request.js'

var request = requests.request
var formRequest = requests.formRequest
// class Login extends React.Component{

//     render(){
//         return <div>Login will be here</div>

//     //     return  (<form action="/login" method="post">
//     //     <div className="form-group">
//     //         <label>Email</label>
//     //         <input type="text" className="form-control" name="email"/>
//     //     </div>
//     //     <div className="form-group">
//     //         <label>Password</label>
//     //         <input type="password" className="form-control" name="password"/>
//     //     </div>

//     //     <button type="submit" className="btn btn-warning btn-lg">Login</button>
//     // </form>)

//     }


// }

class Login extends React.Component {
  logIn(){
    formRequest('/login', "POST", {
                                username: this.state.username,
                                password: this.state.password
                                }, 
                               response => this.props.setLogin(response.loggedIn))
  }

  logOut(){
    request('/logout', "GET", null, response => this.setState({loggedIn: response.loggedIn}))
  }

  render() {

        return  (<div>
                    <input type="text" onChange={e => this.setState({username: e.target.value})}/>
                    <input type="password" onChange={e => this.setState({password: e.target.value})}/>
                    <button type="submit" onClick={this.logIn.bind(this)}>Login</button>
                </div>)
  }
}

module.exports = Login


