<script>
    import {formDirecciones,storage} from "../Apis/storage"
  // importacion de variable booleana
  export let variable = "";
  export let mensaje = "";
  export let directorio = "";
  $storage = directorio

</script>
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id="floatingPassword"
      placeholder="Contraseña"
      bind:value={$storage[variable]}
    />
    <label for="floatingPassword">{mensaje}</label>
  </div>


<style>
  .form-floating {
    flex: 1;
    margin: 20px 0;
  }
  .form-floating > label {
    color: rgba(0, 0, 0, 0.415);
  }
  .form-control {
    width: 300px;
  }
</style>
