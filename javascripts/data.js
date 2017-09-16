"use strict";

const printToDom = require('./dom');
const loadGifs = require('./gifs');
const loadCategories = require('./categories');

let gifArray = [];

const errorFunction = () => {
	console.log("You broke everything. Thanks.");
};

//When Gif Loads
const whenGifsLoad = function(){
	gifArray = JSON.parse(this.responseText).gifs;
	//load categories
	loadCategories(whenCategoriesLoad, errorFunction);
};

const whenCategoriesLoad = function (){
	let categoryArray = JSON.parse(this.responseText).categories;
	combineArrays(categoryArray);
};

const combineArrays = (categories) => {
	categories.forEach((category) => {
		gifArray.forEach((gif) => {
			if (gif.category === category.id) {
				gif.categoryName = category.name;
				gif.categoryDataName = category.dataName;
			}
		});
	});
	console.log(gifArray);
	//TO DO: call the print to dom
	printToDom(gifArray);
};

//TO DO: set up 'initializer' -load gifs

const initializer = () => {
	loadGifs(whenGifsLoad, errorFunction);
};

module.exports = initializer;