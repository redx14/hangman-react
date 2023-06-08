import { Button, TextField } from '@mui/material';

const WordField = (props: any) => {
	const { setShow, setWord } = props;
	return (
		<div>
			<h2>Enter a word for player 2 to guess</h2>
			<TextField
				id='wordInput'
				label='Enter Word'
				variant='outlined'
				onChange={(e) => {
					setWord(e.target.value);
				}}
			/>
			<br />
			<Button sx={{ margin: '10px' }} variant='contained' onClick={() => setShow(false)}>
				GO!
			</Button>
		</div>
	);
};

export default WordField;
