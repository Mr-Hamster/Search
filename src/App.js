import React from 'react';
import './App.css';
import Search from './components/search';

export default class App extends React.Component{
  render(){
    return(
      <div className='App'>
        <Search />
      </div>
    );
  }
}
