CPage = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        CPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._oLeftBtmBtn = null;
	        this._oCenterBtmBtn = null;
	        this._oRightBtmBtn = null;
	    },

	    _paint: function() {
	        var oPlace = $(this.getPlaceId());
	        if(oPlace)
	        {
	            oPlace.innerHTML =
                    '<div class="header">' +
                        '<table width="100%" height="100%">' +
                        '  <tr valign="middle">' +
                        '    <td width="162">' +
                       '        <div style="position:absolute; width: 139px; height: 180px; margin: -80px 0px 0px 20px;"></div>'+
                        '    </td>' +
                        '    <td width="1090">' +
                        //'        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden;"></div>' +
                                                                        ' <div  style="width: 1090px; height: 180px; margin-left: 7px; overflow: hidden; display: block;">' +
				'	<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%" style="margin-left: 220px;">' +
				'               <param name="allowScriptAccess" value="sameDomain" />' +
				'               <param name="movie" value="./swf/banner.png" />' +
				'               <param name="quality" value="best" />' +
				'               <param name="wmode" value="transparent" />' +
				'           </object>' +

				'</div>' +
                        '    </td>' +
                        '  </tr>' +
                        '</table>' +
                    '</div>' +
                    '<div id="' + this._sInstance + '_page_body" class="page_body"></div>' +
    	            '<div id="' + this._sInstance + '_bottom_menu"></div>';
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            this._createContent(this._sInstance + "_page_body");
	        }
  	        oPlace = null;
	    },

	    _createContent: function(sPlace) {
	        $(sPlace).innerHTML =
                '<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 100%;">' +
                '  <tr>' +
                '    <td align="center" valign="middle" style="width: 100%; height: 100%;">Content place</td>' +
                '  </tr>' +
                '</table>';
	    },

	    _createBottomMenu: function(sPlace) {
	        $(sPlace).innerHTML = '<div id="btn_left" class="bottom-button-left">Left</div>' +
                '<div id="btn_center" class="bottom-button-center">Center</div>' +
                '<div id="btn_right" class="bottom-button-right">Right</div>';
                /*'<table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">' +
                '  <tr>' +
                '    <td id="btn_left" align="left" valign="middle" style="width: 33%; height: 100%;">Left</td>' +
                '    <td id="btn_center" align="center" valign="middle" style="width: 34%; height: 100%;">Center</td>' +
                '    <td id="btn_right" align="right" valign="middle" style="width: 33%; height: 100%;">Right</td>' +
                '  </tr>' +
                '</table>';*/
	    },

	    getLeftBtmBtn: function() {
	        return this._oLeftBtmBtn;
	    },

	    getCenterBtmBtn: function() {
	        return this._oCenterBtmBtn;
	    },

	    getRightBtmBtn: function() {
	        return this._oRightBtmBtn;
	    }
	}
);


