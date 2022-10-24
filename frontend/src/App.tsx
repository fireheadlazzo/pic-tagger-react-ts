import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResultImage from "./components/result-image";
import axios, { AxiosResponse } from "axios";
import ImageArray from "./components/image-array";

type MyState = {
  images: { url: string }[]
};

class App extends React.Component<any, any> {
  state: MyState = {
    images: []
  }

  componentDidMount() {
    const request = {
      method: "GET",
      url: "http://localhost:8000/i/"
    };
    console.log("request", request);
    return axios(request)
      .then((response: AxiosResponse<any>) => {
        console.log("response", response);
        this.setState({
          images: response.data.map((image: any) => {
            return { url: image?.url };
          })
        });
      })
      .catch(err => console.log(`Error in ComponentDidMount() - ${err}`));
  }

  render() {
    return (
      <div className="App">
        <ImageArray picData={this.state.images} />
      </div>
    );
  }
}

export default App;
