import{_ as s,r as e,o as p,c as o,b as c,d as a,e as n,a as l}from"./app.6f714696.js";const d={},u=a("h1",{id:"textarea-\u591A\u884C\u6587\u672C\u8F93\u5165\u6846",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#textarea-\u591A\u884C\u6587\u672C\u8F93\u5165\u6846","aria-hidden":"true"},"#"),n(" Textarea \u591A\u884C\u6587\u672C\u8F93\u5165\u6846")],-1),i=a("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#"),n(" \u57FA\u7840\u7528\u6CD5")],-1),r=a("p",null,[n("\u4EE5\u4E0B\u6848\u4F8B\u4E2D\u5C55\u793A\u4E86\u5982\u4F55\u8FDB\u884C\u6570\u636E\u7684\u53CC\u5411\u7ED1\u5B9A, \u4EE5\u53CA\u901A\u8FC7"),a("code",null,"w,h"),n("\u5FEB\u901F\u6307\u5B9A\u7EC4\u4EF6\u5BBD\u9AD8\u5C3A\u5BF8, \u8FD8\u6709\u901A\u8FC7"),a("code",null,"prefix,suffix"),n("\u6307\u5B9A\u7EC4\u4EF6\u7684\u524D\u540E\u63D2\u69FD")],-1),k=a("br",null,null,-1),h=l(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-textarea</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>detail<span class="token punctuation">&quot;</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\u8BF7\u8F93\u5165<span class="token punctuation">&quot;</span></span> <span class="token attr-name">w</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>200<span class="token punctuation">&quot;</span></span> <span class="token attr-name">h</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>50<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#prefix</span><span class="token punctuation">&gt;</span></span> prefix <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#suffix</span><span class="token punctuation">&gt;</span></span> suffix <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-textarea</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;TextareaBase&quot;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">detail</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h2><table><thead><tr><th>name</th><th>default</th><th>desc</th></tr></thead><tbody><tr><td><code>w,width</code></td><td>null</td><td>\u5B9A\u4E49\u7EC4\u4EF6\u5BBD\u5EA6</td></tr><tr><td><code>h,height</code></td><td>null</td><td>\u5B9A\u4E49\u7EC4\u4EF6\u9AD8\u5EA6</td></tr><tr><td><code>placeholder</code></td><td>null</td><td>\u5B9A\u4E49\u63D0\u793A\u8BED</td></tr><tr><td><code>disabled</code></td><td>null</td><td>\u5B9A\u4E49\u7EC4\u4EF6\u662F\u5426\u53EF\u7528</td></tr></tbody></table><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> methods</h2><table><thead><tr><th>name</th><th>desc</th></tr></thead><tbody><tr><td><code>focus</code></td><td>\u7EC4\u4EF6\u83B7\u5F97\u7126\u70B9\u4E8B\u4EF6</td></tr><tr><td><code>blur</code></td><td>\u7EC4\u4EF6\u5931\u53BB\u7126\u70B9\u4E8B\u4EF6</td></tr><tr><td><code>change</code></td><td>\u7EC4\u4EF6\u7684\u503C\u53D1\u751F\u6539\u53D8\u4E8B\u4EF6</td></tr></tbody></table><h2 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> slots</h2><table><thead><tr><th>name</th><th>desc</th></tr></thead><tbody><tr><td><code>prefix</code></td><td>\u524D\u7F6E\u63D2\u69FD</td></tr><tr><td><code>suffix</code></td><td>\u540E\u7F6E\u63D2\u69FD</td></tr></tbody></table>`,7);function v(m,g){const t=e("Textarea-Base");return p(),o("div",null,[u,i,r,k,c(t),h])}const x=s(d,[["render",v],["__file","textarea.html.vue"]]);export{x as default};