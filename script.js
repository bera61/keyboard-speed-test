import {words} from './words.js';

const input = document.querySelector('input');
const paragraph = document.querySelector('p');
const duration =60;
let kelimeler = []; 
let currentIndex = 0;
let trueanswer= 0;
let falseanswer = 0;
const userInputs=[];
const correctAnswer = document.querySelector('.true'); 
const wrongAnswer = document.querySelector('.false');

function getRandomWord() {
    for (let i = 0; i < 30; i++) {      
            const randomWord = words[Math.floor(Math.random() * words.length)];
            kelimeler.push(randomWord);
            paragraph.textContent = kelimeler.join(' ');   
    }
    updateParagraph()
}
getRandomWord();

function updateParagraph() {
    paragraph.innerHTML = kelimeler.map((kelime, index) =>
        index === currentIndex ? `<span class="active-word">${kelime}</span>` : kelime
    ).join(' ');}


 document.addEventListener('keydown', (event) => {
    if(event.code === 'Space') {      
        
        const inputArray = input.value.trim().split(' ');
        const lastWord = inputArray[inputArray.length - 1];
        userInputs.push(lastWord);
        if(lastWord === kelimeler[currentIndex]){
            input.style.color = 'green';
            trueanswer++;
            correctAnswer.innerHTML = `true = ${trueanswer}`;
        }else {
            input.style.color = 'red';
            falseanswer++;
            wrongAnswer.innerHTML = `false = ${falseanswer}`;
        }
        currentIndex++;
        updateParagraph()

    }
});