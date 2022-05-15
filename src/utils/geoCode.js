const request=require('request');
const geoCode=(address,callback)=>{
    const geoCodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2hldHR5Y2hldGhhbiIsImEiOiJjbDJ2aGVpd3owMGlwM2pudDZ5MGdlbmVxIn0.NMvDKi8YjBXBKE3ON9hRKA&limit=1";
    request({url:geoCodeUrl,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to location service!',undefined)
        }
        else if(body.features.length==0)
        {
            callback('Unable to find location. Try another search',undefined)
        }
        else
        {
            callback(undefined,{
                lattitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })            
        }
    })
}
module.exports=geoCode;