import { Maze, MazeSquare } from "@/maze"

describe('Maze square entity', ()=>{
  it('Should create a new maze square', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    
    const mazeSquare = new MazeSquare(maze, 0, 0)

    expect(mazeSquare.getPoint()).toMatchObject({x: 0, y: 0})
    expect(mazeSquare.getChar()).toBe('A')
  })

  it('Should return the next squares', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazeSquare = new MazeSquare(maze, 0, 0)

    const nextSquares = mazeSquare.getNext(false)
    const nextOthogonalSquares = mazeSquare.getNext(true)

    expect(nextSquares).toBeInstanceOf(Array)
    expect(nextSquares.length).toBe(3)
    expect(nextSquares[0].getPoint()).toMatchObject({x: 1, y: 0})
    expect(nextSquares[1].getPoint()).toMatchObject({x: 0, y: 1})
    expect(nextSquares[2].getPoint()).toMatchObject({x: 1, y: 1})
    expect(nextOthogonalSquares).toBeInstanceOf(Array)
    expect(nextOthogonalSquares.length).toBe(2)
    expect(nextOthogonalSquares[0].getPoint()).toMatchObject({x: 1, y: 0})
    expect(nextOthogonalSquares[1].getPoint()).toMatchObject({x: 0, y: 1})
  })
})