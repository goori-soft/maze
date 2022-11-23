import { Maze, MazePath, MazeSquare } from "@/maze"

describe("Maze entity", ()=>{
  it('Should create a new Maze', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    
    const maze = new Maze(mazeFile)

    expect(maze.width()).toBe(32)
    expect(maze.height()).toBe(11)
    expect(maze.totalSquares()).toBe(32 * 11)
    expect(maze.toArray()).toStrictEqual([
      ["A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "C", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "C", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "C", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "D", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "D", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "D", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "E", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "E", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "E", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
      ["A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A"]
    ])
    expect(maze.getChar(1,1)).toBe("C")
  })

  it('Should return the entries and exits', ()=>{
    const options = {
      entryChars: 'b',
      exitChars: 'b'
    }
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)

    const entries = maze.getEntries()
    const exits = maze.getExits()

    expect(entries).toBeInstanceOf(Array)
    expect(entries.length).toBe(2)
    expect(entries[0]).toBeInstanceOf(MazeSquare)
    expect(entries[0].getPoint()).toMatchObject({x: 1, y: 0})
    expect(entries[1].getPoint()).toMatchObject({x: 1, y: 10})
    expect(entries).toBeInstanceOf(Array)
    expect(entries.length).toBe(2)
    expect(entries[0]).toBeInstanceOf(MazeSquare)
    expect(entries[0].getPoint()).toMatchObject({x: 1, y: 0})
    expect(entries[1].getPoint()).toMatchObject({x: 1, y: 10})
  })

  it('Should find a valid path', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)

    const mazePaths = maze.findPaths()

    expect(mazePaths).toBeInstanceOf(Array)
    expect(mazePaths.length).toBe(1)
    expect(mazePaths[0]).toBeInstanceOf(MazePath)
    expect(mazePaths[0].size()).toBe(11)
  })

  it('Should find diferent paths for diferent configurations', ()=>{
    const mazeFile = './tests/maze-files/maze-example-3.txt'
    const maze = new Maze(mazeFile, {exitChars: 'F'})

    const mazePaths1 = maze.findPaths({ consecutivePathCharsRequired: 3}) 
    const mazePaths2 = maze.findPaths({ consecutivePathCharsRequired: 0})

    expect(mazePaths1.length).toBe(1)
    expect(mazePaths2.length).toBe(2)
  })
})