import './config/module-alias'
import * as maze from '@/maze'

function getMsTime(): number{
  const hrTime = process.hrtime()
  return hrTime[0] * 1000000 + hrTime[1] / 1000
}

const startTime = getMsTime()
const mazeFile = './tests/maze-files/maze-example-0.txt'
const mazePaths = maze.findPaths(mazeFile)
const endTime = getMsTime()
const delay = ((endTime - startTime) / 1000).toFixed(3)

console.log(`${mazePaths.length} solution(s) found for ${mazeFile}`)
console.log(`${delay} s`)

console.log('')
mazePaths.map( mazePath => mazePath.hightlightChars())
console.log('')
