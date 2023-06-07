const ul = document.querySelector('.ul-tasks');

// прогрузка страницы и заполнение данных из локалсторедж
document.addEventListener('DOMContentLoaded', () => {
    let arrayData = getAllLocalStorage()
    // console.log(arrayData)

    arrayData.forEach(element => {
        createObjectTasks(element)
    });
});

//функ получения данных из локал сторедж
function getAllLocalStorage() {
    let arrayData = JSON.parse(localStorage.getItem("allEntries"));
    if (arrayData == null) arrayData = [];
    return arrayData
}

//функция создания элементов
function createObjectTasks(data) {
    // создаем элемент
    let li = document.createElement('li');
    li.className = 'li-task';

    // создаем элемент
    let input = document.createElement('input');
    input.className = 'li-input';
    input.type = 'checkbox';
    input.checked = data.inputChecked;
    input.addEventListener('click', updateInputCheck)

    // создаем элемент
    let p = document.createElement('p');
    p.className = 'li-p';
    p.innerText = data.pText;

    // добавление элементов
    ul.append(li);
    li.append(input);
    li.append(p);
};

//кнопка добавления в список дел
const imgBtn = document.querySelector('.img-btn');
imgBtn.addEventListener('click', () => {
    let inpTask = document.querySelector('.inp-task');
    let valInput = inpTask.value;
    if (valInput !== "") {
        createTask(valInput);
        inpTask.value = "";
    }
});

//функция создания элементa
function createTask(valInput) {
    // создаем элемент
    let li = document.createElement('li');
    li.className = 'li-task';

    // создаем элемент
    let input = document.createElement('input');
    input.className = 'li-input';
    input.type = 'checkbox';
    input.addEventListener('click', updateInputCheck)

    // создаем элемент
    let p = document.createElement('p');
    p.className = 'li-p';
    p.innerText = valInput;

    // добавление элементов
    ul.append(li);
    li.append(input);
    li.append(p);
    // tasks.push(valInput);

    let data = {
        "inputChecked": input.checked,
        "pText": valInput
    }
    saveLocalstorage(data)
}

//функ сохранения в локалсторедж
function saveLocalstorage(data) {
    let arrayData = JSON.parse(localStorage.getItem("allEntries"));
    if (arrayData == null) arrayData = [];
    arrayData.push(data);
    localStorage.setItem("allEntries", JSON.stringify(arrayData));
}

// функ записи в локалсторедж измененого элемента
function updateInputCheck(e) {
    console.log(e.target.nextSibling.innerText);
    let arrayData = getAllLocalStorage()

    arrayData.forEach(element => {
        if (element.pText == e.target.nextSibling.innerText) {
            element.inputChecked = e.target.checked
        }
    });

    localStorage.setItem("allEntries", JSON.stringify(arrayData));
}

//кнопка в работе
const pending = document.querySelector("#pending");
pending.addEventListener('click', () => {
    getAllElement();
    let childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {
        if (!childrens[i].children[0].checked) {
        } else {
            childrens[i].style.display = 'none';
        }
    }
})

//кнопка показать все
const all = document.querySelector("#all");
all.addEventListener('click', getAllElement)
function getAllElement() {
    let childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {
        childrens[i].style.display = 'flex'
    }
}

//кнопка завершенные
const completed = document.querySelector("#completed");
completed.addEventListener('click', () => {
    getAllElement();
    let childrens = ul.children;
    for (let i = 0; i < childrens.length; i++) {

        // console.log(childrens[i].children[0].checked);
        if (childrens[i].children[0].checked) {

        } else {
            childrens[i].style.display = 'none';
        }
    }
})

//кнопка Удалить все
const deleteAll = document.querySelector(".clear-btn");
deleteAll.addEventListener('click', () => {
    let li = ul.getElementsByTagName('li');
    let counter = li.length;

    while (counter--) {
        ul.removeChild(li[counter]);
    }

    removeAllElenetsLocalstorage();
})

//функция удаления высех элементов в локалсторедж
function removeAllElenetsLocalstorage() {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    existingEntries = []
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
}