	CSearchPage = createClass
(
	CPage,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        CMainPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._dataProvider = new CJsDataProvider(this, "_dataProvider");
	        this._oKeyboard = null;
	        this._sSearchString = "";
	        this._aProviders = [];
	        this._sAdvertPlace = "Search";
	        this._nCurIdx = 0;
	        this._nRows = 2;
	        this._nColumns = 4;
	        this._counter = 0;
	        
	        this._applySearchString = $delegate(this, function(){
	        	$("SearchProvidersString").value = this._sSearchString;
	        });

	        attachPropertyChangeListener("SearchResult", $delegate(this, this._updatePrvList));
	    },

	    _paint: function() {
	        var oPlace = $(this.getPlaceId());
	        if (!$isNoU(oPlace)) {
	            oPlace.innerHTML =
                        '<div style="height: 18px"></div><table cellpadding="0" cellspacing="0" border="0" width="100%" height="180">' +
                        '  <tr valign="middle">' +
                        '    <td width="162" height="180">' +
                        '        <div style="width: 86px; height: 140px; margin: 8px 0px 0px 51px;"><img alt="" src="./img/ui/qiwicel.gif" /></div>' +
                        '    </td>' +
                        '    <td width="1090" height="180">' +
                        '        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden;"></div>' +
                        '    </td>' +
                        '  </tr>' +
                        '</table>' +
                        '<div id="' + this._sInstance + '_page_body" class="search-results" style="width: 100%; height: 691px; overflow: hidden;"></div>' +
    	                '<div align="center" style="width: 100%; height: 121px;"><div id="' + this._sInstance + '_bottom_menu"></div></div>';
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            this._createContent(this._sInstance + "_page_body");
	        }
	        startAdvert("Main");
	    },

	    _createContent: function(sPlace) {
	        $(sPlace).vAlign = "top";
	        $(sPlace).innerHTML =
                '<div style="width: 1260px; height: 121px; margin-top: 10px;">' +
                '  <div style="float: left; width: 934px; height: 100%; position: relative; left: 20px">' +
                '    <table cellpadding="0" cellspacing="0" border="0" width="924" height="121">' +
                '       <tr>' +
                '          <td style="width: 29px; height: 100%; background: url(\'./img/ui/sp/left_pole.gif\') no-repeat;"></td>' +
                '          <td style="height: 100%; overflow: hidden; background: url(\'./img/ui/sp/pole_center.gif\') repeat-x;">' +
                '            <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
                '               <tr>' +
                '                  <td style="height: 81px;">' +
                '                    <div id="' + this._sInstance + '_field"></div>' +
                '                  </td>' +
                '               </tr>' +
                '               <tr>' +
                '                  <td style="height: 40px;">' +
                '                    <div style="height: 40px; text-align: left; color: #fff; font-size: 22px; padding-top: 5px;">Введите название провайдера</div>' +
                '                  </td>' +
                '               </tr>' +
                '            </table>' +
                '          </td>' +
                '          <td style="width: 29px; height: 100%; background: url(\'./img/ui/sp/right_pole.gif\') no-repeat;"></td>' +
                '       </tr>' +
                '    </table>' +
	            '</div>' +
                '  <div id="' + this._sInstance + '_bs" style="float: right; padding-left: 0px; height: 100%;"></div>' +
                '</div>' +
	            '<div id="' + this._sInstance + '_providers" style="width: 1260px; height: 260px; margin-top: 20px;"></div>' +
	            '<div id="' + this._sInstance + '_keyboard" style="width: 1260px; height: 240px; margin-top: 10px; margin-left: 10px;"></div>';
	        this._drawBackspaceBtn(this._sInstance + "_bs");
	        this._drawKeyboard('rus');
	        this._drawProviders(this._sInstance + "_providers");
	        
	        /*var that = this;
		setTimeout(function(){
			$("SearchResult").value = '5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test;5|test|test|test';
			that._updatePrvList();
		}, 2000);*/
	    },

	    _drawBackspaceBtn: function(sPlace) {
	        var oBtn = new CImageButton(this, "bs_btn", sPlace, "BACKSPACE", "./img/ui/sp/delbtn_press.gif", "./img/ui/sp/delbtn.gif");
	        oBtn.attachListener("onClick", $delegate(this, this._onButtonClick));
	        oBtn.create();
	        oBtn.render();
	    },

	    _drawKeyboard: function(board) {
	    	this._activeBoard = board;
	    	var board = $('keyboard-' + board),
	    	    place = $(this._sInstance + "_keyboard"),
	    	    prev = place.getElementsByTagName('div');

	    	if(prev.length)
	    	{
	    		prev = prev[0];
	    		prev.style.display = 'none';
	    		document.getElementsByTagName('body')[0].appendChild(prev);
	    		for(var i = 0, l = prev.shadows.length; i < l; i++)
	    		{
	    			$(prev.shadows[i].el).style.display = 'none';
	    		}
	    	}

	    	place.appendChild(board);
	    	board.style.display = 'block';
	    	if(!board.shadows)
	    	{
	    		board.shadows = [];
	    		var spans = board.getElementsByTagName('span'),
	    		    re = /dig|eng|rus/,
	    		    func = $delegate(this, this._buttonPress);
	    		for(var i = 0, l = spans.length; i < l; i++)
	    		{
	    			var options = {};
	    			if(re.test(spans[i].parentNode.className)) options.color = 30;
	    			board.shadows.push(new CInnerShadow(spans[i], options, func));
	    		}
	    	}
	    	else
	    	{
	    		for(var i = 0, l = board.shadows.length; i < l; i++)
	    		{
	    			$(board.shadows[i].el).style.display = 'block';
	    		}
	    	}
	    },
	    
	    _buttonPress: function(button)
	    {
	    	var pclass = button.parentNode.className,
	    	    key;
	    	switch(pclass){
	    		case 'dig':
	    		case 'eng':
	    		case 'rus':
	    			if(pclass == 'dig')
	    			{
	    				$('returnBoard').className = this._activeBoard;
	    				$('returnBoard').firstChild.innerHTML = this._activeBoard == 'rus' ? 'абв' : 'abc';
	    			}
	    			this._drawKeyboard(pclass);
	    		break;
	    		case 'space':
				key = ' ';
	    		break;
	    		default:
	    			key = button.innerHTML;
	    		break;
	    	};
		if(key && this._sSearchString.length < 18)
		{
			this._sSearchString += key.toUpperCase();
			this._drawSearchString();
		}
	    },

	    _updatePrvList: function() {
	        sList = $("SearchResult").value;
	        this._fillPrvList(sList);
	        this._nCurIdx = 0;
	        insertContent(this._sInstance + "_providers", "");
	        this._drawProviders(this._sInstance + "_providers");
	    },

	    _fillPrvList: function(sList) {
	        this._aProviders = [];
	        if (!$is(sList, String))
	            return;
	        var aList = sList.split(";");
	        for (var i = 0; i < aList.length; i++) {
	            var aFields = aList[i].split("|");
	            if (aFields.length < 3) continue;
	            var o = {};
	            o["id"] = (!$isNoU(aFields[0])) ? aFields[0].toString() : "";
	            o["sName"] = (!$isNoU(aFields[1])) ? aFields[1].toString() : "";
	            
	            var names = o["sName"].split('^');
	            o["sName"] = names[0];
	            o["buttonName"] = names.length > 1 ? names[1] : names[0];
	            
	            o["logo"] = (!$isNoU(aFields[2])) ? aFields[2].toString() : "";
	            o["tag"] = (!$isNoU(aFields[3])) ? aFields[3].toString() : "";
	            this._aProviders.push(o);
	        }
	    },

	    _drawProviders: function(sPlace) {
	    	this._oRightBtmBtn.setEnabled(false);
	        if(this._aProviders.length)
	        {
	            var nPage = (this._nCurIdx / (this._nRows * this._nColumns)) + 1;
	            var nPages = Math.ceil(this._aProviders.length / (this._nRows * this._nColumns));
	            /*if (nPages > 1)
	            {
	            	insertContent(this.getInstance() + "_txt", this._makeText(nPage, nPages));
	            }
	            else
	            {
	            	insertContent(this.getInstance() + "_txt", "&nbsp;");
	            }*/
	            insertContent(sPlace, this._getProviderPlaces());
	            this._createProviders();
	            this._oRightBtmBtn.setEnabled((this._nCurIdx + (this._nRows * this._nColumns)) < this._aProviders.length);
	        }
	        else {
	            var sContent = "";
	            if (!this._sSearchString.length) {
	                sContent = '<div style="margin: 0; text-align: center; padding-top: 100px; font-size: 50px; font-weight: normal; color: #2268c6;">Выберите первую букву названия</div>';
	            }
	            insertContent(sPlace, sContent);
	            //insertContent(this.getInstance() + "_txt", "&nbsp;");
	            //this._oKeyboard.setText("");
	        }
	    },

	    _createBottomMenu: function(sPlace) {
	        CMainPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif", "back_press.gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif", "menu_press.gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next.gif", "next_press.gif");
	        //	        this._oLeftBtmBtn.setKeyCode("left4");
	        //	        this._oRightBtmBtn.setKeyCode("right4");
	        this._oLeftBtmBtn.render();
	        this._oCenterBtmBtn.render();
	        this._oRightBtmBtn.render();
	        this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
	        this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	        this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._forwardButtonClick));
	        this._oLeftBtmBtn.setEnabled(true);
	        this._oRightBtmBtn.setEnabled(false);
	    },

	    _createProviders: function() {
	        var oPlace = null;
	        var oNamePlace = null;
	        var oProvider = null;
	        var nLastIdx = this._nCurIdx + (this._nRows * this._nColumns);
	        if(nLastIdx > this._aProviders.length) nLastIdx = this._aProviders.length;
	        
	        for (var i = this._nCurIdx; i < nLastIdx; i++)
	        {
	            oPlace = $(this._sInstance + "_prv_" + ((this._nCurIdx ? (i % this._nCurIdx) : i) + 1));
	            oNamePlace = $(this._sInstance + "_prv_name_" + ((this._nCurIdx ? (i % this._nCurIdx) : i) + 1));
	            if (oPlace)
	            {
	                oProvider = new CElementButton(this, "prv" + (i + 1),
	                            oPlace.id,
	                            this._aProviders[i]["id"],
	                            this._aProviders[i]["buttonName"],
	                            getFileName(this._aProviders[i]["logo"]));
	                oProvider.attachListener("onClick", $delegate(this, this._providerClick));
	                oProvider.render();
	            }
	            /*if(oNamePlace)
	            {
	                insertContent(oNamePlace.id, this._aProviders[i]["sName"]);
	            }*/
	        }
	    },

	    _getProviderPlaces: function() {
	        var sContent = [];
	        if(this._aProviders.length)
	        {
	            sContent.push('<table cellpadding="0" cellspacing="0" border="0" style="width: 1240px; height: 100%; margin-left: 20px"><tr>');
	            for(var i = 0, l = this._nRows * this._nColumns; i < l; i++)
	            {
	                if(i > 0 && !(i % this._nColumns)) sContent.push('</tr><tr>');
	                sContent.push('<td align="center" valign="middle" style="width: ', (100 / this._nColumns).toString(10), '%; height: ', (100 / this._nRows).toString(10), '%;"><div id="', this._sInstance, "_prv_", (i + 1), '"></div></td>');
	            }
	            sContent.push('</tr></table>');
	        }
	        return sContent.join('');
	    },

	    _providerClick: function(sender, eargs) {
	        this._getProvider(eargs.value);
	    },

	    _getProvider: function(sId) {
	        if($is(sId, String)) getScript('./config/' + storage.get("language") + "/" + sId + '.js', $delegate(this, this._applyProvider));
	    },
	    
	    _applyProvider: function()
	    {
                var oProvider = window.UIProvider.clone() || null;
                this._dataProvider.modifyProvider(oProvider);
	        if(!$isNoU(oProvider))
	        {
	            storage.put("provider", oProvider["id"]);
	            storage.put("last_page", document.location.href);
	            if (this._dataProvider.isTagO(oProvider, "ranges"))
	            {
	                document.location.href = "./cellular.html";
	            }
	            else if (this._dataProvider.isTagO(oProvider, "charity"))
	            {
	                document.location.href = "./charity.html";
	            }
	            else
	            {
	                if(!$isNoU(oProvider["prvPage"]) &&
                           oProvider["prvPage"].is(String) &&
                           oProvider["prvPage"].length > 0)
                        {
	                    this._postData(oProvider["prvPage"], oProvider);
	                }
	                else
	                {
	                    document.location.href = "./provider.html";
	                }
	            }
	        }
	    },

	    _postData: function(sUrl, oPrv) {
	        var oForm = new CForm(this, "oForm", sUrl);
	        if (!$isNoU(oPrv)) {
	            if (!$isNoU(oPrv["id"])) {
	                oForm.put("prv_id", oPrv["id"]);
	            }
	            if (!$isNoU(oPrv["sName"])) {
	                oForm.put("prv_name", oPrv["sName"]);
	            }
	            for (var f in oPrv["constParams"]) {
	                if (oPrv["constParams"].hasOwnProperty(f)) {
	                    if ($is(oPrv["constParams"][f], String)) {
	                        oForm.put(f, oPrv["constParams"][f]);
	                    }
	                }
	            }
	        }
	        oForm.submit();
	    },

	    _drawSearchString: function()
	    {
	        $(this._sInstance + "_field").innerHTML = this._sSearchString;
	        if(this.applyTimer) clearTimeout(this.applyTimer);
	        this.applyTimer = setTimeout(this._applySearchString, 250);
	    },

	    _makeText: function(nPage, nPages) {
	        return '<span style="color: #2268c6; font-size: 18px;">' + nPage.toString(10) + ' страница из ' + nPages.toString(10) + '</span>';
	    },

	    _onButtonClick: function(sender, eargs) {
	        var sKey = !$isNoU(eargs.key) ? eargs.key : eargs.value;
	        if (sKey == "BACKSPACE") {
	            if (this._sSearchString.length) {
	                this._sSearchString = this._sSearchString.substr(0, this._sSearchString.length - 1);
	                this._drawSearchString();
	            }
	        }
	        else {
	            if (this._sSearchString.length < 32) {
	                this._sSearchString += sKey;
	                this._drawSearchString();
	            }
	        }
	    },

	    _backButtonClick: function(sender, eargs) {
	        if (this._nCurIdx) {
	            this._nCurIdx -= this._nRows * this._nColumns;
	            this._drawProviders(this._sInstance + "_providers");
	            this._oRightBtmBtn.setEnabled(true);
	        }
	        else
	        {
	            if(document.location.hash.indexOf('.html') > -1)
	            {
	            	document.location.href = document.location.hash.substr(1);
	            }
	            else
	            {
	            	window.history.back(-1);
	            }
	        }
	    },

	    _menuButtonClick: function(sender, eargs) {
	        document.location.href = "./index.html";
	    },

	    _forwardButtonClick: function(sender, eargs) {
	        if ((this._nCurIdx + (this._nRows * this._nColumns)) < this._aProviders.length) {
	            this._nCurIdx += this._nRows * this._nColumns;
	            this._drawProviders(this._sInstance + "_providers");
	        }
	        else {
	            sender.setEnabled(false);
	        }
	    }
	}
);
