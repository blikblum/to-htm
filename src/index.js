const { htmTransform } = require('./htmTransform')

console.log(htmTransform('<div>{{variable}}</div>', {srcType: 'handlebars'}))

console.log(htmTransform('<div>{{variable}}</div>', {srcType: 'handlebars', isComponent: true}))
