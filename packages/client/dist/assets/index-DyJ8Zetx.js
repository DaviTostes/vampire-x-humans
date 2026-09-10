var Nh=Object.defineProperty;var Fh=(s,t,e)=>t in s?Nh(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var ot=(s,t,e)=>Fh(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const La="170",Oh=0,al=1,zh=2,Ic=1,Dc=2,Tn=3,gn=0,ke=1,Pe=2,Pn=0,Gi=1,ll=2,cl=3,hl=4,Bh=5,oi=100,kh=101,Hh=102,Vh=103,Gh=104,Wh=200,Xh=201,$h=202,qh=203,zo=204,Bo=205,Yh=206,Zh=207,jh=208,Jh=209,Kh=210,Qh=211,td=212,ed=213,nd=214,ko=0,Ho=1,Vo=2,Yi=3,Go=4,Wo=5,Xo=6,$o=7,Ia=0,id=1,sd=2,$n=0,rd=1,od=2,ad=3,ld=4,cd=5,hd=6,dd=7,Uc=300,Zi=301,ji=302,qo=303,Yo=304,kr=306,Zo=1e3,ci=1001,jo=1002,Fe=1003,ud=1004,$s=1005,un=1006,Zr=1007,hi=1008,In=1009,Nc=1010,Fc=1011,Ns=1012,Da=1013,fi=1014,fn=1015,Vs=1016,Ua=1017,Na=1018,Ji=1020,Oc=35902,zc=1021,Bc=1022,on=1023,kc=1024,Hc=1025,Wi=1026,Ki=1027,Fa=1028,Oa=1029,Vc=1030,za=1031,Ba=1033,Er=33776,Tr=33777,Ar=33778,Rr=33779,Jo=35840,Ko=35841,Qo=35842,ta=35843,ea=36196,na=37492,ia=37496,sa=37808,ra=37809,oa=37810,aa=37811,la=37812,ca=37813,ha=37814,da=37815,ua=37816,fa=37817,pa=37818,ma=37819,ga=37820,xa=37821,Cr=36492,va=36494,_a=36495,Gc=36283,Ma=36284,ya=36285,ba=36286,fd=3200,pd=3201,ka=0,md=1,Xn="",$e="srgb",ns="srgb-linear",Hr="linear",oe="srgb",vi=7680,dl=519,gd=512,xd=513,vd=514,Wc=515,_d=516,Md=517,yd=518,bd=519,Sa=35044,Sd=35048,ul="300 es",An=2e3,Ir=2001;class is{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fl=1234567;const As=Math.PI/180,Fs=180/Math.PI;function mn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[s&255]+Re[s>>8&255]+Re[s>>16&255]+Re[s>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function Ee(s,t,e){return Math.max(t,Math.min(e,s))}function Ha(s,t){return(s%t+t)%t}function wd(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Ed(s,t,e){return s!==t?(e-s)/(t-s):0}function Rs(s,t,e){return(1-e)*s+e*t}function Td(s,t,e,n){return Rs(s,t,1-Math.exp(-e*n))}function Ad(s,t=1){return t-Math.abs(Ha(s,t*2)-t)}function Rd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Cd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Pd(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ld(s,t){return s+Math.random()*(t-s)}function Id(s){return s*(.5-Math.random())}function Dd(s){s!==void 0&&(fl=s);let t=fl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ud(s){return s*As}function Nd(s){return s*Fs}function Fd(s){return(s&s-1)===0&&s!==0}function Od(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function zd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bd(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function rn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const di={DEG2RAD:As,RAD2DEG:Fs,generateUUID:mn,clamp:Ee,euclideanModulo:Ha,mapLinear:wd,inverseLerp:Ed,lerp:Rs,damp:Td,pingpong:Ad,smoothstep:Rd,smootherstep:Cd,randInt:Pd,randFloat:Ld,randFloatSpread:Id,seededRandom:Dd,degToRad:Ud,radToDeg:Nd,isPowerOfTwo:Fd,ceilPowerOfTwo:Od,floorPowerOfTwo:zd,setQuaternionFromProperEuler:Bd,normalize:re,denormalize:rn};class K{constructor(t=0,e=0){K.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,r,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],M=i[1],_=i[4],x=i[7],P=i[2],A=i[5],E=i[8];return r[0]=o*v+a*M+l*P,r[3]=o*m+a*_+l*A,r[6]=o*p+a*x+l*E,r[1]=c*v+h*M+d*P,r[4]=c*m+h*_+d*A,r[7]=c*p+h*x+d*E,r[2]=u*v+f*M+g*P,r[5]=u*m+f*_+g*A,r[8]=u*p+f*x+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=u*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jr.makeScale(t,e)),this}rotate(t){return this.premultiply(jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Gt;function Xc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Dr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function kd(){const s=Dr("canvas");return s.style.display="block",s}const pl={};function Ss(s){s in pl||(pl[s]=!0,console.warn(s))}function Hd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Vd(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Gd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(s.r=Ln(s.r),s.g=Ln(s.g),s.b=Ln(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?Hr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Ln(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const ml=[.64,.33,.3,.6,.15,.06],gl=[.2126,.7152,.0722],xl=[.3127,.329],vl=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_l=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[ns]:{primaries:ml,whitePoint:xl,transfer:Hr,toXYZ:vl,fromXYZ:_l,luminanceCoefficients:gl,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:ml,whitePoint:xl,transfer:oe,toXYZ:vl,fromXYZ:_l,luminanceCoefficients:gl,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}});let _i;class Wd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=Dr("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Dr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ln(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Xd=0;class $c{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=mn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Jr(i[o].image)):r.push(Jr(i[o]))}else r=Jr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Jr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Wd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $d=0;class Le extends is{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=ci,i=ci,r=un,o=hi,a=on,l=In,c=Le.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=mn(),this.name="",this.source=new $c(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zo:t.x=t.x-Math.floor(t.x);break;case ci:t.x=t.x<0?0:1;break;case jo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zo:t.y=t.y-Math.floor(t.y);break;case ci:t.y=t.y<0?0:1;break;case jo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Uc;Le.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,i=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,x=(f+1)/2,P=(p+1)/2,A=(h+u)/4,E=(d+v)/4,L=(g+m)/4;return _>x&&_>P?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=A/n,r=E/n):x>P?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=L/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=E/r,i=L/r),this.set(n,i,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qd extends is{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Le(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new $c(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends qd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class qc extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yd extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ss{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==g){let m=1-a;const p=l*u+c*f+h*g+d*v,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const P=Math.sqrt(_),A=Math.atan2(P,p*M);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const x=a*M;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+v*x,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ml.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ml.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kr.copy(this).projectOnVector(t),this.sub(Kr)}reflect(t){return this.sub(Kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new R,Ml=new ss;class Zn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,tn):tn.fromBufferAttribute(r,o),tn.applyMatrix4(t.matrixWorld),this.expandByPoint(tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(t.matrixWorld),this.union(qs)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,tn),tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),Ys.subVectors(this.max,cs),Mi.subVectors(t.a,cs),yi.subVectors(t.b,cs),bi.subVectors(t.c,cs),On.subVectors(yi,Mi),zn.subVectors(bi,yi),Kn.subVectors(Mi,bi);let e=[0,-On.z,On.y,0,-zn.z,zn.y,0,-Kn.z,Kn.y,On.z,0,-On.x,zn.z,0,-zn.x,Kn.z,0,-Kn.x,-On.y,On.x,0,-zn.y,zn.x,0,-Kn.y,Kn.x,0];return!Qr(e,Mi,yi,bi,Ys)||(e=[1,0,0,0,1,0,0,0,1],!Qr(e,Mi,yi,bi,Ys))?!1:(Zs.crossVectors(On,zn),e=[Zs.x,Zs.y,Zs.z],Qr(e,Mi,yi,bi,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Mn=[new R,new R,new R,new R,new R,new R,new R,new R],tn=new R,qs=new Zn,Mi=new R,yi=new R,bi=new R,On=new R,zn=new R,Kn=new R,cs=new R,Ys=new R,Zs=new R,Qn=new R;function Qr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Qn.fromArray(s,r);const a=i.x*Math.abs(Qn.x)+i.y*Math.abs(Qn.y)+i.z*Math.abs(Qn.z),l=t.dot(Qn),c=e.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Zd=new Zn,hs=new R,to=new R;class rs{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Zd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hs.subVectors(t,this.center);const e=hs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(hs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(to.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hs.copy(t.center).add(to)),this.expandByPoint(hs.copy(t.center).sub(to))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new R,eo=new R,js=new R,Bn=new R,no=new R,Js=new R,io=new R;class Va{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){eo.copy(t).add(e).multiplyScalar(.5),js.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(eo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(js),a=Bn.dot(this.direction),l=-Bn.dot(js),c=Bn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(eo).addScaledVector(js,u),f}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),i=yn.dot(yn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,i,r){no.subVectors(e,t),Js.subVectors(n,t),io.crossVectors(no,Js);let o=this.direction.dot(io),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);const l=a*this.direction.dot(Js.crossVectors(Bn,Js));if(l<0)return null;const c=a*this.direction.dot(no.cross(Bn));if(c<0||l+c>o)return null;const h=-a*Bn.dot(io);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),o=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jd,t,Jd)}lookAt(t,e,n){const i=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),kn.crossVectors(n,Ge),kn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),kn.crossVectors(n,Ge)),kn.normalize(),Ks.crossVectors(Ge,kn),i[0]=kn.x,i[4]=Ks.x,i[8]=Ge.x,i[1]=kn.y,i[5]=Ks.y,i[9]=Ge.y,i[2]=kn.z,i[6]=Ks.z,i[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],M=n[3],_=n[7],x=n[11],P=n[15],A=i[0],E=i[4],L=i[8],w=i[12],y=i[1],I=i[5],k=i[9],O=i[13],X=i[2],Z=i[6],W=i[10],Q=i[14],V=i[3],ct=i[7],gt=i[11],bt=i[15];return r[0]=o*A+a*y+l*X+c*V,r[4]=o*E+a*I+l*Z+c*ct,r[8]=o*L+a*k+l*W+c*gt,r[12]=o*w+a*O+l*Q+c*bt,r[1]=h*A+d*y+u*X+f*V,r[5]=h*E+d*I+u*Z+f*ct,r[9]=h*L+d*k+u*W+f*gt,r[13]=h*w+d*O+u*Q+f*bt,r[2]=g*A+v*y+m*X+p*V,r[6]=g*E+v*I+m*Z+p*ct,r[10]=g*L+v*k+m*W+p*gt,r[14]=g*w+v*O+m*Q+p*bt,r[3]=M*A+_*y+x*X+P*V,r[7]=M*E+_*I+x*Z+P*ct,r[11]=M*L+_*k+x*W+P*gt,r[15]=M*w+_*O+x*Q+P*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+v*(+e*l*f-e*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=d*m*c-v*u*c+v*l*f-a*m*f-d*l*p+a*u*p,_=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,x=h*v*c-g*d*c+g*a*f-o*v*f-h*a*p+o*d*p,P=g*d*l-h*v*l-g*a*u+o*v*u+h*a*m-o*d*m,A=e*M+n*_+i*x+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=M*E,t[1]=(v*u*r-d*m*r-v*i*f+n*m*f+d*i*p-n*u*p)*E,t[2]=(a*m*r-v*l*r+v*i*c-n*m*c-a*i*p+n*l*p)*E,t[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*E,t[4]=_*E,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*E,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*p-e*l*p)*E,t[7]=(o*u*r-h*l*r+h*i*c-e*u*c-o*i*f+e*l*f)*E,t[8]=x*E,t[9]=(g*d*r-h*v*r-g*n*f+e*v*f+h*n*p-e*d*p)*E,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*E,t[12]=P*E,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*m+e*d*m)*E,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*m-e*a*m)*E,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,m=o*d,p=a*d,M=l*c,_=l*h,x=l*d,P=n.x,A=n.y,E=n.z;return i[0]=(1-(v+p))*P,i[1]=(f+x)*P,i[2]=(g-_)*P,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(u+p))*A,i[6]=(m+M)*A,i[7]=0,i[8]=(g+_)*E,i[9]=(m-M)*E,i[10]=(1-(u+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Si.set(i[0],i[1],i[2]).length();const o=Si.set(i[4],i[5],i[6]).length(),a=Si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],en.copy(this);const c=1/r,h=1/o,d=1/a;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,e.setFromRotationMatrix(en),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=An){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===An)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ir)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=An){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*c,f=(n+i)*h;let g,v;if(a===An)g=(o+r)*d,v=-2*d;else if(a===Ir)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Si=new R,en=new te,jd=new R(0,0,0),Jd=new R(1,1,1),kn=new R,Ks=new R,Ge=new R,yl=new te,bl=new ss;class an{constructor(t=0,e=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bl.setFromEuler(this),this.setFromQuaternion(bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kd=0;const Sl=new R,wi=new ss,bn=new te,Qs=new R,ds=new R,Qd=new R,tu=new ss,wl=new R(1,0,0),El=new R(0,1,0),Tl=new R(0,0,1),Al={type:"added"},eu={type:"removed"},Ei={type:"childadded",child:null},so={type:"childremoved",child:null};class _e extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new R,e=new an,n=new ss,i=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new te},normalMatrix:{value:new Gt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(wl,t)}rotateY(t){return this.rotateOnAxis(El,t)}rotateZ(t){return this.rotateOnAxis(Tl,t)}translateOnAxis(t,e){return Sl.copy(t).applyQuaternion(this.quaternion),this.position.add(Sl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wl,t)}translateY(t){return this.translateOnAxis(El,t)}translateZ(t){return this.translateOnAxis(Tl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qs.copy(t):Qs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ds,Qs,this.up):bn.lookAt(Qs,ds,this.up),this.quaternion.setFromRotationMatrix(bn),i&&(bn.extractRotation(i.matrixWorld),wi.setFromRotationMatrix(bn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Al),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(eu),so.child=t,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Al),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,t,Qd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,tu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new R(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new R,Sn=new R,ro=new R,wn=new R,Ti=new R,Ai=new R,Rl=new R,oo=new R,ao=new R,lo=new R,co=new le,ho=new le,uo=new le;class Je{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),nn.subVectors(t,e),i.cross(nn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){nn.subVectors(i,e),Sn.subVectors(n,e),ro.subVectors(t,e);const o=nn.dot(nn),a=nn.dot(Sn),l=nn.dot(ro),c=Sn.dot(Sn),h=Sn.dot(ro),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wn.x),l.addScaledVector(o,wn.y),l.addScaledVector(a,wn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return co.setScalar(0),ho.setScalar(0),uo.setScalar(0),co.fromBufferAttribute(t,e),ho.fromBufferAttribute(t,n),uo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(co,r.x),o.addScaledVector(ho,r.y),o.addScaledVector(uo,r.z),o}static isFrontFacing(t,e,n,i){return nn.subVectors(n,e),Sn.subVectors(t,e),nn.cross(Sn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),nn.cross(Sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Je.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ti.subVectors(i,n),Ai.subVectors(r,n),oo.subVectors(t,n);const l=Ti.dot(oo),c=Ai.dot(oo);if(l<=0&&c<=0)return e.copy(n);ao.subVectors(t,i);const h=Ti.dot(ao),d=Ai.dot(ao);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ti,o);lo.subVectors(t,r);const f=Ti.dot(lo),g=Ai.dot(lo);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ai,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Rl.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(Rl,a);const p=1/(m+v+u);return o=v*p,a=u*p,e.copy(n).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function fo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=Ha(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fo(o,r,t+1/3),this.g=fo(o,r,t),this.b=fo(o,r,t-1/3)}return Kt.toWorkingColorSpace(this,i),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=Yc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return Kt.fromWorkingColorSpace(Ce.copy(this),t),Math.round(Ee(Ce.r*255,0,255))*65536+Math.round(Ee(Ce.g*255,0,255))*256+Math.round(Ee(Ce.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Ce.copy(this),e);const n=Ce.r,i=Ce.g,r=Ce.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=$e){Kt.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,i=Ce.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(tr);const n=Rs(Hn.h,tr.h,e),i=Rs(Hn.s,tr.s,e),r=Rs(Hn.l,tr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new It;It.NAMES=Yc;let nu=0;class jn extends is{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=mn(),this.name="",this.blending=Gi,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Bo,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zo&&(n.blendSrc=this.blendSrc),this.blendDst!==Bo&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ne extends jn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new R,er=new K;class He{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sa,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)er.fromBufferAttribute(this,e),er.applyMatrix3(t),this.setXY(e,er.x,er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sa&&(t.usage=this.usage),t}}class Zc extends He{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jc extends He{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Yt extends He{constructor(t,e,n){super(new Float32Array(t),e,n)}}let iu=0;const Ze=new te,po=new _e,Ri=new R,We=new Zn,us=new Zn,we=new R;class xe extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xc(t)?jc:Zc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return po.lookAt(t),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];us.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(We.min,us.min),We.expandByPoint(we),we.addVectors(We.max,us.max),We.expandByPoint(we)):(We.expandByPoint(us.min),We.expandByPoint(us.max))}We.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)we.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(we));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)we.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(t,c),we.add(Ri)),i=Math.max(i,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new R,l[L]=new R;const c=new R,h=new R,d=new R,u=new K,f=new K,g=new K,v=new R,m=new R;function p(L,w,y){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,L),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[L].add(v),a[w].add(v),a[y].add(v),l[L].add(m),l[w].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,w=M.length;L<w;++L){const y=M[L],I=y.start,k=y.count;for(let O=I,X=I+k;O<X;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const _=new R,x=new R,P=new R,A=new R;function E(L){P.fromBufferAttribute(i,L),A.copy(P);const w=a[L];_.copy(w),_.sub(P.multiplyScalar(P.dot(w))).normalize(),x.crossVectors(A,w);const I=x.dot(l[L])<0?-1:1;o.setXYZW(L,_.x,_.y,_.z,I)}for(let L=0,w=M.length;L<w;++L){const y=M[L],I=y.start,k=y.count;for(let O=I,X=I+k;O<X;O+=3)E(t.getX(O+0)),E(t.getX(O+1)),E(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new R,r=new R,o=new R,a=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new He(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new xe,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cl=new te,ti=new Va,nr=new rs,Pl=new R,ir=new R,sr=new R,rr=new R,mo=new R,or=new R,Ll=new R,ar=new R;class qt extends _e{constructor(t=new xe,e=new Ne){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(mo.fromBufferAttribute(d,t),o?or.addScaledVector(mo,h):or.addScaledVector(mo.sub(e),h))}e.add(or)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(r),ti.copy(t.ray).recast(t.near),!(nr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(nr,Pl)===null||ti.origin.distanceToSquared(Pl)>(t.far-t.near)**2))&&(Cl.copy(r).invert(),ti.copy(t.ray).applyMatrix4(Cl),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,P=_;x<P;x+=3){const A=a.getX(x),E=a.getX(x+1),L=a.getX(x+2);i=lr(this,p,t,n,c,h,d,A,E,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=a.getX(m),_=a.getX(m+1),x=a.getX(m+2);i=lr(this,o,t,n,c,h,d,M,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,P=_;x<P;x+=3){const A=x,E=x+1,L=x+2;i=lr(this,p,t,n,c,h,d,A,E,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,_=m+1,x=m+2;i=lr(this,o,t,n,c,h,d,M,_,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function su(s,t,e,n,i,r,o,a){let l;if(t.side===ke?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===gn,a),l===null)return null;ar.copy(a),ar.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ar);return c<e.near||c>e.far?null:{distance:c,point:ar.clone(),object:s}}function lr(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,ir),s.getVertexPosition(l,sr),s.getVertexPosition(c,rr);const h=su(s,t,e,n,ir,sr,rr,Ll);if(h){const d=new R;Je.getBarycoord(Ll,ir,sr,rr,d),i&&(h.uv=Je.getInterpolatedAttribute(i,a,l,c,d,new K)),r&&(h.uv1=Je.getInterpolatedAttribute(r,a,l,c,d,new K)),o&&(h.normal=Je.getInterpolatedAttribute(o,a,l,c,d,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new R,materialIndex:0};Je.getNormal(ir,sr,rr,u.normal),h.face=u,h.barycoord=d}return h}class Dn extends xe{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(d,2));function g(v,m,p,M,_,x,P,A,E,L,w){const y=x/E,I=P/L,k=x/2,O=P/2,X=A/2,Z=E+1,W=L+1;let Q=0,V=0;const ct=new R;for(let gt=0;gt<W;gt++){const bt=gt*I-O;for(let kt=0;kt<Z;kt++){const ee=kt*y-k;ct[v]=ee*M,ct[m]=bt*_,ct[p]=X,c.push(ct.x,ct.y,ct.z),ct[v]=0,ct[m]=0,ct[p]=A>0?1:-1,h.push(ct.x,ct.y,ct.z),d.push(kt/E),d.push(1-gt/L),Q+=1}}for(let gt=0;gt<L;gt++)for(let bt=0;bt<E;bt++){const kt=u+bt+Z*gt,ee=u+bt+Z*(gt+1),Y=u+(bt+1)+Z*(gt+1),st=u+(bt+1)+Z*gt;l.push(kt,ee,st),l.push(ee,Y,st),V+=6}a.addGroup(f,V,w),f+=V,u+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ue(s){const t={};for(let e=0;e<s.length;e++){const n=Qi(s[e]);for(const i in n)t[i]=n[i]}return t}function ru(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Jc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const ou={clone:Qi,merge:Ue};var au=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends jn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=au,this.fragmentShader=lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=ru(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Kc extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new R,Il=new K,Dl=new K;class qe extends Kc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Il,Dl),e.subVectors(Dl,Il)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(As*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ci=-90,Pi=1;class cu extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qe(Ci,Pi,t,e);i.layers=this.layers,this.add(i);const r=new qe(Ci,Pi,t,e);r.layers=this.layers,this.add(r);const o=new qe(Ci,Pi,t,e);o.layers=this.layers,this.add(o);const a=new qe(Ci,Pi,t,e);a.layers=this.layers,this.add(a);const l=new qe(Ci,Pi,t,e);l.layers=this.layers,this.add(l);const c=new qe(Ci,Pi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Qc extends Le{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Zi,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hu extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Qc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Dn(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Pn});r.uniforms.tEquirect.value=e;const o=new qt(i,r),a=e.minFilter;return e.minFilter===hi&&(e.minFilter=un),new cu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const go=new R,du=new R,uu=new Gt;class si{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=go.subVectors(n,e).cross(du.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(go),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||uu.getNormalMatrix(t),i=this.coplanarPoint(go).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new rs,cr=new R;class Wa{constructor(t=new si,e=new si,n=new si,i=new si,r=new si,o=new si){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],M=i[13],_=i[14],x=i[15];if(n[0].setComponents(l-r,u-c,m-f,x-p).normalize(),n[1].setComponents(l+r,u+c,m+f,x+p).normalize(),n[2].setComponents(l+o,u+h,m+g,x+M).normalize(),n[3].setComponents(l-o,u-h,m-g,x-M).normalize(),n[4].setComponents(l-a,u-d,m-v,x-_).normalize(),e===An)n[5].setComponents(l+a,u+d,m+v,x+_).normalize();else if(e===Ir)n[5].setComponents(a,d,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(cr.x=i.normal.x>0?t.max.x:t.min.x,cr.y=i.normal.y>0?t.max.y:t.min.y,cr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function th(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function fu(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class pn extends xe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*u-o;for(let _=0;_<c;_++){const x=_*d-r;g.push(x,-M,0),v.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const _=M+c*p,x=M+c*(p+1),P=M+1+c*(p+1),A=M+1+c*p;f.push(_,x,A),f.push(x,P,A)}this.setIndex(f),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.widthSegments,t.heightSegments)}}var pu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mu=`#ifdef USE_ALPHAHASH
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
#endif`,gu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mu=`#ifdef USE_AOMAP
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
#endif`,yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bu=`#ifdef USE_BATCHING
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
#endif`,Su=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Au=`#ifdef USE_IRIDESCENCE
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
#endif`,Ru=`#ifdef USE_BUMPMAP
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
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ou=`#define PI 3.141592653589793
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
} // validated`,zu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bu=`vec3 transformedNormal = objectNormal;
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
#endif`,ku=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$u=`#ifdef USE_ENVMAP
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
#endif`,qu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yu=`#ifdef USE_ENVMAP
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
#endif`,Zu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ef=`#ifdef USE_GRADIENTMAP
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
}`,nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,of=`uniform bool receiveShadow;
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
#endif`,af=`#ifdef USE_ENVMAP
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
#endif`,lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
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
#endif`,ff=`struct PhysicalMaterial {
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
}`,pf=`
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
#endif`,mf=`#if defined( RE_IndirectDiffuse )
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
#endif`,gf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wf=`#if defined( USE_POINTS_UV )
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
#endif`,Ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
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
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Of=`#ifdef USE_NORMALMAP
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
#endif`,zf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qf=`float getShadowMask() {
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
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ep=`#ifdef USE_SKINNING
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
#endif`,np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ip=`#ifdef USE_SKINNING
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
#endif`,sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,op=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ap=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lp=`#ifdef USE_TRANSMISSION
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
#endif`,cp=`#ifdef USE_TRANSMISSION
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
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
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`#include <common>
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
}`,yp=`#if DEPTH_PACKING == 3200
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
}`,bp=`#define DISTANCE
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
}`,Sp=`#define DISTANCE
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
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
}`,Ap=`uniform vec3 diffuse;
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
}`,Rp=`#include <common>
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Pp=`#define LAMBERT
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
}`,Lp=`#define LAMBERT
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
}`,Ip=`#define MATCAP
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
}`,Dp=`#define MATCAP
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
}`,Up=`#define NORMAL
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
}`,Np=`#define NORMAL
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
}`,Fp=`#define PHONG
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
}`,Op=`#define PHONG
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
}`,zp=`#define STANDARD
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
}`,Bp=`#define STANDARD
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
}`,kp=`#define TOON
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
}`,Hp=`#define TOON
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
}`,Vp=`uniform float size;
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
}`,Gp=`uniform vec3 diffuse;
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
}`,Wp=`#include <common>
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
}`,Xp=`uniform vec3 color;
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
}`,$p=`uniform float rotation;
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
}`,qp=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:pu,alphahash_pars_fragment:mu,alphamap_fragment:gu,alphamap_pars_fragment:xu,alphatest_fragment:vu,alphatest_pars_fragment:_u,aomap_fragment:Mu,aomap_pars_fragment:yu,batching_pars_vertex:bu,batching_vertex:Su,begin_vertex:wu,beginnormal_vertex:Eu,bsdfs:Tu,iridescence_fragment:Au,bumpmap_pars_fragment:Ru,clipping_planes_fragment:Cu,clipping_planes_pars_fragment:Pu,clipping_planes_pars_vertex:Lu,clipping_planes_vertex:Iu,color_fragment:Du,color_pars_fragment:Uu,color_pars_vertex:Nu,color_vertex:Fu,common:Ou,cube_uv_reflection_fragment:zu,defaultnormal_vertex:Bu,displacementmap_pars_vertex:ku,displacementmap_vertex:Hu,emissivemap_fragment:Vu,emissivemap_pars_fragment:Gu,colorspace_fragment:Wu,colorspace_pars_fragment:Xu,envmap_fragment:$u,envmap_common_pars_fragment:qu,envmap_pars_fragment:Yu,envmap_pars_vertex:Zu,envmap_physical_pars_fragment:af,envmap_vertex:ju,fog_vertex:Ju,fog_pars_vertex:Ku,fog_fragment:Qu,fog_pars_fragment:tf,gradientmap_pars_fragment:ef,lightmap_pars_fragment:nf,lights_lambert_fragment:sf,lights_lambert_pars_fragment:rf,lights_pars_begin:of,lights_toon_fragment:lf,lights_toon_pars_fragment:cf,lights_phong_fragment:hf,lights_phong_pars_fragment:df,lights_physical_fragment:uf,lights_physical_pars_fragment:ff,lights_fragment_begin:pf,lights_fragment_maps:mf,lights_fragment_end:gf,logdepthbuf_fragment:xf,logdepthbuf_pars_fragment:vf,logdepthbuf_pars_vertex:_f,logdepthbuf_vertex:Mf,map_fragment:yf,map_pars_fragment:bf,map_particle_fragment:Sf,map_particle_pars_fragment:wf,metalnessmap_fragment:Ef,metalnessmap_pars_fragment:Tf,morphinstance_vertex:Af,morphcolor_vertex:Rf,morphnormal_vertex:Cf,morphtarget_pars_vertex:Pf,morphtarget_vertex:Lf,normal_fragment_begin:If,normal_fragment_maps:Df,normal_pars_fragment:Uf,normal_pars_vertex:Nf,normal_vertex:Ff,normalmap_pars_fragment:Of,clearcoat_normal_fragment_begin:zf,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:kf,iridescence_pars_fragment:Hf,opaque_fragment:Vf,packing:Gf,premultiplied_alpha_fragment:Wf,project_vertex:Xf,dithering_fragment:$f,dithering_pars_fragment:qf,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:Zf,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:Jf,shadowmap_vertex:Kf,shadowmask_pars_fragment:Qf,skinbase_vertex:tp,skinning_pars_vertex:ep,skinning_vertex:np,skinnormal_vertex:ip,specularmap_fragment:sp,specularmap_pars_fragment:rp,tonemapping_fragment:op,tonemapping_pars_fragment:ap,transmission_fragment:lp,transmission_pars_fragment:cp,uv_pars_fragment:hp,uv_pars_vertex:dp,uv_vertex:up,worldpos_vertex:fp,background_vert:pp,background_frag:mp,backgroundCube_vert:gp,backgroundCube_frag:xp,cube_vert:vp,cube_frag:_p,depth_vert:Mp,depth_frag:yp,distanceRGBA_vert:bp,distanceRGBA_frag:Sp,equirect_vert:wp,equirect_frag:Ep,linedashed_vert:Tp,linedashed_frag:Ap,meshbasic_vert:Rp,meshbasic_frag:Cp,meshlambert_vert:Pp,meshlambert_frag:Lp,meshmatcap_vert:Ip,meshmatcap_frag:Dp,meshnormal_vert:Up,meshnormal_frag:Np,meshphong_vert:Fp,meshphong_frag:Op,meshphysical_vert:zp,meshphysical_frag:Bp,meshtoon_vert:kp,meshtoon_frag:Hp,points_vert:Vp,points_frag:Gp,shadow_vert:Wp,shadow_frag:Xp,sprite_vert:$p,sprite_frag:qp},ht={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},cn={basic:{uniforms:Ue([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ue([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new It(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ue([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ue([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ue([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new It(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ue([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ue([ht.points,ht.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ue([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ue([ht.common,ht.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ue([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ue([ht.sprite,ht.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Ue([ht.common,ht.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Ue([ht.lights,ht.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};cn.physical={uniforms:Ue([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const hr={r:0,b:0,g:0},ni=new an,Yp=new te;function Zp(s,t,e,n,i,r,o){const a=new It(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function v(M){let _=!1;const x=g(M);x===null?p(a,l):x&&x.isColor&&(p(x,1),_=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,_){const x=g(_);x&&(x.isCubeTexture||x.mapping===kr)?(h===void 0&&(h=new qt(new Dn(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Qi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ni.copy(_.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(ni)),h.material.toneMapped=Kt.getTransfer(x.colorSpace)!==oe,(d!==x||u!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new qt(new pn(2,2),new Un({name:"BackgroundMaterial",uniforms:Qi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,_){M.getRGB(hr,Jc(s)),n.buffers.color.setClear(hr.r,hr.g,hr.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:v,addToRenderList:m}}function jp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,o=!1;function a(y,I,k,O,X){let Z=!1;const W=d(O,k,I);r!==W&&(r=W,c(r.object)),Z=f(y,O,k,X),Z&&g(y,O,k,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(y,I,k,O),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function d(y,I,k){const O=k.wireframe===!0;let X=n[y.id];X===void 0&&(X={},n[y.id]=X);let Z=X[I.id];Z===void 0&&(Z={},X[I.id]=Z);let W=Z[O];return W===void 0&&(W=u(l()),Z[O]=W),W}function u(y){const I=[],k=[],O=[];for(let X=0;X<e;X++)I[X]=0,k[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:O,object:y,attributes:{},index:null}}function f(y,I,k,O){const X=r.attributes,Z=I.attributes;let W=0;const Q=k.getAttributes();for(const V in Q)if(Q[V].location>=0){const gt=X[V];let bt=Z[V];if(bt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(bt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(bt=y.instanceColor)),gt===void 0||gt.attribute!==bt||bt&&gt.data!==bt.data)return!0;W++}return r.attributesNum!==W||r.index!==O}function g(y,I,k,O){const X={},Z=I.attributes;let W=0;const Q=k.getAttributes();for(const V in Q)if(Q[V].location>=0){let gt=Z[V];gt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(gt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(gt=y.instanceColor));const bt={};bt.attribute=gt,gt&&gt.data&&(bt.data=gt.data),X[V]=bt,W++}r.attributes=X,r.attributesNum=W,r.index=O}function v(){const y=r.newAttributes;for(let I=0,k=y.length;I<k;I++)y[I]=0}function m(y){p(y,0)}function p(y,I){const k=r.newAttributes,O=r.enabledAttributes,X=r.attributeDivisors;k[y]=1,O[y]===0&&(s.enableVertexAttribArray(y),O[y]=1),X[y]!==I&&(s.vertexAttribDivisor(y,I),X[y]=I)}function M(){const y=r.newAttributes,I=r.enabledAttributes;for(let k=0,O=I.length;k<O;k++)I[k]!==y[k]&&(s.disableVertexAttribArray(k),I[k]=0)}function _(y,I,k,O,X,Z,W){W===!0?s.vertexAttribIPointer(y,I,k,X,Z):s.vertexAttribPointer(y,I,k,O,X,Z)}function x(y,I,k,O){v();const X=O.attributes,Z=k.getAttributes(),W=I.defaultAttributeValues;for(const Q in Z){const V=Z[Q];if(V.location>=0){let ct=X[Q];if(ct===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor)),ct!==void 0){const gt=ct.normalized,bt=ct.itemSize,kt=t.get(ct);if(kt===void 0)continue;const ee=kt.buffer,Y=kt.type,st=kt.bytesPerElement,wt=Y===s.INT||Y===s.UNSIGNED_INT||ct.gpuType===Da;if(ct.isInterleavedBufferAttribute){const at=ct.data,Lt=at.stride,zt=ct.offset;if(at.isInstancedInterleavedBuffer){for(let Nt=0;Nt<V.locationSize;Nt++)p(V.location+Nt,at.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Nt=0;Nt<V.locationSize;Nt++)m(V.location+Nt);s.bindBuffer(s.ARRAY_BUFFER,ee);for(let Nt=0;Nt<V.locationSize;Nt++)_(V.location+Nt,bt/V.locationSize,Y,gt,Lt*st,(zt+bt/V.locationSize*Nt)*st,wt)}else{if(ct.isInstancedBufferAttribute){for(let at=0;at<V.locationSize;at++)p(V.location+at,ct.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let at=0;at<V.locationSize;at++)m(V.location+at);s.bindBuffer(s.ARRAY_BUFFER,ee);for(let at=0;at<V.locationSize;at++)_(V.location+at,bt/V.locationSize,Y,gt,bt*st,bt/V.locationSize*at*st,wt)}}else if(W!==void 0){const gt=W[Q];if(gt!==void 0)switch(gt.length){case 2:s.vertexAttrib2fv(V.location,gt);break;case 3:s.vertexAttrib3fv(V.location,gt);break;case 4:s.vertexAttrib4fv(V.location,gt);break;default:s.vertexAttrib1fv(V.location,gt)}}}}M()}function P(){L();for(const y in n){const I=n[y];for(const k in I){const O=I[k];for(const X in O)h(O[X].object),delete O[X];delete I[k]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const k in I){const O=I[k];for(const X in O)h(O[X].object),delete O[X];delete I[k]}delete n[y.id]}function E(y){for(const I in n){const k=n[I];if(k[y.id]===void 0)continue;const O=k[y.id];for(const X in O)h(O[X].object),delete O[X];delete k[y.id]}}function L(){w(),o=!0,r!==i&&(r=i,c(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Jp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Kp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==on&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const L=E===Vs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==In&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==fn&&!L)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:P,maxSamples:A}}function Qp(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new si,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,_=M*4;let x=p.clippingState||null;l.value=x,x=h(g,u,_,f);for(let P=0;P!==_;++P)x[P]=e[P];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,x=f;_!==v;++_,x+=4)o.copy(d[_]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function tm(s){let t=new WeakMap;function e(o,a){return a===qo?o.mapping=Zi:a===Yo&&(o.mapping=ji),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===qo||a===Yo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new hu(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class eh extends Kc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bi=4,Ul=[.125,.215,.35,.446,.526,.582],ai=20,xo=new eh,Nl=new It;let vo=null,_o=0,Mo=0,yo=!1;const ri=(1+Math.sqrt(5))/2,Li=1/ri,Fl=[new R(-ri,Li,0),new R(ri,Li,0),new R(-Li,0,ri),new R(Li,0,ri),new R(0,ri,-Li),new R(0,ri,Li),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class Ol{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){vo=this._renderer.getRenderTarget(),_o=this._renderer.getActiveCubeFace(),Mo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(vo,_o,Mo),this._renderer.xr.enabled=yo,t.scissorTest=!1,dr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zi||t.mapping===ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vo=this._renderer.getRenderTarget(),_o=this._renderer.getActiveCubeFace(),Mo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:Vs,format:on,colorSpace:ns,depthBuffer:!1},i=zl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=em(r)),this._blurMaterial=nm(r,t,e)}return i}_compileMaterial(t){const e=new qt(this._lodPlanes[0],t);this._renderer.compile(e,xo)}_sceneToCubeUV(t,e,n,i){const a=new qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Nl),h.toneMapping=$n,h.autoClear=!1;const f=new Ne({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),g=new qt(new Dn,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Nl),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;dr(i,M*_,p>2?_:0,_,_),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Zi||t.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bl());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new qt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;dr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,xo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Fl[(i-r-1)%Fl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new qt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ai-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const p=[];let M=0;for(let E=0;E<ai;++E){const L=E/v,w=Math.exp(-L*L/2);p.push(w),E===0?M+=w:E<m&&(M+=2*w)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-n;const x=this._sizeLods[i],P=3*x*(i>_-Bi?i-_+Bi:0),A=4*(this._cubeSize-x);dr(e,P,A,3*x,2*x),l.setRenderTarget(e),l.render(d,xo)}}function em(s){const t=[],e=[],n=[];let i=s;const r=s-Bi+1+Ul.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Bi?l=Ul[o-s+Bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),_=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,L=A>2?0:-1,w=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];M.set(w,v*g*A),_.set(u,m*g*A);const y=[A,A,A,A,A,A];x.set(y,p*g*A)}const P=new xe;P.setAttribute("position",new He(M,v)),P.setAttribute("uv",new He(_,m)),P.setAttribute("faceIndex",new He(x,p)),t.push(P),i>Bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function zl(s,t,e){const n=new qn(s,t,e);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function nm(s,t,e){const n=new Float32Array(ai),i=new R(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Bl(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function kl(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Xa(){return`

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
	`}function im(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===qo||l===Yo,h=l===Zi||l===ji;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Ol(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ol(s)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function sm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ss("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function rm(s,t,e,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}u.removeEventListener("dispose",o),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let _=0,x=M.length;_<x;_+=3){const P=M[_+0],A=M[_+1],E=M[_+2];u.push(P,A,A,E,E,P)}}else if(g!==void 0){const M=g.array;v=g.version;for(let _=0,x=M.length/3-1;_<x;_+=3){const P=_+0,A=_+1,E=_+2;u.push(P,A,A,E,E,P)}}else return;const m=new(Xc(u)?jc:Zc)(u,1);m.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function om(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*v[M];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function am(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function lm(s,t,e){const n=new WeakMap,i=new le;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let y=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let P=a.attributes.position.count*x,A=1;P>t.maxTextureSize&&(A=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*A*4*d),L=new qc(E,P,A,d);L.type=fn,L.needsUpdate=!0;const w=x*4;for(let I=0;I<d;I++){const k=p[I],O=M[I],X=_[I],Z=P*A*4*I;for(let W=0;W<k.count;W++){const Q=W*w;g===!0&&(i.fromBufferAttribute(k,W),E[Z+Q+0]=i.x,E[Z+Q+1]=i.y,E[Z+Q+2]=i.z,E[Z+Q+3]=0),v===!0&&(i.fromBufferAttribute(O,W),E[Z+Q+4]=i.x,E[Z+Q+5]=i.y,E[Z+Q+6]=i.z,E[Z+Q+7]=0),m===!0&&(i.fromBufferAttribute(X,W),E[Z+Q+8]=i.x,E[Z+Q+9]=i.y,E[Z+Q+10]=i.z,E[Z+Q+11]=X.itemSize===4?i.w:1)}}u={count:d,texture:L,size:new K(P,A)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function cm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class nh extends Le{constructor(t,e,n,i,r,o,a,l,c,h=Wi){if(h!==Wi&&h!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Wi&&(n=fi),n===void 0&&h===Ki&&(n=Ji),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ih=new Le,Hl=new nh(1,1),sh=new qc,rh=new Yd,oh=new Qc,Vl=[],Gl=[],Wl=new Float32Array(16),Xl=new Float32Array(9),$l=new Float32Array(4);function os(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Vl[i];if(r===void 0&&(r=new Float32Array(i),Vl[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function be(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Vr(s,t){let e=Gl[t];e===void 0&&(e=new Int32Array(t),Gl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function hm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function dm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function pm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;$l.set(n),s.uniformMatrix2fv(this.addr,!1,$l),Se(e,n)}}function mm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;Xl.set(n),s.uniformMatrix3fv(this.addr,!1,Xl),Se(e,n)}}function gm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;Wl.set(n),s.uniformMatrix4fv(this.addr,!1,Wl),Se(e,n)}}function xm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function vm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function _m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function Mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function ym(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function bm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function Sm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function wm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function Em(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Hl.compareFunction=Wc,r=Hl):r=ih,e.setTexture2D(t||r,i)}function Tm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||rh,i)}function Am(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||oh,i)}function Rm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||sh,i)}function Cm(s){switch(s){case 5126:return hm;case 35664:return dm;case 35665:return um;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return xm;case 35667:case 35671:return vm;case 35668:case 35672:return _m;case 35669:case 35673:return Mm;case 5125:return ym;case 36294:return bm;case 36295:return Sm;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Rm}}function Pm(s,t){s.uniform1fv(this.addr,t)}function Lm(s,t){const e=os(t,this.size,2);s.uniform2fv(this.addr,e)}function Im(s,t){const e=os(t,this.size,3);s.uniform3fv(this.addr,e)}function Dm(s,t){const e=os(t,this.size,4);s.uniform4fv(this.addr,e)}function Um(s,t){const e=os(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Nm(s,t){const e=os(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Fm(s,t){const e=os(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Om(s,t){s.uniform1iv(this.addr,t)}function zm(s,t){s.uniform2iv(this.addr,t)}function Bm(s,t){s.uniform3iv(this.addr,t)}function km(s,t){s.uniform4iv(this.addr,t)}function Hm(s,t){s.uniform1uiv(this.addr,t)}function Vm(s,t){s.uniform2uiv(this.addr,t)}function Gm(s,t){s.uniform3uiv(this.addr,t)}function Wm(s,t){s.uniform4uiv(this.addr,t)}function Xm(s,t,e){const n=this.cache,i=t.length,r=Vr(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ih,r[o])}function $m(s,t,e){const n=this.cache,i=t.length,r=Vr(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||rh,r[o])}function qm(s,t,e){const n=this.cache,i=t.length,r=Vr(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||oh,r[o])}function Ym(s,t,e){const n=this.cache,i=t.length,r=Vr(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||sh,r[o])}function Zm(s){switch(s){case 5126:return Pm;case 35664:return Lm;case 35665:return Im;case 35666:return Dm;case 35674:return Um;case 35675:return Nm;case 35676:return Fm;case 5124:case 35670:return Om;case 35667:case 35671:return zm;case 35668:case 35672:return Bm;case 35669:case 35673:return km;case 5125:return Hm;case 36294:return Vm;case 36295:return Gm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return Ym}}class jm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cm(e.type)}}class Jm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zm(e.type)}}class Km{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const bo=/(\w+)(\])?(\[|\.)?/g;function ql(s,t){s.seq.push(t),s.map[t.id]=t}function Qm(s,t,e){const n=s.name,i=n.length;for(bo.lastIndex=0;;){const r=bo.exec(n),o=bo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ql(e,c===void 0?new jm(a,s,t):new Jm(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Km(a),ql(e,d)),e=d}}}class Pr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Qm(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Yl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const t0=37297;let e0=0;function n0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zl=new Gt;function i0(s){Kt._getMatrix(Zl,Kt.workingColorSpace,s);const t=`mat3( ${Zl.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(s)){case Hr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function jl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+n0(s.getShaderSource(t),o)}else return i}function s0(s,t){const e=i0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function r0(s,t){let e;switch(t){case rd:e="Linear";break;case od:e="Reinhard";break;case ad:e="Cineon";break;case ld:e="ACESFilmic";break;case hd:e="AgX";break;case dd:e="Neutral";break;case cd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ur=new R;function o0(){Kt.getLuminanceCoefficients(ur);const s=ur.x.toFixed(4),t=ur.y.toFixed(4),e=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function l0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function c0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function ws(s){return s!==""}function Jl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function wa(s){return s.replace(h0,u0)}const d0=new Map;function u0(s,t){let e=$t[t];if(e===void 0){const n=d0.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wa(e)}const f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ql(s){return s.replace(f0,p0)}function p0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function tc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ic?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Dc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function g0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Zi:case ji:t="ENVMAP_TYPE_CUBE";break;case kr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function x0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ji:t="ENVMAP_MODE_REFRACTION";break}return t}function v0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ia:t="ENVMAP_BLENDING_MULTIPLY";break;case id:t="ENVMAP_BLENDING_MIX";break;case sd:t="ENVMAP_BLENDING_ADD";break}return t}function _0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function M0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=m0(e),c=g0(e),h=x0(e),d=v0(e),u=_0(e),f=a0(e),g=l0(r),v=i.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ws).join(`
`),p.length>0&&(p+=`
`)):(m=[tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),p=[tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?$t.tonemapping_pars_fragment:"",e.toneMapping!==$n?r0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,s0("linearToOutputTexel",e.outputColorSpace),o0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),o=wa(o),o=Jl(o,e),o=Kl(o,e),a=wa(a),a=Jl(a,e),a=Kl(a,e),o=Ql(o),a=Ql(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=M+m+o,x=M+p+a,P=Yl(i,i.VERTEX_SHADER,_),A=Yl(i,i.FRAGMENT_SHADER,x);i.attachShader(v,P),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(I){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(v).trim(),O=i.getShaderInfoLog(P).trim(),X=i.getShaderInfoLog(A).trim();let Z=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,P,A);else{const Q=jl(i,P,"vertex"),V=jl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+Q+`
`+V)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||X==="")&&(W=!1);W&&(I.diagnostics={runnable:Z,programLog:k,vertexShader:{log:O,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(P),i.deleteShader(A),L=new Pr(i,v),w=c0(i,v)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,t0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=e0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=A,this}let y0=0;class b0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new S0(t),e.set(t,n)),n}}class S0{constructor(t){this.id=y0++,this.code=t,this.usedTimes=0}}function w0(s,t,e,n,i,r,o){const a=new Ga,l=new b0,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,I,k,O){const X=k.fog,Z=O.geometry,W=w.isMeshStandardMaterial?k.environment:null,Q=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),V=Q&&Q.mapping===kr?Q.image.height:null,ct=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const gt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,bt=gt!==void 0?gt.length:0;let kt=0;Z.morphAttributes.position!==void 0&&(kt=1),Z.morphAttributes.normal!==void 0&&(kt=2),Z.morphAttributes.color!==void 0&&(kt=3);let ee,Y,st,wt;if(ct){const se=cn[ct];ee=se.vertexShader,Y=se.fragmentShader}else ee=w.vertexShader,Y=w.fragmentShader,l.update(w),st=l.getVertexShaderID(w),wt=l.getFragmentShaderID(w);const at=s.getRenderTarget(),Lt=s.state.buffers.depth.getReversed(),zt=O.isInstancedMesh===!0,Nt=O.isBatchedMesh===!0,Jt=!!w.map,J=!!w.matcap,it=!!Q,C=!!w.aoMap,Ct=!!w.lightMap,et=!!w.bumpMap,_t=!!w.normalMap,lt=!!w.displacementMap,Dt=!!w.emissiveMap,xt=!!w.metalnessMap,T=!!w.roughnessMap,b=w.anisotropy>0,F=w.clearcoat>0,$=w.dispersion>0,tt=w.iridescence>0,q=w.sheen>0,Et=w.transmission>0,dt=b&&!!w.anisotropyMap,vt=F&&!!w.clearcoatMap,Zt=F&&!!w.clearcoatNormalMap,nt=F&&!!w.clearcoatRoughnessMap,Mt=tt&&!!w.iridescenceMap,Ut=tt&&!!w.iridescenceThicknessMap,Ft=q&&!!w.sheenColorMap,yt=q&&!!w.sheenRoughnessMap,jt=!!w.specularMap,Xt=!!w.specularColorMap,ce=!!w.specularIntensityMap,D=Et&&!!w.transmissionMap,ut=Et&&!!w.thicknessMap,G=!!w.gradientMap,j=!!w.alphaMap,mt=w.alphaTest>0,ft=!!w.alphaHash,Ht=!!w.extensions;let ge=$n;w.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(ge=s.toneMapping);const Ae={shaderID:ct,shaderType:w.type,shaderName:w.name,vertexShader:ee,fragmentShader:Y,defines:w.defines,customVertexShaderID:st,customFragmentShaderID:wt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&O._colorsTexture!==null,instancing:zt,instancingColor:zt&&O.instanceColor!==null,instancingMorph:zt&&O.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:ns,alphaToCoverage:!!w.alphaToCoverage,map:Jt,matcap:J,envMap:it,envMapMode:it&&Q.mapping,envMapCubeUVHeight:V,aoMap:C,lightMap:Ct,bumpMap:et,normalMap:_t,displacementMap:u&&lt,emissiveMap:Dt,normalMapObjectSpace:_t&&w.normalMapType===md,normalMapTangentSpace:_t&&w.normalMapType===ka,metalnessMap:xt,roughnessMap:T,anisotropy:b,anisotropyMap:dt,clearcoat:F,clearcoatMap:vt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:nt,dispersion:$,iridescence:tt,iridescenceMap:Mt,iridescenceThicknessMap:Ut,sheen:q,sheenColorMap:Ft,sheenRoughnessMap:yt,specularMap:jt,specularColorMap:Xt,specularIntensityMap:ce,transmission:Et,transmissionMap:D,thicknessMap:ut,gradientMap:G,opaque:w.transparent===!1&&w.blending===Gi&&w.alphaToCoverage===!1,alphaMap:j,alphaTest:mt,alphaHash:ft,combine:w.combine,mapUv:Jt&&v(w.map.channel),aoMapUv:C&&v(w.aoMap.channel),lightMapUv:Ct&&v(w.lightMap.channel),bumpMapUv:et&&v(w.bumpMap.channel),normalMapUv:_t&&v(w.normalMap.channel),displacementMapUv:lt&&v(w.displacementMap.channel),emissiveMapUv:Dt&&v(w.emissiveMap.channel),metalnessMapUv:xt&&v(w.metalnessMap.channel),roughnessMapUv:T&&v(w.roughnessMap.channel),anisotropyMapUv:dt&&v(w.anisotropyMap.channel),clearcoatMapUv:vt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:yt&&v(w.sheenRoughnessMap.channel),specularMapUv:jt&&v(w.specularMap.channel),specularColorMapUv:Xt&&v(w.specularColorMap.channel),specularIntensityMapUv:ce&&v(w.specularIntensityMap.channel),transmissionMapUv:D&&v(w.transmissionMap.channel),thicknessMapUv:ut&&v(w.thicknessMap.channel),alphaMapUv:j&&v(w.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(_t||b),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!Z.attributes.uv&&(Jt||j),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Lt,skinning:O.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:kt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:ge,decodeVideoTexture:Jt&&w.map.isVideoTexture===!0&&Kt.getTransfer(w.map.colorSpace)===oe,decodeVideoTextureEmissive:Dt&&w.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(w.emissiveMap.colorSpace)===oe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Pe,flipSided:w.side===ke,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ht&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&w.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)y.push(I),y.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(M(y,w),_(y,w),y.push(s.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function M(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function _(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const y=g[w.type];let I;if(y){const k=cn[y];I=ou.clone(k.uniforms)}else I=w.uniforms;return I}function P(w,y){let I;for(let k=0,O=h.length;k<O;k++){const X=h[k];if(X.cacheKey===y){I=X,++I.usedTimes;break}}return I===void 0&&(I=new M0(s,y,w,r),h.push(I)),I}function A(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function E(w){l.remove(w)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:P,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:L}}function E0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function T0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ec(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function nc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,v,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),t++,p}function a(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||T0),n.length>1&&n.sort(u||ec),i.length>1&&i.sort(u||ec)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function A0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new nc,s.set(n,[o])):i>=r.length?(o=new nc,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function R0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new It};break;case"SpotLight":e={position:new R,direction:new R,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function C0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let P0=0;function L0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function I0(s){const t=new R0,e=C0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const i=new R,r=new te,o=new te;function a(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,M=0,_=0,x=0,P=0,A=0,E=0;c.sort(L0);for(let w=0,y=c.length;w<y;w++){const I=c[w],k=I.color,O=I.intensity,X=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=k.r*O,d+=k.g*O,u+=k.b*O;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],O);E++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,V=e.get(I);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=W,f++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(k).multiplyScalar(O),W.distance=X,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[v]=W;const Q=I.shadow;if(I.map&&(n.spotLightMap[P]=I.map,P++,Q.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[v]=Q.matrix,I.castShadow){const V=e.get(I);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=Z,x++}v++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(k).multiplyScalar(O),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const Q=I.shadow,V=e.get(I);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=I.shadow.matrix,_++}n.point[g]=W,g++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(O),W.groundColor.copy(I.groundColor).multiplyScalar(O),n.hemi[p]=W,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==_||L.numSpotShadows!==x||L.numSpotMaps!==P||L.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,L.directionalLength=f,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=_,L.numSpotShadows=x,L.numSpotMaps=P,L.numLightProbes=E,n.version=P0++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const _=c[p];if(_.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function ic(s){const t=new I0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function D0(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new ic(s),t.set(i,[a])):r>=o.length?(a=new ic(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class U0 extends jn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class N0 extends jn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const F0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O0=`uniform sampler2D shadow_pass;
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
}`;function z0(s,t,e){let n=new Wa;const i=new K,r=new K,o=new le,a=new U0({depthPacking:pd}),l=new N0,c={},h=e.maxTextureSize,d={[gn]:ke,[ke]:gn,[Pe]:Pe},u=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:F0,fragmentShader:O0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new xe;g.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new qt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ic;let p=this.type;this.render=function(A,E,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const w=s.getRenderTarget(),y=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Pn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=p!==Tn&&this.type===Tn,X=p===Tn&&this.type!==Tn;for(let Z=0,W=A.length;Z<W;Z++){const Q=A[Z],V=Q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const ct=V.getFrameExtents();if(i.multiply(ct),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ct.x),i.x=r.x*ct.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ct.y),i.y=r.y*ct.y,V.mapSize.y=r.y)),V.map===null||O===!0||X===!0){const bt=this.type!==Tn?{minFilter:Fe,magFilter:Fe}:{};V.map!==null&&V.map.dispose(),V.map=new qn(i.x,i.y,bt),V.map.texture.name=Q.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const gt=V.getViewportCount();for(let bt=0;bt<gt;bt++){const kt=V.getViewport(bt);o.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),k.viewport(o),V.updateMatrices(Q,bt),n=V.getFrustum(),x(E,L,V.camera,Q,this.type)}V.isPointLightShadow!==!0&&this.type===Tn&&M(V,L),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,y,I)};function M(A,E){const L=t.update(v);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new qn(i.x,i.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(E,null,L,u,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(E,null,L,f,v,null)}function _(A,E,L,w){let y=null;const I=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)y=I;else if(y=L.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=y.uuid,O=E.uuid;let X=c[k];X===void 0&&(X={},c[k]=X);let Z=X[O];Z===void 0&&(Z=y.clone(),X[O]=Z,E.addEventListener("dispose",P)),y=Z}if(y.visible=E.visible,y.wireframe=E.wireframe,w===Tn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=s.properties.get(y);k.light=L}return y}function x(A,E,L,w,y){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Tn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const O=t.update(A),X=A.material;if(Array.isArray(X)){const Z=O.groups;for(let W=0,Q=Z.length;W<Q;W++){const V=Z[W],ct=X[V.materialIndex];if(ct&&ct.visible){const gt=_(A,ct,w,y);A.onBeforeShadow(s,A,E,L,O,gt,V),s.renderBufferDirect(L,null,O,gt,A,V),A.onAfterShadow(s,A,E,L,O,gt,V)}}}else if(X.visible){const Z=_(A,X,w,y);A.onBeforeShadow(s,A,E,L,O,Z,null),s.renderBufferDirect(L,null,O,Z,A,null),A.onAfterShadow(s,A,E,L,O,Z,null)}}const k=A.children;for(let O=0,X=k.length;O<X;O++)x(k[O],E,L,w,y)}function P(A){A.target.removeEventListener("dispose",P);for(const L in c){const w=c[L],y=A.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const B0={[ko]:Ho,[Vo]:Xo,[Go]:$o,[Yi]:Wo,[Ho]:ko,[Xo]:Vo,[$o]:Go,[Wo]:Yi};function k0(s,t){function e(){let D=!1;const ut=new le;let G=null;const j=new le(0,0,0,0);return{setMask:function(mt){G!==mt&&!D&&(s.colorMask(mt,mt,mt,mt),G=mt)},setLocked:function(mt){D=mt},setClear:function(mt,ft,Ht,ge,Ae){Ae===!0&&(mt*=ge,ft*=ge,Ht*=ge),ut.set(mt,ft,Ht,ge),j.equals(ut)===!1&&(s.clearColor(mt,ft,Ht,ge),j.copy(ut))},reset:function(){D=!1,G=null,j.set(-1,0,0,0)}}}function n(){let D=!1,ut=!1,G=null,j=null,mt=null;return{setReversed:function(ft){if(ut!==ft){const Ht=t.get("EXT_clip_control");ut?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const ge=mt;mt=null,this.setClear(ge)}ut=ft},getReversed:function(){return ut},setTest:function(ft){ft?at(s.DEPTH_TEST):Lt(s.DEPTH_TEST)},setMask:function(ft){G!==ft&&!D&&(s.depthMask(ft),G=ft)},setFunc:function(ft){if(ut&&(ft=B0[ft]),j!==ft){switch(ft){case ko:s.depthFunc(s.NEVER);break;case Ho:s.depthFunc(s.ALWAYS);break;case Vo:s.depthFunc(s.LESS);break;case Yi:s.depthFunc(s.LEQUAL);break;case Go:s.depthFunc(s.EQUAL);break;case Wo:s.depthFunc(s.GEQUAL);break;case Xo:s.depthFunc(s.GREATER);break;case $o:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=ft}},setLocked:function(ft){D=ft},setClear:function(ft){mt!==ft&&(ut&&(ft=1-ft),s.clearDepth(ft),mt=ft)},reset:function(){D=!1,G=null,j=null,mt=null,ut=!1}}}function i(){let D=!1,ut=null,G=null,j=null,mt=null,ft=null,Ht=null,ge=null,Ae=null;return{setTest:function(se){D||(se?at(s.STENCIL_TEST):Lt(s.STENCIL_TEST))},setMask:function(se){ut!==se&&!D&&(s.stencilMask(se),ut=se)},setFunc:function(se,Ke,vn){(G!==se||j!==Ke||mt!==vn)&&(s.stencilFunc(se,Ke,vn),G=se,j=Ke,mt=vn)},setOp:function(se,Ke,vn){(ft!==se||Ht!==Ke||ge!==vn)&&(s.stencilOp(se,Ke,vn),ft=se,Ht=Ke,ge=vn)},setLocked:function(se){D=se},setClear:function(se){Ae!==se&&(s.clearStencil(se),Ae=se)},reset:function(){D=!1,ut=null,G=null,j=null,mt=null,ft=null,Ht=null,ge=null,Ae=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,_=null,x=null,P=null,A=null,E=new It(0,0,0),L=0,w=!1,y=null,I=null,k=null,O=null,X=null;const Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=Q>=1):V.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=Q>=2);let ct=null,gt={};const bt=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),ee=new le().fromArray(bt),Y=new le().fromArray(kt);function st(D,ut,G,j){const mt=new Uint8Array(4),ft=s.createTexture();s.bindTexture(D,ft),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<G;Ht++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,mt):s.texImage2D(ut+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,mt);return ft}const wt={};wt[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),wt[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),wt[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(s.DEPTH_TEST),o.setFunc(Yi),et(!1),_t(al),at(s.CULL_FACE),C(Pn);function at(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Lt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function zt(D,ut){return d[D]!==ut?(s.bindFramebuffer(D,ut),d[D]=ut,D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ut),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function Nt(D,ut){let G=f,j=!1;if(D){G=u.get(ut),G===void 0&&(G=[],u.set(ut,G));const mt=D.textures;if(G.length!==mt.length||G[0]!==s.COLOR_ATTACHMENT0){for(let ft=0,Ht=mt.length;ft<Ht;ft++)G[ft]=s.COLOR_ATTACHMENT0+ft;G.length=mt.length,j=!0}}else G[0]!==s.BACK&&(G[0]=s.BACK,j=!0);j&&s.drawBuffers(G)}function Jt(D){return g!==D?(s.useProgram(D),g=D,!0):!1}const J={[oi]:s.FUNC_ADD,[kh]:s.FUNC_SUBTRACT,[Hh]:s.FUNC_REVERSE_SUBTRACT};J[Vh]=s.MIN,J[Gh]=s.MAX;const it={[Wh]:s.ZERO,[Xh]:s.ONE,[$h]:s.SRC_COLOR,[zo]:s.SRC_ALPHA,[Kh]:s.SRC_ALPHA_SATURATE,[jh]:s.DST_COLOR,[Yh]:s.DST_ALPHA,[qh]:s.ONE_MINUS_SRC_COLOR,[Bo]:s.ONE_MINUS_SRC_ALPHA,[Jh]:s.ONE_MINUS_DST_COLOR,[Zh]:s.ONE_MINUS_DST_ALPHA,[Qh]:s.CONSTANT_COLOR,[td]:s.ONE_MINUS_CONSTANT_COLOR,[ed]:s.CONSTANT_ALPHA,[nd]:s.ONE_MINUS_CONSTANT_ALPHA};function C(D,ut,G,j,mt,ft,Ht,ge,Ae,se){if(D===Pn){v===!0&&(Lt(s.BLEND),v=!1);return}if(v===!1&&(at(s.BLEND),v=!0),D!==Bh){if(D!==m||se!==w){if((p!==oi||x!==oi)&&(s.blendEquation(s.FUNC_ADD),p=oi,x=oi),se)switch(D){case Gi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ll:s.blendFunc(s.ONE,s.ONE);break;case cl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case hl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Gi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ll:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case cl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case hl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,_=null,P=null,A=null,E.set(0,0,0),L=0,m=D,w=se}return}mt=mt||ut,ft=ft||G,Ht=Ht||j,(ut!==p||mt!==x)&&(s.blendEquationSeparate(J[ut],J[mt]),p=ut,x=mt),(G!==M||j!==_||ft!==P||Ht!==A)&&(s.blendFuncSeparate(it[G],it[j],it[ft],it[Ht]),M=G,_=j,P=ft,A=Ht),(ge.equals(E)===!1||Ae!==L)&&(s.blendColor(ge.r,ge.g,ge.b,Ae),E.copy(ge),L=Ae),m=D,w=!1}function Ct(D,ut){D.side===Pe?Lt(s.CULL_FACE):at(s.CULL_FACE);let G=D.side===ke;ut&&(G=!G),et(G),D.blending===Gi&&D.transparent===!1?C(Pn):C(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const j=D.stencilWrite;a.setTest(j),j&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Dt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?at(s.SAMPLE_ALPHA_TO_COVERAGE):Lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){y!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),y=D)}function _t(D){D!==Oh?(at(s.CULL_FACE),D!==I&&(D===al?s.cullFace(s.BACK):D===zh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Lt(s.CULL_FACE),I=D}function lt(D){D!==k&&(W&&s.lineWidth(D),k=D)}function Dt(D,ut,G){D?(at(s.POLYGON_OFFSET_FILL),(O!==ut||X!==G)&&(s.polygonOffset(ut,G),O=ut,X=G)):Lt(s.POLYGON_OFFSET_FILL)}function xt(D){D?at(s.SCISSOR_TEST):Lt(s.SCISSOR_TEST)}function T(D){D===void 0&&(D=s.TEXTURE0+Z-1),ct!==D&&(s.activeTexture(D),ct=D)}function b(D,ut,G){G===void 0&&(ct===null?G=s.TEXTURE0+Z-1:G=ct);let j=gt[G];j===void 0&&(j={type:void 0,texture:void 0},gt[G]=j),(j.type!==D||j.texture!==ut)&&(ct!==G&&(s.activeTexture(G),ct=G),s.bindTexture(D,ut||wt[D]),j.type=D,j.texture=ut)}function F(){const D=gt[ct];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ut(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(D){ee.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ee.copy(D))}function yt(D){Y.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function jt(D,ut){let G=c.get(ut);G===void 0&&(G=new WeakMap,c.set(ut,G));let j=G.get(D);j===void 0&&(j=s.getUniformBlockIndex(ut,D.name),G.set(D,j))}function Xt(D,ut){const j=c.get(ut).get(D);l.get(ut)!==j&&(s.uniformBlockBinding(ut,j,D.__bindingPointIndex),l.set(ut,j))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ct=null,gt={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,_=null,x=null,P=null,A=null,E=new It(0,0,0),L=0,w=!1,y=null,I=null,k=null,O=null,X=null,ee.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Lt,bindFramebuffer:zt,drawBuffers:Nt,useProgram:Jt,setBlending:C,setMaterial:Ct,setFlipSided:et,setCullFace:_t,setLineWidth:lt,setPolygonOffset:Dt,setScissorTest:xt,activeTexture:T,bindTexture:b,unbindTexture:F,compressedTexImage2D:$,compressedTexImage3D:tt,texImage2D:Mt,texImage3D:Ut,updateUBOMapping:jt,uniformBlockBinding:Xt,texStorage2D:Zt,texStorage3D:nt,texSubImage2D:q,texSubImage3D:Et,compressedTexSubImage2D:dt,compressedTexSubImage3D:vt,scissor:Ft,viewport:yt,reset:ce}}function sc(s,t,e,n){const i=H0(n);switch(e){case zc:return s*t;case kc:return s*t;case Hc:return s*t*2;case Fa:return s*t/i.components*i.byteLength;case Oa:return s*t/i.components*i.byteLength;case Vc:return s*t*2/i.components*i.byteLength;case za:return s*t*2/i.components*i.byteLength;case Bc:return s*t*3/i.components*i.byteLength;case on:return s*t*4/i.components*i.byteLength;case Ba:return s*t*4/i.components*i.byteLength;case Er:case Tr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ar:case Rr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ko:case ta:return Math.max(s,16)*Math.max(t,8)/4;case Jo:case Qo:return Math.max(s,8)*Math.max(t,8)/2;case ea:case na:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ia:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case la:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ca:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ha:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case da:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ua:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case fa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case pa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ma:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ga:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Cr:case va:case _a:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Gc:case Ma:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ya:case ba:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function H0(s){switch(s){case In:case Nc:return{byteLength:1,components:1};case Ns:case Fc:case Vs:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case fi:case Da:case fn:return{byteLength:4,components:1};case Oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function V0(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new K,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return f?new OffscreenCanvas(T,b):Dr("canvas")}function v(T,b,F){let $=1;const tt=xt(T);if((tt.width>F||tt.height>F)&&($=F/Math.max(tt.width,tt.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor($*tt.width),Et=Math.floor($*tt.height);d===void 0&&(d=g(q,Et));const dt=b?g(q,Et):d;return dt.width=q,dt.height=Et,dt.getContext("2d").drawImage(T,0,0,q,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+q+"x"+Et+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){s.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(T,b,F,$,tt=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=b;if(b===s.RED&&(F===s.FLOAT&&(q=s.R32F),F===s.HALF_FLOAT&&(q=s.R16F),F===s.UNSIGNED_BYTE&&(q=s.R8)),b===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.R8UI),F===s.UNSIGNED_SHORT&&(q=s.R16UI),F===s.UNSIGNED_INT&&(q=s.R32UI),F===s.BYTE&&(q=s.R8I),F===s.SHORT&&(q=s.R16I),F===s.INT&&(q=s.R32I)),b===s.RG&&(F===s.FLOAT&&(q=s.RG32F),F===s.HALF_FLOAT&&(q=s.RG16F),F===s.UNSIGNED_BYTE&&(q=s.RG8)),b===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RG8UI),F===s.UNSIGNED_SHORT&&(q=s.RG16UI),F===s.UNSIGNED_INT&&(q=s.RG32UI),F===s.BYTE&&(q=s.RG8I),F===s.SHORT&&(q=s.RG16I),F===s.INT&&(q=s.RG32I)),b===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RGB8UI),F===s.UNSIGNED_SHORT&&(q=s.RGB16UI),F===s.UNSIGNED_INT&&(q=s.RGB32UI),F===s.BYTE&&(q=s.RGB8I),F===s.SHORT&&(q=s.RGB16I),F===s.INT&&(q=s.RGB32I)),b===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),F===s.UNSIGNED_INT&&(q=s.RGBA32UI),F===s.BYTE&&(q=s.RGBA8I),F===s.SHORT&&(q=s.RGBA16I),F===s.INT&&(q=s.RGBA32I)),b===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),b===s.RGBA){const Et=tt?Hr:Kt.getTransfer($);F===s.FLOAT&&(q=s.RGBA32F),F===s.HALF_FLOAT&&(q=s.RGBA16F),F===s.UNSIGNED_BYTE&&(q=Et===oe?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(T,b){let F;return T?b===null||b===fi||b===Ji?F=s.DEPTH24_STENCIL8:b===fn?F=s.DEPTH32F_STENCIL8:b===Ns&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===fi||b===Ji?F=s.DEPTH_COMPONENT24:b===fn?F=s.DEPTH_COMPONENT32F:b===Ns&&(F=s.DEPTH_COMPONENT16),F}function P(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Fe&&T.minFilter!==un?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){const b=T.target;b.removeEventListener("dispose",A),L(b),b.isVideoTexture&&h.delete(b)}function E(T){const b=T.target;b.removeEventListener("dispose",E),y(b)}function L(T){const b=n.get(T);if(b.__webglInit===void 0)return;const F=T.source,$=u.get(F);if($){const tt=$[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(T),Object.keys($).length===0&&u.delete(F)}n.remove(T)}function w(T){const b=n.get(T);s.deleteTexture(b.__webglTexture);const F=T.source,$=u.get(F);delete $[b.__cacheKey],o.memory.textures--}function y(T){const b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(b.__webglFramebuffer[$]))for(let tt=0;tt<b.__webglFramebuffer[$].length;tt++)s.deleteFramebuffer(b.__webglFramebuffer[$][tt]);else s.deleteFramebuffer(b.__webglFramebuffer[$]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[$])}else{if(Array.isArray(b.__webglFramebuffer))for(let $=0;$<b.__webglFramebuffer.length;$++)s.deleteFramebuffer(b.__webglFramebuffer[$]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let $=0;$<b.__webglColorRenderbuffer.length;$++)b.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[$]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const F=T.textures;for(let $=0,tt=F.length;$<tt;$++){const q=n.get(F[$]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(F[$])}n.remove(T)}let I=0;function k(){I=0}function O(){const T=I;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),I+=1,T}function X(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function Z(T,b){const F=n.get(T);if(T.isVideoTexture&&lt(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,T,b);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+b)}function W(T,b){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Y(F,T,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+b)}function Q(T,b){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Y(F,T,b);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+b)}function V(T,b){const F=n.get(T);if(T.version>0&&F.__version!==T.version){st(F,T,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+b)}const ct={[Zo]:s.REPEAT,[ci]:s.CLAMP_TO_EDGE,[jo]:s.MIRRORED_REPEAT},gt={[Fe]:s.NEAREST,[ud]:s.NEAREST_MIPMAP_NEAREST,[$s]:s.NEAREST_MIPMAP_LINEAR,[un]:s.LINEAR,[Zr]:s.LINEAR_MIPMAP_NEAREST,[hi]:s.LINEAR_MIPMAP_LINEAR},bt={[gd]:s.NEVER,[bd]:s.ALWAYS,[xd]:s.LESS,[Wc]:s.LEQUAL,[vd]:s.EQUAL,[yd]:s.GEQUAL,[_d]:s.GREATER,[Md]:s.NOTEQUAL};function kt(T,b){if(b.type===fn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===un||b.magFilter===Zr||b.magFilter===$s||b.magFilter===hi||b.minFilter===un||b.minFilter===Zr||b.minFilter===$s||b.minFilter===hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,ct[b.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,ct[b.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,ct[b.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,gt[b.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,gt[b.minFilter]),b.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,bt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Fe||b.minFilter!==$s&&b.minFilter!==hi||b.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ee(T,b){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));const $=b.source;let tt=u.get($);tt===void 0&&(tt={},u.set($,tt));const q=X(b);if(q!==T.__cacheKey){tt[q]===void 0&&(tt[q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),tt[q].usedTimes++;const Et=tt[T.__cacheKey];Et!==void 0&&(tt[T.__cacheKey].usedTimes--,Et.usedTimes===0&&w(b)),T.__cacheKey=q,T.__webglTexture=tt[q].texture}return F}function Y(T,b,F){let $=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&($=s.TEXTURE_3D);const tt=ee(T,b),q=b.source;e.bindTexture($,T.__webglTexture,s.TEXTURE0+F);const Et=n.get(q);if(q.version!==Et.__version||tt===!0){e.activeTexture(s.TEXTURE0+F);const dt=Kt.getPrimaries(Kt.workingColorSpace),vt=b.colorSpace===Xn?null:Kt.getPrimaries(b.colorSpace),Zt=b.colorSpace===Xn||dt===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let nt=v(b.image,!1,i.maxTextureSize);nt=Dt(b,nt);const Mt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type);let Ft=_(b.internalFormat,Mt,Ut,b.colorSpace,b.isVideoTexture);kt($,b);let yt;const jt=b.mipmaps,Xt=b.isVideoTexture!==!0,ce=Et.__version===void 0||tt===!0,D=q.dataReady,ut=P(b,nt);if(b.isDepthTexture)Ft=x(b.format===Ki,b.type),ce&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Ft,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,Mt,Ut,null));else if(b.isDataTexture)if(jt.length>0){Xt&&ce&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,jt[0].width,jt[0].height);for(let G=0,j=jt.length;G<j;G++)yt=jt[G],Xt?D&&e.texSubImage2D(s.TEXTURE_2D,G,0,0,yt.width,yt.height,Mt,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,G,Ft,yt.width,yt.height,0,Mt,Ut,yt.data);b.generateMipmaps=!1}else Xt?(ce&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,nt.width,nt.height),D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,Mt,Ut,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Ft,nt.width,nt.height,0,Mt,Ut,nt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xt&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Ft,jt[0].width,jt[0].height,nt.depth);for(let G=0,j=jt.length;G<j;G++)if(yt=jt[G],b.format!==on)if(Mt!==null)if(Xt){if(D)if(b.layerUpdates.size>0){const mt=sc(yt.width,yt.height,b.format,b.type);for(const ft of b.layerUpdates){const Ht=yt.data.subarray(ft*mt/yt.data.BYTES_PER_ELEMENT,(ft+1)*mt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,ft,yt.width,yt.height,1,Mt,Ht)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,yt.width,yt.height,nt.depth,Mt,yt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,G,Ft,yt.width,yt.height,nt.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?D&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,yt.width,yt.height,nt.depth,Mt,Ut,yt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,G,Ft,yt.width,yt.height,nt.depth,0,Mt,Ut,yt.data)}else{Xt&&ce&&e.texStorage2D(s.TEXTURE_2D,ut,Ft,jt[0].width,jt[0].height);for(let G=0,j=jt.length;G<j;G++)yt=jt[G],b.format!==on?Mt!==null?Xt?D&&e.compressedTexSubImage2D(s.TEXTURE_2D,G,0,0,yt.width,yt.height,Mt,yt.data):e.compressedTexImage2D(s.TEXTURE_2D,G,Ft,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?D&&e.texSubImage2D(s.TEXTURE_2D,G,0,0,yt.width,yt.height,Mt,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,G,Ft,yt.width,yt.height,0,Mt,Ut,yt.data)}else if(b.isDataArrayTexture)if(Xt){if(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Ft,nt.width,nt.height,nt.depth),D)if(b.layerUpdates.size>0){const G=sc(nt.width,nt.height,b.format,b.type);for(const j of b.layerUpdates){const mt=nt.data.subarray(j*G/nt.data.BYTES_PER_ELEMENT,(j+1)*G/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,Mt,Ut,mt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Mt,Ut,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ft,nt.width,nt.height,nt.depth,0,Mt,Ut,nt.data);else if(b.isData3DTexture)Xt?(ce&&e.texStorage3D(s.TEXTURE_3D,ut,Ft,nt.width,nt.height,nt.depth),D&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Mt,Ut,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Ft,nt.width,nt.height,nt.depth,0,Mt,Ut,nt.data);else if(b.isFramebufferTexture){if(ce)if(Xt)e.texStorage2D(s.TEXTURE_2D,ut,Ft,nt.width,nt.height);else{let G=nt.width,j=nt.height;for(let mt=0;mt<ut;mt++)e.texImage2D(s.TEXTURE_2D,mt,Ft,G,j,0,Mt,Ut,null),G>>=1,j>>=1}}else if(jt.length>0){if(Xt&&ce){const G=xt(jt[0]);e.texStorage2D(s.TEXTURE_2D,ut,Ft,G.width,G.height)}for(let G=0,j=jt.length;G<j;G++)yt=jt[G],Xt?D&&e.texSubImage2D(s.TEXTURE_2D,G,0,0,Mt,Ut,yt):e.texImage2D(s.TEXTURE_2D,G,Ft,Mt,Ut,yt);b.generateMipmaps=!1}else if(Xt){if(ce){const G=xt(nt);e.texStorage2D(s.TEXTURE_2D,ut,Ft,G.width,G.height)}D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,Ut,nt)}else e.texImage2D(s.TEXTURE_2D,0,Ft,Mt,Ut,nt);m(b)&&p($),Et.__version=q.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function st(T,b,F){if(b.image.length!==6)return;const $=ee(T,b),tt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+F);const q=n.get(tt);if(tt.version!==q.__version||$===!0){e.activeTexture(s.TEXTURE0+F);const Et=Kt.getPrimaries(Kt.workingColorSpace),dt=b.colorSpace===Xn?null:Kt.getPrimaries(b.colorSpace),vt=b.colorSpace===Xn||Et===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Zt=b.isCompressedTexture||b.image[0].isCompressedTexture,nt=b.image[0]&&b.image[0].isDataTexture,Mt=[];for(let j=0;j<6;j++)!Zt&&!nt?Mt[j]=v(b.image[j],!0,i.maxCubemapSize):Mt[j]=nt?b.image[j].image:b.image[j],Mt[j]=Dt(b,Mt[j]);const Ut=Mt[0],Ft=r.convert(b.format,b.colorSpace),yt=r.convert(b.type),jt=_(b.internalFormat,Ft,yt,b.colorSpace),Xt=b.isVideoTexture!==!0,ce=q.__version===void 0||$===!0,D=tt.dataReady;let ut=P(b,Ut);kt(s.TEXTURE_CUBE_MAP,b);let G;if(Zt){Xt&&ce&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,jt,Ut.width,Ut.height);for(let j=0;j<6;j++){G=Mt[j].mipmaps;for(let mt=0;mt<G.length;mt++){const ft=G[mt];b.format!==on?Ft!==null?Xt?D&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,0,0,ft.width,ft.height,Ft,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,jt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,0,0,ft.width,ft.height,Ft,yt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,jt,ft.width,ft.height,0,Ft,yt,ft.data)}}}else{if(G=b.mipmaps,Xt&&ce){G.length>0&&ut++;const j=xt(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,jt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){Xt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Mt[j].width,Mt[j].height,Ft,yt,Mt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,jt,Mt[j].width,Mt[j].height,0,Ft,yt,Mt[j].data);for(let mt=0;mt<G.length;mt++){const Ht=G[mt].image[j].image;Xt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,0,0,Ht.width,Ht.height,Ft,yt,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,jt,Ht.width,Ht.height,0,Ft,yt,Ht.data)}}else{Xt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ft,yt,Mt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,jt,Ft,yt,Mt[j]);for(let mt=0;mt<G.length;mt++){const ft=G[mt];Xt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,0,0,Ft,yt,ft.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,jt,Ft,yt,ft.image[j])}}}m(b)&&p(s.TEXTURE_CUBE_MAP),q.__version=tt.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function wt(T,b,F,$,tt,q){const Et=r.convert(F.format,F.colorSpace),dt=r.convert(F.type),vt=_(F.internalFormat,Et,dt,F.colorSpace),Zt=n.get(b),nt=n.get(F);if(nt.__renderTarget=b,!Zt.__hasExternalTextures){const Mt=Math.max(1,b.width>>q),Ut=Math.max(1,b.height>>q);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,q,vt,Mt,Ut,b.depth,0,Et,dt,null):e.texImage2D(tt,q,vt,Mt,Ut,0,Et,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),_t(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,tt,nt.__webglTexture,0,et(b)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,tt,nt.__webglTexture,q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function at(T,b,F){if(s.bindRenderbuffer(s.RENDERBUFFER,T),b.depthBuffer){const $=b.depthTexture,tt=$&&$.isDepthTexture?$.type:null,q=x(b.stencilBuffer,tt),Et=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=et(b);_t(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,q,b.width,b.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,q,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,q,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,T)}else{const $=b.textures;for(let tt=0;tt<$.length;tt++){const q=$[tt],Et=r.convert(q.format,q.colorSpace),dt=r.convert(q.type),vt=_(q.internalFormat,Et,dt,q.colorSpace),Zt=et(b);F&&_t(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,vt,b.width,b.height):_t(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt,vt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,vt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Lt(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(b.depthTexture);$.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Z(b.depthTexture,0);const tt=$.__webglTexture,q=et(b);if(b.depthTexture.format===Wi)_t(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(b.depthTexture.format===Ki)_t(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function zt(T){const b=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const $=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),$){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,$.removeEventListener("dispose",tt)};$.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=$}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Lt(b.__webglFramebuffer,T)}else if(F){b.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[$]),b.__webglDepthbuffer[$]===void 0)b.__webglDepthbuffer[$]=s.createRenderbuffer(),at(b.__webglDepthbuffer[$],T,!1);else{const tt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=b.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,q)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),at(b.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(T,b,F){const $=n.get(T);b!==void 0&&wt($.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&zt(T)}function Jt(T){const b=T.texture,F=n.get(T),$=n.get(b);T.addEventListener("dispose",E);const tt=T.textures,q=T.isWebGLCubeRenderTarget===!0,Et=tt.length>1;if(Et||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=b.version,o.memory.textures++),q){F.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[dt]=[];for(let vt=0;vt<b.mipmaps.length;vt++)F.__webglFramebuffer[dt][vt]=s.createFramebuffer()}else F.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let dt=0;dt<b.mipmaps.length;dt++)F.__webglFramebuffer[dt]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Et)for(let dt=0,vt=tt.length;dt<vt;dt++){const Zt=n.get(tt[dt]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=s.createTexture(),o.memory.textures++)}if(T.samples>0&&_t(T)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let dt=0;dt<tt.length;dt++){const vt=tt[dt];F.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[dt]);const Zt=r.convert(vt.format,vt.colorSpace),nt=r.convert(vt.type),Mt=_(vt.internalFormat,Zt,nt,vt.colorSpace,T.isXRRenderTarget===!0),Ut=et(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,Mt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,F.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),at(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),kt(s.TEXTURE_CUBE_MAP,b);for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)wt(F.__webglFramebuffer[dt][vt],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,vt);else wt(F.__webglFramebuffer[dt],T,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(b)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let dt=0,vt=tt.length;dt<vt;dt++){const Zt=tt[dt],nt=n.get(Zt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),kt(s.TEXTURE_2D,Zt),wt(F.__webglFramebuffer,T,Zt,s.COLOR_ATTACHMENT0+dt,s.TEXTURE_2D,0),m(Zt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,$.__webglTexture),kt(dt,b),b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)wt(F.__webglFramebuffer[vt],T,b,s.COLOR_ATTACHMENT0,dt,vt);else wt(F.__webglFramebuffer,T,b,s.COLOR_ATTACHMENT0,dt,0);m(b)&&p(dt),e.unbindTexture()}T.depthBuffer&&zt(T)}function J(T){const b=T.textures;for(let F=0,$=b.length;F<$;F++){const tt=b[F];if(m(tt)){const q=M(T),Et=n.get(tt).__webglTexture;e.bindTexture(q,Et),p(q),e.unbindTexture()}}}const it=[],C=[];function Ct(T){if(T.samples>0){if(_t(T)===!1){const b=T.textures,F=T.width,$=T.height;let tt=s.COLOR_BUFFER_BIT;const q=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(T),dt=b.length>1;if(dt)for(let vt=0;vt<b.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let vt=0;vt<b.length;vt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[vt]);const Zt=n.get(b[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Zt,0)}s.blitFramebuffer(0,0,F,$,0,0,F,$,tt,s.NEAREST),l===!0&&(it.length=0,C.length=0,it.push(s.COLOR_ATTACHMENT0+vt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(it.push(q),C.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,C)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let vt=0;vt<b.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[vt]);const Zt=n.get(b[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Zt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function et(T){return Math.min(i.maxSamples,T.samples)}function _t(T){const b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function lt(T){const b=o.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function Dt(T,b){const F=T.colorSpace,$=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==ns&&F!==Xn&&(Kt.getTransfer(F)===oe?($!==on||tt!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=Z,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=Nt,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=_t}function G0(s,t){function e(n,i=Xn){let r;const o=Kt.getTransfer(i);if(n===In)return s.UNSIGNED_BYTE;if(n===Ua)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Na)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Oc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Nc)return s.BYTE;if(n===Fc)return s.SHORT;if(n===Ns)return s.UNSIGNED_SHORT;if(n===Da)return s.INT;if(n===fi)return s.UNSIGNED_INT;if(n===fn)return s.FLOAT;if(n===Vs)return s.HALF_FLOAT;if(n===zc)return s.ALPHA;if(n===Bc)return s.RGB;if(n===on)return s.RGBA;if(n===kc)return s.LUMINANCE;if(n===Hc)return s.LUMINANCE_ALPHA;if(n===Wi)return s.DEPTH_COMPONENT;if(n===Ki)return s.DEPTH_STENCIL;if(n===Fa)return s.RED;if(n===Oa)return s.RED_INTEGER;if(n===Vc)return s.RG;if(n===za)return s.RG_INTEGER;if(n===Ba)return s.RGBA_INTEGER;if(n===Er||n===Tr||n===Ar||n===Rr)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jo||n===Ko||n===Qo||n===ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ea||n===na||n===ia)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ea||n===na)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ia)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===ha||n===da||n===ua||n===fa||n===pa||n===ma||n===ga||n===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ra)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===aa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===la)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ca)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ha)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ua)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ma)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ga)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cr||n===va||n===_a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Cr)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Ma||n===ya||n===ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ji?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class W0 extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Be extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const X0={type:"move"};class So{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(X0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Be;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const $0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q0=`
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

}`;class Y0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Le,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:$0,fragmentShader:q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qt(new pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Z0 extends is{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=new Y0,m=e.getContextAttributes();let p=null,M=null;const _=[],x=[],P=new K;let A=null;const E=new qe;E.viewport=new le;const L=new qe;L.viewport=new le;const w=[E,L],y=new W0;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let st=_[Y];return st===void 0&&(st=new So,_[Y]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Y){let st=_[Y];return st===void 0&&(st=new So,_[Y]=st),st.getGripSpace()},this.getHand=function(Y){let st=_[Y];return st===void 0&&(st=new So,_[Y]=st),st.getHandSpace()};function O(Y){const st=x.indexOf(Y.inputSource);if(st===-1)return;const wt=_[st];wt!==void 0&&(wt.update(Y.inputSource,Y.frame,c||o),wt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Z);for(let Y=0;Y<_.length;Y++){const st=x[Y];st!==null&&(x[Y]=null,_[Y].disconnect(st))}I=null,k=null,v.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,M=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new qn(f.framebufferWidth,f.framebufferHeight,{format:on,type:In,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,wt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Ki:Wi,wt=m.stencil?Ji:fi);const Lt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Lt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new qn(u.textureWidth,u.textureHeight,{format:on,type:In,depthTexture:new nh(u.textureWidth,u.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(Y){for(let st=0;st<Y.removed.length;st++){const wt=Y.removed[st],at=x.indexOf(wt);at>=0&&(x[at]=null,_[at].disconnect(wt))}for(let st=0;st<Y.added.length;st++){const wt=Y.added[st];let at=x.indexOf(wt);if(at===-1){for(let zt=0;zt<_.length;zt++)if(zt>=x.length){x.push(wt),at=zt;break}else if(x[zt]===null){x[zt]=wt,at=zt;break}if(at===-1)break}const Lt=_[at];Lt&&Lt.connect(wt)}}const W=new R,Q=new R;function V(Y,st,wt){W.setFromMatrixPosition(st.matrixWorld),Q.setFromMatrixPosition(wt.matrixWorld);const at=W.distanceTo(Q),Lt=st.projectionMatrix.elements,zt=wt.projectionMatrix.elements,Nt=Lt[14]/(Lt[10]-1),Jt=Lt[14]/(Lt[10]+1),J=(Lt[9]+1)/Lt[5],it=(Lt[9]-1)/Lt[5],C=(Lt[8]-1)/Lt[0],Ct=(zt[8]+1)/zt[0],et=Nt*C,_t=Nt*Ct,lt=at/(-C+Ct),Dt=lt*-C;if(st.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Dt),Y.translateZ(lt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Lt[10]===-1)Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const xt=Nt+lt,T=Jt+lt,b=et-Dt,F=_t+(at-Dt),$=J*Jt/T*xt,tt=it*Jt/T*xt;Y.projectionMatrix.makePerspective(b,F,$,tt,xt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ct(Y,st){st===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(st.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let st=Y.near,wt=Y.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(wt=v.depthFar)),y.near=L.near=E.near=st,y.far=L.far=E.far=wt,(I!==y.near||k!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),I=y.near,k=y.far),E.layers.mask=Y.layers.mask|2,L.layers.mask=Y.layers.mask|4,y.layers.mask=E.layers.mask|L.layers.mask;const at=Y.parent,Lt=y.cameras;ct(y,at);for(let zt=0;zt<Lt.length;zt++)ct(Lt[zt],at);Lt.length===2?V(y,E,L):y.projectionMatrix.copy(E.projectionMatrix),gt(Y,y,at)};function gt(Y,st,wt){wt===null?Y.matrix.copy(st.matrixWorld):(Y.matrix.copy(wt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(st.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Fs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let bt=null;function kt(Y,st){if(h=st.getViewerPose(c||o),g=st,h!==null){const wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let at=!1;wt.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let zt=0;zt<wt.length;zt++){const Nt=wt[zt];let Jt=null;if(f!==null)Jt=f.getViewport(Nt);else{const it=d.getViewSubImage(u,Nt);Jt=it.viewport,zt===0&&(t.setRenderTargetTextures(M,it.colorTexture,u.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(M))}let J=w[zt];J===void 0&&(J=new qe,J.layers.enable(zt),J.viewport=new le,w[zt]=J),J.matrix.fromArray(Nt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Nt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),zt===0&&(y.matrix.copy(J.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(J)}const Lt=i.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const zt=d.getDepthInformation(wt[0]);zt&&zt.isValid&&zt.texture&&v.init(t,zt,i.renderState)}}for(let wt=0;wt<_.length;wt++){const at=x[wt],Lt=_[wt];at!==null&&Lt!==void 0&&Lt.update(at,st,c||o)}bt&&bt(Y,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const ee=new th;ee.setAnimationLoop(kt),this.setAnimationLoop=function(Y){bt=Y},this.dispose=function(){}}}const ii=new an,j0=new te;function J0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),_=M.envMap,x=M.envMapRotation;_&&(m.envMap.value=_,ii.copy(x),ii.x*=-1,ii.y*=-1,ii.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(j0.makeRotationFromEuler(ii)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function K0(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,_){const x=_.program;n.uniformBlockBinding(M,x)}function c(M,_){let x=i[M.id];x===void 0&&(g(M),x=h(M),i[M.id]=x,M.addEventListener("dispose",m));const P=_.program;n.updateUBOMapping(M,P);const A=t.render.frame;r[M.id]!==A&&(u(M),r[M.id]=A)}function h(M){const _=d();M.__bindingPointIndex=_;const x=s.createBuffer(),P=M.__size,A=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,P,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,x),x}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const _=i[M.id],x=M.uniforms,P=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let A=0,E=x.length;A<E;A++){const L=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,y=L.length;w<y;w++){const I=L[w];if(f(I,A,w,P)===!0){const k=I.__offset,O=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let Z=0;Z<O.length;Z++){const W=O[Z],Q=v(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,k+X,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,_,x,P){const A=M.value,E=_+"_"+x;if(P[E]===void 0)return typeof A=="number"||typeof A=="boolean"?P[E]=A:P[E]=A.clone(),!0;{const L=P[E];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return P[E]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(M){const _=M.uniforms;let x=0;const P=16;for(let E=0,L=_.length;E<L;E++){const w=Array.isArray(_[E])?_[E]:[_[E]];for(let y=0,I=w.length;y<I;y++){const k=w[y],O=Array.isArray(k.value)?k.value:[k.value];for(let X=0,Z=O.length;X<Z;X++){const W=O[X],Q=v(W),V=x%P,ct=V%Q.boundary,gt=V+ct;x+=ct,gt!==0&&P-gt<Q.storage&&(x+=P-gt),k.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=Q.storage}}}const A=x%P;return A>0&&(x+=P-A),M.__size=x,M.__cache={},this}function v(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const x=o.indexOf(_.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(const M in i)s.deleteBuffer(i[M]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Q0{constructor(t={}){const{canvas:e=kd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this.toneMapping=$n,this.toneMappingExposure=1;const x=this;let P=!1,A=0,E=0,L=null,w=-1,y=null;const I=new le,k=new le;let O=null;const X=new It(0);let Z=0,W=e.width,Q=e.height,V=1,ct=null,gt=null;const bt=new le(0,0,W,Q),kt=new le(0,0,W,Q);let ee=!1;const Y=new Wa;let st=!1,wt=!1;const at=new te,Lt=new te,zt=new R,Nt=new le,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function it(){return L===null?V:1}let C=n;function Ct(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${La}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),C===null){const U="webgl2";if(C=Ct(U,S),C===null)throw Ct(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let et,_t,lt,Dt,xt,T,b,F,$,tt,q,Et,dt,vt,Zt,nt,Mt,Ut,Ft,yt,jt,Xt,ce,D;function ut(){et=new sm(C),et.init(),Xt=new G0(C,et),_t=new Kp(C,et,t,Xt),lt=new k0(C,et),_t.reverseDepthBuffer&&u&&lt.buffers.depth.setReversed(!0),Dt=new am(C),xt=new E0,T=new V0(C,et,lt,xt,_t,Xt,Dt),b=new tm(x),F=new im(x),$=new fu(C),ce=new jp(C,$),tt=new rm(C,$,Dt,ce),q=new cm(C,tt,$,Dt),Ft=new lm(C,_t,T),nt=new Qp(xt),Et=new w0(x,b,F,et,_t,ce,nt),dt=new J0(x,xt),vt=new A0,Zt=new D0(et),Ut=new Zp(x,b,F,lt,q,f,l),Mt=new z0(x,q,_t),D=new K0(C,Dt,_t,lt),yt=new Jp(C,et,Dt),jt=new om(C,et,Dt),Dt.programs=Et.programs,x.capabilities=_t,x.extensions=et,x.properties=xt,x.renderLists=vt,x.shadowMap=Mt,x.state=lt,x.info=Dt}ut();const G=new Z0(x,C);this.xr=G,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(W,Q,!1))},this.getSize=function(S){return S.set(W,Q)},this.setSize=function(S,U,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,Q=U,e.width=Math.floor(S*V),e.height=Math.floor(U*V),z===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(W*V,Q*V).floor()},this.setDrawingBufferSize=function(S,U,z){W=S,Q=U,V=z,e.width=Math.floor(S*z),e.height=Math.floor(U*z),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(bt)},this.setViewport=function(S,U,z,B){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,U,z,B),lt.viewport(I.copy(bt).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(kt)},this.setScissor=function(S,U,z,B){S.isVector4?kt.set(S.x,S.y,S.z,S.w):kt.set(S,U,z,B),lt.scissor(k.copy(kt).multiplyScalar(V).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(S){lt.setScissorTest(ee=S)},this.setOpaqueSort=function(S){ct=S},this.setTransparentSort=function(S){gt=S},this.getClearColor=function(S){return S.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(S=!0,U=!0,z=!0){let B=0;if(S){let N=!1;if(L!==null){const rt=L.texture.format;N=rt===Ba||rt===za||rt===Oa}if(N){const rt=L.texture.type,pt=rt===In||rt===fi||rt===Ns||rt===Ji||rt===Ua||rt===Na,Tt=Ut.getClearColor(),At=Ut.getClearAlpha(),Bt=Tt.r,Vt=Tt.g,Rt=Tt.b;pt?(g[0]=Bt,g[1]=Vt,g[2]=Rt,g[3]=At,C.clearBufferuiv(C.COLOR,0,g)):(v[0]=Bt,v[1]=Vt,v[2]=Rt,v[3]=At,C.clearBufferiv(C.COLOR,0,v))}else B|=C.COLOR_BUFFER_BIT}U&&(B|=C.DEPTH_BUFFER_BIT),z&&(B|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),vt.dispose(),Zt.dispose(),xt.dispose(),b.dispose(),F.dispose(),q.dispose(),ce.dispose(),D.dispose(),Et.dispose(),G.dispose(),G.removeEventListener("sessionstart",Qa),G.removeEventListener("sessionend",tl),Jn.stop()};function j(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const S=Dt.autoReset,U=Mt.enabled,z=Mt.autoUpdate,B=Mt.needsUpdate,N=Mt.type;ut(),Dt.autoReset=S,Mt.enabled=U,Mt.autoUpdate=z,Mt.needsUpdate=B,Mt.type=N}function ft(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ht(S){const U=S.target;U.removeEventListener("dispose",Ht),ge(U)}function ge(S){Ae(S),xt.remove(S)}function Ae(S){const U=xt.get(S).programs;U!==void 0&&(U.forEach(function(z){Et.releaseProgram(z)}),S.isShaderMaterial&&Et.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,z,B,N,rt){U===null&&(U=Jt);const pt=N.isMesh&&N.matrixWorld.determinant()<0,Tt=Ih(S,U,z,B,N);lt.setMaterial(B,pt);let At=z.index,Bt=1;if(B.wireframe===!0){if(At=tt.getWireframeAttribute(z),At===void 0)return;Bt=2}const Vt=z.drawRange,Rt=z.attributes.position;let Qt=Vt.start*Bt,he=(Vt.start+Vt.count)*Bt;rt!==null&&(Qt=Math.max(Qt,rt.start*Bt),he=Math.min(he,(rt.start+rt.count)*Bt)),At!==null?(Qt=Math.max(Qt,0),he=Math.min(he,At.count)):Rt!=null&&(Qt=Math.max(Qt,0),he=Math.min(he,Rt.count));const de=he-Qt;if(de<0||de===1/0)return;ce.setup(N,B,Tt,z,At);let Oe,ne=yt;if(At!==null&&(Oe=$.get(At),ne=jt,ne.setIndex(Oe)),N.isMesh)B.wireframe===!0?(lt.setLineWidth(B.wireframeLinewidth*it()),ne.setMode(C.LINES)):ne.setMode(C.TRIANGLES);else if(N.isLine){let Pt=B.linewidth;Pt===void 0&&(Pt=1),lt.setLineWidth(Pt*it()),N.isLineSegments?ne.setMode(C.LINES):N.isLineLoop?ne.setMode(C.LINE_LOOP):ne.setMode(C.LINE_STRIP)}else N.isPoints?ne.setMode(C.POINTS):N.isSprite&&ne.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ne.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))ne.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Pt=N._multiDrawStarts,_n=N._multiDrawCounts,ie=N._multiDrawCount,Qe=At?$.get(At).bytesPerElement:1,xi=xt.get(B).currentProgram.getUniforms();for(let Ve=0;Ve<ie;Ve++)xi.setValue(C,"_gl_DrawID",Ve),ne.render(Pt[Ve]/Qe,_n[Ve])}else if(N.isInstancedMesh)ne.renderInstances(Qt,de,N.count);else if(z.isInstancedBufferGeometry){const Pt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,_n=Math.min(z.instanceCount,Pt);ne.renderInstances(Qt,de,_n)}else ne.render(Qt,de)};function se(S,U,z){S.transparent===!0&&S.side===Pe&&S.forceSinglePass===!1?(S.side=ke,S.needsUpdate=!0,Xs(S,U,z),S.side=gn,S.needsUpdate=!0,Xs(S,U,z),S.side=Pe):Xs(S,U,z)}this.compile=function(S,U,z=null){z===null&&(z=S),p=Zt.get(z),p.init(U),_.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),S!==z&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const B=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const rt=N.material;if(rt)if(Array.isArray(rt))for(let pt=0;pt<rt.length;pt++){const Tt=rt[pt];se(Tt,z,N),B.add(Tt)}else se(rt,z,N),B.add(rt)}),_.pop(),p=null,B},this.compileAsync=function(S,U,z=null){const B=this.compile(S,U,z);return new Promise(N=>{function rt(){if(B.forEach(function(pt){xt.get(pt).currentProgram.isReady()&&B.delete(pt)}),B.size===0){N(S);return}setTimeout(rt,10)}et.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Ke=null;function vn(S){Ke&&Ke(S)}function Qa(){Jn.stop()}function tl(){Jn.start()}const Jn=new th;Jn.setAnimationLoop(vn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(S){Ke=S,G.setAnimationLoop(S),S===null?Jn.stop():Jn.start()},G.addEventListener("sessionstart",Qa),G.addEventListener("sessionend",tl),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,U,L),p=Zt.get(S,_.length),p.init(U),_.push(p),Lt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Lt),wt=this.localClippingEnabled,st=nt.init(this.clippingPlanes,wt),m=vt.get(S,M.length),m.init(),M.push(m),G.enabled===!0&&G.isPresenting===!0){const rt=x.xr.getDepthSensingMesh();rt!==null&&Yr(rt,U,-1/0,x.sortObjects)}Yr(S,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ct,gt),J=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,J&&Ut.addToRenderList(m,S),this.info.render.frame++,st===!0&&nt.beginShadows();const z=p.state.shadowsArray;Mt.render(z,S,U),st===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const rt=U.cameras;if(N.length>0)for(let pt=0,Tt=rt.length;pt<Tt;pt++){const At=rt[pt];nl(B,N,S,At)}J&&Ut.render(S);for(let pt=0,Tt=rt.length;pt<Tt;pt++){const At=rt[pt];el(m,S,At,At.viewport)}}else N.length>0&&nl(B,N,S,U),J&&Ut.render(S),el(m,S,U);L!==null&&(T.updateMultisampleRenderTarget(L),T.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(x,S,U),ce.resetDefaultState(),w=-1,y=null,_.pop(),_.length>0?(p=_[_.length-1],st===!0&&nt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Yr(S,U,z,B){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){B&&Nt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Lt);const pt=q.update(S),Tt=S.material;Tt.visible&&m.push(S,pt,Tt,z,Nt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const pt=q.update(S),Tt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Nt.copy(S.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Nt.copy(pt.boundingSphere.center)),Nt.applyMatrix4(S.matrixWorld).applyMatrix4(Lt)),Array.isArray(Tt)){const At=pt.groups;for(let Bt=0,Vt=At.length;Bt<Vt;Bt++){const Rt=At[Bt],Qt=Tt[Rt.materialIndex];Qt&&Qt.visible&&m.push(S,pt,Qt,z,Nt.z,Rt)}}else Tt.visible&&m.push(S,pt,Tt,z,Nt.z,null)}}const rt=S.children;for(let pt=0,Tt=rt.length;pt<Tt;pt++)Yr(rt[pt],U,z,B)}function el(S,U,z,B){const N=S.opaque,rt=S.transmissive,pt=S.transparent;p.setupLightsView(z),st===!0&&nt.setGlobalState(x.clippingPlanes,z),B&&lt.viewport(I.copy(B)),N.length>0&&Ws(N,U,z),rt.length>0&&Ws(rt,U,z),pt.length>0&&Ws(pt,U,z),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function nl(S,U,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new qn(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?Vs:In,minFilter:hi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const rt=p.state.transmissionRenderTarget[B.id],pt=B.viewport||I;rt.setSize(pt.z,pt.w);const Tt=x.getRenderTarget();x.setRenderTarget(rt),x.getClearColor(X),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),J&&Ut.render(z);const At=x.toneMapping;x.toneMapping=$n;const Bt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),st===!0&&nt.setGlobalState(x.clippingPlanes,B),Ws(S,z,B),T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt),et.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Rt=0,Qt=U.length;Rt<Qt;Rt++){const he=U[Rt],de=he.object,Oe=he.geometry,ne=he.material,Pt=he.group;if(ne.side===Pe&&de.layers.test(B.layers)){const _n=ne.side;ne.side=ke,ne.needsUpdate=!0,il(de,z,B,Oe,ne,Pt),ne.side=_n,ne.needsUpdate=!0,Vt=!0}}Vt===!0&&(T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt))}x.setRenderTarget(Tt),x.setClearColor(X,Z),Bt!==void 0&&(B.viewport=Bt),x.toneMapping=At}function Ws(S,U,z){const B=U.isScene===!0?U.overrideMaterial:null;for(let N=0,rt=S.length;N<rt;N++){const pt=S[N],Tt=pt.object,At=pt.geometry,Bt=B===null?pt.material:B,Vt=pt.group;Tt.layers.test(z.layers)&&il(Tt,U,z,At,Bt,Vt)}}function il(S,U,z,B,N,rt){S.onBeforeRender(x,U,z,B,N,rt),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(x,U,z,B,S,rt),N.transparent===!0&&N.side===Pe&&N.forceSinglePass===!1?(N.side=ke,N.needsUpdate=!0,x.renderBufferDirect(z,U,B,N,S,rt),N.side=gn,N.needsUpdate=!0,x.renderBufferDirect(z,U,B,N,S,rt),N.side=Pe):x.renderBufferDirect(z,U,B,N,S,rt),S.onAfterRender(x,U,z,B,N,rt)}function Xs(S,U,z){U.isScene!==!0&&(U=Jt);const B=xt.get(S),N=p.state.lights,rt=p.state.shadowsArray,pt=N.state.version,Tt=Et.getParameters(S,N.state,rt,U,z),At=Et.getProgramCacheKey(Tt);let Bt=B.programs;B.environment=S.isMeshStandardMaterial?U.environment:null,B.fog=U.fog,B.envMap=(S.isMeshStandardMaterial?F:b).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Bt===void 0&&(S.addEventListener("dispose",Ht),Bt=new Map,B.programs=Bt);let Vt=Bt.get(At);if(Vt!==void 0){if(B.currentProgram===Vt&&B.lightsStateVersion===pt)return rl(S,Tt),Vt}else Tt.uniforms=Et.getUniforms(S),S.onBeforeCompile(Tt,x),Vt=Et.acquireProgram(Tt,At),Bt.set(At,Vt),B.uniforms=Tt.uniforms;const Rt=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=nt.uniform),rl(S,Tt),B.needsLights=Uh(S),B.lightsStateVersion=pt,B.needsLights&&(Rt.ambientLightColor.value=N.state.ambient,Rt.lightProbe.value=N.state.probe,Rt.directionalLights.value=N.state.directional,Rt.directionalLightShadows.value=N.state.directionalShadow,Rt.spotLights.value=N.state.spot,Rt.spotLightShadows.value=N.state.spotShadow,Rt.rectAreaLights.value=N.state.rectArea,Rt.ltc_1.value=N.state.rectAreaLTC1,Rt.ltc_2.value=N.state.rectAreaLTC2,Rt.pointLights.value=N.state.point,Rt.pointLightShadows.value=N.state.pointShadow,Rt.hemisphereLights.value=N.state.hemi,Rt.directionalShadowMap.value=N.state.directionalShadowMap,Rt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Rt.spotShadowMap.value=N.state.spotShadowMap,Rt.spotLightMatrix.value=N.state.spotLightMatrix,Rt.spotLightMap.value=N.state.spotLightMap,Rt.pointShadowMap.value=N.state.pointShadowMap,Rt.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Vt,B.uniformsList=null,Vt}function sl(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Pr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function rl(S,U){const z=xt.get(S);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Ih(S,U,z,B,N){U.isScene!==!0&&(U=Jt),T.resetTextureUnits();const rt=U.fog,pt=B.isMeshStandardMaterial?U.environment:null,Tt=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ns,At=(B.isMeshStandardMaterial?F:b).get(B.envMap||pt),Bt=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Vt=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Rt=!!z.morphAttributes.position,Qt=!!z.morphAttributes.normal,he=!!z.morphAttributes.color;let de=$n;B.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(de=x.toneMapping);const Oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ne=Oe!==void 0?Oe.length:0,Pt=xt.get(B),_n=p.state.lights;if(st===!0&&(wt===!0||S!==y)){const Ye=S===y&&B.id===w;nt.setState(B,S,Ye)}let ie=!1;B.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==_n.state.version||Pt.outputColorSpace!==Tt||N.isBatchedMesh&&Pt.batching===!1||!N.isBatchedMesh&&Pt.batching===!0||N.isBatchedMesh&&Pt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Pt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Pt.instancing===!1||!N.isInstancedMesh&&Pt.instancing===!0||N.isSkinnedMesh&&Pt.skinning===!1||!N.isSkinnedMesh&&Pt.skinning===!0||N.isInstancedMesh&&Pt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Pt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Pt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Pt.instancingMorph===!1&&N.morphTexture!==null||Pt.envMap!==At||B.fog===!0&&Pt.fog!==rt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==nt.numPlanes||Pt.numIntersection!==nt.numIntersection)||Pt.vertexAlphas!==Bt||Pt.vertexTangents!==Vt||Pt.morphTargets!==Rt||Pt.morphNormals!==Qt||Pt.morphColors!==he||Pt.toneMapping!==de||Pt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Pt.__version=B.version);let Qe=Pt.currentProgram;ie===!0&&(Qe=Xs(B,U,N));let xi=!1,Ve=!1,as=!1;const ue=Qe.getUniforms(),ln=Pt.uniforms;if(lt.useProgram(Qe.program)&&(xi=!0,Ve=!0,as=!0),B.id!==w&&(w=B.id,Ve=!0),xi||y!==S){lt.buffers.depth.getReversed()?(at.copy(S.projectionMatrix),Vd(at),Gd(at),ue.setValue(C,"projectionMatrix",at)):ue.setValue(C,"projectionMatrix",S.projectionMatrix),ue.setValue(C,"viewMatrix",S.matrixWorldInverse);const Nn=ue.map.cameraPosition;Nn!==void 0&&Nn.setValue(C,zt.setFromMatrixPosition(S.matrixWorld)),_t.logarithmicDepthBuffer&&ue.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ue.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Ve=!0,as=!0)}if(N.isSkinnedMesh){ue.setOptional(C,N,"bindMatrix"),ue.setOptional(C,N,"bindMatrixInverse");const Ye=N.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),ue.setValue(C,"boneTexture",Ye.boneTexture,T))}N.isBatchedMesh&&(ue.setOptional(C,N,"batchingTexture"),ue.setValue(C,"batchingTexture",N._matricesTexture,T),ue.setOptional(C,N,"batchingIdTexture"),ue.setValue(C,"batchingIdTexture",N._indirectTexture,T),ue.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&ue.setValue(C,"batchingColorTexture",N._colorsTexture,T));const ls=z.morphAttributes;if((ls.position!==void 0||ls.normal!==void 0||ls.color!==void 0)&&Ft.update(N,z,Qe),(Ve||Pt.receiveShadow!==N.receiveShadow)&&(Pt.receiveShadow=N.receiveShadow,ue.setValue(C,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(ln.envMap.value=At,ln.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&U.environment!==null&&(ln.envMapIntensity.value=U.environmentIntensity),Ve&&(ue.setValue(C,"toneMappingExposure",x.toneMappingExposure),Pt.needsLights&&Dh(ln,as),rt&&B.fog===!0&&dt.refreshFogUniforms(ln,rt),dt.refreshMaterialUniforms(ln,B,V,Q,p.state.transmissionRenderTarget[S.id]),Pr.upload(C,sl(Pt),ln,T)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Pr.upload(C,sl(Pt),ln,T),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ue.setValue(C,"center",N.center),ue.setValue(C,"modelViewMatrix",N.modelViewMatrix),ue.setValue(C,"normalMatrix",N.normalMatrix),ue.setValue(C,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ye=B.uniformsGroups;for(let Nn=0,Fn=Ye.length;Nn<Fn;Nn++){const ol=Ye[Nn];D.update(ol,Qe),D.bind(ol,Qe)}}return Qe}function Dh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Uh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,U,z){xt.get(S.texture).__webglTexture=U,xt.get(S.depthTexture).__webglTexture=z;const B=xt.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=z===void 0,B.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const z=xt.get(S);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,z=0){L=S,A=U,E=z;let B=!0,N=null,rt=!1,pt=!1;if(S){const At=xt.get(S);if(At.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(C.FRAMEBUFFER,null),B=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(At.__hasExternalTextures)T.rebindTextures(S,xt.get(S.texture).__webglTexture,xt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Rt=S.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&xt.has(Rt)&&(S.width!==Rt.image.width||S.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Bt=S.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(pt=!0);const Vt=xt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Vt[U])?N=Vt[U][z]:N=Vt[U],rt=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?N=xt.get(S).__webglMultisampledFramebuffer:Array.isArray(Vt)?N=Vt[z]:N=Vt,I.copy(S.viewport),k.copy(S.scissor),O=S.scissorTest}else I.copy(bt).multiplyScalar(V).floor(),k.copy(kt).multiplyScalar(V).floor(),O=ee;if(lt.bindFramebuffer(C.FRAMEBUFFER,N)&&B&&lt.drawBuffers(S,N),lt.viewport(I),lt.scissor(k),lt.setScissorTest(O),rt){const At=xt.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,z)}else if(pt){const At=xt.get(S.texture),Bt=U||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,At.__webglTexture,z||0,Bt)}w=-1},this.readRenderTargetPixels=function(S,U,z,B,N,rt,pt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Tt=Tt[pt]),Tt){lt.bindFramebuffer(C.FRAMEBUFFER,Tt);try{const At=S.texture,Bt=At.format,Vt=At.type;if(!_t.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-B&&z>=0&&z<=S.height-N&&C.readPixels(U,z,B,N,Xt.convert(Bt),Xt.convert(Vt),rt)}finally{const At=L!==null?xt.get(L).__webglFramebuffer:null;lt.bindFramebuffer(C.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,U,z,B,N,rt,pt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Tt=Tt[pt]),Tt){const At=S.texture,Bt=At.format,Vt=At.type;if(!_t.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-B&&z>=0&&z<=S.height-N){lt.bindFramebuffer(C.FRAMEBUFFER,Tt);const Rt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Rt),C.bufferData(C.PIXEL_PACK_BUFFER,rt.byteLength,C.STREAM_READ),C.readPixels(U,z,B,N,Xt.convert(Bt),Xt.convert(Vt),0);const Qt=L!==null?xt.get(L).__webglFramebuffer:null;lt.bindFramebuffer(C.FRAMEBUFFER,Qt);const he=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Hd(C,he,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Rt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,rt),C.deleteBuffer(Rt),C.deleteSync(he),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,z=0){S.isTexture!==!0&&(Ss("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const B=Math.pow(2,-z),N=Math.floor(S.image.width*B),rt=Math.floor(S.image.height*B),pt=U!==null?U.x:0,Tt=U!==null?U.y:0;T.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,z,0,0,pt,Tt,N,rt),lt.unbindTexture()},this.copyTextureToTexture=function(S,U,z=null,B=null,N=0){S.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,z=null);let rt,pt,Tt,At,Bt,Vt,Rt,Qt,he;const de=S.isCompressedTexture?S.mipmaps[N]:S.image;z!==null?(rt=z.max.x-z.min.x,pt=z.max.y-z.min.y,Tt=z.isBox3?z.max.z-z.min.z:1,At=z.min.x,Bt=z.min.y,Vt=z.isBox3?z.min.z:0):(rt=de.width,pt=de.height,Tt=de.depth||1,At=0,Bt=0,Vt=0),B!==null?(Rt=B.x,Qt=B.y,he=B.z):(Rt=0,Qt=0,he=0);const Oe=Xt.convert(U.format),ne=Xt.convert(U.type);let Pt;U.isData3DTexture?(T.setTexture3D(U,0),Pt=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Pt=C.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Pt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const _n=C.getParameter(C.UNPACK_ROW_LENGTH),ie=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Qe=C.getParameter(C.UNPACK_SKIP_PIXELS),xi=C.getParameter(C.UNPACK_SKIP_ROWS),Ve=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,de.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,de.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,At),C.pixelStorei(C.UNPACK_SKIP_ROWS,Bt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Vt);const as=S.isDataArrayTexture||S.isData3DTexture,ue=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const ln=xt.get(S),ls=xt.get(U),Ye=xt.get(ln.__renderTarget),Nn=xt.get(ls.__renderTarget);lt.bindFramebuffer(C.READ_FRAMEBUFFER,Ye.__webglFramebuffer),lt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let Fn=0;Fn<Tt;Fn++)as&&C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.get(S).__webglTexture,N,Vt+Fn),S.isDepthTexture?(ue&&C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.get(U).__webglTexture,N,he+Fn),C.blitFramebuffer(At,Bt,rt,pt,Rt,Qt,rt,pt,C.DEPTH_BUFFER_BIT,C.NEAREST)):ue?C.copyTexSubImage3D(Pt,N,Rt,Qt,he+Fn,At,Bt,rt,pt):C.copyTexSubImage2D(Pt,N,Rt,Qt,he+Fn,At,Bt,rt,pt);lt.bindFramebuffer(C.READ_FRAMEBUFFER,null),lt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ue?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Pt,N,Rt,Qt,he,rt,pt,Tt,Oe,ne,de.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Pt,N,Rt,Qt,he,rt,pt,Tt,Oe,de.data):C.texSubImage3D(Pt,N,Rt,Qt,he,rt,pt,Tt,Oe,ne,de):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,N,Rt,Qt,rt,pt,Oe,ne,de.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,N,Rt,Qt,de.width,de.height,Oe,de.data):C.texSubImage2D(C.TEXTURE_2D,N,Rt,Qt,rt,pt,Oe,ne,de);C.pixelStorei(C.UNPACK_ROW_LENGTH,_n),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ie),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Qe),C.pixelStorei(C.UNPACK_SKIP_ROWS,xi),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ve),N===0&&U.generateMipmaps&&C.generateMipmap(Pt),lt.unbindTexture()},this.copyTextureToTexture3D=function(S,U,z=null,B=null,N=0){return S.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,B=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0),Ss('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,z,B,N)},this.initRenderTarget=function(S){xt.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),lt.unbindTexture()},this.resetState=function(){A=0,E=0,L=null,lt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class $a{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=n}clone(){return new $a(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ah extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class tg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sa,this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ie=new R;class Ur{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new He(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ur(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class lh extends jn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ii;const fs=new R,Di=new R,Ui=new R,Ni=new K,ps=new K,ch=new te,fr=new R,ms=new R,pr=new R,rc=new K,wo=new K,oc=new K;class Eo extends _e{constructor(t=new lh){if(super(),this.isSprite=!0,this.type="Sprite",Ii===void 0){Ii=new xe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new tg(e,5);Ii.setIndex([0,1,2,0,2,3]),Ii.setAttribute("position",new Ur(n,3,0,!1)),Ii.setAttribute("uv",new Ur(n,2,3,!1))}this.geometry=Ii,this.material=t,this.center=new K(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Di.setFromMatrixScale(this.matrixWorld),ch.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ui.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Di.multiplyScalar(-Ui.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;mr(fr.set(-.5,-.5,0),Ui,o,Di,i,r),mr(ms.set(.5,-.5,0),Ui,o,Di,i,r),mr(pr.set(.5,.5,0),Ui,o,Di,i,r),rc.set(0,0),wo.set(1,0),oc.set(1,1);let a=t.ray.intersectTriangle(fr,ms,pr,!1,fs);if(a===null&&(mr(ms.set(-.5,.5,0),Ui,o,Di,i,r),wo.set(0,1),a=t.ray.intersectTriangle(fr,pr,ms,!1,fs),a===null))return;const l=t.ray.origin.distanceTo(fs);l<t.near||l>t.far||e.push({distance:l,point:fs.clone(),uv:Je.getInterpolation(fs,fr,ms,pr,rc,wo,oc,new K),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function mr(s,t,e,n,i,r){Ni.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ps.x=r*Ni.x-i*Ni.y,ps.y=i*Ni.x+r*Ni.y):ps.copy(Ni),s.copy(t),s.x+=ps.x,s.y+=ps.y,s.applyMatrix4(ch)}class eg extends Le{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Fe,h=Fe,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ac extends He{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Fi=new te,lc=new te,gr=[],cc=new Zn,ng=new te,gs=new qt,xs=new rs;class Es extends qt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ng)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),cc.copy(t.boundingBox).applyMatrix4(Fi),this.boundingBox.union(cc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new rs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),xs.copy(t.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(gs.geometry=this.geometry,gs.material=this.material,gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),t.ray.intersectsSphere(xs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Fi),lc.multiplyMatrices(n,Fi),gs.matrixWorld=lc,gs.raycast(t,gr);for(let o=0,a=gr.length;o<a;o++){const l=gr[o];l.instanceId=r,l.object=this,e.push(l)}gr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new eg(new Float32Array(i*this.count),i,this.count,Fa,fn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class hh extends jn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Nr=new R,Fr=new R,hc=new te,vs=new Va,xr=new rs,To=new R,dc=new R;class ig extends _e{constructor(t=new xe,e=new hh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Nr.fromBufferAttribute(e,i-1),Fr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Nr.distanceTo(Fr);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;hc.copy(i).invert(),vs.copy(t.ray).applyMatrix4(hc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),M=h.getX(v+1),_=vr(this,t,vs,l,p,M);_&&e.push(_)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=vr(this,t,vs,l,v,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=vr(this,t,vs,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=vr(this,t,vs,l,g-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function vr(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(Nr.fromBufferAttribute(o,i),Fr.fromBufferAttribute(o,r),e.distanceSqToSegment(Nr,Fr,To,dc)>n)return;To.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(To);if(!(l<t.near||l>t.far))return{distance:l,point:dc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class sg extends ig{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class rg extends Le{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new K:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,i=[],r=[],o=[],a=new R,l=new te;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ee(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ee(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class qa extends xn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new K){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class og extends qa{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ya(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const _r=new R,Ao=new Ya,Ro=new Ya,Co=new Ya;class Za extends xn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new R){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(_r.subVectors(i[0],i[1]).add(i[0]),c=_r);const d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(_r.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ao.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),Ro.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),Co.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Ao.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Ro.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Co.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Ao.calc(l),Ro.calc(l),Co.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new R().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function uc(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function ag(s,t){const e=1-s;return e*e*t}function lg(s,t){return 2*(1-s)*s*t}function cg(s,t){return s*s*t}function Cs(s,t,e,n){return ag(s,t)+lg(s,e)+cg(s,n)}function hg(s,t){const e=1-s;return e*e*e*t}function dg(s,t){const e=1-s;return 3*e*e*s*t}function ug(s,t){return 3*(1-s)*s*s*t}function fg(s,t){return s*s*s*t}function Ps(s,t,e,n,i){return hg(s,t)+dg(s,e)+ug(s,n)+fg(s,i)}class dh extends xn{constructor(t=new K,e=new K,n=new K,i=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new K){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,i.x,r.x,o.x,a.x),Ps(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class pg extends xn{constructor(t=new R,e=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new R){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,i.x,r.x,o.x,a.x),Ps(t,i.y,r.y,o.y,a.y),Ps(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class uh extends xn{constructor(t=new K,e=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new K){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mg extends xn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fh extends xn{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,i.x,r.x,o.x),Cs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ph extends xn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,i.x,r.x,o.x),Cs(t,i.y,r.y,o.y),Cs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mh extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new K){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(uc(a,l.x,c.x,h.x,d.x),uc(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new K().fromArray(i))}return this}}var Or=Object.freeze({__proto__:null,ArcCurve:og,CatmullRomCurve3:Za,CubicBezierCurve:dh,CubicBezierCurve3:pg,EllipseCurve:qa,LineCurve:uh,LineCurve3:mg,QuadraticBezierCurve:fh,QuadraticBezierCurve3:ph,SplineCurve:mh});class gg extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Or[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Or[i.type]().fromJSON(i))}return this}}class fc extends gg{constructor(t){super(),this.type="Path",this.currentPoint=new K,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new uh(this.currentPoint.clone(),new K(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new fh(this.currentPoint.clone(),new K(t,e),new K(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new dh(this.currentPoint.clone(),new K(t,e),new K(n,i),new K(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new mh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new qa(t,e,n,i,r,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Gr extends xe{constructor(t=[new K(0,-.5),new K(.5,0),new K(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ee(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,d=new R,u=new K,f=new R,g=new R,v=new R;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(g)}for(let M=0;M<=e;M++){const _=n+M*h*i,x=Math.sin(_),P=Math.cos(_);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*x,d.y=t[A].y,d.z=t[A].x*P,o.push(d.x,d.y,d.z),u.x=M/e,u.y=A/(t.length-1),a.push(u.x,u.y);const E=l[3*A+0]*x,L=l[3*A+1],w=l[3*A+0]*P;c.push(E,L,w)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){const x=_+M*t.length,P=x,A=x+t.length,E=x+t.length+1,L=x+1;r.push(P,A,L),r.push(E,L,A)}this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("uv",new Yt(a,2)),this.setAttribute("normal",new Yt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gr(t.points,t.segments,t.phiStart,t.phiLength)}}class zr extends xe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new R,h=new K;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(a,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Yn extends xe{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=n/2;let p=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Yt(d,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(f,2));function M(){const x=new R,P=new R;let A=0;const E=(e-t)/n;for(let L=0;L<=r;L++){const w=[],y=L/r,I=y*(e-t)+t;for(let k=0;k<=i;k++){const O=k/i,X=O*l+a,Z=Math.sin(X),W=Math.cos(X);P.x=I*Z,P.y=-y*n+m,P.z=I*W,d.push(P.x,P.y,P.z),x.set(Z,E,W).normalize(),u.push(x.x,x.y,x.z),f.push(O,1-y),w.push(g++)}v.push(w)}for(let L=0;L<i;L++)for(let w=0;w<r;w++){const y=v[w][L],I=v[w+1][L],k=v[w+1][L+1],O=v[w][L+1];(t>0||w!==0)&&(h.push(y,I,O),A+=3),(e>0||w!==r-1)&&(h.push(I,k,O),A+=3)}c.addGroup(p,A,0),p+=A}function _(x){const P=g,A=new K,E=new R;let L=0;const w=x===!0?t:e,y=x===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,m*y,0),u.push(0,y,0),f.push(.5,.5),g++;const I=g;for(let k=0;k<=i;k++){const X=k/i*l+a,Z=Math.cos(X),W=Math.sin(X);E.x=w*W,E.y=m*y,E.z=w*Z,d.push(E.x,E.y,E.z),u.push(0,y,0),A.x=Z*.5+.5,A.y=W*.5*y+.5,f.push(A.x,A.y),g++}for(let k=0;k<i;k++){const O=P+k,X=I+k;x===!0?h.push(X,X+1,O):h.push(X+1,X,O),L+=3}c.addGroup(p,L,x===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ve extends Yn{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ve(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wr extends xe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const _=new R,x=new R,P=new R;for(let A=0;A<e.length;A+=3)f(e[A+0],_),f(e[A+1],x),f(e[A+2],P),l(_,x,P,M)}function l(M,_,x,P){const A=P+1,E=[];for(let L=0;L<=A;L++){E[L]=[];const w=M.clone().lerp(x,L/A),y=_.clone().lerp(x,L/A),I=A-L;for(let k=0;k<=I;k++)k===0&&L===A?E[L][k]=w:E[L][k]=w.clone().lerp(y,k/I)}for(let L=0;L<A;L++)for(let w=0;w<2*(A-L)-1;w++){const y=Math.floor(w/2);w%2===0?(u(E[L][y+1]),u(E[L+1][y]),u(E[L][y])):(u(E[L][y+1]),u(E[L+1][y+1]),u(E[L+1][y]))}}function c(M){const _=new R;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(M),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){const M=new R;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];const x=m(M)/2/Math.PI+.5,P=p(M)/Math.PI+.5;o.push(x,1-P)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){const _=o[M+0],x=o[M+2],P=o[M+4],A=Math.max(_,x,P),E=Math.min(_,x,P);A>.9&&E<.1&&(_<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),P<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,_){const x=M*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function g(){const M=new R,_=new R,x=new R,P=new R,A=new K,E=new K,L=new K;for(let w=0,y=0;w<r.length;w+=9,y+=6){M.set(r[w+0],r[w+1],r[w+2]),_.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),A.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),L.set(o[y+4],o[y+5]),P.copy(M).add(_).add(x).divideScalar(3);const I=m(P);v(A,y+0,M,I),v(E,y+2,_,I),v(L,y+4,x,I)}}function v(M,_,x,P){P<0&&M.x===1&&(o[_]=M.x-1),x.x===0&&x.z===0&&(o[_]=P/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.vertices,t.indices,t.radius,t.details)}}class gh extends fc{constructor(t){super(t),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new fc().fromJSON(i))}return this}}const xg={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=xh(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,d,u,f;if(n&&(r=bg(s,t,r,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Os(r,o,e,a,l,f,0),o}};function xh(s,t,e,n,i){let r,o;if(i===Dg(s,t,e,n)>0)for(r=t;r<e;r+=n)o=pc(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=pc(r,s[r],s[r+1],o);return o&&Xr(o,o.next)&&(Bs(o),o=o.next),o}function pi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Xr(e,e.next)||me(e.prev,e,e.next)===0)){if(Bs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Os(s,t,e,n,i,r,o){if(!s)return;!o&&r&&Ag(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?_g(s,n,i,r):vg(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Bs(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Mg(pi(s),t,e),Os(s,t,e,n,i,r,2)):o===2&&yg(s,t,e,n,i,r):Os(pi(s),t,e,n,i,r,1);break}}}function vg(s){const t=s.prev,e=s,n=s.next;if(me(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,d=a<l?a<c?a:c:l<c?l:c,u=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&ki(i,a,r,l,o,c,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function _g(s,t,e,n){const i=s.prev,r=s,o=s.next;if(me(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,v=a>l?a>c?a:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=Ea(f,g,t,e,n),M=Ea(v,m,t,e,n);let _=s.prevZ,x=s.nextZ;for(;_&&_.z>=p&&x&&x.z<=M;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ki(a,h,l,d,c,u,_.x,_.y)&&me(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&ki(a,h,l,d,c,u,x.x,x.y)&&me(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ki(a,h,l,d,c,u,_.x,_.y)&&me(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&ki(a,h,l,d,c,u,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Mg(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!Xr(i,r)&&vh(i,n,n.next,r)&&zs(i,r)&&zs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Bs(n),Bs(n.next),n=s=r),n=n.next}while(n!==s);return pi(n)}function yg(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Pg(o,a)){let l=_h(o,a);o=pi(o,o.next),l=pi(l,l.next),Os(o,t,e,n,i,r,0),Os(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function bg(s,t,e,n){const i=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=xh(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Cg(c));for(i.sort(Sg),r=0;r<i.length;r++)e=wg(i[r],e);return e}function Sg(s,t){return s.x-t.x}function wg(s,t){const e=Eg(s,t);if(!e)return t;const n=_h(e,s);return pi(n,n.next),pi(e,e.next)}function Eg(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&ki(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),zs(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&Tg(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function Tg(s,t){return me(s.prev,s,t.prev)<0&&me(t.next,s,s.next)<0}function Ag(s,t,e,n){let i=s;do i.z===0&&(i.z=Ea(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Rg(i)}function Rg(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Ea(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Cg(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ki(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Pg(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Lg(s,t)&&(zs(s,t)&&zs(t,s)&&Ig(s,t)&&(me(s.prev,s,t.prev)||me(s,t.prev,t))||Xr(s,t)&&me(s.prev,s,s.next)>0&&me(t.prev,t,t.next)>0)}function me(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Xr(s,t){return s.x===t.x&&s.y===t.y}function vh(s,t,e,n){const i=yr(me(s,t,e)),r=yr(me(s,t,n)),o=yr(me(e,n,s)),a=yr(me(e,n,t));return!!(i!==r&&o!==a||i===0&&Mr(s,e,t)||r===0&&Mr(s,n,t)||o===0&&Mr(e,s,n)||a===0&&Mr(e,t,n))}function Mr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function yr(s){return s>0?1:s<0?-1:0}function Lg(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&vh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function zs(s,t){return me(s.prev,s,s.next)<0?me(s,t,s.next)>=0&&me(s,s.prev,t)>=0:me(s,t,s.prev)<0||me(s,s.next,t)<0}function Ig(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function _h(s,t){const e=new Ta(s.i,s.x,s.y),n=new Ta(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function pc(s,t,e,n){const i=new Ta(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Bs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ta(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Dg(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Ls{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Ls.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];mc(t),gc(n,t);let o=t.length;e.forEach(mc);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,gc(n,e[l]);const a=xg.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function mc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function gc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ja extends xe{constructor(t=new gh([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Yt(i,3)),this.setAttribute("uv",new Yt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Ug;let _,x=!1,P,A,E,L;p&&(_=p.getSpacedPoints(h),x=!0,u=!1,P=p.computeFrenetFrames(h,!1),A=new R,E=new R,L=new R),u||(m=0,f=0,g=0,v=0);const w=a.extractPoints(c);let y=w.shape;const I=w.holes;if(!Ls.isClockWise(y)){y=y.reverse();for(let J=0,it=I.length;J<it;J++){const C=I[J];Ls.isClockWise(C)&&(I[J]=C.reverse())}}const O=Ls.triangulateShape(y,I),X=y;for(let J=0,it=I.length;J<it;J++){const C=I[J];y=y.concat(C)}function Z(J,it,C){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(it,C)}const W=y.length,Q=O.length;function V(J,it,C){let Ct,et,_t;const lt=J.x-it.x,Dt=J.y-it.y,xt=C.x-J.x,T=C.y-J.y,b=lt*lt+Dt*Dt,F=lt*T-Dt*xt;if(Math.abs(F)>Number.EPSILON){const $=Math.sqrt(b),tt=Math.sqrt(xt*xt+T*T),q=it.x-Dt/$,Et=it.y+lt/$,dt=C.x-T/tt,vt=C.y+xt/tt,Zt=((dt-q)*T-(vt-Et)*xt)/(lt*T-Dt*xt);Ct=q+lt*Zt-J.x,et=Et+Dt*Zt-J.y;const nt=Ct*Ct+et*et;if(nt<=2)return new K(Ct,et);_t=Math.sqrt(nt/2)}else{let $=!1;lt>Number.EPSILON?xt>Number.EPSILON&&($=!0):lt<-Number.EPSILON?xt<-Number.EPSILON&&($=!0):Math.sign(Dt)===Math.sign(T)&&($=!0),$?(Ct=-Dt,et=lt,_t=Math.sqrt(b)):(Ct=lt,et=Dt,_t=Math.sqrt(b/2))}return new K(Ct/_t,et/_t)}const ct=[];for(let J=0,it=X.length,C=it-1,Ct=J+1;J<it;J++,C++,Ct++)C===it&&(C=0),Ct===it&&(Ct=0),ct[J]=V(X[J],X[C],X[Ct]);const gt=[];let bt,kt=ct.concat();for(let J=0,it=I.length;J<it;J++){const C=I[J];bt=[];for(let Ct=0,et=C.length,_t=et-1,lt=Ct+1;Ct<et;Ct++,_t++,lt++)_t===et&&(_t=0),lt===et&&(lt=0),bt[Ct]=V(C[Ct],C[_t],C[lt]);gt.push(bt),kt=kt.concat(bt)}for(let J=0;J<m;J++){const it=J/m,C=f*Math.cos(it*Math.PI/2),Ct=g*Math.sin(it*Math.PI/2)+v;for(let et=0,_t=X.length;et<_t;et++){const lt=Z(X[et],ct[et],Ct);at(lt.x,lt.y,-C)}for(let et=0,_t=I.length;et<_t;et++){const lt=I[et];bt=gt[et];for(let Dt=0,xt=lt.length;Dt<xt;Dt++){const T=Z(lt[Dt],bt[Dt],Ct);at(T.x,T.y,-C)}}}const ee=g+v;for(let J=0;J<W;J++){const it=u?Z(y[J],kt[J],ee):y[J];x?(E.copy(P.normals[0]).multiplyScalar(it.x),A.copy(P.binormals[0]).multiplyScalar(it.y),L.copy(_[0]).add(E).add(A),at(L.x,L.y,L.z)):at(it.x,it.y,0)}for(let J=1;J<=h;J++)for(let it=0;it<W;it++){const C=u?Z(y[it],kt[it],ee):y[it];x?(E.copy(P.normals[J]).multiplyScalar(C.x),A.copy(P.binormals[J]).multiplyScalar(C.y),L.copy(_[J]).add(E).add(A),at(L.x,L.y,L.z)):at(C.x,C.y,d/h*J)}for(let J=m-1;J>=0;J--){const it=J/m,C=f*Math.cos(it*Math.PI/2),Ct=g*Math.sin(it*Math.PI/2)+v;for(let et=0,_t=X.length;et<_t;et++){const lt=Z(X[et],ct[et],Ct);at(lt.x,lt.y,d+C)}for(let et=0,_t=I.length;et<_t;et++){const lt=I[et];bt=gt[et];for(let Dt=0,xt=lt.length;Dt<xt;Dt++){const T=Z(lt[Dt],bt[Dt],Ct);x?at(T.x,T.y+_[h-1].y,_[h-1].x+C):at(T.x,T.y,d+C)}}}Y(),st();function Y(){const J=i.length/3;if(u){let it=0,C=W*it;for(let Ct=0;Ct<Q;Ct++){const et=O[Ct];Lt(et[2]+C,et[1]+C,et[0]+C)}it=h+m*2,C=W*it;for(let Ct=0;Ct<Q;Ct++){const et=O[Ct];Lt(et[0]+C,et[1]+C,et[2]+C)}}else{for(let it=0;it<Q;it++){const C=O[it];Lt(C[2],C[1],C[0])}for(let it=0;it<Q;it++){const C=O[it];Lt(C[0]+W*h,C[1]+W*h,C[2]+W*h)}}n.addGroup(J,i.length/3-J,0)}function st(){const J=i.length/3;let it=0;wt(X,it),it+=X.length;for(let C=0,Ct=I.length;C<Ct;C++){const et=I[C];wt(et,it),it+=et.length}n.addGroup(J,i.length/3-J,1)}function wt(J,it){let C=J.length;for(;--C>=0;){const Ct=C;let et=C-1;et<0&&(et=J.length-1);for(let _t=0,lt=h+m*2;_t<lt;_t++){const Dt=W*_t,xt=W*(_t+1),T=it+Ct+Dt,b=it+et+Dt,F=it+et+xt,$=it+Ct+xt;zt(T,b,F,$)}}}function at(J,it,C){l.push(J),l.push(it),l.push(C)}function Lt(J,it,C){Nt(J),Nt(it),Nt(C);const Ct=i.length/3,et=M.generateTopUV(n,i,Ct-3,Ct-2,Ct-1);Jt(et[0]),Jt(et[1]),Jt(et[2])}function zt(J,it,C,Ct){Nt(J),Nt(it),Nt(Ct),Nt(it),Nt(C),Nt(Ct);const et=i.length/3,_t=M.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);Jt(_t[0]),Jt(_t[1]),Jt(_t[3]),Jt(_t[1]),Jt(_t[2]),Jt(_t[3])}function Nt(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function Jt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ng(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Or[i.type]().fromJSON(i)),new ja(n,t.options)}}const Ug={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new K(r,o),new K(a,l),new K(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new K(o,1-l),new K(c,1-d),new K(u,1-g),new K(v,1-p)]:[new K(a,1-l),new K(h,1-d),new K(f,1-g),new K(m,1-p)]}};function Ng(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ks extends Wr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ks(t.radius,t.detail)}}class Hs extends Wr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Hs(t.radius,t.detail)}}class li extends xe{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,f=new R,g=new K;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const M=p+m,_=M,x=M+n+1,P=M+n+2,A=M+1;a.push(_,x,A),a.push(x,P,A)}}this.setIndex(a),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new li(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class $i extends xe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new R,u=new R,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const M=[],_=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let P=0;P<=e;P++){const A=P/e;d.x=-t*Math.cos(i+A*r)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(i+A*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(A+x,1-_),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const _=h[p][M+1],x=h[p][M],P=h[p+1][M],A=h[p+1][M+1];(p!==0||o>0)&&f.push(_,x,A),(p!==n-1||l<Math.PI)&&f.push(x,P,A)}this.setIndex(f),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hn extends xe{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new R,d=new R,u=new R;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;o.push(v,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class $r extends xe{constructor(t=new ph(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new K;let h=new R;const d=[],u=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Yt(d,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(f,2));function v(){for(let _=0;_<e;_++)m(_);m(r===!1?e:0),M(),p()}function m(_){h=t.getPointAt(_/e,h);const x=o.normals[_],P=o.binormals[_];for(let A=0;A<=i;A++){const E=A/i*Math.PI*2,L=Math.sin(E),w=-Math.cos(E);l.x=w*x.x+L*P.x,l.y=w*x.y+L*P.y,l.z=w*x.z+L*P.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let x=1;x<=i;x++){const P=(i+1)*(_-1)+(x-1),A=(i+1)*_+(x-1),E=(i+1)*_+x,L=(i+1)*(_-1)+x;g.push(P,A,L),g.push(A,E,L)}}function M(){for(let _=0;_<=e;_++)for(let x=0;x<=i;x++)c.x=_/e,c.y=x/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new $r(new Or[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Mh extends jn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ka,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class sn extends jn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ka,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qr extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Fg extends qr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Po=new te,xc=new R,vc=new R;class yh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wa,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(xc),vc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vc),e.updateMatrixWorld(),Po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Po),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const _c=new te,_s=new R,Lo=new R;class Og extends yh{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),_s.setFromMatrixPosition(t.matrixWorld),n.position.copy(_s),Lo.copy(n.position),Lo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Lo),n.updateMatrixWorld(),i.makeTranslation(-_s.x,-_s.y,-_s.z),_c.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_c)}}class zg extends qr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Og}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Bg extends yh{constructor(){super(new eh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kg extends qr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Bg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Hg extends qr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Mc=new te;class bh{constructor(t,e,n=0,i=1/0){this.ray=new Va(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Mc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mc),this}intersectObject(t,e=!0,n=[]){return Aa(t,this,n,e),n.sort(yc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Aa(t[i],this,n,e);return n.sort(yc),n}}function yc(s,t){return s.distance-t.distance}function Aa(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Aa(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:La}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=La);const Wt={match:{daySeconds:60,nightSeconds:100},lobby:{codeLength:5},units:{human:{hp:100,speed:7,carry:10,gatherRate:2.5,attackDamage:4,attackRange:1.6,attackCooldown:1,buildRate:1},peon:{hp:100,speed:7,carry:10,gatherRate:2.5,attackDamage:4,attackRange:1.6,attackCooldown:1,buildRate:1},vampire:{speedDay:6,speedNight:9.5,attackDamage:50,dayDamageMultiplier:.4,attackCooldown:1.1,minAttackCooldown:.45,cryptRadius:14}},buildings:{bank:{hp:500,size:6,cost:{wood:0,gold:0,time:5},maxLevel:6,goldPerCycle:5,cycleSecondsByLevel:{1:5,2:4,3:3,4:2,5:1.5,6:1},upgradeCosts:{1:{wood:40,gold:30},2:{wood:60,gold:60},3:{wood:90,gold:120},4:{wood:130,gold:240},5:{wood:180,gold:450}}},taverna:{hp:500,size:6,cost:{wood:40,gold:20,time:5},recruit:{wood:0,gold:50,time:2}},wall:{hp:400,size:2,cost:{wood:15,gold:0,time:2},maxLevel:3,hpPerLevel:{1:400,2:800,3:1200},upgradeCosts:{1:{wood:60,gold:20},2:{wood:120,gold:40}}},tower:{hp:300,size:3,cost:{wood:30,gold:40,time:2},range:15,damage:10,cooldown:2},keep:{hp:1200,size:7,cost:{wood:150,gold:60,time:12}},crypt:{hp:4e3,size:8,shopRange:3},forge:{hp:1400,size:5,shopRange:3},relic:{hp:1400,size:5,shopRange:3},mist:{hp:1400,size:5,shopRange:3},shrine:{hp:1400,size:5,shopRange:3}},buildable:["bank","taverna","wall","tower"],vampireItems:{claws:{name:"Garras Sangrentas",icon:"⚔",shop:"forge",baseCost:50,costGrowth:1.4,damageBonus:10,healthBonus:0,speedBonus:0,cooldownFactor:1,maxCount:1/0},heart:{name:"Coração Ancestral",icon:"♥",shop:"relic",baseCost:75,costGrowth:1.4,damageBonus:0,healthBonus:300,speedBonus:0,cooldownFactor:1,maxCount:1/0},boots:{name:"Botas da Névoa",icon:"🥾",shop:"mist",baseCost:30,costGrowth:1.4,damageBonus:0,healthBonus:0,speedBonus:.5,cooldownFactor:1,maxCount:1/0},frenzy:{name:"Frenesi",icon:"🌀",shop:"shrine",baseCost:30,costGrowth:1.4,damageBonus:0,healthBonus:0,speedBonus:0,cooldownFactor:.93,maxCount:1/0}},vampireSkills:{powerStrike:{name:"Golpe Sombrio",icon:"💥",unlockCost:80,damageMultiplier:2,duration:8,cooldown:50,description:"Dobra o dano por 8s"}},market:{wood:10,gold:10},camera:{distance:90,initialZoom:.45,minZoom:.3,maxZoom:.6,wheelSensitivity:4e-4,elevation:.75,depth:.62,panSpeed:60,smoothing:6,fov:50},admin:{defaultResourceAmount:1e3,maxResourceAmount:1e5},interaction:{unitRadius:.55,resourceBuildClearance:2},map:{version:1,tiles:144,tileSize:2,humanSpawns:[{x:-3,z:-3},{x:3,z:-3},{x:-3,z:3},{x:3,z:3}],crypt:{x:0,z:-127},vampireShops:[{kind:"forge",x:-8,z:-134},{kind:"relic",x:8,z:-134},{kind:"mist",x:-11,z:-127},{kind:"shrine",x:11,z:-127}],refugeWalls:{thickness:3.2,entranceWidth:3,height:5.5},refuges:[{name:"Clareira dos Pinheiros",x:-66,z:-74,width:42,depth:38,facing:"south"},{name:"Refúgio da Pedreira",x:0,z:-76,width:44,depth:40,facing:"south"},{name:"Bosque da Lua",x:66,z:-74,width:40,depth:44,facing:"south"},{name:"Abrigo do Poente",x:-104,z:0,width:40,depth:46,facing:"east"},{name:"Clareira da Aurora",x:104,z:0,width:40,depth:42,facing:"west"},{name:"Refúgio dos Corvos",x:-66,z:76,width:46,depth:40,facing:"north"},{name:"Vale das Cinzas",x:0,z:78,width:40,depth:42,facing:"north"},{name:"Bosque da Névoa",x:66,z:74,width:42,depth:44,facing:"north"}],forests:[{x:-116,z:-86,rx:18,rz:40},{x:116,z:-86,rx:18,rz:40},{x:-116,z:86,rx:18,rz:40},{x:116,z:86,rx:18,rz:40},{x:-52,z:-117,rx:43,rz:16},{x:52,z:-117,rx:43,rz:16},{x:-50,z:116,rx:45,rz:18},{x:50,z:116,rx:45,rz:18},{x:-38,z:0,rx:16,rz:22},{x:38,z:0,rx:16,rz:22},{x:-65,z:-36,rx:25,rz:12},{x:65,z:-36,rx:25,rz:12},{x:-65,z:36,rx:25,rz:12},{x:65,z:36,rx:25,rz:12}],lakes:[{x:104,z:-43,rx:14,rz:10},{x:-104,z:43,rx:14,rz:10}],resources:{centralWoodX:[-22,22],centralWoodZ:[-12,-6,0,6,12],centralGold:[{x:-12,z:-19},{x:12,z:-19},{x:-12,z:19},{x:12,z:19}],forestNodeSpacing:9}}},ae={get tiles(){return Wt.map.tiles},get tileSize(){return Wt.map.tileSize},get half(){return this.tiles*this.tileSize/2}},Sh=Wt.match.daySeconds,wh=Wt.match.nightSeconds,Is=Wt.map.humanSpawns.length,Xe=Is,Io=Is+1,Vg=Wt.units.human,Gg=Wt.units.peon;function Ms(s){return s.hero===!1?Gg:Vg}const mi=Wt.units.vampire,Wg=mi.cryptRadius,Hi=Wt.buildings.tower,Br=Wt.buildings.wall,ts=Wt.buildings.bank,Xg=Wt.buildings.taverna,Rn=Wt.vampireItems,Vi=Wt.vampireSkills,$g=Wt.map.vampireShops,qg=["crypt",...$g.map(s=>s.kind)];function Yg(s){const t=Wt.buildings[s];return(t==null?void 0:t.shopRange)??3}const ys=Xg.recruit,Eh=Wt.buildable,Oi=Wt.market,Ra=Wt.interaction,Ca=Object.fromEntries(Object.entries(Wt.buildings).filter(([,s])=>"cost"in s).map(([s,t])=>[s,"cost"in t?t.cost:void 0])),gi=Object.fromEntries(Object.entries(Wt.buildings).map(([s,t])=>[s,t.size])),Zg=ts.maxLevel,jg=ts.upgradeCosts,bc=Br.maxLevel,Jg=Br.upgradeCosts;function Do(s){return Br.hpPerLevel[Math.min(Br.maxLevel,Math.max(1,Math.floor(s)))]}function Kg(){return ts.goldPerCycle}function Qg(s){return ts.cycleSecondsByLevel[Math.min(ts.maxLevel,Math.max(1,Math.floor(s)))]}const Sc=Wt.map.version,dn=Wt.map.crypt,es=Wt.map.refuges;function tx(s){const t=Wt.map.refugeWalls.thickness,e=Wt.map.refugeWalls.entranceWidth,n=[];for(const i of["north","south","east","west"]){const r=i==="north"||i==="south",o=(r?s.width:s.depth)/2,a=(r?s.depth:s.width)/2,l=i==="north"||i==="west"?-1:1,c=i===s.facing?[{offset:-(o+e/2)/2,length:o-e/2},{offset:(o+e/2)/2,length:o-e/2}]:[{offset:0,length:2*o+t}];for(const h of c)n.push({x:s.x+(r?h.offset:l*a),z:s.z+(r?l*a:h.offset),width:r?h.length:t,depth:r?t:h.length,height:Wt.map.refugeWalls.height})}return n}function Ja(s){return{x:s.x+(s.facing==="east"?s.width/2:s.facing==="west"?-s.width/2:0),z:s.z+(s.facing==="south"?s.depth/2:s.facing==="north"?-s.depth/2:0)}}const Th=Wt.map.forests;function wc(s,t){let e=Math.imul(s,374761393)+Math.imul(t,668265263)|0;return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967295}const ex=(()=>{const s=[],t=Wt.map.resources.forestNodeSpacing,e=ae.half-4;for(let n=-e;n<=e;n+=t)for(let i=-e;i<=e;i+=t){const r=(wc(Math.round(n*10),Math.round(i*10))-.5)*t*.55,o=(wc(Math.round(i*10),Math.round(n*10))-.5)*t*.55,a=Math.round((n+r)*2)/2,l=Math.round((i+o)*2)/2;Th.some(c=>((a-c.x)/c.rx)**2+((l-c.z)/c.rz)**2<1)&&(Wt.map.lakes.some(c=>((a-c.x)/c.rx)**2+((l-c.z)/c.rz)**2<1)||Math.hypot(dn.x-a,dn.z-l)<18||es.some(c=>Math.abs(c.x-a)<c.width/2+3&&Math.abs(c.z-l)<c.depth/2+3)||s.push({kind:"wood",x:a,z:l}))}return s})(),nx=es.map(s=>{const t=Ja(s),e=s.facing==="east"?{x:1,z:0}:s.facing==="west"?{x:-1,z:0}:s.facing==="south"?{x:0,z:1}:{x:0,z:-1};return{kind:"gold",x:t.x+e.x*9,z:t.z+e.z*9}});[...Wt.map.resources.centralWoodX.flatMap(s=>Wt.map.resources.centralWoodZ.map(t=>({kind:"wood",x:s,z:t}))),...Wt.map.resources.centralGold.map(s=>({kind:"gold",...s})),...nx,...ex];function ix(s=Sc){const t=ae.tiles,e=new Float32Array(t*t),n=new Uint8Array(t*t),i=new Float32Array(t*t);for(let r=0;r<t;r++)for(let o=0;o<t;o++){const a=Ec(o),l=Ec(r),c=r*t+o;let d=(3+Math.max(0,Math.max(Math.abs(a),Math.abs(l))-(ae.half-17))*.6)/14;const u=Math.hypot(a-dn.x,l-dn.z),f=17,g=7;if(u<f+g){const v=u<=f?0:(u-f)/g,m=v*v*(3-2*v);d=d*m+3/14*(1-m)}e[c]=d,Wt.map.lakes.some(v=>((a-v.x)/v.rx)**2+((l-v.z)/v.rz)**2<1)&&(n[c]=1),Th.some(v=>((a-v.x)/v.rx)**2+((l-v.z)/v.rz)**2<1)&&(i[c]=.8)}return{seed:Sc,tiles:t,height:e,water:n,forest:i,obstacles:es.flatMap(tx)}}function Ec(s){return(s-ae.tiles/2)*ae.tileSize+ae.tileSize/2}function br(s){return Math.floor((s+ae.half)/ae.tileSize)}const Tc=Ra.unitRadius;function sx(s,t,e,n,i){const r=gi[e]/2;if(!Number.isFinite(r)||!Number.isFinite(n)||!Number.isFinite(i)||Math.abs(n)+r>=ae.half||Math.abs(i)+r>=ae.half)return!1;for(let o=br(n-r);o<=br(n+r);o++)for(let a=br(i-r);a<=br(i+r);a++)if(o<0||a<0||o>=s.tiles||a>=s.tiles||s.water[a*s.tiles+o]===1)return!1;for(const o of s.obstacles)if(Math.abs(o.x-n)<o.width/2+r&&Math.abs(o.z-i)<o.depth/2+r)return!1;for(const o of t.buildings){const a=gi[o.kind]/2;if(Math.abs(o.x-n)<a+r&&Math.abs(o.z-i)<a+r)return!1}for(const o of t.nodes)if(o.amount>0&&Math.abs(o.x-n)<r+Ra.resourceBuildClearance&&Math.abs(o.z-i)<r+Ra.resourceBuildClearance)return!1;return!t.units.some(o=>!o.dead&&Math.abs(o.x-n)<r+Tc&&Math.abs(o.z-i)<r+Tc)}function Ka(s={}){let t=0,e=0,n=0,i=1;for(const r of Object.keys(Rn)){const o=s[r]??0;if(!o)continue;const a=Rn[r];t+=a.damageBonus*o,e+=a.healthBonus*o,n+=a.speedBonus*o,i*=Math.pow(a.cooldownFactor,o)}return{damage:t,health:e,moveSpeed:n,cooldownMult:i}}function Ac(s,t){const e=Rn[s];return Math.floor(e.baseCost*Math.pow(e.costGrowth,t))}function rx(s,t={}){return(s==="night"?mi.speedNight:mi.speedDay)+Ka(t).moveSpeed}function ox(s={}){return Math.max(mi.minAttackCooldown,mi.attackCooldown*Ka(s).cooldownMult)}function ax(s={}){var t;for(const e of Object.keys(Vi))if((((t=s[e])==null?void 0:t.buff)??0)>0)return Vi[e].damageMultiplier;return 1}function lx(s){return qg.includes(s)}function Uo(s,t,e,n){if(s!=="day")return"As lojas do Vampiro só abrem durante o dia";if(!t||t.kind!=="vampire"||t.hp<=0)return"Vampiro indisponível";if(!e||!lx(e.kind)||!e.done||e.hp<=0)return"Loja indisponível";if(n&&Math.hypot(t.x-n.x,t.z-n.z)<=Wg)return null;const i=gi[e.kind]/2;return Math.max(0,Math.hypot(t.x-e.x,t.z-e.z)-i)>Yg(e.kind)?"Aproxime o Vampiro da base para comprar":null}function cx(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new xe;let c=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=s[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Rc(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in o){const d=o[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][u]);const g=Rc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Rc(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new He(o,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){const v=h.getComponent(u,g);a.setComponent(u+d,g,v)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}const qi=["#456a9b","#934a45","#537554","#77608d"],H={wood:"#49392f",woodLight:"#786047",woodDark:"#2a2928",iron:"#414d5a",edge:"#82909c",stone:"#626b70",stoneDark:"#424b51",mortar:"#353e43",plaster:"#a59c81",slate:["#2a3c49","#31434f","#384a55","#3d4d56"],gold:"#c6a05a",light:"#ffc26b",cloth:"#182330",red:"#742339",skin:"#c09b7b",pale:"#b5beca"},No=new Map;function Ds(s,t=!1,e=!1){const n=`${s}:${t}:${e}`;return No.has(n)||No.set(n,t?new Ne({color:s,toneMapped:!1,side:e?Pe:gn}):new Mh({color:s,roughness:s===H.iron||s===H.edge?.58:.94,metalness:s===H.iron||s===H.edge?.45:0,flatShading:!0,side:e?Pe:gn})),No.get(n)}function Ot(s,t,e,n=0,i=0,r=0,o=!1,a=!1){const l=new qt(t,Ds(e,o,a));return l.position.set(n,i,r),l.castShadow=!o,l.receiveShadow=!0,s.add(l),l}function St(s,t,e,n,i,r=0,o=e/2,a=0,l=!1){return Ot(s,new Dn(t,e,n),i,r,o,a,l)}function je(s,t,e,n,i,r,o,a){const l=Ot(s,new $i(1,10,7),i,r,o,a);return l.scale.set(t,e,n),l}function pe(s,t,e,n,i,r=0,o=n/2,a=0,l=8){return Ot(s,new Yn(t,e,n,l),i,r,o,a)}function fe(s,t,e,n,i,r=n){const o=new R(t[0],t[1],t[2]),a=new R(e[0],e[1],e[2]),l=St(s,n,o.distanceTo(a),r,i,...o.clone().add(a).multiplyScalar(.5).toArray());return l.quaternion.setFromUnitVectors(new R(0,1,0),a.sub(o).normalize()),l}function Te(s,t,e,n,i=0,r=0,o=0){const a=new gh(t.map(c=>new K(c[0],c[1]))),l=new ja(a,{depth:e,bevelEnabled:!1,steps:1});return l.translate(0,0,-e/2),Ot(s,l,n,i,r,o)}function Cn(s,t,e,n,i=0){const r=new Be;return r.name=t,r.position.set(e,n,i),s.add(r),r}function Gs(s){for(const e of[...s.children])e instanceof Be&&Gs(e);const t=new Map;for(const e of s.children){if(!(e instanceof qt)||e.name||Array.isArray(e.material))continue;const n=t.get(e.material)??[];n.push(e),t.set(e.material,n)}for(const[e,n]of t){if(n.length<2)continue;const i=n.map(a=>{a.updateMatrix();const l=a.geometry.index?a.geometry.toNonIndexed():a.geometry.clone();return l.deleteAttribute("uv"),l.applyMatrix4(a.matrix),l}),r=cx(i);for(const a of i)a.dispose();if(!r)continue;const o=new qt(r,e);o.castShadow=n.some(a=>a.castShadow),o.receiveShadow=!0;for(const a of n)s.remove(a),a.geometry.dispose();s.add(o)}}function Lr(s,t,e,n,i,r,o){Te(s,[[-e/2,0],[e/2,0],[e/2,-n*.85],[0,-n],[-e/2,-n*.85]],.035,t,i,r,o),fe(s,[i-e*.65,r+.06,o],[i+e*.65,r+.06,o],.07,H.iron),Te(s,[[0,.3],[.18,0],[0,-.3],[-.18,0]],.025,"#c3c7c4",i,r-n*.42,o+.04)}function Ah(s=!1){const t=new Be;St(t,.3,.43,.3,s?"#d23b42":H.light,0,.33,0,!0);for(const n of[-.18,.18])for(const i of[-.18,.18])fe(t,[n,.06,i],[n,.6,i],.045,H.iron);St(t,.44,.09,.44,H.iron,0,.07);const e=Ot(t,new ve(.34,.25,4),H.iron,0,.66);return e.rotation.y=Math.PI/4,Ot(t,new hn(.095,.025,5,10),H.iron,0,.86),Gs(t),t}function De(s,t,e,n,i=!1){const r=Ah(i);r.position.set(t,e,n),s.add(r),fe(s,[t,e+.92,n],[t,e+.92,n-.4],.055,H.iron)}function Cc(s,t,e,n,i=.35){const r=[new K(i*.82,0),new K(i,i*.5),new K(i,i*1.2),new K(i*.82,i*1.8)];Ot(s,new Gr(r,10),H.woodLight,t,e,n);for(const o of[.13,.5])pe(s,i+.018,i+.018,.055,H.iron,t,e+o*i/.35,n,10);pe(s,i*.82,i*.82,.04,H.wood,t,e+i*1.8,n,10)}function hx(s,t,e,n,i=.65){St(s,i,i,i,H.woodLight,t,e+i/2,n);for(const r of[-1,1]){const o=n+r*(i/2+.015);fe(s,[t-i/2,e+.05,o],[t+i/2,e+i-.05,o],.08,H.wood);for(const a of[.06,i-.06])St(s,i,.09,.06,H.wood,t,e+a,o)}}function dx(s){const t=Cn(s,"cloak",0,2.55,-.12);for(let e=0;e<8;e++){const n=[];for(let l=0;l<5;l++){const c=l/4;for(let h=0;h<2;h++){const d=(e+h)/8*2-1,u=l===4?(e+h)%3*.13:0;n.push(d*(.55+c*.56),-c*2.38+u,-.18-c*.75-Math.cos(d*Math.PI*5)*c*.09)}}const r=[];for(let l=0;l<4;l++){const c=l*2;r.push(c,c+1,c+2,c+1,c+3,c+2)}const o=new xe;o.setAttribute("position",new Yt(n,3)),o.setIndex(r),o.computeVertexNormals(),Ot(t,o,e%3===0?"#263343":H.cloth,0,0,0,!1,!0);const a=o.clone();a.translate(0,0,.025),Ot(t,a,e%2?"#4b1f30":H.red,0,0,0,!1,!0)}}function ux(s){const t=Cn(s,"tool",0,-.79,.1);t.rotation.z=-2.25,pe(t,.045,.055,.9,H.woodLight,0,.2);for(const o of[-.08,-.02,.04])pe(t,.062,.062,.04,H.woodDark,0,o);const e=Cn(t,"axe",0,.58);Te(e,[[-.08,.12],[.14,.19],[.4,.28],[.42,-.13],[.16,-.05],[-.08,-.06]],.09,H.iron),Te(e,[[.33,.25],[.4,.28],[.42,-.13],[.34,-.1]],.095,H.edge);const n=Cn(t,"pickaxe",0,.55);n.visible=!1;const i=new Za([new R(-.53,-.18,0),new R(-.28,.01,0),new R(0,.05,0),new R(.28,.01,0),new R(.53,-.18,0)]);Ot(n,new $r(i,10,.055,5,!1),H.edge),St(n,.14,.18,.14,H.iron,0,.04);for(const o of[-1,1])Ot(n,new ve(.054,.2,5),"#b5bec6",o*.57,-.23).quaternion.setFromUnitVectors(new R(0,1,0),new R(o,-1,0).normalize());const r=Cn(t,"hammer",0,.57);r.visible=!1,St(r,.4,.24,.24,H.iron,0,0);for(const o of[-.2,.2])St(r,.06,.26,.26,H.edge,o,0)}function fx(s,t,e=!0){const n=new Be,i=s==="vampire",r=qi[t%qi.length]??qi[0],o=i?H.cloth:e?r:"#6c7154",a=i?H.pale:H.skin,l=i?1.24:1.02,c=i?2.37:1.88,h=i?.91:.77;for(const[f,g]of[["leftLeg",-1],["rightLeg",1]]){const v=Cn(n,f,g*.21,l);je(v,.18,l*.28,.2,"#323b40",0,-l*.25,0),pe(v,.14,.12,l*.47,H.woodDark,0,-l*.64),St(v,.28,.12,.45,"#252b31",0,-l+.13,.12),St(v,.3,.07,.49,"#141a20",0,-l+.045,.12),St(v,.27,.08,.27,H.woodLight,0,-l*.54)}const d=new Gr([new K(.34,0),new K(.3,.19),new K(.36,.55),new K(.43,c-l-.04),new K(.21,c-l+.06)],10);Ot(n,d,o,0,l-.05).scale.z=.75,St(n,.68,.11,.54,"#3f3027",0,l+.09),St(n,.15,.14,.055,H.gold,0,l+.09,.29);for(const f of[-1,1]){const g=Cn(n,f<0?"leftArm":"rightArm",f*.43,c-.06);if(je(g,.16,.23,.18,o,f*.035,-.13,0),pe(g,.115,.095,h*.47,i?H.iron:o,0,-h*.57),je(g,.115,.12,.11,i?H.iron:H.woodLight,0,-h*.39,.015),pe(g,.12,.12,.09,i?H.red:H.woodDark,0,-h*.78),je(g,.1,.13,.1,a,0,-h,.02),i)for(let v=0;v<3;v++){const m=(v-1)*.08,p=new Za([new R(m,-h,.07),new R(m,-h-.22,.12),new R(m,-h-.38,.27)]);Ot(g,new $r(p,5,.022,4,!1),v===1?"#a95865":"#b4bac6")}else f>0&&ux(g)}const u=i?2.87:2.31;pe(n,.115,.13,.22,a,0,c+.1),je(n,.25,i?.34:.29,.23,a,0,u,0),Te(n,[[-.18,.07],[.18,.07],[.12,-.16],[0,-.22],[-.12,-.16]],.16,a,0,u-.07,.1),Ot(n,new ve(.075,.19,4),a,0,u-.03,.25).rotation.x=Math.PI/2;for(const f of[-1,1])je(n,.045,.09,.06,a,f*.25,u,0),St(n,.095,.028,.025,i?"#ec3346":"#222e32",f*.1,u+.055,.219,i),St(n,.12,.04,.04,i?"#333a47":"#5b4636",f*.1,u+.11,.2).rotation.z=-f*.18;if(i){dx(n);for(const f of[-1,1]){Te(n,[[0,-.2],[f*.45,.12],[f*.51,.56],[f*.1,.31]],.09,H.red,f*.06,2.4,-.03);for(let g=0;g<3;g++)Te(n,[[-.22,.12],[.14,.22],[.4,.02],[.27,-.11],[-.18,-.02]],.15,g%2?"#4a586a":H.iron,f*(.4+g*.055),2.42-g*.12,0).rotation.y=f<0?Math.PI:0;Te(n,[[0,0],[f*.28,.04],[f*.11,-.62]],.04,"#672437",f*.04,2.31,.3)}je(n,.255,.18,.24,"#111c27",0,u+.19,-.07);for(let f=0;f<7;f++){const g=(f-3)*.063,v=Ot(n,new ve(.085,.42,4),"#17222d",g,u+.32+(3-Math.abs(f-3))*.025,-.18);v.rotation.x=-.7}for(const f of[-.06,.06])Ot(n,new ve(.025,.085,3),"#e5e4df",f,u-.16,.23).rotation.z=Math.PI}else if(e){je(n,.285,.23,.27,H.iron,0,u+.16,-.025),pe(n,.33,.35,.065,H.edge,0,u+.08,-.015,12),fe(n,[0,u+.4,-.19],[0,u+.4,.18],.07,"#a6adb0");for(const v of[-1,1])je(n,.24,.1,.27,H.iron,v*.42,c,0),St(n,.065,.24,.16,H.iron,v*.24,u-.025,-.02);Lr(n,r,.46,.54,0,l+.13,.32),fe(n,[-.26,c-.08,.31],[.23,l+.11,.31],.075,H.woodLight,.04);const f=n.getObjectByName("leftArm"),g=Ot(f,new Yn(.25,.25,.065,10),H.iron,-.11,-.35,.16);g.rotation.x=Math.PI/2,je(f,.085,.085,.05,H.edge,-.11,-.35,.205)}else{pe(n,.24,.32,.23,"#9b8357",0,u+.27,0,12),pe(n,.46,.49,.055,"#b29a64",0,u+.14,0,12),pe(n,.31,.32,.055,"#534332",0,u+.19,0,12),Te(n,[[-.27,0],[.27,0],[.3,-.63],[-.25,-.58]],.065,"#72513b",0,l+.13,.32);for(const f of[-.2,.2])fe(n,[f,c-.12,.3],[f,l+.1,.32],.055,"#a88c62");je(n,.21,.13,.14,"#5b4533",0,u-.19,.11)}if(!i){St(n,.43,.52,.23,"#5a4434",0,c-.37,-.35),pe(n,.13,.13,.5,"#85826c",0,c-.05,-.39).rotation.z=Math.PI/2;for(const f of[-.14,.14])St(n,.045,.53,.25,"#342e29",f,c-.37,-.36);je(n,.13,.17,.11,"#7d6244",.36,l-.05,0)}return n.userData.healthBarHeight=i?3.7:3.15,Gs(n),n}function Gn(s,t,e,n,i,r=0,o=0){const a=Te(s,[[-t/2,0],[t/2,0],[0,n]],e,H.slate[0],r,i,o);a.receiveShadow=!0;for(const u of[-1,1]){const f=o+u*(e/2+.015);Te(s,[[-t/2+.13,.03],[t/2-.13,.03],[0,n-.13]],.035,"#6a6656",r,i,f),fe(s,[r,i+.05,f+u*.03],[r,i+n-.14,f+u*.03],.12,H.wood)}const l=Math.hypot(t/2,n),c=Math.atan2(n,t/2),h=Math.max(3,Math.ceil(l/.55)),d=Math.max(3,Math.ceil(e/.62));for(const u of[-1,1])for(let f=0;f<h;f++)for(let g=0;g<d;g++){const v=(f+.5)/h,m=St(s,l/h+.065,.065,e/d-.025,H.slate[(f*13+g*17+g*f+(u+1))%H.slate.length],r+u*t/2*(1-v),i+n*v+.055,o-e/2+e/d*(g+.5));m.rotation.z=-u*c}for(const u of[-1,1])for(const f of[-1,1])fe(s,[r+f*t/2,i-.03,o+u*(e/2+.04)],[r,i+n+.09,o+u*(e/2+.04)],.15,H.woodLight);St(s,.2,.15,e+.2,H.iron,r,i+n+.08,o)}function ye(s,t,e,n,i=0,r=0,o=0){St(s,t,e,n,H.mortar,i,r+e/2,o);const a=Math.ceil(e/.45),l=Math.ceil(t/.85);for(let h=0;h<a;h++)for(let d=0;d<l;d++){const u=t/l,f=i-t/2+(d+.5)*u;for(const g of[-1,1])St(s,u-.025,e/a-.03,.06,(h+d)%3?H.stone:"#757d7d",f,r+(h+.5)*e/a,o+g*n/2)}const c=Math.ceil(n/.85);for(let h=0;h<a;h++)for(let d=0;d<c;d++)for(const u of[-1,1])St(s,.06,e/a-.03,n/c-.025,(h+d)%3?H.stone:"#757d7d",i+u*t/2,r+(h+.5)*e/a,o-n/2+(d+.5)*n/c)}function En(s,t,e,n,i=.75,r=1.15,o=!1){const a=[[-i/2,0],[i/2,0],[i/2,r*.7],[0,r],[-i/2,r*.7]];Te(s,a,.09,H.woodDark,t,e,n);const l=Te(s,a.map(c=>[c[0]*.75,c[1]*.82]),.04,o?"#b62d3d":H.light,t,e+.08,n+.06);l.material=Ds(o?"#b62d3d":H.light,!0),St(s,.055,r*.8,.04,H.woodDark,t,e+r*.45,n+.1),St(s,i*.82,.055,.04,H.woodDark,t,e+r*.46,n+.1),St(s,i+.18,.1,.18,H.woodLight,t,e-.03,n+.03)}function Sr(s,t,e,n,i,r,o=!1){Te(s,[[-i/2,0],[i/2,0],[i/2,r*.8],[0,r],[-i/2,r*.8]],.16,H.woodDark,t,e,n);for(let a=0;a<5;a++)St(s,i/5-.025,r*.8,.06,o?H.iron:H.woodLight,t+(a-2)*i/5,e+r*.4,n+.1);for(const a of[r*.18,r*.62])St(s,i*.95,.1,.07,o?"#788189":H.iron,t,e+a,n+.14);Ot(s,new hn(i*.075,.025,5,10),H.gold,t+i*.22,e+r*.42,n+.19)}function Fo(s,t,e,n,i=0,r=0){ye(s,t,.65,n,i,0,r),St(s,t-.1,e-.65,n-.1,H.plaster,i,(e+.65)/2,r);for(const o of[-1,1]){for(const a of[-t/2+.07,0,t/2-.07])fe(s,[i+a,.6,r+o*n/2],[i+a,e,r+o*n/2],.18,H.wood);for(const a of[.75,e*.57,e])St(s,t,.16,.15,H.wood,i,a,r+o*n/2);for(const a of[-1,1])fe(s,[i+a*t*.43,e*.6,r+o*(n/2+.02)],[i+a*t*.1,e-.1,r+o*(n/2+.02)],.12,H.wood)}for(const o of[-1,1])for(const a of[-n/2,0,n/2])St(s,.15,e-.6,.16,H.wood,i+o*t/2,(e+.6)/2,r+a);for(const o of[-1,1]){for(const a of[.75,e*.57,e])St(s,.18,.16,n,H.wood,i+o*t/2,a,r);for(const a of[-1,1])fe(s,[i+o*t/2,e*.6,r+a*n*.43],[i+o*t/2,e-.1,r+a*n*.1],.12,H.wood)}}function px(s,t,e,n=1){const i=new Be,r=gi[s],a=s==="crypt"?8:s==="wall"?2:s==="tower"?3:s==="keep"?7:s==="forge"||s==="relic"||s==="mist"||s==="shrine"?5:6,l=qi[t%qi.length]??qi[0];if(s==="wall"){for(const c of[-.84,.84])for(const h of[-.64,.64]){pe(i,.16,.2,3.2,H.woodLight,c,1.6,h,7),Ot(i,new ve(.165,.55,7),"#99816a",c,3.46,h);for(const d of[.55,2.55])pe(i,.21,.21,.11,H.iron,c,d,h,7);n>1&&ye(i,.34,.65,.34,c,0,h)}for(const c of[-.66,.66]){St(i,2,.3,.26,H.wood,0,2.95,c),n>1&&St(i,2,.1,.29,H.iron,0,3.1,c);for(let h=-.6;h<=.61;h+=.3)Ot(i,new ve(.11,.45,4),n>2?H.edge:H.woodLight,h,3.33,c)}n>2&&Te(i,[[-.35,0],[.35,0],[0,-.45]],.07,H.iron,0,3.1,.83),St(i,.18,.2,.06,H.gold,0,2.97,.83)}else if(s==="tower"){ye(i,2.8,1.2,2.8);for(const h of[-1.13,1.13])for(const d of[-1.13,1.13])fe(i,[h,.7,d],[h,8,d],.27,H.wood);St(i,2.3,4.9,2.3,"#414542",0,3.7);for(const h of[-1.19,1.19]){for(let d=-1;d<=1.01;d+=.25)St(i,.22,4.9,.08,Math.round(d*4)%2?H.wood:"#655643",d,3.7,h);for(const d of[1.3,3.4,5.8])St(i,2.7,.2,.18,H.woodDark,0,d,h);fe(i,[-1.1,1.5,h+.04],[1.1,3.3,h+.04],.13,H.woodLight)}St(i,3,.28,3,H.woodLight,0,6.05);for(const h of[-1.3,1.3])for(const d of[-1.3,1.3])St(i,.18,1.1,.18,H.woodLight,h,6.65,d);for(const h of[-1.34,1.34])St(i,2.8,.16,.13,H.wood,0,7.13,h);Gn(i,3.3,3.3,1.5,8.05),Lr(i,l,.9,2.7,0,5.7,1.28),De(i,-.94,4.5,1.4);const c=Cn(i,"turret",0,6.7);pe(c,.15,.25,.4,H.iron,0,.2),St(c,.14,.13,1.6,H.woodLight,0,.5,.25),fe(c,[-.68,.5,.4],[0,.5,.57],.09,H.iron),fe(c,[.68,.5,.4],[0,.5,.57],.09,H.iron),fe(c,[-.68,.5,.4],[.68,.5,.4],.018,"#c7b99b")}else if(s==="taverna"){Fo(i,4.1,3.55,4.4,-.8,-.45),Gn(i,4.55,4.95,2.4,3.62,-.8,-.45),Fo(i,1.65,2.65,3.9,2.05,-.35),Gn(i,1.95,4.2,.75,2.68,2.05,-.35),Sr(i,-.7,.45,1.82,1.15,2.05);for(const d of[-2.02,.55])En(i,d,1.42,1.81,.82,1.25);En(i,-.8,3.8,2.05,.8,1.25),Gn(i,2.3,1.05,.5,2.5,-.7,2.35);for(const d of[-1.72,.32])fe(i,[d,.15,2.72],[d,2.6,2.72],.13,H.wood);ye(i,.68,2.6,.7,-1.9,3.95,-1),St(i,.83,.14,.86,H.iron,-1.9,6.6,-1),De(i,-1.65,1.85,2.1),De(i,2.35,1.3,1.75);const c=new Be;c.position.set(2.9,0,-.35),c.rotation.y=Math.PI/2,i.add(c);for(const d of[-.95,.95])En(c,d,1.2,.05,.72,1.05);Cc(i,1.2,.05,2.2),Cc(i,2.2,.05,2.1,.31),hx(i,-2.5,0,2.12,.62);const h=Cn(i,"tavernSign",.75,3.55,2.58);for(const d of[-.35,.35])fe(h,[d,0,0],[d,-.26,0],.025,H.iron);St(h,1,.62,.13,H.woodLight,0,-.56),St(h,.29,.3,.05,H.gold,-.05,-.55,.085),Ot(h,new hn(.09,.025,5,10),H.gold,.15,-.54,.1),Lr(i,l,.55,.95,1.87,2.5,1.68)}else if(s==="bank"||s==="keep"){const c=s==="bank"?5.65:6.65;ye(i,c,3.35,c),Fo(i,c-.2,1.35,c-.2,0,0),St(i,c-.25,1.7,c-.25,H.plaster,0,4.05);for(const u of[-c/2+.1,0,c/2-.1])for(const f of[-c/2,c/2])St(i,.2,1.8,.16,H.wood,u,4.08,f);for(const u of[-1,1]){for(const g of[-c/2+.1,0,c/2-.1])St(i,.16,1.8,.2,H.wood,u*c/2,4.08,g);const f=new Be;f.position.x=u*(c/2+.03),f.rotation.y=u*Math.PI/2,i.add(f);for(const g of[-c/4,c/4])En(f,g,3.53,0,.7,1.12)}St(i,c,.2,c,H.wood,0,4.95),Gn(i,c+.5,c+.5,2.35,5.04),Sr(i,0,.22,c/2+.06,1.7,2.65,!0);for(const u of[-1.04,1.04])pe(i,.2,.26,2.65,"#89908d",u,1.55,c/2+.06),St(i,.57,.19,.42,H.stone,u,2.98,c/2);const h=Ot(i,new hn(.31,.045,6,12),H.gold,0,1.55,c/2+.23);for(const u of[0,Math.PI/3,-Math.PI/3])St(i,.55,.04,.045,H.gold,0,1.55,h.position.z).rotation.z=u;for(const u of[-c*.32,c*.32])En(i,u,3.55,c/2+.03,.85,1.2);En(i,0,5.18,c/2+.27,1,1.3),De(i,-1.65,1.7,c/2+.17),De(i,1.65,1.7,c/2+.17),Lr(i,l,.64,1.45,-c/2+.46,2.85,c/2+.15);const d=pe(i,.37,.37,.09,H.gold,0,3.24,c/2+.18,12);d.rotation.x=Math.PI/2}else if(s==="crypt"){ye(i,8.6,.5,8.6,0,-.4),ye(i,7.7,.65,7.6),ye(i,6.55,4.55,6.6,0,.6,-.15),Gn(i,7.2,7.3,3.5,5.2,0,-.15),Sr(i,0,.55,3.2,2.15,3.8,!0);for(const h of[-1.42,1.42])pe(i,.18,.26,3.65,"#818b93",h,2.55,3.26),fe(i,[h,4.32,3.26],[0,5.3,3.26],.24,H.stone);for(const h of[-3.24,3.24]){ye(i,1.22,7.8,1.3,h,.5,2.6);const d=Ot(i,new ve(1,3.3,4),H.slate[0],h,9.8,2.6);d.rotation.y=Math.PI/4,En(i,h,5.8,3.3,.43,1.3,!0),Ot(i,new ve(.12,.8,5),H.iron,h,11.85,2.6)}const c=pe(i,.72,.72,.09,"#a32940",0,6.05,3.55,12);c.rotation.x=Math.PI/2,c.material=Ds("#a32940",!0),Ot(i,new hn(.75,.09,6,16),H.iron,0,6.05,3.64);for(let h=0;h<6;h++)St(i,1.4,.045,.07,H.iron,0,6.05,3.68).rotation.z=h*Math.PI/6;De(i,-1.95,1.75,3.5,!0),De(i,1.95,1.75,3.5,!0);for(const h of[-1,1]){const d=new Be;d.position.set(h*3.32,0,-.6),d.rotation.y=h*Math.PI/2,i.add(d);for(const u of[-1.4,1.4])En(d,u,2.3,0,.68,1.85,!0)}for(const h of[-2.9,2.9])for(const d of[-2.9,-.6])fe(i,[h,.6,d],[h*.9,4.8,d],.45,H.stoneDark),Ot(i,new ve(.35,1.6,4),H.iron,h,5.2,d);for(const h of[-3.7,3.7])for(const d of[-3.7,3.7])St(i,.9,.5,.9,H.stoneDark,h,.05,d),Ot(i,new ve(.34,2.6,4),"#20242c",h,1.75,d).rotation.y=Math.PI/4,Ot(i,new ve(.2,.7,5),"#e0344b",h,3.25,d,!0);pe(i,1.25,1.45,.35,"#2a2f36",0,.25,4.4,14),pe(i,1.02,1.02,.12,"#9c1b2b",0,.46,4.4,14);for(const h of[-4.3,4.3])for(const d of[-4.3,4.3])Ot(i,new $i(.24,6,5),"#cfc6b0",h,.4,d).scale.set(1,.8,1)}else if(s==="forge"){ye(i,4.6,.6,4.4),St(i,4.2,2.3,4,"#3b3b42",0,1.75),Gn(i,4.7,4.6,1.7,2.95);const c=Te(i,[[-.62,0],[.62,0],[.44,.95],[0,1.3],[-.44,.95]],.12,"#ff7a1e",0,.85,2.06);c.material=Ds("#ff7a1e",!0),St(i,1.7,.18,.5,H.iron,0,1.6,2.12),ye(i,1.15,4.4,1.15,-1.45,.5,-1.25),St(i,1.35,.3,1.35,H.iron,-1.45,4.95,-1.25),Ot(i,new $i(.5,7,6),"#5a5f66",-1.45,5.6,-1.25).scale.set(1,.7,1),St(i,.42,.55,.42,H.stoneDark,1.55,.5,2.15),St(i,1.05,.28,.6,H.iron,1.55,.92,2.15),Ot(i,new ve(.22,.7,5),H.iron,2.2,.95,2.15).rotation.z=-Math.PI/2;for(const h of[-1.2,-.6,0])Te(i,[[0,-.35],[.08,.35],[-.08,.35]],.05,"#b4bac6",h,1.9,2.02);De(i,-2.15,1.4,1.9,!0),De(i,2.15,1.4,1.9,!0)}else if(s==="relic"){ye(i,4.5,.6,4.3),ye(i,3.9,3.2,3.8,0,.6),Gn(i,4.4,4.3,2.6,3.75);for(const h of[-1,1])ye(i,.9,5.2,.9,h*1.85,.6,-1.5),Ot(i,new ve(.72,2.2,4),H.slate[0],h*1.85,6.4,-1.5).rotation.y=Math.PI/4;Sr(i,0,.65,1.92,1.1,1.7,!0),En(i,0,4.15,.2,.85,1.25,!0),Ot(i,new $i(.5,10,8),"#c0203d",0,5.6,0).scale.set(1,1.25,.8),Ot(i,new ve(.5,.55,8),"#c0203d",0,5.05,0).rotation.z=Math.PI,Ot(i,new hn(.72,.06,6,20),"#e6b0ba",0,5.6,0).rotation.x=Math.PI/2,De(i,-1.5,1.5,1.95,!0),De(i,1.5,1.5,1.95,!0)}else if(s==="mist"){ye(i,4.4,.5,2.6);for(const h of[-1,1])ye(i,.85,4.6,.85,h*1.5,.5),Ot(i,new ve(.6,1.4,4),H.stoneDark,h*1.5,5.5,0).rotation.y=Math.PI/4;Ot(i,new hn(1.5,.32,8,20,Math.PI),H.stone,0,5.05,0);const c=Ot(i,new pn(2.1,3.9),"#8fd6d0",0,2.7,.06,!0,!0);c.material=new Ne({color:"#8fd6d0",transparent:!0,opacity:.32,side:Pe,depthWrite:!1});for(let h=0;h<3;h++)Ot(i,new hn(1.1+h*.35,.05,5,20),"#5f8f8a",0,.58,0).rotation.x=Math.PI/2;De(i,-1.5,1.4,1),De(i,1.5,1.4,1)}else if(s==="shrine"){ye(i,4.4,.6,4.2),ye(i,3.4,.7,3.2,0,.6),ye(i,2.4,.7,2.2,0,1.3),Ot(i,new ve(.62,4.2,4),"#2a2434",0,3.6,0).rotation.y=Math.PI/4,Ot(i,new Hs(.4),"#b45ad6",0,5.9,0,!0);for(let c=0;c<4;c++){const h=c*Math.PI/2+Math.PI/4,d=Ot(i,new Hs(.26),"#8f46b8",Math.cos(h)*1.5,4.4+c%2*.5,Math.sin(h)*1.5,!0);d.scale.set(.7,1.6,.7),d.rotation.z=h}for(const c of[-1,1])St(i,.5,.9,.5,H.stoneDark,c*1.55,1.4,1.35),Ot(i,new ve(.2,.7,5),"#d060ff",c*1.55,2.15,1.35,!0);De(i,0,1.9,2.2,!0)}return e||i.traverse(c=>{c instanceof qt&&(c.material=Ds("#96836b"),c.castShadow=!1)}),i.scale.set(r/a,1,r/a),i.updateMatrixWorld(!0),i.userData.healthBarHeight=new Zn().setFromObject(i).max.y+.5,Gs(i),i}function mx(s,t,e){const n=es.find(i=>{const r=Ja(i);return Math.hypot(t-r.x,e-r.z)<3});((n==null?void 0:n.facing)==="east"||(n==null?void 0:n.facing)==="west")&&(s.rotation.y=Math.PI/2)}function Rh(){const s=[],t=[];for(let n=0;n<4;n++){const i=2.3-n*.48,r=n*1.05;for(let o=0;o<10;o++){const a=o*Math.PI/5,l=(o+1)*Math.PI/5,c=i*(.86+o%3*.07),h=i*(.86+(o+1)%3*.07);s.push(Math.sin(a)*c,r+o%2*.15,Math.cos(a)*c,.1*Math.sin(n),r+3.1-n*.12,-.08*n,Math.sin(l)*h,r+(o+1)%2*.15,Math.cos(l)*h);const d=new It(["#2b403a","#354f43","#415b48","#4b614c"][(o+n)%4]);for(let u=0;u<3;u++)t.push(d.r,d.g,d.b)}}const e=new xe;return e.setAttribute("position",new Yt(s,3)),e.setAttribute("color",new Yt(t,3)),e.computeVertexNormals(),e}function Ch(s=0){const t=new ks(1,1),e=t.getAttribute("position");for(let n=0;n<e.count;n++){const i=e.getX(n),r=e.getY(n),o=e.getZ(n),a=.87+Math.sin(i*8+r*5+o*7+s)*.1;e.setXYZ(n,i*a,r*a,o*a)}return t.computeVertexNormals(),t}function gx(s){const t=new Be;if(s==="wood"){pe(t,.19,.59,5.6,H.wood,0,2.8,0,7);for(let n=0;n<5;n++){const i=n*Math.PI*.4;fe(t,[Math.sin(i)*.78,.08,Math.cos(i)*.78],[0,.72,0],.19,H.wood),fe(t,[0,2.6+n*.3,0],[Math.sin(i)*1.2,3.1+n*.3,Math.cos(i)*1.2],.11,H.woodLight)}const e=new qt(Rh(),new Mh({vertexColors:!0,roughness:1,flatShading:!0,side:Pe}));e.position.y=2.55,e.castShadow=!0,t.add(e)}else{const e=[[0,1,-.3,1.8,1.7,1.5],[-1.15,.7,.25,.85,1.15,.85],[1.13,.75,.1,.9,1.2,.9]],n=[];for(const[r,o]of e.entries()){const a=Ot(t,Ch(r),r?"#677077":"#545f68",o[0],o[1],o[2]);a.scale.set(o[3],o[4],o[5]),n.push(a)}Te(t,[[-.65,0],[.65,0],[.7,1.35],[0,1.75],[-.7,1.35]],.08,"#101c25",0,.05,1.05);for(const r of[-.76,.76])fe(t,[r,.06,1.24],[r*.84,1.65,1.24],.18,H.woodLight);fe(t,[-.85,1.63,1.24],[.85,1.63,1.24],.22,H.wood);for(const r of[-.36,.36])St(t,.055,.055,1.6,H.iron,r,.06,.75);for(const r of[.1,.55,1,1.45])St(t,1,.07,.14,H.woodDark,0,.025,r);t.updateMatrixWorld(!0);const i=new bh;for(let r=0;r<7;r++){const o=r*2.3,a=Math.sin(o)*1.2,l=Math.cos(o)*.6;i.set(new R(a,5,l),new R(0,-1,0));const c=i.intersectObjects(n,!1)[0];if(!c)continue;const h=Ot(t,new Hs(.18),r%2?"#b2934d":"#e1bd66",a,c.point.y-.06,l);h.scale.set(.65,1.3,.7),h.rotation.z=o}De(t,1.14,.82,.96)}return Gs(t),t}const ze=Wt.camera;class xx{constructor(){ot(this,"scene",new ah);ot(this,"target",new qn(1,1,{minFilter:Fe,magFilter:Fe}));ot(this,"uniforms",{unitRevealMask:{value:this.target.texture},unitRevealSize:{value:new K},unitRevealFar:{value:600}});ot(this,"materials",new WeakMap);ot(this,"dummy",new _e);ot(this,"clearColor",new It);ot(this,"circles");ot(this,"maskMaterial",new Un({uniforms:{unitRevealFar:this.uniforms.unitRevealFar},vertexShader:`
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
    `,blending:Pn,toneMapped:!1}));this.circles=this.createCircles(16)}createCircles(t){const e=new Es(new pn(1,1),this.maskMaterial,t);return e.instanceMatrix.setUsage(Sd),e.frustumCulled=!1,this.scene.add(e),e}apply(t){t.traverse(e=>{if(!(e instanceof qt))return;const n=i=>{let r=this.materials.get(i);return r||(r=i.clone(),r.onBeforeCompile=o=>{Object.assign(o.uniforms,this.uniforms),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
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
            `)},r.customProgramCacheKey=()=>"unit-reveal-v1",this.materials.set(i,r),this.materials.set(r,r),r)};e.material=Array.isArray(e.material)?e.material.map(n):n(e.material)})}update(t,e,n){t.getDrawingBufferSize(this.uniforms.unitRevealSize.value);const i=this.uniforms.unitRevealSize.value,r=Math.max(1,Math.ceil(i.x/2)),o=Math.max(1,Math.ceil(i.y/2));(r!==this.target.width||o!==this.target.height)&&this.target.setSize(r,o),this.uniforms.unitRevealFar.value=e.far,n.size>this.circles.instanceMatrix.count&&(this.scene.remove(this.circles),this.circles.geometry.dispose(),this.circles.dispose(),this.circles=this.createCircles(Math.max(n.size,this.circles.instanceMatrix.count*2))),e.updateMatrixWorld(!0),this.dummy.quaternion.copy(e.quaternion);let a=0;for(const h of n.values()){const d=h.userData.kind==="vampire";this.dummy.position.copy(h.position),this.dummy.position.y+=d?1.8:1.3,this.dummy.scale.setScalar(d?6.4:5.6),this.dummy.updateMatrix(),this.circles.setMatrixAt(a++,this.dummy.matrix)}this.circles.count=a,this.circles.instanceMatrix.needsUpdate=!0;const l=t.getRenderTarget(),c=t.getClearAlpha();t.getClearColor(this.clearColor),t.setRenderTarget(this.target),t.setClearColor(0,0),t.clear(),t.render(this.scene,e),t.setRenderTarget(l),t.setClearColor(this.clearColor,c)}}const wr=ae.tiles*ae.tileSize;class vx{constructor(t,e){ot(this,"scene",new ah);ot(this,"camera");ot(this,"renderer");ot(this,"map");ot(this,"container");ot(this,"unitMeshes",new Map);ot(this,"buildingMeshes",new Map);ot(this,"nodeMeshes",new Map);ot(this,"woodTrunks",null);ot(this,"woodCrowns",null);ot(this,"woodKey","");ot(this,"hpBars",new Map);ot(this,"selectionRings",new Map);ot(this,"sun");ot(this,"hemi");ot(this,"fog");ot(this,"torches",[]);ot(this,"raycaster",new bh);ot(this,"terrain");ot(this,"buildingSelection",null);ot(this,"towerRanges",new Map);ot(this,"mapOccluders",[]);ot(this,"unitReveal",new xx);ot(this,"animationTime",0);ot(this,"effects",[]);this.container=t,this.map=ix(e),this.renderer=new Q0({antialias:!0}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Dc,t.appendChild(this.renderer.domElement),this.camera=new qe(ze.fov,t.clientWidth/t.clientHeight,1,600);const n=ze.distance*ze.initialZoom,i=this.heightAt(0,0);this.camera.position.set(0,i+n*ze.elevation,n*ze.depth),this.camera.lookAt(0,i,0),this.fog=new $a(9084344,120,400),this.scene.fog=this.fog,this.hemi=new Fg(12571903,3820083,.9),this.scene.add(this.hemi),this.sun=new kg(16772812,1.6),this.sun.position.set(60,100,30),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-ae.half,right:ae.half,top:ae.half,bottom:-ae.half,near:1,far:500}),this.sun.shadow.bias=-.001,this.scene.add(this.sun),this.scene.add(new Hg(4210784,.4)),this.buildTerrain(),this.buildFixedMap(),window.addEventListener("resize",()=>this.onResize())}onResize(){const t=this.container.clientWidth,e=this.container.clientHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)}buildTerrain(){const t=this.map.tiles,e=t,n=new pn(wr,wr,e,e);n.rotateX(-Math.PI/2);const i=n.attributes.position,r=new Float32Array(i.count*3),o=new It("#415549"),a=new It("#65654b"),l=new It("#65717a"),c=new It("#7a7864"),h=new It;for(let m=0;m<=e;m++)for(let p=0;p<=e;p++){const M=m*(e+1)+p,_=Math.min(t-1,p),x=Math.min(t-1,m),P=x*t+_,A=this.map.height[P]??0,E=this.map.water[P]?1:A*14;i.setY(M,E),this.map.water[P]?h.copy(c).lerp(l,.2):A>.62?h.copy(l):h.copy(o).lerp(a,(A-.22)*1.5);const L=_*ae.tileSize-ae.half,w=x*ae.tileSize-ae.half;for(const y of es){const I=Math.hypot((L-y.x)/(y.width*.55),(w-y.z)/(y.depth*.55));I<1.3&&h.lerp(new It("#72774b"),Math.max(0,1-I/1.3)*.4)}r[M*3]=h.r,r[M*3+1]=h.g,r[M*3+2]=h.b}n.setAttribute("color",new He(r,3)),n.computeVertexNormals();const d=new sn({vertexColors:!0}),u=new qt(n,d);u.receiveShadow=!0,this.terrain=u,this.scene.add(u);const f=new pn(wr,wr);f.rotateX(-Math.PI/2);const g=new sn({color:2775690,transparent:!0,opacity:.85}),v=new qt(f,g);v.position.y=2.4,this.scene.add(v)}buildFixedMap(){const t=new sn({color:4608870}),e=(m,p,M,_,x,P,A=3)=>{const E=new qt(new Dn(M,x,_),P);return E.castShadow=!0,E.receiveShadow=!0,E.position.set(m,A+x/2,p),this.unitReveal.apply(E),this.scene.add(E),E};for(const m of es){const p=Ja(m),M=Math.hypot(p.x,p.z);for(let _=12;_<M;_+=4){const x=_/M,P=new qt(new zr(1.5,7),new sn({color:"#817355",transparent:!0,opacity:.14}));P.rotation.x=-Math.PI/2,P.position.set(p.x*x+Math.sin(_*.13),3.04,p.z*x),P.scale.set(1,1.8,1),this.scene.add(P)}for(const _ of[-1,1]){const x=m.facing==="north"||m.facing==="south",P=p.x+(x?_*2.2:0),A=p.z+(x?0:_*2.2);e(P,A,.3,.3,3,new sn({color:3943461}));const E=Ah();E.position.set(P,5.25,A+.18),this.scene.add(E)}}const n=[],i=[],r=new _e,o=[];for(const m of this.map.obstacles){const p=m.width>m.depth,M=Math.max(m.width,m.depth);this.mapOccluders.push(e(m.x,m.z,m.width,m.depth,2.1,t));const _=Math.ceil(M/3),x=M/_;for(let P=0;P<_;P++){const A=-M/2+x*(P+.5),E=4.3+(Math.sin(P*2.7+m.x)+1)*1.8;r.scale.set(p?x*.65:m.width/2,E/2,p?m.depth/2:x*.65),r.position.set(m.x+(p?A:0),3+E/2,m.z+(p?0:A)),r.rotation.set(0,0,0),r.updateMatrix(),n.push(r.matrix.clone()),i.push(new It(P%3?"#657078":"#77807c")),P%3===0&&(r.position.y+=E*.35,r.scale.set(1.1,.3,1),r.updateMatrix(),o.push(r.matrix.clone()))}}const a=new Es(Ch(),new sn({color:16777215}),n.length);n.forEach((m,p)=>{a.setMatrixAt(p,m),a.setColorAt(p,i[p])}),a.castShadow=!0,a.receiveShadow=!0,this.unitReveal.apply(a),this.scene.add(a),this.mapOccluders.push(a);const l=new Es(new ks(.8),new sn({color:"#425341"}),o.length);o.forEach((m,p)=>l.setMatrixAt(p,m)),this.unitReveal.apply(l),this.scene.add(l);const c=new qt(new zr(10,32),new sn({color:7370613}));c.rotation.x=-Math.PI/2,c.position.y=3.06,this.scene.add(c);const h=new qt(new li(8.7,9,32),new Ne({color:10787710}));h.rotation.x=-Math.PI/2,h.position.y=3.08,this.scene.add(h);const d=(m,p)=>{const M=m.attributes.position;for(let _=0;_<M.count;_++)M.setY(_,this.heightAt(dn.x+M.getX(_),dn.z+M.getZ(_))+p);M.needsUpdate=!0,m.computeVertexNormals()},u=new li(.02,16,64,8);u.rotateX(-Math.PI/2),d(u,.02);const f=new qt(u,new sn({color:2761008}));f.position.set(dn.x,0,dn.z),this.scene.add(f);const g=new li(14.2,14.6,64,1);g.rotateX(-Math.PI/2),d(g,.05);const v=new qt(g,new Ne({color:9316917}));v.position.set(dn.x,0,dn.z),this.scene.add(v)}heightAt(t,e){const n=this.map.tiles,i=di.clamp((t+ae.half)/ae.tileSize,0,n-1e-4),r=di.clamp((e+ae.half)/ae.tileSize,0,n-1e-4),o=Math.floor(i),a=Math.floor(r),l=i-o,c=r-a,h=(v,m)=>{const p=Math.min(n-1,a+m)*n+Math.min(n-1,o+v);return this.map.water[p]?1:(this.map.height[p]??0)*14},d=h(0,0),u=h(1,0),f=h(0,1),g=h(1,1);return l+c<=1?d+(u-d)*l+(f-d)*c:g+(f-g)*(1-l)+(u-g)*(1-c)}sync(t){var o;const e=new Set;for(const a of t.units){e.add(a.id);let l=this.unitMeshes.get(a.id);l||(l=fx(a.kind,a.owner,a.hero!==!1),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),l.userData.pick={unitId:a.id},this.unitMeshes.set(a.id,l),this.scene.add(l),l.userData.tx=a.x,l.userData.tz=a.z),l.userData.tx=a.x,l.userData.tz=a.z,l.userData.kind=a.kind,l.userData.hp=a.hp,l.userData.maxHp=a.maxHp,l.userData.activity=a.activity,l.userData.resource=a.carryRes??((o=t.nodes.find(h=>h.id===a.targetId))==null?void 0:o.kind);const c=t.nodes.find(h=>h.id===a.targetId)??t.buildings.find(h=>h.id===a.targetId)??t.units.find(h=>h.id===a.targetId);c&&(a.activity==="gathering"||a.activity==="building"||a.activity==="repairing"||a.activity==="attacking")&&(l.rotation.y=Math.atan2(c.x-l.position.x,c.z-l.position.z)),l.userData.bar||this.addHealthBar(l,a.id),this.updateHealthBar(a.id,a.hp,a.maxHp)}for(const[a,l]of this.unitMeshes)if(!e.has(a)){this.scene.remove(l);const c=this.hpBars.get(a);c&&this.scene.remove(c),this.hpBars.delete(a);const h=this.selectionRings.get(a);h&&this.scene.remove(h),this.selectionRings.delete(a),this.unitMeshes.delete(a)}const n=new Set;for(const a of t.buildings){n.add(a.id);let l=this.buildingMeshes.get(a.id);const c=l&&l.userData.done===!1&&a.done,h=(l==null?void 0:l.userData.recruiting)&&!a.recruitment,d=l?Math.max(0,(a.goldProduced??0)-(l.userData.goldProduced??a.goldProduced??0)):0;l&&(l.userData.done!==a.done||a.kind==="wall"&&l.userData.level!==a.level)&&(this.scene.remove(l),l=void 0),l||(l=px(a.kind,a.owner,a.done,a.level),this.unitReveal.apply(l),a.kind==="wall"&&mx(l,a.x,a.z),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),this.buildingMeshes.set(a.id,l),this.scene.add(l),l.userData.pick={buildingId:a.id}),l.userData.kind=a.kind,l.userData.hp=a.hp,l.userData.maxHp=a.maxHp,l.userData.done=a.done,l.userData.level=a.level,l.userData.goldProduced=a.goldProduced??0,l.userData.recruiting=!!a.recruitment,h&&this.floatingText("Peão pronto",l.position.clone().add(new R(0,5,0)),"#c0e4a7"),a.lastShot&&a.lastShot.tick!==l.userData.lastShotTick&&((l.userData.lastShotTick!==void 0||t.tick-a.lastShot.tick<=2)&&this.towerShotEffect(l,a.lastShot),l.userData.lastShotTick=a.lastShot.tick),d>0&&this.productionEffect(l.position,d),c&&(this.floatingText("Obra concluída",l.position.clone().add(new R(0,5,0)),"#c0e4a7"),this.dustEffect(l.position,"#bca77f")),l.scale.y=a.done?1:Math.max(.15,a.progress),l.userData.bar?this.hpBars.has(a.id)||this.hpBars.set(a.id,l.userData.bar):this.addBuildingHealthBar(l,a.id,a.kind),l.userData.bar=this.hpBars.get(a.id),this.updateHealthBar(a.id,a.hp,a.maxHp)}for(const[a,l]of this.buildingMeshes)if(!n.has(a)){this.scene.remove(l),this.buildingMeshes.delete(a);const c=this.hpBars.get(a);c&&this.scene.remove(c),this.hpBars.delete(a)}const i=new Set,r=t.nodes.filter(a=>a.kind==="wood");this.syncWoodNodes(r);for(const a of t.nodes){if(a.kind==="wood"){i.add(a.id);continue}i.add(a.id);let l=this.nodeMeshes.get(a.id);l||(l=gx(a.kind),this.unitReveal.apply(l),l.position.set(a.x,this.heightAt(a.x,a.z),a.z),l.userData.x=a.x,l.userData.z=a.z,l.userData.nodeId=a.id,l.userData.pick={nodeId:a.id},this.nodeMeshes.set(a.id,l),this.scene.add(l));const c=a.amount/a.maxAmount;l.scale.setScalar(.4+.6*c)}for(const[a,l]of this.nodeMeshes)i.has(a)||(this.dustEffect(l.position,"#9b8c69"),this.scene.remove(l),this.nodeMeshes.delete(a))}syncWoodNodes(t){const e=t.map(f=>f.id).join(",");if(e===this.woodKey)return;this.woodKey=e,this.woodTrunks&&(this.scene.remove(this.woodTrunks),this.woodTrunks.geometry.dispose(),this.woodTrunks.material.dispose(),this.woodTrunks=null),this.woodCrowns&&(this.scene.remove(this.woodCrowns),this.woodCrowns.geometry.dispose(),this.woodCrowns.material.dispose(),this.woodCrowns=null);const n=3,i=[],r=new Es(new Yn(.19,.35,3,7),new sn({color:4799281}),Math.max(1,t.length*n)),o=new Es(Rh(),new sn({vertexColors:!0,side:Pe}),Math.max(1,t.length*n));r.castShadow=!0,o.castShadow=!0,this.unitReveal.apply(r),this.unitReveal.apply(o);const a=new te,l=new ss,c=new R,h=new R,d=new R(0,1,0);let u=0;for(const f of t){const g=this.heightAt(f.x,f.z);for(let v=0;v<n;v++){const m=f.id*2.4+v*2.1,p=.75+(f.id*13+v*7)%9/9*.45;l.setFromAxisAngle(d,m),c.set(p*.88,p,p*.88),h.set(f.x+Math.sin(m)*1.7,g+1.5*p,f.z+Math.cos(m)*1.7),a.compose(h,l,c),r.setMatrixAt(u,a),h.set(f.x+Math.sin(m)*1.7,g+2.1*p,f.z+Math.cos(m)*1.7),a.compose(h,l,c),o.setMatrixAt(u,a),i.push(f.id),u++}}r.count=u,o.count=u,r.instanceMatrix.needsUpdate=!0,o.instanceMatrix.needsUpdate=!0,r.userData.woodNodeIds=i,o.userData.woodNodeIds=i,this.woodTrunks=r,this.woodCrowns=o,this.scene.add(r,o)}addHealthBar(t,e){const n=new qt(new pn(1.4,.18),new Ne({color:3857242,depthTest:!1,transparent:!0}));n.renderOrder=20,n.position.y=4.4,this.scene.add(n),this.hpBars.set(e,n),t.userData.bar=n}addBuildingHealthBar(t,e,n){const i=this.hpBars.get(e);if(i){t.userData.bar=i;return}const r=n==="wall"?2.4:n==="tower"?3.2:5,o=new qt(new pn(r,.35),new Ne({color:3857242,depthTest:!1,transparent:!0}));o.renderOrder=20,this.scene.add(o),this.hpBars.set(e,o),t.userData.bar=o}updateHealthBar(t,e,n){const i=this.hpBars.get(t);if(!i)return;const r=n>0?Math.max(0,e/n):0;i.scale.x=Math.max(.01,r),i.material.color.setHex(r>.5?3857242:r>.25?14397754:14367290)}buildingBarHeight(t){switch(t){case"wall":return 4.6;case"tower":return 9.2;case"bank":return 7.8;case"keep":return 10.2;case"taverna":return 8.2;case"crypt":return 11.5;case"forge":return 6.6;case"relic":return 8.4;case"mist":return 7.2;case"shrine":return 7.4;default:return 8}}sizeLabel(t){const e=2*Math.tan(di.degToRad(this.camera.fov/2))/this.container.clientHeight;t.scale.set(180*e,32*e,1)}addEffect(t,e,n,i=!1,r){this.effects.length>=100&&this.disposeEffect(this.effects.shift().object),this.scene.add(t),this.effects.push({object:t,velocity:e,lifetime:n,age:0,spin:i,onComplete:r})}disposeEffect(t){this.scene.remove(t),t.traverse(e=>{var n;if(e instanceof qt&&e.geometry.dispose(),e instanceof qt||e instanceof Eo){const i=Array.isArray(e.material)?e.material:[e.material];for(const r of i)(n=r.map)==null||n.dispose(),r.dispose()}})}towerShotEffect(t,e){const n=t.position.clone().add(new R(0,7.2,0)),i=new R(e.x,this.heightAt(e.x,e.z)+1.3,e.z),r=t.getObjectByName("turret");r&&(r.rotation.y=Math.atan2(e.x-t.position.x,e.z-t.position.z));const o=new Be;o.userData.effect="tower-shot";const a=new qt(new Dn(.09,.09,1.5),new Ne({color:"#ffdb91"})),l=new qt(new ve(.18,.4,4),new Ne({color:"#e8f2ff"}));l.rotation.x=Math.PI/2,l.position.z=.9,o.add(a,l),o.position.copy(n),o.lookAt(i);const c=di.clamp(n.distanceTo(i)/40,.12,.5);this.addEffect(o,i.clone().sub(n).divideScalar(c),c,!1,()=>this.floatingText(`−${e.damage} HP`,i,"#ff8585"))}floatingText(t,e,n){const i=document.createElement("canvas");i.width=512,i.height=96;const r=i.getContext("2d");r.font="bold 46px system-ui",r.textAlign="center",r.lineWidth=6,r.strokeStyle="#111821",r.strokeText(t,256,63),r.fillStyle=n,r.fillText(t,256,63);const o=new rg(i);o.colorSpace=$e;const a=new Eo(new lh({map:o,transparent:!0,depthTest:!1,sizeAttenuation:!1,toneMapped:!1}));a.userData.feedback=t,this.sizeLabel(a),a.position.copy(e),this.addEffect(a,new R(0,1.8,0),1.8)}productionEffect(t,e){this.floatingText(`+${e} ouro`,t.clone().add(new R(0,8,0)),"#ffe48b");for(let n=0;n<Math.min(3,e+1);n++){const i=new qt(new Yn(.3,.3,.08,12),new Ne({color:"#f8ca4f",transparent:!0}));i.position.copy(t).add(new R((n-1)*.6,7,0)),i.rotation.x=Math.PI/2,this.addEffect(i,new R((n-1)*.4,2+n*.2,0),1.5,!0)}}dustEffect(t,e){for(let n=0;n<6;n++){const i=n*Math.PI/3,r=new qt(new ks(.35),new Ne({color:e,transparent:!0,opacity:.6,depthWrite:!1}));r.position.copy(t).add(new R(0,.5,0)),this.addEffect(r,new R(Math.sin(i)*1.5,.8,Math.cos(i)*1.5),1.2)}}setSelection(t){for(const[,e]of this.selectionRings)this.scene.remove(e),e.geometry.dispose(),e.material.dispose();this.selectionRings.clear();for(const e of t){const n=this.unitMeshes.get(e);if(!n)continue;const i=n.userData.kind==="vampire",r=new qt(new li(.9,1.15,24),new Ne({color:i?14363178:3857290,transparent:!0,opacity:.8,side:Pe}));r.rotation.x=-Math.PI/2,r.position.copy(n.position).add(new R(0,.15,0)),this.scene.add(r),this.selectionRings.set(e,r)}}setBuildingSelection(t){this.setTowerRange("selection",null),this.buildingSelection&&(this.scene.remove(this.buildingSelection),this.buildingSelection.geometry.dispose(),this.buildingSelection.material.dispose(),this.buildingSelection=null);const e=t===null?void 0:this.buildingMeshes.get(t);if(!e)return;const n=gi[e.userData.kind]/2+.3,i=[[-n,-n],[n,-n],[n,n],[-n,n]].map(([r,o])=>new R(e.position.x+r,this.heightAt(e.position.x+r,e.position.z+o)+.2,e.position.z+o));this.buildingSelection=new sg(new xe().setFromPoints(i),new hh({color:7001855,depthTest:!1})),this.scene.add(this.buildingSelection),e.userData.kind==="tower"&&this.setTowerRange("selection",e.position)}setTowerRange(t,e,n=8375039){let i=this.towerRanges.get(t);if(!e){i&&(this.scene.remove(i),i.geometry.dispose(),i.material.dispose(),this.towerRanges.delete(t));return}if(!i){const a=new li(Hi.range-.1,Hi.range+.1,128);a.rotateX(-Math.PI/2),i=new qt(a,new Ne({color:n,transparent:!0,opacity:.85,side:Pe,depthWrite:!1,depthTest:!1})),i.renderOrder=10,this.scene.add(i),this.towerRanges.set(t,i)}i.material.color.setHex(n);const r=`${e.x}:${e.z}`;if(i.userData.center===r)return;i.userData.center=r,i.position.set(e.x,0,e.z);const o=i.geometry.getAttribute("position");for(let a=0;a<o.count;a++)o.setY(a,this.heightAt(e.x+o.getX(a),e.z+o.getZ(a))+.16);o.needsUpdate=!0,i.geometry.computeBoundingSphere()}unitScreenPosition(t){const e=this.unitMeshes.get(t);return e?(this.camera.updateMatrixWorld(!0),e.position.clone().add(new R(0,e.userData.kind==="vampire"?1.8:1,0)).project(this.camera)):null}updateDayNight(t,e,n){const i=new It(8893920),r=new It(658719),o=new It(12611664),a=t==="day"?Sh:wh,l=a-e,c=Math.min(1,l/a),h=new It;if(t==="day"){c<.15?h.copy(o).lerp(i,c/.15):c>.85?h.copy(i).lerp(o,(c-.85)/.15):h.copy(i);const d=c*Math.PI;this.sun.position.set(Math.cos(d)*120,Math.max(10,Math.sin(d)*140),40),this.sun.intensity=1.6*Math.max(.2,Math.sin(d)),this.sun.color.setHex(c>.8?16756864:16772812),this.hemi.intensity=1.4,this.fog.near=120,this.fog.far=400}else h.copy(r),this.sun.position.set(-80,100,-60),this.sun.color.setHex(9084120),this.sun.intensity=.35,this.hemi.intensity=.25,this.fog.near=40,this.fog.far=180;if(this.fog.color.copy(h),this.scene.background=h,t==="night"&&this.torches.length===0)for(let d=0;d<6;d++){const u=new zg(16752688,0,26,1.8);this.torches.push(u),this.scene.add(u)}for(let d=0;d<this.torches.length;d++){const u=this.torches[d],f=[...this.buildingMeshes.values()].filter(v=>v.userData.done&&!["crypt","forge","relic","mist","shrine"].includes(v.userData.kind));if(f.length===0)continue;const g=f[d%f.length];u.position.set(g.position.x,this.heightAt(g.position.x,g.position.z)+4,g.position.z),u.intensity=t==="night"?12+Math.sin(this.renderer.info.render.frame*.2+d)*3:0}}screenToGround(t,e){var n;return this.camera.updateMatrixWorld(!0),this.terrain.updateMatrixWorld(!0),this.raycaster.setFromCamera(new K(t,e),this.camera),((n=this.raycaster.intersectObject(this.terrain,!1)[0])==null?void 0:n.point)??null}pickAt(t,e){this.camera.updateMatrixWorld(!0),this.scene.updateMatrixWorld(!0),this.raycaster.setFromCamera(new K(t,e),this.camera);const n=this.raycaster.intersectObjects([...this.unitMeshes.values()],!0)[0];if(n){for(let c=n.object;c;c=c.parent)if(c.userData.pick)return c.userData.pick}const i=this.renderer.domElement.getBoundingClientRect();let r=10,o;for(const[c]of this.unitMeshes){const h=this.unitScreenPosition(c);if(h.z<-1||h.z>1)continue;const d=Math.hypot((h.x-t)*i.width/2,(h.y-e)*i.height/2);d<r&&(r=d,o=c)}if(o!==void 0)return{unitId:o};const l=this.raycaster.intersectObjects([...this.buildingMeshes.values(),...this.nodeMeshes.values(),...this.woodTrunks?[this.woodTrunks,this.woodCrowns]:[],...this.mapOccluders,this.terrain],!0)[0];if(l){const c=l.object.userData.woodNodeIds;if(c&&l.instanceId!==void 0){const h=c[l.instanceId];if(h!==void 0)return{nodeId:h}}if(l.object!==this.terrain){for(let h=l.object;h;h=h.parent)if(h.userData.pick)return h.userData.pick}}return{}}render(t){var e;this.animationTime+=t;for(let n=this.effects.length-1;n>=0;n--){const i=this.effects[n];if(i.age+=t,i.age>=i.lifetime){this.disposeEffect(i.object),this.effects.splice(n,1),(e=i.onComplete)==null||e.call(i);continue}i.object.position.addScaledVector(i.velocity,t),i.spin&&(i.object.rotation.z+=t*5),i.object.traverse(r=>{if(r instanceof qt||r instanceof Eo){const o=Array.isArray(r.material)?r.material:[r.material];for(const a of o)a.transparent&&(a.opacity=Math.min(1,(i.lifetime-i.age)*2))}})}for(const n of this.buildingMeshes.values()){const i=n.getObjectByName("tavernSign");i&&(i.rotation.z=Math.sin(this.animationTime*1.8+n.position.x)*.08)}for(const n of this.unitMeshes.values()){const i=n.userData.tx??n.position.x,r=n.userData.tz??n.position.z,o=i-n.position.x,a=r-n.position.z,l=n.userData.activity==="moving"&&Math.hypot(o,a)>.015,c=["gathering","building","repairing","attacking"].includes(n.userData.activity);l&&(n.rotation.y=Math.atan2(o,a));const h=Math.sin(this.animationTime*(c?11:9));for(const[m,p]of[["leftLeg",1],["rightLeg",-1]]){const M=n.getObjectByName(m);M&&(M.rotation.x=l?h*.6*p:0)}const d=n.getObjectByName("leftArm"),u=n.getObjectByName("rightArm");d&&(d.rotation.x=l?-h*.45:c?-.5:0),u&&(u.rotation.x=c?-.85+h*.6:l?h*.35:-.15);const f=n.getObjectByName("tool");f&&(f.rotation.z=c?Math.PI-.1:-2.25,f.rotation.x=0);for(const m of["axe","pickaxe","hammer"]){const p=n.getObjectByName(m);p&&(p.visible=m===(n.userData.activity==="building"||n.userData.activity==="repairing"?"hammer":n.userData.resource==="gold"?"pickaxe":"axe"))}const g=n.getObjectByName("cloak");g&&(g.rotation.x=l?-.1+Math.sin(this.animationTime*5)*.055:Math.sin(this.animationTime*1.8)*.015,g.rotation.z=Math.sin(this.animationTime*(l?4:1.4))*(l?.025:.008)),n.position.x+=(i-n.position.x)*Math.min(1,t*10),n.position.z+=(r-n.position.z)*Math.min(1,t*10),n.position.y=this.heightAt(n.position.x,n.position.z);const v=n.userData.bar;v&&(v.position.set(n.position.x,n.position.y+(n.userData.healthBarHeight??4.4),n.position.z),v.quaternion.copy(this.camera.quaternion))}for(const n of this.buildingMeshes.values()){const i=n.userData.bar;i&&(i.position.set(n.position.x,n.position.y+(n.userData.healthBarHeight??this.buildingBarHeight(n.userData.kind))*n.scale.y,n.position.z),i.quaternion.copy(this.camera.quaternion))}for(const[n,i]of this.selectionRings){const r=this.unitMeshes.get(n);r&&i.position.set(r.position.x,r.position.y+.15,r.position.z)}this.unitReveal.update(this.renderer,this.camera,this.unitMeshes),this.renderer.render(this.scene,this.camera)}}class _x{constructor(t,e,n,i,r,o){ot(this,"selected",[]);ot(this,"selectedBuilding",null);ot(this,"inspectedUnit",null);ot(this,"buildMode",null);ot(this,"ghost",null);ot(this,"buildPointer",null);ot(this,"buildTarget",null);ot(this,"buildValid",!1);ot(this,"dragStart",null);ot(this,"dragBox");ot(this,"keys",new Set);ot(this,"camTarget",new R(0,0,0));ot(this,"zoom",ze.initialZoom);this.scene=t,this.net=e,this.container=n,this.getMyId=i,this.getSnap=r,this.onSelectionChanged=o,this.dragBox=document.createElement("div"),this.dragBox.style.cssText=`
      position: fixed; display: none; border: 2px solid #6ad66a;
      background: rgba(106, 214, 106, 0.12); pointer-events: none; z-index: 10;
    `,document.body.appendChild(this.dragBox),window.addEventListener("keydown",l=>{l.target.matches("input, textarea, select")||(this.keys.add(l.key.toLowerCase()),l.key.toLowerCase()==="escape"&&this.cancelBuild())}),window.addEventListener("keyup",l=>this.keys.delete(l.key.toLowerCase())),window.addEventListener("blur",()=>{this.keys.clear(),this.dragStart=null,this.dragBox.style.display="none"}),this.scene.renderer.domElement.addEventListener("wheel",l=>{l.preventDefault(),this.zoom=di.clamp(this.zoom+l.deltaY*ze.wheelSensitivity,ze.minZoom,ze.maxZoom)},{passive:!1});const a=this.scene.renderer.domElement;a.addEventListener("pointerdown",l=>this.onDown(l)),a.addEventListener("pointermove",l=>this.onMove(l)),a.addEventListener("pointerleave",()=>{this.buildPointer=null,this.updateBuildPreview()}),a.addEventListener("pointerup",l=>this.onUp(l)),a.addEventListener("pointercancel",()=>{this.dragStart=null,this.dragBox.style.display="none"}),a.addEventListener("contextmenu",l=>l.preventDefault())}updateCamera(t){const e=ze.panSpeed*t*this.zoom,n=this.keys;(n.has("w")||n.has("arrowup"))&&(this.camTarget.z-=e),(n.has("s")||n.has("arrowdown"))&&(this.camTarget.z+=e),(n.has("a")||n.has("arrowleft"))&&(this.camTarget.x-=e),(n.has("d")||n.has("arrowright"))&&(this.camTarget.x+=e);const i=ae.half-1;this.camTarget.x=di.clamp(this.camTarget.x,-i,i),this.camTarget.z=di.clamp(this.camTarget.z,-i,i),this.camTarget.y=this.scene.heightAt(this.camTarget.x,this.camTarget.z);const r=ze.distance*this.zoom,o=this.scene.camera,a=new R(this.camTarget.x,this.camTarget.y+r*ze.elevation,this.camTarget.z+r*ze.depth);o.position.lerp(a,Math.min(1,t*ze.smoothing)),o.lookAt(this.camTarget)}focusOn(t,e){this.camTarget.set(t,this.scene.heightAt(t,e),e)}ndc(t){const e=this.scene.renderer.domElement.getBoundingClientRect();return{x:(t.clientX-e.left)/e.width*2-1,y:-((t.clientY-e.top)/e.height)*2+1}}onDown(t){if(t.preventDefault(),t.button===0){if(this.buildMode){this.placeBuild(t);return}this.dragStart={x:t.clientX,y:t.clientY},this.scene.renderer.domElement.setPointerCapture(t.pointerId)}else t.button===2&&this.rightClick(t)}onMove(t){if(this.buildMode&&this.ghost&&(this.buildPointer={clientX:t.clientX,clientY:t.clientY},this.updateBuildPreview()),this.dragStart){const e=Math.min(this.dragStart.x,t.clientX),n=Math.min(this.dragStart.y,t.clientY),i=Math.abs(t.clientX-this.dragStart.x),r=Math.abs(t.clientY-this.dragStart.y);this.dragBox.style.cssText+=`display:block; left:${e}px; top:${n}px; width:${i}px; height:${r}px;`}}onUp(t){if(this.scene.renderer.domElement.hasPointerCapture(t.pointerId)&&this.scene.renderer.domElement.releasePointerCapture(t.pointerId),this.dragBox.style.display="none",!this.dragStart||t.button!==0){this.dragStart=null;return}const e=this.dragStart;this.dragStart=null;const n=Math.hypot(t.clientX-e.x,t.clientY-e.y)>8,i=this.getSnap();if(!i)return;const r=this.getMyId();if(this.selectedBuilding=null,this.inspectedUnit=null,n){const o=this.scene.renderer.domElement.getBoundingClientRect(),a=Math.min(e.x,t.clientX),l=Math.max(e.x,t.clientX),c=Math.min(e.y,t.clientY),h=Math.max(e.y,t.clientY);t.shiftKey||(this.selected=[]);for(const d of i.units){if(d.owner!==r)continue;const u=this.scene.unitScreenPosition(d.id);if(!u||u.z<-1||u.z>1)continue;const f=o.left+(u.x+1)/2*o.width,g=o.top+(1-u.y)/2*o.height;f>=a&&f<=l&&g>=c&&g<=h&&!this.selected.includes(d.id)&&this.selected.push(d.id)}}else{const o=this.ndc(t),a=this.scene.pickAt(o.x,o.y);if(a.unitId!==void 0){const l=i.units.find(c=>c.id===a.unitId);l&&l.owner===r?this.selected=t.shiftKey?this.selected.includes(l.id)?this.selected.filter(c=>c!==l.id):[...this.selected,l.id]:[l.id]:(this.selected=[],this.inspectedUnit=(l==null?void 0:l.id)??null)}else this.selected=[],this.selectedBuilding=a.buildingId??null}this.scene.setSelection(this.inspectedUnit===null?this.selected:[this.inspectedUnit]),this.scene.setBuildingSelection(this.selectedBuilding),this.onSelectionChanged()}rightClick(t){if(this.buildMode){this.cancelBuild();return}if(this.selected.length===0)return;const e=this.getSnap();if(!e)return;const n=this.ndc(t),i=this.scene.pickAt(n.x,n.y);if(i.nodeId!==void 0&&this.getMyId()!==Xe){this.net.command({type:"gather",ids:this.selected,nodeId:i.nodeId});return}if(i.unitId!==void 0){const o=e.units.find(a=>a.id===i.unitId);if(o&&o.owner===Xe!=(this.getMyId()===Xe)){this.net.command({type:"attack",ids:this.selected,targetId:i.unitId});return}}if(i.buildingId!==void 0){const o=e.buildings.find(a=>a.id===i.buildingId);if(o&&o.owner>=0&&o.owner===Xe!=(this.getMyId()===Xe)){this.net.command({type:"attack",ids:this.selected,targetId:i.buildingId});return}if(o&&!o.done&&o.owner===this.getMyId()){this.net.command({type:"resumeBuild",ids:this.selected,targetId:o.id});return}if(o&&o.done&&o.kind==="wall"&&o.owner===this.getMyId()&&o.hp<o.maxHp){this.net.command({type:"repair",ids:this.selected,targetId:o.id});return}if(o){const a=e.units.find(l=>this.selected.includes(l.id));if(a){const l=gi[o.kind]/2+2,c=a.x-o.x,h=a.z-o.z,d=Math.abs(c)>Math.abs(h)?o.x+Math.sign(c||1)*l:o.x,u=Math.abs(c)>Math.abs(h)?o.z:o.z+Math.sign(h||1)*l;this.net.command({type:"move",ids:this.selected,x:d,z:u})}return}}const r=this.scene.screenToGround(n.x,n.y);r&&this.net.command({type:"move",ids:this.selected,x:r.x,z:r.z})}enterBuild(t){const e=this.getSnap();if(!(e!=null&&e.units.some(r=>r.owner===this.getMyId()&&r.kind==="worker"&&this.selected.includes(r.id))))return;this.cancelBuild(),this.buildMode=t;const n=gi[t],i=t==="tower"?new Yn(n/2.4,n/2,6,8):new Dn(n,3,n);this.ghost=new qt(i,new Ne({color:7001706,transparent:!0,opacity:.45,depthWrite:!1,depthTest:!1})),this.ghost.visible=!1,this.ghost.renderOrder=11,this.scene.scene.add(this.ghost)}updateBuildPreview(){if(!this.buildMode||!this.ghost)return;const t=this.getSnap(),e=this.buildPointer&&this.ndc(this.buildPointer),n=e&&this.scene.screenToGround(e.x,e.y);if(this.buildValid=!1,this.buildTarget=null,!n||!t){this.ghost.visible=!1,this.scene.setTowerRange("placement",null);return}const i=Math.round(n.x),r=Math.round(n.z);this.buildTarget={x:i,z:r};const o=t.players.find(h=>h.id===this.getMyId()),a=Ca[this.buildMode],l=t.units.some(h=>h.owner===this.getMyId()&&h.kind==="worker"&&this.selected.includes(h.id));this.buildValid=!!o&&!t.result&&l&&o.wood>=a.wood&&o.gold>=a.gold&&sx(this.scene.map,t,this.buildMode,i,r);const c=this.buildValid?7001706:16730955;this.ghost.material.color.setHex(c),this.ghost.visible=!0,this.ghost.position.set(i,this.scene.heightAt(i,r)+(this.buildMode==="tower"?3:1.5),r),this.scene.setTowerRange("placement",this.buildMode==="tower"?this.buildTarget:null,c)}cancelBuild(){this.ghost&&(this.scene.scene.remove(this.ghost),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.ghost=null),this.buildMode=null,this.buildPointer=null,this.buildTarget=null,this.buildValid=!1,this.scene.setTowerRange("placement",null)}placeBuild(t){this.buildMode&&(this.buildPointer={clientX:t.clientX,clientY:t.clientY},this.updateBuildPreview(),!(!this.buildValid||!this.buildTarget)&&(this.net.command({type:"build",ids:this.selected,kind:this.buildMode,x:this.buildTarget.x,z:this.buildTarget.z}),this.cancelBuild()))}buildable(){return[...Eh]}update(t){const e=this.getSnap();if(e){const n=this.selected.filter(i=>e.units.some(r=>r.id===i&&r.owner===this.getMyId()));n.length!==this.selected.length&&(this.selected=n,this.scene.setSelection(n),this.onSelectionChanged()),this.selectedBuilding!==null&&!e.buildings.some(i=>i.id===this.selectedBuilding)&&(this.selectedBuilding=null,this.scene.setBuildingSelection(null),this.onSelectionChanged()),this.inspectedUnit!==null&&!e.units.some(i=>i.id===this.inspectedUnit)&&(this.inspectedUnit=null,this.scene.setSelection(this.selected),this.onSelectionChanged())}this.updateCamera(t),this.updateBuildPreview()}}function ui(s){return`<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="portrait-bg-${s}"><stop stop-color="${s?"#752231":"#244e65"}"/><stop offset="1" stop-color="#090c13"/></radialGradient></defs>
    <path fill="url(#portrait-bg-${s})" d="M0 0h140v160H0z"/>
    <path fill="#080b10" d="M4 160 16 105 34 93 32 44 55 17 87 14 112 40 107 102 131 124 140 160Z"/>
    <path fill="${s?"#241d35":"#18394b"}" stroke="#435060" d="M9 160 27 106 49 98 72 117 92 95 116 108 136 160Z"/>
    <path fill="${s?"#a8b8c7":"#b78e6e"}" d="m46 54 17-21 27 8 12 26-8 33-21 18-21-25Z"/>
    <path fill="${s?"#6f8296":"#87644c"}" d="m74 47 17-6 11 26-8 33-21 18 6-26-8-8Z"/>
    <path fill="#10141e" d="m31 68 5-26 25-24 30-1 18 21-6 33-11-25-18-8-24 31 5-21Z"/>
    <path fill="${s?"#df343e":"#ccd8c1"}" d="m53 72 15 2-6 4-8-2Zm27 3 15-7-2 7-10 3Z"/>
    <path stroke="#252c38" stroke-width="2" fill="none" d="m73 72-5 16 10 1m-18 8 20 1"/>
    ${s?'<path fill="#e2e6e6" d="m61 98 3 7 3-7m9 0 3 6 2-6"/>':'<path fill="#3a2d29" d="m55 92 6 7 17 2 13-8-6 13-12 9-12-6Z"/>'}
    <path fill="${s?"#781f32":"#466378"}" stroke="#657180" d="m24 98 30 12 17 42-31-27Zm85-3-23 16-15 41 29-25Z"/>
    <path stroke="#9d7b4a" stroke-width="2" d="m61 145 23 0"/><path fill="#ad893e" d="m69 140 6 0 3 6-6 6-6-6Z"/>
  </svg>`}function Mx(){return`<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  </svg>`}function Ts(s){return s==="gold"?{icon:"🪙",name:"ouro"}:{icon:"🪵",name:"madeira"}}function yx(s,t){var n;const e=Ts(s.carryRes??((n=t.nodes.find(i=>i.id===s.targetId))==null?void 0:n.kind));switch(s.activity){case"gathering":return`Coletando ${e.name}`;case"building":return"Construindo";case"repairing":return"Reparando muro";case"attacking":return"Atacando";case"blocked":return"Sem caminho — escolha outra ordem";case"moving":return s.orderType==="gather"?`Indo coletar ${e.name}`:s.orderType==="build"?"Indo construir":s.orderType==="repair"?"Indo reparar":s.orderType==="attack"?"Indo atacar":"Movendo";default:return"Aguardando ordem"}}class bx{constructor(t,e){ot(this,"el",document.createElement("details"));ot(this,"amount");const n=document.createElement("style");n.textContent=`
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
      <input id="admin-amount" type="number" min="1" max="${Wt.admin.maxResourceAmount}" step="1" value="${Wt.admin.defaultResourceAmount}" required>
      <div class="vxh-admin-actions"><button data-admin="gold">+ Ouro</button><button data-admin="wood">+ Madeira</button><button data-admin="blood">+ Sangue</button>
      <button data-admin="day">Dia</button><button data-admin="night">Noite</button><button data-admin="heal">Curar unidades</button></div></div>`,this.amount=this.el.querySelector("input"),this.el.addEventListener("click",i=>{var o;const r=(o=i.target.closest("[data-admin]"))==null?void 0:o.dataset.admin;if(r)if(r==="gold"||r==="wood"){if(!this.amount.reportValidity())return;const a=this.amount.valueAsNumber;e.command({type:"admin",action:"resources",wood:r==="wood"?a:0,gold:r==="gold"?a:0})}else if(r==="blood"){if(!this.amount.reportValidity())return;e.command({type:"admin",action:"blood",amount:this.amount.valueAsNumber})}else r==="day"||r==="night"?e.command({type:"admin",action:"phase",phase:r}):r==="heal"&&e.command({type:"admin",action:"heal"})}),t.appendChild(this.el)}update(t){this.el.hidden=!t.practice;for(const e of["day","night"])this.el.querySelector(`[data-admin="${e}"]`).setAttribute("aria-pressed",String(t.phase===e))}}const Sx='.vxh-hud{--gold: #ba9458;--gold-hi: #f1d99d;--faction: #234e71;--faction-dark: #101d2c}.vxh-hud[data-faction=vampire]{--faction: #782337;--faction-dark: #260e19}.vxh-bottom{height:236px;left:16px;right:16px;bottom:16px;gap:14px;grid-template-columns:230px 184px minmax(300px,1fr) 240px;grid-template-areas:"map portrait commands sheet"}.vxh-frame{border:3px double #b18b50;border-radius:3px;background:linear-gradient(135deg,#14202b,#080e16 55%,#0c131b);box-shadow:inset 0 0 0 3px #05080d,inset 0 0 0 4px #55442e,0 0 0 2px #16100b,0 4px 12px #0009}.vxh-frame:before,.vxh-frame:after{width:20px;height:20px;transform:none;border:0;background:linear-gradient(135deg,#fae5b2,#896038 48%,#d8b777 50%,#463222 70%);clip-path:polygon(0 0,100% 0,65% 25%,95% 60%,60% 95%,25% 65%,0 100%,0 0,22% 22%,22% 58%,58% 22%,22% 22%);box-shadow:none}.vxh-frame:before{top:-7px;left:-7px}.vxh-frame:after{bottom:-7px;right:-7px;transform:rotate(180deg)}.vxh-mapframe{grid-area:map;margin-top:-16px;padding:9px 9px 24px}.vxh-mapframe:after{content:"";width:20px;height:20px;left:auto;padding:0;border:0}.vxh-map-caption{position:absolute;bottom:4px;left:0;right:0;text-align:center;color:var(--gold-hi);font-size:11px;letter-spacing:2px}.vxh-compass{position:absolute;top:-20px;left:calc(50% - 16px);width:32px;height:32px;background:#0b141f;border:3px double #bc975c;transform:rotate(45deg);z-index:3}.vxh-compass span{display:block;transform:rotate(-45deg);text-align:center;line-height:28px;color:var(--gold-hi)}.vxh-minimap{border:1px solid #6c5635}.vxh-portrait{grid-area:portrait;padding:13px 12px 9px;gap:6px;background:linear-gradient(140deg,var(--faction-dark),#080e16 70%)}.vxh-portrait-art{width:108px;flex:1;max-height:124px;border:3px double #967447;background:#080d15}.vxh-portrait .name{color:#f1dfb5;font-size:15px;letter-spacing:.6px}.vxh-crest{position:absolute;top:0;right:12px;width:34px;height:68px;display:grid;place-items:center;clip-path:polygon(0 0,100% 0,100% 76%,50% 100%,0 76%);background:#b99054;padding:2px}.vxh-crest span{display:grid;place-items:center;width:100%;height:100%;font-size:27px;color:#efcf84;background:linear-gradient(90deg,var(--faction-dark),var(--faction),var(--faction-dark));clip-path:polygon(0 0,100% 0,100% 75%,50% 97%,0 75%)}.vxh-crest svg{width:28px;height:34px}.vxh-statbar{height:16px;flex-shrink:0;border:1px solid #8e7948;border-radius:2px}.vxh-hud[data-faction=vampire] .healthbar>i{background:linear-gradient(#bb334e,#641c2e)}.vxh-commands{grid-area:commands;display:flex;flex-direction:column;min-width:0;padding:7px 9px 9px}.vxh-commands-heading{display:flex;align-items:center;gap:10px;height:24px;flex-shrink:0;color:var(--gold-hi);font-size:11px;letter-spacing:3px;white-space:nowrap;justify-content:center}.vxh-commands-heading:before,.vxh-commands-heading:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,#9c7746)}.vxh-commands-heading:after{transform:rotate(180deg)}.vxh-panel{flex:1;min-height:0;padding:7px 0 0;border:0;box-shadow:none;background:none;display:flex;flex-wrap:nowrap;align-items:stretch;justify-content:flex-start;gap:8px;overflow:auto;scrollbar-width:thin;scrollbar-color:#8b6b3f #0b1119}.vxh-panel>.vxh-btn{flex:1 0 96px;max-width:170px;min-width:0;padding:8px 6px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3px;border:3px double #947549;border-radius:3px;background:radial-gradient(ellipse at 50% 30%,var(--faction-dark),#080e16 80%);box-shadow:inset 0 0 0 2px #080b10;font:600 14px Georgia,serif;color:#eedcaf;line-height:1.15}.vxh-panel>.vxh-btn:hover:not(:disabled){border-color:#efd395;background:radial-gradient(ellipse at 50% 30%,var(--faction),#0c121b 85%)}.vxh-panel>.vxh-btn:disabled{border-color:#65563d;color:#b6b0a3}.vxh-panel>.vxh-btn.active{border-color:#d09461;box-shadow:inset 0 0 16px var(--faction)}.vxh-card-art{display:block;width:100%;height:78px;flex-shrink:0}.vxh-card-art svg{display:block;height:100%;width:100%}.vxh-btn:disabled .vxh-card-art{opacity:.65}.vxh-panel .vxh-btn small{font:12px/1.2 Georgia,serif;margin-top:1px}.vxh-panel .vxh-cost,.vxh-panel .vxh-item-price{padding-top:5px;margin-top:auto;border-top:1px solid #59472c;width:100%}.vxh-panel>span{flex:1;align-self:center;font-size:12px}.vxh-sheet{grid-area:sheet;padding:12px;overflow-y:auto;pointer-events:auto;scrollbar-width:thin;scrollbar-color:#8b6b3f #0b1119}.vxh-sheet-heading{font-size:10px;letter-spacing:2px;margin-bottom:9px;color:var(--gold)}.vxh-selinfo{font:12px/1.5 Georgia,serif;color:#c9c2b1}.vxh-selinfo b{display:block;font-size:16px;margin-bottom:5px;color:#edd49d}.vxh-inventory{gap:4px}.vxh-inventory>span{border-color:#705939;box-shadow:none;font-size:11px}.vxh-topbar,.vxh-clock,.vxh-hero{border:3px double #aa874f;border-radius:3px;background:linear-gradient(#14202a,#070d14);box-shadow:inset 0 0 0 2px #080c12,0 3px 8px #0008}.vxh-hero{top:14px;left:18px;width:76px;padding:5px}.vxh-hero-crest{position:absolute;bottom:-24px;left:23px;width:27px;height:28px;background:var(--faction);color:#e9c47d;border:1px solid #9e7e48;font-size:23px;clip-path:polygon(0 0,100% 0,100% 68%,50% 100%,0 68%)}.vxh-hero .vxh-hero-crest svg{width:25px;height:25px}.vxh-quit{border:2px solid #ae8450;color:#f2dca9}.vxh-hud .vxh-admin{border:3px double #a07a46;border-radius:2px;background:#080f18f5;font-family:Georgia,serif}.vxh-hud .vxh-admin summary{color:#eed29b}@media (max-width: 1200px){.vxh-bottom{grid-template-columns:180px 154px minmax(250px,1fr) 190px;gap:10px;height:218px}.vxh-portrait-art{width:87px}.vxh-crest{right:6px;width:28px}.vxh-card-art{height:60px}.vxh-commands-heading{font-size:9px;letter-spacing:2px}}@media (max-width: 900px){.vxh-bottom{grid-template-columns:154px 130px minmax(0,1fr);grid-template-areas:"map portrait commands"}.vxh-sheet{display:none}.vxh-crest{width:22px;height:46px;right:4px}.vxh-crest span{font-size:19px}.vxh-portrait{padding:9px 6px}.vxh-clock{font-size:12px;max-width:210px;text-align:center}}@media (max-width: 600px){.vxh-bottom{left:8px;right:8px;bottom:8px;height:184px;gap:8px;grid-template-columns:110px 100px minmax(0,1fr)}.vxh-portrait-art{width:66px}.vxh-portrait .name{font-size:12px}.vxh-mapframe{padding:6px 6px 24px;margin-top:0}.vxh-map-caption{font-size:8px;letter-spacing:.5px}.vxh-commands-heading{letter-spacing:0;font-size:8px}.vxh-panel>.vxh-btn{flex-basis:84px;font-size:12px}.vxh-card-art{height:44px}.vxh-hero{width:52px;left:8px}.vxh-hero svg{height:48px}.vxh-hero-crest{left:14px}.vxh-topbar{top:72px;right:8px}.vxh-clock{top:12px}.vxh-hud .vxh-admin{top:118px;right:8px}}',Pc={bank:'<path fill="#66503a" d="M18 42h60v37H18z"/><path fill="#b29463" d="M12 42l35-24 37 24-5 8H16z"/><path fill="#dbc092" d="M23 50h9v26h-9zm39 0h9v26h-9z"/><path fill="#19212b" d="M38 54h18v25H38z"/><path fill="#e6bd61" d="M45 61h5v9h-5z"/><path fill="#a58d6a" d="M13 79h69v7H13z"/>',taverna:'<path fill="#997349" d="M20 42h55v40H20z"/><path fill="#51362b" d="M11 44l38-31 36 31z"/><path fill="#d6ac6a" d="M25 51h13v16H25zm34 0h11v16H59z"/><path fill="#332721" d="M43 57h12v25H43z"/><path stroke="#503b2b" stroke-width="5" d="M20 46h56M22 43v39m52-39v39"/><path fill="#966329" d="M73 47h16v16H73z"/><path fill="#edc676" d="M77 51h7v8h-7z"/>',tower:'<path fill="#687984" d="M29 30h36l5 54H24z"/><path fill="#9babb2" d="M24 17h10v9h9v-9h10v9h9v-9h10v23H24z"/><path fill="#1d4b6c" d="M39 39h18v31l-9 8-9-8z"/><path fill="#d8b76e" d="M46 44h4v19h-4zm-4 7h12v4h-12z"/><path fill="#8a969a" d="M19 83h56v6H19z"/>',wall:'<path fill="#627584" d="M13 44l67-16v45L13 89z"/><path fill="#9fabb0" d="M10 34l14-3v12l12-3V28l14-3v12l12-3V22l18-4v17L10 52z"/><path stroke="#354652" stroke-width="2" d="M14 64l65-16M14 77l65-16M33 48v12m22-18v12M26 63v12m21-18v12m21-17v12"/><path fill="#245375" d="M46 43l14-3v26l-7 8-7-5z"/>',claws:'<path fill="#e4d8c6" d="M30 13l8 7-17 56-9 10zm23-3l7 9-22 64-10 7zm22 8l6 10-20 51-12 9z"/><path stroke="#b42b43" stroke-width="4" d="M23 60l-4 13m29-11l-6 16m27-20l-6 16"/>',heart:'<path fill="#ad304c" stroke="#e27d83" stroke-width="2" d="M48 79C7 49 11 23 28 22c10-1 15 6 20 14 6-10 13-16 22-13 24 8 10 37-22 56z"/><path fill="#ed9c9d" d="M22 35q1-13 14-6l-9 6-4 10z"/><path stroke="#66152b" stroke-width="3" fill="none" d="M50 35L39 48l17 4-11 16"/>',boots:'<path fill="#42364d" stroke="#b99a7a" stroke-width="2" d="M35 18h27l-5 38 21 14q7 12-6 14H27l-5-11 10-21z"/><path fill="#968277" d="M33 17h31v10H33zM24 76h52v8H27z"/><path stroke="#c1a778" stroke-width="3" d="M35 35h23m-24 9h22m-24 9h22"/>',frenzy:'<path fill="none" stroke="#c25b82" stroke-width="5" d="M77 56C85 23 45 9 25 30S24 83 53 79s30-35 10-43-32 14-18 24 25-5 13-11"/><path fill="#eed0da" d="M17 66l12 3-8 9zm57-45l5 13 8-8z"/>',powerStrike:'<path fill="#ad2949" d="M48 8l9 23 23-9-10 22 20 9-24 6 5 26-22-16-20 17 3-25-24-8 23-11-8-23 21 11z"/><path fill="#ebcba7" d="M63 20L36 48l9 6-13 26 30-32-11-6z"/>'};function Wn(s){return`<span class="vxh-card-art" aria-hidden="true"><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><ellipse cx="48" cy="85" rx="34" ry="5" fill="#000" opacity=".5"/>${Pc[s]??Pc.tower}</svg></span>`}function Lc(s){return s?'<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M23 18l-5-7 1 12L4 10l3 21 8-4 5 8 4 7 4-7 5-8 8 4 3-21-15 13 1-12-5 7z"/></svg>':"⚜"}const bs={keep:"Sede da vila",bank:"Banco",taverna:"Taverna",wall:"Muro",tower:"Torre",crypt:"Cripta do Vampiro",forge:"Forja de Sangue",relic:"Relicário Ancestral",mist:"Portal da Névoa",shrine:"Santuário do Frenesi"},wx={keep:"Base principal da vila.",bank:`Gera ${ts.goldPerCycle} de ouro por ciclo desde o nível 1. As melhorias reduzem o intervalo.`,taverna:"Recruta Peões auxiliares para coletar e construir.",wall:"Humanos atravessam; o vampiro precisa destruí-lo. Selecione para comprar e vender recursos.",tower:"Ataca o vampiro automaticamente quando ele entra no alcance.",crypt:"Base do Vampiro. Desbloqueie skills e consulte o inventário.",forge:"Loja das Garras Sangrentas: aumente o dano contra unidades e construções.",relic:"Loja do Coração Ancestral: aumente a vida máxima do Vampiro.",mist:"Loja das Botas da Névoa: aumente a velocidade de movimento.",shrine:"Loja do Frenesi: acelere os ataques do Vampiro."},Ph=Object.keys(Rn);function Oo(s){return Ph.filter(t=>Rn[t].shop===s)}const Ex=`
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
`;class Tx{constructor(t,e,n,i){ot(this,"el");ot(this,"gold");ot(this,"wood");ot(this,"blood");ot(this,"clock");ot(this,"selInfo");ot(this,"cmdPanel");ot(this,"minimap");ot(this,"resultEl",null);ot(this,"shownResult",null);ot(this,"admin");ot(this,"portraitKind",null);ot(this,"panelHtml","");ot(this,"minimapTerrain",null);ot(this,"minimapCameraKey","");ot(this,"minimapCorners",[]);this.scene=t,this.controls=e,this.net=n,this.getMyId=i;const r=document.createElement("style");r.textContent=Ex+Sx,document.head.appendChild(r),this.el=document.createElement("div"),this.el.className="vxh-hud",this.el.dataset.faction=this.getMyId()===Xe?"vampire":"human",this.el.innerHTML=`
      <button class="vxh-hero" title="Selecionar e centralizar seu personagem">${ui(this.getMyId()===Xe)}<div class="vxh-bar"><div style="width:100%;background:#539541"></div></div><span class="vxh-hero-crest" aria-hidden="true">${Lc(this.getMyId()===Xe)}</span></button>
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
        <div class="vxh-crest" aria-hidden="true"><span>${Lc(this.getMyId()===Xe)}</span></div>
        <div class="vxh-portrait-art">${ui(this.getMyId()===Xe)}</div>
        <span class="name">—</span>
        <div class="vxh-statbar healthbar"><i style="width:100%"></i><span>—</span></div>
        <div class="vxh-statbar bloodbar"><i style="width:100%"></i><span>—</span></div>
      </div>
      <div class="vxh-frame vxh-sheet"><div class="vxh-sheet-heading">ATRIBUTOS</div><div class="vxh-selinfo"></div></div>
      <div class="vxh-frame vxh-commands"><div class="vxh-commands-heading">VAMPIRE × HUMANS</div><div class="vxh-panel"></div></div>
      </div>
    `,document.body.appendChild(this.el),this.admin=new bx(this.el,n),this.gold=this.el.querySelector(".gold"),this.wood=this.el.querySelector(".wood"),this.blood=this.el.querySelector(".blood"),this.clock=this.el.querySelector(".vxh-clock"),this.selInfo=this.el.querySelector(".vxh-selinfo"),this.cmdPanel=this.el.querySelector(".vxh-panel"),this.minimap=this.el.querySelector(".vxh-minimap"),this.el.querySelector(".vxh-hero").addEventListener("click",()=>{var a;const o=(a=this.net.latestSnap)==null?void 0:a.units.find(l=>l.owner===this.getMyId());o&&(this.controls.selected=[o.id],this.controls.selectedBuilding=null,this.controls.inspectedUnit=null,this.controls.focusOn(o.x,o.z),this.scene.setSelection([o.id]),this.scene.setBuildingSelection(null),this.net.latestSnap&&this.update(this.net.latestSnap,this.getMyId()))}),this.el.querySelector(".vxh-quit").addEventListener("click",()=>{confirm("Sair da partida? Suas unidades ficarão abandonadas na sala.")&&location.reload()}),this.cmdPanel.addEventListener("click",o=>{const a=o.target.closest("button");if(!(!a||a.disabled)){if(a.dataset.build&&this.controls.enterBuild(a.dataset.build),a.dataset.market&&this.net.command({type:"market",targetId:Number(a.dataset.marketTarget),trade:a.dataset.market,amount:a.dataset.market==="woodToGold"?Oi.wood:Oi.gold}),a.dataset.upgrade&&this.net.command({type:"upgrade",ids:[],targetId:Number(a.dataset.upgrade)}),a.dataset.recruit&&this.net.command({type:"recruit",targetId:Number(a.dataset.recruit)}),a.dataset.vampireItem&&this.net.command({type:"buyVampireItem",shopId:Number(a.dataset.shop),itemId:a.dataset.vampireItem}),a.dataset.vampireSkillBuy&&this.net.command({type:"buyVampireSkill",cryptId:Number(a.dataset.crypt),skillId:a.dataset.vampireSkillBuy}),a.dataset.vampireSkillCast&&this.net.command({type:"castVampireSkill",skillId:a.dataset.vampireSkillCast}),a.dataset.vampireItemUp&&this.net.command({type:"upgradeVampireItem",itemId:a.dataset.vampireItemUp}),a.dataset.resume){const l=this.net.latestSnap,c=l==null?void 0:l.buildings.find(d=>d.id===Number(a.dataset.resume)),h=c&&(l==null?void 0:l.units.filter(d=>d.owner===this.getMyId()&&d.kind==="worker").sort((d,u)=>Math.hypot(d.x-c.x,d.z-c.z)-Math.hypot(u.x-c.x,u.z-c.z))[0]);h&&c&&this.net.command({type:"resumeBuild",ids:[h.id],targetId:c.id})}if(a.dataset.repair){const l=this.net.latestSnap,c=l==null?void 0:l.buildings.find(d=>d.id===Number(a.dataset.repair)),h=c&&(l==null?void 0:l.units.filter(d=>d.owner===this.getMyId()&&d.kind==="worker").sort((d,u)=>Math.hypot(d.x-c.x,d.z-c.z)-Math.hypot(u.x-c.x,u.z-c.z)).slice(0,3).map(d=>d.id));h!=null&&h.length&&c&&this.net.command({type:"repair",ids:h,targetId:c.id})}}}),this.minimap.addEventListener("pointerdown",o=>{const a=this.minimap.getBoundingClientRect(),l=((o.clientX-a.left)/a.width-.5)*ae.half*2,c=((o.clientY-a.top)/a.height-.5)*ae.half*2;this.controls.focusOn(l,c)})}update(t,e){var g,v,m,p,M,_;this.admin.update(t);const n=t.players.find(x=>x.id===e);n&&(this.gold.textContent=String(n.gold),this.wood.textContent=String(n.wood));const i=e===Xe;this.el.querySelector("[data-blood]").style.display=i?"flex":"none";for(const x of this.el.querySelectorAll(".vxh-topbar .res[data-wood], .vxh-topbar .res[data-gold]"))x.style.display=i?"none":"flex";this.blood.textContent=String(t.blood),t.phase;const r=Math.max(0,Math.ceil(t.phaseTime)),o=t.phase==="day"?"☀️":"🌙",a=`${t.practice?"Teste solo · ":""}${t.phase==="day"?"Dia":"Noite"} ${t.day}`;this.clock.className=`vxh-clock ${t.phase}`,this.clock.innerHTML=`<span class="icon">${o}</span><span class="time">${a} · ${Math.floor(r/60)}:${String(r%60).padStart(2,"0")}</span>`;const l=(this.controls.inspectedUnit!=null?[this.controls.inspectedUnit]:this.controls.selected).map(x=>t.units.find(P=>P.id===x)).filter(Boolean),c=t.buildings.find(x=>x.id===this.controls.selectedBuilding);if(c){if(this.selInfo.innerHTML=`<b>${bs[c.kind]} · nível ${c.level}</b>
        <div>${c.hp}/${c.maxHp} HP${c.done?"":` · Obra: ${Math.floor(c.progress*100)}%`}</div>
        ${c.kind==="bank"&&c.done?`<div>Produção: ${Kg()} ouro / ${Qg(c.level)}s</div>`:""}
        ${c.kind==="wall"&&c.done?`<div>Vida máxima: ${c.maxHp}${c.level<bc?` · Nível ${c.level+1}: ${Do(c.level+1)} HP`:" · Nível máximo"}</div>`:""}
        ${c.kind==="wall"&&c.done&&c.hp<c.maxHp?'<div class="vxh-activity">Danificado — clique com o botão direito com um Humano/Peão para reparar</div>':""}`,c.recruitment){const x=1-c.recruitment.remaining/c.recruitment.total;this.selInfo.innerHTML+=`<div class="vxh-activity">${c.recruitment.remaining>0?`Recrutando Peão · ${Math.ceil(c.recruitment.remaining)}s`:"Aguardando uma saída livre"}</div>
          <div class="vxh-progress"><div style="width:${x*100}%"></div></div>`}if(c.kind==="tower"){const x=t.units.find(P=>P.kind==="vampire"&&Math.hypot(P.x-c.x,P.z-c.z)<=Hi.range);this.selInfo.innerHTML+=`<div>Alcance: ${Hi.range} · Dano: ${Hi.damage} / ${Hi.cooldown}s</div>
          <div class="vxh-activity">${c.done?x?`Alvo: Vampiro — ${x.hp}/${x.maxHp} HP`:"Sem alvo no alcance":"Aguardando conclusão da obra"}</div>`}if(c.kind==="crypt"||Oo(c.kind).length>0){const x=t.units.find(P=>P.kind==="vampire");if(i){const P=t.buildings.find(E=>E.kind==="crypt"),A=Uo(t.phase,x,c,P);A&&(this.selInfo.innerHTML+=`<div class="vxh-activity">${A}</div>`),this.selInfo.innerHTML+=`<div>Sangue disponível: ${t.blood}</div>${this.inventoryMarkup(t)}`}}}else if(l.length===0)this.selInfo.innerHTML="";else{this.selInfo.innerHTML=l.map(E=>{var L;return`<b>${E.kind==="vampire"?"Vampiro":E.hero===!1?"Peão":"Humano"}</b><div>${E.hp}/${E.maxHp} HP</div>
            <div class="vxh-activity">${yx(E,t)}</div>
            ${E.orderType==="gather"?`<div>${Ts(E.carryRes??((L=t.nodes.find(w=>w.id===E.targetId))==null?void 0:L.kind)).icon} Coleta: ${E.carrying} / ${Ms(E).carry}</div>`:""}`}).join("");const x=l[0];if((x==null?void 0:x.kind)==="vampire"){const E=Ka(t.vampireItems),L=(mi.attackDamage+E.damage)*ax(t.vampireSkills)*(t.phase==="night"?1:mi.dayDamageMultiplier);rx(t.phase,t.vampireItems);const w=ox(t.vampireItems),y=(((v=(g=t.vampireSkills)==null?void 0:g.powerStrike)==null?void 0:v.buff)??0)>0?` · 💥 Golpe ativo (${Math.ceil(t.vampireSkills.powerStrike.buff)}s)`:"";this.selInfo.innerHTML+=`<div>Sangue: ${t.blood} · Dano: ${Math.round(L*10)/10}${y}</div>
          <div>Bônus: +${E.damage} dano · +${E.health} vida · +${Math.round(E.moveSpeed*10)/10} veloc. · ataque a cada ${Math.round(w*100)/100}s</div>${this.inventoryMarkup(t)}`}const P=t.buildings.find(E=>E.id===(x==null?void 0:x.targetId)&&!E.done);if(P&&(x==null?void 0:x.orderType)==="build"){const E=Math.ceil((1-P.progress)*Ca[P.kind].time/Ms(x).buildRate);this.selInfo.innerHTML+=`<div>${bs[P.kind]} · ${Math.floor(P.progress*100)}% · ${E}s de trabalho</div>
          <div class="vxh-progress"><div style="width:${P.progress*100}%"></div></div>`}const A=t.buildings.find(E=>E.id===(x==null?void 0:x.targetId)&&E.done);A&&(x==null?void 0:x.orderType)==="repair"&&(this.selInfo.innerHTML+=`<div>${bs[A.kind]} · ${A.hp}/${A.maxHp} HP · Reparando…</div>
          <div class="vxh-progress"><div style="width:${A.hp/A.maxHp*100}%"></div></div>`)}const h=c??l[0],d=((m=l[0])==null?void 0:m.kind)==="vampire",u=l[0]?d?"vampire":l[0].hero===!1?"peon":"human":i?"vampire":"human";this.portraitKind!==u&&(this.portraitKind=u,this.el.querySelector(".vxh-portrait-art").innerHTML=u==="peon"?Mx():ui(u==="vampire")),this.el.querySelector(".vxh-portrait .name").textContent=c?bs[c.kind]:l[0]?l[0].kind==="vampire"?"Vampiro":l[0].hero===!1?"Peão":"Humano":"Selecione uma unidade",this.el.querySelector(".healthbar > i").style.width=`${h?Math.max(0,h.hp/h.maxHp*100):0}%`,this.el.querySelector(".healthbar > span").textContent=h?`${h.hp} / ${h.maxHp}`:"Sem seleção",this.el.querySelector(".bloodbar > span").textContent=d?`${t.blood} sangue`:c&&!c.done?`Obra: ${Math.floor(c.progress*100)}%`:((p=l[0])==null?void 0:p.orderType)==="gather"?`${Ts(l[0].carryRes??((M=t.nodes.find(x=>x.id===l[0].targetId))==null?void 0:M.kind)).icon} ${l[0].carrying} / ${Ms(l[0]).carry}`:"Sem coleta",this.el.querySelector(".bloodbar > i").style.width=`${d?100:c&&!c.done?c.progress*100:(((_=l[0])==null?void 0:_.carrying)??0)/Ms(l[0]??{}).carry*100}%`;const f=t.units.find(x=>x.owner===e);this.el.querySelector(".vxh-hero .vxh-bar > div").style.width=`${f?Math.max(0,f.hp/f.maxHp*100):0}%`,this.renderCmdPanel(t,e,l.length>0),this.renderMinimap(t,e),t.result&&!this.resultEl&&(this.shownResult=t.result.reason,this.showResult(t.result.winner,t.result.reason,e))}renderCmdPanel(t,e,n){var u,f,g,v;const i=e===Xe,r=t.players.find(m=>m.id===e),o=t.buildings.find(m=>m.id===this.controls.selectedBuilding),a=(m,p)=>{const M=Math.max(0,p-((r==null?void 0:r[m])??0)),{icon:_,name:x}=Ts(m);return`<span class="vxh-resource-cost ${M>0?"vxh-resource-missing":""}" data-resource="${m}" title="${M>0?`Faltam ${M} de ${x}`:`${x}: suficiente`}">${p}${_}</span>`},l=m=>[m.wood>0?a("wood",m.wood):"",m.gold>0?a("gold",m.gold):""].filter(Boolean).join(" "),c=m=>["wood","gold"].filter(p=>m[p]>((r==null?void 0:r[p])??0)).map(p=>`Faltam ${m[p]-((r==null?void 0:r[p])??0)} de ${Ts(p).name}`).join("; "),h=()=>["woodToGold","goldToWood"].map(m=>{const p=m==="woodToGold",M=p?Oi.wood:Oi.gold,_=p?Oi.gold:Oi.wood,x=r&&(p?r.wood:r.gold)>=M;return`<button class="vxh-btn ${x?"":"vxh-unavailable"}" data-market="${m}" data-market-target="${o==null?void 0:o.id}" title="${x?"Trocar recursos":c({wood:p?M:0,gold:p?0:M})}" ${x?"":"disabled"}>
        ${p?"Vender 🪵":"Comprar 🪵"}<small>${a(p?"wood":"gold",M)} → <span class="vxh-resource-cost">${_}${p?"🪙":"🪵"}</span></small></button>`}).join("");let d="";if(this.controls.inspectedUnit!=null)d="<span>Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.</span>";else if(o)if(o.owner===e&&!o.done){const m=t.units.some(p=>p.owner===e&&p.kind==="worker");d=`<button class="vxh-btn" data-resume="${o.id}" ${m?"":"disabled"}>🔨 Retomar obra<small>Enviar seu Humano</small></button>`}else if(o.owner===e&&o.kind==="bank"){const m=jg[o.level],p=o.level>=Zg,M=m&&r&&r.wood>=m.wood&&r.gold>=m.gold;d=`<button class="vxh-btn ${!p&&!M?"vxh-unavailable":""}" title="${!p&&!M&&m?c(m):"Melhoria do Banco"}" data-upgrade="${o.id}" ${!p&&M?"":"disabled"}>
          ${p?"Nível máximo":`Melhorar para nível ${o.level+1}`}<small>${!p&&m?l(m):""}</small></button>`}else if(o.owner===e&&o.kind==="taverna"){const m=!!o.recruitment,p=r&&r.gold>=ys.gold&&r.wood>=ys.wood;d=`<button class="vxh-btn ${!m&&!p?"vxh-unavailable":""}" data-recruit="${o.id}" title="${p?"Recrutar um Peão auxiliar":c(ys)}" ${m||!p?"disabled":""}>
          ${m?"Recrutando…":"Recrutar Peão"}<small>${l(ys)}</small><small>${ys.time}s</small></button>`}else if(o.kind==="crypt"&&i){const m=t.units.find(M=>M.kind==="vampire"&&M.owner===e),p=Uo(t.phase,m,o,o);for(const M of Object.keys(Vi)){const _=Vi[M],x=!!((u=t.vampireSkills)!=null&&u[M]),P=t.blood>=_.unlockCost,A=p??(x?"Skill desbloqueada — use pelo painel do vampiro":P?"Desbloquear skill":`Faltam ${_.unlockCost-t.blood} de sangue`);d+=`<button class="vxh-btn vxh-item-button" data-vampire-skill-buy="${M}" data-crypt="${o.id}" title="${A}" ${p||x||!P?"disabled":""}>
            ${Wn(M)}${_.name}<small>${_.description}</small>
            ${x?'<small class="vxh-item-equipped">✓ Desbloqueada</small>':`<small class="vxh-item-price"><span class="vxh-resource-cost ${P?"":"vxh-resource-missing"}">${_.unlockCost}🩸</span></small>`}</button>`}d||(d="<span>Nenhuma skill disponível.</span>"),p&&(d+=`<span>${p}</span>`)}else if(i&&Oo(o.kind).length>0){const m=t.units.find(_=>_.kind==="vampire"&&_.owner===e),p=t.buildings.find(_=>_.kind==="crypt"),M=Uo(t.phase,m,o,p);for(const _ of Oo(o.kind)){const x=Rn[_],P=((f=t.vampireItems)==null?void 0:f[_])??0,A=Ac(_,P),E=P>=x.maxCount,L=t.blood>=A,w=M??(E?"Limite de compras atingido":L?"Comprar e equipar":`Faltam ${A-t.blood} de sangue`),y=[x.damageBonus?`+${x.damageBonus} dano`:"",x.healthBonus?`+${x.healthBonus} vida`:"",x.speedBonus?`+${x.speedBonus} veloc.`:"",x.cooldownFactor<1?`ataque ${Math.round((1-x.cooldownFactor)*100)}% mais rápido`:""].filter(Boolean).join(" · "),I=x.maxCount===1/0?`<small>Nv ${P} → ${P+1}</small>`:"";d+=`<button class="vxh-btn vxh-item-button" data-vampire-item="${_}" data-shop="${o.id}" title="${w}" ${M||E||!L?"disabled":""}>
            ${Wn(_)}${x.name}<small>${y}</small>${I}
            ${E?'<small class="vxh-item-equipped">✓ Equipado</small>':`<small class="vxh-item-price"><span class="vxh-resource-cost ${L?"":"vxh-resource-missing"}">${A}🩸</span></small>`}</button>`}M&&(d+=`<span>${M}</span>`)}else if(o.owner===e&&o.kind==="wall"&&o.done){const m=Jg[o.level],p=o.level>=bc,M=m&&r&&r.wood>=m.wood&&r.gold>=m.gold,_=`<button class="vxh-btn ${!p&&!M?"vxh-unavailable":""}" title="${!p&&!M&&m?c(m):`Aumenta a vida máxima para ${p?o.maxHp:Do(o.level+1)} HP`}" data-upgrade="${o.id}" ${!p&&M?"":"disabled"}>
          ${p?"Nível máximo":`Melhorar para nível ${o.level+1}`}<small>${!p&&m?l(m):""}</small>${p?"":`<small>${o.maxHp} → ${Do(o.level+1)} HP</small>`}</button>`,x=o.hp<o.maxHp,P=t.units.some(E=>E.owner===e&&E.kind==="worker"),A=x?`<button class="vxh-btn" data-repair="${o.id}" ${P?"":"disabled"}>🔨 Reparar muro<small>${o.hp}/${o.maxHp} HP</small></button>`:"";d=_+A+h()}else d="";else if(i){d="";for(const m of Object.keys(Vi)){const p=Vi[m],M=(g=t.vampireSkills)==null?void 0:g[m];M?M.buff>0?d+=`<button class="vxh-btn active" disabled>${Wn(m)}${p.name}<small>ativo · ${Math.ceil(M.buff)}s</small></button>`:M.cd>0?d+=`<button class="vxh-btn" disabled>${Wn(m)}${p.name}<small>recarga · ${Math.ceil(M.cd)}s</small></button>`:d+=`<button class="vxh-btn" data-vampire-skill-cast="${m}" title="${p.description} — clique para ativar">${Wn(m)}${p.name}<small>${p.description}</small></button>`:d+=`<button class="vxh-btn" disabled title="Desbloqueie na cripta durante o dia">${Wn(m)}${p.name}<small>🔒 ${p.unlockCost}🩸</small></button>`}for(const m of Ph){const p=((v=t.vampireItems)==null?void 0:v[m])??0;if(!p)continue;const M=Rn[m],_=Ac(m,p),x=t.blood>=_;d+=`<button class="vxh-btn vxh-item-button" data-vampire-item-up="${m}" title="Upar a qualquer hora por ${_} de sangue" ${x?"":"disabled"}>
          ${Wn(m)}${M.name}<small>Nv ${p} → ${p+1}</small>
          <small class="vxh-item-price"><span class="vxh-resource-cost ${x?"":"vxh-resource-missing"}">${_}🩸</span></small></button>`}}else if(n)for(const m of Eh){const p=Ca[m],M=r&&r.wood>=p.wood&&r.gold>=p.gold;d+=`<button class="vxh-btn ${M?"":"vxh-unavailable"}" data-build="${m}" title="${M?wx[m]:c(p)}" ${M?"":"disabled"}>
          ${Wn(m)}${bs[m]}
          <small class="vxh-cost">${l(p)}</small><small>${Number((p.time/Ms(t.units.find(_=>this.controls.selected.includes(_.id))??{}).buildRate).toFixed(1))}s</small></button>`}d!==this.panelHtml&&(this.cmdPanel.innerHTML=d,this.panelHtml=d)}inventoryMarkup(t){const e=Object.keys(Rn).filter(n=>{var i;return(((i=t.vampireItems)==null?void 0:i[n])??0)>0});return e.length?`<div class="vxh-inventory">${e.map(n=>{const i=Rn[n],r=t.vampireItems[n];return`<span title="+${i.damageBonus*r} dano · +${i.healthBonus*r} vida máxima">${i.icon} ${i.name}${r>1?` ×${r}`:""}</span>`}).join("")}</div>`:'<div class="vxh-inventory"><span>Sem itens equipados</span></div>'}renderMinimap(t,e){const n=this.minimap.getContext("2d");if(!n)return;const i=210,r=this.scene.map,o=r.tiles,a=this.minimapTerrain??n.createImageData(i,i);if(!this.minimapTerrain){for(let u=0;u<i;u++)for(let f=0;f<i;f++){const g=Math.floor(f/i*o),m=Math.floor(u/i*o)*o+g,p=r.height[m]??0;let M,_,x;r.water[m]?(M=30,_=60,x=110):(r.forest[m]??0)>.5?(M=24,_=48,x=43):p>.62?(M=100,_=100,x=105):(M=45+p*40,_=80+p*30,x=40);const P=(u*i+f)*4;a.data[P]=M,a.data[P+1]=_,a.data[P+2]=x,a.data[P+3]=255}this.minimapTerrain=a}n.putImageData(a,0,0);const l=ae.half*2,c=(u,f)=>[(u+l/2)/l*i,(f+l/2)/l*i];n.fillStyle="#89949b";for(const u of r.obstacles){const[f,g]=c(u.x-u.width/2,u.z-u.depth/2);n.fillRect(f,g,Math.max(1,u.width/l*i),Math.max(1,u.depth/l*i))}for(const u of t.nodes){const[f,g]=c(u.x,u.z);n.fillStyle=u.kind==="gold"?"#e8c83a":"#2d5a2d",n.fillRect(f-1,g-1,3,3)}for(const u of t.buildings){const[f,g]=c(u.x,u.z);n.fillStyle=u.owner<0?"#555":u.owner===e?"#6ad6ff":"#d6b06a",n.fillRect(f-2,g-2,5,5)}for(const u of t.units){const[f,g]=c(u.x,u.z);n.fillStyle=u.kind==="vampire"?"#ff2a2a":u.owner===e?"#ffffff":"#88aaff",n.beginPath(),n.arc(f,g,u.kind==="vampire"?3.5:2,0,Math.PI*2),n.fill()}this.scene.camera.updateMatrixWorld(!0);const h=[...this.scene.camera.matrixWorld.elements,...this.scene.camera.projectionMatrix.elements].join(",");h!==this.minimapCameraKey&&(this.minimapCameraKey=h,this.minimapCorners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,f])=>this.scene.screenToGround(u,f)));const d=this.minimapCorners;d.every(Boolean)&&(n.strokeStyle="#ddd7b4",n.lineWidth=1,n.beginPath(),d.forEach((u,f)=>{const[g,v]=c(u.x,u.z);f===0?n.moveTo(g,v):n.lineTo(g,v)}),n.closePath(),n.stroke())}showResult(t,e,n){const i=t==="vampire"==(n===Xe),r=document.createElement("div");r.className="vxh-result",r.innerHTML=`
      <div style="color: ${t==="vampire"?"#ff5a5a":"#6ad66a"}">
        ${i?"VITÓRIA":"DERROTA"}
      </div>
      <small>${e}</small>
      <small style="margin-top:20px;opacity:.5">recarregue a página para jogar novamente</small>
    `,this.el.appendChild(r),this.resultEl=r}}class Ax{constructor(){ot(this,"ws",null);ot(this,"myId",-1);ot(this,"clientId",null);ot(this,"lobby",null);ot(this,"latestSnap",null);ot(this,"result",null);ot(this,"started",!1);ot(this,"connection","offline");ot(this,"pending",null);ot(this,"error","");ot(this,"onSnap",null);ot(this,"listeners",new Set)}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t()}connect(){if(this.ws&&this.ws.readyState<=WebSocket.OPEN)return Promise.resolve();this.connection="connecting",this.error="",this.notify();const t=location.protocol==="https:"?"wss":"ws",e=new WebSocket(`${t}://${location.host}/ws`);return this.ws=e,new Promise((n,i)=>{e.onopen=()=>{this.connection="online",this.notify(),n()},e.onerror=()=>i(new Error("Não foi possível conectar ao servidor")),e.onclose=()=>{this.connection="offline",this.pending=null,this.error="Conexão perdida. Reconecte para entrar novamente na sala.",this.started||(this.lobby=null,this.clientId=null,this.myId=-1),this.notify()},e.onmessage=r=>this.handle(r.data)})}handle(t){var n;const e=JSON.parse(t);if(e.type==="snap"){this.latestSnap=e.snap,(n=this.onSnap)==null||n.call(this,e.snap);return}switch(e.type){case"result":this.result=e.result;break;case"created":case"joined":this.clientId=e.clientId,this.myId=e.playerId,this.lobby=e.lobby,this.error="";break;case"lobby":this.lobby=e.lobby,this.error="";break;case"started":this.lobby=e.lobby,this.myId=e.playerId,this.started=!0;break;case"left":this.lobby=null,this.clientId=null,this.myId=-1,this.latestSnap=null,this.error="";break;case"error":this.error=e.message;break;default:return}this.pending=null,this.notify()}send(t){var e;return((e=this.ws)==null?void 0:e.readyState)!==WebSocket.OPEN?(this.error="Sem conexão com o servidor",this.pending=null,this.notify(),!1):(this.ws.send(JSON.stringify(t)),!0)}request(t,e={}){this.pending||(this.error="",this.pending=t,this.notify(),this.send({type:t,...e}))}command(t){this.send({type:"cmd",command:t})}create(t){this.request("create",{name:t})}join(t,e){this.request("join",{code:t,name:e})}chooseRole(t){this.request("role",{role:t})}ready(t){this.request("ready",{ready:t})}start(){this.request("start")}leave(){this.request("leave")}}function zi(s){return s.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class Rx{constructor(t,e){ot(this,"el",document.createElement("div"));ot(this,"name","");ot(this,"code","");ot(this,"copyMessage","");ot(this,"unsubscribe");this.container=t,this.net=e,this.el.className="lobby-screen",t.appendChild(this.el),this.unsubscribe=e.subscribe(()=>this.render()),this.el.addEventListener("input",n=>{const i=n.target;i.id==="v-name"&&(this.name=i.value),i.id==="v-code"&&(this.code=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,Wt.lobby.codeLength),i.value=this.code)}),this.el.addEventListener("keydown",n=>{n.key!=="Enter"||this.net.pending||this.net.connection!=="online"||(n.target.id==="v-code"?this.join():n.target.id==="v-name"&&this.net.create(this.name))}),this.el.addEventListener("click",n=>{var r;const i=n.target.closest("button");if(!(!i||i.disabled))switch(i.dataset.action){case"create":this.net.create(this.name);break;case"join":this.join();break;case"leave":this.net.leave();break;case"start":this.net.start();break;case"ready":{const o=(r=this.net.lobby)==null?void 0:r.players.find(a=>a.id===this.net.clientId);this.net.ready(!(o!=null&&o.ready));break}case"role":this.net.chooseRole(i.dataset.role);break;case"copy":this.copyCode();break;case"reconnect":this.net.connect().catch(()=>this.render());break}}),this.render()}join(){if(this.code.length!==Wt.lobby.codeLength){this.net.error=`Digite o código de ${Wt.lobby.codeLength} caracteres da sala.`,this.render();return}this.net.join(this.code,this.name)}async copyCode(){var e;const t=(e=this.net.lobby)==null?void 0:e.code;if(t){try{await navigator.clipboard.writeText(t),this.copyMessage="Código copiado"}catch{this.copyMessage=`Compartilhe o código ${t}`}this.render()}}render(){const{lobby:t,pending:e,connection:n}=this.net,i=!!e||n!=="online",r=n==="online"?"Conectado":n==="connecting"?"Conectando…":"Desconectado";this.el.innerHTML=`
      <div class="lobby-atmosphere" aria-hidden="true"></div>
      <div class="lobby-shell">
        <header class="lobby-header"><a class="lobby-brand" href="/">V<span>×</span>H <small>VAMPIRE × HUMANS</small></a>
          <div class="lobby-header-actions"><span class="lobby-connection ${n}"><i></i>${r}</span>
          ${t?`<button data-action="leave" class="lobby-leave" ${i?"disabled":""}>✕ Sair da sala</button>`:""}</div></header>
        <div class="lobby-error" role="alert" ${this.net.error?"":"hidden"}>${zi(this.net.error)}</div>
        ${t?this.roomView(i):this.entryView(i)}
        <footer class="lobby-footer"><span>VALE DA VIGÍLIA</span><span>Sangue, ou liberdade.</span><span>TESTE SOLO OU MULTIPLAYER · ATÉ ${Io} JOGADORES</span></footer>
      </div>`}entryView(t){return`<main class="lobby-entry">
      <section class="lobby-intro"><div class="lobby-eyebrow">O DIA É SEU. A NOITE, DELE.</div>
        <h1>Construa um refúgio.<br><em>Sobreviva à caçada.</em></h1>
        <p>Entre no vale com seus amigos. Os humanos coletam e fortificam. O vampiro espera o anoitecer para caçar.</p>
        <div class="lobby-factions"><div>${ui(!1)}<span>ATÉ ${Is} HUMANOS<small>Construam. Protejam-se.</small></span></div>
          <b>VS</b><div>${ui(!0)}<span>1 VAMPIRO<small>Encontre. Cace.</small></span></div></div>
        <div class="lobby-rule"><span>01</span> Escolha seu lado <span>02</span> Prepare-se <span>03</span> Sobreviva</div>
      </section>
      <section class="lobby-card lobby-entry-card"><div class="lobby-eyebrow">REÚNA SEU GRUPO</div><h2>Entrar no vale</h2>
        <label for="v-name">Seu nome</label><input id="v-name" maxlength="24" autocomplete="nickname" placeholder="Como devemos chamar você?" value="${zi(this.name)}" ${t?"disabled":""}>
        <button class="lobby-primary" data-action="create" id="v-create" ${t?"disabled":""}>${this.net.pending==="create"?"Criando sala…":"Criar sala"} <span>→</span></button>
        <div class="lobby-divider">ou entre com um código</div>
        <label for="v-code">Código da sala</label><div class="lobby-join-row"><input id="v-code" maxlength="${Wt.lobby.codeLength}" autocomplete="off" spellcheck="false" placeholder="Código" value="${zi(this.code)}" ${t?"disabled":""}>
          <button data-action="join" id="v-join" ${t?"disabled":""}>${this.net.pending==="join"?"Entrando…":"Entrar"}</button></div>
        <p class="lobby-help">Compartilhe o código com seus amigos. A equipe e a confirmação de presença são escolhidas dentro da sala.</p>
        ${this.net.connection==="offline"?'<button data-action="reconnect" class="lobby-reconnect">Reconectar</button>':""}
      </section></main>`}roomView(t){const e=this.net.lobby,n=e.players.find(c=>c.id===this.net.clientId),i=e.hostId===this.net.clientId,r=e.players.filter(c=>c.role==="vampire").length,o=e.players.filter(c=>c.role==="human").length,a=e.players.filter(c=>c.ready).length,l=(c,h,d)=>{const u=(n==null?void 0:n.role)===c,f=h>=d&&!u;return`<button data-action="role" data-role="${c}" class="lobby-role ${c} ${u?"selected":""}" aria-pressed="${u}" ${t||f?"disabled":""}>
        ${ui(c==="vampire")}<span><strong>${c==="human"?"Humano":"Vampiro"}</strong><small>${c==="human"?"Colete e defenda seu refúgio.":"Cace e destrua as defesas."}</small>
        <em>${u?"Sua equipe":f?"Equipe ocupada":"Escolher equipe"}</em></span><b>${h}/${d}</b></button>`};return`<main class="lobby-room">
      <div class="lobby-room-heading"><div><div class="lobby-eyebrow">PREPARAÇÃO DA PARTIDA</div><h1>Antes do anoitecer</h1></div>
        <div class="lobby-invite"><span>CÓDIGO DA SALA</span><button data-action="copy" title="Copiar código"><b>${e.code}</b><small>Copiar</small></button><small aria-live="polite">${zi(this.copyMessage||"Convide seus amigos")}</small></div></div>
      <div class="lobby-room-columns"><section class="lobby-card lobby-roster"><div class="lobby-section-title"><h2>Jogadores na sala</h2><span>${e.players.length}/${Io}</span></div>
        <div class="lobby-player-list" aria-live="polite">${e.players.map(c=>`<div class="lobby-player ${c.id===this.net.clientId?"self":""}" data-client-id="${c.id}">
          <div class="lobby-avatar">${c.role?ui(c.role==="vampire"):"<span>?</span>"}</div>
          <div class="lobby-player-name"><strong>${zi(c.name)}${c.id===this.net.clientId?"<small>VOCÊ</small>":""}</strong>
            <span>${c.role==="vampire"?"Vampiro":c.role==="human"?"Humano":"Escolhendo equipe"}${c.id===e.hostId?" · Anfitrião":""}</span></div>
          <span class="lobby-ready-state ${c.ready?"ready":""}">${c.ready?"✓ Pronto":"Preparando"}</span></div>`).join("")}
          ${Array.from({length:Math.max(0,Io-e.players.length)},()=>'<div class="lobby-empty-slot"><span>＋</span> Aguardando jogador</div>').join("")}
        </div><div class="lobby-roster-footer"><span>${a} de ${e.players.length} prontos</span><button data-action="leave" class="lobby-leave" ${t?"disabled":""}>✕ Sair da sala</button></div>
      </section><section class="lobby-card lobby-preparation"><div class="lobby-eyebrow">ESCOLHA SEU LADO</div><h2>Quem você será?</h2>
        ${l("human",o,Is)}${l("vampire",r,1)}
        <button data-action="ready" class="lobby-ready-button ${n!=null&&n.ready?"confirmed":""}" ${t||!(n!=null&&n.role)?"disabled":""}>${n!=null&&n.ready?"✓ Pronto — cancelar":"Estou pronto"}</button>
        <p class="lobby-help">${n!=null&&n.role?n.ready?"Tudo certo. Aguarde o início da partida.":"Confirme quando estiver preparado para começar.":"Escolha uma equipe para confirmar."}</p>
      </section></div>
      <div class="lobby-start-bar"><div><strong>${e.canStart?e.players.length===1?"Pronto para testar sozinho.":"Todos preparados. A caçada pode começar.":zi(e.startReason??"")}</strong>
        <span>${e.players.length===1?"Teste solo disponível · escolha sua equipe e marque Pronto":`1 vampiro contra até ${Is} humanos · mapa fixo · cada humano começa do zero`}</span></div>
        <button data-action="start" class="lobby-primary" ${t||!i||!e.canStart?"disabled":""}>${this.net.pending==="start"?"Iniciando…":i?e.players.length===1?"Iniciar teste solo":"Iniciar partida":"Aguardando o anfitrião"} <span>→</span></button></div>
    </main>`}destroy(){this.unsubscribe(),this.el.remove()}}const Pa=document.getElementById("app"),Us=new Ax,Lh=new Rx(Pa,Us),Cx=Us.subscribe(()=>{Us.started&&(Cx(),Lh.destroy(),Px(Us))});Us.connect().catch(()=>Lh.render());function Px(s){const t=new vx(Pa,s.lobby.seed);let e;const n=new _x(t,s,Pa,()=>s.myId,()=>s.latestSnap,()=>{e&&s.latestSnap&&e.update(s.latestSnap,s.myId)});e=new Tx(t,n,s,()=>s.myId);let i=-1,r=performance.now(),o=!1;function a(l){requestAnimationFrame(a);const c=Math.min(.1,(l-r)/1e3);r=l;const h=s.latestSnap;if(h&&h.tick!==i){if(i=h.tick,t.sync(h),!o){const d=h.units.find(u=>u.owner===s.myId);d&&(n.focusOn(d.x,d.z),n.selected=[d.id],t.setSelection(n.selected),o=!0)}e.update(h,s.myId)}n.update(c),h&&t.updateDayNight(h.phase,h.phaseTime,h.day),t.render(c)}requestAnimationFrame(a)}
