const request = require('request')

// const url = "http://api.weatherstack.com/current?access_key=e960d6962ad11efd05ba7e66192d2939&query="

// request({url:url, json: true}, (error, response) =>{
//     if(error){
//         console.log("Unable to connect to weather API")
//     }else if(response.body.error)
//     {
//         //
//         console.log("Unable to find location")
//         console.log("error code: "+response.body.error.code)
//         console.log(response.body)
//     }else{
//         //
//         console.log("It's currently "+response.body.current.temperature+" degrees. And it feels like "+response.body.current.feelslike+" degrees. The chance of rain is "+response.body.current.precip)
//         console.log(response.body.current)
//     }

// })

//////////////////////////////////////////Forecast Function using simple syntax
// const forecast = (lat, long, callback) => {

//     const url = 'http://api.weatherstack.com/current?access_key=e960d6962ad11efd05ba7e66192d2939&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+''

//     request({url:url, json:true}, (error,response) => {
//         //
//         if (error)
//         {
//             callback("Unable to connect to weather stack", undefined)
//         } else if (response.body.error)
//         {
//             callback("Unable to find location. Try different search.",undefined)
//         } else
//         {
//             //
//             callback(undefined,{
//                 temperature: response.body.current.temperature,
//                 feelslike: response.body.current.feelslike,
//                 rainchance: response.body.current.precip
//             })
//         }
//     })
// }


/////////////////Forecast function using es6 shorthand object method
const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e960d6962ad11efd05ba7e66192d2939&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+''

    request({url, json:true}, (error,{body} = {}) => {
        //
        if (error)
        {
            callback("Unable to connect to weather stack", undefined)
        } else if (body.error)
        {
            callback("Unable to find location. Try different search.",undefined)
        } else
        {
            //
            callback(undefined,{
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                rainchance: body.current.precip
            })
        }
    })
}
module.exports = forecast