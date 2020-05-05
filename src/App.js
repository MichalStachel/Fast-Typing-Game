import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Page from "./page.js";

class App extends React.Component {
  state = {
    text: [],
  };

  generateText = () => {
    fetch("https://www.randomtext.me/api/gibberish/h1/45")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.text_out);
        this.setState({
          text: data.text_out.split("").slice(0, -5).slice(4),
        });
      });
  };
  render() {
    console.log(this.state.text);
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            {this.state.text}
            <div>
              <Link to={"/game"}>
                <button>Start</button>
              </Link>
            </div>
            {<Page />}
          </div>
        </Router>
      </>
    );
  }
}

export default App;
