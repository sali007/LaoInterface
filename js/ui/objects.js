function showFlash(o){
	var bg,q,s,v;
	if(o.bgcolor){bg=o.bgcolor;}else{bg="#FFFFFF";}
	if(o.quality){q=o.quality;}else{q="high";}
	if(o.scale){s=o.scale;}else{s="noscale";}
	if(o.ver){v=o.ver;}else{v=6;}
	var str='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+v+',0,0,0" ';
	str+='id="'+o.id+'" ';
	if(o.base){str+='base="'+o.base+'" ';}
	if(o.align){str+='align="'+o.align+'" ';}
	str+='width="'+o.width+'" height="'+o.height+'"><param name="movie" value="'+o.name+'"/><param name="bgcolor" value="'+bg+'"/><param name="quality" value="'+q+'"/>';
	if(o.flashvars){str+='<param name="flashvars" value="'+o.flashvars+'"/>';}
	if(o.allowScriptAccess){str+='<param name="allowScriptAccess" value="'+o.allowScriptAccess+'"/>';}
	if(o.salign){str+='<param name="salign" value="'+o.salign+'"/>';}
	if(o.wmode){str+='<param name="wmode" value="'+o.wmode+'"/>';}
	str+='<param name="scale" value="'+s+'"/><embed type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" id="'+o.id+'-embed" src="'+o.name+'" bgcolor="'+bg+'" ';
	if(o.flashvars){str+='flashvars="'+o.flashvars+'" ';}
	if(o.swLiveConnect){str+='swLiveConnect="'+o.swLiveConnect+'" ';}
	if(o.allowScriptAccess){str+='allowScriptAccess="'+o.allowScriptAccess+'" ';}
	str+='quality="'+q+'" ';
	if(o.base){str+='base="'+o.base+'" ';}
	if(o.wmode){str+='base="'+o.wmode+'" ';}
	if(o.salign){str+='salign="'+o.salign+'" ';}
	str+='scale="'+s+'" width="'+o.width+'" height="'+o.height+'"></embed></object>';
document.writeln(str);
}

//"íàçàä"
function button_back(){
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_left.gif"></td>');
	document.write('<td background="./img/ui/b_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_la.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}

//"âïåð¸ä"
function button_forward() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_left.gif"></td>');
	document.write('<td background="./img/ui/b_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_ra.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');

}

function button_pay() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_left.gif"></td>');
	document.write('<td background="./img/ui/b_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_pay.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}

//"âïåð¸ä"
function button_forward_inactive() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_inactive_left.gif"></td>');
	document.write('<td background="./img/ui/b_inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_inactive_ra.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_inactive_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');

}

function button_back_inactive() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_inactive_left.gif"></td>');
	document.write('<td background="./img/ui/b_inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_inactive_la.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_inactive_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}


//"â ìåíþ"
function button_menu() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_menu_left.gif"></td>');
	document.write('<td background="./img/ui/b_menu_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_menu_center.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_menu_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}


//"â ìåíþ"
function button_menu_inactive() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="124">');
	document.write('<tr>');
	document.write('<td width="30" background="./img/ui/b_inactive_left.gif"></td>');
	document.write('<td background="./img/ui/b_inactive_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_menu_inactive_center.gif"></td>');
	document.write('<td width="30" background="./img/ui/b_inactive_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}


//"çàâåðøèòü"
function button_fin() {
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="51">');
	document.write('<tr>');
	document.write('<td width="18" background="./img/ui/b_menu_left.gif"></td>');
	document.write('<td background="./img/ui/b_menu_bg.gif" align="center" valign="middle"><img border="0" src="./img/ui/b_fin.gif"></td>');
	document.write('<td width="18" background="./img/ui/b_menu_right.gif"></td>');
	document.write('</tr>');
	document.write('</table>');
}


function get_advert() {
	document.write('<div id="advert" style="display: ;">');
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">');
	document.write('<tr>');
	document.write('<td width="70%" id="advert_image" name="advert_image" background="./img/ui/advert_bg.gif">');
	document.write('</tr>');
	document.write('<tr><td bgcolor="#cfcfcf" height="1"></td></tr>');
	document.write('<tr><td bgcolor="#ffffff" height="1"></td></tr>');
	document.write('</table>');
	document.write('</div>');
}

function ui_item_left() {
	var left = '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="140"><tr><td width="25" background="./img/ui/ui_item_left.gif"></td><td background="./img/ui/ui_item_bg.gif" align="center" valign="middle">';
	document.write(left);
}

function ui_item_right() {
	var right = '</td><td width="25" background="./img/ui/ui_item_right.gif"></td></tr>' + '</table>';
	document.write(right);
}

function _ui_item_left() {
    return '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="140"><tr><td width="25" background="./img/ui/ui_item_left.gif"></td><td background="./img/ui/ui_item_bg.gif" align="center" valign="middle">';
}

function _ui_item_right() {
    return '</td><td width="25" background="./img/ui/ui_item_right.gif"></td></tr>' + '</table>';
}

function bottom_menu() {
	document.write('<tr><td align="center" height="70">');
	document.write('<table cellpadding="10" cellspacing="0" border="0" width="100%">');
	document.write('<tr>');
	document.write('<td width="20%">');	
	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%">');
	document.write('<tr>');
	document.write('<td width="25%" bgcolor="#dedede">');
	document.write('<div id="backward_yes" name="forward_yes" style=display:none><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td onclick=backward()><script>button_back();</script></td></tr></table></div>');
	document.write('<div id="backward_no" name="forward_no" style=display:><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td><script>button_back_inactive();</script></td></tr></table></div>');
	document.write('</td>');
	document.write('<td>&nbsp;</td>	');
	document.write('<td width="30%" bgcolor="#dedede">');
	document.write('<div id="menu_yes" name="menu_yes" style=display:none><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td onclick=menu();><script>button_menu();</script></td></tr></table></div>');
	document.write('<div id="menu_no" name="menu_no" style=display:><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td><script>button_menu_inactive();</script></td></tr></table></div>');
	document.write('</td>');
	document.write('<td>&nbsp;</td>	');
	document.write('<td width="25%" bgcolor="#dedede">');
	document.write('<div id="forward_yes" name="forward_yes" style=display:none><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td onclick=forward();><script>button_forward();</script></td></tr></table></div>');
	document.write('<div id="forward_no" name="forward_no" style=display:><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td><script>button_forward_inactive();</script></td></tr></table></div>');
	document.write('<div id="pay" name="pay" style=display:none><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td onclick=forward();><script>button_pay();</script></td></tr></table></div>');
	document.write('<div id="fin" name="fin" style=display:none><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td onclick=forward();><script>button_fin();</script></td></tr></table></div>');
	document.write('</td>');
	document.write('</tr>');
	document.write('</table>');
	document.write('</td>');
	document.write('</tr>');
	document.write('</table>');
	document.write('</td></tr>');
}







//óñòðîéñòâà ââîäà

//öèôðîâàÿ êëàâèàòóðà, îáû÷íàÿ

function get_keypad() {

	document.write('<table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#dedede">');

	document.write('<tr>');

	document.write('<td style=\'padding: 0 1 1 0;\'><img src="./img/ui/kpad/button_keypad_1_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_1_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_1_off.gif\'" onclick="press(\'1\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 0;\'><img src="./img/ui/kpad/button_keypad_2_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_2_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_2_off.gif\'" onclick="press(\'2\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 1;\'><img src="./img/ui/kpad/button_keypad_3_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_3_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_3_off.gif\'" onclick="press(\'3\');" border="0"></td>');

	document.write('</tr>');

	document.write('<tr>');

	document.write('<td style=\'padding: 0 1 1 0;\'><img src="./img/ui/kpad/button_keypad_4_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_4_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_4_off.gif\'" onclick="press(\'4\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 0;\'><img src="./img/ui/kpad/button_keypad_5_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_5_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_5_off.gif\'" onclick="press(\'5\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 1;\'><img src="./img/ui/kpad/button_keypad_6_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_6_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_6_off.gif\'" onclick="press(\'6\');" border="0"></td>');

	document.write('</tr>');

	document.write('<tr>');

	document.write('<td style=\'padding: 0 1 1 0;\'><img src="./img/ui/kpad/button_keypad_7_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_7_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_7_off.gif\'" onclick="press(\'7\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 0;\'><img src="./img/ui/kpad/button_keypad_8_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_8_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_8_off.gif\'" onclick="press(\'8\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 1;\'><img src="./img/ui/kpad/button_keypad_9_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_9_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_9_off.gif\'" onclick="press(\'9\');" border="0"></td>');

	document.write('</tr>');

	document.write('<tr>');

	document.write('<td style=\'padding: 0 1 1 0;\'><img src="./img/ui/kpad/button_keypad_c_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_c_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_c_off.gif\'" onclick="press(\'c\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 0;\'><img src="./img/ui/kpad/button_keypad_0_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_0_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_0_off.gif\'" onclick="press(\'0\');" border="0"></td>');

	document.write('<td style=\'padding: 0 0 1 1;\'><img src="./img/ui/kpad/button_keypad_bs_off.gif" onMouseOver="this.src=\'./img/ui/kpad/button_keypad_bs_on.gif\'" onMouseOut="this.src=\'./img/ui/kpad/button_keypad_bs_off.gif\'" onclick="press(\'bs\');" border="0"></td>');

	document.write('</tr>');

	document.write('</table>');

}


//áóêâåííàÿ êëàâèàòóðà, îáû÷íàÿ

function get_keyboard() {
	document.write('<table cellpadding="0" cellspacing="0" border="0">');
	document.write('<tr>');
	document.write('<td align="left" style="padding: 0 0 0 0;">');
		document.write('<table width="990" height="49" border="0" background="./img/ui/kboard/up_bg.gif">');
		document.write('<tr>');
		document.write('<td width="220"><img name="raskl" src="./img/ui/kboard/latin-raskl.gif" border="0"></td>');
		document.write('<td  width="10">|</td>');
		document.write('<td>&nbsp;</td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td></tr><tr><td>');
		document.write('<table cellpadding="1" cellspacing="0" width="916">');
		document.write('<tr>');
		document.write('<td><img src="./img/ui/kboard/b_00.gif"  onClick="press(\'`~¸¨\');" width="64" height="64" border="0"><img src="./img/ui/null.gif" alt="" width="2" height="1" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_1.gif"  onClick="press(\'1!1!\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_2.gif"  onClick="press(\'2@2@\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_3.gif"  onClick="press(\'3#3¹\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_4.gif"  onClick="press(\'4$4;\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_5.gif"  onClick="press(\'5%5%\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_6.gif"  onClick="press(\'6^6:\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_7.gif"  onClick="press(\'7&7?\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_8.gif"  onClick="press(\'8*8*\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_9.gif"  onClick="press(\'9(9(\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b_0.gif"  onClick="press(\'0)0)\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b__.gif"  onClick="press(\'-_-_\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b__2.gif"  onClick="press(\'=+=+\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b__3.gif"  onClick="press(\'|/\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b__4.gif"  onClick="press(\'b4\');" width="64" height="64" border="0"></td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td></tr><tr><td>');
		document.write('<table cellpadding="1" cellspacing="0" width="919">');
		document.write('<tr>');
		document.write('<td><img src="./img/ui/kboard/b2_empty.gif" border="0" onClick="tabs(\'1111\');"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_q.gif" onClick="press(\'qQéÉ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_w.gif"  onClick="press(\'wWöÖ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_e.gif"  onClick="press(\'eEóÓ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_r.gif"  onClick="press(\'rRêÊ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_t.gif"  onClick="press(\'tTåÅ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_y.gif"  onClick="press(\'yYíÍ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_u.gif"  onClick="press(\'uUãÃ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_i.gif"  onClick="press(\'iIøØ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_o.gif"  onClick="press(\'oOùÙ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_p.gif"  onClick="press(\'pPçÇ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b2_00.gif"  onClick="press(\'[{õÕ\');" width="64" height="64" border="0"></td>');
		document.write('<td ><img src="./img/ui/kboard/b2_01.gif"  onClick="press(\']}úÚ\');" width="64" height="64" border="0"></td>');
		document.write('<td align="left"><img onClick="press(\'enter\');" src="./img/ui/kboard/enter2.gif" border="0"></td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td></tr><tr><td>');
		document.write('<table cellpadding="1" cellspacing="0"  width="920">');
		document.write('<tr>');
		document.write('<td><img src="./img/ui/kboard/b3_caps_lock.gif" name="shift" onClick="press(\'shift\');" border="0"><img src="./img/ui/null.gif" width="2" height="1" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_a.gif"  onClick="press(\'aAôÔ\');" width="64" height="64" border="0"></td>');
	document.write('<td><img src="./img/ui/kboard/b3_s.gif"  onClick="press(\'sSûÛ\');" width="64" height="64" border="0"></td>');
	document.write('<td><img src="./img/ui/kboard/b3_d.gif"  onClick="press(\'dDâÂ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_f.gif"  onClick="press(\'fFàÀ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_g.gif"  onClick="press(\'gGïÏ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_h.gif"  onClick="press(\'hHðÐ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_j.gif"  onClick="press(\'jJîÎ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_k.gif"  onClick="press(\'kKëË\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_l.gif"  onClick="press(\'lLäÄ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_00.gif"  onClick="press(\';:æÆ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b3_01.gif"  onClick="press(\'ýÝýÝ\');" width="64" height="64" border="0"></td>');
		document.write('<td align="left"><img src="./img/ui/kboard/enter.gif"  onClick="press(\'enter\');" border="0"></td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td></tr><tr><td>');
		document.write('<table cellpadding="1" cellspacing="0"  width="915">');
		document.write('<tr>');
		document.write('<td><img src="./img/ui/kboard/b4_shift.gif" name="shiftflagn" onClick="shiftflag(\'1\');" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_z.gif"  onClick="press(\'zZÿß\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_x.gif"  onClick="press(\'xX÷×\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_c.gif"  onClick="press(\'cCñÑ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_v.gif"  onClick="press(\'vVìÌ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_b.gif"  onClick="press(\'bBèÈ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_n.gif"  onClick="press(\'nNòÒ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_m.gif"  onClick="press(\'mMüÜ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_00.gif"  onClick="press(\',<áÁ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_01.gif"  onClick="press(\'.>þÞ\');" width="64" height="64" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b4_02.gif"  onClick="press(\'/?.,\');" width="64" height="64" border="0"></td>');
		document.write('<td align="right"><img src="./img/ui/kboard/b4_empty.gif" border="0"></td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td></tr><tr><td>');
		document.write('<table cellpadding="1" cellspacing="1" border="0">');
		document.write('<tr>');
		document.write('<td><img src="./img/ui/kboard/b5_engrus.gif" onClick="press(\'engrus\');" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b5_probel.gif" onClick="press(\'    \');" alt="" border="0"></td>');
		document.write('<td><img src="./img/ui/kboard/b5_ochistit.gif" onClick="press(\'ochistit\');" border="0"></td>');
		document.write('</tr>');
		document.write('</table>');
	document.write('</td>');
	document.write('</tr>');
	document.write('</table>');
}
