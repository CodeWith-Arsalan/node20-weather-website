// console.log("Server side js file running")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'Javascript Text'

// fetch('http://localhost:3000/weather?address=').then((response) => {
//     //
//     response.json().then((data) => {
//         if(data[0].error)
//         {
//             console.log(data[0].error)
//         }else {
//             //
//             console.log(data[0].forecast)
//             console.log(data[0].location)
//         }
        
        
//     })
// })

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        //
        response.json().then((data) => {
            if (data[0].error)
            {
                console.log(data[0].error)
                messageOne.textContent = data[0].error
            }else {
                messageOne.textContent = data[0].location
                messageTwo.textContent = data[0].forecast
                console.log(data[0].location)
                console.log(data[0].forecast)
            }
        })
    })
})