import{_ as c,r as s,o,c as u,b as t,d as a,e as n,a as p}from"./app.6f714696.js";const i={},d=a("h1",{id:"card-\u5361\u7247",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#card-\u5361\u7247","aria-hidden":"true"},"#"),n(" Card \u5361\u7247")],-1),r=a("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#"),n(" \u57FA\u7840\u7528\u6CD5")],-1),k=a("p",null,[a("code",null,"title"),n("\u5C5E\u6027\u7528\u6765\u8BBE\u7F6E\u5361\u7247\u7684\u6807\u9898, "),a("code",null,"shadow"),n("\u7528\u6765\u6253\u5F00\u5361\u7247\u7684\u9634\u5F71\u6548\u679C")],-1),v=a("br",null,null,-1),g=p(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-card</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\u6807\u9898<span class="token punctuation">&quot;</span></span> <span class="token attr-name">shadow</span><span class="token punctuation">&gt;</span></span> \u5361\u7247\u5185\u5BB9 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-card</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;CardBase&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u526F\u6807\u9898\u63D2\u69FD" tabindex="-1"><a class="header-anchor" href="#\u526F\u6807\u9898\u63D2\u69FD" aria-hidden="true">#</a> \u526F\u6807\u9898\u63D2\u69FD</h2><p>\u7EC4\u4EF6\u63D0\u4F9B\u4E86<code>subtitle</code>\u63D2\u69FD, \u4F5C\u4E3A\u5361\u7247\u7684\u526F\u6807\u9898, \u8981\u6CE8\u610F\u7684\u662F: \u526F\u6807\u9898\u63D2\u69FD\u4E0D\u63D0\u4F9B\u4EFB\u4F55\u6837\u5F0F, \u6240\u6709\u7684\u6837\u5F0F\u90FD\u7531\u7528\u6237\u5B9A\u4E49</p><br>`,4),h=p(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-card</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\u6807\u9898<span class="token punctuation">&quot;</span></span> <span class="token attr-name">shadow</span><span class="token punctuation">&gt;</span></span>
    \u5361\u7247\u5185\u5BB9
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#subtitle</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>subtitle<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u526F\u6807\u9898<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-card</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;CardSubTitle&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.subtitle</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>34<span class="token punctuation">,</span> 164<span class="token punctuation">,</span> 197<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h2><table><thead><tr><th>name</th><th>\u9ED8\u8BA4\u503C</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>title</td><td>null</td><td>\u6807\u9898</td></tr><tr><td>shadow</td><td>false</td><td>\u662F\u5426\u6253\u5F00\u9634\u5F71</td></tr></tbody></table><h2 id="slots" tabindex="-1"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> slots</h2><table><thead><tr><th>name</th><th>\u9ED8\u8BA4\u503C</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>default</td><td>null</td><td>\u5361\u7247\u5185\u5BB9</td></tr><tr><td>subtitle</td><td>null</td><td>\u526F\u6807\u9898\u63D2\u69FD</td></tr></tbody></table>`,5);function m(b,_){const e=s("Card-Base"),l=s("Card-SubTitle");return o(),u("div",null,[d,r,k,v,t(e),g,t(l),h])}const y=c(i,[["render",m],["__file","card.html.vue"]]);export{y as default};