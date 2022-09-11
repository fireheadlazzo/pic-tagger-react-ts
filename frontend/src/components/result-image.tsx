import React from 'react';

const ResultImage = (props: any) => {
  return (
    <div className={"resultImage"}>
      <img className="single-image" src={props.url} width={200}/>
    </div>
  );
};

export default ResultImage;