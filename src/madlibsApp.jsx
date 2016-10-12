import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx'
import Logout from './logout.jsx'
import RenderedLibs from './RenderedLibs.jsx'
import MadlibsEditor from './MadlibsEditor.jsx'
import requests from './request.js'
var request = requests.request

class MadlibsApp extends React.Component {
    componentWillMount() {
        request('/api/user', 'GET', null, loggedInResp => {
          request('/api/story', 'GET', null, storyResponse => 
            this.setState({stories: storyResponse,
            			   loggedIn: loggedInResp.loggedIn
            			})
            )
        })
    }

    setLogin(value){
    	this.setState({loggedIn: value})
    }
    refreshStories(){
    	request('/api/story', 'GET', null, response => 
            this.setState({stories: response}))
    }
    render() {
        if(!this.state){
        	return <div>loading... </div>
        } else if (!this.state.loggedIn){
        	return (<div>
        			 <Login setLogin={this.setLogin.bind(this)}/>
        			</div>)
        } else {
        	return (<div> 
        			<Logout setLogin={this.setLogin.bind(this)}/>
        			<MadlibsEditor refreshStories={this.refreshStories.bind(this)} />
        			<RenderedLibs stories={this.state.stories} />
        		   </div>)
        };
    }
}

ReactDOM.render(<MadlibsApp/>, document.getElementById('app'));

