"use strict";var React=require("react/addons"),Row=require("../components/page-structure/Row"),Column=require("../components/page-structure/Column"),Button=require("../components/global/button/Button"),ButtonGroup=require("react-bootstrap").ButtonGroup,TabbedComponentMixin={changeTab:function(e,t){this.setState({activeTab:e})},_buildTabs:function(){var e=[],t=this.tabs();for(var a in t){var n=this.state.activeTab===a?"active":"";t[a].mods.push(n),e.push(React.createElement(Button,{text:a,mods:t[a].mods,handleAction:this.changeTab,action:a,disabled:t[a].disabled?t[a].disabled:!1}))}return React.createElement("div",null,e)},_getActiveTab:function(){return this.tabs()[this.state.activeTab].content},_buildTabView:function(e){return React.createElement("div",null,React.createElement(Row,null,React.createElement(Column,{grid:"lg",size:"8",classes:"col-lg-offset-1"},React.createElement(ButtonGroup,null,this._buildTabs()))),React.createElement(Row,null,React.createElement(Column,{grid:"lg",size:"10",classes:"col-sm-offset-1"},function(e){return e?React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-body"},this._getActiveTab())):this._getActiveTab()}.call(this,e))))}};module.exports=TabbedComponentMixin;