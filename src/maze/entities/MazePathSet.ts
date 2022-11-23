import { MazePath } from "./MazePath";

export class MazePathSet{
  private readonly mazePathSet: Set<MazePath> = new Set()
  private readonly mazePathSetString: Set<string> = new Set()

  add(mazePath: MazePath): void{
    const mazePathString = mazePath.stringify()
    const reverseMazePathString = mazePath.reverse().stringify()
    if( this.mazePathSetString.has(mazePathString) || this.mazePathSetString.has(reverseMazePathString)) return
    this.mazePathSetString.add(mazePathString)
    this.mazePathSet.add(mazePath)
  }

  toArray(): MazePath[]{
    return [...this.mazePathSet]
  }

  concat(mazePathArray: MazePath[]): void{
    mazePathArray.forEach( mazePath => this.add(mazePath))
  }

  size(): number{
    return this.mazePathSet.size
  }
}