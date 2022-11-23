import { MazePathSet, MazePath, Maze } from "@/maze"

describe('Maze path set entity', ()=>{
  it('Should create a valid path set', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazePath1 = new MazePath(maze)
    mazePath1.addPoint(1, 0)
    mazePath1.addPoint(2, 0)
    const mazePath2 = new MazePath(maze)
    mazePath1.addPoint(4, 2)

    const pathSet = new MazePathSet()
    pathSet.add(mazePath1)
    pathSet.add(mazePath2)

    expect(pathSet).toBeInstanceOf(MazePathSet)
    expect(pathSet.size()).toBe(2)
  })

  it('Should not add simillar path', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const maze = new Maze(mazeFile)
    const mazePath1 = new MazePath(maze)
    mazePath1.addPoint(1, 0)
    mazePath1.addPoint(2, 0)
    const mazePath2 = new MazePath(maze)
    mazePath2.addPoint(2, 0)
    mazePath2.addPoint(1, 0)

    const pathSet = new MazePathSet()
    pathSet.add(mazePath1)
    pathSet.add(mazePath2)

    expect(pathSet).toBeInstanceOf(MazePathSet)
    expect(pathSet.size()).toBe(1)
  })
})