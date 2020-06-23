// Javascript file
// By Jose Burgos

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
                    createButton(cityName);

                    // Do Data
                    const today = response.list[0];
                    const forecast1 = response.list[1];
                    const forecast2 = response.list[2];
                    const forecast3 = response.list[3];
                    const forecast4 = response.list[4];
                    const forecast5 = response.list[5];

                    const UV = "xxx";
                    $("#rightSide").css("display", "block");
                    $("#today").html(
                        "<h2>" + cityName + "(DATE)" + weatherSymbol() + "</h2><br>" +
                        "Temperature: " + today.main.temp + "&#8457 <br>" +
                        "Humidity: " + today.main.humidity + "% <br>" +
                        "Wind Speed: " + today.wind.speed + "MPH <br>" +
                        "UV Index: " + UV
                    );
                    console.log(today);
                    console.log(forecast1);
                    console.log(forecast2);
                    console.log(forecast3);
                    console.log(forecast4);
                    console.log(forecast5);

                    //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
                }
            }
        );
    }

    // Gets the correct weather symbol based on that day's weather
    function weatherSymbol(){
        return "&#9729";
    }

    // Creates a new button for the search history area
    function createButton(cityName){
        const newButton = $("<button>");
        newButton.text(cityName);
        newButton.addClass("cityBtn");
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
        const cityName = $("#cityName").val();

        if(!checkDuplicate(cityName)){
            getWeatherData(cityName);
        }
    });

    // City buttons exist as a search history. Clicking them will re-query that data
    $(".cityBtn").on("click", function(){
        getWeatherData($(this).text());
    });

    //---- MAIN FUNCTION ----\\
    function main(){
        // Does nothing right now. I just wanted a Main.
    }
    main();
});