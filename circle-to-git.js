#!/usr/bin/env node

import { basename } from 'path';
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
const prNumber = basename(
  process.env['CIRCLE_PULL_REQUEST'] || process.env['CI_PULL_REQUEST'] || ''
);
const circleBuildNum = process.env['CIRCLE_BUILD_NUM'];
const circleToken = process.env['CIRCLE_API_USER_TOKEN'];
const ghAuthToken = process.env['GH_AUTH_TOKEN'];

// check if something is missing

// do we want the latest commit message

// build the url for artifacts
// Get artifact names from CircleCI build
const cciArtifacts = shell
  .exec(
    `curl ${CIRCLECI_API_URI}/project/github/forcedotcom/salesforcedx-vscode/${circleBuildNum}/artifacts?circle-token=${circleToken}`,
    {
      silent: true
    }
  )
  .stdout.trim();

const buildArtifactsJSON = JSON.parse(cciArtifacts);
const artifactUrls = [];
const text = 'Extension';
const path = `issues/${prNumber}/comments`;
buildArtifactsJSON.forEach(artifactURL => {
  const url = artifactURL.url;
  const htmlLink = `<a href='${url}' target='_blank' download='extensions'>${text}</a>`;
  shell.exec(
    `curl(https://${ghAuthToken}:x-oauth-basic@${GITHUB_API_URI}/repos/${username}/${repo}/${path}, JSON.stringify(${htmlLink})`
  );
});
