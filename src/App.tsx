import * as React from 'react';
import './App.css';
import HelloWorld from './components/HelloWorld'


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PicTagger v2</h1>
        </header>
        <HelloWorld phrase='Hello World...'/>
      </div>
    );
  }
}

export default App;
