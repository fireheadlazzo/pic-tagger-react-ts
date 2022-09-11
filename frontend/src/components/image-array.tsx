import React from 'react';
import ResultImage from "./result-image";

const ImageArray = (props: any) => {
  console.log("props", props);
  return (
    <div className={"imageArray"}>
      <p>Images:</p>
      <br/>
      {
        props.picData.map((e: any) => {
          return <ResultImage url={e.url}/>
        })
      }
    </div>
  );
};

export default ImageArray;