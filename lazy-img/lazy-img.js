/**
 * image lazyload
 */
import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

const ref = 'lazyload'

export default class LazyImg extends Component {

	constructor(props) {
		super(props);
		this.loadImg = this.loadImg.bind(this);
		this.state = {
			src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559998138555&di=b689ed7dfc64136bf6e892204042a827&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170720%2Fcd59c28a4c6d49bc8b4ecfcdffbc04f1_th.png',
			loaded: false
		}

	}

	loadImg() {
		if(!this.props.src) {
			return
		}
		let image = new Image()
		image.onload = () => {
			this.setState({
				src: this.props.src,
				loaded: true
			})
		}
		image.src = this.props.src
	}

	componentDidMount() {
		const self = this;
		if('IntersectionObserver' in window) {
			var io = new IntersectionObserver(
				entries => {
					entries.forEach(i => {
						if(i.intersectionRatio >= 0.25) { //可见元素占视窗的25%触发
							i.target.src = self.props.src
						}
					});
				}, {
					threshold: [0, 0.25, 0.5, 0.75, 1], //会执行5次
				}
			);
			io.observe(self.refs[ref]);
		} else {

			if(self.refs[ref].getBoundingClientRect().top < window.innerHeight) {
				self.loadImg();
			}

			window.addEventListener('scroll', function() {
				if(self.state.loaded) return;
				if(self.refs[ref].getBoundingClientRect().top < window.innerHeight) {
					self.loadImg()
				}
			}, true);

		}

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandler, true)
	}

	render() {
		var {
			src,
			...listprop
			
		} = this.props;

		return <img src={this.state.src} {...listprop} ref={ref} />
	}

}