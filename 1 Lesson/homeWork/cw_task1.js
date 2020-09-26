/*

    Данные: http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2
    Задача.

    1.  Получить данные и в виде простой таблички вывести список компаний. Для начала используем поля:
        Company | Balance | Registered | Показать адрес | Кол-во employers | показать сотрудников

    2.  Сделать сортировку таблицы по количеству сотрудников и балансу. Сортировка должна происходить по клику
        на заголовок столбца

    3.  По клику на показать адрес должна собираться строка из полей адреса и показываться на экран.

    Бонус:
    4.  По клику на показать сотрудников должна показываться другая табличка формата:
        <- Назад к списку компаний | *Название компании*
        input
        Сотрудники:
        Name | Gender | Age | Contacts

 */

const url = 'http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2';
const balanceTitle = document.querySelector('#balance');
const employersMountTitle  = document.querySelector('#employersMount');

class GetEmployers {
    constructor(url){
        this.url = url;
    }

    get getData()  {
        return fetch(this.url).then( response => response.json() ).then(data => stateEmployers.newList(data));
    }
}

class printEmployers {
    constructor(){
        this.table = document.querySelector('#table');
    }

    printHtml(list) {
        let newTable = '';
        list.map(({company, balance, registered, employers, address}) => {
            const {city, country, house, state, street, zip} = address;

            return newTable += `<tr>
                    <td>${company}</td>
                    <td>${balance}</td>
                    <td>${registered}</td>
                    <td data-address="${`${country}, ${state}, ${city}, ${street}, ${house}, ${zip}`}" onclick="print.printAddress(this)">Показать адрес</td>
                    <th>${employers.length}</th>
                    <th>Показать сотрудников</th>
                </tr>
            `});
        this.table.innerHTML = newTable;
    }

    printAddress(e){
        e.innerHTML = e.dataset.address
    }
}

class StateEmployers {
    constructor() {
        this.list = [];
        this.sort = false;
        this.reverse = false;
    }

     newList(list) {
        this.list = list;
        print.printHtml(list);
    }

    get getList () {
        return this.list;
    }

    sortList(type) {
        if(this.sort === type){
            this.reverse = !this.reverse
        }else {
            this.sort = type;
            this.reverse = false
        }

        switch (this.sort) {
            case 'balance':
                stateEmployers.newList(this.list.sort((a, b) => a.balance > b.balance && !this.reverse ? 1 : -1 ));

            case 'employersMount':
                stateEmployers.newList(this.list.sort((a, b) => a.employers.length > b.employers.length && !this.reverse ? 1 : -1 ));

        }
    }
}



const newEmployers = new GetEmployers(url);
const stateEmployers = new StateEmployers();
const print = new printEmployers();

balanceTitle.onclick = () =>{
    stateEmployers.sortList('balance')
};

employersMountTitle.onclick = () =>{
    stateEmployers.sortList('employersMount')
};

newEmployers.getData;



