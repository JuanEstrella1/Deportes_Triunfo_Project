<script>
    import {formDirecciones, storage} from "../Apis/storage"
  // importacion de variable booleana
  export let validacion = true;
  export let variable = "";
  export let mensaje = "";
  export let directorio = "";
  $storage = directorio
  


</script>

{#if validacion}
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id="floatingPassword"
      placeholder="Contraseña"
      bind:value={$storage[variable]}
      on:change={(e)=>{
        e.target.value === "" ? validacion = false : validacion = true
      }}
      on:blur={(e)=>{
        e.target.value === "" ? validacion = false : validacion = true
      }}
    />
    <label for="floatingPassword">{mensaje}</label>
    <br>
  </div>
{:else}
  <div class="form-floating error">
    <input
      type="text"
      class="form-control error"
      id="floatingPassword"
      placeholder="Contraseña"
      bind:value={$storage[variable]}
      on:change={(e)=>{
        e.target.value !== "" ? validacion = true : validacion = false
      }}
    />
    <label for="floatingPassword" class="errorMensaje"
      >{mensaje}</label
    >
    <p>Este campo no puede esta vacio</p>
  </div>
{/if}

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
  .error {
    border-color: red;
    color: red;
  }
  .errorMensaje {
    color: red;
  }
</style>
