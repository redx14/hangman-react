import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const WordField = (props: any) => {
	const { setShow, setWord } = props;
	const [isValid, setIsValid] = useState(true);
	return (
		<div>
			<h1>Enter a word for player 2 to guess</h1>
			<TextField
				id='wordInput'
				label='Enter Word'
				variant='outlined'
				type='password'
				onChange={(e) => {
					const newValue = e.target.value;
					newValue.match(/^[a-z]+$/) ? (setIsValid(true), setWord(e.target.value)) : setIsValid(false);
				}}
			/>
			<br />
			{isValid ? (
				<Button sx={{ margin: '10px' }} variant='contained' onClick={() => setShow(false)}>
					GO!
				</Button>
			) : (
				<h2 style={{ color: 'red' }}>Word can only contain letters</h2>
			)}
		</div>
	);
};

export default WordField;
