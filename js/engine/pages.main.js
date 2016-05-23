



CMainPage = createClass
(
	CPage,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        CMainPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._js = null;
	        this._bIsDataLoaded = false;
	        this._dataProvider = null;
	        this._aTopElements = [];
	        this._aGroups = [];
	        this._sAdvertPlace = "Main";
	        this._nTopElementsMaxCount = 6;
	        this._nRows = 3;
	        this._nColumns = 4;
	    },

	    _getData: function() {
	        this._bIsDataLoaded = true;
	        this._aTopElements = prv_on_first_page;
	        this._aGroups = UIGroups;
	        getScript('./js/engine/data.js', function() {
	            this._dataProvider = new CJsDataProvider(this, "_dataProvider");
	        }, [], this);
	    },

	    _paint: function() {
	        log.add('CMainPage render start');
	        var hash = getHash();
	        if (!hash) {
	            var oPlace = $(this.getPlaceId());
	            if (!$isNoU(oPlace)) {
	                oPlace.innerHTML = [
		                '<div style="width: 100%; height: 180px; padding-top: 18px">',
		                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="180">',
		                '  <tr valign="middle">',
		                '    <td width="162" height="180">',
		                '        <div style="position:absolute; width: 139px; height: 180px; margin: -80px 0px 0px 20px;"></div>',
		                '    </td>',
		                '    <td width="1090" height="180">',
                        ' <div  style="width: 1090px; height: 180px; margin-left: 7px; overflow: hidden; display: block;">',
                        	                        '           <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">' +
                            '               <param name="allowScriptAccess" value="sameDomain" />' +
                           // '               <param name="movie" value="./swf/banner.swf" />' +
                            '               <param name="quality" value="best" />' +
                            '               <param name="wmode" value="transparent" />' +
                            '           </object>' +
                            '</div>',
		               // '        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden; display: block;"></div>',
		                '    </td>',
		                '  </tr>',
		                '</table>',
		            '</div>',
		                '<div id="', this._sInstance, '_page_body" style="width: 100%; height: 691px; overflow: hidden;"></div>',
	    	                '<div align="center" style="width: 100%; height: 121px;"><div id="' + this._sInstance + '_bottom_menu"></div></div>'].join('');
	                this._createBottomMenu(this._sInstance + "_bottom_menu");
	                this._createContent(this._sInstance + "_page_body");
	             
	            }
	            log.add('CMainPage render placed');
	            this._getData();
	            this._createContent(this._sInstance + "_content");
	            getScript('./js/engine/storage.js', function() {
	                startAdvert("Main");
	            }, []);
	        }
	        else {
	            this._getData();
	            getScript('./js/engine/storage.js', function(h) {
	                this._clickGroup(h[1], h);
	                storage.get("CurrentTab", 0);
	            }, [hash], this);
	        }
	        log.add('CMainPage render finish');
	    },

	    _createContent: function(sPlace) {
	      var sLang = storage.get("language");
	        if (!this._bIsDataLoaded) {
	            log.add('TABLE');
	            $(sPlace).innerHTML = ['<div id="', this._sInstance, '_content" align="center"></div>'].join('');
	        }
	        else if(sLang == "F1"){
	            var splace = $(sPlace);
	            splace.vAlign = "top";
	            splace.innerHTML = ['<div id="', this._sInstance, '_top_elements_F1"></div><div id="', this._sInstance, '_groups_holder"></div>'].join('');

	            this._drawTopElements(this._sInstance + "_top_elements_F1");
	            log.add('drawTopElements');

	            this._drawGroups(this._sInstance + "_groups_holder");
	            log.add('drawGroups');

	        }
	      else {
	            var splace = $(sPlace);
	            splace.vAlign = "top";
	            splace.innerHTML = ['<div id="', this._sInstance, '_top_elements_FC"></div><div id="', this._sInstance, '_groups_holder"></div>'].join('');

	            this._drawTopElements(this._sInstance + "_top_elements_FC");
	            log.add('drawTopElements');

	            this._drawGroups(this._sInstance + "_groups_holder");
	            log.add('drawGroups');

	        }
	    },

	    _drawTopElements: function(sPlace) {
	        if (this._aTopElements.length) {
	            $(sPlace).innerHTML = this._getTopElementPlaces(getElementRect(sPlace));
	            if (this._aTopElements[0]._typeName == 'Object') {
	                this._createTopElements();
	            }
	            else {
	                this._aTopElements.loaded = 0;
	                this._preLoadTopElements();
	            }
	        }
	        else {
	            $(sPlace).innerHTML = "";
	        }
	    },

	    _preLoadTopElements: function() {

	        var i = this._aTopElements.loaded;
	        if (+this._aTopElements[i] >= 0) {
	            getScript("./config/" + storage.get("language") + "/" + this._aTopElements[i] + ".js", this._preCreateTopElements, [i], this);
	        }
	        else {
	            this._aTopElements.splice(i, 1);
	            this._preLoadTopElements();
	        }
	    },
	    _preCreateTopElements: function(i) {
	        this._aTopElements.loaded++;

	        this._aTopElements[i] = {
	            elementType: +UIProvider.id >= 0 ? 'PROVIDER' : 'GROUP', // TODO
	            elementValue: UIProvider.clone()
	        };
	        UIProvider = null;
	        delete UIProvider;
	        window.CollectGarbage && window.CollectGarbage();
	        if (this._aTopElements.loaded == this._aTopElements.length) {
	            this._createTopElements();
	        }
	        else {
	            this._preLoadTopElements();
	        }
	    },

	    _drawGroups: function(sPlace) {
	        var splace = $(sPlace);
	        if (this._aGroups.length) {
	            splace.innerHTML = this._getGroupPlaces();
	            return this._createGroups();
	        }
	        else {
	            splace.innerHTML = "";
	        }
	    },

	    _createBottomMenu: function(sPlace) {

	        var sLang = storage.get("language");





	            CMainPage.base._createBottomMenu.apply(this, arguments);
	            this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "null.gif");
	            this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu_" + sLang + ".gif", "menu_press_" + sLang + ".gif");
	            this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "null.gif", "null.gif");
	            this._oLeftBtmBtn.render();
	            this._oCenterBtmBtn.render();
	            this._oRightBtmBtn.render();
	            this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._epaButtonClick));
	            this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	            this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._searchButtonClick));
	     

	    },

	    _createGroups: function() {
	        for (var i = 0, l = this._aGroups.length; i < l; i++) {
	            var oPlace = $(this._sInstance + "_group_" + (i + 1));
	            if (oPlace) {
	                var oGroup = new CGroupButton(this, "grp" + (i + 1),
	                                oPlace.id,
	                                this._aGroups[i].id,
	                                this._aGroups[i].name,
	                                getFileName(this._aGroups[i].logo));
	                oGroup.attachListener("onClick", $delegate(this, this._elementClick));
	                oGroup.render();
	            }
	        }
	    },

	    _createTopElements: function() {
	        for (var i = 0, l = this._nTopElementsMaxCount; i < l && i < this._aTopElements.length; i++) {
	            var oPlace = $(this._sInstance + "_top_element_" + (i + 1));
	            if (oPlace) {
	                var el = this._aTopElements[i];
	                if (el) {
	                    var oElement = new CTopElementButton(this,
						"el" + (i + 1),
						oPlace.id,
						el.elementValue.id,
						el.elementType == "PROVIDER" ? (el.elementValue.buttonName || el.elementValue.sName) : el.elementValue.name,
						getFileName(el.elementValue.logo));
	                    oElement.attachListener("onClick", $delegate(this, this._elementClick));
	                    oElement.render();
	                }
	            }
	        }
	        this._correctTopElements();
	    },

	    _getTopElementPlaces: function(oParentRect) {
	        var sContent = [];
	        if (oParentRect && this._aTopElements) {
	            var l = this._aTopElements.length,
	        	    w = 'width:' + Math.floor((1240 - l) / l) + 'px';
	            for (var i = 0; i < l; i++) {
	                var cl = 'top-element';
	                if (i + 1 == l) cl += ' top-element-last';
	                sContent.push('<div id="', this._sInstance, '_top_element_', (i + 1), '" class="', cl, '" style="', w, '"></div>');
	            }
	        }
	        return sContent.join('');
	    },

	    _correctTopElements: function() {
	        if (this._aTopElements) {
	            var l = this._aTopElements.length,
	        	    w = Math.floor((1240 - l) / l) + 'px',
	        	    last,
	        	    oPlace,
	        	    i = 0;
	            do {
	                oPlace = $(this._sInstance + "_top_element_" + (i + 1));
	                if (oPlace) {
	                    if (l <= this._nTopElementsMaxCount && this._aTopElements[i]) {
	                        oPlace.style.width = w;
	                        oPlace.style.display = 'block';
	                        last = oPlace;
	                    }
	                    else {
	                        oPlace.style.display = 'none';
	                    }
	                }
	                i++;
	            }
	            while (oPlace)
	            if (last) last.className = 'top-element top-element-last';
	        }
	    },


	    _getGroupPlaces: function() {
	        var sContent = [];
	        if (this._aGroups.length) {
	            for (var i = 0; i < (this._nRows * this._nColumns); i++) {
	                if ((i + 1) > this._aGroups.length) {
	                    sContent.push('<div class="group-place group-button" style="background: url(\'./img/ui/logo_b.gif\') no-repeat center;"></div>');
	                }
	                else {
	                    sContent.push('<div id="', this._sInstance, '_group_', (i + 1), '" class="group-place"></div>');
	                }
	            }
	        }
	        return sContent.join('');
	    },

	    _elementClick: function CMainPage$_elementClick(sender, eargs) {
	        var bFlag = false,
	            sFirstLwlGrpId = "0",
	            prvId = eargs.value;

	        if (/^-\d+$/.test(prvId)) {
//	            if (prvId == "-10000120") {
//	                document.location.href = 'cellular.html';
//	                return;
//	            }
	            this._clickGroup(prvId);
	        }
	        else 
	        if (/^\d+$/.test(prvId))
	            this._clickProvider(prvId);
	    },

	    _clickGroup: function(prvId, hash) {
	        top.storage.put("group", prvId);
	     




	        //if (prvId == -100003) {  // отключение Молдовы --------------------------------------
	        //top.location.href = "./main.html";
	        //}




	        var group = null;
	        for (var i = 0, l = this._aGroups.length; i < l; i++) {
	            if (this._aGroups[i].id == prvId) {
	                group = this._aGroups[i];
	                break;
	            }
	        }

//		    if (group && group.tag.indexOf('ranges') > -1) {
//		        top.storage.put("provider", "null");
//		        top.storage.put("last_page", document.location.href);
//		        top.location.href = "./cellular.html";
//	        }
//	        else if (group && group.tag.indexOf('ranges_manual') > -1) {
//	            top.storage.put("last_page", document.location.href);
//	            top.location.href = "./pages_c.html";
//	        }
//	        else if (group && group.tag.indexOf('lottery') > -1) {
//	            top.storage.put("last_page", document.location.href);
//	            top.location.href = "./loto_index.html";
//	        }
//	        else {
	            var h = hash;
	            setTimeout($delegate(this, function() {
	                this._loadGroup(prvId, group, h);
	            }), 25);
	           
//	        }
	    },

	    _loadGroup: function(prvId, group, hash) {
var sLang = storage.get("language");
	        if (!group) group = {};
	        getScript("./config/" + sLang + "/" + prvId + ".js", function() {
	            group['__objects'] = window.UIGroup;
	            window.UIGroup = null;
	            getScript('./js/engine/pages.pages.js', function() {
	                var page = newObject(CPagesPage, null, null, null, "page", "content", prvId, this._aGroups);
	                page.render();
	                if (hash && hash.length > 3) {
	                    page._nCurrentStr = hash[3];
	                    page._contentManagement();
	                }
	            }, [], this);
	        }, [], this);
	        document.location.hash = '#' + prvId;
	    },

	    _clickProvider: function(sId) {
           
	        if ($is(sId, String)) { // TODO: getScript
	            getScript("./config/" + storage.get("language") + "/" + sId + ".js", this._prvLoaded, [], this);
	            /*var _this = this;
	            this._js = document.createElement("script");
	            this._js.language = "javascript";
	            this._js.src = "./config/" + sId + ".js";
	            this._js.onreadystatechange = function () {
	            if (_this._js.readyState == "loaded" || _this._js.readyState == "complete")
	            _this._prvLoaded();
	            }
	            this._js.onload = $delegate(this, this._prvLoaded);
	            document.body.appendChild(this._js);*/
	        }
	    },

	    _prvLoaded: function() {
	        var oRes = null;
	        try {
	            oRes = window.UIProvider.clone();
	            this._dataProvider.modifyProvider(oRes);
	        }
	        catch (e) {
	            oRes = null;
	        }
	        if (!$isNoU(this._js)) {
	            document.body.removeChild(this._js);
	        }
	        this._processProvider(oRes);
	    },

	    _processProvider: function(oProvider) {
	        if (!$isNoU(oProvider)) {
	            top.storage.put("provider", oProvider["id"]);

//	            if (oProvider.tag && oProvider.tag.indexOf('ranges') > -1) {
//	                top.storage.put("last_page", document.location.href);
//	                top.location.href = "./cellular.html";
//	            }
//	            else
//	            	if (oProvider.tag && oProvider.tag.indexOf('ranges_manual') > -1) {
//	                top.storage.put("last_page", document.location.href);
//	                top.location.href = "./pages_c.html";
//	            }
//	            else 
if (oProvider.tag && oProvider.tag.indexOf('charity') > -1) {
	                top.storage.put("last_page", document.location.href);
	                top.location.href = "./charity.html";
	            }
	            else {
	                top.storage.put("last_page", document.location.href);
	                if (!$isNoU(oProvider["prvPage"]) && oProvider["prvPage"].is(String) && oProvider["prvPage"].length > 0) {
	                    this._postData(oProvider["prvPage"], oProvider);
	                }
	                else {
	                    top.location.href = "./provider.html";
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

	    //	    _epaButtonClick: function(sender, eargs) {
	    //	    	top.storage.put("last_page", document.location.href);
	    //	        top.location.href = "./epa.html";
	    //	    },
	    _menuButtonClick: function(sender, eargs) {
	        top.location.href = "./index.html";
	    }

	    //	    _searchButtonClick: function(sender, eargs) {
	    //	        top.location.href = "./search_providers.html#main.html";
	    //	        //	        var page = newObject(CSearchPage, null, null, null, "page", "content");
	    //	        //	        page.render();
	    //	    }
	}
);


