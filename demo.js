#!/usr/bin/env node

const bot = require('circle-github-bot').create();

bot.comment(
  process.env.GH_AUTH_TOKEN,
  `
<h3>${bot.env.commitMessage}</h3>
Demo: <strong>
<a href='https://circleci.com/gh/AnanyaJha/salesforcedx-vscode/32/artifacts/0/extensions/salesforcedx-vscode-47.17.1.vsix' target='_blank' download='extensions'>demo</a>
</strong>
`
);
