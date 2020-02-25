#!/usr/bin/env node

import { basename } from 'path';
import { set, exec } from 'shelljs';
set('-e');
set('+v');

const GITHUB_API_URI = 'https://api.github.com';
const CIRCLECI_API_URI = 'https://circleci.com/api/v1.1';

const repo = process.env['CIRCLE_PROJECT_REPONAME'];
const username = process.env['CIRCLE_PROJECT_USERNAME'];
const prNumber = basename(
  process.env['CIRCLE_PULL_REQUEST'] || process.env['CI_PULL_REQUEST'] || ''
);
const circleBuildNum = process.env['CIRCLE_BUILD_NUM'];

// check if something is missing

// do we want the latest commit message

const cciArtifacts = exec(
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
  const htmlLink = `<h3>Here are the CircleCI artifacts for this build</h3><a href='${url}' target='_blank' download='extensions'>${text}</a>`;
  exec(
    `curl -H "Authorization: token $GH_AUTH_TOKEN" --silent POST --data '{"body": "${htmlLink}"}' ${GITHUB_API_URI}/repos/${username}/${repo}/${path}`
  );
});
