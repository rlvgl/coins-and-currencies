import { Typography } from '@mui/material';
import React from 'react';

const Coin = ({ data, usd }) => {
	const value = (Math.round((100 * usd) / data.value) / 100).toFixed(2);
	return (
		<div style={postStyles}>
			<div style={postContainer}>
				<Typography variant='h4'>{data.unit}</Typography>
				<Typography variant='h4' style={coinValue}>
					${value}
				</Typography>
			</div>
			<Typography variant='h5'>{data.name}</Typography>
		</div>
	);
};

const coinValue = {
	color: 'green',
};

const postStyles = {
	// border: '1px solid black',
	height: '100%',
	padding: '1rem',
};

const postContainer = {
	display: 'flex',
	justifyContent: 'space-between',
};

export default Coin;
