var cd=Object.defineProperty;var hd=(r,t,e)=>t in r?cd(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var lt=(r,t,e)=>hd(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wl="170",ud=0,sc=1,dd=2,Hh=1,Gh=2,zn=3,Rn=0,Ze=1,ke=2,Wn=0,ls=1,rc=2,oc=3,ac=4,fd=5,Mi=100,pd=101,md=102,gd=103,vd=104,xd=200,_d=201,yd=202,Md=203,Ra=204,Ca=205,bd=206,Sd=207,wd=208,Ed=209,Td=210,Ad=211,Rd=212,Cd=213,Pd=214,Pa=0,Ia=1,La=2,ps=3,Da=4,Ua=5,Na=6,Fa=7,yo=0,Id=1,Ld=2,li=0,Dd=1,Ud=2,Nd=3,Fd=4,Od=5,Bd=6,zd=7,lc="attached",kd="detached",Wh=300,ms=301,gs=302,lo=303,Oa=304,Mo=306,ir=1e3,kn=1001,Ba=1002,qe=1003,Vd=1004,_r=1005,Tn=1006,Lo=1007,wi=1008,$n=1009,Xh=1010,$h=1011,sr=1012,El=1013,Ti=1014,yn=1015,fr=1016,Tl=1017,Al=1018,vs=1020,qh=35902,Yh=1021,jh=1022,cn=1023,Zh=1024,Kh=1025,cs=1026,xs=1027,Rl=1028,Cl=1029,Jh=1030,Pl=1031,Il=1033,eo=33776,no=33777,io=33778,so=33779,za=35840,ka=35841,Va=35842,Ha=35843,Ga=36196,Wa=37492,Xa=37496,$a=37808,qa=37809,Ya=37810,ja=37811,Za=37812,Ka=37813,Ja=37814,Qa=37815,tl=37816,el=37817,nl=37818,il=37819,sl=37820,rl=37821,ro=36492,ol=36494,al=36495,Qh=36283,ll=36284,cl=36285,hl=36286,Hd=2200,tu=2201,Gd=2202,co=2300,ul=2301,Do=2302,es=2400,ns=2401,ho=2402,Ll=2500,Wd=2501,Xd=3200,$d=3201,bo=0,qd=1,ai="",pe="srgb",Es="srgb-linear",So="linear",ce="srgb",Di=7680,cc=519,Yd=512,jd=513,Zd=514,eu=515,Kd=516,Jd=517,Qd=518,tf=519,dl=35044,ef=35048,hc="300 es",Vn=2e3,uo=2001;class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let uc=1234567;const js=Math.PI/180,_s=180/Math.PI;function hn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[r&255]+Be[r>>8&255]+Be[r>>16&255]+Be[r>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Ue(r,t,e){return Math.max(t,Math.min(e,r))}function Dl(r,t){return(r%t+t)%t}function nf(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function sf(r,t,e){return r!==t?(e-r)/(t-r):0}function Zs(r,t,e){return(1-e)*r+e*t}function rf(r,t,e,n){return Zs(r,t,1-Math.exp(-e*n))}function of(r,t=1){return t-Math.abs(Dl(r,t*2)-t)}function af(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function lf(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function cf(r,t){return r+Math.floor(Math.random()*(t-r+1))}function hf(r,t){return r+Math.random()*(t-r)}function uf(r){return r*(.5-Math.random())}function df(r){r!==void 0&&(uc=r);let t=uc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ff(r){return r*js}function pf(r){return r*_s}function mf(r){return(r&r-1)===0&&r!==0}function gf(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function vf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function xf(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function _n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function le(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Se={DEG2RAD:js,RAD2DEG:_s,generateUUID:hn,clamp:Ue,euclideanModulo:Dl,mapLinear:nf,inverseLerp:sf,lerp:Zs,damp:rf,pingpong:of,smoothstep:af,smootherstep:lf,randInt:cf,randFloat:hf,randFloatSpread:uf,seededRandom:df,degToRad:ff,radToDeg:pf,isPowerOfTwo:mf,ceilPowerOfTwo:gf,floorPowerOfTwo:vf,setQuaternionFromProperEuler:xf,normalize:le,denormalize:_n};class Q{constructor(t=0,e=0){Q.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,s,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],y=i[1],_=i[4],x=i[7],C=i[2],T=i[5],E=i[8];return s[0]=o*v+a*y+l*C,s[3]=o*m+a*_+l*T,s[6]=o*p+a*x+l*E,s[1]=c*v+h*y+u*C,s[4]=c*m+h*_+u*T,s[7]=c*p+h*x+u*E,s[2]=d*v+f*y+g*C,s[5]=d*m+f*_+g*T,s[8]=d*p+f*x+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*s-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Uo.makeScale(t,e)),this}rotate(t){return this.premultiply(Uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new Gt;function nu(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function rr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _f(){const r=rr("canvas");return r.style.display="block",r}const dc={};function Xs(r){r in dc||(dc[r]=!0,console.warn(r))}function yf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Mf(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function bf(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(r.r=Xn(r.r),r.g=Xn(r.g),r.b=Xn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(r.r=hs(r.r),r.g=hs(r.g),r.b=hs(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?So:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Xn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function hs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const fc=[.64,.33,.3,.6,.15,.06],pc=[.2126,.7152,.0722],mc=[.3127,.329],gc=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vc=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Es]:{primaries:fc,whitePoint:mc,transfer:So,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:pc,workingColorSpaceConfig:{unpackColorSpace:pe},outputColorSpaceConfig:{drawingBufferColorSpace:pe}},[pe]:{primaries:fc,whitePoint:mc,transfer:ce,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:pc,outputColorSpaceConfig:{drawingBufferColorSpace:pe}}});let Ui;class Sf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ui===void 0&&(Ui=rr("canvas")),Ui.width=t.width,Ui.height=t.height;const n=Ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=rr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Xn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xn(e[n]/255)*255):e[n]=Xn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let wf=0;class iu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=hn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(No(i[o].image)):s.push(No(i[o]))}else s=No(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function No(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Sf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ef=0;class Ce extends Ii{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,n=kn,i=kn,s=Tn,o=wi,a=cn,l=$n,c=Ce.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=hn(),this.name="",this.source=new iu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ir:t.x=t.x-Math.floor(t.x);break;case kn:t.x=t.x<0?0:1;break;case Ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ir:t.y=t.y-Math.floor(t.y);break;case kn:t.y=t.y<0?0:1;break;case Ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=Wh;Ce.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,i=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,x=(f+1)/2,C=(p+1)/2,T=(h+d)/4,E=(u+v)/4,I=(g+m)/4;return _>x&&_>C?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=T/n,s=E/n):x>C?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=T/i,s=I/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=E/s,i=I/s),this.set(n,i,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tf extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ce(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new iu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Tf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class su extends Ce{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=qe,this.minFilter=qe,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Af extends Ce{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=qe,this.minFilter=qe,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class De{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],g=s[o+2],v=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const C=Math.sqrt(_),T=Math.atan2(C,p*y);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const x=a*y;if(l=l*m+d*x,c=c*m+f*x,h=h*m+g*x,u=u*m+v*x,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fo.copy(this).projectOnVector(t),this.sub(Fo)}reflect(t){return this.sub(Fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fo=new R,xc=new De;class un{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,pn):pn.fromBufferAttribute(s,o),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yr.copy(n.boundingBox)),yr.applyMatrix4(t.matrixWorld),this.union(yr)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),Mr.subVectors(this.max,Is),Ni.subVectors(t.a,Is),Fi.subVectors(t.b,Is),Oi.subVectors(t.c,Is),Jn.subVectors(Fi,Ni),Qn.subVectors(Oi,Fi),fi.subVectors(Ni,Oi);let e=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-fi.z,fi.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,fi.z,0,-fi.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-fi.y,fi.x,0];return!Oo(e,Ni,Fi,Oi,Mr)||(e=[1,0,0,0,1,0,0,0,1],!Oo(e,Ni,Fi,Oi,Mr))?!1:(br.crossVectors(Jn,Qn),e=[br.x,br.y,br.z],Oo(e,Ni,Fi,Oi,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ln=[new R,new R,new R,new R,new R,new R,new R,new R],pn=new R,yr=new un,Ni=new R,Fi=new R,Oi=new R,Jn=new R,Qn=new R,fi=new R,Is=new R,Mr=new R,br=new R,pi=new R;function Oo(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){pi.fromArray(r,s);const a=i.x*Math.abs(pi.x)+i.y*Math.abs(pi.y)+i.z*Math.abs(pi.z),l=t.dot(pi),c=e.dot(pi),h=n.dot(pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Rf=new un,Ls=new R,Bo=new R;class ui{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Rf.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ls.subVectors(t,this.center);const e=Ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ls,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ls.copy(t.center).add(Bo)),this.expandByPoint(Ls.copy(t.center).sub(Bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Dn=new R,zo=new R,Sr=new R,ti=new R,ko=new R,wr=new R,Vo=new R;class wo{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zo.copy(t).add(e).multiplyScalar(.5),Sr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(zo);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Sr),a=ti.dot(this.direction),l=-ti.dot(Sr),c=ti.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(zo).addScaledVector(Sr,d),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);const n=Dn.dot(this.direction),i=Dn.dot(Dn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,i,s){ko.subVectors(e,t),wr.subVectors(n,t),Vo.crossVectors(ko,wr);let o=this.direction.dot(Vo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const l=a*this.direction.dot(wr.crossVectors(ti,wr));if(l<0)return null;const c=a*this.direction.dot(ko.cross(ti));if(c<0||l+c>o)return null;const h=-a*ti.dot(Vo);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Tt{constructor(t,e,n,i,s,o,a,l,c,h,u,d,f,g,v,m){Tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,f,g,v,m)}set(t,e,n,i,s,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Bi.setFromMatrixColumn(t,0).length(),s=1/Bi.setFromMatrixColumn(t,1).length(),o=1/Bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cf,t,Pf)}lookAt(t,e,n){const i=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),ei.crossVectors(n,Qe),ei.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),ei.crossVectors(n,Qe)),ei.normalize(),Er.crossVectors(Qe,ei),i[0]=ei.x,i[4]=Er.x,i[8]=Qe.x,i[1]=ei.y,i[5]=Er.y,i[9]=Qe.y,i[2]=ei.z,i[6]=Er.z,i[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],_=n[7],x=n[11],C=n[15],T=i[0],E=i[4],I=i[8],S=i[12],M=i[1],P=i[5],B=i[9],O=i[13],X=i[2],Y=i[6],V=i[10],K=i[14],G=i[3],rt=i[7],ft=i[11],yt=i[15];return s[0]=o*T+a*M+l*X+c*G,s[4]=o*E+a*P+l*Y+c*rt,s[8]=o*I+a*B+l*V+c*ft,s[12]=o*S+a*O+l*K+c*yt,s[1]=h*T+u*M+d*X+f*G,s[5]=h*E+u*P+d*Y+f*rt,s[9]=h*I+u*B+d*V+f*ft,s[13]=h*S+u*O+d*K+f*yt,s[2]=g*T+v*M+m*X+p*G,s[6]=g*E+v*P+m*Y+p*rt,s[10]=g*I+v*B+m*V+p*ft,s[14]=g*S+v*O+m*K+p*yt,s[3]=y*T+_*M+x*X+C*G,s[7]=y*E+_*P+x*Y+C*rt,s[11]=y*I+_*B+x*V+C*ft,s[15]=y*S+_*O+x*K+C*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+v*(+e*l*f-e*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+m*(+e*c*u-e*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],y=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,_=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,x=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,C=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,T=e*y+n*_+i*x+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=y*E,t[1]=(v*d*s-u*m*s-v*i*f+n*m*f+u*i*p-n*d*p)*E,t[2]=(a*m*s-v*l*s+v*i*c-n*m*c-a*i*p+n*l*p)*E,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*E,t[4]=_*E,t[5]=(h*m*s-g*d*s+g*i*f-e*m*f-h*i*p+e*d*p)*E,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*p-e*l*p)*E,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*f+e*l*f)*E,t[8]=x*E,t[9]=(g*u*s-h*v*s-g*n*f+e*v*f+h*n*p-e*u*p)*E,t[10]=(o*v*s-g*a*s+g*n*c-e*v*c-o*n*p+e*a*p)*E,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=C*E,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*E,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*m-e*a*m)*E,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,v=o*h,m=o*u,p=a*u,y=l*c,_=l*h,x=l*u,C=n.x,T=n.y,E=n.z;return i[0]=(1-(v+p))*C,i[1]=(f+x)*C,i[2]=(g-_)*C,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(d+p))*T,i[6]=(m+y)*T,i[7]=0,i[8]=(g+_)*E,i[9]=(m-y)*E,i[10]=(1-(d+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Bi.set(i[0],i[1],i[2]).length();const o=Bi.set(i[4],i[5],i[6]).length(),a=Bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],mn.copy(this);const c=1/s,h=1/o,u=1/a;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,e.setFromRotationMatrix(mn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Vn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===Vn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===uo)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Vn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,f=(n+i)*h;let g,v;if(a===Vn)g=(o+s)*u,v=-2*u;else if(a===uo)g=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Bi=new R,mn=new Tt,Cf=new R(0,0,0),Pf=new R(1,1,1),ei=new R,Er=new R,Qe=new R,_c=new Tt,yc=new De;class Re{constructor(t=0,e=0,n=0,i=Re.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _c.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_c,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yc.setFromEuler(this),this.setFromQuaternion(yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Re.DEFAULT_ORDER="XYZ";class Ul{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let If=0;const Mc=new R,zi=new De,Un=new Tt,Tr=new R,Ds=new R,Lf=new R,Df=new De,bc=new R(1,0,0),Sc=new R(0,1,0),wc=new R(0,0,1),Ec={type:"added"},Uf={type:"removed"},ki={type:"childadded",child:null},Ho={type:"childremoved",child:null};class ue extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ue.DEFAULT_UP.clone();const t=new R,e=new Re,n=new De,i=new R(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Tt},normalMatrix:{value:new Gt}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=ue.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.multiply(zi),this}rotateOnWorldAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.premultiply(zi),this}rotateX(t){return this.rotateOnAxis(bc,t)}rotateY(t){return this.rotateOnAxis(Sc,t)}rotateZ(t){return this.rotateOnAxis(wc,t)}translateOnAxis(t,e){return Mc.copy(t).applyQuaternion(this.quaternion),this.position.add(Mc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bc,t)}translateY(t){return this.translateOnAxis(Sc,t)}translateZ(t){return this.translateOnAxis(wc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Tr.copy(t):Tr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Ds,Tr,this.up):Un.lookAt(Tr,Ds,this.up),this.quaternion.setFromRotationMatrix(Un),i&&(Un.extractRotation(i.matrixWorld),zi.setFromRotationMatrix(Un),this.quaternion.premultiply(zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ec),ki.child=t,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Uf),Ho.child=t,this.dispatchEvent(Ho),Ho.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ec),ki.child=t,this.dispatchEvent(ki),ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,Lf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Df,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ue.DEFAULT_UP=new R(0,1,0);ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new R,Nn=new R,Go=new R,Fn=new R,Vi=new R,Hi=new R,Tc=new R,Wo=new R,Xo=new R,$o=new R,qo=new ee,Yo=new ee,jo=new ee;class an{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),gn.subVectors(t,e),i.cross(gn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){gn.subVectors(i,e),Nn.subVectors(n,e),Go.subVectors(t,e);const o=gn.dot(gn),a=gn.dot(Nn),l=gn.dot(Go),c=Nn.dot(Nn),h=Nn.dot(Go),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fn.x),l.addScaledVector(o,Fn.y),l.addScaledVector(a,Fn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return qo.setScalar(0),Yo.setScalar(0),jo.setScalar(0),qo.fromBufferAttribute(t,e),Yo.fromBufferAttribute(t,n),jo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(qo,s.x),o.addScaledVector(Yo,s.y),o.addScaledVector(jo,s.z),o}static isFrontFacing(t,e,n,i){return gn.subVectors(n,e),Nn.subVectors(t,e),gn.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),gn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return an.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Vi.subVectors(i,n),Hi.subVectors(s,n),Wo.subVectors(t,n);const l=Vi.dot(Wo),c=Hi.dot(Wo);if(l<=0&&c<=0)return e.copy(n);Xo.subVectors(t,i);const h=Vi.dot(Xo),u=Hi.dot(Xo);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Vi,o);$o.subVectors(t,s);const f=Vi.dot($o),g=Hi.dot($o);if(g>=0&&f<=g)return e.copy(s);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Hi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Tc.subVectors(s,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(Tc,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Vi,o).addScaledVector(Hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Zo(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=Dl(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Zo(o,s,t+1/3),this.g=Zo(o,s,t),this.b=Zo(o,s,t-1/3)}return qt.toWorkingColorSpace(this,i),this}setStyle(t,e=pe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pe){const n=ru[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xn(t.r),this.g=Xn(t.g),this.b=Xn(t.b),this}copyLinearToSRGB(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pe){return qt.fromWorkingColorSpace(ze.copy(this),t),Math.round(Ue(ze.r*255,0,255))*65536+Math.round(Ue(ze.g*255,0,255))*256+Math.round(Ue(ze.b*255,0,255))}getHexString(t=pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(ze.copy(this),e);const n=ze.r,i=ze.g,s=ze.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=pe){qt.fromWorkingColorSpace(ze.copy(this),t);const e=ze.r,n=ze.g,i=ze.b;return t!==pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(Ar);const n=Zs(ni.h,Ar.h,e),i=Zs(ni.s,Ar.s,e),s=Zs(ni.l,Ar.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new wt;wt.NAMES=ru;let Nf=0;class jn extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=hn(),this.name="",this.blending=ls,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ra,this.blendDst=Ca,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ra&&(n.blendSrc=this.blendSrc),this.blendDst!==Ca&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xe extends jn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new R,Rr=new Q;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dl,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rr.fromBufferAttribute(this,e),Rr.applyMatrix3(t),this.setXY(e,Rr.x,Rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_n(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_n(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_n(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_n(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dl&&(t.usage=this.usage),t}}class Nl extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ou extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ht extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ff=0;const sn=new Tt,Ko=new ue,Gi=new R,tn=new un,Us=new un,Le=new R;class _e extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nu(t)?ou:Nl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Gt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return Ko.lookAt(t),Ko.updateMatrix(),this.applyMatrix4(Ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(tn.min,Us.min),tn.expandByPoint(Le),Le.addVectors(tn.max,Us.max),tn.expandByPoint(Le)):(tn.expandByPoint(Us.min),tn.expandByPoint(Us.max))}tn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Le.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Le));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Le.fromBufferAttribute(a,c),l&&(Gi.fromBufferAttribute(t,c),Le.add(Gi)),i=Math.max(i,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new R,l[I]=new R;const c=new R,h=new R,u=new R,d=new Q,f=new Q,g=new Q,v=new R,m=new R;function p(I,S,M){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,I),f.fromBufferAttribute(s,S),g.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[I].add(v),a[S].add(v),a[M].add(v),l[I].add(m),l[S].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let I=0,S=y.length;I<S;++I){const M=y[I],P=M.start,B=M.count;for(let O=P,X=P+B;O<X;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const _=new R,x=new R,C=new R,T=new R;function E(I){C.fromBufferAttribute(i,I),T.copy(C);const S=a[I];_.copy(S),_.sub(C.multiplyScalar(C.dot(S))).normalize(),x.crossVectors(T,S);const P=x.dot(l[I])<0?-1:1;o.setXYZW(I,_.x,_.y,_.z,P)}for(let I=0,S=y.length;I<S;++I){const M=y[I],P=M.start,B=M.count;for(let O=P,X=P+B;O<X;O+=3)E(t.getX(O+0)),E(t.getX(O+1)),E(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Ke(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ac=new Tt,mi=new wo,Cr=new ui,Rc=new R,Pr=new R,Ir=new R,Lr=new R,Jo=new R,Dr=new R,Cc=new R,Ur=new R;class $t extends ue{constructor(t=new _e,e=new Xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Jo.fromBufferAttribute(u,t),o?Dr.addScaledVector(Jo,h):Dr.addScaledVector(Jo.sub(e),h))}e.add(Dr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),mi.copy(t.ray).recast(t.near),!(Cr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(Cr,Rc)===null||mi.origin.distanceToSquared(Rc)>(t.far-t.near)**2))&&(Ac.copy(s).invert(),mi.copy(t.ray).applyMatrix4(Ac),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,C=_;x<C;x+=3){const T=a.getX(x),E=a.getX(x+1),I=a.getX(x+2);i=Nr(this,p,t,n,c,h,u,T,E,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);i=Nr(this,o,t,n,c,h,u,y,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=y,C=_;x<C;x+=3){const T=x,E=x+1,I=x+2;i=Nr(this,p,t,n,c,h,u,T,E,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,_=m+1,x=m+2;i=Nr(this,o,t,n,c,h,u,y,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Of(r,t,e,n,i,s,o,a){let l;if(t.side===Ze?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Rn,a),l===null)return null;Ur.copy(a),Ur.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ur);return c<e.near||c>e.far?null:{distance:c,point:Ur.clone(),object:r}}function Nr(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Pr),r.getVertexPosition(l,Ir),r.getVertexPosition(c,Lr);const h=Of(r,t,e,n,Pr,Ir,Lr,Cc);if(h){const u=new R;an.getBarycoord(Cc,Pr,Ir,Lr,u),i&&(h.uv=an.getInterpolatedAttribute(i,a,l,c,u,new Q)),s&&(h.uv1=an.getInterpolatedAttribute(s,a,l,c,u,new Q)),o&&(h.normal=an.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new R,materialIndex:0};an.getNormal(Pr,Ir,Lr,d.normal),h.face=d,h.barycoord=u}return h}class qn extends _e{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(u,2));function g(v,m,p,y,_,x,C,T,E,I,S){const M=x/E,P=C/I,B=x/2,O=C/2,X=T/2,Y=E+1,V=I+1;let K=0,G=0;const rt=new R;for(let ft=0;ft<V;ft++){const yt=ft*P-O;for(let Bt=0;Bt<Y;Bt++){const Jt=Bt*M-B;rt[v]=Jt*y,rt[m]=yt*_,rt[p]=X,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[m]=0,rt[p]=T>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Bt/E),u.push(1-ft/I),K+=1}}for(let ft=0;ft<I;ft++)for(let yt=0;yt<E;yt++){const Bt=d+yt+Y*ft,Jt=d+yt+Y*(ft+1),$=d+(yt+1)+Y*(ft+1),nt=d+(yt+1)+Y*ft;l.push(Bt,Jt,nt),l.push(Jt,$,nt),G+=6}a.addGroup(f,G,S),f+=G,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ys(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ge(r){const t={};for(let e=0;e<r.length;e++){const n=ys(r[e]);for(const i in n)t[i]=n[i]}return t}function Bf(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function au(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const zf={clone:ys,merge:Ge};var kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends jn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kf,this.fragmentShader=Vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=Bf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class lu extends ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new R,Pc=new Q,Ic=new Q;class $e extends lu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_s*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,Pc,Ic),e.subVectors(Ic,Pc)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(js*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Wi=-90,Xi=1;class Hf extends ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $e(Wi,Xi,t,e);i.layers=this.layers,this.add(i);const s=new $e(Wi,Xi,t,e);s.layers=this.layers,this.add(s);const o=new $e(Wi,Xi,t,e);o.layers=this.layers,this.add(o);const a=new $e(Wi,Xi,t,e);a.layers=this.layers,this.add(a);const l=new $e(Wi,Xi,t,e);l.layers=this.layers,this.add(l);const c=new $e(Wi,Xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===uo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cu extends Ce{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ms,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gf extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new cu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new qn(5,5,5),s=new Yn({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:Wn});s.uniforms.tEquirect.value=e;const o=new $t(i,s),a=e.minFilter;return e.minFilter===wi&&(e.minFilter=Tn),new Hf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Qo=new R,Wf=new R,Xf=new Gt;class _i{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Qo.subVectors(n,e).cross(Wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Qo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xf.getNormalMatrix(t),i=this.coplanarPoint(Qo).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new ui,Fr=new R;class Fl{constructor(t=new _i,e=new _i,n=new _i,i=new _i,s=new _i,o=new _i){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],y=i[13],_=i[14],x=i[15];if(n[0].setComponents(l-s,d-c,m-f,x-p).normalize(),n[1].setComponents(l+s,d+c,m+f,x+p).normalize(),n[2].setComponents(l+o,d+h,m+g,x+y).normalize(),n[3].setComponents(l-o,d-h,m-g,x-y).normalize(),n[4].setComponents(l-a,d-u,m-v,x-_).normalize(),e===Vn)n[5].setComponents(l+a,d+u,m+v,x+_).normalize();else if(e===uo)n[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Fr.x=i.normal.x>0?t.max.x:t.min.x,Fr.y=i.normal.y>0?t.max.y:t.min.y,Fr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hu(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function $f(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];r.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class An extends _e{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let _=0;_<c;_++){const x=_*u-s;g.push(x,-y,0),v.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const _=y+c*p,x=y+c*(p+1),C=y+1+c*(p+1),T=y+1+c*p;f.push(_,x,T),f.push(x,C,T)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(v,3)),this.setAttribute("uv",new Ht(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.width,t.height,t.widthSegments,t.heightSegments)}}var qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ep=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,op=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ap=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_p=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$p=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,om=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_m=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ym=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,km=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Km=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,t0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,e0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,u0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,f0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,p0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,v0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,w0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,E0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:qf,alphahash_pars_fragment:Yf,alphamap_fragment:jf,alphamap_pars_fragment:Zf,alphatest_fragment:Kf,alphatest_pars_fragment:Jf,aomap_fragment:Qf,aomap_pars_fragment:tp,batching_pars_vertex:ep,batching_vertex:np,begin_vertex:ip,beginnormal_vertex:sp,bsdfs:rp,iridescence_fragment:op,bumpmap_pars_fragment:ap,clipping_planes_fragment:lp,clipping_planes_pars_fragment:cp,clipping_planes_pars_vertex:hp,clipping_planes_vertex:up,color_fragment:dp,color_pars_fragment:fp,color_pars_vertex:pp,color_vertex:mp,common:gp,cube_uv_reflection_fragment:vp,defaultnormal_vertex:xp,displacementmap_pars_vertex:_p,displacementmap_vertex:yp,emissivemap_fragment:Mp,emissivemap_pars_fragment:bp,colorspace_fragment:Sp,colorspace_pars_fragment:wp,envmap_fragment:Ep,envmap_common_pars_fragment:Tp,envmap_pars_fragment:Ap,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:zp,envmap_vertex:Cp,fog_vertex:Pp,fog_pars_vertex:Ip,fog_fragment:Lp,fog_pars_fragment:Dp,gradientmap_pars_fragment:Up,lightmap_pars_fragment:Np,lights_lambert_fragment:Fp,lights_lambert_pars_fragment:Op,lights_pars_begin:Bp,lights_toon_fragment:kp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Hp,lights_phong_pars_fragment:Gp,lights_physical_fragment:Wp,lights_physical_pars_fragment:Xp,lights_fragment_begin:$p,lights_fragment_maps:qp,lights_fragment_end:Yp,logdepthbuf_fragment:jp,logdepthbuf_pars_fragment:Zp,logdepthbuf_pars_vertex:Kp,logdepthbuf_vertex:Jp,map_fragment:Qp,map_pars_fragment:tm,map_particle_fragment:em,map_particle_pars_fragment:nm,metalnessmap_fragment:im,metalnessmap_pars_fragment:sm,morphinstance_vertex:rm,morphcolor_vertex:om,morphnormal_vertex:am,morphtarget_pars_vertex:lm,morphtarget_vertex:cm,normal_fragment_begin:hm,normal_fragment_maps:um,normal_pars_fragment:dm,normal_pars_vertex:fm,normal_vertex:pm,normalmap_pars_fragment:mm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:vm,clearcoat_pars_fragment:xm,iridescence_pars_fragment:_m,opaque_fragment:ym,packing:Mm,premultiplied_alpha_fragment:bm,project_vertex:Sm,dithering_fragment:wm,dithering_pars_fragment:Em,roughnessmap_fragment:Tm,roughnessmap_pars_fragment:Am,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Cm,shadowmap_vertex:Pm,shadowmask_pars_fragment:Im,skinbase_vertex:Lm,skinning_pars_vertex:Dm,skinning_vertex:Um,skinnormal_vertex:Nm,specularmap_fragment:Fm,specularmap_pars_fragment:Om,tonemapping_fragment:Bm,tonemapping_pars_fragment:zm,transmission_fragment:km,transmission_pars_fragment:Vm,uv_pars_fragment:Hm,uv_pars_vertex:Gm,uv_vertex:Wm,worldpos_vertex:Xm,background_vert:$m,background_frag:qm,backgroundCube_vert:Ym,backgroundCube_frag:jm,cube_vert:Zm,cube_frag:Km,depth_vert:Jm,depth_frag:Qm,distanceRGBA_vert:t0,distanceRGBA_frag:e0,equirect_vert:n0,equirect_frag:i0,linedashed_vert:s0,linedashed_frag:r0,meshbasic_vert:o0,meshbasic_frag:a0,meshlambert_vert:l0,meshlambert_frag:c0,meshmatcap_vert:h0,meshmatcap_frag:u0,meshnormal_vert:d0,meshnormal_frag:f0,meshphong_vert:p0,meshphong_frag:m0,meshphysical_vert:g0,meshphysical_frag:v0,meshtoon_vert:x0,meshtoon_frag:_0,points_vert:y0,points_frag:M0,shadow_vert:b0,shadow_frag:S0,sprite_vert:w0,sprite_frag:E0},ht={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Sn={basic:{uniforms:Ge([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Ge([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new wt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Ge([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Ge([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Ge([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new wt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Ge([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Ge([ht.points,ht.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Ge([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Ge([ht.common,ht.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Ge([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Ge([ht.sprite,ht.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Ge([ht.common,ht.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Ge([ht.lights,ht.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Sn.physical={uniforms:Ge([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Or={r:0,b:0,g:0},vi=new Re,T0=new Tt;function A0(r,t,e,n,i,s,o){const a=new wt(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function v(y){let _=!1;const x=g(y);x===null?p(a,l):x&&x.isColor&&(p(x,1),_=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,_){const x=g(_);x&&(x.isCubeTexture||x.mapping===Mo)?(h===void 0&&(h=new $t(new qn(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:ys(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),vi.copy(_.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(T0.makeRotationFromEuler(vi)),h.material.toneMapped=qt.getTransfer(x.colorSpace)!==ce,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new $t(new An(2,2),new Yn({name:"BackgroundMaterial",uniforms:ys(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=qt.getTransfer(x.colorSpace)!==ce,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Or,au(r)),n.buffers.color.setClear(Or.r,Or.g,Or.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:v,addToRenderList:m}}function R0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(M,P,B,O,X){let Y=!1;const V=u(O,B,P);s!==V&&(s=V,c(s.object)),Y=f(M,O,B,X),Y&&g(M,O,B,X),X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(M,P,B,O),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,P,B){const O=B.wireframe===!0;let X=n[M.id];X===void 0&&(X={},n[M.id]=X);let Y=X[P.id];Y===void 0&&(Y={},X[P.id]=Y);let V=Y[O];return V===void 0&&(V=d(l()),Y[O]=V),V}function d(M){const P=[],B=[],O=[];for(let X=0;X<e;X++)P[X]=0,B[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,P,B,O){const X=s.attributes,Y=P.attributes;let V=0;const K=B.getAttributes();for(const G in K)if(K[G].location>=0){const ft=X[G];let yt=Y[G];if(yt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(yt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(yt=M.instanceColor)),ft===void 0||ft.attribute!==yt||yt&&ft.data!==yt.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(M,P,B,O){const X={},Y=P.attributes;let V=0;const K=B.getAttributes();for(const G in K)if(K[G].location>=0){let ft=Y[G];ft===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));const yt={};yt.attribute=ft,ft&&ft.data&&(yt.data=ft.data),X[G]=yt,V++}s.attributes=X,s.attributesNum=V,s.index=O}function v(){const M=s.newAttributes;for(let P=0,B=M.length;P<B;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const B=s.newAttributes,O=s.enabledAttributes,X=s.attributeDivisors;B[M]=1,O[M]===0&&(r.enableVertexAttribArray(M),O[M]=1),X[M]!==P&&(r.vertexAttribDivisor(M,P),X[M]=P)}function y(){const M=s.newAttributes,P=s.enabledAttributes;for(let B=0,O=P.length;B<O;B++)P[B]!==M[B]&&(r.disableVertexAttribArray(B),P[B]=0)}function _(M,P,B,O,X,Y,V){V===!0?r.vertexAttribIPointer(M,P,B,X,Y):r.vertexAttribPointer(M,P,B,O,X,Y)}function x(M,P,B,O){v();const X=O.attributes,Y=B.getAttributes(),V=P.defaultAttributeValues;for(const K in Y){const G=Y[K];if(G.location>=0){let rt=X[K];if(rt===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const ft=rt.normalized,yt=rt.itemSize,Bt=t.get(rt);if(Bt===void 0)continue;const Jt=Bt.buffer,$=Bt.type,nt=Bt.bytesPerElement,Mt=$===r.INT||$===r.UNSIGNED_INT||rt.gpuType===El;if(rt.isInterleavedBufferAttribute){const ot=rt.data,Dt=ot.stride,Ot=rt.offset;if(ot.isInstancedInterleavedBuffer){for(let Ut=0;Ut<G.locationSize;Ut++)p(G.location+Ut,ot.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ut=0;Ut<G.locationSize;Ut++)m(G.location+Ut);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let Ut=0;Ut<G.locationSize;Ut++)_(G.location+Ut,yt/G.locationSize,$,ft,Dt*nt,(Ot+yt/G.locationSize*Ut)*nt,Mt)}else{if(rt.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)p(G.location+ot,rt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let ot=0;ot<G.locationSize;ot++)m(G.location+ot);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let ot=0;ot<G.locationSize;ot++)_(G.location+ot,yt/G.locationSize,$,ft,yt*nt,yt/G.locationSize*ot*nt,Mt)}}else if(V!==void 0){const ft=V[K];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(G.location,ft);break;case 3:r.vertexAttrib3fv(G.location,ft);break;case 4:r.vertexAttrib4fv(G.location,ft);break;default:r.vertexAttrib1fv(G.location,ft)}}}}y()}function C(){I();for(const M in n){const P=n[M];for(const B in P){const O=P[B];for(const X in O)h(O[X].object),delete O[X];delete P[B]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const B in P){const O=P[B];for(const X in O)h(O[X].object),delete O[X];delete P[B]}delete n[M.id]}function E(M){for(const P in n){const B=n[P];if(B[M.id]===void 0)continue;const O=B[M.id];for(const X in O)h(O[X].object),delete O[X];delete B[M.id]}}function I(){S(),o=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function C0(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function P0(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==cn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const I=E===fr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==$n&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==yn&&!I)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:C,maxSamples:T}}function I0(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new _i,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const y=s?0:n,_=y*4;let x=p.clippingState||null;l.value=x,x=h(g,d,_,f);for(let C=0;C!==_;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,x=f;_!==v;++_,x+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function L0(r){let t=new WeakMap;function e(o,a){return a===lo?o.mapping=ms:a===Oa&&(o.mapping=gs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===lo||a===Oa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Gf(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class uu extends lu{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const is=4,Lc=[.125,.215,.35,.446,.526,.582],bi=20,ta=new uu,Dc=new wt;let ea=null,na=0,ia=0,sa=!1;const yi=(1+Math.sqrt(5))/2,$i=1/yi,Uc=[new R(-yi,$i,0),new R(yi,$i,0),new R(-$i,0,yi),new R($i,0,yi),new R(0,yi,-$i),new R(0,yi,$i),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class Nc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ea,na,ia),this._renderer.xr.enabled=sa,t.scissorTest=!1,Br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ms||t.mapping===gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:fr,format:cn,colorSpace:Es,depthBuffer:!1},i=Fc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fc(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=D0(s)),this._blurMaterial=U0(s,t,e)}return i}_compileMaterial(t){const e=new $t(this._lodPlanes[0],t);this._renderer.compile(e,ta)}_sceneToCubeUV(t,e,n,i){const a=new $e(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Dc),h.toneMapping=li,h.autoClear=!1;const f=new Xe({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),g=new $t(new qn,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Dc),v=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Br(i,y*_,p>2?_:0,_,_),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ms||t.mapping===gs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Br(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ta)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Uc[(i-s-1)%Uc.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $t(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*bi-1),v=s/g,m=isFinite(s)?1+Math.floor(h*v):bi;m>bi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const p=[];let y=0;for(let E=0;E<bi;++E){const I=E/v,S=Math.exp(-I*I/2);p.push(S),E===0?y+=S:E<m&&(y+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;const x=this._sizeLods[i],C=3*x*(i>_-is?i-_+is:0),T=4*(this._cubeSize-x);Br(e,C,T,3*x,2*x),l.setRenderTarget(e),l.render(u,ta)}}function D0(r){const t=[],e=[],n=[];let i=r;const s=r-is+1+Lc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-is?l=Lc[o-r+is-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),_=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,I=T>2?0:-1,S=[E,I,0,E+2/3,I,0,E+2/3,I+1,0,E,I,0,E+2/3,I+1,0,E,I+1,0];y.set(S,v*g*T),_.set(d,m*g*T);const M=[T,T,T,T,T,T];x.set(M,p*g*T)}const C=new _e;C.setAttribute("position",new Ke(y,v)),C.setAttribute("uv",new Ke(_,m)),C.setAttribute("faceIndex",new Ke(x,p)),t.push(C),i>is&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fc(r,t,e){const n=new ci(r,t,e);return n.texture.mapping=Mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Br(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function U0(r,t,e){const n=new Float32Array(bi),i=new R(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Oc(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Bc(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function N0(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===lo||l===Oa,h=l===ms||l===gs;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Nc(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Nc(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function F0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Xs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function O0(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let _=0,x=y.length;_<x;_+=3){const C=y[_+0],T=y[_+1],E=y[_+2];d.push(C,T,T,E,E,C)}}else if(g!==void 0){const y=g.array;v=g.version;for(let _=0,x=y.length/3-1;_<x;_+=3){const C=_+0,T=_+1,E=_+2;d.push(C,T,T,E,E,C)}}else return;const m=new(nu(d)?ou:Nl)(d,1);m.version=v;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function B0(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(r.drawElementsInstanced(n,f,s,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*v[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function z0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function k0(r,t,e){const n=new WeakMap,i=new ee;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,T=1;C>t.maxTextureSize&&(T=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const E=new Float32Array(C*T*4*u),I=new su(E,C,T,u);I.type=yn,I.needsUpdate=!0;const S=x*4;for(let P=0;P<u;P++){const B=p[P],O=y[P],X=_[P],Y=C*T*4*P;for(let V=0;V<B.count;V++){const K=V*S;g===!0&&(i.fromBufferAttribute(B,V),E[Y+K+0]=i.x,E[Y+K+1]=i.y,E[Y+K+2]=i.z,E[Y+K+3]=0),v===!0&&(i.fromBufferAttribute(O,V),E[Y+K+4]=i.x,E[Y+K+5]=i.y,E[Y+K+6]=i.z,E[Y+K+7]=0),m===!0&&(i.fromBufferAttribute(X,V),E[Y+K+8]=i.x,E[Y+K+9]=i.y,E[Y+K+10]=i.z,E[Y+K+11]=X.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new Q(C,T)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",v),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function V0(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class du extends Ce{constructor(t,e,n,i,s,o,a,l,c,h=cs){if(h!==cs&&h!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===cs&&(n=Ti),n===void 0&&h===xs&&(n=vs),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const fu=new Ce,zc=new du(1,1),pu=new su,mu=new Af,gu=new cu,kc=[],Vc=[],Hc=new Float32Array(16),Gc=new Float32Array(9),Wc=new Float32Array(4);function Ts(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=kc[i];if(s===void 0&&(s=new Float32Array(i),kc[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Pe(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ie(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Eo(r,t){let e=Vc[t];e===void 0&&(e=new Int32Array(t),Vc[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function H0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function G0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;r.uniform2fv(this.addr,t),Ie(e,t)}}function W0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;r.uniform3fv(this.addr,t),Ie(e,t)}}function X0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;r.uniform4fv(this.addr,t),Ie(e,t)}}function $0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Wc.set(n),r.uniformMatrix2fv(this.addr,!1,Wc),Ie(e,n)}}function q0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Gc.set(n),r.uniformMatrix3fv(this.addr,!1,Gc),Ie(e,n)}}function Y0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Hc.set(n),r.uniformMatrix4fv(this.addr,!1,Hc),Ie(e,n)}}function j0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Z0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;r.uniform2iv(this.addr,t),Ie(e,t)}}function K0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;r.uniform3iv(this.addr,t),Ie(e,t)}}function J0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;r.uniform4iv(this.addr,t),Ie(e,t)}}function Q0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function tg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;r.uniform2uiv(this.addr,t),Ie(e,t)}}function eg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;r.uniform3uiv(this.addr,t),Ie(e,t)}}function ng(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;r.uniform4uiv(this.addr,t),Ie(e,t)}}function ig(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(zc.compareFunction=eu,s=zc):s=fu,e.setTexture2D(t||s,i)}function sg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||mu,i)}function rg(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||gu,i)}function og(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||pu,i)}function ag(r){switch(r){case 5126:return H0;case 35664:return G0;case 35665:return W0;case 35666:return X0;case 35674:return $0;case 35675:return q0;case 35676:return Y0;case 5124:case 35670:return j0;case 35667:case 35671:return Z0;case 35668:case 35672:return K0;case 35669:case 35673:return J0;case 5125:return Q0;case 36294:return tg;case 36295:return eg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return og}}function lg(r,t){r.uniform1fv(this.addr,t)}function cg(r,t){const e=Ts(t,this.size,2);r.uniform2fv(this.addr,e)}function hg(r,t){const e=Ts(t,this.size,3);r.uniform3fv(this.addr,e)}function ug(r,t){const e=Ts(t,this.size,4);r.uniform4fv(this.addr,e)}function dg(r,t){const e=Ts(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function fg(r,t){const e=Ts(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function pg(r,t){const e=Ts(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function mg(r,t){r.uniform1iv(this.addr,t)}function gg(r,t){r.uniform2iv(this.addr,t)}function vg(r,t){r.uniform3iv(this.addr,t)}function xg(r,t){r.uniform4iv(this.addr,t)}function _g(r,t){r.uniform1uiv(this.addr,t)}function yg(r,t){r.uniform2uiv(this.addr,t)}function Mg(r,t){r.uniform3uiv(this.addr,t)}function bg(r,t){r.uniform4uiv(this.addr,t)}function Sg(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Pe(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||fu,s[o])}function wg(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Pe(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||mu,s[o])}function Eg(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Pe(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||gu,s[o])}function Tg(r,t,e){const n=this.cache,i=t.length,s=Eo(e,i);Pe(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||pu,s[o])}function Ag(r){switch(r){case 5126:return lg;case 35664:return cg;case 35665:return hg;case 35666:return ug;case 35674:return dg;case 35675:return fg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return vg;case 35669:case 35673:return xg;case 5125:return _g;case 36294:return yg;case 36295:return Mg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Tg}}class Rg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ag(e.type)}}class Cg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ag(e.type)}}class Pg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Xc(r,t){r.seq.push(t),r.map[t.id]=t}function Ig(r,t,e){const n=r.name,i=n.length;for(ra.lastIndex=0;;){const s=ra.exec(n),o=ra.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Xc(e,c===void 0?new Rg(a,r,t):new Cg(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new Pg(a),Xc(e,u)),e=u}}}class oo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Ig(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function $c(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Lg=37297;let Dg=0;function Ug(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const qc=new Gt;function Ng(r){qt._getMatrix(qc,qt.workingColorSpace,r);const t=`mat3( ${qc.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(r)){case So:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Yc(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Ug(r.getShaderSource(t),o)}else return i}function Fg(r,t){const e=Ng(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Og(r,t){let e;switch(t){case Dd:e="Linear";break;case Ud:e="Reinhard";break;case Nd:e="Cineon";break;case Fd:e="ACESFilmic";break;case Bd:e="AgX";break;case zd:e="Neutral";break;case Od:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zr=new R;function Bg(){qt.getLuminanceCoefficients(zr);const r=zr.x.toFixed(4),t=zr.y.toFixed(4),e=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function kg(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vg(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function $s(r){return r!==""}function jc(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zc(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function fl(r){return r.replace(Hg,Wg)}const Gg=new Map;function Wg(r,t){let e=Zt[t];if(e===void 0){const n=Gg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fl(e)}const Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(r){return r.replace(Xg,$g)}function $g(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Jc(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function qg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Gh?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function Yg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ms:case gs:t="ENVMAP_TYPE_CUBE";break;case Mo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function jg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case gs:t="ENVMAP_MODE_REFRACTION";break}return t}function Zg(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case yo:t="ENVMAP_BLENDING_MULTIPLY";break;case Id:t="ENVMAP_BLENDING_MIX";break;case Ld:t="ENVMAP_BLENDING_ADD";break}return t}function Kg(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Jg(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=qg(e),c=Yg(e),h=jg(e),u=Zg(e),d=Kg(e),f=zg(e),g=kg(s),v=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($s).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($s).join(`
`),p.length>0&&(p+=`
`)):(m=[Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?Zt.tonemapping_pars_fragment:"",e.toneMapping!==li?Og("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Fg("linearToOutputTexel",e.outputColorSpace),Bg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($s).join(`
`)),o=fl(o),o=jc(o,e),o=Zc(o,e),a=fl(a),a=jc(a,e),a=Zc(a,e),o=Kc(o),a=Kc(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+m+o,x=y+p+a,C=$c(i,i.VERTEX_SHADER,_),T=$c(i,i.FRAGMENT_SHADER,x);i.attachShader(v,C),i.attachShader(v,T),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(P){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(v).trim(),O=i.getShaderInfoLog(C).trim(),X=i.getShaderInfoLog(T).trim();let Y=!0,V=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,C,T);else{const K=Yc(i,C,"vertex"),G=Yc(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+K+`
`+G)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||X==="")&&(V=!1);V&&(P.diagnostics={runnable:Y,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(C),i.deleteShader(T),I=new oo(i,v),S=Vg(i,v)}let I;this.getUniforms=function(){return I===void 0&&E(this),I};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,Lg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}let Qg=0;class tv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ev(t),e.set(t,n)),n}}class ev{constructor(t){this.id=Qg++,this.code=t,this.usedTimes=0}}function nv(r,t,e,n,i,s,o){const a=new Ul,l=new tv,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,M,P,B,O){const X=B.fog,Y=O.geometry,V=S.isMeshStandardMaterial?B.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),G=K&&K.mapping===Mo?K.image.height:null,rt=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ft=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,yt=ft!==void 0?ft.length:0;let Bt=0;Y.morphAttributes.position!==void 0&&(Bt=1),Y.morphAttributes.normal!==void 0&&(Bt=2),Y.morphAttributes.color!==void 0&&(Bt=3);let Jt,$,nt,Mt;if(rt){const ae=Sn[rt];Jt=ae.vertexShader,$=ae.fragmentShader}else Jt=S.vertexShader,$=S.fragmentShader,l.update(S),nt=l.getVertexShaderID(S),Mt=l.getFragmentShaderID(S);const ot=r.getRenderTarget(),Dt=r.state.buffers.depth.getReversed(),Ot=O.isInstancedMesh===!0,Ut=O.isBatchedMesh===!0,Qt=!!S.map,Z=!!S.matcap,it=!!K,L=!!S.aoMap,It=!!S.lightMap,et=!!S.bumpMap,_t=!!S.normalMap,ct=!!S.displacementMap,Nt=!!S.emissiveMap,vt=!!S.metalnessMap,A=!!S.roughnessMap,b=S.anisotropy>0,F=S.clearcoat>0,q=S.dispersion>0,tt=S.iridescence>0,j=S.sheen>0,At=S.transmission>0,ut=b&&!!S.anisotropyMap,xt=F&&!!S.clearcoatMap,te=F&&!!S.clearcoatNormalMap,st=F&&!!S.clearcoatRoughnessMap,bt=tt&&!!S.iridescenceMap,Ft=tt&&!!S.iridescenceThicknessMap,zt=j&&!!S.sheenColorMap,St=j&&!!S.sheenRoughnessMap,ne=!!S.specularMap,jt=!!S.specularColorMap,de=!!S.specularIntensityMap,D=At&&!!S.transmissionMap,dt=At&&!!S.thicknessMap,W=!!S.gradientMap,J=!!S.alphaMap,gt=S.alphaTest>0,pt=!!S.alphaHash,Wt=!!S.extensions;let be=li;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(be=r.toneMapping);const Oe={shaderID:rt,shaderType:S.type,shaderName:S.name,vertexShader:Jt,fragmentShader:$,defines:S.defines,customVertexShaderID:nt,customFragmentShaderID:Mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&O._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&O.instanceColor!==null,instancingMorph:Ot&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?r.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Es,alphaToCoverage:!!S.alphaToCoverage,map:Qt,matcap:Z,envMap:it,envMapMode:it&&K.mapping,envMapCubeUVHeight:G,aoMap:L,lightMap:It,bumpMap:et,normalMap:_t,displacementMap:d&&ct,emissiveMap:Nt,normalMapObjectSpace:_t&&S.normalMapType===qd,normalMapTangentSpace:_t&&S.normalMapType===bo,metalnessMap:vt,roughnessMap:A,anisotropy:b,anisotropyMap:ut,clearcoat:F,clearcoatMap:xt,clearcoatNormalMap:te,clearcoatRoughnessMap:st,dispersion:q,iridescence:tt,iridescenceMap:bt,iridescenceThicknessMap:Ft,sheen:j,sheenColorMap:zt,sheenRoughnessMap:St,specularMap:ne,specularColorMap:jt,specularIntensityMap:de,transmission:At,transmissionMap:D,thicknessMap:dt,gradientMap:W,opaque:S.transparent===!1&&S.blending===ls&&S.alphaToCoverage===!1,alphaMap:J,alphaTest:gt,alphaHash:pt,combine:S.combine,mapUv:Qt&&v(S.map.channel),aoMapUv:L&&v(S.aoMap.channel),lightMapUv:It&&v(S.lightMap.channel),bumpMapUv:et&&v(S.bumpMap.channel),normalMapUv:_t&&v(S.normalMap.channel),displacementMapUv:ct&&v(S.displacementMap.channel),emissiveMapUv:Nt&&v(S.emissiveMap.channel),metalnessMapUv:vt&&v(S.metalnessMap.channel),roughnessMapUv:A&&v(S.roughnessMap.channel),anisotropyMapUv:ut&&v(S.anisotropyMap.channel),clearcoatMapUv:xt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:St&&v(S.sheenRoughnessMap.channel),specularMapUv:ne&&v(S.specularMap.channel),specularColorMapUv:jt&&v(S.specularColorMap.channel),specularIntensityMapUv:de&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:dt&&v(S.thicknessMap.channel),alphaMapUv:J&&v(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(_t||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!Y.attributes.uv&&(Qt||J),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:O.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Bt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:be,decodeVideoTexture:Qt&&S.map.isVideoTexture===!0&&qt.getTransfer(S.map.colorSpace)===ce,decodeVideoTextureEmissive:Nt&&S.emissiveMap.isVideoTexture===!0&&qt.getTransfer(S.emissiveMap.colorSpace)===ce,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ke,flipSided:S.side===Ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&S.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(M,S),_(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const M=g[S.type];let P;if(M){const B=Sn[M];P=zf.clone(B.uniforms)}else P=S.uniforms;return P}function C(S,M){let P;for(let B=0,O=h.length;B<O;B++){const X=h[B];if(X.cacheKey===M){P=X,++P.usedTimes;break}}return P===void 0&&(P=new Jg(r,M,S,s),h.push(P)),P}function T(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:I}}function iv(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function sv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Qc(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function th(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,g,v,m){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||sv),n.length>1&&n.sort(d||Qc),i.length>1&&i.sort(d||Qc)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function rv(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new th,r.set(n,[o])):i>=s.length?(o=new th,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function ov(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new wt};break;case"SpotLight":e={position:new R,direction:new R,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":e={color:new wt,position:new R,halfWidth:new R,halfHeight:new R};break}return r[t.id]=e,e}}}function av(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let lv=0;function cv(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function hv(r){const t=new ov,e=av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,s=new Tt,o=new Tt;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,_=0,x=0,C=0,T=0,E=0;c.sort(cv);for(let S=0,M=c.length;S<M;S++){const P=c[S],B=P.color,O=P.intensity,X=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=B.r*O,u+=B.g*O,d+=B.b*O;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],O);E++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,G=e.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=V,f++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(B).multiplyScalar(O),V.distance=X,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[v]=V;const K=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,K.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[v]=K.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=Y,x++}v++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(B).multiplyScalar(O),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const K=P.shadow,G=e.get(P);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,_++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(O),V.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==y||I.numPointShadows!==_||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,I.directionalLength=f,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=y,I.numPointShadows=_,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=E,n.version=lv++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const _=c[p];if(_.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(_.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function eh(r){const t=new hv(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function uv(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new eh(r),t.set(i,[a])):s>=o.length?(a=new eh(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class dv extends jn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fv extends jn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const pv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gv(r,t,e){let n=new Fl;const i=new Q,s=new Q,o=new ee,a=new dv({depthPacking:$d}),l=new fv,c={},h=e.maxTextureSize,u={[Rn]:Ze,[Ze]:Rn,[ke]:ke},d=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:pv,fragmentShader:mv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hh;let p=this.type;this.render=function(T,E,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),B=r.state;B.setBlending(Wn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=p!==zn&&this.type===zn,X=p===zn&&this.type!==zn;for(let Y=0,V=T.length;Y<V;Y++){const K=T[Y],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const rt=G.getFrameExtents();if(i.multiply(rt),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/rt.x),i.x=s.x*rt.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/rt.y),i.y=s.y*rt.y,G.mapSize.y=s.y)),G.map===null||O===!0||X===!0){const yt=this.type!==zn?{minFilter:qe,magFilter:qe}:{};G.map!==null&&G.map.dispose(),G.map=new ci(i.x,i.y,yt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const ft=G.getViewportCount();for(let yt=0;yt<ft;yt++){const Bt=G.getViewport(yt);o.set(s.x*Bt.x,s.y*Bt.y,s.x*Bt.z,s.y*Bt.w),B.viewport(o),G.updateMatrices(K,yt),n=G.getFrustum(),x(E,I,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===zn&&y(G,I),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(S,M,P)};function y(T,E){const I=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ci(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(E,null,I,d,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(E,null,I,f,v,null)}function _(T,E,I,S){let M=null;const P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const B=M.uuid,O=E.uuid;let X=c[B];X===void 0&&(X={},c[B]=X);let Y=X[O];Y===void 0&&(Y=M.clone(),X[O]=Y,E.addEventListener("dispose",C)),M=Y}if(M.visible=E.visible,M.wireframe=E.wireframe,S===zn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=r.properties.get(M);B.light=I}return M}function x(T,E,I,S,M){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===zn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const O=t.update(T),X=T.material;if(Array.isArray(X)){const Y=O.groups;for(let V=0,K=Y.length;V<K;V++){const G=Y[V],rt=X[G.materialIndex];if(rt&&rt.visible){const ft=_(T,rt,S,M);T.onBeforeShadow(r,T,E,I,O,ft,G),r.renderBufferDirect(I,null,O,ft,T,G),T.onAfterShadow(r,T,E,I,O,ft,G)}}}else if(X.visible){const Y=_(T,X,S,M);T.onBeforeShadow(r,T,E,I,O,Y,null),r.renderBufferDirect(I,null,O,Y,T,null),T.onAfterShadow(r,T,E,I,O,Y,null)}}const B=T.children;for(let O=0,X=B.length;O<X;O++)x(B[O],E,I,S,M)}function C(T){T.target.removeEventListener("dispose",C);for(const I in c){const S=c[I],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const vv={[Pa]:Ia,[La]:Na,[Da]:Fa,[ps]:Ua,[Ia]:Pa,[Na]:La,[Fa]:Da,[Ua]:ps};function xv(r,t){function e(){let D=!1;const dt=new ee;let W=null;const J=new ee(0,0,0,0);return{setMask:function(gt){W!==gt&&!D&&(r.colorMask(gt,gt,gt,gt),W=gt)},setLocked:function(gt){D=gt},setClear:function(gt,pt,Wt,be,Oe){Oe===!0&&(gt*=be,pt*=be,Wt*=be),dt.set(gt,pt,Wt,be),J.equals(dt)===!1&&(r.clearColor(gt,pt,Wt,be),J.copy(dt))},reset:function(){D=!1,W=null,J.set(-1,0,0,0)}}}function n(){let D=!1,dt=!1,W=null,J=null,gt=null;return{setReversed:function(pt){if(dt!==pt){const Wt=t.get("EXT_clip_control");dt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT);const be=gt;gt=null,this.setClear(be)}dt=pt},getReversed:function(){return dt},setTest:function(pt){pt?ot(r.DEPTH_TEST):Dt(r.DEPTH_TEST)},setMask:function(pt){W!==pt&&!D&&(r.depthMask(pt),W=pt)},setFunc:function(pt){if(dt&&(pt=vv[pt]),J!==pt){switch(pt){case Pa:r.depthFunc(r.NEVER);break;case Ia:r.depthFunc(r.ALWAYS);break;case La:r.depthFunc(r.LESS);break;case ps:r.depthFunc(r.LEQUAL);break;case Da:r.depthFunc(r.EQUAL);break;case Ua:r.depthFunc(r.GEQUAL);break;case Na:r.depthFunc(r.GREATER);break;case Fa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=pt}},setLocked:function(pt){D=pt},setClear:function(pt){gt!==pt&&(dt&&(pt=1-pt),r.clearDepth(pt),gt=pt)},reset:function(){D=!1,W=null,J=null,gt=null,dt=!1}}}function i(){let D=!1,dt=null,W=null,J=null,gt=null,pt=null,Wt=null,be=null,Oe=null;return{setTest:function(ae){D||(ae?ot(r.STENCIL_TEST):Dt(r.STENCIL_TEST))},setMask:function(ae){dt!==ae&&!D&&(r.stencilMask(ae),dt=ae)},setFunc:function(ae,dn,Pn){(W!==ae||J!==dn||gt!==Pn)&&(r.stencilFunc(ae,dn,Pn),W=ae,J=dn,gt=Pn)},setOp:function(ae,dn,Pn){(pt!==ae||Wt!==dn||be!==Pn)&&(r.stencilOp(ae,dn,Pn),pt=ae,Wt=dn,be=Pn)},setLocked:function(ae){D=ae},setClear:function(ae){Oe!==ae&&(r.clearStencil(ae),Oe=ae)},reset:function(){D=!1,dt=null,W=null,J=null,gt=null,pt=null,Wt=null,be=null,Oe=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,_=null,x=null,C=null,T=null,E=new wt(0,0,0),I=0,S=!1,M=null,P=null,B=null,O=null,X=null;const Y=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,K=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=K>=2);let rt=null,ft={};const yt=r.getParameter(r.SCISSOR_BOX),Bt=r.getParameter(r.VIEWPORT),Jt=new ee().fromArray(yt),$=new ee().fromArray(Bt);function nt(D,dt,W,J){const gt=new Uint8Array(4),pt=r.createTexture();r.bindTexture(D,pt),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Wt=0;Wt<W;Wt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(dt,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,gt):r.texImage2D(dt+Wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,gt);return pt}const Mt={};Mt[r.TEXTURE_2D]=nt(r.TEXTURE_2D,r.TEXTURE_2D,1),Mt[r.TEXTURE_CUBE_MAP]=nt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[r.TEXTURE_2D_ARRAY]=nt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Mt[r.TEXTURE_3D]=nt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(r.DEPTH_TEST),o.setFunc(ps),et(!1),_t(sc),ot(r.CULL_FACE),L(Wn);function ot(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function Dt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Ot(D,dt){return u[D]!==dt?(r.bindFramebuffer(D,dt),u[D]=dt,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=dt),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ut(D,dt){let W=f,J=!1;if(D){W=d.get(dt),W===void 0&&(W=[],d.set(dt,W));const gt=D.textures;if(W.length!==gt.length||W[0]!==r.COLOR_ATTACHMENT0){for(let pt=0,Wt=gt.length;pt<Wt;pt++)W[pt]=r.COLOR_ATTACHMENT0+pt;W.length=gt.length,J=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,J=!0);J&&r.drawBuffers(W)}function Qt(D){return g!==D?(r.useProgram(D),g=D,!0):!1}const Z={[Mi]:r.FUNC_ADD,[pd]:r.FUNC_SUBTRACT,[md]:r.FUNC_REVERSE_SUBTRACT};Z[gd]=r.MIN,Z[vd]=r.MAX;const it={[xd]:r.ZERO,[_d]:r.ONE,[yd]:r.SRC_COLOR,[Ra]:r.SRC_ALPHA,[Td]:r.SRC_ALPHA_SATURATE,[wd]:r.DST_COLOR,[bd]:r.DST_ALPHA,[Md]:r.ONE_MINUS_SRC_COLOR,[Ca]:r.ONE_MINUS_SRC_ALPHA,[Ed]:r.ONE_MINUS_DST_COLOR,[Sd]:r.ONE_MINUS_DST_ALPHA,[Ad]:r.CONSTANT_COLOR,[Rd]:r.ONE_MINUS_CONSTANT_COLOR,[Cd]:r.CONSTANT_ALPHA,[Pd]:r.ONE_MINUS_CONSTANT_ALPHA};function L(D,dt,W,J,gt,pt,Wt,be,Oe,ae){if(D===Wn){v===!0&&(Dt(r.BLEND),v=!1);return}if(v===!1&&(ot(r.BLEND),v=!0),D!==fd){if(D!==m||ae!==S){if((p!==Mi||x!==Mi)&&(r.blendEquation(r.FUNC_ADD),p=Mi,x=Mi),ae)switch(D){case ls:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rc:r.blendFunc(r.ONE,r.ONE);break;case oc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ac:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ls:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rc:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case oc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ac:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,_=null,C=null,T=null,E.set(0,0,0),I=0,m=D,S=ae}return}gt=gt||dt,pt=pt||W,Wt=Wt||J,(dt!==p||gt!==x)&&(r.blendEquationSeparate(Z[dt],Z[gt]),p=dt,x=gt),(W!==y||J!==_||pt!==C||Wt!==T)&&(r.blendFuncSeparate(it[W],it[J],it[pt],it[Wt]),y=W,_=J,C=pt,T=Wt),(be.equals(E)===!1||Oe!==I)&&(r.blendColor(be.r,be.g,be.b,Oe),E.copy(be),I=Oe),m=D,S=!1}function It(D,dt){D.side===ke?Dt(r.CULL_FACE):ot(r.CULL_FACE);let W=D.side===Ze;dt&&(W=!W),et(W),D.blending===ls&&D.transparent===!1?L(Wn):L(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const J=D.stencilWrite;a.setTest(J),J&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(r.SAMPLE_ALPHA_TO_COVERAGE):Dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){M!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),M=D)}function _t(D){D!==ud?(ot(r.CULL_FACE),D!==P&&(D===sc?r.cullFace(r.BACK):D===dd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Dt(r.CULL_FACE),P=D}function ct(D){D!==B&&(V&&r.lineWidth(D),B=D)}function Nt(D,dt,W){D?(ot(r.POLYGON_OFFSET_FILL),(O!==dt||X!==W)&&(r.polygonOffset(dt,W),O=dt,X=W)):Dt(r.POLYGON_OFFSET_FILL)}function vt(D){D?ot(r.SCISSOR_TEST):Dt(r.SCISSOR_TEST)}function A(D){D===void 0&&(D=r.TEXTURE0+Y-1),rt!==D&&(r.activeTexture(D),rt=D)}function b(D,dt,W){W===void 0&&(rt===null?W=r.TEXTURE0+Y-1:W=rt);let J=ft[W];J===void 0&&(J={type:void 0,texture:void 0},ft[W]=J),(J.type!==D||J.texture!==dt)&&(rt!==W&&(r.activeTexture(W),rt=W),r.bindTexture(D,dt||Mt[D]),J.type=D,J.texture=dt)}function F(){const D=ft[rt];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(D){Jt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Jt.copy(D))}function St(D){$.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),$.copy(D))}function ne(D,dt){let W=c.get(dt);W===void 0&&(W=new WeakMap,c.set(dt,W));let J=W.get(D);J===void 0&&(J=r.getUniformBlockIndex(dt,D.name),W.set(D,J))}function jt(D,dt){const J=c.get(dt).get(D);l.get(dt)!==J&&(r.uniformBlockBinding(dt,J,D.__bindingPointIndex),l.set(dt,J))}function de(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},rt=null,ft={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,y=null,_=null,x=null,C=null,T=null,E=new wt(0,0,0),I=0,S=!1,M=null,P=null,B=null,O=null,X=null,Jt.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ot,disable:Dt,bindFramebuffer:Ot,drawBuffers:Ut,useProgram:Qt,setBlending:L,setMaterial:It,setFlipSided:et,setCullFace:_t,setLineWidth:ct,setPolygonOffset:Nt,setScissorTest:vt,activeTexture:A,bindTexture:b,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:tt,texImage2D:bt,texImage3D:Ft,updateUBOMapping:ne,uniformBlockBinding:jt,texStorage2D:te,texStorage3D:st,texSubImage2D:j,texSubImage3D:At,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:zt,viewport:St,reset:de}}function nh(r,t,e,n){const i=_v(n);switch(e){case Yh:return r*t;case Zh:return r*t;case Kh:return r*t*2;case Rl:return r*t/i.components*i.byteLength;case Cl:return r*t/i.components*i.byteLength;case Jh:return r*t*2/i.components*i.byteLength;case Pl:return r*t*2/i.components*i.byteLength;case jh:return r*t*3/i.components*i.byteLength;case cn:return r*t*4/i.components*i.byteLength;case Il:return r*t*4/i.components*i.byteLength;case eo:case no:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case io:case so:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ka:case Ha:return Math.max(r,16)*Math.max(t,8)/4;case za:case Va:return Math.max(r,8)*Math.max(t,8)/2;case Ga:case Wa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Xa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case $a:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case ja:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case tl:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case el:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case nl:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case il:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case sl:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case rl:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ro:case ol:case al:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Qh:case ll:return Math.ceil(r/4)*Math.ceil(t/4)*8;case cl:case hl:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _v(r){switch(r){case $n:case Xh:return{byteLength:1,components:1};case sr:case $h:case fr:return{byteLength:2,components:1};case Tl:case Al:return{byteLength:2,components:4};case Ti:case El:case yn:return{byteLength:4,components:1};case qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function yv(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Q,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,b){return f?new OffscreenCanvas(A,b):rr("canvas")}function v(A,b,F){let q=1;const tt=vt(A);if((tt.width>F||tt.height>F)&&(q=F/Math.max(tt.width,tt.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(q*tt.width),At=Math.floor(q*tt.height);u===void 0&&(u=g(j,At));const ut=b?g(j,At):u;return ut.width=j,ut.height=At,ut.getContext("2d").drawImage(A,0,0,j,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+j+"x"+At+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){r.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(A,b,F,q,tt=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=b;if(b===r.RED&&(F===r.FLOAT&&(j=r.R32F),F===r.HALF_FLOAT&&(j=r.R16F),F===r.UNSIGNED_BYTE&&(j=r.R8)),b===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(j=r.R8UI),F===r.UNSIGNED_SHORT&&(j=r.R16UI),F===r.UNSIGNED_INT&&(j=r.R32UI),F===r.BYTE&&(j=r.R8I),F===r.SHORT&&(j=r.R16I),F===r.INT&&(j=r.R32I)),b===r.RG&&(F===r.FLOAT&&(j=r.RG32F),F===r.HALF_FLOAT&&(j=r.RG16F),F===r.UNSIGNED_BYTE&&(j=r.RG8)),b===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(j=r.RG8UI),F===r.UNSIGNED_SHORT&&(j=r.RG16UI),F===r.UNSIGNED_INT&&(j=r.RG32UI),F===r.BYTE&&(j=r.RG8I),F===r.SHORT&&(j=r.RG16I),F===r.INT&&(j=r.RG32I)),b===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(j=r.RGB8UI),F===r.UNSIGNED_SHORT&&(j=r.RGB16UI),F===r.UNSIGNED_INT&&(j=r.RGB32UI),F===r.BYTE&&(j=r.RGB8I),F===r.SHORT&&(j=r.RGB16I),F===r.INT&&(j=r.RGB32I)),b===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),F===r.UNSIGNED_INT&&(j=r.RGBA32UI),F===r.BYTE&&(j=r.RGBA8I),F===r.SHORT&&(j=r.RGBA16I),F===r.INT&&(j=r.RGBA32I)),b===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),b===r.RGBA){const At=tt?So:qt.getTransfer(q);F===r.FLOAT&&(j=r.RGBA32F),F===r.HALF_FLOAT&&(j=r.RGBA16F),F===r.UNSIGNED_BYTE&&(j=At===ce?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(A,b){let F;return A?b===null||b===Ti||b===vs?F=r.DEPTH24_STENCIL8:b===yn?F=r.DEPTH32F_STENCIL8:b===sr&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ti||b===vs?F=r.DEPTH_COMPONENT24:b===yn?F=r.DEPTH_COMPONENT32F:b===sr&&(F=r.DEPTH_COMPONENT16),F}function C(A,b){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==qe&&A.minFilter!==Tn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function T(A){const b=A.target;b.removeEventListener("dispose",T),I(b),b.isVideoTexture&&h.delete(b)}function E(A){const b=A.target;b.removeEventListener("dispose",E),M(b)}function I(A){const b=n.get(A);if(b.__webglInit===void 0)return;const F=A.source,q=d.get(F);if(q){const tt=q[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&S(A),Object.keys(q).length===0&&d.delete(F)}n.remove(A)}function S(A){const b=n.get(A);r.deleteTexture(b.__webglTexture);const F=A.source,q=d.get(F);delete q[b.__cacheKey],o.memory.textures--}function M(A){const b=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let tt=0;tt<b.__webglFramebuffer[q].length;tt++)r.deleteFramebuffer(b.__webglFramebuffer[q][tt]);else r.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)r.deleteFramebuffer(b.__webglFramebuffer[q]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const F=A.textures;for(let q=0,tt=F.length;q<tt;q++){const j=n.get(F[q]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(F[q])}n.remove(A)}let P=0;function B(){P=0}function O(){const A=P;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function X(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function Y(A,b){const F=n.get(A);if(A.isVideoTexture&&ct(A),A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(F,A,b);return}}e.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+b)}function V(A,b){const F=n.get(A);if(A.version>0&&F.__version!==A.version){$(F,A,b);return}e.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+b)}function K(A,b){const F=n.get(A);if(A.version>0&&F.__version!==A.version){$(F,A,b);return}e.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+b)}function G(A,b){const F=n.get(A);if(A.version>0&&F.__version!==A.version){nt(F,A,b);return}e.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+b)}const rt={[ir]:r.REPEAT,[kn]:r.CLAMP_TO_EDGE,[Ba]:r.MIRRORED_REPEAT},ft={[qe]:r.NEAREST,[Vd]:r.NEAREST_MIPMAP_NEAREST,[_r]:r.NEAREST_MIPMAP_LINEAR,[Tn]:r.LINEAR,[Lo]:r.LINEAR_MIPMAP_NEAREST,[wi]:r.LINEAR_MIPMAP_LINEAR},yt={[Yd]:r.NEVER,[tf]:r.ALWAYS,[jd]:r.LESS,[eu]:r.LEQUAL,[Zd]:r.EQUAL,[Qd]:r.GEQUAL,[Kd]:r.GREATER,[Jd]:r.NOTEQUAL};function Bt(A,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Tn||b.magFilter===Lo||b.magFilter===_r||b.magFilter===wi||b.minFilter===Tn||b.minFilter===Lo||b.minFilter===_r||b.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,rt[b.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,rt[b.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,rt[b.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,ft[b.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,ft[b.minFilter]),b.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,yt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===qe||b.minFilter!==_r&&b.minFilter!==wi||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Jt(A,b){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",T));const q=b.source;let tt=d.get(q);tt===void 0&&(tt={},d.set(q,tt));const j=X(b);if(j!==A.__cacheKey){tt[j]===void 0&&(tt[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,F=!0),tt[j].usedTimes++;const At=tt[A.__cacheKey];At!==void 0&&(tt[A.__cacheKey].usedTimes--,At.usedTimes===0&&S(b)),A.__cacheKey=j,A.__webglTexture=tt[j].texture}return F}function $(A,b,F){let q=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=r.TEXTURE_3D);const tt=Jt(A,b),j=b.source;e.bindTexture(q,A.__webglTexture,r.TEXTURE0+F);const At=n.get(j);if(j.version!==At.__version||tt===!0){e.activeTexture(r.TEXTURE0+F);const ut=qt.getPrimaries(qt.workingColorSpace),xt=b.colorSpace===ai?null:qt.getPrimaries(b.colorSpace),te=b.colorSpace===ai||ut===xt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let st=v(b.image,!1,i.maxTextureSize);st=Nt(b,st);const bt=s.convert(b.format,b.colorSpace),Ft=s.convert(b.type);let zt=_(b.internalFormat,bt,Ft,b.colorSpace,b.isVideoTexture);Bt(q,b);let St;const ne=b.mipmaps,jt=b.isVideoTexture!==!0,de=At.__version===void 0||tt===!0,D=j.dataReady,dt=C(b,st);if(b.isDepthTexture)zt=x(b.format===xs,b.type),de&&(jt?e.texStorage2D(r.TEXTURE_2D,1,zt,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,zt,st.width,st.height,0,bt,Ft,null));else if(b.isDataTexture)if(ne.length>0){jt&&de&&e.texStorage2D(r.TEXTURE_2D,dt,zt,ne[0].width,ne[0].height);for(let W=0,J=ne.length;W<J;W++)St=ne[W],jt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,St.width,St.height,bt,Ft,St.data):e.texImage2D(r.TEXTURE_2D,W,zt,St.width,St.height,0,bt,Ft,St.data);b.generateMipmaps=!1}else jt?(de&&e.texStorage2D(r.TEXTURE_2D,dt,zt,st.width,st.height),D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,bt,Ft,st.data)):e.texImage2D(r.TEXTURE_2D,0,zt,st.width,st.height,0,bt,Ft,st.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){jt&&de&&e.texStorage3D(r.TEXTURE_2D_ARRAY,dt,zt,ne[0].width,ne[0].height,st.depth);for(let W=0,J=ne.length;W<J;W++)if(St=ne[W],b.format!==cn)if(bt!==null)if(jt){if(D)if(b.layerUpdates.size>0){const gt=nh(St.width,St.height,b.format,b.type);for(const pt of b.layerUpdates){const Wt=St.data.subarray(pt*gt/St.data.BYTES_PER_ELEMENT,(pt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,pt,St.width,St.height,1,bt,Wt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,St.width,St.height,st.depth,bt,St.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,zt,St.width,St.height,st.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else jt?D&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,St.width,St.height,st.depth,bt,Ft,St.data):e.texImage3D(r.TEXTURE_2D_ARRAY,W,zt,St.width,St.height,st.depth,0,bt,Ft,St.data)}else{jt&&de&&e.texStorage2D(r.TEXTURE_2D,dt,zt,ne[0].width,ne[0].height);for(let W=0,J=ne.length;W<J;W++)St=ne[W],b.format!==cn?bt!==null?jt?D&&e.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(r.TEXTURE_2D,W,zt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,St.width,St.height,bt,Ft,St.data):e.texImage2D(r.TEXTURE_2D,W,zt,St.width,St.height,0,bt,Ft,St.data)}else if(b.isDataArrayTexture)if(jt){if(de&&e.texStorage3D(r.TEXTURE_2D_ARRAY,dt,zt,st.width,st.height,st.depth),D)if(b.layerUpdates.size>0){const W=nh(st.width,st.height,b.format,b.type);for(const J of b.layerUpdates){const gt=st.data.subarray(J*W/st.data.BYTES_PER_ELEMENT,(J+1)*W/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,bt,Ft,gt)}b.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,bt,Ft,st.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,st.width,st.height,st.depth,0,bt,Ft,st.data);else if(b.isData3DTexture)jt?(de&&e.texStorage3D(r.TEXTURE_3D,dt,zt,st.width,st.height,st.depth),D&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,bt,Ft,st.data)):e.texImage3D(r.TEXTURE_3D,0,zt,st.width,st.height,st.depth,0,bt,Ft,st.data);else if(b.isFramebufferTexture){if(de)if(jt)e.texStorage2D(r.TEXTURE_2D,dt,zt,st.width,st.height);else{let W=st.width,J=st.height;for(let gt=0;gt<dt;gt++)e.texImage2D(r.TEXTURE_2D,gt,zt,W,J,0,bt,Ft,null),W>>=1,J>>=1}}else if(ne.length>0){if(jt&&de){const W=vt(ne[0]);e.texStorage2D(r.TEXTURE_2D,dt,zt,W.width,W.height)}for(let W=0,J=ne.length;W<J;W++)St=ne[W],jt?D&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,bt,Ft,St):e.texImage2D(r.TEXTURE_2D,W,zt,bt,Ft,St);b.generateMipmaps=!1}else if(jt){if(de){const W=vt(st);e.texStorage2D(r.TEXTURE_2D,dt,zt,W.width,W.height)}D&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,bt,Ft,st)}else e.texImage2D(r.TEXTURE_2D,0,zt,bt,Ft,st);m(b)&&p(q),At.__version=j.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function nt(A,b,F){if(b.image.length!==6)return;const q=Jt(A,b),tt=b.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+F);const j=n.get(tt);if(tt.version!==j.__version||q===!0){e.activeTexture(r.TEXTURE0+F);const At=qt.getPrimaries(qt.workingColorSpace),ut=b.colorSpace===ai?null:qt.getPrimaries(b.colorSpace),xt=b.colorSpace===ai||At===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const te=b.isCompressedTexture||b.image[0].isCompressedTexture,st=b.image[0]&&b.image[0].isDataTexture,bt=[];for(let J=0;J<6;J++)!te&&!st?bt[J]=v(b.image[J],!0,i.maxCubemapSize):bt[J]=st?b.image[J].image:b.image[J],bt[J]=Nt(b,bt[J]);const Ft=bt[0],zt=s.convert(b.format,b.colorSpace),St=s.convert(b.type),ne=_(b.internalFormat,zt,St,b.colorSpace),jt=b.isVideoTexture!==!0,de=j.__version===void 0||q===!0,D=tt.dataReady;let dt=C(b,Ft);Bt(r.TEXTURE_CUBE_MAP,b);let W;if(te){jt&&de&&e.texStorage2D(r.TEXTURE_CUBE_MAP,dt,ne,Ft.width,Ft.height);for(let J=0;J<6;J++){W=bt[J].mipmaps;for(let gt=0;gt<W.length;gt++){const pt=W[gt];b.format!==cn?zt!==null?jt?D&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,pt.width,pt.height,zt,pt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,ne,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):jt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,pt.width,pt.height,zt,St,pt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,ne,pt.width,pt.height,0,zt,St,pt.data)}}}else{if(W=b.mipmaps,jt&&de){W.length>0&&dt++;const J=vt(bt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,dt,ne,J.width,J.height)}for(let J=0;J<6;J++)if(st){jt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,bt[J].width,bt[J].height,zt,St,bt[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ne,bt[J].width,bt[J].height,0,zt,St,bt[J].data);for(let gt=0;gt<W.length;gt++){const Wt=W[gt].image[J].image;jt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,Wt.width,Wt.height,zt,St,Wt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,ne,Wt.width,Wt.height,0,zt,St,Wt.data)}}else{jt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,zt,St,bt[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ne,zt,St,bt[J]);for(let gt=0;gt<W.length;gt++){const pt=W[gt];jt?D&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,zt,St,pt.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,ne,zt,St,pt.image[J])}}}m(b)&&p(r.TEXTURE_CUBE_MAP),j.__version=tt.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Mt(A,b,F,q,tt,j){const At=s.convert(F.format,F.colorSpace),ut=s.convert(F.type),xt=_(F.internalFormat,At,ut,F.colorSpace),te=n.get(b),st=n.get(F);if(st.__renderTarget=b,!te.__hasExternalTextures){const bt=Math.max(1,b.width>>j),Ft=Math.max(1,b.height>>j);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,j,xt,bt,Ft,b.depth,0,At,ut,null):e.texImage2D(tt,j,xt,bt,Ft,0,At,ut,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),_t(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,tt,st.__webglTexture,0,et(b)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,tt,st.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(A,b,F){if(r.bindRenderbuffer(r.RENDERBUFFER,A),b.depthBuffer){const q=b.depthTexture,tt=q&&q.isDepthTexture?q.type:null,j=x(b.stencilBuffer,tt),At=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ut=et(b);_t(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ut,j,b.width,b.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,ut,j,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,j,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,At,r.RENDERBUFFER,A)}else{const q=b.textures;for(let tt=0;tt<q.length;tt++){const j=q[tt],At=s.convert(j.format,j.colorSpace),ut=s.convert(j.type),xt=_(j.internalFormat,At,ut,j.colorSpace),te=et(b);F&&_t(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,xt,b.width,b.height):_t(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,xt,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,xt,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Dt(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(b.depthTexture);q.__renderTarget=b,(!q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Y(b.depthTexture,0);const tt=q.__webglTexture,j=et(b);if(b.depthTexture.format===cs)_t(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,tt,0);else if(b.depthTexture.format===xs)_t(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ot(A){const b=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",tt)};q.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=q}if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Dt(b.__webglFramebuffer,A)}else if(F){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=r.createRenderbuffer(),ot(b.__webglDepthbuffer[q],A,!1);else{const tt=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,tt,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),ot(b.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,tt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(A,b,F){const q=n.get(A);b!==void 0&&Mt(q.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&Ot(A)}function Qt(A){const b=A.texture,F=n.get(A),q=n.get(b);A.addEventListener("dispose",E);const tt=A.textures,j=A.isWebGLCubeRenderTarget===!0,At=tt.length>1;if(At||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=b.version,o.memory.textures++),j){F.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[ut]=[];for(let xt=0;xt<b.mipmaps.length;xt++)F.__webglFramebuffer[ut][xt]=r.createFramebuffer()}else F.__webglFramebuffer[ut]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let ut=0;ut<b.mipmaps.length;ut++)F.__webglFramebuffer[ut]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(At)for(let ut=0,xt=tt.length;ut<xt;ut++){const te=n.get(tt[ut]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&_t(A)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){const xt=tt[ut];F.__webglColorRenderbuffer[ut]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);const te=s.convert(xt.format,xt.colorSpace),st=s.convert(xt.type),bt=_(xt.internalFormat,te,st,xt.colorSpace,A.isXRRenderTarget===!0),Ft=et(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ft,bt,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ut,r.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),ot(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Bt(r.TEXTURE_CUBE_MAP,b);for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)Mt(F.__webglFramebuffer[ut][xt],A,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else Mt(F.__webglFramebuffer[ut],A,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(b)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ut=0,xt=tt.length;ut<xt;ut++){const te=tt[ut],st=n.get(te);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),Bt(r.TEXTURE_2D,te),Mt(F.__webglFramebuffer,A,te,r.COLOR_ATTACHMENT0+ut,r.TEXTURE_2D,0),m(te)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let ut=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ut,q.__webglTexture),Bt(ut,b),b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)Mt(F.__webglFramebuffer[xt],A,b,r.COLOR_ATTACHMENT0,ut,xt);else Mt(F.__webglFramebuffer,A,b,r.COLOR_ATTACHMENT0,ut,0);m(b)&&p(ut),e.unbindTexture()}A.depthBuffer&&Ot(A)}function Z(A){const b=A.textures;for(let F=0,q=b.length;F<q;F++){const tt=b[F];if(m(tt)){const j=y(A),At=n.get(tt).__webglTexture;e.bindTexture(j,At),p(j),e.unbindTexture()}}}const it=[],L=[];function It(A){if(A.samples>0){if(_t(A)===!1){const b=A.textures,F=A.width,q=A.height;let tt=r.COLOR_BUFFER_BIT;const j=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=n.get(A),ut=b.length>1;if(ut)for(let xt=0;xt<b.length;xt++)e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let xt=0;xt<b.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),ut){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,At.__webglColorRenderbuffer[xt]);const te=n.get(b[xt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,te,0)}r.blitFramebuffer(0,0,F,q,0,0,F,q,tt,r.NEAREST),l===!0&&(it.length=0,L.length=0,it.push(r.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(it.push(j),L.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<b.length;xt++){e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.RENDERBUFFER,At.__webglColorRenderbuffer[xt]);const te=n.get(b[xt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xt,r.TEXTURE_2D,te,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const b=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function et(A){return Math.min(i.maxSamples,A.samples)}function _t(A){const b=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ct(A){const b=o.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function Nt(A,b){const F=A.colorSpace,q=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Es&&F!==ai&&(qt.getTransfer(F)===ce?(q!==cn||tt!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function vt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=Ut,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=_t}function Mv(r,t){function e(n,i=ai){let s;const o=qt.getTransfer(i);if(n===$n)return r.UNSIGNED_BYTE;if(n===Tl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return r.UNSIGNED_SHORT_5_5_5_1;if(n===qh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Xh)return r.BYTE;if(n===$h)return r.SHORT;if(n===sr)return r.UNSIGNED_SHORT;if(n===El)return r.INT;if(n===Ti)return r.UNSIGNED_INT;if(n===yn)return r.FLOAT;if(n===fr)return r.HALF_FLOAT;if(n===Yh)return r.ALPHA;if(n===jh)return r.RGB;if(n===cn)return r.RGBA;if(n===Zh)return r.LUMINANCE;if(n===Kh)return r.LUMINANCE_ALPHA;if(n===cs)return r.DEPTH_COMPONENT;if(n===xs)return r.DEPTH_STENCIL;if(n===Rl)return r.RED;if(n===Cl)return r.RED_INTEGER;if(n===Jh)return r.RG;if(n===Pl)return r.RG_INTEGER;if(n===Il)return r.RGBA_INTEGER;if(n===eo||n===no||n===io||n===so)if(o===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===eo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===no)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===eo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===no)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===so)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===ka||n===Va||n===Ha)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===za)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ka)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===Wa||n===Xa)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ga||n===Wa)return o===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$a||n===qa||n===Ya||n===ja||n===Za||n===Ka||n===Ja||n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===$a)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ka)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===el)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return o===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ro||n===ol||n===al)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ro)return o===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ol)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===al)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qh||n===ll||n===cl||n===hl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ro)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ll)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class bv extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Fe extends ue{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sv={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ce,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Yn({vertexShader:wv,fragmentShader:Ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Av extends Ii{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new Tv,m=e.getContextAttributes();let p=null,y=null;const _=[],x=[],C=new Q;let T=null;const E=new $e;E.viewport=new ee;const I=new $e;I.viewport=new ee;const S=[E,I],M=new bv;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=_[$];return nt===void 0&&(nt=new oa,_[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=_[$];return nt===void 0&&(nt=new oa,_[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=_[$];return nt===void 0&&(nt=new oa,_[$]=nt),nt.getHandSpace()};function O($){const nt=x.indexOf($.inputSource);if(nt===-1)return;const Mt=_[nt];Mt!==void 0&&(Mt.update($.inputSource,$.frame,c||o),Mt.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Y);for(let $=0;$<_.length;$++){const nt=x[$];nt!==null&&(x[$]=null,_[$].disconnect(nt))}P=null,B=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ci(f.framebufferWidth,f.framebufferHeight,{format:cn,type:$n,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,Mt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?xs:cs,Mt=m.stencil?vs:Ti);const Dt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new ci(d.textureWidth,d.textureHeight,{format:cn,type:$n,depthTexture:new du(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Jt.setContext(i),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y($){for(let nt=0;nt<$.removed.length;nt++){const Mt=$.removed[nt],ot=x.indexOf(Mt);ot>=0&&(x[ot]=null,_[ot].disconnect(Mt))}for(let nt=0;nt<$.added.length;nt++){const Mt=$.added[nt];let ot=x.indexOf(Mt);if(ot===-1){for(let Ot=0;Ot<_.length;Ot++)if(Ot>=x.length){x.push(Mt),ot=Ot;break}else if(x[Ot]===null){x[Ot]=Mt,ot=Ot;break}if(ot===-1)break}const Dt=_[ot];Dt&&Dt.connect(Mt)}}const V=new R,K=new R;function G($,nt,Mt){V.setFromMatrixPosition(nt.matrixWorld),K.setFromMatrixPosition(Mt.matrixWorld);const ot=V.distanceTo(K),Dt=nt.projectionMatrix.elements,Ot=Mt.projectionMatrix.elements,Ut=Dt[14]/(Dt[10]-1),Qt=Dt[14]/(Dt[10]+1),Z=(Dt[9]+1)/Dt[5],it=(Dt[9]-1)/Dt[5],L=(Dt[8]-1)/Dt[0],It=(Ot[8]+1)/Ot[0],et=Ut*L,_t=Ut*It,ct=ot/(-L+It),Nt=ct*-L;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Nt),$.translateZ(ct),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Dt[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const vt=Ut+ct,A=Qt+ct,b=et-Nt,F=_t+(ot-Nt),q=Z*Qt/A*vt,tt=it*Qt/A*vt;$.projectionMatrix.makePerspective(b,F,q,tt,vt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function rt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let nt=$.near,Mt=$.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(Mt=v.depthFar)),M.near=I.near=E.near=nt,M.far=I.far=E.far=Mt,(P!==M.near||B!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,B=M.far),E.layers.mask=$.layers.mask|2,I.layers.mask=$.layers.mask|4,M.layers.mask=E.layers.mask|I.layers.mask;const ot=$.parent,Dt=M.cameras;rt(M,ot);for(let Ot=0;Ot<Dt.length;Ot++)rt(Dt[Ot],ot);Dt.length===2?G(M,E,I):M.projectionMatrix.copy(E.projectionMatrix),ft($,M,ot)};function ft($,nt,Mt){Mt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(Mt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=_s*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let yt=null;function Bt($,nt){if(h=nt.getViewerPose(c||o),g=nt,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ot=!1;Mt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Ot=0;Ot<Mt.length;Ot++){const Ut=Mt[Ot];let Qt=null;if(f!==null)Qt=f.getViewport(Ut);else{const it=u.getViewSubImage(d,Ut);Qt=it.viewport,Ot===0&&(t.setRenderTargetTextures(y,it.colorTexture,d.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(y))}let Z=S[Ot];Z===void 0&&(Z=new $e,Z.layers.enable(Ot),Z.viewport=new ee,S[Ot]=Z),Z.matrix.fromArray(Ut.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(Ut.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Ot===0&&(M.matrix.copy(Z.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Z)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const Ot=u.getDepthInformation(Mt[0]);Ot&&Ot.isValid&&Ot.texture&&v.init(t,Ot,i.renderState)}}for(let Mt=0;Mt<_.length;Mt++){const ot=x[Mt],Dt=_[Mt];ot!==null&&Dt!==void 0&&Dt.update(ot,nt,c||o)}yt&&yt($,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const Jt=new hu;Jt.setAnimationLoop(Bt),this.setAnimationLoop=function($){yt=$},this.dispose=function(){}}}const xi=new Re,Rv=new Tt;function Cv(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,au(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ze&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ze&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),_=y.envMap,x=y.envMapRotation;_&&(m.envMap.value=_,xi.copy(x),xi.x*=-1,xi.y*=-1,xi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(Rv.makeRotationFromEuler(xi)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ze&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Pv(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const x=_.program;n.uniformBlockBinding(y,x)}function c(y,_){let x=i[y.id];x===void 0&&(g(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",m));const C=_.program;n.updateUBOMapping(y,C);const T=t.render.frame;s[y.id]!==T&&(d(y),s[y.id]=T)}function h(y){const _=u();y.__bindingPointIndex=_;const x=r.createBuffer(),C=y.__size,T=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,C,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=i[y.id],x=y.uniforms,C=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let T=0,E=x.length;T<E;T++){const I=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,M=I.length;S<M;S++){const P=I[S];if(f(P,T,S,C)===!0){const B=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let Y=0;Y<O.length;Y++){const V=O[Y],K=v(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,B+X,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,_,x,C){const T=y.value,E=_+"_"+x;if(C[E]===void 0)return typeof T=="number"||typeof T=="boolean"?C[E]=T:C[E]=T.clone(),!0;{const I=C[E];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return C[E]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(y){const _=y.uniforms;let x=0;const C=16;for(let E=0,I=_.length;E<I;E++){const S=Array.isArray(_[E])?_[E]:[_[E]];for(let M=0,P=S.length;M<P;M++){const B=S[M],O=Array.isArray(B.value)?B.value:[B.value];for(let X=0,Y=O.length;X<Y;X++){const V=O[X],K=v(V),G=x%C,rt=G%K.boundary,ft=G+rt;x+=rt,ft!==0&&C-ft<K.storage&&(x+=C-ft),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=K.storage}}}const T=x%C;return T>0&&(x+=C-T),y.__size=x,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Iv{constructor(t={}){const{canvas:e=_f(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pe,this.toneMapping=li,this.toneMappingExposure=1;const x=this;let C=!1,T=0,E=0,I=null,S=-1,M=null;const P=new ee,B=new ee;let O=null;const X=new wt(0);let Y=0,V=e.width,K=e.height,G=1,rt=null,ft=null;const yt=new ee(0,0,V,K),Bt=new ee(0,0,V,K);let Jt=!1;const $=new Fl;let nt=!1,Mt=!1;const ot=new Tt,Dt=new Tt,Ot=new R,Ut=new ee,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function it(){return I===null?G:1}let L=n;function It(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wl}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),L===null){const U="webgl2";if(L=It(U,w),L===null)throw It(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let et,_t,ct,Nt,vt,A,b,F,q,tt,j,At,ut,xt,te,st,bt,Ft,zt,St,ne,jt,de,D;function dt(){et=new F0(L),et.init(),jt=new Mv(L,et),_t=new P0(L,et,t,jt),ct=new xv(L,et),_t.reverseDepthBuffer&&d&&ct.buffers.depth.setReversed(!0),Nt=new z0(L),vt=new iv,A=new yv(L,et,ct,vt,_t,jt,Nt),b=new L0(x),F=new N0(x),q=new $f(L),de=new R0(L,q),tt=new O0(L,q,Nt,de),j=new V0(L,tt,q,Nt),zt=new k0(L,_t,A),st=new I0(vt),At=new nv(x,b,F,et,_t,de,st),ut=new Cv(x,vt),xt=new rv,te=new uv(et),Ft=new A0(x,b,F,ct,j,f,l),bt=new gv(x,j,_t),D=new Pv(L,Nt,_t,ct),St=new C0(L,et,Nt),ne=new B0(L,et,Nt),Nt.programs=At.programs,x.capabilities=_t,x.extensions=et,x.properties=vt,x.renderLists=xt,x.shadowMap=bt,x.state=ct,x.info=Nt}dt();const W=new Av(x,L);this.xr=W,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(V,K,!1))},this.getSize=function(w){return w.set(V,K)},this.setSize=function(w,U,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,K=U,e.width=Math.floor(w*G),e.height=Math.floor(U*G),z===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(V*G,K*G).floor()},this.setDrawingBufferSize=function(w,U,z){V=w,K=U,G=z,e.width=Math.floor(w*z),e.height=Math.floor(U*z),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(yt)},this.setViewport=function(w,U,z,k){w.isVector4?yt.set(w.x,w.y,w.z,w.w):yt.set(w,U,z,k),ct.viewport(P.copy(yt).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(Bt)},this.setScissor=function(w,U,z,k){w.isVector4?Bt.set(w.x,w.y,w.z,w.w):Bt.set(w,U,z,k),ct.scissor(B.copy(Bt).multiplyScalar(G).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(w){ct.setScissorTest(Jt=w)},this.setOpaqueSort=function(w){rt=w},this.setTransparentSort=function(w){ft=w},this.getClearColor=function(w){return w.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(w=!0,U=!0,z=!0){let k=0;if(w){let N=!1;if(I!==null){const at=I.texture.format;N=at===Il||at===Pl||at===Cl}if(N){const at=I.texture.type,mt=at===$n||at===Ti||at===sr||at===vs||at===Tl||at===Al,Rt=Ft.getClearColor(),Ct=Ft.getClearAlpha(),Vt=Rt.r,Xt=Rt.g,Pt=Rt.b;mt?(g[0]=Vt,g[1]=Xt,g[2]=Pt,g[3]=Ct,L.clearBufferuiv(L.COLOR,0,g)):(v[0]=Vt,v[1]=Xt,v[2]=Pt,v[3]=Ct,L.clearBufferiv(L.COLOR,0,v))}else k|=L.COLOR_BUFFER_BIT}U&&(k|=L.DEPTH_BUFFER_BIT),z&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),xt.dispose(),te.dispose(),vt.dispose(),b.dispose(),F.dispose(),j.dispose(),de.dispose(),D.dispose(),At.dispose(),W.dispose(),W.removeEventListener("sessionstart",Zl),W.removeEventListener("sessionend",Kl),di.stop()};function J(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=Nt.autoReset,U=bt.enabled,z=bt.autoUpdate,k=bt.needsUpdate,N=bt.type;dt(),Nt.autoReset=w,bt.enabled=U,bt.autoUpdate=z,bt.needsUpdate=k,bt.type=N}function pt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Wt(w){const U=w.target;U.removeEventListener("dispose",Wt),be(U)}function be(w){Oe(w),vt.remove(w)}function Oe(w){const U=vt.get(w).programs;U!==void 0&&(U.forEach(function(z){At.releaseProgram(z)}),w.isShaderMaterial&&At.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,z,k,N,at){U===null&&(U=Qt);const mt=N.isMesh&&N.matrixWorld.determinant()<0,Rt=od(w,U,z,k,N);ct.setMaterial(k,mt);let Ct=z.index,Vt=1;if(k.wireframe===!0){if(Ct=tt.getWireframeAttribute(z),Ct===void 0)return;Vt=2}const Xt=z.drawRange,Pt=z.attributes.position;let se=Xt.start*Vt,fe=(Xt.start+Xt.count)*Vt;at!==null&&(se=Math.max(se,at.start*Vt),fe=Math.min(fe,(at.start+at.count)*Vt)),Ct!==null?(se=Math.max(se,0),fe=Math.min(fe,Ct.count)):Pt!=null&&(se=Math.max(se,0),fe=Math.min(fe,Pt.count));const me=fe-se;if(me<0||me===1/0)return;de.setup(N,k,Rt,z,Ct);let Ye,re=St;if(Ct!==null&&(Ye=q.get(Ct),re=ne,re.setIndex(Ye)),N.isMesh)k.wireframe===!0?(ct.setLineWidth(k.wireframeLinewidth*it()),re.setMode(L.LINES)):re.setMode(L.TRIANGLES);else if(N.isLine){let Lt=k.linewidth;Lt===void 0&&(Lt=1),ct.setLineWidth(Lt*it()),N.isLineSegments?re.setMode(L.LINES):N.isLineLoop?re.setMode(L.LINE_LOOP):re.setMode(L.LINE_STRIP)}else N.isPoints?re.setMode(L.POINTS):N.isSprite&&re.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)re.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))re.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Lt=N._multiDrawStarts,In=N._multiDrawCounts,oe=N._multiDrawCount,fn=Ct?q.get(Ct).bytesPerElement:1,Li=vt.get(k).currentProgram.getUniforms();for(let Je=0;Je<oe;Je++)Li.setValue(L,"_gl_DrawID",Je),re.render(Lt[Je]/fn,In[Je])}else if(N.isInstancedMesh)re.renderInstances(se,me,N.count);else if(z.isInstancedBufferGeometry){const Lt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,In=Math.min(z.instanceCount,Lt);re.renderInstances(se,me,In)}else re.render(se,me)};function ae(w,U,z){w.transparent===!0&&w.side===ke&&w.forceSinglePass===!1?(w.side=Ze,w.needsUpdate=!0,xr(w,U,z),w.side=Rn,w.needsUpdate=!0,xr(w,U,z),w.side=ke):xr(w,U,z)}this.compile=function(w,U,z=null){z===null&&(z=w),p=te.get(z),p.init(U),_.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),w!==z&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const k=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const at=N.material;if(at)if(Array.isArray(at))for(let mt=0;mt<at.length;mt++){const Rt=at[mt];ae(Rt,z,N),k.add(Rt)}else ae(at,z,N),k.add(at)}),_.pop(),p=null,k},this.compileAsync=function(w,U,z=null){const k=this.compile(w,U,z);return new Promise(N=>{function at(){if(k.forEach(function(mt){vt.get(mt).currentProgram.isReady()&&k.delete(mt)}),k.size===0){N(w);return}setTimeout(at,10)}et.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let dn=null;function Pn(w){dn&&dn(w)}function Zl(){di.stop()}function Kl(){di.start()}const di=new hu;di.setAnimationLoop(Pn),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(w){dn=w,W.setAnimationLoop(w),w===null?di.stop():di.start()},W.addEventListener("sessionstart",Zl),W.addEventListener("sessionend",Kl),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(U),U=W.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,U,I),p=te.get(w,_.length),p.init(U),_.push(p),Dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Dt),Mt=this.localClippingEnabled,nt=st.init(this.clippingPlanes,Mt),m=xt.get(w,y.length),m.init(),y.push(m),W.enabled===!0&&W.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&Io(at,U,-1/0,x.sortObjects)}Io(w,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,ft),Z=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Z&&Ft.addToRenderList(m,w),this.info.render.frame++,nt===!0&&st.beginShadows();const z=p.state.shadowsArray;bt.render(z,w,U),nt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const at=U.cameras;if(N.length>0)for(let mt=0,Rt=at.length;mt<Rt;mt++){const Ct=at[mt];Ql(k,N,w,Ct)}Z&&Ft.render(w);for(let mt=0,Rt=at.length;mt<Rt;mt++){const Ct=at[mt];Jl(m,w,Ct,Ct.viewport)}}else N.length>0&&Ql(k,N,w,U),Z&&Ft.render(w),Jl(m,w,U);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(x,w,U),de.resetDefaultState(),S=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],nt===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Io(w,U,z,k){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||$.intersectsSprite(w)){k&&Ut.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Dt);const mt=j.update(w),Rt=w.material;Rt.visible&&m.push(w,mt,Rt,z,Ut.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||$.intersectsObject(w))){const mt=j.update(w),Rt=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ut.copy(w.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ut.copy(mt.boundingSphere.center)),Ut.applyMatrix4(w.matrixWorld).applyMatrix4(Dt)),Array.isArray(Rt)){const Ct=mt.groups;for(let Vt=0,Xt=Ct.length;Vt<Xt;Vt++){const Pt=Ct[Vt],se=Rt[Pt.materialIndex];se&&se.visible&&m.push(w,mt,se,z,Ut.z,Pt)}}else Rt.visible&&m.push(w,mt,Rt,z,Ut.z,null)}}const at=w.children;for(let mt=0,Rt=at.length;mt<Rt;mt++)Io(at[mt],U,z,k)}function Jl(w,U,z,k){const N=w.opaque,at=w.transmissive,mt=w.transparent;p.setupLightsView(z),nt===!0&&st.setGlobalState(x.clippingPlanes,z),k&&ct.viewport(P.copy(k)),N.length>0&&vr(N,U,z),at.length>0&&vr(at,U,z),mt.length>0&&vr(mt,U,z),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function Ql(w,U,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new ci(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?fr:$n,minFilter:wi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const at=p.state.transmissionRenderTarget[k.id],mt=k.viewport||P;at.setSize(mt.z,mt.w);const Rt=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(X),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),Z&&Ft.render(z);const Ct=x.toneMapping;x.toneMapping=li;const Vt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),nt===!0&&st.setGlobalState(x.clippingPlanes,k),vr(w,z,k),A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at),et.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Pt=0,se=U.length;Pt<se;Pt++){const fe=U[Pt],me=fe.object,Ye=fe.geometry,re=fe.material,Lt=fe.group;if(re.side===ke&&me.layers.test(k.layers)){const In=re.side;re.side=Ze,re.needsUpdate=!0,tc(me,z,k,Ye,re,Lt),re.side=In,re.needsUpdate=!0,Xt=!0}}Xt===!0&&(A.updateMultisampleRenderTarget(at),A.updateRenderTargetMipmap(at))}x.setRenderTarget(Rt),x.setClearColor(X,Y),Vt!==void 0&&(k.viewport=Vt),x.toneMapping=Ct}function vr(w,U,z){const k=U.isScene===!0?U.overrideMaterial:null;for(let N=0,at=w.length;N<at;N++){const mt=w[N],Rt=mt.object,Ct=mt.geometry,Vt=k===null?mt.material:k,Xt=mt.group;Rt.layers.test(z.layers)&&tc(Rt,U,z,Ct,Vt,Xt)}}function tc(w,U,z,k,N,at){w.onBeforeRender(x,U,z,k,N,at),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(x,U,z,k,w,at),N.transparent===!0&&N.side===ke&&N.forceSinglePass===!1?(N.side=Ze,N.needsUpdate=!0,x.renderBufferDirect(z,U,k,N,w,at),N.side=Rn,N.needsUpdate=!0,x.renderBufferDirect(z,U,k,N,w,at),N.side=ke):x.renderBufferDirect(z,U,k,N,w,at),w.onAfterRender(x,U,z,k,N,at)}function xr(w,U,z){U.isScene!==!0&&(U=Qt);const k=vt.get(w),N=p.state.lights,at=p.state.shadowsArray,mt=N.state.version,Rt=At.getParameters(w,N.state,at,U,z),Ct=At.getProgramCacheKey(Rt);let Vt=k.programs;k.environment=w.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(w.isMeshStandardMaterial?F:b).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Vt===void 0&&(w.addEventListener("dispose",Wt),Vt=new Map,k.programs=Vt);let Xt=Vt.get(Ct);if(Xt!==void 0){if(k.currentProgram===Xt&&k.lightsStateVersion===mt)return nc(w,Rt),Xt}else Rt.uniforms=At.getUniforms(w),w.onBeforeCompile(Rt,x),Xt=At.acquireProgram(Rt,Ct),Vt.set(Ct,Xt),k.uniforms=Rt.uniforms;const Pt=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pt.clippingPlanes=st.uniform),nc(w,Rt),k.needsLights=ld(w),k.lightsStateVersion=mt,k.needsLights&&(Pt.ambientLightColor.value=N.state.ambient,Pt.lightProbe.value=N.state.probe,Pt.directionalLights.value=N.state.directional,Pt.directionalLightShadows.value=N.state.directionalShadow,Pt.spotLights.value=N.state.spot,Pt.spotLightShadows.value=N.state.spotShadow,Pt.rectAreaLights.value=N.state.rectArea,Pt.ltc_1.value=N.state.rectAreaLTC1,Pt.ltc_2.value=N.state.rectAreaLTC2,Pt.pointLights.value=N.state.point,Pt.pointLightShadows.value=N.state.pointShadow,Pt.hemisphereLights.value=N.state.hemi,Pt.directionalShadowMap.value=N.state.directionalShadowMap,Pt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Pt.spotShadowMap.value=N.state.spotShadowMap,Pt.spotLightMatrix.value=N.state.spotLightMatrix,Pt.spotLightMap.value=N.state.spotLightMap,Pt.pointShadowMap.value=N.state.pointShadowMap,Pt.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=Xt,k.uniformsList=null,Xt}function ec(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=oo.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function nc(w,U){const z=vt.get(w);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function od(w,U,z,k,N){U.isScene!==!0&&(U=Qt),A.resetTextureUnits();const at=U.fog,mt=k.isMeshStandardMaterial?U.environment:null,Rt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Es,Ct=(k.isMeshStandardMaterial?F:b).get(k.envMap||mt),Vt=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Xt=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pt=!!z.morphAttributes.position,se=!!z.morphAttributes.normal,fe=!!z.morphAttributes.color;let me=li;k.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(me=x.toneMapping);const Ye=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=Ye!==void 0?Ye.length:0,Lt=vt.get(k),In=p.state.lights;if(nt===!0&&(Mt===!0||w!==M)){const nn=w===M&&k.id===S;st.setState(k,w,nn)}let oe=!1;k.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==In.state.version||Lt.outputColorSpace!==Rt||N.isBatchedMesh&&Lt.batching===!1||!N.isBatchedMesh&&Lt.batching===!0||N.isBatchedMesh&&Lt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Lt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Lt.instancing===!1||!N.isInstancedMesh&&Lt.instancing===!0||N.isSkinnedMesh&&Lt.skinning===!1||!N.isSkinnedMesh&&Lt.skinning===!0||N.isInstancedMesh&&Lt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Lt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Lt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Lt.instancingMorph===!1&&N.morphTexture!==null||Lt.envMap!==Ct||k.fog===!0&&Lt.fog!==at||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==st.numPlanes||Lt.numIntersection!==st.numIntersection)||Lt.vertexAlphas!==Vt||Lt.vertexTangents!==Xt||Lt.morphTargets!==Pt||Lt.morphNormals!==se||Lt.morphColors!==fe||Lt.toneMapping!==me||Lt.morphTargetsCount!==re)&&(oe=!0):(oe=!0,Lt.__version=k.version);let fn=Lt.currentProgram;oe===!0&&(fn=xr(k,U,N));let Li=!1,Je=!1,Cs=!1;const ge=fn.getUniforms(),bn=Lt.uniforms;if(ct.useProgram(fn.program)&&(Li=!0,Je=!0,Cs=!0),k.id!==S&&(S=k.id,Je=!0),Li||M!==w){ct.buffers.depth.getReversed()?(ot.copy(w.projectionMatrix),Mf(ot),bf(ot),ge.setValue(L,"projectionMatrix",ot)):ge.setValue(L,"projectionMatrix",w.projectionMatrix),ge.setValue(L,"viewMatrix",w.matrixWorldInverse);const Zn=ge.map.cameraPosition;Zn!==void 0&&Zn.setValue(L,Ot.setFromMatrixPosition(w.matrixWorld)),_t.logarithmicDepthBuffer&&ge.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ge.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Je=!0,Cs=!0)}if(N.isSkinnedMesh){ge.setOptional(L,N,"bindMatrix"),ge.setOptional(L,N,"bindMatrixInverse");const nn=N.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),ge.setValue(L,"boneTexture",nn.boneTexture,A))}N.isBatchedMesh&&(ge.setOptional(L,N,"batchingTexture"),ge.setValue(L,"batchingTexture",N._matricesTexture,A),ge.setOptional(L,N,"batchingIdTexture"),ge.setValue(L,"batchingIdTexture",N._indirectTexture,A),ge.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&ge.setValue(L,"batchingColorTexture",N._colorsTexture,A));const Ps=z.morphAttributes;if((Ps.position!==void 0||Ps.normal!==void 0||Ps.color!==void 0)&&zt.update(N,z,fn),(Je||Lt.receiveShadow!==N.receiveShadow)&&(Lt.receiveShadow=N.receiveShadow,ge.setValue(L,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(bn.envMap.value=Ct,bn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&U.environment!==null&&(bn.envMapIntensity.value=U.environmentIntensity),Je&&(ge.setValue(L,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&ad(bn,Cs),at&&k.fog===!0&&ut.refreshFogUniforms(bn,at),ut.refreshMaterialUniforms(bn,k,G,K,p.state.transmissionRenderTarget[w.id]),oo.upload(L,ec(Lt),bn,A)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(oo.upload(L,ec(Lt),bn,A),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ge.setValue(L,"center",N.center),ge.setValue(L,"modelViewMatrix",N.modelViewMatrix),ge.setValue(L,"normalMatrix",N.normalMatrix),ge.setValue(L,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const nn=k.uniformsGroups;for(let Zn=0,Kn=nn.length;Zn<Kn;Zn++){const ic=nn[Zn];D.update(ic,fn),D.bind(ic,fn)}}return fn}function ad(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function ld(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,U,z){vt.get(w.texture).__webglTexture=U,vt.get(w.depthTexture).__webglTexture=z;const k=vt.get(w);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=z===void 0,k.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const z=vt.get(w);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,z=0){I=w,T=U,E=z;let k=!0,N=null,at=!1,mt=!1;if(w){const Ct=vt.get(w);if(Ct.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(L.FRAMEBUFFER,null),k=!1;else if(Ct.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(Ct.__hasExternalTextures)A.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Pt=w.depthTexture;if(Ct.__boundDepthTexture!==Pt){if(Pt!==null&&vt.has(Pt)&&(w.width!==Pt.image.width||w.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}const Vt=w.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(mt=!0);const Xt=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xt[U])?N=Xt[U][z]:N=Xt[U],at=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?N=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Xt)?N=Xt[z]:N=Xt,P.copy(w.viewport),B.copy(w.scissor),O=w.scissorTest}else P.copy(yt).multiplyScalar(G).floor(),B.copy(Bt).multiplyScalar(G).floor(),O=Jt;if(ct.bindFramebuffer(L.FRAMEBUFFER,N)&&k&&ct.drawBuffers(w,N),ct.viewport(P),ct.scissor(B),ct.setScissorTest(O),at){const Ct=vt.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ct.__webglTexture,z)}else if(mt){const Ct=vt.get(w.texture),Vt=U||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.__webglTexture,z||0,Vt)}S=-1},this.readRenderTargetPixels=function(w,U,z,k,N,at,mt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&mt!==void 0&&(Rt=Rt[mt]),Rt){ct.bindFramebuffer(L.FRAMEBUFFER,Rt);try{const Ct=w.texture,Vt=Ct.format,Xt=Ct.type;if(!_t.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-k&&z>=0&&z<=w.height-N&&L.readPixels(U,z,k,N,jt.convert(Vt),jt.convert(Xt),at)}finally{const Ct=I!==null?vt.get(I).__webglFramebuffer:null;ct.bindFramebuffer(L.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(w,U,z,k,N,at,mt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&mt!==void 0&&(Rt=Rt[mt]),Rt){const Ct=w.texture,Vt=Ct.format,Xt=Ct.type;if(!_t.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-k&&z>=0&&z<=w.height-N){ct.bindFramebuffer(L.FRAMEBUFFER,Rt);const Pt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.bufferData(L.PIXEL_PACK_BUFFER,at.byteLength,L.STREAM_READ),L.readPixels(U,z,k,N,jt.convert(Vt),jt.convert(Xt),0);const se=I!==null?vt.get(I).__webglFramebuffer:null;ct.bindFramebuffer(L.FRAMEBUFFER,se);const fe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await yf(L,fe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,at),L.deleteBuffer(Pt),L.deleteSync(fe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,z=0){w.isTexture!==!0&&(Xs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const k=Math.pow(2,-z),N=Math.floor(w.image.width*k),at=Math.floor(w.image.height*k),mt=U!==null?U.x:0,Rt=U!==null?U.y:0;A.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,mt,Rt,N,at),ct.unbindTexture()},this.copyTextureToTexture=function(w,U,z=null,k=null,N=0){w.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,z=null);let at,mt,Rt,Ct,Vt,Xt,Pt,se,fe;const me=w.isCompressedTexture?w.mipmaps[N]:w.image;z!==null?(at=z.max.x-z.min.x,mt=z.max.y-z.min.y,Rt=z.isBox3?z.max.z-z.min.z:1,Ct=z.min.x,Vt=z.min.y,Xt=z.isBox3?z.min.z:0):(at=me.width,mt=me.height,Rt=me.depth||1,Ct=0,Vt=0,Xt=0),k!==null?(Pt=k.x,se=k.y,fe=k.z):(Pt=0,se=0,fe=0);const Ye=jt.convert(U.format),re=jt.convert(U.type);let Lt;U.isData3DTexture?(A.setTexture3D(U,0),Lt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),Lt=L.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),Lt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const In=L.getParameter(L.UNPACK_ROW_LENGTH),oe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),fn=L.getParameter(L.UNPACK_SKIP_PIXELS),Li=L.getParameter(L.UNPACK_SKIP_ROWS),Je=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,me.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,me.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ct),L.pixelStorei(L.UNPACK_SKIP_ROWS,Vt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Xt);const Cs=w.isDataArrayTexture||w.isData3DTexture,ge=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const bn=vt.get(w),Ps=vt.get(U),nn=vt.get(bn.__renderTarget),Zn=vt.get(Ps.__renderTarget);ct.bindFramebuffer(L.READ_FRAMEBUFFER,nn.__webglFramebuffer),ct.bindFramebuffer(L.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Kn=0;Kn<Rt;Kn++)Cs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,N,Xt+Kn),w.isDepthTexture?(ge&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.get(U).__webglTexture,N,fe+Kn),L.blitFramebuffer(Ct,Vt,at,mt,Pt,se,at,mt,L.DEPTH_BUFFER_BIT,L.NEAREST)):ge?L.copyTexSubImage3D(Lt,N,Pt,se,fe+Kn,Ct,Vt,at,mt):L.copyTexSubImage2D(Lt,N,Pt,se,fe+Kn,Ct,Vt,at,mt);ct.bindFramebuffer(L.READ_FRAMEBUFFER,null),ct.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(Lt,N,Pt,se,fe,at,mt,Rt,Ye,re,me.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Lt,N,Pt,se,fe,at,mt,Rt,Ye,me.data):L.texSubImage3D(Lt,N,Pt,se,fe,at,mt,Rt,Ye,re,me):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Pt,se,at,mt,Ye,re,me.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Pt,se,me.width,me.height,Ye,me.data):L.texSubImage2D(L.TEXTURE_2D,N,Pt,se,at,mt,Ye,re,me);L.pixelStorei(L.UNPACK_ROW_LENGTH,In),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,fn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Li),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Je),N===0&&U.generateMipmaps&&L.generateMipmap(Lt),ct.unbindTexture()},this.copyTextureToTexture3D=function(w,U,z=null,k=null,N=0){return w.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,k=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0),Xs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,z,k,N)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),ct.unbindTexture()},this.resetState=function(){T=0,E=0,I=null,ct.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class Bl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new wt(t),this.near=e,this.far=n}clone(){return new Bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vu extends ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Re,this.environmentIntensity=1,this.environmentRotation=new Re,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dl,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new R;class fo{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_n(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_n(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_n(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_n(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class xu extends jn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let qi;const Ns=new R,Yi=new R,ji=new R,Zi=new Q,Fs=new Q,_u=new Tt,kr=new R,Os=new R,Vr=new R,ih=new Q,aa=new Q,sh=new Q;class la extends ue{constructor(t=new xu){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lv(e,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new fo(n,3,0,!1)),qi.setAttribute("uv",new fo(n,2,3,!1))}this.geometry=qi,this.material=t,this.center=new Q(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),_u.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-ji.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Hr(kr.set(-.5,-.5,0),ji,o,Yi,i,s),Hr(Os.set(.5,-.5,0),ji,o,Yi,i,s),Hr(Vr.set(.5,.5,0),ji,o,Yi,i,s),ih.set(0,0),aa.set(1,0),sh.set(1,1);let a=t.ray.intersectTriangle(kr,Os,Vr,!1,Ns);if(a===null&&(Hr(Os.set(-.5,.5,0),ji,o,Yi,i,s),aa.set(0,1),a=t.ray.intersectTriangle(kr,Vr,Os,!1,Ns),a===null))return;const l=t.ray.origin.distanceTo(Ns);l<t.near||l>t.far||e.push({distance:l,point:Ns.clone(),uv:an.getInterpolation(Ns,kr,Os,Vr,ih,aa,sh,new Q),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Hr(r,t,e,n,i,s){Zi.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Fs.x=s*Zi.x-i*Zi.y,Fs.y=i*Zi.x+s*Zi.y):Fs.copy(Zi),r.copy(t),r.x+=Fs.x,r.y+=Fs.y,r.applyMatrix4(_u)}const rh=new R,oh=new ee,ah=new ee,Dv=new R,lh=new Tt,Gr=new R,ca=new ui,ch=new Tt,ha=new wo;class Uv extends $t{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lc,this.bindMatrix=new Tt,this.bindMatrixInverse=new Tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new un),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Gr),this.boundingBox.expandByPoint(Gr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ui),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Gr),this.boundingSphere.expandByPoint(Gr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ca.copy(this.boundingSphere),ca.applyMatrix4(i),t.ray.intersectsSphere(ca)!==!1&&(ch.copy(i).invert(),ha.copy(t.ray).applyMatrix4(ch),!(this.boundingBox!==null&&ha.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ha)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ee,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===lc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;oh.fromBufferAttribute(i.attributes.skinIndex,t),ah.fromBufferAttribute(i.attributes.skinWeight,t),rh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=ah.getComponent(s);if(o!==0){const a=oh.getComponent(s);lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Dv.copy(rh).applyMatrix4(lh),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class pl extends ue{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yu extends Ce{constructor(t=null,e=1,n=1,i,s,o,a,l,c=qe,h=qe,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hh=new Tt,Nv=new Tt;class zl{constructor(t=[],e=[]){this.uuid=hn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Tt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Tt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:Nv;hh.multiplyMatrices(a,e[s]),hh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new zl(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new yu(e,t,t,cn,yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new pl),this.bones.push(o),this.boneInverses.push(new Tt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class uh extends Ke{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ki=new Tt,dh=new Tt,Wr=[],fh=new un,Fv=new Tt,Bs=new $t,zs=new ui;class qs extends $t{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new uh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Fv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new un),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),fh.copy(t.boundingBox).applyMatrix4(Ki),this.boundingBox.union(fh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),zs.copy(t.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),t.ray.intersectsSphere(zs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ki),dh.multiplyMatrices(n,Ki),Bs.matrixWorld=dh,Bs.raycast(t,Wr);for(let o=0,a=Wr.length;o<a;o++){const l=Wr[o];l.instanceId=s,l.object=this,e.push(l)}Wr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new uh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yu(new Float32Array(i*this.count),i,this.count,Rl,yn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class kl extends jn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const po=new R,mo=new R,ph=new Tt,ks=new wo,Xr=new ui,ua=new R,mh=new R;class Mu extends ue{constructor(t=new _e,e=new kl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)po.fromBufferAttribute(e,i-1),mo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=po.distanceTo(mo);t.setAttribute("lineDistance",new Ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Xr.radius+=s,t.ray.intersectsSphere(Xr)===!1)return;ph.copy(i).invert(),ks.copy(t.ray).applyMatrix4(ph);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),y=h.getX(v+1),_=$r(this,t,ks,l,p,y);_&&e.push(_)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=$r(this,t,ks,l,v,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=$r(this,t,ks,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=$r(this,t,ks,l,g-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function $r(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(po.fromBufferAttribute(o,i),mo.fromBufferAttribute(o,s),e.distanceSqToSegment(po,mo,ua,mh)>n)return;ua.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(ua);if(!(l<t.near||l>t.far))return{distance:l,point:mh.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}class Ov extends Mu{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Bv extends Ce{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new Q:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,i=[],s=[],o=[],a=new R,l=new Tt;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ue(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Ue(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vl extends Mn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Q){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class zv extends Vl{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Hl(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const qr=new R,da=new Hl,fa=new Hl,pa=new Hl;class Gl extends Mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new R){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(qr.subVectors(i[0],i[1]).add(i[0]),c=qr);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(qr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=qr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),da.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),fa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),pa.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(da.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),fa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),pa.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(da.calc(l),fa.calc(l),pa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new R().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function gh(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function kv(r,t){const e=1-r;return e*e*t}function Vv(r,t){return 2*(1-r)*r*t}function Hv(r,t){return r*r*t}function Ks(r,t,e,n){return kv(r,t)+Vv(r,e)+Hv(r,n)}function Gv(r,t){const e=1-r;return e*e*e*t}function Wv(r,t){const e=1-r;return 3*e*e*r*t}function Xv(r,t){return 3*(1-r)*r*r*t}function $v(r,t){return r*r*r*t}function Js(r,t,e,n,i){return Gv(r,t)+Wv(r,e)+Xv(r,n)+$v(r,i)}class bu extends Mn{constructor(t=new Q,e=new Q,n=new Q,i=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Q){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Js(t,i.x,s.x,o.x,a.x),Js(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qv extends Mn{constructor(t=new R,e=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new R){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Js(t,i.x,s.x,o.x,a.x),Js(t,i.y,s.y,o.y,a.y),Js(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Su extends Mn{constructor(t=new Q,e=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yv extends Mn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wu extends Mn{constructor(t=new Q,e=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Q){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ks(t,i.x,s.x,o.x),Ks(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Eu extends Mn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Ks(t,i.x,s.x,o.x),Ks(t,i.y,s.y,o.y),Ks(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tu extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Q){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(gh(a,l.x,c.x,h.x,u.x),gh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Q().fromArray(i))}return this}}var go=Object.freeze({__proto__:null,ArcCurve:zv,CatmullRomCurve3:Gl,CubicBezierCurve:bu,CubicBezierCurve3:qv,EllipseCurve:Vl,LineCurve:Su,LineCurve3:Yv,QuadraticBezierCurve:wu,QuadraticBezierCurve3:Eu,SplineCurve:Tu});class jv extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new go[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new go[i.type]().fromJSON(i))}return this}}class vh extends jv{constructor(t){super(),this.type="Path",this.currentPoint=new Q,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Su(this.currentPoint.clone(),new Q(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new wu(this.currentPoint.clone(),new Q(t,e),new Q(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new bu(this.currentPoint.clone(),new Q(t,e),new Q(n,i),new Q(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Tu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,o,a,l),this}absellipse(t,e,n,i,s,o,a,l){const c=new Vl(t,e,n,i,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class To extends _e{constructor(t=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ue(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/e,u=new R,d=new Q,f=new R,g=new R,v=new R;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let y=0;y<=e;y++){const _=n+y*h*i,x=Math.sin(_),C=Math.cos(_);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*x,u.y=t[T].y,u.z=t[T].x*C,o.push(u.x,u.y,u.z),d.x=y/e,d.y=T/(t.length-1),a.push(d.x,d.y);const E=l[3*T+0]*x,I=l[3*T+1],S=l[3*T+0]*C;c.push(E,I,S)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){const x=_+y*t.length,C=x,T=x+t.length,E=x+t.length+1,I=x+1;s.push(C,T,I),s.push(E,I,T)}this.setIndex(s),this.setAttribute("position",new Ht(o,3)),this.setAttribute("uv",new Ht(a,2)),this.setAttribute("normal",new Ht(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.points,t.segments,t.phiStart,t.phiLength)}}class vo extends _e{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new R,h=new Q;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(a,3)),this.setAttribute("uv",new Ht(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class hi extends _e{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(f,2));function y(){const x=new R,C=new R;let T=0;const E=(e-t)/n;for(let I=0;I<=s;I++){const S=[],M=I/s,P=M*(e-t)+t;for(let B=0;B<=i;B++){const O=B/i,X=O*l+a,Y=Math.sin(X),V=Math.cos(X);C.x=P*Y,C.y=-M*n+m,C.z=P*V,u.push(C.x,C.y,C.z),x.set(Y,E,V).normalize(),d.push(x.x,x.y,x.z),f.push(O,1-M),S.push(g++)}v.push(S)}for(let I=0;I<i;I++)for(let S=0;S<s;S++){const M=v[S][I],P=v[S+1][I],B=v[S+1][I+1],O=v[S][I+1];(t>0||S!==0)&&(h.push(M,P,O),T+=3),(e>0||S!==s-1)&&(h.push(P,B,O),T+=3)}c.addGroup(p,T,0),p+=T}function _(x){const C=g,T=new Q,E=new R;let I=0;const S=x===!0?t:e,M=x===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const P=g;for(let B=0;B<=i;B++){const X=B/i*l+a,Y=Math.cos(X),V=Math.sin(X);E.x=S*V,E.y=m*M,E.z=S*Y,u.push(E.x,E.y,E.z),d.push(0,M,0),T.x=Y*.5+.5,T.y=V*.5*M+.5,f.push(T.x,T.y),g++}for(let B=0;B<i;B++){const O=C+B,X=P+B;x===!0?h.push(X,X+1,O):h.push(X+1,X,O),I+=3}c.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class we extends hi{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new we(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ao extends _e{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Ht(s,3)),this.setAttribute("normal",new Ht(s.slice(),3)),this.setAttribute("uv",new Ht(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new R,x=new R,C=new R;for(let T=0;T<e.length;T+=3)f(e[T+0],_),f(e[T+1],x),f(e[T+2],C),l(_,x,C,y)}function l(y,_,x,C){const T=C+1,E=[];for(let I=0;I<=T;I++){E[I]=[];const S=y.clone().lerp(x,I/T),M=_.clone().lerp(x,I/T),P=T-I;for(let B=0;B<=P;B++)B===0&&I===T?E[I][B]=S:E[I][B]=S.clone().lerp(M,B/P)}for(let I=0;I<T;I++)for(let S=0;S<2*(T-I)-1;S++){const M=Math.floor(S/2);S%2===0?(d(E[I][M+1]),d(E[I+1][M]),d(E[I][M])):(d(E[I][M+1]),d(E[I+1][M+1]),d(E[I+1][M]))}}function c(y){const _=new R;for(let x=0;x<s.length;x+=3)_.x=s[x+0],_.y=s[x+1],_.z=s[x+2],_.normalize().multiplyScalar(y),s[x+0]=_.x,s[x+1]=_.y,s[x+2]=_.z}function h(){const y=new R;for(let _=0;_<s.length;_+=3){y.x=s[_+0],y.y=s[_+1],y.z=s[_+2];const x=m(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;o.push(x,1-C)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const _=o[y+0],x=o[y+2],C=o[y+4],T=Math.max(_,x,C),E=Math.min(_,x,C);T>.9&&E<.1&&(_<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),C<.2&&(o[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,_){const x=y*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){const y=new R,_=new R,x=new R,C=new R,T=new Q,E=new Q,I=new Q;for(let S=0,M=0;S<s.length;S+=9,M+=6){y.set(s[S+0],s[S+1],s[S+2]),_.set(s[S+3],s[S+4],s[S+5]),x.set(s[S+6],s[S+7],s[S+8]),T.set(o[M+0],o[M+1]),E.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),C.copy(y).add(_).add(x).divideScalar(3);const P=m(C);v(T,M+0,y,P),v(E,M+2,_,P),v(I,M+4,x,P)}}function v(y,_,x,C){C<0&&y.x===1&&(o[_]=y.x-1),x.x===0&&x.z===0&&(o[_]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.vertices,t.indices,t.radius,t.details)}}class Au extends vh{constructor(t){super(t),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new vh().fromJSON(i))}return this}}const Zv={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Ru(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,f;if(n&&(s=ex(r,t,s,e)),r.length>80*e){a=c=r[0],l=h=r[1];for(let g=e;g<i;g+=e)u=r[g],d=r[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return or(s,o,e,a,l,f,0),o}};function Ru(r,t,e,n,i){let s,o;if(i===dx(r,t,e,n)>0)for(s=t;s<e;s+=n)o=xh(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=xh(s,r[s],r[s+1],o);return o&&Ro(o,o.next)&&(lr(o),o=o.next),o}function Ai(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Ro(e,e.next)||Me(e.prev,e,e.next)===0)){if(lr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function or(r,t,e,n,i,s,o){if(!r)return;!o&&s&&ox(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?Jv(r,n,i,s):Kv(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(c.i/e|0),lr(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=Qv(Ai(r),t,e),or(r,t,e,n,i,s,2)):o===2&&tx(r,t,e,n,i,s):or(Ai(r),t,e,n,i,s,1);break}}}function Kv(r){const t=r.prev,e=r,n=r.next;if(Me(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ss(i,a,s,l,o,c,g.x,g.y)&&Me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Jv(r,t,e,n){const i=r.prev,s=r,o=r.next;if(Me(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,h=i.y,u=s.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=ml(f,g,t,e,n),y=ml(v,m,t,e,n);let _=r.prevZ,x=r.nextZ;for(;_&&_.z>=p&&x&&x.z<=y;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ss(a,h,l,u,c,d,_.x,_.y)&&Me(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&ss(a,h,l,u,c,d,x.x,x.y)&&Me(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ss(a,h,l,u,c,d,_.x,_.y)&&Me(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&ss(a,h,l,u,c,d,x.x,x.y)&&Me(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Qv(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!Ro(i,s)&&Cu(i,n,n.next,s)&&ar(i,s)&&ar(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),lr(n),lr(n.next),n=r=s),n=n.next}while(n!==r);return Ai(n)}function tx(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&cx(o,a)){let l=Pu(o,a);o=Ai(o,o.next),l=Ai(l,l.next),or(o,t,e,n,i,s,0),or(l,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function ex(r,t,e,n){const i=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:r.length,c=Ru(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(lx(c));for(i.sort(nx),s=0;s<i.length;s++)e=ix(i[s],e);return e}function nx(r,t){return r.x-t.x}function ix(r,t){const e=sx(r,t);if(!e)return t;const n=Pu(e,r);return Ai(n,n.next),Ai(e,e.next)}function sx(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=l&&s!==e.x&&ss(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),ar(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&rx(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function rx(r,t){return Me(r.prev,r,t.prev)<0&&Me(t.next,r,r.next)<0}function ox(r,t,e,n){let i=r;do i.z===0&&(i.z=ml(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,ax(i)}function ax(r){let t,e,n,i,s,o,a,l,c=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,c*=2}while(o>1);return r}function ml(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function lx(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function ss(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function cx(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!hx(r,t)&&(ar(r,t)&&ar(t,r)&&ux(r,t)&&(Me(r.prev,r,t.prev)||Me(r,t.prev,t))||Ro(r,t)&&Me(r.prev,r,r.next)>0&&Me(t.prev,t,t.next)>0)}function Me(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Ro(r,t){return r.x===t.x&&r.y===t.y}function Cu(r,t,e,n){const i=jr(Me(r,t,e)),s=jr(Me(r,t,n)),o=jr(Me(e,n,r)),a=jr(Me(e,n,t));return!!(i!==s&&o!==a||i===0&&Yr(r,e,t)||s===0&&Yr(r,n,t)||o===0&&Yr(e,r,n)||a===0&&Yr(e,t,n))}function Yr(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function jr(r){return r>0?1:r<0?-1:0}function hx(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Cu(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ar(r,t){return Me(r.prev,r,r.next)<0?Me(r,t,r.next)>=0&&Me(r,r.prev,t)>=0:Me(r,t,r.prev)<0||Me(r,r.next,t)<0}function ux(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Pu(r,t){const e=new gl(r.i,r.x,r.y),n=new gl(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function xh(r,t,e,n){const i=new gl(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function lr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function gl(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function dx(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class us{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return us.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];_h(t),yh(n,t);let o=t.length;e.forEach(_h);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,yh(n,e[l]);const a=Zv.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function _h(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function yh(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Wl extends _e{constructor(t=new Au([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Ht(i,3)),this.setAttribute("uv",new Ht(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:fx;let _,x=!1,C,T,E,I;p&&(_=p.getSpacedPoints(h),x=!0,d=!1,C=p.computeFrenetFrames(h,!1),T=new R,E=new R,I=new R),d||(m=0,f=0,g=0,v=0);const S=a.extractPoints(c);let M=S.shape;const P=S.holes;if(!us.isClockWise(M)){M=M.reverse();for(let Z=0,it=P.length;Z<it;Z++){const L=P[Z];us.isClockWise(L)&&(P[Z]=L.reverse())}}const O=us.triangulateShape(M,P),X=M;for(let Z=0,it=P.length;Z<it;Z++){const L=P[Z];M=M.concat(L)}function Y(Z,it,L){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(it,L)}const V=M.length,K=O.length;function G(Z,it,L){let It,et,_t;const ct=Z.x-it.x,Nt=Z.y-it.y,vt=L.x-Z.x,A=L.y-Z.y,b=ct*ct+Nt*Nt,F=ct*A-Nt*vt;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(b),tt=Math.sqrt(vt*vt+A*A),j=it.x-Nt/q,At=it.y+ct/q,ut=L.x-A/tt,xt=L.y+vt/tt,te=((ut-j)*A-(xt-At)*vt)/(ct*A-Nt*vt);It=j+ct*te-Z.x,et=At+Nt*te-Z.y;const st=It*It+et*et;if(st<=2)return new Q(It,et);_t=Math.sqrt(st/2)}else{let q=!1;ct>Number.EPSILON?vt>Number.EPSILON&&(q=!0):ct<-Number.EPSILON?vt<-Number.EPSILON&&(q=!0):Math.sign(Nt)===Math.sign(A)&&(q=!0),q?(It=-Nt,et=ct,_t=Math.sqrt(b)):(It=ct,et=Nt,_t=Math.sqrt(b/2))}return new Q(It/_t,et/_t)}const rt=[];for(let Z=0,it=X.length,L=it-1,It=Z+1;Z<it;Z++,L++,It++)L===it&&(L=0),It===it&&(It=0),rt[Z]=G(X[Z],X[L],X[It]);const ft=[];let yt,Bt=rt.concat();for(let Z=0,it=P.length;Z<it;Z++){const L=P[Z];yt=[];for(let It=0,et=L.length,_t=et-1,ct=It+1;It<et;It++,_t++,ct++)_t===et&&(_t=0),ct===et&&(ct=0),yt[It]=G(L[It],L[_t],L[ct]);ft.push(yt),Bt=Bt.concat(yt)}for(let Z=0;Z<m;Z++){const it=Z/m,L=f*Math.cos(it*Math.PI/2),It=g*Math.sin(it*Math.PI/2)+v;for(let et=0,_t=X.length;et<_t;et++){const ct=Y(X[et],rt[et],It);ot(ct.x,ct.y,-L)}for(let et=0,_t=P.length;et<_t;et++){const ct=P[et];yt=ft[et];for(let Nt=0,vt=ct.length;Nt<vt;Nt++){const A=Y(ct[Nt],yt[Nt],It);ot(A.x,A.y,-L)}}}const Jt=g+v;for(let Z=0;Z<V;Z++){const it=d?Y(M[Z],Bt[Z],Jt):M[Z];x?(E.copy(C.normals[0]).multiplyScalar(it.x),T.copy(C.binormals[0]).multiplyScalar(it.y),I.copy(_[0]).add(E).add(T),ot(I.x,I.y,I.z)):ot(it.x,it.y,0)}for(let Z=1;Z<=h;Z++)for(let it=0;it<V;it++){const L=d?Y(M[it],Bt[it],Jt):M[it];x?(E.copy(C.normals[Z]).multiplyScalar(L.x),T.copy(C.binormals[Z]).multiplyScalar(L.y),I.copy(_[Z]).add(E).add(T),ot(I.x,I.y,I.z)):ot(L.x,L.y,u/h*Z)}for(let Z=m-1;Z>=0;Z--){const it=Z/m,L=f*Math.cos(it*Math.PI/2),It=g*Math.sin(it*Math.PI/2)+v;for(let et=0,_t=X.length;et<_t;et++){const ct=Y(X[et],rt[et],It);ot(ct.x,ct.y,u+L)}for(let et=0,_t=P.length;et<_t;et++){const ct=P[et];yt=ft[et];for(let Nt=0,vt=ct.length;Nt<vt;Nt++){const A=Y(ct[Nt],yt[Nt],It);x?ot(A.x,A.y+_[h-1].y,_[h-1].x+L):ot(A.x,A.y,u+L)}}}$(),nt();function $(){const Z=i.length/3;if(d){let it=0,L=V*it;for(let It=0;It<K;It++){const et=O[It];Dt(et[2]+L,et[1]+L,et[0]+L)}it=h+m*2,L=V*it;for(let It=0;It<K;It++){const et=O[It];Dt(et[0]+L,et[1]+L,et[2]+L)}}else{for(let it=0;it<K;it++){const L=O[it];Dt(L[2],L[1],L[0])}for(let it=0;it<K;it++){const L=O[it];Dt(L[0]+V*h,L[1]+V*h,L[2]+V*h)}}n.addGroup(Z,i.length/3-Z,0)}function nt(){const Z=i.length/3;let it=0;Mt(X,it),it+=X.length;for(let L=0,It=P.length;L<It;L++){const et=P[L];Mt(et,it),it+=et.length}n.addGroup(Z,i.length/3-Z,1)}function Mt(Z,it){let L=Z.length;for(;--L>=0;){const It=L;let et=L-1;et<0&&(et=Z.length-1);for(let _t=0,ct=h+m*2;_t<ct;_t++){const Nt=V*_t,vt=V*(_t+1),A=it+It+Nt,b=it+et+Nt,F=it+et+vt,q=it+It+vt;Ot(A,b,F,q)}}}function ot(Z,it,L){l.push(Z),l.push(it),l.push(L)}function Dt(Z,it,L){Ut(Z),Ut(it),Ut(L);const It=i.length/3,et=y.generateTopUV(n,i,It-3,It-2,It-1);Qt(et[0]),Qt(et[1]),Qt(et[2])}function Ot(Z,it,L,It){Ut(Z),Ut(it),Ut(It),Ut(it),Ut(L),Ut(It);const et=i.length/3,_t=y.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);Qt(_t[0]),Qt(_t[1]),Qt(_t[3]),Qt(_t[1]),Qt(_t[2]),Qt(_t[3])}function Ut(Z){i.push(l[Z*3+0]),i.push(l[Z*3+1]),i.push(l[Z*3+2])}function Qt(Z){s.push(Z.x),s.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return px(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new go[i.type]().fromJSON(i)),new Wl(n,t.options)}}const fx={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Q(s,o),new Q(a,l),new Q(c,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new Q(o,1-l),new Q(c,1-u),new Q(d,1-g),new Q(v,1-p)]:[new Q(a,1-l),new Q(h,1-u),new Q(f,1-g),new Q(m,1-p)]}};function px(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class cr extends Ao{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cr(t.radius,t.detail)}}class hr extends Ao{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new hr(t.radius,t.detail)}}class Si extends _e{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new R,g=new Q;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=s+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,_=y,x=y+n+1,C=y+n+2,T=y+1;a.push(_,x,T),a.push(x,C,T)}}this.setIndex(a),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(c,3)),this.setAttribute("uv",new Ht(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ds extends _e{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const T=C/e;u.x=-t*Math.cos(i+T*s)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(i+T*s)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(T+x,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const _=h[p][y+1],x=h[p][y],C=h[p+1][y],T=h[p+1][y+1];(p!==0||o>0)&&f.push(_,x,T),(p!==n-1||l<Math.PI)&&f.push(x,C,T)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(v,3)),this.setAttribute("uv",new Ht(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class wn extends _e{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*s,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,y=(i+1)*f+g;o.push(v,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Co extends _e{constructor(t=new Eu(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new Q;let h=new R;const u=[],d=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(f,2));function v(){for(let _=0;_<e;_++)m(_);m(s===!1?e:0),y(),p()}function m(_){h=t.getPointAt(_/e,h);const x=o.normals[_],C=o.binormals[_];for(let T=0;T<=i;T++){const E=T/i*Math.PI*2,I=Math.sin(E),S=-Math.cos(E);l.x=S*x.x+I*C.x,l.y=S*x.y+I*C.y,l.z=S*x.z+I*C.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let x=1;x<=i;x++){const C=(i+1)*(_-1)+(x-1),T=(i+1)*_+(x-1),E=(i+1)*_+x,I=(i+1)*(_-1)+x;g.push(C,T,I),g.push(T,E,I)}}function y(){for(let _=0;_<=e;_++)for(let x=0;x<=i;x++)c.x=_/e,c.y=x/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Co(new go[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Iu extends jn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ma extends jn{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new wt(16777215),this.specular=new wt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class on extends jn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function Zr(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function mx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function gx(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Mh(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let l=0;l!==t;++l)i[o++]=r[a+l]}return i}function Lu(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}class Po{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class vx extends Po{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:es,endingEnd:es}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ns:s=t,a=2*e-n;break;case ho:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ns:o=t,l=2*n-e;break;case ho:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,y=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,_=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let C=0;C!==a;++C)s[C]=p*o[h+C]+y*o[c+C]+_*o[l+C]+x*o[u+C];return s}}class Du extends Po{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class xx extends Po{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Cn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Zr(e,this.TimeBufferType),this.values=Zr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Zr(t.times,Array),values:Zr(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xx(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Du(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new vx(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case co:e=this.InterpolantFactoryMethodDiscrete;break;case ul:e=this.InterpolantFactoryMethodLinear;break;case Do:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return co;case this.InterpolantFactoryMethodLinear:return ul;case this.InterpolantFactoryMethodSmooth:return Do}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&mx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Do,s=t.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const v=e[u+g];if(v!==e[d+g]||v!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=ul;class As extends Cn{constructor(t,e,n){super(t,e,n)}}As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=co;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;class Uu extends Cn{}Uu.prototype.ValueTypeName="color";class ur extends Cn{}ur.prototype.ValueTypeName="number";class _x extends Po{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let h=c+a;c!==h;c+=4)De.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Ms extends Cn{InterpolantFactoryMethodLinear(t){return new _x(this.times,this.values,this.getValueSize(),t)}}Ms.prototype.ValueTypeName="quaternion";Ms.prototype.InterpolantFactoryMethodSmooth=void 0;class Rs extends Cn{constructor(t,e,n){super(t,e,n)}}Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=co;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class bs extends Cn{}bs.prototype.ValueTypeName="vector";class vl{constructor(t="",e=-1,n=[],i=Ll){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=hn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(Mx(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(Cn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=gx(l);l=Mh(l,1,h),c=Mh(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ur(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,v){if(f.length!==0){const m=[],p=[];Lu(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(const v in f){const m=[],p=[];for(let y=0;y!==d[g].morphTargets.length;++y){const _=d[g];m.push(_.time),p.push(_.morphTarget===v?1:0)}i.push(new ur(".morphTargetInfluence["+v+"]",m,p))}l=f.length*o}else{const f=".bones["+e[u].name+"]";n(bs,f+".position",d,"pos",i),n(Ms,f+".quaternion",d,"rot",i),n(bs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function yx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ur;case"vector":case"vector2":case"vector3":case"vector4":return bs;case"color":return Uu;case"quaternion":return Ms;case"bool":case"boolean":return As;case"string":return Rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Mx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=yx(r.type);if(r.times===void 0){const e=[],n=[];Lu(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const xo={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class bx{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Sx=new bx;class Ri{constructor(t){this.manager=t!==void 0?t:Sx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ri.DEFAULT_MATERIAL_NAME="__DEFAULT";const On={};class wx extends Error{constructor(t,e){super(t),this.response=e}}class Ex extends Ri{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=xo.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(On[t]!==void 0){On[t].push({onLoad:e,onProgress:n,onError:i});return}On[t]=[],On[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=On[t],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let v=0;const m=new ReadableStream({start(p){y();function y(){u.read().then(({done:_,value:x})=>{if(_)p.close();else{v+=x.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:f});for(let T=0,E=h.length;T<E;T++){const I=h[T];I.onProgress&&I.onProgress(C)}p.enqueue(x),y()}},_=>{p.error(_)})}}});return new Response(m)}else throw new wx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{xo.add(t,c);const h=On[t];delete On[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=On[t];if(h===void 0)throw this.manager.itemError(t),c;delete On[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Tx extends Ri{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=xo.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=rr("img");function l(){h(),xo.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class Ax extends Ri{constructor(t){super(t)}load(t,e,n,i){const s=new Ce,o=new Tx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class pr extends ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Rx extends pr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ga=new Tt,bh=new R,Sh=new R;class Xl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new Tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fl,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;bh.setFromMatrixPosition(t.matrixWorld),e.position.copy(bh),Sh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Sh),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Cx extends Xl{constructor(){super(new $e(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=_s*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Px extends pr{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Cx}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const wh=new Tt,Vs=new R,va=new R;class Ix extends Xl{constructor(){super(new $e(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),va.copy(n.position),va.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(va),n.updateMatrixWorld(),i.makeTranslation(-Vs.x,-Vs.y,-Vs.z),wh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wh)}}class xl extends pr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ix}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Lx extends Xl{constructor(){super(new uu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nu extends pr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.shadow=new Lx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Fu extends pr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Dx{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Ux{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){De.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;De.multiplyQuaternionsFlat(t,o,t,e,t,n),De.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const $l="\\[\\]\\.:\\/",Nx=new RegExp("["+$l+"]","g"),ql="[^"+$l+"]",Fx="[^"+$l.replace("\\.","")+"]",Ox=/((?:WC+[\/:])*)/.source.replace("WC",ql),Bx=/(WCOD+)?/.source.replace("WCOD",Fx),zx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ql),kx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ql),Vx=new RegExp("^"+Ox+Bx+zx+kx+"$"),Hx=["material","materials","bones","map"];class Gx{constructor(t,e,n){const i=n||ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ie{constructor(t,e,n){this.path=e,this.parsedPath=n||ie.parseTrackName(e),this.node=ie.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ie.Composite(t,e,n):new ie(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Nx,"")}static parseTrackName(t){const e=Vx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Hx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ie.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ie.Composite=Gx;ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ie.prototype.GetterByBindingType=[ie.prototype._getValue_direct,ie.prototype._getValue_array,ie.prototype._getValue_arrayElement,ie.prototype._getValue_toArray];ie.prototype.SetterByBindingTypeAndVersioning=[[ie.prototype._setValue_direct,ie.prototype._setValue_direct_setNeedsUpdate,ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_array,ie.prototype._setValue_array_setNeedsUpdate,ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_arrayElement,ie.prototype._setValue_arrayElement_setNeedsUpdate,ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_fromArray,ie.prototype._setValue_fromArray_setNeedsUpdate,ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Wx{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),l={endingStart:es,endingEnd:es};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=tu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const l=(t-s)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Wd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Ll:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===Gd;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===Hd){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=ns,i.endingEnd=ns):(t?i.endingStart=this.zeroSlopeAtStart?ns:es:i.endingStart=ho,e?i.endingEnd=this.zeroSlopeAtEnd?ns:es:i.endingEnd=ho)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=e,a[1]=s+t,l[1]=n,this}}const Xx=new Float32Array(1);class $x extends Ii{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const v=e&&e._propertyBindings[u].binding.parsedPath;g=new Ux(ie.create(n,f,v),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Du(new Float32Array(2),new Float32Array(2),1,Xx),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?vl.findByName(i,t):t;const a=o!==null?o.uuid:t,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ll),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new Wx(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?vl.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Eh=new Tt;class Ou{constructor(t,e,n=0,i=1/0){this.ray=new wo(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ul,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Eh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Eh),this}intersectObject(t,e=!0,n=[]){return _l(t,this,n,e),n.sort(Th),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)_l(t[i],this,n,e);return n.sort(Th),n}}function Th(r,t){return r.distance-t.distance}function _l(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)_l(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wl);const Yt={match:{daySeconds:60,nightSeconds:100},lobby:{codeLength:5},units:{human:{hp:100,speed:7,carry:10,gatherRate:2.5,attackDamage:4,attackRange:1.6,attackCooldown:1,buildRate:1},peon:{hp:100,speed:7,carry:10,gatherRate:2.5,attackDamage:4,attackRange:1.6,attackCooldown:1,buildRate:1},vampire:{speedDay:6,speedNight:9.5,attackDamage:50,dayDamageMultiplier:.4,attackCooldown:1.1,minAttackCooldown:.45,cryptRadius:14}},buildings:{bank:{hp:500,size:6,cost:{wood:0,gold:0,time:5},maxLevel:6,goldPerCycle:5,cycleSecondsByLevel:{1:5,2:4,3:3,4:2,5:1.5,6:1},upgradeCosts:{1:{wood:40,gold:30},2:{wood:60,gold:60},3:{wood:90,gold:120},4:{wood:130,gold:240},5:{wood:180,gold:450}}},taverna:{hp:500,size:6,cost:{wood:40,gold:20,time:5},recruit:{wood:0,gold:50,time:2}},wall:{hp:400,size:2,cost:{wood:15,gold:0,time:2},maxLevel:3,hpPerLevel:{1:400,2:800,3:1200},upgradeCosts:{1:{wood:60,gold:20},2:{wood:120,gold:40}}},tower:{hp:300,size:3,cost:{wood:30,gold:40,time:2},range:15,damage:10,cooldown:2},keep:{hp:1200,size:7,cost:{wood:150,gold:60,time:12}},crypt:{hp:4e3,size:8,shopRange:3},forge:{hp:1400,size:5,shopRange:3},relic:{hp:1400,size:5,shopRange:3},mist:{hp:1400,size:5,shopRange:3},shrine:{hp:1400,size:5,shopRange:3}},buildable:["bank","taverna","wall","tower"],vampireItems:{claws:{name:"Garras Sangrentas",icon:"⚔",shop:"forge",baseCost:50,costGrowth:1.4,damageBonus:10,healthBonus:0,speedBonus:0,cooldownFactor:1,maxCount:1/0},heart:{name:"Coração Ancestral",icon:"♥",shop:"relic",baseCost:75,costGrowth:1.4,damageBonus:0,healthBonus:300,speedBonus:0,cooldownFactor:1,maxCount:1/0},boots:{name:"Botas da Névoa",icon:"🥾",shop:"mist",baseCost:30,costGrowth:1.4,damageBonus:0,healthBonus:0,speedBonus:.5,cooldownFactor:1,maxCount:1/0},frenzy:{name:"Frenesi",icon:"🌀",shop:"shrine",baseCost:30,costGrowth:1.4,damageBonus:0,healthBonus:0,speedBonus:0,cooldownFactor:.93,maxCount:1/0}},vampireSkills:{powerStrike:{name:"Golpe Sombrio",icon:"💥",unlockCost:80,damageMultiplier:2,duration:8,cooldown:50,description:"Dobra o dano por 8s"}},market:{wood:10,gold:10},camera:{distance:90,initialZoom:.45,minZoom:.3,maxZoom:.6,wheelSensitivity:4e-4,elevation:.75,depth:.62,panSpeed:60,smoothing:6,fov:50},admin:{defaultResourceAmount:1e3,maxResourceAmount:1e5},interaction:{unitRadius:.55,resourceBuildClearance:2},map:{version:1,tiles:144,tileSize:2,humanSpawns:[{x:-3,z:-3},{x:3,z:-3},{x:-3,z:3},{x:3,z:3}],crypt:{x:0,z:-127},vampireShops:[{kind:"forge",x:-8,z:-134},{kind:"relic",x:8,z:-134},{kind:"mist",x:-11,z:-127},{kind:"shrine",x:11,z:-127}],refugeWalls:{thickness:3.2,entranceWidth:3,height:5.5},refuges:[{name:"Clareira dos Pinheiros",x:-66,z:-74,width:42,depth:38,facing:"south"},{name:"Refúgio da Pedreira",x:0,z:-76,width:44,depth:40,facing:"south"},{name:"Bosque da Lua",x:66,z:-74,width:40,depth:44,facing:"south"},{name:"Abrigo do Poente",x:-104,z:0,width:40,depth:46,facing:"east"},{name:"Clareira da Aurora",x:104,z:0,width:40,depth:42,facing:"west"},{name:"Refúgio dos Corvos",x:-66,z:76,width:46,depth:40,facing:"north"},{name:"Vale das Cinzas",x:0,z:78,width:40,depth:42,facing:"north"},{name:"Bosque da Névoa",x:66,z:74,width:42,depth:44,facing:"north"}],forests:[{x:-116,z:-86,rx:18,rz:40},{x:116,z:-86,rx:18,rz:40},{x:-116,z:86,rx:18,rz:40},{x:116,z:86,rx:18,rz:40},{x:-52,z:-117,rx:43,rz:16},{x:52,z:-117,rx:43,rz:16},{x:-50,z:116,rx:45,rz:18},{x:50,z:116,rx:45,rz:18},{x:-38,z:0,rx:16,rz:22},{x:38,z:0,rx:16,rz:22},{x:-65,z:-36,rx:25,rz:12},{x:65,z:-36,rx:25,rz:12},{x:-65,z:36,rx:25,rz:12},{x:65,z:36,rx:25,rz:12}],lakes:[{x:104,z:-43,rx:14,rz:10},{x:-104,z:43,rx:14,rz:10}],resources:{centralWoodX:[-22,22],centralWoodZ:[-12,-6,0,6,12],centralGold:[{x:-12,z:-19},{x:12,z:-19},{x:-12,z:19},{x:12,z:19}],forestNodeSpacing:9}}},he={get tiles(){return Yt.map.tiles},get tileSize(){return Yt.map.tileSize},get half(){return this.tiles*this.tileSize/2}},Bu=Yt.match.daySeconds,zu=Yt.match.nightSeconds,Qs=Yt.map.humanSpawns.length,en=Qs,xa=Qs+1,qx=Yt.units.human,Yx=Yt.units.peon;function Hs(r){return r.hero===!1?Yx:qx}const Ci=Yt.units.vampire,jx=Ci.cryptRadius,rs=Yt.buildings.tower,_o=Yt.buildings.wall,Ss=Yt.buildings.bank,Zx=Yt.buildings.taverna,Hn=Yt.vampireItems,os=Yt.vampireSkills,Kx=Yt.map.vampireShops,Jx=["crypt",...Kx.map(r=>r.kind)];function Qx(r){const t=Yt.buildings[r];return(t==null?void 0:t.shopRange)??3}const Gs=Zx.recruit,ku=Yt.buildable,Ji=Yt.market,yl=Yt.interaction,Ml=Object.fromEntries(Object.entries(Yt.buildings).filter(([,r])=>"cost"in r).map(([r,t])=>[r,"cost"in t?t.cost:void 0])),Pi=Object.fromEntries(Object.entries(Yt.buildings).map(([r,t])=>[r,t.size])),t_=Ss.maxLevel,e_=Ss.upgradeCosts,Ah=_o.maxLevel,n_=_o.upgradeCosts;function _a(r){return _o.hpPerLevel[Math.min(_o.maxLevel,Math.max(1,Math.floor(r)))]}function i_(){return Ss.goldPerCycle}function s_(r){return Ss.cycleSecondsByLevel[Math.min(Ss.maxLevel,Math.max(1,Math.floor(r)))]}const Rh=Yt.map.version,En=Yt.map.crypt,ws=Yt.map.refuges;function r_(r){const t=Yt.map.refugeWalls.thickness,e=Yt.map.refugeWalls.entranceWidth,n=[];for(const i of["north","south","east","west"]){const s=i==="north"||i==="south",o=(s?r.width:r.depth)/2,a=(s?r.depth:r.width)/2,l=i==="north"||i==="west"?-1:1,c=i===r.facing?[{offset:-(o+e/2)/2,length:o-e/2},{offset:(o+e/2)/2,length:o-e/2}]:[{offset:0,length:2*o+t}];for(const h of c)n.push({x:r.x+(s?h.offset:l*a),z:r.z+(s?l*a:h.offset),width:s?h.length:t,depth:s?t:h.length,height:Yt.map.refugeWalls.height})}return n}function Yl(r){return{x:r.x+(r.facing==="east"?r.width/2:r.facing==="west"?-r.width/2:0),z:r.z+(r.facing==="south"?r.depth/2:r.facing==="north"?-r.depth/2:0)}}const Vu=Yt.map.forests;function Ch(r,t){let e=Math.imul(r,374761393)+Math.imul(t,668265263)|0;return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967295}const o_=(()=>{const r=[],t=Yt.map.resources.forestNodeSpacing,e=he.half-4;for(let n=-e;n<=e;n+=t)for(let i=-e;i<=e;i+=t){const s=(Ch(Math.round(n*10),Math.round(i*10))-.5)*t*.55,o=(Ch(Math.round(i*10),Math.round(n*10))-.5)*t*.55,a=Math.round((n+s)*2)/2,l=Math.round((i+o)*2)/2;Vu.some(c=>((a-c.x)/c.rx)**2+((l-c.z)/c.rz)**2<1)&&(Yt.map.lakes.some(c=>((a-c.x)/c.rx)**2+((l-c.z)/c.rz)**2<1)||Math.hypot(En.x-a,En.z-l)<18||ws.some(c=>Math.abs(c.x-a)<c.width/2+3&&Math.abs(c.z-l)<c.depth/2+3)||r.push({kind:"wood",x:a,z:l}))}return r})(),a_=ws.map(r=>{const t=Yl(r),e=r.facing==="east"?{x:1,z:0}:r.facing==="west"?{x:-1,z:0}:r.facing==="south"?{x:0,z:1}:{x:0,z:-1};return{kind:"gold",x:t.x+e.x*9,z:t.z+e.z*9}});[...Yt.map.resources.centralWoodX.flatMap(r=>Yt.map.resources.centralWoodZ.map(t=>({kind:"wood",x:r,z:t}))),...Yt.map.resources.centralGold.map(r=>({kind:"gold",...r})),...a_,...o_];function l_(r=Rh){const t=he.tiles,e=new Float32Array(t*t),n=new Uint8Array(t*t),i=new Float32Array(t*t);for(let s=0;s<t;s++)for(let o=0;o<t;o++){const a=Ph(o),l=Ph(s),c=s*t+o;let u=(3+Math.max(0,Math.max(Math.abs(a),Math.abs(l))-(he.half-17))*.6)/14;const d=Math.hypot(a-En.x,l-En.z),f=17,g=7;if(d<f+g){const v=d<=f?0:(d-f)/g,m=v*v*(3-2*v);u=u*m+3/14*(1-m)}e[c]=u,Yt.map.lakes.some(v=>((a-v.x)/v.rx)**2+((l-v.z)/v.rz)**2<1)&&(n[c]=1),Vu.some(v=>((a-v.x)/v.rx)**2+((l-v.z)/v.rz)**2<1)&&(i[c]=.8)}return{seed:Rh,tiles:t,height:e,water:n,forest:i,obstacles:ws.flatMap(r_)}}function Ph(r){return(r-he.tiles/2)*he.tileSize+he.tileSize/2}function Kr(r){return Math.floor((r+he.half)/he.tileSize)}const Ih=yl.unitRadius;function c_(r,t,e,n,i){const s=Pi[e]/2;if(!Number.isFinite(s)||!Number.isFinite(n)||!Number.isFinite(i)||Math.abs(n)+s>=he.half||Math.abs(i)+s>=he.half)return!1;for(let o=Kr(n-s);o<=Kr(n+s);o++)for(let a=Kr(i-s);a<=Kr(i+s);a++)if(o<0||a<0||o>=r.tiles||a>=r.tiles||r.water[a*r.tiles+o]===1)return!1;for(const o of r.obstacles)if(Math.abs(o.x-n)<o.width/2+s&&Math.abs(o.z-i)<o.depth/2+s)return!1;for(const o of t.buildings){const a=Pi[o.kind]/2;if(Math.abs(o.x-n)<a+s&&Math.abs(o.z-i)<a+s)return!1}for(const o of t.nodes)if(o.amount>0&&Math.abs(o.x-n)<s+yl.resourceBuildClearance&&Math.abs(o.z-i)<s+yl.resourceBuildClearance)return!1;return!t.units.some(o=>!o.dead&&Math.abs(o.x-n)<s+Ih&&Math.abs(o.z-i)<s+Ih)}function jl(r={}){let t=0,e=0,n=0,i=1;for(const s of Object.keys(Hn)){const o=r[s]??0;if(!o)continue;const a=Hn[s];t+=a.damageBonus*o,e+=a.healthBonus*o,n+=a.speedBonus*o,i*=Math.pow(a.cooldownFactor,o)}return{damage:t,health:e,moveSpeed:n,cooldownMult:i}}function Lh(r,t){const e=Hn[r];return Math.floor(e.baseCost*Math.pow(e.costGrowth,t))}function h_(r,t={}){return(r==="night"?Ci.speedNight:Ci.speedDay)+jl(t).moveSpeed}function u_(r={}){return Math.max(Ci.minAttackCooldown,Ci.attackCooldown*jl(r).cooldownMult)}function d_(r={}){var t;for(const e of Object.keys(os))if((((t=r[e])==null?void 0:t.buff)??0)>0)return os[e].damageMultiplier;return 1}function f_(r){return Jx.includes(r)}function ya(r,t,e,n){if(r!=="day")return"As lojas do Vampiro só abrem durante o dia";if(!t||t.kind!=="vampire"||t.hp<=0)return"Vampiro indisponível";if(!e||!f_(e.kind)||!e.done||e.hp<=0)return"Loja indisponível";if(n&&Math.hypot(t.x-n.x,t.z-n.z)<=jx)return null;const i=Pi[e.kind]/2;return Math.max(0,Math.hypot(t.x-e.x,t.z-e.z)-i)>Qx(e.kind)?"Aproxime o Vampiro da base para comprar":null}function p_(r,t=!1){const e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,l=new _e;let c=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Dh(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const g=Dh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Dh(r){let t,e,n,i=-1,s=0;for(let c=0;c<r.length;++c){const h=r[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),a=new Ke(o,e,n);let l=0;for(let c=0;c<r.length;++c){const h=r[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);a.setComponent(d+u,g,v)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var ln=Uint8Array,as=Uint16Array,m_=Int32Array,Hu=new ln([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Gu=new ln([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),g_=new ln([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Wu=function(r,t){for(var e=new as(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var i=new m_(e[30]),n=1;n<30;++n)for(var s=e[n];s<e[n+1];++s)i[s]=s-e[n]<<5|n;return{b:e,r:i}},Xu=Wu(Hu,2),$u=Xu.b,v_=Xu.r;$u[28]=258,v_[258]=28;var x_=Wu(Gu,0),__=x_.b,bl=new as(32768);for(var xe=0;xe<32768;++xe){var si=(xe&43690)>>1|(xe&21845)<<1;si=(si&52428)>>2|(si&13107)<<2,si=(si&61680)>>4|(si&3855)<<4,bl[xe]=((si&65280)>>8|(si&255)<<8)>>1}var tr=function(r,t,e){for(var n=r.length,i=0,s=new as(t);i<n;++i)r[i]&&++s[r[i]-1];var o=new as(t);for(i=1;i<t;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(e){a=new as(1<<t);var l=15-t;for(i=0;i<n;++i)if(r[i])for(var c=i<<4|r[i],h=t-r[i],u=o[r[i]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)a[bl[u]>>l]=c}else for(a=new as(n),i=0;i<n;++i)r[i]&&(a[i]=bl[o[r[i]-1]++]>>15-r[i]);return a},mr=new ln(288);for(var xe=0;xe<144;++xe)mr[xe]=8;for(var xe=144;xe<256;++xe)mr[xe]=9;for(var xe=256;xe<280;++xe)mr[xe]=7;for(var xe=280;xe<288;++xe)mr[xe]=8;var qu=new ln(32);for(var xe=0;xe<32;++xe)qu[xe]=5;var y_=tr(mr,9,1),M_=tr(qu,5,1),Ma=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},vn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},ba=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},b_=function(r){return(r+7)/8|0},S_=function(r,t,e){return(e==null||e>r.length)&&(e=r.length),new ln(r.subarray(t,e))},w_=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],xn=function(r,t,e){var n=new Error(t||w_[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,xn),!e)throw n;return n},E_=function(r,t,e,n){var i=r.length,s=0;if(!i||t.f&&!t.l)return e||new ln(0);var o=!e,a=o||t.i!=2,l=t.i;o&&(e=new ln(i*3));var c=function(Qt){var Z=e.length;if(Qt>Z){var it=new ln(Math.max(Z*2,Qt));it.set(e),e=it}},h=t.f||0,u=t.p||0,d=t.b||0,f=t.l,g=t.d,v=t.m,m=t.n,p=i*8;do{if(!f){h=vn(r,u,1);var y=vn(r,u+1,3);if(u+=3,y)if(y==1)f=y_,g=M_,v=9,m=5;else if(y==2){var T=vn(r,u,31)+257,E=vn(r,u+10,15)+4,I=T+vn(r,u+5,31)+1;u+=14;for(var S=new ln(I),M=new ln(19),P=0;P<E;++P)M[g_[P]]=vn(r,u+P*3,7);u+=E*3;for(var B=Ma(M),O=(1<<B)-1,X=tr(M,B,1),P=0;P<I;){var Y=X[vn(r,u,O)];u+=Y&15;var _=Y>>4;if(_<16)S[P++]=_;else{var V=0,K=0;for(_==16?(K=3+vn(r,u,3),u+=2,V=S[P-1]):_==17?(K=3+vn(r,u,7),u+=3):_==18&&(K=11+vn(r,u,127),u+=7);K--;)S[P++]=V}}var G=S.subarray(0,T),rt=S.subarray(T);v=Ma(G),m=Ma(rt),f=tr(G,v,1),g=tr(rt,m,1)}else xn(1);else{var _=b_(u)+4,x=r[_-4]|r[_-3]<<8,C=_+x;if(C>i){l&&xn(0);break}a&&c(d+x),e.set(r.subarray(_,C),d),t.b=d+=x,t.p=u=C*8,t.f=h;continue}if(u>p){l&&xn(0);break}}a&&c(d+131072);for(var ft=(1<<v)-1,yt=(1<<m)-1,Bt=u;;Bt=u){var V=f[ba(r,u)&ft],Jt=V>>4;if(u+=V&15,u>p){l&&xn(0);break}if(V||xn(2),Jt<256)e[d++]=Jt;else if(Jt==256){Bt=u,f=null;break}else{var $=Jt-254;if(Jt>264){var P=Jt-257,nt=Hu[P];$=vn(r,u,(1<<nt)-1)+$u[P],u+=nt}var Mt=g[ba(r,u)&yt],ot=Mt>>4;Mt||xn(3),u+=Mt&15;var rt=__[ot];if(ot>3){var nt=Gu[ot];rt+=ba(r,u)&(1<<nt)-1,u+=nt}if(u>p){l&&xn(0);break}a&&c(d+131072);var Dt=d+$;if(d<rt){var Ot=s-rt,Ut=Math.min(rt,Dt);for(Ot+d<0&&xn(3);d<Ut;++d)e[d]=n[Ot+d]}for(;d<Dt;++d)e[d]=e[d-rt]}}t.l=f,t.p=Bt,t.b=d,t.f=h,f&&(h=1,t.m=v,t.d=g,t.n=m)}while(!h);return d!=e.length&&o?S_(e,0,d):e.subarray(0,d)},T_=new ln(0),A_=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&xn(6,"invalid zlib data"),(r[1]>>5&1)==1&&xn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function R_(r,t){return E_(r.subarray(A_(r),-4),{i:2},t,t)}var C_=typeof TextDecoder<"u"&&new TextDecoder,P_=0;try{C_.decode(T_,{stream:!0}),P_=1}catch{}function Yu(r,t,e){const n=e.length-r-1;if(t>=e[n])return n-1;if(t<=e[r])return r;let i=r,s=n,o=Math.floor((i+s)/2);for(;t<e[o]||t>=e[o+1];)t<e[o]?s=o:i=o,o=Math.floor((i+s)/2);return o}function I_(r,t,e,n){const i=[],s=[],o=[];i[0]=1;for(let a=1;a<=e;++a){s[a]=t-n[r+1-a],o[a]=n[r+a]-t;let l=0;for(let c=0;c<a;++c){const h=o[c+1],u=s[a-c],d=i[c]/(h+u);i[c]=l+h*d,l=u*d}i[a]=l}return i}function L_(r,t,e,n){const i=Yu(r,n,t),s=I_(i,n,r,t),o=new ee(0,0,0,0);for(let a=0;a<=r;++a){const l=e[i-r+a],c=s[a],h=l.w*c;o.x+=l.x*h,o.y+=l.y*h,o.z+=l.z*h,o.w+=l.w*c}return o}function D_(r,t,e,n,i){const s=[];for(let u=0;u<=e;++u)s[u]=0;const o=[];for(let u=0;u<=n;++u)o[u]=s.slice(0);const a=[];for(let u=0;u<=e;++u)a[u]=s.slice(0);a[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let u=1;u<=e;++u){l[u]=t-i[r+1-u],c[u]=i[r+u]-t;let d=0;for(let f=0;f<u;++f){const g=c[f+1],v=l[u-f];a[u][f]=g+v;const m=a[f][u-1]/a[u][f];a[f][u]=d+g*m,d=v*m}a[u][u]=d}for(let u=0;u<=e;++u)o[0][u]=a[u][e];for(let u=0;u<=e;++u){let d=0,f=1;const g=[];for(let v=0;v<=e;++v)g[v]=s.slice(0);g[0][0]=1;for(let v=1;v<=n;++v){let m=0;const p=u-v,y=e-v;u>=v&&(g[f][0]=g[d][0]/a[y+1][p],m=g[f][0]*a[p][y]);const _=p>=-1?1:-p,x=u-1<=y?v-1:e-u;for(let T=_;T<=x;++T)g[f][T]=(g[d][T]-g[d][T-1])/a[y+1][p+T],m+=g[f][T]*a[p+T][y];u<=y&&(g[f][v]=-g[d][v-1]/a[y+1][u],m+=g[f][v]*a[u][y]),o[v][u]=m;const C=d;d=f,f=C}}let h=e;for(let u=1;u<=n;++u){for(let d=0;d<=e;++d)o[u][d]*=h;h*=e-u}return o}function U_(r,t,e,n,i){const s=i<r?i:r,o=[],a=Yu(r,n,t),l=D_(a,n,r,s,t),c=[];for(let h=0;h<e.length;++h){const u=e[h].clone(),d=u.w;u.x*=d,u.y*=d,u.z*=d,c[h]=u}for(let h=0;h<=s;++h){const u=c[a-r].clone().multiplyScalar(l[h][0]);for(let d=1;d<=r;++d)u.add(c[a-r+d].clone().multiplyScalar(l[h][d]));o[h]=u}for(let h=s+1;h<=i+1;++h)o[h]=new ee(0,0,0);return o}function N_(r,t){let e=1;for(let i=2;i<=r;++i)e*=i;let n=1;for(let i=2;i<=t;++i)n*=i;for(let i=2;i<=r-t;++i)n*=i;return e/n}function F_(r){const t=r.length,e=[],n=[];for(let s=0;s<t;++s){const o=r[s];e[s]=new R(o.x,o.y,o.z),n[s]=o.w}const i=[];for(let s=0;s<t;++s){const o=e[s].clone();for(let a=1;a<=s;++a)o.sub(i[s-a].clone().multiplyScalar(N_(s,a)*n[a]));i[s]=o.divideScalar(n[0])}return i}function O_(r,t,e,n,i){const s=U_(r,t,e,n,i);return F_(s)}class B_ extends Mn{constructor(t,e,n,i,s){super();const o=e?e.length-1:0,a=n?n.length:0;this.degree=t,this.knots=e,this.controlPoints=[],this.startKnot=i||0,this.endKnot=s||o;for(let l=0;l<a;++l){const c=n[l];this.controlPoints[l]=new ee(c.x,c.y,c.z,c.w)}}getPoint(t,e=new R){const n=e,i=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=L_(this.degree,this.knots,this.controlPoints,i);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(t,e=new R){const n=e,i=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),s=O_(this.degree,this.knots,this.controlPoints,i,1);return n.copy(s[1]).normalize(),n}toJSON(){const t=super.toJSON();return t.degree=this.degree,t.knots=[...this.knots],t.controlPoints=this.controlPoints.map(e=>e.toArray()),t.startKnot=this.startKnot,t.endKnot=this.endKnot,t}fromJSON(t){return super.fromJSON(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>new ee(e[0],e[1],e[2],e[3])),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}}let Kt,Ee,We;class z_ extends Ri{constructor(t){super(t)}load(t,e,n,i){const s=this,o=s.path===""?Dx.extractUrlBase(t):s.path,a=new Ex(this.manager);a.setPath(s.path),a.setResponseType("arraybuffer"),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(l){try{e(s.parse(l,o))}catch(c){i?i(c):console.error(c),s.manager.itemError(t)}},n,i)}parse(t,e){if(X_(t))Kt=new W_().parse(t);else{const i=Ku(t);if(!$_(i))throw new Error("THREE.FBXLoader: Unknown format.");if(Nh(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Nh(i));Kt=new G_().parse(i)}const n=new Ax(this.manager).setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);return new k_(n,this.manager).parse(Kt)}}class k_{constructor(t,e){this.textureLoader=t,this.manager=e}parse(){Ee=this.parseConnections();const t=this.parseImages(),e=this.parseTextures(t),n=this.parseMaterials(e),i=this.parseDeformers(),s=new V_().parse(i);return this.parseScene(i,s,n),We}parseConnections(){const t=new Map;return"Connections"in Kt&&Kt.Connections.connections.forEach(function(n){const i=n[0],s=n[1],o=n[2];t.has(i)||t.set(i,{parents:[],children:[]});const a={ID:s,relationship:o};t.get(i).parents.push(a),t.has(s)||t.set(s,{parents:[],children:[]});const l={ID:i,relationship:o};t.get(s).children.push(l)}),t}parseImages(){const t={},e={};if("Video"in Kt.Objects){const n=Kt.Objects.Video;for(const i in n){const s=n[i],o=parseInt(i);if(t[o]=s.RelativeFilename||s.Filename,"Content"in s){const a=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(a||l){const c=this.parseImage(n[i]);e[s.RelativeFilename||s.Filename]=c}}}}for(const n in t){const i=t[n];e[i]!==void 0?t[n]=e[i]:t[n]=t[n].split("\\").pop()}return t}parseImage(t){const e=t.Content,n=t.RelativeFilename||t.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(i){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof e=="string")return"data:"+s+";base64,"+e;{const o=new Uint8Array(e);return window.URL.createObjectURL(new Blob([o],{type:s}))}}parseTextures(t){const e=new Map;if("Texture"in Kt.Objects){const n=Kt.Objects.Texture;for(const i in n){const s=this.parseTexture(n[i],t);e.set(parseInt(i),s)}}return e}parseTexture(t,e){const n=this.loadTexture(t,e);n.ID=t.id,n.name=t.attrName;const i=t.WrapModeU,s=t.WrapModeV,o=i!==void 0?i.value:0,a=s!==void 0?s.value:0;if(n.wrapS=o===0?ir:kn,n.wrapT=a===0?ir:kn,"Scaling"in t){const l=t.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in t){const l=t.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(t,e){const n=new Set(["tga","tif","tiff","exr","dds","hdr","ktx2"]),i=t.FileName.split(".").pop().toLowerCase(),s=n.has(i)?this.manager.getHandler(`.${i}`):this.textureLoader;if(!s)return console.warn(`FBXLoader: ${i.toUpperCase()} loader not found, creating placeholder texture for`,t.RelativeFilename),new Ce;const o=s.path;o||s.setPath(this.textureLoader.path);const a=Ee.get(t.id).children;let l;a!==void 0&&a.length>0&&e[a[0].ID]!==void 0&&(l=e[a[0].ID],(l.indexOf("blob:")===0||l.indexOf("data:")===0)&&s.setPath(void 0));const c=s.load(l);return s.setPath(o),c}parseMaterials(t){const e=new Map;if("Material"in Kt.Objects){const n=Kt.Objects.Material;for(const i in n){const s=this.parseMaterial(n[i],t);s!==null&&e.set(parseInt(i),s)}}return e}parseMaterial(t,e){const n=t.id,i=t.attrName;let s=t.ShadingModel;if(typeof s=="object"&&(s=s.value),!Ee.has(n))return null;const o=this.parseParameters(t,e,n);let a;switch(s.toLowerCase()){case"phong":a=new ma;break;case"lambert":a=new on;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),a=new ma;break}return a.setValues(o),a.name=i,a}parseParameters(t,e,n){const i={};t.BumpFactor&&(i.bumpScale=t.BumpFactor.value),t.Diffuse?i.color=qt.toWorkingColorSpace(new wt().fromArray(t.Diffuse.value),pe):t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(i.color=qt.toWorkingColorSpace(new wt().fromArray(t.DiffuseColor.value),pe)),t.DisplacementFactor&&(i.displacementScale=t.DisplacementFactor.value),t.Emissive?i.emissive=qt.toWorkingColorSpace(new wt().fromArray(t.Emissive.value),pe):t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(i.emissive=qt.toWorkingColorSpace(new wt().fromArray(t.EmissiveColor.value),pe)),t.EmissiveFactor&&(i.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),i.opacity=1-(t.TransparencyFactor?parseFloat(t.TransparencyFactor.value):0),(i.opacity===1||i.opacity===0)&&(i.opacity=t.Opacity?parseFloat(t.Opacity.value):null,i.opacity===null&&(i.opacity=1-(t.TransparentColor?parseFloat(t.TransparentColor.value[0]):0))),i.opacity<1&&(i.transparent=!0),t.ReflectionFactor&&(i.reflectivity=t.ReflectionFactor.value),t.Shininess&&(i.shininess=t.Shininess.value),t.Specular?i.specular=qt.toWorkingColorSpace(new wt().fromArray(t.Specular.value),pe):t.SpecularColor&&t.SpecularColor.type==="Color"&&(i.specular=qt.toWorkingColorSpace(new wt().fromArray(t.SpecularColor.value),pe));const s=this;return Ee.get(n).children.forEach(function(o){const a=o.relationship;switch(a){case"Bump":i.bumpMap=s.getTexture(e,o.ID);break;case"Maya|TEX_ao_map":i.aoMap=s.getTexture(e,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=s.getTexture(e,o.ID),i.map!==void 0&&(i.map.colorSpace=pe);break;case"DisplacementColor":i.displacementMap=s.getTexture(e,o.ID);break;case"EmissiveColor":i.emissiveMap=s.getTexture(e,o.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=pe);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=s.getTexture(e,o.ID);break;case"ReflectionColor":i.envMap=s.getTexture(e,o.ID),i.envMap!==void 0&&(i.envMap.mapping=lo,i.envMap.colorSpace=pe);break;case"SpecularColor":i.specularMap=s.getTexture(e,o.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=pe);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=s.getTexture(e,o.ID),i.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(t,e){return"LayeredTexture"in Kt.Objects&&e in Kt.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),e=Ee.get(e).children[0].ID),t.get(e)}parseDeformers(){const t={},e={};if("Deformer"in Kt.Objects){const n=Kt.Objects.Deformer;for(const i in n){const s=n[i],o=Ee.get(parseInt(i));if(s.attrType==="Skin"){const a=this.parseSkeleton(o,n);a.ID=i,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,t[i]=a}else if(s.attrType==="BlendShape"){const a={id:i};a.rawTargets=this.parseMorphTargets(o,n),a.id=i,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),e[i]=a}}}return{skeletons:t,morphTargets:e}}parseSkeleton(t,e){const n=[];return t.children.forEach(function(i){const s=e[i.ID];if(s.attrType!=="Cluster")return;const o={ID:i.ID,indices:[],weights:[],transformLink:new Tt().fromArray(s.TransformLink.a)};"Indexes"in s&&(o.indices=s.Indexes.a,o.weights=s.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(t,e){const n=[];for(let i=0;i<t.children.length;i++){const s=t.children[i],o=e[s.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=Ee.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(t,e,n){We=new Fe;const i=this.parseModels(t.skeletons,e,n),s=Kt.Objects.Model,o=this;i.forEach(function(l){const c=s[l.ID];o.setLookAtProperties(l,c),Ee.get(l.ID).parents.forEach(function(u){const d=i.get(u.ID);d!==void 0&&d.add(l)}),l.parent===null&&We.add(l)}),this.bindSkeleton(t.skeletons,e,i),this.addGlobalSceneSettings(),We.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const c=Zu(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});const a=new H_().parse();We.children.length===1&&We.children[0].isGroup&&(We.children[0].animations=a,We=We.children[0]),We.animations=a}parseModels(t,e,n){const i=new Map,s=Kt.Objects.Model;for(const o in s){const a=parseInt(o),l=s[o],c=Ee.get(a);let h=this.buildSkeleton(c,t,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,e,n);break;case"NurbsCurve":h=this.createCurve(c,e);break;case"LimbNode":case"Root":h=new pl;break;case"Null":default:h=new Fe;break}h.name=l.attrName?ie.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),i.set(a,h)}return i}buildSkeleton(t,e,n,i){let s=null;return t.parents.forEach(function(o){for(const a in e){const l=e[a];l.rawBones.forEach(function(c,h){if(c.ID===o.ID){const u=s;s=new pl,s.matrixWorld.copy(c.transformLink),s.name=i?ie.sanitizeNodeName(i):"",s.userData.originalName=i,s.ID=n,l.bones[h]=s,u!==null&&s.add(u)}})}}),s}createCamera(t){let e,n;if(t.children.forEach(function(i){const s=Kt.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)e=new ue;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);const c=a/l;let h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);const u=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:e=new $e(h,c,s,o),u!==null&&e.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),e=new ue;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),e=new ue;break}}return e}createLight(t){let e,n;if(t.children.forEach(function(i){const s=Kt.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)e=new ue;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=qt.toWorkingColorSpace(new wt().fromArray(n.Color.value),pe));let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);const l=1;switch(i){case 0:e=new xl(s,o,a,l);break;case 1:e=new Nu(s,o);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=Se.degToRad(n.InnerAngle.value));let h=0;n.OuterAngle!==void 0&&(h=Se.degToRad(n.OuterAngle.value),h=Math.max(h,1)),e=new Px(s,o,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),e=new xl(s,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(e.castShadow=!0)}return e}createMesh(t,e,n){let i,s=null,o=null;const a=[];return t.children.forEach(function(l){e.has(l.ID)&&(s=e.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new ma({name:Ri.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in s.attributes&&a.forEach(function(l){l.vertexColors=!0}),s.FBX_Deformer?(i=new Uv(s,o),i.normalizeSkinWeights()):i=new $t(s,o),i}createCurve(t,e){const n=t.children.reduce(function(s,o){return e.has(o.ID)&&(s=e.get(o.ID)),s},null),i=new kl({name:Ri.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Mu(n,i)}getTransformData(t,e){const n={};"InheritType"in e&&(n.inheritType=parseInt(e.InheritType.value)),"RotationOrder"in e?n.eulerOrder=dr(e.RotationOrder.value):n.eulerOrder=dr(0),"Lcl_Translation"in e&&(n.translation=e.Lcl_Translation.value),"PreRotation"in e&&(n.preRotation=e.PreRotation.value),"Lcl_Rotation"in e&&(n.rotation=e.Lcl_Rotation.value),"PostRotation"in e&&(n.postRotation=e.PostRotation.value),"Lcl_Scaling"in e&&(n.scale=e.Lcl_Scaling.value),"ScalingOffset"in e&&(n.scalingOffset=e.ScalingOffset.value),"ScalingPivot"in e&&(n.scalingPivot=e.ScalingPivot.value),"RotationOffset"in e&&(n.rotationOffset=e.RotationOffset.value),"RotationPivot"in e&&(n.rotationPivot=e.RotationPivot.value),t.userData.transformData=n}setLookAtProperties(t,e){"LookAtProperty"in e&&Ee.get(t.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){const s=Kt.Objects.Model[i.ID];if("Lcl_Translation"in s){const o=s.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(o),We.add(t.target)):t.lookAt(new R().fromArray(o))}}})}bindSkeleton(t,e,n){const i=this.parsePoseNodes();for(const s in t){const o=t[s];Ee.get(parseInt(o.ID)).parents.forEach(function(l){if(e.has(l.ID)){const c=l.ID;Ee.get(c).parents.forEach(function(u){n.has(u.ID)&&n.get(u.ID).bind(new zl(o.bones),i[u.ID])})}})}}parsePoseNodes(){const t={};if("Pose"in Kt.Objects){const e=Kt.Objects.Pose;for(const n in e)if(e[n].attrType==="BindPose"&&e[n].NbPoseNodes>0){const i=e[n].PoseNode;Array.isArray(i)?i.forEach(function(s){t[s.Node]=new Tt().fromArray(s.Matrix.a)}):t[i.Node]=new Tt().fromArray(i.Matrix.a)}}return t}addGlobalSceneSettings(){if("GlobalSettings"in Kt){if("AmbientColor"in Kt.GlobalSettings){const t=Kt.GlobalSettings.AmbientColor.value,e=t[0],n=t[1],i=t[2];if(e!==0||n!==0||i!==0){const s=new wt().setRGB(e,n,i,pe);We.add(new Fu(s,1))}}"UnitScaleFactor"in Kt.GlobalSettings&&(We.userData.unitScaleFactor=Kt.GlobalSettings.UnitScaleFactor.value)}}}class V_{constructor(){this.negativeMaterialIndices=!1}parse(t){const e=new Map;if("Geometry"in Kt.Objects){const n=Kt.Objects.Geometry;for(const i in n){const s=Ee.get(parseInt(i)),o=this.parseGeometry(s,n[i],t);e.set(parseInt(i),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),e}parseGeometry(t,e,n){switch(e.attrType){case"Mesh":return this.parseMeshGeometry(t,e,n);case"NurbsCurve":return this.parseNurbsGeometry(e)}}parseMeshGeometry(t,e,n){const i=n.skeletons,s=[],o=t.parents.map(function(u){return Kt.Objects.Model[u.ID]});if(o.length===0)return;const a=t.children.reduce(function(u,d){return i[d.ID]!==void 0&&(u=i[d.ID]),u},null);t.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&s.push(n.morphTargets[u.ID])});const l=o[0],c={};"RotationOrder"in l&&(c.eulerOrder=dr(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const h=Zu(c);return this.genGeometry(e,a,s,h)}genGeometry(t,e,n,i){const s=new _e;t.attrName&&(s.name=t.attrName);const o=this.parseGeoNode(t,e),a=this.genBuffers(o),l=new Ht(a.vertex,3);if(l.applyMatrix4(i),s.setAttribute("position",l),a.colors.length>0&&s.setAttribute("color",new Ht(a.colors,3)),e&&(s.setAttribute("skinIndex",new Nl(a.weightsIndices,4)),s.setAttribute("skinWeight",new Ht(a.vertexWeights,4)),s.FBX_Deformer=e),a.normal.length>0){const c=new Gt().getNormalMatrix(i),h=new Ht(a.normal,3);h.applyNormalMatrix(c),s.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){const u=h===0?"uv":`uv${h}`;s.setAttribute(u,new Ht(a.uvs[h],2))}),o.material&&o.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(u,d){u!==c&&(s.addGroup(h,d-h,c),c=u,h=d)}),s.groups.length>0){const u=s.groups[s.groups.length-1],d=u.start+u.count;d!==a.materialIndex.length&&s.addGroup(d,a.materialIndex.length-d,c)}s.groups.length===0&&s.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(s,t,n,i),s}parseGeoNode(t,e){const n={};if(n.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],n.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&(n.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(n.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(n.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){n.uv=[];let i=0;for(;t.LayerElementUV[i];)t.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(t.LayerElementUV[i])),i++}return n.weightTable={},e!==null&&(n.skeleton=e,e.rawBones.forEach(function(i,s){i.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:s,weight:i.weights[a]})})})),n}genBuffers(t){const e={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,i=0,s=!1,o=[],a=[],l=[],c=[],h=[],u=[];const d=this;return t.vertexIndices.forEach(function(f,g){let v,m=!1;f<0&&(f=f^-1,m=!0);let p=[],y=[];if(o.push(f*3,f*3+1,f*3+2),t.color){const _=Jr(g,n,f,t.color);l.push(_[0],_[1],_[2])}if(t.skeleton){if(t.weightTable[f]!==void 0&&t.weightTable[f].forEach(function(_){y.push(_.weight),p.push(_.id)}),y.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const _=[0,0,0,0],x=[0,0,0,0];y.forEach(function(C,T){let E=C,I=p[T];x.forEach(function(S,M,P){if(E>S){P[M]=E,E=S;const B=_[M];_[M]=I,I=B}})}),p=_,y=x}for(;y.length<4;)y.push(0),p.push(0);for(let _=0;_<4;++_)h.push(y[_]),u.push(p[_])}if(t.normal){const _=Jr(g,n,f,t.normal);a.push(_[0],_[1],_[2])}t.material&&t.material.mappingType!=="AllSame"&&(v=Jr(g,n,f,t.material)[0],v<0&&(d.negativeMaterialIndices=!0,v=0)),t.uv&&t.uv.forEach(function(_,x){const C=Jr(g,n,f,_);c[x]===void 0&&(c[x]=[]),c[x].push(C[0]),c[x].push(C[1])}),i++,m&&(d.genFace(e,t,o,v,a,l,c,h,u,i),n++,i=0,o=[],a=[],l=[],c=[],h=[],u=[])}),e}getNormalNewell(t){const e=new R(0,0,0);for(let n=0;n<t.length;n++){const i=t[n],s=t[(n+1)%t.length];e.x+=(i.y-s.y)*(i.z+s.z),e.y+=(i.z-s.z)*(i.x+s.x),e.z+=(i.x-s.x)*(i.y+s.y)}return e.normalize(),e}getNormalTangentAndBitangent(t){const e=this.getNormalNewell(t),i=(Math.abs(e.z)>.5?new R(0,1,0):new R(0,0,1)).cross(e).normalize(),s=e.clone().cross(i).normalize();return{normal:e,tangent:i,bitangent:s}}flattenVertex(t,e,n){return new Q(t.dot(e),t.dot(n))}genFace(t,e,n,i,s,o,a,l,c,h){let u;if(h>3){const d=[],f=e.baseVertexPositions||e.vertexPositions;for(let p=0;p<n.length;p+=3)d.push(new R(f[n[p]],f[n[p+1]],f[n[p+2]]));const{tangent:g,bitangent:v}=this.getNormalTangentAndBitangent(d),m=[];for(const p of d)m.push(this.flattenVertex(p,g,v));u=us.triangulateShape(m,[])}else u=[[0,1,2]];for(const[d,f,g]of u)t.vertex.push(e.vertexPositions[n[d*3]]),t.vertex.push(e.vertexPositions[n[d*3+1]]),t.vertex.push(e.vertexPositions[n[d*3+2]]),t.vertex.push(e.vertexPositions[n[f*3]]),t.vertex.push(e.vertexPositions[n[f*3+1]]),t.vertex.push(e.vertexPositions[n[f*3+2]]),t.vertex.push(e.vertexPositions[n[g*3]]),t.vertex.push(e.vertexPositions[n[g*3+1]]),t.vertex.push(e.vertexPositions[n[g*3+2]]),e.skeleton&&(t.vertexWeights.push(l[d*4]),t.vertexWeights.push(l[d*4+1]),t.vertexWeights.push(l[d*4+2]),t.vertexWeights.push(l[d*4+3]),t.vertexWeights.push(l[f*4]),t.vertexWeights.push(l[f*4+1]),t.vertexWeights.push(l[f*4+2]),t.vertexWeights.push(l[f*4+3]),t.vertexWeights.push(l[g*4]),t.vertexWeights.push(l[g*4+1]),t.vertexWeights.push(l[g*4+2]),t.vertexWeights.push(l[g*4+3]),t.weightsIndices.push(c[d*4]),t.weightsIndices.push(c[d*4+1]),t.weightsIndices.push(c[d*4+2]),t.weightsIndices.push(c[d*4+3]),t.weightsIndices.push(c[f*4]),t.weightsIndices.push(c[f*4+1]),t.weightsIndices.push(c[f*4+2]),t.weightsIndices.push(c[f*4+3]),t.weightsIndices.push(c[g*4]),t.weightsIndices.push(c[g*4+1]),t.weightsIndices.push(c[g*4+2]),t.weightsIndices.push(c[g*4+3])),e.color&&(t.colors.push(o[d*3]),t.colors.push(o[d*3+1]),t.colors.push(o[d*3+2]),t.colors.push(o[f*3]),t.colors.push(o[f*3+1]),t.colors.push(o[f*3+2]),t.colors.push(o[g*3]),t.colors.push(o[g*3+1]),t.colors.push(o[g*3+2])),e.material&&e.material.mappingType!=="AllSame"&&(t.materialIndex.push(i),t.materialIndex.push(i),t.materialIndex.push(i)),e.normal&&(t.normal.push(s[d*3]),t.normal.push(s[d*3+1]),t.normal.push(s[d*3+2]),t.normal.push(s[f*3]),t.normal.push(s[f*3+1]),t.normal.push(s[f*3+2]),t.normal.push(s[g*3]),t.normal.push(s[g*3+1]),t.normal.push(s[g*3+2])),e.uv&&e.uv.forEach(function(v,m){t.uvs[m]===void 0&&(t.uvs[m]=[]),t.uvs[m].push(a[m][d*2]),t.uvs[m].push(a[m][d*2+1]),t.uvs[m].push(a[m][f*2]),t.uvs[m].push(a[m][f*2+1]),t.uvs[m].push(a[m][g*2]),t.uvs[m].push(a[m][g*2+1])})}addMorphTargets(t,e,n,i){if(n.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];const s=this;n.forEach(function(o){o.rawTargets.forEach(function(a){const l=Kt.Objects.Geometry[a.geoID];l!==void 0&&s.genMorphGeometry(t,e,l,i,a.name)})})}genMorphGeometry(t,e,n,i,s){const o=e.Vertices!==void 0?e.Vertices.a:[],a=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=t.attributes.position.count*3,u=new Float32Array(h);for(let v=0;v<c.length;v++){const m=c[v]*3;u[m]=l[v*3],u[m+1]=l[v*3+1],u[m+2]=l[v*3+2]}const d={vertexIndices:a,vertexPositions:u,baseVertexPositions:o},f=this.genBuffers(d),g=new Ht(f.vertex,3);g.name=s||n.attrName,g.applyMatrix4(i),t.morphAttributes.position.push(g)}parseNormals(t){const e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in t?s=t.NormalIndex.a:"NormalsIndex"in t&&(s=t.NormalsIndex.a)),{dataSize:3,buffer:i,indices:s,mappingType:e,referenceType:n}}parseUVs(t){const e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.UV.a;let s=[];return n==="IndexToDirect"&&(s=t.UVIndex.a),{dataSize:2,buffer:i,indices:s,mappingType:e,referenceType:n}}parseVertexColors(t){const e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Colors.a;let s=[];n==="IndexToDirect"&&(s=t.ColorIndex.a);for(let o=0,a=new wt;o<i.length;o+=4)a.fromArray(i,o),qt.toWorkingColorSpace(a,pe),a.toArray(i,o);return{dataSize:4,buffer:i,indices:s,mappingType:e,referenceType:n}}parseMaterialIndices(t){const e=t.MappingInformationType,n=t.ReferenceInformationType;if(e==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const i=t.Materials.a,s=[];for(let o=0;o<i.length;++o)s.push(o);return{dataSize:1,buffer:i,indices:s,mappingType:e,referenceType:n}}parseNurbsGeometry(t){const e=parseInt(t.Order);if(isNaN(e))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new _e;const n=e-1,i=t.KnotVector.a,s=[],o=t.Points.a;for(let u=0,d=o.length;u<d;u+=4)s.push(new ee().fromArray(o,u));let a,l;if(t.Form==="Closed")s.push(s[0]);else if(t.Form==="Periodic"){a=n,l=i.length-1-a;for(let u=0;u<n;++u)s.push(s[u])}const h=new B_(n,i,s,a,l).getPoints(s.length*12);return new _e().setFromPoints(h)}}class H_{parse(){const t=[],e=this.parseClips();if(e!==void 0)for(const n in e){const i=e[n],s=this.addClip(i);t.push(s)}return t}parseClips(){if(Kt.Objects.AnimationCurve===void 0)return;const t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);const e=this.parseAnimationLayers(t);return this.parseAnimStacks(e)}parseAnimationCurveNodes(){const t=Kt.Objects.AnimationCurveNode,e=new Map;for(const n in t){const i=t[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:i.id,attr:i.attrName,curves:{}};e.set(s.id,s)}}return e}parseAnimationCurves(t){const e=Kt.Objects.AnimationCurve;for(const n in e){const i={id:e[n].id,times:e[n].KeyTime.a.map(q_),values:e[n].KeyValueFloat.a},s=Ee.get(i.id);if(s!==void 0){const o=s.parents[0].ID,a=s.parents[0].relationship;a.match(/X/)?t.get(o).curves.x=i:a.match(/Y/)?t.get(o).curves.y=i:a.match(/Z/)?t.get(o).curves.z=i:a.match(/DeformPercent/)&&t.has(o)&&(t.get(o).curves.morph=i)}}}parseAnimationLayers(t){const e=Kt.Objects.AnimationLayer,n=new Map;for(const i in e){const s=[],o=Ee.get(parseInt(i));o!==void 0&&(o.children.forEach(function(l,c){if(t.has(l.ID)){const h=t.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(s[c]===void 0){const u=Ee.get(l.ID).parents.filter(function(d){return d.relationship!==void 0})[0].ID;if(u!==void 0){const d=Kt.Objects.Model[u.toString()];if(d===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const f={modelName:d.attrName?ie.sanitizeNodeName(d.attrName):"",ID:d.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};We.traverse(function(g){g.ID===d.id&&(f.transform=g.matrix,g.userData.transformData&&(f.eulerOrder=g.userData.transformData.eulerOrder))}),f.transform||(f.transform=new Tt),"PreRotation"in d&&(f.preRotation=d.PreRotation.value),"PostRotation"in d&&(f.postRotation=d.PostRotation.value),s[c]=f}}s[c]&&(s[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(s[c]===void 0){const u=Ee.get(l.ID).parents.filter(function(p){return p.relationship!==void 0})[0].ID,d=Ee.get(u).parents[0].ID,f=Ee.get(d).parents[0].ID,g=Ee.get(f).parents[0].ID,v=Kt.Objects.Model[g],m={modelName:v.attrName?ie.sanitizeNodeName(v.attrName):"",morphName:Kt.Objects.Deformer[u].attrName};s[c]=m}s[c][h.attr]=h}}}),n.set(parseInt(i),s))}return n}parseAnimStacks(t){const e=Kt.Objects.AnimationStack,n={};for(const i in e){const s=Ee.get(parseInt(i)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const o=t.get(s[0].ID);n[i]={name:e[i].attrName,layer:o}}return n}addClip(t){let e=[];const n=this;return t.layer.forEach(function(i){e=e.concat(n.generateTracks(i))}),new vl(t.name,-1,e)}generateTracks(t){const e=[];let n=new R,i=new R;if(t.transform&&t.transform.decompose(n,new De,i),n=n.toArray(),i=i.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){const s=this.generateVectorTrack(t.modelName,t.T.curves,n,"position");s!==void 0&&e.push(s)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){const s=this.generateRotationTrack(t.modelName,t.R.curves,t.preRotation,t.postRotation,t.eulerOrder);s!==void 0&&e.push(s)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){const s=this.generateVectorTrack(t.modelName,t.S.curves,i,"scale");s!==void 0&&e.push(s)}if(t.DeformPercent!==void 0){const s=this.generateMorphTrack(t);s!==void 0&&e.push(s)}return e}generateVectorTrack(t,e,n,i){const s=this.getTimesForAllAxes(e),o=this.getKeyframeTrackValues(s,e,n);return new bs(t+"."+i,s,o)}generateRotationTrack(t,e,n,i,s){let o,a;if(e.x!==void 0&&e.y!==void 0&&e.z!==void 0){const d=this.interpolateRotations(e.x,e.y,e.z,s);o=d[0],a=d[1]}const l=dr(0);n!==void 0&&(n=n.map(Se.degToRad),n.push(l),n=new Re().fromArray(n),n=new De().setFromEuler(n)),i!==void 0&&(i=i.map(Se.degToRad),i.push(l),i=new Re().fromArray(i),i=new De().setFromEuler(i).invert());const c=new De,h=new Re,u=[];if(!a||!o)return new Ms(t+".quaternion",[0],[0]);for(let d=0;d<a.length;d+=3)h.set(a[d],a[d+1],a[d+2],s),c.setFromEuler(h),n!==void 0&&c.premultiply(n),i!==void 0&&c.multiply(i),d>2&&new De().fromArray(u,(d-3)/3*4).dot(c)<0&&c.set(-c.x,-c.y,-c.z,-c.w),c.toArray(u,d/3*4);return new Ms(t+".quaternion",o,u)}generateMorphTrack(t){const e=t.DeformPercent.curves.morph,n=e.values.map(function(s){return s/100}),i=We.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new ur(t.modelName+".morphTargetInfluences["+i+"]",e.times,n)}getTimesForAllAxes(t){let e=[];if(t.x!==void 0&&(e=e.concat(t.x.times)),t.y!==void 0&&(e=e.concat(t.y.times)),t.z!==void 0&&(e=e.concat(t.z.times)),e=e.sort(function(n,i){return n-i}),e.length>1){let n=1,i=e[0];for(let s=1;s<e.length;s++){const o=e[s];o!==i&&(e[n]=o,i=o,n++)}e=e.slice(0,n)}return e}getKeyframeTrackValues(t,e,n){const i=n,s=[];let o=-1,a=-1,l=-1;return t.forEach(function(c){if(e.x&&(o=e.x.times.indexOf(c)),e.y&&(a=e.y.times.indexOf(c)),e.z&&(l=e.z.times.indexOf(c)),o!==-1){const h=e.x.values[o];s.push(h),i[0]=h}else s.push(i[0]);if(a!==-1){const h=e.y.values[a];s.push(h),i[1]=h}else s.push(i[1]);if(l!==-1){const h=e.z.values[l];s.push(h),i[2]=h}else s.push(i[2])}),s}interpolateRotations(t,e,n,i){const s=[],o=[];s.push(t.times[0]),o.push(Se.degToRad(t.values[0])),o.push(Se.degToRad(e.values[0])),o.push(Se.degToRad(n.values[0]));for(let a=1;a<t.values.length;a++){const l=[t.values[a-1],e.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Se.degToRad),h=[t.values[a],e.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;const u=h.map(Se.degToRad),d=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],f=[Math.abs(d[0]),Math.abs(d[1]),Math.abs(d[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const v=Math.max(...f)/180,m=new Re(...c,i),p=new Re(...u,i),y=new De().setFromEuler(m),_=new De().setFromEuler(p);y.dot(_)&&_.set(-_.x,-_.y,-_.z,-_.w);const x=t.times[a-1],C=t.times[a]-x,T=new De,E=new Re;for(let I=0;I<1;I+=1/v)T.copy(y.clone().slerp(_.clone(),I)),s.push(x+I*C),E.setFromQuaternion(T,i),o.push(E.x),o.push(E.y),o.push(E.z)}else s.push(t.times[a]),o.push(Se.degToRad(t.values[a])),o.push(Se.degToRad(e.values[a])),o.push(Se.degToRad(n.values[a]))}return[s,o]}}class G_{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,e){this.currentProp=t,this.currentPropName=e}parse(t){this.currentIndent=0,this.allNodes=new ju,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const e=this,n=t.split(/[\r\n]+/);return n.forEach(function(i,s){const o=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(o||a)return;const l=i.match("^\\t{"+e.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+e.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=i.match("^\\t{"+(e.currentIndent-1)+"}}");l?e.parseNodeBegin(i,l):c?e.parseNodeProperty(i,c,n[++s]):h?e.popStack():i.match(/^[^\s\t}]/)&&e.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(t,e){const n=e[1].trim().replace(/^"/,"").replace(/"$/,""),i=e[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},o=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in a?(n==="PoseNode"?a.PoseNode.push(s):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=s)):typeof o.id=="number"?(a[n]={},a[n][o.id]=s):n!=="Properties70"&&(n==="PoseNode"?a[n]=[s]:a[n]=s),typeof o.id=="number"&&(s.id=o.id),o.name!==""&&(s.attrName=o.name),o.type!==""&&(s.attrType=o.type),this.pushStack(s)}parseNodeAttr(t){let e=t[0];t[0]!==""&&(e=parseInt(t[0]),isNaN(e)&&(e=t[0]));let n="",i="";return t.length>1&&(n=t[1].replace(/^(\w+)::/,""),i=t[2]),{id:e,name:n,type:i}}parseNodeProperty(t,e,n){let i=e[1].replace(/^"/,"").replace(/"$/,"").trim(),s=e[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(t,i,s);return}if(i==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]);let u=s.split(",").slice(3);u=u.map(function(d){return d.trim().replace(/^"/,"")}),i="connections",s=[c,h],j_(s,u),o[i]===void 0&&(o[i]=[])}i==="Node"&&(o.id=s),i in o&&Array.isArray(o[i])?o[i].push(s):i!=="a"?o[i]=s:o.a=s,this.setCurrentProp(o,i),i==="a"&&s.slice(-1)!==","&&(o.a=wa(s))}parseNodePropertyContinued(t){const e=this.getCurrentNode();e.a+=t,t.slice(-1)!==","&&(e.a=wa(e.a))}parseNodeSpecialProperty(t,e,n){const i=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=i[0],o=i[1],a=i[2],l=i[3];let c=i[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=wa(c);break}this.getPrevNode()[s]={type:o,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class W_{parse(t){const e=new Uh(t);e.skip(23);const n=e.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const i=new ju;for(;!this.endOfContent(e);){const s=this.parseNode(e,n);s!==null&&i.add(s.name,s)}return i}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,e){const n={},i=e>=7500?t.getUint64():t.getUint32(),s=e>=7500?t.getUint64():t.getUint32();e>=7500?t.getUint64():t.getUint32();const o=t.getUint8(),a=t.getString(o);if(i===0)return null;const l=[];for(let d=0;d<s;d++)l.push(this.parseProperty(t));const c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=s===1&&t.getOffset()===i;i>t.getOffset();){const d=this.parseNode(t,e);d!==null&&this.parseSubNode(a,n,d)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),a!==""&&(n.name=a),n}parseSubNode(t,e,n){if(n.singleProperty===!0){const i=n.propertyList[0];Array.isArray(i)?(e[n.name]=n,n.a=i):e[n.name]=i}else if(t==="Connections"&&n.name==="C"){const i=[];n.propertyList.forEach(function(s,o){o!==0&&i.push(s)}),e.connections===void 0&&(e.connections=[]),e.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){e[s]=n[s]});else if(t==="Properties70"&&n.name==="P"){let i=n.propertyList[0],s=n.propertyList[1];const o=n.propertyList[2],a=n.propertyList[3];let l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],e[i]={type:s,type2:o,flag:a,value:l}}else e[n.name]===void 0?typeof n.id=="number"?(e[n.name]={},e[n.name][n.id]=n):e[n.name]=n:n.name==="PoseNode"?(Array.isArray(e[n.name])||(e[n.name]=[e[n.name]]),e[n.name].push(n)):e[n.name][n.id]===void 0&&(e[n.name][n.id]=n)}parseProperty(t){const e=t.getString(1);let n;switch(e){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return n=t.getUint32(),t.getArrayBuffer(n);case"S":return n=t.getUint32(),t.getString(n);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const i=t.getUint32(),s=t.getUint32(),o=t.getUint32();if(s===0)switch(e){case"b":case"c":return t.getBooleanArray(i);case"d":return t.getFloat64Array(i);case"f":return t.getFloat32Array(i);case"i":return t.getInt32Array(i);case"l":return t.getInt64Array(i)}const a=R_(new Uint8Array(t.getArrayBuffer(o))),l=new Uh(a.buffer);switch(e){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+e)}}}class Uh{constructor(t,e){this.dv=new DataView(t),this.offset=0,this.littleEndian=e!==void 0?e:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){const e=[];for(let n=0;n<t;n++)e.push(this.getBoolean());return e}getUint8(){const t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){const t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){const t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){const e=[];for(let n=0;n<t;n++)e.push(this.getInt32());return e}getUint32(){const t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e&2147483648?(e=~e&4294967295,t=~t&4294967295,t===4294967295&&(e=e+1&4294967295),t=t+1&4294967295,-(e*4294967296+t)):e*4294967296+t}getInt64Array(t){const e=[];for(let n=0;n<t;n++)e.push(this.getInt64());return e}getUint64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e*4294967296+t}getFloat32(){const t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){const e=[];for(let n=0;n<t;n++)e.push(this.getFloat32());return e}getFloat64(){const t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){const e=[];for(let n=0;n<t;n++)e.push(this.getFloat64());return e}getArrayBuffer(t){const e=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}getString(t){const e=this.offset;let n=new Uint8Array(this.dv.buffer,e,t);this.skip(t);const i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,e,i)),this._textDecoder.decode(n)}}class ju{add(t,e){this[t]=e}}function X_(r){const t="Kaydara FBX Binary  \0";return r.byteLength>=t.length&&t===Ku(r,0,t.length)}function $_(r){const t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let e=0;function n(i){const s=r[i-1];return r=r.slice(e+i),e++,s}for(let i=0;i<t.length;++i)if(n(1)===t[i])return!1;return!0}function Nh(r){const t=/FBXVersion: (\d+)/,e=r.match(t);if(e)return parseInt(e[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function q_(r){return r/46186158e3}const Y_=[];function Jr(r,t,e,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=r;break;case"ByPolygon":i=t;break;case"ByVertice":i=e;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);const s=i*n.dataSize,o=s+n.dataSize;return Z_(Y_,n.buffer,s,o)}const Sa=new Re,Qi=new R;function Zu(r){const t=new Tt,e=new Tt,n=new Tt,i=new Tt,s=new Tt,o=new Tt,a=new Tt,l=new Tt,c=new Tt,h=new Tt,u=new Tt,d=new Tt,f=r.inheritType?r.inheritType:0;r.translation&&t.setPosition(Qi.fromArray(r.translation));const g=dr(0);if(r.preRotation){const P=r.preRotation.map(Se.degToRad);P.push(g),e.makeRotationFromEuler(Sa.fromArray(P))}if(r.rotation){const P=r.rotation.map(Se.degToRad);P.push(r.eulerOrder||g),n.makeRotationFromEuler(Sa.fromArray(P))}if(r.postRotation){const P=r.postRotation.map(Se.degToRad);P.push(g),i.makeRotationFromEuler(Sa.fromArray(P)),i.invert()}r.scale&&s.scale(Qi.fromArray(r.scale)),r.scalingOffset&&a.setPosition(Qi.fromArray(r.scalingOffset)),r.scalingPivot&&o.setPosition(Qi.fromArray(r.scalingPivot)),r.rotationOffset&&l.setPosition(Qi.fromArray(r.rotationOffset)),r.rotationPivot&&c.setPosition(Qi.fromArray(r.rotationPivot)),r.parentMatrixWorld&&(u.copy(r.parentMatrix),h.copy(r.parentMatrixWorld));const v=e.clone().multiply(n).multiply(i),m=new Tt;m.extractRotation(h);const p=new Tt;p.copyPosition(h);const y=p.clone().invert().multiply(h),_=m.clone().invert().multiply(y),x=s,C=new Tt;if(f===0)C.copy(m).multiply(v).multiply(_).multiply(x);else if(f===1)C.copy(m).multiply(_).multiply(v).multiply(x);else{const B=new Tt().scale(new R().setFromMatrixScale(u)).clone().invert(),O=_.clone().multiply(B);C.copy(m).multiply(v).multiply(O).multiply(x)}const T=c.clone().invert(),E=o.clone().invert();let I=t.clone().multiply(l).multiply(c).multiply(e).multiply(n).multiply(i).multiply(T).multiply(a).multiply(o).multiply(s).multiply(E);const S=new Tt().copyPosition(I),M=h.clone().multiply(S);return d.copyPosition(M),I=d.clone().multiply(C),I.premultiply(h.invert()),I}function dr(r){r=r||0;const t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return r===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[r]}function wa(r){return r.split(",").map(function(e){return parseFloat(e)})}function Ku(r,t,e){return t===void 0&&(t=0),e===void 0&&(e=r.byteLength),new TextDecoder().decode(new Uint8Array(r,t,e))}function j_(r,t){for(let e=0,n=r.length,i=t.length;e<i;e++,n++)r[n]=t[e]}function Z_(r,t,e,n){for(let i=e,s=0;i<n;i++,s++)r[s]=t[i];return r}function K_(r){const t=new Map,e=new Map,n=r.clone();return Ju(r,n,function(i,s){t.set(s,i),e.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=t.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(l){return e.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Ju(r,t,e){e(r,t);for(let n=0;n<r.children.length;n++)Ju(r.children[n],t.children[n],e)}const J_=[{id:"unit:vampire:hero",src:"assets/characters/vampire/mixamo/vampire_rigged.fbx",targetHeight:3.45,rotationY:0,visualOffsetY:0,animations:[{name:"idle",src:"assets/characters/vampire/mixamo/idle.fbx",inPlace:!0},{name:"walking",src:"assets/characters/vampire/mixamo/walking.fbx",inPlace:!0},{name:"attack",src:"assets/characters/vampire/mixamo/attack.fbx",inPlace:!0}]},{id:"unit:human:hero",src:"assets/characters/humans/mixamo/human_rigged.fbx",targetHeight:2.85,rotationY:0,visualOffsetY:0,animations:[{name:"idle",src:"assets/characters/humans/mixamo/idle.fbx",inPlace:!0},{name:"walking",src:"assets/characters/humans/mixamo/walking.fbx",inPlace:!0},{name:"working",src:"assets/characters/humans/mixamo/working.fbx",inPlace:!0}]},{id:"unit:worker:peon",src:"assets/characters/workers/mixamo/worker_rigged.fbx",targetHeight:2.65,rotationY:0,visualOffsetY:-.95,animations:[{name:"idle",src:"assets/characters/workers/mixamo/idle.fbx",inPlace:!0},{name:"walking",src:"assets/characters/workers/mixamo/walking.fbx",inPlace:!0},{name:"working",src:"assets/characters/humans/mixamo/working.fbx",inPlace:!0},{name:"attack",src:"assets/characters/workers/mixamo/attack.fbx",inPlace:!0}]}];function Fh(r){return`/${r.replace(/^\/+/,"")}`}function Oh(r){r.traverse(t=>{t instanceof $t&&(t.castShadow=!0,t.receiveShadow=!0,t.frustumCulled=!0)})}function Q_(r){const t=r.clone();for(const e of t.tracks){if(!(e instanceof bs)||!/(?:Hips|Root)\.position$/i.test(e.name))continue;const n=e.values;if(n.length<3)continue;const i=n[0],s=n[2];for(let o=0;o+2<n.length;o+=3)n[o]=i,n[o+2]=s}return t.optimize(),t}function Bh(r){r.traverse(t=>{var n;if(!(t instanceof $t))return;(n=t.geometry)==null||n.dispose();const e=Array.isArray(t.material)?t.material:[t.material];for(const i of e){for(const s of Object.values(i))s instanceof Ce&&s.dispose();i.dispose()}})}function ty(r,t){r.updateMatrixWorld(!0);const n=new un().setFromObject(r).getSize(new R);t.targetHeight&&n.y>1e-6&&r.scale.multiplyScalar(t.targetHeight/n.y),r.rotation.y+=t.rotationY??0,r.updateMatrixWorld(!0);const i=new un().setFromObject(r);Number.isFinite(i.min.y)&&(r.position.y-=i.min.y),r.position.y+=t.visualOffsetY??0,r.updateMatrixWorld(!0)}function Qu(r,t,e){const n=r.userData.animationMixer,i=r.userData.animationActions;if(!n||!(i!=null&&i.size))return;const s=i.has(t)?t:i.has("idle")?"idle":void 0;if(s&&r.userData.animationState!==s){const o=r.userData.animationState,a=o?i.get(o):void 0,l=i.get(s),c=r.userData.animationTimeScales;l.enabled=!0,l.setLoop(tu,1/0),l.timeScale=(c==null?void 0:c.get(s))??1,l.reset().fadeIn(.15).play(),a==null||a.fadeOut(.15),r.userData.animationState=s}n.update(e)}class ey{constructor(){lt(this,"fbxLoader",new z_);lt(this,"loaded",new Map);lt(this,"preloadPromise",null)}preload(){return this.preloadPromise?this.preloadPromise:(this.preloadPromise=Promise.all(J_.map(t=>this.load(t))).then(()=>{}),this.preloadPromise)}clone(t){const e=this.loaded.get(t);if(!e)return null;const n=K_(e.scene),i=new Fe;i.name="externalVisual",i.add(n),ty(i,e.definition),Oh(i);const s=new Fe;if(s.name="externalAssetRoot",s.add(i),s.userData.externalAsset=!0,s.userData.assetId=t,e.clips.size){const a=new $x(s),l=new Map;for(const[c,h]of e.clips)l.set(c,a.clipAction(h));s.userData.animationMixer=a,s.userData.animationActions=l,s.userData.animationTimeScales=e.timeScales,s.userData.animationState=void 0,Qu(s,"idle",0)}s.updateMatrixWorld(!0);const o=new un().setFromObject(s);return s.userData.healthBarHeight=Number.isFinite(o.max.y)?o.max.y+.35:3.8,s}async loadAnimation(t){const e=await this.fbxLoader.loadAsync(Fh(t.src)),n=e.animations[0];if(!n)return Bh(e),console.warn(`[assets] O arquivo ${t.src} não contém AnimationClip.`),null;const i=t.inPlace?Q_(n):n.clone();return i.name=t.name,Bh(e),i}async load(t){try{const e=await this.fbxLoader.loadAsync(Fh(t.src));Oh(e);const n=new Map,i=new Map;for(const s of t.animations??[])try{const o=await this.loadAnimation(s);if(!o)continue;n.set(s.name,o),i.set(s.name,s.timeScale??1)}catch(o){console.warn(`[assets] Falha ao carregar animação ${s.name} (${s.src}).`,o)}this.loaded.set(t.id,{definition:t,scene:e,clips:n,timeScales:i})}catch(e){console.warn(`[assets] Falha ao carregar ${t.id}; usando Vampiro original.`,e)}}}const td=new ey,fs=["#456a9b","#934a45","#537554","#77608d"],H={wood:"#49392f",woodLight:"#786047",woodDark:"#2a2928",iron:"#414d5a",edge:"#82909c",stone:"#626b70",stoneDark:"#424b51",mortar:"#353e43",plaster:"#a59c81",slate:["#2a3c49","#31434f","#384a55","#3d4d56"],gold:"#c6a05a",light:"#ffc26b",cloth:"#182330",red:"#742339",skin:"#c09b7b",pale:"#b5beca"},Ea=new Map;function er(r,t=!1,e=!1){const n=`${r}:${t}:${e}`;return Ea.has(n)||Ea.set(n,t?new Xe({color:r,toneMapped:!1,side:e?ke:Rn}):new Iu({color:r,roughness:r===H.iron||r===H.edge?.58:.94,metalness:r===H.iron||r===H.edge?.45:0,flatShading:!0,side:e?ke:Rn})),Ea.get(n)}function kt(r,t,e,n=0,i=0,s=0,o=!1,a=!1){const l=new $t(t,er(e,o,a));return l.position.set(n,i,s),l.castShadow=!o,l.receiveShadow=!0,r.add(l),l}function Et(r,t,e,n,i,s=0,o=e/2,a=0,l=!1){return kt(r,new qn(t,e,n),i,s,o,a,l)}function rn(r,t,e,n,i,s,o,a){const l=kt(r,new ds(1,10,7),i,s,o,a);return l.scale.set(t,e,n),l}function ye(r,t,e,n,i,s=0,o=n/2,a=0,l=8){return kt(r,new hi(t,e,n,l),i,s,o,a)}function ve(r,t,e,n,i,s=n){const o=new R(t[0],t[1],t[2]),a=new R(e[0],e[1],e[2]),l=Et(r,n,o.distanceTo(a),s,i,...o.clone().add(a).multiplyScalar(.5).toArray());return l.quaternion.setFromUnitVectors(new R(0,1,0),a.sub(o).normalize()),l}function Ne(r,t,e,n,i=0,s=0,o=0){const a=new Au(t.map(c=>new Q(c[0],c[1]))),l=new Wl(a,{depth:e,bevelEnabled:!1,steps:1});return l.translate(0,0,-e/2),kt(r,l,n,i,s,o)}function Gn(r,t,e,n,i=0){const s=new Fe;return s.name=t,s.position.set(e,n,i),r.add(s),s}function gr(r){for(const e of[...r.children])e instanceof Fe&&gr(e);const t=new Map;for(const e of r.children){if(!(e instanceof $t)||e.name||Array.isArray(e.material))continue;const n=t.get(e.material)??[];n.push(e),t.set(e.material,n)}for(const[e,n]of t){if(n.length<2)continue;const i=n.map(a=>{a.updateMatrix();const l=a.geometry.index?a.geometry.toNonIndexed():a.geometry.clone();return l.deleteAttribute("uv"),l.applyMatrix4(a.matrix),l}),s=p_(i);for(const a of i)a.dispose();if(!s)continue;const o=new $t(s,e);o.castShadow=n.some(a=>a.castShadow),o.receiveShadow=!0;for(const a of n)r.remove(a),a.geometry.dispose();r.add(o)}}function ao(r,t,e,n,i,s,o){Ne(r,[[-e/2,0],[e/2,0],[e/2,-n*.85],[0,-n],[-e/2,-n*.85]],.035,t,i,s,o),ve(r,[i-e*.65,s+.06,o],[i+e*.65,s+.06,o],.07,H.iron),Ne(r,[[0,.3],[.18,0],[0,-.3],[-.18,0]],.025,"#c3c7c4",i,s-n*.42,o+.04)}function ed(r=!1){const t=new Fe;Et(t,.3,.43,.3,r?"#d23b42":H.light,0,.33,0,!0);for(const n of[-.18,.18])for(const i of[-.18,.18])ve(t,[n,.06,i],[n,.6,i],.045,H.iron);Et(t,.44,.09,.44,H.iron,0,.07);const e=kt(t,new we(.34,.25,4),H.iron,0,.66);return e.rotation.y=Math.PI/4,kt(t,new wn(.095,.025,5,10),H.iron,0,.86),gr(t),t}function He(r,t,e,n,i=!1){const s=ed(i);s.position.set(t,e,n),r.add(s),ve(r,[t,e+.92,n],[t,e+.92,n-.4],.055,H.iron)}function zh(r,t,e,n,i=.35){const s=[new Q(i*.82,0),new Q(i,i*.5),new Q(i,i*1.2),new Q(i*.82,i*1.8)];kt(r,new To(s,10),H.woodLight,t,e,n);for(const o of[.13,.5])ye(r,i+.018,i+.018,.055,H.iron,t,e+o*i/.35,n,10);ye(r,i*.82,i*.82,.04,H.wood,t,e+i*1.8,n,10)}function ny(r,t,e,n,i=.65){Et(r,i,i,i,H.woodLight,t,e+i/2,n);for(const s of[-1,1]){const o=n+s*(i/2+.015);ve(r,[t-i/2,e+.05,o],[t+i/2,e+i-.05,o],.08,H.wood);for(const a of[.06,i-.06])Et(r,i,.09,.06,H.wood,t,e+a,o)}}function iy(r){const t=Gn(r,"cloak",0,2.55,-.12);for(let e=0;e<8;e++){const n=[];for(let l=0;l<5;l++){const c=l/4;for(let h=0;h<2;h++){const u=(e+h)/8*2-1,d=l===4?(e+h)%3*.13:0;n.push(u*(.55+c*.56),-c*2.38+d,-.18-c*.75-Math.cos(u*Math.PI*5)*c*.09)}}const s=[];for(let l=0;l<4;l++){const c=l*2;s.push(c,c+1,c+2,c+1,c+3,c+2)}const o=new _e;o.setAttribute("position",new Ht(n,3)),o.setIndex(s),o.computeVertexNormals(),kt(t,o,e%3===0?"#263343":H.cloth,0,0,0,!1,!0);const a=o.clone();a.translate(0,0,.025),kt(t,a,e%2?"#4b1f30":H.red,0,0,0,!1,!0)}}function sy(r){const t=Gn(r,"tool",0,-.79,.1);t.rotation.z=-2.25,ye(t,.045,.055,.9,H.woodLight,0,.2);for(const o of[-.08,-.02,.04])ye(t,.062,.062,.04,H.woodDark,0,o);const e=Gn(t,"axe",0,.58);Ne(e,[[-.08,.12],[.14,.19],[.4,.28],[.42,-.13],[.16,-.05],[-.08,-.06]],.09,H.iron),Ne(e,[[.33,.25],[.4,.28],[.42,-.13],[.34,-.1]],.095,H.edge);const n=Gn(t,"pickaxe",0,.55);n.visible=!1;const i=new Gl([new R(-.53,-.18,0),new R(-.28,.01,0),new R(0,.05,0),new R(.28,.01,0),new R(.53,-.18,0)]);kt(n,new Co(i,10,.055,5,!1),H.edge),Et(n,.14,.18,.14,H.iron,0,.04);for(const o of[-1,1])kt(n,new we(.054,.2,5),"#b5bec6",o*.57,-.23).quaternion.setFromUnitVectors(new R(0,1,0),new R(o,-1,0).normalize());const s=Gn(t,"hammer",0,.57);s.visible=!1,Et(s,.4,.24,.24,H.iron,0,0);for(const o of[-.2,.2])Et(s,.06,.26,.26,H.edge,o,0)}function ry(r,t,e=!0){const f=r==="vampire"&&e?"unit:vampire:hero":(r==="human"||r==="worker")&&e?"unit:human:hero":r==="worker"&&!e?"unit:worker:peon":null,g=f?td.clone(f):null;if(g)return g.userData.kind=r,g.userData.owner=t,g.userData.hero=e,g;const n=new Fe,i=r==="vampire",s=fs[t%fs.length]??fs[0],o=i?H.cloth:e?s:"#6c7154",a=i?H.pale:H.skin,l=i?1.24:1.02,c=i?2.37:1.88,h=i?.91:.77;for(const[f,g]of[["leftLeg",-1],["rightLeg",1]]){const v=Gn(n,f,g*.21,l);rn(v,.18,l*.28,.2,"#323b40",0,-l*.25,0),ye(v,.14,.12,l*.47,H.woodDark,0,-l*.64),Et(v,.28,.12,.45,"#252b31",0,-l+.13,.12),Et(v,.3,.07,.49,"#141a20",0,-l+.045,.12),Et(v,.27,.08,.27,H.woodLight,0,-l*.54)}const u=new To([new Q(.34,0),new Q(.3,.19),new Q(.36,.55),new Q(.43,c-l-.04),new Q(.21,c-l+.06)],10);kt(n,u,o,0,l-.05).scale.z=.75,Et(n,.68,.11,.54,"#3f3027",0,l+.09),Et(n,.15,.14,.055,H.gold,0,l+.09,.29);for(const f of[-1,1]){const g=Gn(n,f<0?"leftArm":"rightArm",f*.43,c-.06);if(rn(g,.16,.23,.18,o,f*.035,-.13,0),ye(g,.115,.095,h*.47,i?H.iron:o,0,-h*.57),rn(g,.115,.12,.11,i?H.iron:H.woodLight,0,-h*.39,.015),ye(g,.12,.12,.09,i?H.red:H.woodDark,0,-h*.78),rn(g,.1,.13,.1,a,0,-h,.02),i)for(let v=0;v<3;v++){const m=(v-1)*.08,p=new Gl([new R(m,-h,.07),new R(m,-h-.22,.12),new R(m,-h-.38,.27)]);kt(g,new Co(p,5,.022,4,!1),v===1?"#a95865":"#b4bac6")}else f>0&&sy(g)}const d=i?2.87:2.31;ye(n,.115,.13,.22,a,0,c+.1),rn(n,.25,i?.34:.29,.23,a,0,d,0),Ne(n,[[-.18,.07],[.18,.07],[.12,-.16],[0,-.22],[-.12,-.16]],.16,a,0,d-.07,.1),kt(n,new we(.075,.19,4),a,0,d-.03,.25).rotation.x=Math.PI/2;for(const f of[-1,1])rn(n,.045,.09,.06,a,f*.25,d,0),Et(n,.095,.028,.025,i?"#ec3346":"#222e32",f*.1,d+.055,.219,i),Et(n,.12,.04,.04,i?"#333a47":"#5b4636",f*.1,d+.11,.2).rotation.z=-f*.18;if(i){iy(n);for(const f of[-1,1]){Ne(n,[[0,-.2],[f*.45,.12],[f*.51,.56],[f*.1,.31]],.09,H.red,f*.06,2.4,-.03);for(let g=0;g<3;g++)Ne(n,[[-.22,.12],[.14,.22],[.4,.02],[.27,-.11],[-.18,-.02]],.15,g%2?"#4a586a":H.iron,f*(.4+g*.055),2.42-g*.12,0).rotation.y=f<0?Math.PI:0;Ne(n,[[0,0],[f*.28,.04],[f*.11,-.62]],.04,"#672437",f*.04,2.31,.3)}rn(n,.255,.18,.24,"#111c27",0,d+.19,-.07);for(let f=0;f<7;f++){const g=(f-3)*.063,v=kt(n,new we(.085,.42,4),"#17222d",g,d+.32+(3-Math.abs(f-3))*.025,-.18);v.rotation.x=-.7}for(const f of[-.06,.06])kt(n,new we(.025,.085,3),"#e5e4df",f,d-.16,.23).rotation.z=Math.PI}else if(e){rn(n,.285,.23,.27,H.iron,0,d+.16,-.025),ye(n,.33,.35,.065,H.edge,0,d+.08,-.015,12),ve(n,[0,d+.4,-.19],[0,d+.4,.18],.07,"#a6adb0");for(const v of[-1,1])rn(n,.24,.1,.27,H.iron,v*.42,c,0),Et(n,.065,.24,.16,H.iron,v*.24,d-.025,-.02);ao(n,s,.46,.54,0,l+.13,.32),ve(n,[-.26,c-.08,.31],[.23,l+.11,.31],.075,H.woodLight,.04);const f=n.getObjectByName("leftArm"),g=kt(f,new hi(.25,.25,.065,10),H.iron,-.11,-.35,.16);g.rotation.x=Math.PI/2,rn(f,.085,.085,.05,H.edge,-.11,-.35,.205)}else{ye(n,.24,.32,.23,"#9b8357",0,d+.27,0,12),ye(n,.46,.49,.055,"#b29a64",0,d+.14,0,12),ye(n,.31,.32,.055,"#534332",0,d+.19,0,12),Ne(n,[[-.27,0],[.27,0],[.3,-.63],[-.25,-.58]],.065,"#72513b",0,l+.13,.32);for(const f of[-.2,.2])ve(n,[f,c-.12,.3],[f,l+.1,.32],.055,"#a88c62");rn(n,.21,.13,.14,"#5b4533",0,d-.19,.11)}if(!i){Et(n,.43,.52,.23,"#5a4434",0,c-.37,-.35),ye(n,.13,.13,.5,"#85826c",0,c-.05,-.39).rotation.z=Math.PI/2;for(const f of[-.14,.14])Et(n,.045,.53,.25,"#342e29",f,c-.37,-.36);rn(n,.13,.17,.11,"#7d6244",.36,l-.05,0)}return n.userData.healthBarHeight=i?3.7:3.15,gr(n),n}function ri(r,t,e,n,i,s=0,o=0){const a=Ne(r,[[-t/2,0],[t/2,0],[0,n]],e,H.slate[0],s,i,o);a.receiveShadow=!0;for(const d of[-1,1]){const f=o+d*(e/2+.015);Ne(r,[[-t/2+.13,.03],[t/2-.13,.03],[0,n-.13]],.035,"#6a6656",s,i,f),ve(r,[s,i+.05,f+d*.03],[s,i+n-.14,f+d*.03],.12,H.wood)}const l=Math.hypot(t/2,n),c=Math.atan2(n,t/2),h=Math.max(3,Math.ceil(l/.55)),u=Math.max(3,Math.ceil(e/.62));for(const d of[-1,1])for(let f=0;f<h;f++)for(let g=0;g<u;g++){const v=(f+.5)/h,m=Et(r,l/h+.065,.065,e/u-.025,H.slate[(f*13+g*17+g*f+(d+1))%H.slate.length],s+d*t/2*(1-v),i+n*v+.055,o-e/2+e/u*(g+.5));m.rotation.z=-d*c}for(const d of[-1,1])for(const f of[-1,1])ve(r,[s+f*t/2,i-.03,o+d*(e/2+.04)],[s,i+n+.09,o+d*(e/2+.04)],.15,H.woodLight);Et(r,.2,.15,e+.2,H.iron,s,i+n+.08,o)}function Ae(r,t,e,n,i=0,s=0,o=0){Et(r,t,e,n,H.mortar,i,s+e/2,o);const a=Math.ceil(e/.45),l=Math.ceil(t/.85);for(let h=0;h<a;h++)for(let u=0;u<l;u++){const d=t/l,f=i-t/2+(u+.5)*d;for(const g of[-1,1])Et(r,d-.025,e/a-.03,.06,(h+u)%3?H.stone:"#757d7d",f,s+(h+.5)*e/a,o+g*n/2)}const c=Math.ceil(n/.85);for(let h=0;h<a;h++)for(let u=0;u<c;u++)for(const d of[-1,1])Et(r,.06,e/a-.03,n/c-.025,(h+u)%3?H.stone:"#757d7d",i+d*t/2,s+(h+.5)*e/a,o-n/2+(u+.5)*n/c)}function Bn(r,t,e,n,i=.75,s=1.15,o=!1){const a=[[-i/2,0],[i/2,0],[i/2,s*.7],[0,s],[-i/2,s*.7]];Ne(r,a,.09,H.woodDark,t,e,n);const l=Ne(r,a.map(c=>[c[0]*.75,c[1]*.82]),.04,o?"#b62d3d":H.light,t,e+.08,n+.06);l.material=er(o?"#b62d3d":H.light,!0),Et(r,.055,s*.8,.04,H.woodDark,t,e+s*.45,n+.1),Et(r,i*.82,.055,.04,H.woodDark,t,e+s*.46,n+.1),Et(r,i+.18,.1,.18,H.woodLight,t,e-.03,n+.03)}function Qr(r,t,e,n,i,s,o=!1){Ne(r,[[-i/2,0],[i/2,0],[i/2,s*.8],[0,s],[-i/2,s*.8]],.16,H.woodDark,t,e,n);for(let a=0;a<5;a++)Et(r,i/5-.025,s*.8,.06,o?H.iron:H.woodLight,t+(a-2)*i/5,e+s*.4,n+.1);for(const a of[s*.18,s*.62])Et(r,i*.95,.1,.07,o?"#788189":H.iron,t,e+a,n+.14);kt(r,new wn(i*.075,.025,5,10),H.gold,t+i*.22,e+s*.42,n+.19)}function Ta(r,t,e,n,i=0,s=0){Ae(r,t,.65,n,i,0,s),Et(r,t-.1,e-.65,n-.1,H.plaster,i,(e+.65)/2,s);for(const o of[-1,1]){for(const a of[-t/2+.07,0,t/2-.07])ve(r,[i+a,.6,s+o*n/2],[i+a,e,s+o*n/2],.18,H.wood);for(const a of[.75,e*.57,e])Et(r,t,.16,.15,H.wood,i,a,s+o*n/2);for(const a of[-1,1])ve(r,[i+a*t*.43,e*.6,s+o*(n/2+.02)],[i+a*t*.1,e-.1,s+o*(n/2+.02)],.12,H.wood)}for(const o of[-1,1])for(const a of[-n/2,0,n/2])Et(r,.15,e-.6,.16,H.wood,i+o*t/2,(e+.6)/2,s+a);for(const o of[-1,1]){for(const a of[.75,e*.57,e])Et(r,.18,.16,n,H.wood,i+o*t/2,a,s);for(const a of[-1,1])ve(r,[i+o*t/2,e*.6,s+a*n*.43],[i+o*t/2,e-.1,s+a*n*.1],.12,H.wood)}}function oy(r,t,e,n=1){const i=new Fe,s=Pi[r],a=r==="crypt"?8:r==="wall"?2:r==="tower"?3:r==="keep"?7:r==="forge"||r==="relic"||r==="mist"||r==="shrine"?5:6,l=fs[t%fs.length]??fs[0];if(r==="wall"){for(const c of[-.84,.84])for(const h of[-.64,.64]){ye(i,.16,.2,3.2,H.woodLight,c,1.6,h,7),kt(i,new we(.165,.55,7),"#99816a",c,3.46,h);for(const u of[.55,2.55])ye(i,.21,.21,.11,H.iron,c,u,h,7);n>1&&Ae(i,.34,.65,.34,c,0,h)}for(const c of[-.66,.66]){Et(i,2,.3,.26,H.wood,0,2.95,c),n>1&&Et(i,2,.1,.29,H.iron,0,3.1,c);for(let h=-.6;h<=.61;h+=.3)kt(i,new we(.11,.45,4),n>2?H.edge:H.woodLight,h,3.33,c)}n>2&&Ne(i,[[-.35,0],[.35,0],[0,-.45]],.07,H.iron,0,3.1,.83),Et(i,.18,.2,.06,H.gold,0,2.97,.83)}else if(r==="tower"){Ae(i,2.8,1.2,2.8);for(const h of[-1.13,1.13])for(const u of[-1.13,1.13])ve(i,[h,.7,u],[h,8,u],.27,H.wood);Et(i,2.3,4.9,2.3,"#414542",0,3.7);for(const h of[-1.19,1.19]){for(let u=-1;u<=1.01;u+=.25)Et(i,.22,4.9,.08,Math.round(u*4)%2?H.wood:"#655643",u,3.7,h);for(const u of[1.3,3.4,5.8])Et(i,2.7,.2,.18,H.woodDark,0,u,h);ve(i,[-1.1,1.5,h+.04],[1.1,3.3,h+.04],.13,H.woodLight)}Et(i,3,.28,3,H.woodLight,0,6.05);for(const h of[-1.3,1.3])for(const u of[-1.3,1.3])Et(i,.18,1.1,.18,H.woodLight,h,6.65,u);for(const h of[-1.34,1.34])Et(i,2.8,.16,.13,H.wood,0,7.13,h);ri(i,3.3,3.3,1.5,8.05),ao(i,l,.9,2.7,0,5.7,1.28),He(i,-.94,4.5,1.4);const c=Gn(i,"turret",0,6.7);ye(c,.15,.25,.4,H.iron,0,.2),Et(c,.14,.13,1.6,H.woodLight,0,.5,.25),ve(c,[-.68,.5,.4],[0,.5,.57],.09,H.iron),ve(c,[.68,.5,.4],[0,.5,.57],.09,H.iron),ve(c,[-.68,.5,.4],[.68,.5,.4],.018,"#c7b99b")}else if(r==="taverna"){Ta(i,4.1,3.55,4.4,-.8,-.45),ri(i,4.55,4.95,2.4,3.62,-.8,-.45),Ta(i,1.65,2.65,3.9,2.05,-.35),ri(i,1.95,4.2,.75,2.68,2.05,-.35),Qr(i,-.7,.45,1.82,1.15,2.05);for(const u of[-2.02,.55])Bn(i,u,1.42,1.81,.82,1.25);Bn(i,-.8,3.8,2.05,.8,1.25),ri(i,2.3,1.05,.5,2.5,-.7,2.35);for(const u of[-1.72,.32])ve(i,[u,.15,2.72],[u,2.6,2.72],.13,H.wood);Ae(i,.68,2.6,.7,-1.9,3.95,-1),Et(i,.83,.14,.86,H.iron,-1.9,6.6,-1),He(i,-1.65,1.85,2.1),He(i,2.35,1.3,1.75);const c=new Fe;c.position.set(2.9,0,-.35),c.rotation.y=Math.PI/2,i.add(c);for(const u of[-.95,.95])Bn(c,u,1.2,.05,.72,1.05);zh(i,1.2,.05,2.2),zh(i,2.2,.05,2.1,.31),ny(i,-2.5,0,2.12,.62);const h=Gn(i,"tavernSign",.75,3.55,2.58);for(const u of[-.35,.35])ve(h,[u,0,0],[u,-.26,0],.025,H.iron);Et(h,1,.62,.13,H.woodLight,0,-.56),Et(h,.29,.3,.05,H.gold,-.05,-.55,.085),kt(h,new wn(.09,.025,5,10),H.gold,.15,-.54,.1),ao(i,l,.55,.95,1.87,2.5,1.68)}else if(r==="bank"||r==="keep"){const c=r==="bank"?5.65:6.65;Ae(i,c,3.35,c),Ta(i,c-.2,1.35,c-.2,0,0),Et(i,c-.25,1.7,c-.25,H.plaster,0,4.05);for(const d of[-c/2+.1,0,c/2-.1])for(const f of[-c/2,c/2])Et(i,.2,1.8,.16,H.wood,d,4.08,f);for(const d of[-1,1]){for(const g of[-c/2+.1,0,c/2-.1])Et(i,.16,1.8,.2,H.wood,d*c/2,4.08,g);const f=new Fe;f.position.x=d*(c/2+.03),f.rotation.y=d*Math.PI/2,i.add(f);for(const g of[-c/4,c/4])Bn(f,g,3.53,0,.7,1.12)}Et(i,c,.2,c,H.wood,0,4.95),ri(i,c+.5,c+.5,2.35,5.04),Qr(i,0,.22,c/2+.06,1.7,2.65,!0);for(const d of[-1.04,1.04])ye(i,.2,.26,2.65,"#89908d",d,1.55,c/2+.06),Et(i,.57,.19,.42,H.stone,d,2.98,c/2);const h=kt(i,new wn(.31,.045,6,12),H.gold,0,1.55,c/2+.23);for(const d of[0,Math.PI/3,-Math.PI/3])Et(i,.55,.04,.045,H.gold,0,1.55,h.position.z).rotation.z=d;for(const d of[-c*.32,c*.32])Bn(i,d,3.55,c/2+.03,.85,1.2);Bn(i,0,5.18,c/2+.27,1,1.3),He(i,-1.65,1.7,c/2+.17),He(i,1.65,1.7,c/2+.17),ao(i,l,.64,1.45,-c/2+.46,2.85,c/2+.15);const u=ye(i,.37,.37,.09,H.gold,0,3.24,c/2+.18,12);u.rotation.x=Math.PI/2}else if(r==="crypt"){Ae(i,8.6,.5,8.6,0,-.4),Ae(i,7.7,.65,7.6),Ae(i,6.55,4.55,6.6,0,.6,-.15),ri(i,7.2,7.3,3.5,5.2,0,-.15),Qr(i,0,.55,3.2,2.15,3.8,!0);for(const h of[-1.42,1.42])ye(i,.18,.26,3.65,"#818b93",h,2.55,3.26),ve(i,[h,4.32,3.26],[0,5.3,3.26],.24,H.stone);for(const h of[-3.24,3.24]){Ae(i,1.22,7.8,1.3,h,.5,2.6);const u=kt(i,new we(1,3.3,4),H.slate[0],h,9.8,2.6);u.rotation.y=Math.PI/4,Bn(i,h,5.8,3.3,.43,1.3,!0),kt(i,new we(.12,.8,5),H.iron,h,11.85,2.6)}const c=ye(i,.72,.72,.09,"#a32940",0,6.05,3.55,12);c.rotation.x=Math.PI/2,c.material=er("#a32940",!0),kt(i,new wn(.75,.09,6,16),H.iron,0,6.05,3.64);for(let h=0;h<6;h++)Et(i,1.4,.045,.07,H.iron,0,6.05,3.68).rotation.z=h*Math.PI/6;He(i,-1.95,1.75,3.5,!0),He(i,1.95,1.75,3.5,!0);for(const h of[-1,1]){const u=new Fe;u.position.set(h*3.32,0,-.6),u.rotation.y=h*Math.PI/2,i.add(u);for(const d of[-1.4,1.4])Bn(u,d,2.3,0,.68,1.85,!0)}for(const h of[-2.9,2.9])for(const u of[-2.9,-.6])ve(i,[h,.6,u],[h*.9,4.8,u],.45,H.stoneDark),kt(i,new we(.35,1.6,4),H.iron,h,5.2,u);for(const h of[-3.7,3.7])for(const u of[-3.7,3.7])Et(i,.9,.5,.9,H.stoneDark,h,.05,u),kt(i,new we(.34,2.6,4),"#20242c",h,1.75,u).rotation.y=Math.PI/4,kt(i,new we(.2,.7,5),"#e0344b",h,3.25,u,!0);ye(i,1.25,1.45,.35,"#2a2f36",0,.25,4.4,14),ye(i,1.02,1.02,.12,"#9c1b2b",0,.46,4.4,14);for(const h of[-4.3,4.3])for(const u of[-4.3,4.3])kt(i,new ds(.24,6,5),"#cfc6b0",h,.4,u).scale.set(1,.8,1)}else if(r==="forge"){Ae(i,4.6,.6,4.4),Et(i,4.2,2.3,4,"#3b3b42",0,1.75),ri(i,4.7,4.6,1.7,2.95);const c=Ne(i,[[-.62,0],[.62,0],[.44,.95],[0,1.3],[-.44,.95]],.12,"#ff7a1e",0,.85,2.06);c.material=er("#ff7a1e",!0),Et(i,1.7,.18,.5,H.iron,0,1.6,2.12),Ae(i,1.15,4.4,1.15,-1.45,.5,-1.25),Et(i,1.35,.3,1.35,H.iron,-1.45,4.95,-1.25),kt(i,new ds(.5,7,6),"#5a5f66",-1.45,5.6,-1.25).scale.set(1,.7,1),Et(i,.42,.55,.42,H.stoneDark,1.55,.5,2.15),Et(i,1.05,.28,.6,H.iron,1.55,.92,2.15),kt(i,new we(.22,.7,5),H.iron,2.2,.95,2.15).rotation.z=-Math.PI/2;for(const h of[-1.2,-.6,0])Ne(i,[[0,-.35],[.08,.35],[-.08,.35]],.05,"#b4bac6",h,1.9,2.02);He(i,-2.15,1.4,1.9,!0),He(i,2.15,1.4,1.9,!0)}else if(r==="relic"){Ae(i,4.5,.6,4.3),Ae(i,3.9,3.2,3.8,0,.6),ri(i,4.4,4.3,2.6,3.75);for(const h of[-1,1])Ae(i,.9,5.2,.9,h*1.85,.6,-1.5),kt(i,new we(.72,2.2,4),H.slate[0],h*1.85,6.4,-1.5).rotation.y=Math.PI/4;Qr(i,0,.65,1.92,1.1,1.7,!0),Bn(i,0,4.15,.2,.85,1.25,!0),kt(i,new ds(.5,10,8),"#c0203d",0,5.6,0).scale.set(1,1.25,.8),kt(i,new we(.5,.55,8),"#c0203d",0,5.05,0).rotation.z=Math.PI,kt(i,new wn(.72,.06,6,20),"#e6b0ba",0,5.6,0).rotation.x=Math.PI/2,He(i,-1.5,1.5,1.95,!0),He(i,1.5,1.5,1.95,!0)}else if(r==="mist"){Ae(i,4.4,.5,2.6);for(const h of[-1,1])Ae(i,.85,4.6,.85,h*1.5,.5),kt(i,new we(.6,1.4,4),H.stoneDark,h*1.5,5.5,0).rotation.y=Math.PI/4;kt(i,new wn(1.5,.32,8,20,Math.PI),H.stone,0,5.05,0);const c=kt(i,new An(2.1,3.9),"#8fd6d0",0,2.7,.06,!0,!0);c.material=new Xe({color:"#8fd6d0",transparent:!0,opacity:.32,side:ke,depthWrite:!1});for(let h=0;h<3;h++)kt(i,new wn(1.1+h*.35,.05,5,20),"#5f8f8a",0,.58,0).rotation.x=Math.PI/2;He(i,-1.5,1.4,1),He(i,1.5,1.4,1)}else if(r==="shrine"){Ae(i,4.4,.6,4.2),Ae(i,3.4,.7,3.2,0,.6),Ae(i,2.4,.7,2.2,0,1.3),kt(i,new we(.62,4.2,4),"#2a2434",0,3.6,0).rotation.y=Math.PI/4,kt(i,new hr(.4),"#b45ad6",0,5.9,0,!0);for(let c=0;c<4;c++){const h=c*Math.PI/2+Math.PI/4,u=kt(i,new hr(.26),"#8f46b8",Math.cos(h)*1.5,4.4+c%2*.5,Math.sin(h)*1.5,!0);u.scale.set(.7,1.6,.7),u.rotation.z=h}for(const c of[-1,1])Et(i,.5,.9,.5,H.stoneDark,c*1.55,1.4,1.35),kt(i,new we(.2,.7,5),"#d060ff",c*1.55,2.15,1.35,!0);He(i,0,1.9,2.2,!0)}return e||i.traverse(c=>{c instanceof $t&&(c.material=er("#96836b"),c.castShadow=!1)}),i.scale.set(s/a,1,s/a),i.updateMatrixWorld(!0),i.userData.healthBarHeight=new un().setFromObject(i).max.y+.5,gr(i),i}function ay(r,t,e){const n=ws.find(i=>{const s=Yl(i);return Math.hypot(t-s.x,e-s.z)<3});((n==null?void 0:n.facing)==="east"||(n==null?void 0:n.facing)==="west")&&(r.rotation.y=Math.PI/2)}function nd(){const r=[],t=[];for(let n=0;n<4;n++){const i=2.3-n*.48,s=n*1.05;for(let o=0;o<10;o++){const a=o*Math.PI/5,l=(o+1)*Math.PI/5,c=i*(.86+o%3*.07),h=i*(.86+(o+1)%3*.07);r.push(Math.sin(a)*c,s+o%2*.15,Math.cos(a)*c,.1*Math.sin(n),s+3.1-n*.12,-.08*n,Math.sin(l)*h,s+(o+1)%2*.15,Math.cos(l)*h);const u=new wt(["#2b403a","#354f43","#415b48","#4b614c"][(o+n)%4]);for(let d=0;d<3;d++)t.push(u.r,u.g,u.b)}}const e=new _e;return e.setAttribute("position",new Ht(r,3)),e.setAttribute("color",new Ht(t,3)),e.computeVertexNormals(),e}function id(r=0){const t=new cr(1,1),e=t.getAttribute("position");for(let n=0;n<e.count;n++){const i=e.getX(n),s=e.getY(n),o=e.getZ(n),a=.87+Math.sin(i*8+s*5+o*7+r)*.1;e.setXYZ(n,i*a,s*a,o*a)}return t.computeVertexNormals(),t}function ly(r){const t=new Fe;if(r==="wood"){ye(t,.19,.59,5.6,H.wood,0,2.8,0,7);for(let n=0;n<5;n++){const i=n*Math.PI*.4;ve(t,[Math.sin(i)*.78,.08,Math.cos(i)*.78],[0,.72,0],.19,H.wood),ve(t,[0,2.6+n*.3,0],[Math.sin(i)*1.2,3.1+n*.3,Math.cos(i)*1.2],.11,H.woodLight)}const e=new $t(nd(),new Iu({vertexColors:!0,roughness:1,flatShading:!0,side:ke}));e.position.y=2.55,e.castShadow=!0,t.add(e)}else{const e=[[0,1,-.3,1.8,1.7,1.5],[-1.15,.7,.25,.85,1.15,.85],[1.13,.75,.1,.9,1.2,.9]],n=[];for(const[s,o]of e.entries()){const a=kt(t,id(s),s?"#677077":"#545f68",o[0],o[1],o[2]);a.scale.set(o[3],o[4],o[5]),n.push(a)}Ne(t,[[-.65,0],[.65,0],[.7,1.35],[0,1.75],[-.7,1.35]],.08,"#101c25",0,.05,1.05);for(const s of[-.76,.76])ve(t,[s,.06,1.24],[s*.84,1.65,1.24],.18,H.woodLight);ve(t,[-.85,1.63,1.24],[.85,1.63,1.24],.22,H.wood);for(const s of[-.36,.36])Et(t,.055,.055,1.6,H.iron,s,.06,.75);for(const s of[.1,.55,1,1.45])Et(t,1,.07,.14,H.woodDark,0,.025,s);t.updateMatrixWorld(!0);const i=new Ou;for(let s=0;s<7;s++){const o=s*2.3,a=Math.sin(o)*1.2,l=Math.cos(o)*.6;i.set(new R(a,5,l),new R(0,-1,0));const c=i.intersectObjects(n,!1)[0];if(!c)continue;const h=kt(t,new hr(.18),s%2?"#b2934d":"#e1bd66",a,c.point.y-.06,l);h.scale.set(.65,1.3,.7),h.rotation.z=o}He(t,1.14,.82,.96)}return gr(t),t}const je=Yt.camera;class cy{constructor(){lt(this,"scene",new vu);lt(this,"target",new ci(1,1,{minFilter:qe,magFilter:qe}));lt(this,"uniforms",{unitRevealMask:{value:this.target.texture},unitRevealSize:{value:new Q},unitRevealFar:{value:600}});lt(this,"materials",new WeakMap);lt(this,"dummy",new ue);lt(this,"clearColor",new wt);lt(this,"circles");lt(this,"maskMaterial",new Yn({uniforms:{unitRevealFar:this.uniforms.unitRevealFar},vertexShader:`
      varying vec2 circleUv;
      varying float unitDepth;
      void main() {
        circleUv = uv;
        vec4 viewPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        unitDepth = -viewPosition.z;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,fragmentShader:`
      uniform float unitRevealFar;
      varying vec2 circleUv;
      varying float unitDepth;
      void main() {
        float radius = length(circleUv * 2.0 - 1.0);
        if (radius >= 1.0) discard;
        float strength = 1.0 - smoothstep(0.55, 1.0, radius);
        // Profundidade linear em dois canais, para preservar precisão em RGBA8.
        vec2 depth = fract(clamp(unitDepth / unitRevealFar, 0.0, 0.9999) * vec2(1.0, 255.0));
        depth.x -= depth.y / 255.0;
        gl_FragColor = vec4(depth, strength, 1.0);
      }
    `,blending:Wn,toneMapped:!1}));this.circles=this.createCircles(16)}createCircles(t){const e=new qs(new An(1,1),this.maskMaterial,t);return e.instanceMatrix.setUsage(ef),e.frustumCulled=!1,this.scene.add(e),e}apply(t){t.traverse(e=>{if(!(e instanceof $t))return;const n=i=>{let s=this.materials.get(i);return s||(s=i.clone(),s.onBeforeCompile=o=>{Object.assign(o.uniforms,this.uniforms),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
varying float revealDepth;`).replace("#include <project_vertex>",`#include <project_vertex>
revealDepth = -mvPosition.z;`),o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
              uniform sampler2D unitRevealMask;
              uniform vec2 unitRevealSize;
              uniform float unitRevealFar;
              varying float revealDepth;
            `).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
              vec4 reveal = texture2D(unitRevealMask, gl_FragCoord.xy / unitRevealSize);
              float depthGap = dot(reveal.rg, vec2(1.0, 1.0 / 255.0)) * unitRevealFar - revealDepth;
              // Recorta apenas a estrutura próxima que está na frente da unidade.
              float strength = reveal.b * step(0.3, depthGap) * (1.0 - smoothstep(14.0, 18.0, depthGap));
              float dither = fract(52.9829189 * fract(dot(floor(gl_FragCoord.xy), vec2(0.06711056, 0.00583715))));
              if (strength > dither) discard;
            `)},s.customProgramCacheKey=()=>"unit-reveal-v1",this.materials.set(i,s),this.materials.set(s,s),s)};e.material=Array.isArray(e.material)?e.material.map(n):n(e.material)})}update(t,e,n){t.getDrawingBufferSize(this.uniforms.unitRevealSize.value);const i=this.uniforms.unitRevealSize.value,s=Math.max(1,Math.ceil(i.x/2)),o=Math.max(1,Math.ceil(i.y/2));(s!==this.target.width||o!==this.target.height)&&this.target.setSize(s,o),this.uniforms.unitRevealFar.value=e.far,n.size>this.circles.instanceMatrix.count&&(this.scene.remove(this.circles),this.circles.geometry.dispose(),this.circles.dispose(),this.circles=this.createCircles(Math.max(n.size,this.circles.instanceMatrix.count*2))),e.updateMatrixWorld(!0),this.dummy.quaternion.copy(e.quaternion);let a=0;for(const h of n.values()){const u=h.userData.kind==="vampire";this.dummy.position.copy(h.position),this.dummy.position.y+=u?1.8:1.3,this.dummy.scale.setScalar(u?6.4:5.6),this.dummy.updateMatrix(),this.circles.setMatrixAt(a++,this.dummy.matrix)}this.circles.count=a,this.circles.instanceMatrix.needsUpdate=!0;const l=t.getRenderTarget(),c=t.getClearAlpha();t.getClearColor(this.clearColor),t.setRenderTarget(this.target),t.setClearColor(0,0),t.clear(),t.render(this.scene,e),t.setRenderTarget(l),t.setClearColor(this.clearColor,c)}}const to=he.tiles*he.tileSize;class hy{constructor(t,e){lt(this,"scene",new vu);lt(this,"camera");lt(this,"renderer");lt(this,"map");lt(this,"container");lt(this,"unitMeshes",new Map);lt(this,"buildingMeshes",new Map);lt(this,"nodeMeshes",new Map);lt(this,"woodTrunks",null);lt(this,"woodCrowns",null);lt(this,"woodKey","");lt(this,"hpBars",new Map);lt(this,"selectionRings",new Map);lt(this,"sun");lt(this,"hemi");lt(this,"fog");lt(this,"torches",[]);lt(this,"raycaster",new Ou);lt(this,"terrain");lt(this,"buildingSelection",null);lt(this,"towerRanges",new Map);lt(this,"mapOccluders",[]);lt(this,"unitReveal",new cy);lt(this,"animationTime",0);lt(this,"effects",[]);this.container=t,this.map=l_(e),this.renderer=new Iv({antialias:!0}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Gh,t.appendChild(this.renderer.domElement),this.camera=new $e(je.fov,t.clientWidth/t.clientHeight,1,600);const n=je.distance*je.initialZoom,i=this.heightAt(0,0);this.camera.position.set(0,i+n*je.elevation,n*je.depth),this.camera.lookAt(0,i,0),this.fog=new Bl(9084344,120,400),this.scene.fog=this.fog,this.hemi=new Rx(12571903,3820083,.9),this.scene.add(this.hemi),this.sun=new Nu(16772812,1.6),this.sun.position.set(60,100,30),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-he.half,right:he.half,top:he.half,bottom:-he.half,near:1,far:500}),this.sun.shadow.bias=-.001,this.scene.add(this.sun),this.scene.add(new Fu(4210784,.4)),this.buildTerrain(),this.buildFixedMap(),window.addEventListener("resize",()=>this.onResize())}onResize(){const t=this.container.clientWidth,e=this.container.clientHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)}buildTerrain(){const t=this.map.tiles,e=t,n=new An(to,to,e,e);n.rotateX(-Math.PI/2);const i=n.attributes.position,s=new Float32Array(i.count*3),o=new wt("#415549"),a=new wt("#65654b"),l=new wt("#65717a"),c=new wt("#7a7864"),h=new wt;for(let m=0;m<=e;m++)for(let p=0;p<=e;p++){const y=m*(e+1)+p,_=Math.min(t-1,p),x=Math.min(t-1,m),C=x*t+_,T=this.map.height[C]??0,E=this.map.water[C]?1:T*14;i.setY(y,E),this.map.water[C]?h.copy(c).lerp(l,.2):T>.62?h.copy(l):h.copy(o).lerp(a,(T-.22)*1.5);const I=_*he.tileSize-he.half,S=x*he.tileSize-he.half;for(const M of ws){const P=Math.hypot((I-M.x)/(M.width*.55),(S-M.z)/(M.depth*.55));P<1.3&&h.lerp(new wt("#72774b"),Math.max(0,1-P/1.3)*.4)}s[y*3]=h.r,s[y*3+1]=h.g,s[y*3+2]=h.b}n.setAttribute("color",new Ke(s,3)),n.computeVertexNormals();const u=new on({vertexColors:!0}),d=new $t(n,u);d.receiveShadow=!0,this.terrain=d,this.scene.add(d);const f=new An(to,to);f.rotateX(-Math.PI/2);const g=new on({color:2775690,transparent:!0,opacity:.85}),v=new $t(f,g);v.position.y=2.4,this.scene.add(v)}buildFixedMap(){const t=new on({color:4608870}),e=(m,p,y,_,x,C,T=3)=>{const E=new $t(new qn(y,x,_),C);return E.castShadow=!0,E.receiveShadow=!0,E.position.set(m,T+x/2,p),this.unitReveal.apply(E),this.scene.add(E),E};for(const m of ws){const p=Yl(m),y=Math.hypot(p.x,p.z);for(let _=12;_<y;_+=4){const x=_/y,C=new $t(new vo(1.5,7),new on({color:"#817355",transparent:!0,opacity:.14}));C.rotation.x=-Math.PI/2,C.position.set(p.x*x+Math.sin(_*.13),3.04,p.z*x),C.scale.set(1,1.8,1),this.scene.add(C)}for(const _ of[-1,1]){const x=m.facing==="north"||m.facing==="south",C=p.x+(x?_*2.2:0),T=p.z+(x?0:_*2.2);e(C,T,.3,.3,3,new on({color:3943461}));const E=ed();E.position.set(C,5.25,T+.18),this.scene.add(E)}}const n=[],i=[],s=new ue,o=[];for(const m of this.map.obstacles){const p=m.width>m.depth,y=Math.max(m.width,m.depth);this.mapOccluders.push(e(m.x,m.z,m.width,m.depth,2.1,t));const _=Math.ceil(y/3),x=y/_;for(let C=0;C<_;C++){const T=-y/2+x*(C+.5),E=4.3+(Math.sin(C*2.7+m.x)+1)*1.8;s.scale.set(p?x*.65:m.width/2,E/2,p?m.depth/2:x*.65),s.position.set(m.x+(p?T:0),3+E/2,m.z+(p?0:T)),s.rotation.set(0,0,0),s.updateMatrix(),n.push(s.matrix.clone()),i.push(new wt(C%3?"#657078":"#77807c")),C%3===0&&(s.position.y+=E*.35,s.scale.set(1.1,.3,1),s.updateMatrix(),o.push(s.matrix.clone()))}}const a=new qs(id(),new on({color:16777215}),n.length);n.forEach((m,p)=>{a.setMatrixAt(p,m),a.setColorAt(p,i[p])}),a.castShadow=!0,a.receiveShadow=!0,this.unitReveal.apply(a),this.scene.add(a),this.mapOccluders.push(a);const l=new qs(new cr(.8),new on({color:"#425341"}),o.length);o.forEach((m,p)=>l.setMatrixAt(p,m)),this.unitReveal.apply(l),this.scene.add(l);const c=new $t(new vo(10,32),new on({color:7370613}));c.rotation.x=-Math.PI/2,c.position.y=3.06,this.scene.add(c);const h=new $t(new Si(8.7,9,32),new Xe({color:10787710}));h.rotation.x=-Math.PI/2,h.position.y=3.08,this.scene.add(h);const u=(m,p)=>{const y=m.attributes.position;for(let _=0;_<y.count;_++)y.setY(_,this.heightAt(En.x+y.getX(_),En.z+y.getZ(_))+p);y.needsUpdate=!0,m.computeVertexNormals()},d=new Si(.02,16,64,8);d.rotateX(-Math.PI/2),u(d,.02);const f=new $t(d,new on({color:2761008}));f.position.set(En.x,0,En.z),this.scene.add(f);const g=new Si(14.2,14.6,64,1);g.rotateX(-Math.PI/2),u(g,.05);const v=new $t(g,new Xe({color:9316917}));v.position.set(En.x,0,En.z),this.scene.add(v)}heightAt(t,e){const n=this.map.tiles,i=Se.clamp((t+he.half)/he.tileSize,0,n-1e-4),s=Se.clamp((e+he.half)/he.tileSize,0,n-1e-4),o=Math.floor(i),a=Math.floor(s),l=i-o,c=s-a,h=(v,m)=>{const p=Math.min(n-1,a+m)*n+Math.min(n-1,o+v);return this.map.water[p]?1:(this.map.height[p]??0)*14},u=h(0,0),d=h(1,0),f=h(0,1),g=h(1,1);return l+c<=1?u+(d-u)*l+(f-u)*c:g+(f-g)*(1-l)+(d-g)*(1-c)}sync(t){var o;const e=new Set;for(const a of t.units){e.add(a.id);let l=this.unitMeshes.get(a.id);l||(l=ry(a.kind,a.owner,a.hero!==!1),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),l.userData.pick={unitId:a.id},this.unitMeshes.set(a.id,l),this.scene.add(l),l.userData.tx=a.x,l.userData.tz=a.z),l.userData.tx=a.x,l.userData.tz=a.z,l.userData.kind=a.kind,l.userData.hp=a.hp,l.userData.maxHp=a.maxHp,l.userData.activity=a.activity,l.userData.resource=a.carryRes??((o=t.nodes.find(h=>h.id===a.targetId))==null?void 0:o.kind);const c=t.nodes.find(h=>h.id===a.targetId)??t.buildings.find(h=>h.id===a.targetId)??t.units.find(h=>h.id===a.targetId);c&&(a.activity==="gathering"||a.activity==="building"||a.activity==="repairing"||a.activity==="attacking")&&(l.rotation.y=Math.atan2(c.x-l.position.x,c.z-l.position.z)),l.userData.bar||this.addHealthBar(l,a.id),this.updateHealthBar(a.id,a.hp,a.maxHp)}for(const[a,l]of this.unitMeshes)if(!e.has(a)){this.scene.remove(l);const c=this.hpBars.get(a);c&&this.scene.remove(c),this.hpBars.delete(a);const h=this.selectionRings.get(a);h&&this.scene.remove(h),this.selectionRings.delete(a),this.unitMeshes.delete(a)}const n=new Set;for(const a of t.buildings){n.add(a.id);let l=this.buildingMeshes.get(a.id);const c=l&&l.userData.done===!1&&a.done,h=(l==null?void 0:l.userData.recruiting)&&!a.recruitment,u=l?Math.max(0,(a.goldProduced??0)-(l.userData.goldProduced??a.goldProduced??0)):0;l&&(l.userData.done!==a.done||a.kind==="wall"&&l.userData.level!==a.level)&&(this.scene.remove(l),l=void 0),l||(l=oy(a.kind,a.owner,a.done,a.level),this.unitReveal.apply(l),a.kind==="wall"&&ay(l,a.x,a.z),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),this.buildingMeshes.set(a.id,l),this.scene.add(l),l.userData.pick={buildingId:a.id}),l.userData.kind=a.kind,l.userData.hp=a.hp,l.userData.maxHp=a.maxHp,l.userData.done=a.done,l.userData.level=a.level,l.userData.goldProduced=a.goldProduced??0,l.userData.recruiting=!!a.recruitment,h&&this.floatingText("Peão pronto",l.position.clone().add(new R(0,5,0)),"#c0e4a7"),a.lastShot&&a.lastShot.tick!==l.userData.lastShotTick&&((l.userData.lastShotTick!==void 0||t.tick-a.lastShot.tick<=2)&&this.towerShotEffect(l,a.lastShot),l.userData.lastShotTick=a.lastShot.tick),u>0&&this.productionEffect(l.position,u),c&&(this.floatingText("Obra concluída",l.position.clone().add(new R(0,5,0)),"#c0e4a7"),this.dustEffect(l.position,"#bca77f")),l.scale.y=a.done?1:Math.max(.15,a.progress),l.userData.bar?this.hpBars.has(a.id)||this.hpBars.set(a.id,l.userData.bar):this.addBuildingHealthBar(l,a.id,a.kind),l.userData.bar=this.hpBars.get(a.id),this.updateHealthBar(a.id,a.hp,a.maxHp)}for(const[a,l]of this.buildingMeshes)if(!n.has(a)){this.scene.remove(l),this.buildingMeshes.delete(a);const c=this.hpBars.get(a);c&&this.scene.remove(c),this.hpBars.delete(a)}const i=new Set,s=t.nodes.filter(a=>a.kind==="wood");this.syncWoodNodes(s);for(const a of t.nodes){if(a.kind==="wood"){i.add(a.id);continue}i.add(a.id);let l=this.nodeMeshes.get(a.id);l||(l=ly(a.kind),this.unitReveal.apply(l),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),l.userData.x=a.x,l.userData.z=a.z,l.userData.nodeId=a.id,l.userData.pick={nodeId:a.id},this.nodeMeshes.set(a.id,l),this.scene.add(l));const c=a.amount/a.maxAmount;l.scale.setScalar(.4+.6*c)}for(const[a,l]of this.nodeMeshes)i.has(a)||(this.dustEffect(l.position,"#9b8c69"),this.scene.remove(l),this.nodeMeshes.delete(a))}syncWoodNodes(t){const e=t.map(f=>f.id).join(",");if(e===this.woodKey)return;this.woodKey=e,this.woodTrunks&&(this.scene.remove(this.woodTrunks),this.woodTrunks.geometry.dispose(),this.woodTrunks.material.dispose(),this.woodTrunks=null),this.woodCrowns&&(this.scene.remove(this.woodCrowns),this.woodCrowns.geometry.dispose(),this.woodCrowns.material.dispose(),this.woodCrowns=null);const n=3,i=[],s=new qs(new hi(.19,.35,3,7),new on({color:4799281}),Math.max(1,t.length*n)),o=new qs(nd(),new on({vertexColors:!0,side:ke}),Math.max(1,t.length*n));s.castShadow=!0,o.castShadow=!0,this.unitReveal.apply(s),this.unitReveal.apply(o);const a=new Tt,l=new De,c=new R,h=new R,u=new R(0,1,0);let d=0;for(const f of t){const g=this.heightAt(f.x,f.z);for(let v=0;v<n;v++){const m=f.id*2.4+v*2.1,p=.75+(f.id*13+v*7)%9/9*.45;l.setFromAxisAngle(u,m),c.set(p*.88,p,p*.88),h.set(f.x+Math.sin(m)*1.7,g+1.5*p,f.z+Math.cos(m)*1.7),a.compose(h,l,c),s.setMatrixAt(d,a),h.set(f.x+Math.sin(m)*1.7,g+2.1*p,f.z+Math.cos(m)*1.7),a.compose(h,l,c),o.setMatrixAt(d,a),i.push(f.id),d++}}s.count=d,o.count=d,s.instanceMatrix.needsUpdate=!0,o.instanceMatrix.needsUpdate=!0,s.userData.woodNodeIds=i,o.userData.woodNodeIds=i,this.woodTrunks=s,this.woodCrowns=o,this.scene.add(s,o)}addHealthBar(t,e){const n=new $t(new An(1.4,.18),new Xe({color:3857242,depthTest:!1,transparent:!0}));n.renderOrder=20,n.position.y=4.4,this.scene.add(n),this.hpBars.set(e,n),t.userData.bar=n}addBuildingHealthBar(t,e,n){const i=this.hpBars.get(e);if(i){t.userData.bar=i;return}const s=n==="wall"?2.4:n==="tower"?3.2:5,o=new $t(new An(s,.35),new Xe({color:3857242,depthTest:!1,transparent:!0}));o.renderOrder=20,this.scene.add(o),this.hpBars.set(e,o),t.userData.bar=o}updateHealthBar(t,e,n){const i=this.hpBars.get(t);if(!i)return;const s=n>0?Math.max(0,e/n):0;i.scale.x=Math.max(.01,s),i.material.color.setHex(s>.5?3857242:s>.25?14397754:14367290)}buildingBarHeight(t){switch(t){case"wall":return 4.6;case"tower":return 9.2;case"bank":return 7.8;case"keep":return 10.2;case"taverna":return 8.2;case"crypt":return 11.5;case"forge":return 6.6;case"relic":return 8.4;case"mist":return 7.2;case"shrine":return 7.4;default:return 8}}sizeLabel(t){const e=2*Math.tan(Se.degToRad(this.camera.fov/2))/this.container.clientHeight;t.scale.set(180*e,32*e,1)}addEffect(t,e,n,i=!1,s){this.effects.length>=100&&this.disposeEffect(this.effects.shift().object),this.scene.add(t),this.effects.push({object:t,velocity:e,lifetime:n,age:0,spin:i,onComplete:s})}disposeEffect(t){this.scene.remove(t),t.traverse(e=>{var n;if(e instanceof $t&&e.geometry.dispose(),e instanceof $t||e instanceof la){const i=Array.isArray(e.material)?e.material:[e.material];for(const s of i)(n=s.map)==null||n.dispose(),s.dispose()}})}towerShotEffect(t,e){const n=t.position.clone().add(new R(0,7.2,0)),i=new R(e.x,this.heightAt(e.x,e.z)+1.3,e.z),s=t.getObjectByName("turret");s&&(s.rotation.y=Math.atan2(e.x-t.position.x,e.z-t.position.z));const o=new Fe;o.userData.effect="tower-shot";const a=new $t(new qn(.09,.09,1.5),new Xe({color:"#ffdb91"})),l=new $t(new we(.18,.4,4),new Xe({color:"#e8f2ff"}));l.rotation.x=Math.PI/2,l.position.z=.9,o.add(a,l),o.position.copy(n),o.lookAt(i);const c=Se.clamp(n.distanceTo(i)/40,.12,.5);this.addEffect(o,i.clone().sub(n).divideScalar(c),c,!1,()=>this.floatingText(`−${e.damage} HP`,i,"#ff8585"))}floatingText(t,e,n){const i=document.createElement("canvas");i.width=512,i.height=96;const s=i.getContext("2d");s.font="bold 46px system-ui",s.textAlign="center",s.lineWidth=6,s.strokeStyle="#111821",s.strokeText(t,256,63),s.fillStyle=n,s.fillText(t,256,63);const o=new Bv(i);o.colorSpace=pe;const a=new la(new xu({map:o,transparent:!0,depthTest:!1,sizeAttenuation:!1,toneMapped:!1}));a.userData.feedback=t,this.sizeLabel(a),a.position.copy(e),this.addEffect(a,new R(0,1.8,0),1.8)}productionEffect(t,e){this.floatingText(`+${e} ouro`,t.clone().add(new R(0,8,0)),"#ffe48b");for(let n=0;n<Math.min(3,e+1);n++){const i=new $t(new hi(.3,.3,.08,12),new Xe({color:"#f8ca4f",transparent:!0}));i.position.copy(t).add(new R((n-1)*.6,7,0)),i.rotation.x=Math.PI/2,this.addEffect(i,new R((n-1)*.4,2+n*.2,0),1.5,!0)}}dustEffect(t,e){for(let n=0;n<6;n++){const i=n*Math.PI/3,s=new $t(new cr(.35),new Xe({color:e,transparent:!0,opacity:.6,depthWrite:!1}));s.position.copy(t).add(new R(0,.5,0)),this.addEffect(s,new R(Math.sin(i)*1.5,.8,Math.cos(i)*1.5),1.2)}}setSelection(t){for(const[,e]of this.selectionRings)this.scene.remove(e),e.geometry.dispose(),e.material.dispose();this.selectionRings.clear();for(const e of t){const n=this.unitMeshes.get(e);if(!n)continue;const i=n.userData.kind==="vampire",s=new $t(new Si(.9,1.15,24),new Xe({color:i?14363178:3857290,transparent:!0,opacity:.8,side:ke}));s.rotation.x=-Math.PI/2,s.position.copy(n.position).add(new R(0,.15,0)),this.scene.add(s),this.selectionRings.set(e,s)}}setBuildingSelection(t){this.setTowerRange("selection",null),this.buildingSelection&&(this.scene.remove(this.buildingSelection),this.buildingSelection.geometry.dispose(),this.buildingSelection.material.dispose(),this.buildingSelection=null);const e=t===null?void 0:this.buildingMeshes.get(t);if(!e)return;const n=Pi[e.userData.kind]/2+.3,i=[[-n,-n],[n,-n],[n,n],[-n,n]].map(([s,o])=>new R(e.position.x+s,this.heightAt(e.position.x+s,e.position.z+o)+.2,e.position.z+o));this.buildingSelection=new Ov(new _e().setFromPoints(i),new kl({color:7001855,depthTest:!1})),this.scene.add(this.buildingSelection),e.userData.kind==="tower"&&this.setTowerRange("selection",e.position)}setTowerRange(t,e,n=8375039){let i=this.towerRanges.get(t);if(!e){i&&(this.scene.remove(i),i.geometry.dispose(),i.material.dispose(),this.towerRanges.delete(t));return}if(!i){const a=new Si(rs.range-.1,rs.range+.1,128);a.rotateX(-Math.PI/2),i=new $t(a,new Xe({color:n,transparent:!0,opacity:.85,side:ke,depthWrite:!1,depthTest:!1})),i.renderOrder=10,this.scene.add(i),this.towerRanges.set(t,i)}i.material.color.setHex(n);const s=`${e.x}:${e.z}`;if(i.userData.center===s)return;i.userData.center=s,i.position.set(e.x,0,e.z);const o=i.geometry.getAttribute("position");for(let a=0;a<o.count;a++)o.setY(a,this.heightAt(e.x+o.getX(a),e.z+o.getZ(a))+.16);o.needsUpdate=!0,i.geometry.computeBoundingSphere()}unitScreenPosition(t){const e=this.unitMeshes.get(t);return e?(this.camera.updateMatrixWorld(!0),e.position.clone().add(new R(0,e.userData.kind==="vampire"?1.8:1,0)).project(this.camera)):null}updateDayNight(t,e,n){const i=new wt(8893920),s=new wt(658719),o=new wt(12611664),a=t==="day"?Bu:zu,l=a-e,c=Math.min(1,l/a),h=new wt;if(t==="day"){c<.15?h.copy(o).lerp(i,c/.15):c>.85?h.copy(i).lerp(o,(c-.85)/.15):h.copy(i);const u=c*Math.PI;this.sun.position.set(Math.cos(u)*120,Math.max(10,Math.sin(u)*140),40),this.sun.intensity=1.6*Math.max(.2,Math.sin(u)),this.sun.color.setHex(c>.8?16756864:16772812),this.hemi.intensity=1.4,this.fog.near=120,this.fog.far=400}else h.copy(s),this.sun.position.set(-80,100,-60),this.sun.color.setHex(9084120),this.sun.intensity=.35,this.hemi.intensity=.25,this.fog.near=40,this.fog.far=180;if(this.fog.color.copy(h),this.scene.background=h,t==="night"&&this.torches.length===0)for(let u=0;u<6;u++){const d=new xl(16752688,0,26,1.8);this.torches.push(d),this.scene.add(d)}for(let u=0;u<this.torches.length;u++){const d=this.torches[u],f=[...this.buildingMeshes.values()].filter(v=>v.userData.done&&!["crypt","forge","relic","mist","shrine"].includes(v.userData.kind));if(f.length===0)continue;const g=f[u%f.length];d.position.set(g.position.x,this.heightAt(g.position.x,g.position.z)+4,g.position.z),d.intensity=t==="night"?12+Math.sin(this.renderer.info.render.frame*.2+u)*3:0}}screenToGround(t,e){var n;return this.camera.updateMatrixWorld(!0),this.terrain.updateMatrixWorld(!0),this.raycaster.setFromCamera(new Q(t,e),this.camera),((n=this.raycaster.intersectObject(this.terrain,!1)[0])==null?void 0:n.point)??null}pickAt(t,e){this.camera.updateMatrixWorld(!0),this.scene.updateMatrixWorld(!0),this.raycaster.setFromCamera(new Q(t,e),this.camera);const n=this.raycaster.intersectObjects([...this.unitMeshes.values()],!0)[0];if(n){for(let c=n.object;c;c=c.parent)if(c.userData.pick)return c.userData.pick}const i=this.renderer.domElement.getBoundingClientRect();let s=10,o;for(const[c]of this.unitMeshes){const h=this.unitScreenPosition(c);if(h.z<-1||h.z>1)continue;const u=Math.hypot((h.x-t)*i.width/2,(h.y-e)*i.height/2);u<s&&(s=u,o=c)}if(o!==void 0)return{unitId:o};const l=this.raycaster.intersectObjects([...this.buildingMeshes.values(),...this.nodeMeshes.values(),...this.woodTrunks?[this.woodTrunks,this.woodCrowns]:[],...this.mapOccluders,this.terrain],!0)[0];if(l){const c=l.object.userData.woodNodeIds;if(c&&l.instanceId!==void 0){const h=c[l.instanceId];if(h!==void 0)return{nodeId:h}}if(l.object!==this.terrain){for(let h=l.object;h;h=h.parent)if(h.userData.pick)return h.userData.pick}}return{}}render(t){var e;this.animationTime+=t;for(let n=this.effects.length-1;n>=0;n--){const i=this.effects[n];if(i.age+=t,i.age>=i.lifetime){this.disposeEffect(i.object),this.effects.splice(n,1),(e=i.onComplete)==null||e.call(i);continue}i.object.position.addScaledVector(i.velocity,t),i.spin&&(i.object.rotation.z+=t*5),i.object.traverse(s=>{if(s instanceof $t||s instanceof la){const o=Array.isArray(s.material)?s.material:[s.material];for(const a of o)a.transparent&&(a.opacity=Math.min(1,(i.lifetime-i.age)*2))}})}for(const n of this.buildingMeshes.values()){const i=n.getObjectByName("tavernSign");i&&(i.rotation.z=Math.sin(this.animationTime*1.8+n.position.x)*.08)}for(const n of this.unitMeshes.values()){const i=n.userData.tx??n.position.x,s=n.userData.tz??n.position.z,o=i-n.position.x,a=s-n.position.z,l=n.userData.activity==="moving"&&Math.hypot(o,a)>.015,c=["gathering","building","repairing","attacking"].includes(n.userData.activity);if(l&&(n.rotation.y=Math.atan2(o,a)),n.userData.externalAsset){const m=["gathering","building","repairing"].includes(n.userData.activity),p=n.userData.activity==="attacking"?"attack":m?"working":l?"walking":"idle";Qu(n,p,t)}const h=Math.sin(this.animationTime*(c?11:9));for(const[m,p]of[["leftLeg",1],["rightLeg",-1]]){const y=n.getObjectByName(m);y&&(y.rotation.x=l?h*.6*p:0)}const u=n.getObjectByName("leftArm"),d=n.getObjectByName("rightArm");u&&(u.rotation.x=l?-h*.45:c?-.5:0),d&&(d.rotation.x=c?-.85+h*.6:l?h*.35:-.15);const f=n.getObjectByName("tool");f&&(f.rotation.z=c?Math.PI-.1:-2.25,f.rotation.x=0);for(const m of["axe","pickaxe","hammer"]){const p=n.getObjectByName(m);p&&(p.visible=m===(n.userData.activity==="building"||n.userData.activity==="repairing"?"hammer":n.userData.resource==="gold"?"pickaxe":"axe"))}const g=n.getObjectByName("cloak");g&&(g.rotation.x=l?-.1+Math.sin(this.animationTime*5)*.055:Math.sin(this.animationTime*1.8)*.015,g.rotation.z=Math.sin(this.animationTime*(l?4:1.4))*(l?.025:.008)),n.position.x+=(i-n.position.x)*Math.min(1,t*10),n.position.z+=(s-n.position.z)*Math.min(1,t*10),n.position.y=this.heightAt(n.position.x,n.position.z);const v=n.userData.bar;v&&(v.position.set(n.position.x,n.position.y+(n.userData.healthBarHeight??4.4),n.position.z),v.quaternion.copy(this.camera.quaternion))}for(const n of this.buildingMeshes.values()){const i=n.userData.bar;i&&(i.position.set(n.position.x,n.position.y+(n.userData.healthBarHeight??this.buildingBarHeight(n.userData.kind))*n.scale.y,n.position.z),i.quaternion.copy(this.camera.quaternion))}for(const[n,i]of this.selectionRings){const s=this.unitMeshes.get(n);s&&i.position.set(s.position.x,s.position.y+.15,s.position.z)}this.unitReveal.update(this.renderer,this.camera,this.unitMeshes),this.renderer.render(this.scene,this.camera)}}class uy{constructor(t,e,n,i,s,o){lt(this,"selected",[]);lt(this,"selectedBuilding",null);lt(this,"inspectedUnit",null);lt(this,"buildMode",null);lt(this,"ghost",null);lt(this,"buildPointer",null);lt(this,"buildTarget",null);lt(this,"buildValid",!1);lt(this,"dragStart",null);lt(this,"dragBox");lt(this,"keys",new Set);lt(this,"camTarget",new R(0,0,0));lt(this,"zoom",je.initialZoom);this.scene=t,this.net=e,this.container=n,this.getMyId=i,this.getSnap=s,this.onSelectionChanged=o,this.dragBox=document.createElement("div"),this.dragBox.style.cssText=`
      position: fixed; display: none; border: 2px solid #6ad66a;
      background: rgba(106, 214, 106, 0.12); pointer-events: none; z-index: 10;
    `,document.body.appendChild(this.dragBox),window.addEventListener("keydown",l=>{l.target.matches("input, textarea, select")||(this.keys.add(l.key.toLowerCase()),l.key.toLowerCase()==="escape"&&this.cancelBuild())}),window.addEventListener("keyup",l=>this.keys.delete(l.key.toLowerCase())),window.addEventListener("blur",()=>{this.keys.clear(),this.dragStart=null,this.dragBox.style.display="none"}),this.scene.renderer.domElement.addEventListener("wheel",l=>{l.preventDefault(),this.zoom=Se.clamp(this.zoom+l.deltaY*je.wheelSensitivity,je.minZoom,je.maxZoom)},{passive:!1});const a=this.scene.renderer.domElement;a.addEventListener("pointerdown",l=>this.onDown(l)),a.addEventListener("pointermove",l=>this.onMove(l)),a.addEventListener("pointerleave",()=>{this.buildPointer=null,this.updateBuildPreview()}),a.addEventListener("pointerup",l=>this.onUp(l)),a.addEventListener("pointercancel",()=>{this.dragStart=null,this.dragBox.style.display="none"}),a.addEventListener("contextmenu",l=>l.preventDefault())}updateCamera(t){const e=je.panSpeed*t*this.zoom,n=this.keys;(n.has("w")||n.has("arrowup"))&&(this.camTarget.z-=e),(n.has("s")||n.has("arrowdown"))&&(this.camTarget.z+=e),(n.has("a")||n.has("arrowleft"))&&(this.camTarget.x-=e),(n.has("d")||n.has("arrowright"))&&(this.camTarget.x+=e);const i=he.half-1;this.camTarget.x=Se.clamp(this.camTarget.x,-i,i),this.camTarget.z=Se.clamp(this.camTarget.z,-i,i),this.camTarget.y=this.scene.heightAt(this.camTarget.x,this.camTarget.z);const s=je.distance*this.zoom,o=this.scene.camera,a=new R(this.camTarget.x,this.camTarget.y+s*je.elevation,this.camTarget.z+s*je.depth);o.position.lerp(a,Math.min(1,t*je.smoothing)),o.lookAt(this.camTarget)}focusOn(t,e){this.camTarget.set(t,this.scene.heightAt(t,e),e)}ndc(t){const e=this.scene.renderer.domElement.getBoundingClientRect();return{x:(t.clientX-e.left)/e.width*2-1,y:-((t.clientY-e.top)/e.height)*2+1}}onDown(t){if(t.preventDefault(),t.button===0){if(this.buildMode){this.placeBuild(t);return}this.dragStart={x:t.clientX,y:t.clientY},this.scene.renderer.domElement.setPointerCapture(t.pointerId)}else t.button===2&&this.rightClick(t)}onMove(t){if(this.buildMode&&this.ghost&&(this.buildPointer={clientX:t.clientX,clientY:t.clientY},this.updateBuildPreview()),this.dragStart){const e=Math.min(this.dragStart.x,t.clientX),n=Math.min(this.dragStart.y,t.clientY),i=Math.abs(t.clientX-this.dragStart.x),s=Math.abs(t.clientY-this.dragStart.y);this.dragBox.style.cssText+=`display:block; left:${e}px; top:${n}px; width:${i}px; height:${s}px;`}}onUp(t){if(this.scene.renderer.domElement.hasPointerCapture(t.pointerId)&&this.scene.renderer.domElement.releasePointerCapture(t.pointerId),this.dragBox.style.display="none",!this.dragStart||t.button!==0){this.dragStart=null;return}const e=this.dragStart;this.dragStart=null;const n=Math.hypot(t.clientX-e.x,t.clientY-e.y)>8,i=this.getSnap();if(!i)return;const s=this.getMyId();if(this.selectedBuilding=null,this.inspectedUnit=null,n){const o=this.scene.renderer.domElement.getBoundingClientRect(),a=Math.min(e.x,t.clientX),l=Math.max(e.x,t.clientX),c=Math.min(e.y,t.clientY),h=Math.max(e.y,t.clientY);t.shiftKey||(this.selected=[]);for(const u of i.units){if(u.owner!==s)continue;const d=this.scene.unitScreenPosition(u.id);if(!d||d.z<-1||d.z>1)continue;const f=o.left+(d.x+1)/2*o.width,g=o.top+(1-d.y)/2*o.height;f>=a&&f<=l&&g>=c&&g<=h&&!this.selected.includes(u.id)&&this.selected.push(u.id)}}else{const o=this.ndc(t),a=this.scene.pickAt(o.x,o.y);if(a.unitId!==void 0){const l=i.units.find(c=>c.id===a.unitId);l&&l.owner===s?this.selected=t.shiftKey?this.selected.includes(l.id)?this.selected.filter(c=>c!==l.id):[...this.selected,l.id]:[l.id]:(this.selected=[],this.inspectedUnit=(l==null?void 0:l.id)??null)}else this.selected=[],this.selectedBuilding=a.buildingId??null}this.scene.setSelection(this.inspectedUnit===null?this.selected:[this.inspectedUnit]),this.scene.setBuildingSelection(this.selectedBuilding),this.onSelectionChanged()}rightClick(t){if(this.buildMode){this.cancelBuild();return}if(this.selected.length===0)return;const e=this.getSnap();if(!e)return;const n=this.ndc(t),i=this.scene.pickAt(n.x,n.y);if(i.nodeId!==void 0&&this.getMyId()!==en){this.net.command({type:"gather",ids:this.selected,nodeId:i.nodeId});return}if(i.unitId!==void 0){const o=e.units.find(a=>a.id===i.unitId);if(o&&o.owner===en!=(this.getMyId()===en)){this.net.command({type:"attack",ids:this.selected,targetId:i.unitId});return}}if(i.buildingId!==void 0){const o=e.buildings.find(a=>a.id===i.buildingId);if(o&&o.owner>=0&&o.owner===en!=(this.getMyId()===en)){this.net.command({type:"attack",ids:this.selected,targetId:i.buildingId});return}if(o&&!o.done&&o.owner===this.getMyId()){this.net.command({type:"resumeBuild",ids:this.selected,targetId:o.id});return}if(o&&o.done&&o.kind==="wall"&&o.owner===this.getMyId()&&o.hp<o.maxHp){this.net.command({type:"repair",ids:this.selected,targetId:o.id});return}if(o){const a=e.units.find(l=>this.selected.includes(l.id));if(a){const l=Pi[o.kind]/2+2,c=a.x-o.x,h=a.z-o.z,u=Math.abs(c)>Math.abs(h)?o.x+Math.sign(c||1)*l:o.x,d=Math.abs(c)>Math.abs(h)?o.z:o.z+Math.sign(h||1)*l;this.net.command({type:"move",ids:this.selected,x:u,z:d})}return}}const s=this.scene.screenToGround(n.x,n.y);s&&this.net.command({type:"move",ids:this.selected,x:s.x,z:s.z})}enterBuild(t){const e=this.getSnap();if(!(e!=null&&e.units.some(s=>s.owner===this.getMyId()&&s.kind==="worker"&&this.selected.includes(s.id))))return;this.cancelBuild(),this.buildMode=t;const n=Pi[t],i=t==="tower"?new hi(n/2.4,n/2,6,8):new qn(n,3,n);this.ghost=new $t(i,new Xe({color:7001706,transparent:!0,opacity:.45,depthWrite:!1,depthTest:!1})),this.ghost.visible=!1,this.ghost.renderOrder=11,this.scene.scene.add(this.ghost)}updateBuildPreview(){if(!this.buildMode||!this.ghost)return;const t=this.getSnap(),e=this.buildPointer&&this.ndc(this.buildPointer),n=e&&this.scene.screenToGround(e.x,e.y);if(this.buildValid=!1,this.buildTarget=null,!n||!t){this.ghost.visible=!1,this.scene.setTowerRange("placement",null);return}const i=Math.round(n.x),s=Math.round(n.z);this.buildTarget={x:i,z:s};const o=t.players.find(h=>h.id===this.getMyId()),a=Ml[this.buildMode],l=t.units.some(h=>h.owner===this.getMyId()&&h.kind==="worker"&&this.selected.includes(h.id));this.buildValid=!!o&&!t.result&&l&&o.wood>=a.wood&&o.gold>=a.gold&&c_(this.scene.map,t,this.buildMode,i,s);const c=this.buildValid?7001706:16730955;this.ghost.material.color.setHex(c),this.ghost.visible=!0,this.ghost.position.set(i,this.scene.heightAt(i,s)+(this.buildMode==="tower"?3:1.5),s),this.scene.setTowerRange("placement",this.buildMode==="tower"?this.buildTarget:null,c)}cancelBuild(){this.ghost&&(this.scene.scene.remove(this.ghost),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.ghost=null),this.buildMode=null,this.buildPointer=null,this.buildTarget=null,this.buildValid=!1,this.scene.setTowerRange("placement",null)}placeBuild(t){this.buildMode&&(this.buildPointer={clientX:t.clientX,clientY:t.clientY},this.updateBuildPreview(),!(!this.buildValid||!this.buildTarget)&&(this.net.command({type:"build",ids:this.selected,kind:this.buildMode,x:this.buildTarget.x,z:this.buildTarget.z}),this.cancelBuild()))}buildable(){return[...ku]}update(t){const e=this.getSnap();if(e){const n=this.selected.filter(i=>e.units.some(s=>s.id===i&&s.owner===this.getMyId()));n.length!==this.selected.length&&(this.selected=n,this.scene.setSelection(n),this.onSelectionChanged()),this.selectedBuilding!==null&&!e.buildings.some(i=>i.id===this.selectedBuilding)&&(this.selectedBuilding=null,this.scene.setBuildingSelection(null),this.onSelectionChanged()),this.inspectedUnit!==null&&!e.units.some(i=>i.id===this.inspectedUnit)&&(this.inspectedUnit=null,this.scene.setSelection(this.selected),this.onSelectionChanged())}this.updateCamera(t),this.updateBuildPreview()}}function Ei(r){return`<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="portrait-bg-${r}"><stop stop-color="${r?"#752231":"#244e65"}"/><stop offset="1" stop-color="#090c13"/></radialGradient></defs>
    <path fill="url(#portrait-bg-${r})" d="M0 0h140v160H0z"/>
    <path fill="#080b10" d="M4 160 16 105 34 93 32 44 55 17 87 14 112 40 107 102 131 124 140 160Z"/>
    <path fill="${r?"#241d35":"#18394b"}" stroke="#435060" d="M9 160 27 106 49 98 72 117 92 95 116 108 136 160Z"/>
    <path fill="${r?"#a8b8c7":"#b78e6e"}" d="m46 54 17-21 27 8 12 26-8 33-21 18-21-25Z"/>
    <path fill="${r?"#6f8296":"#87644c"}" d="m74 47 17-6 11 26-8 33-21 18 6-26-8-8Z"/>
    <path fill="#10141e" d="m31 68 5-26 25-24 30-1 18 21-6 33-11-25-18-8-24 31 5-21Z"/>
    <path fill="${r?"#df343e":"#ccd8c1"}" d="m53 72 15 2-6 4-8-2Zm27 3 15-7-2 7-10 3Z"/>
    <path stroke="#252c38" stroke-width="2" fill="none" d="m73 72-5 16 10 1m-18 8 20 1"/>
    ${r?'<path fill="#e2e6e6" d="m61 98 3 7 3-7m9 0 3 6 2-6"/>':'<path fill="#3a2d29" d="m55 92 6 7 17 2 13-8-6 13-12 9-12-6Z"/>'}
    <path fill="${r?"#781f32":"#466378"}" stroke="#657180" d="m24 98 30 12 17 42-31-27Zm85-3-23 16-15 41 29-25Z"/>
    <path stroke="#9d7b4a" stroke-width="2" d="m61 145 23 0"/><path fill="#ad893e" d="m69 140 6 0 3 6-6 6-6-6Z"/>
  </svg>`}function dy(){return`<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="peon-bg"><stop stop-color="#526040"/><stop offset="1" stop-color="#101812"/></radialGradient></defs>
    <path fill="url(#peon-bg)" d="M0 0h140v160H0z"/>
    <path stroke="#32271c" stroke-width="10" d="m106 148 13-103"/><path stroke="#aa7745" stroke-width="5" d="m105 148 14-103"/>
    <path fill="#9aa8ac" stroke="#3e4e50" d="m104 36 24 3 8 19-15 7-10-14-9-2Z"/>
    <path fill="#353a2a" d="m15 160 5-41 31-21 39 1 27 22 9 39Z"/>
    <path fill="#847449" stroke="#b39760" d="m20 124 25-19 26 16 26-16 20 22 9 33H15Z"/>
    <path fill="#ad8664" d="m57 89 27-1 5 21-18 17-21-19Z"/>
    <path fill="#c59a73" d="m45 50 21-12 28 11 6 21-8 28-21 15-21-17-9-25Z"/>
    <path fill="#966e51" d="m75 48 19 1 6 21-8 28-21 15 6-24-7-8Z"/>
    <path fill="#543c2c" d="m46 80 11 11 15 3 17-8 7-9-4 22-21 14-18-12Z"/>
    <path fill="#d8b089" d="m60 89 17-2 8 5-13 5-11-2Z"/>
    <path fill="#313729" d="m50 66 13-2 2 4-12 2m24-4 13-3 1 5-13 2"/>
    <path stroke="#8c6446" stroke-width="2" fill="none" d="m70 69-6 14 11 1"/>
    <path fill="#b69a58" stroke="#d2b673" stroke-width="2" d="m29 49 13-25 31-8 27 15 7 22-40 8Z"/>
    <path fill="#7d6739" d="m36 40 19 5 28 1 20-4 3 11-35 9-42-12Z"/>
    <path fill="#d0b16b" stroke="#e1c684" d="m14 50 30-6 29 8 33-5 19 11-15 9-36-4-40 4-25-8Z"/>
    <path stroke="#e4ca8a" stroke-width="2" fill="none" d="m47 30 24-6 20 10m-68 26 32-4m25 4 31-3"/>
    <path fill="#4d3928" d="m41 111 10-5 13 54H50Zm44-2 10 4-5 47H79Z"/>
    <path fill="#b8a170" d="M48 129h10v9H48Zm34 0h10v9H82Z"/>
  </svg>`}function Ys(r){return r==="gold"?{icon:"🪙",name:"ouro"}:{icon:"🪵",name:"madeira"}}function fy(r,t){var n;const e=Ys(r.carryRes??((n=t.nodes.find(i=>i.id===r.targetId))==null?void 0:n.kind));switch(r.activity){case"gathering":return`Coletando ${e.name}`;case"building":return"Construindo";case"repairing":return"Reparando muro";case"attacking":return"Atacando";case"blocked":return"Sem caminho — escolha outra ordem";case"moving":return r.orderType==="gather"?`Indo coletar ${e.name}`:r.orderType==="build"?"Indo construir":r.orderType==="repair"?"Indo reparar":r.orderType==="attack"?"Indo atacar":"Movendo";default:return"Aguardando ordem"}}class py{constructor(t,e){lt(this,"el",document.createElement("details"));lt(this,"amount");const n=document.createElement("style");n.textContent=`
      .vxh-admin { position:absolute; right:16px; top:68px; width:258px; pointer-events:auto;
        border:1px solid #6b6553; background:#101923f5; box-shadow:0 8px 24px #0006; border-radius:5px; font:13px system-ui; color:#ded7c5; }
      .vxh-admin[hidden] { display:none; }
      .vxh-admin summary { cursor:pointer; padding:11px 13px; color:#dfc18c; }
      .vxh-admin-content { padding:0 13px 13px; }
      .vxh-admin small { display:block; color:#899ba8; line-height:1.5; margin-bottom:10px; }
      .vxh-admin label { display:block; margin-bottom:5px; }
      .vxh-admin input { width:100%; padding:7px; margin-bottom:8px; background:#080f18; color:#fff; border:1px solid #475361; border-radius:3px; font:14px system-ui; }
      .vxh-admin-actions { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
      .vxh-admin button { padding:8px 5px; border:1px solid #55606b; border-radius:3px; color:#e4d5b6; background:#26313e; cursor:pointer; font:13px system-ui; }
      .vxh-admin button:hover { background:#3a4a59; }.vxh-admin button[aria-pressed=true] { border-color:#c9aa6b; }
    `,document.head.appendChild(n),this.el.className="vxh-admin",this.el.hidden=!0,this.el.innerHTML=`<summary>Admin · teste solo</summary><div class="vxh-admin-content">
      <small>Ferramentas disponíveis apenas no teste solo.</small>
      <label for="admin-amount">Quantidade de recursos</label>
      <input id="admin-amount" type="number" min="1" max="${Yt.admin.maxResourceAmount}" step="1" value="${Yt.admin.defaultResourceAmount}" required>
      <div class="vxh-admin-actions"><button data-admin="gold">+ Ouro</button><button data-admin="wood">+ Madeira</button><button data-admin="blood">+ Sangue</button>
      <button data-admin="day">Dia</button><button data-admin="night">Noite</button><button data-admin="heal">Curar unidades</button></div></div>`,this.amount=this.el.querySelector("input"),this.el.addEventListener("click",i=>{var o;const s=(o=i.target.closest("[data-admin]"))==null?void 0:o.dataset.admin;if(s)if(s==="gold"||s==="wood"){if(!this.amount.reportValidity())return;const a=this.amount.valueAsNumber;e.command({type:"admin",action:"resources",wood:s==="wood"?a:0,gold:s==="gold"?a:0})}else if(s==="blood"){if(!this.amount.reportValidity())return;e.command({type:"admin",action:"blood",amount:this.amount.valueAsNumber})}else s==="day"||s==="night"?e.command({type:"admin",action:"phase",phase:s}):s==="heal"&&e.command({type:"admin",action:"heal"})}),t.appendChild(this.el)}update(t){this.el.hidden=!t.practice;for(const e of["day","night"])this.el.querySelector(`[data-admin="${e}"]`).setAttribute("aria-pressed",String(t.phase===e))}}const my='.vxh-hud{--gold: #ba9458;--gold-hi: #f1d99d;--faction: #234e71;--faction-dark: #101d2c}.vxh-hud[data-faction=vampire]{--faction: #782337;--faction-dark: #260e19}.vxh-bottom{height:236px;left:16px;right:16px;bottom:16px;gap:14px;grid-template-columns:230px 184px minmax(300px,1fr) 240px;grid-template-areas:"map portrait commands sheet"}.vxh-frame{border:3px double #b18b50;border-radius:3px;background:linear-gradient(135deg,#14202b,#080e16 55%,#0c131b);box-shadow:inset 0 0 0 3px #05080d,inset 0 0 0 4px #55442e,0 0 0 2px #16100b,0 4px 12px #0009}.vxh-frame:before,.vxh-frame:after{width:20px;height:20px;transform:none;border:0;background:linear-gradient(135deg,#fae5b2,#896038 48%,#d8b777 50%,#463222 70%);clip-path:polygon(0 0,100% 0,65% 25%,95% 60%,60% 95%,25% 65%,0 100%,0 0,22% 22%,22% 58%,58% 22%,22% 22%);box-shadow:none}.vxh-frame:before{top:-7px;left:-7px}.vxh-frame:after{bottom:-7px;right:-7px;transform:rotate(180deg)}.vxh-mapframe{grid-area:map;margin-top:-16px;padding:9px 9px 24px}.vxh-mapframe:after{content:"";width:20px;height:20px;left:auto;padding:0;border:0}.vxh-map-caption{position:absolute;bottom:4px;left:0;right:0;text-align:center;color:var(--gold-hi);font-size:11px;letter-spacing:2px}.vxh-compass{position:absolute;top:-20px;left:calc(50% - 16px);width:32px;height:32px;background:#0b141f;border:3px double #bc975c;transform:rotate(45deg);z-index:3}.vxh-compass span{display:block;transform:rotate(-45deg);text-align:center;line-height:28px;color:var(--gold-hi)}.vxh-minimap{border:1px solid #6c5635}.vxh-portrait{grid-area:portrait;padding:13px 12px 9px;gap:6px;background:linear-gradient(140deg,var(--faction-dark),#080e16 70%)}.vxh-portrait-art{width:108px;flex:1;max-height:124px;border:3px double #967447;background:#080d15}.vxh-portrait .name{color:#f1dfb5;font-size:15px;letter-spacing:.6px}.vxh-crest{position:absolute;top:0;right:12px;width:34px;height:68px;display:grid;place-items:center;clip-path:polygon(0 0,100% 0,100% 76%,50% 100%,0 76%);background:#b99054;padding:2px}.vxh-crest span{display:grid;place-items:center;width:100%;height:100%;font-size:27px;color:#efcf84;background:linear-gradient(90deg,var(--faction-dark),var(--faction),var(--faction-dark));clip-path:polygon(0 0,100% 0,100% 75%,50% 97%,0 75%)}.vxh-crest svg{width:28px;height:34px}.vxh-statbar{height:16px;flex-shrink:0;border:1px solid #8e7948;border-radius:2px}.vxh-hud[data-faction=vampire] .healthbar>i{background:linear-gradient(#bb334e,#641c2e)}.vxh-commands{grid-area:commands;display:flex;flex-direction:column;min-width:0;padding:7px 9px 9px}.vxh-commands-heading{display:flex;align-items:center;gap:10px;height:24px;flex-shrink:0;color:var(--gold-hi);font-size:11px;letter-spacing:3px;white-space:nowrap;justify-content:center}.vxh-commands-heading:before,.vxh-commands-heading:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,#9c7746)}.vxh-commands-heading:after{transform:rotate(180deg)}.vxh-panel{flex:1;min-height:0;padding:7px 0 0;border:0;box-shadow:none;background:none;display:flex;flex-wrap:nowrap;align-items:stretch;justify-content:flex-start;gap:8px;overflow:auto;scrollbar-width:thin;scrollbar-color:#8b6b3f #0b1119}.vxh-panel>.vxh-btn{flex:1 0 96px;max-width:170px;min-width:0;padding:8px 6px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3px;border:3px double #947549;border-radius:3px;background:radial-gradient(ellipse at 50% 30%,var(--faction-dark),#080e16 80%);box-shadow:inset 0 0 0 2px #080b10;font:600 14px Georgia,serif;color:#eedcaf;line-height:1.15}.vxh-panel>.vxh-btn:hover:not(:disabled){border-color:#efd395;background:radial-gradient(ellipse at 50% 30%,var(--faction),#0c121b 85%)}.vxh-panel>.vxh-btn:disabled{border-color:#65563d;color:#b6b0a3}.vxh-panel>.vxh-btn.active{border-color:#d09461;box-shadow:inset 0 0 16px var(--faction)}.vxh-card-art{display:block;width:100%;height:78px;flex-shrink:0}.vxh-card-art svg{display:block;height:100%;width:100%}.vxh-btn:disabled .vxh-card-art{opacity:.65}.vxh-panel .vxh-btn small{font:12px/1.2 Georgia,serif;margin-top:1px}.vxh-panel .vxh-cost,.vxh-panel .vxh-item-price{padding-top:5px;margin-top:auto;border-top:1px solid #59472c;width:100%}.vxh-panel>span{flex:1;align-self:center;font-size:12px}.vxh-sheet{grid-area:sheet;padding:12px;overflow-y:auto;pointer-events:auto;scrollbar-width:thin;scrollbar-color:#8b6b3f #0b1119}.vxh-sheet-heading{font-size:10px;letter-spacing:2px;margin-bottom:9px;color:var(--gold)}.vxh-selinfo{font:12px/1.5 Georgia,serif;color:#c9c2b1}.vxh-selinfo b{display:block;font-size:16px;margin-bottom:5px;color:#edd49d}.vxh-inventory{gap:4px}.vxh-inventory>span{border-color:#705939;box-shadow:none;font-size:11px}.vxh-topbar,.vxh-clock,.vxh-hero{border:3px double #aa874f;border-radius:3px;background:linear-gradient(#14202a,#070d14);box-shadow:inset 0 0 0 2px #080c12,0 3px 8px #0008}.vxh-hero{top:14px;left:18px;width:76px;padding:5px}.vxh-hero-crest{position:absolute;bottom:-24px;left:23px;width:27px;height:28px;background:var(--faction);color:#e9c47d;border:1px solid #9e7e48;font-size:23px;clip-path:polygon(0 0,100% 0,100% 68%,50% 100%,0 68%)}.vxh-hero .vxh-hero-crest svg{width:25px;height:25px}.vxh-quit{border:2px solid #ae8450;color:#f2dca9}.vxh-hud .vxh-admin{border:3px double #a07a46;border-radius:2px;background:#080f18f5;font-family:Georgia,serif}.vxh-hud .vxh-admin summary{color:#eed29b}@media (max-width: 1200px){.vxh-bottom{grid-template-columns:180px 154px minmax(250px,1fr) 190px;gap:10px;height:218px}.vxh-portrait-art{width:87px}.vxh-crest{right:6px;width:28px}.vxh-card-art{height:60px}.vxh-commands-heading{font-size:9px;letter-spacing:2px}}@media (max-width: 900px){.vxh-bottom{grid-template-columns:154px 130px minmax(0,1fr);grid-template-areas:"map portrait commands"}.vxh-sheet{display:none}.vxh-crest{width:22px;height:46px;right:4px}.vxh-crest span{font-size:19px}.vxh-portrait{padding:9px 6px}.vxh-clock{font-size:12px;max-width:210px;text-align:center}}@media (max-width: 600px){.vxh-bottom{left:8px;right:8px;bottom:8px;height:184px;gap:8px;grid-template-columns:110px 100px minmax(0,1fr)}.vxh-portrait-art{width:66px}.vxh-portrait .name{font-size:12px}.vxh-mapframe{padding:6px 6px 24px;margin-top:0}.vxh-map-caption{font-size:8px;letter-spacing:.5px}.vxh-commands-heading{letter-spacing:0;font-size:8px}.vxh-panel>.vxh-btn{flex-basis:84px;font-size:12px}.vxh-card-art{height:44px}.vxh-hero{width:52px;left:8px}.vxh-hero svg{height:48px}.vxh-hero-crest{left:14px}.vxh-topbar{top:72px;right:8px}.vxh-clock{top:12px}.vxh-hud .vxh-admin{top:118px;right:8px}}',kh={bank:'<path fill="#66503a" d="M18 42h60v37H18z"/><path fill="#b29463" d="M12 42l35-24 37 24-5 8H16z"/><path fill="#dbc092" d="M23 50h9v26h-9zm39 0h9v26h-9z"/><path fill="#19212b" d="M38 54h18v25H38z"/><path fill="#e6bd61" d="M45 61h5v9h-5z"/><path fill="#a58d6a" d="M13 79h69v7H13z"/>',taverna:'<path fill="#997349" d="M20 42h55v40H20z"/><path fill="#51362b" d="M11 44l38-31 36 31z"/><path fill="#d6ac6a" d="M25 51h13v16H25zm34 0h11v16H59z"/><path fill="#332721" d="M43 57h12v25H43z"/><path stroke="#503b2b" stroke-width="5" d="M20 46h56M22 43v39m52-39v39"/><path fill="#966329" d="M73 47h16v16H73z"/><path fill="#edc676" d="M77 51h7v8h-7z"/>',tower:'<path fill="#687984" d="M29 30h36l5 54H24z"/><path fill="#9babb2" d="M24 17h10v9h9v-9h10v9h9v-9h10v23H24z"/><path fill="#1d4b6c" d="M39 39h18v31l-9 8-9-8z"/><path fill="#d8b76e" d="M46 44h4v19h-4zm-4 7h12v4h-12z"/><path fill="#8a969a" d="M19 83h56v6H19z"/>',wall:'<path fill="#627584" d="M13 44l67-16v45L13 89z"/><path fill="#9fabb0" d="M10 34l14-3v12l12-3V28l14-3v12l12-3V22l18-4v17L10 52z"/><path stroke="#354652" stroke-width="2" d="M14 64l65-16M14 77l65-16M33 48v12m22-18v12M26 63v12m21-18v12m21-17v12"/><path fill="#245375" d="M46 43l14-3v26l-7 8-7-5z"/>',claws:'<path fill="#e4d8c6" d="M30 13l8 7-17 56-9 10zm23-3l7 9-22 64-10 7zm22 8l6 10-20 51-12 9z"/><path stroke="#b42b43" stroke-width="4" d="M23 60l-4 13m29-11l-6 16m27-20l-6 16"/>',heart:'<path fill="#ad304c" stroke="#e27d83" stroke-width="2" d="M48 79C7 49 11 23 28 22c10-1 15 6 20 14 6-10 13-16 22-13 24 8 10 37-22 56z"/><path fill="#ed9c9d" d="M22 35q1-13 14-6l-9 6-4 10z"/><path stroke="#66152b" stroke-width="3" fill="none" d="M50 35L39 48l17 4-11 16"/>',boots:'<path fill="#42364d" stroke="#b99a7a" stroke-width="2" d="M35 18h27l-5 38 21 14q7 12-6 14H27l-5-11 10-21z"/><path fill="#968277" d="M33 17h31v10H33zM24 76h52v8H27z"/><path stroke="#c1a778" stroke-width="3" d="M35 35h23m-24 9h22m-24 9h22"/>',frenzy:'<path fill="none" stroke="#c25b82" stroke-width="5" d="M77 56C85 23 45 9 25 30S24 83 53 79s30-35 10-43-32 14-18 24 25-5 13-11"/><path fill="#eed0da" d="M17 66l12 3-8 9zm57-45l5 13 8-8z"/>',powerStrike:'<path fill="#ad2949" d="M48 8l9 23 23-9-10 22 20 9-24 6 5 26-22-16-20 17 3-25-24-8 23-11-8-23 21 11z"/><path fill="#ebcba7" d="M63 20L36 48l9 6-13 26 30-32-11-6z"/>'};function oi(r){return`<span class="vxh-card-art" aria-hidden="true"><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><ellipse cx="48" cy="85" rx="34" ry="5" fill="#000" opacity=".5"/>${kh[r]??kh.tower}</svg></span>`}function Vh(r){return r?'<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M23 18l-5-7 1 12L4 10l3 21 8-4 5 8 4 7 4-7 5-8 8 4 3-21-15 13 1-12-5 7z"/></svg>':"⚜"}const Ws={keep:"Sede da vila",bank:"Banco",taverna:"Taverna",wall:"Muro",tower:"Torre",crypt:"Cripta do Vampiro",forge:"Forja de Sangue",relic:"Relicário Ancestral",mist:"Portal da Névoa",shrine:"Santuário do Frenesi"},gy={keep:"Base principal da vila.",bank:`Gera ${Ss.goldPerCycle} de ouro por ciclo desde o nível 1. As melhorias reduzem o intervalo.`,taverna:"Recruta Peões auxiliares para coletar e construir.",wall:"Humanos atravessam; o vampiro precisa destruí-lo. Selecione para comprar e vender recursos.",tower:"Ataca o vampiro automaticamente quando ele entra no alcance.",crypt:"Base do Vampiro. Desbloqueie skills e consulte o inventário.",forge:"Loja das Garras Sangrentas: aumente o dano contra unidades e construções.",relic:"Loja do Coração Ancestral: aumente a vida máxima do Vampiro.",mist:"Loja das Botas da Névoa: aumente a velocidade de movimento.",shrine:"Loja do Frenesi: acelere os ataques do Vampiro."},sd=Object.keys(Hn);function Aa(r){return sd.filter(t=>Hn[t].shop===r)}const vy=`
.vxh-hud { position: fixed; inset: 0; pointer-events: none; z-index: 20;
  font-family: 'Palatino Linotype','Book Antiqua',Palatino,Georgia,'Times New Roman',serif; color: #e8e0d0; }
.vxh-topbar { position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  display: flex; gap: 24px; align-items: center; padding: 8px 24px;
  background: linear-gradient(180deg, rgba(10,10,18,.92), rgba(10,10,18,.75));
  border-bottom: 2px solid #3a2a2a; border-radius: 0 0 12px 12px; font-size: 17px; }
.vxh-topbar .res { display: flex; align-items: center; gap: 6px; }
.vxh-clock { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.vxh-clock.night { color: #9aa8e8; }
.vxh-clock.day { color: #e8c86a; }
.vxh-minimap { position: absolute; left: 16px; bottom: 16px; width: 210px; height: 210px;
  background: #05050a; border: 3px solid #3a2a2a; border-radius: 8px; pointer-events: auto; cursor: crosshair; }
.vxh-panel { position: absolute; left: 240px; right: 16px; bottom: 0;
  display: flex; align-items: flex-end; gap: 12px; padding: 12px 20px 14px;
  background: linear-gradient(0deg, rgba(10,10,18,.94), rgba(10,10,18,.7));
  border-top: 2px solid #3a2a2a; border-radius: 14px 14px 0 0; pointer-events: auto;
  justify-content: center; flex-wrap: wrap; }
.vxh-selinfo { position: absolute; left: 240px; bottom: 140px; font-size: 14px;
  background: rgba(10,10,18,.85); padding: 8px 12px; border-radius: 8px; max-width: 480px; }
.vxh-selinfo:empty { display: none; }
.vxh-btn:disabled { cursor: default; color: #aab4c0; border-color: #3c4653; }
.vxh-btn:disabled .vxh-command-icon { opacity: .55; }
.vxh-btn { background: #1c1420; color: #e8d8b8; border: 2px solid #4a3a2a; border-radius: 8px;
  padding: 8px 10px; font-size: 13px; cursor: pointer; min-width: 76px; }
.vxh-btn:hover { background: #2c2030; border-color: #8a6a4a; }
.vxh-btn.active { border-color: #db3a3a; color: #ff9a9a; }
.vxh-btn small { display: block; opacity: .65; font-size: 11px; margin-top: 2px; }
.vxh-result { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px;
  align-items: center; justify-content: center; background: rgba(5,5,10,.85);
  font-size: 34px; font-weight: 700; text-align: center; pointer-events: auto; }
.vxh-result small { font-size: 18px; font-weight: 400; opacity: .8; }
.vxh-portrait { position: absolute; top: 12px; left: 16px; display: flex; flex-direction: column; gap: 4px;
  padding: 10px; background: rgba(10,10,18,.85); border: 2px solid #3a2a2a; border-radius: 10px; width: 170px; }
.vxh-portrait .name { font-weight: 700; font-size: 14px; }
.vxh-bar { height: 8px; border-radius: 4px; background: #221; overflow: hidden; }
.vxh-bar > div { height: 100%; border-radius: 4px; }

/* Faixa clássica de RTS com talha medieval: ferro escuro, rebites dourados e luz de vela. */
.vxh-hud { --iron:#1a1d22; --iron-lit:#3a3f47; --rim:#565d66; --blood:#8e2a35; --gold:#c9a86a; --gold-hi:#e9d3a0; --parch:#d9caa4; }
.vxh-topbar { left: auto; right: 12px; transform: none; top: 10px; gap: 0; padding: 0;
  border: 1px solid #08090c; border-radius: 4px;
  background: linear-gradient(180deg,#262a31,#0c0e13 85%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, inset 0 1px 0 rgba(233,211,160,.08), 0 6px 18px #000a; }
.vxh-topbar .res { padding: 9px 22px; border-right: 1px solid #0c0f13;
  box-shadow: 1px 0 0 rgba(233,211,160,.06); min-width: 105px; }
.vxh-clock { position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  align-items: center; gap: 8px; padding: 9px 22px; font-weight: 600; font-size: 17px;
  border: 1px solid #08090c; border-radius: 4px;
  background: linear-gradient(180deg,#262a31,#0c0e13 85%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, inset 0 1px 0 rgba(233,211,160,.08), 0 6px 18px #000a; }
.vxh-topbar b { font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: .5px; text-shadow: 0 1px 2px #000; }
.vxh-topbar .res-icon { color: var(--gold-hi); font-size: 21px; filter: drop-shadow(0 0 4px rgba(201,168,106,.35)); }
.vxh-hero { position: absolute; top: 10px; left: 14px; width: 68px; padding: 3px; cursor: pointer;
  border: 1px solid #08090c; border-radius: 4px; background: linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, 0 4px 12px #000b; pointer-events: auto; }
.vxh-hero svg { display: block; width: 100%; height: 65px; }
.vxh-hero .vxh-bar { height: 5px; border-radius: 0; }
.vxh-bottom { position: absolute; left: 10px; right: 10px; bottom: 8px; height: 230px;
  display: grid; grid-template-columns: 214px 148px minmax(180px,1fr) 360px; grid-template-rows: minmax(0,1fr); gap: 12px; align-items: stretch; }
.vxh-frame { position: relative; min-height: 0; border: 1px solid #08090c; border-radius: 4px;
  background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 6px),
    linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 4px #10131a, inset 0 2px 10px rgba(233,211,160,.06), inset 0 0 26px #000, 0 8px 20px #000c; }
.vxh-frame::before, .vxh-frame::after { content: ''; position: absolute; width: 12px; height: 12px;
  transform: rotate(45deg); border: 2px solid #08090c; z-index: 2; pointer-events: none;
  background: radial-gradient(circle at 35% 35%, var(--gold-hi), #8a6d3a 60%, #4a3a1e);
  box-shadow: 0 0 6px #000b; }
.vxh-frame::before { left: -8px; top: -8px; } .vxh-frame::after { right: -8px; bottom: -8px; }
.vxh-mapframe { margin-top: -14px; padding: 4px; }
.vxh-mapframe::after { width: auto; height: auto; transform: none; right: 0; left: 0; bottom: 0;
  content: 'VALE DA VIGÍLIA'; font: 10px Georgia,serif; letter-spacing: 3px; text-align: center; padding: 3px;
  background: #0a0c10ee; color: var(--gold); border-top: 1px solid #10131a; text-shadow: 0 1px 1px #000; }
.vxh-minimap { position: static; display: block; width: 100%; height: 100%; border: 1px solid #10131a; border-radius: 0; }
.vxh-portrait { position: relative; top: auto; left: auto; width: auto; padding: 5px; gap: 3px;
  display: flex; background: linear-gradient(180deg,#1c1f25,#0b0d12); }
.vxh-portrait-art { flex: 1; min-height: 0; overflow: hidden; border: 1px solid #2f353d; background: #090c14;
  box-shadow: inset 0 0 14px #000; }
.vxh-portrait-art svg { width: 100%; height: 100%; object-fit: cover; }
.vxh-portrait .name { font-size: 12px; text-align: center; color: var(--gold-hi);
  font-variant: small-caps; letter-spacing: 1px; text-shadow: 0 1px 1px #000; }
.vxh-statbar { position: relative; height: 16px; background: #0a0c10; border: 1px solid #3a3f47;
  box-shadow: inset 0 0 0 1px #10131a, inset 0 2px 4px #000; }
.vxh-statbar > i { position: absolute; inset: 0; right: auto; background: linear-gradient(#5b9b46,#244b27);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
.vxh-statbar.bloodbar > i { background: linear-gradient(#3d6694,#192d49); }
.vxh-statbar span { position: relative; display: block; text-align: center; line-height: 14px; font-size: 11px; text-shadow: 1px 1px #000; }
.vxh-sheet { padding: 14px 16px; overflow: hidden; }
.vxh-sheet-heading { font-size: 11px; color: var(--gold); letter-spacing: 3px; font-variant: small-caps;
  padding-bottom: 9px; border-bottom: 1px solid #3a342a; box-shadow: 0 1px 0 rgba(233,211,160,.05);
  margin-bottom: 10px; text-shadow: 0 1px 1px #000; }
.vxh-selinfo { position: static; padding: 0; background: none; max-width: none; font-size: 13px; line-height: 1.7; }
.vxh-selinfo b { font-size: 18px; color: var(--gold-hi); font-variant: small-caps; letter-spacing: .5px; text-shadow: 0 1px 2px #000; }
.vxh-panel { position: relative; left: auto; right: auto; bottom: auto; padding: 8px;
  display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); grid-template-rows: repeat(2,minmax(min-content,1fr)); gap: 6px;
  border-radius: 4px; align-items: stretch; overflow-y: auto; }
.vxh-panel > span { grid-column: 1/-1; font-size: 12px; line-height: 1.6; color: #a89a78; font-style: italic;
  align-self: center; text-align: center; letter-spacing: .4px; text-shadow: 0 1px 1px #000; }
.vxh-btn { position: relative; min-width: 0; padding: 5px 3px; font-size: 14px; border-radius: 3px;
  border: 1px solid #08090c;
  background: radial-gradient(ellipse at 50% 18%, #2b2f37, #0b0d12 85%);
  color: var(--parch);
  box-shadow: inset 0 0 0 2px #454b54, inset 0 0 0 3px #14171c, inset 0 2px 6px rgba(233,211,160,.05), inset 0 -8px 14px rgba(0,0,0,.45); }
.vxh-btn:hover:not(:disabled) {
  box-shadow: inset 0 0 0 2px #8a7344, inset 0 0 0 3px #14171c, inset 0 0 16px rgba(201,168,106,.18), inset 0 -8px 14px rgba(0,0,0,.45);
  color: var(--gold-hi); }
.vxh-btn small { font-size: 15px; line-height: 1.25; opacity: 1; font-weight: 650; color: #f0d9a8; font-variant-numeric: tabular-nums; }
.vxh-btn:disabled small { color: #9aa2ab; }
.vxh-btn .vxh-resource-cost { color: #f0d9a8; }
.vxh-btn .vxh-resource-cost.vxh-resource-missing { color: #ff9292; }
.vxh-btn .vxh-cost { white-space: nowrap; }
.vxh-item-button small { font-size:12px; }
.vxh-item-button .vxh-item-price { font-size:15px; }
.vxh-item-button .vxh-command-icon { font-size:20px; }
.vxh-item-equipped { color:#a8d8b1; }
.vxh-inventory { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
.vxh-inventory > span { border:1px solid #08090c; border-radius:3px; padding:5px 8px; color:#d5c397; font-size:12px;
  background: radial-gradient(ellipse at 50% 20%,#262a31,#0d1015 85%);
  box-shadow: inset 0 0 0 2px #33383f, inset 0 0 8px #000; }
.vxh-command-icon { display: block; font-size: 23px; line-height: 1.1; margin-bottom: 2px; }
.vxh-activity { color: #e4c579; margin-top: 6px; }
.vxh-progress { height: 8px; background: #080b10; border: 1px solid #3a3f47; margin: 6px 0;
  box-shadow: inset 0 1px 3px #000; }
.vxh-progress > div { height: 100%; background: linear-gradient(90deg,#8a693b,#e9c47b); }
.vxh-btn.active { border-color: #08090c; color: #ffb9b9;
  box-shadow: inset 0 0 0 2px #7c2a33, inset 0 0 0 3px #14171c, inset 0 0 18px #8e2a35, inset 0 -8px 14px rgba(0,0,0,.45); }
.vxh-quit { pointer-events: auto; padding: 9px 16px; border: 1px solid #08090c; border-radius: 3px;
  background: radial-gradient(ellipse at 50% 20%,#5a2530,#1c0b10 85%);
  box-shadow: inset 0 0 0 2px #6e3a41, inset 0 0 0 3px #140b0d, inset 0 0 12px rgba(142,42,53,.35);
  color: #ffd9dc; font: 650 13px 'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif; cursor: pointer; }
.vxh-quit:hover { color: #ffe9ec;
  box-shadow: inset 0 0 0 2px #a2525b, inset 0 0 0 3px #140b0d, inset 0 0 16px rgba(224,138,146,.3); }
@media(max-width: 1000px) {
  .vxh-bottom { height: 218px; grid-template-columns: 172px 120px minmax(120px,1fr) 324px; gap: 8px; }
  .vxh-topbar .res { padding: 7px 12px; min-width: 75px; }
  .vxh-clock { padding: 7px 12px; font-size: 14px; }
  .vxh-sheet { padding: 9px; } .vxh-selinfo { font-size: 11px; }
}
@media(max-width: 720px) {
  .vxh-bottom { height: 218px; grid-template-columns: 132px 94px 1fr; }
  .vxh-sheet { display: none; } .vxh-topbar { font-size: 12px; }
  .vxh-topbar .res { padding: 6px 8px; min-width: 50px; }
  .vxh-clock { padding: 6px 10px; font-size: 12px; }
}
`;class xy{constructor(t,e,n,i){lt(this,"el");lt(this,"gold");lt(this,"wood");lt(this,"blood");lt(this,"clock");lt(this,"selInfo");lt(this,"cmdPanel");lt(this,"minimap");lt(this,"resultEl",null);lt(this,"shownResult",null);lt(this,"admin");lt(this,"portraitKind",null);lt(this,"panelHtml","");lt(this,"minimapTerrain",null);lt(this,"minimapCameraKey","");lt(this,"minimapCorners",[]);this.scene=t,this.controls=e,this.net=n,this.getMyId=i;const s=document.createElement("style");s.textContent=vy+my,document.head.appendChild(s),this.el=document.createElement("div"),this.el.className="vxh-hud",this.el.dataset.faction=this.getMyId()===en?"vampire":"human",this.el.innerHTML=`
      <button class="vxh-hero" title="Selecionar e centralizar seu personagem">${Ei(this.getMyId()===en)}<div class="vxh-bar"><div style="width:100%;background:#539541"></div></div><span class="vxh-hero-crest" aria-hidden="true">${Vh(this.getMyId()===en)}</span></button>
      <div class="vxh-topbar">
        <span class="res" data-wood>🪵 <b class="wood">0</b></span>
        <span class="res" data-gold>🪙 <b class="gold">0</b></span>
        <span class="res" data-blood style="display:none">🩸 <b class="blood">0</b></span>
        <button class="vxh-quit" title="Sair da partida e voltar ao início">✕ Sair</button>
      </div>
      <div class="vxh-clock"><span class="icon">☀️</span><span class="time">--</span></div>
      <div class="vxh-bottom">
      <div class="vxh-frame vxh-mapframe"><div class="vxh-compass" aria-hidden="true"><span>N</span></div><canvas class="vxh-minimap" width="210" height="210"></canvas><span class="vxh-map-caption">VALE DA VIGÍLIA</span></div>
      <div class="vxh-portrait vxh-frame">
        <div class="vxh-crest" aria-hidden="true"><span>${Vh(this.getMyId()===en)}</span></div>
        <div class="vxh-portrait-art">${Ei(this.getMyId()===en)}</div>
        <span class="name">—</span>
        <div class="vxh-statbar healthbar"><i style="width:100%"></i><span>—</span></div>
        <div class="vxh-statbar bloodbar"><i style="width:100%"></i><span>—</span></div>
      </div>
      <div class="vxh-frame vxh-sheet"><div class="vxh-sheet-heading">ATRIBUTOS</div><div class="vxh-selinfo"></div></div>
      <div class="vxh-frame vxh-commands"><div class="vxh-commands-heading">VAMPIRE × HUMANS</div><div class="vxh-panel"></div></div>
      </div>
    `,document.body.appendChild(this.el),this.admin=new py(this.el,n),this.gold=this.el.querySelector(".gold"),this.wood=this.el.querySelector(".wood"),this.blood=this.el.querySelector(".blood"),this.clock=this.el.querySelector(".vxh-clock"),this.selInfo=this.el.querySelector(".vxh-selinfo"),this.cmdPanel=this.el.querySelector(".vxh-panel"),this.minimap=this.el.querySelector(".vxh-minimap"),this.el.querySelector(".vxh-hero").addEventListener("click",()=>{var a;const o=(a=this.net.latestSnap)==null?void 0:a.units.find(l=>l.owner===this.getMyId());o&&(this.controls.selected=[o.id],this.controls.selectedBuilding=null,this.controls.inspectedUnit=null,this.controls.focusOn(o.x,o.z),this.scene.setSelection([o.id]),this.scene.setBuildingSelection(null),this.net.latestSnap&&this.update(this.net.latestSnap,this.getMyId()))}),this.el.querySelector(".vxh-quit").addEventListener("click",()=>{confirm("Sair da partida? Suas unidades ficarão abandonadas na sala.")&&location.reload()}),this.cmdPanel.addEventListener("click",o=>{const a=o.target.closest("button");if(!(!a||a.disabled)){if(a.dataset.build&&this.controls.enterBuild(a.dataset.build),a.dataset.market&&this.net.command({type:"market",targetId:Number(a.dataset.marketTarget),trade:a.dataset.market,amount:a.dataset.market==="woodToGold"?Ji.wood:Ji.gold}),a.dataset.upgrade&&this.net.command({type:"upgrade",ids:[],targetId:Number(a.dataset.upgrade)}),a.dataset.recruit&&this.net.command({type:"recruit",targetId:Number(a.dataset.recruit)}),a.dataset.vampireItem&&this.net.command({type:"buyVampireItem",shopId:Number(a.dataset.shop),itemId:a.dataset.vampireItem}),a.dataset.vampireSkillBuy&&this.net.command({type:"buyVampireSkill",cryptId:Number(a.dataset.crypt),skillId:a.dataset.vampireSkillBuy}),a.dataset.vampireSkillCast&&this.net.command({type:"castVampireSkill",skillId:a.dataset.vampireSkillCast}),a.dataset.vampireItemUp&&this.net.command({type:"upgradeVampireItem",itemId:a.dataset.vampireItemUp}),a.dataset.resume){const l=this.net.latestSnap,c=l==null?void 0:l.buildings.find(u=>u.id===Number(a.dataset.resume)),h=c&&(l==null?void 0:l.units.filter(u=>u.owner===this.getMyId()&&u.kind==="worker").sort((u,d)=>Math.hypot(u.x-c.x,u.z-c.z)-Math.hypot(d.x-c.x,d.z-c.z))[0]);h&&c&&this.net.command({type:"resumeBuild",ids:[h.id],targetId:c.id})}if(a.dataset.repair){const l=this.net.latestSnap,c=l==null?void 0:l.buildings.find(u=>u.id===Number(a.dataset.repair)),h=c&&(l==null?void 0:l.units.filter(u=>u.owner===this.getMyId()&&u.kind==="worker").sort((u,d)=>Math.hypot(u.x-c.x,u.z-c.z)-Math.hypot(d.x-c.x,d.z-c.z)).slice(0,3).map(u=>u.id));h!=null&&h.length&&c&&this.net.command({type:"repair",ids:h,targetId:c.id})}}}),this.minimap.addEventListener("pointerdown",o=>{const a=this.minimap.getBoundingClientRect(),l=((o.clientX-a.left)/a.width-.5)*he.half*2,c=((o.clientY-a.top)/a.height-.5)*he.half*2;this.controls.focusOn(l,c)})}update(t,e){var g,v,m,p,y,_;this.admin.update(t);const n=t.players.find(x=>x.id===e);n&&(this.gold.textContent=String(n.gold),this.wood.textContent=String(n.wood));const i=e===en;this.el.querySelector("[data-blood]").style.display=i?"flex":"none";for(const x of this.el.querySelectorAll(".vxh-topbar .res[data-wood], .vxh-topbar .res[data-gold]"))x.style.display=i?"none":"flex";this.blood.textContent=String(t.blood),t.phase;const s=Math.max(0,Math.ceil(t.phaseTime)),o=t.phase==="day"?"☀️":"🌙",a=`${t.practice?"Teste solo · ":""}${t.phase==="day"?"Dia":"Noite"} ${t.day}`;this.clock.className=`vxh-clock ${t.phase}`,this.clock.innerHTML=`<span class="icon">${o}</span><span class="time">${a} · ${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}</span>`;const l=(this.controls.inspectedUnit!=null?[this.controls.inspectedUnit]:this.controls.selected).map(x=>t.units.find(C=>C.id===x)).filter(Boolean),c=t.buildings.find(x=>x.id===this.controls.selectedBuilding);if(c){if(this.selInfo.innerHTML=`<b>${Ws[c.kind]} · nível ${c.level}</b>
        <div>${c.hp}/${c.maxHp} HP${c.done?"":` · Obra: ${Math.floor(c.progress*100)}%`}</div>
        ${c.kind==="bank"&&c.done?`<div>Produção: ${i_()} ouro / ${s_(c.level)}s</div>`:""}
        ${c.kind==="wall"&&c.done?`<div>Vida máxima: ${c.maxHp}${c.level<Ah?` · Nível ${c.level+1}: ${_a(c.level+1)} HP`:" · Nível máximo"}</div>`:""}
        ${c.kind==="wall"&&c.done&&c.hp<c.maxHp?'<div class="vxh-activity">Danificado — clique com o botão direito com um Humano/Peão para reparar</div>':""}`,c.recruitment){const x=1-c.recruitment.remaining/c.recruitment.total;this.selInfo.innerHTML+=`<div class="vxh-activity">${c.recruitment.remaining>0?`Recrutando Peão · ${Math.ceil(c.recruitment.remaining)}s`:"Aguardando uma saída livre"}</div>
          <div class="vxh-progress"><div style="width:${x*100}%"></div></div>`}if(c.kind==="tower"){const x=t.units.find(C=>C.kind==="vampire"&&Math.hypot(C.x-c.x,C.z-c.z)<=rs.range);this.selInfo.innerHTML+=`<div>Alcance: ${rs.range} · Dano: ${rs.damage} / ${rs.cooldown}s</div>
          <div class="vxh-activity">${c.done?x?`Alvo: Vampiro — ${x.hp}/${x.maxHp} HP`:"Sem alvo no alcance":"Aguardando conclusão da obra"}</div>`}if(c.kind==="crypt"||Aa(c.kind).length>0){const x=t.units.find(C=>C.kind==="vampire");if(i){const C=t.buildings.find(E=>E.kind==="crypt"),T=ya(t.phase,x,c,C);T&&(this.selInfo.innerHTML+=`<div class="vxh-activity">${T}</div>`),this.selInfo.innerHTML+=`<div>Sangue disponível: ${t.blood}</div>${this.inventoryMarkup(t)}`}}}else if(l.length===0)this.selInfo.innerHTML="";else{this.selInfo.innerHTML=l.map(E=>{var I;return`<b>${E.kind==="vampire"?"Vampiro":E.hero===!1?"Peão":"Humano"}</b><div>${E.hp}/${E.maxHp} HP</div>
            <div class="vxh-activity">${fy(E,t)}</div>
            ${E.orderType==="gather"?`<div>${Ys(E.carryRes??((I=t.nodes.find(S=>S.id===E.targetId))==null?void 0:I.kind)).icon} Coleta: ${E.carrying} / ${Hs(E).carry}</div>`:""}`}).join("");const x=l[0];if((x==null?void 0:x.kind)==="vampire"){const E=jl(t.vampireItems),I=(Ci.attackDamage+E.damage)*d_(t.vampireSkills)*(t.phase==="night"?1:Ci.dayDamageMultiplier);h_(t.phase,t.vampireItems);const S=u_(t.vampireItems),M=(((v=(g=t.vampireSkills)==null?void 0:g.powerStrike)==null?void 0:v.buff)??0)>0?` · 💥 Golpe ativo (${Math.ceil(t.vampireSkills.powerStrike.buff)}s)`:"";this.selInfo.innerHTML+=`<div>Sangue: ${t.blood} · Dano: ${Math.round(I*10)/10}${M}</div>
          <div>Bônus: +${E.damage} dano · +${E.health} vida · +${Math.round(E.moveSpeed*10)/10} veloc. · ataque a cada ${Math.round(S*100)/100}s</div>${this.inventoryMarkup(t)}`}const C=t.buildings.find(E=>E.id===(x==null?void 0:x.targetId)&&!E.done);if(C&&(x==null?void 0:x.orderType)==="build"){const E=Math.ceil((1-C.progress)*Ml[C.kind].time/Hs(x).buildRate);this.selInfo.innerHTML+=`<div>${Ws[C.kind]} · ${Math.floor(C.progress*100)}% · ${E}s de trabalho</div>
          <div class="vxh-progress"><div style="width:${C.progress*100}%"></div></div>`}const T=t.buildings.find(E=>E.id===(x==null?void 0:x.targetId)&&E.done);T&&(x==null?void 0:x.orderType)==="repair"&&(this.selInfo.innerHTML+=`<div>${Ws[T.kind]} · ${T.hp}/${T.maxHp} HP · Reparando…</div>
          <div class="vxh-progress"><div style="width:${T.hp/T.maxHp*100}%"></div></div>`)}const h=c??l[0],u=((m=l[0])==null?void 0:m.kind)==="vampire",d=l[0]?u?"vampire":l[0].hero===!1?"peon":"human":i?"vampire":"human";this.portraitKind!==d&&(this.portraitKind=d,this.el.querySelector(".vxh-portrait-art").innerHTML=d==="peon"?dy():Ei(d==="vampire")),this.el.querySelector(".vxh-portrait .name").textContent=c?Ws[c.kind]:l[0]?l[0].kind==="vampire"?"Vampiro":l[0].hero===!1?"Peão":"Humano":"Selecione uma unidade",this.el.querySelector(".healthbar > i").style.width=`${h?Math.max(0,h.hp/h.maxHp*100):0}%`,this.el.querySelector(".healthbar > span").textContent=h?`${h.hp} / ${h.maxHp}`:"Sem seleção",this.el.querySelector(".bloodbar > span").textContent=u?`${t.blood} sangue`:c&&!c.done?`Obra: ${Math.floor(c.progress*100)}%`:((p=l[0])==null?void 0:p.orderType)==="gather"?`${Ys(l[0].carryRes??((y=t.nodes.find(x=>x.id===l[0].targetId))==null?void 0:y.kind)).icon} ${l[0].carrying} / ${Hs(l[0]).carry}`:"Sem coleta",this.el.querySelector(".bloodbar > i").style.width=`${u?100:c&&!c.done?c.progress*100:(((_=l[0])==null?void 0:_.carrying)??0)/Hs(l[0]??{}).carry*100}%`;const f=t.units.find(x=>x.owner===e);this.el.querySelector(".vxh-hero .vxh-bar > div").style.width=`${f?Math.max(0,f.hp/f.maxHp*100):0}%`,this.renderCmdPanel(t,e,l.length>0),this.renderMinimap(t,e),t.result&&!this.resultEl&&(this.shownResult=t.result.reason,this.showResult(t.result.winner,t.result.reason,e))}renderCmdPanel(t,e,n){var d,f,g,v;const i=e===en,s=t.players.find(m=>m.id===e),o=t.buildings.find(m=>m.id===this.controls.selectedBuilding),a=(m,p)=>{const y=Math.max(0,p-((s==null?void 0:s[m])??0)),{icon:_,name:x}=Ys(m);return`<span class="vxh-resource-cost ${y>0?"vxh-resource-missing":""}" data-resource="${m}" title="${y>0?`Faltam ${y} de ${x}`:`${x}: suficiente`}">${p}${_}</span>`},l=m=>[m.wood>0?a("wood",m.wood):"",m.gold>0?a("gold",m.gold):""].filter(Boolean).join(" "),c=m=>["wood","gold"].filter(p=>m[p]>((s==null?void 0:s[p])??0)).map(p=>`Faltam ${m[p]-((s==null?void 0:s[p])??0)} de ${Ys(p).name}`).join("; "),h=()=>["woodToGold","goldToWood"].map(m=>{const p=m==="woodToGold",y=p?Ji.wood:Ji.gold,_=p?Ji.gold:Ji.wood,x=s&&(p?s.wood:s.gold)>=y;return`<button class="vxh-btn ${x?"":"vxh-unavailable"}" data-market="${m}" data-market-target="${o==null?void 0:o.id}" title="${x?"Trocar recursos":c({wood:p?y:0,gold:p?0:y})}" ${x?"":"disabled"}>
        ${p?"Vender 🪵":"Comprar 🪵"}<small>${a(p?"wood":"gold",y)} → <span class="vxh-resource-cost">${_}${p?"🪙":"🪵"}</span></small></button>`}).join("");let u="";if(this.controls.inspectedUnit!=null)u="<span>Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.</span>";else if(o)if(o.owner===e&&!o.done){const m=t.units.some(p=>p.owner===e&&p.kind==="worker");u=`<button class="vxh-btn" data-resume="${o.id}" ${m?"":"disabled"}>🔨 Retomar obra<small>Enviar seu Humano</small></button>`}else if(o.owner===e&&o.kind==="bank"){const m=e_[o.level],p=o.level>=t_,y=m&&s&&s.wood>=m.wood&&s.gold>=m.gold;u=`<button class="vxh-btn ${!p&&!y?"vxh-unavailable":""}" title="${!p&&!y&&m?c(m):"Melhoria do Banco"}" data-upgrade="${o.id}" ${!p&&y?"":"disabled"}>
          ${p?"Nível máximo":`Melhorar para nível ${o.level+1}`}<small>${!p&&m?l(m):""}</small></button>`}else if(o.owner===e&&o.kind==="taverna"){const m=!!o.recruitment,p=s&&s.gold>=Gs.gold&&s.wood>=Gs.wood;u=`<button class="vxh-btn ${!m&&!p?"vxh-unavailable":""}" data-recruit="${o.id}" title="${p?"Recrutar um Peão auxiliar":c(Gs)}" ${m||!p?"disabled":""}>
          ${m?"Recrutando…":"Recrutar Peão"}<small>${l(Gs)}</small><small>${Gs.time}s</small></button>`}else if(o.kind==="crypt"&&i){const m=t.units.find(y=>y.kind==="vampire"&&y.owner===e),p=ya(t.phase,m,o,o);for(const y of Object.keys(os)){const _=os[y],x=!!((d=t.vampireSkills)!=null&&d[y]),C=t.blood>=_.unlockCost,T=p??(x?"Skill desbloqueada — use pelo painel do vampiro":C?"Desbloquear skill":`Faltam ${_.unlockCost-t.blood} de sangue`);u+=`<button class="vxh-btn vxh-item-button" data-vampire-skill-buy="${y}" data-crypt="${o.id}" title="${T}" ${p||x||!C?"disabled":""}>
            ${oi(y)}${_.name}<small>${_.description}</small>
            ${x?'<small class="vxh-item-equipped">✓ Desbloqueada</small>':`<small class="vxh-item-price"><span class="vxh-resource-cost ${C?"":"vxh-resource-missing"}">${_.unlockCost}🩸</span></small>`}</button>`}u||(u="<span>Nenhuma skill disponível.</span>"),p&&(u+=`<span>${p}</span>`)}else if(i&&Aa(o.kind).length>0){const m=t.units.find(_=>_.kind==="vampire"&&_.owner===e),p=t.buildings.find(_=>_.kind==="crypt"),y=ya(t.phase,m,o,p);for(const _ of Aa(o.kind)){const x=Hn[_],C=((f=t.vampireItems)==null?void 0:f[_])??0,T=Lh(_,C),E=C>=x.maxCount,I=t.blood>=T,S=y??(E?"Limite de compras atingido":I?"Comprar e equipar":`Faltam ${T-t.blood} de sangue`),M=[x.damageBonus?`+${x.damageBonus} dano`:"",x.healthBonus?`+${x.healthBonus} vida`:"",x.speedBonus?`+${x.speedBonus} veloc.`:"",x.cooldownFactor<1?`ataque ${Math.round((1-x.cooldownFactor)*100)}% mais rápido`:""].filter(Boolean).join(" · "),P=x.maxCount===1/0?`<small>Nv ${C} → ${C+1}</small>`:"";u+=`<button class="vxh-btn vxh-item-button" data-vampire-item="${_}" data-shop="${o.id}" title="${S}" ${y||E||!I?"disabled":""}>
            ${oi(_)}${x.name}<small>${M}</small>${P}
            ${E?'<small class="vxh-item-equipped">✓ Equipado</small>':`<small class="vxh-item-price"><span class="vxh-resource-cost ${I?"":"vxh-resource-missing"}">${T}🩸</span></small>`}</button>`}y&&(u+=`<span>${y}</span>`)}else if(o.owner===e&&o.kind==="wall"&&o.done){const m=n_[o.level],p=o.level>=Ah,y=m&&s&&s.wood>=m.wood&&s.gold>=m.gold,_=`<button class="vxh-btn ${!p&&!y?"vxh-unavailable":""}" title="${!p&&!y&&m?c(m):`Aumenta a vida máxima para ${p?o.maxHp:_a(o.level+1)} HP`}" data-upgrade="${o.id}" ${!p&&y?"":"disabled"}>
          ${p?"Nível máximo":`Melhorar para nível ${o.level+1}`}<small>${!p&&m?l(m):""}</small>${p?"":`<small>${o.maxHp} → ${_a(o.level+1)} HP</small>`}</button>`,x=o.hp<o.maxHp,C=t.units.some(E=>E.owner===e&&E.kind==="worker"),T=x?`<button class="vxh-btn" data-repair="${o.id}" ${C?"":"disabled"}>🔨 Reparar muro<small>${o.hp}/${o.maxHp} HP</small></button>`:"";u=_+T+h()}else u="";else if(i){u="";for(const m of Object.keys(os)){const p=os[m],y=(g=t.vampireSkills)==null?void 0:g[m];y?y.buff>0?u+=`<button class="vxh-btn active" disabled>${oi(m)}${p.name}<small>ativo · ${Math.ceil(y.buff)}s</small></button>`:y.cd>0?u+=`<button class="vxh-btn" disabled>${oi(m)}${p.name}<small>recarga · ${Math.ceil(y.cd)}s</small></button>`:u+=`<button class="vxh-btn" data-vampire-skill-cast="${m}" title="${p.description} — clique para ativar">${oi(m)}${p.name}<small>${p.description}</small></button>`:u+=`<button class="vxh-btn" disabled title="Desbloqueie na cripta durante o dia">${oi(m)}${p.name}<small>🔒 ${p.unlockCost}🩸</small></button>`}for(const m of sd){const p=((v=t.vampireItems)==null?void 0:v[m])??0;if(!p)continue;const y=Hn[m],_=Lh(m,p),x=t.blood>=_;u+=`<button class="vxh-btn vxh-item-button" data-vampire-item-up="${m}" title="Upar a qualquer hora por ${_} de sangue" ${x?"":"disabled"}>
          ${oi(m)}${y.name}<small>Nv ${p} → ${p+1}</small>
          <small class="vxh-item-price"><span class="vxh-resource-cost ${x?"":"vxh-resource-missing"}">${_}🩸</span></small></button>`}}else if(n)for(const m of ku){const p=Ml[m],y=s&&s.wood>=p.wood&&s.gold>=p.gold;u+=`<button class="vxh-btn ${y?"":"vxh-unavailable"}" data-build="${m}" title="${y?gy[m]:c(p)}" ${y?"":"disabled"}>
          ${oi(m)}${Ws[m]}
          <small class="vxh-cost">${l(p)}</small><small>${Number((p.time/Hs(t.units.find(_=>this.controls.selected.includes(_.id))??{}).buildRate).toFixed(1))}s</small></button>`}u!==this.panelHtml&&(this.cmdPanel.innerHTML=u,this.panelHtml=u)}inventoryMarkup(t){const e=Object.keys(Hn).filter(n=>{var i;return(((i=t.vampireItems)==null?void 0:i[n])??0)>0});return e.length?`<div class="vxh-inventory">${e.map(n=>{const i=Hn[n],s=t.vampireItems[n];return`<span title="+${i.damageBonus*s} dano · +${i.healthBonus*s} vida máxima">${i.icon} ${i.name}${s>1?` ×${s}`:""}</span>`}).join("")}</div>`:'<div class="vxh-inventory"><span>Sem itens equipados</span></div>'}renderMinimap(t,e){const n=this.minimap.getContext("2d");if(!n)return;const i=210,s=this.scene.map,o=s.tiles,a=this.minimapTerrain??n.createImageData(i,i);if(!this.minimapTerrain){for(let d=0;d<i;d++)for(let f=0;f<i;f++){const g=Math.floor(f/i*o),m=Math.floor(d/i*o)*o+g,p=s.height[m]??0;let y,_,x;s.water[m]?(y=30,_=60,x=110):(s.forest[m]??0)>.5?(y=24,_=48,x=43):p>.62?(y=100,_=100,x=105):(y=45+p*40,_=80+p*30,x=40);const C=(d*i+f)*4;a.data[C]=y,a.data[C+1]=_,a.data[C+2]=x,a.data[C+3]=255}this.minimapTerrain=a}n.putImageData(a,0,0);const l=he.half*2,c=(d,f)=>[(d+l/2)/l*i,(f+l/2)/l*i];n.fillStyle="#89949b";for(const d of s.obstacles){const[f,g]=c(d.x-d.width/2,d.z-d.depth/2);n.fillRect(f,g,Math.max(1,d.width/l*i),Math.max(1,d.depth/l*i))}for(const d of t.nodes){const[f,g]=c(d.x,d.z);n.fillStyle=d.kind==="gold"?"#e8c83a":"#2d5a2d",n.fillRect(f-1,g-1,3,3)}for(const d of t.buildings){const[f,g]=c(d.x,d.z);n.fillStyle=d.owner<0?"#555":d.owner===e?"#6ad6ff":"#d6b06a",n.fillRect(f-2,g-2,5,5)}for(const d of t.units){const[f,g]=c(d.x,d.z);n.fillStyle=d.kind==="vampire"?"#ff2a2a":d.owner===e?"#ffffff":"#88aaff",n.beginPath(),n.arc(f,g,d.kind==="vampire"?3.5:2,0,Math.PI*2),n.fill()}this.scene.camera.updateMatrixWorld(!0);const h=[...this.scene.camera.matrixWorld.elements,...this.scene.camera.projectionMatrix.elements].join(",");h!==this.minimapCameraKey&&(this.minimapCameraKey=h,this.minimapCorners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([d,f])=>this.scene.screenToGround(d,f)));const u=this.minimapCorners;u.every(Boolean)&&(n.strokeStyle="#ddd7b4",n.lineWidth=1,n.beginPath(),u.forEach((d,f)=>{const[g,v]=c(d.x,d.z);f===0?n.moveTo(g,v):n.lineTo(g,v)}),n.closePath(),n.stroke())}showResult(t,e,n){const i=t==="vampire"==(n===en),s=document.createElement("div");s.className="vxh-result",s.innerHTML=`
      <div style="color: ${t==="vampire"?"#ff5a5a":"#6ad66a"}">
        ${i?"VITÓRIA":"DERROTA"}
      </div>
      <small>${e}</small>
      <small style="margin-top:20px;opacity:.5">recarregue a página para jogar novamente</small>
    `,this.el.appendChild(s),this.resultEl=s}}class _y{constructor(){lt(this,"ws",null);lt(this,"myId",-1);lt(this,"clientId",null);lt(this,"lobby",null);lt(this,"latestSnap",null);lt(this,"result",null);lt(this,"started",!1);lt(this,"connection","offline");lt(this,"pending",null);lt(this,"error","");lt(this,"onSnap",null);lt(this,"listeners",new Set)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t()}connect(){if(this.ws&&this.ws.readyState<=WebSocket.OPEN)return Promise.resolve();this.connection="connecting",this.error="",this.notify();const t=location.protocol==="https:"?"wss":"ws",e=new WebSocket(`${t}://${location.host}/ws`);return this.ws=e,new Promise((n,i)=>{e.onopen=()=>{this.connection="online",this.notify(),n()},e.onerror=()=>i(new Error("Não foi possível conectar ao servidor")),e.onclose=()=>{this.connection="offline",this.pending=null,this.error="Conexão perdida. Reconecte para entrar novamente na sala.",this.started||(this.lobby=null,this.clientId=null,this.myId=-1),this.notify()},e.onmessage=s=>this.handle(s.data)})}handle(t){var n;const e=JSON.parse(t);if(e.type==="snap"){this.latestSnap=e.snap,(n=this.onSnap)==null||n.call(this,e.snap);return}switch(e.type){case"result":this.result=e.result;break;case"created":case"joined":this.clientId=e.clientId,this.myId=e.playerId,this.lobby=e.lobby,this.error="";break;case"lobby":this.lobby=e.lobby,this.error="";break;case"started":this.lobby=e.lobby,this.myId=e.playerId,this.started=!0;break;case"left":this.lobby=null,this.clientId=null,this.myId=-1,this.latestSnap=null,this.error="";break;case"error":this.error=e.message;break;default:return}this.pending=null,this.notify()}send(t){var e;return((e=this.ws)==null?void 0:e.readyState)!==WebSocket.OPEN?(this.error="Sem conexão com o servidor",this.pending=null,this.notify(),!1):(this.ws.send(JSON.stringify(t)),!0)}request(t,e={}){this.pending||(this.error="",this.pending=t,this.notify(),this.send({type:t,...e}))}command(t){this.send({type:"cmd",command:t})}create(t){this.request("create",{name:t})}join(t,e){this.request("join",{code:t,name:e})}chooseRole(t){this.request("role",{role:t})}ready(t){this.request("ready",{ready:t})}start(){this.request("start")}leave(){this.request("leave")}}function ts(r){return r.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class yy{constructor(t,e){lt(this,"el",document.createElement("div"));lt(this,"name","");lt(this,"code","");lt(this,"copyMessage","");lt(this,"unsubscribe");this.container=t,this.net=e,this.el.className="lobby-screen",t.appendChild(this.el),this.unsubscribe=e.subscribe(()=>this.render()),this.el.addEventListener("input",n=>{const i=n.target;i.id==="v-name"&&(this.name=i.value),i.id==="v-code"&&(this.code=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,Yt.lobby.codeLength),i.value=this.code)}),this.el.addEventListener("keydown",n=>{n.key!=="Enter"||this.net.pending||this.net.connection!=="online"||(n.target.id==="v-code"?this.join():n.target.id==="v-name"&&this.net.create(this.name))}),this.el.addEventListener("click",n=>{var s;const i=n.target.closest("button");if(!(!i||i.disabled))switch(i.dataset.action){case"create":this.net.create(this.name);break;case"join":this.join();break;case"leave":this.net.leave();break;case"start":this.net.start();break;case"ready":{const o=(s=this.net.lobby)==null?void 0:s.players.find(a=>a.id===this.net.clientId);this.net.ready(!(o!=null&&o.ready));break}case"role":this.net.chooseRole(i.dataset.role);break;case"copy":this.copyCode();break;case"reconnect":this.net.connect().catch(()=>this.render());break}}),this.render()}join(){if(this.code.length!==Yt.lobby.codeLength){this.net.error=`Digite o código de ${Yt.lobby.codeLength} caracteres da sala.`,this.render();return}this.net.join(this.code,this.name)}async copyCode(){var e;const t=(e=this.net.lobby)==null?void 0:e.code;if(t){try{await navigator.clipboard.writeText(t),this.copyMessage="Código copiado"}catch{this.copyMessage=`Compartilhe o código ${t}`}this.render()}}render(){const{lobby:t,pending:e,connection:n}=this.net,i=!!e||n!=="online",s=n==="online"?"Conectado":n==="connecting"?"Conectando…":"Desconectado";this.el.innerHTML=`
      <div class="lobby-atmosphere" aria-hidden="true"></div>
      <div class="lobby-shell">
        <header class="lobby-header"><a class="lobby-brand" href="/">V<span>×</span>H <small>VAMPIRE × HUMANS</small></a>
          <div class="lobby-header-actions"><span class="lobby-connection ${n}"><i></i>${s}</span>
          ${t?`<button data-action="leave" class="lobby-leave" ${i?"disabled":""}>✕ Sair da sala</button>`:""}</div></header>
        <div class="lobby-error" role="alert" ${this.net.error?"":"hidden"}>${ts(this.net.error)}</div>
        ${t?this.roomView(i):this.entryView(i)}
        <footer class="lobby-footer"><span>VALE DA VIGÍLIA</span><span>Sangue, ou liberdade.</span><span>TESTE SOLO OU MULTIPLAYER · ATÉ ${xa} JOGADORES</span></footer>
      </div>`}entryView(t){return`<main class="lobby-entry">
      <section class="lobby-intro"><div class="lobby-eyebrow">O DIA É SEU. A NOITE, DELE.</div>
        <h1>Construa um refúgio.<br><em>Sobreviva à caçada.</em></h1>
        <p>Entre no vale com seus amigos. Os humanos coletam e fortificam. O vampiro espera o anoitecer para caçar.</p>
        <div class="lobby-factions"><div>${Ei(!1)}<span>ATÉ ${Qs} HUMANOS<small>Construam. Protejam-se.</small></span></div>
          <b>VS</b><div>${Ei(!0)}<span>1 VAMPIRO<small>Encontre. Cace.</small></span></div></div>
        <div class="lobby-rule"><span>01</span> Escolha seu lado <span>02</span> Prepare-se <span>03</span> Sobreviva</div>
      </section>
      <section class="lobby-card lobby-entry-card"><div class="lobby-eyebrow">REÚNA SEU GRUPO</div><h2>Entrar no vale</h2>
        <label for="v-name">Seu nome</label><input id="v-name" maxlength="24" autocomplete="nickname" placeholder="Como devemos chamar você?" value="${ts(this.name)}" ${t?"disabled":""}>
        <button class="lobby-primary" data-action="create" id="v-create" ${t?"disabled":""}>${this.net.pending==="create"?"Criando sala…":"Criar sala"} <span>→</span></button>
        <div class="lobby-divider">ou entre com um código</div>
        <label for="v-code">Código da sala</label><div class="lobby-join-row"><input id="v-code" maxlength="${Yt.lobby.codeLength}" autocomplete="off" spellcheck="false" placeholder="Código" value="${ts(this.code)}" ${t?"disabled":""}>
          <button data-action="join" id="v-join" ${t?"disabled":""}>${this.net.pending==="join"?"Entrando…":"Entrar"}</button></div>
        <p class="lobby-help">Compartilhe o código com seus amigos. A equipe e a confirmação de presença são escolhidas dentro da sala.</p>
        ${this.net.connection==="offline"?'<button data-action="reconnect" class="lobby-reconnect">Reconectar</button>':""}
      </section></main>`}roomView(t){const e=this.net.lobby,n=e.players.find(c=>c.id===this.net.clientId),i=e.hostId===this.net.clientId,s=e.players.filter(c=>c.role==="vampire").length,o=e.players.filter(c=>c.role==="human").length,a=e.players.filter(c=>c.ready).length,l=(c,h,u)=>{const d=(n==null?void 0:n.role)===c,f=h>=u&&!d;return`<button data-action="role" data-role="${c}" class="lobby-role ${c} ${d?"selected":""}" aria-pressed="${d}" ${t||f?"disabled":""}>
        ${Ei(c==="vampire")}<span><strong>${c==="human"?"Humano":"Vampiro"}</strong><small>${c==="human"?"Colete e defenda seu refúgio.":"Cace e destrua as defesas."}</small>
        <em>${d?"Sua equipe":f?"Equipe ocupada":"Escolher equipe"}</em></span><b>${h}/${u}</b></button>`};return`<main class="lobby-room">
      <div class="lobby-room-heading"><div><div class="lobby-eyebrow">PREPARAÇÃO DA PARTIDA</div><h1>Antes do anoitecer</h1></div>
        <div class="lobby-invite"><span>CÓDIGO DA SALA</span><button data-action="copy" title="Copiar código"><b>${e.code}</b><small>Copiar</small></button><small aria-live="polite">${ts(this.copyMessage||"Convide seus amigos")}</small></div></div>
      <div class="lobby-room-columns"><section class="lobby-card lobby-roster"><div class="lobby-section-title"><h2>Jogadores na sala</h2><span>${e.players.length}/${xa}</span></div>
        <div class="lobby-player-list" aria-live="polite">${e.players.map(c=>`<div class="lobby-player ${c.id===this.net.clientId?"self":""}" data-client-id="${c.id}">
          <div class="lobby-avatar">${c.role?Ei(c.role==="vampire"):"<span>?</span>"}</div>
          <div class="lobby-player-name"><strong>${ts(c.name)}${c.id===this.net.clientId?"<small>VOCÊ</small>":""}</strong>
            <span>${c.role==="vampire"?"Vampiro":c.role==="human"?"Humano":"Escolhendo equipe"}${c.id===e.hostId?" · Anfitrião":""}</span></div>
          <span class="lobby-ready-state ${c.ready?"ready":""}">${c.ready?"✓ Pronto":"Preparando"}</span></div>`).join("")}
          ${Array.from({length:Math.max(0,xa-e.players.length)},()=>'<div class="lobby-empty-slot"><span>＋</span> Aguardando jogador</div>').join("")}
        </div><div class="lobby-roster-footer"><span>${a} de ${e.players.length} prontos</span><button data-action="leave" class="lobby-leave" ${t?"disabled":""}>✕ Sair da sala</button></div>
      </section><section class="lobby-card lobby-preparation"><div class="lobby-eyebrow">ESCOLHA SEU LADO</div><h2>Quem você será?</h2>
        ${l("human",o,Qs)}${l("vampire",s,1)}
        <button data-action="ready" class="lobby-ready-button ${n!=null&&n.ready?"confirmed":""}" ${t||!(n!=null&&n.role)?"disabled":""}>${n!=null&&n.ready?"✓ Pronto — cancelar":"Estou pronto"}</button>
        <p class="lobby-help">${n!=null&&n.role?n.ready?"Tudo certo. Aguarde o início da partida.":"Confirme quando estiver preparado para começar.":"Escolha uma equipe para confirmar."}</p>
      </section></div>
      <div class="lobby-start-bar"><div><strong>${e.canStart?e.players.length===1?"Pronto para testar sozinho.":"Todos preparados. A caçada pode começar.":ts(e.startReason??"")}</strong>
        <span>${e.players.length===1?"Teste solo disponível · escolha sua equipe e marque Pronto":`1 vampiro contra até ${Qs} humanos · mapa fixo · cada humano começa do zero`}</span></div>
        <button data-action="start" class="lobby-primary" ${t||!i||!e.canStart?"disabled":""}>${this.net.pending==="start"?"Iniciando…":i?e.players.length===1?"Iniciar teste solo":"Iniciar partida":"Aguardando o anfitrião"} <span>→</span></button></div>
    </main>`}destroy(){this.unsubscribe(),this.el.remove()}}const Sl=document.getElementById("app"),My=td.preload(),nr=new _y,rd=new yy(Sl,nr),by=nr.subscribe(()=>{nr.started&&(by(),My.then(()=>{rd.destroy(),Sy(nr)}))});nr.connect().catch(()=>rd.render());function Sy(r){const t=new hy(Sl,r.lobby.seed);let e;const n=new uy(t,r,Sl,()=>r.myId,()=>r.latestSnap,()=>{e&&r.latestSnap&&e.update(r.latestSnap,r.myId)});e=new xy(t,n,r,()=>r.myId);let i=-1,s=performance.now(),o=!1;function a(l){requestAnimationFrame(a);const c=Math.min(.1,(l-s)/1e3);s=l;const h=r.latestSnap;if(h&&h.tick!==i){if(i=h.tick,t.sync(h),!o){const u=h.units.find(d=>d.owner===r.myId);u&&(n.focusOn(u.x,u.z),n.selected=[u.id],t.setSelection(n.selected),o=!0)}e.update(h,r.myId)}n.update(c),h&&t.updateDayNight(h.phase,h.phaseTime,h.day),t.render(c)}requestAnimationFrame(a)}
