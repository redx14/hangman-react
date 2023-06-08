import { Button } from '@mui/material';
import { HangmanDrawing, HangmanKeyboard, HangmanWord } from '../components';
import { useCallback, useEffect, useState } from 'react';

function Screen2(props: any) {
	const { setShow, word } = props;
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [wordToGuess, setWordToGuess] = useState(word);

	const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

	const isLoser = incorrectLetters.length >= 6;

	const isWinner = wordToGuess.split('').every((letter: string) => guessedLetters.includes(letter));

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return;

			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, isWinner, isLoser]
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (!key.match(/^[a-z]$/)) return;

			e.preventDefault();
			addGuessedLetter(key);
		};

		document.addEventListener('keypress', handler);

		return () => {
			document.removeEventListener('keypress', handler);
		};
	}, [guessedLetters]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (key !== 'Enter') return;

			e.preventDefault();
			setGuessedLetters([]);
			setWordToGuess(word);
		};

		document.addEventListener('keypress', handler);

		return () => {
			document.removeEventListener('keypress', handler);
		};
	}, []);
	return (
		<div
			id='Screen2'
			style={{
				maxWidth: '800px',
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				margin: '0 auto',
				alignItems: 'center',
			}}
		>
			<h1>Screen2</h1>
			<div style={{ fontSize: '2rem', textAlign: 'center' }}>
				{isWinner && 'Winner! - Refresh to try again'}
				{isLoser && 'Nice Try - Refresh to try again'}
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
			<div style={{ alignSelf: 'stretch' }}>
				<HangmanKeyboard
					disabled={isWinner || isLoser}
					activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
					inactiveLetters={incorrectLetters}
					addGuessedLetter={addGuessedLetter}
				/>
			</div>
			<Button sx={{ margin: '10px' }} variant='contained' onClick={() => setShow(true)}>
				STOP!
			</Button>
		</div>
	);
}

export default Screen2;
