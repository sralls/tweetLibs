import React from 'react';
import ReactDOM from 'react-dom';
import requests from './request.js'

var request = requests.request

class RenderedLibs extends React.Component {

  componentWillMount() {
        request('/api/story', 'GET', null, response => 
            this.setState({sentences: response}))
  }

  render() {
    return (<div>
    			<p> Info pulled from database goes here(for users)!</p>
                <div>
                	{this.state && this.state.sentences.map(story => <Story key={story._id} story={story}/>)}
                </div>
    		</div>)
  }
}
 
ReactDOM.render(<RenderedLibs/>, document.getElementById('renderedLibs'));

class Story extends React.Component {
    render() {
        return <div>{this.props.story.sentence}</div>;
    }
}

module.exports = RenderedLibs