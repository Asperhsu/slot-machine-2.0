var PeopleBox = React.createClass({
	getInitialState: function(){
		var items = localStorage.people ? JSON.parse(localStorage.people) : [];
		return {
			items: items
		};
	},
	updateItems: function(newItem){
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
		localStorage.people = JSON.stringify(items);
	},
	componentDidMount: function(){
		var _this = this;	

		$(function(){
			$("#peopleBox").trigger("loaded");
			$("#peopleBox").on("sortItems", _this.sortItems);
		});
	},
	render: function() {
		return (
			<div className="PeopleBox">
				<PeopleHeader/>
				<List items={this.state.items} onRemove={this.removeItem}/>
				<Form onFormSubmit={this.updateItems}/>
			</div>
		);
	}
});

var PeopleHeader = React.createClass({
	render() {
		return (
			<h2>人員名單<small>此清單會儲存於瀏覽器內</small></h2>
		);
	}
});

ReactDOM.render(
	<PeopleBox />,
	document.getElementById('peopleBox')
);