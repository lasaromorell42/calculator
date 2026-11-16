//display setup
let numberButtons = [];
let container = document.querySelector("#container");
for (let i = 0; i < 4; i++){
    let numberRow = []
    for (let j = 0; j < 4; j++){
        const newButton = document.createElement('button')
        newButton.style.width = `${100/4}%`;
        newButton.style.height = `${100/4}%`;
        numberRow.push(newButton);
        container.appendChild(newButton);
    }
    numberButtons.push(numberRow);
}
/* layout of calc
   789÷
   456x
   123-
   0.=+*/
numberButtons[0][0].textContent = '7';
numberButtons[0][1].textContent = '8';
numberButtons[0][2].textContent = '9';
numberButtons[0][3].textContent = '÷';

numberButtons[1][0].textContent = '4';
numberButtons[1][1].textContent = '5';
numberButtons[1][2].textContent = '6';
numberButtons[1][3].textContent = 'x';

numberButtons[2][0].textContent = '1';
numberButtons[2][1].textContent = '2';
numberButtons[2][2].textContent = '3';
numberButtons[2][3].textContent = '-';

numberButtons[3][0].textContent = '0';
numberButtons[3][1].textContent = 'clear';
numberButtons[3][2].textContent = '=';
numberButtons[3][3].textContent = '+';

// Configuring backend 
// Display is both used for showing results and calculating them
// n is used to keep track of the current number being entered
let display = [];
let n = []

//html display
let resultOfCalc = document.querySelector('#result');
resultOfCalc.textContent = '';

//clear button
numberButtons[3][1].addEventListener('click', ()=>{
    resultOfCalc.textContent = ``;
    display = [];
    n = [];})

function operate(a, b, operator){
    if (operator == '+'){
        return a + b;
    }
    else if (operator == '-'){
        return  a - b;
    }
    else if (operator == '÷'){
        return (a / b).toFixed(2)
    }
    else if (operator == 'x'){
        return a * b;
    }
}

//EventListeners for buttons, 
for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
        if (i == 3 && j == 1){
            continue;
        }
        if (i == 3 && j == 2){
            continue;
        }
        if (j < 3){
            
            numberButtons[i][j].addEventListener('click', ()=>{
                buttonText = (numberButtons[i][j].textContent);
                n.push((buttonText))
                resultOfCalc.textContent = resultOfCalc.textContent.concat(buttonText);
            }
            );
        }
        else{
            btn = numberButtons[i][j];
            numberButtons[i][j].addEventListener('click', ()=>{
                buttonText = numberButtons[i][j].textContent;
                display.push(n.join(''));
                console.log(display);
                n = [];
                if (display.length == 3){
                    display = [`${operate(Number(display[0]), Number(display[2]), display[1])}`]
                }
                display.push(buttonText);
                resultOfCalc.textContent = display.join('')
            });
            };
    }
}

numberButtons[3][2].addEventListener('click',()=>{
    if (display.length == 2){
    console.log(display);
    if (n.length > 0){
    display.push(n.join(''));
    }
    n = [`${operate(Number(display[0]), Number(display[2]), display[1])}`];
    display = [];
    resultOfCalc.textContent = n.join('');        
    }

});



