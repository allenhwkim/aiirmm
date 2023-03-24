<script>
  import { ResizeDivs } from '@form-flow/custom-elements/src';
  (!customElements.get('resize-divs')) && customElements.define('resize-divs', ResizeDivs);
</script>

<style>
</style>

<resize-divs width class="main">
  <div class="left">
    Left
  </div>
  <div class="right">
    Right
  </div>
</resize-divs>
