import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Styles';
import Theme from './Theme';
import { withStyles } from '@material-ui/core/styles';

let popup = (props) => {
	if (props.onlyIf === false) {
		return null;
	}

	let styles = {};
	styles.color = props.theme.color;
	styles.fontFamily = Theme.fontFamily;
	styles.background = Theme.default.fill;
	if (typeof props.fontSize !== 'undefined') {
		styles.fontSize = props.fontSize;
	}
	if (typeof props.width !== 'undefined') {
		//styles.width = props.width + "px";
	}

	const popUpWrapperClass = (props.retry) ? props.classes.popUpRetry : props.classes.popUp;

	return (
		<div className={popUpWrapperClass}>
			<div
				className={props.classes.popUpContent}
				style={styles}
			>
				{props.children}
			</div>
		</div>
	);
};

popup.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object,
	fontSize: PropTypes.string,
	onlyIf: PropTypes.bool,
	retry: PropTypes.bool,
	text: PropTypes.string,
	theme: PropTypes.any,
	width: PropTypes.number
};

popup.defaultTypes = {
	onlyIf: true,
	retry: false,
	text: "",
	theme: Theme.default,
};

export default withStyles(Styles)(popup);
