<script>
  ////////////////////// Importaciones de las funciones y las apis /////////////////////
  import { onMount } from "svelte";
  import {inicioSesion,CerrarSesion,busquedaUsuarioSimple} from "../../../Apis/apis.js";
  import {navigate} from "svelte-routing"

  //////////////// Declaracion de variables ////////////////
  let correo = "";
  let contraseña = "";
  let validacionCampos = true;

  ////////////////////// Funcion para la invocacion de la api y agregar usuarios /////////////////////

  const loginUsuario = async() =>{
    // creacion del objeto para la api
    const obj = {
        correo:correo,
        contraseña:contraseña
    }
    console.log(obj)
    /* let a = await busquedaUsuarioSimple(correo)
    console.log(a) */
    // llamdo de la api para hacer el login del usuario

    await inicioSesion(obj)? 
    navigate("/"):
    validacionCampos = false;
  };

  //////////////// funcion para cerrar sesion temporal //////////////
  const logoutUsuario = () =>{
    const obj = {
        correo:correo,
        contraseña:contraseña
    }
    console.log(obj)

    inicioSesion(obj);
  };
  


</script>

<section class="sectionLogin">
  
  <div class="divContainerLogin">
    <h1 style="margin: 20px 0;">Iniciar Sesión</h1>
    {#if !validacionCampos}
      <div class="mensajeError">
        <p>
          El correo o la contraseña proporcionados <br /> son incorrectos
        </p>
      </div>
    {/if}
    <form action="">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="Correo" bind:value={correo}>
        <label for="floatingInput">Correo</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" bind:value={contraseña}>
        <label for="floatingPassword">Contraseña</label>
      </div>
      </form>
    <button on:click|preventDefault={loginUsuario} class="buttonLogin"> Iniciar sesion</button>
    <a href="/"><p class="restablecerContrasena">
      ¿Olvidasté tu contraseña?
    </p></a>
  </div>
  <div class="divContainerSingup">
    <button class="buttonLogin" on:click={()=>navigate("/registro")}>Registrarse</button>
  </div>
</section>


<!-- <form action="">
    <input type="text" class="form-control" 
    aria-label="Username" placeholder="correo" bind:value={correo}><br>
    <input type="password" placeholder="contraseña" bind:value={contraseña}><br>
    </form>
<button on:click|preventDefault={loginUsuario}> Iniciar sesion</button>

<button on:click|preventDefault={CerrarSesion}> Cerrar Sesion</button> -->


<style>
  .sectionLogin{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    background-color: #f5f5f5;
  }
  .divContainerLogin{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    border-bottom: solid 1px black;
  }
  .form-control{
    width: 300px;
  }
  .buttonLogin{
    padding: 20px;
    margin-top: 20px;border: 0;
    color: white;
    width: 200px;
    font-size: 20px;
    background-color: #000000;
  }
  .buttonLogin:hover{
    background-color: #c42e26;
    transition:  ease-in-out 0.5s;
  }
  .restablecerContrasena{
    margin: 20px 0;
    text-decoration-line: none;
  }
  .restablecerContrasena:hover{
    color: blue;
    cursor: pointer;
  }
  .mensajeError {
    background-color: #ffe1e8;
    color: red;
    width: 500px;
    text-align: center;
    padding: 20px 10px 10px 30px;
    margin-bottom: 20px;
  }
</style>