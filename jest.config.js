module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: true,
    setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"]
}