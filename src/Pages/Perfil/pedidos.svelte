<script>
  //import herramientas
  import {
    ventana_modal_login,
    ruta_protegida,
    pedidos,
  } from "../../Apis/storage";
  import { keyLocalStorage } from "../../Apis/apis";

  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import Vacio from "../../secciones/listadoVacio.svelte";
  import CardPedidos from "../../Components/cardPedidos.svelte"

  //Variables auxiliares
  let usuarioActivo = [];
  $: pedidosReactivos = $pedidos;

  //funcion para dar fecha_estimada_entrega
  const fecha_futura = (fecha) => {
    console.log(fecha);
    // Obtener la fecha actual
    let fechaActual = new Date(fecha);
    // Sumar 10 días a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + 10);

    // Formatear la fecha para mostrarla como un string (opcional)
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", opciones);
    return fechaFormateada
  };

  (async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        $ruta_protegida = true;
        $pedidos = usuarioActivo.pedidos;
        console.log($pedidos);
      })
      .catch(() => {
        $ruta_protegida = false;
      });
  })();
</script>

{#if $ruta_protegida}
  <div class="containerPerfil">
    <MenuUsuario usuario={usuarioActivo} />
    <div class="containerComponent">
      <h1>Mis pedidos</h1>
      {#if pedidosReactivos.length < 1}
        <Vacio
          imagen={"https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FNo-order.svg?alt=media&token=68b1de07-8754-4e88-9636-3cf101697447"}
          mensaje={"No tienes pedidos registrados"}
        />
      {:else}
      {#each $pedidos.reverse() as pedido }
        <CardPedidos pedido={pedido}/>
      {/each}
      {/if}
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
    height: fit-content;
    padding: 30px;
  }
  h1 {
    font-family: "Raleway", sans-serif;
    font-weight: 1500;
  }

</style>
