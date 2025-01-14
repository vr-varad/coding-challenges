import { ASTNode, Token } from "./types"

export const parser = (tokens: Token[]): ASTNode => {
    if (!tokens.length) {
        throw new Error("Nothing to Parse")
    }
    let index = 0;
    function increment() {
        return tokens[++index]
    }

    function parseValue(): ASTNode {
        const token = tokens[index];
        switch (token.type) {
            case "String":
                return { type: "String", value: token.value }
            case "Number":
                return { type: "Number", value: Number(token.value) }
            case "True":
                return { type: "Boolean", value: true }
            case "False":
                return { type: "Boolean", value: false }
            case "Null":
                return { type: "Null" }
            case "BracesOpen":
                return parseObject()
            case "BracketOpen":
                return parseArray()
            default:
                throw new Error(`Unexpected token type: ${token.type}`);
        }
    }

    function parseObject(): ASTNode {
        const astNode: ASTNode = { type: "Object", value: {} }
        let token = increment();
        while (token.type != "BracesClose") {
            if (token.type === "String") {
                const key = token.value;
                token = increment();
                if (token.type !== "Colon") throw new Error("Expected : in key-value pair");
                token = increment();
                const value = parseValue();
                astNode.value[key] = value
                token = increment()
            } else {
                throw new Error(`Expected String key in object. Token type: ${token.type}`);
            }
            if (token.type == "Comma") token = increment()
        }
        return astNode
    }

    function parseArray(): ASTNode {
        const astNode: ASTNode = { type: "Array", value: [] }
        let token = increment()
        while (token.type !== "BracketClose") {
            if (token.type !== "Comma") {
                const value = parseValue();
                token = increment();
                astNode.value.push(value)
            } else if (token.type === "Comma") {
                token = increment();
                continue
            }
            else {
                throw new Error(`Expected String key in object. Token type: ${token.type}`);
            }
        }
        return astNode
    }

    const AST = parseValue();

    return AST
}