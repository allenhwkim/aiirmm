export default /*css*/ `
  ul { margin: 0; padding-left: 1rem; background: #FFF;}
  li { list-style: none; cursor: pointer; position: relative;}
  li.disabled { opacity: .7; cursor: initial; }
  li:has(> ul) { list-style: '⊟ ';}
  li:has(> ul[hidden]) { list-style: '⊞ '; }
  li:has(> ul)::before { content: ' '; position: absolute; top: 18px; left: -12px; bottom: 6px; border-left: 1px dashed #999;}
  li:has(> ul) sup { display: none; }
  li:has(> ul[hidden]) sup { display: initial; opacity: .8; }
  li:not(:has(> ul)) { list-style: none; position: relative;} 
  .x-highlighted { background: #ccc; }

  ul.menu { display: flex;}
  ul.menu ul { padding: 0; border: 1px solid #ccc; display: none } /* ignore all [hidden] attribute */
  ul.menu li { list-style: none; white-space: nowrap; padding: 6px 12px;}
  ul.menu li:hover { background: #CCC }
  ul.menu li:hover > ul { display: block; } /* then, only shows dependent on hover */
  ul.menu li:has(> ul)::before { display: none; } /* hide all list styles */

  ul.menu > li { border: 1px solid #ccc; margin-left: -1px; min-width: 40px; }
  ul.menu > li > ul { position: absolute;  left: 0; top: 100%; min-width: 100%; }
  ul.menu > li > ul ul { position: absolute; top: 0; left: 100%;}
}
`;
