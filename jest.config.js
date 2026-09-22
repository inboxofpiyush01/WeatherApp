module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|redux-mock-store|jest-mock-extended)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
