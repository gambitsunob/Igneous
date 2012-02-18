var express = require('express');
var server = express.createServer();
server.listen( 8080 );

var igneous = require('../lib/igneous.js');

igneous.set( 'aws_key', 'TEST' );
igneous.set( 'aws_secret', 'TEST' );
igneous.set( 's3_bucket', 'TEST' );

igneous.createFlows({
	'stylesheets.css': {
		type: 'css',
		files: [
			'styles/layout.css',
			'styles/red.css'
		],
		compress: true
	},
	'scripts.js': {
		type: 'js',
		files: [
			'scripts/handlebars.js',
			'scripts/player.js',
			'scripts/item.js'
		],
		compress: true
	},
	'templates.js': {
		type: 'jst',
		files: [
			'templates/test1.jst',
			'templates/test2.jst',
			'templates/_partial.jst'
		],
		jst_lang: 'handlebars',
		jst_namespace: 'templates',
		compress: true
	}
});

server.get( '/', function( req, res ){
	res.send('<html>'+
		'<head>'+
			'<link rel="stylesheet" href="'+ igneous['stylesheets.css'] +'" />'+
			'<script src="'+ igneous['scripts.js'] +'"></script>'+
			'<script src="'+ igneous['templates.js'] +'"></script>'+
		'</head>'+
	'</html>');
});