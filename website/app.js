console.log("connect"); // connect to client side
/* Global Variables */
//API CALL from https://openweathermap.org/current => guide
let baseURL = "http://api.openweathermap.org/data/2.5/weather?"; // web link
const apiKey = "20c6e69aac4d0283ea50d78972b13e7d&units=metric"; //personal API key with celcius units temp
const postTo = "http://localhost:1515"; // server path post data
const getTo = "http://localhost:1515/all"; //server path get data
const zipCode = document.getElementById("zip"); //
const city = document.getElementById("cityName");
const userFeelings = document.getElementById("feelings");
const datee = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Call function to fetch via OpenWeatherMap link
const getWeather = async (baseURL, zip = "20001,us", apiKey) => {
    const url = `${baseURL}zip=${zip}&appid=${apiKey}`;
    const response = await fetch(url);
    let jsonResponse = await response.json();
    console.log("fetching data from link are done"); //console message
    return jsonResponse;
};

// User post data function
const postData = async (path, data = {}) => {
    const response = await fetch(path, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
};

// Update UI function woth the requested data
const updateData = async () => {
    const response = await fetch(getTo);
    const jsonResponse = await response.json();
    city.innerHTML = `<span class="entry-item">City: </span>${jsonResponse.city}`; //city
    datee.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`; //date
    content.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.userFeeling}`; //user input feelings
    temp.innerHTML = `<span class="entry-item">Temperature :</span>${jsonResponse.temperature}` + "c"; // temperature in celcius
    console.log("updates are done"); //console message
};

// Event happenn with Click on button to get infodata
const getInfo = async () => {
    const weatherData = await getWeather(baseURL, zipCode.value, apiKey);
    const data = {
        city: weatherData.name, // https://openweathermap.org/forecast5#JSON
        temperature: weatherData.main.temp, //https://openweathermap.org/forecast5#JSON
        date: newDate,
        userFeeling: userFeelings.value,
    };
    await postData(postTo, data);
    updateData();
    console.log("information pass"); //console message
};

document.getElementById("generate").addEventListener("click", getInfo); // click action
