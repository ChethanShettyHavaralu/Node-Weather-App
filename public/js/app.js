console.log("Client Side JS file is Loaded");

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.getElementById('message-1');
const messageTwo=document.getElementById('message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading.....'
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
            messageTwo.textContent='';
        }
        else{
            console.log(data)
            messageOne.textContent=data.location
            messageTwo.textContent=data.ForecastData
        }    
    })
})


})