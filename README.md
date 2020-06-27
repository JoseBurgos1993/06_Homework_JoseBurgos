# 06_Homework_JoseBurgos

This is my repository, https://github.com/JoseBurgos1993/06_Homework_JoseBurgos.
This is a link to the deployed webpage, https://joseburgos1993.github.io/06_Homework_JoseBurgos/.

<img width="946" alt="screenshot" src="https://user-images.githubusercontent.com/57579330/85912970-b1c0cc00-b7fe-11ea-8dfa-404557e8e5b9.png">

For this project, I created a webpage that presents today's forecast and a 5-day forecast. The user is shown a text field and a submit button. Input a city's name and submit. The page will query api.openweathermap.org/ for the weather data. Today's date, temperature in F, wind speed, UV index, and humidity will be shown. Also a cute little weather icon. Below that is a 5-day forecast showing the temperature in F, humidity, and another weather icon. Under the search bar will spawn a button with the city's name. Clicking it will rerun the query for that city. The buttons that appear there act as a search history. Upon reloading the page, the program will requery the last city checked, and recreate the history buttons. There is a clear history button that when pressed, will delete the local storage for this program and clear the history buttons. The forecasts on the right will remain. But if the page is reloaded with no history, the page will be empty and look like how it did when first accessed.