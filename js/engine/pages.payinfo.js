    CPayInfoPage = createClass
(
	CPIPage,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, oProvider) {
	        var args = { "0": arguments[3] };
	        Function.validateParams(args, [
                { name: "oProvider", type: Object }
            ]);
	        CPayInfoPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._oProvider = oProvider;
	        this.aTabs = [];
	        this._aTabsMap = [];
	        this._nCurrentTab = -1;
	        this._nPrevTab = -1;
	        this._bIsBtnChoice = false;
	        this._oPostData = {};
	    },

	    _paint: function() {
	        CPayInfoPage.base._paint.call(this);
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
	        var sLang = storage.get("language");
	        CPayInfoPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back_" + sLang + ".gif", "back_press_" + sLang + ".gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu_" + sLang + ".gif", "menu_press_" + sLang + ".gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "forward_" + sLang + ".gif", "forward_press_" + sLang + ".gif");
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
	        var dCurDate = new Date();
	        var aFld = this.aTabs[0]._getLengthFields();
	        var aDate = aFld[2].split('.');
            var dUserDate = new Date(Date.parse(aDate[1] + '/' + aDate[0] + '/' + aDate[2]));
            
            if (dUserDate > dCurDate)
                $('error_div').innerHTML = 'Дата не должна превышать ' + this._intToStr(dCurDate.getDate()) + '.' + this._intToStr(dCurDate.getMonth() + 1) + '.' + dCurDate.getFullYear();
            else
	            this._postData(dUserDate, dCurDate, aFld);
	    },
	    
	    _prepareSendData: function() {
	        var aFields = [];
	        var sName = "";
	        this._oPostData["prv_id"] = this._oProvider.id;
	        this._oPostData["prv_name"] = this._oProvider.sName.replace(/<br \/>|\n/g, " ");
	        for (var i = 0; i < this.aTabs.length; i++) {
	            if (this.aTabs[i].is(CInputTab)) {
	                aFields = this.aTabs[i].getFields();
	                for (var j = 0; j < aFields.length; j++) {
	                    sName = aFields[j].getName();
	                    if (sName.length) {
	                        this._oPostData[sName] = aFields[j].getValue();
	                        sName = "";
	                    }
	                }
	            }
	        }
	    },
	    
	    _intToStr: function (n) {
            var s = n.toString();
            if (s.length == 1) {
                s = '0' + s;
            }
            return s;
        },
	    

	    _postData: function(dUserDate, dCurDate, aFld) {
	        var sAction = "./check_pay.html";
	        var oForm = new CForm(this, "oForm", sAction);
	        var nCurDay = dUserDate.getDate();
            var nCurMonth = dUserDate.getMonth() + 1;
            var nCurYear = dUserDate.getFullYear();
            var sDate = nCurMonth + '/' + nCurDay + '/' + nCurYear;
            var sBeginDate = '';
            var sEndDate = '';
            var dBeginDate = new Date(Date.parse(sDate));
            var dEndDate = new Date(Date.parse(sDate));

            dBeginDate.setDate(parseInt(dBeginDate.getDate(), 10) - 2);
            dEndDate.setDate(parseInt(dEndDate.getDate(), 10) + 12);

            if (dEndDate > dCurDate) {
                dEndDate = dCurDate;
            }

            sBeginDate = this._intToStr(dBeginDate.getDate()) + '.' + this._intToStr(dBeginDate.getMonth() + 1) + '.' + dBeginDate.getFullYear() + ' 00:00:01';
            sEndDate = this._intToStr(dEndDate.getDate()) + '.' + this._intToStr(dEndDate.getMonth() + 1) + '.' + dEndDate.getFullYear() + ' 23:59:59';

            oForm.put("PayStatAcc", aFld[0]);
            oForm.put("PayStatTrnNum", aFld[1]);
            oForm.put("Date", aFld[2]);
            oForm.put("PayStatFromDate", sBeginDate);
            oForm.put("PayStatToDate", sEndDate);
            oForm.put("_extra_check_pay", "check_pay.html");
            oForm.put("_extra_auth_success", "p_pay_status_info.html");
            oForm.put("_extra_auth_fail", "check_pay_err.html");
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
                        if (sKeyboard.indexOf("AL") > -1) {
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
	            if (oTab)
	                oTab.render();
	            else
	                document.location.href = "./index.html";
	        }
	    }
	}
);
