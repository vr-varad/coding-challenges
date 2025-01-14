export const isNumber = (input: string): boolean => !isNaN(Number(input)) 
export const isBooleanTrue = (input: string) : boolean => input === "true"
export const isBooleanFalse = (input: string) : boolean => input === "false"
export const isNull = (input: string) : boolean => input === "null"