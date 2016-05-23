function getcookie(name)
{
var RESULT;

if (document.cookie) {

	var startPos, endPos;

	startPos = document.cookie.search(name) + name.length + 1;
 
	if(document.cookie.indexOf(";", startPos) !== -1)
	
	endPos = document.cookie.indexOf(";", startPos);
 
	else
	
	endPos = document.cookie.length;

	RESULT = document.cookie.substring(startPos, endPos);

}
 
else {

	return false;

}

return RESULT;
}

CCookieListItem = function(name, value)
{
    if (name)
        this.name = name;
    else
        this.name = null;
    
    if (value)
        this.value = value;
    else    
        this.value = null;            
    
}


// класс, инкапсулирующий всю работу с cookie
CookieClass = newClass(
    null,
    {
        // конструктор
        constructor : function()
        {
            this._list = this.getCookieList();
            this.updateList();
        },
        
        // метод, заплняющий внутренний список Cookie значениями CookieListItem
        getCookieList : function()
        {
            var result = new Array();                   // результирующий список
            var tempArr = document.cookie.split("; ");  // временный массив cookie, хранящий значения в виде "имя=значение"
            var cookieArr = new Array();                // временный массив, хранящий имя и значение отдельной cookie
        
            for (var i=0; i<tempArr.length; i++)
            {
                cookieArr = tempArr[i].split("=");
                if (cookieArr.length == 1)
                    if ((typeof(cookieArr[0]) == "string") && cookieArr[0].length)
                        result.push(new CookieListItemClass(cookieArr[0], ""));
                if (cookieArr.length > 1)    
                    if ((typeof(cookieArr[0]) == "string") && cookieArr[0].length)
                        result.push(new CookieListItemClass(cookieArr[0], cookieArr[1]));
            }

            return result;
        },
        
        // метод, возвращающий порядковый номер Cookie во внутреннем списке
        getCookieIndex : function(name)
        {
            var result = -1;
            name = escape(name);
            
            for (var i=0; i<this._list.length; i++)
                if (this._list[i] != null)
                    if (this._list[i].name == name)
                    {
                        result = i;
                        break;
                    }
            
            return result;
        },
        
        // метод, очищающий внутренний список от null-значений
        updateList : function()
        {
            var oldList = this._list;
            this._list = new Array();
            
            for (var i=0; i<oldList.length; i++)
                if (oldList[i] != null)
                    this._list.push(oldList[i]);
        },
        
        // метод, устанавливающий cookie
        setCookie : function(name, value, isGlobal)
        {
            if ((typeof(name) == "string") && name.length)
            {
                if (!isGlobal)
                {
                    isGlobal = false;
                }
                
                name = escape(name);

                if ((typeof(value) == "string") && value.length)
                    value = escape(value.toString());
                else
                    value = "";    
        
                this.deleteCookie(name);
                this.updateList();
        
                document.cookie =   name + "=" + value.toString() + ((isGlobal) ? ";path=/" : "");
                this._list.push(new CookieListItemClass(name, value));
            }
        },
        
        // метод, удаляющий cookie
        deleteCookie : function(name)
        {
            if ((typeof(name) == "string") && name.length)
            {    
            
                name = escape(name);
                document.cookie = name + "=; expires=" + (new Date(0)).toGMTString();
            
                var idx = this.getCookieIndex(name);
                if (idx > -1)
                    this._list[idx] = null;
            }
        },
        
        // метод, возвращающий значение cookie
        getCookie : function(name)
        {
            var result = null;

            if ((typeof(name) == "string") && name.length)
            {
            
                name = escape(name);
            
                for (var i=0; i<this._list.length; i++)
                    if (this._list[i].name == name)
                    {
                        result = this._list[i].value;
                        break;
                    }
            }   
            
            return unescape(result);
        },
        
        // метод, удаляющий все cookie
        clear : function()
        {
            for (var i=0; i<this._list.length; i++)
                this.deleteCookie(this._list[i].name);
            this.updateList();
        },
        
        // метод, удаляющий все cookie, у которых имя включает указанную часть имени
        clearOnly : function(partNames)
        {
            if (! isArray(partNames))
                return;
                
            for (var i=0; i<this._list.length; i++)
                for (var j=0; j<partNames.length; j++)
                    if ((typeof(partNames[j]) == "string") && partNames[j].length)
                        if (this._list[i].name.search(partNames[j]) > -1)
                            this.deleteCookie(this._list[i].name);
        },
        
        // метод, удаляющий все cookie, кроме тех, у которых имя включает указанную часть имени
        clearExcept : function(partNames)
        {
            if (! isArray(partNames))
                return;
                
            var tempArr = new Array();    
            
            for (var i=0; i<this._list.length; i++)
                for (var j=0; j<partNames.length; j++)
                {
                    if ((typeof(partNames[j]) == "string") && partNames[j].length)
                        if (this._list[i].name.search(partNames[j]) > -1)
                        {
                            tempArr.push(this._list[i]);
                            break;
                        }    
                }
            
            this.clear();

            for (var i=0; i<tempArr.length; i++)
            {
                this.setCookie(tempArr[i].name, tempArr[i].value);
            }
        }
    }
)

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

var cookie = new CookieClass();
