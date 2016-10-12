import React from 'react';
import requests from './request.js'

var request = requests.request

class RenderedLibs extends React.Component {


  render() {
    return (<div>
                <div>
                	{this.props.stories.map(story => <Story key={story._id} story={story} refreshStories={this.props.refreshStories} />)}
                </div>
    		</div>)
  }
}
 

class Story extends React.Component {
	deleteMadlib() {
		request('/api/story/' + this.props.story._id, 'DELETE', {}, 
		response => this.props.refreshStories())

	}

    render() {
        return (<div>{this.props.story.sentence}
        <button onClick={this.deleteMadlib.bind(this)}>X</button></div>);
    }
}

module.exports = RenderedLibs