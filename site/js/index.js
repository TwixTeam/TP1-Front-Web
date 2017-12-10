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
            divResult.innerText = 'Syntax is OK'
        })
        .catch(function () {
            // Syntax ERROR
            divResult.innerText = 'Syntax ERROR'
        })
}
// TODO: Case divice by 0
// TODO: Check expression possible security failure
// TODO: add calculator logic
