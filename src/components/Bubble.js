
import React from 'react';
import PropTypes from 'prop-types';

/** Single Bubble */
class Bubble extends React.PureComponent {

	static propTypes = {
		r: PropTypes.number.isRequired,
		cx: PropTypes.number.isRequired,
		cy: PropTypes.number.isRequired,
		fontSize: PropTypes.number.isRequired,
		theme: PropTypes.object,
		text: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		//classes: PropTypes.any.isRequired
	}

	render() {
		let x = (this.props.cx - this.props.r),
			y = (this.props.cy - this.props.r),
			width = this.props.r * 2,
			height = this.props.r * 2,
			stroke = this.props.theme.stroke,
			fill = this.props.theme.fill;
		return (
			<g transform={"translate(" + this.props.cx + "," + this.props.cy + ")"} onClick={this.props.onClick}>
				<circle cx={0} cy={0} r={this.props.r} stroke={stroke} fill={fill}/>
				<text x="0" y="0" textAnchor="middle" dy=".3em" fontSize={this.props.fontSize}>
					{this.props.text.toUpperCase()}
				</text>
			</g>);
	}
}


export default Bubble;