CGroupElement = function(sElementType, oElementValue) {
    this.elementType = sElementType;
    this.elementValue = oElementValue;
}

CDataProvider = createClass
(
	CComponent,
	{
	    ctor: function (oParent, sInstance, fLoadedCallback) {
	        CDataProvider.base.ctor.call(this, oParent, sInstance);
	    },

	    _isValidGroup: function (oGroup) {
	        return (!$isNoU(oGroup) &&
	                oGroup.hasOwnProperty("id") &&
	                oGroup.hasOwnProperty("name"));
	    },

	    _isValidProvider: function (oProvider) {
	        return (!$isNoU(oProvider) &&
                    oProvider.hasOwnProperty("id") &&
                    oProvider.hasOwnProperty("sName") &&
                    (oProvider.hasOwnProperty("prvPage") || 
                    (oProvider.hasOwnProperty("pages") &&
                    !$isNoU(oProvider["pages"]) &&
                    oProvider["pages"].length)));
	    },

	    _isValidProviderS: function (oProvider) {
	        return (!$isNoU(oProvider) && oProvider.hasOwnProperty("id"));
	    },

	    isCellularGroup: function (sGrpId) {
	        return false;
	    },

	    isPromoGroup: function(sGrpId) {
	        return false;
	    },

	    isEmptyGroup: function(sGrpId) {
	        return false;
	    },

	    getCellularGroup: function () {
	        return "";
	    },

	    getGroups: function () {
	        return [];
	    },

	    getTop5Providers: function () {
	        return prv_on_first_page;
	        //	        return [];
	    },

	    getTopElements: function () {
	        return [];
	    },

	    getServices: function () {
	        return [];
	    },

	    getElementsByGroup: function (nGroupId) {
	        return [];
	    },

	    getProviderById: function (sId) {
	        return null;
	    },

	    searchProviders: function (sName) {
	        return [];
	    }
	}
);

CXmlDataProvider = createClass
(
	CDataProvider,
	{
	    ctor: function(oParent, sInstance, fLoadedCallback) {
	        CXmlDataProvider.base.ctor.call(this, oParent, sInstance);
	        this._xmlDom = newObject(CXMLDom, null, null);
	        if (fLoadedCallback) {
	            this._xmlDom.attachListener("onLoad", fLoadedCallback);
	        }
	    },

	    _initialize: function() {
	        this._xmlDom.load("./test_response.xml");
	    },

	    _convertXmlToJs: function(oXml) {
	        var oResult = null;
	        if (!$isNoU(oXml)) {
	            oResult = {};
	            for (var i = 0; i < oXml.attributes.length; i++) {
	                oResult[oXml.attributes[i].name] = oXml.attributes[i].value;
	            }
	        }
	        return oResult;
	    },

	    _convertGroup: function(oGroup) {
	        var oResult = null;
	        if (!$isNoU(oGroup)) {
	            oResult = this._convertXmlToJs(oGroup);
	            if (!$isNoU(oResult)) {
	                delete oResult["orderId"];
	            }
	        }
	        return oResult;
	    },

	    _convertProvider: function(oProvider) {
	        var sPageOrderId = "";
	        var sFieldOrderId = "";
	        var sButtonOrderId = "";
	        var aPages = [];
	        var aFields = [];
	        var aButtons = [];
	        var aParams = [];
	        var oPage = {};
	        var oField = {};
	        var oButton = {};
	        var oParam = {};
	        var oKeyboard = {};
	        var oResult = null;
	        if (!$isNoU(oProvider)) {
	            oResult = this._convertXmlToJs(oProvider);
	            delete oResult["contryId"];
	            delete oResult["inn"];
	            delete oResult["lName"];
	            if (oResult.hasOwnProperty("logo") && oResult["logo"].is(String)) {
	                oResult["logo"] = oResult["logo"].substr(oResult["logo"].lastIndexOf("/") + 1);
	            }
	            aParams = this._xmlDom.selectNodes(oProvider, "constParams/param");
	            if (aParams.length) {
	                oResult["params"] = [];
	                for (var i = 0; i < aParams.length; i++) {
	                    oResult["params"].push(this._convertXmlToJs(aParams[i]));
	                }
	            }
	            aPages = this._xmlDom.selectNodes(oProvider, "pages/page");
	            if (aPages.length) {
	                oResult["pages"] = {};
	                for (var i = 0; i < aPages.length; i++) {
	                    oPage = this._convertXmlToJs(aPages[i]);
	                    sPageOrderId = oPage["orderId"];
	                    delete oPage["orderId"];
	                    oResult["pages"][sPageOrderId] = oPage;
	                    if (!$isNoU(oPage)) {
	                        oPage["keyboard"] = "";
	                        oKeyboard = this._convertXmlToJs(this._xmlDom.selectSingleNode(aPages[i],
	                            "controls/control[@type='keyboard']"));
	                        if (!$isNoU(oKeyboard)) {
	                            delete oKeyboard["orderId"];
	                            delete oKeyboard["type"];
	                            if (oKeyboard.hasOwnProperty("layout")) {
	                                oPage["keyboard"] = oKeyboard["layout"];
	                            }
	                        }
	                        aFields = this._xmlDom.selectNodes(aPages[i], "controls/control[@type='text_input']");
	                        if (aFields.length) {
	                            oResult["pages"][sPageOrderId]["fields"] = {};
	                            for (var j = 0; j < aFields.length; j++) {
	                                oField = this._convertXmlToJs(aFields[j]);
	                                sFieldOrderId = oField["orderId"];
	                                delete oField["orderId"];
	                                delete oField["type"];
	                                oPage["fields"][sFieldOrderId] = oField;
	                            }
	                        }
	                        aButtons = this._xmlDom.selectNodes(aPages[i], "controls/control[@type='button']");
	                        if (aButtons.length) {
	                            oPage["buttons"] = {};
	                            for (var j = 0; j < aButtons.length; j++) {
	                                oButton = this._convertXmlToJs(aButtons[j]);
	                                sButtonOrderId = oButton["orderId"];
	                                delete oButton["orderId"];
	                                delete oButton["type"];
	                                oPage["buttons"][sButtonOrderId] = oButton;
	                                if (!$isNoU(oButton)) {
	                                    aParams =
	                                        this._xmlDom.selectNodes(aButtons[j],
	                                            "param");
	                                    if (aParams.length) {
	                                        oButton["params"] = [];
	                                        for (var k = 0; k < aParams.length; k++) {
	                                            oButton["params"].push(this._convertXmlToJs(aParams[k]));
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        return oResult;
	    },

	    getGroups: function() {
	        var aResult = [];
	        var aGroups = this._xmlDom.selectNodes(null, "/response/providers/getUIGroups/group");
	        for (var i = 0; i < aGroups.length; i++) {
	            oGroup = this._convertGroup(aGroups[i]);
	            if (!$isNoU(oGroup)) {
	                aResult.push(oGroup);
	            }
	        }
	        return aResult;
	    },

	    getTopElements: function() {
	        var aResult = [];
	        var oProvider = null;
	        var nCounter = 1;
	        var nPrvCount = this._xmlDom.selectNodes(null,
	            "/response/providers/getUIProviders/provider").length;
	        return;
	        while (aResult.length < 10 && nCounter < nPrvCount) {
	            if (this._isValidProvider(
                    oProvider = this._xmlDom.selectSingleNode(null,
                        "/response/providers/getUIProviders/provider[@orderId='" + nCounter.toString(10) + "']"))) {
	                aResult.push(oProvider);
	            }
	            nCounter++;
	        }
	        return aResult;
	    },

	    getElementsByGroup: function(sGroupId) {
	        var oGroup = this._xmlDom.selectSingleNode(null, "//group[@id='" + sGroupId + "']");
	        var oTemp = null;
	        var aResult = [];
	        if (!$isNoU(oGroup)) {
	            var aElements = this._xmlDom.selectNodes(oGroup, "(group | provider)");
	            for (var i = 0; i < aElements.length; i++) {
	                if (aElements[i].nodeName.toLowerCase() == "group") {
	                    oTemp = this._convertGroup(aElements[i]);
	                    if (this._isValidGroup(oTemp)) {
	                        aResult.push(new CGroupElement("GROUP", oTemp));
	                    }
	                }
	                else if (aElements[i].nodeName.toLowerCase() == "provider") {
	                    oTemp = this._convertProvider(aElements[i]);
	                    if (this._isValidProviderS(oTemp)) {
	                        aResult.push(new CGroupElement("PROVIDER", oTemp));
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    getGroupById: function(sId) {
	        var oGroup = this._xmlDom.selectSingleNode(null, "//group[@id='" + sId + "']");
	    },

	    getProviderById: function(sId) {
	        var oProvider = this._xmlDom.selectSingleNode(null,
	            "/response/providers/getUIProviders/provider[@id='" + sId + "']");
	        return (this._convertProvider(oProvider));
	    }
	}
);

	CJsDataProvider = createClass
(
	CDataProvider,
	{
	    ctor: function(oParent, sInstance, fLoadedCallback) {
	        CJsDataProvider.base.ctor.call(this, oParent, sInstance);
	        this._aGroups = [];
	        this._aProviders = [];
	        this._aTopProviders = [];
	        this._sCellularGroupId = "";
	        if (!$isNoU(window.UIGroups) &&
	            !$isNoU(window.UIGroups.__objects) &&
	            window.UIGroups.__objects.is(Array)) {
	            this._aGroups = window.UIGroups.__objects;
	        }
	        if (!$isNoU(window.UIProviders) &&
	            !$isNoU(window.UIProviders.__objects) &&
	            window.UIProviders.__objects.is(Array)) {
	            this._aProviders = window.UIProviders.__objects;
	        }
	        if (!$isNoU(window.UITopElements) && window.UITopElements.is(Array)) {
	            this._aTopProviders = window.UITopElements.slice(0, 8);
	        }
	        if (!$isNoU(window.cellularGroupId) && window.cellularGroupId.is(String) &&
	            /^-\d+$/.test(window.cellularGroupId)) {
	            this._sCellularGroupId = window.cellularGroupId;
	        }
	        if (fLoadedCallback) {
	            this.attachListener("onLoad", fLoadedCallback);
	        }
	    },

	    _initialize: function() {
	        this.notify("onLoad");
	    },

	    _getElementById: function(aContext, sId, withElements) {
	        var oElement;
	        if ($isNoU(aContext) || !aContext.is(Array))
	            return null;
	        for (var i = 0; i < aContext.length; i++) {
	            if (!$isNoU(aContext[i]) &&
                    !$isNoU(aContext[i]["__type"])) {
	                if (aContext[i]["__type"] == "group") {
	                    if (aContext[i]["id"] == sId) {
	                        oElement = aContext[i].clone();
	                        delete oElement["__type"];
	                        if (!$bool(withElements)) {
	                            delete oElement["__objects"];
	                        }
	                        if (this._isValidGroup(oElement)) {
	                            return oElement;
	                        }
	                    }
	                    if (!$isNoU(aContext[i]["__objects"])) {
	                        oElement = this._getElementById(aContext[i]["__objects"], sId, withElements);
	                        if (!$isNoU(oElement)) {
	                            return oElement;
	                        }
	                    }
	                }
	                else if (aContext[i]["__type"] == "provider") {
	                    if (aContext[i]["id"] == sId) {
	                        return this.getProviderById(sId);
	                    }
	                }
	            }
	        }
	        return null;
	    },

	    _modifyProvider: function(oProvider) {
	        if (!$isNoU(oProvider)) {
	            if ($is(oProvider["__objects"], Array)) {
	                for (var i = 0; i < oProvider["__objects"].length; i++) {
	                    if (!$isNoU(oProvider["__objects"][i]) &&
	                        !$isNoU(oProvider["__objects"][i]["__type"])) {
	                        if (oProvider["__objects"][i]["__type"] == "constParams") {
	                            if ($is(oProvider["__objects"][i]["__objects"], Array) &&
	                                    oProvider["__objects"][i]["__objects"].length) {
	                                oProvider["constParams"] = {};
	                                for (var j = 0; j < oProvider["__objects"][i]["__objects"].length; j++) {
	                                    if (!$isNoU(oProvider["__objects"][i]["__objects"][j]) &&
	                                        !$isNoU(oProvider["__objects"][i]["__objects"][j]["__type"]) &&
	                                        oProvider["__objects"][i]["__objects"][j]["__type"] == "param" &&
	                                        $is(oProvider["__objects"][i]["__objects"][j]["name"], String) &&
	                                        oProvider["__objects"][i]["__objects"][j]["name"].length &&
	                                        $is(oProvider["__objects"][i]["__objects"][j]["value"], String)) {
	                                        oProvider["constParams"][oProvider["__objects"][i]["__objects"][j]["name"]] =
	                                            oProvider["__objects"][i]["__objects"][j]["value"];
	                                    }
	                                }
	                            }
	                        }
	                        else if (oProvider["__objects"][i]["__type"] == "pages") {
	                            if ($is(oProvider["__objects"][i]["__objects"], Array)) {
	                                oProvider["pages"] = [];
	                                for (var j = 0; j < oProvider["__objects"][i]["__objects"].length; j++) {
	                                    if (!$isNoU(oProvider["__objects"][i]["__objects"][j])) {
	                                        oProvider["pages"].push(oProvider["__objects"][i]["__objects"][j].clone());
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                delete oProvider["__objects"];
	            }
	        }
	    },

	    _getGroupByTag: function (aContext, sTag) {
	        var oGroup;
	        if ($isNoU(aContext) || !aContext.is(Array))
	            return null;
	        for (var i = 0; i < aContext.length; i++) {
	            if (!$isNoU(aContext[i]) &&
                        !$isNoU(aContext[i]["__type"])) {
	                if (aContext[i]["__type"] == "group") {
	                    if (this._isTag(aContext[i]["id"], sTag)) {
	                        oGroup = aContext[i].clone();
	                        delete oGroup["__type"];
	                        delete oGroup["__objects"];
	                        if (this._isValidGroup(oGroup)) {
	                            return oGroup["id"];
	                        }
	                    }
	                    else if (!$isNoU(aContext[i]["__objects"])) {
	                        var sId = this._getGroupByTag(aContext[i]["__objects"], sTag);
	                        if (sId.length) {
	                            return sId;
	                        }
	                    }
	                }
	            }
	        }
	        return "";
	    },
	    
	    _isTag: function(sElementId, sTagValue) {
	        var bRes = false;
	        var oElement = this._getElementById(this._aGroups, sElementId, false);
	        if (!$isNoU(oElement) && $is(oElement["tag"], String)) {
	            var aTagElements = oElement["tag"].split(",");
	            for (var i = 0; i < aTagElements.length; i++) {
	                if (aTagElements[i] == sTagValue) {
	                    bRes = true;
	                    break;
	                }
	            }
	        }
	        return bRes;
	    },

	    isCellularGroup: function(sGrpId) {
	        return this._isTag(sGrpId, "ranges");
	    },

	    isPromoGroup: function(sGrpId) {
	        return this._isTag(sGrpId, "promo");
	    },

	    isEmptyGroup: function(sGroupId) {
	        var oGroup = this._getElementById(this._aGroups, sGroupId, true);
	        var oElement = null;
	        var sId = "";
	        if (!$isNoU(oGroup) && $is(oGroup["__objects"], Array)) {
	            for (var i = 0; i < oGroup["__objects"].length; i++) {
	                oElement = oGroup["__objects"][i].clone();
	                if (!$isNoU(oElement)) {
	                    sId = String(oElement["id"]);
	                    if (oElement["__type"] == "provider") {
	                        oElement = this.getProviderById(sId);
	                        if (!$isNoU(oElement)) {
	                            oElement["id"] = sId;
	                            if (this._isValidProvider(oElement)) {
	                                return false;
	                            }
	                        }
	                    }
	                    else if (oElement["__type"] == "group" &&
	                             !$isNoU(oElement["__objects"]) &&
	                             oElement["__objects"].is(Array) &&
	                             oElement["__objects"].length) {
	                        if (this._isValidGroup(oElement)) {
	                            return false;
	                        }
	                    }
	                }
	            }
	        }
	        return true;
	    },

	    getCellularGroup: function() {
	        return this._getGroupByTag(this._aGroups, "ranges");
	    },

	    getGroups: function() {
	        var aResult = [];
	        var oGroup = {};
	        for (var i = 0; i < this._aGroups.length; i++) {
	            if (!$isNoU(this._aGroups[i]) && this._aGroups[i]["__type"] == "group") {
	                oGroup = this._aGroups[i].clone();
	                delete oGroup["__objects"];
	                delete oGroup["__type"];
	                if (this._isValidGroup(oGroup) &&
	                    !this.isEmptyGroup(oGroup["id"])) {
	                    aResult.push(oGroup);
	                }
	            }
	        }

	        return aResult;
	    },

	    getHighLevelGroup: function(sElementId) {
	        var oGroup = {};
	        if (/^-\d+$/.test(sElementId) ||
	            /^\d+$/.test(sElementId)) {
	            for (var i = 0; i < this._aGroups.length; i++) {
	                if (!$isNoU(this._getElementById(this._aGroups[i]["__objects"], sElementId, true))) {
	                    if ($is(this._aGroups[i]["id"], String) &&
	                        this._aGroups[i]["id"].length)
	                        return this._aGroups[i]["id"];
	                }
	            }
	        }
	        return "";
	    },

	    getTopElements: function() {
	        var aResult = [];
	        var oProvider = {};
	        var oGroup = {};
	        for (var i = 0; i < this._aTopProviders.length; i++) {
	            if (/^\d+$/.test(this._aTopProviders[i])) {
	                oProvider = this.getProviderById(this._aTopProviders[i]);
	                if (!$isNoU(oProvider)) {
	                    delete oProvider["pages"];
	                    aResult.push(new CGroupElement("PROVIDER", oProvider));
	                }
	            }
	            else if (/^-\d+$/.test(this._aTopProviders[i])) {
	                oGroup = this.getGroupById(this._aTopProviders[i]);
	                if (!$isNoU(oGroup)) {
	                    aResult.push(new CGroupElement("GROUP", oGroup));
	                }
	            }
	        }
	        return aResult;
	    },

	    getElementsByGroup: function(sGroupId) {
	        var oGroup = this._getElementById(this._aGroups, sGroupId, true);
	        var aResult = [];
	        var oElement = null;
	        var sId = "";
	        if (!$isNoU(oGroup) && $is(oGroup["__objects"], Array)) {
	            for (var i = 0; i < oGroup["__objects"].length; i++) {
	                oElement = oGroup["__objects"][i].clone();
	                if (!$isNoU(oElement)) {
	                    sId = String(oElement["id"]);
	                    if (oElement["__type"] == "provider") {
	                        oElement = this.getProviderById(sId);
	                        if (!$isNoU(oElement)) {
	                            oElement["id"] = sId;
	                            if (this._isValidProvider(oElement)) {
	                                delete oElement["pages"];
	                                aResult.push(new CGroupElement("PROVIDER", oElement));
	                            }
	                        }
	                    }
	                    else if (oElement["__type"] == "group" &&
	                             !$isNoU(oElement["__objects"]) &&
	                             oElement["__objects"].is(Array) &&
	                             oElement["__objects"].length) {
	                        if (this._isValidGroup(oElement)) {
	                            delete oElement["__type"];
	                            delete oElement["__objects"];
	                            aResult.push(new CGroupElement("GROUP", oElement));
	                        }
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    getGroupById: function(sId) {
	        return this._getElementById(this._aGroups, sId);
	    },

	    getProviderById: function(sId) {
	        for (var i = 0; i < this._aProviders.length; i++) {
	            if (!$isNoU(this._aProviders[i]) && !$isNoU(this._aProviders[i]["id"])) {
	                if (this._aProviders[i]["id"] == sId) {
	                    var oProvider = this._aProviders[i].clone();
	                    this._modifyProvider(oProvider);
	                    if (this._isValidProvider(oProvider)) {
	                        return oProvider;
	                    }
	                }
	            }
	        }
	        return null;
	    },


	    searchProviders: function(sName) {
	        var aRes = [];
	        if (sName.length) {
	            for (var i = 0; i < this._aProviders.length; i++) {
	                if (!$isNoU(this._aProviders[i]) && $is(this._aProviders[i]["sName"], String)) {
	                    if ((new RegExp("^" + sName.toUpperCase())).test(this._aProviders[i]["sName"].toUpperCase())) {
	                        var oProvider = this._aProviders[i].clone();
	                        this._modifyProvider(oProvider);
	                        if (this._isValidProvider(oProvider)) {
	                            aRes.push(oProvider);
	                        }
	                    }
	                }
	            }
	        }
	        return aRes;
	    }
	}
);


