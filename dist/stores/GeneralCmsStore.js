"use strict";var AppDispatcher=require("../dispatcher/AppDispatcher"),AppActionConstants=require("../constants/AppActionConstants"),assign=require("react/lib/Object.assign"),BaseStore=require("./BaseStore"),ActionTypes=AppActionConstants.ActionTypes.cms.form,_userProperties={isEditingForm:!1},GeneralCmsStore=assign({},BaseStore,{isEditingForm:function(){return _userProperties.isEditingForm}});GeneralCmsStore.dispatchToken=AppDispatcher.register(function(e){switch(e.type){case ActionTypes.USER_CHANGED_FORM_EDITING_STATE:_userProperties.isEditingForm=e.isEditing,GeneralCmsStore.emitChange()}}),module.exports=GeneralCmsStore;