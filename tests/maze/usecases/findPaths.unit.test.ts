import { 
  findPaths, 
  MazePath 
} from '@/maze'

describe('Find paths use case', ()=>{
  it('Should return an array of valid paths', ()=>{
    const mazeFile = './tests/maze-files/maze-example-1.txt'
    const options = {}
  
    const mazePaths = findPaths(mazeFile, options)

    expect(mazePaths).toBeInstanceOf(Array)
    expect(mazePaths.length).toBe(1)
    expect(mazePaths[0]).toBeInstanceOf(MazePath)

    const mazePathPoints = mazePaths[0].getPoints()

    expect(mazePathPoints).toMatchObject([
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 1, y: 5},
      {x: 1, y: 6},
      {x: 1, y: 7},
      {x: 1, y: 8},
      {x: 1, y: 9},
      {x: 1, y: 10},
    ])
  })
})