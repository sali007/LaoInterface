var debugCalls = 0;
var warnings = false;
var BWR_UNKNOWN = 0;
var BWR_IE = 1;
var BWR_FF = 2;
var $browser = detectBrowser();

function startAdvert(){};

window.loaded = false;
var log = {
	pull: [],
	obj: null,
	add: function(){},
	create: function(){}
};

window.loaded = true;
window.lastAction = new Date();

var webkitListenElements = {};
if($browser.agent == BWR_UNKNOWN) webkitListener();

function onLoadEvents()
{
	var body = document.getElementsByTagName('body');
	if(body.length)
	{
		attachEventListener(body[0], 'mousedown', recordAction);
		disableSelection(body[0]);
	}
	else
	{
		setTimeout(onLoadEvents, 12);
	}
	body = null;	
};
function recordAction()
{
	window.lastAction = new Date();
};

onLoadEvents();



function checkUsage()
{
	setInterval(checkUsageStep, 5000);
};
function checkUsageStep()
{
	var now = +(new Date()),
	    diff = Math.round((now - window.lastAction) / 1000);
	if(diff > 180) top.location.href = './index.html';
};

// Расширение типа 'Object'
Object.prototype._typeName = "Object";
Object.prototype.getType = function() {
    return this._typeName;
}
Object.prototype.is = function(type) {
    if (typeof (type) == "undefined" || type == null) {
        return false;
    }
    if (!(type instanceof Function)) {
        return false;
    }
    return (this instanceof type);
}
Object.prototype.clone = function() {
    var oResult = {};
    fcopy(this, oResult);
    return oResult;
}
Object.isNullOrUndefined = function(value) {
    return (value == undefined || value == null);
}
Object.prototype.serialize = function() {
    var sResult = "{";

    for (var field in this) {
        if (this.hasOwnProperty(field) && this[field] && 
            this != this[field] && !this[field].is(Function)) {
            sResult += "\"" + field + "\" : " + this[field].serialize() + ",";
        }
    }
    if (sResult.length > 1) {
        sResult = sResult.substr(0, sResult.length - 1);
    }

    sResult += "}";
    return sResult;
}
Object.deserialize = function(sSerializedObj) {
    if ($isNoU(sSerializedObj) ||
        !(sSerializedObj.is(String) &&
        sSerializedObj.length)) {
        return null;
    }
    var o = null;
    try {
        eval("o = (" + sSerializedObj + ")");
    }
    catch (e) {
        return null;
    }
    return o;
}
Object.prototype.foreach = function(func, onlyNames) {
    if (!$isNoU(func) && func.is(Function)) {
        for (var f in this) {
            if (this.hasOwnProperty(f)) {
                if ($bool(onlyNames)) {
                    func.apply(f, arguments);
                }
                else {
                    func.apply(this[f], arguments);
                }
            }
        }
    }
}

// Расширение типа 'Number'
Number.prototype._typeName = "Number";
Number.prototype.serialize = function() {
    return this.toString();
}

// Расширение типа 'Array'
Array.prototype._typeName = "Array";
Array.prototype.serialize = function() {
    var sResult = "[";
    for (var i = 0; i < this.length; i++) {
        if (this[i]) {
            sResult += this[i].serialize() + ",";
        }
    }
    if (sResult.length > 1) {
        sResult = sResult.substr(0, sResult.length - 1);
    }
    sResult += "]";
    return sResult;
}
Array.prototype.first = function() {
    if (this.length > 0) {
        return this[0];
    }
    return null;
}
Array.prototype.last = function() {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    return null;
}
Array.prototype.foreach = function(func) {
    if (!$isNoU(func) && func.is(Function)) {
        for (var i = 0; i < this.length;  i++) {
            func.apply(this[i], arguments);
        }
    }
}

// Расширение типа 'Boolean'
Boolean.prototype._typeName = "Boolean";
Boolean.prototype.serialize = function() {
    return this.toString();
}
Boolean.parse = function(value) {
    if (Object.isNullOrUndefined(value)) {
        return false;
    }

    switch (value._typeName) {
        case "Boolean":
            return value;
            break;
        case "String":
            if (value.toLowerCase() == 'true' || value == "1") {
                return true;
            }
            break;
        case "Number":
            if (value == 0) {
                return false;
            }
            else {
                return true;
            }
            break;
    }

    return false;
}

// Расширение типа 'String'
String.prototype._typeName = "String";
String.prototype.serialize = function() {
    return "\"" + this.replace(/\\/g, "\\\\").replace(new RegExp("\"", "g"), "\\\"") + "\"";
}
String.prototype.clone = function() {
    var sRes = "";
    for (var i = 0; i < this.length; i++)
        sRes += this.charAt(i);
    return sRes;
}
String.prototype.toFormat = function(sFormat) {
    return '<span style="' + sFormat + '">' + this + '</span>';
}

// Расширение типа 'Date'
Date.prototype._typeName = "Date";
Date.prototype.serialize = function() {
    return "new Date(\"" + this.toString() + "\")";
}

// Расширение типа 'Function'
Function.prototype._typeName = "Function";
Function.validateParams = function(params, expectedParams) {
    if (Object.isNullOrUndefined(params)) {
        al("<params> - is null or undefined");
        return false;
    }
    if (Object.isNullOrUndefined(expectedParams)) {
        al("<expectedParams> - is null or undefined");
        return false;
    }
    if (params._typeName != "Object") {
        al("type <params> is not <Object>");
        return false;
    }
    if (expectedParams._typeName != "Array") {
        al("type <expectedParams> is not <Array>");
        return false;
    }
    if (params.length > expectedParams.length) {
        al("length <params> doesn't match length <expectedParams>");
        return false;
    }
    if (params.length < expectedParams.length) {
        var difference = expectedParams.length - params.length;
        for (var i = 0; i < difference; i++) {
            if (!Boolean.parse(expectedParams[params.length + i].canBeEmpty)) {
                al("length <params> doesn't match length <expectedParams>");
                return false;
            }
        }
    }
    for (var i = 0; i < params.length; i++) {
        if (Object.isNullOrUndefined(params[i])) {
            if (!Boolean.parse(expectedParams[i].canBeNull)) {
                al("<" + expectedParams[i].name + "> is null");
                return false;
            }
        }
        else if (!params[i].is(expectedParams[i].type)) {
        al("type <" + expectedParams[i].name + "> mismatch");
            return false;
        }
    }

    return true;
}
Function.createCallback = function(fMethod, oContext) {
    if (!$isNoU(fMethod) && fMethod.is(Function)) {
        return function() {
            var nArgsLength = arguments.length;
            if (nArgsLength > 0) {
                var aArgs = [];
                for (var i = 0; i < nArgsLength; i++) {
                    aArgs[i] = arguments[i];
                }
                aArgs[nArgsLength] = oContext;
                return fMethod.apply(this, aArgs);
            }
            return fMethod.call(this, oContext);
        }
    }
}
Function.createDelegate = function(instance, method) {
    Function.validateParams(arguments, [
        { name: "instance", type: Object, canBeNull: true },
        { name: "method", type: Function }
    ]);
    return function() {
        try
        {
		return method.apply(instance, arguments);
        }
        catch (e) {




            var sMethod = method.toString();
            al("Exception in " +
                sMethod.substring(sMethod.indexOf(" ") + 1, sMethod.indexOf("(")).replace("$", ".") +
                ((!$isNoU(e.description)) ? "\nDescription: " + e.description : ""));
        }
    }
}



Math.fact = function Math$fact(x) {
    var nRes = 0;
    if (x.is(Number)) {
        nRes = 1;
        for (var i = 1; i <= x; i++) {
            nRes *= i;
        }
    }
    return nRes;
}

Math.C = function Math$C(n, m) {
    var nRes = 0;
    if (n.is(Number) && m.is(Number)) {
        if (m > n) {
            n = n + m;
            m = n - m;
            n = n - m;
        }
        return (Math.fact(n) / (Math.fact(m) * Math.fact(n - m)));
    }
}

///////////////////////////////////////////////////////////////////////////////////////

function detectBrowser() {
    var oResult = {};
    oResult.agent = BWR_UNKNOWN;
    oResult.version = parseFloat(navigator.appVersion);
    oResult.documentMode = 0;
    oResult.name = navigator.appName;

    if(!$isNoU(window.ActiveXObject) || /\w*MSIE\w*/.test(navigator.userAgent)) {
        oResult.agent = BWR_IE;
        oResult.name = "MSIE";
        oResult.version = parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]);
        if (oResult.version >= 8) {
            if (document.documentMode >= 7) {
                oResult.documentMode = document.documentMode;
            }
        }
    }
    else if(/\w*Firefox\w*/.test(navigator.userAgent))
    {
        oResult.agent = BWR_FF;
    }
    return oResult;
}

function detectScreen() {
    var nClientWidth = (window.innerWidth ? window.innerWidth :
                       (document.body.clientWidth ? document.body.clientWidth :
                       (document.documentElement.clientWidth ? document.documentElement.clientWidth :
                       document.body.offsetWidth)));
    var nClientHeight = (window.innerHeight ? window.innerHeight :
                        (document.body.clientHeight ? document.body.clientHeight :
                        (document.documentElement.clientHeight ? document.documentElement.clientHeight :
                        document.body.offsetHeight)));
    var nWidth = 1280;
    var nHeight = 1024;
    var nLeft = Math.round((nClientWidth - nWidth) / 2);
    var nTop = Math.round((nClientHeight - nHeight) / 2);
    if (nLeft < 0) nLeft = 0;
    if (nTop < 0) nTop = 0;
    var oRes = {
        left: nLeft,
        top: nTop,
        width: nWidth,
        height: nHeight
    };
    return oRes;
}

function fcopy(oSrc, oDst) {
    for (var f in oSrc) if (oSrc.hasOwnProperty(f)) {
        oDst[f] = oSrc[f];
    }
}

function createClass(fParent, oProp) {
    if (!Function.validateParams(arguments, [
	                { name: "fParent", type: Function, canBeNull: true },
	                { name: "oProp", type: Object }
            ])) {
        throw new Error();
    }
    var fResult = function() {
        this.ctor && this.ctor.apply(this, arguments);
    }
    fResult.prototype = {};
    if (fParent != null) {
        var fTemp = new Function();
        fTemp.prototype = fParent.prototype;
        fResult.prototype = new fTemp();
        fResult.base = fParent.prototype;
    }
    fResult.prototype.constructor = fResult;
    fcopy(oProp, fResult.prototype);

    return fResult;
}

function dispose(obj) {
    if (Function.validateParams(arguments, [
	                { name: "obj", type: Object }
            ])) {
        if (obj.destructor && obj.destructor.getType() == "Function") {
            obj.destructor();
            obj = null;
            return true;
        }
        obj = null;
    }
    return false;
}

function newObject(fClass, fCreateCallback, fDestroyCallback) {
    var oResult = null;
    var args = [];
    if (arguments.length > 3) {
        for (var i = 3; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
    }
    oResult = fClass.prototype;
    fClass.apply(oResult, args);
    if (fCreateCallback) {
        oResult.attachListener("onCreate", fCreateCallback);
    }
    if (fDestroyCallback) {
        oResult.attachListener("onDestroy", fDestroyCallback);
    }
    oResult.create();
    return oResult;
}

///////////////////////////////////////////////////////////////////////////////////////

function attachEventListener(sElementId, sEventType, fCallBack) {
    var oElement = typeof sElementId == 'string' ? $(sElementId) : sElementId;
    if(!$isNoU(oElement))
    {
        if ($browser.agent == BWR_IE)
        {
            oElement.attachEvent("on" + sEventType, fCallBack);
        }
        else
        {
            oElement.addEventListener(sEventType, fCallBack, false);
        }
    }
}

function detachEventListener(sElementId, sEventType, fCallBack) {
    var oElement = $(sElementId);
    if (!$isNoU(oElement)) {
        if ($browser.agent == BWR_IE) {
            oElement.detachEvent("on" + sEventType, fCallBack);
        }
        else
        {
            oElement.removeEventListener(sEventType, fCallBack, false);
        }
    }
}

function webkitListener(){
	for(var id in webkitListenElements)
	{
		if(webkitListenElements[id] && webkitListenElements[id]._typeName == 'Array')
		{
			var el = webkitListenElements[id][0],
			    run = false;
			if(!el.hasAttribute('olderValue'))
			{
				el.setAttribute('olderValue', el.value);
				if(el.value && el.value != '') run = true;
			}
			else if(el.getAttribute('olderValue') !== el.value)
			{
				el.setAttribute('olderValue', el.value);
				run = true;
			}
			if(run)
			{
				for(var i = 1, l = webkitListenElements[id].length; i < l; i++)
				{
					if(webkitListenElements[id][i]) webkitListenElements[id][i]();
				}
			}
		}
	}
	setTimeout(webkitListener, 100);
};


function attachPropertyChangeListener(sElementId, fCallBack) {
    if ($browser.agent == BWR_IE) {
        attachEventListener(sElementId, "propertychange", fCallBack);
    }
    else if($browser.agent == BWR_FF)
    {
        attachEventListener(sElementId, "DOMAttrModified", fCallBack);
        attachEventListener(sElementId, "input", fCallBack);
    }
    else
    {
    	if(!webkitListenElements[sElementId]) webkitListenElements[sElementId] = [$(sElementId)];
    	webkitListenElements[sElementId].push(fCallBack);
    }
};

function detachPropertyChangeListener(sElementId, fCallBack) {
    if ($browser.agent == BWR_IE) {
        detachEventListener(sElementId, "propertychange", fCallBack);
    }
    else if($browser.agent == BWR_FF)
    {
        detachEventListener(sElementId, "DOMAttrModified", fCallBack);
        detachEventListener(sElementId, "input", fCallBack);
    }
    else
    {
	if(!webkitListenElements[sElementId])
	{
		for(var i = 1, l = webkitListenElements[sElementId].length; i < l; i++)
		{
			if(webkitListenElements[sElementId][i] == fCallBack) webkitListenElements[sElementId][i] = null;
		}
	}
    }
};

function fireEvent(element,event){
    if (document.createEventObject){
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else
    {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}

function getFileName(sPath) {
    var sRes = "";
    if ($is(sPath, String)) {
        var aPath = sPath.split("/");
        if (aPath.length) {
            sRes = aPath.last();
        }
    }
    return sRes;
}

function getElementRect(sElementId) {
    var oResult = null;
    var oElement = $(sElementId);
    if (!$isNoU(oElement)) {
        oResult = { left: 0, top: 0, width: 0, height: 0 };
        oResult.width = oElement.offsetWidth;
        oResult.height = oElement.offsetHeight;
        while (oElement) {
            oResult.left += oElement.offsetLeft;
            oResult.top += oElement.offsetTop;
            oElement = oElement.offsetParent;
        }
    }
    return oResult;
}

function setCssClass(sElement, sClass) {
    var oElement = $(sElement);
    if (!($isNoU(oElement) ||
          $isNoU(oElement.className) ||
          $isNoU(sClass)) &&
          sClass.length) {
        oElement.className = sClass;
    }
}

function getCssClass(sElement) {
    var oElement = $(sElement);
    var sResult = null;
    if (!(Object.isNullOrUndefined(oElement) ||
          Object.isNullOrUndefined(oElement.className))) {
        sResult = oElement.className;
    }
    return sResult;
}

function al(msg) {
    debugCalls++;
    if (!msg) msg = 'called !';
    msg = (debugCalls + ':\n' + msg);
    if (warnings) alert(msg);
}

function insertContent(placeId, content) {
    var place = $(placeId);
    if (place == null) {
        if (warnings) alert('Element [' + placeId + '] not found !');
        return;
    }
    place.innerHTML = content;
}

function setOpacity(sElementId, nOpacity) {
    if (!$isNoU($(sElementId))) {
        if ($browser.agent == BWR_IE) {
            $(sElementId).style.filter = 'alpha(opacity: ' + nOpacity.toString(10) + ')';
        }
        else
        {
            $(sElementId).style.opacity = (nOpacity / 100).toString(10);
        }
    }
}

function getOpacityText(nOpacity) {
    var sResult = '';
    if ($browser.agent == BWR_IE) {
        sResult = 'filter: alpha(opacity: ' + nOpacity.toString(10) + ');';
    }
    else
    {
        sResult = 'opacity: ' + (nOpacity / 100).toString(10) + ';';
    }
    return sResult;
}

function $(element)
{
    if(typeof element === 'object')
    {
    	return element;
    }
    else
    {
	var res = document.getElementById(element);
	if (!res) al('Element "' + element + '" not found !');
	return res;
    }
}

function $delegate(instance, method) {
    return Function.createDelegate(instance, method);
}

function $callback(fMethod, oContext) {
    return Function.createCallback(fMethod, oContext);    
}


function $sizeOf(obj) {
    var counter = 0;
    if (!Object.isNullOrUndefined(obj)) {
        for (var f in obj) {
            if (obj.hasOwnProperty(f)) {
                counter++;
            }
        }
    }
    return counter;
}

function $isNoU(value) {
    return !Object.isNullOrUndefined || Object.isNullOrUndefined(value);
}

function $bool(value) {
    return Boolean.parse(value);
}

function $is(o, f) {
    return (!$isNoU(o) && !$isNoU(f) && !$isNoU(o.is) && o.is(f));
}

function $clearEvents(domObj, bClearChildren) {
    if ($isNoU(domObj))
        return;
    for (var f in domObj) {
        if (/^on\w+/.test(f)) {
            if (!$isNoU(domObj[f])) {
//                alert(domObj.id);
                domObj[f] = null;
            }
        }
    }
    if ($bool(bClearChildren)) {
        var children = domObj.childNodes;
        for (var i = 0; i < children.length; i++) {
            $clearEvents(children[i], bClearChildren);    
        }
    }
}

function $al(o) {
    var str = "Object members:\n\n";
    for (var f in o) {
        if (o.hasOwnProperty(f)) {
            str += f + ": " + o[f] + "\n";
        }
    }
    alert(str);
}

function getFlashDef(sUrl, bTransparent, sWidth, sHeight) {
    if ($isNoU(sUrl) || sUrl._typeName != "String") {
        return ""; 
    }
    if ($isNoU(bTransparent) || bTransparent._typeName != "Boolean") {
        bTransparent = false;
    }
    if ($isNoU(sWidth) || !sWidth.is(String) || !/^\d{1,3}(?:px|%)$/.test(sWidth)) {
        sWidth = "100%";
    }
    if ($isNoU(sHeight) || !sHeight.is(String) || !/^\d{1,3}(?:px|%)$/.test(sHeight)) {
        sHeight = "100%";
    }
    
    return ["<embed src=\"", sUrl, "\" width=\"", sWidth, "\" height=\"", sHeight, "\"", ((bTransparent) ? " wmode=\"transparent\"" : ""), " quality=\"best\" style=\"margin: 0; padding: 0;\"></embed>"].join('');
};

/*function getFlashDef(id, sUrl, bTransparent, sWidth, sHeight) {
    if ($isNoU(sUrl) || sUrl._typeName != "String") {
        return ""; 
    }
    if ($isNoU(bTransparent) || bTransparent._typeName != "Boolean") {
        bTransparent = false;
    }
    if ($isNoU(sWidth) || !sWidth.is(String) || !/^\d{1,3}(?:px|%)$/.test(sWidth)) {
        sWidth = "100%";
    }
    if ($isNoU(sHeight) || !sHeight.is(String) || !/^\d{1,3}(?:px|%)$/.test(sHeight)) {
        sHeight = "100%";
    }
    
    var object = document.createElement('object');
    object.setAttribute('classid', 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000');
    object.setAttribute('width', sWidth);
    object.setAttribute('height', sHeight);

    var param = document.createElement('param');
    param.setAttribute('name', 'allowScriptAccess');
    param.setAttribute('value', 'sameDomain');
    object.appendChild(param);

    var param = document.createElement('param');
    param.setAttribute('name', 'movie');
    param.setAttribute('value', sUrl);
    object.appendChild(param);
    var param = document.createElement('param');
    param.setAttribute('name', 'src');
    param.setAttribute('value', sUrl);
    object.appendChild(param);

    var param = document.createElement('param');
    param.setAttribute('name', 'quality');
    param.setAttribute('value', 'medium');
    object.appendChild(param);
    
    if(bTransparent)
    {
	    var param = document.createElement('param');
	    param.setAttribute('name', 'wmode');
	    param.setAttribute('value', 'transparent');
	    object.appendChild(param);
    }
    alert(object.innerHTML);
    
    var embed = document.createElement('embed');
    embed.setAttribute('src', sUrl);
    embed.setAttribute('width', sWidth);
    embed.setAttribute('height', sHeight);
    object.appendChild(embed);

    $(id).appendChild(object);
    
};*/



function drawNavBtn(placeId, btnType, callback) {
    var sLang = storage.get("language");

    var sResult = '';
    var sImgUrl = '';
    switch (btnType) {
        case 'NONE':
            insertContent(placeId, '');
            return;
            break;
        case 'LEFT_ENABLED':
            sImgUrl = './img/ui/navigation/back_' + sLang + '.gif';
            break;
        case 'LEFT_DISABLED':
            sImgUrl = './img/ui/navigation/back_inactive_' + sLang + '.gif';
            break;
        case 'RIGHT_ENABLED':
            sImgUrl = './img/ui/navigation/forward_' + sLang + '.gif';
            break;
        case 'RIGHT_DISABLED':
            sImgUrl = './img/ui/navigation/forward_inactive_' + sLang + '.gif';
            break;
        case 'MENU_ENABLED':
            sImgUrl = './img/ui/navigation/menu_' + sLang + '.gif';
            break;
        case 'MENU_DISABLED':
            sImgUrl = './img/ui/navigation/menu_inactive_' + sLang + '.gif';
            break;
    }
    sResult += '<img alt="" src="' + sImgUrl + '" />';
    insertContent(placeId, sResult);
    $(placeId).childNodes[0].onclick = callback;
}

function drawNavBtn_old(placeId, btnType, callback) {

    var sLang = storage.get("language");
//    if (!sLang || sLang == "null") {
//        sLang = "F1";
//    }


    var buttonWidth = 250;
    var res = '<table id="' + (placeId + '_' + btnType) + '" height="70" border="0" cellspacing="0" cellpadding="0"><tr>';
    switch (btnType) {
        case 'NONE':
            insertContent(placeId, '');
            return;
            break;
        case 'LEFT_ENABLED':
            res +=
				'<td><img src="./img/ui/navigation/left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/back_' + sLang + '.gif"></td>' +
				'<td><img src="./img/ui/navigation/right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
        case 'LEFT_DISABLED':
            res +=
				'<td><img src="./img/ui/navigation/inactive_left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/inactive.gif"></td>' +
				'<td><img src="./img/ui/navigation/inactive_right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
        case 'RIGHT_ENABLED':
            res +=
				'<td><img src="./img/ui/navigation/left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/forward_' + sLang + '.gif"></td>' +
				'<td><img src="./img/ui/navigation/right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
        case 'RIGHT_DISABLED':
            res +=
				'<td><img src="./img/ui/navigation/inactive_left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/inactive.gif"></td>' +
				'<td><img src="./img/ui/navigation/inactive_right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
        case 'MENU_ENABLED':
            res +=



				'<td><img src="./img/ui/navigation/menu_left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/menu_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/menu_' + sLang + '.gif"></td>' +
				'<td><img src="./img/ui/navigation/menu_right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
        case 'MENU_DISABLED':
            res +=
				'<td><img src="./img/ui/navigation/inactive_left.gif" /></td>' +
				'<td width=' + buttonWidth + ' background="./img/ui/navigation/inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/navigation/inactive.gif"></td>' +
				'<td><img src="./img/ui/navigation/inactive_right.gif" /></td>' +
				'<td>&nbsp;</td>';
            break;
    }
    res +=
	'</tr></table>';
    insertContent(placeId, res);
    $(placeId + '_' + btnType).onclick = callback;
}

function getPosition(el){
	if(el)
	{
		var result = {
			left: 0,
			top: 0,
			width: el.clientWidth,
			height: el.clientHeight
		};
		do
		{
			result.left += el.offsetLeft;
			result.top += el.offsetTop;
			el = el.offsetParent;
		}
		while(el && el.nodeName != 'BODY');
	}
	else
	{
		var result = {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		};
	}
	
	return result;
};

function addClass(el, cl){
	if(el) return (el.className = removeClass(el, cl) + ' ' + cl);
};
function removeClass(el, cl){
	if(el) return (el.className = el.className.split(cl).join(''));
};

function pagevis(on)
{
	window[on ? 'removeClass' : 'addClass']($('page_content'), 'none');
};

var callbacks = [],
    scripts = {
    	free: true,
    	queue: []
    };
function getScript(url, fn, params, scope, errfn)
{
	// 2 - wait
	// 1 - process
	// 0 - complete
	scripts.queue.push([url, fn, params, scope, errfn, 2, scripts.queue.length]);
	getScriptQueue();
};
function getScriptQueue()
{
	//console.info('getScriptQueue', scripts.free);
	if(scripts.free)
	{
		for(var i = 0, l = scripts.queue.length; i < l; i++)
		{
			//alert('try ' + i + ': ' + scripts.queue[i][0]);
			if(scripts.queue[i][5] == 2)
			{
				//console.info('finded: ', scripts.queue[i]);
				scripts.free = false;
				scripts.queue[i][5] = 1;
				getScriptRun.apply(window, scripts.queue[i]);
				break;
			}
		}
	}
};
function getScriptRun(url, fn, params, scope, errfn, status, qid)
{
	var head = document.getElementsByTagName("head")[0] || document.documentElement,
	    script = document.createElement("script");
	
	script.id = 'scriptLoading' + qid;
	script.type = 'text/javascript';
	script.onerror = getScriptError;
	script.onload = script.onreadystatechange = getScriptCheck;

	script.done = false;
	script.timer = setTimeout(getScriptError, 100);
	if(fn) script.fn = callbacks.push([fn, params, scope]);
	if(errfn) script.errfn = callbacks.push([errfn, params, scope]);
	script.src = url;// + '?r=' + Math.random();

	head.insertBefore(script, head.firstChild);
	head = null;
	script = null;
	scope = null;
	params = null;
	fn = null;
	errfn = null;
	delete head;
	delete script;
};

function getScriptCheck()
{
	//console.log(this.done, this.readyState);
	if( !this.done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"))
	{
		this.done = true;
		this.timer && clearTimeout(this.timer);
		//console.log('done', this.done, this.fn);
		var fn = this.fn;
		if(fn)
		{
			(function(callback){
				//console.log('called', callback[0], callback[2], callback[1]);
				callback[0].apply(callback[2] || window, callback[1] || []);
				delete callback[0];
				delete callback[1];
				delete callback[2];
				delete callback;
			})(callbacks[fn - 1]);
		}
		getScriptClean(this);
	}
	if(!this.done)
	{
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(this.onerror, 100);
	}
};
function getScriptError()
{
	var el = $('scriptLoading' + getScriptCurrent()[6]);
	el.done = true;
	el.timer && clearTimeout(el.timer);
	if(el.errfn)
	{
		(function(callback){
			callback[0].apply(callback[2] || window, callback[1] || []);
			delete callback[0];
			delete callback[1];
			delete callback[2];
			delete callback;
		})(callbacks[el.errfn - 1]);
	}
	getScriptClean(el);
};
function getScriptClean(el)
{
	//console.warn('getScriptClean');
	getScriptCurrent()[5] = 0;
	scripts.free = true;
	el.onload = el.onreadystatechange = null;
	//el.parentNode && el.parentNode.removeChild(el);
	window.CollectGarbage && window.CollectGarbage();
	getScriptQueue();
};
function getScriptCurrent()
{
	for(var i = 0, l = scripts.queue.length; i < l; i++)
	{
		if(scripts.queue[i][5] == 1)
		{
			return scripts.queue[i];
		}
	}
};


function getHash()
{
	return document.location.hash.match(/(\-[0-9]+)(\:([0-9]+))?$/);
};

function addInputToForm(formId, inputId, inputValue, bIsHidden)
{
	var form = $(formId);
	
	if ($isNoU(form))
		return;
	
	var input = document.createElement("input");
	
	if ($isNoU(input))
		return;
	
	input.id = input.name = inputId;
	input.type = $bool(bIsHidden) ? "hidden" : "text";
	input.value = $is(inputValue, String) ? inputValue : "";
	
	form.appendChild(input);
};

function disableSelection(target)
{
	if (typeof target.onselectstart != "undefined")
	{
		target.onselectstart = returnFalse;
	}
	else if (typeof target.style.MozUserSelect != "undefined")
	{
		target.style.MozUserSelect="none";
	}
	else
	{
		target.onmousedown = returnFalse;
	}
	target.style.cursor = "pointer";
};
function returnFalse()
{
	return false;
};

function discardElement(element)
{
	destroy(element);
};


// function used to remove a node, every attached
// attribute and every nested node via the same procedure
function destroy(node)
{
	node.outerHTML = '';
	node.parentNode && node.parentNode.removeChild(node);
	delete node;
};



log.add('Utils finish');

function getStr(sKey) {
    var oStrings = null;
    
    try {
        eval("oStrings = strings_" + storage.put("language"));
        
        if (oStrings[sKey]) {
            return oStrings[sKey];
        }
        return "";
    }
    catch (e) {
        return "";
    }
};

function getStr(sKey) {
    var oStrings = null;
    
    try {
        eval("oStrings = strings_" + storage.get("language"));
        
        if (oStrings[sKey]) {
            return oStrings[sKey];
        }
        return "";
    }
    catch (e) {
        return "";
    }
};



