import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    key: "",
    text: [],
    textCopy: [],
    writtenText: [],
    mistake: 0,
    countDown: 60,
    userWordAmount: 10,
  };

  componentDidMount = () => {
    document.addEventListener("keydown", (e) => {
      this.setState({
        key: e.key,
      });
      if (this.state.text[0] === e.key) {
        this.state.text.shift();
      } else if (
        this.state.text[0] !== e.key &&
        this.state.text.length !== 0 &&
        this.state.text.length !== this.state.textCopy.length
      ) {
        this.setState({
          mistake: ++this.state.mistake,
        });
      }
    });
  };
  componentDidUpdate = () => {
    const { text, mistake, countDown } = this.state;
    if (this.state.text.length === 1 && this.state.text[0] === this.state.key) {
      this.state.writtenText = [];
    }
    if (countDown === 0) {
      alert(`You lose :(
        Letters remain: ${text.length}
        Mistakes: ${mistake}`);
    }
  };

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
          textCopy: data.text_out.toLowerCase().split("").slice(0, -5).slice(4),
          mistake: 0,
        });
      });

    this.setState({
      flag: false,
    });
  };

  // Define amount of words you want to write
  userSettings = (e) => {
    this.setState({
      userWordAmount: e.target.value,
    });
  };

  // Countdown timer
  countDown = () => {
    let countDown = 10;
    const countInt = setInterval(() => {
      countDown--;
      this.setState({
        countDown,
      });

      if (countDown <= -1) {
        clearInterval(countInt);
        this.setState({
          writtenText: [],
          text: [],
          textCopy: [],
          userWordAmount: 10,
          key: "",
        });
      }
    }, 1000);
  };

  // Clear states
  clear = () => {
    if (this.state.text.length === 0) {
      this.setState({
        writtenText: [],
        text: [],
        textCopy: [],
        userWordAmount: 10,
        key: "",
      });
    }
  };

  // Add letter to writtenText Array
  addLetter = () => {
    let arr = [...this.state.writtenText];
    const { text, writtenText, textCopy } = this.state;

    if (text.length + 1 + writtenText.length === textCopy.length) {
      arr.push(textCopy[writtenText.length]);

      this.setState({
        writtenText: arr,
      });
    }

    console.log(text.length + 1, writtenText.length, textCopy.length);
  };

  render() {
    const optionsArr = [20, 50, 100];
    const { text, mistake, key, writtenText, countDown } = this.state;
    return (
      <div onChange={this.addLetter} className="center">
        <div className="App">
          <p className="textLeft"> {text}</p>
          <p className="textLeft" id="writtenText">
            {writtenText}
          </p>
          <div>
            {text.length === 0 || (text.length === 1 && text[0] === key) ? (
              <button onClick={this.addText}>Start</button>
            ) : null}
          </div>
          {text.length === 0 ? (
            <ul>
              {optionsArr.map((item) => (
                <li>
                  <button
                    onClick={() => {
                      this.setState({ userWordAmount: item });
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {text.length !== 0 ? (
            <p>
              Mistakes: <span className="red">{mistake}</span>
            </p>
          ) : null}

          {text.length !== 0 ? (
            <p>
              {countDown}
              <input
                type="text"
                placeholder="Click HERE and start writing"
                onClick={this.countDown}
                onChange={this.clear}
                id="myTextArea"
                spellCheck="false"
              />
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
