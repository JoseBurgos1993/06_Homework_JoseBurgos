// Javascript file
// By Jose Burgos


$("document").ready(function(){
    //---- GLOBAL VARIABLES ----\\
    const apikey = "d5289c9fe465d0226d0e9ada8c91d745";

    //---- FUNCTIONS ----\\

    // Queries for weather data
    function getWeatherData(cityName){
        //event.preventDefault();
        let e = true; // Boolean that is used to check for errors
        cityName = cityName.toUpperCase();

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

                    // Gets and sets local storage
                    let history = localStorage.getItem("cityHistory");
                    if(history === null){
                        localStorage.setItem("cityHistory", cityName);
                    } else{
                        history = history + "," + cityName;
                        localStorage.setItem("cityHistory", history);
                    }
                    localStorage.setItem("lastCity", cityName);

                    // Gets and writes the 5-day forecast
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


                    // Gets data for today's forecast
                    const today = response.list[0];
                    const date = moment().format("(MMMM Do YYYY)");
                    const temp = ((today.main.temp - 273.15) * 1.8 + 32).toFixed(1);
                    const humidity = today.main.humidity;
                    const windspeed = today.wind.speed.toFixed(1);

                    // getting latitude and longitude to acquire the UV index
                    const lat = response.city.coord.lat;
                    const lon = response.city.coord.lon;
                    var UV = 0.0;
                    const newURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,daily&appid=" + apikey;

                    // Gets today's weather icon
                    console.log(today.weather[0].main);
                    console.log(weatherSymbol(today.weather[0].icon));
                    const icon = weatherSymbol(today.weather[0].icon);
                    
                    // Queries for today's uv data, then writes today's forecast
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
        cityName = cityName.toUpperCase();
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
        cityName = cityName.toUpperCase();
        var result = false;
        $(".cityBtn").each(function(){
            if($(this).text() == cityName){
                result = true;
                console.log(result);
                return false; // <--- apparently returning false in a .each() works as a break
            }
        });
        return result;
    }

    //---- EVENT LISTENERS ----\\

    // Submit button event listener. Grabs city name from textfield. 
    // If no duplicate exists, runs getWeatherData()
    
    $(".submit").on("click", function(){
        event.preventDefault();
        const cityName = $("#cityName").val();
        if(!checkDuplicate(cityName)){
            getWeatherData(cityName);
            createButton(cityName);
        }
    });

    // Clears history buttons and memory
    $(".clear").on("click", function(){
        $(".btnList").empty();
        localStorage.removeItem("cityHistory");
        localStorage.removeItem("lastCity");
    });

    // Function for the for loop below
    function test(item){
        if(!checkDuplicate(item)){
            createButton(item);
        }
    }
    //---- MAIN FUNCTION ----\\
    function main(){
        // Read from memory
        const lastCity = localStorage.getItem("lastCity");
        if(lastCity != null){
            getWeatherData(lastCity);
        }
        const cityHistory = localStorage.getItem("cityHistory");
        if(cityHistory != null){
            const history = cityHistory.split(",");
            
            history.forEach(test);
        }
    }
    main();
});