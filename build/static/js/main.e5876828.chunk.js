(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{247:function(e,t,n){var a=n(531),o=n(250);e.exports.writePhotoToStorage=function(e,t,n){var i=t.type.split("/").pop();console.log(i);var c=new FileReader;c.onload=function(n){var c=n.target.result,r=a.MD5(c).toString();console.log("".concat(r,".").concat(i)),e.putFile("".concat(r,".").concat(i),t,{encrypt:!1}).then(function(e){o.writeUrlToFeed(e,function(e){console.log(e)})})},c.readAsBinaryString(t)}},250:function(e,t,n){var a=n(555),o="https://itk6d69p5b.execute-api.us-east-2.amazonaws.com/prod/feed",i=function(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)};e.exports.getFeed=function(e){a.get(o).then(function(t){"200"==t.status?e(JSON.parse(t.data.body)):(console.log(JSON.stringify(t)),e(!1))}).catch(function(t){console.log(t),e(!1)})},e.exports.writeUrlToFeed=function(e,t){i(e)?a.put(o,{url:e}).then(function(e){"200"==e.status?t(!0):(console.log(JSON.stringify(e)),t(!1))}).catch(function(e){console.log(e),t(!1)}):(console.log("not a valid url"),t(!1))}},259:function(e,t,n){},263:function(e,t,n){e.exports=n(577)},281:function(e,t){},283:function(e,t){},299:function(e,t){},301:function(e,t){},465:function(e,t){},530:function(e,t,n){e.exports=n.p+"static/media/image.7924ace9.jpg"},576:function(e,t,n){},577:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(260),c=n.n(i),r=n(579),s=n(27),l=n(28),u=n(30),d=n(29),p=n(31),h=n(56),m=n(67),g=(n(529),n(530),n(107)),f=n(247),b="https://s3.amazonaws.com/onename/avatar-placeholder.png",v=(a.Component,function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.handleSignIn;return o.a.createElement("div",{className:"panel-landing",id:"section-1"},o.a.createElement("h1",{className:"landing-heading"},"Hello, Blockstack!"),o.a.createElement("p",{className:"lead"},o.a.createElement("button",{className:"btn btn-primary btn-lg",id:"signin-button",onClick:e.bind(this)},"Sign In with Blockstack")))}}]),t}(a.Component)),y=n(261),O=(n(259),function(e){function t(e){return Object(s.a)(this,t),Object(u.a)(this,Object(d.a)(t).call(this,e))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return console.log(this.props.feed),o.a.createElement("div",{style:{backgroundColor:"grey"}},o.a.createElement("div",{onClick:function(){e.props.history.push("/camey")},style:{position:"fixed",bottom:"0",backgroundColor:"#1976d2",right:"40%",height:"150px",width:"150px",marginBottom:"80px",borderRadius:"50%",boxShadow:"0px 3px 5px rgba(0,0,0,0.3"}}),o.a.createElement("div",null,this.props.feed.map(function(e,t){return o.a.createElement("div",{style:{borderBottom:"5px solid black"}},o.a.createElement("img",{src:e.url,className:"item",key:t}))})))}}]),t}(a.Component)),j=n(247),S=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).takeASnap=n.takeASnap.bind(Object(h.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("video");navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:!0}).then(function(t){e.srcObject=t,e.play()})}},{key:"takeASnap",value:function(){var e=this,t=document.querySelector("video"),n=document.createElement("canvas"),a=n.getContext("2d");n.width=t.videoWidth,n.height=t.videoHeight,a.drawImage(t,0,0),n.toBlob(function(t){j.writePhotoToStorage(e.props.userSession,new File([t],"".concat(Math.floor(1e5*Math.random())+1).concat(Date.now(),".jpeg"),{type:"image/jpeg",lastModified:Date.now()}))},"image/jpeg")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("video",{id:"video",width:"100%",height:"100%",autoPlay:!0}),o.a.createElement("div",{style:{position:"fixed",bottom:"0",backgroundColor:"#1976d2",right:"40%"}},o.a.createElement("button",{id:"snap",onClick:function(){e.takeASnap()}},"Snap Photo")),o.a.createElement("canvas",{id:"canvas",width:"100%",height:"100%"}))}}]),t}(a.Component),w=n(580),k=n(581),E=function(e){function t(e){return Object(s.a)(this,t),Object(u.a)(this,Object(d.a)(t).call(this,e))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(w.a,null,o.a.createElement(k.a,Object(y.a)({exact:!0,path:"/scrolly",component:function(t){return o.a.createElement(O,Object.assign({},t,{feed:e.props.feed}))}},"path","/")),o.a.createElement(k.a,{exact:!0,path:"/camey",component:function(){return o.a.createElement(S,{userSession:e.props.userSession,path:"/camey"})}}))}}]),t}(a.Component),x=n(250),C=new m.AppConfig(["store_write","publish_data"]),I=new m.UserSession({appConfig:C}),D=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={feed:[]},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleSignIn",value:function(e){e.preventDefault(),I.redirectToSignIn()}},{key:"handleSignOut",value:function(e){e.preventDefault(),I.signUserOut(window.location.origin)}},{key:"render",value:function(){return o.a.createElement("div",null,I.isUserSignedIn()?o.a.createElement(r.a,null,o.a.createElement(E,{userSession:I,feed:this.state.feed})):o.a.createElement(v,{userSession:I,handleSignIn:this.handleSignIn}))}},{key:"componentDidMount",value:function(){var e=this;x.getFeed(function(t){e.setState({feed:t})}),I.isSignInPending()&&I.handlePendingSignIn().then(function(t){window.history.replaceState({},document.title,"/"),e.setState({userData:t})})}}]),t}(a.Component);n(575),n(576);c.a.render(o.a.createElement(r.a,null,o.a.createElement(D,null)),document.getElementById("root"))}},[[263,1,2]]]);
//# sourceMappingURL=main.e5876828.chunk.js.map