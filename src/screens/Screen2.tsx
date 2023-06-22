import { Button } from '@mui/material';
import { HangmanDrawing, HangmanKeyboard, HangmanWord } from '../components';
import { useCallback, useEffect, useState } from 'react';

function Screen2(props: any) {
	const { setShow, setWord, word } = props;
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

	const incorrectLetters = guessedLetters.filter((letter) => !word.includes(letter));

	const isLoser = incorrectLetters.length >= 6;
	const isWinner = word.split('').every((letter: string) => guessedLetters.includes(letter));

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

	const handleClick = () => {
		setShow(true);
		setWord('');
	};

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
			<div style={{ fontSize: '3rem', textAlign: 'center' }}>
				{isWinner && 'You Won! -'}
				{isLoser && 'You Lost! -'}
				<Button sx={{ margin: '10px' }} variant='contained' onClick={() => handleClick()}>
					{isWinner || isLoser ? 'Play Again?' : 'Back'}
				</Button>
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord reveal={isLoser} guessedLetters={guessedLetters} word={word} />
			<div style={{ alignSelf: 'stretch' }}>
				<HangmanKeyboard
					disabled={isWinner || isLoser}
					activeLetters={guessedLetters.filter((letter) => word.includes(letter))}
					inactiveLetters={incorrectLetters}
					addGuessedLetter={addGuessedLetter}
				/>
			</div>
		</div>
	);
}

export default Screen2;
