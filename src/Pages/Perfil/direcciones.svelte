<script>
  // import de herramientas
  import { onMount } from "svelte";  
  import {
    actualizar_Usuario,
    keyLocalStorage,
    idGenerator,
  } from "../../Apis/apis.js";

  import { formDirecciones, variableBooleana,direcciones,actualizar_crear_direccion,ruta_protegida,ventana_modal_login } from "../../Apis/storage.js";

  //import de componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import FormularioDirecciones from "../../Components/formularioDirecciones.svelte";
  import DireccionContainer from "../../Components/direccionContainer.svelte";
  import ModalLogin from "../../Components/loginModal.svelte"
  import Vacio from "../../secciones/listadoVacio.svelte"

  // Almacenamiento de datos en variables
  let usuarioActivo = [];
  $:direccionesReactivas = $direcciones;
  let i = 0;

  /////////// Funciones para la ventana modal
  const abrirVentanaModal = () => {
    $variableBooleana = true;
    $actualizar_crear_direccion = false
  };

  (async()=>{
    
    await keyLocalStorage().then((key) => {
      usuarioActivo = {...JSON.parse(localStorage.getItem(key)),key:key};
      $direcciones = usuarioActivo.direcciones;
      direccionesReactivas = usuarioActivo.direcciones
      $ruta_protegida = true
    })
    .catch(() => {
      $ruta_protegida = false
    })
    
  })();
/*   onMount(async () => {
    
  }); */
</script>
{#if $ruta_protegida}
<div class="containerPerfil">
  <MenuUsuario usuario = {usuarioActivo}/>
  <div class="containerComponent">
    <h1>Mis direcciones</h1>

    {#if direccionesReactivas.length < 1}
    <Vacio imagen = {"https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FEmpty-folder.svg?alt=media&token=c0ce0263-3bcf-44dd-bd56-701305784981"}
    mensaje = {"No se registran direcciones"}
    />
    {:else}
      <div class="containerDirecciones">
        {#each direccionesReactivas as direccion  }<!-- $direcciones -->
        <div key={direccion.id}>
          <DireccionContainer direccion = {direccion} usuario = {usuarioActivo}/>
        </div>
          
        {/each}
      </div>
    {/if}
    <div class="containerBtnAgregar">
      <button
        class="btnInformacion"
        style="font-size: 20px;"
        on:click={abrirVentanaModal}>Agregar dirección</button
      >
    </div>
  </div>
</div>
<FormularioDirecciones />
{:else}
<div class="contenidoUnlogin">
  <button class="btnLogin" on:click={()=>$ventana_modal_login = true}>Iniciar Sesión</button>
</div>
<ModalLogin/>
{/if}



<style>
  /* Estilos para las direcciones con perfil no logueado*/
  .contenidoUnlogin{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  .btnLogin{  
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
  h1{
    font-family: "Raleway", sans-serif;
  }
  /*     .containerInputs {
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
    } */
  .btnInformacion {
    padding: 10px;
    border: 0;
    color: white;
    width: 250px;
    border-radius: 20px;
    font-size: 25px;
    background-color: #000000;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .containerBtnAgregar {
    display: flex;
    justify-content: flex-end;
  }
  .containerDirecciones {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }
</style>
