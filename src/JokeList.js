import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.css';

export class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { 
            jokes: [] 
        }
    }

    async componentDidMount(){
        let jokes = [];
        while(jokes.length < this.props.numJokesToGet){
            //Load jokes
            //Data defaults to return as type HTML, so we have to request json wit headers
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: {Accept: "application/json"}
            });
            jokes.push({id: uuid (), text: res.data.joke, votes: 0})
        }
        this.setState({ jokes: jokes })
    }

    //Function handles the up or down votes on the jokes
    handleVote(id, delta){//Delta is a neg or pos number that gets passed to the function.
        this.setState(st => ({//Since we are incrementing and decrementing we have to use the callback version of setState
                jokes: st.jokes.map(j => 
                    j.id === id ? {...j, votes: j.votes + delta} : j
                )
            }));
    }

    render() {
        return (
            <div className="JokeList">
            <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                <span>Dad</span> Jokes
                </h1>
                <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                <button className="JokeList-getmore">New Jokes</button>
            </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map( j => (
                        <Joke key={j.id} 
                        votes={j.votes} 
                        text={j.text} 
                        upVote={() => this.handleVote(j.id, 1)} 
                        downVote={() => this.handleVote(j.id, -1)}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeList
