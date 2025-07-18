import {words} from './words.js';

const input = document.querySelector('input');
const paragraph = document.querySelector('.script');
let kelimeler = []; 
let currentIndex = 0;
let trueanswer= 0;
let falseanswer = 0;
const userInputs=[];
const correctAnswer = document.querySelector('.true'); 
const wrongAnswer = document.querySelector('.false');

function getRandomWord() {
    for (let i = 0; i < 120; i++) {      
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
    ).join(' ');
}


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

let timeLeft =45;
const countdownElement = document.querySelector('.countdown');
let started = false;

document.addEventListener('keydown', () => {
    if(!started){
        started = true;
        const countdown = setInterval(() => {
            countdownElement.innerHTML = timeLeft;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(countdown);
                getStatistics();
                input.disabled = true;
                countdownElement.textContent = "times up!";
            }
        }, 1000);
    }});


function getStatistics (){
    let totalWords = userInputs.length;
    let accuracy = (trueanswer / totalWords) * 100;
    let inputPeRMinute = totalWords / 60;
    document.querySelector('.statistics').innerHTML = `
        <p>Total Words: <span class="results">${totalWords}</span></p>
        <p>Correct Answers: <span class="results">${trueanswer}</span></p>
        <p>Incorrect Answers: <span class="results">${falseanswer}</span></p>
        <p>accuracy rate: <span class="results">${accuracy.toFixed(2)}%</span></p>
        <p>Input per minute: <span class="results">${inputPeRMinute.toFixed(2)} minutes</span></p>
    `;
}