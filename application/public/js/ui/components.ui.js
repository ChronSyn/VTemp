var _outComponent	=	"";		//	Empty string used as return

component	=	{
	progress	:	{
		ring	:	function(classes = "", cb){
			_outComponent	=	`
				<div class="progress-ring ${classes}">
					<div class="progress-circle"></div>
					<div class="progress-circle"></div>
					<div class="progress-circle"></div>
					<div class="progress-circle"></div>
					<div class="progress-circle"></div>
				</div>
			`;
			cb(_outComponent);
			_outComponent	=	"";
			return;
		},
		bar	:	{
			determinate	:	function(min = 0, max = 100, value = 0, cb){
				_outComponent	=	`
					<div class="progress">
						<div class="progress-bar" role="progressbar" aria-valuenow="${value}" aria-valuemax="${max}" style="width: ${value}%;">
							<span class="sr-only">${value}%</span>
						</div>
					</div>
				`;
				cb(_outComponent);
				_outComponent	=	"";
				return;
			},
			indeterminate	:	function(classes = "", cb){
				_outComponent	=	`
					<div class="progress-bar ${classes}">
						<div class="progress-circle"></div>
						<div class="progress-circle"></div>
						<div class="progress-circle"></div>
						<div class="progress-circle"></div>
						<div class="progress-circle"></div>
					</div>
				`;
				cb(_outComponent);
				_outComponent	=	"";
				return;
			}
		}
	},
	
	// Buttons
	button	:	function(buttons, cb){
		var group	=	'<div class="btn-group">';
		var markup	=	`	<div class="btn-group">
										${buttons.map(btn =>
											`<${btn.type} class="btn ${btn.classes} "
											${btn.href ? 'href="' + btn.href + '" ' : ' '}
											${btn.type == "button" ? ' onclick="' + btn.events.click + '" ' : ' '}
											${btn.attrs.map(attr =>
												`${attr.name} = '${attr.value}'`
											).join("")}
											>${btn.text}</${btn.type}>`
										).join("")}
										</div>
										`;
										
										
		/*
		buttons.forEach((btn) =>{
			//	btn.type = button || a
			//	btn.classes = btn-primary || btn-default || btn-link
			//	btn.text = string :: button caption
			//
			group += '<button class="btn ${btn.classes}" ${href="btn.href"}>${btn.text}</button>';
		});
		
		group += "</div>"
		*/
		
		
		_outComponent	=	markup;
		cb(_outComponent);
		_outComponent	=	"";
		markup = "";
		return;
	},
	
	canvas	:	{
		canvas	:	function(classes, id, canvid, width, height, cb){
			_outComponent	=	`<div class="gaugeHolder"><canvas class="${classes}" id="${id}" data-canvid="${canvid}" width="${width}" height="${height}"></canvas></div>`;
			cb(id, _outComponent);
			_outComponent	=	"";
			return;
		},
	},
	
	gaugeNew	:	function(opts, cb){
		var elem	=	`<div id="${opts.id}" class="gaugeHolder">
								<div class="gauge-value">${opts.startValue} ${opts.unit}</div>
								<div class="gauge-blurb">${opts.blurb}</div>
							</div>`;
		return cb(elem);
	},
	
	infoHeader	:	function(opts, cb){
		var elem	=	`<div id="${opts.id}" class="infoHeader">
								<div class="h2">${opts.header}</div>
								<div class="infoArea">`;
		var items	=	"";
		for (i = 0; i<opts.fields.length; i++){
			items	=	items + "<strong>"+opts.fields[i].header+": </strong>"+opts.fields[i].value;
		};
		
		elem	=	elem	+	items	+	"</div></div>";
		return cb(elem);
	},
	
	gauge	:	function(opts, target, cb){
		opts.highDpiSupport		=	true;
		opts.generateGradient	=	true;
		opts.limitMax				=	true;
		
		if (opts.highGood == false){		//	If a high value is good - e.g. clock speeds
			opts.percentColours		=	[
				[0.0, "#76b900"],
				[0.70, "#e38000"],
				[0.90, "#b90000"]
			];
			opts.colorStart	=	"#76b900";
			opts.colorStop	=	"#b90000";	
		} else {
			opts.percentColours		=	[
				[0.0, "#b90000"],
				[0.70, "#e38000"],
				[0.90, "#76b900"]
			];
			opts.colorStart	=	"#b90000";
			opts.colorStop	=	"#76b900";			
		}
		
		if (opts.staticLabels == true){
			opts.staticLabels	=	{
				font				: "10px Segoe UI",
				labels				:	[],
				fractionDigits	:	0
				
			}
		}
		
		
		
		var elem					=	new Gauge(target).setOptions(opts);
		var tar						=	$(target).attr("data-canvid");
		
		var gaugeValue			=	"<div class='gauge-value' id='gaugevalue_"+$(target).attr("data-canvid")+"'>"+elem.options.startValue + " " + opts.unit+"</div><br/>";
		$(target).parent().append(gaugeValue);
		
		var gaugeBlurb			=	"<div class='gauge-blurb' id='gaugeblurb_"+$(target).attr("data-canvid")+"'>"+opts.blurb+"</div><br/>";
		$(target).parent().append(gaugeBlurb);

		$("gaugevalue_"+tar).html(elem.value + " " + opts.unit);
		//elem.setTextField(document.getElementById("gaugevalue_"+$(target).attr("data-canvid")));
		elem.maxValue			=	opts.maxValue;
		elem.animationSpeed	=	opts.animSpeed;
		elem.set(opts.startValue);
		cb(elem);
		//_outComponent	=	"";
		return;
	}
	
}
















