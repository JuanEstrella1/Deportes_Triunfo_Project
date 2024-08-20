<script>
  //import herramientas
  import { onMount } from "svelte";
  import {
    actualizar_Usuario,
    keyLocalStorage,
  } from "../../Apis/apis.js";

  import { ruta_protegida, ventana_modal_login, nombreNavbar, variable_admin  } from "../../Apis/storage.js";

  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";

  // declaracion de variables
  let nombre = "";
  let apellido = "";
  let telefono = "";
  let docIdentidad = "";
  let fecha = "";
  let correo = "";
  let usuarioActivo = [];

  ////// Funcion para la recoleccion de datos a actualizar

  const actualizar = async () => {
    const obj = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      documento_de_identidad: docIdentidad,
      fecha_de_nacimiento: fecha,
    };

    // llamado de la funcion para actualizar los campos en la base de datos
    actualizar_Usuario("usuarios", obj, usuarioActivo.id);

    // actualizacion de la informacion almacenada en el local storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

    // Actualizacion de datos
    data.nombre = nombre;
    data.apellido = apellido;
    data.telefono = telefono;
    data.documento_de_identidad = docIdentidad;
    data.fecha_de_nacimiento = fecha;
    $variable_admin = telefono

    // conversion de datos
    const dataActualizada = JSON.stringify(data);
    $nombreNavbar = data.nombre

    // Actualizacion de datos completos
    localStorage.setItem(usuarioActivo.key, dataActualizada);
  };

  onMount(async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        nombre = usuarioActivo.nombre;
        apellido = usuarioActivo.apellido;
        telefono = usuarioActivo.telefono;
        docIdentidad = usuarioActivo.documento_de_identidad;
        fecha = usuarioActivo.fecha_de_nacimiento;
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
      <h1>Datos personales</h1>
      <div>
        <div class="containerInputs">
          <div class="form-floating inputInformacion">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
              bind:value={nombre}
            />
            <label for="floatingPassword">Nombres</label>
          </div>
          <div class="form-floating inputInformacion">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
              bind:value={apellido}
            />
            <label for="floatingPassword">Apellidos</label>
          </div>
          <div class="form-floating inputInformacion">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
              bind:value={docIdentidad}
            />
            <label for="floatingPassword">Doc. de identidad</label>
          </div>
        </div>
        <div>
          <div class="containerInputs">
            <div class="form-floating inputInformacion">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Contraseña"
                bind:value={telefono}
              />
              <label for="floatingPassword">Teléfono</label>
            </div>
            <div class="form-floating inputInformacion">
              <input
                type="date"
                class="form-control"
                id="floatingPassword"
                placeholder="Contraseña"
                bind:value={fecha}
              />
              <label for="floatingPassword">Fecha de nacimiento</label>
            </div>
          </div>
          <div class="containerBtnInformacion">
            <button class="btnInformacion" on:click={actualizar}>Guardar</button
            >
          </div>
        </div>
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
    height: 400px;
    padding: 30px;
  }
  .containerInputs {
    display: flex;
  }
  .inputInformacion {
    margin: 20px;
  }
  .containerBtnInformacion {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
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
  }
</style>
