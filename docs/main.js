!function(e){var t={};function i(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(s,r,function(t){return e[t]}.bind(null,r));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=4)}([function(e,t,i){"use strict";(function(e,s){var r,o=i(1);r="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:s;var n=Object(o.a)(r);t.a=n}).call(this,i(2),i(3)(e))},function(e,t,i){"use strict";function s(e){var t,i=e.Symbol;return"function"==typeof i?i.observable?t=i.observable:(t=i("observable"),i.observable=t):t="@@observable",t}i.d(t,"a",(function(){return s}))},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,i){"use strict";i.r(t);var s=i(0),r=function(){return Math.random().toString(36).substring(7).split("").join(".")},o={INIT:"@@redux/INIT"+r(),REPLACE:"@@redux/REPLACE"+r(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+r()}};function n(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function a(e,t,i){var r;if("function"==typeof t&&"function"==typeof i||"function"==typeof i&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof t&&void 0===i&&(i=t,t=void 0),void 0!==i){if("function"!=typeof i)throw new Error("Expected the enhancer to be a function.");return i(a)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var d=e,l=t,c=[],p=c,u=!1;function h(){p===c&&(p=c.slice())}function m(){if(u)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return l}function f(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(u)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return h(),p.push(e),function(){if(t){if(u)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,h();var i=p.indexOf(e);p.splice(i,1),c=null}}}function g(e){if(!n(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(u)throw new Error("Reducers may not dispatch actions.");try{u=!0,l=d(l,e)}finally{u=!1}for(var t=c=p,i=0;i<t.length;i++){(0,t[i])()}return e}function y(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");d=e,g({type:o.REPLACE})}function b(){var e,t=f;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function i(){e.next&&e.next(m())}return i(),{unsubscribe:t(i)}}})[s.a]=function(){return this},e}return g({type:o.INIT}),(r={dispatch:g,subscribe:f,getState:m,replaceReducer:y})[s.a]=b,r}function d(e,t){var i=t&&t.type;return"Given "+(i&&'action "'+String(i)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function l(e){for(var t=Object.keys(e),i={},s=0;s<t.length;s++){var r=t[s];0,"function"==typeof e[r]&&(i[r]=e[r])}var n,a=Object.keys(i);try{!function(e){Object.keys(e).forEach((function(t){var i=e[t];if(void 0===i(void 0,{type:o.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===i(void 0,{type:o.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+o.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(i)}catch(e){n=e}return function(e,t){if(void 0===e&&(e={}),n)throw n;for(var s=!1,r={},o=0;o<a.length;o++){var l=a[o],c=i[l],p=e[l],u=c(p,t);if(void 0===u){var h=d(l,t);throw new Error(h)}r[l]=u,s=s||u!==p}return(s=s||a.length!==Object.keys(e).length)?r:e}}const c={action:{id:0,root:0,type:0}},p=(e=c,t)=>{if(t.root===y.RESET)return c;if(t.root!==y.AUTH)return e;return{action:t}},u={action:{root:0,type:0,id:0},items:[]},h=(e=u,t)=>{if(t.root===y.RESET)return{...u,items:[]};if(t.root!==y.DEPARTMENTS)return e;const i=t,s=i.type;if(N.includes(s))return{...e,action:i};if(s===_.INITIALIZED)return{items:i.payload,action:i};const r=i.payload;let o;switch(s){case _.ADDED:o=e.items.slice(),o.push(r);break;case _.MODIFIED:o=e.items.map(e=>e.id!==r.id?e:{...e,...r});break;case _.REMOVED:o=e.items.filter(e=>e.id!==r.id);break;default:o=e.items}return{items:o,action:i}};class m{constructor(e){this.email=e.email.toLowerCase(),this.name=e.name,this.regular=e.regular,this.rank=e.rank,this.branchid=e.branchid,this.departmentid=e.departmentid,this.password=e.password,this.fullname=`${e.rank.text} ${e.name}`}}class f extends m{constructor(e){super(e),this.uid=e.uid,this.morning=e.morning,this.afternoon=e.afternoon}static compare(e,t){let i=e.rank.code,s=t.rank.code;return i<s?-1:s<i?1:e.name<t.name?-1:t.name<e.name?1:0}static getInsertionIndex(e,t){if(0===e.length)return 0;let i=e.length-1;for(;i>=0;){let s=e[i];if(-1!==f.compare(t,s))break;i--}return++i}}const g=(e={action:{root:0,type:0,id:0},usersById:{},sortedUsers:[],sortedUsersByDepartment:{}},t)=>{var i;if(t.root===y.RESET)return{action:{root:0,type:0,id:0},usersById:{},sortedUsers:[],sortedUsersByDepartment:{}};if(t.root!==y.USERS)return e;const s=t,r=s.type;if(N.includes(r))return{...e,action:s};if(r===_.INITIALIZED){const e={},t=s.payload.slice(),i={};t.sort(f.compare);for(let s of t)s.departmentid in i?i[s.departmentid].push(s):i[s.departmentid]=[s],e[s.uid]=s;return{action:s,usersById:e,sortedUsers:t,sortedUsersByDepartment:i}}const o=new f(s.payload),n=o.departmentid;let a,d,l={};const c=(t,i)=>{d={...e.sortedUsersByDepartment,[n]:t},a=i,l={...e.usersById,[o.uid]:o}},p=(e,t)=>{const i=f.getInsertionIndex(e,o),s=f.getInsertionIndex(t,o);e.splice(i,0,o),t.splice(s,0,o)},u=()=>({depUsers:e.sortedUsersByDepartment[n].filter(e=>e.uid!==o.uid),allUsers:e.sortedUsers.filter(e=>e.uid!==o.uid)});switch(r){case _.ADDED:{const t=(null===(i=e.sortedUsersByDepartment[n])||void 0===i?void 0:i.slice())||[],s=e.sortedUsers.slice();p(t,s),c(t,s);break}case _.MODIFIED:{const{depUsers:e,allUsers:t}=u();p(e,t),c(e,t);break}case _.REMOVED:{const{depUsers:e,allUsers:t}=u();c(e,t);const{[o.uid]:i,...s}=l;l=s;break}default:l=e.usersById,a=e.sortedUsers,d=e.sortedUsersByDepartment}return{action:s,usersById:l,sortedUsers:a,sortedUsersByDepartment:d}};var y;!function(e){e[e.RESET=0]="RESET",e[e.AUTH=1]="AUTH",e[e.DEPARTMENTS=2]="DEPARTMENTS",e[e.USERS=3]="USERS",e[e.ALL=4]="ALL"}(y||(y={}));let b=1e3;const v=()=>b++;const w=new class{constructor(){this.store=a(l({auth:p,department:h,user:g}))}reset(){this.store.dispatch({id:0,root:y.RESET,type:y.RESET}),b=1e3}dispatch(e){this.store.dispatch(e)}listen(e,t){let i=0;let s=this.store.subscribe(()=>{var r,o;let n=(t=>{switch(e){case y.AUTH:return t.auth;case y.DEPARTMENTS:return t.department;case y.USERS:return t.user;default:return t}})(this.store.getState());n&&i!==(null===(r=null==n?void 0:n.action)||void 0===r?void 0:r.id)&&(i=null===(o=null==n?void 0:n.action)||void 0===o?void 0:o.id,t(n,s))});return s}get state(){return this.store.getState()}get departments(){return this.state.department}get users(){return this.state.user}get auth(){return this.state.auth}},S=(e,t)=>({root:y.DEPARTMENTS,id:v(),type:e,payload:t});var x={initialized:e=>S(_.INITIALIZED,e),added:e=>S(_.ADDED,e),modified:e=>S(_.MODIFIED,e),removed:e=>S(_.REMOVED,e),requestAdd:e=>S(_.REQUEST_ADD,e),requestModify:e=>S(_.REQUEST_MODIFY,e),requestRemove:e=>S(_.REQUEST_REMOVE,e),requestSuccessful:e=>S(_.REQUEST_SUCCESSFUL,e),requestError:e=>S(_.REQUEST_ERROR,e)};const E=(e,t)=>({root:y.USERS,id:v(),type:e,payload:t});var _,O={initialized:e=>E(_.INITIALIZED,e),added:e=>E(_.ADDED,e),modified:e=>E(_.MODIFIED,e),removed:e=>E(_.REMOVED,e),requestAdd:e=>E(_.REQUEST_ADD,e),requestModify:e=>E(_.REQUEST_MODIFY,e),requestRemove:e=>E(_.REQUEST_REMOVE,e),requestSuccessful:e=>E(_.REQUEST_SUCCESSFUL,e),requestError:e=>E(_.REQUEST_ERROR,e)};!function(e){e[e.INITIALIZED=0]="INITIALIZED",e[e.ADDED=1]="ADDED",e[e.MODIFIED=2]="MODIFIED",e[e.REMOVED=3]="REMOVED",e[e.REQUEST_ADD=4]="REQUEST_ADD",e[e.REQUEST_MODIFY=5]="REQUEST_MODIFY",e[e.REQUEST_REMOVE=6]="REQUEST_REMOVE",e[e.REQUEST_SUCCESSFUL=7]="REQUEST_SUCCESSFUL",e[e.REQUEST_ERROR=8]="REQUEST_ERROR"}(_||(_={}));const I=["initialized","added","updated","removed","adding","updating","removing","successfully","error"],N=[_.REQUEST_ADD,_.REQUEST_MODIFY,_.REQUEST_REMOVE,_.REQUEST_SUCCESSFUL,_.REQUEST_ERROR],D=[_.REQUEST_ADD,_.REQUEST_MODIFY,_.REQUEST_REMOVE];class R{constructor(){this.authUser=w.auth.action.payload,this.branch=this.authUser.branch,this.isDbConnected=!1}departmentOnChange(e,t){switch(t){case _.ADDED:w.dispatch(x.added(e));break;case _.MODIFIED:w.dispatch(x.modified(e));break;case _.REMOVED:w.dispatch(x.removed(e))}}userOnChange(e,t){if(!w.departments.items.find(t=>t.id===e.departmentid))return;const i=w.users.usersById[e.uid];switch(t){case _.ADDED:w.dispatch(O.added(e));break;case _.MODIFIED:i.departmentid!==e.departmentid&&(w.dispatch(O.removed(new f(i))),w.dispatch(O.added(e))),w.dispatch(O.modified(e));break;case _.REMOVED:w.dispatch(O.removed(e))}}async subscribe(){const e=await this.connectDB(),t=x.initialized(e.departments),i=O.initialized(e.users);w.dispatch(t),w.dispatch(i),this.isDbConnected=!0,this.startRequestListening()}unsubscribe(){this.isDbConnected=!1,this.stopRequestListening()}}const k={LG:1,MG:2,BG:3,COL:4,SLTC:5,LTC:6,MAJ:7,CPT:8,LTA:9,"2LT":10,CWO:11,SWO:12,MWO:13,"1WO":14,"2WO":15,"3WO":16,DX:36,MSG:37,SSG:38,"1SG":39,"2SG":40,"3SG":41,CFC:42,CPL:43,LCP:44,PTE:45,REC:46};class U{constructor(e){this.text=e.toUpperCase(),this.code=U.toInt(this.text)}static isValid(e){if(e in k)return!0;if(e.toUpperCase().includes("DX")&&e.length<=4){return Number(e.substring(2))<20}return!1}static toInt(e){if(e.toUpperCase().includes("DX")){if(e.length>4)return 99;let t=Number(e.substring(2));return k.DX-t}return k[e]}}const T=[{name:"NOT SET",fullName:"NOT SET",category:0},{name:"PRESENT",fullName:"PRESENT",category:1},{name:"RSO",fullName:"RSO",category:2},{name:"RSI",fullName:"RSI",category:2},{name:"MC",fullName:"MC",category:3},{name:"MA",fullName:"MA",category:3},{name:"OIL",fullName:"OFF IN LIEU",category:4},{name:"AL",fullName:"ANNUAL LEAVE",category:4},{name:"UL",fullName:"URGENT LEAVE",category:4},{name:"OL",fullName:"OVERSEAS LEAVE",category:4},{name:"CL",fullName:"COMPASSIONATE LEAVE",category:4},{name:"PL",fullName:"PATERNITY LEAVE",category:4},{name:"PCL",fullName:"PARENT CARE LEAVE",category:4},{name:"CCL",fullName:"CHILD CARE LEAVE",category:4},{name:"AO",fullName:"ATTACHED OUT",category:5},{name:"OA",fullName:"OVERSEAS ATTACHMENT",category:5},{name:"OOC",fullName:"OUT OF CAMP",category:6},{name:"OTHERS",fullName:"OTHERS",category:6}],P=["NOT SET","PRESENT","RSO/RSI","MC/MA","OIL/LEAVE","AO/OA","OOC/OTHERS"];class ${constructor(e){this.code=e.code,this.remarks=e.remarks,this.updatedby=e.updatedby,this.date=e.date,this.expired=void 0===e.expired?!$.isSameDay(e.date):e.expired}static isSameDay(e){const t=new Date,i=e.getDate()-t.getDate(),s=0===i&&e.getHours()<17&&t.getHours()<17,r=0===i&&e.getHours()>17&&t.getHours()>17,o=-1===i&&e.getHours()>17&&t.getHours()<17;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&(s||r||o)}}$.isPresent=e=>1===e;var A=$;const C=e=>({action:e,type:"Wrong password",message:"Please check that you've entered the correct password!"}),M=new U("SSG"),L={id:"123",name:"Pasir Laba",domain:"john@lol.com".split("@")[1]},j={id:"dep-123",name:"Manpower Branch"},V={id:"dep-456",name:"Logistics Branch"},q={id:"dep-789",name:"Accounting Branch"},B=[{id:"dep-321",name:"Signal Wing"},j,V,q];function z(e){return Math.floor(Math.random()*Math.floor(e))}const F=["user-101","user-201","user-202","user-301","admin"],G=()=>new A({code:z(5),remarks:"",expired:z(7)>=3,updatedby:F[z(4)],date:new Date}),Q=(e,t,i,s,r)=>new f({uid:`user-${t}`,name:e,email:`${e}@lol.com`,regular:r,rank:new U(s),branchid:L.id,departmentid:i,morning:G(),afternoon:G()}),H=new f({uid:"user-101",name:"Marquez",email:"john1@lol.com",regular:!1,rank:new U("CPL"),branchid:L.id,departmentid:j.id,morning:G(),afternoon:G()}),W=new f({uid:"user-201",name:"Rebecca",email:"john2@lol.com",regular:!0,rank:new U("MAJ"),branchid:L.id,departmentid:V.id,morning:G(),afternoon:G()}),Y=new f({uid:"user-202",name:"Jim",email:"jim@lol.com",regular:!1,rank:new U("PTE"),branchid:L.id,departmentid:V.id,morning:G(),afternoon:G()}),Z=new f({uid:"user-301",name:"John",email:"john3@lol.com",regular:!1,rank:new U("PTE"),branchid:L.id,departmentid:q.id,morning:G(),afternoon:G()}),J=[Q("Lucas","781929","dep-321","MAJ",!0),H,W,Y,Z,Q("Lily","1234","dep-123","LTC",!0),Q("Joe","12344","dep-123","LCP",!1),Q("Bob","123444","dep-456","1WO",!0),Q("Joyce","4568","dep-456","1SG",!0),Q("Bill","4566","dep-456","LCP",!1),Q("Sam","45666","dep-456","CPL",!1),Q("Ruby","78910","dep-789","MSG",!0),Q("Paula","78999","dep-789","REC",!1),Q("Rob","7899919","dep-789","PTE",!1)],X={Rank:M,Branch:L,Department:j,DepartmentArray:B,User:Y,UserArray:J,Users:{[j.id]:[H],[V.id]:[W,Y],[q.id]:[Z]},Admin:{uid:"321",branchid:"321",email:"admin@lol.com"}};class K extends R{startRequestListening(){this.unsubscribeDepartment=w.listen(y.DEPARTMENTS,e=>this.departmentOnRequest(e)),this.unsubscribeUser=w.listen(y.USERS,e=>this.userOnRequest(e))}stopRequestListening(){var e,t;null===(e=this.unsubscribeDepartment)||void 0===e||e.call(this),null===(t=this.unsubscribeUser)||void 0===t||t.call(this)}departmentOnRequest(e){if(D.includes(e.action.type))if(this.isDbConnected)switch(e.action.type){case _.REQUEST_ADD:this.requestAddDepartment(e);break;case _.REQUEST_MODIFY:this.requestModifyDepartment(e);break;case _.REQUEST_REMOVE:this.requestRemoveDepartment(e)}else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(x.requestError(t))}}userOnRequest(e){if(D.includes(e.action.type))if(this.isDbConnected)switch(e.action.type){case _.REQUEST_ADD:this.requestAddUser(e);break;case _.REQUEST_MODIFY:this.requestModifyUser(e);break;case _.REQUEST_REMOVE:this.requestRemoveUser(e)}else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(O.requestError(t))}}}class ee extends K{constructor(){super()}async connectDB(){return{departments:X.DepartmentArray,users:X.UserArray}}requestAddDepartment(e){let t=e.action.payload,i={id:`dep-${v()}`,name:t.name};this.departmentOnChange(i,_.ADDED);let s=x.requestSuccessful(e.action);w.dispatch(s)}requestModifyDepartment(e){this.departmentOnChange(e.action.payload,_.MODIFIED);let t=x.requestSuccessful(e.action);w.dispatch(t)}requestRemoveDepartment(e){const t=e.action.payload;this.departmentOnChange(t,_.REMOVED);const i=w.users.sortedUsers.filter(e=>e.departmentid!==t.id);let s=O.initialized(i);w.dispatch(s);let r=x.requestSuccessful(e.action);w.dispatch(r)}requestAddUser(e){const t=e.action.payload,i=new f({uid:`user-${v()}`,...t});setTimeout(()=>{let t;if(w.users.sortedUsers.find(e=>e.email===i.email)){const s={action:e.action,type:"email unavailable",message:`The email ${i.email} has already been used`};t=O.requestError(s)}else this.userOnChange(i,_.ADDED),t=O.requestSuccessful(e.action);w.dispatch(t)},2e3)}requestModifyUser(e){setTimeout(()=>{let t=e.action.payload;this.userOnChange(new f(t),_.MODIFIED);let i=O.requestSuccessful(e.action);w.dispatch(i)},2e3)}requestRemoveUser(e){setTimeout(()=>{let t=e.action.payload;this.userOnChange(new f(t),_.REMOVED);let i=O.requestSuccessful(e.action);w.dispatch(i)},2e3)}}var te;!function(e){e[e.INITIALIZING=0]="INITIALIZING",e[e.SIGNED_IN=1]="SIGNED_IN",e[e.SIGNED_OUT=2]="SIGNED_OUT",e[e.REQUEST_SIGN_IN=3]="REQUEST_SIGN_IN",e[e.REQUEST_SIGN_IN_FAILED=4]="REQUEST_SIGN_IN_FAILED",e[e.REQUEST_SIGN_OUT=5]="REQUEST_SIGN_OUT"}(te||(te={}));const ie=(e,t)=>({id:v(),root:y.AUTH,type:e,payload:t});var se,re={requestSignIn:e=>ie(te.REQUEST_SIGN_IN,e),requestSignOut:()=>ie(te.REQUEST_SIGN_OUT,void 0),userSignedIn:e=>ie(te.SIGNED_IN,e),userSignedOut:()=>ie(te.SIGNED_OUT,void 0),signInFailed:e=>ie(te.REQUEST_SIGN_IN_FAILED,e)};class oe{constructor(e){this.uid=e.uid,this.uid=e.uid,this.email=e.email,this.branch={id:e.branchid||e.uid,domain:e.email.split("@")[1]},this.departmentid=e.departmentid,this.isAdmin="admin"===e.email.split("@")[0]}}!function(e){e[e.ADMIN_SIGNED_IN=0]="ADMIN_SIGNED_IN",e[e.USER_SIGNED_IN=1]="USER_SIGNED_IN"}(se||(se={}));class ne extends class{constructor(){w.listen(y.AUTH,e=>this.authStateChanged(e)),this.initialize()}authStateChanged(e){e.action.type===te.REQUEST_SIGN_IN?this.signInWithCredentials(e.action):e.action.type===te.REQUEST_SIGN_OUT&&this.signOut()}signOut(){w.reset();let e=re.userSignedOut();w.dispatch(e)}signIn(e){let t=re.userSignedIn(e);w.dispatch(t)}isAdmin(e){return"admin"===e.split("@")[0]}signInError(e){let t=re.signInFailed(e);w.dispatch(t)}}{constructor(){super()}async initialize(){if(window.authStatus!==se.ADMIN_SIGNED_IN)if(window.authStatus!==se.USER_SIGNED_IN)this.signOut();else{const e=new oe({...X.User});this.signIn(e)}else{const e=new oe({...X.Admin});this.signIn(e)}}async signInWithCredentials(e){let t,i=e.payload;i.email.includes("error")?this.signInError(C(e)):(t=this.isAdmin(i.email)?new oe({...X.Admin}):new oe({...X.User}),this.signIn(t))}}class ae extends R{startRequestListening(){this.unsubscribeUser=w.listen(y.USERS,e=>this.userOnRequest(e))}stopRequestListening(){var e;null===(e=this.unsubscribeUser)||void 0===e||e.call(this)}userOnRequest(e){if(e.action.type===_.REQUEST_MODIFY)if(this.isDbConnected)this.requestModifyUser(e);else{let t={action:e.action,type:"Request failed",message:"Failed to connect to database"};w.dispatch(O.requestError(t))}}}class de extends ae{requestModifyUser(e){setTimeout(()=>{const t=new f(e.action.payload),i=w.users.usersById[t.uid],s=new A(t.morning||i.morning),r=new A(t.afternoon||i.afternoon),o=new f({...i,morning:s,afternoon:r}),n=O.requestSuccessful(e.action);this.userOnChange(o,_.MODIFIED),w.dispatch(n)},2e3)}async connectDB(){let e;const t=X.DepartmentArray.filter(t=>{let i=t.id===this.authUser.departmentid;return i&&(e=t),!i});return t.unshift(e),{departments:t,users:X.UserArray}}}window.application=new class extends class{}{getAuthManager(){return new ne}getAdminManager(){return new ee}getStatusManager(){return new de}};
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
const le="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,ce=(e,t,i=null,s=null)=>{for(;t!==i;){const i=t.nextSibling;e.insertBefore(t,s),t=i}},pe=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},ue=`{{lit-${String(Math.random()).slice(2)}}}`,he=`\x3c!--${ue}--\x3e`,me=new RegExp(`${ue}|${he}`);class fe{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],r=document.createTreeWalker(t.content,133,null,!1);let o=0,n=-1,a=0;const{strings:d,values:{length:l}}=e;for(;a<l;){const e=r.nextNode();if(null!==e){if(n++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)ge(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=d[a],i=ve.exec(t)[2],s=i.toLowerCase()+"$lit$",r=e.getAttribute(s);e.removeAttribute(s);const o=r.split(me);this.parts.push({type:"attribute",index:n,name:i,strings:o}),a+=o.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(ue)>=0){const s=e.parentNode,r=t.split(me),o=r.length-1;for(let t=0;t<o;t++){let i,o=r[t];if(""===o)i=be();else{const e=ve.exec(o);null!==e&&ge(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(o)}s.insertBefore(i,e),this.parts.push({type:"node",index:++n})}""===r[o]?(s.insertBefore(be(),e),i.push(e)):e.data=r[o],a+=o}}else if(8===e.nodeType)if(e.data===ue){const t=e.parentNode;null!==e.previousSibling&&n!==o||(n++,t.insertBefore(be(),e)),o=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(i.push(e),n--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(ue,t+1));)this.parts.push({type:"node",index:-1}),a++}}else r.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const ge=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},ye=e=>-1!==e.index,be=()=>document.createComment(""),ve=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function we(e,t){const{element:{content:i},parts:s}=e,r=document.createTreeWalker(i,133,null,!1);let o=xe(s),n=s[o],a=-1,d=0;const l=[];let c=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==n&&n.index===a;)n.index=null!==c?-1:n.index-d,o=xe(s,o),n=s[o]}l.forEach(e=>e.parentNode.removeChild(e))}const Se=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},xe=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(ye(t))return i}return-1};
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
const Ee=new WeakMap,_e=e=>(...t)=>{const i=e(...t);return Ee.set(i,!0),i},Oe=e=>"function"==typeof e&&Ee.has(e),Ie={},Ne={};
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
class De{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=le?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let r,o=0,n=0,a=s.nextNode();for(;o<i.length;)if(r=i[o],ye(r)){for(;n<r.index;)n++,"TEMPLATE"===a.nodeName&&(t.push(a),s.currentNode=a.content),null===(a=s.nextNode())&&(s.currentNode=t.pop(),a=s.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return le&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const Re=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),ke=` ${ue} `;class Ue{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],r=e.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===e.indexOf("--\x3e",r+1);const o=ve.exec(e);t+=null===o?e+(i?ke:he):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+ue}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==Re&&(t=Re.createHTML(t)),e.innerHTML=t,e}}
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
const Te=e=>null===e||!("object"==typeof e||"function"==typeof e),Pe=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class $e{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new Ae(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!Pe(e))return e}let s="";for(let r=0;r<t;r++){s+=e[r];const t=i[r];if(void 0!==t){const e=t.value;if(Te(e)||!Pe(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Ae{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===Ie||Te(e)&&e===this.value||(this.value=e,Oe(e)||(this.committer.dirty=!0))}commit(){for(;Oe(this.value);){const e=this.value;this.value=Ie,e(this)}this.value!==Ie&&this.committer.commit()}}class Ce{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(be()),this.endNode=e.appendChild(be())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=be()),e.__insert(this.endNode=be())}insertAfterPart(e){e.__insert(this.startNode=be()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}const e=this.__pendingValue;e!==Ie&&(Te(e)?e!==this.value&&this.__commitText(e):e instanceof Ue?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Pe(e)?this.__commitIterable(e):e===Ne?(this.value=Ne,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof De&&this.value.template===t)this.value.update(e.values);else{const i=new De(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const r of e)i=t[s],void 0===i&&(i=new Ce(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(r),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){pe(this.startNode.parentNode,e.nextSibling,this.endNode)}}class Me{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}if(this.__pendingValue===Ie)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=Ie}}class Le extends $e{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new je(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class je extends Ae{}let Ve=!1;(()=>{try{const e={get capture(){return Ve=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class qe{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;Oe(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=Ie,e(this)}if(this.__pendingValue===Ie)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=Be(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=Ie}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const Be=e=>e&&(Ve?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function ze(e){let t=Fe.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Fe.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(ue);return i=t.keyString.get(s),void 0===i&&(i=new fe(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const Fe=new Map,Ge=new WeakMap;
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
 */const Qe=new
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
class{handleAttributeExpressions(e,t,i,s){const r=t[0];if("."===r){return new Le(e,t.slice(1),i).parts}return"@"===r?[new qe(e,t.slice(1),s.eventContext)]:"?"===r?[new Me(e,t.slice(1),i)]:new $e(e,t,i).parts}handleTextExpression(e){return new Ce(e)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const He=(e,...t)=>new Ue(e,t,"html",Qe),We=(e,t)=>`${e}--${t}`;let Ye=!0;void 0===window.ShadyCSS?Ye=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Ye=!1);const Ze=e=>t=>{const i=We(t.type,e);let s=Fe.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},Fe.set(i,s));let r=s.stringsArray.get(t.strings);if(void 0!==r)return r;const o=t.strings.join(ue);if(r=s.keyString.get(o),void 0===r){const i=t.getTemplateElement();Ye&&window.ShadyCSS.prepareTemplateDom(i,e),r=new fe(t,i),s.keyString.set(o,r)}return s.stringsArray.set(t.strings,r),r},Je=["html","svg"],Xe=new Set,Ke=(e,t,i)=>{Xe.add(e);const s=i?i.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:o}=r;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const n=document.createElement("style");for(let e=0;e<o;e++){const t=r[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{Je.forEach(t=>{const i=Fe.get(We(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),we(e,i)})})})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:r}=e;if(null==i)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let n=xe(r),a=0,d=-1;for(;o.nextNode();){for(d++,o.currentNode===i&&(a=Se(t),i.parentNode.insertBefore(t,i));-1!==n&&r[n].index===d;){if(a>0){for(;-1!==n;)r[n].index+=a,n=xe(r,n);return}n=xe(r,n)}}}(i,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(n,a.firstChild);const e=new Set;e.add(n),we(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const et={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},tt=(e,t)=>t!==e&&(t==t||e==e),it={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:tt};class st extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=it){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const r=this[e];this[t]=s,this.requestUpdateInternal(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||it}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=tt){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||et,r="function"==typeof s?s:s.fromAttribute;return r?r(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||et.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=it){const s=this.constructor,r=s._attributeNameForProperty(e,i);if(void 0!==r){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const r=this.constructor;i=i||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}st.finalized=!0;
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
const rt=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),ot=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function nt(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ot(e,t)}function at(e,t){return(i,s)=>{const r={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof s?Symbol():`__${s}`;r.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==s?dt(r,i,s):lt(r,i)}}const dt=(e,t,i)=>{Object.defineProperty(t,i,e)},lt=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});const ct=Element.prototype;ct.msMatchesSelector||ct.webkitMatchesSelector;
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
const pt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ut=Symbol();class ht{constructor(e,t){if(t!==ut)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(pt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const mt=(e,...t)=>{const i=t.reduce((t,i,s)=>t+(e=>{if(e instanceof ht)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1],e[0]);return new ht(i,ut)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ft={};class gt extends st{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e),i),i=t(e,new Set),s=[];i.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!pt){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ht(String(t),ut)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?pt?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ft&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ft}}gt.finalized=!0,gt.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,r=Ge.has(t),o=Ye&&11===t.nodeType&&!!t.host,n=o&&!Xe.has(s),a=n?document.createDocumentFragment():t;if(((e,t,i)=>{let s=Ge.get(t);void 0===s&&(pe(t,t.firstChild),Ge.set(t,s=new Ce(Object.assign({templateFactory:ze},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,a,Object.assign({templateFactory:Ze(s)},i)),n){const e=Ge.get(a);Ge.delete(a);const i=e.value instanceof De?e.value.template:void 0;Ke(s,a,i),pe(t,t.firstChild),t.appendChild(a),Ge.set(t,e)}!r&&o&&window.ShadyCSS.styleElement(t.host)};const yt=mt`
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
`,bt=mt`
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
`,vt=mt`
  button,
  input,
  .selectable {
    outline: none;
  }
`,wt=mt`
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input {
    --color-input-primary: #8899a9;
    --color-input-primary-dark: #34495e;
    --color-input-error: red;
    --color-input-success: var(--color-input-primary);
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
      border-color: var(--color-input-primary);
    }
    50% {
      border-color: var(--color-input-primary-dark);
    }
    100% {
      border-color: var(--color-input-primary);
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
    fill: rgb(151, 147, 147);
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
`,xt=mt`
  .card {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: rgb(101 101 101 / 30%) 0px 1px 5px 0px;
  }
`,Et=mt`
  button {
    font: inherit;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    margin: 0;
  }

  button[solid] {
    color: white;
    background-color: var(--color-primary);
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.5);
  }

  button[plain] {
    --color-primary-dark: rgba(0, 0, 0, 0.1);
    color: var(--color-primary);
    background-color: transparent;
    transition: background-color 0.3s;
  }

  button[outline] {
    background: white;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    --color-primary-dark: rgb(228 228 228);
    box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2),
      0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
  }

  @media (hover: hover) {
    button[solid]:hover,
    button[outline]:hover {
      background-color: var(--color-primary-dark);
      box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
    }
    button[plain]:hover {
      background-color: var(--color-primary-dark);
    }
  }

  button[solid]:focus,
  button[solid]:active,
  button[outline]:focus,
  button[outline]:active {
    background-color: var(--color-primary-dark);
    box-shadow: 0px 2px 9px 1px rgba(var(--color-primary-dark-rgb), 0.5);
  }

  button[plain]:focus,
  button[plain]:active {
    background-color: var(--color-primary-dark);
  }

  button[static],
  button[static]:hover,
  button[static]:focus,
  button[static]:active {
    box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2),
      0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
  }
`,_t=(e,t)=>{let i=(null==t?void 0:t.autoBlur)||!0,s=(null==t?void 0:t.debounce)||!0,r=!1;return t=>{if(r)return;if(s&&(r=!0,setTimeout(()=>r=!1,1e3)),i){t.currentTarget.blur()}let o=t.type;if("click"===o)e(t);else if("keydown"===o){let i=t.key;"Enter"!==i&&" "!==i||e(t)}}},Ot=new WeakMap,It=_e(e=>t=>{const i=Ot.get(t);if(void 0===e&&t instanceof Ae){if(void 0!==i||!Ot.has(t)){const e=t.committer.name;t.committer.element.removeAttribute(e)}}else e!==i&&t.setValue(e);Ot.set(t,e)});var Nt;!function(e){e[e.PENDING=0]="PENDING",e[e.INVALID=1]="INVALID",e[e.VALID=2]="VALID"}(Nt||(Nt={}));const Dt=()=>({value:"",validity:Nt.PENDING}),Rt=()=>({value:"",validity:Nt.PENDING,visible:!1}),kt=e=>t=>{let i=t.target,s=i.value,r=Nt.PENDING;s.length>0&&(r=i.validity.valid?Nt.VALID:Nt.INVALID),e({value:s,validity:r})},Ut=(e,t,i,s)=>{const r=(null==s?void 0:s.placeholder)||"",o=(null==s?void 0:s.label)||"";return He`
    <input
      id="${It(null==s?void 0:s.id)}"
      required
      type="text"
      tabindex="0"
      placeholder="${r}"
      autocomplete="off"
      aria-label="${o}"
      value="${e.value}"
      ?invalid="${e.validity===Nt.INVALID}"
      ?valid="${e.validity===Nt.VALID}"
      @focus="${t}"
      @blur="${kt(i)}"
      @input="${e=>{if(null==s?void 0:s.changeText){let t=e.currentTarget;t.value=s.changeText(t.value)}}}"
    />
  `},Tt=(e,t,i,s)=>{const r=_t(()=>i({...e,visible:!e.visible}),{autoBlur:!1,debounce:!1});return He`
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
        ?invalid="${e.validity===Nt.INVALID}"
        ?valid="${e.validity===Nt.VALID}"
        @focus="${t}"
        @blur="${kt(e=>i(e))}"
        @keydown="${e=>{"Enter"===e.key&&s(e)}}"
      />

      <div
        tabindex="0"
        aria-label="Toggle password visibility"
        class="password-toggle selectable"
        @click="${r}"
        @keydown="${r}"
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
  `};var Pt=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let $t=class extends gt{constructor(){super(...arguments),this.errorMessage="",this.errorVisible=!1,this.isProcessing=!1,this.emailState=Dt(),this.passwordState=Rt(),this.onSubmit=_t(e=>{if(e.preventDefault(),this.emailState.validity!==Nt.VALID)return void this.showError("Please enter a valid email address!");if(this.passwordState.validity!==Nt.VALID)return void this.showError("Please enter a valid password!");if(this.isProcessing)return;this.isProcessing=!0;let t={email:this.emailState.value,password:this.passwordState.value},i=re.requestSignIn(t);w.dispatch(i)})}connectedCallback(){super.connectedCallback();w.listen(y.AUTH,(e,t)=>{if(e.action.type===te.REQUEST_SIGN_IN_FAILED){let t=e.action.payload;this.isProcessing=!1,this.showError(t.message)}else e.action.type===te.SIGNED_IN&&(t(),this.successfullLogin())}),window.PasswordCredential&&navigator.credentials.get({password:!0,mediation:"required"}).then(e=>{if(e){let t=e;this.emailState.value=t.id,this.passwordState.value=t.password}})}successfullLogin(){if(window.PasswordCredential){var e=new window.PasswordCredential({id:this.emailState.value,password:this.passwordState.value});navigator.credentials.store(e)}let t=new Event("signed-in");this.dispatchEvent(t)}showError(e){this.errorMessage=e,this.errorVisible=!0}render(){return He`
      <div id="root" tabindex="0" class="selectable">
        <form
          id="form"
          class="card"
          @submit="${e=>e.preventDefault()}"
          novalidate
        >
          <h3>Sign in</h3>

          ${e=this.emailState,t=()=>{this.emailState={...this.emailState,validity:Nt.PENDING},this.errorVisible=!1},i=e=>this.emailState=e,He`
    <input
      required
      type="email"
      tabindex="0"
      placeholder="Email"
      autocomplete="off"
      aria-label="Email input"
      value="${e.value}"
      ?invalid="${e.validity===Nt.INVALID}"
      ?valid="${e.validity===Nt.VALID}"
      @focus="${t}"
      @blur="${kt(i)}"
    />
  `}
          ${Tt(this.passwordState,()=>{this.passwordState={...this.passwordState,validity:Nt.PENDING},this.errorVisible=!1},e=>this.passwordState=e,e=>this.onSubmit(e))}

          <button
            id="submit"
            tabindex="0"
            @click=${this.onSubmit}
            @keydown="${e=>{var t,i;"Tab"===e.key&&(null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===i||i.focus())}}"
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
    `;var e,t,i}static get styles(){return[vt,wt,St,xt,Et,mt`
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
          --total-offset: calc(
            var(--offset-height) + var(--offset-reduce)
          );
          transform: translateY(
            calc(var(--total-offset) * var(--offset-on))
          );
          transition: transform 0.3s;
        }

        h3 {
          margin: 15px 0 10px;
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
        }

        #error[aria-hidden='false'] {
          max-height: 2.4rem;
          opacity: 1;
        }
      `]}};Pt([nt({type:String})],$t.prototype,"errorMessage",void 0),Pt([nt({type:Boolean})],$t.prototype,"errorVisible",void 0),Pt([nt({type:Boolean})],$t.prototype,"isProcessing",void 0),Pt([nt({type:Object})],$t.prototype,"emailState",void 0),Pt([nt({type:Object})],$t.prototype,"passwordState",void 0),$t=Pt([rt("login-view")],$t);var At,Ct=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};!function(e){e[e.OPENING=0]="OPENING",e[e.OPENED=1]="OPENED",e[e.CLOSING=2]="CLOSING",e[e.INPUT_FOCUSED=3]="INPUT_FOCUSED"}(At||(At={}));let Mt=class extends gt{constructor(){super(...arguments),this.state=At.OPENING,this.closePrompt=!1}firstUpdated(){let e=()=>{this.state===At.OPENING?this.state=At.OPENED:this.state===At.CLOSING&&(this._dialog.removeEventListener("animationend",e),this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0})))};this._dialog.addEventListener("animationend",e)}reset(){this.dispatchEvent(new Event("reset"))}close(){this.state===At.INPUT_FOCUSED?(this.closePrompt=!0,this.reset()):this.state===At.OPENED&&(this.state=At.CLOSING)}render(){return He`<div
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

        ${this.closePrompt?He` <div class="close-prompt" @click="${this.close}">
              <p>Tap again to close</p>
            </div>`:""}
      </div>
    </div>`}static get styles(){return[vt,xt,bt,mt`
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
          transition: transform 0.3s;
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
      `]}};Ct([nt({type:Number})],Mt.prototype,"state",void 0),Ct([nt({type:Boolean})],Mt.prototype,"closePrompt",void 0),Ct([at("#dialog")],Mt.prototype,"_dialog",void 0),Mt=Ct([rt("custom-dialog")],Mt);var Lt=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let jt=class extends gt{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.branch=this.authUser.branch,this.departments=w.departments.items,this.nameState=Dt(),this.rankState=Dt(),this.emailState=Dt(),this.passwordState=Rt(),this.errorState={message:"",visible:!1},this.editing=!1,this.isRegularState=!1,this.showDepartmentSelector=!1,this.hideDepartmentSelector=!1,this.dialogState=At.OPENING}connectedCallback(){super.connectedCallback(),this.user&&(this.nameState={value:this.user.name,validity:Nt.VALID},this.rankState={value:this.user.rank.text,validity:Nt.VALID},this.emailState={value:this.user.email.split("@")[0],validity:Nt.VALID},this.isRegularState=this.user.regular)}showError(e){this.errorState={visible:!0,message:e}}checkValidity(){this.rankState.validity!==Nt.VALID?this.showError("Please enter a valid rank!"):this.nameState.validity!==Nt.VALID?this.showError("Please enter a valid name!"):this.emailState.validity!==Nt.VALID?this.showError("Please enter a valid email!"):this.editing||this.passwordState.validity===Nt.VALID||this.showError("Please enter a valid password!")}submit(){return _t(()=>{if(this.dialogState===At.INPUT_FOCUSED&&window.offsetOn)return;if(this.checkValidity(),this.errorState.visible)return;const e=this.nameState.value.trim(),t=new U(this.rankState.value.trim()),i=this.emailState.value.trim()+"@"+this.branch.domain,s=this.isRegularState,r=this.department.id;let o,n={name:e,rank:t,email:i,regular:s,branchid:this.branch.id,departmentid:r};if(this.editing)o=O.requestModify({...this.user,...n});else{const e=this.passwordState.value.trim();let t=new m({...n,password:e});o=O.requestAdd(t)}w.dispatch(o),this.dialogState=At.CLOSING})}changePassword(){return _t(()=>{if(this.passwordState.validity!==Nt.VALID)return void this.showError("Please enter a valid password!");const e=this.passwordState.value,t=O.requestModify({...this.user,password:e});w.dispatch(t),this.passwordState.value=""})}delete(){return _t(()=>{let e=O.requestRemove(this.user);w.dispatch(e),this.dialogState=At.CLOSING})}onInputFocus(){this.errorState={...this.errorState,visible:!1},this.dialogState=At.INPUT_FOCUSED}render(){return He`<custom-dialog
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

          ${this.editing?He` <button
                plain
                id="delete"
                @click="${this.delete()}"
                aria-label="Delete user"
              >
                delete
              </button>`:""}
        </div>

        <div id="rankname" class="row-box">
          ${Ut(this.rankState,()=>{this.rankState={...this.rankState,validity:Nt.PENDING},this.onInputFocus()},e=>{let t=U.isValid(e.value.toUpperCase());e.validity===Nt.PENDING||t||(e.validity=Nt.INVALID),this.rankState=e},{placeholder:"Rank",label:"Rank",id:"rank",changeText:e=>e.replace(/\W/g,"")})}
          ${Ut(this.nameState,()=>{this.nameState={...this.nameState,validity:Nt.PENDING},this.onInputFocus()},e=>this.nameState=e,{placeholder:"Name",label:"Name",id:"name"})}
        </div>

        <div id="email" class="row-box">
          ${Ut(this.emailState,()=>{this.emailState={...this.emailState,validity:Nt.PENDING},this.onInputFocus()},e=>this.emailState=e,{placeholder:"Email",label:"Email",changeText:e=>e.replace(/\W/g,"")})}

          <p>@${this.branch.domain}</p>
        </div>

        <div id="password" class="row-box">
          ${Tt(this.passwordState,()=>{this.passwordState={...this.passwordState,validity:Nt.PENDING},this.onInputFocus()},e=>this.passwordState=e,()=>{})}

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
          @keydown="${e=>{var t,i;"Tab"===e.key&&(null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===i||i.focus())}}"
          solid
        >
          Confirm
        </button>

        <p class="error card" ?show=${this.errorState.visible}>
          ${this.errorState.message}
        </p>

        ${this.showDepartmentSelector?He`
              <div
                id="department-selector"
                ?hide="${this.hideDepartmentSelector}"
              >
                <div class="card">
                  ${this.departments.map(e=>He`<p
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
    </custom-dialog>`}static get styles(){return[vt,Et,xt,wt,St,bt,mt`
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
      `]}};Lt([at("#department-selector")],jt.prototype,"_departmentSelector",void 0),Lt([nt({type:Object})],jt.prototype,"user",void 0),Lt([nt({type:Object})],jt.prototype,"department",void 0),Lt([nt({type:Object})],jt.prototype,"nameState",void 0),Lt([nt({type:Object})],jt.prototype,"rankState",void 0),Lt([nt({type:Object})],jt.prototype,"emailState",void 0),Lt([nt({type:Object})],jt.prototype,"passwordState",void 0),Lt([nt({type:Object})],jt.prototype,"errorState",void 0),Lt([nt({type:Boolean})],jt.prototype,"editing",void 0),Lt([nt({type:Boolean})],jt.prototype,"isRegularState",void 0),Lt([nt({type:Boolean})],jt.prototype,"showDepartmentSelector",void 0),Lt([nt({type:Boolean})],jt.prototype,"hideDepartmentSelector",void 0),Lt([nt({type:Number})],jt.prototype,"dialogState",void 0),jt=Lt([rt("edit-user")],jt);var Vt=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let qt=class extends gt{constructor(){super(...arguments),this.nameState=Dt(),this.dialogState=At.OPENING,this.editing=!1}connectedCallback(){super.connectedCallback(),this.department&&(this.nameState.value=this.department.name)}submit(){if(this.dialogState!==At.INPUT_FOCUSED||!window.offsetOn)if(0!==this.nameState.value.length){if(this.editing){let e=x.requestModify({...this.department,name:this.nameState.value.trim()});w.dispatch(e)}else{let e=x.requestAdd({id:"0",name:this.nameState.value.trim()});w.dispatch(e)}this.dialogState=At.CLOSING}else this.nameState={...this.nameState,validity:Nt.INVALID}}delete(){let e=x.requestRemove(this.department);w.dispatch(e),this.dialogState=At.CLOSING}onInputFocus(){this.dialogState=At.INPUT_FOCUSED}render(){return He`<custom-dialog
      .state="${this.dialogState}"
      @reset="${()=>this.dialogState=At.OPENED}"
    >
      <div id="root" tabindex="0" class="selectable">
        <div class="header">
          <h3>Department</h3>

          ${this.editing?He`<button
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
          @keydown="${e=>{var t,i;"Tab"===e.key&&(null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.getElementById("root"))||void 0===i||i.focus())}}"
        >
          Confirm
        </button>
      </div>
    </custom-dialog>`}static get styles(){return[vt,Et,xt,wt,mt`
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

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
        }
      `]}};Vt([nt({type:Object})],qt.prototype,"department",void 0),Vt([nt({type:Object})],qt.prototype,"nameState",void 0),Vt([nt({type:Number})],qt.prototype,"dialogState",void 0),Vt([nt({type:Boolean})],qt.prototype,"editing",void 0),qt=Vt([rt("edit-department")],qt);var Bt=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let zt=class extends gt{signOut(){this.dispatchEvent(new Event("signed-out",{bubbles:!0,composed:!0}))}render(){return He`<custom-dialog>
      <div id="root">
        <h4>Are you sure you want sign out?</h4>
        <button solid @click="${this.signOut}">Yes. I'm positive.</button>
      </div>
    </custom-dialog>`}static get styles(){return[vt,Et,mt`
        #root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        h4 {
          width: 100%;
          color: #313131;
          margin-top: 15px;
        }
      `]}};zt=Bt([rt("sign-out")],zt);var Ft=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Gt=class extends gt{constructor(){super(...arguments),this.showSignOutDialog=!1,this.elevate=!1}firstUpdated(){this.addEventListener("elevate",e=>{this.elevate=e.detail})}render(){return He`<button
        id="welcome-text"
        tabindex="0"
        @click="${_t(()=>this.showSignOutDialog=!0)}"
        aria-label="Open sign out dialog"
        plain
        ?elevate="${this.elevate}"
      >
        <slot></slot>
      </button>

      ${this.showSignOutDialog?He`<sign-out
            @close="${()=>this.showSignOutDialog=!1}"
          ></sign-out>`:""}`}static get styles(){return[vt,Et,mt`
        #welcome-text {
          transition: box-shadow 0.5s, background-color 0.5s;
        }
        button {
          position: absolute;
          width: 100%;
          padding: 10px;
          z-index: 10;
          font-weight: 500;
          font-size: 1.1rem;
          box-shadow: none;
          background: #faf5fab8;
          color: var(--color-primary-dark);
          border-radius: 0px;
        }
        button[elevate] {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
          background-color: rgb(153 153 153 / 10%);
        }
      `]}};Ft([nt({type:Boolean})],Gt.prototype,"showSignOutDialog",void 0),Ft([nt({type:Boolean})],Gt.prototype,"elevate",void 0),Gt=Ft([rt("welcome-text")],Gt);var Qt=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ht=class extends gt{constructor(){super(...arguments),this.showEditDepartment=!1,this.showEditUser=!1,this.isEmpty=!0,this.index=0}onEditDepartment(){return _t(()=>{this.showEditDepartment=!0})}onAddUser(){return _t(()=>{this.selectedUser=void 0,this.showEditUser=!0})}closeEditDepartment(e){e.stopPropagation(),this.showEditDepartment=!1}closeEditUser(e){e.stopPropagation(),this.showEditUser=!1,this.selectedUser=void 0}onEditUser(e){this.selectedUser=e.detail.user,this.showEditUser=!0}onListChanged(e){const t=e.detail.users;this.isEmpty=0===t.length}render(){return He`<div id="root" style="--anim-delay:${this.index/10+.2}s;">
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

        ${this.showEditDepartment?He`<edit-department
              editing
              .department=${this.department}
              @close="${this.closeEditDepartment}"
            ></edit-department>`:""}
        ${this.showEditUser?He`
              <edit-user
                .department=${this.department}
                .user=${this.selectedUser}
                .editing=${!!this.selectedUser}
                @close="${this.closeEditUser}"
              ></edit-user>
            `:""}
      </div>
    </div>`}static get styles(){return[vt,yt,Et,xt,mt`
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
      `]}};Qt([nt({type:Object})],Ht.prototype,"department",void 0),Qt([nt({type:Object})],Ht.prototype,"selectedUser",void 0),Qt([nt({type:Boolean})],Ht.prototype,"showEditDepartment",void 0),Qt([nt({type:Boolean})],Ht.prototype,"showEditUser",void 0),Qt([nt({type:Boolean})],Ht.prototype,"isEmpty",void 0),Qt([nt({type:Number})],Ht.prototype,"index",void 0),Ht=Qt([rt("admin-dep-item")],Ht);
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
const Wt=(e,t)=>{const i=e.startNode.parentNode,s=void 0===t?e.endNode:t.startNode,r=i.insertBefore(be(),s);i.insertBefore(be(),s);const o=new Ce(e.options);return o.insertAfterNode(r),o},Yt=(e,t)=>(e.setValue(t),e.commit(),e),Zt=(e,t,i)=>{const s=e.startNode.parentNode,r=i?i.startNode:e.endNode,o=t.endNode.nextSibling;o!==r&&ce(s,t.startNode,o,r)},Jt=e=>{pe(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},Xt=(e,t,i)=>{const s=new Map;for(let r=t;r<=i;r++)s.set(e[r],r);return s},Kt=new WeakMap,ei=new WeakMap,ti=_e((e,t,i)=>{let s;return void 0===i?i=t:void 0!==t&&(s=t),t=>{if(!(t instanceof Ce))throw new Error("repeat can only be used in text bindings");const r=Kt.get(t)||[],o=ei.get(t)||[],n=[],a=[],d=[];let l,c,p=0;for(const t of e)d[p]=s?s(t,p):p,a[p]=i(t,p),p++;let u=0,h=r.length-1,m=0,f=a.length-1;for(;u<=h&&m<=f;)if(null===r[u])u++;else if(null===r[h])h--;else if(o[u]===d[m])n[m]=Yt(r[u],a[m]),u++,m++;else if(o[h]===d[f])n[f]=Yt(r[h],a[f]),h--,f--;else if(o[u]===d[f])n[f]=Yt(r[u],a[f]),Zt(t,r[u],n[f+1]),u++,f--;else if(o[h]===d[m])n[m]=Yt(r[h],a[m]),Zt(t,r[h],r[u]),h--,m++;else if(void 0===l&&(l=Xt(d,m,f),c=Xt(o,u,h)),l.has(o[u]))if(l.has(o[h])){const e=c.get(d[m]),i=void 0!==e?r[e]:null;if(null===i){const e=Wt(t,r[u]);Yt(e,a[m]),n[m]=e}else n[m]=Yt(i,a[m]),Zt(t,i,r[u]),r[e]=null;m++}else Jt(r[h]),h--;else Jt(r[u]),u++;for(;m<=f;){const e=Wt(t,n[f+1]);Yt(e,a[m]),n[m++]=e}for(;u<=h;){const e=r[u++];null!==e&&Jt(e)}Kt.set(t,n),ei.set(t,d)}});var ii=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const si=(e,t)=>e===y.USERS?t.payload.fullname:t.payload.name;let ri=class extends gt{constructor(){super(...arguments),this.requests={},this.dateStoreListener=async e=>{if(!N.includes(e.action.type))return;const t=e.action.type,i=e.action,s=I[t],r=e.action.root,o=r===y.USERS?"user":"department";let n,a,d=void 0,l=void 0;if(i.type===_.REQUEST_SUCCESSFUL){const e=i.payload,t=I[e.type-3];a=`${o} '${si(r,e)}' ${t} ${s}!`,n=e.id}else if(i.type===_.REQUEST_ERROR){const e=i.payload,t=e.action;a=`${s} ${I[t.type]} ${o} '${si(r,t)}'`,n=t.id,l=t.payload,d=e.message}else{a=`${s} ${o} '${si(r,i)}'...`,n=i.id}n=`request-${n}`,this.requests={...this.requests,[n]:{id:n,root:r,type:t,message:a,payload:l,error:d}}}}connectedCallback(){super.connectedCallback(),this.departmentsUnsubscribe=w.listen(y.DEPARTMENTS,this.dateStoreListener),this.usersUnsubscribe=w.listen(y.USERS,this.dateStoreListener)}disconnectedCallback(){var e,t;super.disconnectedCallback(),null===(e=this.departmentsUnsubscribe)||void 0===e||e.call(this),null===(t=this.usersUnsubscribe)||void 0===t||t.call(this)}onDismiss(e){return _t(()=>{const t=this.shadowRoot.getElementById(e);t.addEventListener("animationend",()=>{const{[e]:t,...i}=this.requests;this.requests=i},{once:!0}),t.style.animation="item-appear-out .3s"})}render(){const e=He`<div id="root">
      ${ti(Object.values(this.requests),e=>e.id,e=>{const t=e.type,i=t===_.REQUEST_SUCCESSFUL,s=t===_.REQUEST_ERROR;return He`<div
        id="${e.id}"
        class="content card"
        ?success="${i}"
        ?error="${s}"
      >
        <div class="request">
          <p class="message">${r=e.message,r.charAt(0).toUpperCase()+r.slice(1)}</p>
          ${s?He`<p class="error">${e.error}!</p>`:""}
          ${i||s?He`<button
                plain
                class="dismiss"
                @click="${this.onDismiss(e.id)}"
              >
                X
              </button>`:""}
        </div>
      </div>`;var r;
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
    </div>`,t=0===Object.keys(this.requests).length;return He`${t?"":e}`}static get styles(){return[vt,Et,xt,mt`
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
      `]}};ii([nt({type:Object})],ri.prototype,"requests",void 0),ri=ii([rt("request-log")],ri);var oi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};class ni extends gt{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.departments=[],this.departmentsListener=e=>{const t=e.action.type;N.includes(t)||(this.departments=e.items)}}connectedCallback(){if(this.authUser.isAdmin)this.welcomeTitle="Hi, admin user!";else{const e=w.users.usersById[this.authUser.uid].fullname;this.welcomeTitle=`Hi, ${e}!`}this.departments=w.departments.items.slice();const e=w.listen(y.DEPARTMENTS,this.departmentsListener);this.addEventListener("signed-out",()=>{e();const t=re.requestSignOut();w.dispatch(t)},{once:!0}),super.connectedCallback()}firstUpdated(){let e={root:this._scrollable,rootMargin:"1px",threshold:1};new IntersectionObserver(()=>{const e=this._scrollable.scrollTop>1,t=new CustomEvent("elevate",{detail:e});this._welcomeText.dispatchEvent(t)},e).observe(this._gap)}render(){return He`<div id="root">
      <welcome-text> ${this.welcomeTitle} </welcome-text>

      <div id="scrollable">
        <div id="gap"></div>
        <div id="department-list">
          ${this.departments.map(this.depItemTemplate)}
        </div>
      </div>

      ${0===this.departments.length?He`<p class="empty">No departments found</p>`:""}

      <slot></slot>
    </div>`}static get styles(){return[vt,Et,xt,mt`
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
      `]}}oi([at("welcome-text",!0)],ni.prototype,"_welcomeText",void 0),oi([at("#scrollable",!0)],ni.prototype,"_scrollable",void 0),oi([at("#gap",!0)],ni.prototype,"_gap",void 0),oi([nt({type:Array})],ni.prototype,"departments",void 0);var ai=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let di=class extends ni{constructor(){super(...arguments),this.depItemTemplate=(e,t)=>He`<admin-dep-item
      .department="${e}"
      .index=${t}
    ></admin-dep-item>`}};di=ai([rt("admin-dep-list")],di);var li=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};class ci extends gt{constructor(){super(...arguments),this.users=[],this.listState={items:{},length:0},this.init=()=>{const e=this.department.id,t=w.users.sortedUsersByDepartment;let i;e in t?(i=t[e].slice(),this.updateListState(i)):(i=[],this.listState={items:{},length:0}),this.users=i,this.onListChanged(i)},this.onListChanged=e=>{const t=new CustomEvent("list-changed",{detail:{users:e}});this.dispatchEvent(t)},this.updateListState=e=>{const t={},i=e.length;e.map((e,i)=>{const s=_.INITIALIZED;t[e.uid]={index:i,type:s}}),this.listState={items:t,length:i}},this.usersListener=async e=>{const t=e.action.type;if(N.includes(t))return;const i=this.department.id;if(!(i in e.sortedUsersByDepartment))return;if(t===_.INITIALIZED)return;const s=e.action.payload;if(s.departmentid!==i)return;const r=e.sortedUsersByDepartment[this.department.id].slice();let o;this.users=r,t===_.REMOVED&&(o=this.listState.items[s.uid]),t===_.MODIFIED&&await new Promise(e=>requestAnimationFrame(()=>e())),this.updateListState(r),t===_.REMOVED&&(r.splice(o.index,0,s),this.listState.items[s.uid]=o),this.listState.items[s.uid].type=t,this.onListChanged(e.sortedUsersByDepartment[this.department.id].slice())}}connectedCallback(){super.connectedCallback(),this.usersUnsubscribe=w.listen(y.USERS,this.usersListener)}disconnectedCallback(){var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),super.disconnectedCallback()}firstUpdated(){this._userList.onanimationend=e=>{const t=e.composedPath()[0];if(t.hasAttribute("state")){const e=t.id,i=t.getAttribute("state");if("added"===i||"updated"===i){const t=this.listState.items[e];this.listState={...this.listState,items:{...this.listState.items,[e]:{...t,type:_.INITIALIZED}}}}else if("removed"===i){const t=this.users.filter(t=>t.uid!=e);this.updateListState(t),this.users=t}}}}shouldUpdate(e){return e.has("department")&&this.init(),!0}onUserSelected(e){return _t(()=>{const t=new CustomEvent("user-selected",{detail:{user:e},bubbles:!0,composed:!0});this.dispatchEvent(t)})}render(){const e=this.listState.length,t=e*this.listItemHeight;return He` <div id="user-list" style="height:${t}rem;">
      ${ti(this.users,e=>e.uid,t=>{const i=this.listState.items[t.uid];return He`
        <div
          id="${t.uid}"
          style="--offset-y:${i.index*this.listItemHeight}rem;"
          tabindex="0"
          class="user selectable"
          state="${I[i.type]}"
          ?regular="${t.regular}"
          ?last="${i.index===e-1}"
          @click="${this.onUserSelected(t)}"
        >
          ${this.userItemTemplate(t)}
        </div>
      `})}
    </div>`}static get styles(){return[vt,mt`
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
          background-color: rgba(0, 0, 0, 0.1);
        }

        @media (hover: hover) {
          .user:hover {
            background-color: rgba(0, 0, 0, 0.1);
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
            background-color: white;
          }
          50% {
            background-color: rgba(255, 56, 56, 0.18);
          }
          100% {
            background-color: white;
          }
        }
      `]}}li([at("#user-list")],ci.prototype,"_userList",void 0),li([nt({type:Array})],ci.prototype,"users",void 0),li([nt({type:Object})],ci.prototype,"department",void 0),li([nt({type:Object})],ci.prototype,"listState",void 0);var pi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ui=class extends ci{constructor(){super(...arguments),this.listItemHeight=3.5}userItemTemplate(e){return He`
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
        }

        .email {
          color: #878787;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 400;
        }
      `]}};ui=pi([rt("admin-user-list")],ui);var hi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let mi=class extends gt{constructor(){super(...arguments),this.showAddDepartment=!1}onAddDepartment(){return _t(()=>{this.showAddDepartment=!0})}closeAddDepartment(){this.showAddDepartment=!1}render(){return He`<div id="root">
      <admin-dep-list></admin-dep-list>

      <button id="add-department" solid @click="${this.onAddDepartment()}">
        Add department
      </button>

      <request-log></request-log>

      ${this.showAddDepartment?He`<edit-department
            @close="${this.closeAddDepartment}"
          ></edit-department>`:""}
    </div>`}static get styles(){return[vt,Et,xt,mt`
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
      `]}};hi([nt({type:Boolean})],mi.prototype,"showAddDepartment",void 0),mi=hi([rt("admin-view")],mi);var fi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let gi=class extends gt{constructor(){super(...arguments),this.index=0,this.isMorning=!0,this.isEmpty=!0,this.presentCount={am:{regular:0,nsf:0},pm:{regular:0,nsf:0}}}onUserSelected(e){this.selectedUser=e.detail.user}onListChanged(e){const t=e.detail.users,i={regular:0,nsf:0},s={regular:0,nsf:0};t.map(e=>{A.isPresent(e.morning.code)&&(e.regular?i.regular++:i.nsf++),A.isPresent(e.afternoon.code)&&(e.regular?s.regular++:s.nsf++)}),this.presentCount={am:i,pm:s},this.isEmpty=0===t.length}render(){const e=this.isMorning?this.presentCount.am:this.presentCount.pm,t=e.regular,i=e.nsf;return He`<div id="root" style="--anim-delay:${2*this.index/10}s;">
        <div class="header">
          <h3>${this.department.name}</h3>
        </div>

        <div class="card">
          <h4 class="summary" ?empty="${this.isEmpty}">
            ${t+i} Total ~ ${t} Regular + ${i} Nsf
          </h4>

          <user-list
            .department="${this.department}"
            @user-selected="${this.onUserSelected}"
            @list-changed="${this.onListChanged}"
          ></user-list>
        </div>
      </div>

      ${this.selectedUser?He`<edit-status
            .uid="${this.selectedUser.uid}"
            .isMorning="${this.isMorning}"
            @close="${()=>this.selectedUser=void 0}"
          ></edit-status>`:""} `}static get styles(){return[vt,Et,xt,yt,mt`
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
        }

        .summary {
          margin: 0;
          padding: 10px;
          text-align: center;
          font-weight: 400;
          background: #33475a;
          font-size: 0.9rem;
          color: white;
          border-radius: 15px 15px 0 0;
        }

        .summary[empty] {
          border-radius: 15px;
        }

        .card {
          border-radius: 15px;
        }
      `]}};fi([nt({type:Number})],gi.prototype,"index",void 0),fi([nt({type:Object})],gi.prototype,"department",void 0),fi([nt({type:Object})],gi.prototype,"selectedUser",void 0),fi([nt({type:Boolean})],gi.prototype,"isMorning",void 0),fi([nt({type:Boolean})],gi.prototype,"isEmpty",void 0),fi([nt({type:Object})],gi.prototype,"presentCount",void 0),gi=fi([rt("user-dep-item")],gi);var yi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let bi=class extends ni{constructor(){super(...arguments),this.isMorning=!0,this.depItemTemplate=(e,t)=>He`<user-dep-item
      .index="${t}"
      .department="${e}"
      .isMorning="${this.isMorning}"
    ></user-dep-item>`}};yi([nt({type:Boolean})],bi.prototype,"isMorning",void 0),bi=yi([rt("user-dep-list")],bi);var vi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let wi=class extends ci{constructor(){super(...arguments),this.listItemHeight=4.6}statusTemplate(e,t){const i=T[e.code].name,s=e.remarks.trim().length>0,r=e.expired;return He`<p class="status">
      ${t}: ${i} ${s?He`(${e.remarks})`:""}
      ${r?He`<span>-- Expired</span>`:""}
    </p> `}userItemTemplate(e){return He`
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
        }

        .status {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1rem;
        }

        .status > span {
          color: var(--color-error);
          font-weight: 500;
          text-transform: capitalize;
        }
      `]}};wi=vi([rt("user-list")],wi);var Si=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let xi=class extends gt{constructor(){super(...arguments),this.isMorning=!0}toggleAm(){return _t(()=>{this.isMorning=!this.isMorning,this.dispatchEvent(new Event("toggle-am"))})}render(){return He`
      <div id="root">
        <button
          static
          ?solid="${this.isMorning}"
          ?outline="${!this.isMorning}"
          @click="${this.toggleAm()}"
        >
          AM
        </button>
        <button
          static
          ?solid="${!this.isMorning}"
          ?outline="${this.isMorning}"
          @click="${this.toggleAm()}"
        >
          PM
        </button>
      </div>
    `}static get styles(){return[vt,Et,mt`
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
          border: 2px solid var(--color-primary);          
        }

        button:first-child {
          border-radius: 35px 0 0 35px;
        }

        button:last-child {
          border-radius: 0 35px 35px 0;
        }
      `]}};Si([nt({type:Boolean})],xi.prototype,"isMorning",void 0),xi=Si([rt("toggle-am")],xi);var Ei=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let _i=class extends gt{constructor(){super(...arguments),this.authUser=w.auth.action.payload,this.updatedByName="",this.isMorning=!0,this.isProcessing=!1,this.dialogState=At.OPENING,this.usersListener=async e=>{if(e.action.type!==_.MODIFIED)return;const t=e.action.payload;t.uid===this.uid&&(this.selectedUser=t,this.resetStatus(),this.isProcessing=!1)}}onInputFocus(){this.dialogState=At.INPUT_FOCUSED}onInputBlur(e){const t=e.target.value.trim();this.statusToEdit={...this.statusToEdit,remarks:t}}resetStatus(){var e;const t=this.isMorning?this.selectedUser.morning:this.selectedUser.afternoon;this.statusToEdit=new A(t),this.updatedByName=(null===(e=w.users.usersById[t.updatedby])||void 0===e?void 0:e.fullname)||"Admin"}toggleAm(){this.isMorning=!this.isMorning,this.resetStatus()}statusChanged(e){return _t(()=>{this.statusToEdit={...this.statusToEdit,code:e,remarks:""}})}requestUpdateStatus(e){if(this.isProcessing)return;this.isProcessing=!0;const t=this.authUser.uid,i=new A({...this.statusToEdit,updatedby:t,date:new Date,expired:!1}),s=new f({...this.selectedUser,morning:e||this.isMorning?i:void 0,afternoon:e?i:this.isMorning?void 0:i}),r=O.requestModify(s);w.dispatch(r)}submitOnly(){return _t(()=>{this.requestUpdateStatus(!1)})}submitBoth(){return _t(()=>{this.requestUpdateStatus(!0)})}connectedCallback(){super.connectedCallback(),this.selectedUser=w.users.usersById[this.uid],this.resetStatus(),this.usersUnsubscribe=w.listen(y.USERS,this.usersListener)}disconnectedCallback(){var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),super.disconnectedCallback()}render(){return He`<custom-dialog
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
          ${T.map((e,t)=>He`<button
              static
              ?outline="${this.statusToEdit.code!==t}"
              ?solid="${this.statusToEdit.code===t}"
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
          ${(e=>{let t=e.toString();const i=t.indexOf(" (");return-1!==i&&(t=t.substr(0,i)),t})(this.statusToEdit.date)}
        </div>
      </div>
    </custom-dialog>`}static get styles(){return[vt,Et,mt`
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
          border: 2px solid var(--color-primary);
        }

        .remarks {
          margin-bottom: 25px;
        }
        .remarks > label {
          display: block;
          margin: 5px 0;
        }
        .remarks > input {
          padding: 5px;
          border: 1px solid grey;
          transition: all 0.3s 0.3s;
          outline: none;
          font: inherit;
          text-transform: uppercase;
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
          box-shadow: 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.5);
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
        }

        .updated-by > span {
          font-weight: 600;
        }
      `]}};Ei([nt({type:String})],_i.prototype,"uid",void 0),Ei([nt({type:String})],_i.prototype,"updatedByName",void 0),Ei([nt({type:Object})],_i.prototype,"selectedUser",void 0),Ei([nt({type:Object})],_i.prototype,"statusToEdit",void 0),Ei([nt({type:Boolean})],_i.prototype,"isMorning",void 0),Ei([nt({type:Boolean})],_i.prototype,"isProcessing",void 0),Ei([nt({type:Number})],_i.prototype,"dialogState",void 0),_i=Ei([rt("edit-status")],_i);var Oi=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const Ii={...T.reduce((e,t,i)=>(e[`a-${i}`]=t.name,e),{}),"a-00":"EXPIRED","a-11":"PRESENT (AWAY)","a-1":"PRESENT (FALL-IN)"};let Ni=class extends gt{constructor(){super(...arguments),this.initialHeight=0,this.showStats=!1,this.fadeOutStats=!1,this.closeView=!1,this.openingView=!0}init(){this.statsCount=new Array(P.length).fill(0),this.users=w.users.sortedUsers.slice();const e={"a-0":{users:[],regular:0,nsf:0},"a-00":{users:[],regular:0,nsf:0},"a-1":{users:[],regular:0,nsf:0},"a-11":{users:[],regular:0,nsf:0}};this.users.map(t=>{const i=this.isMorning?t.morning:t.afternoon,s=T[i.code].category;this.statsCount[s]++;let r=`a-${i.code}`;i.expired?r="a-00":A.isPresent(i.code)&&i.remarks.length>0&&(r="a-11"),r in e||(e[r]={users:[],regular:0,nsf:0}),e[r].users.push(t),t.regular?e[r].regular++:e[r].nsf++}),this.statusCodes=e;for(const t of Object.keys(e))0===e[t].users.length&&delete e[t];this.selectedCode=Object.keys(e)[0]}connectedCallback(){super.connectedCallback(),this.usersUnsubscribe=w.listen(y.USERS,e=>{N.includes(e.action.type)||this.init()})}codeChanged(e){return _t(()=>{this.selectedCode=e})}close(){return _t(()=>{var e;null===(e=this.usersUnsubscribe)||void 0===e||e.call(this),this.openingView||(this.closeView=!0)})}hideStats(){this._stats.addEventListener("animationend",()=>{this.showStats=!1,this.fadeOutStats=!1},{once:!0}),this.fadeOutStats=!0}firstUpdated(){this.initialHeight=this._statusCount.clientHeight,this._statusCard.style.height=`${this.initialHeight}px`;const e=t=>{"slide-out-to-right"===t.animationName&&(this.removeEventListener("animationend",e),this.dispatchEvent(new Event("on-close"))),"slide-in"===t.animationName&&(this.openingView=!1)};this._root.addEventListener("animationend",e)}updated(e){const t=e.has("selectedCode"),i=e.has("isMorning");if(t||i){const e=this._userList.scrollHeight,t=this._header.clientHeight;this._statusCard.style.height=`${this.initialHeight+e}px`,this._statusCardContainer.style.setProperty("--offset-y",`${t}px`)}}shouldUpdate(e){return e.has("isMorning")&&this.init(),!0}render(){const e=this.statusCodes[this.selectedCode],t=e.regular,i=e.nsf,s=t+i;return He` <div class="scrim" ?close="${this.closeView}"></div>
      <div id="root" ?close="${this.closeView}">
        <div id="header">
          <h4>Summary - ${this.users.length} Total</h4>

          <div id="status-selector">
            ${Object.keys(this.statusCodes).map(e=>{const t=this.statusCodes[e].nsf;return He`
                <button
                  outline
                  ?selected="${e===this.selectedCode}"
                  @click=${this.codeChanged(e)}
                >
                  ${Ii[e]} (${t})
                </button>
              `})}
          </div>
        </div>

        <div id="status-card-container">
          <div id="status-card" class="card" ?loading="${this.openingView}">
            <h4 id="status-count">
              ${s} Total ~ ${t} Regular + ${i} Nsf
            </h4>
            <div id="user-list">
              ${e.users.map(e=>{const t=this.isMorning?e.morning:e.afternoon;return He`<div class="user">
                  <p class="fullname" ?regular="${e.regular}">
                    ${e.fullname}
                  </p>
                  <p class="remarks">
                    ${t.remarks}
                    ${t.expired?He`<span>-- Expired</span>`:""}
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

        ${this.showStats?He`
              <div
                id="stats"
                @click="${this.hideStats}"
                ?hide="${this.fadeOutStats}"
              >
                <div class="card">
                  ${P.map((e,t)=>He`<p>
                      ${e}: <span>${this.statsCount[t]}</span>
                    </p>`)}
                </div>
              </div>
            `:""}
      </div>`}static get styles(){return[vt,Et,xt,yt,bt,mt`
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

        #status-selector > button[selected] {
          background-color: var(--color-primary);
          color: white;
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
          transition: height 0.5s, transform 0.5s;
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
        }

        .user .fullname[regular] {
          color: var(--color-primary);
        }

        .user .remarks {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
        }

        .user .remarks span {
          color: var(--color-error);
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
          background: rgba(0, 0, 0, 0.1);
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
      `]}};Oi([at("#root")],Ni.prototype,"_root",void 0),Oi([at("#status-count")],Ni.prototype,"_statusCount",void 0),Oi([at("#stats")],Ni.prototype,"_stats",void 0),Oi([at("#status-card",!0)],Ni.prototype,"_statusCard",void 0),Oi([at("#user-list",!0)],Ni.prototype,"_userList",void 0),Oi([at("#header",!0)],Ni.prototype,"_header",void 0),Oi([at("#status-card-container",!0)],Ni.prototype,"_statusCardContainer",void 0),Oi([nt({type:Array})],Ni.prototype,"statsCount",void 0),Oi([nt({type:Array})],Ni.prototype,"users",void 0),Oi([nt({type:Object})],Ni.prototype,"statusCodes",void 0),Oi([nt({type:String})],Ni.prototype,"listHeight",void 0),Oi([nt({type:String})],Ni.prototype,"selectedCode",void 0),Oi([nt({type:Boolean})],Ni.prototype,"isMorning",void 0),Oi([nt({type:Boolean})],Ni.prototype,"showStats",void 0),Oi([nt({type:Boolean})],Ni.prototype,"fadeOutStats",void 0),Oi([nt({type:Boolean})],Ni.prototype,"closeView",void 0),Oi([nt({type:Boolean})],Ni.prototype,"openingView",void 0),Ni=Oi([rt("summary-view")],Ni);var Di=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ri=class extends gt{constructor(){super(...arguments),this.user=w.auth.action.payload,this.showSummary=!1,this.isMorning=(new Date).getHours()<12}viewSummary(){return _t(()=>{this.showSummary=!0})}closeSummary(){this.showSummary=!1}toggleAm(){this.isMorning=!this.isMorning}render(){return He`<div id="root">
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

      ${this.showSummary?He`<summary-view
            @on-close="${this.closeSummary}"
            .isMorning="${this.isMorning}"
          ></summary-view>`:""}
    </div>`}static get styles(){return[vt,Et,xt,mt`
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
      `]}};Di([nt({type:Boolean})],Ri.prototype,"showSummary",void 0),Di([nt({type:Boolean})],Ri.prototype,"isMorning",void 0),Ri=Di([rt("user-view")],Ri);var ki=function(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ui=class extends gt{constructor(){super(...arguments),this.application=window.application,this.splashscreen=!0,this.initialized=!1,this.viewType=0,this.visible=!1}connectedCallback(){super.connectedCallback(),w.listen(y.AUTH,(e,t)=>{let i=e.action.type;this.addEventListener("animationend",()=>{this.splashscreen=!1,this.initialized=!1},{once:!0}),i===te.SIGNED_IN?this.signedIn():this.signedOut(),this.initialized=!0,t()}),this.application.getAuthManager()}async hideView(){this.visible&&(this.visible=!1,await new Promise(e=>{this._root.addEventListener("animationend",()=>e(),{once:!0})}))}async showView(e){await this.hideView(),this.viewType=e,this.visible=!0}signedIn(){const e=w.auth.action.payload;this.dataManager=e.isAdmin?this.application.getAdminManager():this.application.getStatusManager(),this.dataManager.subscribe().then(()=>{e.isAdmin?this.showView(2):this.showView(3)})}signedOut(){var e;null===(e=this.dataManager)||void 0===e||e.unsubscribe(),this.dataManager=void 0,this.showView(1)}render(){return He`
      <div id="root" ?fade-out="${!this.visible}" ?fade-in="${this.visible}">
        ${(()=>{switch(this.viewType){case 1:return He`<login-view @signed-in="${this.signedIn}"></login-view>`;case 2:return He`<admin-view
            @signed-out="${this.signedOut}"
          ></admin-view>`;case 3:return He`<user-view @signed-out="${this.signedOut}"></user-view>`;default:return""}})()}
      </div>
    `}static get styles(){return[bt,mt`
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
      `]}};ki([at("#root")],Ui.prototype,"_root",void 0),ki([nt({type:Boolean,reflect:!0})],Ui.prototype,"splashscreen",void 0),ki([nt({type:Boolean,reflect:!0})],Ui.prototype,"initialized",void 0),ki([nt({type:Number})],Ui.prototype,"viewType",void 0),ki([nt({type:Boolean})],Ui.prototype,"visible",void 0),Ui=ki([rt("view-switcher")],Ui)}]);