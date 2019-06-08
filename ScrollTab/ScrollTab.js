/**
 * image lazyload
 */
import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types"

export default class ScrollTab extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}

	}

	
	componentDidMount() {
		 

	}

	render() {

		return(
			<div className="nav-container">
				<ul className="nav-title">
					<li className="title-item"></li>
					<div></div>
				</ul>

				<div className="content">
					<ul  className="content-slider">
						<li className="content-item">
							 
						</li>
					</ul>
				</div>
			</div>
		)
	}

}