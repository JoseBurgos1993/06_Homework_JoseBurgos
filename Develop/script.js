

$("document").ready(function(){
    const apikey = "d5289c9fe465d0226d0e9ada8c91d745";

    function getWeatherData(cityName){
        event.preventDefault();
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apikey;

        $.ajax({url: queryURL, method: "GET"}).then(function(response){
            console.log(response);
        });
        return "potato";


    }

    $(".submit").on("click", function(){
        event.preventDefault();
        const cityName = $("#cityName").val();
        if(getWeatherData(cityName) === null){
            console.log("anus");
        } else{
            const newButton = $("<button>");
            newButton.text(cityName);
            newButton.addClass("cityBtn");
            const newRow = $("<div>");
            newRow.addClass("row");
            newRow.append(newButton);
            $(".btnList").append(newRow);
        }
    });
});