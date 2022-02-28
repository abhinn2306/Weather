const submitBtn = document.querySelector('#submitbtn');
const cityName = document.querySelector('#cityName');
const city_name = document.querySelector('#city_name');
const temp_icon = document.querySelector('#temp_icon');
const data_hide = document.querySelector('.data_hide');
const temp_final = document.querySelector('#temp_final');
const day = document.querySelector('#day');
const date = document.querySelector('#date');

// for date and day
var today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdays =["Sunday","Monday","Tuesday","wednesday","Thursday","Friday","Saturday"];
let month_name = monthNames[today.getMonth()]
date.innerText  = `${today.getDate()} ${(month_name)}`;
let week = weekdays[today.getDay()];
day.innerText = week;

const getInfo = async(e) =>{
    e.preventDefault();    
    let cityVal = cityName.value;
    if(cityVal ===""){
        city_name.innerText ="Please Enter a city Name"
        data_hide.classList.add('data_hide')
        
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=a888b249652cdba5d4190fd97fac7acb`;
            const data = await axios.get(url);
            const arrData =[data];
            let Celsius = Math.floor(arrData[0].data.main.temp-273.15);
            temp_final.innerText=Celsius;
            city_name.innerText = `${arrData[0].data.name},${arrData[0].data.sys.country}`;
            const tempIcon = arrData[0].data.weather[0].main;

            // for temperature icon
            if(tempIcon ==="Clear"){
                temp_icon.innerHTML= "<i class='fas fa-sun' style='color : #dde11b;'></i>";
            }else if(tempIcon ==="Clouds"){
                temp_icon.innerHTML="<i class='fas fa-cloud' style='color : #22659a;'></i>";
            }else if(tempIcon ==="Rain"){
                temp_icon.innerHTML="<i class='fas fa-cloud-rain' style='color : #22659a;'></i>";
            }else if(tempIcon ==="Snow"){
                temp_icon.innerHTML="<i class='fas fa-snowflake' style='color : #ffffff;'></i>";
            }
            else{
                temp_icon.innerHTML="<i class='fas fa-sun' style='color : #dde11b;'></i>";
            }      
            data_hide.classList.remove('data_hide')      
        }catch{
            city_name.innerText =`Please Enter a proper city Name`;
            data_hide.classList.add('data_hide')
        }           
            
        
    }


}
submitBtn.addEventListener('click',getInfo)