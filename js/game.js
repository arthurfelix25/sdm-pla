function isPrimo(num){
    if(num < 2) return false;
    for(let i = 2; i <= Math.sqrt(num); i++){
        if(num % i === 0) return false;
    }
return true;
}

function generatePrimo(n, first = 2 ){
    const primos = [];
    let num = first;
    while(primos.length < n){
        if(isPrimo(num)) primos.push(num);
        num++;
    }
return primos;
}

function crateblkans(n, blanks){
    const primos = generatePrimo(n + 5)
    const sequence = primos.slice(0, n);

    const blanksPositions= new Set();
    while(blanksPositions.size < blanks){
        const pos = Math.floor(Math.random() * n);
        blanksPositions.add(pos);
    }
return {sequence, blanksPositions}
}

function startGame(){
    const n = parseInt(document.getElementById('totaln').value) || 10;
    const gaps = parseInt(document.getElementById('totalb').value) || 3;

    const {sequence, blanksPositions} = crateblkans(n, gaps);
    window.sequenceOriginal = sequence;
    window.blanksOriginal = blanksPositions;

    const container = document.getElementById('sequence');
    container.innerHTML='';

    sequence.forEach((num, idx) => {
        if (blanksPositions.has(idx)){
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'number-blank';
            input.id = `blank-` + idx;
            input.setAttribute('aria-label','Fill in the number' + (idx + 1));
            input.min = 2;
            input.max = 1000;
            container.appendChild(input);
        } else {
            const span = document.createElement('span');
            span.textContent = num;
            span.className = 'number prime';
            container.appendChild(span);
            }
    });


document.getElementById('result').textContent='';
document.getElementById('result').className='';
}
function checkanswer(){
    const blanksOriginal = window.blanksOriginal;
    const sequenceOriginal = window.sequenceOriginal;
    let correct = 0;
    const total = blanksOriginal.size;  


blanksOriginal.forEach(pos => {
    const input = document.getElementById('blank-' + pos);
    const value = parseInt(input.value);
    if (value === sequenceOriginal[pos]){
        correct++;
        input.style.borderColor= '#13ad2cff';
        input.classList.add('correct');
        input.classList.remove('incorrect')
    } else {
        input.style.borderColor= '#ff5252';
        input.classList.add('incorrect');
        input.classList.remove('correct');
    }
});

const result = document.getElementById('result');
if (correct === total && total > 0){
    result.textContent='🔥Congratulations! All answers are correct.';
    result.className='correct';
} else {
    result.textContent=`NONONOO LA POLIZIA ${correct} de ${total} correct. Try again!🐱‍🏍`;
    result.className='incorrect';
     }
}