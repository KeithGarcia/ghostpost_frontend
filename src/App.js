import React from 'react';
import './App.css';

import Post from './Post'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/posts/')
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        this.setState({ results: data })
      })
  }

  handleBoasts = (e) => {
    fetch('http://localhost:8000/api/posts/boasts/')
      .then((res) => res.json())
      .then(data => {
        this.setState({ results: data })
      })
  }

  handleRoasts = (e) => {
    fetch('http://localhost:8000/api/posts/roasts/')
      .then((res) => res.json())
      .then(data => {
        this.setState({ results: data })
      })
  }
  handleSorting = (e) => {
    fetch('http://localhost:8000/api/posts/sort_posts/')
      .then((res) => res.json())
      .then(data => {
        this.setState({ results: data })
      })
  }

  handleUpVote = (e, id) => {
    fetch('http://localhost:8000/api/posts/' + id + '/add_upvote/', { method: "POST", headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then(data => { window.location.reload() })
  }

  handleDownVote = (e, id) => {
    fetch('http://localhost:8000/api/posts/' + id + '/add_downvote/', { method: "POST", headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then(data => { window.location.reload() })
  }

  render() {
    return (
      <div>
        <h1 >Ghostpost</h1>

        <ul>
          {this.state.results.map((r) => (
            <>
              <h1>{r.post_text}</h1>
              <li>{`roast or boast: ${r.roast_or_boast ? 'boast' : 'roast'}`}</li>

              <h1>{r.roast_or_boast ? 'Boast' : 'Roast'}</h1>
              <h2>
                ID: {r.id}
              </h2>
              <h2>
                Time Posted: {r.submission_date}
              </h2>
              <h2>
                Content: {r.post_text}
              </h2>
              <h2>
                Total Votes: {r.score}
              </h2>

              <li>Up Votes:{r.up_votes}</li>
              <li>Down Vots:{r.down_votes}</li>
              <li>Submission date:{r.submission_date}</li>
              <button onClick={(e) => this.handleUpVote(e, r.id)}>This is totally cool man</button>
              <button onClick={(e) => this.handleDownVote(e, r.id)}>I don't like this</button>
              <br />
            </>
          ))}</ul>
        <button onClick={this.handleBoasts}>Filter By Boasts</button>
        <button onClick={this.handleRoasts}>Filter By Roasts</button>
        <button onClick={this.handleSorting}>Filter By Vote Count</button>
        <Post />
      </div>
    );
  }
}

export default App;
