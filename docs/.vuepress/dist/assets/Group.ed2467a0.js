import{_ as m,r as o,o as t,g as s,w as n,b as c,c as p,i as f,F as v,d as x,t as d,e as b}from"./app.6f714696.js";const k={name:"CheckboxGroup",data(){return{data:[{id:1,name:"\u7BEE\u7403"},{id:2,name:"\u8DB3\u7403"},{id:3,name:"\u6392\u7403"}],selected:[]}}};function V(B,r,g,h,e,w){const _=o("var-checkbox"),l=o("var-scene"),u=o("var-field");return t(),s(u,{label:"\u7231\u597D:"},{default:n(()=>[c(l,{flex:"",middle:""},{default:n(()=>[(t(!0),p(v,null,f(e.data,a=>(t(),s(_,{key:a.id,modelValue:e.selected,"onUpdate:modelValue":r[0]||(r[0]=i=>e.selected=i),label:a.name},{default:n(()=>[b(d(a.name),1)]),_:2},1032,["modelValue","label"]))),128)),c(l,{w:"10"}),x("div",null,"\u60A8\u7684\u9009\u62E9\u7ED3\u679C\u662F: "+d(e.selected.join(",")),1)]),_:1})]),_:1})}const G=m(k,[["render",V],["__file","Group.vue"]]);export{G as default};