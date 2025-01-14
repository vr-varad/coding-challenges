export type TokenType =
  "BracesOpen" |
  "BracesClose" |
  "String" |
  "Number" |
  "Comma" |
  "Colon" |
  "BracketOpen" |
  "BracketClose" |
  "Boolean" |
  "Null" |
  "True" |
  "False";

export type ASTNode =
  { type: "Object"; value: { [key: string]: ASTNode } } |
  { type: "Array"; value: ASTNode[] } |
  { type: "String"; value: string } |
  { type: "Number"; value: Number } |
  { type: "Boolean"; value: Boolean } |
  { type: "Null" }

export type Token = {
  type: TokenType;
  value: string;
};