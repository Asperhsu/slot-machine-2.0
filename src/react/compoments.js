var List = React.createClass({
	onRemove: function(index){
		this.props.onRemove(index);
	},
	render: function(){
		var _this = this;
		var createItem = function(itemText, index){
			return (
				<ListItem key={index} index={index} onRemove={_this.onRemove}>{itemText}</ListItem>
			);
		};
		return (
			<ul className="list-group">
				{this.props.items.map(createItem)}
			</ul>
		);
	}
});

var ListItem = React.createClass({
	onClick: function(){
		this.props.onRemove(this.props.index);
	},
	render: function(){
		return (
			<li className="list-group-item ui-state-default row" data-index={this.props.index}>
				<div className="pull-left">
					<span className="glyphicon glyphicon-menu-hamburger"></span>&nbsp;
					{this.props.children}
				</div>
				<div className="pull-right">
					<button type="button" className="btn btn-danger" onClick={this.onClick}><span className="glyphicon glyphicon-remove"></span></button>
				</div>
			</li>
		);
	}
});

var Form = React.createClass({
	getInitialState: function() {
		return {item: ''};
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onFormSubmit(this.state.item);
		this.setState({item: ''});
		ReactDOM.findDOMNode(this.refs.item).focus();
		return;
	},
	onChange: function(e){
		this.setState({
			item: e.target.value
		});
	},
	render: function(){
		return (
			<div className="row">
				<form onSubmit={this.handleSubmit}>
					<div className="col-sm-10 col-xs-9">
						<input type="text" className="form-control" ref="item" onChange={this.onChange} value={this.state.item} />
					</div>
					<div className="col-sm-2 col-xs-3">
						<button type="submit" className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span></button>
					</div>
				</form>
			</div>
		);
	}
});