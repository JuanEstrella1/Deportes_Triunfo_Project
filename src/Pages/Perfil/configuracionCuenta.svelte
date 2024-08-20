<script>
  //import herramientas
  import { onMount } from "svelte";
  import {
    usuarioLoggeado,
    actualizar_Usuario,
    keyLocalStorage,
    validarContraseña,
    actualizar_contraseña,
  } from "../../Apis/apis.js";
  import { ruta_protegida, ventana_modal_login,alert_completado,mensajeBanner } from "../../Apis/storage.js";

  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import Banners from "../../Components/banners.svelte";

  // declaracion de variables
  let contrasenaNueva = "";
  let contrasenaAntigua = "";
  let contrasenaConfirmacion = "";
  let contraseña = "";
  let contador = 0;
  let usuarioActivo = [];
  let mensajes = [
    "La contraseña antigua no concuerda con la registrada en la base de datos, por favor, verifica si esta bien",
    "La contraseña nueva y la confirmacion no coincide, verifica que se encuentran correctamente escritas",
    "La contraseña nueva no cuenta con los requisitos minimos de una mayuscula, una minuscila, un número o mínimo de 6 caracteres",
  ];

  /////// Funcion para llamar a la actualizacion de datos
  const actualizarContrasena = () => {
    let obj = {
      contraseña: contrasenaNueva,
    };
    let validacion = validarContraseña(contrasenaNueva);
    if (validacion) {
      contador = 0;

      // obtencion de la llave para actualizar los datos en el local storage

      // Obtencion de los datos almacenados en el local storage
      const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

      // Actualizacion de datos
      data.contraseña = contrasenaNueva;

      // conversion de datos
      const dataActualizada = JSON.stringify(data);

      // Actualizacion de datos completos
      localStorage.setItem(usuarioActivo.key, dataActualizada);

      // llamado de la funcion que actualiza los datos en la base de datos
      actualizar_contraseña(contrasenaNueva);
      actualizar_Usuario("usuarios", obj, usuarioActivo.id).then(() => {
        $mensajeBanner = "La contraseña ha sido cambiada exitosamente"
        $alert_completado = true
        contrasenaAntigua = ""
        contrasenaNueva = ""
        contrasenaConfirmacion = ""
        setTimeout(function () {
          $alert_completado = false;
        }, 3000);
      });
    } else {
      contador = 3;
    }
  };

  onMount(async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        console.log(usuarioActivo);
        contraseña = usuarioActivo.contraseña;
        $ruta_protegida = true;
      })
      .catch((error) => {
        $ruta_protegida = false;
      });
  });
</script>

{#if $ruta_protegida}
<Banners mensaje={$mensajeBanner} />
  <div class="containerPerfil">
    <MenuUsuario usuario={usuarioActivo} />
    <div class="containerComponent">
      <h1>Configuracion de cuenta</h1>

      <div class="containerInputs">
        {#if contador > 0}
          <div class="mensajeError">
            <p>
              {mensajes[contador - 1]}
            </p>
          </div>
        {/if}
        <div class="form-floating inputInformacion">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="contrasena"
            bind:value={contrasenaAntigua}
            on:blur={() => {
              contrasenaAntigua !== contraseña
                ? (contador = 1)
                : (contador = 0);
            }}
          />
          <label for="floatingPassword">Contraseña actual</label>
        </div>
        <br />
        <div class="form-floating inputInformacion">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="contrasena"
            bind:value={contrasenaNueva}
            on:blur={() => {
              contrasenaNueva !== contrasenaConfirmacion
                ? (contador = 2)
                : (contador = 0);
            }}
          />
          <label for="floatingPassword">Contraseña nueva</label>
        </div>
        <br />
        <div class="form-floating inputInformacion">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="contrasena"
            bind:value={contrasenaConfirmacion}
            on:blur={() => {
              contrasenaNueva !== contrasenaConfirmacion
                ? (contador = 2)
                : (contador = 0);
            }}
          />
          <label for="floatingPassword">Confirmacion de contraseña</label>
        </div>
        <br />
      </div>
      <div class="containerBtnInformacion">
        <button class="btnInformacion" on:click={actualizarContrasena}
          >Cambiar contraseña</button
        >
      </div>
    </div>
  </div>

{:else}
  <div class="contenidoUnlogin">
    <button class="btnLogin" on:click={() => ($ventana_modal_login = true)}
      >Iniciar Sesión</button
    >
  </div>
  <ModalLogin />
{/if}

<style>
  /* Estilos para las direcciones con perfil no logueado*/
  .contenidoUnlogin {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  .btnLogin {
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }

  /* Estilos para las direcciones con perfil logueado*/
  .containerPerfil {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    justify-content: center;
    padding: 30px;
  }
  .containerComponent {
    background-color: white;
    width: 900px;
    height: auto;
    padding: 30px;
  }
  .containerInputs {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
  .inputInformacion {
    width: 400px;
  }
  .containerBtnInformacion {
    display: flex;
    justify-content: flex-start;
  }
  .btnInformacion {
    padding: 10px;
    border: 0;
    color: white;
    width: 250px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .mensajeError {
    background-color: #ffe1e8;
    color: red;
    width: 500px;
    text-align: center;
    padding: 30px;
    margin-bottom: 20px;
  }
</style>
