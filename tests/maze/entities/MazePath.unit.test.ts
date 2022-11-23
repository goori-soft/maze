import { MazePath, Maze, MazeSquare } from "@/maze"

describe('Maze path entity', ()=>{
  it('Should create a new maze path', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)

    const mazePath = new MazePath(maze)
    mazePath.addPoint(1, 0)
    mazePath.addPoint(2, 0)

    expect(mazePath).toBeInstanceOf(MazePath)
    expect(mazePath.getPoints()).toMatchObject([
      {x: 1, y: 0},
      {x: 2, y: 0}
    ])
    expect(mazePath.size()).toBe(2)
  })

  it('Should get the possible next steps', ()=>{
    const options = {
      entryChars: 'B',
      exitChars: 'B',
    }
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile, options)
    const mazePath = new MazePath(maze)
    mazePath.addPoint(1, 0)

    const possibleSteps = mazePath.getPossibleSteps()
    
    expect(possibleSteps).toBeInstanceOf(Array)
    expect(possibleSteps.length).toBe(1)
    expect(possibleSteps[0]).toBeInstanceOf(MazeSquare)
    expect(possibleSteps[0].getPoint()).toMatchObject({x: 1, y: 1})
  })

  it('Should create a reverse path', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)

    const mazePath = new MazePath(maze)
    mazePath.addPoint(1, 0)
    mazePath.addPoint(2, 0)
    const reverseMazePath = mazePath.reverse()

    expect(reverseMazePath).toBeInstanceOf(MazePath)
    expect(reverseMazePath.getPoints()).toMatchObject([
      {x: 2, y: 0},
      {x: 1, y: 0}
    ])
    expect(reverseMazePath.size()).toBe(2)
  })

  it('Should stringify', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazePath = new MazePath(maze)
    mazePath.addPoint(1, 0)
    mazePath.addPoint(2, 0)

    const mazePathString = mazePath.stringify()

    expect(mazePathString).toBe("[{\"x\":1,\"y\":0},{\"x\":2,\"y\":0}]")
  })

  it('Should create a path from a string', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazePathString = "[{\"x\":1,\"y\":0},{\"x\":2,\"y\":0}]"

    const mazePath = MazePath.fromString(maze, mazePathString)

    expect(mazePath).toBeInstanceOf(MazePath)
    expect(mazePath.getPoints()).toMatchObject([
      {x: 1, y: 0},
      {x: 2, y: 0}
    ])
    expect(mazePath.size()).toBe(2)
  })

  it('Should compare diferent paths', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazePath = new MazePath(maze)
    mazePath.addPoint(1, 0)
    mazePath.addPoint(2, 0)

    const altMaze1 = new MazePath(maze)
    altMaze1.addPoint(1, 0)
    altMaze1.addPoint(2, 0)

    const altMaze2 = new MazePath(maze)
    altMaze2.addPoint(2, 0)
    altMaze2.addPoint(1, 0)

    const altMaze3 = new MazePath(maze)
    altMaze3.addPoint(2, 0)

    expect(mazePath.isEqual(altMaze1)).toBe(true)
    expect(mazePath.isEqual(altMaze2)).toBe(true)
    expect(mazePath.isEqual(altMaze3)).toBe(false)
  })

  it('Should not allow invalid point insertion', ()=>{
    const mazeFile = './tests/maze-files/maze-example-2.txt'
    const maze = new Maze(mazeFile)

    const mazePath = new MazePath(maze)
    expect(()=> mazePath.addPoint(10, 10)).toThrow()
  })

  it('Should identify a closed path', ()=>{
    const mazeFile = './tests/maze-files/maze-example-2.txt'
    const maze = new Maze(mazeFile)

    const mazePath = new MazePath(maze)
    mazePath.addPoint(6, 0)

    expect(mazePath.isClosed()).toBe(false)
    mazePath.addPoint(6, 1)
    mazePath.addPoint(6, 2)
    mazePath.addPoint(6, 3)
    mazePath.addPoint(6, 4)
    
    expect(mazePath.isClosed()).toBe(true)
  })
})