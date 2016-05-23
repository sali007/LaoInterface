    CLKPage = createClass
(
	CPage,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, oProvider) {
	        var args = { "0": arguments[3] };
	        Function.validateParams(args, [
                { name: "oProvider", type: Object }
            ]);
	        CLKPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._oProvider = oProvider;
	        this.aTabs = [];
	        this._oTab = null;
	        this._aTabsMap = [];
	        this._nCurrentTab = -1;
	        this._nPrevTab = -1;
	        this._bIsBtnChoice = false;
	        this._oPostData = {};
	    },

	    _paint: function() {
	        var oPlace = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oPlace)) {
	            oPlace.innerHTML =
                    '<div class="header">' +
                        '<table width="100%" height="100%">' +
                        '  <tr valign="middle">' +
                        '    <td width="162">' +
                        '        <div style="width: 86px; height: 140px; margin: 8px 0px 0px 51px;"><img alt="" src="./img/ui/qiwicel.gif" /></div>' +
                        '    </td>' +
                        '    <td width="1090">' +
                        '        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden;">' + getFlashDef("./swf/banner.swf") + '</div>' +
                        '    </td>' +
                        '  </tr>' +
                        '</table>' +
                    '</div>' +
                    '<div id="' + this._sInstance + '_page_body" class="page_body"></div>' +
    	            '<div id="' + this._sInstance + '_bottom_menu"></div>';
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            this._createContent(this._sInstance + "_page_body");
	        }
	    },

	    _createContent: function(sPlace) {
	        this._sContentPlace = sPlace;
	        $(sPlace).innerHTML =
                '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 100%;">' +
                '  <tr>' +
                '    <td id="' + this._sInstance + '_content" align="center" valign="middle" style="width: 100%; height: 100%;">Provider page content place</td>' +
                '  </tr>' +
                '</table>';
            this._nextTab();
	    },

	    _createBottomMenu: function(sPlace) {
	        CLKPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif", "back_press.gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif", "menu_press.gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "forward.gif", "forward_press.gif");
	        this._oLeftBtmBtn.render();
	        this._oCenterBtmBtn.render();
	        this._oRightBtmBtn.render();
	        this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
	        this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	        this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._forwardButtonClick));
	        this._oRightBtmBtn.setEnabled(false);
	    },
	    
	    _btmMenuClicked: function(sender, eargs) {
	        switch (eargs.value) {
	            case "BACK":
	                this._backButtonClick(eargs.sender, eargs.eargs);
	                break;
	            case "MENU":
	                this._menuButtonClick(eargs.sender, eargs.eargs);
	                break;
	            case "FORWARD":
	                this._forwardButtonClick(eargs.sender, eargs.eargs);
	                break;
	        }
	    },
	    
	    _backButtonClick: function(sender, eargs) {
	        this._prevTab();
	    },

	    _menuButtonClick: function(sender, eargs) {
	        document.location.href = "./index.html";
	    },

	    _forwardButtonClick: function(sender, eargs) {
	        this._postData();
	    },
	    
	    _intToStr: function (n) {
            var s = n.toString();
            if (s.length == 1) {
                s = '0' + s;
            }
            return s;
        },
	    

	    _postData: function() {
	        var sAction = "./validate_confirm.html";
	        var aFields = this._oTab.getFields();
	        var oForm = new CForm(this, "oForm", sAction);
	        
            this._oPostData["PrvId2"] = this._oProvider.id;
            this._oPostData["PrvName2"] = this._oProvider.sName.replace(/<br \/>|\n/g, " ");
            this._oPostData["AccNum2"] = aFields[0].getValue();
            this._oPostData["MinCashLimit2"] = "1";
            this._oPostData["_extra_phonenumber"] = this._oPostData["AccNum2"];
	        for (var f in this._oPostData) {
	            if (this._oPostData.hasOwnProperty(f)) {
	                if (!$isNoU(this._oPostData[f]) && this._oPostData[f].is(String)) {
	                    oForm.put(f, this._oPostData[f]);
	                }
	            }
	        }
	        oForm.submit();
	    },
	    
	    _nextTab: function() {
	        if (this._nCurrentTab < this._oProvider.pages.length - 1 && !this._bIsBtnChoice) {
	            if (this._nCurrentTab >= 0) {
	                this.aTabs[this._nCurrentTab].show(false);
	            }
	            else {
	                $(this._sContentPlace).innerHTML = "";
	            }
	            this._createTab(++this._nCurrentTab, this._sContentPlace);
	        }
	        else if (this._nCurrentTab == this.aTabs.length - 1 || this._bIsBtnChoice) {
	            this._submit();
	        }
	    },
	    
	    _onTabStateChange: function(sender, eargs) {
	        if (eargs.isValid) {
	            this._aTabsMap[this._nCurrentTab] = true;
	        }
	        else {
	            this._aTabsMap[this._nCurrentTab] = false;
	        }
	        this._correctBtmMenu();
	    },
	    
	    _prevTab: function() {
	        if (this._nCurrentTab > 0) {
	            this._destroyTab(this.aTabs.pop().getPlaceId());
	            if (this._bIsBtnChoice) {
	                this._bIsBtnChoice = false;
	                if (this.aTabs.length) {
	                    this._destroyTab(this.aTabs.pop().getPlaceId());
	                    this._nCurrentTab = this._nPrevTab;
	                    this._createTab(this._nCurrentTab, this._sContentPlace);
	                }
	            }
	            else {
	                this._nCurrentTab--;
	                this.aTabs.last().show(true);
	                this._correctBtmMenu();
	            }
	        }
	        else {
			window.history.back(-1);
	        }
	    },
	    
	    _btnClicked: function(sender, eargs) {
	        var bIsSearchComplete = false;
	        for (var i = 0; i < this._oProvider.pages.length; i++) {
	            if (this._oProvider.pages[i].pageId == eargs.pageId) {
	                bIsSearchComplete = true;
	                this._bIsBtnChoice = true;
	                this.aTabs[this._nCurrentTab].show(false);
	                this._nPrevTab = this._nCurrentTab;
	                this._nCurrentTab = i;
	                this._createTab(this._nCurrentTab, this._sContentPlace);
	                if (!$isNoU(eargs.constParams)) {
	                    for (var e in eargs.constParams) {
	                        if (eargs.constParams.hasOwnProperty(e)) {
	                            this._oPostData[e] = eargs.constParams[e];
	                        }
	                    }
	                }
	                this._oLeftBtmBtn.setEnabled(true);
	                return;
	            }
	        }
	        if (!bIsSearchComplete) {
	            document.location.href = "./index.html";
	        }
	    },
	    
	    _getFields: function(aControls) {
	        var aResult = [];
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "text_input") {
	                        aResult.push(aControls[i]);
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    _getKeyboard: function(aControls) {
	        var sResult = "";
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "keyboard") {
	                        if ($is(aControls[i]["layout"], String)) {
	                            sResult = aControls[i]["layout"];
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        return sResult;
	    },
	    
	    _correctBtmMenu: function() {
	        if (this._aTabsMap[this._nCurrentTab]) {
	            var aFld = this.aTabs[0]._getLengthFields();
	            if ((aFld[0].length > 0) || (aFld[1].length > 0))
	                this._oRightBtmBtn.setEnabled(true);
	            else
	                this._oRightBtmBtn.setEnabled(false);
	        }
	        else {
	            this._oRightBtmBtn.setEnabled(false);
	        }
	    },

	    _createTab: function(nIdx, sPlace) {
	        var sDiv = "";
	        var page = null;
	        var nTabIdx = 0;
	        var oTab = null;
	        var sKeyboard = "";
	        var aFields = [];
	        if (!$isNoU(this._oProvider) && !$isNoU(this._oProvider["pages"]) &&
                this._oProvider["pages"].is(Array)) {
	            sDiv = sPlace + "_" + nIdx.toString(10) + "_tab";
	            page = this._oProvider.pages[nIdx];
	            oTab = null;
	            if (!$isNoU(page)) {
	                if ($is(page["__objects"], Array)) {
	                    for (var i = 0; i < page["__objects"].length; i++) {
	                        if (!$isNoU(page["__objects"][i])) {
	                            if (page["__objects"][i]["__type"] == "controls") {
	                                sKeyboard = this._getKeyboard(page["__objects"][i]["__objects"]);
	                                aFields = this._getFields(page["__objects"][i]["__objects"]);
	                            }
	                        }
	                    }
	                }
	                var oDiv = document.createElement("DIV");
	                oDiv.id = sDiv;
	                oDiv.style.width = oDiv.style.height = "100%";
	                $(sPlace).appendChild(oDiv);
	                if (!$isNoU(page["buttons"]) && page["buttons"].is(Array)) {
	                    oTab = new CBtnTab(this, ("tab_" + nIdx.toString(10)), sDiv,
                                page["pageId"], page["buttons"]);
	                    oTab.attachListener("onClick", $delegate(this, this._btnClicked));
	                    oTab.attachListener("onBtmMenuClick", $delegate(this, this._btmMenuClicked));
	                }
	                else if (aFields.length && sKeyboard.length) {
	                    if (sKeyboard.indexOf("DG") > -1) {
	                        oTab = new CDGInputTab(this, "tab_", sDiv, page["pageId"],
                                        this._oProvider["sName"], this._oProvider["logo"],
                                        sKeyboard, aFields);
	                    } else if (sKeyboard.indexOf("AL") > -1) 
	                    {
	                        oTab = new PSInputTab(this, ("tab_" + nIdx.toString(10)), sDiv, page["pageId"],
                                        this._oProvider["sName"], this._oProvider["logo"],
                                        sKeyboard, aFields);
	                    }
	                }
	                if (!$isNoU(oTab)) {
	                    oTab.attachListener("onStateChange", $delegate(this, this._onTabStateChange));
	                    this.aTabs.push(oTab);
	                }
	            }
	            if (oTab) {
	                this._oTab = oTab;
	                oTab.render();
	            }
	            else
	                document.location.href = "./index.html";
	        }
	    }
	}
);
