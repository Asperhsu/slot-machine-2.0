var slot = {
	awards: {},
	gifts: [],
	people: [],
	nextGift: '',
	giftNameElement: "#gift .name",
	flapperElement: "#flapper",
	container: "#tab-slot",
	btnStart: "#btn-start",
	btnNext: "#btn-next-gift",
	btnReroll: "#btn-reroll",
	init: function(){
		this.awards = localStorage.awards ? JSON.parse(localStorage.awards) : {};
		this.gifts = localStorage.gifts ? JSON.parse(localStorage.gifts) : [];
		this.people = localStorage.people ? JSON.parse(localStorage.people) : [];

		this.removeRolledAward();

		if(!this.gifts.length || !this.people.length){						
			this.disableStartBtn(true);
			return false;
		}

		this.registerEvent();
		this.prepareNextRoll();

		this.disableStartBtn(false);
		this.disableNextBtn(true);
		this.disableRerollBtn(true);
	},
	removeRolledAward: function(){
		for( award in this.awards){
			var people = this.awards[award];
			
			var awardIndex = this.gifts.indexOf(award);
			var peopleIndex = this.people.indexOf(people);

			if( awardIndex >= 0 ){
				this.gifts.splice(awardIndex, 1);
			}
			
			if( peopleIndex >= 0 ){
				this.people.splice(peopleIndex, 1);
			}
		}
	},
	registerEvent: function(){
		var _this = this;
		$(_this.btnStart).click(function(){
			_this.roll();
		});
		$(_this.btnNext).click(function(){
			_this.prepareNextRoll();
		});
		$(_this.btnReroll).click(function(){
			_this.reRoll();
		});


		$(_this.flapperElement).on("anim_start", function(e, str){
			if(!str.length){ return false; }
			
			_this.disableStartBtn(true);
			_this.disableNextBtn(true);
			_this.disableRerollBtn(true);
		});

		$(_this.flapperElement).on("anim_end", function(e, str){
			if( str.length && _this.gifts.length && _this.people.length ){
				_this.disableNextBtn(false);
				_this.disableRerollBtn(false);
				return false;
			}
		});
	},
	disableStartBtn: function(disabled){
		if(disabled){
			$(this.btnStart).attr("disabled", true);
		}else{
			$(this.btnStart).removeAttr("disabled");
		}					
	},
	disableNextBtn: function(disabled){
		if(disabled){
			$(this.btnNext).attr("disabled", true);
		}else{
			$(this.btnNext).removeAttr("disabled");
		}					
	},
	disableRerollBtn: function(disabled){
		if(disabled){
			$(this.btnReroll).attr("disabled", true);
		}else{
			$(this.btnReroll).removeAttr("disabled");
		}					
	},
	prepareNextRoll: function(){
		this.nextGift = this.gifts.shift();
		$(this.giftNameElement).text(this.nextGift);		

		//clear flapper text
		$(this.flapperElement).trigger("updateStr", ['']);

		this.disableStartBtn(false);
		this.disableNextBtn(true);
		this.disableRerollBtn(true);
	},
	roll: function(){					
		var peopleNo = this.people.length;					
		var randomIndex = Math.floor(Math.random() * peopleNo);
		var peopleGetGift = this.people.splice(randomIndex, 1).pop();

		this.awards[this.nextGift] = peopleGetGift;

		$(this.flapperElement).trigger("updateStr", [peopleGetGift]);

		this.saveResult();
	},
	reRoll: function(){
		var peopleGetGift = this.awards[this.nextGift];
		this.people.splice(0, 0, peopleGetGift);

		this.roll();
	},
	saveResult: function(){
		localStorage.awards = JSON.stringify(this.awards);

		$(this.container).trigger('updateAwards');
	},
	clearResult: function(){
		delete localStorage.awards;
		this.awards = {};
	}

};