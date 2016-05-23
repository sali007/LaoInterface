var adv_array = [];

function getadvindex(name){
	var idx = 0;
	while(idx <= adv_array.length-1)
	{
		if (adv_array[idx][0] == name) {return idx};
		idx = idx + 1;
	}

	return -1;
}

function getcontent(name){
	var retval = '';
	var adv_counter = getcookie(name+'_adv_counter');

	var adv_array_index = getadvindex(name);
	var adv_array_length = 0;

	if ((adv_counter==false) || (isNaN(adv_counter))) {
		adv_counter = 0;
	}

	if (adv_array_index==-1) {
		return "";
	}

	adv_array_length = adv_array[adv_array_index][1].length;

	if (adv_array_length==0) {
		return "";
	}

	if (adv_counter>adv_array_length-1) {
		adv_counter = 0;
	}

	retval = adv_array[adv_array_index][1][adv_counter];

	adv_counter = 1 + (+adv_counter);
	document.cookie = name+'_adv_counter = '+adv_counter;

	return retval;

}