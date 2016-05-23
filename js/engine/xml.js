CXMLDom = createClass(
    CComponent,
    {
        ctor: function() {
            CXMLDom.base.ctor.call(this, null, null);
        },
        _initialize: function() {
            var oXmlDom = null;
            this.version = 1;
            if ($browser.agent === BWR_IE) {
                if (!$isNoU(window.ActiveXObject)) {
                    try { oXmlDom = new ActiveXObject("MSXML2.DOMDocument.5.0") } catch (e) { oXmlDom = null }
                    if ($isNoU(oXmlDom)) {
                        try { oXmlDom = new ActiveXObject("MSXML2.DOMDocument.4.0") } catch (e) { oXmlDom = null }
                        if ($isNoU(oXmlDom)) {
                            try { oXmlDom = new ActiveXObject("MSXML2.DOMDocument.3.0") } catch (e) { oXmlDom = null }
                            if ($isNoU(oXmlDom)) {
                                try { oXmlDom = new ActiveXObject("MSXML2.DOMDocument") } catch (e) { oXmlDom = null }
                                if ($isNoU(oXmlDom)) {
                                    try { oXmlDom = new ActiveXObject("Microsoft.XmlDom") } catch (e) { oXmlDom = null }
                                    if ($isNoU(oXmlDom)) {
                                        al("Браузер не поддерживает обработку XML");
                                    }
                                    else {
                                        this.version = 1;
                                    }
                                }
                                else {
                                    this.version = 2;
                                }
                            }
                            else {
                                this.version = 3;
                            }
                        }
                        else {
                            this.version = 4;
                        }
                    }
                    else {
                        this.version = 5;
                    }
                }
                if (!$isNoU(oXmlDom)) {
                    oXmlDom.setProperty("SelectionLanguage", "XPath");
                }
            }
            else if ($browser.agent === BWR_FF) {
                if (!($isNoU(document.implementation) ||
                      $isNoU(document.implementation.createDocument))) {
                    oXmlDom = document.implementation.createDocument("", "", null);
                }
                else {
                    al("Браузер не поддерживает обработку XML");
                }
            }
            this._oXMLDom = oXmlDom;
            this._oXMLDom.async = true;
        },

        load: function(sUrl) {
            if (!Function.validateParams(arguments, [
	                        { name: "sUrl", type: String }
                    ])) {
                return false;
            }
            if ($isNoU(this._oXMLDom)) {
                return false;
            }
            if ($browser.agent === BWR_IE) {
                if (!$isNoU(this._oXMLDom)) {
                    this._oXMLDom.onreadystatechange = Function.createDelegate(this, this._xmlDomReadyStateChange);
                }
            }
            else if ($browser.agent === BWR_FF) {
                if (!$isNoU(this._oXMLDom)) {
                    this._oXMLDom.onload = Function.createDelegate(this, this._onLoad);
                }
            }
            else {
                return false;
            }
            this._oXMLDom.load(sUrl);
            return true;
        },

        selectNodes: function(oContext, sExpr) {
            var aResult = [];
            var args = { 0: sExpr };
            if (Function.validateParams(args, [
                    { name: "sExpr", type: String }
                            ])) {
                if (!$isNoU(this._oXMLDom)) {
                    if (oContext === null) {
                        oContext = this._oXMLDom.documentElement;
                    }
                    if ($browser.agent === BWR_IE) {
                        aResult = oContext.selectNodes(sExpr);
                    }
                    else if ($browser.agent === BWR_FF) {
                        var oEvaluator = new XPathEvaluator();
                        var oResult =
                                oEvaluator.evaluate(sExpr, oContext, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                        if (oResult !== null) {
                            var oElement;
                            while (oElement = oResult.iterateNext()) {
                                aResult.push(oElement);
                            }
                        }
                    }
                }
            }
            return aResult;
        },

        selectSingleNode: function(oContext, sExpr) {
            var args = { 0: sExpr };
            if (Function.validateParams(args, [
                { name: "sExpr", type: String }
                        ])) {
                if (!$isNoU(this._oXMLDom)) {
                    if (oContext === null) {
                        oContext = this._oXMLDom.documentElement;
                    }
                    if ($browser.agent === BWR_IE) {
                        return oContext.selectSingleNode(sExpr);
                    }
                    else if ($browser.agent === BWR_FF) {
                        var oEvaluator = new XPathEvaluator();
                        var oResult =
                            oEvaluator.evaluate(sExpr, oContext, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                        if (oResult !== null) {
                            return oResult.singleNodeValue;
                        }
                    }
                }
            }
            return null;
        },

        select: function(oContext, sExpr) {
            var args = { 0: sExpr };
            if (Function.validateParams(args, [
                { name: "sExpr", type: String }
                        ])) {
                if (!$isNoU(this._oXMLDom)) {
                    if (oContext === null) {
                        oContext = this._oXMLDom.documentElement;
                    }
                    if ($browser.agent === BWR_IE) {
                        return oContext.selectNodes(sExpr);
                    }
                    else if ($browser.agent === BWR_FF) {
                        var oEvaluator = new XPathEvaluator();
                        var oResult =
                            oEvaluator.evaluate(sExpr, oContext, null, XPathResult.ANY_TYPE, null);
                        if (oResult !== null) {
                            switch (oResult.resultType) {
                                case 1:
                                    return oResult.numberValue;
                                case 2:
                                    return oResult.stringValue;
                                case 3:
                                    return oResult.booleanValue;
                                case 5:
                                    return oResult;
                                case 9:
                                    return oResult.singleNodeValue;
                                default:
                                    return null;
                            }
                        }
                    }
                }
            }
            return null;
        },

        setAsync: function(bValue) {
            if (Function.validateParams(arguments, [
	                            { name: "bValue", type: Boolean }
                    ])) {
                if (!$isNoU(this._oXMLDom)) {
                    this._oXMLDom.async = bValue;
                }
            }
        },

        getAsync: function() {
            if (!$isNoU(this._oXMLDom)) {
                return this._oXMLDom.async;
            }
            return false;
        },

        _xmlDomReadyStateChange: function() {
            if ($browser.agent === BWR_IE) {
                if (!$isNoU(this._oXMLDom)) {
                    if (this._oXMLDom.readyState === 4) {
                        this._onLoad();
                    }
                }
            }
        },

        _onLoad: function() {
            this.notify("onLoad");
        },

        destructor: function() {
            this._oXMLDom = null;
        }
    }
);
