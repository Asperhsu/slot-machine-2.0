$(function(){
	slot.init();
	Flapper.init();

	$("#side-nav a").click(function(){
		$(this).parents('#side-nav').toggleClass('active');
	});
	$("#nav-btn").click(function(){
		$(this).parents('#side-nav').toggleClass('active');
	});

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

	$("#award-clear").click(function(){
		slot.clearResult();
		location.reload();
	});
});

