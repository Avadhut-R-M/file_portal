import './App.css';
import React, {Component} from 'react'
import Header from './components/base/Header';
import { connect } from 'react-redux';
import MainTab from './components/app-components/MainTab';
import Me from './components/app-components/Me';
import {Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from './components/app-components/Auth';
import Portal from './components/app-components/Portal';

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Header/>
        <Routes>
            {this.props.is_loggedin &&<Route path="/me" element={<Me />} />}
            {this.props.is_loggedin && <Route path="/upload" element={<MainTab />} />}
            {!this.props.is_loggedin && <Route exact path="/" element={<Auth />} />}
            {!this.props.is_loggedin && <Route path='*' exact={true} element={<Auth />} />}
            <Route path="/" element={<Portal />} />
        </Routes>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    is_loggedin: state.auth.is_loggedin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);