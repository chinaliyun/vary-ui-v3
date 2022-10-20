import{_ as s,o as a,c as e,f as t,a as n}from"./app.6f714696.js";const i={},p=n(`<h1 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h1><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">install</span> vary-ui-v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),o=n(`<h2 id="vue3-\u9879\u76EE\u5F15\u5165\u7EC4\u4EF6\u5E93" tabindex="-1"><a class="header-anchor" href="#vue3-\u9879\u76EE\u5F15\u5165\u7EC4\u4EF6\u5E93" aria-hidden="true">#</a> Vue3 \u9879\u76EE\u5F15\u5165\u7EC4\u4EF6\u5E93</h2><p>\u5982\u679C\u662F\u5355\u7EAF\u7684<code>Vue SPA</code>\u9879\u76EE\u4E2D\u5F15\u7528\u8BE5\u7EC4\u4EF6\u5E93, \u76F4\u63A5\u5728\u5165\u53E3\u6587\u4EF6<code>main.js</code>\u4E2D\u5F15\u5165\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>createApp<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> VaryUI <span class="token keyword">from</span> <span class="token string">&quot;vary-ui&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&quot;./App.vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VaryUI<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// options</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function c(u,l){return a(),e("div",null,[p,t(` ## Nuxt \u9879\u76EE\u5F15\u5165\u7EC4\u4EF6\u5E93

\u5982\u679C\u662F\u5728 Nuxt \u9879\u76EE\u4E2D\u5F15\u7528\`vary-ui\`\u7EC4\u4EF6\u5E93, \u63A8\u8350\u5728\`plugin\`\u76EE\u5F55\u4E2D\u4E3A\`vary-ui\`\u521B\u5EFA\u5355\u72EC\u7684\u63D2\u4EF6, \u7136\u540E\u5728\`nuxt.config.js\`\u6587\u4EF6\u4E2D\u5F15\u7528\u5B83

\`\`\`js
// /plugin/vary-ui.js
import Vue from "vue";
import VaryUI from "vary-ui";

Vue.use(VaryUI, {
  // options
});
\`\`\`

\`nuxt.config.js\`\u4E2D\u5F15\u5165\u7EC4\u4EF6\u65F6, \u4E00\u5B9A\u8981\u5141\u8BB8**\u5728\u670D\u52A1\u7AEF\u6E32\u67D3**, \u5426\u5219\`Nuxt\`\u4F1A\u8B66\u544A\u670D\u52A1\u7AEF\u6E32\u67D3\u7684 DOM \u4E0E\u5BA2\u6237\u7AEF DOM \u4E0D\u4E00\u81F4; \u9664\u4E86\u5F15\u5165\u8BE5\u63D2\u4EF6\u5916, \`vary-ui\`\u4E2D\u4F7F\u7528\u4E86\u5927\u91CF\u7684\`ES6\`\u8BED\u6CD5, \u6240\u4EE5\u5F15\u7528\u7684\u65F6\u5019,\u9700\u8981\u6307\u5B9A\u8BE5 UI \u5E93\u4F7F\u7528\`babel\`\u7F16\u8BD1

\`\`\`js
// nuxt.config.js
export default {
  plugins: [
    {
      src: "~/plugins/vary-ui",
      ssr: true,
    },
  ];

  build: {
    transpile: ['vary-ui''],
  },
}
\`\`\` `),o])}const d=s(i,[["render",c],["__file","install.html.vue"]]);export{d as default};
