var app_root				= "";
const findup				= require('findup');
try {
	app_root = findup.sync(__dirname, "application.config");
	//console.log(app_root);
} catch(e) {
	console.log("Could not find application.config, terminating!");
	process.exit();
};

const {app, BrowserWindow, Menu, remote, MenuItem, ipcMain}	=	require('electron');

const path					=	require('path');
const url					=	require('url');
const util					= require('util');
const os					=	require('os');
const fs						=	require('fs');
const express				=	require("express");
const session				=	require("express-session");
const srv					=	express();
const methodOverride	=	require("method-override");
const cookieParser		=	require('cookie-parser');
const bodyParser		=	require('body-parser');
const marko				=	require('marko');
const ejs					=	require('ejs');

srv.set("app_root",app_root);
const cfg_file		= require(app_root + '/application.config');
var adv_cfg		= cfg_file.adv_cfg;


srv.set('view engine', 'ejs');

srv.use(methodOverride());
srv.use(cookieParser());
srv.use(bodyParser.json());
srv.use(bodyParser.urlencoded({extended:true}));
srv.use(express.static(__dirname + "/public/"));

var init			= require(app_root + "/application/modules/init.mod.js");
var funcs 		= require(app_root + "/application/modules/functions.mod.js");
var router		= require(__dirname + "/modules/routes.mod.js")(srv, funcs, marko);

srv.listen(9005);
let mainWindow;
//mainWindow	=	new BrowserWindow({width: 1440, height: 900});

app.on('ready', function(){
	init.init.initWindow(BrowserWindow, srv, function(mainWindow){
		init.init.doCreateWindow(adv_cfg, BrowserWindow, mainWindow, ipcMain, function(init_state){
			
			if (init_state == true){
				

				console.log("Window Initialization Complete!");
				init.init.createMenuBar(Menu, MenuItem, function(menu){
					console.log("Menu bar intialized!")
				});
			}
		});
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
	process.exit();
});

app.on('activate', function () {
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.