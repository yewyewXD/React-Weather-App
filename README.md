# Weather App V2

## Description

**V1:** A weather web application which shows weather of countries all around the world. <br>
**V2:** A weather search app which allows to get a place's and its nearby cities' weather & temperature.<br>

## Build status

**Success:** [See Live](https://rtweather.netlify.app/)

Started on: 26 Jul 2020 <br>
Completed on: 28 Jul 2020 <br>
Last modified on: 1 October 2020 <br>

## Screenshots (V1 and V2)

![Search country](https://github.com/yewyewXD/React-Weather-App/blob/master/readme-images/select.png?raw=true "Search country")
![Display weather of cities](https://github.com/yewyewXD/React-Weather-App/blob/master/readme-images/render.png?raw=true "Display weather of cities")<br><br>

![Landing page](https://github.com/yewyewXD/React-Weather-App/blob/master/readme-images/landing.JPG?raw=true "Landing page")
![Upper part of search result page](https://github.com/yewyewXD/React-Weather-App/blob/master/readme-images/searchPage1.JPG?raw=true "Upper part of search result page")
![Lower part of search result page](https://github.com/yewyewXD/React-Weather-App/blob/master/readme-images/searchPage2.JPG?raw=true "Lower part of search result page")

## Tech/framework used

- React.js
- Sass

## Features

- Get weather & temperature info
- Get nearby cities and also their weather & temperature info

## How to use it locally

First, sign up[creating an account](https://home.openweathermap.org/users/sign_up) for an OpenWeather account<br>

Then, you can get your free API key [here](https://home.openweathermap.org/api_keys)<br>

Now, clone the repository, then:

> cd into the working directory and install dependencies:

```bash
cd React-Weather-App

npm i
```

> Create a "config" folder with an "apiKeys.js" file in it:

```bash
cd src
mkdir config
cd config
touch apiKeys.js
```

> In "apiKey.js", export your API key:

- If you're using VS Code, you can cd into the file start editing

```bash
cd apiKeys.js
code .
```

- Paste in the code and replace pasteyourapikeyhere with your Open Weather API key

```bash
module.exports = {
  API_KEY: "pasteyourapikeyhere",
};
```

> Back to the root directory and run the app:

```bash
cd ..
cd ..
cd ..
npm start
```

## Future Update

- Get an accurate country/city image based on weather, season and/or temperature
- Get places' description by scraping Wikipedia

## API Reference

[Current Weather API](https://openweathermap.org/current) <br>
[REST Countries API](https://restcountries.eu/) <br>

## Credits

Initiative Inspiration: Angel John <br>
[Design Inspiration](https://www.behance.net/gallery/12748107/Weather-Dashboard-Global-Outlook) <br>
