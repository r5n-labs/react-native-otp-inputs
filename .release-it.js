module.exports = {
  git: {
    requireUpstream: true,
    tag: true,
    tagName: 'react-native-otp-inputs@${version}',
    commit: true,
    commitMessage: 'chore(:bookmark:): react-native-otp-inputs ${version}',
  },
  github: {
    release: true,
    releaseName: 'react-native-otp-inputs@${version}',
    draft: false,
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
    },
  },
};
