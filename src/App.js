import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import Page from "./page.js";

class App extends React.Component {
  state = {
    key: "",
    text: [],
    mistake: 0,
    userWordAmount: 10,
  };

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      this.setState({
        key: e.key,
      });

      if (this.state.text[0] === e.key) {
        this.state.text.splice(0, 1);
        return;
      } else {
        this.setState({
          mistake: this.state.mistake + 1,
        });
      }
    });
  }

  addText = () => {
    fetch(
      `https://www.randomtext.me/api/gibberish/h1/${this.state.userWordAmount}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          text: data.text_out.toLowerCase().split("").slice(0, -5).slice(4),
          mistake: 0,
        });
      });
  };

  userSettings = (e) => {
    this.setState({
      userWordAmount: e.target.value,
    });
  };

  render() {
    const { text, mistake } = this.state;
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            {text}
            <div>
              <Link to={"/game"}>
                {text.length === 0 ? (
                  <button onClick={this.addText}>Start</button>
                ) : null}
              </Link>
            </div>
            {text.length === 0 ? (
              <>
                Words amount: <input type="text" onChange={this.userSettings} />
              </>
            ) : null}
            {text.length !== 0 ? (
              <p>
                Mistake count: <h1>{mistake}</h1>
              </p>
            ) : null}

            {<Page text={text} />}
          </div>
        </Router>
      </>
    );
  }
}

export default App;
