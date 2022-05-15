const request=require('request');
const getForecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9ac61c53a6ad96bd541468d45d3fd49b&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.success==false)
        {
            callback(body.error.info,undefined)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+" .The temperature is "+body.current.temperature+". It feels like "+body.current.feelslike)
        }
    })
}
module.exports=getForecast;