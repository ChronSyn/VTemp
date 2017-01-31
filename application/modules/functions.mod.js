// RENDER WIDGET - THE DEFAULT FUNCTION TO USE WHEN RENDERING VIA MARKO
// USAGE EXAMPLE;
/*

	var widget_1	=	app_root + "/application/views/widgets/menu_nav_new.marko";
	var template	=	app_root + "/application/views/index_maintenance.marko"
	//console.log(req.originalUrl);
	var options		=	{
		message				:	"",
		stripe_pub_key		:	TPSvcs.stripe.test.publish_key,
		message				:	"",
		domain					:	adv_cfg.app.domain,
		year						:	moment().format("YYYY")
	};

	funcs.renderWidget(template, [widget_1], options, function(err, html, out){
		res.send(html);
	});
	return;

*/

module.exports.renderWidget	=	function(app, template, widget, options, cb){
	var app_root = app.get("app_root");
	var marko	=	require(app_root + '/node_modules/marko');
	//return cb(marko, marko, marko);

	require(app_root + '/node_modules/marko/compiler').defaultOptions.writeToDisk = false;
	
	
	var fs			=	require('fs');
	var tmppath	=	"./renderout.marko";
	/*
	var isArray = function(obj) {
		return Object.prototype.toString.call(obj) == "[object Array]";
	}
	
	if (isArray(widget) == true){
		fs.readFile(template, "utf8", function(err, data){
			for (i = 0; i < widget.length; i++){
				var thisfile	=	fs.readFileSync(widget[i], "utf8");
				data = data.replace("{! "+i+" !}", thisfile);	//	e.g. ##_WIDGET_0_##
			}
			var tmpl	=	marko.load(tmppath, data);
			tmpl.render(options, function(err, html, out){
				return cb(err,html,out);
			});
		});
	} else {
	*/	
		//fs.readFile(widget, "utf8", function(wi_err, wi_data){
			fs.readFile(template, "utf8", function(err, data){
				//data = data.replace("##_WIDGET_##", wi_data);
				var tmpl	=	marko.load(tmppath, data);
				tmpl.render(options, function(err, html, out){
					return cb(err,html,out);
				});
			});
		//});
	//};
	
};