const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
let submission = [];
const solutionDisplay = document.querySelector('#solution');

const squares = 81;

for(let i = 0; i < squares; i++){
    const intputElement = document.createElement('input')
    intputElement.setAttribute('type', 'number');
    intputElement.setAttribute('min', 1);
    intputElement.setAttribute('max', 9);
    puzzleBoard.appendChild(intputElement);
    if(
        ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
        ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
        ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53)
     ){
        intputElement.classList.add('odd-section');
    }
}


const joinValues = () => {
const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    if(input.value){
        submission.push(input.value);
    }else{
        submission.push('.');
    }
})
console.log(submission);
}

const populateValues = (isSolvable, solution) => {
  const inputs =  document.querySelectorAll('input')
  if(isSolvable && solution){
    inputs.forEach(input, i => {
        input.value = solution[i];
    })
    solutionDisplay.innerHTML = 'This is the answer';
  }else{
      solutionDisplay.innerHTML = 'This is not solveavle';
  }
}


const solve = () =>{
joinValues();
const data = {numbers:submission.join('')}

fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Accept' : 'application/json'

    },
    body: JSON.stringify(data)
}).then(response => response.json())
.then(data => {
    console.log(data)
    populateValues(data.solvable, data.solution)
    submission = [];

})
.catch((error => {
    console.log("error:", error)
}))
}

solveButton.addEventListener('click', solve);
