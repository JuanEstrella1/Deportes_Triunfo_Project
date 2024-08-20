<script>
    export let imagen
    export let mensaje
</script>
  <div class="contenido2">
    <div class="mensaje">
      <div class="contenedorImg">
        <img
          src = {imagen}
          alt="Imagen"
        />
      </div>
      <div class="texto">
        <h5>{mensaje}</h5>
        
      </div>
    </div>
  </div>

<style>
      /* Estilos para sesion no logueada*/

  .contenido2 {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    margin: 10px 0;
  }
  .mensaje {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
  }
  .contenedorImg {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .contenedorImg > img {
    width: 100%;
  }
  .texto {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Designacion del tipo de letra*/
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 7;
    font-style: normal;
  }
  h5{
    font-size: 25px;
  }
</style>