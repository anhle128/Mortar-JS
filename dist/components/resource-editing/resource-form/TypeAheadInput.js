"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_=require("lodash"),Fuse=require("fuse.js"),React=require("react"),isEmpty=require("../../../utils/isEmpty"),className=require("classnames"),Input=require("./Input"),AppActionConstants=require("../../../constants/AppActionConstants"),ActionTypes=AppActionConstants.ActionTypes.cms.form,FormActions=require("../../../actions/FormActionCreators"),FormStore=require("../../../stores/FormStore"),FormUtility=require("./utils/FormUtilityMixin"),FormKeyMixin=require("../../../mixins/FormKeyMixin"),TypeAheadInput=React.createClass({displayName:"TypeAheadInput",propTypes:{formKey:React.PropTypes.string,fieldKey:React.PropTypes.string.isRequired,fields:React.PropTypes.array,label:React.PropTypes.string,placeholder:React.PropTypes.string,helpText:React.PropTypes.string,changeCallback:React.PropTypes.func,limit:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.bool]),resourceAction:React.PropTypes.object,returnField:React.PropTypes.string,source:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.array]).isRequired,options:React.PropTypes.shape({dataNode:React.PropTypes.string,searchToken:React.PropTypes.string,queryTimeout:React.PropTypes.number,selectDisplay:React.PropTypes.func}),updateCallback:React.PropTypes.func,debug:React.PropTypes.bool,disabled:React.PropTypes.bool},mixins:[FormUtility,FormKeyMixin],getInitialState:function(){return this.props.debug&&(console.log("Typeahead Input Debug Information:"),console.log("OPTIONS:"),console.table(this.props.options),console.log("SOURCE:"),console.table(this.props.source),console.log("LABEL:",this.props.label)),{formKey:"",isValid:!0,fieldValue:[],typeAhead:{query:"",queryResults:[]}}},_clearTypeahead:function(){FormActions.clearTypeaheadQueryData(this.state.formKey),this.setState({typeAhead:{query:"",quertResults:[]}})},_setFormKey:function(){this.setState({formKey:this._generateFormKey()})},componentDidMount:function(){FormStore.addChangeListener(this._onChange),this._setFormKey()},componentWillReceiveProps:function(e){this.props.options!=e.options&&(this._onChange(),this.props.debug&&(console.log("Typeahead Input Debug Information:"),console.log("NEW SOURCE:"),console.table(e.source)),"object"===_typeof(e.options)?(typeAhead.queryResults=this.where(e.options,typeAhead.query),this.setState({typeAhead:typeAhead})):"remote"===e.options&&this.remoteWhere(typeAhead.query))},componentWillUnmount:function(){FormStore.removeChangeListener(this._onChange)},componentDidUpdate:function(){"function"==typeof this.props.updateCallback&&this.props.updateCallback(this.state.typeAhead.query)},_onChange:function(){var e=this.state.typeAhead,t=FormStore.getField(this.props.formKey,this.props.fieldKey);"remote"===this.props.source&&(e.queryResults=FormStore.getTypeaheadQueryData(this.state.formKey)),this.setState({typeAhead:e,fieldValue:t})},_getDataLabel:function(e){return e.dataset.label||this._getDataLabel(e.parentElement)},customHandleChange:function(e){var t=this._getDataLabel(e.target),s=this.props.options||{},i=s.returnField||this.props.fields[0],r={};r[i]=t;var o=_.where(this.state.typeAhead.queryResults,r)[0],a=this._fieldValue()||[];if("object"===("undefined"==typeof a?"undefined":_typeof(a)))var n=_.where(a,r).length>0;else var n=_.contains(r,a);var l=[];if(n)this.props.limit>1||this.props.limit===!1?a.forEach(function(e,s){e[i]!==t&&l.push(e)}):l=this.props.returnField?"":[];else if(this.props.limit>1||this.props.limit===!1){l=a;var p=this.props.returnField?o[this.props.returnField]:o;l.push(p)}else l=this.props.returnField?o[this.props.returnField]:o;var c=this.props.limit||l.length;if(c>1||this.props.limit===!1)var u=l.slice(0,c);else{var u=l;this._clearTypeahead()}this.props.changeCallback(this.props.fieldKey,u,this)},removeSelectedOption:function(e){var t=this._fieldValue();if(e===t)this.props.changeCallback(this.props.fieldKey,null);else{var s=t.filter(function(t){return t!==e});this.props.changeCallback(this.props.fieldKey,s)}},buildSelectedBubbles:function(){var e=this._fieldValue();if(!isEmpty(e)){var t,s=this.props.options||{},i=s.resultDisplayField||this.props.fields[0],r=e;return"object"===("undefined"==typeof r?"undefined":_typeof(r))&&r.length?e.map(function(e,r){return t="function"==typeof s.selectDisplay?s.selectDisplay(e):e[i],React.createElement("div",{key:r,className:"selected-option"},t,React.createElement("a",{href:"javascript:void(0)",className:"typeahead-unselect icon-times pull-right",onClick:this.removeSelectedOption.bind(null,e),"data-label":e[i]}))}.bind(this)):"object"===("undefined"==typeof r?"undefined":_typeof(r))?(t="function"==typeof s.selectDisplay?s.selectDisplay(r):r[i],React.createElement("div",{key:i,className:"selected-option"},t,React.createElement("a",{href:"javascript:void(0)",className:"typeahead-unselect icon-times pull-right",onClick:this.removeSelectedOption.bind(null,r),"data-label":r[i]}))):(t="function"==typeof s.selectDisplay?s.selectDisplay(r):r,React.createElement("div",{key:i,className:"selected-option"},t,React.createElement("a",{href:"javascript:void(0)",className:"typeahead-unselect icon-times pull-right",onClick:this.removeSelectedOption.bind(null,r),"data-label":r})))}},buildSelectOptions:function(){var e=this.props.options||{},t=e.resultDisplayField||this.props.fields[0];if(this.state.typeAhead.queryResults&&!(this.state.typeAhead.queryResults.length<1))return this.state.typeAhead.queryResults.map(function(s,i){if(e.selectDisplay)var r=e.selectDisplay(s);else var r=s[t];var o={};o[t]=s[t];var a=_.where(this._fieldValue,o).length>0,n=className({"btn btn-flat btn-sm":!a,"btn btn-default btn-raised btn-sm":a});return React.createElement("button",{className:n,key:i,href:"javascript:void(0)",onClick:this.customHandleChange,"data-label":s[t]},r)},this)},handleSearchChange:function(e,t,s){if(t.length<2)return void this.setState({typeAhead:{query:t,queryResults:[]}});var i=this.state.typeAhead;i[e]=t,"object"===_typeof(this.props.source)?(i.queryResults=this.where(this.props.source,i.query),this.setState({typeAhead:i})):"remote"===this.props.source&&this.remoteWhere(i.query)},buildFilters:function(e){var t,s={},i=this.props.options||{},r=i.searchToken||"~";return this.props.fields.forEach(function(i,o){t?(t.or={},t.or[i]=r+e,t=t.or):(s[i]=r+e,t=s)}),s},remoteWhere:function(e){if(""===e)return[];var t=this.props.options||{},s=t.include||[],i={modifiers:{include:s,filters:this.buildFilters(e)},dataNode:t.dataNode||"data",eventName:ActionTypes.TYPEAHEAD_QUERY,eventData:{formKey:this.state.formKey}};clearTimeout(this.currentTimeout),delete this.currentTimeout,this.currentTimeout=setTimeout(function(){this.props.resourceAction.listResource(i)}.bind(this),t.queryTimeout||500)},currentTimeout:0,where:function(e,t){if(""==t)return[];var s={keys:this.props.fields,threshold:.4},i=new Fuse(e,s);return i.search(t)},render:function(){var e=className({"form-group":!0,"has-error":this._checkFieldIsValid(),disabled:this.props.disabled||!1});return React.createElement("div",{className:"typeahead-select mortar-typeahead "+this.props.formKey+"-"+this.props.fieldKey},React.createElement("div",{className:e},React.createElement("label",{className:"control-label"},this.props.label),React.createElement("br",null),this.buildSelectedBubbles(),React.createElement(Input,{formKey:this.props.fieldKey+"-query",fieldKey:"query",bindResource:this.state.typeAhead,changeCallback:this.handleSearchChange,placeholder:this.props.placeholder,type:"text",value:this.state.typeAhead.query})),React.createElement("div",{className:"form-group"},React.createElement("div",{className:"typeahead-select",multiple:!0,onChange:this.customHandleChange},this._fieldValue()&&this._fieldValue().length<1&&this._shouldRenderHelpBlock(this.props.helpText),this.buildSelectOptions())))}});module.exports=TypeAheadInput;