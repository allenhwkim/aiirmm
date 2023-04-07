<script lang='ts'>
  import type { FormDiagram } from '@form-flow/custom-elements/src';

  let chartEl: FormDiagram;
</script>

<style lang="scss">
</style>

<svelte:window on:resize={() => chartEl.getInstance().fitView()} />

<h1 hidden>Form Flow Dashboard</h1>
<resize-divs width class="h-100" on:resize-move={() => chartEl.getInstance().fitView()}>
  <div class="position-relative" style="width: 33%">
    <form-diagram bind:this={chartEl}></form-diagram>
    <div class="position-absolute bottom-0 end-0 m-3">
      <button on:click={() => alert(JSON.stringify(chartEl.getData()))}>Get Data</button>
      <button on:click={async () => alert(await chartEl.getImage())}>Get Image</button>
      <button on:click={() => alert(chartEl.getInstance())}>Get Instance</button>
    </div>
  </div>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#properties">
          Properties
        </button>
      </h2>
      <div id="properties" class="accordion-collapse collapse show" data-bs-parent="#right-section">
        <div class="accordion-body">
          START Node
          <ul>
            <li>
              API List
              <ul>
                <li>An HTTP method (like GET)</li>
                <li>A URL (like https://api.spotify.com/v1/artists?name=michael)</li>
                <li>Body</li>
                <li>Headers</li>
              </ul>
            </li>
            <li>
              Global Variables
            </li>
          </ul>
          property contents <br/> property contents <br/> property contents <br/> property contents <br/>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#form-designer">
          Form Designer 
        </button>
      </h2>
      <div id="form-designer" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0">
          <form-designer></form-designer>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#preview">
          Preview
        </button>
      </h2>
      <div id="preview" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          preview contents<br/> preview contents<br/> 
          preview contents<br/> preview contents<br/> 
        </div>
      </div>
    </div>
  </div>
</resize-divs>