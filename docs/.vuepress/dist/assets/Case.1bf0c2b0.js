import{_ as p,r as u,o,c as r,b as m,d as f,F as v,i as h,t as l}from"./app.6f714696.js";function g(e){return new Promise(s=>{let a=0;e.progress(0);let t=setInterval(()=>{a+=Math.random()*.2,a>1&&(a=1,clearInterval(t),t=null),e.progress(a),a===1&&s(e)},500+Math.random()*1e3)})}const y={name:"UploadCase",data(){return{files:[]}},methods:{async upload(e){this.files=e,await Promise.all(e.map(s=>g(s)))}}},C={class:"file_list"};function x(e,s,a,t,d,_){const c=u("var-upload");return o(),r("div",null,[m(c,{upload:_.upload},null,8,["upload"]),f("div",C,[(o(!0),r(v,null,h(d.files,(n,i)=>(o(),r("div",{key:i,class:"file_item"},l(n.file.name)+" \u4E0A\u4F20\u8FDB\u5EA6:"+l(n.rate),1))),128))])])}const B=p(y,[["render",x],["__scopeId","data-v-81d09c79"],["__file","Case.vue"]]);export{B as default};