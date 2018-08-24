
/* 
 ================================================
 PVII Slide-Out Panel Magic scripts
 Copyright (c) 2016 - 2017 Project Seven Development
 www.projectseven.com
 Version: 1.0.9 -build 08
 ================================================
 
 */
var p7SOP = {
	ctl: [],
	status: false,
	once: false,
	ie: false,
	body: null,
	clk: false,
	prf: 'none',
	defDuration: 450,
	animDelay: (1000 / 60)
};
function P7_SOPset(){
	var h, hd, sh = '';
	if (!document.getElementById) {
		return;
	}
	p7SOP.ie = P7_SOPgetIEver();
	sh += '.p7SOP {position:fixed;left:-200%;top:0;visibility:hidden;overflow:hidden;height:100%;margin:0;}\n';
	sh += '.p7SOP.sop-from-left {left:-100%;}\n';
	sh += '.p7SOP.sop-from-right {left:auto;right:100%;}\n';
	sh += '.sop-wrapper {position:relative;height:100%;overflow:auto;}\n';
	sh += '.p7SOP.sop-from-left .sop-wrapper {left:-100%;}\n';
	sh += '.p7SOP.sop-from-right .sop-wrapper {left:100%;}\n';
	if (sh !== '') {
		hd = document.head || document.getElementsByTagName('head')[0];
		h = document.createElement('style');
		h.type = 'text/css';
		if (h.styleSheet) {
			h.styleSheet.cssText = sh;
		} else {
			h.appendChild(document.createTextNode(sh));
		}
		hd.appendChild(h);
	}
	p7SOP.prf = P7_SOPgetCSSPre();
}

P7_SOPset();
function P7_SOPaddLoad(){
	if (!document.getElementById) {
		return;
	}
	if (window.addEventListener) {
		document.addEventListener("DOMContentLoaded", P7_SOPinit, false);
		window.addEventListener("load", P7_SOPinit, false);
		window.addEventListener("resize", P7_SOPrsz, false);
	} else if (window.attachEvent) {
		document.write("<script id=p7ie_sop defer src=\"//:\"><\/script>");
		document.getElementById("p7ie_sop").onreadystatechange = function(){
			if (this.readyState == "complete") {
				P7_SOPinit();
			}
		};
		window.attachEvent("onload", P7_SOPinit);
		window.attachEvent("onresize", P7_SOPrsz);
	}
}

P7_SOPaddLoad();
function P7_SOPinit(){
	var i, j, kj, el, cl, im, cT, tB, tW, tR, iM, sD, bs, dt, sdb, frms, t;
	if (p7SOP.once) {
		return;
	}
	p7SOP.once = true;
	cT = P7_SOPgetByAttribute('data-sop', 'p7SOP');
	for (j = 0; j < cT.length; j++) {
		p7SOP.ctl[p7SOP.ctl.length] = cT[j];
		tB = cT[j];
		if (tB.parentNode.nodeName != 'BODY') {
			document.getElementsByTagName('BODY')[0].appendChild(tB);
		}
		tB.p7opt = tB.getAttribute('data-sop').split(',');
		P7_SOPremClass(tB, 'sop-noscript');
		if (tB.p7opt[1] == 1) {
			P7_SOPsetClass(tB, 'sop-from-right');
		} else {
			P7_SOPsetClass(tB, 'sop-from-left');
		}
		tB.style.maxWidth = tB.p7opt[3];
		tB.style.width = tB.p7opt[2];
		tB.style.minWidth = tB.p7opt[4];
		tB.sopTrig = false;
		tB.style.zIndex = tB.p7opt[7];
		tR = document.getElementById(tB.id.replace('_', 't_'));
		if (tR) {
			tR.sopState = 'closed';
			tR.sopDiv = tB;
			tB.sopTrig = tR;
			P7_SOPaddEvent(tR, 'click', function(evt){
				evt = (evt) ? evt : event;
				if (!P7_SOPclick(this)) {
					evt.preventDefault();
				}
			});
		}
		el = document.getElementById(tB.id.replace('_', 'cl_'));
		if (el) {
			el.sopDiv = tB;
			P7_SOPaddEvent(el, 'click', function(evt){
				evt = (evt) ? evt : event;
				P7_SOPclose(this.sopDiv);
				evt.preventDefault();
			});
			if (tB.p7opt[15] == 1) {
				tB.appendChild(el.parentNode);
			}
		}
		tB.sopSTT = false;
		if (tB.p7opt[11] == 1) {
			P7_SOPaddEvent(document, 'click', P7_SOPcreatePGC(tB));
			P7_SOPaddEvent(document, 'touchstart', P7_SOPcreatePGC(tB));
		}
		tW = document.getElementById(tB.id.replace('_', 'w_'));
		if (tW) {
			tB.sopWrapper = tW;
			if (tB.p7opt[5] == 2) {
				tW.style.left = '0px';
				tW.style.opacity = 0;
			}
			if (tB.p7opt[14] == 1) {
				el = document.getElementById(tB.id.replace('_', 'tp_'));
				if (el) {
					tB.sopSTT = el;
					el.sopDiv = tB;
					P7_SOPaddEvent(el, 'click', function(evt){
						evt = (evt) ? evt : event;
						P7_SOPstt(this.sopDiv);
						evt.preventDefault();
					});
					tW.addEventListener('scroll', P7_SOPcheckSTT, false);
				}
			}
			frms = tW.getElementsByTagName('IFRAME');
			if (frms && frms.length) {
				tB.sopFrames = [];
				for (kj = 0; kj < frms.length; kj++) {
					tW.style.width = '100%';
					if (/video-wrapper/.test(frms[kj].parentNode.className)) {
						tB.sopFrames[kj] = frms[kj];
						frms[kj].sopSrc = frms[kj].src;
						frms[kj].src = '';
					}
				}
			}
			P7_SOPurl(tB);
			if (tB.p7opt[9] == 1) {
				t = tB.p7opt[10] * 1000;
				tB.sopOpenTimer = setTimeout(P7_SOPcreateTMH(tB), t);
			}
		}
	}
}

function P7_SOPcreateTMH(el){
	return function(){
		P7_SOPopen(el);
	};
}

function P7_SOPcreatePGC(el){
	return function(evt){
		var m = true, pp = (evt.fromElement) ? evt.fromElement : evt.target;
		while (pp) {
			if (pp.sopDiv && pp.sopDiv == el) {
				m = false;
				break;
			}
			if (pp.sopTrig) {
				m = false;
				break;
			}
			if (pp && pp.id && typeof(pp.id) == 'string' && pp.id.indexOf('p7SOPt') === 0) {
				m = false;
				break;
			}
			if (pp && pp.id && typeof(pp.id) == 'string' && pp.id.indexOf('p7SOPcl') === 0) {
				m = false;
				break;
			}
			if (pp && pp.id && typeof(pp.id) == 'string' && pp.id.indexOf(el.id) === 0) {
				m = false;
				break;
			}
			if (pp && pp.tagName && (pp.tagName == 'BODY' || pp.tagName == 'HTML')) {
				break;
			}
			pp = pp.parentNode;
		}
		if (m) {
			P7_SOPclose(el);
		}
	};
}

function P7_SOPclick(a){
	var tB, m = false;
	tB = a.sopDiv;
	if (tB) {
		if (tB.sopState == 'open') {
			P7_SOPclose(tB);
		} else {
			P7_SOPopen(tB);
		}
	}
	return m;
}

function P7_SOPctrl(dv, ac, a){
	if (a) {
		a.sopTrig = true;
	}
	return P7_SOPcontrol(dv, ac);
}

function P7_SOPcontrol(dv, ac){
	var i, a;
	for (i = 0; i < p7SOP.ctl.length; i++) {
		if (dv == 'all' && ac == 'close') {
			if (p7SOP.ctl[i].sopState != 'closed') {
				P7_SOPclose(p7SOP.ctl[i]);
			}
		} else if (p7SOP.ctl[i].id == dv) {
			if (ac == 'close') {
				P7_SOPclose(p7SOP.ctl[i]);
				break;
			} else if (ac == 'open') {
				P7_SOPopen(p7SOP.ctl[i]);
				break;
			} else if (ac == 'trig') {
				if (p7SOP.ctl[i].sopState == 'open') {
					P7_SOPclose(p7SOP.ctl[i]);
					break;
				} else {
					P7_SOPopen(p7SOP.ctl[i]);
					break;
				}
			}
		}
	}
	return false;
}

function P7_SOPopen(tB){
	var an, tp, tW, dur;
	if (!tB || tB.sopState == 'open' || !tB.sopWrapper) {
		return;
	}
	if (tB.sopAnimC) {
		clearTimeout(tB.sopAnimC);
	}
	if (tB.sopOpenTimer) {
		clearTimeout(tB.sopOpenTimer);
	}
	if (tB.p7opt[8] == 1) {
		P7_SOPcloseAll(tB);
	}
	tB.sopState = 'open';
	P7_SOPsetClass(tB, 'open');
	tB.sopTrig.sopState = 'open';
	P7_SOPsetClass(tB.sopTrig, 'open');
	if (tB.p7opt[12] == 1) {
		P7_SOPsetClass(document.body, 'sop-active');
	}
	an = tB.p7opt[5];
	dur = tB.p7opt[6];
	tB.style.visibility = 'hidden';
	if (tB.p7opt[1] == 1) {
		tB.style.right = '0px';
	} else {
		tB.style.left = '0px';
	}
	tW = tB.sopWrapper;
	if (tB.sopFrames) {
		P7_SOPframes(tB, 'on');
	}
	if (tB.p7opt[14] == 1) {
		tW.scrollTop = 0;
	}
	P7_SOPcheckSTT();
	if (an == 1) {
		tW.offsetWidth = tW.offsetWidth;
		tW.style[p7SOP.prf + 'transition'] = 'left ' + dur + 'ms ease';
		tB.style.visibility = 'visible';
		tW.style.left = '0%';
	} else if (an == 2) {
		tW.offsetWidth = tW.offsetWidth;
		tW.style[p7SOP.prf + 'transition'] = 'opacity ' + dur + 'ms ease';
		tB.style.visibility = 'visible';
		tW.style.opacity = 100;
	} else if (an == 3) {
		tW.style[p7SOP.prf + 'transform'] = 'scale(0.01)';
		tW.style.opacity = 0;
		tW.style.left = '0px';
		tW.offsetWidth = tW.offsetWidth;
		tW.style[p7SOP.prf + 'transition'] = p7SOP.prf + 'transform ' + dur + 'ms ease-out';
		tW.style[p7SOP.prf + 'transition-property'] = p7SOP.prf + 'transform,opacity';
		if (tB.p7opt[1] == 1) {
			tW.style[p7SOP.prf + 'transform-origin'] = 'right center';
		} else {
			tW.style[p7SOP.prf + 'transform-origin'] = 'left center';
		}
		tB.style.visibility = 'visible';
		tW.style[p7SOP.prf + 'transform'] = 'scale(1)';
		tW.style.opacity = 1;
	} else {
		tB.sopWrapper.style.left = '0%';
		tB.style.visibility = 'visible';
	}
}

function P7_SOPclose(tB){
	var an, tp, dur, tW;
	if (!tB || tB.sopState == 'closed' || !tB.sopWrapper) {
		return;
	}
	if (tB.sopAnimC) {
		clearTimeout(tB.sopAnimC);
	}
	tB.sopState = 'closed';
	P7_SOPremClass(tB, 'open');
	tB.sopTrig.sopState = 'closed';
	P7_SOPremClass(tB.sopTrig, 'open');
	P7_SOPcheckSTT();
	an = tB.p7opt[5];
	dur = tB.p7opt[6];
	if (tB.sopFrames) {
		P7_SOPframes(tB, 'off');
	}
	if (tB.p7opt[1] == 1) {
		tp = '100%';
	} else {
		tp = '-100%';
	}
	tW = tB.sopWrapper;
	if (an == 1) {
		tW.style.left = tp;
		tB.sopAnimC = setTimeout(function(){
			P7_SOPfinClose(tB);
		}, dur);
	} else if (an == 2) {
		tW.style.opacity = 0;
		tB.sopAnimC = setTimeout(function(){
			P7_SOPfinClose(tB);
		}, dur);
	} else if (an == 3) {
		tW.style[p7SOP.prf + 'transform'] = 'scale(0.01)';
		tW.style.opacity = 0;
		tB.sopAnimC = setTimeout(function(){
			P7_SOPfinClose(tB);
		}, dur);
	} else {
		tB.sopWrapper.style.left = tp;
		P7_SOPfinClose(tB);
	}
	P7_SOPclearActive();
}

function P7_SOPfinClose(tB){
	if (tB.sopState != 'open') {
		if (tB.p7opt[1] == 1) {
			tB.style.right = '-100%';
		} else {
			tB.style.left = '-100%';
		}
		if (tB.p7opt[5] > 0) {
			tB.sopWrapper.style[p7SOP.prf + 'transition'] = null;
		}
		tB.style.visibility = 'hidden';
	}
}

function P7_SOPcloseAll(el){
	var i, tB;
	for (i = 0; i < p7SOP.ctl.length; i++) {
		tB = p7SOP.ctl[i];
		if (tB.sopState == 'open' && tB != el) {
			P7_SOPclose(tB);
		}
	}
}

function P7_SOPclearActive(){
	var i, tB, m = false;
	for (i = 0; i < p7SOP.ctl.length; i++) {
		tB = p7SOP.ctl[i];
		if (tB.sopState == 'open' && tB.p7opt[12] == 1) {
			m = true;
		}
	}
	if (!m) {
		P7_SOPremClass(document.body, 'sop-active');
	}
}

function P7_SOPrsz(){
	P7_SOPcheckSTT();
}

function P7_SOPcheckSTT(){
	var i, tB, tA, st = 0;
	for (i = 0; i < p7SOP.ctl.length; i++) {
		tB = p7SOP.ctl[i];
		if (tB.p7opt[14] == 1) {
			st = tB.sopWrapper.scrollTop;
			tA = tB.sopSTT;
			if (tA) {
				if (tB.sopState == 'open') {
					if (st > 50) {
						P7_SOPsetClass(tA.parentNode, 'stt-on');
						tA.parentNode.style.top = '100px';
					} else {
						P7_SOPremClass(tA.parentNode, 'stt-on');
					}
				} else {
					P7_SOPremClass(tA.parentNode, 'stt-on');
					tA.parentNode.style.top = '-900px';
				}
			}
		}
	}
}

function P7_SOPstt(el){
	var st, dy, tW;
	tW = el.sopWrapper;
	st = tW.scrollTop;
	if (st === 0) {
		return false;
	}
	P7_SOPscrollAnim(tW, st, 0, p7SOP.defDuration, 'cubic');
	return false;
}

function P7_SOPanim(tp, t, b, c, d){
	if (tp == 'quad') {
		return -c * (t /= d) * (t - 2) + b;
	} else if (tp == 'cubic') {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	} else {
		return (c * (t / d)) + b;
	}
}

function P7_SOPgetTime(st){
	var d = new Date();
	return d.getTime() - st;
}

function P7_SOPscrollAnim(ob, fv, tv, dur, typ, cb){
	if (ob.p7AnimRunning) {
		ob.p7AnimRunning = false;
		clearInterval(ob.p7SOPanim);
	}
	typ = (!typ) ? 'quad' : typ;
	ob.p7animType = typ;
	ob.p7animStartVal = fv;
	ob.p7animCurrentVal = ob.p7animStartVal;
	ob.p7animFinishVal = tv;
	ob.p7animStartTime = P7_SOPgetTime(0);
	ob.p7animDuration = dur;
	if (!ob.p7AnimRunning) {
		ob.p7AnimRunning = true;
		ob.p7SOPanim = setInterval(function(){
			P7_SOPscrollAnimator(ob, cb);
		}, p7SOP.animDelay);
	}
}

function P7_SOPscrollAnimator(el, cb, op){
	var i, tB, tA, tS, et, nv, m = false;
	et = P7_SOPgetTime(el.p7animStartTime);
	if (et >= el.p7animDuration) {
		et = el.p7animDuration;
		m = true;
	}
	if (el.p7animCurrentVal != el.p7animFinishVal) {
		nv = P7_SOPanim(el.p7animType, et, el.p7animStartVal, el.p7animFinishVal - el.p7animStartVal, el.p7animDuration);
		el.p7animCurrentVal = nv;
		el.scrollTop = nv;
	}
	if (m) {
		el.p7AnimRunning = false;
		clearInterval(el.p7SOPanim);
		P7_SOPcheckSTT();
		if (cb && typeof(cb) === "function") {
			cb.call(el);
		}
	}
}

function P7_SOPurl(a){
	var i, h, s, x, k, d = 'sop', pn, tB, n = a.p7opt[0].replace('p7SOP_', '');
	h = document.location.search;
	if (h) {
		h = h.replace('?', '');
		s = h.split(/[=&]/g);
		if (s && s.length) {
			for (i = 0; i < s.length; i += 2) {
				if (s[i] == d) {
					x = s[i + 1];
					if (n == x) {
						P7_SOPopen(a);
					}
				}
			}
		}
	}
	h = document.location.hash;
	if (h) {
		if (h.indexOf('sop_') == 1) {
			s = h.replace('#sop_', '');
			if (s == n) {
				P7_SOPopen(a);
			}
		}
	}
}

function P7_SOPframes(el, ac){
	var i, tD;
	if (el && el.sopFrames && el.sopFrames.length) {
		for (i = 0; i < el.sopFrames.length; i++) {
			if (ac == 'on') {
				el.sopFrames[i].src = el.sopFrames[i].sopSrc;
			} else {
				el.sopFrames[i].src = '';
			}
		}
	}
}

function P7_SOPgetIEver(){
	var j, k, v = -1, nv;
	nv = navigator.userAgent.toLowerCase();
	j = nv.indexOf("msie");
	if (j > -1) {
		v = parseFloat(nv.substring(j + 4, j + 8));
		if (document.documentMode) {
			v = document.documentMode;
		}
		p7SOP.ie = v;
	}
	j = nv.indexOf('trident/');
	if (j > 0) {
		k = nv.indexOf('rv:');
		v = parseInt(nv.substring(k + 3, nv.indexOf('.', k)), 10);
		p7SOP.ie = v;
	}
	return v;
}

function P7_SOPsetClass(ob, cl){
	if (ob) {
		var cc, nc, r = /\s+/g;
		cc = ob.className;
		nc = cl;
		if (cc && cc.length > 0) {
			if (cc.indexOf(cl) == -1) {
				nc = cc + ' ' + cl;
			} else {
				nc = cc;
			}
		}
		nc = nc.replace(r, ' ');
		ob.className = nc;
	}
}

function P7_SOPremClass(ob, cl){
	if (ob) {
		var cc, nc;
		cc = ob.className;
		cl = cl.replace('-', '\-');
		var re = new RegExp('\\b' + cl + '\\b');
		if (re.test(cc)) {
			nc = cc.replace(re, '');
			nc = nc.replace(/\s+/g, ' ');
			nc = nc.replace(/\s$/, '');
			nc = nc.replace(/^\s/, '');
			ob.className = nc;
		}
	}
}

function P7_SOPgetByClass(el, cls, tg){
	var i, cl, aT, rS = [];
	if (typeof(el.getElementsByClassName) != 'function') {
		aT = el.getElementsByTagName(tg);
		for (i = 0; i < aT.length; i++) {
			cl = aT[i].className;
			if (cl && cl.indexOf(cls) > -1) {
				rS[rS.length] = aT[i];
			}
		}
	} else {
		rS = el.getElementsByClassName(cls);
	}
	return rS;
}

function P7_SOPgetByAttribute(att, cls){
	var i, nL = [], aT, rS = [], cl;
	if (document.querySelectorAll) {
		nL = document.querySelectorAll('*[' + att + ']');
	} else {
		if (typeof(document.getElementsByClassName) != 'function') {
			aT = document.getElementsByTagName('A');
			for (i = 0; i < aT.length; i++) {
				cl = aT[i].className;
				if (cl && cl.indexOf(cls) > -1) {
					rS[rS.length] = aT[i];
				}
			}
		} else {
			rS = document.getElementsByClassName(cls);
		}
		for (i = 0; i < rS.length; i++) {
			if (rS[i].getAttribute(att)) {
				nL[nL.length] = rS[i];
			}
		}
	}
	return nL;
}

function P7_SOPgetCSSPre(){
	var i, dV, pre = ['animationDuration', 'WebkitAnimationDuration'];
	var c = 'none', cssPre = ['', '-webkit-'];
	dV = document.createElement('div');
	for (i = 0; i < pre.length; i++) {
		if (dV.style[pre[i]] !== undefined) {
			c = cssPre[i];
			break;
		}
	}
	return c;
}

function P7_SOPsupports(st){
	return document.createElement('div').style[st];
}

function P7_SOPaddEvent(obj, evt, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}
