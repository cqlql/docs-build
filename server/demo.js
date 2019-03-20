const BuildMenuData = require('./build-data.js')
const buildMenuData = new BuildMenuData()
buildMenuData.build().then(() => {
  // setTimeout(function () {
  //   buildMenuData.dbAll(`SELECT id, path, content FROM articles WHERE content LIKE '%${数组}%' LIMIT 20;`, ['数组']).then(d => {
  //     console.log(d)
  //   })
  // }, 1000) 
})

// buildMenuData.dbAll(`SELECT id, path, content FROM articles WHERE content LIKE '%?%' LIMIT 20;`, '数组').then(d => {
//   console.log(d)
// })
