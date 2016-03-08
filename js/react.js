"use strict";var AwardBox=React.createClass({displayName:"AwardBox",getInitialState:function(){var e=this.getItems();return{items:e}},getItems:function(){return localStorage.awards?JSON.parse(localStorage.awards):{}},componentDidMount:function(){var e=this;$(function(){$("#awardBox").trigger("loaded"),$("#tab-slot").on("updateAwards",function(){e.setState({items:e.getItems()})})})},render:function(){return React.createElement("div",{className:"AwardBox"},React.createElement(AwardHeader,null),React.createElement(AwardList,{items:this.state.items}))}}),AwardHeader=React.createClass({displayName:"AwardHeader",render:function(){return React.createElement("h2",null,"得獎名單",React.createElement("br",null),React.createElement("small",null,"此清單會儲存於瀏覽器內"))}}),AwardList=React.createClass({displayName:"AwardList",render:function(){var e=function(e){var t=[];for(var a in e){var n=e[a];t.push(React.createElement("li",{key:a,className:"list-group-item ui-state-default row"},React.createElement("div",{className:"pull-left"},React.createElement("span",{className:"icon glyphicon glyphicon-gift"})," ",a),React.createElement("div",{className:"pull-right"},React.createElement("span",{className:"icon glyphicon glyphicon-user"})," ",n)))}return t};return React.createElement("ul",{className:"list-group"},e(this.props.items))}});ReactDOM.render(React.createElement(AwardBox,null),document.getElementById("awardBox"));var List=React.createClass({displayName:"List",onRemove:function(e){this.props.onRemove(e)},render:function(){var e=this,t=function(t,a){return React.createElement(ListItem,{key:a,index:a,onRemove:e.onRemove},t)};return React.createElement("ul",{className:"list-group"},this.props.items.map(t))}}),ListItem=React.createClass({displayName:"ListItem",onClick:function(){this.props.onRemove(this.props.index)},render:function(){return React.createElement("li",{className:"list-group-item ui-state-default row","data-index":this.props.index},React.createElement("div",{className:"pull-left"},React.createElement("span",{className:"glyphicon glyphicon-menu-hamburger"})," ",this.props.children),React.createElement("div",{className:"pull-right"},React.createElement("button",{type:"button",className:"btn btn-danger",onClick:this.onClick},React.createElement("span",{className:"glyphicon glyphicon-remove"}))))}}),Form=React.createClass({displayName:"Form",getInitialState:function(){return{item:""}},handleSubmit:function(e){e.preventDefault(),this.props.onFormSubmit(this.state.item),this.setState({item:""}),ReactDOM.findDOMNode(this.refs.item).focus()},onChange:function(e){this.setState({item:e.target.value})},render:function(){return React.createElement("div",{className:"row"},React.createElement("form",{onSubmit:this.handleSubmit},React.createElement("div",{className:"col-sm-10 col-xs-9"},React.createElement("input",{type:"text",className:"form-control",ref:"item",onChange:this.onChange,value:this.state.item})),React.createElement("div",{className:"col-sm-2 col-xs-3"},React.createElement("button",{type:"submit",className:"btn btn-primary"},React.createElement("span",{className:"glyphicon glyphicon-plus"})))))}}),GiftBox=React.createClass({displayName:"GiftBox",getInitialState:function(){var e=localStorage.gifts?JSON.parse(localStorage.gifts):[];return{items:e}},updateItems:function(e){if(this.state.items.indexOf(e)>=0)return!1;var t=this.state.items.concat([e]);this.saveItem(t)},sortItems:function(e,t){this.saveItem(t)},removeItem:function(e){this.state.items.splice(e,1),this.saveItem(this.state.items)},saveItem:function(e){this.setState({items:e}),localStorage.gifts=JSON.stringify(e)},componentDidMount:function(){var e=this;$(function(){$("#giftBox").trigger("loaded"),$("#giftBox").on("sortItems",e.sortItems)})},render:function(){return React.createElement("div",{className:"GiftBox"},React.createElement(GiftHeader,null),React.createElement(List,{items:this.state.items,onRemove:this.removeItem}),React.createElement(Form,{onFormSubmit:this.updateItems}))}}),GiftHeader=React.createClass({displayName:"GiftHeader",render:function(){return React.createElement("h2",null,"獎品清單",React.createElement("small",null,"此清單會儲存於瀏覽器內"))}});ReactDOM.render(React.createElement(GiftBox,null),document.getElementById("giftBox"));var PeopleBox=React.createClass({displayName:"PeopleBox",getInitialState:function(){var e=localStorage.people?JSON.parse(localStorage.people):[];return{items:e}},updateItems:function(e){if(this.state.items.indexOf(e)>=0)return!1;var t=this.state.items.concat([e]);this.saveItem(t)},sortItems:function(e,t){this.saveItem(t)},removeItem:function(e){this.state.items.splice(e,1),this.saveItem(this.state.items)},saveItem:function(e){this.setState({items:e}),localStorage.people=JSON.stringify(e)},componentDidMount:function(){var e=this;$(function(){$("#peopleBox").trigger("loaded"),$("#peopleBox").on("sortItems",e.sortItems)})},render:function(){return React.createElement("div",{className:"PeopleBox"},React.createElement(PeopleHeader,null),React.createElement(List,{items:this.state.items,onRemove:this.removeItem}),React.createElement(Form,{onFormSubmit:this.updateItems}))}}),PeopleHeader=React.createClass({displayName:"PeopleHeader",render:function(){return React.createElement("h2",null,"人員名單",React.createElement("small",null,"此清單會儲存於瀏覽器內"))}});ReactDOM.render(React.createElement(PeopleBox,null),document.getElementById("peopleBox"));