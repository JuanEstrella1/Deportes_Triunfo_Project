<script>
  // import de herramientas
  import {
    autenticacionUsuarios,
    validarContraseña,
  } from "../../Apis/apis.js";
  import {alert_completado, mensajeBanner} from "../../Apis/storage.js"
  import { navigate } from "svelte-routing";

  // import de componentes
  import ModalLogin from "../../Components/loginModal.svelte"
  import Banners from "../../Components/banners.svelte";

  //////////////// Declaracion de variables ////////////////
  let nombre = "";
  let apellido = "";
  let fechaNacimiento = "";
  let correo = "";
  let contraseña = "";
  let doc_de_identidad = "";
  let telefono = "";
  let validacionCampos = true; //

  ////////////////////// Funcion para la invocacion de la api y agregar usuarios /////////////////////

  const agregar_Usuario = () => {
    // Verificacion de campos vacios obligatorios antes de crear el usuario
    if (
      nombre === "" ||
      apellido === "" ||
      correo === "" ||
      contraseña === ""
    ) {
      validacionCampos = false;
    }

    // validacion de contraseña correcta antes de la creacion de usuario
    validarContraseña(contraseña)
      ? (validacionCampos = true)
      : (validacionCampos = false);

    // Creacion del objeto para el envio a la api de usuario
    let obj = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contraseña: contraseña,
      fecha_de_nacimiento: fechaNacimiento,
      documento_de_identidad: doc_de_identidad,
      telefono: telefono,
      direcciones: [],
      favoritos: [],
      carrito: [],
      pedidos:[],
      metodos_de_pagos: [
        { estado: false, modo: "debito" },
        { estado: false, modo: "credito" },
      ],
    };

    // llamada para la api de autenticacion de usuario
    if (validacionCampos) {
      autenticacionUsuarios("usuarios", obj).then(() => {
        
        $alert_completado = true;
        $mensajeBanner = "!!Usuario registrado con exito!! Se te ha enviado un correo para realizar la autenticación y así poder iniciar sesión, si no aparece el mensaje, revisa la bandeja de spam."

        setTimeout((() => {
          $alert_completado = false
          navigate("/");
        }),5000)
      })
      .catch(error =>{
        alert(error.message)
        correo = ""
        nombre =""
        contraseña = ""
        apellido = ""
      } )
      .catch(error => console.error("No se pudo registrar al usuario"))
    }
  };

  ////////////////////// Funcion para la verificacion de los campos y llamar a la api y agregar usuarios /////////////////////

  const validacionCamposVacios = (e) => {
    if (e.target.value === "") {
      // construccion de cariable para la aparicion del tecto de error en pantalla
      validacionCampos = false;
    } else {
      validacionCampos = true;
    }
  };

</script>
<Banners mensaje = {$mensajeBanner}/>
<section class="sectionLogin">
  <div class="divContainerLogin">
    <h1 style="margin: 20px 0;">Registro de usuario</h1>
    {#if !validacionCampos}
      <div class="mensajeError">
        <p>
          Los campos con un asterisco (*) son obligatorios <br />
          La contraseña debe tener mínimo 6 caracteres y máximo 32 <br />
          La contraseña debe contener una mayuscula, minuscula y un número
          <br />
          El correo debe contener @
        </p>
      </div>
    {/if}
    <form action="">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput1"
          placeholder="Correo"
          bind:value={nombre}
          on:blur={(e) => {
            validacionCamposVacios(e);
          }}
        />
        <label for="floatingInput">Nombre*</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Contraseña"
          bind:value={apellido}
          on:blur={(e) => {
            validacionCamposVacios(e);
          }}
        />
        <label for="floatingPassword">Apellido*</label>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="Contraseña"
          bind:value={correo}
          on:blur={(e) => {
            validacionCamposVacios(e);
          }}
        />
        <label for="floatingPassword">Correo*</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingInput"
          placeholder="Contraseña"
          bind:value={contraseña}
          minlength="6"
          maxlength="32"
          on:blur={(e) => {
            validacionCamposVacios(e);
          }}
        />
        <label for="floatingPassword">Contraseña*</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Contraseña"
          bind:value={doc_de_identidad}
        />
        <label for="floatingPassword">Documento de identidad</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          bind:value={telefono}
        />
        <label for="floatingPassword">Teléfono</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          bind:value={fechaNacimiento}
        />
        <label for="floatingPassword">Fecha de nacimiento</label>
      </div>
    </form>
    <button on:click|preventDefault={agregar_Usuario} class="buttonLogin"
      >Crear usuario</button
    >
  </div>
</section>
<ModalLogin />

<style>
  .sectionLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    background-color: #f5f5f5;
  }
  .divContainerLogin {
    background-color: white;
    padding: 25px 0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
  }
  .form-control,
  label {
    width: 300px;
  }
  /*   .validacionCampoError {
    border-color: #c42e26;
    color: #c42e26;
  } */
  .form-floating {
    margin: 10px 0;
  }
  .buttonLogin {
    padding: 20px;
    margin-top: 20px;
    border: 0;
    color: white;
    width: 200px;
    font-size: 20px;
    background-color: #000000;
  }
  .buttonLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .mensajeError {
    background-color: #ffe1e8;
    color: red;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px 10px 30px;
  }
</style>
