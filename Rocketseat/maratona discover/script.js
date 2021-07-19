


const Modal = {

    open(){ //Abrir Modal

        document
        .querySelector('.modal-overlay')
        .classList.add('active')
        //Adicionar a classe active ao Modal
    },

    close(){ //Fechar Modal
        document.querySelector('.modal-overlay')
        .classList.remove('active')
        //Remover a classe active do Modal

    }

};

// const transactions = [
//     {        
//         description: 'Luz',
//         amount: -50000,
//         date: '23/01/2021'
//     },
//     {
//         description: 'Website',
//         amount: 500000,
//         date: '23/01/2021'
//     },
//     {
//         description: 'Internet',
//         amount: -20000,
//         date: '23/01/2021'
//     },
// ];
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}
  

const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction);
        console.log("pushed to Transaction.all");
        App.reload();
    },

    remove(index){
        Transaction.all.splice(index,1);
        App.reload();
    },

    incomes () { //soma as entradas
        let income = 0;
       Transaction.all.forEach((transaction) => {
            // para cada transação, se > 0, somar à variável
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });
        return income

    },

    expenses () { //soma as saídas
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            // para cada transação, se < 0, somar à variável
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });
        return expense
    },

    total () { //total das transações
        return Transaction.incomes() + Transaction.expenses()
        //simples soma de incomes e expenses
        
    }
};

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction (transaction, index){

        const amount = Utils.formatCurrency(transaction.amount)
        const html = 
        `
        <td class='description'>${transaction.description}</td>
        <td class=${transaction.amount >= 0 ? 'income' : 'expense'}>${amount}</td>
        <td class='date'>${transaction.date}</td>
        <td>
            <img onclick='Transaction.remove(${index})'src="./assets/minus.svg" alt="Remover Transação">
        </td>
        `

        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes()) 

        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        this.transactionsContainer.innerHTML = ''
    }
}

const Utils = {

    formatAmount(value){
        value = Number(value) * 100
        return value
    },
    
    formatDate(date){
        const splittedDate = date.split('-');
        newDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

        return newDate;
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g,'')

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style:'currency',
            currency:'BRL'
        });

        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: this.description.value,
            amount: this.amount.value,
            date: this.date.value
        }       
    },

    validateFields(){
        const {description, amount, date} = this.getValues();
        if (description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error('Por favor preencha todos os campos.')
        }


    },

    formatValues(){
        let {description, amount, date} = this.getValues();
        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);
        console.log(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description.value = '',
        Form.amount.value = '',
        Form.date.value = ''
    },

    submit(event){
        event.preventDefault();

        try {
            this.validateFields(); //validar campos
            console.log("fields validated")
            const transaction = this.formatValues(); //formatar valores da form
            console.log("values formatted")
            Transaction.add(transaction); //salvar form
            console.log("transaction added")
            this.clearFields(); // limpar form
            console.log("fields cleared")
            Modal.close();
            App.reload();   
            //clean up
        } catch (error) {
            alert(error.message)   
        }



    }
}

const App = {
    init(){
        Transaction.all.forEach(DOM.addTransaction);
        DOM.updateBalance();

        Storage.set(Transaction.all)
    },

    reload(){
        DOM.clearTransactions();
        this.init()

    }
}

App.init();

Transaction.add(
    {        
        description: 'Ar',
        amount: -50000,
        date: '23/01/2021'
    }
)

