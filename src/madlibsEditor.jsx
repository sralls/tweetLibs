import React from 'react';
import ReactDOM from 'react-dom';

import requests from './request.js'

var request = requests.request

 
class MadlibsEditor extends React.Component {

	addMadlib() {
		request('/api/story', 'POST', {
			sentence: this.state.sentence},
			response => this.props.refreshStories())
		}


  render() {
    return (<div>
    			<h1>Madlibs Editor</h1>
    			<textarea onChange={e => this.setState({sentence: e.target.value})} />
    			<button type="submit" onClick={this.addMadlib.bind(this)}>Submit Yo Words</button>
    		</div>
    	)
  }
}

module.exports = MadlibsEditor