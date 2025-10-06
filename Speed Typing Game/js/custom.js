const Random_Text_API = 'http://api.quotable.io/random';
const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');

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
}

renderNewTexts();