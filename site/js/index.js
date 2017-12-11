import axios from 'axios'

const form = document.getElementById('form-calculator') // form element
const expression = document.getElementById('input-expression') // input element
const divResult = document.getElementById('get-result') // element who displat the result
const btnCheck = document.getElementById('bouton-check') // element boutton check
const btnEval = document.getElementById('bouton-evaluate') // element button calculate

let expressionValue

// Prevent reload caused by form submit then do the call
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

btnCheck.addEventListener('click', (e) => {
    expressionValue = expression.value
    checkMathSyntax(expressionValue, false)
})

btnEval.addEventListener('click', (e) => {
    expressionValue = expression.value
    checkMathSyntax(expressionValue, true)
})

// function calling the API to check the expression's syntax
const checkMathSyntax = (params, evaluate) => {
    axios.post('http://localhost:8081/', {
        'formula': params
    })
        .then(function (res) {
            // Syntax OK
            let result = calcule(0, params)
            if (result === Infinity || result === -Infinity) {
                divResult.innerText = ' Math Error'
            } else if (evaluate === true) {
                divResult.innerText = calcule(0, params)
            } else {
                divResult.innerText = 'Syntax OK'
            }
        })
        .catch(function (res) {
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
    }
    if (operator === '') {
        operator = '+'
    } else if (operator.length >= 3) {
        return 'Syntax ERROR'
    }

    while (/^[0-9.]$/.test(s[0])) {
        number += s[0]
        s = s.substr(1)
    }

    total = calc(total, number, operator)

    if (s !== '') {
        return calcule(total, s)
    } else {
        return total
    }
}
