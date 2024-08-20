<script>
  // importacion de las herramientas
  import { onMount } from "svelte";
  import { actualizar_Usuario, keyLocalStorage } from "../../Apis/apis.js";
  import {
    favoritos,
    ruta_protegida,
    ventana_modal_login,
  } from "../../Apis/storage.js";

  // importacion de los componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import CardFavoritos from "../../Components/cardFavoritos.svelte";
  import ModalCompras from "../../Components/pagos_rapidos.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import Vacio from "../../secciones/listadoVacio.svelte";

  // Creacion de las variables
  let usuarioActivo = [];
  /* let favoritos = [] */
  $: favoritosReactivo = $favoritos;

  // obtencion de los datos
  onMount(async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        $favoritos = usuarioActivo.favoritos;
        $ruta_protegida = true;
      })
      .catch(() => {
        $ruta_protegida = false;
      });
  });
</script>

{#if $ruta_protegida}
  <div class="containerPerfil">
    <MenuUsuario usuario={usuarioActivo} />
    <div class="containerComponent">
      <h1>Lista de deseos</h1>
      <div class="contenido">
        {#if favoritosReactivo.length < 1}
          <Vacio
            imagen={"https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FNothing-here.svg?alt=media&token=468f1599-c39d-470f-bacb-942a54c939a2"}
            mensaje={"No tienes ningún producto agregado a tu lista de deseos"}
          />
        {:else}
          {#each favoritosReactivo as favorito}
            <CardFavoritos
              producto_favorito={favorito}
              usuario={usuarioActivo}
            />
          {/each}
        {/if}
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
  .contenido {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1{
    font-family: "Raleway", sans-serif;
    font-weight: 1500;
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
