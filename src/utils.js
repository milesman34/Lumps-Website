import { current } from "@reduxjs/toolkit";

// Capitalizes a string
const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

// Returns a pluralized statement based on a number and the string
const pluralized = (number, string) => `${number} ${Math.abs(number) === 1 ? string : string + "s"}`;

// Returns if a number is even
const isEven = num => num % 2 === 0;

// Randint between a and b
const randint = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// Calculates the current score based on a set of dice
const calculateScore = dice => {
    // Sorts the dice first
    const sorted = [...dice].map(die => die.value).sort((a, b) => (a - b));

    // Running score
    let score = 0;

    // Are all dice the same in terms of evenness/oddness
    let areAllEvenOrOdd = true;

    // Tracks previous die
    let previous = sorted[0];

    // Is the current die even?
    let isDieEven = isEven(previous)

    // Length of the current run
    let runLength = 1;

    // Length of the current group of the same number
    let groupLength = 1;

    // Now we iterate over the rest of the die
    sorted.slice(1).forEach(die => {
        // Check if the current die matches the previous die in evenness/oddness
        if (isEven(die) !== isDieEven)
            areAllEvenOrOdd = false;

        // Look for pairs/groups of numbers
        if (previous === die) {
            score += die;
            groupLength++;

            // 10 point bonus for groups of 6-8
            if (groupLength >= 6)
                score += 10;
        } else {
            // Reset running group length
            groupLength = 1;

            // Checks for runs
            if (die === previous + 1) {
                runLength++;

                // 10 point bonus for runs of 6-8
                if (runLength >= 6)
                    score += 10;
            } else {
                // Resets run length
                runLength = 1;
            }
        }

        // Sets the previous die
        previous = die;
    });

    // 6 point bonus for all dice even/odd
    if (areAllEvenOrOdd)
        score += 6

    return score;
}

// Rolls a die to generate a random value based on its sides
const rollDie = die => ({
    ...die,
    value: randint(1, die.sides)
});

// Returns the number of unlocked dice
const numUnlockedDice = dice => dice.filter(die => !die.isLocked).length;

// Returns how many dice the player must keep
const numDiceMustKeep = (dice, rolls, cleanSlateUses) => {
    // Number of unlocked dice
    const numUnlocked = numUnlockedDice(dice);

    switch (rolls) {
        case 0:
            return numUnlocked;

        case 1:
            if (cleanSlateUses === 0) {
                return numUnlocked >= 2 ? 2 : numUnlocked;
            } else {
                return 6;
            }

        case 2:
            return 4;
    }
}

// Returns the number of dice that will be locked
const numDiceWillBeLocked = dice => dice.filter(die => die.willBeLocked).length;

// Returns how many more dice the player must keep
const numMoreDiceToKeep = (dice, rolls, cleanSlateUses) => numDiceMustKeep(dice, rolls, cleanSlateUses) - numDiceWillBeLocked(dice);

// Can the player roll the dice?
const canRollDice = (dice, rolls, cleanSlateUses) => numDiceWillBeLocked(dice) >= numDiceMustKeep(dice, rolls, cleanSlateUses);

// Is the current player's turn over?
const isTurnOver = (dice, rolls) => numUnlockedDice(dice) <= 2 || rolls === 0;

// Will the current player's turn be over after this roll?
const willTurnBeOver = dice => dice.filter(die => !(die.isLocked || die.willBeLocked)).length <= 2;

// Returns the index of the player who won (this solution guarantees that the first person to get this score is the winner)
const getWinningPlayer = scores => scores
    .map((element, index) => [element, index])
    .reduce((a, b) => b[0] > a[0] ? b : a, [-1, -1])[1];

// Returns a string for the label of a checkbox
const checkboxLabel = enabled => enabled ? "Enabled" : "Disabled";

// Gets a local storage item, setting it with a default if it doesn't exist
const localStorageGetOrDefault = (path, defaultValue) => {
    const result = localStorage.getItem(path);

    // If it doesn't exist then add it to localStorage
    if (result === null || result === undefined || result === "undefined") {
        localStorage.setItem(path, JSON.stringify(defaultValue));
        return defaultValue;
    } else {
        return JSON.parse(result);
    }
}

// Returns if an array has duplicates
const hasDuplicates = array => new Set(array).size !== array.length;

// Finds the first duplicate in an array
const findDuplicate = array => {
    const arrayElements = new Set();

    for (let elem of array) {
        if (arrayElements.has(elem))
            return elem;
        else
            arrayElements.add(elem);
    };
}

// Check if a name is a reserved name (Player x)
const isReservedName = (name, numPlayers) => {
    const words = name.split(" ");

    // Check the first word to see if it is Player, and check the length of the words after that
    if (words.length !== 2 || words[0] !== "Player")
        return false;

    // Check the value of the second word
    const wordValue = parseInt(words[1]);

    // We need to check if it is an integer between 1 and the number of players
    return !(isNaN(wordValue) || words[1].includes(".") || wordValue <= 0 || wordValue > numPlayers);
}

export {
    calculateScore,
    canRollDice,
    capitalize,
    checkboxLabel,
    findDuplicate,
    getWinningPlayer,
    hasDuplicates,
    isEven,
    isReservedName,
    isTurnOver,
    localStorageGetOrDefault,
    numMoreDiceToKeep,
    numDiceMustKeep,
    numDiceWillBeLocked,
    numUnlockedDice,
    pluralized,
    randint,
    rollDie,
    willTurnBeOver
}