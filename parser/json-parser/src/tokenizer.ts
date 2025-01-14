import { Token } from './types'
import { isBooleanFalse, isBooleanTrue, isNull, isNumber } from './utils';


export const tokenizer = (input: string): Token[] => {
    const tokens: Token[] = [];

    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        switch (char) {
            case '{':
                tokens.push({
                    type: "BracesOpen",
                    value: "{"
                })
                break;
            case '}':
                tokens.push({
                    type: "BracesClose",
                    value: "}"
                })
                break;
            case '[':
                tokens.push({
                    type: "BracketOpen",
                    value: "["
                })
                break;
            case ']':
                tokens.push({
                    type: "BracketClose",
                    value: "]"
                })
                break;
            case ':':
                tokens.push({
                    type: "Colon",
                    value: ":"
                })
                break;
            case ',':
                tokens.push({
                    type: "Comma",
                    value: ","
                })
                break;
            case '"':
                let value: string = "";
                char = input[++i]
                while (char != '"') {
                    value += char
                    char = input[++i];
                }
                tokens.push({
                    type: "String",
                    value: value
                })
                break
            default:
                if (/[\d\w]/.test(char) && !(/\s/.test(char))) {
                    let value = "";
                    while (/[\d\w]/.test(char)) {
                        value += char;
                        char = input[++i]
                    }
                    i--;
                    if (isNumber(value)) {
                        tokens.push({
                            type: "Number",
                            value
                        })
                    } else if (isBooleanTrue(value)) {
                        tokens.push({
                            type: "True",
                            value
                        })
                    } else if (isBooleanFalse(value)) {
                        tokens.push({
                            type: "False",
                            value
                        })
                    } else if (isNull(value)) {
                        tokens.push({
                            type: "Null",
                            value
                        })
                    } else {
                        throw new Error("Unexpected value: " + value);
                    }
                } else if ((/\s/.test(char))) {
                    continue;
                } else {
                    throw new Error("Unexpected character: " + char);
                }
        }
    }
    return tokens
}