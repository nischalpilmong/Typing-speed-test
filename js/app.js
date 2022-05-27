const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector('.wrapper .input-field');
const mistakeTag = document.querySelector('.mistake span');
timeTag = document.querySelector('.time span b');
wpmTag = document.querySelector('.wpm span');
cpmTag = document.querySelector('.cpm span');
tryAgainBtn = document.querySelector('.content button');


let timer, 
maxTime = 60, 
timeLeft = maxTime,
charIndex = mistakes = 0;
let isTyping = false;

function randomParagraph(){
    let randomNumber = Math.trunc(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    //getting random item from the paragraphs array, splitting all characters
    //of it, adding each character inside span and then adding this span inside p tag
    paragraphs[randomNumber].split("").forEach(element => {
        let spanTag = `<span>${element}</span>`;
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span"); //this will select each character in a paragraph.
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(isTyping == false){ //once the timer is start, it won't restart again.
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //console.log(typedChar);
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains('incorrect')){
                mistakes--;
            }
            characters[charIndex].classList.remove('correct', 'incorrect');
            
        }else{
            if(characters[charIndex].innerText === typedChar){
                //if user typed character and shown character in paragraph matched,
                //then add the correct class else increment the mistakes and add the incorrect class
                characters[charIndex].classList.add('correct');
             }else{
                 mistakes++;
                characters[charIndex].classList.add('incorrect');
             }
             charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add('active');
        
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        //If wpm value is 0, empty, or Infinity then setting it's value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;//cpm will not count the mistake
    }else{
         inpField.value = '';
         clearInterval(timer);
    }
    
}


function initTimer(){
    //if timeLeft is greater than 0 then decrement the timeLeft else clear the timer
   if(timeLeft > 0){
       timeLeft--;
       timeTag.innerText = timeLeft;
   }else{
       clearInterval(timer);
   }
}

function resetGame(){
    //calling randomParagraph function and 
    //resetting each variables and elements value to default
    randomParagraph();
    inpField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpm.innerText = 0;
}

randomParagraph();
inpField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);
