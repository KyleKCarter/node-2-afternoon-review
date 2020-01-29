import React from 'react';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      quotes: [],
      userInput: 0,
      singleQuote: [],
      movie: '',
      character: '',
      quote: ''
    }
  }

  handleClick = () => {
    axios.get('/api/quotes')
      .then(response => {
        this.setState({ quotes: response.data })
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleGetSingleQuote = () => {
    axios.get(`/api/quotes/${this.state.userInput}`)
      .then(res => {
        this.setState({ singleQuote: [res.data] })
      })
  }

  addQuote = () => {
    const { movie, character, quote } = this.state;
    axios.post('/api/addQuote', { movie, character, quote })
      .then(res => {
        console.log(res)
        this.setState({
          movie: '',
          character: '',
          quote: ''
        })
      })
  }

  render() {
    let mappedQuotes = this.state.quotes.map((val, index) => {
      return (
        <div key={val.id}>
          <h4>{val.movie}</h4>
          <h6>{val.character}</h6>
          <p>{val.quote}</p>
        </div>
      )
    })

    let mappedSingleQuote = this.state.singleQuote.map((val) => {
      return (
        <div key={val.id}>
          <h4>{val.movie}</h4>
          <h6>{val.character}</h6>
          <p>{val.quote}</p>
        </div>
      )
    })
    // console.log(this.state.singleQuote)
    return (
      <div>
        <header>
          <h1>Quotes</h1>
        </header>
        <main>

          <div>
            <button onClick={this.handleClick}>Get Quotes</button>
            <div>{mappedQuotes}</div>
          </div>

          <div>
            <input onChange={this.handleChange} name='userInput' value={this.state.userInput} type="number" />
            <button onClick={this.handleGetSingleQuote}>Get One Quote</button>
            <div>{mappedSingleQuote}</div>
          </div>

          <div>
            <input type="text" name='movie' value={this.state.movie} onChange={this.handleChange} />
            <input type="text" name='character' value={this.state.character} onChange={this.handleChange} />
            <input type="text" name='quote' value={this.state.quote} onChange={this.handleChange} />
            <button onClick={this.addQuote}>Add Quote</button>
          </div>
        </main>
      </div>
    )
  }
}
