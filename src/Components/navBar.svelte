<script>
  // import de herramientas
  import { onMount } from "svelte";
  import { CerrarSesion, keyLocalStorage } from "../Apis/apis";
  import {
    carrito,
    ventana_modal_login,
    contador,
    nombreNavbar,
    variable_admin
  } from "../Apis/storage";

  // definicion de varianles
  let usuarioActivo = [];
  let variabe_booleana = true;
  let variable = "futbol";
  $: marcador = $contador;
  $: nombre = $nombreNavbar;
  $: adminReactivo = $variable_admin

  // obtencion de los datos de usuario
  onMount(async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        $variable_admin = usuarioActivo.telefono
        $carrito = usuarioActivo.carrito;
        $contador = usuarioActivo.carrito.length;
        $nombreNavbar = usuarioActivo.nombre;
        if (usuarioActivo.correo !== "" && usuarioActivo.nombre !== "") {
          variabe_booleana = false;
        }
      })
      .catch((error) => {
        variabe_booleana = true;
      });
  });
</script>

<div class="divContainer">
  <div class="logo">
    <a href="/"><img src="/Logo.svg" alt="Logo de la marca" /></a>
  </div>
  <div class="menu">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="a"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Menu
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/catalogo/futbol">Futbol</a></li>
        <li><a class="dropdown-item" href="/catalogo/natacion">Natacion</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" href="/catalogo">Todas las categorias</a>
        </li>
      </ul>
    </li>
  </div>
  <div class="buscador">
    <div class="barra">
      <input
        type="text"
        name=""
        placeholder="¿Qué deseas comprar?"
        class="texto"
      />
      <i class="bi bi-search iconSearch"></i>
      <!--  <p class="texto">¿Qué deseas comprar?</p>
      -->
    </div>
  </div>
  <div class="menuUsuario">
    <li class="nav-item dropdown">
      {#if variabe_booleana}
        <a
          class="nav-link dropdown-toggle saludo"
          href="a"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Hola, <br /> Inicia Sesión
        </a>
      {:else}
        <a
          class="nav-link dropdown-toggle saludo"
          href="a"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Hola, {nombre}
        </a>
      {/if}

      <ul class="dropdown-menu">
        {#if variabe_booleana}
          <li>
            <p
              class="dropdown-item inicioSesion"
              on:keypress={() => {
                $ventana_modal_login = true;
              }}
              on:click={() => {
                $ventana_modal_login = true;
              }}
            >
              Iniciar Sesion
            </p>
            <a class="dropdown-item" href="/registro">Registrarse</a>
          </li>
        {:else}
        {#if adminReactivo === "admin"}
          <li>
            <a class="dropdown-item" href="/perfil_usuario/informacion_personal"
              >Perfil personal</a
            >
            <a
              class="dropdown-item"
              href="/perfil_usuario/administrar_productos"
              >Administrar productos</a
            >
            <a class="dropdown-item" href="/central_pedidos"
              >Central de pedidos</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="/" on:click={CerrarSesion}
              >Cerrar Sesion</a
            >
          </li>
        {:else}
          <li>
            <a class="dropdown-item" href="/perfil_usuario/informacion_personal"
              >Perfil personal</a
            >
            <a class="dropdown-item" href="/perfil_usuario/lista_de_deseos"
              >Lista de deseos</a
            >
            <a class="dropdown-item" href="/perfil_usuario/pedidos"
              >Mis Pedidos</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="/" on:click={CerrarSesion}
              >Cerrar Sesion</a
            >
          </li>
          {/if}
        {/if}
      </ul>
    </li>
  </div>
  <div class="carrito">
    <!-- <a href="/carrito">
      <button type="button" class="btn btn-primary position-relative">
        <i class="bi bi-basket icon"></i>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {contador}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
    </a> -->
    <a href="/carrito">
      <button type="button" class="btn position-relative">
        <i class="bi bi-basket icon"></i>
        <span
          class="position-absolute start-55 translate-middle badge rounded-pill bg-danger"
          style="top: 25px;"
        >
          {$contador}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
    </a>
  </div>
</div>

<style>
  .divContainer {
    background-color: white;
    height: 100px;
    display: flex;
  }
  img {
    width: 70%;
  }
  a {
    text-decoration: none;
  }
  .saludo {
    font-size: 25px;
    line-height: 1.1;
  }
  .inicioSesion {
    margin: 0 15px;
    padding: 0;
  }
  .inicioSesion:hover {
    cursor: pointer;
  }
  .buscador {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .barra {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 20px;
    padding: 10px;
  }
  .texto {
    width: 100%;
    opacity: 0.5;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 20px;
  }
  .iconSearch {
    position: relative;
    right: 35px;
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
    opacity: 0.5;
  }
  .carrito,
  .logo,
  .menu,
  .menuUsuario {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 607;
    font-style: normal;
    font-size: 30px;
  }
  .icon {
    font-size: 40px;
  }
  .dropdown-menu {
    /* background-color: aqua; */
    width: 250px;
  }

  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@607&display=swap");
</style>
