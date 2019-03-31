const fs = require('fs-extra')
const config = require('./config.js')
const BuildMenuData = require('./build/build-data.js')
fs.removeSync(config.dataDir)

const buildMenuData = new BuildMenuData()
buildMenuData.build()
