// Javascript file
// By Jose Burgos
// https://en.wikipedia.org/wiki/Miscellaneous_Symbols


$("document").ready(function(){
    //---- GLOBAL VARIABLES ----\\
    const apikey = "d5289c9fe465d0226d0e9ada8c91d745";

    //---- FUNCTIONS ----\\

    // Queries for weather data
    function getWeatherData(cityName){
        event.preventDefault();
        let e = true; // Boolean that is used to check for errors

        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apikey;

        $.ajax({url: queryURL,
            method: "GET",
            error: function(xhr, status, error){ // If query fails to get data
                e = false;
                alert("Error. City does not exist!");
            }
            }).then(function(response){
                // If query succeeded
                if(e == true){

                    // Do Data
                    const today = response.list[0];
                    /*
                    const forecast1 = response.list[1];
                    const forecast2 = response.list[2];
                    const forecast3 = response.list[3];
                    const forecast4 = response.list[4];
                    const forecast5 = response.list[5];
                    */
                    for(let i=0; i<5; i++){
                        const forecast = response.list[i+1];
                        let temp1 = forecast.main.temp;
                        temp1 = ((temp1 - 273.15) *1.8 + 32).toFixed(1);
                        const humid = forecast.main.humidity;
                        const icon1 = weatherSymbol(forecast.weather[0].icon);


                    }
                    let i = 1;
                    $(".dayCast").each(function(){
                        const forecast = response.list[i];
                        i+=8;
                        const temp = ((forecast.main.temp - 273.15) * 1.8 + 32).toFixed(1);
                        const humid = forecast.main.humidity;
                        const icon = weatherSymbol(forecast.weather[0].icon);
                        const date = forecast.dt_txt.substring(5,10);
                        $(this).html(
                            date + "<br>" +
                            "<img src='" + icon + "'></img><br>" +
                            "Temp: " + temp + "&#8457 <br>" +
                            "Humid: " + humid + "%"
                        );
                    });
                    
                    //$("#currentDay").text(moment().format("MMMM Do YYYY"));
                    const date = moment().format("(MMMM Do YYYY)");
                    const temp = ((today.main.temp - 273.15) * 1.8 + 32).toFixed(1);
                    const humidity = today.main.humidity;
                    const windspeed = today.wind.speed.toFixed(1);
                    const lat = response.city.coord.lat;
                    const lon = response.city.coord.lon;
                    var UV = 0.0;
                    const newURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,daily&appid=" + apikey;

                    console.log("--------WEATHER SYMBOL--------");
                    console.log(today.weather[0].main);
                    console.log(weatherSymbol(today.weather[0].icon));
                    const icon = weatherSymbol(today.weather[0].icon);
                    console.log("------------------------------");
                    
                    $.ajax({url: newURL, method: "GET",}).then(function(newResponse){
                        UV = newResponse.current.uvi;

                        $("#rightSide").css("display", "block");
                        $("#today").html(
                            "<h2>" + cityName + " " + date + " " + " <img src='" + icon + "'></img>"
                            + "</h2><br>" +
                            "Temperature: " + temp   + "&#8457 <br>" +
                            "Humidity: "    + humidity  + "% <br>" +
                            "Wind Speed: "  + windspeed + " MPH <br>" +
                            "UV Index: "    + UV
                        );
                        const lastCity = [cityName, temp, humidity, windspeed, UV, weatherSymbol];
                        localStorage.setItem("lastCity", lastCity);

                        /*
                        console.log(today);
                        console.log(forecast1);
                        console.log(forecast2);
                        console.log(forecast3);
                        console.log(forecast4);
                        console.log(forecast5);
                        */
                    });
                }
            }
        );
    }

    // Gets the correct weather symbol based on that day's weather
    function weatherSymbol(code){
        //http://openweathermap.org/img/wn/10d@2x.png
        
        return "http://openweathermap.org/img/wn/" + code + ".png";
    }

    // Creates a new button for the search history area
    function createButton(cityName){
        const newButton = $("<button>");
        newButton.text(cityName);
        newButton.addClass("cityBtn");

        newButton.on("click", function(){
            event.preventDefault();
            const cityName = $(this).text();
            getWeatherData(cityName);
        });

        const newRow = $("<div>");
        newRow.addClass("row");
        newRow.append(newButton);
        $(".btnList").append(newRow);
    }

    // Compares inputed city name to current buttons. Returns true if duplicate exists, returns false if not.
    function checkDuplicate(cityName){
        let result = false;
        $(".cityBtn").each(function(){
            if($(this).text() == cityName){
                result = true;
                return 0;
            } else{
                result = false;
                return 0;
            }
        });
        return result;
    }

    //---- EVENT LISTENERS ----\\

    // Submit button event listener. Grabs city name from textfield. 
    // If no duplicate exists, runs getWeatherData()
    
    $(".submit").on("click", function(){
        event.preventDefault();
        const cityName = $("#cityName").val().toUpperCase();

        if(!checkDuplicate(cityName)){
            getWeatherData(cityName);
            createButton(cityName);
        }
    });


    $(".clear").on("click", function(){
        $(".btnList").empty();
    })
    /*
    function cityClickEvent(){
        event.preventDefault();
        const cityName = $(this).text();
        if(!checkDuplicate(cityName)){
            getWeatherData(cityName);
        }
    }*/
    // City buttons exist as a search history. Clicking them will re-query that data
    
    $(document).on("click",".cityBtn", function(){
        console.log("-----");
        console.log($(this));
        console.log($(this).children()[0].text());
        console.log("-----");
        if(!checkDuplicate($(this).children(0).text())){
            getWeatherData($(this).children(0).text());
        }
    });
    

    //---- MAIN FUNCTION ----\\
    function main(){
        // Does nothing right now. I just wanted a Main.
    }
    main();
});