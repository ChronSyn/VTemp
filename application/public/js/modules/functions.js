const functions	=	{
		content	:	{
			loadPageMarko	:	function(){
				//
			}
		},
		
		browser	:	{
			showConsole	:	function(){
				ipcRenderer.send('application.function.console.show');
			},
		},
	
		winapi	:	{
			taskbar :	{
				flash	:	function(){
					ipcRenderer.send('windows.function.taskbar.flash');
				},
				setProgress	:	function(value){
					ipcRenderer.send('windows.function.taskbar.progress', value);
				},
			},
			
			sendNotification : function(title, body, retVal){
				let mn	=	new Notification(
									title,
									{body: body}
								);
				mn.onclick = () => {
					retVal	();	//	function
				};
			},
			
		},
	};