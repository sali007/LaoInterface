CLawMotion = createClass
(
	null,
	{
	    ctor: function() {
	    },

	    getDelta: function(nProgress) {
	        if (nProgress.is(Number)) {
	            if (nProgress < 0) return 0;
	            else if (nProgress > 1) return 1;
	            else return nProgress;
	        }
	        else {
	            return 0;
	        }
	    }
	}
);

	CAnimationElement = createClass
(
	null,
	{
	    ctor: function(sDomElId, nFrom, nTo, oLaw) {
	        this._aValues = [];
	        this._sElementId = "";
	        this._nFrom = 0;
	        this._nTo = 0;
	        this._oLaw = oLaw;
	        if ($is(sDomElId, String)) {
	            this._sElementId = sDomElId;
	        }
	        if ($is(nFrom, Number)) {
	            if (nFrom > 0) {
	                if (nFrom < 1) {
	                    this._nFrom = nFrom;
	                }
	                else {
	                    this._nFrom = 1;
	                }
	            }
	        }
	        if ($is(nTo, Number)) {
	            if (nTo <= 1) {
	                if (nTo > 0) {
	                    this._nTo = nTo;
	                }
	                else {
	                    this._nTo = 0;
	                }
	            }
	        }
	        if (this._nTo < this._nFrom) {
	            this._nTo = this._nFrom + this._nTo;
	            this._nFrom = this._nTo - this._nFrom;
	            this._nTo = this._nTo - this._nFrom;
	        }
	    },
	    
	    clearValues: function() {
	        this._aValues = [];
	    },

	    fillValues: function(nStepsCount) {
	    
	    },
	    
	    process: function(gt, bIsSavedValues) {
	    }
	}

);

	CMoveableAnimationElement = createClass
(
	CAnimationElement,
	{
	    ctor: function(sDomElId, nFrom, nTo, oLaw) {
	        CMoveableAnimationElement.base.ctor.apply(this, arguments);
	    },

	    process: function(gt, sAction) {
	        var oPoint = null;
	        var t = 0;
	        if (gt <= 1) {
	            var oEl = $(this._sElementId);
	            if (!$isNoU(oEl)) {
	                if (sAction == "RETURN_SAVED_VALUE" && this._aValues.length) {
	                    oPoint = this._aValues[Math.round(gt * (this._aValues.length - 1))];
	                    this._nCurrentIdx++;
	                }
	                else {
	                    t = (this._nTo - this._nFrom) * gt + this._nFrom;
	                    oPoint = this._oLaw.getPoint(t);
	                }
	                if (!$isNoU(oPoint)) {
	                    if (sAction == "SAVE_VALUE") {
	                        this._aValues.push(oPoint);
	                    }
	                    oEl.style.left = oPoint.getX() + "px";
	                    oEl.style.top = oPoint.getY() + "px";
	                }
	            }
	        }
	    }
	}

);

	CPowerMotion = createClass
(
	CLawMotion,
	{
	    ctor: function(nPow) {
	        this._nPower = nPow;
	    },

	    getDelta: function(nProgress) {
	        if (nProgress.is(Number)) {
	            if (nProgress < 0) return 0;
	            else if (nProgress > 1) return 1;
	            else return Math.pow(nProgress, this._nPower);
	        }
	        else {
	            return 0;
	        }
	    }
	}
);

	CTestMotion = createClass
(
	CLawMotion,
	{
	    ctor: function() {
	    },

	    getDelta: function(nProgress) {
	        if (nProgress.is(Number)) {
	            if (nProgress < 0) return 0;
	            else if (nProgress > 1) return 1;
	            else return (1 - Math.sin((1 - nProgress) * Math.PI/2));
	        }
	        else {
	            return 0;
	        }
	    }
	}
);

	CAnimation = createClass
(
	null,
	{
	    ctor: function(oEl, nDuration, nStepsCount, oLawMotion, bIsReal) {
	        this._bIsFilled = false;
	        this._aElements = [];
	        this._nDuration = parseInt(nDuration) | 1000;
	        this._nStepsCount = parseInt(nStepsCount) | 10;
	        this._nDelay = (this._nDuration / this._nStepsCount);
	        this._bIsReal = $bool(bIsReal);
	        this.addElement(oEl);
	        this._nProgress = 0;
	        this._nFrom = 0;
	        this._nTo = 1;
	        this._oMotion = null;
	        this._sMode = "RUN_ACTIVE";
	        if ($is(oLawMotion, CLawMotion)) {
	            this._oMotion = oLawMotion;
	        }
	        this._dStart = 0;
	    },

	    addElement: function(oEl) {
	        if ($is(oEl, CAnimationElement)) {
	            for (var i = 0; i < this._aElements.length; i++) {
	                if (this._aElements[i] == oEl) {
	                    return;
	                }
	            }
	            this._aElements.push(oEl);
	        }
	    },

	    setMode: function(sMode) {
	        if (sMode == "RUN_ACTIVE" ||
	            sMode == "RUN_PASSIVE" ||
	            sMode == "RUN_AND_SAVE") {
	            this._sMode = sMode;
	        }
	    },

	    run: function() {
	        if (!this._aElements.length) {
	            return;
	        }
	        if (this._dStart == 0) this._dStart = new Date().getTime();
	        var dNow = new Date().getTime() - this._dStart;
	        this._nProgress = (dNow / this._nDuration);
	        var t = (this._nTo - this._nFrom) * this._oMotion.getDelta(this._nProgress) + this._nFrom;
	        for (var i = 0; i < this._aElements.length; i++) {
	            if (this._sMode == "RUN_AND_SAVE") {
	                this._aElements[i].process(t, "SAVE_VALUE");
	            }
	            else if (this._sMode == "RUN_PASSIVE") {
	                this._aElements[i].process(t, "RETURN_SAVED_VALUE");
	            }
	            else if (this._sMode == "RUN_ACTIVE") {
	                this._aElements[i].process(t);
	            }                    
	        }
	        if (this._nProgress <= 1) {
	            setTimeout($delegate(this, arguments.callee), this._nDelay);
	        }
	        else {
	            this._dStart = 0;
	        }
	    }
	}
);
