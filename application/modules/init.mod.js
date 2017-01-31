var hardware = require("./query.mod.js")

module.exports.init	=	{

	createMenuBar : function(Menu, MenuItem, cb){
		const template	=	[
			/*
			{
				label	:	"Edit",
				submenu	:	[
					{	
						label	:	"I didn't mean to do that!",
						role	:	"undo"
					},
					{
						label	:	"Actually, do that again!",
						role	:	"redo"
					},
				]
			},
			{
				label	:	"About",
				click(){require('electron').shell.openExternal("https://google.co.uk")}
			}
			*/
		];
		const menu	=	Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
		
		return cb(menu);
	},
	
	initWindow	:	function(BrowserWindow, app, cb){
		//alert(app.get("app_root"));
		var mainWindow	=	new BrowserWindow({width: 1440, height: 900, icon: app.get("app_root") + "/icon2.ico"});
		return cb(mainWindow);
	},
	
	doCreateWindow	:	function(CFG, BrowserWindow, mainWindow, ipcMain, cb){
		mainWindow.loadURL("http://localhost:"+CFG.app.localPort+"/")
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
		
		// Emitted when the window is closed.
		mainWindow.on('closed', function () {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null;
		});
		
		
		ipcMain.on('application.function.console.show', function(e, value){
			mainWindow.webContents.openDevTools();
		});
		
		ipcMain.on('windows.function.taskbar.flash', function(e){
			//mainWindow.once('focus', () => mainWindow.flashFrame(false));
			mainWindow.flashFrame(true);
		});
		
		ipcMain.on('windows.function.taskbar.progress', function(e, value){
			mainWindow.setProgressBar(value);
		});
		
		var timers	=	{
			hardware	:	{
				gpu			:	false,
			}
		}
		ipcMain.on('windows.function.hardware.query', function(e, doStop){
			if (timers.hardware.gpu == false){
				if (doStop !== true){
					timers.hardware.gpu	=	setInterval(function(){
						hardware.nvidia.statsQuery(function(status, data){
							mainWindow.webContents.send("windows.function.hardware.query", status, data);
						});
					}, doStop);
				};
			} else {
				if (doStop == true){
					clearInterval(timers.hardware.gpu);
					timers.hardware.gpu	=	false;
				}
				hardware.nvidia.statsQuery(function(status, data){
					mainWindow.webContents.send("windows.function.hardware.query", status, data);
				});
			}
		});
		return cb(true);
	}


}