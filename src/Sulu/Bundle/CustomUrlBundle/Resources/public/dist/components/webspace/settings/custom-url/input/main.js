define(["underscore","jquery","services/husky/util"],function(a,b,c){"use strict";var d={templates:{input:'<div class="input-part"><input type="text" class="form-element<% if (!!prefix) { %> prefix" data-prefix="true"<% } else { %>" data-suffix="true"<% } %>/></div>'}},e=function(a){if(!a)return[];a.indexOf("*",a.length-1)===-1&&(a+="/*");var b,c=a;for(b=c.replace(/^([^\/]*)\*/,"$1"+this.templates.input({prefix:!0}));c!==b;)c=b,b=c.replace(/^([^\/]*)\*/,"$1"+this.templates.input({prefix:!0}));return c=b,c=c.replace(/\*/g,this.templates.input({prefix:!1})),c=c.replace(/<\/div>([^>]*)<div/g,'</div><div class="domain-part">$1</div><div'),c=c.replace(/^([^>]*)<div/,'<div class="domain-part">$1</div><div')},f="sulu.webspace-settings.custom-url.";return{defaults:d,events:{names:{setBaseDomain:{postFix:"set-base-domain",type:"on"}},namespace:f},initialize:function(){this.render(this.options.baseDomain),this.setDomData(this.$el.data("custom-url-data")||{}),this.bindDomEvents(),this.bindCustomEvents()},bindCustomEvents:function(){this.events.setBaseDomain(this.setBaseDomain.bind(this))},bindDomEvents:function(){this.$el.on("data-changed",function(){this.setDomData(this.$el.data("custom-url-data"))}.bind(this)),this.$el.on("change","input",function(){this.$el.data("custom-url-data",this.getData())}.bind(this))},render:function(a){this.baseDomain=a,null!==this.baseDomain&&(this.html(e.call(this,this.baseDomain)),this.$find(".domain-part").each(function(){var a=b(this).text();a.length>15&&b(this).text(c.cropMiddle(a,15))}))},setBaseDomain:function(a){var b=this.getData();this.render(a),this.setDomData(b)},getData:function(){var c=b('input[data-prefix="true"]').val()||"",d=a.map(b('input[data-suffix="true"]'),function(a){return b(a).val()});return{prefix:c,suffix:d}},setDomData:function(c){b('input[data-prefix="true"]').val(c.prefix||""),a.each(b('input[data-suffix="true"]'),function(a,d){b(a).val(c.suffix[d]||"")}),this.$el.data("custom-url-data",this.getData())}}});