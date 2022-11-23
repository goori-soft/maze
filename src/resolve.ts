import './config/module-alias'
import * as maze from '@/maze'

function getMsTime(): number{
  const hrTime = process.hrtime()
  return hrTime[0] * 1000000 + hrTime[1] / 1000
}

const mazeFile = process.argv[2] ?? ''
if(mazeFile.trim() === ""){
  console.log("No maze file has been defined")
  console.log("Usage: npm run resolve <FILE_NAME>")
  console.log("")
  process.exit(1)
}

const startTime = getMsTime()
const mazePaths = maze.findPaths(mazeFile)
const endTime = getMsTime()
const delay = ((endTime - startTime) / 1000).toFixed(3)

console.log(`${mazePaths.length} solution(s) found for ${mazeFile}`)
console.log(`${delay} s`)

console.log('')
mazePaths.map( mazePath => mazePath.hightlightChars())
console.log('')
