import{_ as l,r as o,o as _,g as p,w as e,e as n,b as i,t as s}from"./app.6f714696.js";const m={name:"TableSlot",data(){return{columns:[{prop:"id",label:"ID"},{prop:"name",label:"\u59D3\u540D"},{prop:"info",label:"\u4FE1\u606F"}],data:[{id:1,name:"\u5F20\u4E09",age:20,sex:"\u7537"},{id:2,name:"\u674E\u56DB",age:22,sex:"\u5973"},{id:3,name:"\u738B\u4E94",age:21,sex:"\u7537"}]}}};function d(f,u,x,b,a,g){const r=o("var-scene"),c=o("var-table");return _(),p(c,{columns:a.columns,data:a.data,center:""},{info_th:e(()=>[n(" \u8BE6\u7EC6\u4FE1\u606F ")]),info:e(({row:t})=>[i(r,{flex:"",center:""},{default:e(()=>[n("\u5E74\u9F84:"+s(t.age)+" \u6027\u522B:"+s(t.sex),1)]),_:2},1024)]),_:1},8,["columns","data"])}const S=l(m,[["render",d],["__file","Slot.vue"]]);export{S as default};