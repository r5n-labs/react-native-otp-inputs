module.exports = {
  safeBump: false,
  git: {
    commitMessage: ':bookmark: Release ${version}',
    requireUpstream: false,
    tagName: 'v${version}',
  },
  github: {
    release: true,
    draft: true,
  },
  hooks: {
    'after:release': 'yarn gren changelog --generate --override',
  },
  npm: {
    publish: false,
  },
};
