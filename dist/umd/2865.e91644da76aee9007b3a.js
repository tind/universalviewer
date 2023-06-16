"use strict";(self.webpackChunkUV=self.webpackChunkUV||[]).push([[2865],{7943:(e,t,r)=>{r.d(t,{s:()=>n});var n=function(e){try{if("string"!=typeof e||""===e)return e;var t=document.createDocumentFragment(),r=document.createElement("div");t.appendChild(r),r.innerHTML=e,l.forEach((function(e){for(var r=t.querySelectorAll(e),n=r.length-1;n>=0;n--){var a=r[n];a.parentNode?a.parentNode.removeChild(a):t.removeChild(a);for(var l=o(a),s=0;s<l.length;s++)i(l[s])}}));for(var n=o(t),a=0;a<n.length;a++)i(n[a]);var s=document.createElement("div");s.appendChild(t);var d=s.querySelector("div");return null!==d?d.innerHTML:s.innerHTML}catch(e){return console.error(e),""}},i=function(e){if(!e.nodeType||1===e.nodeType){for(var t=e.attributes.length-1;t>=0;t--){var r=e.attributes.item(t),n=r.name;if(a.includes(n.toLowerCase())){var l=r.value;null!=l&&l.toLowerCase().includes("javascript:")&&e.removeAttribute(n)}else e.removeAttribute(n)}var s=o(e);for(t=0;t<s.length;t++)i(s[t])}},o=function(e){return null!=e.children?e.children:e.childNodes},a=["class","id","href","src","name","slot"],l=["script","style","iframe","meta","link","object","embed"]},2865:(e,t,r)=>{r.r(t),r.d(t,{ion_alert:()=>u});var n=r(2085),i=r(9114),o=r(1399),a=r(2974),l=r(7943),s=function(e){var t=(0,a.c)(),r=(0,a.c)(),n=(0,a.c)();return r.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.3),n.addElement(e.querySelector(".alert-wrapper")).keyframes([{offset:0,opacity:"0.01",transform:"scale(1.1)"},{offset:1,opacity:"1",transform:"scale(1)"}]),t.addElement(e).easing("ease-in-out").duration(200).addAnimation([r,n])},d=function(e){var t=(0,a.c)(),r=(0,a.c)(),n=(0,a.c)();return r.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.3,0),n.addElement(e.querySelector(".alert-wrapper")).keyframes([{offset:0,opacity:.99,transform:"scale(1)"},{offset:1,opacity:0,transform:"scale(0.9)"}]),t.addElement(e).easing("ease-in-out").duration(200).addAnimation([r,n])},c=function(e){var t=(0,a.c)(),r=(0,a.c)(),n=(0,a.c)();return r.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.32),n.addElement(e.querySelector(".alert-wrapper")).keyframes([{offset:0,opacity:"0.01",transform:"scale(0.9)"},{offset:1,opacity:"1",transform:"scale(1)"}]),t.addElement(e).easing("ease-in-out").duration(150).addAnimation([r,n])},p=function(e){var t=(0,a.c)(),r=(0,a.c)(),n=(0,a.c)();return r.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.32,0),n.addElement(e.querySelector(".alert-wrapper")).fromTo("opacity",.99,0),t.addElement(e).easing("ease-in-out").duration(150).addAnimation([r,n])},u=function(){function e(e){var t=this;(0,n.r)(this,e),this.processedInputs=[],this.processedButtons=[],this.presented=!1,this.mode=(0,n.f)(this),this.keyboardClose=!0,this.buttons=[],this.inputs=[],this.backdropDismiss=!0,this.translucent=!1,this.animated=!0,this.onBackdropTap=function(){t.dismiss(void 0,o.B)},this.dispatchCancelHandler=function(e){var r=e.detail.role;if((0,o.i)(r)){var n=t.processedButtons.find((function(e){return"cancel"===e.role}));t.callButtonHandler(n)}},(0,o.c)(this.el),this.didPresent=(0,n.c)(this,"ionAlertDidPresent",7),this.willPresent=(0,n.c)(this,"ionAlertWillPresent",7),this.willDismiss=(0,n.c)(this,"ionAlertWillDismiss",7),this.didDismiss=(0,n.c)(this,"ionAlertDidDismiss",7)}return e.prototype.buttonsChanged=function(){var e=this.buttons;this.processedButtons=e.map((function(e){return"string"==typeof e?{text:e,role:"cancel"===e.toLowerCase()?"cancel":void 0}:e}))},e.prototype.inputsChanged=function(){var e=this,t=this.inputs,r=new Set(t.map((function(e){return e.type})));r.has("checkbox")&&r.has("radio")&&console.warn("Alert cannot mix input types: "+Array.from(r.values()).join("/")+". Please see alert docs for more info."),this.inputType=r.values().next().value,this.processedInputs=t.map((function(t,r){return{type:t.type||"text",name:t.name||""+r,placeholder:t.placeholder||"",value:t.value,label:t.label,checked:!!t.checked,disabled:!!t.disabled,id:t.id||"alert-input-"+e.overlayIndex+"-"+r,handler:t.handler,min:t.min,max:t.max}}))},e.prototype.componentWillLoad=function(){this.inputsChanged(),this.buttonsChanged()},e.prototype.present=function(){return(0,o.d)(this,"alertEnter",s,c)},e.prototype.dismiss=function(e,t){return(0,o.e)(this,e,t,"alertLeave",d,p)},e.prototype.onDidDismiss=function(){return(0,o.f)(this.el,"ionAlertDidDismiss")},e.prototype.onWillDismiss=function(){return(0,o.f)(this.el,"ionAlertWillDismiss")},e.prototype.rbClick=function(e){for(var t=0,r=this.processedInputs;t<r.length;t++){var n=r[t];n.checked=n===e}this.activeId=e.id,(0,o.s)(e.handler,e),this.el.forceUpdate()},e.prototype.cbClick=function(e){e.checked=!e.checked,(0,o.s)(e.handler,e),this.el.forceUpdate()},e.prototype.buttonClick=function(e){var t=e.role,r=this.getValues();if((0,o.i)(t))return this.dismiss({values:r},t);var n=this.callButtonHandler(e,r);return!1!==n?this.dismiss(Object.assign({values:r},n),e.role):Promise.resolve(!1)},e.prototype.callButtonHandler=function(e,t){if(e&&e.handler){var r=(0,o.s)(e.handler,t);if(!1===r)return!1;if("object"==typeof r)return r}return{}},e.prototype.getValues=function(){if(0!==this.processedInputs.length){if("radio"===this.inputType){var e=this.processedInputs.find((function(e){return!!e.checked}));return e?e.value:void 0}if("checkbox"===this.inputType)return this.processedInputs.filter((function(e){return e.checked})).map((function(e){return e.value}));var t={};return this.processedInputs.forEach((function(e){t[e.name]=e.value||""})),t}},e.prototype.renderAlertInputs=function(e){switch(this.inputType){case"checkbox":return this.renderCheckbox(e);case"radio":return this.renderRadio(e);default:return this.renderInput(e)}},e.prototype.renderCheckbox=function(e){var t=this,r=this.processedInputs,i=(0,n.f)(this);return 0===r.length?null:(0,n.h)("div",{class:"alert-checkbox-group","aria-labelledby":e},r.map((function(e){return(0,n.h)("button",{type:"button",onClick:function(){return t.cbClick(e)},"aria-checked":""+e.checked,id:e.id,disabled:e.disabled,tabIndex:0,role:"checkbox",class:{"alert-tappable":!0,"alert-checkbox":!0,"alert-checkbox-button":!0,"ion-focusable":!0,"alert-checkbox-button-disabled":e.disabled||!1}},(0,n.h)("div",{class:"alert-button-inner"},(0,n.h)("div",{class:"alert-checkbox-icon"},(0,n.h)("div",{class:"alert-checkbox-inner"})),(0,n.h)("div",{class:"alert-checkbox-label"},e.label)),"md"===i&&(0,n.h)("ion-ripple-effect",null))})))},e.prototype.renderRadio=function(e){var t=this,r=this.processedInputs;return 0===r.length?null:(0,n.h)("div",{class:"alert-radio-group",role:"radiogroup","aria-labelledby":e,"aria-activedescendant":this.activeId},r.map((function(e){return(0,n.h)("button",{type:"button",onClick:function(){return t.rbClick(e)},"aria-checked":""+e.checked,disabled:e.disabled,id:e.id,tabIndex:0,class:{"alert-radio-button":!0,"alert-tappable":!0,"alert-radio":!0,"ion-focusable":!0,"alert-radio-button-disabled":e.disabled||!1},role:"radio"},(0,n.h)("div",{class:"alert-button-inner"},(0,n.h)("div",{class:"alert-radio-icon"},(0,n.h)("div",{class:"alert-radio-inner"})),(0,n.h)("div",{class:"alert-radio-label"},e.label)))})))},e.prototype.renderInput=function(e){var t=this.processedInputs;return 0===t.length?null:(0,n.h)("div",{class:"alert-input-group","aria-labelledby":e},t.map((function(e){return(0,n.h)("div",{class:"alert-input-wrapper"},(0,n.h)("input",{placeholder:e.placeholder,value:e.value,type:e.type,min:e.min,max:e.max,onInput:function(t){return e.value=t.target.value},id:e.id,disabled:e.disabled,tabIndex:0,class:{"alert-input":!0,"alert-input-disabled":e.disabled||!1}}))})))},e.prototype.renderAlertButtons=function(){var e=this,t=this.processedButtons,r=(0,n.f)(this),i={"alert-button-group":!0,"alert-button-group-vertical":t.length>2};return(0,n.h)("div",{class:i},t.map((function(t){return(0,n.h)("button",{type:"button",class:h(t),tabIndex:0,onClick:function(){return e.buttonClick(t)}},(0,n.h)("span",{class:"alert-button-inner"},t.text),"md"===r&&(0,n.h)("ion-ripple-effect",null))})))},e.prototype.render=function(){var e,t,r=this,o=r.overlayIndex,a=r.header,s=r.subHeader,d=(0,n.f)(this),c="alert-"+o+"-hdr",p="alert-"+o+"-sub-hdr",u="alert-"+o+"-msg";return void 0!==a?t=c:void 0!==s&&(t=p),(0,n.h)(n.H,{role:"dialog","aria-modal":"true",style:{zIndex:""+(2e4+o)},class:Object.assign(Object.assign({},(0,i.g)(this.cssClass)),(e={},e[d]=!0,e["alert-translucent"]=this.translucent,e)),onIonAlertWillDismiss:this.dispatchCancelHandler,onIonBackdropTap:this.onBackdropTap},(0,n.h)("ion-backdrop",{tappable:this.backdropDismiss}),(0,n.h)("div",{class:"alert-wrapper"},(0,n.h)("div",{class:"alert-head"},a&&(0,n.h)("h2",{id:c,class:"alert-title"},a),s&&(0,n.h)("h2",{id:p,class:"alert-sub-title"},s)),(0,n.h)("div",{id:u,class:"alert-message",innerHTML:(0,l.s)(this.message)}),this.renderAlertInputs(t),this.renderAlertButtons()))},Object.defineProperty(e.prototype,"el",{get:function(){return(0,n.d)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{buttons:["buttonsChanged"],inputs:["inputsChanged"]}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-alert-md-h{--min-width:250px;--width:auto;--min-height:auto;--height:auto;--max-height:90%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-alert-md-h{display:none}.alert-top.sc-ion-alert-md-h{padding-top:50px;-ms-flex-align:start;align-items:flex-start}.alert-wrapper.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:content;opacity:0;z-index:10}.alert-title.sc-ion-alert-md{margin-top:0}.alert-sub-title.sc-ion-alert-md, .alert-title.sc-ion-alert-md{margin-left:0;margin-right:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-sub-title.sc-ion-alert-md{margin-top:5px;font-weight:400}.alert-message.sc-ion-alert-md{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch;overflow-y:auto;overscroll-behavior-y:contain}.alert-checkbox-group.sc-ion-alert-md::-webkit-scrollbar, .alert-message.sc-ion-alert-md::-webkit-scrollbar, .alert-radio-group.sc-ion-alert-md::-webkit-scrollbar{display:none}.alert-input.sc-ion-alert-md{padding-left:0;padding-right:0;padding-top:10px;padding-bottom:10px;width:100%;border:0;background:inherit;font:inherit;-webkit-box-sizing:border-box;box-sizing:border-box}.alert-button-group.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;width:100%}.alert-button-group-vertical.sc-ion-alert-md{-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.alert-button.sc-ion-alert-md{margin-right:0;display:block;border:0;font-size:14px;line-height:20px;z-index:0}.alert-button.ion-focused.sc-ion-alert-md, .alert-tappable.ion-focused.sc-ion-alert-md{background:var(--ion-color-step-100,#e6e6e6)}.alert-button-inner.sc-ion-alert-md{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.alert-checkbox-button-disabled.sc-ion-alert-md .alert-button-inner.sc-ion-alert-md, .alert-input-disabled.sc-ion-alert-md, .alert-radio-button-disabled.sc-ion-alert-md .alert-button-inner.sc-ion-alert-md{cursor:default;opacity:.5;pointer-events:none}.alert-tappable.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;width:100%;border:0;background:transparent;font-size:inherit;line-height:normal;text-align:start;-webkit-appearance:none;-moz-appearance:none;appearance:none;contain:strict}.alert-button.sc-ion-alert-md, .alert-checkbox.sc-ion-alert-md, .alert-input.sc-ion-alert-md, .alert-radio.sc-ion-alert-md{outline:none}.alert-checkbox-icon.sc-ion-alert-md, .alert-checkbox-inner.sc-ion-alert-md, .alert-radio-icon.sc-ion-alert-md{-webkit-box-sizing:border-box;box-sizing:border-box}.sc-ion-alert-md-h{--background:var(--ion-overlay-background-color,var(--ion-background-color,#fff));--max-width:280px;font-size:14px}.alert-wrapper.sc-ion-alert-md{border-radius:4px;-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.alert-head.sc-ion-alert-md{padding-left:23px;padding-right:23px;padding-top:20px;padding-bottom:15px;text-align:start}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-head.sc-ion-alert-md{padding-left:unset;padding-right:unset;-webkit-padding-start:23px;padding-inline-start:23px;-webkit-padding-end:23px;padding-inline-end:23px}}.alert-title.sc-ion-alert-md{font-size:20px;font-weight:500}.alert-sub-title.sc-ion-alert-md, .alert-title.sc-ion-alert-md{color:var(--ion-text-color,#000)}.alert-sub-title.sc-ion-alert-md{font-size:16px}.alert-input-group.sc-ion-alert-md, .alert-message.sc-ion-alert-md{padding-left:24px;padding-right:24px;padding-top:20px;padding-bottom:20px;color:var(--ion-color-step-550,#737373)}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-input-group.sc-ion-alert-md, .alert-message.sc-ion-alert-md{padding-left:unset;padding-right:unset;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px}}.alert-message.sc-ion-alert-md{max-height:240px;font-size:16px}.alert-message.sc-ion-alert-md:empty{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0}.alert-head.sc-ion-alert-md + .alert-message.sc-ion-alert-md{padding-top:0}.alert-input.sc-ion-alert-md{margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px;border-bottom:1px solid var(--ion-color-step-150,#d9d9d9);color:var(--ion-text-color,#000)}.alert-input.sc-ion-alert-md::-webkit-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-moz-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md:-ms-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-ms-input-placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::placeholder{color:var(--ion-placeholder-color,var(--ion-color-step-400,#999));font-family:inherit;font-weight:inherit}.alert-input.sc-ion-alert-md::-ms-clear{display:none}.alert-input.sc-ion-alert-md:focus{margin-bottom:4px;border-bottom:2px solid var(--ion-color-primary,#3880ff)}.alert-checkbox-group.sc-ion-alert-md, .alert-radio-group.sc-ion-alert-md{position:relative;max-height:240px;border-top:1px solid var(--ion-color-step-150,#d9d9d9);border-bottom:1px solid var(--ion-color-step-150,#d9d9d9);overflow:auto}.alert-tappable.sc-ion-alert-md{position:relative;height:48px;overflow:hidden}.alert-radio-label.sc-ion-alert-md{padding-left:52px;padding-right:26px;padding-top:13px;padding-bottom:13px;-ms-flex:1;flex:1;color:var(--ion-color-step-850,#262626);font-size:16px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-radio-label.sc-ion-alert-md{padding-left:unset;padding-right:unset;-webkit-padding-start:52px;padding-inline-start:52px;-webkit-padding-end:26px;padding-inline-end:26px}}.alert-radio-icon.sc-ion-alert-md{left:26px;top:0;border-radius:50%;display:block;position:relative;width:20px;height:20px;border-width:2px;border-style:solid;border-color:var(--ion-color-step-550,#737373)}[dir=rtl].sc-ion-alert-md-h .alert-radio-icon.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-radio-icon.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md{left:unset;right:unset;right:26px}.alert-radio-inner.sc-ion-alert-md{left:3px;top:3px;border-radius:50%;position:absolute;width:10px;height:10px;-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);-webkit-transition:-webkit-transform .28s cubic-bezier(.4,0,.2,1);transition:-webkit-transform .28s cubic-bezier(.4,0,.2,1);transition:transform .28s cubic-bezier(.4,0,.2,1);transition:transform .28s cubic-bezier(.4,0,.2,1),-webkit-transform .28s cubic-bezier(.4,0,.2,1);background-color:var(--ion-color-primary,#3880ff)}[dir=rtl].sc-ion-alert-md-h .alert-radio-inner.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-radio-inner.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md .alert-radio-inner.sc-ion-alert-md{left:unset;right:unset;right:3px}[aria-checked=true].sc-ion-alert-md .alert-radio-label.sc-ion-alert-md{color:var(--ion-color-step-850,#262626)}[aria-checked=true].sc-ion-alert-md .alert-radio-icon.sc-ion-alert-md{border-color:var(--ion-color-primary,#3880ff)}[aria-checked=true].sc-ion-alert-md .alert-radio-inner.sc-ion-alert-md{-webkit-transform:scaleX(1);transform:scaleX(1)}.alert-checkbox-label.sc-ion-alert-md{padding-left:53px;padding-right:26px;padding-top:13px;padding-bottom:13px;-ms-flex:1;flex:1;color:var(--ion-color-step-850,#262626);font-size:16px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-checkbox-label.sc-ion-alert-md{padding-left:unset;padding-right:unset;-webkit-padding-start:53px;padding-inline-start:53px;-webkit-padding-end:26px;padding-inline-end:26px}}.alert-checkbox-icon.sc-ion-alert-md{left:26px;top:0;border-radius:2px;position:relative;width:16px;height:16px;border-width:2px;border-style:solid;border-color:var(--ion-color-step-550,#737373);contain:strict}[dir=rtl].sc-ion-alert-md-h .alert-checkbox-icon.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h .alert-checkbox-icon.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md{left:unset;right:unset;right:26px}[aria-checked=true].sc-ion-alert-md .alert-checkbox-icon.sc-ion-alert-md{border-color:var(--ion-color-primary,#3880ff);background-color:var(--ion-color-primary,#3880ff)}[aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md{left:3px;top:0;position:absolute;width:6px;height:10px;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--ion-color-primary-contrast,#fff)}[dir=rtl].sc-ion-alert-md-h [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md, [dir=rtl] .sc-ion-alert-md-h [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md, [dir=rtl].sc-ion-alert-md [aria-checked=true].sc-ion-alert-md .alert-checkbox-inner.sc-ion-alert-md{left:unset;right:unset;right:3px}.alert-button-group.sc-ion-alert-md{padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse;-ms-flex-pack:end;justify-content:flex-end}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-button-group.sc-ion-alert-md{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}.alert-button.sc-ion-alert-md{border-radius:2px;margin-left:0;margin-right:8px;margin-top:0;margin-bottom:0;padding-left:10px;padding-right:10px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;color:var(--ion-color-primary,#3880ff);font-weight:500;text-align:end;text-transform:uppercase;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.alert-button.sc-ion-alert-md{margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;padding-left:unset;padding-right:unset;-webkit-padding-start:10px;padding-inline-start:10px;-webkit-padding-end:10px;padding-inline-end:10px}}.alert-button-inner.sc-ion-alert-md{-ms-flex-pack:end;justify-content:flex-end}"},enumerable:!0,configurable:!0}),e}(),h=function(e){return Object.assign({"alert-button":!0,"ion-focusable":!0,"ion-activatable":!0},(0,i.g)(e.cssClass))}},1399:(e,t,r)=>{r.d(t,{B:()=>D,a:()=>c,b:()=>d,c:()=>h,d:()=>x,e:()=>v,f:()=>w,g:()=>m,h:()=>b,i:()=>z,j:()=>g,k:()=>p,p:()=>u,s:()=>I});var n=r(2085),i=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{s(n.next(e))}catch(e){o(e)}}function l(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){e.done?i(e.value):new r((function(t){t(e.value)})).then(a,l)}s((n=n.apply(e,t||[])).next())}))},o=function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}},a=void 0,l=0,s=function(e){return{create:function(t){return m(e,t)},dismiss:function(t,r,n){return b(document,t,r,e,n)},getTop:function(){return i(this,void 0,void 0,(function(){return o(this,(function(t){return[2,g(document,e)]}))}))}}},d=s("ion-alert"),c=s("ion-action-sheet"),p=s("ion-picker"),u=s("ion-popover"),h=function(e){var t=document;f(t);var r=l++;e.overlayIndex=r,e.hasAttribute("id")||(e.id="ion-overlay-"+r)},m=function(e,t){return customElements.whenDefined(e).then((function(){var r=document,n=r.createElement(e);return n.classList.add("overlay-hidden"),Object.assign(n,t),y(r).appendChild(n),n.componentOnReady()}))},f=function(e){0===l&&(l=1,e.addEventListener("focusin",(function(t){var r=g(e);if(r&&r.backdropDismiss&&!A(r,t.target)){var n=r.querySelector("input,button");n&&n.focus()}})),e.addEventListener("ionBackButton",(function(t){var r=g(e);r&&r.backdropDismiss&&t.detail.register(100,(function(){return r.dismiss(void 0,D)}))})),e.addEventListener("keyup",(function(t){if("Escape"===t.key){var r=g(e);r&&r.backdropDismiss&&r.dismiss(void 0,D)}})))},b=function(e,t,r,n,i){var o=g(e,n,i);return o?o.dismiss(t,r):Promise.reject("overlay does not exist")},g=function(e,t,r){var n=function(e,t){return void 0===t&&(t="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker,ion-popover,ion-toast"),Array.from(e.querySelectorAll(t)).filter((function(e){return e.overlayIndex>0}))}(e,t);return void 0===r?n[n.length-1]:n.find((function(e){return e.id===r}))},x=function(e,t,r,l,s){return i(a,void 0,void 0,(function(){var i;return o(this,(function(o){switch(o.label){case 0:return e.presented?[2]:(e.presented=!0,e.willPresent.emit(),i=e.enterAnimation?e.enterAnimation:n.i.get(t,"ios"===e.mode?r:l),[4,k(e,i,e.el,s)]);case 1:return o.sent()&&e.didPresent.emit(),[2]}}))}))},v=function(e,t,r,l,s,d,c){return i(a,void 0,void 0,(function(){var i,a;return o(this,(function(o){switch(o.label){case 0:if(!e.presented)return[2,!1];e.presented=!1,o.label=1;case 1:return o.trys.push([1,3,,4]),e.willDismiss.emit({data:t,role:r}),i=e.leaveAnimation?e.leaveAnimation:n.i.get(l,"ios"===e.mode?s:d),[4,k(e,i,e.el,c)];case 2:return o.sent(),e.didDismiss.emit({data:t,role:r}),[3,4];case 3:return a=o.sent(),console.error(a),[3,4];case 4:return e.el.remove(),[2,!0]}}))}))},y=function(e){return e.querySelector("ion-app")||e.body},k=function(e,t,l,s){return i(a,void 0,void 0,(function(){var i,a,d,c,p;return o(this,(function(o){switch(o.label){case 0:if(e.animation)return e.animation.destroy(),e.animation=void 0,[2,!1];l.classList.remove("overlay-hidden"),i=l.shadowRoot||e.el,d=!0,o.label=1;case 1:return o.trys.push([1,4,,5]),[4,r.e(7879).then(r.bind(r,7879))];case 2:return[4,o.sent().create(t,i,s)];case 3:return a=o.sent(),[3,5];case 4:return o.sent(),(a=t(i,s)).fill("both"),d=!1,[3,5];case 5:return e.animation=a,e.animated&&n.i.getBoolean("animated",!0)||a.duration(0),e.keyboardClose&&a.beforeAddWrite((function(){var e=l.ownerDocument.activeElement;e&&e.matches("input, ion-input, ion-textarea")&&e.blur()})),[4,a.playAsync()];case 6:return c=o.sent(),p=void 0===c||a.hasCompleted,d&&a.destroy(),e.animation=void 0,[2,p]}}))}))},w=function(e,t){var r,n=new Promise((function(e){return r=e}));return C(e,t,(function(e){r(e.detail)})),n},C=function(e,t,r){var n=function(i){e.removeEventListener(t,n),r(i)};e.addEventListener(t,n)},z=function(e){return"cancel"===e||e===D},A=function(e,t){for(;t;){if(t===e)return!0;t=t.parentElement}return!1},E=function(e){return e()},I=function(e,t){if("function"==typeof e)return n.i.get("_zoneGate",E)((function(){try{return e(t)}catch(e){console.error(e)}}))},D="backdrop"},9114:(e,t,r)=>{r.d(t,{c:()=>i,g:()=>o,h:()=>n,o:()=>l});var n=function(e,t){return null!==t.closest(e)},i=function(e){var t;return"string"==typeof e&&e.length>0?((t={"ion-color":!0})["ion-color-"+e]=!0,t):void 0},o=function(e){var t={};return function(e){return void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((function(e){return null!=e})).map((function(e){return e.trim()})).filter((function(e){return""!==e})):[]}(e).forEach((function(e){return t[e]=!0})),t},a=/^[a-z][a-z0-9+\-.]*:/,l=function(e,t,r){return n=void 0,i=void 0,l=function(){var n;return function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}(this,(function(i){return null!=e&&"#"!==e[0]&&!a.test(e)&&(n=document.querySelector("ion-router"))?(null!=t&&t.preventDefault(),[2,n.push(e,r)]):[2,!1]}))},new((o=void 0)||(o=Promise))((function(e,t){function r(e){try{s(l.next(e))}catch(e){t(e)}}function a(e){try{s(l.throw(e))}catch(e){t(e)}}function s(t){t.done?e(t.value):new o((function(e){e(t.value)})).then(r,a)}s((l=l.apply(n,i||[])).next())}));var n,i,o,l}}}]);