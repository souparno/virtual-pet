# Phaser game 2

Virtual pet game in [Zenva Academy](academy.zenva.com) course.
Porting it to ES6 and defining pet prefab to refactor pet logic out of
main game state

ES6 and Phaser starting template used: [phaser-es6-boilerplate](https://github.com/belohlavek/phaser-es6-boilerplate)

## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.
