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
                    console.log(response);

                    // Do Data
                }
            }
        );
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