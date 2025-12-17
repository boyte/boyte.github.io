import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.0yr9KlQE.js";import{T as a}from"./theme-toggle.fJvuBA2H.js";import{c as r}from"./createLucideIcon.3Cbww-eQ.js";import"./button.BAheD-6Y.js";import"./index.B7WwCSsC.js";import"./utils.CBfrqCZ4.js";/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],l=r("menu",d);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],m=r("search",h);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],p=r("x",x),i=[{title:"Writing",href:"/writing",count:15,density:"high"},{title:"Library",href:"/library",count:12,density:"high"},{title:"Projects",href:"/projects",count:3,density:"low"},{title:"About",href:"/about",count:0,density:"none"}];function k({currentPage:o}){const[s,n]=c.useState(!1);return e.jsx("header",{className:"border-b",children:e.jsxs("div",{className:"container",children:[e.jsxs("nav",{className:"flex items-center justify-between h-16",children:[e.jsx("a",{href:"/",className:"font-semibold text-lg",children:"Cody Boyte"}),e.jsxs("div",{className:"hidden md:flex items-center gap-8",children:[i.map(t=>e.jsx("a",{href:t.href,className:`text-sm hover:text-primary transition-colors ${o===t.href?"text-foreground":"text-muted-foreground"}`,style:{fontVariationSettings:t.density==="high"?"'wght' 500":t.density==="medium"?"'wght' 450":"'wght' 400"},children:t.title},t.title)),e.jsxs("button",{id:"search-trigger",className:"flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors","aria-label":"Search",children:[e.jsx(m,{className:"size-4"}),e.jsx("span",{className:"hidden lg:inline",children:"Search"}),e.jsx("kbd",{className:"hidden lg:inline px-1.5 py-0.5 text-xs bg-background border border-border rounded ml-1",children:"⌘K"})]}),e.jsx(a,{})]}),e.jsx("button",{onClick:()=>n(!s),className:"md:hidden p-2","aria-label":"Toggle menu",children:s?e.jsx(p,{className:"size-5"}):e.jsx(l,{className:"size-5"})})]}),s&&e.jsx("div",{className:"md:hidden border-t py-4",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[i.map(t=>e.jsx("a",{href:t.href,onClick:()=>n(!1),className:"text-sm hover:text-primary transition-colors",children:t.title},t.title)),e.jsx("div",{className:"pt-4 border-t",children:e.jsx(a,{})})]})})]})})}export{k as default};
