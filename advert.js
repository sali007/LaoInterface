function AdvertItem(advPlaceNum, advPlaceName, advPlaceContent)
{
    this.placeNum = advPlaceNum;
    this.placeName = advPlaceName;
    this.placeContent = advPlaceContent;
}

function AdvertContent(advContentType, advContent)
{
    this.type = advContentType;
    this.content = advContent;
}

// advert class definition
AdvertClass = newClass
(
    null,
    {
        constructor: function(pageName) {
            this.pageName = pageName;
            this.advertArray = this.setAdvertArray();
            this.providerId = this.setProviderId();
            this.advertPlaceList = this.setAdvertPlaceList();
            this.advertItemList = this.setAdvertItemList();
        },

        placeAdv: function() {
            if (this.advertItemList.length > 0) {
                var advertItem = '';
                var advertDiv = '';
                for (var i = 0; i < this.advertItemList.length; i++) {
                    advertItem = this.advertItemList[i];

                    advertDiv = document.getElementById('advert_' + advertItem.placeNum);

                    if (!advertDiv)
                        continue;

                    advertDiv.style.overflow = 'hidden';

                    insertContent(advertDiv.id,
			           '<table cellpadding=0 cellspacing=0 border=0 width=100% height=100%>' +
			           '    <tr>' +
			           '        <td width=70% id="' + 'advert_image_' + advertItem.placeNum + '"></td>' +
			           '    </tr>' +
			           '</table>');


                    if (advertItem.placeContent.type == 'script') {
                        var scriptContent =
	                        '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                        '   <tr>' +
	                        '       <td align="center" valign="middle" class="on_page_title">' +
	                        '           <div id="jsPlaceHere_' + advertItem.placeNum + '">&nbsp</div>' +
	                        '       </td>' +
	                        '   </tr>' +
	                        '</table>';
                        insertContent('advert_image_' + advertItem.placeNum, scriptContent);
                    }
                    else
                        insertContent('advert_image_' + advertItem.placeNum, advertItem.placeContent.content);

                    advertDiv.style.display = 'block';

                    if (advertItem.placeContent.type == 'script')
                        if (this.pageName == 'Enter_Summ')
                        this.actionScript(advertItem.placeContent.content, advertDiv.id, false);
                    else
                        this.actionScript(advertItem.placeContent.content, 'jsPlaceHere_' + advertItem.placeNum, true);
                }
            }
        },

        actionScript: function(fileName, funcParam, isDelete) {
            var js = document.createElement('script');
            js.language = 'javascript';
            js.src = fileName;
            document.body.appendChild(js);
            try {
                runAdvJs(funcParam);
            }
            catch (e) {
            }
            if (isDelete)
                document.body.removeChild(document.body.lastChild);
        },

        setAdvertArray: function() {
            var result = '';
            if (window.adv_array)
                result = adv_array;
            return result;
        },

        setProviderId: function() {
            var result = '';
            var prvVal = getcookie('prv_value');
            if (prvVal != 'null') {
                try {
                    if (this.pageName == 'Enter_Summ' || this.pageName == 'Ok')
                        result = prvVal;
                    else
                        result = value[prvVal]['prv_id'];
                }
                catch (e) {
                    result = '';
                }
            }

            return result;
        },

        setAdvertPlaceList: function() {
            var result = new Array();

            switch (this.pageName) {
                case 'Index':
                    result.push('index_page');
                    result.push('index_page_2');
                    result.push('index_page_3');
                    result.push('index_page_4');
                    break;

                case 'Main':
                    result.push('main_page');
                    break;

                case 'Pages':
                    result.push('select_provider');
                    result.push('select_provider_2');
                    break;

                case 'Adv_Cellular':
                    result.push('enter_account');
                    result.push('adv_cellular_2');
                    result.push('adv_cellular_3');
                    break;

                case 'Provider':
                    result.push('enter_account');
                    break;

                case 'Validate_Confirm':
                    result.push('validate_account');
                    result.push('validate_confirm');
                    break;

                case 'Enter_Summ':
                    result.push('enter_summ');
                    break;

                case 'Ok':
                    result.push('final_page');
                    result.push('final_page_text');
                    result.push('final_page_1');
                    result.push('final_page_2');
                    break;
            }

            return result;
        },

        setAdvertItemList: function() {
            var result = new Array();

            if (this.advertPlaceList.length > 0) {
                var advPlaceItem = '';
                var idx = 0;
                var contentArr = '';
                var content = '';
                for (var i = 0; i < this.advertPlaceList.length; i++) {
                    advPlaceItem = this.advertPlaceList[i];
                    contentArr = this.getProviderContent(advPlaceItem, this.providerId);

                    idx++;
                    if (idx == 1)
                        content = this.getAdvContent(contentArr, true);
                    else
                        content = this.getAdvContent(contentArr, false);

                    if (content != '')
                        result.push(new AdvertItem(i + 1, advPlaceItem, content));
                }
            }

            return result;
        },

        getAdvIndex: function(name) {
            if (this.advertArray != '')
                for (var i = 0; i < this.advertArray.length; i++)
                if (this.advertArray[i][0] == name)
                return i;
            return -1;
        },

        getContentCount: function(name) {
            var result = 0;
            var advArrayIndex = this.getAdvIndex(name);
            if (advArrayIndex > -1)
                if (this.advertArray[advArrayIndex][1])
                result = this.advertArray[advArrayIndex][1].length;
            return result;
        },

        getContent: function(name) {
            var result = '';
            var adv_counter = getcookie(name + '_adv_counter');
            var adv_array_index = this.getAdvIndex(name);
            var adv_array_length = 0;

            if ((adv_counter == false) || (isNaN(adv_counter)))
                adv_counter = 0;

            if (adv_array_index == -1)
                return "";

            adv_array_length = this.advertArray[adv_array_index][1].length;

            if (adv_array_length == 0)
                return "";

            if (adv_counter > adv_array_length - 1)
                adv_counter = 0;

            result = this.advertArray[adv_array_index][1][adv_counter];
            adv_counter++;
            document.cookie = name + '_adv_counter = ' + adv_counter;
            return result;
        },

        getProviderContent: function(name, provider) {
            var result = "";
            var contentCount = this.getContentCount(name);

            for (var i = 0; i < contentCount; i++) {
                result = this.getContent(name);

                if (!isArray(result)) {
                    result = "";
                    continue;
                }

                if ((!isArray(result[2]) || result[2].length == 0 ||
                    this.isProviderInArray(0, result[2])) && this.isActiveDate(result[4]))
                    break;

                if (provider != "")
                    if (this.isProviderInArray(provider, result[2]))
                    break;

                result = "";
            }

            return result;
        },

        isProviderInArray: function(provider, providerArray) {
            var result = false;
            if (isArray(providerArray) && providerArray.length > 0)
                for (var i = 0; i < providerArray.length; i++)
                if (provider == providerArray[i]) {
                result = true;
                break;
            }

            return result;
        },

        isActiveDate: function(aDates) {
            var aDate = [];
            var oStartDate = null;
            var oStopDate = null;
            var oCurDate = new Date();
            if (aDates && isArray(aDates) && aDates.length > 0) {
                for (var i = 0; i < aDates.length; i++) {
                    oStartDate = null;
                    oStopDate = null;
                    if (aDates[i] && isArray(aDates[i])) {
                        if (aDates[i].length) {
                            if (!aDates[i][0] || aDates[i][0].length == 0) 
                                aDates[i][0] = "1.1.2009";
                            if (!aDates[i][1] || aDates[i][1].length == 0)
                                aDates[i][1] = "31.12.2999";
                            aDate = aDates[i][0].split(".");
                            if (aDate.length != 3 ||
                                isNaN(parseInt(aDate[0], 10)) ||
                                isNaN(parseInt(aDate[1], 10)) ||
                                isNaN(parseInt(aDate[2], 10))) continue;
                            oStartDate =
                                new Date(parseInt(aDate[2], 10),
                                         parseInt(aDate[1], 10) - 1,
                                         parseInt(aDate[0], 10));
                            aDate = aDates[i][1].split(".");
                            if (aDate.length != 3 ||
                                isNaN(parseInt(aDate[0], 10)) ||
                                isNaN(parseInt(aDate[1], 10)) ||
                                isNaN(parseInt(aDate[2], 10))) continue;
                            oStopDate =
                                new Date(parseInt(aDate[2], 10),
                                         parseInt(aDate[1], 10) - 1,
                                         parseInt(aDate[0], 10));
                            if (oStartDate > oStopDate) {
                                var oTmpDate = oStartDate;
                                oStartDate = oStopDate;
                                oStopDate = oTmpDate;
                            }
                            oStopDate.setHours(23,59,59);
                            if (oCurDate >= oStartDate &&
                                oCurDate <= oStopDate) return true;
                        }
                    }
                    else continue;
                }
                return false;
            }
            return true;
        },

        getAdvContent: function(contentArr, isFirstPlace) {
            var contentType = '';
            var content = '';
            var baseFolder = '../adv';
            var html = '';
            var result = '';

            if (isArray(contentArr)) {
                if (contentArr[0])
                    contentType = contentArr[0];
                if (contentArr[1])
                    content = contentArr[1];
                if (contentArr[3])
                    baseFolder = contentArr[3];
            }

            if (this.pageName == 'Enter_Summ' && contentType != 'script')
                return result;

            switch (contentType) {
                case 'text':
                    html =
                        '<textarea style="overflow:hidden; border-style:none; width:550; height:80; font-size:17pt; color:#a61d00; background-color: #e6e6e6; font-family:Arial; font-weight:bold;">' +
                            content +
                        '</textarea>';
                    result = new AdvertContent('text', html)
                    break;

                case 'image':
                    html =
	                    '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                    '   <tr>' +
	                    '       <td align="center" valign="middle" class="on_page_title">' +
	                    '           <img src="' + baseFolder + "/" + content + '">' +
	                    '       </td>' +
	                    '   </tr>' +
	                    '</table>';
                    result = new AdvertContent('image', html)
                    break;

                case 'flash':
                    html =
	                    '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                    '   <tr>' +
	                    '       <td align="center" valign="middle" class="on_page_title">' +
	                    '           <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">' +
                        '               <param name="allowScriptAccess" value="sameDomain" />' +
                        '               <param name="movie" value="' + baseFolder + "/" + content + '" />' +
                        '               <param name="quality" value="best" />' +
                        '               <param name="wmode" value="transparent" />' +
                        '           </object>' +
	                    '       </td>' +
	                    '   </tr>' +
	                    '</table>';
                    result = new AdvertContent('flash', html)
                    break;

                case 'script':
                    result = new AdvertContent('script', baseFolder + "/" + content)
                    break;

                default:
                    if (isFirstPlace) {
                        html =
	                        '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100% ">' +
	                        '   <tr>' +
	                        '       <td align="center" valign="middle" class="on_page_title">' +
	                        '           <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">' +
                            '               <param name="allowScriptAccess" value="sameDomain" />' +
                            '               <param name="movie" value="./img/swf/banner.swf" />' +
                            '               <param name="quality" value="best" />' +
                            '               <param name="wmode" value="transparent" />' +
                            '           </object>' +
	                        '       </td>' +
	                        '   </tr>' +
	                        '</table>';
                        result = new AdvertContent('flash', html)
                    }
            }

            return result;
        },

        getadvcontent: function(image) {
            var contentArray = this.getContent(image);
            var content = "";
            if (contentArray != "")
                content = contentArray[1];
            return content;
        }
    }
);

// this function is taken from http://dklab.ru/chicken/nablas/40.html
function newClass(parent, prop) {
	// Dynamically create class constructor.
	var clazz = function() {
		// Stupid JS need exactly one "operator new" calling for parent
		// constructor just after class definition.
		if (clazz.preparing) return delete(clazz.preparing);
		// Call custom constructor.
		if (clazz.constr) {
			this.constructor = clazz; // we need it!
			clazz.constr.apply(this, arguments);
		}
	}
	clazz.prototype = {}; // no prototype by default
	if (parent) {
		parent.preparing = true;
		clazz.prototype = new parent;
		clazz.prototype.constructor = parent;
		clazz.constr = parent; // BY DEFAULT - parent constructor
	}
	if (prop) {
		var cname = "constructor";
		for (var k in prop) {
			if (k != cname) clazz.prototype[k] = prop[k];
		}
		if (prop[cname] && prop[cname] != Object) clazz.constr = prop[cname];
	}
	return clazz;
}

// returns true if obj is array
function isArray(obj) {
	try
	{
		if (obj.constructor.toString().indexOf("Array") == -1)
		  return false;
		else
		  return true;
	}
	catch(e)
	{};
}

// inserts content into object
// placeId - id of object
// content - string with HTML content
function insertContent(placeId,content)
{
	var place = document.getElementById(placeId);
	if(place == null) 
	{
		alert('Element [' + placeId + '] not found !');
		return;
	}
	place.innerHTML = content;	
}

function startAdvert(pageName)
{
    var advert = new AdvertClass(pageName);
    advert.placeAdv();
}

function getadvcontent(image) {
    var contentArray = getcontent(image);
    var content = "";
    if (contentArray != "") {
        content = contentArray[1];
    }
    return content;
}

function setimage(place, image, div, content_td, height) {

    var contentArray = getcontent(image);

    var contentType = "";

    var content = "";

    var insContent = "";

    if (typeof (div) == 'undefined') {
        div = advert;
    };

    if (typeof (content_td) == 'undefined') {
        content_td = advert_td;
    };

    if (typeof (height) == 'undefined') {
        height = 200;
    }

    div.style.display = '';
    content_td.style.height = height;

    if (contentArray != "") {
        contentType = contentArray[0];
        content = contentArray[1];
    }

    switch (contentType) {
        case 'text':
            insContent =
	      '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#ff7800">' +
	      '<tr><td align="center" valign="middle" class="on_page_title">' + content + '</td></tr></table>';
            break;

        case 'image':
            insSontent =
	      '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#ff7800">' +
	      '<tr><td align="center" valign="middle" class="on_page_title"><img src="../adv/' + content + '"></td></tr></table>';
            break;

        case 'flash':
            insContent =
	      '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#ff7800">' +
	      '<tr><td align="center" valign="middle" class="on_page_title"><embed width=100% height=100% src=../adv/' + content + '></embed></td></tr></table>';
            break;

        case 'script':
            insContent =
	      '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#ff7800">' +
	      '<tr><td align="center" valign="middle" class="on_page_title"><div id="jsPlaceHere">&nbsp</div></td></tr></table>';
            break;

        default:

            if (place == 'advert_image_magitel') {
                insContent = '&nbsp';
                div.style.display = 'none';
                content_td.style.height = 0;
            }
            else if (place == 'advert_index') {
                insContent = '&nbsp';
                div.style.display = 'none';
                index_without_adv.style.display = '';
            }
            else {
                insContent =
	        '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" bgcolor="#ff7800">' +
	        '<tr><td align="center" valign="middle" class="on_page_title" background="./img/ui/advert_bg.gif"><embed width=100% height=100% src="./img/swf/banner.swf"></embed></td></tr></table>';
            }

    }

    document.getElementById(place).innerHTML = insContent;

    if (contentType == 'script') {
        var js = document.createElement('script');
        js.src = '../adv/' + content;
        document.body.appendChild(js);
        try {
            runAdvJs();
        }
        catch (e) { };
    }

}


