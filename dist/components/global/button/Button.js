"use strict";var React=require("react/addons"),Button=React.createClass({displayName:"Button",propTypes:{action:React.PropTypes.string.isRequired,handleAction:React.PropTypes.func.isRequired,mods:React.PropTypes.array,type:React.PropTypes.string,text:React.PropTypes.string},handleClick:function(t){this.props.handleAction(this.props.action,t)},_buildClassString:function(){var t="btn",e=["default","flat","raised","lg","sm","xs","primary","success","info","warning","danger","link"];return this.props.mods&&this.props.mods.forEach(function(s,i){t=e.indexOf(s)>-1?t.concat(" btn-"+s):t.concat(" "+s)}),t},render:function(){return React.createElement("button",{type:this.props.type||"button",disabled:"undefined"==typeof this.props.disabled?!1:this.props.disabled,className:this._buildClassString(),onClick:this.handleClick},this.props.text)}});module.exports=Button;