CFieldChunk = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sRegExp, nMinLength, nMaxLength, bIsIndividual) {
	        var args = { "0": arguments["3"], "1": arguments["4"], "2": arguments["5"] };
	        Function.validateParams(args, [
                { name: "sRegExp", type: String },
                { name: "nMinLength", type: Number },
                { name: "nMaxLength", type: Number }
            ]);
	        CFieldChunk.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sRegExp = $is(sRegExp, RegExp) ? sRegExp : new RegExp(sRegExp);
	        this._nMinLength = nMinLength;
	        this._nMaxLength = nMaxLength;
	        if (nMinLength < 0) {
	            this._nMinLength = 0;
	        }
	        if (nMaxLength < 0) {
	            this._nMaxLength = 0;
	        }
	        if (this._nMaxLength < this._nMinLength) {
	            this._nMaxLength += this._nMinLength;
	            this._nMinLength = this._nMaxLength - this._nMinLength;
	            this._nMaxLength = this._nMaxLength - this._nMinLength;
	        }
	        this._nWidthCoefficient = 30;
	        this._sValue = "";
	        this._bIsActive = false;
	        this._bIsIndividual = $bool(bIsIndividual);
	    },

	    _paint: function() {
	        var sContent = "";
	        sContent +=
                '<input id="' + this._sInstance + '_place" class="field_chunk w_100" value="' + this.getValue() + '" />';
	        insertContent(this._sPlace, sContent);
	        this._validate();
	    },

	    _validate: function() {
	        this.notify("onValid", { isValid: this.isValid() });
	    },

	    isValid: function() {
	        return ((this.getValue().length >= this._nMinLength) &&
	                (this.getValue().length <= this._nMaxLength) &&
	                this._sRegExp.test(this.getValue()));
	    },

	    isEmpty: function() {
	        return (!this.getValue().length);
	    },

	    isFull: function() {
	        return (this.getValue().length >= this._nMaxLength);
	    },

	    getValue: function() {
	        return this._sValue.replace(/\\/g, "\\\\").replace(new RegExp("\"", "g"), "''");
	    },

	    setValue: function(sValue) {
	        sValue = String(sValue);
	        if ((this._sRegExp.test(sValue) && sValue.length <= this._nMaxLength) ||
	            !sValue.length) {
	            this._sValue = sValue;
	        }
	        this._paint();
	    }
	}
);

CDIFieldChunk = createClass
(
	CFieldChunk,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sRegExp, nMinLength, nMaxLength, bIsIndividual) {
	        var args = { "0": arguments["3"], "1": arguments["4"], "2": arguments["5"] };
	        Function.validateParams(args, [
                { name: "sRegExp", type: String },
                { name: "nMinLength", type: Number },
                { name: "nMaxLength", type: Number }
            ]);
	        CDIFieldChunk.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sRegExp = $is(sRegExp, RegExp) ? sRegExp : new RegExp(sRegExp);
	        this._nMinLength = nMinLength;
	        this._nMaxLength = nMaxLength;
	        if (nMinLength < 0) {
	            this._nMinLength = 0;
	        }
	        if (nMaxLength < 0) {
	            this._nMaxLength = 0;
	        }
	        if (this._nMaxLength < this._nMinLength) {
	            this._nMaxLength += this._nMinLength;
	            this._nMinLength = this._nMaxLength - this._nMinLength;
	            this._nMaxLength = this._nMaxLength - this._nMinLength;
	        }
	        this._nWidthCoefficient = 25;
	        this._sValue = "";
	        this._bIsActive = false;
	        this._bIsIndividual = $bool(bIsIndividual);
	    },

	    _paint: function() {
	        var sContent = "";
	        sContent +=
	        insertContent(this._sPlace, sContent)
	        this._validate();
	    }
	}
);

	CFieldBlock = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, aChunks) {
	        CFieldBlock.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._bIsActive = false;
	        this._adChunks = [];
	        this._aChunks = [];
	        if (!$isNoU(aChunks) && aChunks.is(Array)) {
	            this._aChunks = aChunks;
	        }
	        this._sType = this._getType();
	        this._sTableId = this._sInstance + "_table";
	        this._nActiveChunk = -1;
	        this._nWidthCoefficient = 10;
	    },

	    _getType: function() {
	        if (this._aChunks.length == 1) {
	            if (this._aChunks[0].type == "STATIC_FRAMED") {
	                return "SINGLE_FRAMED";
	            }
	            else if (this._aChunks[0].type == "STATIC") {
	                return "SINGLE_STATIC";
	            }
	            else if (this._aChunks[0].type == "DYNAMIC") {
	                return "SINGLE_DYNAMIC";
	            }
	        }
	        else if (this._aChunks.length > 1) {
	            return "MULTI";
	        }
	        return "EMPTY";
	    },

	    _paint: function() {
	        this._adChunks = [];
	        var oPlace = $(this.getPlaceId());
	        var sContent = "";
	        if (this._aChunks.length) {
	            sContent +=
                    '<table id="' + this._sTableId + '" cellpadding="0" cellspacing="0" width="100%" border="0">' +
                    '  <tr>';
	            if (this._sType != "SINGLE_STATIC") {
	                sContent +=
	                    '<td align="center" style="width: 28px; height: 95px; background: url(\'./img/ui/field/l.gif\');"></td>';
	            }
	            for (var i = 0; i < this._aChunks.length; i++) {
	                if (this._sType == "SINGLE_FRAMED" || this._sType == "SINGLE_STATIC") {
	                    sContent +=
	                    '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="center" style="' + ((this._sType == "SINGLE_FRAMED") ? 'background: url(\'./img/ui/field/c.gif\') repeat-x;' : 'background: none;') + '">' + this._aChunks[i].value + '</td>';
	                }
	                else if (this._sType == "SINGLE_DYNAMIC") {
	                    sContent +=
	                    '<td id="' + this._sInstance + '_td" class="field_chunk" align="center" style="background: url(\'./img/ui/field/c.gif\') repeat-x;"><div id="' + this._sInstance + '_chunk_' + i + '_place" style="width: ' + (this._aChunks[i].maxLength * this._nWidthCoefficient) + 'px; overflow: hidden;"></div></td>';
	                }
	                else if (this._sType == "MULTI") {
	                    if (this._aChunks[i].type == "STATIC") {
	                        sContent +=
	                        '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="center" style="width: ' + (this._aChunks[i].value.length * this._nWidthCoefficient) + 'px; background: url(\'./img/ui/field/c.gif\') repeat-x;"></td>';
	                        this._aChunks[i]["place"] = this._sInstance + "_chunk_" + i + "_place";
	                    }
	                    else if (this._aChunks[i].type == "DYNAMIC") {
	                        sContent +=
	                        '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="left" style="width: ' + (this._aChunks[i].maxLength * this._nWidthCoefficient) + 'px; background: url(\'./img/ui/field/c.gif\') repeat-x;"><div id="' + this._sInstance + '_chunk_' + i + '_place" style="width: ' + (this._aChunks[i].maxLength * this._nWidthCoefficient) + 'px; overflow: hidden;"></div></td>';
	                    }
	                }
	            }
	            if (this._sType != "SINGLE_STATIC") {
	                sContent +=
	                    '<td style="width: 28px; height: 95px; background: url(\'./img/ui/field/r.gif\');"></td>';
	            }
	            sContent +=
	                '  </tr>' +
                    '</table>';
	            insertContent(this.getPlaceId(), sContent);
	            for (var i = 0; i < this._aChunks.length; i++) {
	                if (this._aChunks[i].type == "DYNAMIC") {
	                    var oChunk = new CFieldChunk(
                                        this,
                                        "chunk_" + i,
                                        this._sInstance + "_chunk_" + i + "_place",
                                        this._aChunks[i].regExp,
                                        this._aChunks[i].minLength,
                                        this._aChunks[i].maxLength);
	                    oChunk["idx"] = i;
	                    oChunk.attachListener("onValid", $delegate(this, this._onChunkValid));
	                    this._adChunks.push(oChunk);
	                    oChunk.render();
	                }
	            }
	            if (this._adChunks.length) {
	                this._nActiveChunk = 0;
	            }
	            if (this._sType != "SINGLE_STATIC" && this._sType != "SINGLE_FRAMED") {
	                oPlace.childNodes[0].onclick = $delegate(this, this._onClick);
	            }
	            this._setOpacity();
	        }
	    },

	    _onChunkValid: function(sender, eargs) {
	        this._setOpacity();
	        this.notify("onBlockValid", { isValid: eargs.isValid });
	        if (eargs.isValid) {
	            this.notify("onBlockFull", { isFull: this.isFull() });
	        }
	        else {
	            this.notify("onBlockEmpty", { isEmpty: this.isEmpty() });
	        }
	    },

	    _getLastNoEmptyChunk: function() {
	        for (var i = this._adChunks.length - 1; i >= 0; i--) {
	            if (!this._adChunks[i].isEmpty()) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _getFirstNoFullChunk: function() {
	        for (var i = 0; i < this._adChunks.length; i++) {
	            if (!this._adChunks[i].isFull()) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _getActiveChunkByIdx: function(nIdx) {
	        for (var i = 0; i < this._adChunks.length; i++) {
	            if (this._adChunks[i].idx == nIdx) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _setOpacity: function() {
	        if (this.isValid()) {
	            setOpacity(this._sTableId, 100);
	        }
	        else {
	            setOpacity(this._sTableId, 100);
	        }
	    },

	    _onClick: function() {
	        this.notify("onClick");
	    },

	    isValid: function() {
	        for (var i = 0; i < this._adChunks.length; i++) {
	            if (!this._adChunks[i].isValid()) {
	                return false;
	            }
	        }
	        return true;
	    },

	    isEmpty: function() {
	        for (var i = 0; i < this._adChunks.length; i++) {
	            if (!this._adChunks[i].isEmpty()) {
	                return false;
	            }
	        }
	        return true;
	    },

	    isActive: function() {
	        return this._bIsActive;
	    },

	    isFull: function() {
	        for (var i = 0; i < this._adChunks.length; i++) {
	            if (!this._adChunks[i].isFull()) {
	                return false;
	            }
	        }
	        return true;
	    },

	    isDynamic: function() {
	        return $bool(this._adChunks.length);
	    },

	    setActive: function(bIsActive) {
	        var nTemp = -1;
	        var aTds = $(this._sTableId).getElementsByTagName("TD");
	        this._bIsActive = $bool(bIsActive);
	        if (bIsActive) {
	            nTemp = this._getFirstNoFullChunk();
	            if (nTemp == -1) {
	                nTemp = this._getLastNoEmptyChunk();
	            }
	            this._nActiveChunk = nTemp;
                for (var i = 0; i < aTds.length; i++) {
                    aTds[i].style.background =
                    aTds[i].style.background.replace("l.gif", "l_a.gif");
                    aTds[i].style.background =
                    aTds[i].style.background.replace("c.gif", "c_a.gif");
                    aTds[i].style.background =
                    aTds[i].style.background.replace("r.gif", "r_a.gif");
                }
	        }
	        else {
	            if (!this.getParent().isOneBlock()) {
	                for (var i = 0; i < aTds.length; i++) {
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("l_a.gif", "l.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("c_a.gif", "c.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("r_a.gif", "r.gif");
	                }
	            }
	            else {
	                for (var i = 0; i < aTds.length; i++) {
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("l_a.gif", "l.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("c_a.gif", "c.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("r_a.gif", "r.gif");
	                }
	            } 
	        }
	    },

	    getValue: function(bStrip) {
	        var bStrip = $bool(bStrip);
	        var sResult = "";
	        var nIdx = -1;
	        for (var i = 0; i < this._aChunks.length; i++) {
	            if (this._aChunks[i].type == "DYNAMIC") {
	                nIdx = this._getActiveChunkByIdx(i);
	                if (nIdx > -1) {
	                    sResult += this._adChunks[nIdx].getValue();
	                }
	            }
	            else if (this._aChunks[i].type == "STATIC" ||
	                     this._aChunks[i].type == "STATIC_FRAMED") {
	                if (!bStrip) {
	                    sResult += this._aChunks[i].value;
	                }
	            }
	        }
	        return sResult;
	    },

	    getMinLength: function() {
	        return this._nMinLength;
	    },

	    getMaxLength: function() {
	        return this._nMaxLength;
	    },

	    _validate: function() {

	    },

	    processValue: function(sValue) {
	        switch (sValue) {
	            case "BACKSPACE":
	                if (!$isNoU(this._adChunks[this._nActiveChunk])) {
	                    this._adChunks[this._nActiveChunk].setValue(
	                        this._adChunks[this._nActiveChunk].getValue().substr(0, this._adChunks[this._nActiveChunk].getValue().length - 1));
	                }
	                if (this._adChunks[this._nActiveChunk].isEmpty()) {
	                    var nPrevChunk = this._getLastNoEmptyChunk();
	                    if (nPrevChunk > -1) {
	                        var nNextIdx = this._adChunks[nPrevChunk].idx + 1;
	                        if (!$isNoU(this._aChunks[nNextIdx]) && this._aChunks[nNextIdx].type == "STATIC") {
	                            $(this._aChunks[nNextIdx].place).innerHTML = "";
	                        }
	                        this._nActiveChunk = nPrevChunk;
	                    }
	                }
	                break;
	            case "CLEAR":
	                break;
	            case "TAB":
	                break;
	            default:
	                var nPrevIdx = this._adChunks[this._nActiveChunk].idx - 1;
	                if (!$isNoU(this._aChunks[nPrevIdx]) && this._aChunks[nPrevIdx].type == "STATIC") {
	                    $(this._aChunks[nPrevIdx].place).innerHTML =
	                                this._aChunks[nPrevIdx].value;
	                }
	                if (!$isNoU(this._adChunks[this._nActiveChunk])) {

	                    this._adChunks[this._nActiveChunk].setValue(
	                        this._adChunks[this._nActiveChunk].getValue() + sValue);
	                }
	                if (this._adChunks[this._nActiveChunk].isFull()) {
	                    var nNextChunk = this._getFirstNoFullChunk();

	                    if (nNextChunk > -1) {
	                        if (!$isNoU(this._aChunks[nPrevIdx]) && this._aChunks[nPrevIdx].type == "STATIC") {
	                            $(this._aChunks[nPrevIdx].place).innerHTML =
	                                this._aChunks[nPrevIdx].value;
	                        }
	                        this._nActiveChunk = nNextChunk;
	                    }
	                }
	                break;
	        }
	    }
	}
);

	CDIFieldBlock = createClass
(
	CFieldBlock,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, aChunks, sWidth) {
	        CDIFieldBlock.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._bIsActive = false;
	        this._sWidth = sWidth;
	        this._adChunks = [];
	        this._aChunks = [];
	        if (!$isNoU(aChunks) && aChunks.is(Array)) {
	            this._aChunks = aChunks;
	        }
	        this._sType = this._getType();
	        this._sTableId = this._sInstance + "_table";
	        this._nActiveChunk = -1;
	        this._nWidthCoefficient = 25;
	    },

	    _paint: function() {
	        this._adChunks = [];
	        var oPlace = $(this.getPlaceId());
	        var sContent = "";
	        if (this._aChunks.length) {
	            sContent +=
                    '<table id="' + this._sTableId + '" cellpadding="0" cellspacing="0" width="100%" border="0">' +
                    '  <tr>';
	            if (this._sType != "SINGLE_STATIC") {
	                sContent +=
	                    '<td align="center" style="width: 28px; height: 75px; background: url(\'./img/ui/field/ld.gif\');"></td>';
	            }
	            for (var i = 0; i < this._aChunks.length; i++) {
	                if (this._sType == "SINGLE_FRAMED" || this._sType == "SINGLE_STATIC") {
	                    sContent +=
	                    '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="center" style="background: url(\'./img/ui/field/cd.gif\') repeat-x;">' + this._aChunks[i].value + '</td>';
	                }
	                else if (this._sType == "SINGLE_DYNAMIC") {
	                    sContent +=
	                    '<td class="field_chunk" align="center" style="background: url(\'./img/ui/field/cd.gif\') repeat-x;"><div id="' + this._sInstance + '_chunk_' + i + '_place" style="width: ' + this._sWidth + 'px; overflow: hidden;"></div></td>';
	                }
	                else if (this._sType == "MULTI") {
	                    if (this._aChunks[i].type == "STATIC") {
	                        sContent +=
	                        '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="center" style="width: 1144px; height: 75px; background: url(\'./img/ui/field/cd.gif\') repeat-x;"></td>';
	                        this._aChunks[i]["place"] = this._sInstance + "_chunk_" + i + "_place";
	                    }
	                    else if (this._aChunks[i].type == "DYNAMIC") {
	                        sContent +=
	                        '<td class="field_chunk" id="' + this._sInstance + '_chunk_' + i + '_place" align="left" style="width: 1144px; background: url(\'./img/ui/field/cd.gif\') repeat-x;"><div id="' + this._sInstance + '_chunk_' + i + '_place" style="width: 1144px; overflow: hidden;"></div></td>';
	                    }
	                }
	            }
	            if (this._sType != "SINGLE_STATIC") {
	                sContent +=
	                    '<td style="width: 28px; height: 75px; background: url(\'./img/ui/field/rd.gif\');"></td>';
	            }
	            sContent +=
	                '  </tr>' +
                    '</table>';
	            insertContent(this.getPlaceId(), sContent);
	            for (var i = 0; i < this._aChunks.length; i++) {
	                if (this._aChunks[i].type == "DYNAMIC") {
	                    var oChunk = new CDIFieldChunk(
                                        this,
                                        "chunk_" + i,
                                        this._sInstance + "_chunk_" + i + "_place",
                                        this._aChunks[i].regExp,
                                        this._aChunks[i].minLength,
                                        this._aChunks[i].maxLength);
	                    oChunk["idx"] = i;
	                    oChunk.attachListener("onValid", $delegate(this, this._onChunkValid));
	                    this._adChunks.push(oChunk);
	                    oChunk.render();
	                }
	            }
	            if (this._adChunks.length) {
	                this._nActiveChunk = 0;
	            }
	            if (this._sType != "SINGLE_STATIC" && this._sType != "SINGLE_FRAMED") {
	                oPlace.childNodes[0].onclick = $delegate(this, this._onClick);
	            }
	            this._setOpacity();
	        }
	    },
	    
	    setActive: function(bIsActive) {
	        var nTemp = -1;
	        var aTds = $(this._sTableId).getElementsByTagName("TD");
	        this._bIsActive = $bool(bIsActive);
	        if (bIsActive) {
	            nTemp = this._getFirstNoFullChunk();
	            if (nTemp == -1) {
	                nTemp = this._getLastNoEmptyChunk();
	            }
	            this._nActiveChunk = nTemp;
                for (var i = 0; i < aTds.length; i++) {
                    aTds[i].style.background =
                    aTds[i].style.background.replace("ld.gif", "l_ad.gif");
                    aTds[i].style.background =
                    aTds[i].style.background.replace("cd.gif", "c_ad.gif");
                    aTds[i].style.background =
                    aTds[i].style.background.replace("rd.gif", "r_ad.gif");
                }
	        }
	        else {
	            if (!this.getParent().isOneBlock()) {
	                for (var i = 0; i < aTds.length; i++) {
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("l_ad.gif", "ld.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("c_ad.gif", "cd.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("r_ad.gif", "rd.gif");
	                }
	            }
	            else {
	                for (var i = 0; i < aTds.length; i++) {
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("l_ad.gif", "ld.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("c_ad.gif", "cd.gif");
	                    aTds[i].style.background =
	                    aTds[i].style.background.replace("r_ad.gif", "rd.gif");
	                }
	            } 
	        }
	    }
	}
);

	CField = createClass
(
	CControl,
	{
	    ctor: function(sParent, sInstance, sCtrlPlace, oField) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
                { name: "oField", type: Object }
            ]);
	        CField.base.ctor.call(this, sParent, sInstance, sCtrlPlace);
	        this._bIsCorrectField = true;
	        if (!this._isCorrectField(oField)) {
	            this._bIsCorrectField = false;
	            return;
	        }
	        this._bStrip = $bool(oField["strip"]);
	        this._sName = "";
	        this._sType = "";
	        this._sDesc = "";
	        this._sTypeField = "";
	        this._sHeader = "&nbsp;";
	        this._sFooter = "&nbsp;";
	        this._sRegExp = new RegExp("^.*$");
	        if (!$isNoU(oField["name"]) && oField["name"].is(String)) {
	            this._sName = oField["name"];
	            if (this._sName == "account") {
	                this._sName = "getAccountNumber";
	            }
	        }
	        if (!$isNoU(oField["type"]) && oField["type"].is(String))
	            this._sTypeField = oField["type"];
	        if (!$isNoU(oField["disp_type"]) && oField["disp_type"].is(String))
	            this._sType = oField["disp_type"];
	        if (!$isNoU(oField["disp_desc"]) && oField["disp_desc"].is(String))
	            this._sDesc = oField["disp_desc"];
	        if (!$isNoU(oField["header"]) && oField["header"].is(String)) {
	            this._sHeader = oField["header"];
	        }
	        if (!$isNoU(oField["footer"]) && oField["footer"].is(String)) {
	            this._sFooter = oField["footer"];
	        }
	        if (!$isNoU(oField["regexp"]) &&
	            oField["regexp"].is(String) &&
	            oField["regexp"].length) {
	            this._sRegExp = new RegExp(oField["regexp"]);
	        }
	        this._sMask = unescape(oField["mask"]);
	        this._aBlockCfgs = this._parseMask(this._sMask);
	        this._aBlocks = [];
	        this._nCurrentBlock = -1;
	    },

	    _paint: function() {
	        if (!this._bIsCorrectField) {
	            return;
	        }
	        var sContent = '',
	            o = null,
	            a = [];
	        if (this._aBlockCfgs.length) {
	            sContent += this._sHeader.toFormat("color: #FFFFFF; font-size: 26px; font-weight: normal;") + "<br />";
	            sContent +=
	                '<div style="width: 618px; overflow: hidden;">' +
                    '<table cellpadding="0" cellspacing="0" width="100%" border="0">' +
                    ' <tr>';
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                sContent +=
                        '<td id="' + this._sInstance + '_block_' + i + '_place"></td>';
	                if (i < this._aBlockCfgs.length - 1) {
	                    sContent += '<td style="width: 5px;"></td>';
	                }
	            }
	            sContent +=
                    ' </tr>' +
                    '</table>' +
                    '</div>';
	            sContent += this._sFooter.toFormat("color: red; margin-top: 10px;font-size: 22px;");
	            insertContent(this.getPlaceId(), sContent);
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                var oBlock = new CFieldBlock(
	                                this,
	                                "block" + i,
	                                this._sInstance + "_block_" + i + "_place",
	                                this._aBlockCfgs[i]);
	                this._aBlocks.push(oBlock);
	                oBlock.attachListener("onBlockValid", $delegate(this, this._onBlockValid));
	                oBlock.attachListener("onBlockFull", $delegate(this, this._onBlockFull));
	                oBlock.attachListener("onBlockEmpty", $delegate(this, this._onBlockEmpty));
	                oBlock.attachListener("onClick", $delegate(this, this._onBlockClick));
	                oBlock.render();
	            }
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                o = $(this._sInstance + ".block" + i + "_td");
	                if (o != null) {
	                    a.push(o.clientWidth);
	                }
	                    
	            }
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                o = $(this._sInstance + ".block" + i + "_td");
	                if (o != null) {
	                    var oDiv = o.childNodes[0];
	                    oDiv.style.width = a.shift() - 5;
	                }
	                    
	            }
	        }
	        this._validate();
	    },

	    _isFinalDynamicBlock: function(nBlock) {
	        for (var i = this._aBlocks.length - 1; i >= 0; i--) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (nBlock < i) {
	                    return false;
	                }
	                else {
	                    return true;
	                }
	            }
	        }
	        return true;
	    },

	    _onBlockClick: function(sender, eargs) {
	        var nBlock = -1;
	        for (i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i] == sender) {
	                nBlock = i;
	                break;
	            }
	        }
	        if (nBlock > -1) {
	            if (this._nCurrentBlock > -1) {
	                this._aBlocks[this._nCurrentBlock].setActive(false);
	            }
	            this._nCurrentBlock = nBlock;
	            this._aBlocks[this._nCurrentBlock].setActive(true);
	        }
	        this.notify("onClick");
	    },

	    _onBlockValid: function(sender, eargs) {
	        if (eargs.isValid && this.isValid()) {
	            this.notify("onValid", { isValid: true });
	        }
	        else {
	            this.notify("onValid", { isValid: false });
	        }
	    },

	    _onBlockFull: function(sender, eargs) {
	        if (eargs.isFull) {
	            if (this.isFull()) {
	                this.notify("onFieldFull", { isFull: true });
	            }
	            else {
	                var nBlock = this._getNextNoFullBlock();
	                if (nBlock == -1) {
	                    nBlock = this._getLastNoEmptyBlock();
	                }
	                this._aBlocks[this._nCurrentBlock].setActive(false);
	                this._nCurrentBlock = nBlock;
	                this._aBlocks[nBlock].setActive(true);
	            }
	        }
	    },

	    _onBlockEmpty: function(sender, eargs) {
	        if (eargs.isEmpty) {
	            if (this.isEmpty()) {
	                this.notify("onFieldEmpty", { isEmpty: true });
	            }
	            else {
	                var nBlock = this._getLastNoEmptyBlock();
	                this._aBlocks[this._nCurrentBlock].setActive(false);
	                this._nCurrentBlock = nBlock;
	                this._aBlocks[nBlock].setActive(true);
	            }
	        }
	    },

	    _isCorrectField: function(oField) {
	        if (!$isNoU(oField)) {
	            if (!$isNoU(oField["name"]) && oField["name"].is(String) && oField["name"].length) {
	                if (!$isNoU(oField["mask"]) && oField["mask"].is(String) && oField["mask"].length) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },

	    _getNextNoFullBlock: function() {
	        var nActiveBlock = this._nCurrentBlock;
	        while (true) {
	            var nNextBlock = ++nActiveBlock % this._aBlocks.length;
	            if (nNextBlock == this._nCurrentBlock)
	                return -1;
	            else if (this._aBlocks[nNextBlock].isDynamic())
	                if (!this._aBlocks[nNextBlock].isFull())
	                return nNextBlock;
	        }
	    },
	    
	    _getNextBlock: function() {
	        var nActiveBlock = this._nCurrentBlock;
	        while (true) {
	            var nNextBlock = ++nActiveBlock % this._aBlocks.length;
	            if (nNextBlock == this._nCurrentBlock)
	                return -1;
	            else if (this._aBlocks[nNextBlock].isDynamic())
	                return nNextBlock;
	        }
	    },
	    

	    _getFirstNoFullBlock: function() {
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (!this._aBlocks[i].isFull()) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    },

	    _getLastNoEmptyBlock: function() {
	        for (var i = this._aBlocks.length - 1; i >= 0; i--) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (!this._aBlocks[i].isEmpty()) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    },

	    _isCorrectChunk: function(sChunk) {
	        return (/^<!\^.+\${(?:\d+|\d+,\d+)}>$/.test(sChunk));
	    },

	    _isVariableLength: function(aChunks) {
	        for (var i = 0; i < aChunks.length; i++) {
	            if (!$isNoU(aChunks[i]) &&
                    aChunks[i].type == "DYNAMIC" &&
                    aChunks[i].minLength < aChunks[i].maxLength) {
	                return true;
	            }
	        }
	        return false;
	    },

	    _parseMask: function(sMask) {
	        var aResult = [];
	        var aTemp = [];
	        var sTemp = "";
	        var nIdx = sMask.indexOf("$$");
	        if (nIdx == -1) {
	            aTemp = this._parseBlock(sMask);
	            for (var i = 0; i < aTemp.length; i++) {
	                aResult.push([aTemp[i]]);
	            }
	        }
	        else {
	            while (nIdx > -1) {
	                if (nIdx > 0) {
	                    aTemp = this._parseBlock(sMask.substring(0, nIdx));
	                    for (var i = 0; i < aTemp.length; i++) {
	                        aResult.push([aTemp[i]]);
	                    }
	                    sMask = sMask.substr(nIdx);
	                }
	                sMask = sMask.replace("$$", "");
	                nIdx = sMask.indexOf("$$");
	                if (nIdx > -1) {
	                    aTemp = this._parseBlock(sMask.substring(0, nIdx));
	                    if (this._isVariableLength(aTemp)) {
	                        for (var i = 0; i < aTemp.length; i++) {
	                            aResult.push([aTemp[i]]);
	                        }
	                    }
	                    else {
	                        aResult.push(aTemp);
	                        if (aResult.last().length == 1 &&
                                aResult.last().first().type == "STATIC") {
	                            aResult.last().first().type = "STATIC_FRAMED";
	                        }
	                    }
	                    sMask = sMask.substr(nIdx);
	                    if (sMask.length > 2) {
	                        sMask = sMask.substr(2);
	                    }
	                    else {
	                        sMask = "";
	                    }
	                }
	                nIdx = sMask.indexOf("$$");
	            }
	            if (sMask.length) {
	                aTemp = this._parseBlock(sMask);
	                for (var i = 0; i < aTemp.length; i++) {
	                    aResult.push([aTemp[i]]);
	                }
	            }
	        }
	        return aResult;
	    },

	    _parseBlock: function(sBlock) {
	        var aResult = [];
	        var aTemp = [];
	        var sTemp = "";
	        var sRegExp = "";
	        var sLength = "";
	        var nMinLength = 0;
	        var nMaxLength = 0;
	        var nIdx = sBlock.indexOf("<!");
	        while (nIdx > -1) {
	            if (nIdx > 0) {
	                aResult.push({ type: "STATIC", value: sBlock.substr(0, nIdx) });
	            }
	            sBlock = sBlock.substr(nIdx);
	            nIdx = sBlock.indexOf("}>");
	            if (nIdx > -1) {
	                sTemp = sBlock.substr(0, nIdx + 2);
	                if (this._isCorrectChunk(sTemp)) {
	                    sRegExp =
                            sTemp.substring(sTemp.indexOf("^"),
                                sTemp.indexOf("$") + 1);
	                    sLength =
                            sTemp.substring(sTemp.indexOf("${") + 2,
                                sTemp.indexOf("}"));
	                    if (/^\d+$/.test(sLength)) {
	                        nMaxLength = nMinLength = parseInt(sLength, 10);
	                    }
	                    else if (/^\d+,\d+$/.test(sLength)) {
	                        aTemp = sLength.split(",");
	                        nMinLength = parseInt(aTemp[0], 10);
	                        nMaxLength = parseInt(aTemp[1], 10);
	                    }
	                    aResult.push({ type: "DYNAMIC",
	                        regExp: sRegExp,
	                        minLength: nMinLength,
	                        maxLength: (nMaxLength < 40 ? nMaxLength : 40)
	                    });
	                }
	                sBlock = sBlock.substr(nIdx + 2);
	            }
	            else {
	                break;
	            }
	            nIdx = sBlock.indexOf("<!");
	        }
	        if (sBlock.length) {
	            aResult.push({ type: "STATIC", value: sBlock });
	        }
	        return aResult;
	    },

	    _makeBlock: function(sType, aChunks) {
	        return { type: sType, chunks: aChunks };
	    },

	    setActive: function(bIsActive) {
	        if (bIsActive) {
	            var nBlock = this._getFirstNoFullBlock();
	            if (nBlock == -1) {
	                nBlock = this._getLastNoEmptyBlock();
	            }
	            if (nBlock > -1) {
	                this._nCurrentBlock = nBlock;
	                this._aBlocks[nBlock].setActive(true);
	            }
	        }
	        else {
	            for (var i = 0; i < this._aBlocks.length; i++) {
	                if (this._aBlocks[i].isDynamic()) {
	                    this._aBlocks[i].setActive(false);
	                }
	            }
	        }
	    },

	    isValid: function() {
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (!this._aBlocks[i].isValid()) {
	                    return false;
	                }
	            }
	        }
	        var sValue = this.getValue();
	        return (this._sRegExp.test(sValue));
	    },

	    isFull: function() {
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (!this._aBlocks[i].isFull()) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    },

	    isEmpty: function() {
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i].isDynamic()) {
	                if (!this._aBlocks[i].isEmpty()) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    },
	    
	    isOneBlock: function() {
	        return (this._aBlocks.length == 1);   
	    },
	    
	    _validate: function() {

	    },

	    getName: function() {
	        return this._sName;
	    },
	    
	    getExtra: function() {
	        return this._sType;
	    },
	    
	    getType: function() {
	        return this._sTypeField;
	    },
	    
	    getDesc: function() {
	        return this._sDesc;
	    },

	    getValue: function() {
	        var sResult = "";
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            sResult += this._aBlocks[i].getValue(this._bStrip);
	        }
	        return sResult;
	    },

	    processValue: function(sValue) {

	        switch (sValue) {
	            case "BACKSPACE":
	                if (this.isEmpty()) {
	                    this._nCurrentBlock = 0;
	                    this._aBlocks[0].setActive(true);
	                    location.reload(true);
	                }
	                else {
	                    this._aBlocks[this._nCurrentBlock].processValue(sValue);
	                }
	                break;
	            case "TAB":
	                if (this._aBlocks[this._nCurrentBlock].isValid()) {
	                    var nBlock = this._getNextNoFullBlock();
	                    if (nBlock == -1) {
	                        nBlock = this._getLastNoEmptyBlock();
	                    }
	                    this._aBlocks[this._nCurrentBlock].setActive(false);
	                    this._nCurrentBlock = nBlock;
	                    this._aBlocks[nBlock].setActive(true);
	                }
	                break;
	            default:

	                this._aBlocks[this._nCurrentBlock].processValue(sValue);

	        }
	    },

	    click: function() {
	        this.notify("onClick");
	    }
	}
);

CDIField = createClass
(
	CField,
	{
	    ctor: function(sParent, sInstance, sCtrlPlace, oField, sFieldType) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
                { name: "oField", type: Object }
            ]);
	        CDIField.base.ctor.call(this, sParent, sInstance, sCtrlPlace);
	        this._bIsCorrectField = true;
	        if (!this._isCorrectField(oField)) {
	            this._bIsCorrectField = false;
	            return;
	        }
	        this._bStrip = $bool(oField["strip"]);
	        this._sName = "";
	        this._sFieldWidth = "1200";
	        this._sFieldLength = 100;
	        if (sFieldType == "short") {
	            this._sFieldWidth = "900";
	            this._sFieldLength = 60;
	        }
	        
	        this.sFieldType = sFieldType;
	        this._sHeader = "&nbsp;";
	        this._sFooter = "&nbsp;";
	        this._sRegExp = new RegExp("^.*$");
	        if (!$isNoU(oField["name"]) && oField["name"].is(String)) {
	            this._sName = oField["name"];
	            if (this._sName == "account") {
	                this._sName = "getAccountNumber";
	            }
	        }
	        if (!$isNoU(oField["header"]) && oField["header"].is(String)) {
	            this._sHeader = oField["header"];
	        }
	        if (!$isNoU(oField["footer"]) && oField["footer"].is(String)) {
	            this._sFooter = oField["footer"];
	        }
	        if (!$isNoU(oField["regexp"]) &&
	            oField["regexp"].is(String) &&
	            oField["regexp"].length) {
	            this._sRegExp = new RegExp(oField["regexp"]);
	        }
	        this._sMask = unescape(oField["mask"]);
	        this._aBlockCfgs = this._parseMask(this._sMask);
	        this._aBlocks = [];
	        this._nCurrentBlock = -1;
	    },

	    _paint: function() {
	        if (!this._bIsCorrectField) {
	            return;
	        }
	        var sContent = '';
	        if (this._aBlockCfgs.length) {
	            sContent += this._sHeader.toFormat("color: #26b; font-size: 16px; font-weight: normal;") + "<br />";
	            sContent +=
	                '<div style="width: ' + this._sFieldWidth + 'px; overflow: hidden;">' +
                    '<table cellpadding="0" cellspacing="0" width="100%" border="0">' +
                    ' <tr>';
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                sContent +=
                        '<td id="' + this._sInstance + '_block_' + i + '_place"></td>';
	                if (i < this._aBlockCfgs.length - 1) {
	                    sContent += '<td style="width: 5px;"></td>';
	                }
	            }
	            sContent +=
                    ' </tr>' +
                    '</table>' +
                    '</div>';
	            sContent += this._sFooter.toFormat("color: white; margin-top: 10px; font-size: 24px; width: " + this._sFieldWidth + "px;");
	            insertContent(this.getPlaceId(), sContent);
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                var oBlock = new CDIFieldBlock(
	                                this,
	                                "block" + i,
	                                this._sInstance + "_block_" + i + "_place",
	                                this._aBlockCfgs[i], (parseInt(this._sFieldWidth, 10) - 56).toString());
	                this._aBlocks.push(oBlock);
	                oBlock.attachListener("onBlockValid", $delegate(this, this._onBlockValid));
	                oBlock.attachListener("onBlockFull", $delegate(this, this._onBlockFull));
	                oBlock.attachListener("onBlockEmpty", $delegate(this, this._onBlockEmpty));
	                oBlock.attachListener("onClick", $delegate(this, this._onBlockClick));
	                oBlock.render();
	            }
	        }
	        this._validate();
	    },

	    _parseBlock: function(sBlock) {
	        var aResult = [];
	        var aTemp = [];
	        var sTemp = "";
	        var sRegExp = "";
	        var sLength = "";
	        var nMinLength = 0;
	        var nMaxLength = 0;
	        var nIdx = sBlock.indexOf("<!");
	        while (nIdx > -1) {
	            if (nIdx > 0) {
	                aResult.push({ type: "STATIC", value: sBlock.substr(0, nIdx) });
	            }
	            sBlock = sBlock.substr(nIdx);
	            nIdx = sBlock.indexOf("}>");
	            if (nIdx > -1) {
	                sTemp = sBlock.substr(0, nIdx + 2);
	                if (this._isCorrectChunk(sTemp)) {
	                    sRegExp =
                            sTemp.substring(sTemp.indexOf("^"),
                                sTemp.indexOf("$") + 1);
	                    sLength =
                            sTemp.substring(sTemp.indexOf("${") + 2,
                                sTemp.indexOf("}"));
	                    if (/^\d+$/.test(sLength)) {
	                        nMaxLength = nMinLength = parseInt(sLength, 10);
	                    }
	                    else if (/^\d+,\d+$/.test(sLength)) {
	                        aTemp = sLength.split(",");
	                        nMinLength = parseInt(aTemp[0], 10);
	                        nMaxLength = parseInt(aTemp[1], 10);
	                    }
	                    aResult.push({ type: "DYNAMIC",
	                        regExp: sRegExp,
	                        minLength: nMinLength,
	                        maxLength: (nMaxLength < this._sFieldLength ? nMaxLength : this._sFieldLength)
	                    });
	                }
	                sBlock = sBlock.substr(nIdx + 2);
	            }
	            else {
	                break;
	            }
	            nIdx = sBlock.indexOf("<!");
	        }
	        if (sBlock.length) {
	            aResult.push({ type: "STATIC", value: sBlock });
	        }
	        return aResult;
	    },

	    processValue: function(sValue) {
	        this._aBlocks[this._nCurrentBlock].processValue(sValue);
	    }
	}
);
	
    CFieldPS = createClass
(
	CField,
	{
	    ctor: function(sParent, sInstance, sCtrlPlace, oField) {
	        CFieldPS.base.ctor.call(this, sParent, sInstance, sCtrlPlace);
	        this._bIsCorrectField = true;
	        if (!this._isCorrectField(oField)) {
	            this._bIsCorrectField = false;
	            return;
	        }
	        this._bStrip = $bool(oField["strip"]);
	        this._sName = "";
	        this._sHeader = "&nbsp;";
	        this._sFooter = "&nbsp;";
	        this._sRegExp = new RegExp("^.*$");
	        if (!$isNoU(oField["name"]) && oField["name"].is(String)) {
	            this._sName = oField["name"];
	            if (this._sName == "account") {
	                this._sName = "getAccountNumber";
	            }
	        }
	        if (!$isNoU(oField["header"]) && oField["header"].is(String)) {
	            this._sHeader = oField["header"];
	        }
	        if (!$isNoU(oField["footer"]) && oField["footer"].is(String)) {
	            this._sFooter = oField["footer"];
	        }
	        if (!$isNoU(oField["regexp"]) &&
	            oField["regexp"].is(String) &&
	            oField["regexp"].length) {
	            this._sRegExp = new RegExp(oField["regexp"]);
	        }
	        this._sMask = unescape(oField["mask"]);
	        this._aBlockCfgs = this._parseMask(this._sMask);
	        this._aBlocks = [];
	        this._nCurrentBlock = -1;
	    },
	    
	    _paint: function() {
	        if (!this._bIsCorrectField) {
	            return;
	        }
	        var sContent = '';
	        if (this._aBlockCfgs.length) {
	            sContent += this._sHeader.toFormat("color: #26b; font-size: 20px; font-weight: normal;") + "<br />";
	            sContent +=
	                '<div style="overflow: hidden;">' +
                    '<table cellpadding="0" cellspacing="0" width="100%" border="0">' +
                    ' <tr>';
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                sContent +=
                        '<td id="' + this._sInstance + '_block_' + i + '_place"></td>';
	                if (i < this._aBlockCfgs.length - 1) {
	                    sContent += '<td style="width: 5px;"></td>';
	                }
	            }
	            sContent +=
                    ' </tr>' +
                    '</table>' +
                    '</div>';
	            sContent += this._sFooter.toFormat("color: white; margin-top: 10px; font-size: 24px;");
	            insertContent(this.getPlaceId(), sContent);
	            for (var i = 0; i < this._aBlockCfgs.length; i++) {
	                var oBlock = new CFieldBlock(
	                                this,
	                                "block" + i,
	                                this._sInstance + "_block_" + i + "_place",
	                                this._aBlockCfgs[i]);
	                this._aBlocks.push(oBlock);
	                oBlock.attachListener("onBlockValid", $delegate(this, this._onBlockValid));
	                oBlock.attachListener("onBlockFull", $delegate(this, this._onBlockFull));
	                oBlock.attachListener("onBlockEmpty", $delegate(this, this._onBlockEmpty));
	                oBlock.attachListener("onClick", $delegate(this, this._onBlockClick));
	                oBlock.render();
	            }
	        }
	        this._validate();
	    },
	    
	    _onBlockClick: function(sender, eargs) {
	        var nBlock = -1;
	        for (i = 0; i < this._aBlocks.length; i++) {
	            if (this._aBlocks[i] == sender) {
	                nBlock = i;
	                break;
	            }
	        }
	        if (nBlock > -1) {
	            if (this._nCurrentBlock > -1) {
	                this._aBlocks[this._nCurrentBlock].setActive(false);
	            }
	            this._nCurrentBlock = nBlock;
	            this._aBlocks[this._nCurrentBlock].setActive(true);
	        }
	        this.notify("onClick");
	    },
	    
	    _onBlockFull: function(sender, eargs) {
	        if (eargs.isFull) {
	            if (this.isFull()) {
	                this.notify("onFieldFull", { isFull: true });
	            }
	            else {
	                var nBlock = this._getNextNoFullBlock();
	                if (nBlock == -1) {
	                    nBlock = this._getLastNoEmptyBlock();
	                }
	                this._aBlocks[this._nCurrentBlock].setActive(false);
	                this._nCurrentBlock = nBlock;
	                this._aBlocks[nBlock].setActive(true);
	            }
	        }
	    },
	    
	    processValue: function(sValue) {
	  
	        switch (sValue) {
	        
	            case "BACKSPACE":
	                if (this.isEmpty()) {
	                    this._nCurrentBlock = 0;
	                    this._aBlocks[0].setActive(true);
	                    location.reload(true);
	                }
	                else {
	                    this._aBlocks[this._nCurrentBlock].processValue(sValue);
	                }
	                break;
	            case "TAB":
                    var nBlock = this._getNextBlock();
                    if ((nBlock == -1) || (this._nCurrentBlock >= nBlock)) {
                        this.notify("onTabClick");
                        break;
                    }
                    this._aBlocks[this._nCurrentBlock].setActive(false);
                    this._nCurrentBlock = nBlock;
                    this._aBlocks[nBlock].setActive(true);
                    var nBlockOld = nBlock;
	                break;
	            default:
	                this._aBlocks[this._nCurrentBlock].processValue(sValue);
	        }
	    },
	    
	    _validate: function() {
	    
	    }
	}
);

