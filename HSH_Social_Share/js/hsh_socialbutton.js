// Social Sharing Buttons with Counts by Harman Singh Hira @ Design Devta
// Site: www.DesignDevta.Blgspot.Com
// Blog: www.HSinghHira.Blogspot.Com
// EMail: Cartw3@Gmail.Com

(function(){!function(t){"DesignDevta";var o;return o=t,o.fn.HSHSocialButton=function(t,n){var e,r,l,u,a,i,s,c,h,p,d;for(null==n&&(n={}),e=o.extend({},{url:document.location.href,text:o("title").html(),imgDir:"http://hsinghhira.github.io/DesignDevta/HSH_Social_Share/img",buttonSpace:24,countPosition:{top:-6,right:-6},countColor:{text:"#ffffff",bg:"#cc0000",textHover:"#ffffff",bgHover:"#ff6666",border:"#ffffff"},countSize:11,popupWindow:{width:640,height:480}},n),e.urlOrg=e.url,e.url=encodeURIComponent(e.urlOrg),e.text=encodeURIComponent(e.text),r=44,a=4,s=/https/.test(document.location.protocol)?"https":"http",u=function(t,o){var n;return null==o&&(o=!1),n=""+s+"://query.yahooapis.com/v1/public/yql?env=http://datatables.org/alltables.env&q="+encodeURIComponent("SELECT content FROM data.headers WHERE url='"+t+"' and ua='Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1)'"),o&&(n+="&format=json"),n},c={twitter:{img:"twitter_2x.png",alt:"Twitter Share Button",shareUrl:"https://twitter.com/share?text="+e.text+" - "+e.url+" via @HSinghHira",commentUrl:"https://twitter.com/search/?q="+e.url,countUrl:"http://urls.api.twitter.com/1/urls/count.json?url="+e.url,jsonpFunc:function(t,o){var n;return o(null!=(n=t.count)?n:0)}},facebook:{img:"facebook_2x.png",alt:"Facebook Share Button",shareUrl:"https://www.facebook.com/sharer.php?u="+e.url+"&t="+e.text,countUrl:"https://graph.facebook.com/"+e.url,jsonpFunc:function(t,n){var r,l;return null!=t.shares?n(t.shares):(r=null!=(l=t.likes)?l:0,o.ajax({url:"https://graph.facebook.com/fql?q="+encodeURIComponent("SELECT total_count FROM link_stat WHERE url='"+e.urlOrg+"'"),dataType:"jsonp"}).done(function(t){var o,e,l;return o=null!=(e=null!=(l=t.data[0])?l.total_count:void 0)?e:0,n(r+o)}))}},gplus:{img:"google+1_2x.png",alt:"Google Plus Share Button",shareUrl:"https://plusone.google.com/share?url="+e.url,countUrl:u("https://plusone.google.com/_/+1/fastbutton?hl=ja&url="+e.urlOrg),jsonpFunc:function(t,o){var n,e,r;return n=0,(null!=(r=t.query)?r.count:void 0)>0&&(e=t.results[0].match(/window\.__SSR = {c: ([\d]+)/),null!=e&&(n=e[1])),o(n)}},pocket:{img:"pocket_2x.png",alt:"Pocket Stock Button",shareUrl:"https://getpocket.com/save?url="+e.url+"&title="+e.text,countUrl:u("https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&align=left&v=1&url="+e.urlOrg+"&src="+e.urlOrg+"&r="+1e8*Math.random()),jsonpFunc:function(t,o){var n,e,r;return n=0,(null!=(r=t.query)?r.count:void 0)>0&&(e=t.results[0].match(/em id="cnt"&gt;(\d+)&lt;/),null!=e&&(n=e[1])),o(n)}},feedly:{img:"feedly_2x.png",alt:"Feedly Follow Button",shareUrl:"https://feedly.com/index.html#subscription%2Ffeed%2F"+e.feedUrl,countUrl:u("https://cloud.feedly.com/v3/feeds/feed%2F"+encodeURIComponent(e.feedUrl),!0),jsonpFunc:function(t,o){var n,e,r,l,u,a;return o(null!=(n=null!=t&&null!=(e=t.query)&&null!=(r=e.results)&&null!=(l=r.resources)&&null!=(u=l.content)&&null!=(a=u.json)?a.subscribers:void 0)?n:0)}},github:{img:"github_alt_2x.png",alt:"GitHub Repository",shareUrl:"https://github.com/"+e.githubRepo,commentUrl:"https://github.com/"+e.githubRepo+"/stargazers",countUrl:"https://api.github.com/repos/"+e.githubRepo,jsonpFunc:function(t,o){var n,e;return o(null!=(n=null!=t&&null!=(e=t.data)?e.watchers:void 0)?n:0)}},addit:{img:"addit_2x.png",alt:"Add it to your Site",shareUrl:"http://designdevta.blogspot.com/2015/07/awesome-social-share-buttons-with-count.html"}},h=function(t){return function(n,l,u){var i,s,c,h,p;return p=o("<div/>").attr({"class":"hsh-socialbutton-wrap "+n}).css({"float":"left",position:"relative",width:r,height:r,marginTop:a}),u>0&&p.css({marginLeft:e.buttonSpace}),h=o("<a/>").attr({href:l.shareUrl,"class":"hsh-socialbutton-share",target:"_blank"}).css({outline:"none",display:"block",width:"100%",height:"100%"}),c=o("<img/>").attr({src:""+e.imgDir+"/"+l.img,alt:l.alt}).css({border:"none"}),s=l.commentUrl?"a":"span",i=o("<"+s+"/>").attr({"class":"hsh-socialbutton-count"}),"a"===s?i.attr({href:l.commentUrl,target:"_blank"}):i.css({cursor:"default"}),i.css(o.extend({},{display:"none",position:"absolute",color:e.countColor.text,backgroundColor:e.countColor.bg,border:"solid 0px "+e.countColor.border,fontSize:e.countSize,textDecoration:"none",outline:"none",fontWeight:"200",padding:"0 4px",borderRadius:6,zIndex:1},e.countPosition)),p.append(h.append(c)).append(i),o(t).append(p),o.ajax({url:l.countUrl,dataType:"jsonp"}).done(function(t){return l.jsonpFunc(t,function(t){return i.show().text(t)})})}}(this),l=p=0,d=t.length;d>p;l=++p)i=t[l],null!=c[i]&&h(i,c[i],l);return o(this).height(r+a),o(this).find(".hsh-socialbutton-share").click(function(){var t,n;return/(github|feedly|addit)/.test(o(this).parent().attr("class"))?!0:(n=screen.height/2-e.popupWindow.height/2,t=screen.width/2-e.popupWindow.width/2,window.open(this.href,"","width="+e.popupWindow.width+", height="+e.popupWindow.height+", top="+n+", left="+t),!1)}),o(this).find("a.hsh-socialbutton-count").mouseenter(function(){return o(this).css({color:e.countColor.textHover,backgroundColor:e.countColor.bgHover})}).mouseleave(function(){return o(this).css({color:e.countColor.text,backgroundColor:e.countColor.bg})}),o(this).find(".hsh-socialbutton-wrap").mouseenter(function(){return o(this).stop().animate({marginTop:0},100,"swing")}).mouseleave(function(){return o(this).stop().animate({marginTop:4},100,"swing")})}}(jQuery)}).call(this);