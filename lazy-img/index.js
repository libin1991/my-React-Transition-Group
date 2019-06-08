import React, {Component} from 'react';
import Lazyimg from "./lazy-img.js"

import './index.css'


export default class App extends Component {
	
	state = {
		list: [   //https://github.com/zhansingsong/react-lazyimg-component
		    'http://zhansingsong.github.io/lazyimg/bg3.ef4f1660.jpg',
		    'http://zhansingsong.github.io/lazyimg/bg4.d1ff3b21.jpg',
			'http://zhansingsong.github.io/lazyimg/bg5.235d796c.png',
			'http://zhansingsong.github.io/lazyimg/bg6.84b34917.jpg',
			'http://zhansingsong.github.io/lazyimg/bg7.217c0a18.jpg',
			'http://zhansingsong.github.io/lazyimg/bg8.8394df69.jpg',
			'http://zhansingsong.github.io/lazyimg/bg9.b4fca14f.jpg'
		]
	}

	render() {
		return(
			<div className="App">
    	        {this.state.list.map((item, index) => (
    	        	<div className="App-logo"  key={index}>
			           <Lazyimg src={item} className="App-img" style={{border:'1px solid red'}}  alt="logo" />
			        </div>
			    ))}
    	  </div>
		)
	}
}