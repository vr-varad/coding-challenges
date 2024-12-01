# Text Processing Tool

This is a command-line tool to process text files with various options for skipping lines, skipping characters, counting duplicates, and printing unique or repeated lines. The output is saved as `output.txt` on your Desktop.

---

## **Usage**

```bash
node tool.js [options] <input-file>
```

### **Options**

| Option               | Alias   | Description                                            | Example Usage                           |
|----------------------|---------|--------------------------------------------------------|-----------------------------------------|
| `-c`                | `-count`| Count the number of repeated lines.                   | `node tool.js -c input.txt`             |
| `-d`                | `-repeated` | Print all duplicate lines.                        | `node tool.js -d input.txt`             |
| `-u`                | `-unique`   | Print all unique lines.                           | `node tool.js -u input.txt`             |            |
| `-f <number>`       | `-skip-field <number>` | Skip the first N fields (lines).        | `node tool.js -f 3 input.txt`           |
| `-s <number>`       | `-skip-char <number>`  | Skip the first N characters of each line.| `node tool.js -s 5 input.txt`           |

---

## **Examples**

1. **Count Repeated Lines**
   ```bash
   node tool.js -c input.txt
   ```
   **Output:** Counts the occurrences of each line and outputs them.

2. **Print Repeated Lines**
   ```bash
   node tool.js -d input.txt
   ```
   **Output:** Prints only the lines that are repeated in the file.

3. **Print Unique Lines**
   ```bash
   node tool.js -u input.txt
   ```
   **Output:** Prints only the lines that appear exactly once.

4. **Skip First N Fields (Lines)**
   ```bash
   node tool.js -f 3 input.txt
   ```
   **Output:** Skips the first 3 lines of the file.

5. **Skip First N Characters of Each Line**
   ```bash
   node tool.js -s 5 input.txt
   ```
   **Output:** Removes the first 5 characters from each line.

6. **Combination Example**
   ```bash
   node tool.js -f 2 -s 4 -u input.txt
   ```
   **Output:** Skips the first 2 lines, removes the first 4 characters of the remaining lines, and prints the unique lines.

---

## **Error Handling**

- If no input file is provided:
  ```bash
  No Input File Selected
  ```
- If a required option (e.g., `-f`, `-s`) is missing its value:
  ```bash
  No Option for <specific-option>
  ```

---

## **Output**

The processed output is saved as `output.txt` in your Desktop directory.

---