#!/usr/bin/env node
const { htmTransform } = require('./htmTransform')
const FileSet = require('file-set')
const fs = require('fs')
const path = require('path')

function getSourceType(file) {
  switch (path.extname(file)) {
    case '.handlebars', '.hbs':
      return 'handlebars'        
    default:
      return 'jsx';
  }
}

const filesPattern = process.argv[2]

if (!filesPattern) {
  console.warn('to-htm: no files pattern set')
  process.exit(1)
}

const fileSet = new FileSet(filesPattern)
fileSet.files.forEach(file => {
  console.log('processing ', file)
  const input = fs.readFileSync(file, {encoding: 'utf8'})
  const sourceType = getSourceType(file)
  const output = htmTransform(input, {sourceType})
  if (output !== false) {
    const outputFile = sourceType === 'handlebars' ? `${file}.js` : file
    fs.writeFileSync(outputFile, output)
  }  
})
