"use strict";var _extends=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},React=require("react"),Table=require("./Table"),TableContainer=React.createClass({displayName:"TableContainer",propTypes:{title:React.PropTypes.string,data:React.PropTypes.array.isRequired,dataKeys:React.PropTypes.object.isRequired,options:React.PropTypes.shape({editableRows:React.PropTypes.bool,actionableRows:React.PropTypes.bool,draggable:React.PropTypes.bool,actionsCallback:React.PropTypes.func,actions:React.PropTypes.array,mutators:React.PropTypes.object,summableRows:React.PropTypes.array,noPanel:React.PropTypes.bool}),actionCreator:React.PropTypes.object},getDefaultProps:function(){return{data:[]}},render:function(){return this.props.options&&this.props.options.noPanel?React.createElement("div",{className:"table-responsive"},React.createElement(Table,_extends({key:this.props.title},this.props))):React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-heading"},React.createElement("i",{className:"icon-table"})," ",this.props.title),React.createElement("div",{className:"panel-body"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-lg-12"},React.createElement("div",{className:"table-responsive"},React.createElement(Table,_extends({key:this.props.title},this.props)))))))}});module.exports=TableContainer;