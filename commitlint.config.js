export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat', // Feature: minor version bump
          'fix', // Bugfix: patch version bump
          'chore', // Other changes that don't modify src or test files: no bump
          'docs', // Documentation only changes: no bump
          'style', // Changes that do not affect the meaning of the code: no bump
          'refactor', // A code change that neither fixes a bug nor adds a feature: no bump
          'perf', // A code change that improves performance: patch version bump
          'test', // Adding missing tests or correcting existing tests: no bump
          'build', // Changes that affect the build system or external dependencies: no bump
          'ci', // Changes to our CI configuration files and scripts: no bump
        ],
      ],
    },
  }
  