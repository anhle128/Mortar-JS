"use strict";var AppDispatcher=require("../dispatcher/AppDispatcher"),AppActionConstants=require("../constants/AppActionConstants"),ActionTypes=AppActionConstants.ActionTypes.alerts;module.exports={failedDataRetrieval:function(t,p){AppDispatcher.dispatch({type:ActionTypes.ALERT_ERROR,message:p,actionOrError:t})}};