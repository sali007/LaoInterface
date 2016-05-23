	CTab = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId) {
	        CTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sId = sId;
	    },

	    _paint: function() {

	    },

	    show: function(bShow) {
	        if (!$isNoU($(this._sPlace))) {
	            if ($bool(bShow)) {
	                with ($(this._sPlace).style) {
	                    display = "block";
	                }
	            }
	            else {
	                with ($(this._sPlace).style) {
	                    display = "none";
	                }
	            }
	        }
	    },

	    getId: function() {
	        return this._sId;
	    }
	}
);

    CButtonTab = createClass
(
    CTab,
    {
        ctor: function (oParent, sInstance, sCtrlPlace, sId, sTitle, aDispButton) {
            CButtonTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
            this._aDispButton = aDispButton;
            this._sTitle = sTitle;
        },
        
        _paint: function() {
            this._prepareTemplate();
	    },
        
        _prepareTemplate: function() {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr><td style="width: 100%; height: 10%; font-size: 24px; text-align: center;">' + this._sTitle + '</td></tr>'+
	                
	                '  <tr>' +
	                '    <td style="width: 100%; height: 90%" align="center" valign="middle">' +
	                '      <table cellpadding="0" cellspacing="0" border="0">' +
	                '        <tr>';
	                for (var i =0; i < this._aDispButton.length; i++) {
	                    if ($(this._aDispButton[i].disp_name).value.length != 0) {
	                        if (/^\d+$/.test(i / 5))
                                sContent += '</tr><tr>';
	                        sContent +=
	                            '<td align="left" valign="middle" width="250" height="165">' +
                                '   <div style="width: 241px; height: 158px;">' +
                                '      <div id="' + this._sInstance + '_dispButton_' + (i + 1) + '" style="width: 241px; height: 131px;">' +
                                '      </div>' +
                                '      <div style="width: 241px; height: 17px; overflow: hidden; text-align: center;">' + this._aDispButton[i].disp_desc + '</div>' +
                                '   </div>' +
	                            '</td>';
	                    }
	                }
	                sContent +=
	                    '        </tr>' +
	                    '      </table>' +
	                    '    </td>' +
	                    '  </tr>' +
	                    '</table>';
	            insertContent(this._sPlace, sContent);
	            this._createButton();
	        }
	    },
	    
	    _createButton: function () {
	        var oElement = null;
	        var oPlace = null;
	        var sDispDesc = "";
	        var sName = "";
	        
	        for (var i = 0; i < this._aDispButton.length; i++) {
	            if ($(this._aDispButton[i].disp_name).value.length != 0) {
	                if (!$isNoU(this._aDispButton[i].disp_desc))
	                    sDispDesc = this._aDispButton[i].disp_desc;
	                if (!$isNoU(this._aDispButton[i].name))
	                    sName = this._aDispButton[i].name;
	                oPlace = $(this._sInstance + "_dispButton_" + (i + 1));
	                if (oPlace) {
	                    oElement = new CDispButton(this, "el" + (i + 1), oPlace.id, $(this._aDispButton[i].disp_name).value, this._aDispButton[i].disp_type, sDispDesc, sName)
                        oElement.attachListener("onClick", $delegate(this, this._elementClick));
                        oElement.render();
                    }
	            }
	        }
	    },
	    
	    _elementClick: function (sender, eargs) {
	        if (eargs.type.indexOf('fixedsum') != -1)
	            this._oParent._oPostData["_extra_fixed_int_summ"] = eargs.value;
	        if (eargs.type.indexOf('minsum') != -1)
	            this._oParent._oPostData["komissiya"] = eargs.value;
	        if (eargs.type.indexOf('receipt') != -1)
	            this._oParent._oPostData["_receipt_" + eargs.desc] = eargs.value;
	        if (eargs.type.indexOf('extra') != -1)
	            this._oParent._oPostData["_extra_" + eargs.extraName] = eargs.value;
	        this.notify("onClick");
	    }
    }
);


    CDispInputTab = createClass
(
    CTab,
    {
        ctor: function (oParent, sInstance, sCtrlPlace, sId, aFields) {
            CDispInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
            this._aFields = this._getFields(aFields);
            this._aFldObjects = [];
	        if (!this._aFields.length) {
	            document.location.href = "./index.html";
	        }
        },
        
        _paint: function() {
	        this._prepareTemplate();
	        this._renderFields(this._sInstance + "_fields_place");
	        this._fieldAddValue();
	    },
        
        _isValidField: function(oField) {
	        if (!$isNoU(oField)) {
	            if (!$isNoU(oField["name"]) && oField["name"].is(String) && oField["name"].length) {
	                if (!$isNoU(oField["mask"]) && oField["mask"].is(String) && oField["mask"].length) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },
        
        _getFields: function(aFields) {
	        var aResult = [];
	        if (!$isNoU(aFields) && aFields.length) {
	            for (var i = 0; i < aFields.length; i++) {
	                if (this._isValidField(aFields[i])) {
	                    aResult.push(aFields[i]);
	                }
	            }
	        }
	        return aResult;
	    },
	    
	    _renderFields: function(sPlace) {
	        var sContent = "";
	        var oFld = null;
	        var bVisible = true;
	        for (var i = 0; i < this._aFields.length; i++) {
	            if (!$isNoU(this._aFields[i]["visible"]) && this._aFields[i]["visible"] == "false") {
	                bVisible = false;
	                this.addPostParam(this._aFields[i]);
	            }
	            else
	                bVisible = true;
	            if ($(this._aFields[i]["disp_name"]).value.length != 0 && bVisible) {
	                sContent +=
                        '<div>' +
                        '  <table cellpadding="0" cellspacing="0" border="0">' +
                        '    <tr>' +
                        '     <td id="' + (this._sInstance + '_fld_' + this._aFields[i]["name"] + "_place") + '" valign="top"></td><td style="width: 10px;"></td>';
                        '    </tr>';
	                if (i < this._aFields.length - 1) {
	                    sContent +=
	                        '<tr><td style="height: 30px;">&nbsp;</td></tr>';
	                }
	                sContent +=
	                    '  </table>' +
                        '</div>';
                }
	        }
	        insertContent(sPlace, sContent);
	        for (var i = 0; i < this._aFields.length; i++) {
	            if (!$isNoU(this._aFields[i]["visible"]) && this._aFields[i]["visible"] == "false")
	                bVisible = false;
	            else
	                bVisible = true;
	            if ($(this._aFields[i]["disp_name"]).value.length != 0 && bVisible) {
                        oFld = new CDIField(
                        this,
                        ('_fld_' + this._aFields[i]["name"]),
                        (this._sInstance + '_fld_' + this._aFields[i]["name"] + "_place"),
                        this._aFields[i]);
                    oFld.attachListener("onValid", $delegate(this, this._onFieldValid));
                    this._aFldObjects.push(oFld);
                    oFld.render();
                    if (i == 0) {
                        oFld.setActive(true);
                    }
	            }
	        }
	    },
	    
	    _prepareTemplate: function () {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr>' +
	                '    <td style="width: 100%; height: 100%" align="center" valign="middle">' +
	                '      <table cellpadding="0" cellspacing="0" border="0">' +
	                '        <tr>' +
	                '          <td id="' + this._sInstance + '_fields_place" align="center" valign="top"></td>' +
	                '        </tr>' +
	                '      </table>' +
	                '    </td>' +
	                '  </tr>' +
	                '</table>';
	            insertContent(this._sPlace, sContent);
	        }
	    },
	    
	    _onFieldValid: function(sender, eargs) {
	        if (eargs.isValid) {
	            this.notify("onStateChange", { isValid: true });
	        }
	        else {
	            this.notify("onStateChange", { isValid: false });
	        }
	    },
	    
	    getFields: function() {
	        return this._aFldObjects;
	    },
	    
	    addPostParam: function (aField) {
	        if (!$isNoU(aField.disp_type)) {
	        
	            var dispValue = $(aField.disp_name).value;
	            var dispType = aField.disp_type;
	            
                if (dispType.indexOf('fixedsum') != -1)
                    this._oParent._oPostData["_extra_fixed_int_summ"] = dispValue;
                if (dispType.indexOf('minsum') != -1) {
                    for(var i = 0; i < this._oParent._aPostDataAll.length; i++) {
                        var o = this._oParent._aPostDataAll[i];
                        for (var j in this._oParent._aPostDataAll[i])
                            this._oParent._oPostData[j] =  o[j]; 
                    }
                    var fMinSumm = parseFloat(dispValue);
                    var iMinSumm = parseInt(dispValue);
                    var sMinSumm = '';
                    if ((fMinSumm - iMinSumm) > 0)
                        iMinSumm += 1;
                    sMinSumm = iMinSumm.toString();
                    
                    this._oParent._oPostData["komissiya"] = sMinSumm;
                    storage.put("minsum", sMinSumm);
                }
                if (dispType.indexOf('extra') != -1)
                    this._oParent._oPostData["_extra_" + aField.name] = dispValue;
                if (dispType.indexOf('receipt') != -1)
                    if (!$isNoU(aField.disp_desc)) 
                        this._oParent._oPostData["_receipt_" + aField.disp_desc] = dispValue;
                    else
                        this._oParent._oPostData["_receipt_"] = dispValue;
            }
	    },
	    
	    _fieldAddValue: function () {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            this._aFldObjects[i].setActive(true);
	            this._aFldObjects[i].processValue(($(this._aFields[i].disp_name).value.length > 100) ? $(this._aFields[i].disp_name).value.substr(0, 99) : $(this._aFields[i].disp_name).value);
	            this.addPostParam(this._aFields[i]);
	        }
	    }
    }
);

    CDispCombined = createClass
(
    CTab,
    {
        ctor: function (oParent, sInstance, sCtrlPlace, sId, aCombined) {
            CDispCombined.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
            this._aDispButton = [];
            this._aFld = [];
            this._aDispCombined = aCombined;
            for (var i = 0; i < aCombined.length; i++) {
                if (aCombined[i].type == 'disp_button')
                    this._aDispButton.push(aCombined[i]);
                if (aCombined[i].type == 'disp_input')
                    this._aFld.push(aCombined[i]);
            }
            this._aFields = this._getFields(this._aFld);
            this._aFldObjects = [];
        },
        
        _paint: function() {
	        this._prepareTemplate();
	        this._renderFields(this._sInstance + "_fields_place");
	        this._fieldAddValue();
	    },
        
        _isValidField: function(oField) {
	        if (!$isNoU(oField)) {
	            if (!$isNoU(oField["name"]) && oField["name"].is(String) && oField["name"].length) {
	                if (!$isNoU(oField["mask"]) && oField["mask"].is(String) && oField["mask"].length) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },
        
        _getFields: function(aFields) {
	        var aResult = [];
	        if (!$isNoU(aFields) && aFields.length) {
	            for (var i = 0; i < aFields.length; i++) {
	                if (this._isValidField(aFields[i])) {
	                    aResult.push(aFields[i]);
	                }
	            }
	        }
	        return aResult;
	    },
	    
	    _renderFields: function(sPlace) {
	        var sContent = "";
	        var nDisp = 0;
	        var nButton = 0;
	        
	        sContent += 
	                '<div style="margin-top: 20px;">' +
                    '  <table cellpadding="0" cellspacing="0" border="0">' +
                    '    <tr>' +
                    '       <td>';
	        for (var i = 0; i < this._aDispCombined.length; i++) {
	            if ($(this._aDispCombined[i].disp_name).value.length != 0) {
                    if (this._aDispCombined[i].type == 'disp_button') {
                        sContent += 
                        '<table cellpadding="0" cellspacing="0" border="0">' +
                        '<tr>' +
                        '   <td align="left" valign="middle" width="250" height="165">' +
                        '      <div style="width: 241px; height: 158px;">' +
                        '         <div id="' + this._sInstance + '_dispButton_' + (nButton + 1) + '" style="width: 241px; height: 131px;">' +
                        '         </div>' +
                        '         <div style="width: 241px; height: 17px; overflow: hidden; text-align: center;">' + ((this._aDispButton[nButton].disp_desc != undefined) ? this._aDispButton[nButton].disp_desc : '') + '</div>' +
                        '      </div>' +
                        '   </td>';
                        if (this._aDispCombined[i + 1] == 'disp_input' && this._aDispCombined[i + 1]["nobr"] == 'false')
                            sContent += '</tr></table>';
                        nButton++;
                    }
                    if (this._aDispCombined[i].type == 'disp_input') {
                        if (this._aFields[nDisp]["nobr"] == 'true')
                            sContent += '<table cellpadding="0" cellspacing="0" border="0"><tr>';
                        sContent +=
                            '<td>' +
                            '   <div>' +
                            '     <table cellpadding="0" cellspacing="0" border="0">' +
                            '       <tr>' +
                            '         <td id="' + (this._sInstance + '_fld_' + this._aFields[nDisp]["name"] + "_place") + '" valign="top"></td><td style="width: 10px;"></td>' +
                            '       </tr>' +
                            '       <tr><td style="height: 30px;">&nbsp;</td></tr>' +
                            '     </table>' +
                            '   </div>' +
                            '</td>' +
                            '</tr>' +
                            '</table>';
                        nDisp++;
                    }       
	            }
	        }
	        sContent +=
                '  </tr>' +
                ' </table>' +
                '</div>';
	        insertContent(sPlace, sContent);
	        
	        this._createField();
	        this._createButton();
	    },
	    
	    _createField: function () {
	        var oFld = null;
    	    for (var i = 0; i < this._aFields.length; i++) {
    	        if ($(this._aFields[i]["disp_name"]).value.length != 0) {
                    oFld = new CField(
                        this,
                        ('_fld_' + this._aFields[i]["name"]),
                        (this._sInstance + '_fld_' + this._aFields[i]["name"] + "_place"),
                        this._aFields[i]);
                    oFld.attachListener("onValid", $delegate(this, this._onFieldValid));
                    this._aFldObjects.push(oFld);
                    oFld.render();
                    if (i == 0) {
                        oFld.setActive(true);
                    }
	            }
	        }
	    },
	    
	    _createButton: function () {
	        var oElement = null;
	        var oPlace = null;
	        var sDispDesc = "";
	        var sName = "";
	        
	        for (var i = 0; i < this._aDispButton.length; i++) {
	            if ($(this._aDispButton[i]["disp_name"]).value.length != 0) {
	                if (!$isNoU(this._aDispButton[i].disp_desc))
	                    sDispDesc = this._aDispButton[i].disp_desc;
	                if (!$isNoU(this._aDispButton[i].name))
	                    sName = this._aDispButton[i].name;
	                oPlace = $(this._sInstance + "_dispButton_" + (i + 1));
	                if (oPlace) {
	                    oElement = new CDispButton(this, "el" + (i + 1), oPlace.id, $(this._aDispButton[i].disp_name).value, this._aDispButton[i].disp_type, sDispDesc, sName)
                        oElement.attachListener("onClick", $delegate(this, this._elementClick));
                        oElement.render();
                    }
	            }
	        }
	    },
	    
	    _prepareTemplate: function () {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr>' +
	                '    <td style="width: 100%; height: 100%" align="center" valign="middle">' +
	                '      <table cellpadding="0" cellspacing="0" border="0">' +
	                '        <tr>' +
	                '          <td id="' + this._sInstance + '_fields_place" align="center" valign="top"></td>' +
	                '        </tr>' +
	                '      </table>' +
	                '    </td>' +
	                '  </tr>' +
	                '</table>';
	            insertContent(this._sPlace, sContent);
	        }
	    },
	    
	    _onFieldValid: function(sender, eargs) {
	        if (eargs.isValid) {
	            this.notify("onStateChange", { isValid: true });
	        }
	        else {
	            this.notify("onStateChange", { isValid: false });
	        }
	    },
	    
	    getFields: function() {
	        return this._aFldObjects;
	    },
	    
	    _fieldAddValue: function () {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            this._aFldObjects[i].setActive(true);
	            this._aFldObjects[i].processValue($(this._aFields[i].disp_name).value);
	            
	            if (!$isNoU(this._aFields[i].disp_type)) {
	                if (this._aFields[i].disp_type.indexOf('fixedsum') != -1)
	                    this._oParent._oPostData["_extra_fixed_int_summ"] = $(this._aFields[i].disp_name).value;
	                if (this._aFields[i].disp_type.indexOf('minsum') != -1)
	                    this._oParent._oPostData["komissiya"] = $(this._aFields[i].disp_name).value;
	                if (this._aFields[i].disp_type.indexOf('extra') != -1)
	                    this._oParent._oPostData[this._aFields[i].name] = $(this._aFields[i].disp_name).value;
	                if (this._aFields[i].disp_type.indexOf('receipt') != -1 && !$isNoU(this._aFields[i].disp_desc)) 
	                    this._oParent._oPostData["_receipt_" + this._aFields[i].disp_desc] = $(this._aFields[i].disp_name).value;
	            }
	        }
	    }, 
	    
	    _elementClick: function (sender, eargs) {
	        if (eargs.type.indexOf('fixedsum') != -1)
	            this._oParent._oPostData["_extra_fixed_int_summ"] = eargs.value;
	        if (eargs.type.indexOf('minsum') != -1)
	            this._oParent._oPostData["komissiya"] = eargs.value;
	        if (eargs.type.indexOf('receipt') != -1)
	            this._oParent._oPostData["_receipt_" + eargs.desc] = eargs.value;
	        if (eargs.type.indexOf('extra') != -1)
	            this._oParent._oPostData["_extra_" + eargs.extraName] = eargs.value;
	        this.notify("onClick");
	    }
    }
);





	CInputTab = createClass
(
	CTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields) {
	        CInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
	        this._aFields = this._getFields(aFields);
	        if (!this._aFields.length) {
	            document.location.href = "./index.html";
	        }
	        this._nCurrentField = 0;
	        this._aFldObjects = [];
	        this._sKbType = "AL";
	        if (this._isValidKb(sKbType)) {
	            this._sKbType = sKbType;
	        }
	        this._sPrvName = "";
	        if (!$isNoU(sPrvName) && sPrvName.is(String)) {
	            this._sPrvName = sPrvName;
	        }
	        this._sLogo = "";
	        if (!$isNoU(sLogo) && sLogo.is(String)) {
	            this._sLogo = sLogo;
	        }
	        this._oKeyboard = null;
	    },

	    _isValidKb: function(sKbType) {
	        return (sKbType == "AL" ||
	                sKbType == "ALC" ||
	                sKbType == "ALR" ||
	                sKbType == "ALCR" ||
	                sKbType == "DG" ||
	                sKbType == "DGD" ||
	                sKbType == "DGT" ||
	                sKbType == "DGDT");
	    },

	    _isValidField: function(oField) {
	        if (!$isNoU(oField)) {
	            if (!$isNoU(oField["name"]) && oField["name"].is(String) && oField["name"].length) {
	                if (!$isNoU(oField["mask"]) && oField["mask"].is(String) && oField["mask"].length) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },

	    _getFields: function(aFields) {
	        var aResult = [];
	        if (!$isNoU(aFields) && aFields.length) {
	            for (var i = 0; i < aFields.length; i++) {
	                if (this._isValidField(aFields[i])) {
	                    aResult.push(aFields[i]);
	                }
	            }
	        }
	        return aResult;
	    },

	    _prepareTemplate: function() {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
                    '<div id="' + this._sInstance + '_fields_place"></div>' +
                    '<div id="' + this._sInstance + '_kb_place" style="width: 100%; height: 200px;></div>';
	            insertContent(this._sPlace, sContent);
	        }
	    },

	    _paint: function() {
	        this._prepareTemplate();
	        this._renderFields(this._sInstance + "_fields_place");
	        this._renderKeyboard(this._sInstance + "_kb_place");
	    },

	    _renderFields: function(sPlace) {
	        var sContent = "";
	        var oFld = null;
	        var aFldTbl = [];
	        for (var i = 0; i < this._aFields.length; i++) {
	            if (!$bool(this._aFields[i]["nobr"])) {
	                aFldTbl.push([this._aFields[i]]);
	            }
	            else {
	                if (aFldTbl.length)
	                    aFldTbl.last().push(this._aFields[i]);
	                else
	                    aFldTbl.push([this._aFields[i]]);
	            }
	        }
	        for (var i = 0; i < aFldTbl.length; i++) {
	            sContent +=
                    '<div>' +
                    '  <table cellpadding="0" cellspacing="0" border="0">' +
                    '    <tr>';
	            for (var j = 0; j < aFldTbl[i].length; j++) {
	                sContent +=
                        '  <td id="' + (this._sInstance + '_fld_' + aFldTbl[i][j]["name"] + "_place") + '" valign="top"></td><td style="width: 10px;"></td>';
	            }
	            sContent +=
                    '    </tr>';
	            if (i < aFldTbl.length - 1) {
	                sContent +=
	                    '<tr><td style="height: 30px;">&nbsp;</td></tr>';
	            }
	            sContent +=
	                '  </table>' +
                    '</div>';
	        }
	        insertContent(sPlace, sContent);
	        for (var i = 0; i < this._aFields.length; i++) {
	            oFld = new CField(
	                this,
	                ('_fld_' + this._aFields[i]["name"]),
	                (this._sInstance + '_fld_' + this._aFields[i]["name"] + "_place"),
	                this._aFields[i]);
	            oFld.attachListener("onFieldFull",
	                $delegate(this, this._onFieldFull));
	            oFld.attachListener("onFieldEmpty",
	                $delegate(this, this._onFieldEmpty));
	            oFld.attachListener("onValid",
	                $delegate(this, this._onFieldValid));
	            oFld.attachListener("onClick",
	                $delegate(this, this._onFieldClick));
	            this._aFldObjects.push(oFld);
	            oFld.render();
	            if (i == 0) {
	                oFld.setActive(true);
	            }
	        }
	    },

	    _getFirstNoFullField: function() {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            if (!this._aFldObjects[i].isFull()) {
	                return i;
	            }
	        }
	        return -1;
	    },
	    
	    _getLengthFields: function() {
	        var aArr = [];
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            aArr[i] = this._aFldObjects[i].getValue();
	        }
	        return aArr;
	    },

	    _getLastNoEmptyField: function() {
	        for (var i = this._aFldObjects.length - 1; i >= 0; i--) {
	            if (!this._aFldObjects[i].isEmpty()) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _onFieldFull: function(sender, eargs) {
	        if (eargs.isFull) {
	            var nFld = this._getFirstNoFullField();
	            if (nFld > -1) {
	                this._aFldObjects[this._nCurrentField].setActive(false);
	                this._nCurrentField = nFld;
	                this._aFldObjects[this._nCurrentField].setActive(true);
	            }
	            else {
	                this._aFldObjects[this._nCurrentField].setActive(false);
	                this._nCurrentField = this._aFldObjects.length - 1;
	                this._aFldObjects[this._nCurrentField].setActive(true);
	            }
	        }
	    },

	    _onFieldEmpty: function(sender, eargs) {
	        if (eargs.isEmpty) {
	            var nFld = this._getLastNoEmptyField();
	            if (nFld > -1) {
	                this._aFldObjects[this._nCurrentField].setActive(false);
	                this._nCurrentField = nFld;
	                this._aFldObjects[this._nCurrentField].setActive(true);
	            }
	            else {
	                this._aFldObjects[this._nCurrentField].setActive(false);
                    this._nCurrentField = 0;
                    this._aFldObjects[this._nCurrentField].setActive(true);
	            }
	        }
	    },

	    _onFieldValid: function(sender, eargs) {
	        if (eargs.isValid && this.isValid()) {
	            this.notify("onStateChange", { isValid: true });
	        }
	        else {
	            this.notify("onStateChange", { isValid: false });
	        }
	    },

	    _onFieldClick: function(sender, eargs) {
	        var nFld = this._getFieldNumber(sender);
	        if (nFld > -1) {
	            this._nCurrentField = nFld;
	            for (var i = 0; i < this._aFldObjects.length; i++) {
	                if (i != nFld) {
	                    this._aFldObjects[i].setActive(false);
	                }
	            }
	        }
	    },
	    
	    
	    _renderKeyboard: function(sPlace) {
	        if (!$isNoU($(sPlace))) {
	            switch (this._sKbType) {
	                case "AL":
	                    this._oKeyboard = new CALKeyboard(this, "kb", sPlace);
	                    break;
	                case "ALR":
	                    this._oKeyboard = new CALKeyboard(this, "kb", sPlace, null, true);
	                    break;
	                case "ALC":
	                    this._oKeyboard = new CALKeyboard(this, "kb", sPlace, null, false, true);
	                    break;
	                case "ALCR":
	                    this._oKeyboard = new CALKeyboard(this, "kb", sPlace, null, true, true);
	                    break;
	                case "DG":
	                    this._oKeyboard = new CDigitalKeyboard(this, "kb", sPlace);
	                    break;
	                case "DGT":
	                    this._oKeyboard = new CDigitalKeyboardT(this, "kb", sPlace);
	                    break;
	                case "DGD":
	                    this._oKeyboard = new CDigitalKeyboardD(this, "kb", sPlace);
	                    break;
	                case "DGDT":
	                    this._oKeyboard = new CDigitalKeyboardDT(this, "kb", sPlace);
	                    break;
	                default:
	                    document.location.href = "./index.html";
	                    return;
	            }
	            if (!$isNoU(this._oKeyboard)) {
	                this._oKeyboard.attachListener("onKeyPress", $delegate(this, this._kbKeyPressed));
	                this._oKeyboard.create();
	                this._oKeyboard.render();
	            }
	        }
	    },

	    _getFieldNumber: function(oFld) {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            if (this._aFldObjects[i] == oFld) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _changeField: function(sDirection) {
	        if (sDirection == "NEXT") {
	            if (this._nCurrentField >= 0 &&
	            this._nCurrentField < this._aFldObjects.length - 1) {
	                this._aFldObjects[this._nCurrentField].deactivate();
	                this._aFldObjects[this._nCurrentField + 1].activate("FIRST");
	                this._nCurrentField++;
	            }
	            else if (this._nCurrentField == this._aFldObjects.length - 1) {
	                var nNextFld = this._getFirstNoFullField();
	                if (nNextFld > -1) {
	                    if (this._nCurrentField != nNextFld) {
	                        this._aFldObjects[this._nCurrentField].deactivate();
	                        this._aFldObjects[nNextFld].activate("FIRST");
	                        this._nCurrentField = nNextFld;
	                    }
	                }
	            }
	        }
	        else if (sDirection == "PREVIOUS") {
	            if (this._nCurrentField > 0) {
	                this._aFldObjects[this._nCurrentField].deactivate();
	                this._aFldObjects[this._nCurrentField - 1].activate("LAST");
	                this._nCurrentField--;
	            }
	        }
	    },

	    _getLastValidField: function() {
	        for (var i = this._aFldObjects.length - 1; i >= 0; i--) {
	            if (this._aFldObjects[i].isValid()) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _fieldStatusChange: function(sender, eargs) {
	        if (eargs.isValid) {
	            if (sender.isFull()) {
	                this._changeField("NEXT");
	            }
	        }
	        else {
	            if (sender.isEmpty()) {
	                this._changeField("PREVIOUS");
	            }
	        }
	    },

	    _fieldSelected: function(sender, eargs) {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            if (this._aFldObjects[i] != sender) {
	                this._aFldObjects[i].deactivate();
	            }
	        }
	        this._nCurrentField = this._getFieldNumber(sender);
	    },

	    _kbKeyPressed: function(sender, eargs) {
	        switch (eargs.key) {
	            case "CLEAR":
	                this._nCurrentField = 0;
	                this._aFldObjects = [];
	                this._renderFields(this._sInstance + "_fields_place");
	                break;
	            default:
	                this._aFldObjects[this._nCurrentField].processValue(eargs.key);
	                break;
	        }
	    },

	    getFields: function() {
	        return this._aFldObjects;
	    },

	    isValid: function() {
	        for (var i = 0; i < this._aFldObjects.length; i++) {
	            if (!this._aFldObjects[i].isValid()) {
	                return false;
	            }
	        }
	        return true;
	    }
	}
);

	CDGInputTab = createClass
(
	CInputTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields) {
	        CDGInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields);
	    },

	    _prepareTemplate: function() {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);

	        var providerElement;
	        if (this._sLogo.length) {
	            providerElement = '<div style="background-image: url(./img/ui_item/' + getFileName(this._sLogo) + ')"></div>';
	        }
	        else {
	            providerElement = this._sPrvName;
	        }

	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="1240" height="100%" style="position: relative; left: 20px">' +
	                '  <tr>' +
	                '    <td style="width: 100%;" align="center" valign="top">' +
	                '      <table cellpadding="0" cellspacing="0" border="0">' +
	                '        <tr>' +
	                '          <td align="left" valign="middle" width="310" height="100%">' +
	                '            <table cellpadding="0" cellspacing="0" border="0">' +
	                '              <tr>' +
	                '                <td align="center" valign="middle" class="provider-element">' +
	                			getProviderButton(this._sPrvName, this._sLogo) +
	                '                </td>' +
	                '              </tr>' +
	                '            </table>' +
	                '          </td>' +
	                '          <td id="' + this._sInstance + '_fields_place" align="center" valign="top"></td>' +
                    	'          <td valign="middle"><div id="' + this._sInstance + '_bs" style="width: 301px; height: 121px;"></div></td>' +
	                '        </tr>' +
	                '      </table>' +
	                '    </td>' +
	                '  </tr>' +
	                '  <tr>' +
	                '    <td id="' + this._sInstance + '_kb_place" align="center"></td>' +
	                '  </tr>' +
	                '</table>';
	            insertContent(this._sPlace, sContent);
	            cntrProviderButton();
	        }
	    },

	    _paint: function() {
	        CDGInputTab.base._paint.apply(this, arguments);
	        this._renderBS(this._sInstance + "_bs");
	    },

	    _renderBS: function(sPlace) {


	        var sLang = storage.get("language");


	   
	            var oBtn = new CImageButton(this, "bs_btn", sPlace, "BACKSPACE", "./img/ui/delbtn_press_" + sLang + ".gif", "./img/ui/delbtn_" + sLang + ".gif");
	            oBtn.attachListener("onClick", $delegate(this, this._kbKeyPressed));
	            oBtn.create();
	            oBtn.render();

	      
	  
	    }
	}
);

	CALInputTab = createClass
(
	CInputTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields) {
	        CDGInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields);
	    },

	    _prepareTemplate: function() {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
			
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr>' +
	                '    <td style="width: 100%; height: 100%" align="center" valign="middle">' +
	                '      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 5px">' +
	                '        <tr>' +
	                '          <td align="left" valign="middle" width="310" height="100%">' +
	                '            <table cellpadding="0" cellspacing="0" border="0">' +
	                '              <tr>' +
	                '                <td align="center" valign="middle" class="provider-element">' +
	                			getProviderButton(this._sPrvName, this._sLogo) +
	                '                </td>' +
	                '              </tr>' +
	                '            </table>' +
	                '          </td>' +
	                '          <td id="' + this._sInstance + '_fields_place" align="center" valign="top"></td>' +
                    '          <td valign="middle"><div id="' + this._sInstance + '_bs" style="width: 301px; height: 121px;"></div></td>' +
	                '        </tr>' +
	                '      </table>' +
	                '    </td>' +
	                '  </tr>' +
	                '  <tr>' +
	                '    <td id="' + this._sInstance + '_kb_place" align="center"></td>' +
	                '  </tr>' +
	                '</table>';
	            insertContent(this._sPlace, sContent);
	            cntrProviderButton();
	        }
	    },

	    _paint: function () {
	        CDGInputTab.base._paint.apply(this, arguments);
	        this._renderBS(this._sInstance + "_bs");
	    },

	    _renderBS: function(sPlace) {


	    var sLang = storage.get("language");


	    	        var oBtn = new CImageButton(this, "bs_btn", sPlace, "BACKSPACE", "./img/ui/delbtn_press_" + sLang + ".gif", "./img/ui/delbtn_" + sLang + ".gif");
	        oBtn.attachListener("onClick", $delegate(this, this._kbKeyPressed));
	        oBtn.create();
	        oBtn.render();
	    }
	}
);

    PSCInputTab = createClass
(
	CInputTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields) {
	        PSCInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
	        this._aFields = this._getFields(aFields);
	        if (!this._aFields.length) {
	            document.location.href = "./index.html";
	        }
	        this._nCurrentField = 0;
	        this._aFldObjects = [];
	        this._sKbType = "AL";
	        if (this._isValidKb(sKbType)) {
	            this._sKbType = sKbType;
	        }
	        this._sPrvName = "";
	        if (!$isNoU(sPrvName) && sPrvName.is(String)) {
	            this._sPrvName = sPrvName;
	        }
	        this._sLogo = "";
	        if (!$isNoU(sLogo) && sLogo.is(String)) {
	            this._sLogo = sLogo;
	        }
	        this._oKeyboard = null;
	    },
	    
	    _paint: function() {
	        PSCInputTab.base._paint.call(this);
	    },
	    
	    _getNextField: function(sender, eargs) {
            var nFld = this._getFieldNumber(sender);
            var nFldLast = this._aFldObjects.length - 1;
            var oFld = this._aFldObjects[nFld];
	        if (nFld == nFldLast) {
	            nFld = 0;
	            this._nCurrentField = nFld;
	            for (var i = 0; i < this._aFldObjects.length; i++) {
	                if (i != nFld) {
	                    this._aFldObjects[i].setActive(false);
	                }
	                else
	                    this._aFldObjects[i].setActive(true);
	            }
	        }
	        else if ((nFld == 0) || (oFld._aBlocks.length == 1)) {
	            nFld++;
	            this._nCurrentField = nFld;
	            for (var i = 0; i < this._aFldObjects.length; i++) {
	                if (i != nFld) {
	                    this._aFldObjects[i].setActive(false);
	                }
	                else
	                    this._aFldObjects[i].setActive(true);
	            }
	            
	        }
        },
	    
	    _renderFields: function(sPlace) {
	        var sContent = "";
	        var oFld = null;
	        var aFldTbl = [];
	        for (var i = 0; i < this._aFields.length; i++) {
	            if (!$bool(this._aFields[i]["nobr"])) {
	                aFldTbl.push([this._aFields[i]]);
	            }
	            else {
	                if (aFldTbl.length)
	                    aFldTbl.last().push(this._aFields[i]);
	                else
	                    aFldTbl.push([this._aFields[i]]);
	            }
	        }
	        for (var i = 0; i < aFldTbl.length; i++) {
	            sContent +=
                    '<div>' +
                    '  <table cellpadding="0" cellspacing="0" border="0">' +
                    '    <tr>';
	            for (var j = 0; j < aFldTbl[i].length; j++) {
	                sContent +=
                        '  <td id="' + (this._sInstance + '_fld_' + aFldTbl[i][j]["name"] + "_place") + '" valign="top"></td><td style="width: 10px;"></td>';
	            }
	            sContent +=
                    '    </tr>';
	            if (i < aFldTbl.length - 1) {
	                sContent +=
	                    '<tr><td style="height: 30px;">&nbsp;</td></tr>';
	            }
	            sContent +=
	                '  </table>' +
                    '</div>';
	        }
	        insertContent(sPlace, sContent);
	        for (var i = 0; i < this._aFields.length; i++) {
	            oFld = new CFieldPS(
	                this,
	                ('_fld_' + this._aFields[i]["name"]),
	                (this._sInstance + '_fld_' + this._aFields[i]["name"] + "_place"),
	                this._aFields[i]);
	            oFld.attachListener("onFieldFull",
	                $delegate(this, this._onFieldFull));
	            oFld.attachListener("onFieldEmpty",
	                $delegate(this, this._onFieldEmpty));
	            oFld.attachListener("onValid",
	                $delegate(this, this._onFieldValid));
	            oFld.attachListener("onClick",
	                $delegate(this, this._onFieldClick));
	            oFld.attachListener("onTabClick",
	                $delegate(this, this._getNextField));
	            this._aFldObjects.push(oFld);
	            oFld.render();
	            if (i == 0) {
	                oFld.setActive(true);
	            }
	        }
	    }
	}
);


	PSInputTab = createClass
(
	PSCInputTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields) {
	        CDGInputTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId, sPrvName, sLogo, sKbType, aFields);
	    },

	    _prepareTemplate: function() {
	        var sContent = "";
	        CInputTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr>' +
	                '    <td style="width: 100%; height: 100%" align="center" valign="top">' +
	                '      <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">' +
	                '        <tr>' +
	                '          <td id="' + this._sInstance + '_fields_place" align="center" valign="top"></td>' +
                    '          <td valign="top" width="320" align="right"><div id="' + this._sInstance + '_bs" style="width: 301px; height: 121px; margin-top: 10px;"></div></td>' +
	                '        </tr>' +
	                '      </table>' +
	                '    </td>' +
	                '  </tr>' +
	                '  <tr>' +
	                '    <td id="' + this._sInstance + '_kb_place" align="center" style="padding: 15px 0"></td>' +
	                '  </tr>' +
	                '</table>';
	            insertContent(this._sPlace, sContent);
	        }
	    },

	    _paint: function () {
	        CDGInputTab.base._paint.apply(this, arguments);
	        this._renderBS(this._sInstance + "_bs");
	    },

	    _renderBS: function(sPlace) {

	    var sLang = storage.get("language");

	    var oBtn = new CImageButton(this, "bs_btn", sPlace, "BACKSPACE", "./img/ui/delbtn_press_" + sLang + ".gif", "./img/ui/delbtn_" + sLang + ".gif");
	        oBtn.attachListener("onClick", $delegate(this, this._kbKeyPressed));
	        oBtn.create();
	        oBtn.render();
	        this._initDate();
	    },
	    
	    _initDate: function() {
	        var oDate = new Date();
            var sDate = oDate.getDate().toString();
            var sMonth = (oDate.getMonth() + 1).toString();
            var sYear = oDate.getFullYear().toString();
            var oKb = new CALKeyboard();

            if (sDate.length == 1) {
                sDate = '0' + sDate;
            }

            if (sMonth.length == 1) {
                sMonth = '0' + sMonth;
            }
            
            oKb.attachListener("onKeyPress", $delegate(this, this._kbKeyPressed));
            
            oKb.keyPress('TAB');
            oKb.keyPress('TAB');

            for (var i = 0; i < sDate.length; i++) {
                oKb.keyPress(sDate.charAt(i));
            }

            for (var i = 0; i < sMonth.length; i++) {
                oKb.keyPress(sMonth.charAt(i));
            }

            for (var i = 0; i < sYear.length; i++) {
                oKb.keyPress(sYear.charAt(i));
            }
	    }
	}
);


	CBtnTab = createClass
(
	CTab,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, aButtons) {
	        CBtnTab.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId);
	        this._oButtons = this._getButtons(aButtons);
	        if (!$sizeOf(this._oButtons)) {
	            document.location.href = "./index.html";
	        }
	        this._bIsListenersModified = false;
	        this._nRows = 4;
	        this._nColumns = 5;
	        this._nStartIdx = 1;
	        this._oDisplayButtons = {};
	        this._choiceDisplayButtons(this._nStartIdx);
	        this._aSavedLeftBtnClick = [];
	        this._aSavedRightBtnClick = [];
	    },

	    _getButtons: function(aButtons) {
	        var oResult = {};
	        if (!$isNoU(aButtons) && aButtons.is(Array)) {
	            for (var i = 0; i < aButtons.length; i++) {
	                if (!$isNoU(aButtons[i]) &&
	                    ((!$isNoU(aButtons[i]["altName"]) &&
	                    aButtons[i]["altName"].is(String) &&
	                    aButtons[i]["altName"].length) ||
	                    (!$isNoU(aButtons[i]["img"]) &&
	                    aButtons[i]["img"].is(String) &&
	                    aButtons[i]["img"].length)) &&
	                    aButtons[i]["pageId"].is(String) &&
	                    /^\d+$/.test(aButtons[i]["pageId"])) {
	                    oResult[aButtons[i]["pageId"]] = aButtons[i];
	                }
	            }
	        }
	        return oResult;
	    },

	    _paint: function() {
	        var nCounter = 1;
	        var oBtn = null;
	        var sTable = "";
	        var nDispBtnCount = $sizeOf(this._oDisplayButtons);
	        var nBtnCount = $sizeOf(this._oButtons);
	        CBtnTab.base._paint.apply(this, arguments);
	        if (!$isNoU($(this._sPlace))) {
	            sTable =
	                '<table cellpadding="5" cellspacing="0" border="0" width="100%" height="100%">';
	            for (var i = 1; i <= this._nRows; i++) {
	                sTable +=
	                '  <tr>';
	                for (var j = 1; j <= this._nColumns; j++) {
	                    sTable +=
	                    '<td id="' + (this._sInstance + '_btn_' + (j + ((i - 1) * this._nColumns))) + '" width="' + (100 / this._nColumns) + '%" height="' + (100 / this._nRows) + '%" align="center" valign="top"></td>';
	                }
	                sTable +=
	                '  </tr>';
	            }
	            sTable +=
	                '</table>';
	            insertContent(this._sPlace, sTable);
	            for (var f in this._oButtons) {
	                if (this._oDisplayButtons.hasOwnProperty(f)) {
	                    oBtn = new CElementButton(this, ("btn_" + nCounter.toString(10)),
	                        this._sInstance + '_btn_' + nCounter.toString(10), f,
	                        this._oDisplayButtons[f]["altName"], this._oDisplayButtons[f]["img"]);
	                    oBtn.attachListener("onClick",
	                        $delegate(this, $callback(this._btnClicked, this._oDisplayButtons[f])));
	                    oBtn.render();
	                    nCounter++;
	                }
	            }
	        }
	        if (nDispBtnCount < nBtnCount) {
	            if (nDispBtnCount == (this._nRows * this._nColumns)) {
	                this._bIsListenersModified = true;
	                this._aSavedLeftBtnClick =
	                    this.getParent().getLeftBtmBtn().detachListener("onClick");
	                this._aSavedRightBtnClick =
	                    this.getParent().getRightBtmBtn().detachListener("onClick");
	                this.getParent().getLeftBtmBtn().attachListener("onClick", $delegate(this, this._backButtonClick));
	                this.getParent().getRightBtmBtn().attachListener("onClick", $delegate(this, this._nextButtonClick));
	                this.getParent().getLeftBtmBtn().setEnabled(true);
	                this.getParent().getRightBtmBtn().setEnabled(true);
	            }
	            else {
	                this.getParent().getRightBtmBtn().setEnabled(false);
	            }
	        }
	        else {
	            this.getParent().getRightBtmBtn().setEnabled(false);
	        }
	    },

	    show: function(bShow) {
	        CBtnTab.base.show.apply(this, arguments);
	        if (bShow) {
	            this._paint();
	        }
	    },

	    _choiceDisplayButtons: function(nStartIdx) {
	        var nCounter = 1;
	        var nAddedButtons = 0;
	        this._oDisplayButtons = {};
	        for (var f in this._oButtons) {
	            if (this._oButtons.hasOwnProperty(f)) {
	                if (nCounter >= nStartIdx && nCounter <= (nStartIdx + (this._nRows * this._nColumns))) {
	                    if (nAddedButtons < (this._nRows * this._nColumns)) {
	                        this._oDisplayButtons[f] = this._oButtons[f];
	                        nAddedButtons++;
	                    }
	                    else {
	                        break;
	                    }
	                }
	                nCounter++;
	            }
	        }
	    },

	    _restoreListiners: function() {
	        this.getParent().getLeftBtmBtn().detachListener("onClick");
	        this.getParent().getRightBtmBtn().detachListener("onClick");
	        for (var i = 0; i < this._aSavedLeftBtnClick.length; i++) {
	            this.getParent().getLeftBtmBtn().attachListener("onClick", this._aSavedLeftBtnClick[i]);
	        }
	        for (var i = 0; i < this._aSavedRightBtnClick.length; i++) {
	            this.getParent().getRightBtmBtn().attachListener("onClick", this._aSavedRightBtnClick[i]);
	        }
	    },

	    _btnClicked: function(sender, eargs, extParam) {
	        var oArgs = {};
	        oArgs["pageId"] = eargs.value;
	        if (!$isNoU(extParam)) {
	            for (var f in extParam) {
	                if (extParam.hasOwnProperty(f)) {
	                    oArgs[f] = extParam[f];
	                }
	            }
	        }
	        if (this._bIsListenersModified) {
	            this._restoreListiners();
	        }
	        this.notify("onClick", oArgs);
	    },

	    _nextButtonClick: function(sender, eargs) {
	        this._nStartIdx += (this._nRows * this._nColumns);
	        this._choiceDisplayButtons(this._nStartIdx);
	        this._paint();
	    },

	    _backButtonClick: function(sender, eargs) {
	        if (this._nStartIdx > 1) {
	            this._nStartIdx -= (this._nRows * this._nColumns);
	            this._choiceDisplayButtons(this._nStartIdx);
	            this._paint();
	        }
	        else {
	            this._restoreListiners();
	            this.notify("onBtmMenuClick", { value: "BACK", sender: sender, eargs: eargs });
	        }
	    }
	}
);

function getProviderButton(title, image)
{
	return '<div class="provider-button" id="providerButton"><div style="background-image: url(\'./img/ui_item/' + image + '\')"></div><p>' + title + '</p></div>';
};
function cntrProviderButton()
{
	var el = $('providerButton').getElementsByTagName('p')[0];
	el.innerHTML = autohyphen.hyphenizeText(el.innerHTML);
	el.style.marginTop = (el.parentNode.clientHeight - el.clientHeight) / 2 + 'px';
};














