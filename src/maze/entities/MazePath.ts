import { Point } from '@/maze/types/Point';
import { stringify } from 'querystring';
import { MazePathOptions } from '../types';
import { Maze } from './Maze'
import { MazeSquare } from './MazeSquare';

export class MazePath{
  public mazeSquares: Set<MazeSquare> = new Set()
  private readonly consecutivePathCharsRequired: number
  private readonly orthogonalOnly: boolean
  private readonly breakingChars: string[]
  private readonly invalidPathChars: string[]

  constructor(private readonly maze: Maze, private readonly options: MazePathOptions = {}){
    this.consecutivePathCharsRequired = options.consecutivePathCharsRequired ?? 3
    this.orthogonalOnly = options.orthogonalOnly ?? true
    this.breakingChars = options.breakingChars?.toUpperCase().split('') ?? ['B']
    this.invalidPathChars = options.invalidPathChars?.toUpperCase().split('') ?? ['A']
  }

  addPoint(x: number, y: number): void{
    const mazeSquare = this.maze.getSquare(x, y)
    if(mazeSquare === undefined) throw new Error(`The point (x: ${x}, y: ${y}) is not a valis position in the maze`)
    this.mazeSquares.add(mazeSquare)
  }

  addSquare(mazeSquare: MazeSquare): void{
    this.mazeSquares.add(mazeSquare)
  }

  getPoints(): Point[]{
    const points = [...this.mazeSquares].map( mazeSquare => mazeSquare.getPoint() )
    return points
  }

  size(): number{
    return this.mazeSquares.size
  }

  isClosed(): boolean {
    const lastSquare = this.getLastSquare()
    if(lastSquare === undefined) return false
    return this.maze.getExitChars().includes(lastSquare.getChar())
  }

  getPossibleSteps(): MazeSquare[]{
    if(this.mazeSquares.size === 0) return []
    const consecutiveSquares = this.getLastConsecutiveSquares(this.consecutivePathCharsRequired)
    const lastSquare = consecutiveSquares[consecutiveSquares.length - 1]
    const lastChar = lastSquare.getChar()
    const validChars = [lastChar, ...this.breakingChars]
    let possibleSquares = lastSquare.getNext(this.orthogonalOnly)
    possibleSquares = possibleSquares.filter( mazeSquare => {
      const possibleChar = mazeSquare.getChar()
      if(this.mazeSquares.has(mazeSquare)) return false
      if(this.invalidPathChars.includes(possibleChar)) return false
      if(this.breakingChars.includes(lastChar)) return true
      if(this.maze.getExitChars().includes(possibleChar)) return true
      if(this.maze.getEntryChars().includes(lastChar)) return true
      if(consecutiveSquares.length < this.consecutivePathCharsRequired && !validChars.includes(possibleChar)) return false
      return true
    })
    return possibleSquares
  }

  clone(): MazePath{
    const mazePath = new MazePath(this.maze, {...this.options})
    const matrix = [...this.mazeSquares]
    mazePath.mazeSquares = new Set(matrix)
    return mazePath
  }

  reverse(): MazePath{
    const mazePath = new MazePath(this.maze, this.options)
    mazePath.mazeSquares = new Set([...this.mazeSquares].reverse())
    return mazePath
  }

  stringify(): string{
    const points = this.getPoints()
    const pointsString = JSON.stringify(points)
    return pointsString
  }

  isEqual(mazePath: MazePath): boolean{
    const thisString = this.stringify()
    if(mazePath.stringify() === thisString) return true
    const reverseMazePath = mazePath.reverse()
    if(reverseMazePath.stringify() === thisString) return true
    return false
  }

  private getLastSquare(): MazeSquare | undefined{
    if(this.mazeSquares.size <= 0) return undefined
    return [...this.mazeSquares][this.mazeSquares.size - 1]
  }

  hightlightChars(): void {
    const yellow = '\x1b[31m'
    const white = '\x1b[30m'
    const points = this.getPoints()

    const matrix = this.maze.toArray()
    matrix.map( (line, y) =>{
      line.map( (letter, x) => matrix[y][x] = white + letter)
    })

    points.map( point => {
      const letters = matrix[point.y][point.x].split('')
      const letter = letters[letters.length - 1]
      matrix[point.y][point.x] = yellow + letter
    })

    matrix.forEach( line => console.log(line.join(' ')))
  }

  hightlightBlocks(): void{
    const points = this.getPoints()
    const fullBlock = Buffer.from([0xE2, 0x96, 0x87]).toString('utf-8')
    const hBorder = '-'
    const vBorder = '|'
    const freeSpace = ' '
    const width = this.maze.width()
    const height = this.maze.height()
    const top = Array(width + 2).fill(hBorder)
    const lines: string[][] = Array(height).fill([])
    lines.forEach( (line, index) => {
      lines[index] = [vBorder, ...Array(width).fill(fullBlock), vBorder ]
    })
    points.map( point => {
      lines[point.y][point.x + 1] = freeSpace
    })
    lines.forEach( line => console.log(line.join('')))
  }

  private getLastConsecutiveSquares(consecutiveSquaresLimit: number): MazeSquare[]{
    if(this.mazeSquares.size < consecutiveSquaresLimit) consecutiveSquaresLimit = this.mazeSquares.size
    if(consecutiveSquaresLimit <= 0) return []
    const mazeSquares: MazeSquare[] = [...this.mazeSquares]
    if(consecutiveSquaresLimit === 1) return [mazeSquares[mazeSquares.length - 1]]
    
    const lastMazeSquares: MazeSquare[] = []
    for(let i = 1; i <= consecutiveSquaresLimit; i++){
      if(
        lastMazeSquares.length > 0 && 
        lastMazeSquares[lastMazeSquares.length - 1]?.getChar() != mazeSquares[mazeSquares.length - i].getChar()
      ){
        break
      }
      lastMazeSquares.push(mazeSquares[mazeSquares.length - i])
    }
    lastMazeSquares.reverse()
    return lastMazeSquares
  }

  static fromString(maze: Maze, mazePathString: string){
    try{
      const points = JSON.parse(mazePathString)
      if(!Array.isArray(points)) throw new Error(`Maze path string must be a array of points, receved: ${typeof(points)}`)
      const mazePath = new MazePath(maze)
      points.forEach( point => {
        if(typeof(point.x) === 'number' && typeof(point.y) === 'number') mazePath.addPoint(point.x, point.y)
      })
      return mazePath
    }
    catch(e: any){
      throw new Error(`It was not possible to parse maze path string: ${mazePathString}. It's not a valid JSON points string`)
    }
  }
}