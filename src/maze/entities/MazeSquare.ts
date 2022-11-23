import { Point } from "@/maze/types";
import { Maze } from "./Maze";

export class MazeSquare{
  constructor(private readonly maze: Maze, private readonly x: number, private readonly y: number){}

  getPoint(): Point{
    return {
      x: this.x,
      y: this.y
    }
  }

  getChar(): string {
    return this.maze.getChar(this.x, this.y)
  }

  getNext(orthogonalOnly: Boolean = true): MazeSquare[]{
    const positions: Point[] = []
    if(!orthogonalOnly) positions.push({x: this.x-1, y: this.y-1})
    positions.push({x: this.x, y: this.y-1})
    if(!orthogonalOnly) positions.push({x: this.x+1, y: this.y-1})
    positions.push({x: this.x-1, y: this.y})
    positions.push({x: this.x+1, y: this.y})
    if(!orthogonalOnly) positions.push({x: this.x-1, y: this.y+1})
    positions.push({x: this.x, y: this.y+1})
    if(!orthogonalOnly) positions.push({x: this.x+1, y: this.y+1})
    const squares = positions.map( point => this.maze.getSquare(point.x, point.y ))
    const validSqures = squares.filter( square => square !== undefined ) as MazeSquare[]
    return validSqures
  }
}