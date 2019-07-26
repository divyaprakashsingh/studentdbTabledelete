import React, { Component } from 'react';
import "./App.css";
import Organization from './components/Organization';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

class App extends Component {

  render() {
    return (

      <div className="App">
        <AppBar position='static' color ='default'>
          <ToolBar>
          Organization List
          </ToolBar>
          </AppBar>
            
          
        <Organization />
      </div>
    );

  }
}
export default App;
