import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subreddit: 'python',
      posts: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
    .then(res => {
      const posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts });
    });
  }

  handleChange(event) {
    this.setState({subreddit: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>{`/r/${this.state.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
        <h2>Fetch a new subreddit</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.value}  />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="this.state.subreddit" />,
  document.getElementById('root')
);
