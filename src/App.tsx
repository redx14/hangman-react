import { useState } from 'react';
import './App.css';
import { Screen1, Screen2 } from './screens';

//Player 1 Enters a word
//Screen changes to game screen
//Player 2 Must Guess Word
//Keep track of letters used
//Keep track of if hangman
//If wrong guess color that letter red

function App() {
	const [show, setShow] = useState(true);
	const [word, setWord] = useState('');

	return (
		<div id='main' style={{ textAlign: 'center' }}>
			<h1 style={{ fontSize: '3rem' }}>HANG MAN!</h1>
			{show ? (
				<Screen1 setShow={setShow} setWord={setWord} />
			) : (
				<Screen2 setShow={setShow} setWord={setWord} word={word} />
			)}
		</div>
	);
}

export default App;
