import React from 'react'

const keyboard_keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];


/**
 *  @param {string} key
 *  @param {string[]} guesses
 *  @param {string} correctWord
 *  @returns {number}
 *  @description Checks if a character is in a guess and if so how correct it is
 * */
const hasKeyBeenUsed = (key, guesses, correctWord) => {
    let used = 0
   
    guesses.forEach((guess)=>{
        if (guess.includes(key))
        {
            if (used <= 1){
                used = 1
            }
            if (correctWord.includes(key) && used <= 2){
                used = 2
            }
            guess.split("").forEach((char, charIdx)=>{
                if (char === key){
                    if (correctWord.charAt(charIdx) === key){
                        used = 3
                    }
                }
            })
        }
    })

    return used
}

/**
 *  @description Returns a keyboard that can be interacted with
 *  @param {object} props
 *  @param {(arg0: string) => void} props.handleKey
 *  @param {string} props.correctWord
 *  @param {string[]} props.pastGuesses
 * */
function Keyboard (props) {
    return (
    <div className="keyboard">
          {keyboard_keys.map((row, rowId) => (
            <div className="keyboard-row" key={rowId}>
              {row.map((key, keyId) => {
                return (
                    <button 
                        onClick={() => props.handleKey(key)}
                        key={keyId}
                        className={`
                            keyboard-key 
                            ${hasKeyBeenUsed(key, props.pastGuesses, props.correctWord) === 0 ? '': ''}
                            ${hasKeyBeenUsed(key, props.pastGuesses, props.correctWord) === 1 ? 'key-wrong': ''}
                            ${hasKeyBeenUsed(key, props.pastGuesses, props.correctWord) === 2 ? 'key-almost-correct': ''}
                            ${hasKeyBeenUsed(key, props.pastGuesses, props.correctWord) === 3 ? 'key-correct': ''}
                        `}
                        >
                        {key}
                    </button>           
                );
              })}
            </div>
          ))}
        </div>
    )
}

export default Keyboard;