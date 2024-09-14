import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		root: true,
		ignores: ['projects/**/*'],
	},
	{
		files: ['*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['tsconfig.json'],
				createDefaultProgram: true,
			},
		},
		plugins: {
			'@angular-eslint': angularEslint,
			'@typescript-eslint': tsEslint,
		},
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
		},
		extends: [
			'plugin:@angular-eslint/recommended',
			'plugin:@angular-eslint/template/process-inline-templates',
		],
	},
	{
		files: ['*.html'],
		plugins: {
			'@angular-eslint/template': angularEslintTemplate,
		},
		extends: ['plugin:@angular-eslint/template/recommended'],
		rules: {},
	},
];
