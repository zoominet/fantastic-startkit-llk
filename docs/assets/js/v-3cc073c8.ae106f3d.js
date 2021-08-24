"use strict";(self.webpackChunkfantastic_template_docs=self.webpackChunkfantastic_template_docs||[]).push([[247],{9589:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-3cc073c8",path:"/mobile-support.html",title:"移动端支持",lang:"en-US",frontmatter:{},excerpt:"",headers:[],filePathRelative:"mobile-support.md",git:{updatedTime:1626016179e3,contributors:[{name:"hooray",email:"304327508@qq.com",commits:1}]}}},6754:(n,s,a)=>{a.r(s),a.d(s,{default:()=>i});var p=a(6359);const e=(0,p._)("h1",{id:"移动端支持",tabindex:"-1"},[(0,p._)("a",{class:"header-anchor",href:"#移动端支持","aria-hidden":"true"},"#"),(0,p.Uk)(" 移动端支持")],-1),t=(0,p.Uk)("模板支持使用 vw/vh 做为移动端的布局单位，并默认集成了 "),o={href:"https://www.npmjs.com/package/postcss-px-to-viewport",target:"_blank",rel:"noopener noreferrer"},c=(0,p.Uk)("postcss-px-to-viewport"),l=(0,p.Uk)(" 插件。"),r=(0,p.uE)('<p>使用也很简单，只需将根目录下的 <code>.postcss.config.js</code> 文件修改为 <code>postcss.config.js</code> 即可，文件内具体配置信息可根据项目实际调整：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n    plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&#39;postcss-px-to-viewport&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 需要转换的单位，默认为 px</span>\n            unitToConvert<span class="token operator">:</span> <span class="token string">&#39;px&#39;</span><span class="token punctuation">,</span>\n            <span class="token comment">// 视窗的宽度，对应的是我们设计稿的宽度</span>\n            viewportWidth<span class="token operator">:</span> <span class="token number">750</span><span class="token punctuation">,</span>\n            <span class="token comment">// 指定 px 转换为视窗单位值的小数位数（很多时候无法整除）</span>\n            unitPrecision<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n            <span class="token comment">// 能转化为 vw 的属性列表</span>\n            propList<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token comment">// 指定需要转换成的视窗单位，建议使用 vw</span>\n            viewportUnit<span class="token operator">:</span> <span class="token string">&#39;vw&#39;</span><span class="token punctuation">,</span>\n            <span class="token comment">// 字体使用的视口单位</span>\n            fontViewportUnit<span class="token operator">:</span> <span class="token string">&#39;vw&#39;</span><span class="token punctuation">,</span>\n            <span class="token comment">// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名</span>\n            selectorBlackList<span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token string">&#39;.ignore&#39;</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token comment">// 小于或等于 1px 不转换为视窗单位，你也可以设置为你想要的值</span>\n            minPixelValue<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n            <span class="token comment">// 允许在媒体查询中转换 px</span>\n            mediaQuery<span class="token operator">:</span> <span class="token boolean">false</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>最后在开发中就可以直接使用 px 了，最终输出就是 vw 。</p>',3),i={render:function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[e,(0,p._)("p",null,[t,(0,p._)("a",o,[c,(0,p.Wm)(a)]),l]),r],64)}}}}]);