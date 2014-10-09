#! /usr/bin/env node
var commander = require('commander');
var inquirer = require('inquirer');
var check = require('./check');
var pkg = require('./package.json');

function main () {
  commander
  .version(pkg.version)
  .option('-o, --output', 'call the output')
  .option('-i, --input', 'call the input')

  commander.parse(process.argv);

  if (commander.output) {
    return console.log("you call the output");
  }
  if (commander.input) {
    var food = ['apple', 'pair', 'mango'];
    var questions = [
      {
        name: "name",
        message: "input your name",
        type: "input"
      },
      {
        name: "food",
        message: "choose the food you like",
        type: "checkbox",
        choices: food
      }
    ];
    return inquirer.prompt(questions, function (options) {
      console.log(options.name + " likes " + options.food);
    });
  }
  return commander.help();
};

check(main);
