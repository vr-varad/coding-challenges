import { tokenizer } from "./tokenizer";
import { parser } from "./parser";

console.log(parser(tokenizer(`{"anArray": [1,1,2]}`)))