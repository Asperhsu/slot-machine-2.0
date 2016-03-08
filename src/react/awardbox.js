var AwardBox = React.createClass({
	getInitialState: function(){
		var items = this.getItems();
		return {
			items: items
		};
	},
	getItems: function(){
		return localStorage.awards ? JSON.parse(localStorage.awards) : {};
	},
	componentDidMount: function(){
		var _this = this;
		
		$(function(){
			$("#awardBox").trigger("loaded");
			$("#tab-slot").on("updateAwards", function(){
				_this.setState({items:_this.getItems()});
			});
		});		
	},
	render: function() {
		return (
			<div className="AwardBox">
				<AwardHeader/>
				<AwardList items={this.state.items}/>
			</div>
		);
	}
});

var AwardHeader = React.createClass({
	render() {
		return (
			<h2>得獎名單<br/><small>此清單會儲存於瀏覽器內</small></h2>
		);
	}
});

var AwardList = React.createClass({
	render: function(){
		var createItem = function(items){
			var rows = [];
			for(var award in items){
				var people = items[award];		

				rows.push(
					<li key={award} className="list-group-item ui-state-default row">
						<div className="pull-left"><span className="icon glyphicon glyphicon-gift"></span> {award}</div>
						<div className="pull-right"><span className="icon glyphicon glyphicon-user"></span> {people}</div>
					</li>
				);

			}
			return rows;
		};
		return (
			<ul className="list-group">
				{createItem(this.props.items)}
			</ul>
		);
	}
});



ReactDOM.render(
	<AwardBox />,
	document.getElementById('awardBox')
);