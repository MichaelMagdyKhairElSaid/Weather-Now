let SearchInput= document.querySelector("#SearchInput");
let findCountryBtn= document.querySelector("#findCountryBtn")
let MainContent= document.querySelector("#MainContent")
// let Today= document.querySelector("#Today")
// let TodayTemp= document.querySelector("#TodayTemp")
// let TodayTemp= document.querySelector("#TodayTemp")
// let todayTempImage= document.querySelector("#todayTempImage")


async function forcastAPI(country) {
let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=cffac98264124b86ac250245232304&q=Cairo&days=3&aqi=no&alerts=no`);
let finalResult = await result.json();
console.log(finalResult);
return finalResult
}
// display default country function
displayTableContent()

// display country weather
findCountryBtn.addEventListener("click",displayTableContent)

async function displayTableContent() {
    console.log(`SearchInput.textContent`+SearchInput.textContent);
    let forcastRes =await forcastAPI(SearchInput.textContent);
    

    let todayDateInNum = forcastRes.location.localtime.split(" ",1);
    console.log("todayDateInNum ="+todayDateInNum);
    
    console.log("today ="+getWeakday(todayDateInNum));
    console.log("tomorrow ="+getWeakday(todayDateInNum,1));
    console.log("after tomorrow ="+getWeakday(todayDateInNum,2));
    console.log("after tomorrow ="+forcastRes.forecast.forecastday[0].day.daily_chance_of_rain);
    


    let TableContent=`                                                                                          
    <div class="row rounded-3 second-color ">
    <div class="col-lg-4 p-0 ">
    <div class="table-header d-flex justify-content-between  p-2 rounded-start-3"><p class="m-0" id="Today">${getWeakday(todayDateInNum)}</p><p class="m-0">${getMonthAndDay(todayDateInNum)}</p></div>
    <div class="p-4 ">
    <h6 id="countryName">${forcastRes.location.name}</h6>
    <div class="d-flex align-items-center justify-content-between"><p class="d-inline-block " id="Temp">${forcastRes.current.temp_c}<sup>o</sup>C</p> <img src="${forcastRes.current.condition.icon}" alt="image" id="todayTempImage"></div>
    <p class="text-info" id="todayCondition">${forcastRes.current.condition.text}</p>
    <span class="me-2"><i class="fa-solid fa-umbrella me-1"></i>${forcastRes.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
    <span class="me-2"><i class="fa-solid fa-wind me-1"></i>${forcastRes.forecast.forecastday[0].day.maxwind_kph}km/h</span>
    <span class="me-2"><i class="fa-solid fa-compass me-1"></i>${forcastRes.forecast.forecastday[0].hour[0].wind_dir}</span>
    </div>
    <!-------------------------------- finished----------------------- -->
        </div>
        <div class="col-lg-4 p-0 text-center" id="midTable">
        <div id="midTableHeader" ><p class="m-0">${getWeakday(todayDateInNum,1)}</p></div>
        <img src="${forcastRes.forecast.forecastday[1].day.condition.icon}" alt="" class="img-fluid my-4">
        <p class="m-0 text-white fs-5 fw-bold">${forcastRes.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
        <small >${forcastRes.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>c</small>
        <p class="text-info my-4">${forcastRes.forecast.forecastday[1].day.condition.text}</p>
        </div>
        <div class="col-lg-4 p-0 text-center">
          <div class="table-header p-2 rounded-end-3"><p class="m-0">${getWeakday(todayDateInNum,2)}</p></div>
        <img src="${forcastRes.forecast.forecastday[2].day.condition.icon}" alt="" class="img-fluid my-4">
        <p class="m-0 text-white fs-5 fw-bold">${forcastRes.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
        <small >${forcastRes.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
        <p class="text-info my-4">${forcastRes.forecast.forecastday[2].day.condition.text}</p>
        </div>
   </div>
     
    </div>
 
    
    `
MainContent.innerHTML= TableContent;
 
}
// get weakDay
function getWeakday(dateInNum,addDay = 0) { //input Date in Num and out put is weakday
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date(dateInNum);
let day = days[d.getDay()+addDay];
return day 
}

function getMonthAndDay(dateInNum) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(dateInNum);
    let month = months[d.getMonth()];   
    return d.getDate()+month
}