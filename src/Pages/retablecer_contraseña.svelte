<script>
  // import de herramientas
  import { alert_completado, mensajeBanner } from "./../Apis/storage";
  import { restablecer_contraseña } from "../Apis/apis";

  // import de componentes
  import Banner from "../Components/banners.svelte";
  import LoginModal from "../Components/loginModal.svelte"

  // variables auxiliares
  let correo = "";
  $mensajeBanner =
    "Se ha enviado un mensaje a tu correo registrado con los pasos a seguir";

  const restablecer = () => {
    restablecer_contraseña(correo);
    $alert_completado = true;
    setTimeout(function () {
      $alert_completado = false;
    }, 3000);
  };
</script>

<Banner mensaje={$mensajeBanner} />
<section class="containerPrincipal">
  <div class="contenido">
    <div class="titulo">
      <span class="material-symbols-outlined icon"> lock </span>
      <h2>Restablecer contraseña</h2>
    </div>
    <div class="cuerpo">
      <p>
        Ingresa tu correo electrónico y te enviaremos las instrucciones para una
        nueva contraseña
      </p>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          bind:value={correo}
        />
        <label for="floatingPassword">Correo electrónico</label>
        <br />
      </div>
    </div>
    <div class="button">
      <button
        class="btnInformacion"
        on:click={restablecer}
      >
        Continuar
      </button>
    </div>
  </div>
</section>
<LoginModal />

<style>
  .containerPrincipal {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    background-color: #f5f5f5;
  }
  .titulo {
    display: flex;
    align-items: center;
  }
  h2 {
    padding-top: 5px;
  }
  .icon {
    font-size: 30px;
  }
  .contenido {
    width: 35%;
    background-color: white;
    border-radius: 15px;
    padding: 20px 40px;
  }
  .cuerpo {
    width: 100%;
  }
  .cuerpo > p {
    opacity: 0.8;
  }
  .button {
    display: flex;
    justify-content: center;
  }
  .btnInformacion {
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>
