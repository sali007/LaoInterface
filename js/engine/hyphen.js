//function Autohyphen() { this.Autohyphen() };

autohyphen = {
	tshy:         "&shy;",
	shy:          "&shy;", //null,
	x:            '[éüú]',
	g:            '[àå¸èîóûışÿaeiouy]',
	s:            '(?:sh|ch|qu|[áâãäæçêëìíïğñòôõö÷øùbcdfghjklmnpqrstvwxz])',
	l:            '[üúéàå¸èîóûışÿáâãäæçéêëìíïğñòôõö÷øùúüaeiouybcdfghjklmnpqrstvwxz]',
	rules:        null,

	hyphenizeText: function(text){
		var text = text.split(' ');
		for(var j = 0, k = text.length; j < k; j++)
		{
			if(text[j].length > 10)
			{
				for(var i = autohyphen.rules.length - 1; i >= 0; i--)
				{
					var ru = autohyphen.rules[i]; 
					if (!ru) continue;
					var re = new RegExp('(' + ru[0] + ')(?=' + ru[1] + ')', 'gi');
					text[j] = text[j].replace(re, '$1' + autohyphen.shy);
				}
			}
		}
		return text.join(' ');
	},

	dehyphenizeText: function(text){
		re = new RegExp(autohyphen.shy, 'g');
		return text.replace(re, '');
	}
};

with (autohyphen)
{
	/*var node = document.createElement("span");
	node.innerHTML = tshy;
	shy = node.childNodes[0].nodeValue;*/
	rules = [
		[s+g, g+l],
		[g+s, s+g],
		[s+g, s+g],
		[g+s, s+s+g],
		[g+s+s, s+g],
		[g+s+s, s+s+g],
		[x, l+l],
		null
	];
//	node = null;
}

