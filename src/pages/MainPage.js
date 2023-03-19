import React, { useState, useEffect } from 'react';
import Coin from '../components/Coin';
import axios from 'axios';
import { Typography, Button, ButtonGroup } from '@mui/material';

const MainPage = () => {
	const [coins, setCoins] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [btcToDollar, setBtcToDollar] = useState(0);

	// 0: both | 1: only coins | 2: only currencies
	const [userOpts, setUserOpts] = useState(1);

	useEffect(() => {
		const options = {
			method: 'GET',
			url: 'https://api.coingecko.com/api/v3/exchange_rates',
		};

		axios.request(options).then((res) => {
			setCoins(Object.values(res.data.rates).slice(0, 11));
			setCurrencies(Object.values(res.data.rates).slice(11));
			setBtcToDollar(res.data.rates['usd'].value);
		});
	}, []);

	return (
		<div style={mainPageStyles}>
			{/* Home Hero */}
			<section style={heroStyle}>
				<Typography variant='h1' style={headerStyle}>
					Coins and Currencies
				</Typography>
				<Typography variant='h5' style={subheaderStyle}>
					Check the price of cryptocurrencies and normal currencies
				</Typography>

				<div>
					<ButtonGroup variant='text'>
						<Button onClick={() => setUserOpts(0)}>
							Coins and Currencies
						</Button>
						<Button onClick={() => setUserOpts(1)}>
							Only Coins
						</Button>
						<Button onClick={() => setUserOpts(2)}>
							Only Currencies
						</Button>
					</ButtonGroup>
				</div>
			</section>

			{/* Coin Grid */}
			<section style={coinGrid}>
				{(userOpts === 0 || userOpts === 1) &&
					coins.map((data, key) => {
						return <Coin data={data} usd={btcToDollar} key={key} />;
					})}
				{(userOpts === 0 || userOpts === 2) &&
					currencies.map((data, key) => {
						return <Coin data={data} usd={btcToDollar} key={key} />;
					})}
			</section>

			<footer style={footerStyle}>
				<Typography variant='text'>Powered by CoinGecko</Typography>
			</footer>
		</div>
	);
};

const footerStyle = {
	display: 'flex',
	justifyContent: 'center',
	margin: '3rem 0',
};

const subheaderStyle = {
	marginBottom: '2rem',
};

const headerStyle = {
	margin: '1rem 0 ',
};

const heroStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginBottom: '5rem',
};

const coinGrid = {
	display: 'grid',
	alignItems: 'center',
	gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
	gridGap: '40px',
};

const mainPageStyles = {
	padding: '4rem 10rem',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	// justifyContent: 'space-between',
	minHeight: '100vh',
	// backgroundColor: 'black',
	// color: 'white',
};

export default MainPage;
