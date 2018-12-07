import axios from 'axios';
import * as React from 'react';

class HelloWorld extends React.Component<any, any> {
  constructor(props: string)
  {
    super(props);
    this.state = 
    {
      image: "",
      print: this.props.phrase,
      target: null
    };
  }

  public componentDidMount() {
    console.log('image', this.state.image);
    axios.get('https://localhost:3001/api/photo/12')
    .then(response => {
      console.log('response', response);
      this.setState({image: response.data});
    });
  }

  public render() {
    return (
      <div>
        <input 
          onChange={(e) => this.setState({target: e.target.value})}
          onSubmit={() => this.setState({image: axios.get(`/api/photos/${this.state.target}`)})}
        />
        <br/>
        {this.state.image}
        {this.state.print}
        {this.state.target}
        <img src={this.state.image}/>
      </div>
    );
  }
}

export default HelloWorld;