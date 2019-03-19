module.exports = {
  verbose: true,
  'rootDir': '../',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  // 'testRegex': [
  //   '/test/unit/.+(test|spec)\\.[jt]sx?$'
  // ],
  testPathIgnorePatterns: ['/src/', 'node_modules'],
  'moduleNameMapper': {
    // 同步 webpack 别名
    '@/(.*)$': '<rootDir>/src/$1'
  },
  
  transform: { '^.+\\.js$': '<rootDir>/test/jest-preprocess.js' },
}