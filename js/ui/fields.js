UIFieldClass = newClass
(
	componentBase,
	{

		constructor: function(parent, instance, name, validFunction, mask, maxLen, place, header, footer, isActive, precision, tag, styles, images)
		{
			this.constructor.prototype.constructor.call(this, parent, instance);
			this.parent = parent;
			this.tag = (tag || 0);
			this.name = (name || "");
			this.fieldIsActive = isActive;
			this.chunks = new Array();
			this.place = place;
			this.widthCoefficient = 25;
			this.header = header;
			this.footer = footer;
			this.precision = precision;
			this.chunkMinLength = this.chunkMaxLength = (maxLen || 10);
			this.styles = this.initStyles(styles);
			this.images = this.initImages(images);
			
			// initialize valid function
			if (typeof(validFunction) == "string" && validFunction.length)
			    this.validFunction = validFunction;

			// initialize chunks 
			this.chunks = new Array();
			this.parseMask(mask);
			this.currentChunk = 0;
			
			this.refresh();
		},

		initStyles: function(styles)
		{
		    if (!styles)
		        styles = new Object();
		    if (!styles.prefix || styles.prefix == "")
		        styles.prefix = "prefix";    
		    if (!styles.input || styles.input == "")
		        styles.input = "input";
		    return styles;        
		},
		
		initImages: function(images)
		{
		    if (!images)
		        images = new Object();
		    if (!images.left || images.left == "")
		        images.left = "./img/ui/input_left.gif";    
		    if (!images.right || images.right == "")
		        images.right = "./img/ui/input_right.gif";    
		    if (!images.bg || images.bg == "")
		        images.bg = "./img/ui/input_bg.gif";
		    return images;        
		},
		
		parseMask: function(mask)
		{
		    if ((!mask) || mask.length == 0)
		        return;
		    
		    // states
		    var INCREMENT_PREFIX = 1;
		    var START_HANDLE_CONTENT = 2;
		    var START_WORD_OR_DIGIT = 3;
		    var START_WORD_OR_DIGIT_LENGTH = 4;
		    var START_SYMBOLS = 5;
		    var START_SYMBOLS_ENUM = 6;
		    var FINISH_SYMBOLS_ENUM = 7;
		    var START_SYMBOLS_LENGTH = 8;
		    var WORD_OR_DIGIT_VARIABLE_LENGTH = 9;
		    var SYMBOLS_VARIABLE_LENGTH = 10;
		    var START_FLOAT = 11;
		    var START_FLOAT_LENGTH = 12;
		    var FLOAT_PRECISION = 13;
		    var START_LANGUAGE = 14;
		    var LANGUAGE_INPUT = 15;
		    
		    // initialize automat
		    var state = INCREMENT_PREFIX;
		    var prefix = "";
		    var alphaNum = "";
		    var symbols = "";
		    var length = "";
		    var sType = "";
		    var separator = "";
		    var language = "";
		    
		    for (var i=0; i<mask.length; i++)
		    {
		        var ch = mask.charAt(i);
		        switch (state)
		        {
		            case INCREMENT_PREFIX: 
		                if (ch == "\\")
		                {
		                    language = "";
		                    sType = "";
		                    alphaNum = "";
		                    symbols = "";
		                    length = "";
		                    separator = "";
		                    state = START_HANDLE_CONTENT;
		                }    
		                else
		                    prefix += ch;        
		                break;
		            case START_HANDLE_CONTENT:
		                if (ch == "w" || ch == "d")
		                {
		                    alphaNum = ch;
		                    state = START_WORD_OR_DIGIT;
		                }
		                else if (ch == "s")
		                {
		                    sType = "s";
		                    state = START_SYMBOLS;
		                }        
		                else if (ch == "f")
		                    state = START_FLOAT;
		                else if (ch == "l")
		                    state = START_LANGUAGE;
		                else
		                {
		                    prefix += "\\" + ch;
		                    state = INCREMENT_PREFIX;
		                }
		                break;
		            case START_WORD_OR_DIGIT:
		                if (ch == "{")
		                    state = START_WORD_OR_DIGIT_LENGTH;
		                else if (ch == "+")
		                {
		                    this.chunks.push(new chunkClass(prefix, alphaNum, this.chunkMinLength, this.chunkMaxLength, true, false, this.precision, "", language));
		                    prefix = "";
		                    state = INCREMENT_PREFIX;
		                }
		                else if (ch == "*")
		                {
		                    this.chunks.push(new chunkClass(prefix, alphaNum, this.chunkMinLength, this.chunkMaxLength, true, true, this.precision, "", language));
		                    prefix = "";
		                    state = INCREMENT_PREFIX;
		                }
		                else
		                {
		                    prefix += "\\" + alphaNum + ch;
		                    state = INCREMENT_PREFIX;
		                }
		                break;
		            case START_WORD_OR_DIGIT_LENGTH:
		                if (ch == "." || ch == ",")
		                {
		                    separator = ch;
		                    length += ch;
		                    state = WORD_OR_DIGIT_VARIABLE_LENGTH;
		                }    
		                else if (ch == "}")
		                    if (length.length > 0)
		                    {
		                        this.chunks.push(new chunkClass(prefix, alphaNum, length, length, true, true, this.precision, "", language));
		                        prefix = "";
		                        state = INCREMENT_PREFIX;    
		                    }
		                    else
		                    {
		                        prefix += "\\" + alphaNum + "{}";
		                        state = INCREMENT_PREFIX;    
		                    }
		                else
		                    if (parseInt(ch) || ch == 0)
		                        length += ch;
		                    else
		                    {
		                        prefix += "\\" + alphaNum + "{" + length + ch +"}";
		                        state = INCREMENT_PREFIX;    
		                    }    
		                break;
		            case START_SYMBOLS:
		                if (ch == "!")
		                    sType = "s!";
		                else if (ch == "[")
		                    state = 6;
		                else
		                {
	                        prefix += "\\" + sType + ch;
		                    state = INCREMENT_PREFIX;
		                }        
		                break;
		            case START_SYMBOLS_ENUM:
		                if (ch != "]")
		                    symbols += ch;
		                else
		                    state = FINISH_SYMBOLS_ENUM;
		                break;
		            case FINISH_SYMBOLS_ENUM:
		                if (ch == "{")
		                    state = START_SYMBOLS_LENGTH;
		                else if (ch == "+")
		                {
		                    this.chunks.push(new chunkClass(prefix, sType, this.chunkMinLength, this.chunkMaxLength, true, false, this.precision, symbols, language));
		                    prefix = "";
		                    state = INCREMENT_PREFIX;    
		                }
		                else if (ch == "*")
		                {
		                    this.chunks.push(new chunkClass(prefix, sType, this.chunkMinLength, this.chunkMaxLength, true, true, this.precision, symbols, language));
		                    prefix = "";
		                    state = INCREMENT_PREFIX;    
		                }
		                else
		                {
		                    prefix += "\\" + sType + "[" + symbols + "]" + ch;
		                    state = INCREMENT_PREFIX;
		                }
		                break;                     
		            case START_SYMBOLS_LENGTH:
		                if (ch == "." || ch == ",")
		                {
		                    separator = ch;
		                    length += ch;
		                    state = SYMBOLS_VARIABLE_LENGTH;
		                }    
		                else if (ch == "}")
		                    if (length.length > 0)
		                    {
		                        this.chunks.push(new chunkClass(prefix, sType, length, length, true, true, this.precision, symbols, language));
		                        prefix = "";
		                        state = INCREMENT_PREFIX;    
		                    }
		                    else
		                    {
		                        prefix += "\\" + sType + "[" + symbols + "]{}";
		                        state = INCREMENT_PREFIX;    
		                    }
		                else
		                    if (parseInt(ch) || ch == 0)
		                        length += ch;
		                    else
		                    {
		                        prefix += "\\" + sType + "[" + symbols + "]{" + length + ch +"}";
		                        state = INCREMENT_PREFIX;    
		                    }    
		                break;
		            case WORD_OR_DIGIT_VARIABLE_LENGTH:
		                if (ch == "}")
		                    if (length.length > 0)
		                    {
		                        var lArr = length.split(separator);
		                        this.chunks.push(new chunkClass(prefix, alphaNum, lArr[0], lArr[1], false, true, this.precision, "", language));
		                        prefix = "";
		                        state = INCREMENT_PREFIX;    
		                    }
		                    else
		                    {
		                        prefix += "\\" + alphaNum + "{}";
		                        state = INCREMENT_PREFIX;    
		                    }
		                else
		                    if (parseInt(ch) || ch == 0)
		                        length += ch;
		                    else
		                    {
		                        prefix += "\\" + alphaNum + "{" + length + ch +"}";
		                        state = INCREMENT_PREFIX;    
		                    }    
		                break;    
		            case SYMBOLS_VARIABLE_LENGTH:
		                if (ch == "}")
		                    if (length.length > 0)
		                    {
		                        var lArr = length.split(separator);
		                        this.chunks.push(new chunkClass(prefix, sType, lArr[0], lArr[1], false, true, this.precision, symbols, language));
		                        prefix = "";
		                        state = INCREMENT_PREFIX;    
		                    }
		                    else
		                    {
		                        prefix += "\\" + sType + "[" + symbols + "]{}";
		                        state = INCREMENT_PREFIX;    
		                    }
		                else
		                    if (parseInt(ch) || ch == 0)
		                        length += ch;
		                    else
		                    {
		                        prefix += "\\" + sType + "[" + symbols + "]{" + length + ch +"}";
		                        state = INCREMENT_PREFIX;    
		                    }    
		                break;
		            case START_FLOAT:
		                if (ch == "{")
		                    state = START_FLOAT_LENGTH;
		                else
		                {
		                    prefix += "\\f" + ch;
		                    state = INCREMENT_PREFIX;
		                }    
		                break;
		            case START_FLOAT_LENGTH:
		                if (ch == "." || ch == ",")
		                {
		                    separator = ch;
		                    length += ch;
		                    state = FLOAT_PRECISION;
		                }
		                else if (ch == "}")
		                {
	                        this.chunks.push(new chunkClass(prefix, "f", length, length, true, false, 2, "", language));
	                        prefix = "";
	                        state = INCREMENT_PREFIX;
		                }
		                else if (parseInt(ch))
		                    length += ch;
		                else
		                {
		                    prefix += "\\f{" + length + ch;
		                }    
		                break;
		            case FLOAT_PRECISION:
		                if (ch == "}")
                        {
                            var lArr = length.split(separator);
	                        if (lArr[0] > 0)
	                        {
	                            if (lArr[1] > 0)
	                                this.chunks.push(new chunkClass(prefix, "f", lArr[0], lArr[0], true, false, lArr[1], "", language));
	                            else
	                                this.chunks.push(new chunkClass(prefix, "d", lArr[0], lArr[0], true, false, this.precision, "", language));
	                            prefix = "";
	                            state = INCREMENT_PREFIX;
	                        }
	                        else
	                        {
		                        prefix += "\\f{" + length + "}";
		                        state = INCREMENT_PREFIX;    
	                        }        
		                }
		                else
		                    if (parseInt(ch) > -1)
		                        length += ch;
		                    else
		                    {
		                        prefix += "\\f{" + length + ch;
		                        state = INCREMENT_PREFIX;    
		                    }    
		                break;
		            case START_LANGUAGE:
		                if (language != "")
		                {
		                    prefix = "\\l{" + language + "}l";
		                    state = INCREMENT_PREFIX; 
		                }
		                if (ch == "{")
		                    state = LANGUAGE_INPUT;
		                else
		                {
		                    prefix += "\\l" + ch;
		                    state = INCREMENT_PREFIX;
		                }    
		                break;
		            case LANGUAGE_INPUT:
		                if (ch == "}")
		                {
		                    if (language == "e" || language == "r")
		                        state = START_HANDLE_CONTENT;
		                    else
		                    {
		                        prefix = "\\l{" + language + "}";
		                        state = INCREMENT_PREFIX;
		                    }
		                }
		                else
		                {
		                    language += ch;
		                }            
		                break;                
		        }
		    }
		},
		
		processKey: function(keyValue)
		{
			var currentChunk = this.chunks[this.currentChunk];
			switch(keyValue)
			{
				case 'CLEAR':
					this.clear();
					return;
					break;
				case 'BACKSPACE':
					var cv = currentChunk.chunkValue;
					if (cv.length == 0)
					{
						this.prevChunk();
						currentChunk = this.chunks[this.currentChunk];
						cv = currentChunk.chunkValue;
					}
					if (cv.length > 0)
					{
						cv = cv.substr(0,cv.length-1);
						currentChunk.chunkValue = cv;
					} 
					this.refresh();
					return;
					break;
				case 'TAB':
					this.nextChunk();
					this.refresh();
					return;
					break;
			}
	
			if (currentChunk.chunkType == 'd')
				if(isNaN(keyValue))
					{al('Incorrect input'); return;}

			if (currentChunk.chunkType == 's')
				if(currentChunk.symbols.indexOf(keyValue) == -1)
					{al('Incorrect input'); return;}

			if (currentChunk.chunkType == 's!')
			{
				if(currentChunk.symbols.indexOf(keyValue) > -1)
					{al('Incorrect input'); return;}
            }
			
			if (currentChunk.chunkType == 'f')
				if(isNaN(keyValue) && keyValue != '.')
					{al('Incorrect input'); return;}
			
			if (currentChunk.chunkType == 'f')
			{
				if (keyValue == '.')
				{
					if (currentChunk.chunkValue.length == 0) return;
					if (currentChunk.chunkValue.length < currentChunk.chunkMaxLength-1)
					{
						if (currentChunk.chunkValue.indexOf('.')>=0) return;
					} else return;
				} 
				else 
				{
					var dLength = getStrAfterChar(currentChunk.chunkValue,'.').length;
					if (dLength > 0 && dLength >= currentChunk.precision) return;
				}
			}
				
					
			if (currentChunk.chunkValue.length < currentChunk.chunkMaxLength)
			{
				currentChunk.chunkValue += keyValue;
			}
			this.refresh();
			if(currentChunk.chunkValue.length == currentChunk.chunkMaxLength)
			{
				this.nextChunk();
			} 
			else
			{
				if(currentChunk.chunkType == 'f' && currentChunk.valid()) this.nextChunk();
			}
		},
		
		getChunkToEnter: function()
		{
			var chunkNum = this.chunks.length - 1;;
			
			for (var i=0;i<this.chunks.length;i++)
			    if (this.chunks[i].chunkValue.length < this.chunks[i].chunkMaxLength)
			    {
			        chunkNum = i;
			        break;    
			    }
			    
			return chunkNum;    
		},
		
		onClick: function()
		{
			this.notify('eventClick',this.tag);
			this.switchChunk(this.getChunkToEnter());
			this.refresh();
		},
	
		// returns true if user entered all data described in mask
		valid: function()
		{
			for(var i=0;i<this.chunks.length;i++)
			{
				if (!this.chunks[i].valid()) return false;
			}
			return true;
		},

		variableLength: function()
		{
			for(var i=0;i<this.chunks.length;i++)
			{
				if (this.chunks[i].variableLength)
				{
					return true;
				}
			}
			return false;
		},
		
		refresh: function()
		{
			insertContent(this.place,this.getVisualRepresentation(this.fieldIsActive));
		},
		
		// switch to next chunk
		nextChunk: function()
		{
			if (this.currentChunk < this.chunks.length-1)
			{
				this.currentChunk ++;
                this.notify("eventChunkChange", this.currentChunk);
			}
			else
			{
				if (this.validFunction)
				{
				    if (eval(this.validFunction + "('" + this.getValue(false) + "')"))
				    {    
				        this.isValid = true;
				        this.notify('eventNextField');
				    }
				    else
				    {
				        this.changeFieldView("NO_VALID");
				    }
				}
				else
				    this.notify('eventNextField');            
			}
		},
	
		// switch to previous chunk
		prevChunk: function()
		{
			if (this.currentChunk > 0)
			{
				this.currentChunk --;
                this.notify("eventChunkChange", this.currentChunk);
			}
			else
			{
				this.notify('eventPrevField');
			}
		},
		
		// returns index of first invalid chunk in field or -1 if all chunks are valid
		findFirstInvalidChunk: function()
		{
			for(var i=0;i<this.chunks.length;i++)
			{
				if (!this.chunks[i].valid()) return i;
			}
			return -1;
		},
		
		// returns entered value formatted with mask
		// if stripped=true then returns only user-entered value without formatting
		getValue: function(stripped)
		{
			var res = '';
			for(var i=0;i<this.chunks.length;i++)
			{
				res += ((stripped == true) ? '' : this.chunks[i].prefix) + this.chunks[i].chunkValue;
			}
			return res;
		},
		
		// returns HTML formatted value
		// if fieldIsActive then add red arrow under active chunk
		getVisualRepresentation: function(fieldIsActive)
		{
			var res = '';
			var res1 = '';
			var width = 0;
			for(var i=0;i<this.chunks.length;i++)
			{
				var chunk = this.chunks[i];
				var style = ((!chunk.valid()) ? 'style="filter:alpha(opacity:40)"':'');
				res +=
				'<td align=center class=inp>' + chunk.prefix + '</td>' +
				'<td valign="middle" ' + style + '><img style="border: 0px;" src="' + this.images.left + '" /></td>' +
				'<td class=inp ' + style + ' align=' + ((chunk.chunkType == 'f') ? 'right' : 'center') + ' valign="middle" background="' + this.images.bg +'" onClick=' + this.instance +'.onClick()' + '><div style="width: ' +  chunk.chunkMaxLength * this.widthCoefficient + '; overflow: hidden;">' + chunk.chunkValue + '</div></td>' +
				'<td valign="middle" ' + style + '><img src="' + this.images.right + '" /></td>';
				res1 += '<td>&nbsp;</td><td colspan=3 align=center>' + 
					((fieldIsActive == true && this.currentChunk == i) ? '<img src="./img/ui/arrow_on.gif"></img>' : '<img src="./img/ui/arrow_off.gif"></img>') + '</td>';
				width += chunk.chunkMaxLength * this.widthCoefficient + chunk.prefix.length * this.widthCoefficient +18;
			}
			res = 
				((!this.header) ? '' : '&nbsp;&nbsp;<b>' + this.header + '</b>') +
				'<table border=0 cellspacing=0 cellpadding=0>' +
				'<tr>' + res + '</tr>'+
				'<tr>' + res1 + '</tr>'+
				'</table>' +
				((!this.footer) ? '&nbsp;' : this.footer);
			return res;
		},
	
		switchChunk: function(chunkNum)
		{
            this.notify("eventChunkChange", chunkNum);
			this.currentChunk = chunkNum;
		},
	
		clear: function()
		{
			for (var i=0;i<this.chunks.length;i++)
			{
				this.chunks[i].chunkValue='';
			}
			this.currentChunk = 0;
			this.refresh();
		}
	}
)

// field chunk
var chunkClass = function(prefix, chunkType, chunkMinLength, chunkMaxLength, variableLength, canBeNull, precision, symbols, language)
{
	this.chunkValue = '';
	this.prefix = prefix;
	this.chunkType = chunkType;
	this.chunkMinLength = chunkMinLength;
	this.chunkMaxLength = chunkMaxLength;
	this.variableLength = variableLength;
	this.canBeNull = canBeNull;
	this.precision = precision;
	this.symbols = symbols;
	this.language = "";
 
    if (language.length > 0)
	        this.language = language;
	else
	    this.language = "user";
	    
	this.valid = function()
	{
		if (this.chunkType == 'f' && (this.chunkValue.length < this.chunkMaxLength && this.precision != getStrAfterChar(this.chunkValue,'.').length))
		{
			return false;
		}
		if (this.canBeNull == false && this.chunkValue == '')
		{
			return false;
		}
		if (this.variableLength == false && this.chunkValue.length < this.chunkMinLength)
		{
			return false;
		}
		if (this.chunkType != 'f' && (this.variableLength == true && this.chunkValue.length < this.chunkMaxLength))
		{
			return false;
		}
		return true;
	}
}