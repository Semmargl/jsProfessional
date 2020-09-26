/*
    Задание:
    1. Переформатировать ITEA_COURSES в массив который содержит длину строк каждого из элементов.
    2. При помощи метода Array.sort. отсортировать массив ITEA_COURSES по длине строки.
    3. Реализация функции поиска по массиву ITEA_COURSES. Нужно вывести на страницу инпут в который по событию input будет фильтровать массив и выводить найденные результаты списком на страницу
*/

const ITEA_COURSES = ["Курс HTML & CSS", "JavaScript базовый курс", "JavaScript продвинутый курс", "JavaScript Professional", "Angular 2.4 (базовый)", "Angular 2.4 (продвинутый)", "React.js", "React Native", "Node.js", "Vue.js"];

/* Task: 1*/
const lengthArrayElements = ITEA_COURSES.map(e => e.length);
console.log(lengthArrayElements);

/* Task: 2*/
const sortedArray = [...ITEA_COURSES].sort((a,b) => ( a.length > b.length ? 1 : -1));
console.log(ITEA_COURSES,sortedArray);

/* Task: 3*/
const input = document.querySelector('#search');
const list = document.querySelector('#resultList');

input.oninput = () => {
    const value = input.value.toLowerCase() || {};
    const result = ITEA_COURSES
        .filter(e => e.toLowerCase().indexOf(value) !== -1 )
        .sort((a,b) => a.toLowerCase().indexOf(value) > b.toLowerCase().indexOf(value) ? 1 : -1 );

    list.innerHTML =`${result.map(e => `<li>${e}</li>`)}`;
};
