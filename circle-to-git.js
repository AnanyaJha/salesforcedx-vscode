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

// check if something is missing

// do we want the latest commit message

// build the url for artifacts
// Get artifact names from CircleCI build
const cciArtifacts = shell.exec(
  `curl ${CIRCLECI_API_URI}/project/github/AnanyaJha/salesforcedx-vscode/${circleBuildNum}/artifacts?circle-token=$CIRCLE_API_USER_TOKEN`
).stdout;
const buildArtifactsJSON = JSON.parse(cciArtifacts);
const text = 'Extension';
const path = `issues/${prNumber}/comments`;
console.log('these are artifacts' + buildArtifactsJSON + 'end of artifacts');
buildArtifactsJSON.forEach(artifactURL => {
  console.log(artifactURL.url);
  console.log(artifactURL.path);
  const url = artifactURL.url;
  const htmlLink = JSON.stringify(
    `<a href='${url}' target='_blank' download='extensions'>${text}</a>`
  );
  shell.exec(
    `curl -H "Authorization: token $GH_AUTH_TOKEN" --silent POST --data '{"body": "${htmlLink}"}' https://${GITHUB_API_URI}/repos/${username}/${repo}/${path}`
  );
});

// 3658b69f2c338e0dc29c02487c62ac7e998f1e8d

//
