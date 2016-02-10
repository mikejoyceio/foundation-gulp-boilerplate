#Frontend Boilerplate

A [Gulp](http://gulpjs.com/) boilerplate with customized frontend tasks.

##Dependencies

- [Node.js](https://nodejs.org/)
- [Ruby](https://www.ruby-lang.org/en/)
- [Sass](http://sass-lang.com/)
- [Bower](http://bower.io/)
- [Compass](http://compass-style.org/)

##Gulp Plugins

- [Gulp Compass](https://www.npmjs.com/package/gulp-compass)
- [Gulp Concat](https://www.npmjs.com/package/gulp-concat)
- [Gulp Filter](https://www.npmjs.com/package/gulp-filter)
- [Gulp Live Reload](https://www.npmjs.com/package/gulp-livereload)
- [Gulp Load Plugins](https://www.npmjs.com/package/gulp-load-plugins)
- [Gulp Minify CSS](https://www.npmjs.com/package/gulp-minify-css)
- [Gulp Plumber](https://www.npmjs.com/package/gulp-plumber)
- [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify)

##Installation

#####1. Install Dependencies:

Make sure you have the dependencies listed above installed on your machine.

#####2. Install Gulp globally:

```
$ npm install --global gulp
```

#####3. Install Gulp in your project:

```
$ npm install --save-dev gulp
```

#####4. Install Gulp plugins:

Add the `package.json` to the root of your project and run:

```
$ sudo npm install
```

#####5. Add Gulp 

Add the `gulp.js` file to the root of your project.

##Usage

Gulp works by running custom tasks.

To run an individual task:

```
$ gulp <task>
```

Further information and documentation is avaiable [here](https://github.com/gulpjs/gulp/blob/master/docs/README.md#articles).

#####Build

Concatenate and minify CSS and JavaScript:

```
$ gulp
```

#####Watch

Watch JavaScript and Sass files for changes and concatenate / minify on the fly:

```
$ gulp watch
```

Best used with the [livereload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).


