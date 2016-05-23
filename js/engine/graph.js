	CPoint = createClass
(
	null,
	{
	    ctor: function(nX, nY) {
	        this._nX = 0;
	        this._nY = 0;
	        if (!$isNoU(nX)) {
	            this.setX(nX);
	        }
	        if (!$isNoU(nY)) {
	            this.setY(nY);
	        }
	    },

	    _throwException: function(sMsg) {
	        var e = new Error();
	        if (!$isNoU(sMsg) && sMsg.is(String) && sMsg.length > 0) {
    	        e.message = sMsg;
	        }
	        throw e;
	    },
	    
	    setX: function(nX) {
	        if (isNaN(nX)) {
	            this._throwException("nX can not be NaN");
	        }
	        else {
	            this._nX = Math.round(nX);
	        }
	    },

	    getX: function() {
	        return this._nX; ;
	    },

	    setY: function(nY) {
	        if (isNaN(nY)) {
	            this._throwException("nY can not be NaN");
	        }
	        else {
	            this._nY = Math.round(nY);
	        }
	    },

	    getY: function() {
	        return this._nY; ;
	    }
	}
);

	CBezier = createClass
(
	null,
	{
	    ctor: function() {
	        this._aPoints = [];
	        this._nCounter = 0;
	        this._interval = 0;
	        if (arguments.length > 0) {
	            for (var i = 0; i < arguments.length; i++) {
	                if (arguments[i].is(CPoint)) {
	                    this._aPoints.push(arguments[i]);
	                }
	                else {
	                    this._throwException("argument " + i + " can be CPoint");
	                }
	            }
	        }
	    },

	    _throwException: function(sMsg) {
	        var e = new Error();
	        if (!$isNoU(sMsg) && sMsg.is(String) && sMsg.length > 0) {
	            e.message = sMsg;
	        }
	        throw e;
	    },

	    getPoint: function(t) {
	        var oResult = new CPoint();
	        var nCoefficient = 0;
	        var nPointsCount = this._aPoints.length;
	        var nResX = 0;
	        var nResY = 0;
	        if (t < 0) t = 0;
	        if (t > 1) t = 1;
	        for (var i = 0; i < nPointsCount; i++) {
	            nCoefficient = Math.C(nPointsCount - 1, i) * Math.pow(t, i) * Math.pow(1 - t, nPointsCount - 1 - i);
	            nResX += this._aPoints[i].getX() * nCoefficient;
	            nResY += this._aPoints[i].getY() * nCoefficient;
	        }
	        oResult.setX(nResX);
	        oResult.setY(nResY);
	        return oResult;
	    }
	}
);

CBezierSplineElement = createClass
(
	null,
	{
	    ctor: function(oBezier, nStartT, nEndT) {
	        this._oBezier = $is(oBezier, CBezier) ? oBezier : null;
	        this._nStartT = ($is(nStartT, Number) && nStartT >= 0) ? nStartT : 0;
	        this._nEndT = ($is(nEndT, Number) && nEndT >= 0) ? nEndT : 0;

	        if (this._nEndT < this._nStartT) {
	            this._nEndT = this._nStartT + this._nEndT;
	            this._nStartT = this._nEndT - this._nStartT;
	            this._nEndT = this._nEndT - this._nStartT;
	        }
	    },
	    
	    getBezier: function() {
	        return this._oBezier;
	    },
	    
	    getStartT: function() {
	        return this._nStartT;
	    },
	    
	    getEndT: function() {
	        return this._nEndT;
	    }
	}
);

	CBezierSpline = createClass
(
	null,
	{
	    ctor: function() {
	        this._aElements = [];
	        this._nLength = 0;
	        for (var i = 0; i < arguments.length; i++) {
	            this.addElement(arguments[i]);
	        }
	    },

	    addElement: function(ose) {
	        if ($is(ose, CBezierSplineElement)) {
	            this._aElements.push(ose);
	            this._nLength += ose.getEndT() - ose.getStartT();
	        }
	    },

	    getPoint: function(t) {
	        var nT = t * this._nLength;
	        status = t + " | " + nT + " | " + this._nLength;
	        for (var i = 0; i < this._aElements.length; i++) {
	            if (nT >= this._aElements[i].getStartT() &&
                    nT <= this._aElements[i].getEndT()) {
	                return this._aElements[i].getBezier().getPoint(nT);
	            }
	            else {
	                nT -= this._aElements[i].getEndT() - this._aElements[i].getStartT();
	            }
	        }
	        return null;
	    }
	}
);

