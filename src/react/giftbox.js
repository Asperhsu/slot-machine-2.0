var GiftBox = React.createClass({
	getInitialState: function(){
		var items = localStorage.gifts ? JSON.parse(localStorage.gifts) : [];
		return {
			items: items
		};
	},
	updateItems: function(newItem){
		if( this.state.items.indexOf(newItem) >=0 ){
			return false;
		}
		
		var items = this.state.items.concat([newItem]);
		this.saveItem(items);
	},
	sortItems: function(e, items){
		this.saveItem(items);
	},
	removeItem: function(index){
		this.state.items.splice(index, 1);
		this.saveItem(this.state.items);
	},
	saveItem: function(items){
		this.setState({ items: items });
		localStorage.gifts = JSON.stringify(items);
	},
	componentDidMount: function(){
		var _this = this;
		
		$(function(){
			$("#giftBox").trigger("loaded");
			$("#giftBox").on("sortItems", _this.sortItems);
		});
		
	},
	render: function() {
		return (
			<div className="GiftBox">
				<GiftHeader/>
				<List items={this.state.items} onRemove={this.removeItem}/>
				<Form onFormSubmit={this.updateItems}/>
			</div>
		);
	}
});

var GiftHeader = React.createClass({
	render() {
		return (
			<h2>獎品清單<small>此清單會儲存於瀏覽器內</small></h2>
		);
	}
});



ReactDOM.render(
	<GiftBox />,
	document.getElementById('giftBox')
);