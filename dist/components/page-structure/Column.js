"use strict";var React=require("react/addons"),FormColumn=React.createClass({displayName:"FormColumn",propTypes:{grid:React.PropTypes.oneOf(["xs","sm","md","lg"]).isRequired,size:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.string]).isRequired,classes:React.PropTypes.string},determineComponentClasses:function(){return"undefined"!=typeof this.props.classes?this.props.classes:""},render:function(){return React.createElement("div",{className:"col-"+this.props.grid+"-"+this.props.size.toString()+" "+this.determineComponentClasses()},this.props.children)}});module.exports=FormColumn;