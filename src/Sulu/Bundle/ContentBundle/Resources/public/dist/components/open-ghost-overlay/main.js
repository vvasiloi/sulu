define(function(){"use strict";var a={},b={info:"content.contents.settings.copy-locale.info",title:"content.contents.settings.copy-locales.title",selectDefault:"content.contents.settings.copy-locale.select-default","new":"content.contents.settings.copy-locale.new",copy:"content.contents.settings.copy-locale.copy",ok:"content.contents.settings.copy-locale-overlay.ok"},c={openGhost:function(){return['<div class="copy-locale-overlay-content grid">','   <div class="grid-row">','       <p class="info">',d.call(this,"info"),"       </p>","   </div>",'   <div class="grid-row">','       <div class="custom-radio">','           <input type="radio" name="action" id="copy-locale-new" checked="checked"/>','           <span class="icon"></span>',"       </div>",'       <label for="copy-locale-new">',d.call(this,"new"),"       </label>","   </div>",'   <div class="grid-row">','       <div class="custom-radio">','           <input type="radio" name="action" id="copy-locale-copy"/>','           <span class="icon"></span>',"       </div>",'       <label for="copy-locale-copy">',d.call(this,"copy"),"       </label>",'       <div id="copy-locale-overlay-select" />',"   </div>","</div>"].join("")}},d=function(b){return this.sandbox.translate(a[b])},e=function(a,b,c,e,f,g){e||(e="node");var h=this.sandbox.dom.createElement('<div class="overlay-container"/>'),i=[{type:"cancel",align:"left"}];this.sandbox.dom.append(this.$el,h),c&&i.push({type:"ok",align:"right",text:d.call(this,"ok")}),this.sandbox.start([{name:"overlay@husky",options:{openOnStart:!0,removeOnClose:!0,cssClass:"node",el:h,container:this.$el,instanceName:e,skin:"medium",slides:[{title:a,data:b,buttons:i,okCallback:f,cancelCallback:g}]}}])};return{openGhost:function(f,g){var h=this.sandbox.data.deferred();return a=this.sandbox.util.extend(!0,{},b,g),e.call(this,d.call(this,"title"),c.openGhost.call(this),!0,"copy-locale-overlay",function(){var a=this.sandbox.dom.prop("#copy-locale-copy","checked"),b=this.sandbox.dom.data("#copy-locale-overlay-select","selectionValues");return!a||b&&0!==b.length?void h.resolve(a,b[0]):!1}.bind(this),function(){h.reject()}),this.sandbox.once("husky.select.copy-locale-to.selected.item",function(){this.sandbox.dom.prop("#copy-locale-copy","checked",!0)}.bind(this)),this.sandbox.start([{name:"select@husky",options:{el:"#copy-locale-overlay-select",instanceName:"copy-locale-to",defaultLabel:d.call(this,"selectDefault"),data:f.concreteLanguages}}]),h.promise()}}});