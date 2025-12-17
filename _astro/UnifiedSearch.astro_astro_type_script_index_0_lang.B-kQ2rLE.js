class o{modal;backdrop;input;results;status;searchMode="keyword";searchIndex=null;debounceTimer=null;constructor(){this.modal=document.getElementById("search-modal"),this.backdrop=document.getElementById("search-backdrop"),this.input=document.getElementById("search-input"),this.results=document.getElementById("search-results"),this.status=document.getElementById("search-status"),this.init()}async init(){await this.loadSearchIndex(),document.getElementById("search-trigger")?.addEventListener("click",()=>this.open()),this.backdrop.addEventListener("click",()=>this.close()),document.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),this.open()),e.key==="Escape"&&!this.modal.classList.contains("hidden")&&this.close()}),this.input.addEventListener("input",()=>this.handleSearch()),document.getElementById("search-mode-keyword")?.addEventListener("click",()=>this.setMode("keyword")),document.getElementById("search-mode-semantic")?.addEventListener("click",()=>this.setMode("semantic"))}async loadSearchIndex(){try{const e=await fetch("/search-index.json");e.ok&&(this.searchIndex=await e.json())}catch(e){console.error("Failed to load search index:",e)}}open(){this.modal.classList.remove("hidden"),this.input.focus(),document.body.style.overflow="hidden"}close(){this.modal.classList.add("hidden"),this.input.value="",this.showInitialContent(),document.body.style.overflow=""}showInitialContent(){this.results.innerHTML=`
        <div id="initial-content" class="space-y-4 p-4">
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-foreground">15</div>
              <div class="text-xs text-muted-foreground">Articles</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-foreground">12</div>
              <div class="text-xs text-muted-foreground">Documents</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-foreground">3</div>
              <div class="text-xs text-muted-foreground">Projects</div>
            </div>
          </div>
          
          <div class="border-t border-border pt-4">
            <h3 class="text-xs font-medium text-muted-foreground mb-2">Recent Searches</h3>
            <div class="flex flex-wrap gap-2">
              <button class="recent-search px-2 py-1 text-xs bg-muted rounded hover:bg-muted/80">React hooks</button>
              <button class="recent-search px-2 py-1 text-xs bg-muted rounded hover:bg-muted/80">CI/CD Pipeline</button>
              <button class="recent-search px-2 py-1 text-xs bg-muted rounded hover:bg-muted/80">Scalar fields</button>
            </div>
          </div>
          
          <div class="border-t border-border pt-4">
            <h3 class="text-xs font-medium text-muted-foreground mb-2">Trending Topics</h3>
            <div class="space-y-2">
              <a href="/writing/building-custom-field-types-in-scalar" class="block text-sm hover:text-accent transition-colors">• Building Custom Field Types in Scalar</a>
              <a href="/library#event-driven-architecture" class="block text-sm hover:text-accent transition-colors">• Event-Driven Architecture</a>
              <a href="/library#meddic-sales-methodology" class="block text-sm hover:text-accent transition-colors">• MEDDIC Sales Methodology</a>
            </div>
          </div>
        </div>
      `,setTimeout(()=>{this.results.querySelectorAll(".recent-search").forEach(e=>{e.addEventListener("click",()=>{this.input.value=e.textContent||"",this.handleSearch()})})},0)}setMode(e){this.searchMode=e;const r=document.getElementById("search-mode-keyword"),t=document.getElementById("search-mode-semantic");e==="keyword"?(r?.classList.add("bg-muted","text-foreground"),r?.classList.remove("text-muted-foreground"),t?.classList.remove("bg-muted","text-foreground"),t?.classList.add("text-muted-foreground")):(t?.classList.add("bg-muted","text-foreground"),t?.classList.remove("text-muted-foreground"),r?.classList.remove("bg-muted","text-foreground"),r?.classList.add("text-muted-foreground")),this.input.value&&this.handleSearch()}handleSearch(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{const e=this.input.value.trim();if(e.length<2){this.showInitialContent();return}this.searchMode==="keyword"?this.performKeywordSearch(e):this.performSemanticSearch(e)},300)}performKeywordSearch(e){const r=e.toLowerCase(),t=[];if(!this.searchIndex){this.displayResults([]);return}this.searchIndex.articles?.forEach(s=>{if(s.searchableText?.includes(r)){const i=s.title.toLowerCase().includes(r);t.push({title:s.title,description:s.description,type:"article",url:s.url,score:i?1:.5,snippet:this.highlightMatch(s.description||s.content?.substring(0,150)||"",e)})}}),this.searchIndex.documents?.forEach(s=>{if(s.searchableText?.includes(r)){const i=s.title.toLowerCase().includes(r);t.push({title:s.title,description:s.description,type:"document",url:s.url,score:i?.9:.4,snippet:this.highlightMatch(s.description||"",e)})}}),this.searchIndex.projects?.forEach(s=>{if(s.searchableText?.includes(r)){const i=s.title.toLowerCase().includes(r);t.push({title:s.title,description:s.description,type:"project",url:s.url,score:i?.9:.4,snippet:this.highlightMatch(s.description||"",e)})}}),t.sort((s,i)=>(i.score||0)-(s.score||0)),this.displayResults(t.slice(0,20))}async performSemanticSearch(e){this.status.classList.remove("hidden"),this.status.querySelector("#status-text").textContent="Performing semantic search...",await new Promise(t=>setTimeout(t,500));const r=[{title:"Building Custom Field Types in Scalar",description:"Learn how to extend Scalar with custom field types",type:"article",url:"/writing/building-custom-field-types-in-scalar",score:.95,snippet:"Comprehensive guide to creating and implementing custom field types..."}];this.status.classList.add("hidden"),this.displayResults(r)}highlightMatch(e,r){const t=new RegExp(`(${r})`,"gi");return e.replace(t,"<mark>$1</mark>")}displayResults(e){if(e.length===0){this.results.innerHTML=`
          <div class="text-center py-8 text-muted-foreground">
            No results found. Try a different search term.
          </div>
        `;return}const r=e.map(t=>`
        <a href="${t.url}" class="block px-3 py-3 hover:bg-muted rounded-lg transition-colors group">
          <div class="flex items-start gap-3">
            <div class="mt-1">
              ${this.getIcon(t.type)}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                  ${t.title}
                </h3>
                <span class="text-xs px-2 py-0.5 bg-muted rounded capitalize">
                  ${t.type}
                </span>
              </div>
              ${t.snippet?`
                <p class="text-sm text-muted-foreground mt-1 line-clamp-2">
                  ${t.snippet}
                </p>
              `:""}
            </div>
            ${t.score&&this.searchMode==="semantic"?`
              <div class="text-xs text-muted-foreground">
                ${Math.round(t.score*100)}%
              </div>
            `:""}
          </div>
        </a>
      `).join("");this.results.innerHTML=r}getIcon(e){switch(e){case"article":return'<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>';case"document":return'<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>';case"project":return'<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>';default:return'<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new o):new o;
