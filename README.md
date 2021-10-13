# weather-app
## What's up, check the website out, recommend using pc, lap with landscape screen: [page](https://vphatfla.github.io/weather-app/).
----
### Customize it
####1. Git clone:
```
git clone git@github.com:vphatfla/weather-app.git
```
####2. npm install webpack
```
npm install webpack webpack-cli --save-dev
npm install --save-dev style-loader css-loader
npm install eslint --save-dev
./node_modules/.bin/eslint --init
// use airbnb
```
####3. Get your API key
Go to [here](https://openweathermap.org/), sign up and get your free api key. 
####4. Create configKey.js
```
dist
src
...
configKey.js
```

Inside configKey.js:

```
const apiKeyHidden = {Your key here};
export default apiKeyHidden;
```
