const Random_Text_API = 'http://api.quotable.io/random';
const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const timer = document.getElementById('timer');

textInput.addEventListener('input', () => {
    const textCharacterArray = document.querySelectorAll('span');
    const typedTexts = textInput.value.split('');
    let check = true;

    textCharacterArray.forEach((chSpan, idx) => {
        const character = typedTexts[idx];

        if(character == null){
            chSpan.classList.remove('correct');
            chSpan.classList.remove('incorrect');
            check = false;
        }

        else if(character === chSpan.innerText){
            chSpan.classList.add('correct');
            chSpan.classList.remove('incorrect');
        }

        else{
            chSpan.classList.remove('correct');
            chSpan.classList.add('incorrect');
            check = false;
        }
    })

    if(check) renderNewTexts();
})

const getRandomTexts = () => {
    return fetch(Random_Text_API)
        .then(res => res.json())
        .then(data => data.content)
}

const renderNewTexts = async () => {
    const textContent = await getRandomTexts();
    console.log(textContent);

    textDisplay.innerHTML = '';

    textCharacterArray = textContent.split('');
    textCharacterArray.forEach(ch => {
        const chSpan = document.createElement('span');
        chSpan.innerText = ch;
        textDisplay.appendChild(chSpan);
    })

    textInput.value = null;
    startTimer();
}

let startTime;
const startTimer = () => {
    timer.innerText = 0;
    startTime = new Date();

    setInterval(() => {
        timer.innerText = getTimer();
    }, 1000)
}

const getTimer = () => {
    return Math.floor((new Date() - startTime) / 1000);
}
renderNewTexts();