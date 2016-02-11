"use strict";var _=require("lodash"),React=require("react/addons"),className=require("classnames"),FormStore=require("../../../stores/FormStore"),FormUtility=require("./FormUtilityMixin"),Checkbox=React.createClass({displayName:"Checkbox",propTypes:{fieldKey:React.PropTypes.string.isRequired,changeCallback:React.PropTypes.func,options:React.PropTypes.array.isRequired,labelAttribute:React.PropTypes.string,disabled:React.PropTypes.bool,comparisonAttr:React.PropTypes.array,overrideClass:React.PropTypes.string},mixins:[FormUtility],getInitialState:function(){return{fieldValue:[],options:[]}},componentWillReceiveProps:function(e){var t=this._findValueByPath(e.bindResource,e.fieldKey)||[];this.setState({fieldValue:t})},customHandleChange:function(e){var t=this.state.fieldValue,a=this.props.options[e.target.dataset.index],s=this.props.comparisonAttr||null;if(e.target.checked)t.push(a);else{var i=[];t.forEach(function(e,t){s?a[s]!==e[s]&&i.push(e):_.isEqual(a,e)||i.push(e)}),t=i}this.setState({fieldValue:t},function(){this.props.changeCallback(this.props.fieldKey,this.state.fieldValue,this)}.bind(this))},buildCheckboxes:function(){var e=this.props.overrideClass?" "+this.props.overrideClass:"",t=this.props.comparisonAttr||null,a=this.props.disabled||!1,s=this.props.labelAttribute||"label";return this.props.options.map(function(i,r){var l=!1;return this.state.fieldValue.forEach(function(e,a){t?i[t]===e[t]&&(l=!0):_.isEqual(i,e)&&(l=!0)}),React.createElement("div",{key:r,className:"checkbox"+e},React.createElement("label",null,React.createElement("input",{type:"checkbox",name:i.name||"option"+r,"data-index":r,onChange:this.handleChange,value:i,checked:l,disabled:a}),React.createElement("span",{className:"checkbox-material"},React.createElement("span",{className:"check"})),React.createElement("span",{className:"checkbox-label"},i[s])))},this)},render:function(){var e=className({"form-group":!0,"has-error":this._checkFieldIsValid(),disabled:this.props.disabled||!1});return React.createElement("div",{className:e},React.createElement("label",{className:"control-label"},this.props.label),this.buildCheckboxes())}});module.exports=Checkbox;