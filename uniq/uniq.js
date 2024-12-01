const fs = require('fs');
const path = require('path');

const arguments = {
    '-c': 'count',
    '-count': 'count',
    '-d': 'repeated',
    '-repeated': 'repeated',
    '-i': 'ignore',
    '-ignore-case': 'ignore',
    '-f': 'skip-field',
    '-skip-field=N': 'skip-field',
    '-s': 'skip-char',
    '-skin-char=N': 'skip-char',
    '-u': 'unique',
    '-unique': 'unique'
}

const args = process.argv.slice(2);

const inputFile = args.pop();

const inputArgs = args.map((arg) => arguments[arg]);

const data = fs.readFileSync(path.join(__dirname, inputFile), 'utf8');

let newData = new Array(...new Set(data.split('\n').map((str) => str !== '' ? str : undefined).filter(Boolean)));

// count the number of repeated lines

const countMap = new Map();

data.split('\n').map((str) => {
    if (!countMap.get(str)) {
        countMap.set(str, 0);
    }
    if (str == '') {
        countMap.set(str, 1);
        return
    }
    let countOfStr = Number(countMap.get(str));
    countMap.set(str, countOfStr + 1);
})

if (inputArgs.includes('count')) {
    newData = newData.map((data) => {
        countMap.set(countMap.get(data) + ' ' + data, countMap.get(data))
        return countMap.get(data) + ' ' + data
    })
}

// prints all duplicates lines

if (inputArgs.includes('repeated')) {
    newData = newData.map((data) => {
        return countMap.get(data) > 1 ? data : undefined;
    }).filter(Boolean)
}

// print all unique lines

if (inputArgs.includes('unique')) { 
    newData = newData.map((data) => {
        return countMap.get(data) === 1 ? data : undefined;
    }).filter(Boolean)
}

const outputData = String(newData.join('\n'))

console.log(outputData)

fs.writeFileSync(path.join(__dirname, 'output.txt'), outputData)