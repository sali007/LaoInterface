DataCollectorClass = newClass
(
	componentBase,
	{
		constructor: function(instance,template)
		{
			this.constructor.prototype.constructor.call(this, '', instance);
			this.currentFieldIdx = 0;
			this.template = template;
			this.fieldsPlace = this.template.fieldsPlace;
			this.kbPlace = this.template.kbPlace;
			this.kbType = this.template.kbType;
			if (this.template.fields.length == 0)
			{
				al('There is no fields !');
				return false;
			}
			this.prepareFields();
		},
		
		prepareFields: function()
		{
			this.prepareTemplate(this.template.fieldsMode);
			this.createObjects();
		},

		prepareTemplate: function(fieldsMode)
		{
			if (fieldsMode == 'multi')
			{
				// формирование дерева полей
				var fieldsArr = new Array();
				var arrItem = 0;	
				for (var f=0; f<this.template.fields.length; f++)
				{
					var field = this.template.fields[f];
					if(f==0)
					{
						fieldsArr.push(field);
					}
					else
					{
						if(field.nobr)
						{
							if (!fieldsArr[arrItem][0])
								fieldsArr[arrItem] = new Array();
							fieldsArr[arrItem].push(field);
						}
						else
						{
							fieldsArr.push(field);
							arrItem++;
						}
					}
				}

				var templateHTML = '<table border=0 cellspacing=0 cellpadding=0 width=100%>';	
				var fieldIndex = 0;
				for (var f=0; f<fieldsArr.length; f++)
				{
					if(isArray(fieldsArr[f]))
					{
						templateHTML += '<tr><td><table border=0 cellspacing=0 cellpadding=0><tr>';
						templateHTML += '<td id="' + this.pf(fieldIndex) + '">' + fieldIndex + '</td>';
						fieldIndex++;
						for(var cf=0; cf<fieldsArr[f].length; cf++)
						{
							templateHTML += '<td width="20"></td>';
							templateHTML += '<td id="' + this.pf(fieldIndex) + '">' + fieldIndex + '</td>';
							fieldIndex++;
						}
						templateHTML += '</td></tr></table></tr>';
					}
					else
					{
						templateHTML += '<tr><td id="' + this.pf(fieldIndex) + '">' + fieldIndex + '</td></tr>';
						fieldIndex++;
					}
				}
			    templateHTML += '</table>';
			    insertContent(this.fieldsPlace,templateHTML);
			}
			else if (fieldsMode == 'single')
			{
			    for (var f=0; f<this.template.fields.length; f++)
			    {
			        var field = this.template.fields[f];
			        
			        if (!(field.place && field.place != ''))
			        {
				        this.template.fields.splice(f, 1);
				        f--;
				        continue;
			        }
			        
			        insertContent(field.place, '<div id="field'+ f + '"></div>');
			    }    
			}
		},
		
		createObjects: function()
		{
			//place fields
			for(var f=0; f<this.template.fields.length; f++)
			{
				var field = this.template.fields[f];
				var pf = this.pf(f);
				this.constructor.prototype[pf] = 
					new UIFieldClass(
						this.instance, 
						pf,
						field.name, 
						field.validFunction, 
						field.mask, 
						field.max, 
						pf, 
						field.head, 
						field.foot, 
						(f==0)?true:false,
						field.precision,
						""+f,
						field.styles,
						field.images);
				this.constructor.prototype[pf].attachListener('eventClick',this.instance+'.switchField');
				this.constructor.prototype[pf].attachListener('eventNextField',this.instance+'.nextField');
				this.constructor.prototype[pf].attachListener('eventPrevField',this.instance+'.prevField');
				this.constructor.prototype[pf].attachListener('eventChunkChange',this.instance+'.changeLanguage');
				this.constructor.prototype[pf].attachListener('eventChunkChange',this.instance+'.changeKeyboard');
				
				if (this.constructor.prototype[pf].chunks.length == 0)
				{    
				    this.template.fields.splice(f, 1);
				    f--;
				}    		
			}
			this.keyboard = new UIKeyboardClass(this.instance, 'keyboard', this.kbPlace, this.kbType, './img/ui');
			this.keyboard.attachListener('eventKeyPress','dataCollector.keyPress');
		},
		
		initialize: function()
		{
	        var firstField = this.constructor.prototype[this.pf(this.currentFieldIdx)];
	        
	        if (! firstField)
	            return;
	        
	        var language = firstField.chunks[firstField.currentChunk].language;
	        if (language == "user")
	            firstField.chunks[firstField.currentChunk].language = "e";    
	        
	        firstField.notify('eventChunkChange', firstField.currentChunk);
	        
	        firstField.chunks[firstField.currentChunk].language = language;
		},
		
		changeLanguage: function(chunkNum)
		{
		    chunkNum = parseInt(chunkNum);
		    var chunk = this.constructor.prototype[this.pf(this.currentFieldIdx)].chunks[chunkNum];
		    if (this.keyboard.type.indexOf('AL') == -1 || chunk.language == "user") return;
		    if ((this.keyboard.eng && chunk.language == "r") || (!this.keyboard.eng && chunk.language == "e"))
		         this.keyboard.akeyPress("ENGRUS");
		},
		
		changeKeyboard: function(chunkNum)
		{
		    if (!this.template.kbAutoReplace) return; 
		    
		    chunkNum = parseInt(chunkNum);
		    var chunk = this.constructor.prototype[this.pf(this.currentFieldIdx)].chunks[chunkNum];
            
            if (this.kbType.indexOf("DG") > -1)
            {
                if (chunk.chunkType == "d")
        			this.keyboard = new UIKeyboardClass(this.instance, 'keyboard', this.kbPlace, 'DG', './img/ui');
                if (chunk.chunkType == "f")
        			this.keyboard = new UIKeyboardClass(this.instance, 'keyboard', this.kbPlace, 'DGD', './img/ui');
 			    this.keyboard.attachListener('eventKeyPress','dataCollector.keyPress');
           }
		},
		
		keyPress: function(keyVal)
		{
			if(keyVal == 'CLEAR')
			{
				for(var i=0; i<this.template.fields.length; i++)
				{
					var pf = this.pf(i);
					this.constructor.prototype[pf].clear();
				}
				this.switchField(0);
			}
			else
			{
				var pf = this.pf();
				this.constructor.prototype[pf].processKey(keyVal);
			}
			this.checkFields();
		},
		
		switchField: function(fld, newPage, newChunk)
		{
			var pf = this.pf();
			this.constructor.prototype[pf].fieldIsActive = false;
			this.constructor.prototype[pf].refresh();
			this.currentFieldIdx = parseInt(fld);
			var pf = this.pf(this.currentFieldIdx);
			this.constructor.prototype[pf].fieldIsActive = true;
			this.constructor.prototype[pf].switchChunk((newChunk || this.constructor.prototype[pf].getChunkToEnter()));
			this.constructor.prototype[pf].refresh();
		},
		
		nextField: function()
		{
			if(this.currentFieldIdx < this.template.fields.length-1) 
			{
				this.switchField(this.currentFieldIdx+1)
			}
			else
			{
				if (!this.checkFields()) 
				{
					for(var i=0; i<this.template.fields.length; i++)
					{
						var pf = this.pf(i);
						if (!this.constructor.prototype[pf].valid()) 
						{
							this.switchField(i,-1,this.constructor.prototype[pf].findFirstInvalidChunk());
							return;
						}
					}
				}
			}
		},

		prevField: function()
		{
			if (this.currentFieldIdx>0)
			{
				this.switchField(this.currentFieldIdx-1);
				var pf = this.pf();
				this.constructor.prototype[pf].currentChunk = this.constructor.prototype[pf].chunks.length-1;
				this.constructor.prototype[pf].refresh();
			}
		},
		
		checkFields: function()
		{
			this.form = new formClass();
			
			for(var i=0; i<this.template.fields.length; i++)
			{
				var pf = this.pf(i);
				
				if (!this.constructor.prototype[pf].valid()) 
				{
					this.notify('formIncomplete');
					return false;
				}
			}
			
			// all fields are ready. so, lets fill the form
			for(var i=0; i<this.template.fields.length; i++)
			{
				var field = this.template.fields[i];
				var pf = this.pf(i);
				this.form.add(
					field.name,
					this.constructor.prototype[pf].getValue((field.strip==1)?true:false),
					this.constructor.prototype[pf].getValue());
			}
			
			this.notify('formComplete');

			return true;
		},
		
		pf: function(f)
		{
			if(f>=0) 
			{
				return 'field'+f;
			} 
			else 
			{
				return 'field'+this.currentFieldIdx;
			}
		},
		
		onComplete: function(call)
		{
			this.attachListener('formComplete',call);
		},
		
		onIncomplete: function(call)
		{
			this.attachListener('formIncomplete',call);
		}
		
	}
);
