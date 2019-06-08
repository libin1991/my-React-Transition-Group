import React, {Component} from 'react';

import './index.css'

export default class App extends Component {
	constructor(props) {
		super(props);

		this.$el = null; //事件绑定
		this.$animate = null;
		this.windowWidth = 0; //页面宽度
        this.index=0;
        
		this.state = {
			
			list: ['第一页', '第二页', '第三页', '第四页'],
			page: ["1111", "2222", "3333", "4444"],
		 
		}

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)
	}

	getWindow() {
		this.$el = this.refs.$el;
		this.$animate= this.refs.$animate;
		
		this.$contentSlider = this.$el.getElementsByClassName("content-slider")[0];

		this.windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
		this.count = this.state.list.length;
        
        this.$contentSlider.style.width=this.windowWidth*this.count+'px';
        this.$contentSlider.style.left='0px';
        
        this.$animate.style.width=this.windowWidth/this.count+'px';
        this.$animate.style.left='0px';
        
		this.$$touch = {
			touching: false,
			pageY: 0,
			pageX: 0,
			startTime: 0,
			endTime: 0,
			offset:0
		};

		if('ontouchstart' in window) {
			this.$el.addEventListener('touchstart', this.handleTouchStart)
			this.$el.addEventListener('touchmove', this.handleTouchMove)
			this.$el.addEventListener('touchend', this.handleTouchEnd)
		} else {
			this.$el.addEventListener('mousedown', this.handleTouchStart)
			this.$el.addEventListener('mousemove', this.handleTouchMove)
			this.$el.addEventListener('mouseup', this.handleTouchEnd)
		}
	}
	
	getPosition(e) {
		if('ontouchstart' in window) {
			return {
				pageY: e.changedTouches[0].pageY,
				pageX: e.changedTouches[0].pageX
			}
		} else {
			return {
				pageY: e.pageY,
				pageX: e.pageX
			}
		}
	}
	handleTouchStart(e) {
		let {
			pageX,
			pageY
		} = this.getPosition(e);
		
		this.$$touch.startTime = e.timeStamp;
		this.$$touch.touching = true;
		this.$$touch.pageY = pageY;
		this.$$touch.pageX = pageX;
	}
	handleTouchMove(e) {
		if(!this.$$touch.touching) return;
		let {
			pageX,
			pageY
		} = this.getPosition(e);

		let offsetX = pageX - this.$$touch.pageX;
		
		this.$contentSlider.style.WebkitTransition = "all 0s";
		this.$contentSlider.style.transition= "all 0s";
		this.$contentSlider.style.left = this.$$touch.offset + offsetX +'px';
		
		this.$animate.style.WebkitTransition = "all 0s";
		this.$animate.style.transition= "all 0s";
		if(parseInt(this.$contentSlider.style.left)>0 || parseInt(this.$contentSlider.style.left) < -this.windowWidth*(this.count-1)){
			return false;
		}
        this.$animate.style.left=Math.abs(parseInt(this.$contentSlider.style.left)/parseInt(this.$contentSlider.style.width)*100)+'%';
	}
	handleTouchEnd(e) {
		this.$$touch.touching=false;
		
		let {
			pageX,
			pageY
		} = this.getPosition(e);
		
		let endTime = e.timeStamp;
		
		this.$contentSlider.style.WebkitTransition = "all 300ms ease";
		this.$contentSlider.style.transition= "all 300ms ease";
		
		this.$animate.style.WebkitTransition = "all 300ms ease";
		this.$animate.style.transition= "all 300ms ease";
		
		if(pageX-this.$$touch.pageX < -40){   //左滑
			this.index = ++this.index >= this.count ? this.index-1: this.index;
			this.$contentSlider.style.left =-(this.index * this.windowWidth) +'px';
			this.$$touch.offset=-(this.index * this.windowWidth);
	
		}else if (pageX-this.$$touch.pageX> 40){  //右滑
			this.index = --this.index < 0 ? 0 : this.index;
			this.$contentSlider.style.left =-(this.index * this.windowWidth) +'px';
		    this.$$touch.offset=-(this.index * this.windowWidth);
		}else {
			this.$contentSlider.style.left = - this.index * this.windowWidth +'px';
		}
		
		this.$animate.style.left=Math.abs(parseInt(this.$contentSlider.style.left)/parseInt(this.$contentSlider.style.width)*100)+'%';
	}
	componentDidMount() {
		this.getWindow();
	}
	render() {
		var {
			list,
			page
		} = this.state;

		return(
			<div className="nav-container">
				<ul className="nav-title">
					{list.map((item,index)=>{
						return <li  className="title-item" key={index}>{item}</li>
					})}
					<div className="withAnimate" ref="$animate"></div>
				</ul>
              
				<div ref="$el" className="content">
					<ul className="content-slider">
						{page.map((item,index)=>{
							return <li key={index} className="content-item">{item}</li>
						})}
					</ul>
				</div>
			</div>
		)
	}
}