module.exports = {
  dataSource: 'prs',
  onlyMilestones: false,
  groupBy: {
    Features: ['Feature'],
    Minors: ['Minor'],
    Bugfixes: ['Bugfix'],
  },
  ignoreLabels: ['dependencies'],
  changelogFilename: 'CHANGELOG.md',
};
