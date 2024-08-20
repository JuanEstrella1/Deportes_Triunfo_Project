<script>
  // import de herramientas
  import { alert_completado } from "../Apis/storage";

  // Variables auxiliares
  export let mensaje;

</script>

{#if $alert_completado}
  <section class="containerGeneral">
    <div class="contenedorMensaje">
      <p class="texto">{mensaje}</p><!-- 
      <p class="texto">El mensaje es este</p> -->
    </div>
  </section>
{/if}

<style>
  .containerGeneral {
    position: fixed;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    z-index: 9999;
  }
  .contenedorMensaje {
    width: 50%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d1e7dd;
    padding: 0 15px;
  }
  .texto {
    text-align: center;
    color: #0a3622;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 7;
    font-style: normal;
    font-size: 20px;
  }
</style>
