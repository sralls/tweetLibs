import React from 'react';
import requests from './request.js'

var request = requests.request

class RenderedLibs extends React.Component {


  render() {
    return (<div>
    			<p> Info pulled from database goes here(for users)!</p>
                <div>
                	{this.props.stories.map(story => <Story key={story._id} story={story}/>)}
                </div>
    		</div>)
  }
}
 

class Story extends React.Component {
    render() {
        return <div>{this.props.story.sentence}</div>;
    }
}

module.exports = RenderedLibs