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
  public render() {
    return (
      <div>
        <input 
          onChange={(e) => this.setState({target: e.target.value})}
          onSubmit={() => this.setState({image: axios.get(`/api/photos/${this.state.target}`)})}
        />
        {this.state.print}
        <img src={this.state.image}/>
      </div>
    );
  }
}

export default HelloWorld;