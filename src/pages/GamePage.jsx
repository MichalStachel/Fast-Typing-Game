import React from 'react';
import { Route } from 'react-router-dom';

const gameWindow = (props) => {

  return ( <div id="pew">
    <Route path='/game'><p id="text">{props.text}</p></Route>  
  </div> );
}
 
export default gameWindow;