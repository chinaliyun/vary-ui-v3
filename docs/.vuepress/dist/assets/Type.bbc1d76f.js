import{_ as c,r as i,o as u,c as p,b as o,w as l,e as t}from"./app.6f714696.js";const f={name:"AlertType",methods:{async alert(a="success"){try{await this.$alert[a]({title:`${a}\u7C7B\u578B\u7684 Alert \u786E\u8BA4\u6846:`,content:"\u786E\u5B9A\u8981\u5220\u9664\u5F53\u524D\u6587\u7AE0\u5417",cancelText:"\u53D6\u6D88"}),console.log("\u7528\u6237\u70B9\u51FB\u4E86\u786E\u5B9A\u6309\u94AE")}catch(e){e.cancel&&console.log("\u7528\u6237\u901A\u8FC7\u53D6\u6D88\u6309\u94AE\u5173\u95ED\u4E86\u5F39\u7A97"),e.close&&console.log("\u7528\u6237\u901A\u8FC7\u70B9\u51FB\u906E\u7F69\u5C42\u6216\u8005\u53F3\u4E0A\u89D2\u7684\u5173\u95ED\u6309\u94AE\u5173\u95ED\u4E86\u5F39\u7A97")}}}};function d(a,e,m,_,v,r){const n=i("var-button");return u(),p("div",null,[o(n,{onClick:e[0]||(e[0]=s=>r.alert("success")),primary:""},{default:l(()=>[t("\u70B9\u51FB\u6253\u5F00 success \u7C7B\u578B\u5F39\u7A97")]),_:1}),t(" \xA0 "),o(n,{onClick:e[1]||(e[1]=s=>r.alert("warning")),primary:""},{default:l(()=>[t(" \u70B9\u51FB\u6253\u5F00 warning \u7C7B\u578B\u5F39\u7A97 ")]),_:1}),t(" \xA0 "),o(n,{onClick:e[2]||(e[2]=s=>r.alert("error")),primary:""},{default:l(()=>[t(" \u70B9\u51FB\u6253\u5F00 error \u7C7B\u578B\u5F39\u7A97 ")]),_:1}),t(" \xA0 "),o(n,{onClick:e[3]||(e[3]=s=>r.alert("tips")),primary:""},{default:l(()=>[t(" \u70B9\u51FB\u6253\u5F00 tips \u7C7B\u578B\u5F39\u7A97 ")]),_:1})])}const k=c(f,[["render",d],["__file","Type.vue"]]);export{k as default};