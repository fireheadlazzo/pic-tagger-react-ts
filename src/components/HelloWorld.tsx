import * as React from 'react';

class HelloWorld extends React.Component<any, any> {
  constructor(props: any)
  {
    super(props);
    this.state = 
    {
      print: this.props.phrase
    };
  }
  public render() {
    return (
      <div>
        {this.state.print}
      </div>
    );
  }
}

export default HelloWorld;