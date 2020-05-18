!function(t){function e(e){for(var s,r,n=e[0],a=e[1],o=0,l=[];o<n.length;o++)r=n[o],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&l.push(i[r][0]),i[r]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s]);for(d&&d(e);l.length;)l.shift()()}var s={},i={1:0};function r(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.e=function(t){var e=[],s=i[t];if(0!==s)if(s)e.push(s[2]);else{var n=new Promise((function(e,r){s=i[t]=[e,r]}));e.push(s[2]=n);var a,o=document.createElement("script");o.charset="utf-8",o.timeout=120,r.nc&&o.setAttribute("nonce",r.nc),o.src=function(t){return r.p+""+({0:"admin-screen"}[t]||t)+".js"}(t);var d=new Error;a=function(e){o.onerror=o.onload=null,clearTimeout(l);var s=i[t];if(0!==s){if(s){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",d.name="ChunkLoadError",d.type=r,d.request=n,s[1](d)}i[t]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:o})}),12e4);o.onerror=o.onload=a,document.head.appendChild(o)}return Promise.all(e)},r.m=t,r.c=s,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r.oe=function(t){throw console.error(t),t};var n=window.webpackJsonp=window.webpackJsonp||[],a=n.push.bind(n);n.push=e,n=n.slice();for(var o=0;o<n.length;o++)e(n[o]);var d=a;r(r.s=14)}([function(t,e,s){"use strict";s.d(e,"b",(function(){return r})),s.d(e,"a",(function(){return n}));const i="PointerEvent"in window;function r(t,...e){let s=null;return{get:()=>{if(!s){let i=[t[0]];e.forEach((e,s)=>{i.push(e,t[s+1])}),s=document.createElement("template"),s.innerHTML=i.join("")}return s}}}class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.views={}}render(t,e,s){if(t.appendChild(e.get().content.cloneNode(!0)),s){s.forEach(t=>{this.views[t]=this.shadowRoot.getElementById(t)}),[...this.shadowRoot.querySelectorAll(":not(:defined)")].map(t=>customElements.upgrade(t))}}animate(t,e,s){const i=r=>{t.removeEventListener("animationend",i),s?s():t.classList.remove(e)};t.addEventListener("animationend",i),t.classList.add(e)}onclick(t,e){i?t.onpointerup=e:t.onclick=e}showToast(t){let e=document.createElement("wc-toast");e.textContent=t,document.body.appendChild(e)}}},function(t,e,s){"use strict";s.d(e,"c",(function(){return i})),s.d(e,"e",(function(){return r})),s.d(e,"a",(function(){return n})),s.d(e,"b",(function(){return o})),s.d(e,"d",(function(){return d}));const i="\n    input {\n        --color-primary: #8899a9;\n        --color-primary-dark: #34495e;\n        font: inherit;\n        margin: 15px 0;\n        outline: none;\n        border: 3px solid;\n        border-color: #b9b9b9;\n        border-radius: 3px;\n        padding: 5px;\n        font-size: 1rem;\n        transition: border-color .2s;\n    }\n\n    input:focus {\n        animation: glow 1.5s infinite;\n    }\n        \n    @keyframes glow {\n        0% { border-color: var(--color-primary); }\n        50% { border-color: var(--color-primary-dark); }\n        100% { border-color: var(--color-primary); }\n    }\n",r='\n    <style>\n        #time-selector {\n            display: flex;\n        }\n\n        #time-selector > wc-button {\n            --button-font-size: 1rem;\n            --button-padding: 5px;\n        }\n\n        #time-selector > wc-button:nth-of-type(1) {\n            --button-radius: 35px 0 0 35px;\n        }\n\n        #time-selector > wc-button:nth-of-type(2) {\n            --button-radius: 0 35px 35px 0;\n        }\n    </style>\n\n    <div id="time-selector">\n        <wc-button type="solid">AM</wc-button>\n        <wc-button type="outline">PM</wc-button>\n    </div>\n',n="\n    .card {\n        background: white;\n        box-shadow: 0px 2px 50px 0px rgba(209, 202, 209, 1);\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n",a=t=>`${(t/1e3).toFixed(1)}s`,o=(t=5e3,e=3e3)=>`\n    .fade-in {\n        animation: fade-in ${a(t)};\n    }\n\n    .fade-out {\n        animation: fade-out ${a(e)};\n    }\n\n    @keyframes fade-in {\n        0% { opacity: 0; }\n        100% { opacity: 1; }\n    }\n\n    @keyframes fade-out {\n        0% { opacity: 1; }\n        100% { opacity: 0; }\n    }\n`,d=(t=10,e=10)=>`\n    @keyframes scale-in {\n        0% { \n            transform: perspective(100px) translateZ(${t}px);\n        }\n        100% { \n            transform: perspective(100px) translateZ(0px);\n        }\n    }\n\n    @keyframes scale-out {\n        0% { \n            transform: perspective(100px) translateZ(0px);\n        }\n        100% { \n            transform: perspective(100px) translateZ(${e}px);\n        }\n    }\n`},function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{static getInstance(){return this.instance||(this.instance=new this),this.instance}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var i=s(1),r=s(0);const n=r.b`
    <style>
        #root {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-items: center;
            align-items: center;
            height: 100%;
            width: 100%;
            overflow: hidden;
            z-index: 99;
            box-sizing: border-box;
            padding: 0 15px;
            background: rgba(0,0,0,.2);
            backdrop-filter: blur(2px);
            webkit-backdrop-filter: blur(2px);
        }

        #dialogue {
            background: white;
            border-radius: 5px;
            box-shadow: 0px 4px 4px rgba(0,0,0,.25);
            padding: 15px 20px;
            box-sizing: border-box;
            width: 100%;
            transform: perspective(100px) translateZ(0px);
        }

        ${Object(i.b)()}
        ${Object(i.d)()}

        div#root.show{
            animation: fade-in .5s;
        }

        div#root.hide  {
            animation: fade-out .3s forwards;
        }

        .show > #dialogue {
            pointer-events: none;
            animation: scale-in .5s;
        }
        
        .hide > #dialogue {
            animation: scale-out .3s forwards;
        }
        
    </style>

    <div id="root">
        <div id="dialogue"></div> 
    </div>
`,a=["root","dialogue"];class o extends r.a{constructor(){super(),this.isCancelleable=!0,this.render(this.shadowRoot,n,a);let t=this.views.root,e=this.views.dialogue;this.animate(t,"show",()=>{t.classList.remove("show"),this.onclick(t,t=>{this.isCancelleable&&this.close()}),this.onclick(e,t=>{t.stopPropagation()})})}close(){this.animate(this.views.root,"hide",()=>{this.remove()})}}},function(t,e,s){"use strict";const i={ranks:{LG:1,MG:2,BG:3,COL:4,SLTC:5,LTC:6,MAJ:7,CPT:8,LTA:9,"2LT":10,CWO:11,SWO:12,MWO:13,"1WO":14,"2WO":15,"3WO":16,DX:36,MSG:37,SSG:38,"1SG":39,"2SG":40,"3SG":41,CFC:42,CPL:43,LCP:44,PTE:45,REC:46},isValid(t){return t in this.ranks||t.toUpperCase().includes("DX")},rankToInt(t){if(t.toUpperCase().includes("DX")){let e=Number(t.substring(2));return this.ranks.DX-e}return this.ranks[t]}};e.a=i},function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(2);class r extends class{constructor(){this._listeners={}}stop(t,e){let s=this._listeners[t].findIndex(t=>t==e);s>=0&&this._listeners[t].splice(s,1)}emit(t,e){this._listeners[t]&&this._listeners[t].forEach(t=>{e?t(e):t()})}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}empty(){this._listeners={}}}{constructor(){super()}}r.getInstance=i.a.getInstance},function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var i=s(0);const r=i.b`
  <style>
    :host {
        --button-font-size: 1.3rem;
        --button-padding: 15px 10px;
        --button-radius: 5px;
    }

    :host([type="outline"]), :host([type="solid"]){
        --button-radius: 2px;
    }

    :host([type="solid"]) > button {
        border: 2px solid var(--color-primary);
    }

    :host([type="solid"]) button:active {
        border-color: var(--color-primary-dark);
        background: var(--color-primary-dark);
    }

    :host([type="outline"]) > button {
        background: white;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
    }
    
    :host([type="outline"]) button:active {
        background: rgb(199, 199, 199);
    }
    
    :host([type="plain"]) > button {
        --button-padding: 10px;
        --border-radius: 15px;
        color: var(--color-primary);
        box-shadow: none;
        background: transparent;
    }
    
    :host([type="plain"]) > button:active {
        background: rgba(0,0,0,.1);
    }
    
    button {
        font: inherit;
        font-size: var(--button-font-size);
        padding: var(--button-padding);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        border-radius: var(--button-radius);
        color: white;
        background: var(--color-primary);
        width: 100%;
        transition: all .2s;
        border: none;
        box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2), 0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
    }
    
    button:active {
        background: var(--color-primary-dark);
    }
  </style>
  
  <button id="button"><slot></slot></button>
`;class n extends i.a{constructor(){super(),this.render(this.shadowRoot,r,["button"]),super.onclick(this.views.button,t=>{this.dispatchEvent(new Event("onclick"))})}set onclick(t){this.addEventListener("onclick",e=>t(e))}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var i=s(1),r=s(0);const n=r.b`

    <style>
        #root {
            height: 100%;
            width: 100%;
        }
        #container {
            height: 100%;
            width: 100vw;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 100%;
            grid-template-areas: "content";
            align-items: center;
        }

        #container:empty + .loading {
            display: block;
        }

        #container > * {
            grid-area: content;
            justify-self: center;
        }

        .loading {
            display: none;
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            margin: -20px 0 0 -20px;
            background-color: #333;
            border-radius: 100%;
            animation: sk-scaleout 1.0s infinite ease-in-out;
        }
          
        @keyframes sk-scaleout {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1.0);
                opacity: 0;
            }
        }

        ${Object(i.b)(500,500)}
    </style>

    <div id="root">
        <div id="container"></div>
    </div>
`,a=["root","container"];class o extends r.a{constructor(){super(),this.render(this.shadowRoot,n,a),this.hasShownFirstScreen=!1}removeView(t){this.animate(t,"fade-out",()=>{t.remove()})}addView(t){if(this.hasShownFirstScreen)this.animate(t,"fade-in"),this.views.container.appendChild(t);else{this.hasShownFirstScreen=!0;let e=document.getElementById("splashscreen");this.animate(e,"fade-out",()=>{e.remove()});let s=document.createElement("div");s.className="loading",this.animate(t,"fade-in",()=>{t.classList.remove("fade-in"),this.views.root.appendChild(s)}),this.views.container.appendChild(t)}}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return l}));var i=s(1),r=s(9),n=s(0);const a=n.b`

    <style>
        ${i.a}

        #root {
            padding: 15px 30px;
        }

        .card {
            border-radius: 15px;
            flex-direction: column-reverse;
        }

        #header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 18px 0;
        }

        #header {
            color: #828282;
            text-transform: capitalize;
            font-weight: 500;
            margin: 0;
        }
    
        #sub-header {
            border-radius: 15px 15px 0 0;
            font-weight: 400;
        }

        #sub-header:only-child {
            border-radius: 15px;
        }

        .list-item {
            padding: 10px 15px;
            transition: .3s background;
            cursor: pointer;
        }

        .list-item:active {
            background: #F0F0F0;
        }

        .list-item:last-child {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .list-item > p {
            margin: 0;
        }

        .list-item #primary-text {
            text-transform: capitalize;
            color: #323232;
            font-weight: 500;
        }

        .list-item #primary-text.regular {
            counter-increment: regular present;
            color: var(--color-primary);
        }

        .list-item #secondary-text {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 400;
        }

        .list-item.flash {
            animation: flash 1s 2 none;
        }

        .list-item.shrink {
            animation: shrink .5s forwards;
        }

        .list-item.grow {
            animation: grow .5s forwards;
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

        @keyframes shrink {
            0% {
                max-height: 100px;
                padding: 10px 15px;
                opacity: 1;
            }
            100% {
                max-height: 0px;
                padding: 0 15px;
                opacity: 0;
            }
        }

        @keyframes grow {
            0% {
                max-height: 0px;
                padding: 0 15px;
                opacity: 0;
            }
            100% {
                max-height: 100px;
                padding: 10px 15px;
                opacity: 1;
            }
        }       

        #root.shrink-dep {
            animation: shrink-dep 1s forwards;
        }

        @keyframes shrink-dep {
            0% {
                max-height: 1000px;
                padding: 15px 30px;
                opacity: 1;
            }
            100% {
                max-height: 0;
                padding: 0px 30px;
                opacity: 0;
            }
        }

    </style>

    <div id="root">
        <div id="header-holder">
            <h3 id="header"></h3>
        </div>
        <div class="card">
            <div id="list"></div>
            <div id="sub-header"></div>
        </div>
    </div>
          
`,o=["list","header","sub-header","header-holder","root"],d=n.b`
    <div class="list-item">
        <p id="primary-text"></p>
        <p id="secondary-text"></p>
    </div>
`;class l extends n.a{constructor(){super(),this.render(this.shadowRoot,a,o),this.uidArray=[],this.items={}}getUser(t){return this.controller.getUser(t)}setController(t){this.controller=t}setDepartment(t){this.id=t.uid,this.departmentName=t.name,this.views.header.textContent=t.name}getUserReferenceNode(t){if(0==this.uidArray.length)return this.uidArray.push(t.uid),null;let e=this.uidArray.length-1,s=null;for(;e>=0;){let i=this.uidArray[e],n=this.getUser(i);if(!r.a.compareLinear(t,n))break;s=this.uidArray[e--]}return this.uidArray.splice(++e,0,t.uid),s?this.items[s].div:null}addUser(t,e=!0){let s=d.get().content.cloneNode(!0),i=s.querySelector(".list-item"),r=s.getElementById("primary-text"),n=s.getElementById("secondary-text");i.id=t.uid,this.items[t.uid]={div:i,primaryText:r,secondaryText:n},this.onclick(i,()=>{this.onUserSelected(t.uid)}),this.setListItemData(this.items[t.uid],t),e&&this.animate(i,"grow",()=>{i.classList.remove("grow")});let a=this.getUserReferenceNode(t);this.views.list.insertBefore(i,a)}setListItemData(t,e){t.primaryText.textContent=this.getItemPrimaryText(e),t.secondaryText.innerHTML=this.getItemSecondaryText(e),e.regular&&t.primaryText.classList.add("regular")}changeUser(t,e=!0){let s=this.getUser(t.uid).rank;s!==t.rank&&(this.removeUser(t,!1),this.addUser(t,!1));let i=this.items[t.uid];s===t.rank&&this.setListItemData(i,t),e&&!i.div.classList.contains("flash")&&this.animate(i.div,"flash",()=>{i.div.classList.remove("flash")})}removeUser(t,e=!0){let s=this.items[t.uid].div;s.id=`${t.uid}-deleted`;var i=this.uidArray.indexOf(t.uid);this.uidArray.splice(i,1),e&&!this.isRemoving?this.animate(s,"shrink",()=>{s.remove()}):s.remove()}shrink(){this.animate(this.views.root,"shrink-dep",()=>{this.remove()})}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s(4);class r{constructor(t,e,s,i,r,n){this.branchid=t,this.departmentid=e,this.name=s,this.rank=i,this.status=n,this.email=r}static createStatus(t,e,s){return{code:t,remarks:e,updatedby:s.uid,timestamp:firebase.firestore.FieldValue.serverTimestamp()}}static compare(t,e){let s=i.a.rankToInt(t.rank),r=i.a.rankToInt(e.rank);return s<r?-1:r<s?1:t.name<e.name?-1:e.name<t.name?1:0}static compareLinear(t,e){let s=i.a.rankToInt(t.rank),r=i.a.rankToInt(e.rank);return s<r||!(r<s)&&(t.name<e.name||(e.name,t.name,!1))}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var i=s(0);const r=i.b`
    <style>
        :host {
            width: inherit;
            height: inherit;
        }

        #float-button {
            position: fixed;
            --button-radius: 50px;
            --button-font-size: 1.1rem;
            bottom: 10px;
            left: 25%;
            right: 25%;
        }
        
        #root, #content {
          height: 100%;
          width: 100%;
          position: relative;
        }
        
        #list {
            overflow-x: hidden;
            overflow-y: scroll;
            height: 100%;
            width: 100%;
            padding-bottom: 70px;
            padding-top: 10px;
            box-sizing: border-box;
        }

        #list::-webkit-scrollbar {
            display: none;
          }
        
        #empty {
          position: absolute;
          top: 40%;
          text-align: center;
          width: 100%;
          color: #34495e;
          display: none;
        }
        
        #list:empty + #empty {
          display: block;
        }
        
        #welcome-text {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-weight: 500;
            color: var(--color-primary-dark);
            font-size: 1.1rem;
            z-index: 95;
            margin: 0;
            padding: 10px;
            cursor: pointer;
            background: #faf5fab8;
            box-shadow: none;
            transition: all .5s;
            backdrop-filter: blur(2px);
          }
          #welcome-text.elevation {
            box-shadow: 0px 1px 2px 1px #928d8d4f;
          }
          
    </style>
    
    <div id="root">
          <div id="content">
            <div id="list"></div>
            <p id="empty">Loading...</p>
            <wc-button id="float-button"></wc-button>
            <h5 id="welcome-text"></h5>
          </div>
    </div>

`,n=["root","list","empty","float-button","welcome-text","content"];class a extends i.a{constructor(){super(),this.render(this.shadowRoot,r,n),this.views.departments={},this.views["float-button"].onclick=this.onFloatButtonClick.bind(this),this.views.list.onscroll=t=>{this.views.list.scrollTop>0?this.views["welcome-text"].classList.add("elevation"):this.views["welcome-text"].classList.remove("elevation")},this.views["welcome-text"].onclick=t=>{let e=document.createElement("sign-out");document.body.appendChild(e)}}setWelcomeText(t){this.views["welcome-text"].textContent=`Hi, ${t}!`}setController(t){this.controller=t}getDepartmentCard(t){return this.views.departments[t]}addDepartment(t){let e=t.uid;if(!this.views.departments[e]){let s=this.createDepartmentCard();this.views.departments[e]=s,s.setDepartment(t),s.setController(this.controller),this.views.list.appendChild(s)}}modifyDepartment(t){this.views.departments[t.uid].setDepartment(t)}removeDepartment(t){this.views.departments[t].shrink(),delete this.views.departments[t]}showEmpty(){this.views.empty.textContent="No departments found"}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var i=s(0);const r=i.b`
    <style>
        #root {
            position: absolute;
            background: var(--color-primary);
            z-index: 99;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: center;
            text-align: center;
            bottom: 10px;
            left: 10px;
            right: 10px;
            font-size: 1rem;
            border-radius: 3px;
            white-space: pre-line;
            font-weight: 600;
            box-shadow: 0 0 4px 1px rgba(60, 58, 60, 0.46);
        }

        .slide-up {
            animation: 5s slide-up forwards;
        }

        @keyframes slide-up {
            0% {
                transform: translateY(100%) translateY(10px);
            }
            10% {
                transform: translateY(0px);
            }

            90% {
                transform: translateY(0px);
            }

            100% {
                transform: translateY(100%) translateY(10px);
            }
        }
    </style>

    <div id="root"><slot></slot></div>
`;class n extends i.a{constructor(){super(),this.render(this.shadowRoot,r,["root"]),this.animate(this.views.root,"slide-up",t=>{this.remove()})}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var i=s(3);const r=s(0).b`
  <style>
    
    h4 {
      width: 100%;
      color: #313131;
      margin-top: 15px;
    }
    #confirm{
      --button-font-size: 1rem;
      --button-padding: 10px;
      --button-radius: 3px;
    }
  </style>
  
  <div>
    <h4>Are you sure you want sign out?</h4>
    <wc-button type="solid" id="confirm">Yes. I'm positive.</wc-button>
  </div>
`;class n extends i.a{constructor(){super();let t=this.views;this.render(t.dialogue,r,["confirm"]),this.onclick(t.confirm,t=>{ApplicationContext.getAuth().logout(),this.close()})}}},function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var i=s(9),r=s(2);class n extends r.a{constructor(){super(),this.viewSwitcher=document.querySelector("view-switcher"),this.branchRepository=ApplicationContext.getBranchRepository(),this.subscribeUserEvent=this.subscribeUserEvent.bind(this),this.subscribeDepartmentEvent=this.subscribeDepartmentEvent.bind(this),this.users={}}activate(){this.mainView=this.createMainView(),this.mainView.setController(this),this.branchRepository.on("user-event",this.subscribeUserEvent),this.branchRepository.on("department-event",this.subscribeDepartmentEvent)}deactivate(){this.users={},this.viewSwitcher.removeView(this.mainView),this.mainView=null,this.branchRepository.stop("user-event",this.subscribeUserEvent),this.branchRepository.stop("department-event",this.subscribeDepartmentEvent),this.branchRepository.unsubscribe()}getUser(t){return this.users[t]}onUserEvent(t,e){}subscribeUserEvent(t){let e=t.type,s=t.user;if("found"==e){t.users.sort(i.a.compare);for(let e of t.users){this.mainView.getDepartmentCard(e.departmentid).addUser(e,!1),this.onUserEvent("added",e),this.users[e.uid]=e}return void this.viewSwitcher.addView(this.mainView)}let r=this.mainView.getDepartmentCard(s.departmentid);"added"==e&&(r.addUser(s),this.onUserEvent(e,s),this.users[s.uid]=s),"modified"==e&&(r.changeUser(s),this.onUserEvent(e,s),this.users[s.uid]=s),"removed"==e&&(r.removeUser(s),this.onUserEvent(e,s),delete this.users[s.uid])}subscribeDepartmentEvent(t){let e=t.type,s=t.department;if("found"==e)for(let e of t.departments)this.mainView.addDepartment(e);"added"==e&&this.mainView.addDepartment(s),"modified"==e&&this.mainView.modifyDepartment(s),"removed"==e&&this.mainView.removeDepartment(s.uid),"empty"==e&&this.mainView.showEmpty()}}},function(t,e,s){"use strict";s.r(e);var i=s(5);const r=(t,e,s,i,r,n)=>({branchid:t,departmentid:e,email:s,name:i,rank:r,regular:n,status:{am:{code:0,remarks:"",timestamp:new Date,updatedby:"Admin"},pm:{code:0,remarks:"",timestamp:new Date,updatedby:"Admin"}}}),n=(t,e)=>({uid:t,name:e});var a={departments:[n(1,"Manpower Branch"),n(2,"Finance Department"),n(3,"Signal Wing"),n(4,"Logistics")],users:[r(1,1,"sean@test.com","Sean","LCP",!1),r(1,1,"john@test.com","John","PTE",!1),r(1,1,"albert@test.com","Albert","MAJ",!1),r(1,3,"jim@test.com","Jim","LTC",!1),r(1,3,"billy@test.com","Billy","CFC",!1),r(1,3,"paul@test.com","Paul","CPL",!1),r(1,4,"bob@test.com","Bob","BG",!1),r(1,4,"mike@test.com","Mike","CPL",!1),r(1,4,"harry@test.com","Harry","REC",!1)]};class o extends i.a{constructor(){super(),this.isSignedIn=!1}init(){var t=localStorage.getItem("user");t&&(this.isSignedIn=!0),this.isSignedIn?this.emit("signed-in",JSON.parse(t)):this.emit("signed-out")}async getUserToken(){return await firebase.auth().currentUser.getIdTokenResult()}login(t,e){let s,i="admin"===t.split("@")[0];i?s={isAdmin:i,email:"admin@test.com",uid:1}:(s=a.users[5],s.uid="user-5"),localStorage.setItem("user",JSON.stringify(s)),this.isSignedIn||(this.isSignedIn=!0,this.emit("signed-in",s))}logout(){this.isSignedIn=!1,localStorage.clear(),this.emit("signed-out")}}o.instance=null;class d extends i.a{constructor(){super(),this.uniqueId=0,this.depCount=1,this.users={},this.departments={},a.departments.forEach(t=>{this.depCount++,this.departments[t.uid]=t});let t=a.users;this.changeDate(t[1]),this.changeDate(t[2]),this.changeDate(t[3]),t.forEach(t=>{let e=this.toUser(t);this.users[e.uid]=e})}getUserByEmail(t){for(let e of Object.values(this.users))if(e.email===t)return e;return null}addDepartment(t){this.departments[this.depCount]={uid:this.depCount,name:t},this.emit("department-event",{type:"added",department:this.cloneDepartment(this.departments[this.depCount++])})}updateDepartment(t,e){this.departments[t].name=e,this.emit("department-event",{type:"modified",department:this.cloneDepartment(this.departments[t])})}async deleteDepartment(t){for(let[e,s]of Object.entries(this.users))s.departmentid==t&&(await new Promise(t=>setTimeout(t,500)),this.emit("user-event",{type:"removed",user:s}),delete this.users[e]);this.emit("department-event",{type:"removed",department:{uid:t}}),delete this.departments[t],0===Object.keys(this.departments).length&&this.emit("department-event",{type:"empty"})}async createUser(t){await new Promise(t=>setTimeout(t,1e3));let{emailPrefix:e,name:s,rank:i,departmentid:n,regular:a}=t,o=this.toUser(r(1,n,`${e}@test.com`,s,i,a));this.users[o.uid]=o,this.emit("user-event",{type:"added",user:this.cloneUser(o)})}async updateUser(t){await new Promise(t=>setTimeout(t,1e3));let{uid:e,emailPrefix:s,name:i,rank:r,departmentid:n,regular:a}=t,o=this.users[e];o.email=`${s}@test.com`,o.name=i,o.rank=r,o.departmentid=n,o.regular=a,o.fullname=o.rank+" "+o.name,this.emit("user-event",{type:"modified",user:this.cloneUser(this.users[e])})}async deleteUser(t){await new Promise(t=>setTimeout(t,1e3)),this.emit("user-event",{type:"removed",user:this.users[t]}),delete this.users[t]}async updateUserStatus(t,e,s,i){await new Promise(t=>setTimeout(t,1e3));let r=this.users[s],n=t?"am":"pm";r.status[n]={...e},r.status[n].updatedby=this.users[s].fullname,r.status[n].expired=!1,this.emit("user-event",{type:"modified",user:this.cloneUser(r)})}cloneUser(t){let e=JSON.parse(JSON.stringify(t));return e.status.am.timestamp=new Date(e.status.am.timestamp),e.status.pm.timestamp=new Date(e.status.pm.timestamp),e}cloneDepartment(t){return JSON.parse(JSON.stringify(t))}checkSameDay(t){let e=new Date,s=t.getDate()-e.getDate(),i=0===s&&t.getHours()<17&&e.getHours()<17,r=0===s&&t.getHours()>17&&e.getHours()>17,n=-1===s&&t.getHours()>17&&e.getHours()<17;return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&(i||r||n)}toUser(t){let e=t.status.am.timestamp,s=t.status.pm.timestamp,i=!1,r=!1;return e&&s&&(i=!this.checkSameDay(e),r=!this.checkSameDay(s)),t.status.am.expired=i,t.status.pm.expired=r,{uid:`user-${this.uniqueId++}`,fullname:t.rank+" "+t.name,...t}}changeDate(t){t.status.am.timestamp=new Date("May 17, 2020 21:15:00"),t.status.pm.timestamp=new Date("May 17, 2020 21:15:00")}async subscribe(t){await new Promise(t=>setTimeout(t,1500));let e=Object.values(this.users).map(t=>this.cloneUser(t)),s=Object.values(this.departments).map(t=>this.cloneDepartment(t));this.emit("department-event",{type:"found",departments:s}),this.emit("user-event",{type:"found",users:e})}unsubscribe(){}}d.instance=null;var l=s(6),c=s(7),h=s(1),u=s(0);const m=u.b`
    <style>
        :host {
            width: 70%;
        }

        ${h.c}

        ${h.a}

        #email {
            margin-bottom: 0px;
        }

        h3 {
            margin: 15px 0 10px;
        }

        .card {
            border-radius: 5px;
            padding: 10px 20px;
        }

        #login {
            --button-font-size: 1rem;
            --button-padding: 7px;
        }

        #error {
            max-height: 0px;
            opacity: 0;
            transition: .5s all;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 0.8rem;
        }

        #error.show {
            max-height: 100px;
            opacity: 1;
        }

    </style>

    <div class="card">
        <h3>Sign in</h3>

        <input id="email" type="email" placeholder="Email" autocomplete="off" required>

        <input id="password" type="password" minlength="8" placeholder="Password" autocomplete="off" required>

        <wc-button id="login">Continue</wc-button>

        <p id="error"></p>
    </div>
`,p=["error","email","password","login"];class g extends u.a{constructor(){super(),this.render(this.shadowRoot,m,p),this.views.email.onclick=t=>{this.hideError()},this.views.password.onclick=t=>{this.hideError()}}onSignIn(t){this.views.login.onclick=e=>{let s=!!this.views.email.validity.valid&&this.views.email.value,i=!!this.views.password.validity.valid&&this.views.password.value;if(s)if(i){if(this.isLoading)return;this.isLoading=!1,this.views.login.textContent="Loading...",t(s,i)}else this.showError("Please enter a valid password!");else this.showError("Please enter a valid email!")}}reset(){this.views.login.textContent="Continue",this.views.password.value="",this.isLoading=!1}showError(t){this.views.error.textContent=t,this.views.error.classList.add("show")}hideError(){this.views.error.classList.remove("show")}}var v=s(2);class w extends v.a{constructor(){super(),this.auth=ApplicationContext.getAuth(),this.viewSwitcher=document.querySelector("view-switcher"),this.onError=this.onError.bind(this)}activate(){this.loginView=new g,this.loginView.onSignIn((t,e)=>{this.auth.login(t,e)}),this.auth.on("error",this.onError),this.viewSwitcher.addView(this.loginView)}deactivate(){this.auth.stop("error",this.onError),this.viewSwitcher.removeView(this.loginView),this.loginView=null}onError(t){this.loginView.reset(),this.loginView.showError(t)}}w.instance=null;const f=(t,e)=>{customElements.get(t)||customElements.define(t,e)};var y=()=>{f("wc-button",l.a),f("view-switcher",c.a),f("login-view",g);const t=()=>w.getInstance();return{activate:e=>t().activate(e),deactivate:()=>t().deactivate()}},b=s(10);const x=["NOT SET","PRESENT","RSO/RSI","MC/MA","OIL/LEAVE","AO/OA","OOC/OTHERS"];var k=[{name:"NOT SET",fullName:"NOT SET",category:0},{name:"PRESENT",fullName:"PRESENT",category:1},{name:"RSO",fullName:"RSO",category:2},{name:"RSI",fullName:"RSI",category:2},{name:"MC",fullName:"MC",category:3},{name:"MA",fullName:"MA",category:3},{name:"OIL",fullName:"OFF IN LIEU",category:4},{name:"AL",fullName:"ANNUAL LEAVE",category:4},{name:"UL",fullName:"URGENT LEAVE",category:4},{name:"OL",fullName:"OVERSEAS LEAVE",category:4},{name:"CL",fullName:"COMPASSIONATE LEAVE",category:4},{name:"PL",fullName:"PATERNITY LEAVE",category:4},{name:"PCL",fullName:"PARENT CARE LEAVE",category:4},{name:"CCL",fullName:"CHILD CARE LEAVE",category:4},{name:"AO",fullName:"ATTACHED OUT",category:5},{name:"OA",fullName:"OVERSEAS ATTACHMENT",category:5},{name:"OOC",fullName:"OUT OF CAMP",category:6},{name:"OTHERS",fullName:"OTHERS",category:6}];const S=u.b`

    <style>
        #root {
            max-height: 99.9%;
            overflow-y: auto;
            box-sizing: border-box;
            padding-bottom: 70px;
            padding-top: 50px;
        }

        #root > .list {
            padding: 0 30px 30px 30px;
        }
    
        .category > #header {
            margin-bottom: 0;
            margin-top: 50px;
            font-weight: 500;
        }

        .category:first-child #header {
            margin: 0;
        }
        
        #strength {
            position: fixed;
            width: 100%;
            top: 0;
            text-align: center;
            padding: 10px 0;
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-primary);
            background: #faf5fab8;
            transition: all .5s;
            backdrop-filter: blur(2px);
            box-shadow: none;
        }
        #strength.elevate {
            box-shadow: 0px 1px 2px 1px #928d8d4f;
        }
        #list > * {
            padding: 5px 30px;
        }
    </style>

    <div id="root">
        <div id="strength"></div>
        <div id="list"></div>
    </div>

`,C=u.b`
    <div class="category">
        <h2 id="header"></h2>
        <div id="cards"></div>
    </div>
`,E=["root","strength","list"];class D extends u.a{constructor(){super(),this.render(this.shadowRoot,S,E),this.timeOfDay=this.id,this.strengthCount={total:0,present:0,current:0},this.views.categories=[],this.views.root.onscroll=t=>{this.views.root.scrollTop>0?this.views.strength.classList.add("elevate"):this.views.strength.classList.remove("elevate")}}setController(t){this.controller=t}createCategory(t){let e=C.get().content.cloneNode(!0),s=e.querySelector(".category"),i=e.getElementById("header"),r=e.getElementById("cards");this.views.categories[t]={div:s,header:i,list:r,count:0,cards:{}},0==t||1==t?this.views.list.prepend(e):this.views.list.appendChild(e)}addUser(t){let e=t.status[this.timeOfDay],s=e.code,i=k[s].category;this.views.categories[i]||this.createCategory(i);let r=this.views.categories[i];if(!r.cards[s]){let t=document.createElement("summary-card");t.setController(this.controller),t.setStatusName(k[s].fullName),t.timeOfDay=this.timeOfDay,r.cards[s]=t,r.list.appendChild(t)}r.cards[s].addUser(t),r.count++,r.header.textContent=`${x[i]} - ${r.count}`,this.strengthCount.total++,1==e.code&&(this.strengthCount.present++,t.regular||0!=e.remarks.length||this.strengthCount.current++),this.updateStrengthCount()}changeUser(t,e){let s=t.status[this.timeOfDay].code,i=k[s].category;this.views.categories[i].cards[s].changeUser(t),t.regular||1!=s||(this.strengthCount.current+=e,this.updateStrengthCount())}removeUser(t){let e=t.status[this.timeOfDay].code,s=k[e].category,i=this.views.categories[s],r=i.cards[e];r.removeUser(t),i.count--,i.header.textContent=`${x[s]} - ${i.count}`,0==r.uidArray.length&&(r.remove(),delete i.cards[e]),0==i.count&&(i.div.remove(),delete this.views.categories[s]),this.strengthCount.total--,1==e&&(this.strengthCount.present--,t.regular||0!=t.status[this.timeOfDay].remarks.length||this.strengthCount.current--),this.updateStrengthCount()}updateStrengthCount(){let t=this.strengthCount,e=`Strength: ${t.total} ~ Present: ${t.present}  Fall-in: ${t.current}`;this.views.strength.textContent=e}}const U=u.b`

    <style>
        #root {
            height: 100%;
            width: 100%;
            position: relative;
            background: #FAF5FA;
            top: 0;
            z-index: 97;
        }

        #close {
            position: absolute;
            bottom: 10px;
            left: 10px;
            --button-font-size: 1rem;
            --button-padding: 7px 15px;
            --button-radius: 35px;
            transform: translateY(150%);
            transition: .3s;
        }

        #export {
            position: absolute;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%) translateY(150%);
            --button-padding: 15px;
            --button-radius: 35px;
            transition: .3s .1s;
        }

        .show > #export {
            transition: .5s .7s;
            transform: translateX(-45%) translateY(0px);
        }
        .show > #close {
            transition: .5s .6s;
            transform: translateY(0px);
        }
        
    </style>

    <div id="root">
        <summary-view id="am"></summary-view>
        <summary-view id="pm"></summary-view>
        <wc-button id="close">X</wc-button>
        <wc-button id="export">Download file</wc-button>
    </div>

`,A=["root","close","export","am","pm"];class T extends u.a{constructor(){super(),this.currentTime="am",this.render(this.shadowRoot,U,A),this.views.export.onclick=()=>{this.prepareDownload()},this.loading=document.createElement("div"),this.loading.id="export-loading",this.loading.innerHTML="Using advanced AI algorithms coupled with state-of-the-art data analytics system assembled by world-renowned programmers, to construct and produce a freshly baked spreadsheet for our unit.",this.setTimeOfDay("am")}show(){this.views.root.classList.add("show")}hide(){this.views.root.classList.remove("show")}setController(t){this.controller=t,this.views.am.setController(t),this.views.pm.setController(t)}setTimeOfDay(t){this.currentTime=t?"am":"pm",this.hiddenTime=t?"pm":"am",this.views[this.currentTime].removeAttribute("hidden"),this.views[this.hiddenTime].setAttribute("hidden","")}addUser(t){this.views.am.addUser(t),this.views.pm.addUser(t)}changeUser(t){const e=e=>{let s=this.controller.getUser(t.uid),i=t.status[e],r=s.status[e];if(r.code!=i.code)this.views[e].removeUser(s),this.views[e].addUser(t);else{let s=r.remarks.length,n=i.remarks.length,a=0;0==s&&n>0&&(a=-1),s>0&&0==n&&(a=1),this.views[e].changeUser(t,a)}};e("am"),e("pm")}removeUser(t){this.views.am.removeUser(t),this.views.pm.removeUser(t)}loadXlsxLibrary(){return new Promise(t=>{if(this.xlsxLibraryLoaded)t();else{this.xlsxLibraryLoaded=!0;let e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/xlsx-populate@1.19.1/browser/xlsx-populate.min.js",e.onload=function(){t()},document.head.appendChild(e)}})}prepareDownload(){this.isExporting||(this.isExporting=!0,this.animate(this.loading,"fade-in",async()=>{this.loading.classList.remove("fade-in"),await this.loadXlsxLibrary(),setTimeout(()=>{this.animate(this.loading,"fade-out",()=>{this.loading.remove(),this.loading.classList.remove("fade-out"),this.isExporting=!1})},3e3),this.downloadSpreadsheet()}),document.body.appendChild(this.loading))}async downloadSpreadsheet(){let t=[],e=0,s=0,i=0;const r=t=>this.controller.getUser(t),n=e=>t.push(e);let a=(()=>{let t=new Date,e=t.getMonth()+1;return`${String(t.getDate()).padStart(2,"0")}/${e}/${t.getFullYear()}`})(),o=this.views[this.currentTime].strengthCount;n(["SBW PLC Strength","","",""]),n([]),n(["Date",a]),n(["Total Strength",`${o.present}/${o.total}`]),this.views[this.currentTime].views.categories.forEach((a,o)=>{if(a.count>0)for(let[o,d]of Object.entries(a.cards)){if(d.uidArray.length>0){t.push([]);let a=t.length;for(let t of d.uidArray){let a=r(t),d=a.rank+" "+a.name.toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.substring(1)).join(" ");d.length>s&&(s=d.length);let l=["",++e,d];if(17==o||4==o){let t=a.status[this.currentTime].remarks;t.length>i&&(i=t.length),l.push(t.toUpperCase())}n(l)}t[a][0]=`*${k[o].fullName}*`}}});let d=await XlsxPopulate.fromBlankAsync();d.sheet(0).name("Attendance sheet"),d.sheet(0).column("A").style({bold:!0,italic:!0}),d.sheet(0).column("A").width(21),d.sheet(0).column("B").width(10),d.sheet(0).column("C").width(s+5),d.sheet(0).column("D").width(i+5),d.sheet(0).cell("A1").value(t);let l=await d.outputAsync(),c=`SBW PARADE STATE ${a}.xlsx`,h=window.URL.createObjectURL(l),u=document.createElement("a");u.href=h,u.download=c,document.body.appendChild(u),u.click(),u.remove(),await new Promise(t=>setTimeout(t,500)),window.URL.revokeObjectURL(h)}}const O=u.b`
    <style>
        #time-selector {
            position: fixed;
            z-index: 98;
            right: 10px;
            bottom: 10px;
        }
        
        #float-button {
            left: 15%;
            right: 35%;
        }
        #root {
            width: 200vw;
            display: flex;
            transition: margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
            margin-left: 0;
            background: #FAF5FA;
        }
        #root.open {
            margin-left: -100vw;
        }
        #content {
            width: 50%;
        }
        
        #float-button {
            position: absolute;
        }
        summary-screen {
            width: 50%;
        }
    </style>
    ${h.e}
`,L=["time-selector"];class R extends b.a{constructor(){super(),this.render(this.views.root,O,L),this.views["float-button"].textContent="View summary",this.views.timeSelectors=this.views["time-selector"].querySelectorAll("wc-button"),this.views.timeSelectors.forEach((t,e)=>t.onclick=t=>this.toggleTime(0==e)),this.isMorning=!0,this.views.summary=new T,this.views.root.appendChild(this.views.summary),this.views.summary.views.close.onclick=this.closeSummaryScreen.bind(this)}connectedCallback(){let t=(new Date).getHours()<12;this.toggleTime(t)}setController(t){super.setController(t),this.views.summary.setController(t)}toggleTime(t){if(this.isMorning===t)return;this.isMorning=t,this.views.summary.setTimeOfDay(t);let e=t?"solid":"outline",s=t?"outline":"solid";this.views.timeSelectors[0].setAttribute("type",e),this.views.timeSelectors[1].setAttribute("type",s);for(let e of Object.values(this.views.departments))e.setTimeOfDay(t)}createDepartmentCard(){return document.createElement("user-department-card")}onFloatButtonClick(){this.views.root.classList.add("open"),this.views.summary.show()}closeSummaryScreen(){this.views.summary.hide(),this.views.root.classList.remove("open")}}var P=s(8);const I=u.b`
    <style>
        #sub-header {
            padding: 10px;
            text-align: center;
            font-weight: 300;
            background: #33475a;
            font-size: 0.9rem;
            color: white;
        }
        #secondary-text {
            white-space: pre-line;
            font-size: 0.7rem;
            margin-top: 3px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        #secondary-text > span {
            color: var(--color-primary);
            font-weight: 500;
            text-transform: capitalize;
        }
        .card {
            counter-reset: am-total am-reg am-nsf pm-total pm-reg pm-nsf;
        }
        .am > #sub-header::before {
            content: counter(am-total) " Total ~ " counter(am-reg) " Regular + " counter(am-nsf) " Nsf";
        }
        .pm > #sub-header::before {
            content: counter(pm-total) " Total ~ " counter(pm-reg) " Regular + " counter(pm-nsf) " Nsf";
        }
        .am > #list > .list-item[am-reg] {
            counter-increment: am-total am-reg;
        }
        .am > #list > .list-item[am-nsf] {
            counter-increment: am-total am-nsf;
        }
        .pm > #list > .list-item[pm-reg] {
            counter-increment: pm-total pm-reg;
        }
        .pm > #list > .list-item[pm-nsf] {
            counter-increment: pm-total pm-nsf;
        }
    </style>
`;class N extends P.a{constructor(){super(),this.render(this.shadowRoot,I),this.isEditable=!1,this.dialogue={isopen:!1,uid:null,view:null},this.timeOfDay="am",this.views.card=this.shadowRoot.querySelector(".card"),this.views.card.classList.add("am")}getItemPrimaryText(t){return t.fullname}getItemSecondaryText(t){let e=t.status,s=this.getStatus(e.am,"AM"),i=this.getStatus(e.pm,"PM");return e.am.expired&&(s+=" <span>-- Expired</span>"),e.pm.expired&&(i+=" <span>-- Expired</span>"),s+"\n"+i}getStatus(t,e){let s=t.remarks.length>0,i=`${e}: ${k[t.code].name}`;return s?`${i} (${t.remarks})`:i}updateDialogue(t){let e=this.getUser(t.status.am.updatedby),s=this.getUser(t.status.pm.updatedby),i=e?e.fullname:"admin",r=s?s.fullname:"admin";this.dialogue.view.setUser(t,i,r)}onUserSelected(t){let e,s=this.getUser(t);this.isEditable?(e=document.createElement("edit-status"),e.timeOfDay=this.timeOfDay,e.setController(this.controller)):e=document.createElement("status-details"),e.ondismiss=()=>{this.dialogue.isopen=!1,this.dialogue.uid=null,this.dialogue.view=null},this.dialogue.isopen=!0,this.dialogue.uid=t,this.dialogue.view=e,this.updateDialogue(s),document.body.appendChild(e)}setTimeOfDay(t){let e=t?"am":"pm";this.views.card.classList.replace(this.timeOfDay,e),this.timeOfDay=e}setListItemData(t,e){super.setListItemData(t,e);const s=(s,i)=>{let r=e.regular?`${s}-reg`:`${s}-nsf`;1===i?t.div.setAttribute(r,""):t.div.removeAttribute(r)};s("am",e.status.am.code),s("pm",e.status.pm.code)}changeUser(t,e=!0){super.changeUser(t,e),this.dialogue.isopen&&this.dialogue.uid==t.uid&&t.status.am.timestamp&&t.status.pm.timestamp&&this.updateDialogue(t)}}var V=s(3);const $=u.b`
  <style>
    .container {
        position: relative;
    }
    #status-chooser {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    #status-chooser > wc-button {
        margin-right: 10px;
        margin-bottom: 10px;
        --button-font-size: 0.9rem;
        --button-padding: 7px;
        --button-radius: 5px;
    }
    .remarks {
        margin-bottom: 25px;
    }
    .remarks > p {
        margin: 5px 0;
    }
    input {
        padding: 5px;
        border: 1px solid grey;
        transition: all .3s .3s;
        outline:none;
        font: inherit;
        text-transform: uppercase;
    }
    input:focus {
        outline: none;
        border: 1px solid #FF3838;
    }
    .header {
        display: flex;
        align-items: center;
    }

    .header > h4 {
        flex-grow: 1;
    }

    #save {
        --button-font-size: 1rem;
        --button-padding: 15px;
    }

    #comment {
        margin-top: 10px;
        font-size: 0.6rem;
        white-space: pre-line;
        text-align: center;
    }

    .expired {
        text-align: center;
        font-weight: 900;
        color: var(--color-primary);
        max-height: 0;
        opacity: 0;
        transition: .5s all;
    }

    :host([expired="true"]) .expired {
        max-height: 100px;
        opacity: 1;
    }

  </style>
  
  <div class="container">
      <div class="expired">[Expired] - Please verify again</div>
      <div class="header">
        <h4 id="name"></h4>
        ${h.e}
      </div>
      
      <div id="status-chooser"></div>
      
      <div class="remarks">
        <p>Remarks</p>
        <input id="remarks-input" maxlength="20" type="text" placeholder="${"Event, work, pooping etc."}">
      </div>

      <wc-button id="save">Verify</wc-button>
      <div id="comment"></div>
  </div>
  
`,M=["remarks-input","status-chooser","comment","name","save","time-selector"];class z extends V.a{constructor(){super(),this.timeOfDay="am",this.status={am:{},pm:{}},this.views.statusChooser=[],this.isProcessing=!1,this.render(this.views.dialogue,$,M),this.views.save.onclick=this.verify.bind(this),this.views["remarks-input"].onblur=t=>{this.saveRemarks()},this.views.timeSelectors=this.views["time-selector"].querySelectorAll("wc-button"),this.views.timeSelectors.forEach((t,e)=>t.onclick=t=>this.toggleTime(0==e)),this.populateStatusChooser()}close(){this.ondismiss(),super.close()}setController(t){this.controller=t}toggleTime(t){this.saveRemarks(),this.timeOfDay=t?"am":"pm";let e=t?"solid":"outline",s=t?"outline":"solid",{code:i,remarks:r,updater:n,date:a,expired:o}=this.status[this.timeOfDay];this.views["remarks-input"].value=r,this.views.comment.textContent=`Last verified by ${n}\non ${a}`,this.views.timeSelectors[0].setAttribute("type",e),this.views.timeSelectors[1].setAttribute("type",s),this.setStatus(i),this.setAttribute("expired",o)}saveRemarks(){this.status[this.timeOfDay].remarks=this.views["remarks-input"].value}verify(t){if(this.isProcessing)return;this.isProcessing=!0,this.views.save.textContent="Processing...";let e=this.status[this.timeOfDay].code,s=this.views["remarks-input"].value.trim();this.controller.updateUserStatus("am"==this.timeOfDay,e,s,this.user.uid)}setStatus(t){this.views.prevButton&&this.views.prevButton.setAttribute("type","outline"),this.views.statusChooser[t].setAttribute("type","solid"),this.views.prevButton=this.views.statusChooser[t],this.status[this.timeOfDay].code=t}populateStatusChooser(){k.forEach((t,e)=>{let s=document.createElement("wc-button");s.setAttribute("type","outline"),s.textContent=t.name,s.onclick=t=>{this.status[this.timeOfDay].code!==e&&(this.setStatus(e),this.views["remarks-input"].value="")},this.views["status-chooser"].appendChild(s),this.views.statusChooser.push(s)})}setUser(t,e,s){this.isProcessing=!0,this.user=t,this.compareStatusDate("am",e),this.compareStatusDate("pm",s),this.toggleTime("am"==this.timeOfDay),this.views.name.textContent=t.fullname,this.views.save.textContent="Verify",this.isProcessing=!1}compareStatusDate(t,e){let s=this.user.status[t],i=s.timestamp,r=this.status[t].date;if(!r||r.getTime()!=i.getTime()){let r={code:Number(s.code),remarks:s.remarks,expired:s.expired,date:i,updater:e};this.status[t]=r,this.timeOfDay==t&&(this.views["remarks-input"].value=this.status[t].remarks)}}updateAfternoonStatus(){this.pmStatus=this.user.status.pm.code,this.pmRemarks=this.user.status.pm.remarks,this.pmDate=this.user.status.pm.timestamp}}const j=u.b`

    <style>
        .container {

        }

        .name {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: capitalize;
            color: #2b2929;
            margin-bottom: 10px;
        }

        .status {
            text-align: center;
            margin-bottom: 10px;
            white-space: pre-line;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #823333;
            font-weight: 900;
        }

        .updatedby {
            text-align: center;
            font-size: .6rem;
            white-space: pre-line;
        }

        .remarks {
            text-align: center;
            margin-bottom: 10px;
            text-transform: uppercase;
            font-weight: 700;
            color: #9C27B0;
            font-size: 0.9rem;
        }

        .status > span {
            color: var(--color-primary);
            text-transform: capitalize;
        }

        .seperator {
            margin: 20px;
            height: 1px;
            border-bottom: 3px dashed var(--color-primary);
        }
    </style>

    <div class="container">
        <div class="name"></div>

        <div class="status"></div>
        <div class="remarks"></div>
        <div class="updatedby"></div>

        <div class="seperator"></div>

        <div class="status"></div>
        <div class="remarks"></div>
        <div class="updatedby"></div>
    </div>  
`;class B extends V.a{constructor(){super();let t=this.views;this.render(t.dialogue,j),this.name=this.shadowRoot.querySelector(".name"),this.status=this.shadowRoot.querySelectorAll(".status"),this.updatedby=this.shadowRoot.querySelectorAll(".updatedby"),this.remarks=this.shadowRoot.querySelectorAll(".remarks")}setUser(t,e,s){this.name.textContent=t.fullname+" Status",this.setInfo(t.status.am,0,"am",e),this.setInfo(t.status.pm,1,"pm",s)}setInfo(t,e,s,i){let r=t.timestamp,n=t.remarks.length>0,a=`${s}: ${k[t.code].fullName}`;t.expired&&(a=" <span>[Expired]</span>\n"+a),this.status[e].innerHTML=a,this.remarks[e].textContent=n?"Remarks: "+t.remarks:"",this.updatedby[e].textContent=`Last verified by ${i}\non ${r}`}}const F=u.b`
    <style>
        #sub-header {
            padding: 10px;
            text-align: center;
            background: #33475a;
            font-size: 0.9rem;
            color: white;
        }
        #secondary-text {
            text-transform: lowercase;
        }
        #secondary-text > .remarks {
            text-transform: uppercase;
        }
        #secondary-text > .expired {
            color: var(--color-primary);
            font-weight: 700;
            text-transform: capitalize;
        }
        .card {
            counter-reset: total reg nsf;
        }
        #sub-header::before {
            content: counter(total) " Total ~ " counter(reg) " Regular + " counter(nsf) " Nsf";
        }
        #list > .list-item[reg] {
            counter-increment: total reg;
        }
        #list > .list-item[nsf] {
            counter-increment: total nsf;
        }
    </style>
`;class H extends P.a{constructor(){super(),this.render(this.shadowRoot,F),this.timeOfDay="am"}setStatusName(t){this.views.header.textContent=t}getItemPrimaryText(t){return t.fullname}getItemSecondaryText(t){let e=t.status[this.timeOfDay].remarks,s=t.status[this.timeOfDay].expired?'<span class="remarks"> -- Expired</span>':"";return(e.length>0?`Remarks: <span class="remarks">${e}</span>`:"")+s}setListItemData(t,e){super.setListItemData(t,e);let s=e.regular?"reg":"nsf",i=e.regular?"nsf":"reg";t.div.setAttribute(s,""),t.div.removeAttribute(i)}addUser(t){super.addUser(t,!1)}removeUser(t){super.removeUser(t,!1)}changeUser(t){super.changeUser(t,!1)}onUserSelected(t){}}var q=s(11),Y=s(12),_=s(13);class J extends _.a{constructor(){super(),this.viewName="user"}createMainView(){return new R}updateUserStatus(t,e,s,i){const r={code:e,remarks:s,updatedby:this.userid,timestamp:firebase.firestore.FieldValue.serverTimestamp()};this.branchRepository.updateUserStatus(t,r,i,this.branchid,this.users[i].departmentid)}activate(t){super.activate(),this.users={},this.userid=t.uid,this.branchid=t.branchid,this.departmentid=t.departmentid,this.branchRepository.subscribe(t.branchid)}onUserEvent(t,e){if("added"==t){if(this.userid===e.uid&&(this.mainView.setWelcomeText(e.fullname),e.regular))for(const t in this.mainView.views.departments)this.mainView.views.departments[t].isEditable=!0;this.mainView.views.summary.addUser(e)}else"modified"==t?this.mainView.views.summary.changeUser(e):"removed"==t&&this.mainView.views.summary.removeUser(e)}subscribeDepartmentEvent(t){if("found"==t.type){let e,s=t.departments.filter(t=>{let s=t.uid===this.departmentid;return s&&(e=t),!s});s.unshift(e);for(let t of s)this.mainView.addDepartment(t);this.mainView.views.departments[this.departmentid].isEditable=!0}else super.subscribeDepartmentEvent(t)}getSummaryData(){this.resortUsers(),this.summaryData={am:[],pm:[]};const t=(t,e)=>{let s=e.status[t].code,i=k[s].category;this.summaryData[t][i].push(e)};for(let e of this.usersSorted)t("am",e),t("pm",e)}}J.instance=null;const W=(t,e)=>{customElements.get(t)||customElements.define(t,e)};var G=()=>{W("view-switcher",c.a),W("wc-button",l.a),W("wc-toast",q.a),W("sign-out",Y.a),W("edit-status",z),W("status-details",B),W("user-department-card",N),W("summary-card",H),W("summary-view",D),W("summary-screen",T),W("user-view",R);const t=()=>J.getInstance();return{activate:e=>t().activate(e),deactivate:()=>t().deactivate()}};var X=class{constructor(){this.auth=this.getAuth(),this.auth.on("signed-out",this.onSignedOut.bind(this)),this.auth.on("signed-in",this.onSignedIn.bind(this))}init(){this.auth.init()}onSignedOut(){this.hideCurrentScreen(),this.showLogicScreen()}onSignedIn(t){this.hideCurrentScreen(),t.isAdmin?this.showAdminScreen(t):this.showUserScreen(t)}hideCurrentScreen(){this.currentScreen&&this.currentScreen.deactivate()}showLogicScreen(){this.loginScreen||(this.loginScreen=y()),this.currentScreen=this.loginScreen,this.loginScreen.activate()}async showAdminScreen(t){if(!this.adminScreen){let{default:t}=await s.e(0).then(s.bind(null,15));this.adminScreen=t()}this.currentScreen=this.adminScreen,this.adminScreen.activate(t)}showUserScreen(t){this.userScreen||(this.userScreen=G()),this.currentScreen=this.userScreen,this.userScreen.activate(t)}getAuth(){}getBranchRepository(){}getAdminManager(){}};class Z extends v.a{constructor(){super()}async init(t,e){this.branchRepository=ApplicationContext.getBranchRepository(),this.adminid=t,this.email=e,this.domain=e.split("@")[1]}changeBranchName(t){}changeDepartmentName(t,e){this.branchRepository.updateDepartment(t,e)}createDepartment(t){this.branchRepository.addDepartment(t)}async deleteDepartment(t){await new Promise(t=>setTimeout(t,2e3)),await this.branchRepository.deleteDepartment(t)}async createUser(t){await new Promise(t=>setTimeout(t,1e3));let e=`${t.emailPrefix}@${this.domain}`;if(this.branchRepository.getUserByEmail(e))throw Error();this.branchRepository.createUser(t)}async updateUser(t){await new Promise(t=>setTimeout(t,1e3));let e=`${t.emailPrefix}@${this.domain}`,s=this.branchRepository.getUserByEmail(e);if(s&&(!s||s.uid!==t.uid))throw Error();this.branchRepository.updateUser(t)}updatePassword(t,e){}deleteUser(t,e){this.branchRepository.deleteUser(e)}}Z.instance=null,window.firebase={firestore:{FieldValue:{serverTimestamp:function(){return new Date}}}};window.ApplicationContext=new class extends X{constructor(){super()}getAuth(){return o.getInstance()}getBranchRepository(){return d.getInstance()}getAdminManager(){return Z.getInstance()}},ApplicationContext.init()}]);