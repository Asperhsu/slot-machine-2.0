$(function(){
	//nav
	$("#side-nav a").click(function(){
		$(this).parents('#side-nav').toggleClass('active');
	});
	$("#nav-btn").click(function(){
		$(this).parents('#side-nav').toggleClass('active');
	});

	// tab shown event
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		if( $(e.target).attr('href') == '#tab-slot' ){
			slot.init();
			Flapper.init();
		}
	});

	//sortable initial
	$("#giftBox, #peopleBox").on("loaded", function(){		
		var $el = $(this);
		$(this).find('ul').sortable({
			update: function(event, ui){
				var items = [];

				$(this).find('li').each(function(){
					var val = $(this).text();
					items.push(val);
				});
				
				$el.trigger('sortItems', [items]);
				return false;
			}
		}).disableSelection();
	});

	//clear award history
	$("#award-clear").click(function(){
		slot.clearResult();
		location.reload();
	});
});

