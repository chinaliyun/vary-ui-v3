import{_ as s,r as t,o as p,c as e,b as o,a}from"./app.6f714696.js";const c={},l=a('<h1 id="dialog-\u5F39\u51FA\u6846" tabindex="-1"><a class="header-anchor" href="#dialog-\u5F39\u51FA\u6846" aria-hidden="true">#</a> Dialog \u5F39\u51FA\u6846</h1><h2 id="\u57FA\u7840\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u7528\u6CD5" aria-hidden="true">#</a> \u57FA\u7840\u7528\u6CD5</h2><p>\u4E0B\u65B9\u6848\u4F8B\u4E2D, <code>title</code>\u5C5E\u6027\u7528\u6765\u8BBE\u7F6E\u5F39\u7A97\u7684\u6807\u9898,<code>visible</code>\u5C5E\u6027\u7528\u6765\u63A7\u5236\u5F39\u51FA\u6846\u7684\u663E\u793A\u4E0E\u9690\u85CF, <code>close-on-mask</code>\u5C5E\u6027\u7528\u6765\u5141\u8BB8\u70B9\u51FB\u906E\u7F69\u5C42\u7684\u65F6\u5019\u5173\u95ED\u5F39\u7A97, \u4F46\u662F<code>close-on-mask</code>\u5FC5\u987B\u4E0E<code>:visible.sync</code>\u914D\u5408\u4F7F\u7528\u624D\u80FD\u751F\u6548</p><br>',4),i=a(`<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visible = true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u70B9\u51FB\u6253\u5F00\u5F39\u7A97<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-dialog</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\u63D0\u793A<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:visible.sync</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">close-on-mask</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>var-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visible = false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u70B9\u51FB\u5173\u95ED\u5F39\u7A97<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>var-dialog</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;DialogBase&quot;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h2><table><thead><tr><th>prop</th><th>\u9ED8\u8BA4\u503C</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>visible</td><td>false</td><td>\u8BBE\u7F6E\u5F39\u7A97\u7684\u663E\u793A\u72B6\u6001</td></tr><tr><td>title</td><td>&quot;&quot;</td><td>\u8BBE\u7F6E\u5F39\u7A97\u6807\u9898</td></tr><tr><td>closeOnMask</td><td>false</td><td>\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u70B9\u51FB\u906E\u7F69\u5C42\u5173\u95ED\u5F39\u7A97</td></tr></tbody></table><h2 id="methods" tabindex="-1"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> methods</h2><table><thead><tr><th>name</th><th>\u9ED8\u8BA4\u503C</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>close</td><td>null</td><td>\u5F39\u51FA\u6846\u5173\u95ED\u4E8B\u4EF6</td></tr></tbody></table>`,5);function u(d,r){const n=t("Dialog-Base");return p(),e("div",null,[l,o(n),i])}const v=s(c,[["render",u],["__file","dialog.html.vue"]]);export{v as default};