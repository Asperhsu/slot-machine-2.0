var Flapper = {
	container: "#flapper",
	element: "input.display",
	options: {
		chars_preset: 'alpha',
		chars: [' ', '王', '李', '張', '趙', '劉', '陳', '楊', '吳', '黃', '朱'],
		align: 'left',
		width: 3,
		timing: 500,
		min_timing: 10,

	},
	init: function(){
		var _this = this;
		this.options.on_anim_start = function(){
			var str = $(_this.element, _this.container).val();
			$(_this.container).trigger("anim_start", [str]);
		};
		this.options.on_anim_end = function(){
			var str = $(_this.element, _this.container).val();
			$(_this.container).trigger("anim_end", [str]);
		};

		$(this.container).on("updateStr", function(e, str){
			_this.updateStr(str);
		});

		$(this.element, this.container).val('').flapper(this.options);
	},
	updateStr: function(str){
		var $input = $(this.element, this.container);
		if( $input.val().length ){
			$input.val('').change();
		}

		if( str && str.length ){
			$input.val(str).change();
		}
	}
};