const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementKGS = document.querySelector('[data-value="KGS"]')

const rates = {} // Объект для хранения нужных нам валют

const url = 'https://www.cbr-xml-daily.ru/daily_json.js'

// Получение курса валют и отображения их на странице
async function getData(callback) {
    try{
        const response = await fetch(url)
        const data = await response.json() // Получаем json формат из response и сохраним в data

        rates.USD = data.Valute.USD
        rates.EUR = data.Valute.EUR
        rates.KGS = data.Valute.KGS

        console.log(rates)

        // Отображаем значение курсов в HTML
        elementUSD.textContent = rates.USD.Value.toFixed(2) // toFixed(2) обрезает две цифры с конца
        elementEUR.textContent = rates.EUR.Value.toFixed(2)
        elementKGS.textContent = rates.KGS.Value.toFixed(2)

        callback()
    } catch (e) { // Обработчик ошибок
        console.error(e)
    }
}


// Изминение класса по изминению курса
function colorInformer() {
    if(rates.USD.value > rates.USD.Previous)  {
        elementUSD.classList.add('top')
    } else {
        elementUSD.classList.add('bottom')
    }

    if(rates.EUR.value > rates.EUR.Previous)  {
        elementEUR.classList.add('top')
    } else {
        elementEUR.classList.add('bottom')
    }

    if(rates.KGS.value > rates.KGS.Previous)  {
        elementKGS.classList.add('top')
    } else {
        elementKGS.classList.add('bottom')
    }
}

// Callback function
getData(colorInformer)

// Функция конвертации
function current () {
    const input = document.querySelector('#input')
    const result = document.querySelector('#result')
    const select = document.querySelector('#select')

    input.oninput = function() {
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)
    }
    select.oninput = function() {
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)
    }
} current()