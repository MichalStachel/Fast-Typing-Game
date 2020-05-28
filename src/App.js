import React from "react";
import "./App.css";
import Typical from "react-typical";
import "animate.css/animate.min.css";

class App extends React.Component {
  state = {
    key: "",
    text: [],
    textCopy: [],
    writtenText: [],
    mistake: 0,
    countDown: 60,
    userWordAmount: 10,
    btnSett: true,
  };

  componentDidMount = () => {
    document.addEventListener("keydown", (e) => {
      const { text, key, textCopy, writtenText } = this.state;
      this.setState({
        key: e.key,
      });
      if (text[0] === e.key) {
        text.shift();
        if (this.state.countDown === 60 || this.state.countDown === -1) {
          let countDown = 60;
          const countInt = setInterval(() => {
            --countDown;
            this.setState({
              countDown,
            });

            if (this.state.countDown <= -1) {
              clearInterval(countInt);
              this.setState({
                writtenText: [],
                text: [],
                textCopy: [],
                userWordAmount: 10,
                key: "",
                countDown: 60,
              });
            } else if (
              this.state.writtenText.length === this.state.textCopy.length
            ) {
              console.log("clear");
              clearInterval(countInt);
              this.setState({
                writtenText: [],
                text: [],
                textCopy: [],
                userWordAmount: 10,
                key: "",
                countDown: 60,
              });
            }
          }, 1000);
        } else return;
      } else if (
        text[0] !== e.key &&
        text.length !== 0 &&
        text.length !== textCopy.length
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
      alert(`You Win!!!
      Mistakes:${this.state.mistake}
      Time left:${this.state.countDown}`);
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
  countDown = () => {};

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
  };

  handleFlag = () => {
    this.setState({ btnSett: !this.state.btnSett });
  };

  render() {
    const optionsArr = [10, 25, 50];
    const { text, mistake, key, writtenText, countDown, textCopy } = this.state;
    return (
      <div onChange={this.addLetter} className="center">
        {text.length === 0 || (text.length === 1 && text[0] === key) ? (
          <p id="title">
            <Typical
              loop={Infinity}
              wrapper="b"
              steps={["Typing game ...", 3000]}
            />
          </p>
        ) : null}

        <div className="App">
          {text != 0 ? (
            <div>
              <p className="textLeft" id="text">
                {this.state.btnSett ? textCopy : text}
              </p>
              <p className="textLeft" id="writtenText">
                {this.state.btnSett ? writtenText : null}
              </p>
            </div>
          ) : null}

          <div>
            {text.length === 0 || (text.length === 1 && text[0] === key) ? (
              <div className="row">
                <button onClick={this.addText} id="start">
                  Start
                </button>
                PlayStyle:
                <button onClick={this.handleFlag}>
                  {this.state.btnSett ? "Overwrite" : "Deleting"}
                </button>
              </div>
            ) : null}
          </div>
          {text.length === 0 ? (
            <>
              <span>Pick amount of words to write on 60 seconds</span>
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
            </>
          ) : null}
          <div className="mistake">
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
                  onfocus="javascript:this.value=''"
                  id="myTextArea"
                  spellCheck="false"
                />
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
