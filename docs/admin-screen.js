(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,i){"use strict";i.r(t);var s=i(8),a=i(13);const n="PointerEvent"in window;var r={onclick:function(e,t){n?e.onpointerup=t:e.onclick=t},animate:function(e,t,i){const s=t=>{e.removeEventListener("animationend",s),i()};e.addEventListener("animationend",s),e.classList.add(t)},showToast:function(e){let t=document.createElement("wc-toast");t.textContent=e,document.body.appendChild(t)}},d=i(10);class o extends d.a{constructor(){super(),this.views["float-button"].textContent="Create department"}createDepartmentCard(){return document.createElement("admin-department-card")}onFloatButtonClick(){let e=document.createElement("edit-department");e.setEditMode(!1),e.setController(this.controller),document.body.appendChild(e)}}const l={creating:"creating",updating:"updating",removing:"removing",completed:"completed"};class c extends a.a{constructor(){super(),this.adminManager=ApplicationContext.getAdminManager(),this.viewName="admin",this.pendingState={}}createMainView(){return new o}async activate(e){super.activate(),await this.adminManager.init(e.uid,e.email),this.mainView.setWelcomeText("admin user"),this.branchid=e.uid,this.branchRepository.subscribe(e.uid)}updatePassword(e,t){this.adminManager.updatePassword(e,t)}getDomain(){return this.adminManager.domain}deleteDepartment(e){this.mainView.getDepartmentCard(e).showRemoving(),this.adminManager.deleteDepartment(e)}createDepartment(e){this.adminManager.createDepartment(e)}editDepartment(e,t){this.adminManager.changeDepartmentName(e,t)}async performUserRequest(e,t){let i=this.mainView.getDepartmentCard(e.departmentid);e.state=t,e.fullname=e.rank+" "+e.name,!e.email&&(e.email=`${e.emailPrefix}@${this.getDomain()}`),this.pendingState[e.email]=!0;try{t===l.creating&&(e.uid=e.email,i.addUser(e,!1),await this.adminManager.createUser(e)),t===l.updating&&(i.changeUser(e,!1),await this.adminManager.updateUser(e)),t===l.removing&&(i.changeUser(e,!1),await this.adminManager.deleteUser(e.departmentid,e.uid))}catch(s){if(console.log(s),delete this.pendingState[e.email],t===l.creating)i.removeUser(e);else{let t=this.users[e.uid];t.state=l.completed,i.changeUser(t,!1)}r.showToast(`An error has occured whilst ${t} user:\n${e.fullname}`)}}createUser(e){this.performUserRequest(e,l.creating)}updateUser(e){this.performUserRequest(e,l.updating)}deleteUser(e){this.performUserRequest(e,l.removing)}subscribeUserEvent(e){let t=e.type,i=e.user;if("found"!==t&&this.pendingState[i.email]){let s=this.mainView.getDepartmentCard(i.departmentid);"added"===t&&(e.type="modified",s.updatePendingUserId(i)),i.state=l.completed,delete this.pendingState[i.email],this.users[i.uid]=i}super.subscribeUserEvent(e)}}c.instance=null;var h=i(1),m=i(0);const p=m.b`<style>#root {position: relative;}#sub-header {font-size: 1.3rem;padding: 10px;text-align: center;font-weight: 400;color: var(--color-primary);cursor: pointer;background: transparent;border-bottom: 2px dashed var(--color-primary);transition: all .2s;}#sub-header:active {background: rgba(0,0,0,.1);}#sub-header.empty {border-radius: 15px;border-bottom: none;}.list-item {position: relative;}.list-item .loading {position: absolute;top: 0;left: 0;height: 100%;width: 100%;display: flex;justify-content: flex-end;align-items: center;background: #f9ead5b5;padding-right: 10%;box-sizing: border-box;color: var(--color-primary);text-transform: capitalize;}#removing {position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;background: linear-gradient(#a0929236, #ccc7c7d9, #a0929236);font-size: 1.5rem;color: #614343;}${Object(h.b)(300,500)}</style>`,u=m.b`<wc-button type="plain" id="edit">edit</wc-button>`,w=m.b`<p class="loading"></p>`;class v extends s.a{constructor(){super(),this.render(this.shadowRoot,p),this.render(this.views["header-holder"],u,["edit"]),this.views.edit.onclick=this.showEditDepDialogue.bind(this),this.onclick(this.views["sub-header"],this.showAddUserDialogue.bind(this)),this.views["sub-header"].textContent="Add user",this.views["sub-header"].classList.add("empty")}getItemPrimaryText(e){return e.fullname}getItemSecondaryText(e){return e.email}showEditDepDialogue(e){let t=document.createElement("edit-department");t.setEditMode(!0),t.setController(this.controller),t.setDepartment(this.id,this.departmentName),document.body.appendChild(t)}showAddUserDialogue(e){let t=document.createElement("edit-user");t.setEditMode(!1),t.setController(this.controller),t.setDepartment(this.id,this.departmentName),document.body.appendChild(t)}onUserSelected(e){let t=document.createElement("edit-user");t.setEditMode(!0),t.setController(this.controller),t.setDepartment(this.id,this.departmentName),t.setUser(this.getUser(e)),document.body.appendChild(t)}setListItemData(e,t){if(super.setListItemData(e,t),t.state)if(t.state===l.completed){let i=e.div.querySelector(".loading");this.animate(i,"fade-out",()=>{i.remove()}),this.onclick(e.div,()=>{this.onUserSelected(t.uid)})}else{this.onclick(e,null);let i=w.get().content.cloneNode(!0).querySelector(".loading");i.textContent=`${l[t.state]} user...`,this.animate(i,"fade-in",()=>{i.classList.remove("fade-in")}),e.div.appendChild(i)}}changeUser(e,t=!0){super.changeUser(e,!e.state)}updatePendingUserId(e){var t=this.uidArray.indexOf(e.email);this.uidArray[t]=e.uid,this.items[e.uid]=this.items[e.email],this.items[e.uid].div.id=e.uid,delete this.items[e.email]}addUser(e,t=!0){super.addUser(e,t),this.uidArray.length>0&&this.views["sub-header"].classList.remove("empty")}removeUser(e,t=!0){this.isRemoving||(super.removeUser(e,t),0==this.uidArray.length&&this.views["sub-header"].classList.add("empty"))}showRemoving(){this.isRemoving=!0;let e=document.createElement("div");e.id="removing",e.style.animation="fade-in 1s",e.textContent="Removing...",this.views.root.appendChild(e)}}var g=i(4);const b=m.b`<style>${h.c}.container {display: flex;flex-direction: column;justify-content: center;}input {font-size: 1.2rem;padding: 10px;margin-bottom: 20px;text-transform: capitalize;}.header-holder {display: flex;flex-direction: row;justify-content: space-between;align-items: center;}#confirm {--button-padding: 10px;}</style><div class="container"><div class="header-holder"><h3 id="header">Department</h3><wc-button type="plain" id="delete" hidden>delete</wc-button></div><input id="name" type="name" placeholder="e.g. Log branch" autocomplete="off" required/><wc-button id="confirm">Confirm</wc-button></div>`,f=["name","confirm","delete","header"];class y extends g.a{constructor(){super(),this.render(this.views.dialogue,b,f),this.views.confirm.onclick=this.onSubmit.bind(this),this.views.delete.onclick=this.onDelete.bind(this)}setController(e){this.controller=e}onDelete(e){this.controller.deleteDepartment(this.uid),this.showToast("Deleting department and its users.\nThis may take a while..."),this.close()}onSubmit(e){let t=this.views.name;t.validity.valid&&(this.isEdit?this.controller.editDepartment(this.uid,t.value):this.controller.createDepartment(t.value),this.close())}setEditMode(e){this.isEdit=e,this.views.delete.hidden=!1,this.views.header.textContent=e?"Edit department":"Add department"}setDepartment(e,t){this.uid=e,this.views.name.value=t}}var x=i(9);const U=m.b`<style>${h.c}.container {display: flex;flex-direction: row;flex-wrap: wrap;}#department-name {width: 100%;text-align: center;margin: 0;font-size: 1.2rem;font-weight: 900;}.header-holder {display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;}input {box-sizing: border-box;margin: 0 0 10px;}#rank {text-transform: uppercase;width: 25%;}#rank::placeholder {text-transform: none;}#name {text-transform: capitalize;margin-left: 15px;width: calc(75% - 15px);}.break {flex-basis: 100%;width: 0;}#email {flex-grow: 1;min-width: 0;}#domain {margin: 0 15px;align-self: center;}#password {flex-grow: 1;}#change-password {--button-font-size: 1rem;--button-padding: 0;margin: 0 0 0 10px;}#confirm {width: 100%;--button-padding: 10px;margin-top: 10px;}.row-box {display: flex;flex-direction: row-reverse;width: 100%;}.regular-box {display: flex;align-items: center;width: 100%;}.regular-box input {margin: 0 10px 0 0;}.regular-box .label {font-size: 1rem;}</style><div class="container"><p id="department-name"></p><div class="header-holder"><h3 id="header">Department</h3><wc-button type="plain" id="delete" hidden>delete</wc-button></div><input id="rank" type="text" placeholder="Rank" autocomplete="off" required/><input id="name" type="text" placeholder="Name" autocomplete="off" required/><div class="break"></div><div class="row-box"><p id="domain"></p><input id="email" type="text" placeholder="Email" autocomplete="off" required/></div><div class="break"></div><div class="row-box"><wc-button type="plain" id="change-password" hidden>change</wc-button><input id="password" minlength="8" type="password" placeholder="Password" autocomplete="off" required/></div><div class="regular-box"><input type="checkbox" id="regular"><div class="label">Regular serviceman</div></div><wc-button id="confirm">Confirm</wc-button></div>`,D=["confirm","delete","change-password","domain","email","rank","name","password","regular","department-name","header"];class k extends g.a{constructor(){super(),this.render(this.views.dialogue,U,D),this.views.confirm.onclick=this.onSubmit.bind(this),this.views.delete.onclick=this.onDelete.bind(this),this.views["change-password"].onclick=this.changePassword.bind(this),this.views.email.oninput=e=>{this.views.email.value=this.views.email.value.replace(/\W/g,"")}}setController(e){this.controller=e,this.views.domain.textContent="@"+e.getDomain()}onDelete(e){this.controller.deleteUser(this.user),this.close()}checkFormValidity(e){let t=this.views.email.checkValidity(),i=this.views.name.checkValidity(),s=x.a.isValid(this.views.rank.value.toUpperCase().trim()),a=this.views.password.checkValidity();if(!s)return{success:!1,msg:"Enter a valid rank"};if(!i)return{success:!1,msg:"Enter a valid name"};if(!t)return{success:!1,msg:"Enter a valid email"};if(!e&&!a)return{success:!1,msg:"Enter a valid password"};let n={};return n.departmentid=this.departmentId,n.emailPrefix=this.views.email.value,n.name=this.views.name.value,n.rank=this.views.rank.value.toUpperCase().trim(),n.regular=this.views.regular.checked,e?n.uid=this.uid:n.password=this.views.password.value,{success:!0,user:n}}onSubmit(e){let t=this.checkFormValidity(this.isEdit);t.success?(this.isEdit?this.controller.updateUser(t.user):this.controller.createUser(t.user),this.close()):this.showToast(t.msg)}changePassword(e){let t="Password has been changed successfully.";this.views.password.checkValidity()?(this.controller.updatePassword(this.uid,this.views.password.value),this.views.password.value=""):t="Please enter a valid password",this.showToast(t)}setUser(e){this.user=e,this.uid=e.uid,this.views.email.value=e.email.split("@")[0],this.views.rank.value=e.rank,this.views.name.value=e.name,this.views.regular.checked=e.regular}setDepartment(e,t){this.departmentId=e,this.views["department-name"].textContent=t}setEditMode(e){this.isEdit=e,e?(this.views.delete.hidden=!1,this.views["change-password"].hidden=!1,this.views.header.textContent="Edit user"):this.views.header.textContent="Add user"}}var C=i(11),E=i(12),M=i(7),P=i(6),S=i(5),$=i(2);class R extends S.a{constructor(){super(),this.db=firebase.firestore(),this.db.enablePersistence({synchronizeTabs:!0})}updateUserStatus(e,t,i,s){let a=this.db.doc(`branches/${s}/repository/${i}`);null===e?a.update({"data.status":{am:t,pm:t}}):!0===e?a.update({"data.status.am":{...t}}):!1===e&&a.update({"data.status.pm":{...t}})}toDepartment(e){return{uid:e.id,...e.data().data}}subscribe(e){let t=!0,i=this.db.collection(`branches/${e}/repository`);this.branchUnsubscribe=i.onSnapshot(e=>{if(e.empty)t&&(t=!1,this.emit("user-event",{type:"found",users:[]})),this.emit("department-event",{type:"empty"});else if(t){t=!1;let i=[],s=[];for(let t of e.docChanges()){"user"==t.doc.data().type?s.push($.a.fromDoc(t.doc)):i.push(this.toDepartment(t.doc))}this.emit("department-event",{type:"found",departments:i}),this.emit("user-event",{type:"found",users:s})}else for(let t of e.docChanges()){let e=t.doc.data().type,i="user"===e?$.a.fromDoc(t.doc):this.toDepartment(t.doc);this.emit(`${e}-event`,{type:t.type,[e]:i})}},e=>{console.log(e)})}unsubscribe(){this.branchUnsubscribe()}}R.instance=null;var z=i(3);class A extends z.a{constructor(){super()}async init(e,t){await import("/__/firebase/7.14.4/firebase-functions.js"),this.functions=firebase.app().functions("asia-northeast1"),this.db=firebase.firestore(),this.adminid=e,this.email=t,this.domain=t.split("@")[1]}changeBranchName(e){this.db.doc(`branches/${this.adminid}`).update({name:e})}changeDepartmentName(e,t){this.db.doc(`branches/${this.adminid}/repository/${e}`).update({"data.name":t})}createDepartment(e){this.db.collection(`branches/${this.adminid}/repository`).add({type:"department",data:{name:e}})}deleteDepartment(e){this.functions.httpsCallable("deleteDepartment")({departmentid:e})}createUser(e){return this.functions.httpsCallable("createUser")({...e})}updateUser(e){return this.functions.httpsCallable("updateUser")({...e})}updatePassword(e,t){this.functions.httpsCallable("updatePassword")({uid:e,password:t})}deleteUser(e,t){return this.functions.httpsCallable("deleteUser")({departmentid:e,uid:t})}}A.instance=null;const V=(e,t)=>{customElements.get(e)||customElements.define(e,t)};t.default=()=>{V("view-switcher",M.a),V("wc-button",P.a),V("wc-toast",C.a),V("sign-out",E.a),V("edit-department",y),V("edit-user",k),V("admin-department-card",v),V("admin-view",o);const e=()=>c.getInstance();return{activate:t=>e().activate(t),deactivate:()=>e().deactivate()}}}}]);