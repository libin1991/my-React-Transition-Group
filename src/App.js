import React, { Component } from 'react';

import Loading from './Loading/index' 
import Transition from './transition/Transition'
import TransitionGroup from './transition/TransitionGroup'
import { CSSTransition } from 'react-transition-group'
import './App.css'
import logo from './logo.svg';




let idx = 1
class App extends Component {
  state = {
    list: ['Transition-Group-Demo-0'],
    show: true
  }

  addClick = () => {
    let list = this.state.list.slice()
    this.setState({
      show: true,
      list: list.concat(['Transition-Group-Demo-' + idx++])
    })
  }

  deleteClick = () => {
    let list = this.state.list.slice()
    if (list.length === 0) return
    list.splice(0, 1)
    console.log('list=>', list);
    
    this.setState({
      show: false,
      list: list
    })
  }
  
  loading=()=>{
  	Loading.loading("哈哈")
  }
  
  handleEnter = (el) => {
    //console.log('111', el.scrollHeight)
  }

  handleLeave = (el) => {
     //console.log('222', el.scrollHeight)
  }

  render() {
    
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <div className="btn-con">
	          <button onClick={this.addClick}>增加一条数据</button>
	          <button onClick={this.deleteClick}>删除一条数据</button>
	          <button onClick={this.loading}>loading</button>
          </div>
        </header>
         {/*
         <Transition show={this.state.show} className="zoom" onEnter={this.handleEnter} onLeave={this.handleLeave}>
          <div><h1>see you next time 1</h1></div>
        </Transition>
        
        <CSSTransition in={this.state.show} timeout={400} classNames="fade">
          <div><h1>see you next time 2</h1></div>
        </CSSTransition>
        */}
       
        <TransitionGroup component="ul" className="grop">
          {this.state.list.map((item, key) => (
			      <Transition 
			        key={key} 
			        className="rotate"
			        onEnter={this.handleEnter} 
			        onLeave={this.handleLeave}>
			        <li>
			           <img src={logo} className="App-logo" alt="logo" />
			           <span>{item}</span>
			        </li>
			      </Transition>
			    ))}
        </TransitionGroup>
 
      </div>
    );
  }
}

export default App;
