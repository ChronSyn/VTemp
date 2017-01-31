module.exports = function(app, funcs, marko){
	var app_root = app.get("app_root");

	
	app.route("/")
		.get(function(req, res){
			var template	=	app_root + "/application/views/pages/index.ejs";
			res.render(template);
			//return res.send(template);
			/*
			funcs.renderWidget(app, template, [], {}, function(err, html, out){
				res.send(html);
			});
			*/
		});
};