#! /usr/bin/env node
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import inquirer from 'inquirer';
import chalk from "chalk";
const Font = require('ascii-art-font-updated');
const msg = await Font.create('Guessing Game', 'THIS', false);
console.log(chalk.red(msg));
console.log(chalk.bgWhite.black('I will think of number between 1 and 100\nYou will get 5 chances to guess that number\nLet\'s go...'));
let score = 100;
let rounds = 5;
let round = 1;
let prevError = 0;
let guessed = false;
while (1) {
    let toGuess = Math.floor(Math.random() * 100 + 1);
    for (; round <= rounds; round++) {
        let currError;
        let ans = await inquirer.prompt([{
                name: 'nGuess',
                message: 'Guess my number (hint: my number is between 1 and 100)',
                type: 'number'
            }]);
        let nGuess = Number(ans.nGuess);
        if (nGuess > toGuess) {
            console.log('Aim a little lower');
            currError = nGuess - toGuess;
        }
        else if (nGuess < toGuess) {
            console.log('Go up a bit');
            currError = toGuess - nGuess;
        }
        else {
            guessed = true;
            break;
        }
        if (prevError > currError)
            score += prevError - currError;
        else
            score -= currError - prevError;
        prevError = currError;
    }
    if (guessed) {
        console.log('Wow you must be a wizard or something\nYou guessed correctly');
    }
    else {
        console.log('I know the number was difficult to guess.');
    }
    console.log(chalk.blueBright(`Your score for this run is: ${score}`));
    let whatNext;
    whatNext = await inquirer.prompt([
        {
            name: 'cont',
            type: 'list',
            message: 'Do you want to try again?',
            choices: ['Yes', 'No']
        }
    ]);
    if (whatNext.cont === 'No')
        break;
}
