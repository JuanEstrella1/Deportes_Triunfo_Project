<script>
  import {
    formDirecciones,
    variableBooleana,
    actualizar_crear_direccion,
    direcciones,
  } from "../Apis/storage";
  import { onMount } from "svelte";

  import {
    actualizar_Documento,
    keyLocalStorage,
    idGenerator,
  } from "../Apis/apis.js";

  import Input from "../Components/input.svelte";
  import InputOpcional from "../Components/InputOpcional.svelte";
  import InputTextArea from "../Components/inputTextArea.svelte";

  //// Definicion de variables

  let usuarioActivo = [];
  /* let direcciones = []; */

  ///// variables para cerrar ventana modal

  const cerrarVentanaModal = () => {
    $variableBooleana = false;
    restablecer_valores()
  };

  /////////// Funciones para crear, editar y eliminar una direccion

  // funcion para crear una direccion
  const crearDireccion = () => {
    // Definicion del objeto direcciones
    let obj = {
      id: idGenerator(),
      receptor: $formDirecciones.receptor,
      contacto_receptor: $formDirecciones.contacto_receptor,
      departamento: $formDirecciones.departamento,
      ciudad: $formDirecciones.ciudad,
      barrio: $formDirecciones.barrio,
      tipo_de_calle: $formDirecciones.tipo_de_calle,
      primera_numeracion: $formDirecciones.primera_numeracion,
      segunda_numeracion: $formDirecciones.segunda_numeracion,
      tercera_numeracion: $formDirecciones.tercera_numeracion,
      apartamento: $formDirecciones.apartamento,
      codigo_postal: $formDirecciones.codigo_postal,
      descripcion: $formDirecciones.descripcion,
    };

    console.log(obj);

    // actualizacion de el local Storage
    // llamado de la funcion para obtener la lave que guarda los datos en el local storage

    // actualizacion de la informacion almacenada en el local storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

    // Actualizacion de datos
    data.direcciones = [...data.direcciones, obj];
    $direcciones = data.direcciones;

    // conversion de datos
    const dataActualizada = JSON.stringify(data);

    // Actualizacion de datos completos
    localStorage.setItem(usuarioActivo.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento(
      "usuarios",
      { direcciones: data.direcciones },
      data.id
    );

    $variableBooleana = false;
    restablecer_valores()
  };

  /////7 actualizar direccion
  const actualizarDireccion = async (id) => {
    // definicion del nuevo objeto
    let obj = {
      id: $formDirecciones.id,
      receptor: $formDirecciones.receptor,
      contacto_receptor: $formDirecciones.contacto_receptor,
      departamento: $formDirecciones.departamento,
      ciudad: $formDirecciones.ciudad,
      barrio: $formDirecciones.barrio,
      tipo_de_calle: $formDirecciones.tipo_de_calle,
      primera_numeracion: $formDirecciones.primera_numeracion,
      segunda_numeracion: $formDirecciones.segunda_numeracion,
      tercera_numeracion: $formDirecciones.tercera_numeracion,
      apartamento: $formDirecciones.apartamento,
      codigo_postal: $formDirecciones.codigo_postal,
      descripcion: $formDirecciones.descripcion,
    };

    // localizacion de la posicion de la direccion a actualizar en el array
    const index = usuarioActivo.direcciones.findIndex((obj) => obj.id === id);

    // modificación del obj de la direccion
    if (index !== -1) {
      // llamado al localStorage
      const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

      // actualizacion de datos

      data.direcciones[index] = obj;
      console.log(obj.id);

      // conversion de datos
      const dataActualizada = JSON.stringify(data);

      // Actualizacion de datos completos
      localStorage.setItem(usuarioActivo.key, dataActualizada);
      $direcciones = data.direcciones;

      //actualizacion de datos completos
      actualizar_Documento(
        "usuarios",
        { direcciones: data.direcciones },
        usuarioActivo.id
      ).then(() => {console.log("actualizacion exitosa")})
    }
    $variableBooleana = false;
    restablecer_valores()
  };

  //funcion para restablecer valores

  const restablecer_valores = ()=>{
      $formDirecciones.id = ""
      $formDirecciones.receptor = ""
      $formDirecciones.contacto_receptor = ""
      $formDirecciones.departamento = ""
      $formDirecciones.ciudad = ""
      $formDirecciones.barrio = ""
      $formDirecciones.tipo_de_calle = ""
      $formDirecciones.primera_numeracion = ""
      $formDirecciones.segunda_numeracion = ""
      $formDirecciones.tercera_numeracion = ""
      $formDirecciones.apartamento = ""
      $formDirecciones.codigo_postal = ""
      $formDirecciones.descripcion = ""
  }

 

  onMount(async () => {
    await keyLocalStorage().then((key) => {
      usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
    });
    console.log(usuarioActivo)
  });
</script>

{#if $variableBooleana}
  <div class="containerForm">
    <div class="seccion1">
      <div class="titulo">
        <span class="material-symbols-outlined icon"> location_on </span>
        <h2>Agregar direccion</h2>
      </div>
    </div>

    <div class="seccion1">
      <p>Datos de la persona que recibe</p>
      <div class="informacionInputs">
        <Input
          variable={"receptor"}
          mensaje={"¿Quién recibe?"}
          directorio={$formDirecciones}
        />
        <InputOpcional
          variable={"contacto_receptor"}
          mensaje={"Número de la persona (opcional)"}
          directorio={$formDirecciones}
        />
      </div>
    </div>

    <div class="seccion1">
      <p>Nueva dirección</p>
      <div class="informacionInputs1">
        <Input
          variable={"departamento"}
          mensaje={"Departamento"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"ciudad"}
          mensaje={"Ciudad"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"barrio"}
          mensaje={"Barrio"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"tipo_de_calle"}
          mensaje={"Tipo de calle (Cll, Cra, Av.)"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"primera_numeracion"}
          mensaje={"Número"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"segunda_numeracion"}
          mensaje={"#"}
          directorio={$formDirecciones}
        />
        <Input
          variable={"tercera_numeracion"}
          mensaje={"-"}
          directorio={$formDirecciones}
        />
      </div>
    </div>

    <div class="seccion1">
      <p>Información extra</p>
      <div class="informacionInputs3">
        <div style="display: flex;">
          <InputOpcional
            variable={"apartamento"}
            mensaje={"Piso / Apartamento (opcional)"}
            directorio={$formDirecciones}
          />
          <InputOpcional
            variable={"codigo_postal"}
            mensaje={"Código postal (opcional)"}
            directorio={$formDirecciones}
          />
        </div>

        <InputTextArea
          variable={"descripcion"}
          mensaje={"Describe la información adicional."}
          directorio={$formDirecciones}
        />
      </div>
    </div>
    <div class="seccion1">
      <div class="seccionBtn">
        <button class="btnInformacion" on:click={cerrarVentanaModal}
          >Cancelar</button
        >
        {#if !$actualizar_crear_direccion}
          <button class="btnInformacion" on:click={crearDireccion}
            >Agregar dirección</button
          >
        {:else}
          <button
            class="btnInformacion"
            on:click={actualizarDireccion($formDirecciones.id)}
            >Actualizar</button
          >
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
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
  .titulo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 0;
    margin-top: 30px;
  }
  .icon {
    font-size: 40px;
  }
  .containerForm {
    background-color: rgba(0, 0, 0, 0.436);
    top: -1vw;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
  }
  .seccion1 {
    width: 70%;
    background-color: white;
    padding: 10px 70px;
  }
  .informacionInputs {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(0, 0, 0, 0.493);
  }
  .informacionInputs1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(7, 7, 7, 0.603);
  }
  .informacionInputs3 {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
  }
  .seccionBtn {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
</style>
