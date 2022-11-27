//selectar button och lagrar i en variabel
const btn = document.querySelector("button");

//skapar en eventlistner till min button, med "click".
btn.addEventListener("click", function (event) {
    //här resettar jag error message vid varje sökning
    let errorMessage = document.getElementById("error-message");
    errorMessage.innerText = ``;
    //selectar user input
    const input = document.querySelector("input");
    const KEY = '62dba1b4b04741518d076ec00fb6fc70';
    //lagrar värdet i user input
    let searchText = input.value;

    //här har jag två url, en för current och en för forecast
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lang=sv&city=${searchText}&key=${KEY}`;
    const urlCurrent = `https://api.weatherbit.io/v2.0/current?lang=sv&city=${searchText}&key=${KEY}`;

    //fetch för current url.
    fetch(urlCurrent).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            //hätmar html element genom ID och lagrar innertext med info från api på 4 nedanstående variablarna.
            let weatherDescription = document.getElementById("current-description");
            weatherDescription.innerText = data.data[0].weather.description;
            
            let temperature = document.getElementById("current-temp");
            temperature.innerText = Math.round(data.data[0].temp) + " C";

            let windSpeed = document.getElementById("current-wind");
            windSpeed.innerText = Math.round(data.data[0].wind_spd) + " m/s";

            let humidity = document.getElementById("current-humidity");
            humidity.innerText = Math.round(data.data[0].rh) + "%";

            //hätmar img tag genom ID
            let currentIconImg = document.getElementById("current-weather-icon");
            //lagrar img.src med url som har icon kod.
            currentIconImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
        }
    ).catch(
        function (error) {
            //fel-meddelande om användaren skriver in ett felaktig inmatning.
            errorMessage.innerText = `${input.value} is not a valid search!`;
        }
    );


    //fetch för forecast url.
    fetch(urlForecast).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            //skapar en for-loop som körs 5 gånger, från index 1 till 5.
            for(let i=1; i<=5;i++){  
                let forecastWeather = document.getElementById("forecast-weather"); //hämtar element forecast-weather för att få tillgång till child-elements
                weatherDay = forecastWeather.querySelector("#dag"+i); //hämtar div taggarna med namn dag1,dag2... osv, för att få tillgång till dess child-elements
                let iconImg = weatherDay.querySelector("img"); //hämtar img-taggen inuti ex:dag1 element.
                iconImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[i].weather.icon}.png`; //lagrar img.src taggen med icon url.
                let tempForecastWeather = weatherDay.querySelector("#temperature"); //hämtar p-tag med id=temperature
                tempForecastWeather.innerText = Math.round(data.data[i].temp) + " C"; //lagrar in temp från api och avrundar talet.
                let descriptionForecastWeather = weatherDay.querySelector("#description"); //hämtar p-tag med id=desciption
                descriptionForecastWeather.innerText = data.data[i].weather.description; //lagrar in desciption från api.
            }
        }
    ).catch(
        function (error) {
            //fel-meddelande om användaren skriver in ett felaktig inmatning.
            errorMessage.innerText = `${input.value} is not a valid search!`;
        }
    );
})


