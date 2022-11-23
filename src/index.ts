import './config/module-alias'
import * as maze from '@/maze'

function getMsTime(): number{
  const hrTime = process.hrtime()
  return hrTime[0] * 1000000 + hrTime[1] / 1000
}

const startTime = getMsTime()
const mazeFile = './tests/maze-files/maze-example-0.txt'
const paths = maze.findPaths(mazeFile)
const endTime = getMsTime()
const delay = ((endTime - startTime) / 1000).toFixed(3)

console.log(`${paths.length} solution(s) found for ${mazeFile}`)
console.log(`${delay} s`)

if(paths.length > 0){
  console.log('')
  paths.map( mazePath => mazePath.hightlightChars())
  console.log('')
}
