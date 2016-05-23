log.add('Base start');
// base component class definition
CComponent = createClass
(
	null,
	{
	    ctor: function(oParent, sInstance) {
	        Function.validateParams(arguments, [
	                { name: "oParent", type: Object, canBeNull: true },
	                { name: "sInstance", type: String, canBeNull: true }
            ]);
	        this._oParent = oParent;
	        this._sInstance = 
	           !$isNoU(sInstance) ? ((!$isNoU(oParent)) ? oParent.getInstance() + "." + sInstance : sInstance) : "";
	        this._aListeners = new Array();
	    },

	    destructor: function() {
	        this.notify("onDestroy");
	    },

	    create: function() {
	        this._initialize();
	        this.notify("onCreate");
	    },

	    // additional method of initializing (redefine)
	    _initialize: function() {
	        //NOTIMPLEMENTED
	    },

	    attachListener: function(eventType, eventListener) {
	        if (!Function.validateParams(arguments, [
	                { name: "eventType", type: String },
	                { name: "eventListener", type: Function }
	            ])) {
	            return;
	        }

	        if (!this._aListeners[eventType]) {
	            this._aListeners[eventType] = new Array();
	        }
	        this._aListeners[eventType].push(eventListener);
	    },

	    detachListener: function(eventType, eventListener) {
	        if (!Function.validateParams(arguments, [
	                { name: "eventType", type: String },
	                { name: "eventListener", type: Function, canBeNull: true, canBeEmpty: true }
	            ])) {
	            return [];
	        }
	        var a = [];
	        if (!$isNoU(eventListener) && eventListener.is(Function)) {
	            if (this._aListeners[eventType] && this._aListeners[eventType].is(Array)) {
	                for (var i = 0; i < this._aListeners[eventType].length; i++) {
	                    if (this._aListeners[eventType][i].toString() == eventListener.toString()) {
	                        a.push(this._aListeners[eventType].splice(i, 1));
	                        return a;
	                    }
	                }
	            }
	        }
	        else {
	            var a = this._aListeners[eventType];
	            this._aListeners[eventType] = [];
	            return a;
	        }
	    },

	    notify: function(eventType, eventArgs) {
	        if (!Function.validateParams(arguments, [
	                    { name: "eventType", type: String },
	                    { name: "eventArgs", type: Object, canBeNull: true, canBeEmpty: true }
	                ])) return;

	        var listeners = this._aListeners[eventType];
	        if (!listeners || listeners._typeName !== "Array") return;
	        
	        for (var i = 0, l = listeners.length; i < l; i++)
	        {
	            if (Object.isNullOrUndefined(eventArgs)) eventArgs = {};
	            
	            try
	            {
	                listeners[i](this, eventArgs);
	            }
	            catch (e)
	            {
	                al("Exception in " + this.getInstance() +
	                    ".notify(\"" + eventType + "\")\ndescription: " +
	                    e.description);
	            }
	        }
	    },

	    getParent: function() {
	        return this._oParent;
	    },

	    getInstance: function() {
	        return this._sInstance;
	    }
	}
);

	CControl = createClass
(
	CComponent,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        var args = { "0": arguments["2"] };
	        Function.validateParams(args, [
	                    { name: "sCtrlPlace", type: String }
            ]);
	        CControl.base.ctor.call(this, oParent, sInstance);
	        this._sPlace = sCtrlPlace;
	        this._sDivCssClass = "";
	        this._sKeyCode = "";
	    },

	    destructor: function() {
	        var oPlace = $(this._sPlace);
	        if (!Object.isNullOrUndefined(oPlace)) {
	            oPlace.innerHTML = "";
	            oPlace = null;
	        }
	        CControl.base.destructor.apply(this, arguments);
	    },

	    _paint: function() {
	        var oPlace = $(this._sPlace);
	        if (!Object.isNullOrUndefined(oPlace)) {
	            with (oPlace.style) {
	                background = "#a4c0c1";
	                borderWidth = "1px";
	                borderStyle = "solid";
	                borderColor = "#000099";
	            }
	            oPlace.align = "center";
	            oPlace.innerHTML = 'Control "' + this._sInstance + '"';
	        }
	    },
	    
	    render: function() {
	        this._paint();
	        this.notify("onRender");
	    },

	    getPlaceId: function() {
	        return this._sPlace;
	    },

	    setCtrlDivCssClass: function(sClass) {
	        this._sDivCssClass = sClass;
	        setCssClass(this.getPlaceId(), sClass);
	    },

	    getCtrlDivCssClass: function() {
	        return this._sDivCssClass;
	    }
	}
);

	CKeyCodesTable = createClass
(
	CComponent,
	{
	    ctor: function() {
	        CKeyCodesTable.base.ctor.call(this, null, null);
	        this._oKeyCodes = {};
	    },

	    registerBtn: function(oBtn, sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "oBtn", type: CButton },
                { name: "sKeyCode", type: String }
            ]);
	        if ($isNoU(this._oKeyCodes[sKeyCode])) {
	            this._oKeyCodes[sKeyCode] = [];
	        }
	        for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	            if (this._oKeyCodes[sKeyCode][i] == oBtn) {
	                return;
	            }
	        }
	        this._oKeyCodes[sKeyCode].push(oBtn);
	    },

	    unregisterBtn: function(oBtn, sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "oBtn", type: CButton },
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._oKeyCodes[sKeyCode])) {
	            for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	                if (this._oKeyCodes[sKeyCode][i] == oBtn) {
	                    this._oKeyCodes[sKeyCode].splice(i, 1);
	                }
	            }
	        }
	    },

	    processKey: function(sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._oKeyCodes[sKeyCode])) {
	            for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	                this._oKeyCodes[sKeyCode][i].click();
	            }
	        }
	    }
	}
);

	CButton = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        CButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._kct = null;
	        this._sKeyCode = "";
	        if (!$isNoU(window.keyCodesTable) && keyCodesTable.is(CKeyCodesTable)) {
	            this._kct = keyCodesTable;
	        }
	    },

	    _initialize: function() {
	        attachEventListener(this.getPlaceId(), "click",
	            $delegate(this, this.click));
	    },

	    _getKeyCodesTable: function() {
	        return this._kct;
	    },

	    setKeyCode: function(sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._kct) && sKeyCode.length > 0) {
	            this._sKeyCode = sKeyCode;
	            this._kct.registerBtn(this, sKeyCode);
	        }
	    },

	    removeKeyCode: function() {
	        if (!$isNoU(this._kct) && this._sKeyCode.length > 0) {
	            this._kct.unregisterBtn(this, this._sKeyCode);
	        }
	    },

	    getKeyCode: function() {
	        return this._sKeyCode;
	    },

	    click: function() {
	        this.notify("onClick");
	        return false;
	    }
	}
);

	CBtmMenuButton = createClass
(
	CButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sEnabledImg, sDisabledImg) {
	        var args = { "0": arguments["3"], "1": arguments["4"] };
	        Function.validateParams(args, [
                { name: "sEnabledImg", type: String },
                { name: "sDisabledImg", type: String, canBeNull: true, canBeEmpty: true }
            ]);
	        CBtmMenuButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sEnabledImg = sEnabledImg;
	        this._sDisabledImg = sEnabledImg;
	        this._sBaseFolder = "./img/ui/navigation/";
	        if ($is(sDisabledImg, String)) {
	            this._sDisabledImg = sDisabledImg;
	        }
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oDiv)) {
	            //oDiv.innerHTML = "<img alt=\"\" src=\"" + this._sBaseFolder + this._sEnabledImg + "\" onMouseOver=\"this.src='" + this._sBaseFolder + this._sDisabledImg + "'\" onMouseOut=\"this.src='" + this._sBaseFolder + this._sEnabledImg + "'\">";
	            oDiv.innerHTML = "<img src=\"" + this._sBaseFolder + this._sEnabledImg + "\" />";
	            oDiv.onclick = null;
	            oDiv.childNodes[0].onclick = $delegate(this, this.click);
	            var options = { color: 30 };
	            if(this._sEnabledImg == 'menu.gif') options = { saturation: 1, brightness: 200 };
	            this.shadow = new CInnerShadow(oDiv.childNodes[0], options);
	        }
	    },

	    setEnabled: function(bEnabled) {
	        var oDiv = $(this.getPlaceId());
	        if (!($isNoU(oDiv) || $isNoU(oDiv.childNodes[0]))) {
	            if ($bool(bEnabled)) {
	                oDiv.childNodes[0].style.display = "block";
			this.shadow.el.style.display = "block";
	                oDiv.childNodes[0].onclick = $delegate(this, this.click);
	            }
	            else {
	                oDiv.childNodes[0].style.display = "none";
			this.shadow.el.style.display = "none";
	                oDiv.childNodes[0].onclick = null;
	            }
	        }
	    }
	}
);

	CElementButton = createClass
(
	CButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sId, sName, sLogo) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
                { name: "sId", type: String },
                { name: "sPrvName", type: String, canBeNull: true, canBeEmpty: true },
                { name: "sLogo", type: String, canBeNull: true, canBeEmpty: true }
            ]);
	        CElementButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sId = sId;
	        this._sName = "";
	        this._sLogo = "";
	        if ($is(sName, String)) {
	            this._sName = sName;
	        }
	        if (!$isNoU(sLogo) && sLogo.is(String)) {
	            this._sLogo = sLogo;
	        }
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if(!$isNoU(oDiv))
	        {
	            oDiv.innerHTML =
	            ['<div id="', this.getInstance(), '_div" class="provider-button">',
                    	'<div style="background-image: url(\'./img/ui_item/', getFileName(this._sLogo), '\')"></div>',
                    	'<p>', autohyphen.hyphenizeText(this._sName), '</p>',
                    '</div>'].join('');
	            oDiv.onclick = null;

                    var p = oDiv.getElementsByTagName('p')[0];
                    p.style.paddingTop = (oDiv.firstChild.clientHeight - p.clientHeight) / 2 + 'px';
                    
	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	            new CInnerShadow(oDiv.firstChild, { saturation: 1, brightness: 250 });
	        }
	    },

	    click: function() {
	        var eventArgs = {};
	        eventArgs.value = this._sId;
	        this.notify("onClick", eventArgs);
	    },

	    getId: function() {
	        return this._sId;
	    },

	    getName: function() {
	        return this._sName;
	    },

	    getLogo: function() {
	        return this._sLogo;
	    }
	}
);

	CDispButton = createClass
(
	CButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sName, sType, sDispDesc, sExtraName) {
	        var args = { "0": arguments["3"] };
	        CElementButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sName = "";
	        this._sType = "";
	        this._sDispDesc = sDispDesc;
	        this._sExtraName = sExtraName;
	        if ($is(sName, String)) {
	            this._sName = sName;
	        }
	        if ($is(sType, String)) {
	            this._sType = sType;
	        }
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            oDiv.innerHTML =
	                '<div id="' + this.getInstance() + '_div" style="width: 241px; height: 131px; padding-top: 45px; background: url(\'./img/ui/vc/logo.gif\') no-repeat; text-align: center; font-size: 20px; overflow: hidden;">' + this._sName + '</div>';
	            oDiv.onclick = null;
	            attachEventListener(oDiv.childNodes[0].id, "click",
	                $delegate(this, this.click));
	        }
	    },

	    click: function() {
	        var eventArgs = {};
	        eventArgs.value = this._sName;
	        eventArgs.type = this._sType;
	        eventArgs.desc = this._sDispDesc;
	        eventArgs.extraName = this._sExtraName;
	        this.notify("onClick", eventArgs);
	    },

	    getId: function() {
	        return this._sId;
	    },

	    getName: function() {
	        return this._sName;
	    },

	    getLogo: function() {
	        return this._sLogo;
	    }
	}
);

	CTopElementButton = createClass
(
	CElementButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sId, sName, sLogo) {
	    	this.sName = sName;
	        CTopElementButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId, sName, sLogo);
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            if (this._sLogo.length) {
	                oDiv.innerHTML = 
	                [
	                    '<div style="background: url(\'./img/ui/grp_panel/bg_tp.gif\') no-repeat">',
	                    '   <table width="100%" height="110" cellpadding="0" cellspacing="0" border="0">',
	                    '       <tr><td width="100%" height="100%" align="center"><img src="./img/ui_item/' + this._sLogo + '" /></td></tr>',
	                    '   </table>',
	                    '</div>'
	                ].join('');
	            }
	            else {
	                oDiv.innerHTML = [
			            '<div style="background: url(\'./img/ui/grp_panel/bg_tp.gif\') no-repeat">',
		            	'<table width="100%" height="110" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;"><tr>',
		            	'<td width="100%" height="100%" align="center" valign="middle">', this._sName, '</td>',
		            	'</tr></table></div>'
                    ].join('');
	            }
	            oDiv.innerHTML += this.sName;
	            oDiv.onclick = null;
	            oDiv.childNodes[0].onclick = $delegate(this, this.click);
	        }
	    }
	}
);

	CGroupButton = createClass
(
	CElementButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sId, sName, sLogo) {
	        CGroupButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sId, sName, sLogo);
	    },

	    _paint: function () {
	        var placeId = this.getPlaceId(),
	            oDiv = $(placeId);
	        oDiv.innerHTML = [
	        	'<div class="group-button logo-bs"><div style="background-image: url(\'./img/ui_item/', this._sLogo, '\')">',
	        		'<table><tr><td>', this._sName, '</td></tr></table>',
	        	'</div></div>'
                ].join('');
                
	        attachEventListener(placeId, "click", $delegate(this, this.click));
	    	new CInnerShadow(oDiv.firstChild);
	    }
	}
);


var waitShadows = [],
    innerShadows = [];

attachEventListener(window, 'beforeunload', function(){

	while(innerShadows.length)
	{
		var is = innerShadows.shift();
		if(is._paper)
		{
			is._rects.remove();
			is._rects = null;
			delete is._rects;
			
			is._paper.clear();
			is._paper.remove();

			if(is._paper.canvas.parentNode) is._paper.canvas.parentNode.removeChild(is._parentNode);
			is._paper.canvas._parentNode = null;
			delete is._paper.canvas._parentNode;

			is._paper = null;
			delete is._paper;
		}
		/*if(is._parentNode.parentNode) is._parentNode.parentNode.removeChild(is._parentNode);*/
		is._parentNode = null;
		delete is._parentNode;

		if(is.el.parentNode) is.el.parentNode.removeChild(is.el);
		is.el = null;
		delete is.el;

		is = null;
		delete is;
	}
	
	Raphael = null;
	delete Raphael;
	
	window.CollectGarbage && window.CollectGarbage();
	
});

var canRaphael = true,
    raphaelLoaded = false,
    gifColors = {
    	'210-1': 'gray',
    	'30-100': 'orange',
    	'210-100': 'blue'
    };

raphaelLoaded = null;
getScript('./js/raph.full.js', function(){
	raphaelLoaded = true;
}, [], window, function(){
	raphaelLoaded = true;
	canRaphael = false;
});


	CInnerShadow = createClass
(
	CComponent,
	{
	    ctor: function (parent, options, callback) {
		if(!parent || $isNoU(parent)) return false;
	    	this._parentNode = parent;
	    	this.options = options || {};
	        this._color = this.options.color || 210; //30
	        this._satur = this.options.saturation || 100; //30
	        this._brigh = this.options.brightness || 100; //30
	        this._width = this.options.width || null;
	        this._height = this.options.height || null;
	        this._switch = this.options.swtch || false;
	        this._ellipse = this.options.ellipse || false;
	        this._callback = callback || null;
	        this._active = false;
	    	
	    	this.el = document.createElement('div');
		document.getElementsByTagName('body')[0].appendChild(this.el);
	    	
	    	innerShadows.push(this);
		
		this.init();
		return this;
	    },
	    
	    init: function() {
	        if(raphaelLoaded === false)
	        {
		        raphaelLoaded = null;
		        getScript('./js/raph.full.js', this._paint, [], this);
		}
		else if(raphaelLoaded === null)
		{
			setTimeout($delegate(this, this.init), 50);
		}
		else
		{
		        this._paint();
	       	}
	    },
	    
	    _paint: function () {
	    	raphaelLoaded = true;
	    	if(!this._parentNode || $isNoU(this._parentNode)) return false;
	    	if(!this.el || $isNoU(this.el) || !this.el.style) return false;
	    	var pos = this._pos = getPosition(this._parentNode);

	    	if(this._width) this._pos.width = this._width;
	    	if(this._height) this._pos.height = this._height;

	    	this.el.style.left = pos.left + 'px';
	    	this.el.style.top = pos.top + 'px';
	    	this.el.style.width = pos.width + 'px';
		this.el.style.height = pos.height + 'px';
		this.el.className = 'press-shadow';

		this._radius = this.options.radius || 18;
		this._rects = null;

		attachEventListener(this.el, 'mousedown', $delegate(this, this.pressDown));
		if(!this._switch)
		{
			attachEventListener(this.el, 'mousemove', $delegate(this, this.pressCheck));
			attachEventListener(this.el, 'mouseup', $delegate(this, this.pressUp));
		}
	    },
	    
	    pressDown: function() {
		log.add('pressDown');
	    	if(!this._parentNode || !this._parentNode.offsetParent || this._parentNode.style.display == 'none' || this._parentNode.offsetWidth == 0) return false;
	    	if(!this._switch)
	    	{
		    	this.show();
		    	this.pressGo();
	    	}
	    	else if(!this._active)
	    	{
	    		this.show();
	    		this.fire();
	    	}
	    	else
	    	{
	    		this.hide();
	    		this.fire();
	    	}
	    },
	    
	    show: function() {
		this._active = true;
	    	if(!canRaphael)
	    	{
	    		this.showGIF();
	    	}
	    	else
	    	{
		    	try
		    	{
		    		this.showSVG();
			}
			catch(e)
			{
				canRaphael = false;
		    		this.showGIF();
			}
		}
	    },

	    showSVG: function() {
	    	if(!this._rects)
	    	{
	    		log.add('Create');
			var offs = this._ellipse ? 42 : 0;
			this._paper = Raphael(this.el, this._pos.width, this._pos.height);
			this._rects = this._paper.set();
			this._rects.push(
				this._paper.rect(0, offs, this._radius * 2, this._pos.height - offs, this._radius)
				.attr({
					fill: '0-hsb('+this._color+','+this._satur+','+(this._brigh*0.4)+')-hsb('+this._color+','+(this._satur*0.7)+','+(this._brigh*0.7)+'):30',
					opacity: 0,
					stroke: 'none'
				}),
	
				this._paper.rect(this._pos.width - (this._radius * 2), offs, this._radius * 2, this._pos.height - offs, this._radius)
				.attr({
					fill: '180-hsb('+this._color+','+this._satur+','+(this._brigh*0.4)+')-hsb('+this._color+','+(this._satur*0.7)+','+(this._brigh*0.7)+'):30',
					opacity: 0,
					stroke: 'none'
				}),
	
				(!this._ellipse ? this._paper.rect(0, 0, this._pos.width, this._pos.height * 0.5, this._radius) : this._paper.path().attr({ path: 'M 10,56 c 13,-28 166,-56 296,-56 133,0 281,34 296,56 z'}))
				.attr({
					fill: '270-hsb('+this._color+','+this._satur+','+(this._brigh*0.3)+')-hsb('+this._color+','+this._satur+','+(this._brigh*0.6)+'):15-hsb('+this._color+','+(this._satur*0.7)+','+(this._brigh*0.6)+'):80',
					opacity: 0,
					stroke: 'none'
				})
			);
	    	}
	    	this.el.appendChild(document.createElement('span'));
	    	this._rects.show();
	    },

	    showGIF: function() {
	    	if(this._radius == 18)
	    	{
		    	if(!this.el.innerHTML)
		    	{
			    	this.el.innerHTML = '<div><div class="gif-shadow-tl"></div> \
							<div class="gif-shadow-tr"></div> \
							<div class="gif-shadow-l"></div> \
							<div class="gif-shadow-r"></div></div>';
			    	this.el.firstChild.style.height = this._pos.height - (this._radius * 1.5) + 'px';
			    	this.el.firstChild.className = 'gif-shadow gif-shadow-'+gifColors[this._color+'-'+this._satur]+' gif-shadow-hide';
			}
			var fch = this.el.firstChild,
			    fcs = fch.childNodes;
			fch.className = fch.className.replace('gif-shadow-hide', 'gif-shadow-show');

			if(fcs[0].clientWidth % 2 == 0) fcs[0].style.width = fcs[0].clientWidth + 1 + 'px';
			
			fcs[1].style.width = fch.clientWidth - fcs[0].clientWidth + 'px';
			fcs[1].style.left = fcs[0].clientWidth + 'px';
		}
	    },

	    pressGo: function() {
	    	this._hold = true;
	    	this._pressFunc = $delegate(this, this.pressUp);
	    	this._pressTimes = 0;
	    	this._pressTimer = setTimeout(this._pressFunc, 50);
	    },
	    pressCheck: function() {
	    	if(this._hold)
	    	{
	    		log.add('pressCheck');
	    		if(this._pressTimer) clearTimeout(this._pressTimer);
	    		if(this._pressTimes++ > 100)
	    		{
	    			this._pressFunc();
	    		}
	    		else
	    		{
		    		this._pressTimer = setTimeout(this._pressFunc, 50);
		    	}
	    	}
	    },
	    pressUp: function() {
	    	log.add('pressUp');
	    	if(this._hold)
	    	{
		    	this._hold = false;
		    	this._pressTimer && clearTimeout(this._pressTimer);
			this.fire();
			this.hide();
	    	}
	    },
	    fire: function() {
	    	this._callback && this._callback(this._parentNode);
    		fireEvent(this._parentNode, 'click');
	    },
	    hide: function() {
	    	this._active = false;
	    	if(canRaphael && this._rects)
	    	{
	    		this._rects.hide();
	    		this.el.removeChild(this.el.lastChild);
	    	}
	    	else if(this._radius == 18)
	    	{
			this.el.firstChild.className = this.el.firstChild.className.replace('gif-shadow-show', 'gif-shadow-hide');
	    	}
	    }
	    
	}
);


CValueButton = createClass
(
	CButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sValue) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
	                    { name: "sValue", type: String, canBeNull: true, canBeEmpty: true }
            ]);
	        CValueButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sValue = sValue;
	    },

	    click: function() {
	        var eventArgs = {};
	        if (this._sValue == "BACKSPACE")
	            eventArgs.key = this._sValue;
	        else
	            eventArgs.value = this._sValue;
	        this.notify("onClick", eventArgs);
	    }
	}
);

CImageButton = createClass
(
	CValueButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sValue, sActivePic, sInactivePic) {
	        var args = { "0": arguments["4"], "1": arguments["5"] };
	        Function.validateParams(args, [
	                    { name: "sActivePic", type: String },
	                    { name: "sInactivePic", type: String, canBeNull: true, canBeEmpty: true }
            ]);

	        CImageButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	        this._sActivePic = sActivePic;
	        this._sInactivePic = ((!Object.isNullOrUndefined(sInactivePic)) ? sInactivePic : sActivePic);
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oDiv)) {
	            // oDiv.innerHTML = "<img alt=\"" + this.getInstance() + "\" src=\"" + this._sInactivePic + "\" onMouseOver=\"this.src='" + this._sActivePic + "'\" onMouseOut=\"this.src='" + this._sInactivePic + "'\">";
	            oDiv.innerHTML = "<img alt='" + this.getInstance() + "' src=\"" + this._sInactivePic + "\" />";
	            new CInnerShadow(oDiv, { color: 30 });
	        }
	    },

	    setActiveImage: function(sActivePic) {
	        Function.validateParams(arguments, [
                        { name: "sActivePic", type: String }
            ]);
	        this._sActivePic = sActivePic;
	        this.render();
	    },

	    setInactiveImage: function(sInactivePic) {
	        Function.validateParams(arguments, [
                        { name: "sInactivePic", type: String }
            ]);
	        this._sInactivePic = sInactivePic;
	        this.render();
	    }
	}
);


	CForm = createClass
(
	CComponent,
	{
	    ctor: function CForm$ctor(oParent, sInstance, sAction, sName, sMethod) {
	        CForm.base.ctor.call(this, oParent, sInstance);
	        this._sName = "ff";
	        this._sMethod = "post";
	        this._sAction = "";
	        this._oFields = {};
	        if (!$isNoU(sName) && sName.is(String)) {
	            this._sName = sName;
	        }
	        if (!$isNoU(sMethod) && sMethod.is(String) &&
	            (sMethod.toLowerCase() === "post" ||
	             sMethod.toLowerCase() === "get")) {
	            this._sMethod = sMethod;
	        }
	        if (!$isNoU(sAction) && sAction.is(String)) {
	            this._sAction = sAction;
	        }
	    },

	    _createHtmlForm: function CForm$_createHtmlForm() {
	        var oForm = $(this._sName);
	        if ($isNoU(oForm))
		        oForm = document.createElement("FORM");
	        var oInput = null;
	        oForm.id = oForm.name = this._sName;
	        oForm.target = '_top';
	        oForm.method = this._sMethod;
	        oForm.action = this._sAction;
	        for (var f in this._oFields) {
	            if (this._oFields.hasOwnProperty(f)) {
	                oInput = document.createElement("INPUT");
	                oInput.id = oInput.name = f;
	                oInput.type = "hidden";
	                oInput.value = this._oFields[f];
	                oForm.appendChild(oInput);
	            }
	        }
	        document.body.appendChild(oForm);
	        return oForm;
	    },

	    put: function CForm$put(sName, sValue) {
	        if ($isNoU(sValue) || !sValue.is(String)) {
	            sValue = "";
	        }
	        if (!$isNoU(sName) && sName.is(String) && sName !== "") {
	            this._oFields[sName] = sValue;
	        }
	    },

	    get: function CForm$get(sName) {
	        var sResult = this._oFields[sName];
	        if ($isNoU(sResult) || !sResult.is(String)) {
	            sResult = null;
	        }
	        return sResult;
	    },

	    submit: function CForm$submit(sAction) {
	        if (!$isNoU(sAction) && sAction.is(String)) {
	            this._sAction = sAction;
	        }
	        if (this._sAction === "") {
	            return;
	        }
	        var oForm = this._createHtmlForm();
	        if (oForm.action != "") {
	            oForm.submit();
	        }
	    }
	}
);

log.add('Base finish');

