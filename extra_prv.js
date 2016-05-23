function getExtraPrvIcon(id)
{
	return "./img/custom/"+id;
}

function getExtraFolder(id)
{
	switch(id)
	{
	  case '40': return 'tv';
	  case '81': return 'ecommerce';
	  case '103': return 'internet';
	  case '382': return 'zkh';
	  case '123': return 'other';
	  default: return 'other';
	}
}

function getExtraRecord(i)
{
	var addVal=new Object();
	addVal.prv_id = extraPrv[i][1][0];
	addVal.prv_name = extraPrv[i][1][1];
	addVal.prv_folder = getExtraFolder(extraPrv[i][0]);
	addVal.prv_image = getExtraPrvIcon(extraPrv[i][1][2]);
	addVal.prv_page = "./p_custom.html";
	addVal.prv_page_conf = "./validate_confirm_extra.html";
	addVal.prv_title = extraPrv[i][1][4];
	addVal.prv_caption = extraPrv[i][1][5];
	addVal.prv_alert = '<font weight=bold size=5>'+addVal.prv_name+'</font>'+
	  '<br><br><font size=4 color=red>Внимание!<br>По вопросам зачисления платежей обращайтесь к владельцу автомата!</font>';
	addVal.prv_is_extra = 1;
	return addVal;
}

function linkExtraPrv(arr,folder)
{
	var newArray = new Array();
	newArray=arr;

	if (typeof(extraPrv) == 'undefined') 
	{
		return newArray;
	}

	for (var i=0;i<extraPrv.length;i++)
	{
	  if (getExtraFolder(extraPrv[i][0])==folder)
	  {
	    newArray.push(value.length);
	  }
	  value.push(getExtraRecord(i));
	}	
	return newArray;
}

function addExtraPrvToValues()
{
	if (typeof(extraPrv) == 'undefined') 
	{
		return;
	}

	for (var i=0;i<extraPrv.length;i++)
	{
	  value.push(getExtraRecord(i));
	}

}