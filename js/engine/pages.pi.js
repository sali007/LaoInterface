	CPIPage = createClass
(
	CPage,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        CPIPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	    },

	    _paint: function() {
	        var oPlace = $(this.getPlaceId());
	        if (!$isNoU(oPlace)) {
	            oPlace.innerHTML =
                    '<div id="' + this._sInstance + '_page_body" style="width: 100%; height: 880px; overflow: hidden;"></div>' +
                    '<div align="center" style="width: 100%; height: 121px; margin-top: 5px;"><div id="' + this._sInstance + '_bottom_menu"></div></div>';
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            this._createContent(this._sInstance + "_page_body");
	        }
	    }
	}
);
