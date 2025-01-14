import { parser } from '../src/parser'; // Adjust the path as per your project structure
import { tokenizer } from '../src/tokenizer'; // Adjust the path as per your project structure

describe('parser(tokenizer()) Tests', () => {
    test('Valid JSON: Array with numbers', () => {
        const json = `{"anArray": [1,1,2]}`;
        const tokens = tokenizer(json);
        const result = parser(tokens);
        expect(result).toEqual({
            type: 'Object',
            value: {
                anArray: {
                    type: 'Array', value: [{
                        "type": "Number",
                        "value": 1,
                    },
                    {
                        "type": "Number",
                        "value": 1,
                    },
                    {
                        "type": "Number",
                        "value": 2,
                    }]
                }
            }
        });
    });

      test('Valid JSON: Nested object', () => {
        const json = `{"obj": {"key": "value"}}`;
        const tokens = tokenizer(json);
        const result = parser(tokens);
        expect(result).toEqual({
          type: 'Object',
          value: {
            obj: {
              type: 'Object',
              value: {
                key: { type: 'String', value: 'value' }
              }
            }
          }
        });
      });

      test('Invalid JSON: Missing value', () => {
        const json = `{"obj": {"debefe": }}`;
        const tokens = tokenizer(json);
        expect(() => parser(tokens)).toThrow(Error);
      });

      test('Invalid JSON: Missing colon', () => {
        const json = `{"key" "value"}`;
        const tokens = tokenizer(json);
        expect(() => parser(tokens)).toThrow(Error);
      });

      test('Valid JSON: Empty object', () => {
        const json = `{}`;
        const tokens = tokenizer(json);
        const result = parser(tokens);
        expect(result).toEqual({
          type: 'Object',
          value: {}
        });
      });

      test('Valid JSON: Empty array', () => {
        const json = `{"anArray": []}`;
        const tokens = tokenizer(json);
        const result = parser(tokens);
        expect(result).toEqual({
          type: 'Object',
          value: {
            anArray: { type: 'Array', value: [] }
          }
        });
      });

      test('Valid JSON: Mixed data types', () => {
        const json = `{"number": 42, "boolean": true, "string": "hello"}`;
        const tokens = tokenizer(json);
        const result = parser(tokens);
        expect(result).toEqual({
          type: 'Object',
          value: {
            number: { type: 'Number', value: 42 },
            boolean: { type: 'Boolean', value: true },
            string: { type: 'String', value: 'hello' }
          }
        });
      });

      test('Invalid JSON: Incomplete input', () => {
        const json = `{"key": "value"`;
        const tokens = tokenizer(json);
        expect(() => parser(tokens)).toThrow(TypeError);
      });
});
