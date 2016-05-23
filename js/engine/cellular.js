log.add('Cellular start');
var Phone_Number = '',
    sLogoContent = './img/ui/cellular.gif',
    flag = true,
    sNumber = '',
    nPrvId = 0,
    curNom = 643,
    sPrv = "",
    oInfo = {},
    js = null,
    head = null,
    oProv = null,
    parser = new phoneParser(),
    number,
    realnumber = false,
    r1 = RegExp('^8[( ]{2}[0-9]{2}[) ]{3}$'),
    r2 = RegExp('^8[( ]{2}[0-9][) ]{5}$'),
    nTest = /^\d{10}$/,
    nClean = new RegExp('[ ()-]', 'g'),
    providerButton = {};

function start()
{
	log.add('Start start');

	new CInnerShadow($('btn_del').getElementsByTagName('img')[0], { color: 30 });
	new CInnerShadow($('btn_back').getElementsByTagName('img')[0], { color: 30 });
	keyboard();

	number = $("number");
	realnumber = number.value.replace(nClean, '').substr(1);

	providerButton.logo = $('logo').getElementsByTagName('div')[0].style;
	providerButton.text = $('logo').getElementsByTagName('p')[0];

	var oPrv = oProv;
	providerButton.logo.backgroundImage = 'url(' + (oPrv != null ? './img/ui_item/' + getFileName(oPrv.logo) : sLogoContent) + ')';
	providerButton.text.innerHTML = oPrv ? (oPrv.buttonName || oPrv.sName) : '';
	vAlignP();
	
	storage.put("groupId", "-20");
	startAdvert("Adv_Cellular");
	log.add('Start finish');
};

function initProvider(provider) {
	log.add('initProvider start');
	if(!provider || provider == 'null' || provider == 0)
	{
		oProv = null;
		start();
	}
	else
	{
	    getScript("./config/" + storage.get("language") + "/" + provider + ".js", loadProvider);
	}
    log.add('initProvider finish');
}

function loadProvider() {
    try {
        oProv = window.UIProvider.clone();
    }
    catch (e) {
    }
    start();
}

var printTimer;
function press(digit)
{
    // удаление
    if(digit == 'c')
    {
        flag = true;
        clearProviderButton();
        realnumber = realnumber.substr(0, realnumber.length - 1);
    }
    // добавление
    else if(realnumber !== false && realnumber.length < 10)
    {
    	if(realnumber == '7' || (realnumber == '8' && digit == '9'))
    	{
    		realnumber = digit;
    	}
    	else
    	{
    		realnumber += digit;
    	}
    }
    if(printTimer) clearTimeout(printTimer);
    printTimer = setTimeout(print, 50);
};
function clearProviderButton()
{
    this;
	$("btn_forward").style.display = 'none';
	$("num_info").style.display = "none";
	//$('container404').style.visibility = 'hidden';
	$('container7').className = 'init_l';
	providerButton.logo.backgroundImage = 'url(' + sLogoContent + ')';
	providerButton.text.innerHTML = '';
	vAlignP();
};
function print()
{
    if(printTimer) clearTimeout(printTimer);
    // форматирование
    var s = parser.spliceNumber(realnumber),
        r = ['8'];
    if(s.str.prefix != '')
    {
	r.push(' (', s.str.prefix, parser.nulls(s.str.prefix, 3, '  '), ')');
	if(s.str.pre != '')
	{
		r.push(' ', s.str.pre);
		if(s.str.number1 != '')
		{
			r.push('-', s.str.number1);
			if(s.str.number2 != '')
			{
				r.push('-', s.str.number2);
			}
		}
	}
    }
    number.value = r.join('');
    
    preTest();
};
function preTest()
{
    // проверка    
    if(realnumber !== false && realnumber.length == 10)
    {
        if(flag)
        {
		flag = false;
		var sLang = storage.get("language");
       if(sLang == "F1")
       {
		
		if(!$("btn_forward").shadowed)
		{
			$("btn_forward").style.display = 'block';
			new CInnerShadow($('btn_forward').getElementsByTagName('img')[0], { color: 30 });
			$("btn_forward").shadowed = true;
			$("btn_forward").style.display = 'none';
		}
		}
		else{		if(!$("btn_forward_FC").shadowed)
		{
			$("btn_forward_FC").style.display = 'block';
			new CInnerShadow($('btn_forward').getElementsByTagName('img')[0], { color: 30 });
			$("btn_forward_FC").shadowed = true;
			$("btn_forward_FC").style.display = 'none';
		}}
		
		test(realnumber);
        }
    }
}

function isCorrectPrvInfo(oInfo) 
{
    return (!$isNoU(oInfo) &&
            oInfo.hasOwnProperty("from") &&
            oInfo.hasOwnProperty("to"));
}


function test(sNumber)
{
    nPrvId = 0;
    window.sNumber = sNumber;
    if(nTest.test(sNumber))
    {
    	parser.get(sNumber, process);
    }
    else
    {
    	process();
    }

}

function process(result)
{
var sLang = storage.get("language");

if(sLang == "F1"){
    var sLogoContent2 = sLogoContent;
    var BEELINE_INTERNET_VALUE = 50;
    var nPrefix = 0;
    var oProvider = {};
    var sRegion = "";
    var sTxt =
        "Проверьте, не ошиблись ли Вы при вводе номера !!!<br /><br />" +
        "Если номер набран верно, нажмите \"Вперед\" для выбора оператора";
    var sNoPrv = "Невозможно оплатить данного провайдера";
    var sNoRegion = "Регион не определен";
    var sCellularProvider = "Сотовая связь";
    var bIsFoundProvider = false;}
    
    else{
        var sLogoContent2 = sLogoContent;
    var BEELINE_INTERNET_VALUE = 50;
    var nPrefix = 0;
    var oProvider = {};
    var sRegion = "";
    var sTxt =
        "Please check this number for errors !!!<br /><br />" +
       "If the number is correct, press \"Next\" to choose provider";
    var sNoPrv = "If the number is correct, press Next to choose provider";
    var sNoRegion = "If the number is correct, press Next to choose provider";
    var sCellularProvider = "Сотовая связь";
    var bIsFoundProvider = false;
    }

	   
       if(sLang == "F1")
       {
	$("btn_forward").style.display = 'block';
	}
	else
	{
	$("btn_forward_FC").style.display = 'block';
	
	}

	providerButton.logo.backgroundImage = 'url('+sLogoContent+')';
	providerButton.text.innerHTML = '';
	vAlignP();

	if(!$isNoU(result) && !$isNoU(result.provider) && !$isNoU(result.provider.sName))
	{
		bIsFoundProvider = true;
		nPrvId = result.provider.id;
		if (nPrvId == 2 && result.priority == BEELINE_INTERNET_VALUE)
		{
			sPrv = "Билайн Интернет";
		}
		else
		{
			sPrv = result.provider.sName;
		}
		if(!$isNoU(result) && !$isNoU(result.region))
	    {
	        sRegion = result.region;
	    }
	}
	
	if(bIsFoundProvider)
	{
	    sTxt = sPrv + "<br />" + sRegion;
	    //initProvider(nPrvId.toString(10));

	    if (!$isNoU(result) && !$isNoU(result.provider))
	    {
		   	oProv = result.provider;
			if(
				result.provider.hasOwnProperty("logo") &&
				!$isNoU(result.provider.logo) &&
				result.provider.logo.is(String)
			)
			{
				providerButton.logo.backgroundImage = 'url(./img/ui_item/' + getFileName(result.provider.logo) + ')';
			}
			
			providerButton.text.innerHTML = result.provider.buttonName || result.provider.sName;
			vAlignP();
	    }
	    else
	    {
			result.provider.id = nPrvId.toString(10);
			result.provider.sName = sPrv != sNoPrv ? sPrv : sCellularProvider;
		   	oProv = {};
		   	
	    }
	}
	
	
    //$('container404').style.visibility = bIsFoundProvider ? 'hidden' : 'visible';


if(sLang == "F1")
    {
    $('container7').className = 'init_l' + (bIsFoundProvider ? '' : ' undefined');
    }
    else 
if(sLang == "FC")
    {
    $('container7').className = 'init_l' + (bIsFoundProvider ? '' : ' undefined_FC');
    }

    $("num_info").style.marginTop = (bIsFoundProvider || !$isNoU(result)) ? "55px" : "10px";
    $("num_info").style.display = "block";
    if (!$isNoU(result) && !$isNoU(result.provider))
    {
        if (result.provider == "false")
        {
            sTxt = sNoPrv;
            $("btn_forward").style.display = 'none';
        }
    }
    
    $("num_info_txt").innerHTML = sTxt;

    storage.put("provider", nPrvId.toString(10));
    setTimeout(function(){
	    startAdvert("Adv_Cellular");
    }, 100);
};

function backward()
{
//    storage.put("pay_info", "null");   
    storage.remove("provider");
//    location = storage.get("last_page");
top.location.href = "./main.html#-100001:1";
}

function forward()
{
	var oProvider = {};
//	alert(nPrvId);
	if(nPrvId == 0)
	{	
//		storage.put("last_page", document.location.href);
//getScript("./config/F1/-100009.js"); 
		oProvider.prvId = 0;
		oProvider.prvName = 'cellular';
		oProvider.prvLogo = 'null.gif';
		oProvider.account = sNumber;
		oProvider.isCellular = 'true';
		storage.put("pay_info", oProvider.serialize());
		storage.put("Phone_Number", $("number").value);
		storage.put("bevalValue", "cellular");
		storage.put("group", "-100001");
		storage.put("flag_cel", "true");
		ff.prv_id.value = '0';
		ff.prv_name.value = 'cellular';
		ff.getAccountNumber.value = sNumber;
//		ff.action = './main.html#-100009:1';
		ff.action = './pages_c.html';
		ff.submit();
	}
	else
	{
		oProvider.prvId = nPrvId;
//		oProvider.buttonName = sPrv;
		oProvider.prvName = sPrv;
		oProvider.prvLogo = oProv.logo;
		oProvider.account = sNumber;
		oProvider.isCellular = 'true';
//		oProvider.curNom = 'RUB';
		
		storage.put("pay_info", oProvider.serialize());
		
		storage.put("Phone_Number", $("number").value);
		ff.prv_id.value = nPrvId;
		//ff.prv_cur_id.value = curNom;
		ff.prv_cur_id.value = '840';
		ff.prv_name.value = sPrv;
		ff.getAccountNumber.value = sNumber;
		if (!$isNoU(oProv["maxSum"]))
		{
			$("inp").innerHTML = '<input type="hidden" name="MaxCashLimit" value="' + oProv["maxSum"] + '" />';
        	}
        
		if (!$isNoU(oProv["minSum"]))
		{
			ff.komissiya.value = oProv["minSum"];
		}
		ff.action = './validate_confirm.html';
		ff.submit();
	}
};

function keyboard()
{
	var imgs = $('keyboard').getElementsByTagName('img');
	for(var i = 0, l = imgs.length; i < l; i++)
	{
		var isLast = (i + 1 == l);
		new CInnerShadow(imgs[i], isLast ? { height: 95 } : null);
	}
};

function vAlignP()
{
	providerButton.text.style.marginTop = (providerButton.text.parentNode.clientHeight - providerButton.text.clientHeight) / 2 + 'px';
};

log.add('Cellular finish');













