# to-htm
Conversion tool from JSX or Handlebars to [htm](https://github.com/developit/htm) (tagged template literal)

### Features
 - Convert from JSX to htm (tagged template literal)
 - Convert from Handlebars to JSX or htm (tagged template literal)
 - Format output code with prettier
 - Option to toggle React attributes names (className, htmlFor etc)

### Web app

See live version [**here**](https://blikblum.github.io/to-htm/web/dist/)

### CLI

#### Install

     npm install -g to-htm

#### Usage

    to-htm <file-pattern>

Where file-pattern is a glob. Example:
     
    to-htm **/*.hbs

### Todo
 - Improve cli (add options)

### Credits
 - [htm](https://github.com/developit/htm)
 - [handlebars-to-jsx](https://github.com/danakt/handlebars-to-jsx)

### Copyright
2019 - Luiz Américo Pereira Câmara

MIT License