log.add('Advert start');
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
            this.clearPlaces();
        },

        placeAdv: function() {
            if (this.advertItemList.length > 0) {
                var advertItem = '';
                var advertDiv = '';
                for (var i = 0; i < this.advertItemList.length; i++) {
                    advertItem = this.advertItemList[i];

                    if (advertItem && advertItem.placeName && advertItem.placeName.length) {
						if (advertItem.placeName == 'receipt_header_text') {
						    if (advertItem.placeContent.content.length > 100)
						        advertItem.placeContent.content = advertItem.placeContent.content.substr(0, 100);
							addInputToForm("ff", "_receipt_prt_top_reklama",
								advertItem.placeContent.content, true);
							continue;						
						}
						else if (advertItem.placeName == 'receipt_footer_text') {
						    if (advertItem.placeContent.content.length > 100)
						        advertItem.placeContent.content = advertItem.placeContent.content.substr(0, 100);
							addInputToForm("ff", "_receipt_prt_bottom_reklama",
								advertItem.placeContent.content, true);
							continue;						
						}
                    }
                    
                    advertDiv = $('advert_' + advertItem.placeNum);

                    if (!advertDiv) continue;

                    if (advertItem.placeContent.type == 'script') {
                        var scriptContent ='<div id="jsPlaceHere_' + advertItem.placeNum + '">&nbsp;</div>';
                        insertContent(advertDiv.id, scriptContent);
                    }
                    else
                        insertContent(advertDiv.id, advertItem.placeContent.content);

                    advertDiv.style.display = 'block';

                    if (advertItem.placeContent.type == 'script')
                        if (this.pageName == 'Enter_Summ')
                        	this.actionScript(advertItem.placeContent.content, advertDiv.id, false);
                    else
                        this.actionScript(advertItem.placeContent.content, 'jsPlaceHere_' + advertItem.placeNum, true);
                }
            }
        },

        clearPlaces: function() {
            for (var i = 1; i <= this.advertPlaceList.length; i++) {
                if (document.getElementById("advert_" + i))
                    document.getElementById("advert_" + i).innerHTML = "";
            }
        },

        actionScript: function(fileName, funcParam, isDelete) {
            var js = document.createElement('script');
            js.language = 'javascript';
            js.src = '../adv/' + fileName;
            document.body.appendChild(js);
            try {
                runAdvJs(funcParam);
                runAdvJs = null;
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
            var result = "";
            var sPrvId = storage.get("provider");
            if (!$isNoU(sPrvId) && sPrvId != "null") {
                result = sPrvId;
            }
            return result;
        },

        setAdvertPlaceList: function() {
            var result = new Array();

            switch (this.pageName) {
                case 'Index':
                    result.push('index_page_5');
                    result.push('index_page_2');
                    result.push('index_page_3');
                    result.push('index_page_4');
                    result.push('index_page_6');
                    break;

                case 'Main':
                    result.push('main_page');
                    break;

                case 'Pages':
                    result.push('select_provider');
                    break;

                case 'Adv_Cellular':
                    result.push('enter_account');
                    result.push('adv_cellular_3');
                    result.push('receipt_header_text');
                    result.push('receipt_footer_text');
                    break;

                case 'Provider':
                    result.push('enter_account');
                    result.push('receipt_header_text');
                    result.push('receipt_footer_text');
                    break;

                case 'Validate_Confirm':
                    result.push('validate_account');
                    result.push('validate_confirm');
                    break;

                case 'Enter_Summ':
                    result.push('enter_summ');
                    break;

                case 'Ok':
                    result.push('final_page_1');
                    result.push('final_page_2');
                    result.push('final_page_3');
                    result.push('final_page_4');
                    result.push('final_page_5');
                    break;

                case 'qiwi_promo':
                    result.push('promo_page_1');
                    result.push('promo_page_2');
                    result.push('promo_page_3');
                    result.push('promo_page_4');
                    result.push('promo_page_5');
                    result.push('promo_page_6');
                    result.push('promo_page_7');
                    result.push('promo_page_8');
                    result.push('promo_page_9');
                    result.push('promo_page_10');
                    result.push('promo_page_11');
                    result.push('promo_page_12');
                    result.push('promo_page_13');
                    result.push('promo_page_14');
                    result.push('promo_page_15');
                    result.push('promo_page_16');
                    result.push('promo_page_17');
                    break;

                case 'epa':
                    result.push('epa_1');
                    result.push('epa_2');
                    result.push('epa_3');
                    result.push('epa_4');
                    result.push('epa_5');
                    result.push('epa_6');
                    result.push('epa_7');
                    result.push('epa_8');
                    result.push('epa_9');
                    result.push('epa_10');
                    result.push('epa_11');
                    result.push('epa_12');
                    result.push('epa_13');
                    result.push('epa_14');
                    break;

                case 'Bank_Page':
                    result.push('bank_page');
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
            var adv_counter = storage.get(name + '_adv_counter');
            var adv_array_index = this.getAdvIndex(name);
            var adv_array_length = 0;

            if (($isNoU(adv_counter)) || (isNaN(adv_counter)))
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
            storage.put(name + '_adv_counter', adv_counter.toString(10));
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

                if (!isArray(result[2]) || result[2].length == 0 || this.isProviderInArray(0, result[2]))
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

        getAdvContent: function(contentArr, isFirstPlace) {
            var contentType = '';
            var content = '';
            var html = '';
            var result = '';

            if (isArray(contentArr)) {
                if (contentArr[0])
                    contentType = contentArr[0];
                if (contentArr[1])
                    content = contentArr[1];
            }

            if (this.pageName == 'Enter_Summ' && contentType != 'script')
                return result;

            switch (contentType) {
                case 'text':
                    html = content;
                    result = new AdvertContent('text', html)
                    break;

                case 'image':
                    html =
	                    '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                    '   <tr>' +
	                    '       <td align="center" valign="middle" class="on_page_title">' +
	                    '           <img src="../adv/' + content + '">' +
	                    '       </td>' +
	                    '   </tr>' +
	                    '</table>';
                    result = new AdvertContent('image', html)
                    break;

                case 'flash':
                    html = getFlashDef("../adv/" + content, true);
                    result = new AdvertContent('flash', html)
                    break;

                case 'script':
                    result = new AdvertContent('script', content)
                    break;

                default:
                    if (isFirstPlace && this.pageName != 'Index') {
                        if (this.pageName != 'Ok') {
                            html = getFlashDef("./swf/banner.swf", false);
                        }
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
	if(window.loaded)
	{
        	log.add('placeAdv start');
		var advert = new AdvertClass(pageName);
		advert.placeAdv();
        	log.add('placeAdv finish');
	}
	else
	{
		setTimeout(function(){
			startAdvert(pageName)
		}, 25);
	}
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
log.add('Advert finish');

