import React from 'react'
import PropTypes from "prop-types"
import classNames from './classnames'

import './transition.css'

function noop() {}

export default class Transition extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		onEnter: PropTypes.func,
		onLeave: PropTypes.func,
		show: PropTypes.bool
	}

	static defaultProps = {
		className: '',
		onEnter: noop,
		onLeave: noop,
		show: false
	}

	constructor(props) {
		super(props)
		this.state = {
			entering: props.show,
			leaving: false,
			visible: props.show
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.show && nextProps.show) {
			this.setState({
				entering: true,
				leaving: false,
				visible: true
			})
		} else if(this.props.show && !nextProps.show) {
			this.setState({
				entering: false,
				leaving: true,
				visible: true
			})
		}
	}

	componentWillUnmount() {
		console.log('>>>>> componentWillUnmount')
		this.setState({
			entering: false,
			leaving: false,
			visible: false
		})
	}

	animationEnd = (e) => {
		const el = e.target
		const {
			onEnter,
			onLeave
		} = this.props;
		
		const {
			entering,
			leaving
		} = this.state;
		
		this.setState({
			entering: false,
			leaving: false,
			visible: entering
		})

		if(entering) {
			onEnter && onEnter(el)
		} else if(leaving) {
			onLeave && onLeave(el)
		}
	}

	getClasses() {
		const {
			className
		} = this.props;
		
		const {
			entering,
			leaving
		} = this.state;
		
		return classNames({
			[`rodal-${className}-enter`]: entering,
			[`rodal-${className}-leave`]: leaving
		})
	}

	render() {
		const {
			visible
		} = this.state;
		
		const {
			children,
			...inProps
		} = this.props;
		
		var childrenPropsList=children.props.className||'';
		
		const style = {
			display: visible ? '' : 'none'
		}
		
		const child = React.Children.only(children);
		
		
		
		const childProps = { ...inProps,
			className: childrenPropsList+' '+this.getClasses(),
			style: style,
			onAnimationEnd: this.animationEnd,
			ref: (el) => {
				this.refs = el
			}
		}

		delete childProps.onEnter;
		delete childProps.onLeave;
		delete childProps.show;
		
		
		console.log(React.cloneElement(child, childProps))
		
		return React.cloneElement(child, childProps)
	}
}