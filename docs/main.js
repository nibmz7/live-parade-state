!function(e){var t={};function r(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(i,s,function(t){return e[t]}.bind(null,s));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){"use strict";(function(e,i){var s,o=r(1);s="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:i;var n=Object(o.a)(s);t.a=n}).call(this,r(2),r(3)(e))},function(e,t,r){"use strict";function i(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",(function(){return i}))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";r.r(t);var i=r(0),s=function(){return Math.random().toString(36).substring(7).split("").join(".")},o={INIT:"@@redux/INIT"+s(),REPLACE:"@@redux/REPLACE"+s(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+s()}};function n(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function a(e,t,r){var s;if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(a)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var d=e,l=t,c=[],p=c,u=!1;function h(){p===c&&(p=c.slice())}function m(){if(u)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return l}function g(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(u)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return h(),p.push(e),function(){if(t){if(u)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,h();var r=p.indexOf(e);p.splice(r,1),c=null}}}function f(e){if(!n(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(u)throw new Error("Reducers may not dispatch actions.");try{u=!0,l=d(l,e)}finally{u=!1}for(var t=c=p,r=0;r<t.length;r++){(0,t[r])()}return e}function y(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");d=e,f({type:o.REPLACE})}function v(){var e,t=g;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(m())}return r(),{unsubscribe:t(r)}}})[i.a]=function(){return this},e}return f({type:o.INIT}),(s={dispatch:f,subscribe:g,getState:m,replaceReducer:y})[i.a]=v,s}function d(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function l(e){for(var t=Object.keys(e),r={},i=0;i<t.length;i++){var s=t[i];0,"function"==typeof e[s]&&(r[s]=e[s])}var n,a=Object.keys(r);try{!function(e){Object.keys(e).forEach((function(t){var r=e[t];if(void 0===r(void 0,{type:o.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:o.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+o.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(r)}catch(e){n=e}return function(e,t){if(void 0===e&&(e={}),n)throw n;for(var i=!1,s={},o=0;o<a.length;o++){var l=a[o],c=r[l],p=e[l],u=c(p,t);if(void 0===u){var h=d(l,t);throw new Error(h)}s[l]=u,i=i||u!==p}return(i=i||a.length!==Object.keys(e).length)?s:e}}const c={action:{id:0,root:0,type:0}},p=(e=c,t)=>{if(t.root===y.RESET)return c;if(t.root!==y.AUTH)return e;return{action:t}},u={action:{root:0,type:0,id:0},items:[]},h=(e=u,t)=>{if(t.root===y.RESET)return{...u,items:[]};if(t.root!==y.DEPARTMENTS)return e;const r=t,i=r.type;if(k.includes(i))return{...e,action:r};if(i===_.INITIALIZED)return{items:r.payload,action:r};const s=r.payload;let o;switch(i){case _.ADDED:o=e.items.slice(),o.push(s);break;case _.MODIFIED:o=e.items.map(e=>e.id!==s.id?e:{...e,...s});break;case _.REMOVED:o=e.items.filter(e=>e.id!==s.id);break;default:o=e.items}return{items:o,action:r}};class m{constructor(e){this.email=e.email.toLowerCase(),this.name=e.name,this.regular=e.regular,this.rank=e.rank,this.branchid=e.branchid,this.departmentid=e.departmentid,this.password=e.password,this.fullname=`${e.rank.text} ${e.name}`}}class g extends m{constructor(e){super(e),this.uid=e.uid,this.morning=e.morning,this.afternoon=e.afternoon}static compare(e,t){let r=e.rank.code,i=t.rank.code;return r<i?-1:i<r?1:e.name<t.name?-1:t.name<e.name?1:0}static getInsertionIndex(e,t){if(0===e.length)return 0;let r=e.length-1;for(;r>=0;){let i=e[r];if(-1!==g.compare(t,i))break;r--}return++r}}const f=(e={action:{root:0,type:0,id:0},usersById:{},sortedUsers:[],sortedUsersByDepartment:{}},t)=>{var r;if(t.root===y.RESET)return{action:{root:0,type:0,id:0},usersById:{},sortedUsers:[],sortedUsersByDepartment:{}};if(t.root!==y.USERS)return e;const i=t,s=i.type;if(k.includes(s))return{...e,action:i};if(s===_.INITIALIZED){const e={},t=i.payload.slice(),r={};t.sort(g.compare);for(let i of t)i.departmentid in r?r[i.departmentid].push(i):r[i.departmentid]=[i],e[i.uid]=i;return{action:i,usersById:e,sortedUsers:t,sortedUsersByDepartment:r}}const o=new g(i.payload),n=o.departmentid;let a,d,l={};const c=(t,r)=>{d={...e.sortedUsersByDepartment,[n]:t},a=r,l={...e.usersById,[o.uid]:o}},p=(e,t)=>{const r=g.getInsertionIndex(e,o),i=g.getInsertionIndex(t,o);e.splice(r,0,o),t.splice(i,0,o)},u=()=>({depUsers:e.sortedUsersByDepartment[n].filter(e=>e.uid!==o.uid),allUsers:e.sortedUsers.filter(e=>e.uid!==o.uid)});switch(s){case _.ADDED:{const t=(null===(r=e.sortedUsersByDepartment[n])||void 0===r?void 0:r.slice())||[],i=e.sortedUsers.slice();p(t,i),c(t,i);break}case _.MODIFIED:{const{depUsers:e,allUsers:t}=u();p(e,t),c(e,t);break}case _.REMOVED:{const{depUsers:e,allUsers:t}=u();c(e,t);const{[o.uid]:r,...i}=l;l=i;break}default:l=e.usersById,a=e.sortedUsers,d=e.sortedUsersByDepartment}return{action:i,usersById:l,sortedUsers:a,sortedUsersByDepartment:d}};var y;!function(e){e[e.RESET=0]="RESET",e[e.AUTH=1]="AUTH",e[e.DEPARTMENTS=2]="DEPARTMENTS",e[e.USERS=3]="USERS",e[e.ALL=4]="ALL"}(y||(y={}));let v=1e3;const b=()=>v++;const w=new class{constructor(){this.store=a(l({auth:p,department:h,user:f}))}reset(){this.store.dispatch({id:0,root:y.RESET,type:y.RESET}),v=1e3}dispatch(e){this.store.dispatch(e)}listen(e,t){let r=0;let i=this.store.subscribe(()=>{var s,o;let n=(t=>{switch(e){case y.AUTH:return t.auth;case y.DEPARTMENTS:return t.department;case y.USERS:return t.user;default:return t}})(this.store.getState());n&&r!==(null===(s=null==n?void 0:n.action)||void 0===s?void 0:s.id)&&(r=null===(o=null==n?void 0:n.action)||void 0===o?void 0:o.id,t(n,i))});return i}get state(){return this.store.getState()}get departments(){return this.state.department}get users(){return this.state.user}get auth(){return this.state.auth}},x=(e,t)=>({root:y.DEPARTMENTS,id:b(),type:e,payload:t});var S={initialized:e=>x(_.INITIALIZED,e),added:e=>x(_.ADDED,e),modified:e=>x(_.MODIFIED,e),removed:e=>x(_.REMOVED,e),requestAdd:e=>x(_.REQUEST_ADD,e),requestModify:e=>x(_.REQUEST_MODIFY,e),requestRemove:e=>x(_.REQUEST_REMOVE,e),requestSuccessful:e=>x(_.REQUEST_SUCCESSFUL,e),requestError:e=>x(_.REQUEST_ERROR,e)};const E=(e,t)=>({root:y.USERS,id:b(),type:e,payload:t});var _,O={initialized:e=>E(_.INITIALIZED,e),added:e=>E(_.ADDED,e),modified:e=>E(_.MODIFIED,e),removed:e=>E(_.REMOVED,e),requestAdd:e=>E(_.REQUEST_ADD,e),requestModify:e=>E(_.REQUEST_MODIFY,e),requestRemove:e=>E(_.REQUEST_REMOVE,e),requestSuccessful:e=>E(_.REQUEST_SUCCESSFUL,e),requestError:e=>E(_.REQUEST_ERROR,e)};!function(e){e[e.INITIALIZED=0]="INITIALIZED",e[e.ADDED=1]="ADDED",e[e.MODIFIED=2]="MODIFIED",e[e.REMOVED=3]="REMOVED",e[e.REQUEST_ADD=4]="REQUEST_ADD",e[e.REQUEST_MODIFY=5]="REQUEST_MODIFY",e[e.REQUEST_REMOVE=6]="REQUEST_REMOVE",e[e.REQUEST_SUCCESSFUL=7]="REQUEST_SUCCESSFUL",e[e.REQUEST_ERROR=8]="REQUEST_ERROR"}(_||(_={}));const I=["initialized","added","updated","removed","adding","updating","removing","successfully","error"],k=[_.REQUEST_ADD,_.REQUEST_MODIFY,_.REQUEST_REMOVE,_.REQUEST_SUCCESSFUL,_.REQUEST_ERROR],D=[_.REQUEST_ADD,_.REQUEST_MODIFY,_.REQUEST_REMOVE];class N{constructor(){this.authUser=w.auth.action.payload,this.branch=this.authUser.branch,this.isDbConnected=!1}departmentOnChange(e,t){switch(t){case _.ADDED:w.dispatch(S.added(e));break;case _.MODIFIED:w.dispatch(S.modified(e));break;case _.REMOVED:w.dispatch(S.removed(e))}}userOnChange(e,t){if(!w.departments.items.find(t=>t.id===e.departmentid))return;const r=w.users.usersById[e.uid];switch(t){case _.ADDED:w.dispatch(O.added(e));break;case _.MODIFIED:r.departmentid!==e.departmentid&&(w.dispatch(O.removed(new g(r))),w.dispatch(O.added(e))),w.dispatch(O.modified(e));break;case _.REMOVED:w.dispatch(O.removed(e))}}async subscribe(){const e=await this.connectDB(),t=S.initialized(e.departments),r=O.initialized(e.users);w.dispatch(t),w.dispatch(r),this.isDbConnected=!0,this.startRequestListening()}unsubscribe(){this.isDbConnected=!1,this.stopRequestListening()}}const R={LG:1,MG:2,BG:3,COL:4,SLTC:5,LTC:6,MAJ:7,CPT:8,LTA:9,"2LT":10,CWO:11,SWO:12,MWO:13,"1WO":14,"2WO":15,"3WO":16,DX:36,MSG:37,SSG:38,"1SG":39,"2SG":40,"3SG":41,CFC:42,CPL:43,LCP:44,PTE:45,REC:46};class U{constructor(e){this.text=e.toUpperCase(),this.code=U.toInt(this.text)}static isValid(e){if(e in R)return!0;if(e.toUpperCase().includes("DX")&&e.length<=4){return Number(e.substring(2))<20}return!1}static toInt(e){if(e.toUpperCase().includes("DX")){if(e.length>4)return 99;let t=Number(e.substring(2));return R.DX-t}return R[e]}}const T=[{name:"NOT SET",fullName:"NOT SET",category:0},{name:"PRESENT",fullName:"PRESENT",category:1},{name:"RSO",fullName:"RSO",category:2},{name:"RSI",fullName:"RSI",category:2},{name:"MC",fullName:"MC",category:3},{name:"MA",fullName:"MA",category:3},{name:"OIL",fullName:"OFF IN LIEU",category:4},{name:"AL",fullName:"ANNUAL LEAVE",category:4},{name:"UL",fullName:"URGENT LEAVE",category:4},{name:"OL",fullName:"OVERSEAS LEAVE",category:4},{name:"CL",fullName:"COMPASSIONATE LEAVE",category:4},{name:"PL",fullName:"PATERNITY LEAVE",category:4},{name:"PCL",fullName:"PARENT CARE LEAVE",category:4},{name:"CCL",fullName:"CHILD CARE LEAVE",category:4},{name:"AO",fullName:"ATTACHED OUT",category:5},{name:"OA",fullName:"OVERSEAS ATTACHMENT",category:5},{name:"OOC",fullName:"OUT OF CAMP",category:6},{name:"OTHERS",fullName:"OTHERS",category:6}],P=["NOT SET","PRESENT","RSO/RSI","MC/MA","OIL/LEAVE","AO/OA","OOC/OTHERS"];class ${constructor(e){this.code=e.code,this.remarks=e.remarks,this.updatedby=e.updatedby,this.date=e.date,this.expired=void 0===e.expired?!$.isSameDay(e.date):e.expired}static isSameDay(e){const t=new Date,r=e.getDate()-t.getDate(),i=0===r&&e.getHours()<17&&t.getHours()<17,s=0===r&&e.getHours()>17&&t.getHours()>17,o=-1===r&&e.getHours()>17&&t.getHours()<17;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&(i||s||o)}}$.isPresent=e=>1===e;var A=$;const C=e=>({action:e,type:"Wrong password",message:"Please check that you've entered the correct password!"}),M=new U("SSG"),L={id:"123",name:"Pasir Laba",domain:"john@lol.com".split("@")[1]},j={id:"dep-123",name:"Manpower Branch"},V={id:"dep-456",name:"Logistics Branch"},q={id:"dep-789",name:"Accounting Branch"},B=[{id:"dep-321",name:"Signal Wing"},j,V,q];function z(e){return Math.floor(Math.random()*Math.floor(e))}const F=["user-101","user-201","user-202","user-301","admin"],G=()=>new A({code:z(5),remarks:"",expired:z(7)>=3,updatedby:F[z(4)],date:new Date}),H=(e,t,r,i,s)=>new g({uid:`user-${t}`,name:e,email:`${e}@lol.com`,regular:s,rank:new U(i),branchid:L.id,departmentid:r,morning:G(),afternoon:G()}),Q=new g({uid:"user-101",name:"Marquez",email:"john1@lol.com",regular:!1,rank:new U("CPL"),branchid:L.id,departmentid:j.id,morning:G(),afternoon:G()}),W=new g({uid:"user-201",name:"Rebecca",email:"john2@lol.com",regular:!0,rank:new U("MAJ"),branchid:L.id,departmentid:V.id,morning:G(),afternoon:G()}),Y=new g({uid:"user-202",name:"Jim",email:"jim@lol.com",regular:!1,rank:new U("PTE"),branchid:L.id,departmentid:V.id,morning:G(),afternoon:G()}),Z=new g({uid:"user-301",name:"John",email:"john3@lol.com",regular:!1,rank:new U("PTE"),branchid:L.id,departmentid:q.id,morning:G(),afternoon:G()}),J=[H("Lucas","781929","dep-321","MAJ",!0),Q,W,Y,Z,H("Lily","1234","dep-123","LTC",!0),H("Joe","12344","dep-123","LCP",!1),H("Bob","123444","dep-456","1WO",!0),H("Joyce","4568","dep-456","1SG",!0),H("Bill","4566","dep-456","LCP",!1),H("Sam","45666","dep-456","CPL",!1),H("Ruby","78910","dep-789","MSG",!0),H("Paula","78999","dep-789","REC",!1),H("Rob","7899919","dep-789","PTE",!1)],X={Rank:M,Branch:L,Department:j,DepartmentArray:B,User:Q,UserArray:J,Users:{[j.id]:[Q],[V.id]:[W,Y],[q.id]:[Z]},Admin:{uid:"321",branchid:"321",email:"admin@lol.com"}};class K extends N{startRequestListening(){this.unsubscribeDepartment=w.listen(y.DEPARTMENTS,e=>this.departmentOnRequest(e)),this.unsubscribeUser=w.listen(y.USERS,e=>this.userOnRequest(e))}stopRequestListening(){var e,t;null===(e=this.unsubscribeDepartment)||void 0===e||e.call(this),null===(t=this.unsubscribeUser)||void 0===t||t.call(this)}departmentOnRequest(e){if(D.includes(e.action.type))if(this.isDbConnected)switch(e.action.type){case _.REQUEST_ADD:this.requestAddDepartment(e);break;case _.REQUEST_MODIFY:this.requestModifyDepartment(e);break;case _.REQUEST_REMOVE:this.requestRemoveDepartment(e)}else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(S.requestError(t))}}userOnRequest(e){if(D.includes(e.action.type))if(this.isDbConnected)switch(e.action.type){case _.REQUEST_ADD:this.requestAddUser(e);break;case _.REQUEST_MODIFY:this.requestModifyUser(e);break;case _.REQUEST_REMOVE:this.requestRemoveUser(e)}else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(O.requestError(t))}}}class ee extends K{constructor(){super()}async connectDB(){return{departments:X.DepartmentArray,users:X.UserArray}}requestAddDepartment(e){let t=e.action.payload,r={id:`dep-${b()}`,name:t.name};this.departmentOnChange(r,_.ADDED);let i=S.requestSuccessful(e.action);w.dispatch(i)}requestModifyDepartment(e){this.departmentOnChange(e.action.payload,_.MODIFIED);let t=S.requestSuccessful(e.action);w.dispatch(t)}requestRemoveDepartment(e){const t=e.action.payload;this.departmentOnChange(t,_.REMOVED);const r=w.users.sortedUsers.filter(e=>e.departmentid!==t.id);let i=O.initialized(r);w.dispatch(i);let s=S.requestSuccessful(e.action);w.dispatch(s)}requestAddUser(e){const t=e.action.payload,r=new g({uid:`user-${b()}`,...t});setTimeout(()=>{let t;if(w.users.sortedUsers.find(e=>e.email===r.email)){const i={action:e.action,type:"email unavailable",message:`The email ${r.email} has already been used`};t=O.requestError(i)}else this.userOnChange(r,_.ADDED),t=O.requestSuccessful(e.action);w.dispatch(t)},2e3)}requestModifyUser(e){setTimeout(()=>{let t=e.action.payload;this.userOnChange(new g(t),_.MODIFIED);let r=O.requestSuccessful(e.action);w.dispatch(r)},2e3)}requestRemoveUser(e){setTimeout(()=>{let t=e.action.payload;this.userOnChange(new g(t),_.REMOVED);let r=O.requestSuccessful(e.action);w.dispatch(r)},2e3)}}var te;!function(e){e[e.INITIALIZING=0]="INITIALIZING",e[e.SIGNED_IN=1]="SIGNED_IN",e[e.SIGNED_OUT=2]="SIGNED_OUT",e[e.REQUEST_SIGN_IN=3]="REQUEST_SIGN_IN",e[e.REQUEST_SIGN_IN_FAILED=4]="REQUEST_SIGN_IN_FAILED",e[e.REQUEST_SIGN_OUT=5]="REQUEST_SIGN_OUT"}(te||(te={}));const re=(e,t)=>({id:b(),root:y.AUTH,type:e,payload:t});var ie,se={requestSignIn:e=>re(te.REQUEST_SIGN_IN,e),requestSignOut:()=>re(te.REQUEST_SIGN_OUT,void 0),userSignedIn:e=>re(te.SIGNED_IN,e),userSignedOut:()=>re(te.SIGNED_OUT,void 0),signInFailed:e=>re(te.REQUEST_SIGN_IN_FAILED,e)};class oe{constructor(e){this.uid=e.uid,this.uid=e.uid,this.email=e.email,this.branch={id:e.branchid||e.uid,domain:e.email.split("@")[1]},this.departmentid=e.departmentid,this.isAdmin="admin"===e.email.split("@")[0]}}!function(e){e[e.ADMIN_SIGNED_IN=0]="ADMIN_SIGNED_IN",e[e.USER_SIGNED_IN=1]="USER_SIGNED_IN"}(ie||(ie={}));class ne extends class{constructor(){w.listen(y.AUTH,e=>this.authStateChanged(e)),this.initialize()}authStateChanged(e){e.action.type===te.REQUEST_SIGN_IN?this.signInWithCredentials(e.action):e.action.type===te.REQUEST_SIGN_OUT&&this.signOut()}signOut(){w.reset();let e=se.userSignedOut();w.dispatch(e)}signIn(e){let t=se.userSignedIn(e);w.dispatch(t)}isAdmin(e){return"admin"===e.split("@")[0]}signInError(e){let t=se.signInFailed(e);w.dispatch(t)}}{constructor(){super()}async initialize(){if(window.authStatus!==ie.ADMIN_SIGNED_IN)if(window.authStatus!==ie.USER_SIGNED_IN)this.signOut();else{const e=new oe({...X.User});this.signIn(e)}else{const e=new oe({...X.Admin});this.signIn(e)}}async signInWithCredentials(e){let t,r=e.payload;r.email.includes("error")?this.signInError(C(e)):(t=this.isAdmin(r.email)?new oe({...X.Admin}):new oe({...X.User}),this.signIn(t))}}class ae extends N{startRequestListening(){this.unsubscribeUser=w.listen(y.USERS,e=>this.userOnRequest(e))}stopRequestListening(){var e;null===(e=this.unsubscribeUser)||void 0===e||e.call(this)}userOnRequest(e){if(e.action.type===_.REQUEST_MODIFY)if(this.isDbConnected)this.requestModifyUser(e);else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(O.requestError(t))}}}class de extends ae{requestModifyUser(e){setTimeout(()=>{const t=new g(e.action.payload),r=w.users.usersById[t.uid],i=new A(t.morning||r.morning),s=new A(t.afternoon||r.afternoon),o=new g({...r,morning:i,afternoon:s}),n=O.requestSuccessful(e.action);this.userOnChange(o,_.MODIFIED),w.dispatch(n)},2e3)}async connectDB(){let e;const t=X.DepartmentArray.filter(t=>{let r=t.id===this.authUser.departmentid;return r&&(e=t),!r});return t.unshift(e),{departments:t,users:X.UserArray}}}window.application=new class extends class{}{getAuthManager(){return new ne}getAdminManager(){return new ee}getStatusManager(){return new de}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const le="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,ce=(e,t,r=null,i=null)=>{for(;t!==r;){const r=t.nextSibling;e.insertBefore(t,i),t=r}},pe=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},ue=`{{lit-${String(Math.random()).slice(2)}}}`,he=`\x3c!--${ue}--\x3e`,me=new RegExp(`${ue}|${he}`);class ge{constructor(e,t){this.parts=[],this.element=t;const r=[],i=[],s=document.createTreeWalker(t.content,133,null,!1);let o=0,n=-1,a=0;const{strings:d,values:{length:l}}=e;for(;a<l;){const e=s.nextNode();if(null!==e){if(n++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let i=0;for(let e=0;e<r;e++)fe(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=d[a],r=be.exec(t)[2],i=r.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const o=s.split(me);this.parts.push({type:"attribute",index:n,name:r,strings:o}),a+=o.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),s.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(ue)>=0){const i=e.parentNode,s=t.split(me),o=s.length-1;for(let t=0;t<o;t++){let r,o=s[t];if(""===o)r=ve();else{const e=be.exec(o);null!==e&&fe(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),r=document.createTextNode(o)}i.insertBefore(r,e),this.parts.push({type:"node",index:++n})}""===s[o]?(i.insertBefore(ve(),e),r.push(e)):e.data=s[o],a+=o}}else if(8===e.nodeType)if(e.data===ue){const t=e.parentNode;null!==e.previousSibling&&n!==o||(n++,t.insertBefore(ve(),e)),o=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(r.push(e),n--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(ue,t+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=i.pop()}for(const e of r)e.parentNode.removeChild(e)}}const fe=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},ye=e=>-1!==e.index,ve=()=>document.createComment(""),be=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function we(e,t){const{element:{content:r},parts:i}=e,s=document.createTreeWalker(r,133,null,!1);let o=Se(i),n=i[o],a=-1,d=0;const l=[];let c=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==n&&n.index===a;)n.index=null!==c?-1:n.index-d,o=Se(i,o),n=i[o]}l.forEach(e=>e.parentNode.removeChild(e))}const xe=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},Se=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(ye(t))return r}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Ee=new WeakMap,_e=e=>(...t)=>{const r=e(...t);return Ee.set(r,!0),r},Oe=e=>"function"==typeof e&&Ee.has(e),Ie={},ke={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class De{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=le?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],r=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let s,o=0,n=0,a=i.nextNode();for(;o<r.length;)if(s=r[o],ye(s)){for(;n<s.index;)n++,"TEMPLATE"===a.nodeName&&(t.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=t.pop(),a=i.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return le&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Ne=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),Re=` ${ue} `;class Ue{constructor(e,t,r,i){this.strings=e,this.values=t,this.type=r,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let i=0;i<e;i++){const e=this.strings[i],s=e.lastIndexOf("\x3c!--");r=(s>-1||r)&&-1===e.indexOf("--\x3e",s+1);const o=be.exec(e);t+=null===o?e+(r?Re:he):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+ue}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==Ne&&(t=Ne.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Te=e=>null===e||!("object"==typeof e||"function"==typeof e),Pe=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class $e{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new Ae(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!Pe(e))return e}let i="";for(let s=0;s<t;s++){i+=e[s];const t=r[s];if(void 0!==t){const e=t.value;if(Te(e)||!Pe(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Ae{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===Ie||Te(e)&&e===this.value||(this.value=e,Oe(e)||(this.committer.dirty=!0))}commit(){for(;Oe(this.value);){const e=this.value;this.value=Ie,e(this)}this.value!==Ie&&this.committer.commit()}}class Ce{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(ve()),this.endNode=e.appendChild(ve())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=ve()),e.__insert(this.endNode=ve())}insertAfterPart(e){e.__insert(this.startNode=ve()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}const e=this.__pendingValue;e!==Ie&&(Te(e)?e!==this.value&&this.__commitText(e):e instanceof Ue?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Pe(e)?this.__commitIterable(e):e===ke?(this.value=ke,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof De&&this.value.template===t)this.value.update(e.values);else{const r=new De(t,e.processor,this.options),i=r._clone();r.update(e.values),this.__commitNode(i),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,i=0;for(const s of e)r=t[i],void 0===r&&(r=new Ce(this.options),t.push(r),0===i?r.appendIntoPart(this):r.insertAfterPart(t[i-1])),r.setValue(s),r.commit(),i++;i<t.length&&(t.length=i,this.clear(r&&r.endNode))}clear(e=this.startNode){pe(this.startNode.parentNode,e.nextSibling,this.endNode)}}class Me{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}if(this.__pendingValue===Ie)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=Ie}}class Le extends $e{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new je(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class je extends Ae{}let Ve=!1;(()=>{try{const e={get capture(){return Ve=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class qe{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}if(this.__pendingValue===Ie)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=Be(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=Ie}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const Be=e=>e&&(Ve?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function ze(e){let t=Fe.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Fe.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const i=e.strings.join(ue);return r=t.keyString.get(i),void 0===r&&(r=new ge(e,e.getTemplateElement()),t.keyString.set(i,r)),t.stringsArray.set(e.strings,r),r}const Fe=new Map,Ge=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const He=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,r,i){const s=t[0];if("."===s){return new Le(e,t.slice(1),r).parts}return"@"===s?[new qe(e,t.slice(1),i.eventContext)]:"?"===s?[new Me(e,t.slice(1),r)]:new $e(e,t,r).parts}handleTextExpression(e){return new Ce(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const Qe=(e,...t)=>new Ue(e,t,"html",He),We=(e,t)=>`${e}--${t}`;let Ye=!0;void 0===window.ShadyCSS?Ye=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Ye=!1);const Ze=e=>t=>{const r=We(t.type,e);let i=Fe.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},Fe.set(r,i));let s=i.stringsArray.get(t.strings);if(void 0!==s)return s;const o=t.strings.join(ue);if(s=i.keyString.get(o),void 0===s){const r=t.getTemplateElement();Ye&&window.ShadyCSS.prepareTemplateDom(r,e),s=new ge(t,r),i.keyString.set(o,s)}return i.stringsArray.set(t.strings,s),s},Je=["html","svg"],Xe=new Set,Ke=(e,t,r)=>{Xe.add(e);const i=r?r.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:o}=s;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(i,e);const n=document.createElement("style");for(let e=0;e<o;e++){const t=s[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{Je.forEach(t=>{const r=Fe.get(We(t,e));void 0!==r&&r.keyString.forEach(e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{r.add(e)}),we(e,r)})})})(e);const a=i.content;r?function(e,t,r=null){const{element:{content:i},parts:s}=e;if(null==r)return void i.appendChild(t);const o=document.createTreeWalker(i,133,null,!1);let n=Se(s),a=0,d=-1;for(;o.nextNode();){for(d++,o.currentNode===r&&(a=xe(t),r.parentNode.insertBefore(t,r));-1!==n&&s[n].index===d;){if(a>0){for(;-1!==n;)s[n].index+=a,n=Se(s,n);return}n=Se(s,n)}}}(r,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(r){a.insertBefore(n,a.firstChild);const e=new Set;e.add(n),we(r,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const et={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},tt=(e,t)=>t!==e&&(t==t||e==e),rt={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:tt};class it extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,r)=>{const i=this._attributeNameForProperty(r,t);void 0!==i&&(this._attributeToPropertyMap.set(i,r),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=rt){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdateInternal(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||rt}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=tt){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,i=t.converter||et,s="function"==typeof i?i:i.fromAttribute;return s?s(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,i=t.converter;return(i&&i.toAttribute||et.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=rt){const i=this.constructor,s=i._attributeNameForProperty(e,r);if(void 0!==s){const e=i._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,i=r._attributeToPropertyMap.get(e);if(void 0!==i){const e=r.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let i=!0;if(void 0!==e){const s=this.constructor;r=r||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}it.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const st=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:i}=t;return{kind:r,elements:i,finisher(t){window.customElements.define(e,t)}}})(e,t),ot=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function nt(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):ot(e,t)}function at(e,t){return(r,i)=>{const s={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():`__${i}`;s.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==i?dt(s,r,i):lt(s,r)}}const dt=(e,t,r)=>{Object.defineProperty(t,r,e)},lt=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});const ct=Element.prototype;ct.msMatchesSelector||ct.webkitMatchesSelector;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const pt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ut=Symbol();class ht{constructor(e,t){if(t!==ut)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(pt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const mt=(e,...t)=>{const r=t.reduce((t,r,i)=>t+(e=>{if(e instanceof ht)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[i+1],e[0]);return new ht(r,ut)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const gt={};class ft extends it{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e),r),r=t(e,new Set),i=[];r.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!pt){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ht(String(t),ut)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?pt?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==gt&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return gt}}ft.finalized=!0,ft.render=(e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,s=Ge.has(t),o=Ye&&11===t.nodeType&&!!t.host,n=o&&!Xe.has(i),a=n?document.createDocumentFragment():t;if(((e,t,r)=>{let i=Ge.get(t);void 0===i&&(pe(t,t.firstChild),Ge.set(t,i=new Ce(Object.assign({templateFactory:ze},r))),i.appendInto(t)),i.setValue(e),i.commit()})(e,a,Object.assign({templateFactory:Ze(i)},r)),n){const e=Ge.get(a);Ge.delete(a);const r=e.value instanceof De?e.value.template:void 0;Ke(i,a,r),pe(t,t.firstChild),t.appendChild(a),Ge.set(t,e)}!s&&o&&window.ShadyCSS.styleElement(t.host)};const yt=mt`
  @keyframes slide-in {
    from {
      opacity: calc(1 - var(--should-fade));
      transform: translateY(var(--offset-y));
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`,vt=mt`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`,bt=mt`
  button,
  input,
  .selectable {
    outline: none;
  }
`,wt=mt`
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--bg-primary-light);
    box-shadow: var(--color-shadow) 0px 1px 5px 0px;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
`,xt=mt`
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: var(--color-text-dark);
    background-color: var(--bg-primary-light);
    transition: background-color 0.3s;
  }

  input::placeholder {
    color: var(--color-input-hint);
  }

  input {
    font: inherit;
    margin: 15px 0;
    padding: 5px;
    box-sizing: border-box;
    border: 3px solid;
    border-radius: 3px;
    border-color: var(--color-input-primary);
    transition: border-color 0.5s;
  }

  input:hover {
    border-color: var(--color-input-primary-dark);
  }

  input[invalid] {
    border-color: var(--color-input-error);
  }

  input[valid] {
    border-color: var(--color-input-success);
  }

  input:focus {
    animation: glow 1.5s infinite;
  }

  @keyframes glow {
    0% {
      border-color: var(--color-input-primary-dark);
    }
    50% {
      border-color: var(--color-input-primary);
    }
    100% {
      border-color: var(--color-input-primary-dark);
    }
  }
`,St=mt`
  .password-container {
    position: relative;
  }

  .password-container > input {
    width: 100%;
  }

  .password-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 15px;
    bottom: 15px;
    fill: var(--color-input-password);
    cursor: pointer;
  }

  .password-toggle::after {
    background-image: radial-gradient(
      circle farthest-side,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.12) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: -5px;
    right: -5px;
    content: '';
    visibility: hidden;
  }

  .password-toggle:focus::after {
    visibility: visible;
    animation: pulse 0.7s infinite alternate;
  }

  .password-toggle > svg > #stroke {
    transform: scale(0);
    transition: transform 0.3s;
    transform-origin: 10% 10%;
  }

  .password-toggle[visible] > svg > #stroke {
    transform: scale(1);
  }

  @keyframes pulse {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`,Et=mt`
  button {
    font: inherit;
    cursor: pointer;
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }

  button[solid] {
    color: var(--color-text-light);
    background-color: var(--color-primary);
    box-shadow: 0 1px 5px 0px rgba(var(--color-shadow-primary-rgb), 0.5);
    transition: background-color 0.3s, box-shadow 0.3s;
  }

  button[plain] {
    color: var(--color-primary);
    background-color: transparent;
    transition: background-color 0.3s;
  }

  button[outline] {
    color: var(--color-primary);
    border-width: 2px;
    border-style: solid;
    border-color: var(--color-primary);
    background-color: var(--bg-primary-light);
    box-shadow: 0 1px 5px 0px rgba(var(--color-shadow-primary-rgb), 0.5);
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s,
      border-color 0.3s;
  }

  button[selected] {
    color: var(--color-text-light);
    background-color: var(--color-primary);
  }

  @media (hover: hover) {
    button[solid]:hover {
      background-color: var(--color-primary-dark);
      box-shadow: 0px 2px 9px 1px
        rgba(var(--color-shadow-primary-dark-rgb), 0.5);
    }

    button[plain]:hover {
      background-color: var(--hover-highlight);
    }

    button[outline]:hover {
      border-color: var(--color-primary-dark);
      background-color: var(--hover-highlight);
      box-shadow: 0px 2px 9px 1px
        rgba(var(--color-shadow-primary-dark-rgb), 0.5);
    }

    button[selected]:hover {
      border-color: var(--color-primary-dark);
      background-color: var(--color-primary-dark);
    }
  }

  button[solid]:focus,
  button[solid]:active {
    background-color: var(--color-primary-dark);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-shadow-primary-dark-rgb), 0.5);
  }

  button[plain]:focus,
  button[plain]:active {
    background-color: var(--hover-highlight);
  }

  button[outline]:focus,
  button[outline]:active {
    border-color: var(--color-primary-dark);
    background-color: var(--hover-highlight);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-shadow-primary-dark-rgb), 0.5);
  }

  button[selected]:focus,
  button[selected]:active {
    border-color: var(--color-primary-dark);
    background-color: var(--color-primary-dark);
  }

  button[static],
  button[static]:hover,
  button[static]:focus,
  button[static]:active {
    box-shadow: 0 1px 5px 0px rgba(var(--color-shadow-primary-rgb), 0.3);
  }
`,_t=(e,t)=>{let r=(null==t?void 0:t.autoBlur)||!0,i=(null==t?void 0:t.debounce)||!0,s=!1;return t=>{if(s)return;if(i&&(s=!0,setTimeout(()=>s=!1,1e3)),r){t.currentTarget.blur()}let o=t.type;if("click"===o)e(t);else if("keydown"===o){let r=t.key;"Enter"!==r&&" "!==r||e(t)}}},Ot=new WeakMap,It=_e(e=>t=>{const r=Ot.get(t);if(void 0===e&&t instanceof Ae){if(void 0!==r||!Ot.has(t)){const e=t.committer.name;t.committer.element.removeAttribute(e)}}else e!==r&&t.setValue(e);Ot.set(t,e)});var kt;!function(e){e[e.PENDING=0]="PENDING",e[e.INVALID=1]="INVALID",e[e.VALID=2]="VALID"}(kt||(kt={}));const Dt=()=>({value:"",validity:kt.PENDING}),Nt=()=>({value:"",validity:kt.PENDING,visible:!1}),Rt=e=>t=>{let r=t.target,i=r.value,s=kt.PENDING;i.length>0&&(s=r.validity.valid?kt.VALID:kt.INVALID),e({value:i,validity:s})},Ut=(e,t,r,i)=>{const s=(null==i?void 0:i.placeholder)||"",o=(null==i?void 0:i.label)||"";return Qe`
    <input
      id="${It(null==i?void 0:i.id)}"
      required
      type="text"
      tabindex="0"
      placeholder="${s}"
      autocomplete="off"
      aria-label="${o}"
      value="${e.value}"
      ?invalid="${e.validity===kt.INVALID}"
      ?valid="${e.validity===kt.VALID}"
      @focus="${t}"
      @blur="${Rt(r)}"
      @input="${e=>{if(null==i?void 0:i.changeText){let t=e.currentTarget;t.value=i.changeText(t.value)}}}"
    />
  `},Tt=(e,t,r,i)=>{const s=_t(()=>r({...e,visible:!e.visible}),{autoBlur:!1,debounce:!1});return Qe`
    <div class="password-container">
      <input
        required
        tabindex="0"
        minlength="8"
        placeholder="Password"
        aria-label="Password input"
        autocomplete="current-password"
        value="${e.value}"
        type="${e.visible?"text":"password"}"
        ?invalid="${e.validity===kt.INVALID}"
        ?valid="${e.validity===kt.VALID}"
        @focus="${t}"
        @blur="${Rt(e=>r(e))}"
        @keydown="${e=>{"Enter"===e.key&&i(e)}}"
      />

      <div
        tabindex="0"
        aria-label="Toggle password visibility"
        class="password-toggle selectable"
        @click="${s}"
        @keydown="${s}"
        ?visible="${e.visible}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
          <path
            id="stroke"
            d="m2.71,3.16c-0.39,0.39 -0.39,1.02 0,1.41l16.32,16.33c0.39,0.39 1.02,0.39 1.41,0c0.39,-0.39 0.39,-1.02 0,-1.41l-16.31,-16.33c-0.39,-0.39 -1.03,-0.39 -1.42,0z"
          />
        </svg>
      </div>
    </div>
  `};var Pt=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let $t=class extends ft{constructor(){super(...arguments),this.errorMessage="",this.errorVisible=!1,this.isProcessing=!1,this.emailState=Dt(),this.passwordState=Nt(),this.onSubmit=_t(e=>{if(e.preventDefault(),this.emailState.validity!==kt.VALID)return void this.showError("Please enter a valid email address!");if(this.passwordState.validity!==kt.VALID)return void this.showError("Please enter a valid password!");if(this.isProcessing)return;this.isProcessing=!0;let t={email:this.emailState.value,password:this.passwordState.value},r=se.requestSignIn(t);w.dispatch(r)})}connectedCallback(){super.connectedCallback();w.listen(y.AUTH,(e,t)=>{if(e.action.type===te.REQUEST_SIGN_IN_FAILED){let t=e.action.payload;this.isProcessing=!1,this.showError(t.message)}else e.action.type===te.SIGNED_IN&&(t(),this.successfullLogin())}),window.PasswordCredential&&navigator.credentials.get({password:!0,mediation:"required"}).then(e=>{if(e){let t=e;this.emailState.value=t.id,this.passwordState.value=t.password}})}successfullLogin(){if(window.PasswordCredential){var e=new window.PasswordCredential({id:this.emailState.value,password:this.passwordState.value});navigator.credentials.store(e)}let t=new Event("signed-in");this.dispatchEvent(t)}showError(e){this.errorMessage=e,this.errorVisible=!0}render(){return Qe`
      <div id="root" tabindex="0" class="selectable">
        <form
          id="form"
          class="card"
          @submit="${e=>e.preventDefault()}"
          novalidate
        >
          <h3>Sign in</h3>

          ${e=this.emailState,t=()=>{this.emailState={...this.emailState,validity:kt.PENDING},this.errorVisible=!1},r=e=>this.emailState=e,Qe`
    <input
      required
      type="email"
      tabindex="0"
      placeholder="Email"
      autocomplete="off"
      aria-label="Email input"
      value="${e.value}"
      ?invalid="${e.validity===kt.INVALID}"
      ?valid="${e.validity===kt.VALID}"
      @focus="${t}"
      @blur="${Rt(r)}"
    />
  `}
          ${Tt(this.passwordState,()=>{this.passwordState={...this.passwordState,validity:kt.PENDING},this.errorVisible=!1},e=>this.passwordState=e,e=>this.onSubmit(e))}

          <button
            id="submit"
            tabindex="0"
            @click=${this.onSubmit}
            @keydown="${e=>{var t,r;"Tab"===e.key&&(null===(r=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===r||r.focus())}}"
            solid
          >
            ${this.isProcessing?"Loading...":"Continue"}
          </button>

          <p
            id="error"
            aria-label="Input error"
            ?aria-errormessage="${this.errorVisible}"
            aria-hidden="${!this.errorVisible}"
          >
            ${this.errorMessage}
          </p>
        </form>
      </div>
    `;var e,t,r}static get styles(){return[bt,xt,St,wt,Et,mt`
        #root {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        form {
          width: 70%;
          --offset-reduce: 170px;
          --total-offset: calc(var(--offset-height) + var(--offset-reduce));
          transform: translateY(calc(var(--total-offset) * var(--offset-on)));
          transition: transform 0.3s;
        }

        h3 {
          margin: 15px 0 10px;
          color: var(--color-text-dark);
        }

        .card {
          border-radius: 5px;
          padding: 10px 20px;
        }

        input[type='email'] {
          margin-bottom: 0px;
        }

        #submit {
          font-size: 1.2rem;
          width: 100%;
        }

        #error {
          max-height: 0px;
          opacity: 0;
          transition: 0.5s all;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.8rem;
          color: var(--color-text-dark);
        }

        #error[aria-hidden='false'] {
          max-height: 2.4rem;
          opacity: 1;
        }
      `]}};Pt([nt({type:String})],$t.prototype,"errorMessage",void 0),Pt([nt({type:Boolean})],$t.prototype,"errorVisible",void 0),Pt([nt({type:Boolean})],$t.prototype,"isProcessing",void 0),Pt([nt({type:Object})],$t.prototype,"emailState",void 0),Pt([nt({type:Object})],$t.prototype,"passwordState",void 0),$t=Pt([st("login-view")],$t);var At,Ct=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};!function(e){e[e.OPENING=0]="OPENING",e[e.OPENED=1]="OPENED",e[e.CLOSING=2]="CLOSING",e[e.INPUT_FOCUSED=3]="INPUT_FOCUSED"}(At||(At={}));let Mt=class extends ft{constructor(){super(...arguments),this.state=At.OPENING,this.closePrompt=!1}firstUpdated(){let e=()=>{this.state===At.OPENING?this.state=At.OPENED:this.state===At.CLOSING&&(this._dialog.removeEventListener("animationend",e),this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0})))};this._dialog.addEventListener("animationend",e)}reset(){this.dispatchEvent(new Event("reset"))}close(){this.state===At.INPUT_FOCUSED?(this.closePrompt=!0,this.reset()):this.state===At.OPENED&&(this.state=At.CLOSING)}render(){return Qe`<div
      tabindex="0"
      id="root"
      class="selectable"
      ?hide="${this.state===At.CLOSING}"
      ?show="${this.state===At.OPENING}"
      ?ready="${this.state===At.OPENED||this.state===At.INPUT_FOCUSED}"
      aria-label="Close dialog"
      @click="${this.close}"
    >
      <div
        id="dialog"
        class="dialog card"
        aria-label="Dialog"
        @click="${e=>{if(e.stopPropagation(),this.state===At.INPUT_FOCUSED&&window.offsetOn){if(e.composedPath()[0].tagName.toLowerCase().includes("input"))return;this.reset()}}}"
      >
        <slot></slot>

        ${this.closePrompt?Qe` <div class="close-prompt" @click="${this.close}">
              <p>Tap again to close</p>
            </div>`:""}
      </div>
    </div>`}static get styles(){return[bt,wt,vt,mt`
        :host {
          --offset-reduce: 0px;
          --offset-total: calc(var(--offset-height) + var(--offset-reduce));
          --offset-dialog: calc(var(--offset-total) * var(--offset-on));
        }

        #root {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          width: 100%;
          height: 100%;
          padding: 0 15px;
          display: flex;
          overflow: hidden;
          align-items: center;
          box-sizing: border-box;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        #root[show] {
          animation: fade-in 0.5s;
        }

        #root[hide] {
          animation: fade-out 0.5s;
        }

        #root[show] > .dialog {
          animation: scale-in 0.5s;
        }

        #root[hide] > .dialog {
          animation: scale-out 0.5s;
        }

        #root[ready] > .dialog {
          pointer-events: auto;
          transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }

        .dialog {
          width: 100%;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 15px 20px;
          pointer-events: none;
          transform-style: preserve-3d;
          transform: perspective(100px) translateZ(0px)
            translateY(var(--offset-dialog));
        }

        .close-prompt {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -100px;
          text-align: center;
          pointer-events: auto;
          animation: fade-in 0.5s;
        }

        .close-prompt > p {
          padding: 10px;
          font-weight: 500;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.1);
          color: var(--color-text-light);
          display: inline-block;
        }

        @keyframes scale-in {
          from {
            transform: perspective(100px) translateZ(10px);
          }
          to {
            transform: perspective(100px) translateZ(0px);
          }
        }

        @keyframes scale-out {
          to {
            transform: perspective(100px) translateZ(5px);
          }
        }
      `]}};Ct([nt({type:Number})],Mt.prototype,"state",void 0),Ct([nt({type:Boolean})],Mt.prototype,"closePrompt",void 0),Ct([at("#dialog")],Mt.prototype,"_dialog",void 0),Mt=Ct([st("custom-dialog")],Mt);var Lt=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let jt=class extends ft{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.branch=this.authUser.branch,this.departments=w.departments.items,this.nameState=Dt(),this.rankState=Dt(),this.emailState=Dt(),this.passwordState=Nt(),this.errorState={message:"",visible:!1},this.editing=!1,this.isRegularState=!1,this.showDepartmentSelector=!1,this.hideDepartmentSelector=!1,this.dialogState=At.OPENING}connectedCallback(){super.connectedCallback(),this.user&&(this.nameState={value:this.user.name,validity:kt.VALID},this.rankState={value:this.user.rank.text,validity:kt.VALID},this.emailState={value:this.user.email.split("@")[0],validity:kt.VALID},this.isRegularState=this.user.regular)}showError(e){this.errorState={visible:!0,message:e}}checkValidity(){this.rankState.validity!==kt.VALID?this.showError("Please enter a valid rank!"):this.nameState.validity!==kt.VALID?this.showError("Please enter a valid name!"):this.emailState.validity!==kt.VALID?this.showError("Please enter a valid email!"):this.editing||this.passwordState.validity===kt.VALID||this.showError("Please enter a valid password!")}submit(){return _t(()=>{if(this.dialogState===At.INPUT_FOCUSED&&window.offsetOn)return;if(this.checkValidity(),this.errorState.visible)return;const e=this.nameState.value.trim(),t=new U(this.rankState.value.trim()),r=this.emailState.value.trim()+"@"+this.branch.domain,i=this.isRegularState,s=this.department.id;let o,n={name:e,rank:t,email:r,regular:i,branchid:this.branch.id,departmentid:s};if(this.editing)o=O.requestModify({...this.user,...n});else{const e=this.passwordState.value.trim();let t=new m({...n,password:e});o=O.requestAdd(t)}w.dispatch(o),this.dialogState=At.CLOSING})}changePassword(){return _t(()=>{if(this.passwordState.validity!==kt.VALID)return void this.showError("Please enter a valid password!");const e=this.passwordState.value,t=O.requestModify({...this.user,password:e});w.dispatch(t),this.passwordState.value=""})}delete(){return _t(()=>{let e=O.requestRemove(this.user);w.dispatch(e),this.dialogState=At.CLOSING})}onInputFocus(){this.errorState={...this.errorState,visible:!1},this.dialogState=At.INPUT_FOCUSED}render(){return Qe`<custom-dialog
      .state="${this.dialogState}"
      @reset="${()=>this.dialogState=At.OPENED}"
    >
      <div id="root" tabindex="0" class="selectable">
        <p
          id="department-name"
          @click="${()=>this.showDepartmentSelector=!0}"
        >
          ${this.department.name}
        </p>

        <div class="header">
          <h3>${this.editing?"Edit":"Add"} User</h3>

          ${this.editing?Qe` <button
                plain
                id="delete"
                @click="${this.delete()}"
                aria-label="Delete user"
              >
                delete
              </button>`:""}
        </div>

        <div id="rankname" class="row-box">
          ${Ut(this.rankState,()=>{this.rankState={...this.rankState,validity:kt.PENDING},this.onInputFocus()},e=>{let t=U.isValid(e.value.toUpperCase());e.validity===kt.PENDING||t||(e.validity=kt.INVALID),this.rankState=e},{placeholder:"Rank",label:"Rank",id:"rank",changeText:e=>e.replace(/\W/g,"")})}
          ${Ut(this.nameState,()=>{this.nameState={...this.nameState,validity:kt.PENDING},this.onInputFocus()},e=>this.nameState=e,{placeholder:"Name",label:"Name",id:"name"})}
        </div>

        <div id="email" class="row-box">
          ${Ut(this.emailState,()=>{this.emailState={...this.emailState,validity:kt.PENDING},this.onInputFocus()},e=>this.emailState=e,{placeholder:"Email",label:"Email",changeText:e=>e.replace(/\W/g,"")})}

          <p>@${this.branch.domain}</p>
        </div>

        <div id="password" class="row-box">
          ${Tt(this.passwordState,()=>{this.passwordState={...this.passwordState,validity:kt.PENDING},this.onInputFocus()},e=>this.passwordState=e,()=>{})}

          <button
            plain
            id="change"
            ?hidden="${!this.editing}"
            @click=${this.changePassword()}
          >
            change
          </button>
        </div>

        <div class="regular-box">
          <input
            type="checkbox"
            .checked="${this.isRegularState}"
            @click="${()=>this.isRegularState=!this.isRegularState}"
          />

          <label for="regular">Regular serviceman</label>
        </div>

        <button
          id="confirm"
          @click=${this.submit()}
          aria-label="Add/Edit department"
          @keydown="${e=>{var t,r;"Tab"===e.key&&(null===(r=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===r||r.focus())}}"
          solid
        >
          Confirm
        </button>

        <p class="error card" ?show=${this.errorState.visible}>
          ${this.errorState.message}
        </p>

        ${this.showDepartmentSelector?Qe`
              <div
                id="department-selector"
                ?hide="${this.hideDepartmentSelector}"
              >
                <div class="card">
                  ${this.departments.map(e=>Qe`<p
                      class="selectable"
                      tabindex="0"
                      @click="${()=>{this.department=e,this._departmentSelector.addEventListener("animationend",()=>{this.showDepartmentSelector=!1,this.hideDepartmentSelector=!1},{once:!0}),this.hideDepartmentSelector=!0}}"
                    >
                      ${e.name}
                    </p>`)}
                </div>
              </div>
            `:""}
      </div>
    </custom-dialog>`}static get styles(){return[bt,Et,wt,xt,St,vt,mt`
        custom-dialog {
          --offset-reduce: 160px;
        }

        #root {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        input {
          margin: 0;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .header > h3 {
          color: var(--color-text-primary);
        }

        .row-box {
          width: 100%;
          display: flex;
          align-items: center;
        }

        #rankname,
        #password {
          margin-bottom: 10px;
        }

        #email {
          margin-bottom: 8px;
        }

        #rank {
          text-transform: uppercase;
          width: 25%;
        }

        #rank::placeholder {
          text-transform: none;
        }

        #name {
          text-transform: capitalize;
          margin-left: 15px;
          width: calc(75% - 15px);
        }

        #email > p {
          margin: 0 15px;
          color: var(--color-text-primary);
        }

        #email > input {
          flex-grow: 1;
          min-width: 0;
        }

        #password > .password-container {
          flex-grow: 1;
        }

        #password > #change {
          font-size: 1rem;
          margin: 0 0 0 10px;
        }

        .password-container > .password-toggle {
          top: 0px;
          right: 15px;
          bottom: 0px;
        }

        .password-container > input {
          margin: 0;
        }

        .regular-box {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .regular-box > label {
          font-size: 1rem;
          color: var(--color-text-primary);
        }

        .regular-box > input {
          margin: 0 10px 0 0;
          position: relative;
        }

        .regular-box > input::before {
          position: absolute;
          top: -5px;
          bottom: -5px;
          left: -5px;
          right: -5px;
          border-radius: 30px;
          content: '';
          z-index: -1;
          background-color: transparent;
          transition: background-color 0.3s;
        }

        .regular-box > input:focus::before,
        .regular-box > input:active::before {
          background-color: #cacad8;
        }

        @media (hover: hover) {
          .regular-box > input:hover::before {
            background-color: #cacad8;
          }
        }

        .error {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3rem;
          text-align: center;
          color: var(--color-primary);
          margin: 0;
          padding: 10px;
          border-radius: 5px;
          transform: translateY(50%);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
        }

        .error[show] {
          transform: translateY(0);
          opacity: 1;
        }

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
          width: 100%;
          margin-top: 10px;
        }

        #department-name {
          width: 100%;
          text-align: center;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 900;
          color: var(--color-text-primary);
        }

        #department-selector {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #00000057;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
          animation: fade-in 0.5s;
        }

        #department-selector[hide] {
          animation: fade-out 0.5s;
        }

        #department-selector .card {
          border-radius: 5px;
        }

        #department-selector p {
          margin: 0;
          padding: 20px;
          transition: background-color 0.3s;
        }

        #department-selector p:active,
        #department-selector p:focus {
          background-color: rgba(0, 0, 0, 0.1);
        }

        @media (hover: hover) {
          #department-selector p:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      `]}};Lt([at("#department-selector")],jt.prototype,"_departmentSelector",void 0),Lt([nt({type:Object})],jt.prototype,"user",void 0),Lt([nt({type:Object})],jt.prototype,"department",void 0),Lt([nt({type:Object})],jt.prototype,"nameState",void 0),Lt([nt({type:Object})],jt.prototype,"rankState",void 0),Lt([nt({type:Object})],jt.prototype,"emailState",void 0),Lt([nt({type:Object})],jt.prototype,"passwordState",void 0),Lt([nt({type:Object})],jt.prototype,"errorState",void 0),Lt([nt({type:Boolean})],jt.prototype,"editing",void 0),Lt([nt({type:Boolean})],jt.prototype,"isRegularState",void 0),Lt([nt({type:Boolean})],jt.prototype,"showDepartmentSelector",void 0),Lt([nt({type:Boolean})],jt.prototype,"hideDepartmentSelector",void 0),Lt([nt({type:Number})],jt.prototype,"dialogState",void 0),jt=Lt([st("edit-user")],jt);var Vt=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let qt=class extends ft{constructor(){super(...arguments),this.nameState=Dt(),this.dialogState=At.OPENING,this.editing=!1}connectedCallback(){super.connectedCallback(),this.department&&(this.nameState.value=this.department.name)}submit(){if(this.dialogState!==At.INPUT_FOCUSED||!window.offsetOn)if(0!==this.nameState.value.length){if(this.editing){let e=S.requestModify({...this.department,name:this.nameState.value.trim()});w.dispatch(e)}else{let e=S.requestAdd({id:"0",name:this.nameState.value.trim()});w.dispatch(e)}this.dialogState=At.CLOSING}else this.nameState={...this.nameState,validity:kt.INVALID}}delete(){let e=S.requestRemove(this.department);w.dispatch(e),this.dialogState=At.CLOSING}onInputFocus(){this.dialogState=At.INPUT_FOCUSED}render(){return Qe`<custom-dialog
      .state="${this.dialogState}"
      @reset="${()=>this.dialogState=At.OPENED}"
    >
      <div id="root" tabindex="0" class="selectable">
        <div class="header">
          <h3>Department</h3>

          ${this.editing?Qe`<button
                plain
                id="delete"
                @click="${this.delete}"
                aria-label="Delete department"
              >
                delete
              </button>`:""}
        </div>

        ${Ut(this.nameState,()=>this.onInputFocus(),e=>{this.nameState=e},{placeholder:"e.g. Log Branch",label:"Department name"})}

        <button
          solid
          id="confirm"
          @click="${this.submit}"
          aria-label="Add/Edit department"
          @keydown="${e=>{var t,r;"Tab"===e.key&&(null===(r=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===r||r.focus())}}"
        >
          Confirm
        </button>
      </div>
    </custom-dialog>`}static get styles(){return[bt,Et,wt,xt,mt`
        custom-dialog {
          --offset-reduce: 190px;
        }

        #root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        input {
          font-size: 1.2rem;
          padding: 10px;
          margin-bottom: 20px;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        h3 {
          color: var(--color-text-primary);
          margin-bottom: 8px;
        }

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
        }
      `]}};Vt([nt({type:Object})],qt.prototype,"department",void 0),Vt([nt({type:Object})],qt.prototype,"nameState",void 0),Vt([nt({type:Number})],qt.prototype,"dialogState",void 0),Vt([nt({type:Boolean})],qt.prototype,"editing",void 0),qt=Vt([st("edit-department")],qt);var Bt=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let zt=class extends ft{signOut(){this.dispatchEvent(new Event("signed-out",{bubbles:!0,composed:!0}))}render(){return Qe`<custom-dialog>
      <div id="root">
        <h4>Are you sure you want sign out?</h4>
        <button solid @click="${this.signOut}">Yes. I'm positive.</button>
      </div>
    </custom-dialog>`}static get styles(){return[bt,Et,mt`
        #root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        h4 {
          width: 100%;
          color: #313131;
          margin-top: 15px;
          color: var(--color-text-dark);
        }
      `]}};zt=Bt([st("sign-out")],zt);var Ft=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let Gt=class extends ft{constructor(){super(...arguments),this.showSignOutDialog=!1,this.elevate=!1}firstUpdated(){this.addEventListener("elevate",e=>{this.elevate=e.detail})}render(){return Qe`<button
        id="welcome-text"
        tabindex="0"
        @click="${_t(()=>this.showSignOutDialog=!0)}"
        aria-label="Open sign out dialog"
        plain
        ?elevate="${this.elevate}"
      >
        <slot></slot>
      </button>

      ${this.showSignOutDialog?Qe`<sign-out
            @close="${()=>this.showSignOutDialog=!1}"
          ></sign-out>`:""}`}static get styles(){return[bt,Et,mt`
        button#welcome-text {
          transition: background-color 0.3s, box-shadow 0.5s !important;
        }

        button[plain] {
          background-color: var(--app-bar);
        }

        button {
          position: absolute;
          width: 100%;
          padding: 10px;
          z-index: 10;
          font-weight: 500;
          font-size: 1.1rem;
          box-shadow: none;
          color: var(--color-primary);
          border-radius: 0px;
        }
        button[elevate] {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
        }
      `]}};Ft([nt({type:Boolean})],Gt.prototype,"showSignOutDialog",void 0),Ft([nt({type:Boolean})],Gt.prototype,"elevate",void 0),Gt=Ft([st("welcome-text")],Gt);var Ht=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let Qt=class extends ft{constructor(){super(...arguments),this.showEditDepartment=!1,this.showEditUser=!1,this.isEmpty=!0,this.index=0}onEditDepartment(){return _t(()=>{this.showEditDepartment=!0})}onAddUser(){return _t(()=>{this.selectedUser=void 0,this.showEditUser=!0})}closeEditDepartment(e){e.stopPropagation(),this.showEditDepartment=!1}closeEditUser(e){e.stopPropagation(),this.showEditUser=!1,this.selectedUser=void 0}onEditUser(e){this.selectedUser=e.detail.user,this.showEditUser=!0}onListChanged(e){const t=e.detail.users;this.isEmpty=0===t.length}render(){return Qe`<div id="root" style="--anim-delay:${this.index/10+.2}s;">
      <div class="header">
        <h3>${this.department.name}</h3>
        <button id="edit" plain @click="${this.onEditDepartment()}">
          edit
        </button>
      </div>

      <div class="card">
        <button
          id="add"
          plain
          @click="${this.onAddUser()}"
          ?empty="${this.isEmpty}"
        >
          Add user
        </button>

        <admin-user-list
          .department="${this.department}"
          @user-selected="${this.onEditUser}"
          @list-changed="${this.onListChanged}"
        ></admin-user-list>

        ${this.showEditDepartment?Qe`<edit-department
              editing
              .department=${this.department}
              @close="${this.closeEditDepartment}"
            ></edit-department>`:""}
        ${this.showEditUser?Qe`
              <edit-user
                .department=${this.department}
                .user=${this.selectedUser}
                .editing=${!!this.selectedUser}
                @close="${this.closeEditUser}"
              ></edit-user>
            `:""}
      </div>
    </div>`}static get styles(){return[bt,yt,Et,wt,mt`
        #root {
          --offset-y: 10px;
          --should-fade: 1;
          width: 100%;
          margin: inherit;
          animation: slide-in 0.5s backwards;
          animation-delay: var(--anim-delay);
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .header h3 {
          color: #828282;
          text-transform: capitalize;
          font-weight: 500;
          margin: 0;
          color: var(--color-text-primary);
        }

        .header #edit {
          font-size: 1.3rem;
        }

        .card {
          border-radius: 15px;
        }

        #add {
          font-size: 1.3rem;
          border-bottom: 2px dashed var(--color-primary);
          border-radius: 15px 15px 0 0;
        }

        #add[empty] {
          border-bottom: none;
          border-radius: 15px;
        }
      `]}};Ht([nt({type:Object})],Qt.prototype,"department",void 0),Ht([nt({type:Object})],Qt.prototype,"selectedUser",void 0),Ht([nt({type:Boolean})],Qt.prototype,"showEditDepartment",void 0),Ht([nt({type:Boolean})],Qt.prototype,"showEditUser",void 0),Ht([nt({type:Boolean})],Qt.prototype,"isEmpty",void 0),Ht([nt({type:Number})],Qt.prototype,"index",void 0),Qt=Ht([st("admin-dep-item")],Qt);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Wt=(e,t)=>{const r=e.startNode.parentNode,i=void 0===t?e.endNode:t.startNode,s=r.insertBefore(ve(),i);r.insertBefore(ve(),i);const o=new Ce(e.options);return o.insertAfterNode(s),o},Yt=(e,t)=>(e.setValue(t),e.commit(),e),Zt=(e,t,r)=>{const i=e.startNode.parentNode,s=r?r.startNode:e.endNode,o=t.endNode.nextSibling;o!==s&&ce(i,t.startNode,o,s)},Jt=e=>{pe(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},Xt=(e,t,r)=>{const i=new Map;for(let s=t;s<=r;s++)i.set(e[s],s);return i},Kt=new WeakMap,er=new WeakMap,tr=_e((e,t,r)=>{let i;return void 0===r?r=t:void 0!==t&&(i=t),t=>{if(!(t instanceof Ce))throw new Error("repeat can only be used in text bindings");const s=Kt.get(t)||[],o=er.get(t)||[],n=[],a=[],d=[];let l,c,p=0;for(const t of e)d[p]=i?i(t,p):p,a[p]=r(t,p),p++;let u=0,h=s.length-1,m=0,g=a.length-1;for(;u<=h&&m<=g;)if(null===s[u])u++;else if(null===s[h])h--;else if(o[u]===d[m])n[m]=Yt(s[u],a[m]),u++,m++;else if(o[h]===d[g])n[g]=Yt(s[h],a[g]),h--,g--;else if(o[u]===d[g])n[g]=Yt(s[u],a[g]),Zt(t,s[u],n[g+1]),u++,g--;else if(o[h]===d[m])n[m]=Yt(s[h],a[m]),Zt(t,s[h],s[u]),h--,m++;else if(void 0===l&&(l=Xt(d,m,g),c=Xt(o,u,h)),l.has(o[u]))if(l.has(o[h])){const e=c.get(d[m]),r=void 0!==e?s[e]:null;if(null===r){const e=Wt(t,s[u]);Yt(e,a[m]),n[m]=e}else n[m]=Yt(r,a[m]),Zt(t,r,s[u]),s[e]=null;m++}else Jt(s[h]),h--;else Jt(s[u]),u++;for(;m<=g;){const e=Wt(t,n[g+1]);Yt(e,a[m]),n[m++]=e}for(;u<=h;){const e=s[u++];null!==e&&Jt(e)}Kt.set(t,n),er.set(t,d)}});var rr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};const ir=(e,t)=>e===y.USERS?t.payload.fullname:t.payload.name;let sr=class extends ft{constructor(){super(...arguments),this.requests={},this.dateStoreListener=async e=>{if(!k.includes(e.action.type))return;const t=e.action.type,r=e.action,i=I[t],s=e.action.root,o=s===y.USERS?"user":"department";let n,a,d=void 0,l=void 0;if(r.type===_.REQUEST_SUCCESSFUL){const e=r.payload,t=I[e.type-3];a=`${o} '${ir(s,e)}' ${t} ${i}!`,n=e.id}else if(r.type===_.REQUEST_ERROR){const e=r.payload,t=e.action;a=`${i} ${I[t.type]} ${o} '${ir(s,t)}'`,n=t.id,l=t.payload,d=e.message}else{a=`${i} ${o} '${ir(s,r)}'...`,n=r.id}n=`request-${n}`,this.requests={...this.requests,[n]:{id:n,root:s,type:t,message:a,payload:l,error:d}}}}connectedCallback(){super.connectedCallback(),this.departmentsUnsubscribe=w.listen(y.DEPARTMENTS,this.dateStoreListener),this.usersUnsubscribe=w.listen(y.USERS,this.dateStoreListener)}disconnectedCallback(){var e,t;super.disconnectedCallback(),null===(e=this.departmentsUnsubscribe)||void 0===e||e.call(this),null===(t=this.usersUnsubscribe)||void 0===t||t.call(this)}onDismiss(e){return _t(()=>{const t=this.shadowRoot.getElementById(e);t.addEventListener("animationend",()=>{const{[e]:t,...r}=this.requests;this.requests=r},{once:!0}),t.style.animation="item-appear-out .3s"})}render(){const e=Qe`<div id="root">
      ${tr(Object.values(this.requests),e=>e.id,e=>{const t=e.type,r=t===_.REQUEST_SUCCESSFUL,i=t===_.REQUEST_ERROR;return Qe`<div
        id="${e.id}"
        class="content card"
        ?success="${r}"
        ?error="${i}"
      >
        <div class="request">
          <p class="message">${s=e.message,s.charAt(0).toUpperCase()+s.slice(1)}</p>
          ${i?Qe`<p class="error">${e.error}!</p>`:""}
          ${r||i?Qe`<button
                plain
                class="dismiss"
                @click="${this.onDismiss(e.id)}"
              >
                X
              </button>`:""}
        </div>
      </div>`;var s;
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */})}
    </div>`,t=0===Object.keys(this.requests).length;return Qe`${t?"":e}`}static get styles(){return[bt,Et,wt,mt`
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0;
          line-height: 1.2rem;
        }

        p::first-letter {
          text-transform: uppercase;
        }

        #root {
          width: 100%;
          max-height: 50%;
          bottom: 65px;
          position: absolute;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 10px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column-reverse;
        }

        #root::-webkit-scrollbar {
          display: none;
        }

        .content {
          flex: 0 0 auto;
          height: 2.2rem;
          margin-top: 10px;
          position: relative;
          border-radius: 5px;
          animation: item-appear-in 0.3s;
          transition: height 0.3s;
        }

        .content[error] {
          height: 3.4rem;
        }

        .content[error] p,
        .content[success] p {
          padding-right: 25px;
        }

        .content[success] .request {
          background-color: var(--color-success);
        }

        .content[error] .request {
          background-color: var(--color-error);
          height: 3.4rem;
        }

        .content[error] .request .message {
          font-weight: 700;
        }

        .request {
          height: 2.2rem;
          position: absolute;
          box-sizing: border-box;
          flex-direction: column;
          width: 100%;
          color: white;
          background-color: var(--color-pending);
          display: flex;
          justify-content: center;
          text-align: center;
          padding: 0.5rem;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.3s, height 0.3s;
        }

        .message {
          font-size: 0.9rem;
        }

        .error {
          margin-top: 4px;
          font-size: 0.8rem;
        }

        button.dismiss {
          position: absolute;
          right: 5px;
          top: 0px;
          bottom: 0px;
          height: 100%;
          font-weight: 700;
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          margin: 0;
          padding: 0;
        }

        @keyframes item-appear-in {
          from {
            opacity: 0;
            height: 0px;
          }
          to {
            opacity: 1;
            height: 2.2rem;
          }
        }

        @keyframes item-appear-out {
          to {
            opacity: 0;
            height: 0rem;
            margin: 0;
          }
        }
      `]}};rr([nt({type:Object})],sr.prototype,"requests",void 0),sr=rr([st("request-log")],sr);var or=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};class nr extends ft{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.departments=[],this.departmentsListener=e=>{const t=e.action.type;k.includes(t)||(this.departments=e.items)}}connectedCallback(){if(this.authUser.isAdmin)this.welcomeTitle="Hi, Admin!";else{const e=w.users.usersById[this.authUser.uid].fullname;this.welcomeTitle=`Hi, ${e}!`}this.departments=w.departments.items.slice();const e=w.listen(y.DEPARTMENTS,this.departmentsListener);this.addEventListener("signed-out",()=>{e();const t=se.requestSignOut();w.dispatch(t)},{once:!0}),super.connectedCallback()}firstUpdated(){let e={root:this._scrollable,rootMargin:"0px",threshold:.99};new IntersectionObserver(e=>{const t=0!==e[0].boundingClientRect.y,r=new CustomEvent("elevate",{detail:t});this._welcomeText.dispatchEvent(r)},e).observe(this._gap)}render(){return Qe`<div id="root">
      <welcome-text> ${this.welcomeTitle} </welcome-text>

      <div id="scrollable">
        <div id="gap"></div>
        <div id="department-list">
          ${this.departments.map(this.depItemTemplate)}
        </div>
      </div>

      ${0===this.departments.length?Qe`<p class="empty">No departments found</p>`:""}

      <slot></slot>
    </div>`}static get styles(){return[bt,Et,wt,mt`
        #root {
          height: 100%;
          width: 100%;
          position: relative;
        }

        #scrollable {
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
        }

        #scrollable::-webkit-scrollbar {
          display: none;
        }

        #scrollable #gap {
          content: '';
          height: 30px;
          display: block;
        }

        #department-list {
          box-sizing: border-box;
          padding: 0px 30px;
        }

        #department-list > * {
          margin-bottom: 20px;
        }

        #department-list > *:last-child {
          margin-bottom: 80px;
        }

        .empty {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `]}}or([at("welcome-text",!0)],nr.prototype,"_welcomeText",void 0),or([at("#scrollable",!0)],nr.prototype,"_scrollable",void 0),or([at("#gap",!0)],nr.prototype,"_gap",void 0),or([nt({type:Array})],nr.prototype,"departments",void 0);var ar=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let dr=class extends nr{constructor(){super(...arguments),this.depItemTemplate=(e,t)=>Qe`<admin-dep-item
      .department="${e}"
      .index=${t}
    ></admin-dep-item>`}};dr=ar([st("admin-dep-list")],dr);var lr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};class cr extends ft{constructor(){super(...arguments),this.users=[],this.listState={items:{},length:0},this.init=()=>{const e=this.department.id,t=w.users.sortedUsersByDepartment;let r;e in t?(r=t[e].slice(),this.updateListState(r)):(r=[],this.listState={items:{},length:0}),this.users=r,this.onListChanged(r)},this.onListChanged=e=>{const t=new CustomEvent("list-changed",{detail:{users:e}});this.dispatchEvent(t)},this.updateListState=e=>{const t={},r=e.length;e.map((e,r)=>{const i=_.INITIALIZED;t[e.uid]={index:r,type:i}}),this.listState={items:t,length:r}},this.usersListener=async e=>{const t=e.action.type;if(k.includes(t))return;const r=this.department.id;if(!(r in e.sortedUsersByDepartment))return;if(t===_.INITIALIZED)return;const i=e.action.payload;if(i.departmentid!==r)return;const s=e.sortedUsersByDepartment[this.department.id].slice();let o;this.users=s,t===_.REMOVED&&(o=this.listState.items[i.uid]),t===_.MODIFIED&&await new Promise(e=>requestAnimationFrame(()=>e())),this.updateListState(s),t===_.REMOVED&&(s.splice(o.index,0,i),this.listState.items[i.uid]=o),this.listState.items[i.uid].type=t,this.onListChanged(e.sortedUsersByDepartment[this.department.id].slice())}}connectedCallback(){super.connectedCallback(),this.usersUnsubscribe=w.listen(y.USERS,this.usersListener)}disconnectedCallback(){var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),super.disconnectedCallback()}firstUpdated(){this._userList.onanimationend=e=>{const t=e.composedPath()[0];if(t.hasAttribute("state")){const e=t.id,r=t.getAttribute("state");if("added"===r||"updated"===r){const t=this.listState.items[e];this.listState={...this.listState,items:{...this.listState.items,[e]:{...t,type:_.INITIALIZED}}}}else if("removed"===r){const t=this.users.filter(t=>t.uid!=e);this.updateListState(t),this.users=t}}}}shouldUpdate(e){return e.has("department")&&this.init(),!0}onUserSelected(e){return _t(()=>{const t=new CustomEvent("user-selected",{detail:{user:e},bubbles:!0,composed:!0});this.dispatchEvent(t)})}render(){const e=this.listState.length,t=e*this.listItemHeight;return Qe` <div id="user-list" style="height:${t}rem;">
      ${tr(this.users,e=>e.uid,t=>{const r=this.listState.items[t.uid];return Qe`
        <div
          id="${t.uid}"
          style="--offset-y:${r.index*this.listItemHeight}rem;"
          tabindex="0"
          class="user selectable"
          state="${I[r.type]}"
          ?regular="${t.regular}"
          ?last="${r.index===e-1}"
          @click="${this.onUserSelected(t)}"
        >
          ${this.userItemTemplate(t)}
        </div>
      `})}
    </div>`}static get styles(){return[bt,mt`
        #user-list {
          position: relative;
          transition: height 0.3s;
        }

        .user {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          padding: 0.65rem 15px;
          opacity: 1;
          transform: translateY(var(--offset-y));
          transition: all 0.3s;
          cursor: pointer;
        }

        .user[state='added'] {
          animation: item-appear-in 0.3s;
        }

        .user[state='updated'] {
          animation: flash 1s 2;
        }

        .user[state='removed'] {
          animation: item-appear-out 0.3s forwards;
        }

        .user:focus,
        .user:active {
          background-color: var(--hover-highlight);
        }

        @media (hover: hover) {
          .user:hover {
            background-color: var(--hover-highlight);
          }
        }

        @keyframes item-appear-in {
          from {
            opacity: 0;
            padding: 0rem 15px;
          }
          to {
            opacity: 1;
            padding: 0.65rem 15px;
          }
        }

        @keyframes item-appear-out {
          to {
            opacity: 0;
            padding: 0rem 15px;
          }
        }

        @keyframes flash {
          0% {
            background-color: transparent;
          }
          50% {
            background-color: rgba(255, 56, 56, 0.18);
          }
          100% {
            background-color: transparent;
          }
        }
      `]}}lr([at("#user-list")],cr.prototype,"_userList",void 0),lr([nt({type:Array})],cr.prototype,"users",void 0),lr([nt({type:Object})],cr.prototype,"department",void 0),lr([nt({type:Object})],cr.prototype,"listState",void 0);var pr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let ur=class extends cr{constructor(){super(...arguments),this.listItemHeight=3.5}userItemTemplate(e){return Qe`
      <p class="fullname">${e.fullname}</p>
      <p class="email">${e.email}</p>
    `}static get styles(){return[...super.styles,mt`
        .user {
          height: 3.5rem;
        }
        .user[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .user[regular] .fullname {
          color: var(--color-primary);
        }

        .user p {
          margin: 0;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
          color: var(--color-text-primary);
        }

        .email {
          color: #878787;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 400;
          color: var(--color-text-secondary);
        }
      `]}};ur=pr([st("admin-user-list")],ur);var hr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let mr=class extends ft{constructor(){super(...arguments),this.showAddDepartment=!1}onAddDepartment(){return _t(()=>{this.showAddDepartment=!0})}closeAddDepartment(){this.showAddDepartment=!1}render(){return Qe`<div id="root">
      <admin-dep-list></admin-dep-list>

      <button id="add-department" solid @click="${this.onAddDepartment()}">
        Add department
      </button>

      <request-log></request-log>

      ${this.showAddDepartment?Qe`<edit-department
            @close="${this.closeAddDepartment}"
          ></edit-department>`:""}
    </div>`}static get styles(){return[bt,Et,wt,mt`
        #root {
          overflow: hidden;
          height: 100%;
          width: 100%;
          position: relative;
        }

        #add-department {
          width: 50%;
          position: absolute;
          bottom: 10px;
          left: 25%;
          right: 25%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }
      `]}};hr([nt({type:Boolean})],mr.prototype,"showAddDepartment",void 0),mr=hr([st("admin-view")],mr);var gr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let fr=class extends ft{constructor(){super(...arguments),this.index=0,this.isMorning=!0,this.isEmpty=!0,this.presentCount={am:{regular:0,nsf:0},pm:{regular:0,nsf:0}}}onUserSelected(e){this.selectedUser=e.detail.user}onListChanged(e){const t=e.detail.users,r={regular:0,nsf:0},i={regular:0,nsf:0};t.map(e=>{A.isPresent(e.morning.code)&&(e.regular?r.regular++:r.nsf++),A.isPresent(e.afternoon.code)&&(e.regular?i.regular++:i.nsf++)}),this.presentCount={am:r,pm:i},this.isEmpty=0===t.length}render(){const e=this.isMorning?this.presentCount.am:this.presentCount.pm,t=e.regular,r=e.nsf;return Qe`<div id="root" style="--anim-delay:${2*this.index/10}s;">
        <div class="header">
          <h3>${this.department.name}</h3>
        </div>

        <div class="card">
          <h4 class="summary" ?empty="${this.isEmpty}">
            ${t+r} Total ~ ${t} Regular + ${r} Nsf
          </h4>

          <user-list
            .department="${this.department}"
            @user-selected="${this.onUserSelected}"
            @list-changed="${this.onListChanged}"
          ></user-list>
        </div>
      </div>

      ${this.selectedUser?Qe`<edit-status
            .uid="${this.selectedUser.uid}"
            .isMorning="${this.isMorning}"
            @close="${()=>this.selectedUser=void 0}"
          ></edit-status>`:""} `}static get styles(){return[bt,Et,wt,yt,mt`
        #root {
          width: 100%;
          margin: inherit;
          --offset-y: 100px;
          --should-fade: 1;
          animation: slide-in 0.5s both;
          animation-delay: var(--anim-delay);
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .header h3 {
          color: #828282;
          text-transform: capitalize;
          font-weight: 500;
          margin: 0;
          color: var(--color-text-primary);
        }

        .summary {
          margin: 0;
          padding: 10px;
          text-align: center;
          font-weight: 400;
          background: #33475a;
          font-size: 0.9rem;
          border-radius: 15px 15px 0 0;
          color: var(--color-text-light);
        }

        .summary[empty] {
          border-radius: 15px;
        }

        .card {
          border-radius: 15px;
        }
      `]}};gr([nt({type:Number})],fr.prototype,"index",void 0),gr([nt({type:Object})],fr.prototype,"department",void 0),gr([nt({type:Object})],fr.prototype,"selectedUser",void 0),gr([nt({type:Boolean})],fr.prototype,"isMorning",void 0),gr([nt({type:Boolean})],fr.prototype,"isEmpty",void 0),gr([nt({type:Object})],fr.prototype,"presentCount",void 0),fr=gr([st("user-dep-item")],fr);var yr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let vr=class extends nr{constructor(){super(...arguments),this.isMorning=!0,this.depItemTemplate=(e,t)=>Qe`<user-dep-item
      .index="${t}"
      .department="${e}"
      .isMorning="${this.isMorning}"
    ></user-dep-item>`}};yr([nt({type:Boolean})],vr.prototype,"isMorning",void 0),vr=yr([st("user-dep-list")],vr);var br=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let wr=class extends cr{constructor(){super(...arguments),this.listItemHeight=4.6}statusTemplate(e,t){const r=T[e.code].name,i=e.remarks.trim().length>0,s=e.expired;return Qe`<p class="status">
      ${t}: ${r} ${i?Qe`(${e.remarks})`:""}
      ${s?Qe`<span>-- Expired</span>`:""}
    </p> `}userItemTemplate(e){return Qe`
      <p class="fullname">${e.fullname}</p>
      ${this.statusTemplate(e.morning,"AM")}
      ${this.statusTemplate(e.afternoon,"PM")}
    `}static get styles(){return[...super.styles,mt`
        .user {
          height: 4.6rem;
        }
        .user[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .user[regular] .fullname {
          color: var(--color-primary);
        }

        p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
          margin-bottom: 0.2rem;
          color: var(--color-text-primary);
        }

        .status {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1rem;
          color: var(--color-text-secondary);
        }

        .status > span {
          color: var(--color-input-error);
          font-weight: 500;
          text-transform: capitalize;
        }
      `]}};wr=br([st("user-list")],wr);var xr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let Sr=class extends ft{constructor(){super(...arguments),this.isMorning=!0}toggleAm(){return _t(()=>{this.isMorning=!this.isMorning,this.dispatchEvent(new Event("toggle-am"))})}render(){return Qe`
      <div id="root">
        <button
          outline
          static
          ?selected="${this.isMorning}"
          @click="${this.toggleAm()}"
        >
          AM
        </button>
        <button
          outline
          static
          ?selected="${!this.isMorning}"
          @click="${this.toggleAm()}"
        >
          PM
        </button>
      </div>
    `}static get styles(){return[bt,Et,mt`
        :host {
          --padding-button: 8px;
        }

        #root {
          display: flex;
          height: inherit;
        }

        button {
          box-sizing: border-box;
          height: inherit;
          font-weight: 600;
          padding: var(--padding-button);
          border-color: var(--color-primary);
          --color-shadow-primary-rgb: var(--color-primary-rgb);
        }

        button:first-child {
          border-radius: 35px 0 0 35px;
        }

        button:last-child {
          border-radius: 0 35px 35px 0;
        }
      `]}};xr([nt({type:Boolean})],Sr.prototype,"isMorning",void 0),Sr=xr([st("toggle-am")],Sr);var Er=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let _r=class extends ft{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.updatedByName="",this.isMorning=!0,this.isProcessing=!1,this.dialogState=At.OPENING,this.usersListener=async e=>{if(e.action.type!==_.MODIFIED)return;const t=e.action.payload;t.uid===this.uid&&(this.selectedUser=t,this.resetStatus(),this.isProcessing=!1)}}onInputFocus(){this.dialogState=At.INPUT_FOCUSED}onInputBlur(e){const t=e.target.value.trim();this.statusToEdit={...this.statusToEdit,remarks:t}}resetStatus(){var e;const t=this.isMorning?this.selectedUser.morning:this.selectedUser.afternoon;this.statusToEdit=new A(t),this.updatedByName=(null===(e=w.users.usersById[t.updatedby])||void 0===e?void 0:e.fullname)||"Admin"}toggleAm(){this.isMorning=!this.isMorning,this.resetStatus()}statusChanged(e){return _t(()=>{this.statusToEdit={...this.statusToEdit,code:e,remarks:""}})}requestUpdateStatus(e){if(this.isProcessing)return;this.isProcessing=!0;const t=this.authUser.uid,r=new A({...this.statusToEdit,updatedby:t,date:new Date,expired:!1}),i=new g({...this.selectedUser,morning:e||this.isMorning?r:void 0,afternoon:e?r:this.isMorning?void 0:r}),s=O.requestModify(i);w.dispatch(s)}submitOnly(){return _t(()=>{this.requestUpdateStatus(!1)})}submitBoth(){return _t(()=>{this.requestUpdateStatus(!0)})}connectedCallback(){super.connectedCallback(),this.selectedUser=w.users.usersById[this.uid],this.resetStatus(),this.usersUnsubscribe=w.listen(y.USERS,this.usersListener)}disconnectedCallback(){var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),super.disconnectedCallback()}render(){return Qe`<custom-dialog
      .state="${this.dialogState}"
      @reset="${()=>this.dialogState=At.OPENED}"
    >
      <div id="root" tabindex="0" class="selectable">
        <div class="expired" ?show="${this.statusToEdit.expired}">
          [Expired] - Please verify again
        </div>
        <div class="header">
          <h4 class="name">${this.selectedUser.fullname}</h4>
          <toggle-am
            @toggle-am="${this.toggleAm}"
            .isMorning="${this.isMorning}"
          ></toggle-am>
        </div>

        <div class="status-chooser">
          ${T.map((e,t)=>Qe`<button
              outline
              static
              ?selected="${this.statusToEdit.code===t}"
              @click="${this.statusChanged(t)}"
            >
              ${e.name}
            </button>`)}
        </div>

        <div class="remarks">
          <label>Remarks</label>
          <input
            maxlength="30"
            type="text"
            placeholder="EVENT, WORK, POOPING etc."
            @focus="${this.onInputFocus}"
            @blur="${this.onInputBlur}"
            value="${this.statusToEdit.remarks}"
          />
        </div>

        <div class="verify-buttons">
          <button class="all" solid @click="${this.submitBoth()}">
            BOTH AM & PM
          </button>
          <button class="specific" solid @click="${this.submitOnly()}">
            ${this.isMorning?"AM":"PM"} ONLY
          </button>
          <div class="processing" ?show="${this.isProcessing}">
            Processing...
          </div>
        </div>

        <div class="updated-by">
          Last verified by <span>${this.updatedByName}</span> on
          ${(e=>{let t=e.toString();const r=t.indexOf(" (");return-1!==r&&(t=t.substr(0,r)),t})(this.statusToEdit.date)}
        </div>
      </div>
    </custom-dialog>`}static get styles(){return[bt,Et,mt`
        custom-dialog {
          --offset-reduce: 100px;
        }

        toggle-am {
          --padding-button: 5px;
        }

        #root {
          position: relative;
        }

        .expired {
          text-align: center;
          font-weight: 900;
          color: var(--color-primary);
          max-height: 0px;
          opacity: 0;
          transition: 0.5s all;
        }
        .expired[show] {
          max-height: 100px;
          opacity: 1;
        }

        .header {
          display: flex;
          align-items: center;
        }
        .header > .name {
          flex-grow: 1;
          color: var(--color-text-primary);
        }

        .status-chooser {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
        .status-chooser > button {
          margin-right: 10px;
          margin-bottom: 10px;
          font-size: 0.9rem;
          padding: 7px;
          border-radius: 5px;
        }

        .remarks {
          margin-bottom: 25px;
        }
        .remarks > label {
          display: block;
          margin: 5px 0;
          color: var(--color-text-primary);
        }

        .remarks > input {
          padding: 5px;
          border: 1px solid grey;
          transition: all 0.3s 0.3s;
          outline: none;
          font: inherit;
          text-transform: uppercase;
          color: var(--color-text-dark);
          background-color: var(--bg-primary-light);
          transition: background-color 0.3s;
        }

        .remarks > input::placeholder {
          color: var(--color-input-hint);
        }

        .remarks > input:focus {
          outline: none;
          border: 1px solid #ff3838;
        }

        #comment {
          margin-top: 10px;
          font-size: 0.6rem;
          white-space: pre-line;
          text-align: center;
        }

        .verify-buttons {
          display: flex;
          position: relative;
        }

        .verify-buttons > button {
          padding: 15px;
        }

        .verify-buttons > .all {
          flex-grow: 1;
          margin-right: 10px;
        }

        .verify-buttons > .processing {
          position: absolute;
          top: -5px;
          bottom: -5px;
          right: -5px;
          left: -5px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-primary);
          color: white;
          border-radius: 5px;
          pointer-events: none;
          box-shadow: 0 2px 4px -1px rgba(var(--color-shadow-primary-rgb), 0.5);
          transform: scale(0);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }

        .verify-buttons > .processing[show] {
          pointer-events: inherit;
          opacity: 1;
          transform: scale(1);
        }

        .updated-by {
          font-size: 0.6rem;
          white-space: pre-line;
          text-align: center;
          color: var(--color-text-dark);
        }

        .updated-by > span {
          font-weight: 600;
        }
      `]}};Er([nt({type:String})],_r.prototype,"uid",void 0),Er([nt({type:String})],_r.prototype,"updatedByName",void 0),Er([nt({type:Object})],_r.prototype,"selectedUser",void 0),Er([nt({type:Object})],_r.prototype,"statusToEdit",void 0),Er([nt({type:Boolean})],_r.prototype,"isMorning",void 0),Er([nt({type:Boolean})],_r.prototype,"isProcessing",void 0),Er([nt({type:Number})],_r.prototype,"dialogState",void 0),_r=Er([st("edit-status")],_r);var Or=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};const Ir={...T.reduce((e,t,r)=>(e[`a-${r}`]=t.name,e),{}),"a-00":"EXPIRED","a-11":"PRESENT (AWAY)","a-1":"PRESENT (FALL-IN)"};let kr=class extends ft{constructor(){super(...arguments),this.initialHeight=0,this.showStats=!1,this.fadeOutStats=!1,this.closeView=!1,this.openingView=!0}init(){this.statsCount=new Array(P.length).fill(0),this.users=w.users.sortedUsers.slice();const e={"a-0":{users:[],regular:0,nsf:0},"a-00":{users:[],regular:0,nsf:0},"a-1":{users:[],regular:0,nsf:0},"a-11":{users:[],regular:0,nsf:0}};this.users.map(t=>{const r=this.isMorning?t.morning:t.afternoon,i=T[r.code].category;this.statsCount[i]++;let s=`a-${r.code}`;r.expired?s="a-00":A.isPresent(r.code)&&r.remarks.length>0&&(s="a-11"),s in e||(e[s]={users:[],regular:0,nsf:0}),e[s].users.push(t),t.regular?e[s].regular++:e[s].nsf++}),this.statusCodes=e;for(const t of Object.keys(e))0===e[t].users.length&&delete e[t];this.selectedCode=Object.keys(e)[0]}connectedCallback(){super.connectedCallback(),this.usersUnsubscribe=w.listen(y.USERS,e=>{k.includes(e.action.type)||this.init()})}codeChanged(e){return _t(()=>{this.selectedCode=e})}close(){return _t(()=>{var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),this.openingView||(this.closeView=!0)})}hideStats(){this._stats.addEventListener("animationend",()=>{this.showStats=!1,this.fadeOutStats=!1},{once:!0}),this.fadeOutStats=!0}firstUpdated(){this.initialHeight=this._statusCount.clientHeight,this._statusCard.style.height=`${this.initialHeight}px`;const e=t=>{"slide-out-to-right"===t.animationName&&(this.removeEventListener("animationend",e),this.dispatchEvent(new Event("on-close"))),"slide-in"===t.animationName&&(this.openingView=!1)};this._root.addEventListener("animationend",e)}updated(e){const t=e.has("selectedCode"),r=e.has("isMorning");if(t||r){const e=this._userList.scrollHeight,t=this._header.clientHeight;this._statusCard.style.height=`${this.initialHeight+e}px`,this._statusCardContainer.style.setProperty("--offset-y",`${t}px`)}}shouldUpdate(e){return e.has("isMorning")&&this.init(),!0}render(){const e=this.statusCodes[this.selectedCode],t=e.regular,r=e.nsf,i=t+r;return Qe` <div class="scrim" ?close="${this.closeView}"></div>
      <div id="root" ?close="${this.closeView}">
        <div id="header">
          <h4>Summary - ${this.users.length} Total</h4>

          <div id="status-selector">
            ${Object.keys(this.statusCodes).map(e=>{const t=this.statusCodes[e].nsf;return Qe`
                <button
                  outline
                  ?selected="${e===this.selectedCode}"
                  @click=${this.codeChanged(e)}
                >
                  ${Ir[e]} (${t})
                </button>
              `})}
          </div>
        </div>

        <div id="status-card-container">
          <div id="status-card" class="card" ?loading="${this.openingView}">
            <h4 id="status-count">
              ${i} Total ~ ${t} Regular + ${r} Nsf
            </h4>
            <div id="user-list">
              ${e.users.map(e=>{const t=this.isMorning?e.morning:e.afternoon;return Qe`<div class="user">
                  <p class="fullname" ?regular="${e.regular}">
                    ${e.fullname}
                  </p>
                  <p class="remarks">
                    ${t.remarks}
                    ${t.expired?Qe`<span>-- Expired</span>`:""}
                  </p>
                </div>`})}
            </div>
          </div>

          <div class="padding"></div>
        </div>

        <button id="close" solid @click="${this.close()}">X</button>
        <button id="view-stats" solid @click="${()=>this.showStats=!0}">
          View Statistics
        </button>

        ${this.showStats?Qe`
              <div
                id="stats"
                @click="${this.hideStats}"
                ?hide="${this.fadeOutStats}"
              >
                <div class="card">
                  ${P.map((e,t)=>Qe`<p>
                      ${e}: <span>${this.statsCount[t]}</span>
                    </p>`)}
                </div>
              </div>
            `:""}
      </div>`}static get styles(){return[bt,Et,wt,yt,vt,mt`
        button {
          font-weight: 500;
        }

        .scrim {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0000004a;
          animation: fade-in 0.5s;
          z-index: 19;
        }

        .scrim[close] {
          animation: fade-out 0.5s 0.3s;
        }

        #root[close] {
          animation: slide-out-to-right 0.5s 0.3s;
        }

        #root[close] > button {
          animation: slide-out 0.3s forwards;
        }

        #root[close] > #close {
          animation-delay: 0s;
        }

        #root[close] > #view-stats {
          animation-delay: 0.1s;
        }

        #close,
        #view-stats {
          --should-fade: 0;
          --offset-y: 150%;
          animation: slide-in 0.5s backwards;
        }

        #root {
          overflow: hidden;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 20;
          animation: slide-in-from-right 0.5s backwards;
          box-shadow: rgb(0 0 0 / 20%) -2px 0px 6px -3px;
          background-color: var(--bg-primary);
          transition: background-color 0.3s;
        }

        #header {
          padding: 0 1.8rem;
          position: absolute;
          z-index: 50;
        }

        #header h4 {
          margin-top: 1.8rem;
          margin-bottom: 1.2rem;
          line-height: 2rem;
          color: var(--color-text-primary);
        }

        #header #status-selector {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -10px;
        }

        #status-selector > button {
          font-size: 0.8rem;
          border-radius: 35px;
          padding: 5px 10px;
          line-height: 0.8rem;
          margin-bottom: 10px;
          margin-left: 10px;
        }

        #status-card-container {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0 1.8rem;
          --offset-y: 0px;
        }

        #status-card-container::-webkit-scrollbar {
          display: none;
        }

        #status-card-container .padding {
          content: '';
          height: var(--offset-y);
          display: block;
        }

        #status-card {
          margin-top: 1rem;
          border-radius: 15px;
          transition: height 0.5s, transform 0.5s, background-color 0.3s,
            box-shadow 0.3s;
          transform: translateY(var(--offset-y));
          justify-content: start;
          margin-bottom: 70px;
        }

        #status-card[loading] {
          transition: none;
        }

        #status-card #status-count {
          margin: 0px;
          text-align: center;
          padding: 10px;
          background: var(--color-primary);
          border-radius: 15px 15px 0 0;
          color: white;
          font-weight: 600;
        }

        #status-card #user-list {
          height: 0;
        }

        #user-list .user {
          padding: 0.65rem 15px;
        }

        .user p {
          margin: 0;
        }

        .user .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .user .fullname[regular] {
          color: var(--color-primary);
        }

        .user .remarks {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--color-text-secondary);
          text-transform: uppercase;
        }

        .user .remarks span {
          color: var(--color-input-error);
          font-weight: 500;
          text-transform: capitalize;
        }

        #close {
          position: absolute;
          bottom: 10px;
          left: 10px;
          padding: 7px 15px;
          border-radius: 35px;
          animation-delay: 0.5s;
        }

        #view-stats {
          position: absolute;
          bottom: 10px;
          left: 27%;
          padding: 15px;
          border-radius: 35px;
          animation-delay: 0.6s;
        }

        #stats {
          animation: fade-in 0.5s;
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          z-index: 51;
        }

        #stats[hide] {
          animation: fade-out 0.3s;
        }

        #stats .card {
          width: 100%;
          padding: 10px 30px;
          border-radius: 5px;
        }

        #stats p {
          font-weight: bold;
          margin: 10px 0 10px 0;
          color: var(--color-text-primary);
        }

        #stats p span {
          color: var(--color-primary);
        }

        @keyframes slide-out {
          to {
            transform: translateY(var(--offset-y));
          }
        }

        @keyframes slide-in-from-right {
          from {
            transform: translateX(105%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slide-out-to-right {
          to {
            transform: translateX(105%);
          }
        }
      `]}};Or([at("#root")],kr.prototype,"_root",void 0),Or([at("#status-count")],kr.prototype,"_statusCount",void 0),Or([at("#stats")],kr.prototype,"_stats",void 0),Or([at("#status-card",!0)],kr.prototype,"_statusCard",void 0),Or([at("#user-list",!0)],kr.prototype,"_userList",void 0),Or([at("#header",!0)],kr.prototype,"_header",void 0),Or([at("#status-card-container",!0)],kr.prototype,"_statusCardContainer",void 0),Or([nt({type:Array})],kr.prototype,"statsCount",void 0),Or([nt({type:Array})],kr.prototype,"users",void 0),Or([nt({type:Object})],kr.prototype,"statusCodes",void 0),Or([nt({type:String})],kr.prototype,"listHeight",void 0),Or([nt({type:String})],kr.prototype,"selectedCode",void 0),Or([nt({type:Boolean})],kr.prototype,"isMorning",void 0),Or([nt({type:Boolean})],kr.prototype,"showStats",void 0),Or([nt({type:Boolean})],kr.prototype,"fadeOutStats",void 0),Or([nt({type:Boolean})],kr.prototype,"closeView",void 0),Or([nt({type:Boolean})],kr.prototype,"openingView",void 0),kr=Or([st("summary-view")],kr);var Dr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let Nr=class extends ft{constructor(){super(...arguments),this.user=w.auth.action.payload,this.showSummary=!1,this.isMorning=(new Date).getHours()<12}viewSummary(){return _t(()=>{this.showSummary=!0})}closeSummary(){this.showSummary=!1}toggleAm(){this.isMorning=!this.isMorning}render(){return Qe`<div id="root">
      <user-dep-list
        .user="${this.user}"
        .isMorning="${this.isMorning}"
      ></user-dep-list>

      <button id="view-summary" solid @click="${this.viewSummary()}">
        View Summary
      </button>

      <toggle-am
        @toggle-am="${this.toggleAm}"
        .isMorning="${this.isMorning}"
      ></toggle-am>

      ${this.showSummary?Qe`<summary-view
            @on-close="${this.closeSummary}"
            .isMorning="${this.isMorning}"
          ></summary-view>`:""}
    </div>`}static get styles(){return[bt,Et,wt,mt`
        #root {
          overflow: hidden;
          height: 100%;
          width: 100%;
          position: relative;
        }

        #view-summary {
          width: 50%;
          position: absolute;
          bottom: 10px;
          left: 15%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }

        toggle-am {
          position: absolute;
          z-index: 21;
          right: 10px;
          bottom: 10px;
        }
      `]}};Dr([nt({type:Boolean})],Nr.prototype,"showSummary",void 0),Dr([nt({type:Boolean})],Nr.prototype,"isMorning",void 0),Nr=Dr([st("user-view")],Nr);var Rr=function(e,t,r,i){var s,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,r,n):s(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n};let Ur=class extends ft{constructor(){super(...arguments),this.application=window.application,this.isDarkMode="true"===localStorage.getItem("dark-mode"),this.splashscreen=!0,this.initialized=!1,this.viewType=0,this.visible=!1}connectedCallback(){super.connectedCallback(),w.listen(y.AUTH,(e,t)=>{let r=e.action.type;this.addEventListener("animationend",()=>{this.splashscreen=!1,this.initialized=!1},{once:!0}),r===te.SIGNED_IN?this.signedIn():this.signedOut(),this.initialized=!0,t()}),this.application.getAuthManager()}async hideView(){this.visible&&(this.visible=!1,await new Promise(e=>{this._root.addEventListener("animationend",()=>e(),{once:!0})}))}async showView(e){await this.hideView(),this.viewType=e,this.visible=!0}signedIn(){const e=w.auth.action.payload;this.dataManager=e.isAdmin?this.application.getAdminManager():this.application.getStatusManager(),this.dataManager.subscribe().then(()=>{e.isAdmin?this.showView(2):this.showView(3)})}signedOut(){var e;null===(e=this.dataManager)||void 0===e||e.unsubscribe(),this.dataManager=void 0,this.showView(1)}toggleDarkMode(e){e.stopPropagation(),e.preventDefault(),document.body.classList.toggle("dark"),this.isDarkMode=!this.isDarkMode,localStorage.setItem("dark-mode",`${this.isDarkMode}`)}render(){return Qe`
      <div id="root" ?fade-out="${!this.visible}" ?fade-in="${this.visible}">
        ${(()=>{switch(this.viewType){case 1:return Qe`<login-view @signed-in="${this.signedIn}"></login-view>`;case 2:return Qe`<admin-view
            @signed-out="${this.signedOut}"
          ></admin-view>`;case 3:return Qe`<user-view @signed-out="${this.signedOut}"></user-view>`;default:return""}})()}
      </div>

      <svg
        id="toggle-dark-mode"
        @click="${this.toggleDarkMode}"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M20 15.31l1.9-1.9c.78-.78.78-2.05 0-2.83L20 8.69V6c0-1.1-.9-2-2-2h-2.69l-1.9-1.9c-.78-.78-2.05-.78-2.83 0L8.69 4H6c-1.1 0-2 .9-2 2v2.69l-1.9 1.9c-.78.78-.78 2.05 0 2.83l1.9 1.9V18c0 1.1.9 2 2 2h2.69l1.9 1.9c.78.78 2.05.78 2.83 0l1.9-1.9H18c1.1 0 2-.9 2-2v-2.69zm-8 1.59V7.1c0-.61.55-1.11 1.15-.99C15.91 6.65 18 9.08 18 12s-2.09 5.35-4.85 5.89c-.6.12-1.15-.38-1.15-.99z"
        />
      </svg>
    `}static get styles(){return[vt,mt`
        #root {
          height: 100%;
          width: 100%;
        }

        #root[fade-in] {
          animation: fade-in 0.5s;
        }

        #root[fade-out] {
          animation: fade-out 0.5s;
        }

        #toggle-dark-mode {
          position: absolute;
          top: 0px;
          right: 0px;
          fill: var(--color-text-primary);
          padding: 10px;
          z-index: 99;
          cursor: pointer;
        }
      `]}};Rr([at("#root")],Ur.prototype,"_root",void 0),Rr([nt({type:Boolean,reflect:!0})],Ur.prototype,"splashscreen",void 0),Rr([nt({type:Boolean,reflect:!0})],Ur.prototype,"initialized",void 0),Rr([nt({type:Number})],Ur.prototype,"viewType",void 0),Rr([nt({type:Boolean})],Ur.prototype,"visible",void 0),Ur=Rr([st("view-switcher")],Ur)}]);