<script lang='ts' context="module">
  declare const bootstrap: any;
  import type { FormDiagram } from '@formflow/elements/src';

  let chartEl: FormDiagram;
  function handleReactflowEvent(e) {
    const {action, type, node, edge} = e.detail;
    const id = node?.id || edge?.id || '';
    console.log({type, action, node, edge});
    (<any>document.querySelector('#event-type')).innerText = type || '';
    (<any>document.querySelector('#event-id')).innerText = id;
    (<any>document.querySelector('#event-label')).innerText = node?.data?.label || edge?.data?.label || '';
    (<any>document.querySelector('#event-action')).innerText = action || '';
    (<any>document.querySelector('#event-detail')).innerText = (node || edge) ? JSON.stringify(node || edge, null, '  ') : '';

    document.querySelectorAll('.collapse.show').forEach(el => new bootstrap.Collapse(el));
    if (node?.type === 'start' || node?.type === 'end' || edge?.type === 'custom') {
      new bootstrap.Collapse(document.querySelector('#properties'));
    } else if (node?.type === 'custom') {
      new bootstrap.Collapse(document.querySelector('#form-designer'));
    }
  }

  function showJson(obj) {
    const newObj = {...obj};
    Object.keys(newObj).forEach(key => typeof newObj[key] === 'function' && (newObj[key] = 'function'));
    document.querySelectorAll('.dialog-dynamic').forEach((el:any) => el.style.display = 'none');
    document.querySelector('#dialog-json')['style'].display='';
    document.querySelector('#dialog-json').innerHTML = JSON.stringify(newObj, null, '  '); 
    new bootstrap.Modal(document.querySelector('#dialog')).toggle();
  }

  async function showImage() {
    const img = await chartEl.getImage()
    document.querySelectorAll('.dialog-dynamic').forEach((el:any) => el.style.display = 'none');
    document.querySelector('#dialog-image')['style'].display='';
    document.querySelector('#dialog-image').setAttribute('src', img); 
    new window['bootstrap'].Modal(document.querySelector('#dialog')).toggle();
  }
</script>

<style lang="scss">
</style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<h1 hidden>Form Flow Dashboard</h1>
<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl} 
      on:reactflow={handleReactflowEvent}></form-diagram>
    <div class="position-absolute bottom-0 end-0 m-3">
      <button on:click={() => showJson(chartEl.getData())}>Get Data</button>
      <button on:click={() => showImage()}>Get Image</button>
      <button on:click={() => showJson(chartEl.getInstance())}>Get Instance</button>
    </div>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#properties">
          Properties
        </button>
      </h2>
      <div id="properties" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          <span id="event-type"></span>
          <span id="event-id"></span>
          <span id="event-label"></span>
          <span id="event-action"></span>
          <pre id="event-detail"></pre>
        </div>
        <pre>
          todo 1
          * save reactflow to a sessionStorage
          * restore reactflow from a sessionStorage

          todo 2
          * save htmlcss by nodeId to a sessionStorage
          * restore htmlcss when node is clicked from sessionStorage
        </pre>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          Form Designer 
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          <form-designer></form-designer>
        </div>
      </div>
    </div>
  </div>
</resize-divs>


<!-- Modal -->
<div class="modal fade" id="dialog" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="dialog-contents">
        <pre id="dialog-json" class="dialog-dynamic"></pre>
        <img id="dialog-image" class="dialog-dynamic w-100" alt="blah" />
      </div>
    </div>
  </div>
</div>