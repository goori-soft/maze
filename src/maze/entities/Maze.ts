import fs from 'fs'
import { MazeOptions, MazePathOptions } from '@/maze/types';
import { MazeSquare } from './MazeSquare';
import { MazePath } from './MazePath';
import { MazePathSet } from './MazePathSet';

export class Maze{
  private readonly mazeSquares: Set<MazeSquare> = new Set()
  private readonly mazeLines: MazeSquare[][] = []
  private readonly mazeColumns: MazeSquare[][] = []
  private readonly matrix: string[][] = []
  private maxWidth: number = -1
  private readonly entryChars: string[]
  private readonly exitChars: string[]

  constructor(private readonly mazeFilePath: string, options: MazeOptions = {}){
    this.entryChars = options.entryChars?.toUpperCase().split('') ?? ['B']
    this.exitChars = options.exitChars?.toUpperCase().split('') ?? ['B']
    this.loadMazeFile()
  }

  getEntryChars(): string[]{
    return this.entryChars
  }

  getExitChars(): string[]{
    return this.exitChars
  }

  getSquare(x: number, y: number): MazeSquare | undefined{
    if(y < 0 || x < 0) return undefined
    const mazeLine = this.mazeLines[y]
    if(mazeLine === undefined) return undefined
    return mazeLine[x]
  }

  getChar(x: number, y: number): string{
    const width = this.width()
    const height = this.height()
    if(y >= height) throw new Error(`There is no line ${y} in the maze. The max line index is ${height - 1}`)
    if(x >= width) throw new Error(`There is no column ${x} in the maze. The max column index is ${width - 1}`)
    const char = this.matrix[y][x]
    if(char === undefined) return ''
    return char
  }

  getEntries(): MazeSquare[]{
    const boundaries = this.getBoundaries()
    return boundaries.filter( mazeSquare => this.entryChars.includes(mazeSquare.getChar()))
  }

  getExits(): MazeSquare[]{
    const boundaries = this.getBoundaries()
    return boundaries.filter( mazeSquare => this.exitChars.includes(mazeSquare.getChar()))
  }

  getBoundaries(): MazeSquare[]{
    let boundaries: MazeSquare[] = []
    this.mazeLines.map((mazeLine, lineIndex) =>{
      if(lineIndex === 0 || lineIndex === this.mazeLines.length - 1){
        boundaries = boundaries.concat(mazeLine)
      }
      else{
        if(mazeLine.length > 0) boundaries.push(mazeLine[0])
        if(mazeLine.length > 1) boundaries.push(mazeLine[mazeLine.length - 1])
      }
    })
    return boundaries
  }

  width(): number{
    return this.maxWidth
  }

  height(): number{
    return this.matrix.length
  }

  totalSquares(){
    return this.width() * this.height()
  }

  toArray(): String[][]{
    return this.matrix.map( line=> [...line])
  }

  findPaths(options?: MazePathOptions): MazePath[]{
    const entries = this.getEntries()
    const exits = this.getExits()
    const entriesAndExits = new Set([...entries.concat(exits)])
    if(entriesAndExits.size <= 1) return []
    
    let alternativeMazePaths = entries.map( mazeSquare => {
      const mazePath = new MazePath(this, options)
      mazePath.addSquare(mazeSquare)
      return mazePath
    })

    let closedPaths = new MazePathSet()
    while(alternativeMazePaths.length > 0){
      const [derivedAlternatives, validMazePaths] = this.processAlternativePaths(alternativeMazePaths)
      closedPaths.concat(validMazePaths)
      alternativeMazePaths = derivedAlternatives
    }

    return closedPaths.toArray()
  }

  private processAlternativePaths(alternativeMazePaths: MazePath[]): [MazePath[], MazePath[]]{
    const validMazePaths: MazePath[] = []
    const derivedAlternatives: MazePath[] = []

    alternativeMazePaths.forEach( mazePath => {
      const possibleSteps = mazePath.getPossibleSteps()
      possibleSteps.forEach((possibleStep, index)=>{
        let alternative: MazePath = mazePath.clone()
        alternative.addSquare(possibleStep)
        if (alternative.isClosed()){
          validMazePaths.push(alternative)
        }
        else{
          derivedAlternatives.push(alternative)
        }
      })
    })

    return [derivedAlternatives, validMazePaths]
  }

  private loadMazeFile(): void{
    if (!fs.existsSync(this.mazeFilePath)) throw new Error(`Maze file not found ${this.mazeFilePath}`)
    let mazeFileContent = fs.readFileSync(this.mazeFilePath, {encoding: "utf-8"}).toString()
    mazeFileContent = mazeFileContent.split('\r').join('')
    const mazeLines = mazeFileContent.split('\n')
    mazeLines.forEach( (mazeLine, lineIndex) => {
      const chars = mazeLine.split('')
      chars.forEach( (char, columnIndex) => {
        const mazeSquare = new MazeSquare(this, columnIndex, lineIndex)
        
        if (this.mazeLines[lineIndex] === undefined) this.mazeLines[lineIndex] = [] 
        this.mazeLines[lineIndex][columnIndex] = mazeSquare
        
        if(this.mazeColumns[columnIndex] === undefined) this.mazeColumns[columnIndex] = []
        this.mazeColumns[columnIndex][lineIndex] = mazeSquare

        if(this.matrix[lineIndex] === undefined) this.matrix[lineIndex] = []
        this.matrix[lineIndex][columnIndex] = char.toUpperCase()

        if(columnIndex > this.maxWidth) this.maxWidth = columnIndex
      })
    })
    this.maxWidth++
  }
}
