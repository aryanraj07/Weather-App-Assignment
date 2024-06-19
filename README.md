# Weather Forecast App

**Installing** React using Vite Setup
Use `npm create vite@latest filename`

## React + Vite

[visit guide](https://vitejs.dev/guide/ "vite guide")
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### install dependencies

`npm i`

## Tailwind Css setup

[Guide](https://tailwindcss.com/docs/guides/vite)

## Obtaining an API Key from OpenWeatherMap

> To fetch weather data, you need to obtain an API key from OpenWeatherMap:

1. Visit OpenWeatherMap and sign up for a free account.
2. After signing in, navigate to your account and go to the API keys section.
3. Generate a new API key (also known as an appid).

## Configuration

Once you have obtained your API key:

1. Create a .env file in the root directory of the project.

2. Add your API key to the .env file:
   > REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here

## Running the Application

To start the application locally:

bash
Copy code
`npm run dev`
This will run the app in the development mode.
Open http://localhost:5173 to view it in the browser.

## Start the Json Server

copy code `json-server --watch db.json --port 5000`
and message will be displayed as:

> JSON Server started on PORT :5000

# Usage

1. Enter a city name in the search bar to fetch and display current weather data.
2. Click on a favorite city listed below to display its weather details.
3. Click "Add Favorite" to add a city to your favorites list.
4. Click "Remove" to delete a city from your favorites list.

# Built With

**React** - JavaScript library and **Tailwind** for building user interfaces.
**OpenWeatherMap** API - API for fetching weather data.

## Authors

Aryan Raj - [Github](https://github.com/aryanraj07)
