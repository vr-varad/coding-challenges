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
    '-skip-field': 'skip-field',
    '-s': 'skip-char',
    '-skip-char': 'skip-char',
    '-u': 'unique',
    '-unique': 'unique'
}

const args = process.argv.slice(2);

const inputFile = args.pop();

if(arguments[inputFile]){
    console.log('No Input File Selected')
    process.exit(1)
}

const inputArgs = args.map((arg, index) => {
    switch(arg){
        case '-f':
        case '-skip-field':
        case '-s':
        case '-skip-char':
            if(!Number(args[index+1])){
                console.log(`No Option for ${arguments[arg]}`)
                process.exit(1)
            }
            return arguments[arg]+'='+args[index+1]
    }
    return arguments[arg]
}).filter(Boolean);

let data = fs.readFileSync(path.resolve(inputFile), 'utf8');

let newData;

// skipping first N fields

if(inputArgs.filter((args)=>String(args).startsWith('skip-field')).length > 0){
    const options = inputArgs.filter((args)=>String(args).startsWith('skip-field'))[0].split('=')[1]
    data = data.split('\n').splice(options).join('\n')
}

// skipping first N characters

if(inputArgs.filter((args)=>String(args).startsWith('skip-char')).length > 0){
    const options = inputArgs.filter((args)=>String(args).startsWith('skip-char'))[0].split('=')[1]
    data = data.split('\n').map((str)=>str.slice(options)).filter(Boolean).join('\n')
}

// count the number of repeated lines

newData = new Array(...new Set(data.split('\n').map((str) => str !== '' ? str : undefined).filter(Boolean)));

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

const homeDir = require('os').homedir();
const desktop =path.join(homeDir, 'Desktop'); 

fs.writeFileSync(path.join(desktop, 'output.txt'), outputData)