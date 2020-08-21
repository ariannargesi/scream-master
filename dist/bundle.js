/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ \"./src/audio/index.js\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_audio__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ \"./src/state/index.js\");\n/* harmony import */ var _domNodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domNodes */ \"./src/domNodes/index.js\");\n/* harmony import */ var _hedges__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hedges */ \"./src/hedges/index.js\");\n/* harmony import */ var _funcs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./funcs */ \"./src/funcs/index.js\");\n\n\n\n\n\n\n\n//always contain the latest value of microphone sound level\nlet soundLevel = 0\n_audio__WEBPACK_IMPORTED_MODULE_0___default()((x) => {\n    if (x) soundLevel = Math.round(x * _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sensitivity)\n})\n\nlet intervalId\n\ndocument.addEventListener('keydown', (e) => {\n    const key = e.keyCode\n    if (key === 32) {\n        startGame()\n    }\n})\n\n_domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].inputSlider.addEventListener('input', (e) => {\n    let value = e.target.value / 1000\n    value = value.toFixed(2)\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sensitivity = value \n})\n\nconst startGame = () => {\n    if(_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver) {\n        reStart()\n    }\n   else if (_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameInPlay === false) {\n        _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.style.display = 'none'\n        _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].soundLevelHint.style.display = \"none\"\n        _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sensitivity.style.display = \"none\"\n        _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameInPlay = true\n        if (_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver === false)\n            intervalId = setInterval(() => {\n                if (_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver === true) clearInterval(_hedges__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\n                else Object(_hedges__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()\n            }, 2000)\n        requestAnimationFrame(updateScreen)\n    }\n}\n\nconst updateScreen = () => {\n\n    if (!_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver) {\n\n        const containerHeight = Math.round(_domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].container.getBoundingClientRect().height)\n        const characterOffsetTop = _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].character.offsetTop\n\n      \n        if ( soundLevel > 200 && soundLevel < 600 && characterOffsetTop + 50 < containerHeight && !_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].lock) {\n            Object(_funcs__WEBPACK_IMPORTED_MODULE_4__[\"setBallPosition\"])(characterOffsetTop + _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameSpeed)\n        \n        }\n\n        else if (soundLevel > 600 && characterOffsetTop > 0){\n           Object(_funcs__WEBPACK_IMPORTED_MODULE_4__[\"setBallPosition\"])(characterOffsetTop - _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameSpeed)\n           // this is a nasty trick that i can explain, event if i want it \n           // when player is screaming sound level goes up\n           // and when the player stop doing that, soundlevel variable start decreasing\n           // and in the process of decreasing somewhere sound Level gonna be between 200 and 600 \n           // and because of that, when ball goes high after player scream, ball goes down a little\n           // so i set lock to true \n           // and in the first if statement i check for lock property in states object \n           // if lock was true i won't let the ball goes down\n           _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].lock = true \n           setTimeout(() => {\n            _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].lock = false \n           }, 2000)\n\n        }\n        \n        moveHedges()\n        updateScore()\n        requestAnimationFrame(updateScreen)\n    }\n}\n\nconst moveHedges = () => {\n    if (_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameInPlay) {\n        const hedges = document.getElementsByClassName('hedge')\n        for (let hedge of hedges) {\n            let hedgeLeft = Math.round(hedge.getBoundingClientRect().left)\n            hedgeLeft -= _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameSpeed\n            if (hedgeLeft <= -50) {\n                _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].container.removeChild(hedge)\n            }\n            hedge.style.left = hedgeLeft + 'px'\n            if (Object(_funcs__WEBPACK_IMPORTED_MODULE_4__[\"RectCircleColliding\"])(_domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].character.getBoundingClientRect(), hedge.getBoundingClientRect())) {\n                gameOver()\n            }\n        }\n    }\n}\nconst updateScore = () => {\n    const distances = []\n    const hedges = document.getElementsByClassName('hedge')\n\n    for (let hedge of hedges) {\n        const hedgeDistanceFromLeft = hedge.offsetLeft + hedge.getBoundingClientRect().width\n        const characterDistanceFromLeft = _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].character.offsetLeft\n        const distance = hedgeDistanceFromLeft - characterDistanceFromLeft\n        if (distance >= -3) distances.push(hedge)\n    }\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].score.innerHTML = _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].playerScore\n}\n\nconst reStart = () => {\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].playerScore = 0\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameInPlay = false \n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver = false\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.style.display = 'none'  \n    clearInterval(intervalId)\n    // clear screen\n    const hedges = document.getElementsByClassName('hedge')\n    while(hedges.length){\n    for (let hedge of hedges)\n        _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].container.removeChild(hedge)    \n    }\n    startGame()\n}\n\nconst gameOver = () => {\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameOver = true\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gameInPlay = false\n    \n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sensitivity.style.display = \"flex\"\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].soundLevelHint.style.display = 'block'\n\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.innerHTML = \"<p class='start-game-text'>Game Over</p>\"\n    const restart = document.createElement('button')\n    restart.setAttribute('class', 'restart')\n    restart.addEventListener('click', reStart)\n    restart.innerText = 'Try Again'\n    const score = document.createElement('p')\n    score.innerText = 'You Score is: ' + _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].playerScore\n\n    const rateEl = document.createElement('p')\n    const rateText = Object(_funcs__WEBPACK_IMPORTED_MODULE_4__[\"scoreRating\"])(_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].playerScore)\n\n    rateEl.innerText = rateText\n\n\n    \n\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.appendChild(restart)\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.appendChild(score)\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.appendChild(rateEl)\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].startGame.style.display = 'flex'\n}\n\nsetInterval(() => {\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].soundLevelNum.innerText = soundLevel\n    let className = 'sound-level-number '\n    if(soundLevel > 200 && soundLevel < 600)\n        className += \"color-yellow\"\n    else if(soundLevel > 600)\n        className += \"color-green\"\n    else \n        className += 'color-gray'\n    _domNodes__WEBPACK_IMPORTED_MODULE_2__[\"default\"].soundLevelNum.setAttribute('class', className)\n}, 30)\nsetInterval(() => {\n    _state__WEBPACK_IMPORTED_MODULE_1__[\"default\"].playerScore++\n}, 30)\n\n\n\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/audio/index.js":
/*!****************************!*\
  !*** ./src/audio/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Courtesy www/0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk\nconst getMicSoundLevel = (cb) => {\n    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia\n    if (navigator.getUserMedia) {\n        navigator.getUserMedia(\n        {\n                audio: true,\n            },\n            function (stream) {\n                audioContext = new AudioContext()\n                analyser = audioContext.createAnalyser()\n                microphone = audioContext.createMediaStreamSource(stream)\n                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)\n\n                analyser.smoothingTimeConstant = 0.8\n                analyser.fftSize = 1024\n\n                microphone.connect(analyser)\n                analyser.connect(javascriptNode)\n                javascriptNode.connect(audioContext.destination)\n\n                javascriptNode.onaudioprocess = () => {\n                    let array = new Uint8Array(analyser.frequencyBinCount)\n                    analyser.getByteFrequencyData(array)\n                    let values = 0\n\n                    let length = array.length\n                    for (let i = 0; i < length; i++) {\n                        values += array[i]\n                    }\n                    if (typeof cb === 'function') cb(values)\n                }\n            },\n            function (err) {\n                console.log('The following error occured: ' + err.name)\n            }\n        )\n    } else {\n        console.log('getUserMedia not supported')\n    }\n}\n\ngetMicSoundLevel()\nmodule.exports = getMicSoundLevel\n\n\n//# sourceURL=webpack:///./src/audio/index.js?");

/***/ }),

/***/ "./src/domNodes/index.js":
/*!*******************************!*\
  !*** ./src/domNodes/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nconst nodes = {\n    container: document.querySelector('.container'),\n    character: document.querySelector('.character'),\n    score: document.querySelector('.score'),\n    startGame: document.querySelector('.start-game'),\n    soundLevelNum: document.querySelector('.sound-level-number'),\n    inputSlider: document.querySelector('.slider'),\n    soundLevelHint: document.querySelector('.sound-level-hint'),\n    sensitivity: document.querySelector('.sensitivity')\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (nodes);\n\n\n//# sourceURL=webpack:///./src/domNodes/index.js?");

/***/ }),

/***/ "./src/funcs/index.js":
/*!****************************!*\
  !*** ./src/funcs/index.js ***!
  \****************************/
/*! exports provided: RectCircleColliding, setBallPosition, scoreRating, getTrue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RectCircleColliding\", function() { return RectCircleColliding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBallPosition\", function() { return setBallPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scoreRating\", function() { return scoreRating; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTrue\", function() { return getTrue; });\n/* harmony import */ var _domNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domNodes */ \"./src/domNodes/index.js\");\n \n\n// return true if the rectangle and circle are colliding\nconst RectCircleColliding = (circle, rect) => {\n    \n    circle.r = 40\n    var distX = Math.round(Math.abs(circle.x - rect.x + 18 - rect.width / 2))\n    var distY = Math.round(Math.abs(circle.y - (rect.y != 0 ? rect.y -10 : rect.y  - 50) - rect.height / 2))\n\n    if (distX > rect.width / 2 + circle.r) {\n        return false\n    }\n    if (distY > rect.height / 2 + circle.r) {\n        return false\n    }\n\n    if (distX <= rect.width / 2) {\n        return true\n    }\n    if (distY <= rect.height / 2) {\n        return true\n    }\n\n    var dx = distX - rect.width / 2\n    var dy = distY - rect.height / 2\n    return dx * dx + dy * dy <= circle.r * circle.r\n}\n\nconst setBallPosition = (position) => {\n    _domNodes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].character.style.top = position + 'px'\n    return position \n}\n\nconst scoreRating = (score) => {\n    if(score < 600)\n        return \"that's not good, would you like to try again?\"\n    else if(score > 600 && score < 1200)\n        return \"this is something! but i belive you can do better\"\n    else if(score > 1200 && score < 2500)\n        return \"this is a good record. well done :)\"\n    else if(score > 2500 && score < 5000)\n        return \"impressive record\"\n    else if (score > 5000 && score < 1000)\n        return \"the way you play is impeccable\"\n    else if (score >  3500)\n        return \"you are phenomenal\"\n}\n\nconst getTrue = () =>{\n    return true \n}\n\n//# sourceURL=webpack:///./src/funcs/index.js?");

/***/ }),

/***/ "./src/hedges/index.js":
/*!*****************************!*\
  !*** ./src/hedges/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domNodes */ \"./src/domNodes/index.js\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state */ \"./src/state/index.js\");\n\n\nconst createHedges = () => {\n    const hedgeTop = document.createElement('div')\n    const hedgeBottom = document.createElement('div')\n\n    hedgeTop.setAttribute('class', 'hedge')\n    hedgeBottom.setAttribute('class', 'hedge')\n\n    hedgeBottom.style.bottom = 0\n\n    let containerHeight = _domNodes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].container.getBoundingClientRect().height\n    containerHeight = Math.round(containerHeight)\n\n    const passageHeight = 200\n\n    let topHedgeheight = Math.random() * (containerHeight * 0.4) + 70\n    topHedgeheight = Math.round(topHedgeheight)\n    hedgeTop.style.height = topHedgeheight + 'px'\n    hedgeTop.style.transform = 'rotate(180deg)'\n\n    let bottomHedgeHeight = containerHeight - (passageHeight + topHedgeheight)\n    hedgeBottom.style.height = bottomHedgeHeight + 'px'\n\n    _domNodes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].container.appendChild(hedgeTop)\n    _domNodes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].container.appendChild(hedgeBottom)\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (createHedges);\n\n\n//# sourceURL=webpack:///./src/hedges/index.js?");

/***/ }),

/***/ "./src/state/index.js":
/*!****************************!*\
  !*** ./src/state/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// contain the current state of the game\nconst states = {\n    playerScore: 0,\n    gameSpeed:3,\n    gameInPlay: false,\n    gameOver: false,\n    sensitivity: 0.05,\n    lock: false,\n    lockDown: true,\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (states);\n\n\n//# sourceURL=webpack:///./src/state/index.js?");

/***/ })

/******/ });