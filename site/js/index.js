import axios from 'axios'

const form = document.getElementById('form-calculator') // form element
const expression = document.getElementById('input-expression') // input element
const divResult = document.getElementById('get-result') // element who displat the result

let expressionValue

// Prevent reload caused by form submit then do the call
form.addEventListener('submit', (e) => {
    e.preventDefault()
    expressionValue = expression.value
    requestCall()
})

// function calling the API to check the expression's syntax
const requestCall = () => {
    axios.post('http://localhost:8081/', {
        'formula': expressionValue
    })
        .then(function () {
            // Syntax OK
            let result = calcule(0, expressionValue)
            if (result === Infinity) {
                divResult.innerText = ' Divide by 0 is fordidden'
            } else {
                divResult.innerText = calcule(0, expressionValue)
            }
        })
        .catch(function () {
            // Syntax ERROR
            divResult.innerText = ' Syntax ERROR'
        })
}

// math operation
const calc = (number1, number2, operator) => {
    if (operator !== '') {
        switch (operator) {
        case '+' :
        case '--' :
        case '++':
            number1 += parseFloat(number2)
            break
        case '-' :
        case '+-' :
        case '-+':
            number1 -= parseFloat(number2)
            break
        case '*':
        case '*+':
            number1 *= parseFloat(number2)
            break
        case '*-':
            number1 *= -parseFloat(number2)
            break
        case '/':
        case '/+':
            number1 /= parseFloat(number2)
            break
        case '/-':
            number1 /= -parseFloat(number2)
            break
        default:
            break
        }
    }
    return number1
}

// calcul logic
function calcule (v, s) {
    let total = v
    let number = ''
    let operator = ''

    while (/^[+\-*/]$/.test(s[0])) {
        operator += s[0]
        s = s.substr(1)
        console.log(operator)
    }
    if (operator === '') {
        operator = '+'
    }

    while (/^[0-9.]$/.test(s[0])) {
        number += s[0]
        s = s.substr(1)
        console.log(number)
    }

    total = calc(total, number, operator)

    if (s !== '') {
        return calcule(total, s)
    } else {
        return total
    }
}

