import { changePage } from "@/lib/features/currentPageSlice";
import { SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export function Letter({ type, letter, status }: { type: string; letter: string; status: string }) {

    let bgColor;
    switch (status) {
        case "correct":
            bgColor = "bg-[#44c74f]";
            break;
        case "present":
            bgColor = "bg-[#d8c452]";
            break;
        case "wrong":
            bgColor = "bg-[#d85252]";
            break;
        case "locked":
            bgColor = "bg-[#1C1C1E]";
            break;
        case "absent":
        default:
            bgColor = "bg-[#4b4b50]";
            break;
    }
    
    return (
        <div>
            {type == "choices" && 
                <div className={`${bgColor} p-5 px-10 rounded-xl w-24 h-24 flex items-center justify-center`}>
                    {letter ? letter : " "}
                </div>
            }
            {type == "letterbox" && 
                <div className={`${bgColor} ${status == "locked" ? "text-[#555250]" : "text-white"} rounded-xl w-10 h-10 flex items-center justify-center`}>
                    {letter}
                </div>
            }
        </div>
    )
}

export function ModeButton({
    color, 
    currentMode, 
    setCurrentMode, 
    setCurrentGuess, 
    setGuesses, 
    setLetters, 
    setSubmitMessage, 
    setEmojiMessages, 
    setModalOpen, 
    mode, 
    label 
}: any) {

    const dispatch = useDispatch();

    return (
        <button 
            className={`bg-[#555250] hover:bg-[${color}] p-3 px-6 rounded-xl border-4 ${currentMode == mode ? `border-[${color}]`: "border-[#505055]"}`} 
            onClick={() => {
                if (setCurrentGuess) {
                    setCurrentMode(mode);
                    setGuesses([]);
                    setLetters([]);
                    setCurrentGuess('');
                    setSubmitMessage('');
                    setModalOpen(false);
                    setEmojiMessages([]);
                } else {
                    setCurrentMode(mode)
                    dispatch(changePage('wordle'))
                }
            }}>
            {label}
        </button>
    )
}

export default function Wordle() {

    const [currentMode, setCurrentMode] = useState('med');
    const [currentWord, setCurrentWord] = useState('');
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [letters, setLetters] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [submitMessage, setSubmitMessage] = useState('')
    // let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [alphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));

    const [emojiMessages, setEmojiMessages] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const emoji = ["🟩","🟨","⬛"];
        const newMessages: string[] = [];

        guesses.map((currGuess : string) => {
            let message = "";
            currGuess.split('').forEach((letter: string, index: number) => {
                if (getStatus(letter, index) == 'correct'){
                    message += emoji[0]
                }
                else if (getStatus(letter, index) == 'present'){
                    message += emoji[1]
                }
                else {
                    message += emoji[2]
                }
            })
            console.log("current message: ", message);
            newMessages.push(message);
        })
        setEmojiMessages(prevMessages => [...prevMessages, ...newMessages])
    },[modalOpen])
    

    const getWordLength = () => {
        switch (currentMode) {
            case 'easy':
                return 4;
            case 'med':
                return 5;
            case 'hard':
                return 6;
            default:
                return 0;
        }
    };

    const getStatus = (letter: string, index: number, type?: string,) => {
        if (currentWord[index] === letter) {
            return 'correct';
        } else if (currentWord.includes(letter)) {
            return 'present';
        } else if (type) {
            return 'locked';
        } else {
            return 'absent';
        }
    };

    const letterboxStatus = (letterboxLetter: string) => {
        // console.log("currentWord: ", currentWord, "letter: ", letterboxLetter, "guesses: ", guesses);
        if (guesses.some((guess) => guess.split('').some((guessedLetter : string, index: number) => guessedLetter == currentWord[index] && guessedLetter == letterboxLetter))) {
            return 'correct';
        } 
        else if (guesses.some((guess) => guess.split('').some((guessedLetter : string) => currentWord.includes(guessedLetter) && guessedLetter == letterboxLetter))) {
            return 'present'
        } 
        else if (guesses.some((guess) => guess.split('').some((guessedLetter : string) => guessedLetter == letterboxLetter))) {
            return 'wrong';
        } 
        else {
            return 'locked';
        }
    };

    const handleSubmitGuess = () => {
        if (currentGuess.length !== currentWord.length) {
          setSubmitMessage(`Guess must be ${getWordLength()} letters long.`)
        } else if (guesses.includes(currentGuess)) {
            setSubmitMessage('You already guessed that word.')
        } else if (hasDuplicateLetters(currentGuess)) {
            setSubmitMessage('Your guess has duplicate letters.')
        } else if (hasGuessedInccorectLetters(currentGuess)){
            setSubmitMessage('You already used a incorrect letter in your guess')
        } else {
            if (currentGuess == currentWord){
                setSubmitMessage(`The word was ${currentWord}!`);
                setModalOpen(true);
            } else {
                setSubmitMessage('')
            }
            setGuesses([...guesses, currentGuess]);
            setLetters([...letters, ...currentGuess.split('').filter((letter) => !letters.includes(letter))]);   
            setCurrentGuess('');
        }
    };

    const hasGuessedInccorectLetters = (currentGuess: string) => {
        return currentGuess.split('').some((currentLetter, index) => {
            if (letters.includes(currentLetter) && !currentWord.includes(currentLetter) && currentLetter != currentWord[index]){
                return true
            }
            return false
        });
    }

    const hasDuplicateLetters = (word: any) => {
    let letterSet = new Set();
    for (let letter of word) {
        if (letterSet.has(letter)) {
        return true; // Duplicate letter found
        }
        letterSet.add(letter);
    }
    return false; // No duplicates found
    };

    useEffect(() => {
        async function fetchWordleWord() {
            const length = getWordLength()
            const url = `https://random-word-api.vercel.app/api?words=1&length=${length}
`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // console.log(data);

                if (hasDuplicateLetters(data[0].toLowerCase())) {
                    setCurrentWord('');
                    fetchWordleWord();
                } else {
                    setCurrentWord(data[0].toLowerCase());
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
            }
            fetchWordleWord();
    }, [currentMode, triggerUpdate]);

    async function copyTextToClipboard(): Promise<boolean> {
        try {
          await navigator.clipboard.writeText(`${submitMessage}\n${emojiMessages.join('\n')}`);
          return true;
        } catch (error) {
          console.error("Failed to copy text: ", error);
          return false;
        }
      }    

    return (
        <div className="flex flex-col m-10 gap-4 relative">
            <div className="text-6xl font-bold mb-8">
                <p className="text-6xl font-bold mb-8">Wordle</p>
                <div className="flex flex-col w-[full] bg-[#2e2e31] items-center text-center p-10 rounded-xl relative">
                    <div className="flex gap-6 text-lg mb-10">
                        <ModeButton color="#d8c452" currentMode={currentMode} setCurrentMode={setCurrentMode} 
                        setCurrentGuess={setCurrentGuess} setGuesses={setGuesses} setLetters={setLetters} 
                        setSubmitMessage={setSubmitMessage} setEmojiMessages={setEmojiMessages} setModalOpen={setModalOpen} mode="easy" label="Easy" />

                        <ModeButton color="#44c74f" currentMode={currentMode} setCurrentMode={setCurrentMode} 
                        setCurrentGuess={setCurrentGuess} setGuesses={setGuesses} setLetters={setLetters} 
                        setSubmitMessage={setSubmitMessage} setEmojiMessages={setEmojiMessages} setModalOpen={setModalOpen} mode="med" label="Medium" />

                        <ModeButton color="#d44343" currentMode={currentMode} setCurrentMode={setCurrentMode} 
                        setCurrentGuess={setCurrentGuess} setGuesses={setGuesses} setLetters={setLetters} 
                        setSubmitMessage={setSubmitMessage} setEmojiMessages={setEmojiMessages} setModalOpen={setModalOpen} mode="hard" label="Hard" />
                    </div>
                    {(currentWord != '') ?  (
                    <div className="flex flex-col gap-16">
                        {/* {currentWord} */}
                        <div className="flex text-base gap-3 items-center mt-5">
                            {alphabet.map((letter) => (
                                <Letter 
                                    key={letter}
                                    type="letterbox"
                                    letter={letter}
                                    status={letterboxStatus(letter.toLowerCase())}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col relative gap-6 text-xl items-center px-10">
                            <p className="text-xl">Tries: {guesses.length}</p>
                            <div className="flex gap-6">
                                <input 
                                    className="flex flex-grow bg-[#5e5e64] p-2 text-center"
                                    placeholder="Enter word..."
                                    value={currentGuess.toLowerCase()}
                                    onChange={(e) => setCurrentGuess(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmitGuess();
                                        }
                                    }}
                                    disabled={(guesses.includes(currentWord))}

                                />
                                <button 
                                    className="flex bg-[#545461] p-2 rounded-lg"
                                    onClick={handleSubmitGuess}
                                    disabled={(guesses.includes(currentWord))}
                                >
                                    Submit
                                </button>
                            </div>
                            <p className="text-xl">{submitMessage}</p>
                        </div>
                        {(guesses.length != 0) ? (
                            <div className="flex flex-col gap-16 items-center justify-center">
                                {guesses.map((guess, guessIndex) => (
                                    <div key={guessIndex} className="flex gap-16">
                                    {guess.split('').map((letter: any, letterIndex: any) => (
                                        <Letter
                                            key={letterIndex}
                                            type="choices"
                                            letter={letter}
                                            status={getStatus(letter, letterIndex)}
                                        />
                                    ))}
                                    </div>
                                ))}   
                            </div>
                        ) : (
                            <div className="flex gap-16 items-center justify-center">
                                {currentWord.split("").map((letter, index) => (
                                    <Letter 
                                        key={index}
                                        type="choices"
                                        letter={""} 
                                        status=""
                                    />
                                ))}
                            </div>
                        )}

                        {(guesses.includes(currentWord)) && (
                            <div className="flex flex-row gap-5 justify-center items-center">
                                <button 
                                    className="bg-[#636363] hover:bg-[#868686] p-2 rounded-lg text-xl" 
                                    onClick={() => {
                                        setTriggerUpdate(prev => !prev);                                       
                                        setGuesses([]);
                                        setLetters([]);
                                        setSubmitMessage('');
                                        setModalOpen(false);
                                        setEmojiMessages([]);
                                    }}>
                                        Play Again
                                </button>
                                <button 
                                    className="bg-[#5b3083] hover:bg-[#6a3899] p-2 rounded-lg text-xl" 
                                    onClick={() => {
                                        setEmojiMessages([]);
                                        setModalOpen(true)
                                    }}>
                                        Share
                                </button>
                            </div>
                            
                        )}
                    </div>
                    ) : (
                        <div>
                            <p className="p-24">Loading...</p>
                        </div>
                    )}
                    
                </div>
            </div>
            {modalOpen && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-[80%] h-[75%] bg-opacity-90 z-10 flex items-center justify-center p-10">
                    <div className="flex flex-col items-center gap-10 max-w-full max-h-full">
                        <p className="text-4xl">{submitMessage}</p>
                        {emojiMessages  && emojiMessages.map((row: string, index: number) => (
                            <p className="text-4xl" key={index}>{row}</p>
                        ))}
                        <button 
                            className="bg-[#5b3083] hover:bg-[#6a3899] p-3 rounded-md  text-2xl" 
                            onClick={() => {
                                copyTextToClipboard();
                                setModalOpen(false);
                            }}>
                            Share Results
                        </button>
                        <button 
                            className="bg-[#636363] hover:bg-[#868686] p-3 rounded-md text-2xl" 
                            onClick={() => setModalOpen(false)}>
                            Click Here to Return
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
