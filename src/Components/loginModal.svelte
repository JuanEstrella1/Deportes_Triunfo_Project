<script>
  //import de herramientas
  import { navigate } from "svelte-routing";
  import { formLogin, ventana_modal_login } from "../Apis/storage";
  import {inicioSesion} from "../Apis/apis"

  //import de componentes
  import Input from "../Components/input.svelte";
  import InputContraseña from "../Components/inputContraseña.svelte";
  import InputContrasea from "../Components/inputContraseña.svelte";


  let validacionCampos = true;

  //funcion para cerrar ventana modal
  const cerrarModal = () =>{
    $ventana_modal_login = false;
  }

// funcion que hace el inicio de sesion
  const loginUsuario = async() => {
    if(await inicioSesion($formLogin)){
        navigate("/")
        location.reload();
        $ventana_modal_login = false;
        console.log(await inicioSesion($formLogin))
    }
    else{
        validacionCampos = false;
    }
  };
</script>
{#if $ventana_modal_login}
<section class="containerGeneral">
    <div class="contenido">
      <div class="btnCerrar">
        <i class="bi bi-x-lg icon" on:keypress={cerrarModal} on:click={cerrarModal}></i>
      </div>
      <div class="divContainerLogin">
        <h1 style="margin: 20px 0;">Iniciar Sesión</h1>
        {#if validacionCampos === 2}
          <div class="mensajeError">
            <p>
              No se ha realizado la autenticación <br> de la direccion de correo.
            </p>
          </div>
        {:else if !validacionCampos}
        <div class="mensajeError">
          <p>
            El correo o la contraseña proporcionados <br /> son incorrectos.
          </p>
        </div>
        {/if}
        <form action="">
          <Input directorio={$formLogin} variable={"correo"} mensaje={"Correo"} />
          <InputContrasea
            directorio={$formLogin}
            variable={"contraseña"}
            mensaje={"Contraseña"}
          />
        </form>
        <button on:click|preventDefault={loginUsuario} class="btnInformacion">
          Iniciar sesion</button
        >
        <a href="/restablecer_contrasena"
          ><p class="restablecerContrasena">¿Olvidasté tu contraseña?</p></a
        >
      </div>
      <div class="divContainerSingup">
        <p>¿Aún no tienes una cuenta?</p>
        <a href="/registro">Registrarse</a>
      </div>
    </div>
  </section>
  
{/if}

<style>
  .containerGeneral {
    background-color: rgba(0, 0, 0, 0.326);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .contenido {
    background-color: white;
    width: 40%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btnCerrar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
    padding-right: 30px;
  }
  .divContainerLogin {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.738);
  }
  .divContainerLogin > a{
    padding: 10px 0;
  }
  .divContainerSingup {
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
  .divContainerSingup > a {
    margin-left: 10px;
    color: black;
    opacity: 0.8;
    
  }
  .divContainerSingup > a:hover {
    color: blue;
  }
  .divContainerSingup > p {
    opacity: 0.6;
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
  /* Diseños para el mensaje de error*/
  .mensajeError {
    background-color: #ffe1e8;
    color: red;
    width: 500px;
    text-align: center;
    padding: 20px 10px 10px 30px;
    margin-bottom: 20px;
  }
  .icon:hover{
    cursor: pointer;
  }
</style>
