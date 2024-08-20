<script>
  import { formDirecciones,storage } from "../Apis/storage";
  export let variable = "";
  export let mensaje = "";
  export let directorio = "";
  $storage = directorio
</script>

<div class="form-floating">
  <textarea
    class="form-control"
    placeholder="Leave a comment here"
    id="floatingTextarea2"
    style="height: 100px"
    bind:value={$storage[variable]}
  />
  <label for="floatingTextarea2">{mensaje}</label>
</div>

<style>
  #floatingTextarea2 {
    width: 82%;
  }
  .form-floating > label {
    color: rgba(0, 0, 0, 0.415);
  }
</style>
