"use strict";var React=require("react/addons"),Modal=require("../../global/modal/ModalContainer"),AddNewResourceActionButton=React.createClass({displayName:"AddNewResourceActionButton",handleClick:function(e){this.props.createResource("create",{},e)},render:function(){return React.createElement("div",{className:"resource-action-container"},React.createElement("div",{className:"resource-action-button"},React.createElement("a",{href:"javascript:void(0)",className:"btn btn-info btn-fab btn-raised",onClick:this.handleClick},React.createElement("div",{className:"ripple-wrapper"}),React.createElement("span",{className:"add-new-resource-icon"},"+"))),this.props.children)}});module.exports=AddNewResourceActionButton;