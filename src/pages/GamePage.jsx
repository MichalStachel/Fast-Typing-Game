import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class gameWindow extends Component {
    state = { 
        text:[]
     }

      componentDidMount() {
    fetch("https://www.randomtext.me/api/gibberish/h1/45")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          text: data.text_out.split("").slice(0, -5).slice(4),
        });
      });
  }
    render() { 
        return ( <div>
          <Route path='/game'>{this.state.text}</Route>  
        </div> );
    }
}
 
export default gameWindow;