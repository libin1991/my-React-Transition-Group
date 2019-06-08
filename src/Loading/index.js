import React from "react";
import ReactDOM from 'react-dom';
import Loading from './loading';

export default class Global {
	static loadingEle = '';
	static loading(content='',type=0,opacity=0) {
		var setting = {
			type: 0,
			content: "默认信息",
			opacity: 0
		};

		if(typeof content == "string") {
			setting = {
				...setting,
				content,
				type,
				opacity
			}
		} else {
			setting = { 
				...setting,
				...content
			}
		}
		this.show(setting);
	}
	
	static show(setting) {

		var div = document.createElement('div');
		var id = document.createAttribute("id");

		this.loadingEle = 'loadingEle-' + new Date().getTime();

		id.value = this.loadingEle;
		div.setAttributeNode(id);
		document.body.appendChild(div);

		ReactDOM.render(<Loading setting={setting} />, div);
	}

	static hide() {
		var loadingEle = document.querySelector("#" + this.loadingEle);
		if(loadingEle) {
			ReactDOM.unmountComponentAtNode(loadingEle);
			document.body.removeChild(loadingEle);
		}
	}
}