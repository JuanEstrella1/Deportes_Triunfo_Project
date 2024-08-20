<script>
  import { CerrarSesion } from "../Apis/apis";
  import {variable_admin} from "../Apis/storage";
  export let usuario;
  $variable_admin = usuario.telefono
  $: adminReactivo = $variable_admin

</script>

<div class="containerMenu">
  <ul>
    <a href="/perfil_usuario/informacion_personal">
      <div class="containerEnlaces">
        <span class="material-symbols-outlined icon"> person</span>
        <div class="enlaces">
          <p>Datos personales</p>
          <p>></p>
        </div>
      </div>
    </a>
    <a href="/perfil_usuario/configuracion">
      <div class="containerEnlaces">
        <span class="material-symbols-outlined icon"> lock</span>
        <div class="enlaces">
          <p>Configuración de cuenta</p>
          <p>></p>
        </div>
      </div>
    </a>
    {#if adminReactivo === "admin"}
      <a href="/perfil_usuario/administrar_productos">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon">
            admin_panel_settings
          </span>
          <div class="enlaces">
            <p>Administrar productos</p>
            <p>></p>
          </div>
        </div>
      </a>
      <a href="/central_pedidos">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon">
            local_shipping
            </span>
          <div class="enlaces">
            <p>Administrar pedidos</p>
            <p>></p>
          </div>
        </div>
      </a>      
    {:else}
      <a href="/perfil_usuario/pedidos">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon"> package</span>
          <div class="enlaces">
            <p>Mis pedidos</p>
            <p>></p>
          </div>
        </div>
      </a>
      <a href="/perfil_usuario/metodos_de_pago">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon">
            account_balance_wallet
          </span>
          <div class="enlaces">
            <p>Métodos de pago</p>
            <p>></p>
          </div>
        </div>
      </a>
      <a href="/perfil_usuario/direcciones">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon"> library_Books</span>
          <div class="enlaces">
            <p>Mis direcciones</p>
            <p>></p>
          </div>
        </div>
      </a>
      <a href="/perfil_usuario/lista_de_deseos" id="lista_de_deseos">
        <div class="containerEnlaces">
          <span class="material-symbols-outlined icon"> bookmark_heart</span>
          <div class="enlaces">
            <p>Lista de deseos</p>
            <p>></p>
          </div>
        </div>
      </a>
    {/if}

    <a href="/" on:click={CerrarSesion}>
      <div class="containerEnlaces">
        <i class="bi bi-power icon"></i>
        <div class="enlaces">
          <p>Cerrar Sesion</p>
          <p>></p>
        </div>
      </div>
    </a>
  </ul>
</div>

<style>
  .containerMenu {
    display: flex;
    flex-direction: row;
    background-color: #000000e0;
    width: 25%;
    color: #f5f5f5;
    height: fit-content;
  }

  a {
    text-decoration: none;
    color: #f5f5f5;
  }
  ul {
    display: flex;
    flex-direction: column;
  }
  .containerEnlaces {
    width: 300px;
    padding: 10px;
    font-size: 15px;
    border-bottom: solid 1px black;
    display: flex;
    align-items: center;
  }
  .enlaces {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    margin-top: 20px;
  }
  .icon {
    font-size: 35px;
  }
</style>
