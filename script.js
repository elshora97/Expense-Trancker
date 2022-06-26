const balance = document.getElementById('balance');
const money_minus = document.getElementById('money-minus');
const money_plus = document.getElementById('money-plus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

// const transactions = dummyTransactions;

const localStorageTranaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTranaction : [];

//Add transaction

function addTransaction (e){
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === ''){
        alert('please enter text and value')
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);

        addTransactionDOM(transaction);

        addValues();

        UpdateLocalStorage();

        text.value ="";
        amount.value = "";
    }

}

//genarate ID
function generateID(){
    return Math.floor(Math.random() * 100000000)
}

//Add transaction to DOM 
function addTransactionDOM (transaction) {
    //Get sign 
    const sign = transaction.amount < 0 ? '-' : '+' ;

    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item);
}


// Remove transaction 
function removeTransaction(id) {
    transactions = transactions.filter (transaction => transaction.id !== id );

    UpdateLocalStorage();

    init();
}

function addValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = (amounts.reduce((acc, item) => (acc += item), 0)).toFixed(2);

    const income = (amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0))
        .toFixed(2);
    
    const expense = (amounts
        .filter(item => item <0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

        console.log(total);
    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
    
}

//Add to local storage

function UpdateLocalStorage (){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    addValues();
}

init();


//event listeners to form submit

form.addEventListener('submit',addTransaction)