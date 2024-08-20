<script>
      //import herramientas
  import { ventana_modal_login, ruta_protegida } from "../../Apis/storage";
  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
    let contador = 0
    $: contador2 = contador * 2
  let usuarioActivo="hola"
  </script>
  {#if $ruta_protegida}
  <div class="containerPerfil">
    <MenuUsuario usuario = {usuarioActivo}/>
    <div class="containerComponent">
      <h1>Devoluciones</h1>

      <p>contador: {contador}</p>
      <p>contador * 2: {contador2}</p>
      <button on:click={()=> contador+=1}>sumar</button>
  
    </div>
  </div>
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
      height: 500px;
      padding: 30px;
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
    }
    .btnInformacion {
      padding: 10px;
      border: 0;
      color: white;
      width: 200px;
      border-radius: 20px;
      font-size: 20px;
      background-color: #000000;
    }
    .btnInformacion:hover {
      background-color: #c42e26;
      transition: ease-in-out 0.5s;
    } */
  </style>