module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'sibling'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
