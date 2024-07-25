const request = require('request')

///////////////////////////////////////////////////Function of geocode using simple syntax
// const geocode = (address, callback) => {

//     const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoiYXJzYWxhbjciLCJhIjoiY2x5bnhvYTg2MGExdDJyczRsYnZyNWd6aiJ9.rCF2phLRHkxujKNqJYD7cQ&key=1'

//     request({url:url, json:true}, (error,response) =>{
//         //
//         if(error)
//         {
//             callback('Unable to connect to mapbox services', undefined)
//         }else if(response.body.features.length === 0)
//         {
//             callback("Unable to find search. Try using different keywords.", undefined)
//         }else 
//         {
//             //
//             callback(undefined,{
//                 longitude: response.body.features[0].properties.coordinates.longitude,
//                 latitude: response.body.features[0].properties.coordinates.latitude,
//                 location: response.body.features[0].properties.full_address
//             })
//         }
//     })
    
// }


/////////////////////////////////////////////////Function of geocode using es6 shorthand object destructuring

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoiYXJzYWxhbjciLCJhIjoiY2x5bnhvYTg2MGExdDJyczRsYnZyNWd6aiJ9.rCF2phLRHkxujKNqJYD7cQ&key=1'

    request({url, json:true}, (error,{body} = {}) =>{
        //
        if(error)
        {
            callback('Unable to connect to mapbox services', undefined)
        }else if(body.features.length === 0)
        {
            callback("Unable to find search. Try using different keywords.", undefined)
        }else 
        {
            //
            callback(undefined,{
                longitude: body.features[0].properties.coordinates.longitude,
                latitude: body.features[0].properties.coordinates.latitude,
                location: body.features[0].properties.full_address
            })
        }
    })
    
}


module.exports = geocode