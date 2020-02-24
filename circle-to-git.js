#!/usr/bin/env node

const ipath = require('path');
// tslint:disable-next-line:no-var-requires
const shell = require('shelljs');
shell.set('-e');
shell.set('+v');

const GITHUB_API_URI = 'api.github.com';
const CIRCLECI_API_URI = 'https://circleci.com/api/v1.1';
const buildUrl = process.env['CIRCLE_BUILD_URL'];
const repo = process.env['CIRCLE_PROJECT_REPONAME'];
const sha1 = process.env['CIRCLE_SHA1'];
const username = process.env['CIRCLE_PROJECT_USERNAME'];
const prNumber = ipath.basename(
  process.env['CIRCLE_PULL_REQUEST'] || process.env['CI_PULL_REQUEST'] || ''
);
const circleBuildNum = process.env['CIRCLE_BUILD_NUM'];
const circleToken = process.env['CIRCLE_API_USER_TOKEN'];
const ghAuthToken = process.env['GH_AUTH_TOKEN'];
console.log('git token' + ghAuthToken);
console.log('circle token' + circleToken);

// check if something is missing

// do we want the latest commit message

// build the url for artifacts
// Get artifact names from CircleCI build
const cciArtifacts = shell.exec(
  `curl ${CIRCLECI_API_URI}/project/github/AnanyaJha/salesforcedx-vscode/${circleBuildNum}/artifacts?circle-token=$CIRCLE_API_USER_TOKEN`
).stdout;
console.log(cciArtifacts);
const buildArtifactsJSON = JSON.parse(cciArtifacts);
const artifactUrls = [];
const text = 'Extension';
const path = `issues/${prNumber}/comments`;
buildArtifactsJSON.forEach(artifactURL => {
  const url = artifactURL.url;
  const htmlLink = `<a href='${url}' target='_blank' download='extensions'>${text}</a>`;
  shell.exec(
    `curl --silent --data @- https://${ghAuthToken}:x-oauth-basic@${GITHUB_API_URI}/repos/${username}/${repo}/${path})`,
    { input: JSON.stringify(htmlLink) }
  );
});

// 3658b69f2c338e0dc29c02487c62ac7e998f1e8d
