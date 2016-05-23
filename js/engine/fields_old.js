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
	        this._sRegExp = sRegExp;
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
	        var oPlace = $(this.getPlaceId());
	        var sContent = "";
	        if (!Object.isNullOrUndefined(oPlace)) {
	            sContent +=
                    '<table cellpadding="0" cellspacing="0" border="0"' + ((this._bIsIndividual) ? this._getOpacity() : "") + '>' +
                    '  <tr>';
	            if (this._bIsIndividual) {
	                sContent +=
	                    '<td style="width: 11px; height: 68px; background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'l_a.gif' : 'l.gif') + '\');"></td>';
	            }
	            sContent +=
	                '    <td align="' + ((this._bIsIndividual) ? 'center' : 'left') + '" valign="middle" style="width: ' + (this._nMaxLength * this._nWidthCoefficient) + '; height: 68px;' + ((this._bIsIndividual) ? 'background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'c_a.gif' : 'c.gif') + '\') repeat-x;' : "") + '">' +
                    '      <span id="' + this.getPlaceId() + '_value" class="field_chunk">' + this.getValue() + '</span>' +
                    '    </td>';
	            if (this._bIsIndividual) {
	                sContent +=
	                    '<td style="width: 11px; height: 68px; background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'r_a.gif' : 'r.gif') + '\');"></td>';
	            }
	            sContent +=
	                '  </tr>' +
                    '</table>';
	            insertContent(this.getPlaceId(), sContent);
	            if (this._bIsIndividual) {
	                oPlace.childNodes[0].onclick = $delegate(this, this._onClick);
	            }
	        }
	    },

	    _getOpacity: function() {
	        var nOpacity = 0;
	        var sResult = "";
	        if (!this.isValid()) {
	            nOpacity = 60;
	        }
	        else {
	            nOpacity = 100;
	        }
	        if ($browser.agent === BWR_FF) {
	            nOpacity /= 100;
	        }
	        if ($browser.agent === BWR_IE || $browser.agent === BWR_FF) {
	            return (($browser.agent === BWR_IE) ? ' style="filter:alpha(opacity:' + nOpacity + ');"' : ' style="opacity:' + nOpacity + ';"');
	        }
	        return "";
	    },

	    _onClick: function() {
	        this.notify("onChunkClick");
	    },

	    isValid: function() {
	        return ((this.getValue().length >= this._nMinLength) &&
	                (this.getValue().length <= this._nMaxLength) &&
	                new RegExp(this._sRegExp).test(this.getValue()));
	    },

	    isEmpty: function() {
	        return (!this.getValue().length);
	    },

	    isActive: function() {
	        return this._bIsActive;
	    },

	    isFull: function() {
	        return (this.getValue().length >= this._nMaxLength);
	    },

	    setActive: function(bIsActive) {
	        this._bIsActive = Boolean.parse(bIsActive);
	        if (this._bIsIndividual) {
	            this._paint();
	        }
	    },

	    getValue: function() {
	        return this._sValue;
	    },

	    setValue: function(sValue) {
	        sValue = sValue.toString();
	        if (new RegExp(this._sRegExp).test(sValue) || !sValue.length) {
	            this._sValue = sValue;
	        }
	        this._paint();
	    },

	    getMinLength: function() {
	        return this._nMinLength;
	    },

	    getMaxLength: function() {
	        return this._nMaxLength;
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
	        this._aChunks = [];
	        if (!$isNoU(aChunks) && aChunks.is(Array)) {
	            this._aChunks = aChunks;    
	        }
	    },

	    _paint: function() {
	        var oPlace = $(this.getPlaceId());
	        var sContent = "";
	        if ()
	        if (!$isNoU(oPlace)) {
	            sContent +=
                    '<table cellpadding="0" cellspacing="0" border="0"' + ((this._bIsIndividual) ? this._getOpacity() : "") + '>' +
                    '  <tr>';
	            if (this._bIsIndividual) {
	                sContent +=
	                    '<td style="width: 11px; height: 68px; background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'l_a.gif' : 'l.gif') + '\');"></td>';
	            }
	            sContent +=
	                '    <td align="' + ((this._bIsIndividual) ? 'center' : 'left') + '" valign="middle" style="width: ' + (this._nMaxLength * this._nWidthCoefficient) + '; height: 68px;' + ((this._bIsIndividual) ? 'background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'c_a.gif' : 'c.gif') + '\') repeat-x;' : "") + '">' +
                    '      <span id="' + this.getPlaceId() + '_value" class="field_chunk">' + this.getValue() + '</span>' +
                    '    </td>';
	            if (this._bIsIndividual) {
	                sContent +=
	                    '<td style="width: 11px; height: 68px; background: url(\'./img/ui/field/' + ((this._bIsActive) ? 'r_a.gif' : 'r.gif') + '\');"></td>';
	            }
	            sContent +=
	                '  </tr>' +
                    '</table>';
	            insertContent(this.getPlaceId(), sContent);
	            if (this._bIsIndividual) {
	                oPlace.childNodes[0].onclick = $delegate(this, this._onClick);
	            }
	        }
	    },

	    _getOpacity: function() {
	        var nOpacity = 0;
	        var sResult = "";
	        if (!this.isValid()) {
	            nOpacity = 60;
	        }
	        else {
	            nOpacity = 100;
	        }
	        if ($browser.agent === BWR_FF) {
	            nOpacity /= 100;
	        }
	        if ($browser.agent === BWR_IE || $browser.agent === BWR_FF) {
	            return (($browser.agent === BWR_IE) ? ' style="filter:alpha(opacity:' + nOpacity + ');"' : ' style="opacity:' + nOpacity + ';"');
	        }
	        return "";
	    },

	    _onClick: function() {
	        this.notify("onChunkClick");
	    },

	    isValid: function() {
	        return ((this.getValue().length >= this._nMinLength) &&
	                (this.getValue().length <= this._nMaxLength) &&
	                new RegExp(this._sRegExp).test(this.getValue()));
	    },

	    isEmpty: function() {
	        return (!this.getValue().length);
	    },

	    isActive: function() {
	        return this._bIsActive;
	    },

	    isFull: function() {
	        return (this.getValue().length >= this._nMaxLength);
	    },

	    setActive: function(bIsActive) {
	        this._bIsActive = Boolean.parse(bIsActive);
	        if (this._bIsIndividual) {
	            this._paint();
	        }
	    },

	    getValue: function() {
	        return this._sValue;
	    },

	    setValue: function(sValue) {
	        sValue = sValue.toString();
	        if (new RegExp(this._sRegExp).test(sValue) || !sValue.length) {
	            this._sValue = sValue;
	        }
	        this._paint();
	    },

	    getMinLength: function() {
	        return this._nMinLength;
	    },

	    getMaxLength: function() {
	        return this._nMaxLength;
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
	        this._sHeader = "";
	        this._sFooter = "";
	        this._sRegExp = "^$";
	        if (!$isNoU(oField["header"]) && oField["header"].is(String)) {
	            this._sHeader = oField["header"];
	        }
	        if (!$isNoU(oField["footer"]) && oField["footer"].is(String)) {
	            this._sFooter = oField["footer"];
	        }
	        if (!$isNoU(oField["regexp"]) &&
	            oField["regexp"].is(String) &&
	            oField["regexp"].length) {
	            this._sRegExp = oField["regexp"];
	        }
	        this._sMask = unescape(oField["mask"]);
	        this._aBlocks = this._parseMask(this._sMask);
	        this._aDynamicChunks = [];
	        this._aMultiBlocks = [];
	        this._oCurrentChunk = null;
	        this._nWidthCoefficient = 25;
	        this._nCurrentMultiBlock = -1;
	    },

	    _paint: function() {
	        if (!this._bIsCorrectField) {
	            return;
	        }
	        var oPlace = $(this.getPlaceId());
	        var oMultiBlock = null;
	        var aLengths = [];
	        var sDynamicChunk = "";
	        var sRegExp = "";
	        var sLength = "";
	        var nMinLength = 0;
	        var nMaxLength = 0;
	        var oChunk = null;
	        var sContent = "";
	        if (!Object.isNullOrUndefined(oPlace)) {
	            sContent = this._sHeader;
	            sContent +=
	                '<table cellpadding="0" cellspacing="0" border="0">' +
                    '  <tr>';
	            for (var j = 0; j < this._aBlocks.length; j++) {
	                oMultiBlock = null;
	                if (this._aBlocks[j].type === "MULTI") {
	                    if (!this._isCorrectMultiBlock(j)) {
	                        this._aBlocks[j].type = "SINGLE";
	                    }
	                }
	                if (this._aBlocks[j].type === "MULTI") {
	                    sContent +=
                        '<td id="' + this._sInstance + '_db_' + j.toString(10) + '_l" style="width: 11px; height: 68px; background: url(\'./img/ui/field/l.gif\');"></td>' +
                        '<td id="' + this._sInstance + '_db_' + j.toString(10) + '" style="background: url(\'./img/ui/field/c.gif\') repeat-x;">' +
                        '  <table cellpadding="0" cellspacing="0" border="0">' +
                        '    <tr>';
	                    oMultiBlock = {};
	                    oMultiBlock.id = (this._sInstance + '_db_' + j.toString(10));
	                    oMultiBlock.chunks = [];
	                }
	                for (var i = 0; i < this._aBlocks[j].chunks.length; i++) {
	                    sContent +=
                        '<td id="' + (this._sInstance + "_chunk_" + j.toString(10) + "_" + i.toString(10)) + '" class="field_chunk" valign="middle">';
	                    if (this._aBlocks[j].chunks[i].type === "STATIC") {
	                        if (this._aBlocks[j].type === "SINGLE") {
	                            sContent += this._aBlocks[j].chunks[i].value;
	                        }
	                        else if (this._aBlocks[j].type === "MULTI") {
	                            var sId = this._sInstance + "_chunk_" + j.toString(10) + "_" + i.toString(10) + "_text";
	                            sContent +=
                                    '<div id="' + sId + '" style="width: ' + (this._aBlocks[j].chunks[i].value.length * this._nWidthCoefficient).toString(10) + 'px;">' + ((this._isCompletelyStaticMB(this._aBlocks[j])) ? this._aBlocks[j].chunks[i].value : "") + '</div>';
	                            oMultiBlock.chunks.push([sId, this._aBlocks[j].chunks[i].value]);
	                        }
	                    }
	                    else if (this._aBlocks[j].chunks[i].type === "DYNAMIC") {
	                        sDynamicChunk = this._aBlocks[j].chunks[i].value;
	                        if (this._isCorrectChunk(sDynamicChunk)) {
	                            sRegExp =
	                                sDynamicChunk.substring(sDynamicChunk.indexOf("^"),
                                        sDynamicChunk.indexOf("$") + 1);
	                            sLength =
	                                sDynamicChunk.substring(sDynamicChunk.indexOf("${") + 2,
                                        sDynamicChunk.indexOf("}"));
	                            if (/^\d+$/.test(sLength)) {
	                                nMaxLength = parseInt(sLength, 10);
	                                oChunk = new CFieldChunk(this,
	                                                     "chunk" + i.toString(10),
	                                                     (this._sInstance + "_chunk_" + j.toString(10) + "_" + i.toString(10)),
	                                                     sRegExp,
	                                                     nMaxLength,
	                                                     nMaxLength,
	                                                     ((this._aBlocks[j].type === "SINGLE") ? true : false));
	                                if (this._aBlocks[j].type === "MULTI") {
	                                    oMultiBlock.chunks.push(oChunk);
	                                }
	                            }
	                            else if (/^\d+,\d+$/.test(sLength)) {
	                                aLengths = sLength.split(",");
	                                nMinLength = parseInt(aLengths[0], 10);
	                                nMaxLength = parseInt(aLengths[1], 10);
	                                oChunk = new CFieldChunk(this,
	                                                     "chunk" + i.toString(10),
	                                                     (this._sInstance + "_chunk_" + j.toString(10) + "_" + i.toString(10)),
	                                                     sRegExp,
	                                                     nMinLength,
	                                                     nMaxLength,
	                                                     ((this._aBlocks[j].type === "SINGLE") ? true : false));
	                                if (this._aBlocks[j].type === "MULTI") {
	                                    oMultiBlock.chunks.push(oChunk);
	                                }
	                            }
	                            this._aDynamicChunks.push(oChunk);
	                        }
	                    }
	                    sContent +=
                        '</td>';
	                }
	                if (this._aBlocks[j].type === "MULTI") {
	                    this._aMultiBlocks.push(oMultiBlock);
	                    sContent +=
                        '    </tr>' +
                        '  </table>' +
                        '</td>' +
                        '<td id="' + this._sInstance + '_db_' + j.toString(10) + '_r" style="width: 11px; height: 68px; background: url(\'./img/ui/field/r.gif\');"></td>';
	                }
	                if (this._aBlocks[j].type === "SINGLE" ||
	                        this._isCompletelyStaticMB(this._aBlocks[j])) {
	                    sContent +=
                                '<td width="5"></td>';
	                }
	            }
	            sContent +=
                    '  </tr>' +
                    '</table>';
	            sContent += this._sFooter;
	            oPlace.innerHTML = sContent;
	            for (var i = 0; i < this._aMultiBlocks.length; i++) {
	                $(this._aMultiBlocks[i].id).onclick = $delegate(this,
	                    $callback(this._onMultiBlockClick, this._aMultiBlocks[i].chunks));
	                this._setMultiBlockOpacity(i);
	            }
	            for (var i = 0; i < this._aDynamicChunks.length; i++) {
	                this._aDynamicChunks[i].attachListener("onChunkClick", $delegate(this, this._onChunkClick));
	                this._aDynamicChunks[i].render();
	            }
	            this._setActiveChunk(0);
	            this._validate();
	        }
	    },

	    _isCorrectMultiBlock: function(nMultiBlock) {
	        if (nMultiBlock <= this._aBlocks.length - 1) {
	            for (var i = 0; i < this._aBlocks[nMultiBlock].chunks.length; i++) {
	                if (this._aBlocks[nMultiBlock].chunks[i].type === "DYNAMIC") {
	                    if (/^.+{\d+,\d+}>$/.test(this._aBlocks[nMultiBlock].chunks[i].value)) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	        return false;
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

	    _isCorrectChunk: function(sChunk) {
	        return (/^<!\^.+\${(?:\d+|\d+,\d+)}>$/.test(sChunk));
	    },

	    _parseMask: function(sMask) {
	        var aResult = [];
	        var sTemp = "";
	        var nIdx = sMask.indexOf("$$");
	        if (nIdx === -1) {
	            aResult.push(this._makeBlock("SINGLE", this._parseBlock(sMask)));
	        }
	        else {
	            while (nIdx > -1) {
	                if (nIdx > 0) {
	                    aResult.push(this._makeBlock("SINGLE",
	                        this._parseBlock(sMask.substring(0, nIdx))));
	                    sMask = sMask.substr(nIdx);
	                }
	                sMask = sMask.replace("$$", "");
	                nIdx = sMask.indexOf("$$");
	                if (nIdx > -1) {
	                    aResult.push(this._makeBlock("MULTI",
	                        this._parseBlock(sMask.substring(0, nIdx))));
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
	                aResult.push(this._makeBlock("SINGLE", this._parseBlock(sMask)));
	            }
	        }
	        return aResult;
	    },

	    _parseBlock: function(sBlock) {
	        var aResult = [];
	        var nIdx = sBlock.indexOf("<!");
	        while (nIdx > -1) {
	            if (nIdx > 0) {
	                aResult.push(this._makeChunk("STATIC", sBlock.substr(0, nIdx)));
	            }
	            sBlock = sBlock.substr(nIdx);
	            nIdx = sBlock.indexOf("}>");
	            if (nIdx > -1) {
	                aResult.push(this._makeChunk("DYNAMIC", sBlock.substr(0, nIdx + 2)));
	                sBlock = sBlock.substr(nIdx + 2);
	            }
	            else {
	                break;
	            }
	            nIdx = sBlock.indexOf("<!");
	        }
	        if (sBlock.length) {
	            aResult.push(this._makeChunk("STATIC", sBlock));
	        }
	        return aResult;
	    },

	    _makeBlock: function(sType, aChunks) {
	        return { type: sType, chunks: aChunks };
	    },

	    _makeChunk: function(sType, sValue) {
	        return { type: sType, value: sValue };
	    },

	    _getChunkNumber: function(oChunk) {
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            if (this._aDynamicChunks[i] === oChunk) {
	                return i;
	            }
	        }
	        return -1;
	    },

	    _changeChunk: function(sDirection) {
	        var nCurrentChunk = this._getChunkNumber(this._oCurrentChunk);
	        var nMultiBlockNum = -1;
	        var nChunkPos = -1;
	        if (sDirection === "PREVIOUS") {
	            nMultiBlockNum = this._getMultiBlockNum(this._oCurrentChunk);
	            if (nMultiBlockNum > -1) {
	                nChunkPos = this._getChunkNumOnMultiBlock(nMultiBlockNum, this._oCurrentChunk);
	                if (nChunkPos > 0) {
	                    if (this._aMultiBlocks[nMultiBlockNum].chunks[nChunkPos - 1].is(Array)) {
	                        $(this._aMultiBlocks[nMultiBlockNum].chunks[nChunkPos - 1][0]).innerHTML = "";
	                    }
	                }
	            }
	            if (nCurrentChunk > 0) {
	                this._setActiveChunk(nCurrentChunk - 1);
	            }
	        }
	        else if (sDirection === "NEXT") {
	            nMultiBlockNum = this._getMultiBlockNum(this._oCurrentChunk);
	            if (nMultiBlockNum > -1) {
	                nChunkPos = this._getChunkNumOnMultiBlock(nMultiBlockNum, this._oCurrentChunk);
	                if (nChunkPos < this._aMultiBlocks[nMultiBlockNum].chunks.length - 1) {
	                    if (this._aMultiBlocks[nMultiBlockNum].chunks[nChunkPos + 1].is(Array)) {
	                        $(this._aMultiBlocks[nMultiBlockNum].chunks[nChunkPos + 1][0]).innerHTML =
	                            this._aMultiBlocks[nMultiBlockNum].chunks[nChunkPos + 1][1];
	                    }
	                }
	            }
	            if (nCurrentChunk < (this._aDynamicChunks.length - 1)) {
	                this._setActiveChunk(nCurrentChunk + 1);
	            }
	        }
	    },

	    _setActiveChunk: function(nNumber) {
	        var nMultiBlock = -1;
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            this._aDynamicChunks[i].setActive(false);
	        }
	        if (!$isNoU(this._aDynamicChunks[nNumber])) {
	            this._oCurrentChunk = this._aDynamicChunks[nNumber];
	            nMultiBlock = this._getMultiBlockNum(this._oCurrentChunk);
	            if (nMultiBlock > -1) {
	                if (nMultiBlock !== this._nCurrentMultiBlock) {
	                    this._nCurrentMultiBlock = nMultiBlock;
	                    this._setActiveMultiBlock(nMultiBlock, true);
	                }
	                else {
	                    this._oCurrentChunk.setActive(true);
	                }
	            }
	            else {
	                this._nCurrentMultiBlock = -1;
	                this._oCurrentChunk.setActive(true);
	            }
	        }
	        for (var i = 0; i < this._aMultiBlocks.length; i++) {
	            if (i !== nMultiBlock) {
	                this._setActiveMultiBlock(i, false);
	            }
	        }
	    },

	    _getMultiBlockNum: function(oChunk) {
	        for (var i = 0; i < this._aMultiBlocks.length; i++) {
	            for (var j = 0; j < this._aMultiBlocks[i].chunks.length; j++) {
	                if (this._aMultiBlocks[i].chunks[j] === oChunk) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    },

	    _getChunkNumOnMultiBlock: function(nMultyBlock, oChunk) {
	        if (nMultyBlock <= this._aMultiBlocks.length - 1) {
	            for (var i = 0; i < this._aMultiBlocks[nMultyBlock].chunks.length; i++) {
	                if (this._aMultiBlocks[nMultyBlock].chunks[i] === oChunk) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    },

	    _setActiveMultiBlock: function(nBlock, bIsActive) {
	        var oCurrentChunk = null;
	        if (nBlock <= this._aMultiBlocks.length - 1) {
	            var oL = $((this._aMultiBlocks[nBlock].id + "_l"));
	            var oC = $(this._aMultiBlocks[nBlock].id);
	            var oR = $((this._aMultiBlocks[nBlock].id + "_r"));
	            oC.style.background =
                    "url('./img/ui/field/c" + ((bIsActive) ? "_a" : "") + ".gif') repeat-x";
	            oL.style.background =
                    "url('./img/ui/field/l" + ((bIsActive) ? "_a" : "") + ".gif')";
	            oR.style.background =
                    "url('./img/ui/field/r" + ((bIsActive) ? "_a" : "") + ".gif')";
	            if ($bool(bIsActive)) {
	                for (var i = 0; i < this._aMultiBlocks[nBlock].chunks.length; i++) {
	                    if (this._aMultiBlocks[nBlock].chunks[i].is(CFieldChunk)) {
	                        if (!this._aMultiBlocks[nBlock].chunks[i].isFull()) {
	                            oCurrentChunk = this._aMultiBlocks[nBlock].chunks[i];
	                            break;
	                        }
	                    }
	                    else if (this._aMultiBlocks[nBlock].chunks[i].is(Array)) {
	                        $(this._aMultiBlocks[nBlock].chunks[i][0]).innerHTML =
	                                this._aMultiBlocks[nBlock].chunks[i][1];
	                    }
	                }
	                if ($isNoU(oCurrentChunk)) {
	                    for (var i = this._aMultiBlocks[nBlock].chunks.length - 1; i >= 0; i--) {
	                        if (this._aMultiBlocks[nBlock].chunks[i].is(CFieldChunk)) {
	                            oCurrentChunk = this._aMultiBlocks[nBlock].chunks[i];
	                            break;
	                        }
	                    }
	                }
	                this._oCurrentChunk = oCurrentChunk;
	                this._oCurrentChunk.setActive(true);
	                this._setMultiBlockOpacity(nBlock);
	            }
	        }
	    },

	    _setMultiBlockOpacity: function(nBlock) {
	        var oL = $((this._aMultiBlocks[nBlock].id + "_l"));
	        var oC = $(this._aMultiBlocks[nBlock].id);
	        var oR = $((this._aMultiBlocks[nBlock].id + "_r"));
	        if (this._isValidMultiBlock(nBlock)) {
	            setOpacity(oL.id, 100);
	            setOpacity(oC.id, 100);
	            setOpacity(oR.id, 100);
	        }
	        else {
	            setOpacity(oL.id, 60);
	            setOpacity(oC.id, 60);
	            setOpacity(oR.id, 60);
	        }
	    },

	    _isCompletelyStaticMB: function(oMultiBlock) {
	        if (!$isNoU(oMultiBlock) &&
	            oMultiBlock.type === "MULTI" &&
	            (!$isNoU(oMultiBlock.chunks) && oMultiBlock.chunks.is(Array))) {
	            for (var i = 0; i < oMultiBlock.chunks.length; i++) {
	                if (oMultiBlock.chunks[i].type !== "STATIC") {
	                    return false;
	                }
	            }
	            return true;
	        }
	        return false;
	    },

	    _isValidMultiBlock: function(nBlock) {
	        if (nBlock <= this._aMultiBlocks.length - 1) {
	            for (var i = 0; i < this._aMultiBlocks[nBlock].chunks.length; i++) {
	                if (this._aMultiBlocks[nBlock].chunks[i].is(CFieldChunk)) {
	                    if (!this._aMultiBlocks[nBlock].chunks[i].isValid()) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	        return false;
	    },

	    isValid: function() {
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            if (!this._aDynamicChunks[i].isValid()) {
	                return false;
	            }
	        }
	        return ((new RegExp(this._sRegExp)).test(this.getValue()));
	    },

	    isFull: function() {
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            if (!this._aDynamicChunks[i].isFull()) {
	                return false;
	            }
	        }
	        return true;
	    },

	    isEmpty: function() {
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            if (!this._aDynamicChunks[i].isEmpty()) {
	                return false;
	            }
	        }
	        return true;
	    },

	    _validate: function() {
	        this.notify("onStatusChange", { isValid: this.isValid() });
	    },

	    _onMultiBlockClick: function(sender, eargs) {
	        var aChunks = [];
	        if (!$isNoU(sender) && sender.is(Array)) {
	            aChunks = sender;
	        }
	        else if (!$isNoU(eargs) && eargs.is(Array)) {
	            aChunks = eargs;
	        }
	        this.click();
	        for (var i = 0; i < aChunks.length; i++) {
	            if (aChunks[i].is(CFieldChunk)) {
	                if (!aChunks[i].isFull()) {
	                    this._setActiveChunk(this._getChunkNumber(aChunks[i]));
	                    return;
	                }
	            }
	        }
	        for (var i = aChunks.length - 1; i >= 0; i--) {
	            if (aChunks[i].is(CFieldChunk)) {
	                this._setActiveChunk(this._getChunkNumber(aChunks[i]));
	                return;
	            }
	        }
	    },

	    _onChunkClick: function(sender, eargs) {
	        var nCurrentChunk = this._getChunkNumber(sender);
	        this._setActiveChunk(nCurrentChunk);
	        this.click();
	    },

	    _getFirstNoValidChunk: function() {
	        for (var i = 0; i < this._aDynamicChunks.length; i++) {
	            if (!this._aDynamicChunks[i].isValid()) {
	                return i;
	            }
	        }
	        return (this._aDynamicChunks.length - 1);
	    },

	    getValue: function() {
	        var sValue = "";
	        var nCounter = 0;
	        for (var i = 0; i < this._aBlocks.length; i++) {
	            for (var j = 0; j < this._aBlocks[i].chunks.length; j++) {
	                if (this._aBlocks[i].chunks[j].type === "STATIC") {
	                    if (!this._bStrip) {
	                        sValue += this._aBlocks[i].chunks[j].value;
	                    }
	                }
	                else if (this._aBlocks[i].chunks[j].type === "DYNAMIC") {
	                    if (nCounter <= this._aDynamicChunks.length) {
	                        sValue += this._aDynamicChunks[nCounter].getValue();
	                        nCounter++;
	                    }
	                }
	            }
	        }
	        return sValue;
	    },

	    activate: function(sElementPos) {
	        if (this._aDynamicChunks.length) {
	            if (sElementPos === "FIRST") {
	                this._setActiveChunk(0);
	            }
	            else if (sElementPos === "LAST") {
	                this._setActiveChunk(this._aDynamicChunks.length - 1);
	            }
	        }
	    },

	    deactivate: function() {
	        this._oCurrentChunk = null;
	        this._nCurrentMultiBlock = -1;
	        this._setActiveChunk(-1);
	    },

	    processValue: function(sValue) {
	        var oCurrentChunk = this._oCurrentChunk;
	        var nMultyBlock = -1;
	        switch (sValue) {
	            case "BACKSPACE":
	                oCurrentChunk.setValue(oCurrentChunk.getValue().substr(0, oCurrentChunk.getValue().length - 1));
	                if (this._aMultiBlocks.length) {
	                    nMultyBlock = this._getMultiBlockNum(oCurrentChunk);
	                    if (nMultyBlock > -1) {
	                        this._setMultiBlockOpacity(nMultyBlock);
	                    }
	                }
	                if (oCurrentChunk.isEmpty()) {
	                    this._changeChunk("PREVIOUS");
	                }
	                break;
	            case "CLEAR":
	                this._aDynamicChunks = [];
	                this._aMultiBlocks = [];
	                this._oCurrentChunk = null;
	                this._nCurrentMultiBlock = -1;
	                this._paint();
	                break;
	            case "TAB":
	                nMultyBlock = this._getMultiBlockNum(oCurrentChunk);
	                if (nMultyBlock > -1) {
	                }
	                this._changeChunk("NEXT");
	                break;
	            default:
	                if (!oCurrentChunk.isFull()) {
	                    oCurrentChunk.setValue(oCurrentChunk.getValue() + sValue);
	                    if (this._aMultiBlocks.length) {
	                        nMultyBlock = this._getMultiBlockNum(oCurrentChunk);
	                        if (nMultyBlock > -1) {
	                            this._setMultiBlockOpacity(nMultyBlock);
	                        }
	                    }
	                }
	                if (oCurrentChunk.isFull()) {
	                    if (this._getChunkNumber(oCurrentChunk) < this._aDynamicChunks.length - 1) {
	                        this._changeChunk("NEXT");
	                    }
	                    else {
	                        this._setActiveChunk(this._getFirstNoValidChunk());
	                    }
	                }
	                break;
	        }
	        this._validate();
	    },

	    click: function() {
	        this.notify("onClick");
	    }
	}
);

