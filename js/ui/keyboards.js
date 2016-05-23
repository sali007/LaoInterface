// simple screen keyboard
UIKeyboardClass = newClass
(
	componentBase,
	{
	    constructor: function(parent, instance, place, type, picFolder) {
	        this.type = (type || 'DG');
	        this.constructor.prototype.constructor.call(this, parent, instance);
	        this.capsLock = this.shift = false;
	        this.eng = true;
	        this.picFolder = picFolder;
	        this.buttonValues = ['@~¸¨', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '0000', '-_-_', '=+=+', '|/|/', 'qQéÉ', 'wWöÖ', 'eEóÓ', 'rRêÊ', 'tTåÅ', 'yYíÍ', 'uUãÃ', 'iIøØ', 'oOùÙ', 'pPçÇ', '[{õÕ', ']}úÚ', 'aAôÔ', 'sSûÛ', 'dDâÂ', 'fFàÀ', 'gGïÏ', 'hHðÐ', 'jJîÎ', 'kKëË', 'lLäÄ', ';:æÆ', '**ýÝ', 'zZÿß', 'xX÷×', 'cCñÑ', 'vVìÌ', 'bBèÈ', 'nNòÒ', 'mMüÜ', ',<áÁ', '.>þÞ', '/?.,'];
	        if (this.type == 'ALC') this.capsLock = true;
	        if (this.type == 'ALS') this.shift = true;
	        if (this.type == 'ALR') this.eng = false;
	        if (this.type == 'ALRC') { this.eng = false; this.capsLock = true; };
	        if (this.type == 'ALRS') { this.eng = false; this.shift = true; };

	        var ins = this.instance;
	        if (this.type.substring(0, 2) == 'DG') {
	            var res =
				'<table cellpadding=2 cellspacing=0 width=0 border=0>' +
				'<tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_1_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_1_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_1_off.gif" onclick=' + ins + '.dkeyPress("1")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_2_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_2_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_2_off.gif" onclick=' + ins + '.dkeyPress("2")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_3_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_3_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_3_off.gif" onclick=' + ins + '.dkeyPress("3")></td>' +
				'</tr><tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_4_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_4_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_4_off.gif" onclick=' + ins + '.dkeyPress("4")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_5_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_5_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_5_off.gif" onclick=' + ins + '.dkeyPress("5")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_6_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_6_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_6_off.gif" onclick=' + ins + '.dkeyPress("6")></td>' +
				'</tr><tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_7_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_7_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_7_off.gif" onclick=' + ins + '.dkeyPress("7")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_8_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_8_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_8_off.gif" onclick=' + ins + '.dkeyPress("8")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_9_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_9_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_9_off.gif" onclick=' + ins + '.dkeyPress("9")></td>' +
				'</tr><tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_c_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_c_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_c_off.gif" onclick=' + ins + '.dkeyPress("CLEAR")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_0_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_0_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_0_off.gif" onclick=' + ins + '.dkeyPress("0")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/digital/btn_bs_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_bs_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_bs_off.gif" onclick=' + ins + '.dkeyPress("BACKSPACE")></td>' +
				'</tr>' +
				(((this.type == 'DGT')) ? '<tr><td colspan=3><img src="' + this.picFolder + '/keyboard/digital/btn_sw_on.gif" onclick=' + ins + '.dkeyPress("TAB")></td></tr>' : '') +
				(((this.type == 'DGD')) ? '<tr><td colspan=3><img src="' + this.picFolder + '/keyboard/digital/btn_dot_large.gif" onclick=' + ins + '.dkeyPress(".")></td></tr>' : '') +
				(((this.type == 'DGDT') || (this.type == 'DGTD')) ? '<tr><td colspan=0><img src="' + this.picFolder + 'keyboard/digital/btn_dot_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_dot_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_dot_off.gif" onclick=' + ins + '.dkeyPress(".")></td><td colspan=3><img src="' + this.picFolder + '/keyboard/digital/btn_sw_small_off.gif" onMouseOver=this.src="' + this.picFolder + '/keyboard/digital/btn_sw_small_on.gif" onMouseOut=this.src="' + this.picFolder + '/keyboard/digital/btn_sw_small_off.gif" onclick=' + ins + '.dkeyPress("TAB")></td></tr>' : '') +
				'</table>';
	        }
	        else {
	            var res =
				'<table cellpadding=0 cellspacing=0 border=0 width=0>' +
				'<tr><td align=left height=50px background="' + this.picFolder + '/keyboard/al/up_bg.gif">&nbsp<img id="engrus" src="' + ((this.eng) ? '' + this.picFolder + '/keyboard/al/latin-raskl.gif' : '' + this.picFolder + '/kboard/russian-raskl.gif') + '" onClick=' + ins + '.akeyPress("ENGRUS")></td></tr>' +
				'<tr><td>' +
				'<table cellpadding=1 cellspacing=0 width=100%><tr>' +
				'<td id="btn_1" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'@~¸¨\')></td>' +
				'<td id="btn_2" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'1111\')></td>' +
				'<td id="btn_3" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'2222\')></td>' +
				'<td id="btn_4" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'3333\')></td>' +
				'<td id="btn_5" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'4444\')></td>' +
				'<td id="btn_6" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'5555\')></td>' +
				'<td id="btn_7" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'6666\')></td>' +
				'<td id="btn_8" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'7777\')></td>' +
				'<td id="btn_9" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'8888\')></td>' +
				'<td id="btn_10" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'9999\')></td>' +
				'<td id="btn_11" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'0000\')></td>' +
				'<td id="btn_12" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'-_-_\')></td>' +
				'<td id="btn_13" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'=+=+\')></td>' +
				'<td id="btn_14" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'|/\')></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/al/b__4.gif" onClick=' + ins + '.akeyPress(\'BACKSPACE\')></td>' +
				'</tr></table>' +
				'</td></tr><tr><td>' +
				'<table cellpadding=1 cellspacing=0 width=100%><tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/al/b2_empty.gif" border="0" onClick=' + ins + '.akeyPress("TAB")></td>' +
				'<td id="btn_15" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'qQéÉ\')></td>' +
				'<td id="btn_16" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'wWöÖ\')></td>' +
				'<td id="btn_17" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'eEóÓ\')></td>' +
				'<td id="btn_18" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'rRêÊ\')></td>' +
				'<td id="btn_19" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'tTåÅ\')></td>' +
				'<td id="btn_20" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'yYíÍ\')></td>' +
				'<td id="btn_21" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'uUãÃ\')></td>' +
				'<td id="btn_22" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'iIøØ\')></td>' +
				'<td id="btn_23" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'oOùÙ\')></td>' +
				'<td id="btn_24" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'pPçÇ\')></td>' +
				'<td id="btn_25" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'[{õÕ\')></td>' +
				'<td id="btn_26" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\']}úÚ\')></td>' +
				'<td align=right><img onClick=' + ins + '.akeyPress("ENTER") src="' + this.picFolder + '/keyboard/al/enter2.gif"></td>' +
				'</tr></table>' +
				'</td></tr><tr><td>' +
				'<table cellpadding=1 cellspacing=0 width=100%><tr>' +
				'<td><img src="' + ((this.capsLock) ? '' + this.picFolder + '/keyboard/al/b3_caps_lock_on.gif' : '' + this.picFolder + '/keyboard/al/b3_caps_lock.gif') + '" id="caps" onClick=' + ins + '.akeyPress("CAPS")></td>' +
				'<td id="btn_27" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'aAôÔ\')></td>' +
				'<td id="btn_28" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'sSûÛ\')></td>' +
				'<td id="btn_29" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'dDâÂ\')></td>' +
				'<td id="btn_30" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'fFàÀ\')></td>' +
				'<td id="btn_31" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'gGïÏ\')></td>' +
				'<td id="btn_32" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'hHðÐ\')></td>' +
				'<td id="btn_33" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'jJîÎ\')></td>' +
				'<td id="btn_34" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'kKëË\')></td>' +
				'<td id="btn_35" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'lLäÄ\')></td>' +
				'<td id="btn_36" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\';:æÆ\')></td>' +
				'<td id="btn_37" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'**ýÝ\')></td>' +
				'<td align=right><img src="' + this.picFolder + '/kboard/enter.gif" onClick=' + ins + '.akeyPress("ENTER")></td>' +
				'</tr></table>' +
				'</td></tr><tr><td>' +
				'<table cellpadding=1 cellspacing=0 width=100%><tr>' +
				'<td><img src="' + ((this.shift) ? '' + this.picFolder + '/keyboard/al/b4_shift_on.gif' : '' + this.picFolder + '/keyboard/al/b4_shift.gif') + '" id="shift" onClick=' + ins + '.akeyPress("SHIFT")></td>' +
				'<td id="btn_38" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'zZÿß\')></td>' +
				'<td id="btn_39" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'xX÷×\')></td>' +
				'<td id="btn_40" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'cCñÑ\')></td>' +
				'<td id="btn_41" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'vVìÌ\')></td>' +
				'<td id="btn_42" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'bBèÈ\')></td>' +
				'<td id="btn_43" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'nNòÒ\')></td>' +
				'<td id="btn_44" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'mMüÜ\')></td>' +
				'<td id="btn_45" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick="' + ins + '.akeyPress(\',<áÁ\')"></td>' +
				'<td id="btn_46" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick="' + ins + '.akeyPress(\'.>þÞ\')"></td>' +
				'<td id="btn_47" align="center" valign="middle" style="width: 64px; height: 64px; font-size: 30px; font-weigth: bold; background: url(\'' + this.picFolder + '/keyboard/al/button.gif\');" onClick=' + ins + '.akeyPress(\'/?.,\')></td>' +
				'<td align=right><img src="' + this.picFolder + '/keyboard/al/b4_empty.gif"></td>' +
				'</tr></table>' +
				'</td></tr><tr><td>' +
				'<table cellpadding=1 cellspacing=1 width=100%><tr>' +
				'<td><img src="' + this.picFolder + '/keyboard/al/b5_engrus.gif" onClick=' + ins + '.akeyPress("ENGRUS")></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/al/b5_probel.gif" onClick="' + ins + '.akeyPress(\'    \')"></td>' +
				'<td><img src="' + this.picFolder + '/keyboard/al/b5_ochistit.gif" onClick=' + ins + '.akeyPress("CLEAR")></td>' +
				'</tr></table>' +


				'</td></tr></table>';
	        }
	        insertContent(place, res);
	        this.fillButtons();
	    },

	    fillButtons: function() {
	        if (this.type.indexOf("DG") > -1)
	            return;

	        for (var i = 1; i <= 47; i++) {
	            $("btn_" + i).innerHTML = this.fixSymb(this.decode(this.buttonValues[i - 1]));
	        }
	    },

	    setStates: function() {
	        if (this.eng)
	            $("engrus").src = '' + this.picFolder + '/keyboard/al/latin-raskl.gif'
	        else
	            $("engrus").src = '' + this.picFolder + '/keyboard/al/russian-raskl.gif';

	        if (this.capsLock)
	            $("caps").src = '' + this.picFolder + '/keyboard/al/b3_caps_lock_on.gif'
	        else
	            $("caps").src = '' + this.picFolder + '/keyboard/al/b3_caps_lock.gif';

	        if (this.shift)
	            $("shift").src = '' + this.picFolder + '/keyboard/al/b4_shift_on.gif'
	        else
	            $("shift").src = '' + this.picFolder + '/keyboard/al/b4_shift.gif';

	        this.fillButtons();
	    },

	    setLanguage: function(language) {
	        if (((this.eng) && (language == "r")) || ((!this.eng) && (language == "e")))
	            this.akeyPress("ENGRUS");
	    },

	    akeyPress: function(key) {
	        switch (key) {
	            case 'BACKSPACE':
	                break;
	            case 'TAB':
	                break;
	            case 'CAPS':
	                this.capsLock = (!this.capsLock);
	                this.setStates();
	                return;
	                break;
	            case 'SHIFT':
	                this.shift = (!this.shift);
	                this.setStates();
	                return;
	                break;
	            case 'ENTER':
	                key = 'TAB';
	                break;
	            case 'ENGRUS':
	                this.eng = (!this.eng);
	                this.setStates();
	                return;
	                break;
	            case 'CLEAR':
	                break;
	            default:
	                key = this.decode(key);
	                break;
	        }
	        this.notify('eventKeyPress', key);
	        if (this.shift) this.akeyPress('SHIFT');
	    },

	    fixSymb: function(c) {
	        switch (c) {
	            case '&'    : return '&amp';
	            case '<'    : return '&lt';
	            default: return c;
	        }
	    },

	    decode: function(c) {
	        var pos = 0;

	        if (this.shift)
	            pos = (this.capsLock) ? 0 : 1
	        else
	            pos = (this.capsLock) ? 1 : 0;

	        if (!this.eng) pos += 2;

	        if (pos > c.length) {
	            return c.charAt(0);
	        }
	        else {
	            return c.charAt(pos);
	        }
	    },

	    dkeyPress: function(key) {
	        this.notify('eventKeyPress', key);
	    }
	}
);
