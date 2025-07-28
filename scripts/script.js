import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {erToUpcase , wait} from './meh.js';

    let city = 'marrakech';

    // --- Error Handling Utilities ---
    const searchInputBox = document.querySelector('.search-input');
    const errorBox = document.querySelector('.error');

    function showError(message, color) {
      errorBox.style.display = 'initial';
      errorBox.innerText = message;
      errorBox.style.color = color;
      searchInputBox.style.outline = `2px solid ${color}`;
      // errorBox.setAttribute('role', 'alert'); // Uncomment for accessibility
    }

    function hideError() {
      errorBox.style.display = 'none';
      searchInputBox.style.outline = '';
    }

    function validateInput() {
      if (searchInputBox.value.trim().length === 0) {
        showError('Please type your city', 'green');
        return false;
      }
      hideError();
      return true;
    }

    function handleApiError() {
      showError('City not found !!! , Please try again.', 'red');
    }

    document.querySelector('.search-btn').addEventListener('click' ,()=>{
      city = document.querySelector('.search-input').value
      if (!validateInput()) return;
        wait()
        loading()
    });

    window.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      city = document.querySelector('.search-input').value
      if (!validateInput()) return;
      wait()
      loading()
    }
    } )



    loading()

    async function loading(){

    const accessKey='_jqwF6Aazg2PWoFQJlJacJde-DAeZkcvk85GURdPL7w';
    
    const cityPic  = await fetch(`https://api.unsplash.com/photos/random?query=${city}+city&client_id=${accessKey}`)
     .then(async res=>{
      if(!res.ok){
       throw new Error('Unsplash API error: ' + (await res.text()))
      }
      return res.json();
      }).then(pic=> {return pic.urls.raw}).catch(()=>{
        return 'https://nypost.com/wp-content/uploads/sites/2/2022/02/brentwood-tennessee-26.jpg?quality=75&strip=all'
      })



      const apiKey = '1676cd95644f5e97226b30d80f0a12dd';

      let dayInfo = {} ;
      let daysForecast = [];

      async function getWeatherData(city){  
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
          const data = await fetch(url).then(Response =>{
          return Response.json()
          }).catch(err => {
          console.log('Error fetching weather data:', err)})

        return data;
      }
      
      async function getInfo(getWeatherData){
        const data = await getWeatherData(city);

        if (!data || !data.main || !data.weather || !data.coord) {
          handleApiError();
          return;
        } else {
          hideError();
        }

        const {main :{temp , humidity,feels_like} , wind} = data;

        const { weather } = data;
        const { id, description } = weather[0];

       
        
        const {lat} = data.coord;
        const {lon} = data.coord;


        const dataItem = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(response=>{
        return response.json()
        })
        

       const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period`;

       const wave = await fetch(url)
         .then(res => res.json())
         .then(data => {
           const hour0 = data.hourly;
           return hour0.wave_height[0];
         })
         .catch(err => console.error('Error:', err));

        Object.assign(dayInfo, {
          temp,
          humidity,
          wind,
          id,
          feels_like,
          description,
          wave
        });

        const day1 = dataItem.list[7];
        const day2 = dataItem.list[15];
        const day3 = dataItem.list[23];
        const day4 = dataItem.list[31];
        const day5 = dataItem.list[39];
        daysForecast.push(
         {dayData:day1 , date:dayjs().add(1,'days').format('dddd DD/MM')}
        ,{dayData:day2 , date:dayjs().add(2,'days').format('dddd DD/MM')} 
        ,{dayData:day3 , date:dayjs().add(3,'days').format('dddd DD/MM')} 
        ,{dayData:day4 , date:dayjs().add(4,'days').format('dddd DD/MM')}
        ,{dayData:day5 , date:dayjs().add(5,'days').format('dddd DD/MM')}) 
      }

      await getInfo(getWeatherData);
      
      function displayMain(){

       let source = '';
       if (dayInfo.id >= 200 && dayInfo.id <= 232) {
        source = 'https://cdn-icons-png.flaticon.com/512/1779/1779963.png';
        } else if (dayInfo.id >= 300 && dayInfo.id <= 321) {
          source = 'https://cdn-icons-png.flaticon.com/512/2675/2675897.png';
        } else if (dayInfo.id >= 500 && dayInfo.id <= 531) {
          source = 'https://cdn-icons-png.flaticon.com/512/1164/1164945.png';
        } else if (dayInfo.id >= 600 && dayInfo.id <= 622) {
          source = 'https://cdn1.iconfinder.com/data/icons/winter-123/512/snowflake-snow-winter-cold-nature-512.png';
        } else if (dayInfo.id >= 701 && dayInfo.id <= 781) {
          source ='https://cdn-icons-png.flaticon.com/512/18005/18005339.png';
        } else if (dayInfo.id === 800) {
          source ='https://i.pinimg.com/564x/87/59/32/87593254dd28be044d90be2492a8734d.jpg';
        } else if (dayInfo.id === 801) {
          source ='https://www.wunderground.com/static/i/c/v4/30.svg';
        } else if (dayInfo.id >= 802 && dayInfo.id <= 804) {
          source ='https://cdn-icons-png.flaticon.com/512/414/414825.png';
        }

        let pic ='';
        if(city==="dakhla" || city==="Dakhla"){
            pic = "https://www.shutterstock.com/image-photo/dakhla-morocco-view-sky-600nw-2240458533.jpg"
        } else if(city==="agadir" || city==="Agadir"){
            pic = "https://www.expatriation.ma/wp-content/uploads/2023/02/maroc-agadir.jpg";
        }
        else if(city ==='guelmim'||city==="Guelmim"){
           pic = 'https://www.augon.ma/sites/default/files/2023-04/Guelmim-margaret-cornfield%20%281%29.jpeg'
        }
        else { pic = cityPic}



        let html = `
          <img  class="pic-section" src="${pic}" alt="city-pic">

          <div class="right-side">

            <div class="up-section">
              <div class="infos">
                <div class="city-name">${erToUpcase(city)}</div>

                <div class="main-info">
                  <div class="temperature icon-sp"><span><img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZTUwYTBhIiBkPSJNMjAgMTBoN3YyaC03em0wIDZoMTB2MkgyMHptMCA2aDd2MmgtN3ptLTEwLTEuODE2VjdIOHYxMy4xODRhMyAzIDAgMSAwIDIgMCIvPjxwYXRoIGZpbGw9IiNlNTBhMGEiIGQ9Ik0zMCA0SDEyLjk3NEE0Ljk4MyA0Ljk4MyAwIDAgMCA0IDd2MTEuMTFhNyA3IDAgMSAwIDEwIDBWN2E1IDUgMCAwIDAtLjEwMS0xSDMwWk05IDI4YTQuOTkzIDQuOTkzIDAgMCAxLTMuMzMyLTguNzE4TDYgMTguOTgzVjdhMyAzIDAgMCAxIDYgMHYxMS45ODNsLjMzMi4yOTlBNC45OTMgNC45OTMgMCAwIDEgOSAyOCIvPjwvc3ZnPg=="></span>${dayInfo.temp}°C</div>
                  <div class="humidity icon-sp"><span><img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyMjhlZTAiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDIxLjVjNC4xMDEgMCA3LjUtMy4wNjMgNy41LTYuOTI5YzAtMi40MTUtMS4yMzMtNC44NTktMi42MjctNi44NjJjLTEuNDAzLTIuMDE3LTMuMDIyLTMuNjYtMy44OTUtNC40OTFhMS40MTMgMS40MTMgMCAwIDAtMS45NTYgMGMtLjg3My44My0yLjQ5MiAyLjQ3NC0zLjg5NSA0LjQ5MUM1LjczMyA5LjcxMiA0LjUgMTIuMTU2IDQuNSAxNC41NzFjMCAzLjg2NiAzLjM5OSA2LjkyOSA3LjUgNi45MjlaIi8+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTIgMThhNCA0IDAgMCAxLTQtNCIvPjwvZz48L3N2Zz4="></span> ${dayInfo.humidity} %</div>
                  <div class="wind-speed icon-sp"><span><img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjI1IDUuNUEzLjI1IDMuMjUgMCAxIDEgOS41IDguNzVIM2EuNzUuNzUgMCAwIDEgMC0xLjVoNi41QTEuNzUgMS43NSAwIDEgMCA3Ljc1IDUuNXYuMzU3YS43NS43NSAwIDEgMS0xLjUgMHptOCAyYTQuMjUgNC4yNSAwIDEgMSA0LjI1IDQuMjVIMmEuNzUuNzUgMCAwIDEgMC0xLjVoMTYuNWEyLjc1IDIuNzUgMCAxIDAtMi43NS0yLjc1VjhhLjc1Ljc1IDAgMCAxLTEuNSAwem0tMTEgNi41YS43NS43NSAwIDAgMSAuNzUtLjc1aDE0LjVhNC4yNSA0LjI1IDAgMSAxLTQuMjUgNC4yNVYxN2EuNzUuNzUgMCAwIDEgMS41IDB2LjVhMi43NSAyLjc1IDAgMSAwIDIuNzUtMi43NUg0YS43NS43NSAwIDAgMS0uNzUtLjc1IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="></span> ${dayInfo.wind.speed} km/h</div>
                  <div class="wave icon-sp"><span><img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MiIgaGVpZ2h0PSI3MiIgdmlld0JveD0iMCAwIDcyIDcyIj48cGF0aCBmaWxsPSIjOTJkM2Y1IiBkPSJNNCAyOC4xOUM0IDE0LjgxNiAxNC4yODYgMy45NzYgMjcuODM3IDMuOTc2QzE1IDE5LjM0NCAyNi4yNSA0My43MjIgNTYuNCA0MS41NjNjNC4yNTYtLjMwNSA4Ljk0Ny0xLjc3OCAxMi41OTMtMy43MjR2MzAuMDg2YTEuMDEgMS4wMSAwIDAgMS0xLjAxIDEuMDExTDQgNjguOTU4eiIvPjxwYXRoIGZpbGw9IiM2MWIyZTQiIGQ9Ik0yMS43ODQgMTAuMDEyYy0zLjgyMSA3LjE3OC01Ljk1IDIxLjEyNyA2LjU1NiAzMy4zNDNjMCAwIDEwLjIzOSAxMi42NSA0MC42NTMgNC44ODVWMzcuMzVzLTExLjEwNiA3LjU5Mi0yNy41MjUgMi4zMzhDMjYuMDgzIDM0Ljc2NSAyMi4wNDMgMjMuMTYgMjIuNTU4IDE4LjkyYy4xODMtMS41Ljc4OS02LjA0Mi43ODktNi4wNDJzLjgzOS0zLjAxNC41NDUtMy44Yy0uMzQtLjkxMS0xLjgzNC40MTktMi4xMDguOTMzIi8+PHBhdGggZmlsbD0iIzkyZDNmNSIgZD0iTTQ0Ljg1NyA5LjcyMmMxLjY3NCAxLjkwNyAxLjU3OSA0LjcyMi0uMjEgNi4yOTNzLTQuNTk2IDEuMjk4LTYuMjctLjYwOGMwIDAtMi4wNy0yLjI4Ni0zLjAxOC04Ljg3NmMwIDAtLjI1MS0xLjMyLjk3OS0uOTZjNi40MTIgMS43OSA4LjUxOSA0LjE1MSA4LjUxOSA0LjE1MSIvPjxwYXRoIGZpbGw9IiM2MWIyZTQiIGQ9Ik0zNS40MSA2LjA1NWM0LjM1NC0uNiA5LjE2NiAzLjM4OCA5LjE2NiAzLjM4OGMyLjEzMyAyLjQzIDEuODYgNSAuMDcgNi41NzFjMCAwLS45OTctNS40NDItOS4yMzYtOS45NTkiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS13aWR0aD0iMiIgZD0iTTY4IDQ3Ljg5NnYyMC4wNjJINFYyNy44MzNDNCAxMy4xNDggMTMuNTc5IDQgMjcuODM2IDMuOTk3Ii8+PHBhdGggc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNjggMzcuNTA2QzY0LjM1MyAzOS40MjMgNjAuNjU2IDQwLjcgNTYuNCA0MUMyNi4yNSA0My4xMjUgMTUgMTkuMTI1IDI3LjgzNiAzLjk5NyIvPjxwYXRoIHN0cm9rZS13aWR0aD0iMiIgZD0iTTY4IDQ3Ljg5NmMtNC44MzMgMi42ODctMTEuMjUgMy4zNzEtMTkuMDE2IDIuOTg4Yy0zNC45OTMtMy4yNTktMzcuNjAzLTM2LjUtMjEuMTQ4LTQ2Ljg4NyIvPjxwYXRoIHN0cm9rZS13aWR0aD0iMS45IiBkPSJNNDQuODU3IDkuNzIyYzEuNjc0IDEuOTA3IDEuNTc5IDQuNzIyLS4yMSA2LjI5M3MtNC41OTYgMS4yOTgtNi4yNy0uNjA4YzAgMC0yLjA3LTIuMjg2LTMuMDE4LTguODc2YzAgMC0uMjUxLTEuMzIuOTc5LS45NmM2LjQxMiAxLjc5IDguNTE5IDQuMTUxIDguNTE5IDQuMTUxIi8+PHBhdGggc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNjMuODc1IDYzLjI3OGMtMy40MjQgMC0zLjQyNC0yLjA1NS02Ljg0Ny0yLjA1NWMtMy40MjIgMC0zLjQyMiAyLjA1NS02Ljg0NCAyLjA1NWMtMy40MjUgMC0zLjQyNS0yLjA1NS02Ljg1LTIuMDU1Yy0zLjQyNyAwLTMuNDI3IDIuMDU1LTYuODU1IDIuMDU1cy0zLjQyNy0yLjA1NS02Ljg1NC0yLjA1NSIvPjwvZz48L3N2Zz4="></span> ${dayInfo.wave?dayInfo.wave:''}m</div>
                </div>
              </div>

              <img class="emoji-section" src="${source}" alt="weater emoji">

            </div>

          
            

            <div class="down-section">${erToUpcase(dayInfo.description)} &nbsp|<span class="feels-like">&nbsp Feels like ${dayInfo.feels_like}°C</span> </div>

          </div>
        `
        

        document.querySelector('main').innerHTML = html

        if(!dayInfo.wave){
          document.querySelector('.wave').style.display = 'none';
        }
      }
      
    displayMain()
      function display5DaysForecast(){
        let html = '';
        daysForecast.forEach(day =>{
          const id = day.dayData.weather[0].id;
          let source = '';
          if (id >= 200 && id <= 232) {
            source = 'https://cdn-icons-png.flaticon.com/512/1779/1779963.png';
            } else if (id >= 300 && id <= 321) {
              source = 'https://cdn-icons-png.flaticon.com/512/2675/2675897.png';
            } else if (id >= 500 && id <= 531) {
              source = 'https://cdn-icons-png.flaticon.com/512/1164/1164945.png';
            } else if (id >= 600 && id <= 622) {
              source = 'https://cdn1.iconfinder.com/data/icons/winter-123/512/snowflake-snow-winter-cold-nature-512.png';
            } else if (id >= 701 && id <= 781) {
              source ='https://cdn-icons-png.flaticon.com/512/18005/18005339.png';
            } else if (id === 800) {
              source ='https://i.pinimg.com/564x/87/59/32/87593254dd28be044d90be2492a8734d.jpg';
            } else if (id === 801) {
              source ='https://www.wunderground.com/static/i/c/v4/30.svg';
            } else if (id >= 802 && id <= 804) {
              source ='https://cdn-icons-png.flaticon.com/512/414/414825.png';
            }
          html += `
            <div class="forecast-item">
              <img class="forecast-emoji" src="${source}" >
              <div class="day">${day.date}</div>
              <div class="forecast-infos">
                <div class="forecast-temp icony-sp sp"><span><img class="icony" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjZTUwYTBhIiBkPSJNMjAgMTBoN3YyaC03em0wIDZoMTB2MkgyMHptMCA2aDd2MmgtN3ptLTEwLTEuODE2VjdIOHYxMy4xODRhMyAzIDAgMSAwIDIgMCIvPjxwYXRoIGZpbGw9IiNlNTBhMGEiIGQ9Ik0zMCA0SDEyLjk3NEE0Ljk4MyA0Ljk4MyAwIDAgMCA0IDd2MTEuMTFhNyA3IDAgMSAwIDEwIDBWN2E1IDUgMCAwIDAtLjEwMS0xSDMwWk05IDI4YTQuOTkzIDQuOTkzIDAgMCAxLTMuMzMyLTguNzE4TDYgMTguOTgzVjdhMyAzIDAgMCAxIDYgMHYxMS45ODNsLjMzMi4yOTlBNC45OTMgNC45OTMgMCAwIDEgOSAyOCIvPjwvc3ZnPg=="></span>${day.dayData.main.temp} °C</div>
                <div class="forecast-humidity icony-sp sp"><span><img class="icony" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyMjhlZTAiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDIxLjVjNC4xMDEgMCA3LjUtMy4wNjMgNy41LTYuOTI5YzAtMi40MTUtMS4yMzMtNC44NTktMi42MjctNi44NjJjLTEuNDAzLTIuMDE3LTMuMDIyLTMuNjYtMy44OTUtNC40OTFhMS40MTMgMS40MTMgMCAwIDAtMS45NTYgMGMtLjg3My44My0yLjQ5MiAyLjQ3NC0zLjg5NSA0LjQ5MUM1LjczMyA5LjcxMiA0LjUgMTIuMTU2IDQuNSAxNC41NzFjMCAzLjg2NiAzLjM5OSA2LjkyOSA3LjUgNi45MjlaIi8+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTIgMThhNCA0IDAgMCAxLTQtNCIvPjwvZz48L3N2Zz4="></span>${day.dayData.main.humidity} %</div>
                <div class="forecast-wind-speed icony-sp"><span><img class="icony" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjI1IDUuNUEzLjI1IDMuMjUgMCAxIDEgOS41IDguNzVIM2EuNzUuNzUgMCAwIDEgMC0xLjVoNi41QTEuNzUgMS43NSAwIDEgMCA3Ljc1IDUuNXYuMzU3YS43NS43NSAwIDEgMS0xLjUgMHptOCAyYTQuMjUgNC4yNSAwIDEgMSA0LjI1IDQuMjVIMmEuNzUuNzUgMCAwIDEgMC0xLjVoMTYuNWEyLjc1IDIuNzUgMCAxIDAtMi43NS0yLjc1VjhhLjc1Ljc1IDAgMCAxLTEuNSAwem0tMTEgNi41YS43NS43NSAwIDAgMSAuNzUtLjc1aDE0LjVhNC4yNSA0LjI1IDAgMSAxLTQuMjUgNC4yNVYxN2EuNzUuNzUgMCAwIDEgMS41IDB2LjVhMi43NSAyLjc1IDAgMSAwIDIuNzUtMi43NUg0YS43NS43NSAwIDAgMS0uNzUtLjc1IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="></span>${day.dayData.wind.speed} km/h</div>
              </div>
            </div>
          `
        })

        document.querySelector('.forecast-section').innerHTML=html;

      }
    display5DaysForecast()

  }

// --- Live Search/Autocomplete for City Input ---
const searchInput = document.getElementById('search-input');
const suggestionsDiv = document.getElementById('suggestions');

// Example city list (replace with your own or fetch from API)
const cities = [
  'London', 'Paris', 'New York', 'Tokyo', 'Berlin', 'Cairo',
  'Moscow', 'Sydney', 'Toronto', 'Beijing', 'Madrid', 'Rome',
  'Dubai', 'Istanbul', 'Bangkok', 'Singapore', 'Los Angeles',
   'Chicago','Dakhla','Marrakech','Casablanca','Agadir' ,
    'Rabat', 'Oujda','Barcelona','Guelmim'
];

searchInput.addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  suggestionsDiv.innerHTML = '';
  if (!query) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  const matches = cities.filter(city => city.toLowerCase().includes(query));
  if (matches.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  suggestionsDiv.style.display = 'block';
  matches.forEach(city => {
    const div = document.createElement('div');
    div.textContent = city;
    div.className = 'suggestion-item';
    suggestionsDiv.appendChild(div);
  });
});

suggestionsDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('suggestion-item')) {
    searchInput.value = e.target.textContent;
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';
    searchInput.focus();
  }
});

// Hide suggestions when clicking outside
window.addEventListener('click', function(e) {
  if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target) && !document.querySelector('.search-btn').contains(e.target)) {
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';
    hideError();
  }
});
