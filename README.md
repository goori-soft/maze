# Maze solver

This is a simple application to solve a 2D text based maze.

## About the maze

The maze is a 2D matrix based in a text file structure. Each line of text represents a row in the maze. Each letter in a line represents a column.

Each position in the matrix can be a valid path, a wall, an entrance, or an exit. It depends of the letter in each position. For the purpose of this exercise, the application is not case sensetive. It means that `a` and `A` will be interpreted in the same way.

This is an exemple of a valid maze:

```txt
ABCAAAAAAAAAAAAAA
ACAAAAAAAAAAAAAAA
ACAAEEEAAAAAAAAAA
ACDDDACCCDDAAAAAA
ACAAAAAAAADAAAAAA
ADBCCDEECCBAAAAAA
AAAAAAADAACAAAAAA
AAAAAAADAACCDDDEB
BEEDDDCCAAAAAAAAA
AAAAAAACAAAAAAAAA
```

> Note: the meaning of each letter is defined by the app's input options

## How to use

Import the module:

```ts
import * as maze from "@/maze";
```

Solve a maze passing the maze file and options parameters:

```ts
const filePath = "./files";
const options = {
  entryChars: "BX", // default is 'B'
  exitChars: "A", // default is 'B'
  invalidPathChars: "", // default is 'A'
  breakingChars: "CVZ", // default is 'B'
  consecutivePathCharsRequired: 3, // default is 3
  orthogonalOnly: true, // default is true
};
const mazePaths = maze.findPaths(filePath, options);
```

The method `findPaths` returns an array of valid paths to solve the maze. Each path contains a set of points sorted by the right order starting with a valid entry and ending with a valid exit.
