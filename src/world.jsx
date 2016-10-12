import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx'
import MadlibsEditor from './madlibsEditor.jsx'

class World extends React.Component {
  render() {
    return (<div>
    			<h1>Welcome to Mad Lib World!</h1>
    			<Login>
    				<MadlibsEditor/>
    			</Login>
    		</div>)
  }
}
 
ReactDOM.render(<World/>, document.getElementById('world'));
