const BuildMenuData = require('./build-data.js')
const buildMenuData = new BuildMenuData()
buildMenuData.build()

// buildMenuData.dbAll(`SELECT id, path, content FROM articles WHERE content LIKE '%?%' LIMIT 20;`, '数组').then(d => {
//   console.log(d)
// })
