#!/usr/bin/env node
const colors = require('colors');
const shell = require('shelljs');
shell.set('-e');
shell.set('+v');

const path = require('path');
const cwd = process.cwd();

// Executes the test, using the top-level packages as the CODE_EXTENSIONS_PATH
try {
  const CODE_EXTENSIONS_PATH = path.join(__dirname, '..', 'packages');
  const CODE_TESTS_WORKSPACE = path.join(
    __dirname,
    '..',
    'packages',
    'system-tests',
    'assets',
    'sfdx-simple'
  );
  const CODE_TESTS_PATH = path.join(cwd, 'out', 'test', 'vscode-integration');

  shell.exec(
    `cross-env CODE_EXTENSIONS_PATH='${CODE_EXTENSIONS_PATH}' CODE_TESTS_WORKSPACE='${CODE_TESTS_WORKSPACE}' CODE_TESTS_PATH='${CODE_TESTS_PATH}' node ./node_modules/vscode/bin/test`
  );
  console.log(colors.green('Test Pass Succeeded'));
} catch (e) {
  console.log(colors.yellow('Test run failed with error:'));
  console.error(colors.red(shell.error()));
  console.log('Tests exists with error code: 1 when a test fails.');
}
