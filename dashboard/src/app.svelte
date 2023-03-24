<script lang='ts'>
</script>

<style lang="scss">
  resize-divs {
    height: 100%;
    &[width] > :not(.resize-bar) {
      width: 33%;
    }
    .accordion {
      flex: 1;
    }
  }
</style>

<resize-divs width class="">
  <div>form-diagram</div>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Properties
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          property contents <br/> property contents <br/> property contents <br/> property contents <br/>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Editor
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          editor contents<br/> editor contents<br/>  editor contents<br/>
          editor contents<br/> editor contents<br/>  editor contents<br/>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Preview
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          preview contents<br/> preview contents<br/> 
          preview contents<br/> preview contents<br/> 
        </div>
      </div>
    </div>
  </div>
</resize-divs>