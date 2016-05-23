var authOnlineCellular = false;
var divisionOfPayments = false;

var extraPrv = [];

var fieldDescr = function(fname,mask,ml,tl,cp)
{
	this.fieldName = fname;
	this.fieldMask = mask;
	this.maxLength = ml;
	this.title = tl;
	this.caption = cp;
	this.enteredValues = new Array();
}

var fieldsDescr = new Array();
