"use strict";(self.webpackChunk_department_of_veterans_affairs_storybook=self.webpackChunk_department_of_veterans_affairs_storybook||[]).push([[5046],{"../web-components/dist/esm-es5/va-promo-banner.entry.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{va_promo_banner:()=>VaPromoBanner});__webpack_require__("../../node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.concat.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.includes.js"),__webpack_require__("../../node_modules/core-js/modules/es.string.includes.js"),__webpack_require__("../../node_modules/core-js/modules/es.object.define-property.js");var _index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../web-components/dist/esm-es5/index-c384c57b.js"),__spreadArray=function(e,n,t){if(t||2===arguments.length)for(var o,r=0,i=n.length;r<i;r++)!o&&r in n||(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return e.concat(o||Array.prototype.slice.call(n))},VaPromoBanner=function(){function e(e){(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.r)(this,e),this.closeEvent=(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.c)(this,"closeEvent",7),this.componentLibraryAnalytics=(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.c)(this,"component-library-analytics",7),this.href=void 0,this.type=void 0,this.disableAnalytics=!1,this.dismissedBanners=[]}return e.prototype.closeHandler=function(){if(this.closeEvent.emit(),this.el.id){var e=__spreadArray(__spreadArray([],this.dismissedBanners,!0),[this.el.id],!1);this.dismissedBanners=e,localStorage.setItem("DISMISSED_PROMO_BANNERS",JSON.stringify(e))}if(!this.disableAnalytics){var n={componentName:"va-promo-banner",action:"close",details:{text:this.el.innerText,type:this.type}};this.componentLibraryAnalytics.emit(n)}},e.prototype.handleLinkClick=function(){if(!this.disableAnalytics){var e={componentName:"va-promo-banner",action:"linkClick",details:{text:this.el.innerText,href:this.href,type:this.type}};this.componentLibraryAnalytics.emit(e)}},e.prototype.componentWillLoad=function(){var e=localStorage.getItem("DISMISSED_PROMO_BANNERS");this.dismissedBanners=e?JSON.parse(e):[],document.body.classList.add("va-pad-promo-banner")},e.prototype.render=function(){var n,e=this;return(null===(n=this.dismissedBanners)||void 0===n?void 0:n.includes(this.el.id))?(document.body.classList.remove("va-pad-promo-banner"),null):(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)(_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.H,null,(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("div",{class:"va-banner-body",role:"banner"},(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("i",{"aria-hidden":"true",class:this.type,role:"presentation"}),(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("a",{class:"va-banner-content-link",href:this.href,onClick:function onClick(){return e.handleLinkClick()}},(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("slot",null)," ",(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("i",{"aria-hidden":"true",role:"presentation"})),(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("button",{type:"button","aria-label":"Dismiss this promo banner",onClick:function onClick(){return e.closeHandler()}},(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.h)("i",{"aria-hidden":"true",role:"presentation"}))))},Object.defineProperty(e.prototype,"el",{get:function get(){return(0,_index_c384c57b_js__WEBPACK_IMPORTED_MODULE_5__.g)(this)},enumerable:!1,configurable:!0}),e}();VaPromoBanner.style=":host{z-index:1;position:fixed;bottom:0;left:0;width:100%;background-color:var(--color-gray-lightest);color:var(--color-link-default);font-weight:700}.va-banner-body{max-width:100rem;margin:0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.va-banner-body>i{display:none;text-align:center;width:100%;font-size:2.15rem;background-color:var(--color-white);border-radius:50%;height:100%;height:4.2rem;position:relative;width:4.2rem;margin-left:0.5rem;margin-right:0.8rem;margin-top:0.8rem;margin-bottom:0.8rem}.va-banner-body>i::before{position:relative;top:0.8rem}.va-banner-body>i.announcement::before{content:'\\F0A1';}.va-banner-body>i.news::before{content:'\\F1EA';}.va-banner-body>i.email-signup::before{content:'\\F0E0';}.va-banner-content-link{padding:0.8rem;line-height:2.2rem;text-decoration:none;color:var(--color-link-default);-ms-flex-positive:2;flex-grow:2;border-right:1px solid var(--color-gray-lighter)}.va-banner-content-link:hover{text-decoration:underline}.va-banner-content-link i::before{content:'\\F105';}button{background:none;background-color:transparent;color:var(--color-link-default);border:none;font-size:2rem;padding:0 1.6rem}button:hover{cursor:pointer}button i::before{content:'\\F057';}i{font-family:'Font Awesome 5 Free';font-style:normal;font-weight:900;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1}@media screen and (min-width: 768px){.va-banner-body>i{display:block}.va-banner-content-link{border:none}}"}}]);