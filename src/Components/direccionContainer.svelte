<script>
  import {
    formDirecciones,
    variableBooleana,
    actualizar_crear_direccion,
    direcciones
    
  } from "../Apis/storage.js";
  import { keyLocalStorage, actualizar_Documento } from "../Apis/apis.js";
  import { onMount } from "svelte";
  
  import {navigate} from "svelte-routing"

  export let direccion;
  export let usuario
  /* let direcciones = []; */
  let usuarioActivo = []

  // funcion para actualizar la direccion
  const actualizarCampos = () => {
    $variableBooleana = true;

    // definicion de contenido en las variables
    $formDirecciones.id = direccion.id;
    $formDirecciones.receptor = direccion.receptor;
    $formDirecciones.contacto_receptor = direccion.contacto_receptor;
    $formDirecciones.departamento = direccion.departamento;
    $formDirecciones.ciudad = direccion.ciudad;
    $formDirecciones.barrio = direccion.barrio;
    $formDirecciones.tipo_de_calle = direccion.tipo_de_calle;
    $formDirecciones.primera_numeracion = direccion.primera_numeracion;
    $formDirecciones.segunda_numeracion = direccion.segunda_numeracion;
    $formDirecciones.tercera_numeracion = direccion.tercera_numeracion;
    $formDirecciones.apartamento = direccion.apartamento;
    $formDirecciones.codigo_postal = direccion.codigo_postal;
    $formDirecciones.descripcion = direccion.descripcion;

    // activar boton actualizar
    $actualizar_crear_direccion = true;

    
  };

  // funcion para eliminar una direccion
  const eliminarDireccion = async (id) => {
    
        // actualizacion de la informacion almacenada en el local storage

        // Obtencion de los datos almacenados en el local storage
        const data = JSON.parse(localStorage.getItem(usuario.key));

        //eliminacion del objeto
        const filteredArray = data.direcciones.filter((obj) => obj.id !== id); // Filter out the object

        // Actualizacion de datos
        data.direcciones = filteredArray
        $direcciones = data.direcciones

        // conversion de datos
        const dataActualizada = JSON.stringify(data);

        // Actualizacion de datos completos
        localStorage.setItem(usuario.key, dataActualizada);

        //actualizacion en la base de datos
        actualizar_Documento("usuarios",{direcciones:data.direcciones},data.id)
        console.log(filteredArray)
  };
  

/*   (async () => {
    await keyLocalStorage().then((key) => {
      usuarioActivo = {...JSON.parse(localStorage.getItem(key)),key:key};
      
    });
    console.log(usuarioActivo);
  })(); */
</script>

<div class="containerDireccion">
  <div class="informacion">
    <div>
      <h5>{direccion.receptor}</h5>
    </div>
    <div class="containerInformacion">
      <p>
        {direccion.tipo_de_calle}
        {direccion.primera_numeracion} # {direccion.segunda_numeracion} - {direccion.tercera_numeracion},
        Barrio {direccion.barrio}
        {#if direccion.codigo_postal}
          / {direccion.codigo_postal}
        {/if}
        {#if direccion.apartamento}
          / {direccion.apartamento} /
        {/if}
        <br />{direccion.departamento} / {direccion.ciudad}
      </p>
    </div>
  </div>
  <div class="btnAcciones">
    <span
      class="material-symbols-outlined icon"
      on:keypress={actualizarCampos}
      on:click={actualizarCampos}
    >
      edit
    </span>
    <span
      class="material-symbols-outlined icon"
      on:keypress={eliminarDireccion(direccion.id)}
      on:click={eliminarDireccion(direccion.id)}
    >
      delete
    </span>
  </div>
</div>

<style>
  .containerDireccion {
    padding: 15px;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: #f5f5f5;
    margin: 15px 0;
  }
  .informacion {
    width: 70%;
    line-height: 1;
  }
  .containerInformacion {
    display: flex;
  }
  .btnAcciones {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .icon {
    margin: 0 10px;
  }
  .icon:hover {
    cursor: pointer;
  }
</style>
