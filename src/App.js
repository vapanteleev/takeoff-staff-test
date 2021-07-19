import Main from "./Main"
import React, { Component, useState } from 'react';
import axios from 'axios'
import Auth from "./Auth/Auth";
import { connect, Provider } from "react-redux";
import authReducer from "./store/reducers/auth";







class App extends Component {
  render() {
    
  

    
    return (
   
      <div id="root">
        
  
        {this.props.isAuth?<Main />:
          <Auth />}
      
 
         
      
      </div>
      
    )
  }
}
function mapStateToProps(state) {
  return {
    isAuth:!!state.auth.token
  }
}

export default connect(mapStateToProps)(App) 