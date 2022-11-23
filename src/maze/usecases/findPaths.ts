import { FindPathOptions } from "@/maze/types";
import { Maze, MazePath } from "@/maze/entities";

export function findPaths(mazeFilePath: string, options?: FindPathOptions): MazePath[]{
  const maze = new Maze(mazeFilePath, {...options})
  return maze.findPaths({...options})
}
