"use strict";var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},React=require("react"),PerPageOption=require("./PerPageOption"),PaginationStore=require("../../../stores/PaginationStore"),PerPageSelector=React.createClass({displayName:"PerPageSelector",propTypes:{actionMethod:React.PropTypes.func},getInitialState:function(){return{perPage:10}},_getPaginationState:function(){return{perPage:PaginationStore.getPerPage()}},componentDidMount:function(){PaginationStore.addChangeListener(this.onChange)},componentWillUnmount:function(){PaginationStore.removeChangeListener(this.onChange)},onChange:function(){this.setState(this._getPaginationState())},selectOption:function(e){var t={per_page:e.target.value,page:1},a=_extends({},PaginationStore.getRequestedModifiers(),t);this.props.actionMethod({pagination:a})},options:[10,20,30,40,50],buildOptions:function(){var e=this;return this.options.map(function(t,a){return React.createElement(PerPageOption,{key:a,value:t,onChangeCallback:e.selectOption})})},render:function(){return React.createElement("div",{className:"col-sm-2 pull-right"},React.createElement("div",{className:"dataTables_length",id:"dataTables-example_length"},React.createElement("label",null,"Entries per page:",React.createElement("select",{name:"dataTables-example_length",className:"form-control input-sm",onChange:this.selectOption,value:this.state.perPage},this.buildOptions()))))}});module.exports=PerPageSelector;