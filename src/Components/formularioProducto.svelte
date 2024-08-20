<script>
  //import de herramientas
  import {
    formProducto,
    imagenesTemporales,
    ventana_agregar_producto,
    actualizar_crear_direccion,
    cardProducto,
    form_producto_editar,
    mensajeBanner,
    alert_completado
  } from "../Apis/storage";
  import {
    agregar_documento,
    subirImagnes,
    obtenerUrlImagnes,
    actualizar_Documento,
    leer_Colecciones,
  } from "../Apis/apis";

  //import de componentes
  import Input from "../Components/input.svelte";
  import InputTextArea from "../Components/inputTextArea.svelte";
  import { element } from "svelte/internal";
  

  const agregar_Producto = async () => {
    let urls = await obtenerUrlImagnes($imagenesTemporales);

    //objeto con los valores del documento
    let obj = {
      nombre: $formProducto.nombre,
      categoria: $formProducto.categoria.toLowerCase(),
      cantidad: $formProducto.cantidad,
      descripcion: $formProducto.descripcion,
      precio: $formProducto.precio,
      sub_categoria: $formProducto.sub_categoria.toLowerCase(),
      imagenes: /*$imagenesTemporales*/ urls,
    };

    // invocacion de la funcion de creacion de documento
    agregar_documento("productos", obj).then(async () => {
      console.log("objeto cargado", obj);
      restablecer_valores();
      $cardProducto =[...$cardProducto,obj]
      $ventana_agregar_producto = false;
      $alert_completado = true
    $mensajeBanner="El producto ha sido creado"
    setTimeout(function() {
        $alert_completado = false
    },3000)
    });
  };
  // funcion para limpiar el formulario

  const restablecer_valores = () => {
    $formProducto.nombre = "";
    $formProducto.categoria = "";
    $formProducto.cantidad = "";
    $formProducto.descripcion = "";
    $formProducto.precio = "";
    $formProducto.sub_categoria = "";
    $formProducto.imagenes = [];
    $imagenesTemporales = [];
    $ventana_agregar_producto = false;
  };

  // Funcion para actualizar productos
  const actualizar_productos = async () => {
    let urls = await obtenerUrlImagnes($imagenesTemporales);
    console.log($imagenesTemporales)

    //objeto con los valores del documento
    let obj = {
      nombre: $formProducto.nombre,
      categoria: $formProducto.categoria.toLowerCase(),
      cantidad: $formProducto.cantidad,
      descripcion: $formProducto.descripcion,
      precio: $formProducto.precio,
      sub_categoria: $formProducto.sub_categoria.toLowerCase(),
      imagenes: $imagenesTemporales.length == 0 ? $formProducto.imagenes: urls,
    };
    actualizar_Documento("productos", obj, $form_producto_editar.id).then(async () => {
      console.log("objeto actualizado", obj);
      restablecer_valores();
      $cardProducto =[...$cardProducto.filter(element => element.id !==$form_producto_editar.id),obj];
      $ventana_agregar_producto = false;
      $alert_completado = true
    $mensajeBanner="El producto ha sido actualizado"
    setTimeout(function() {
        $alert_completado = false
    },3000)
    });
  };
  console.log($form_producto_editar);

  //////////// funcion para almacenar las imagenes en el storage

  const cargarImagenes = () => {
    try {
      // iteracion de los archivos
      for (const imagen of $imagenesTemporales) {
        if (imagen && imagen.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            let url = event.target.result;
            // Llamado de la funcion para cargar imagenes
            subirImagnes(imagen.name, url);
          };
          reader.readAsDataURL(imagen);
        }
      }
    } catch (error) {
      console.error("Error: " + error);
    }
    $alert_completado = true
    $mensajeBanner="Las imagenes han sido cargadas"
    setTimeout(function() {
        $alert_completado = false
    },3000)
  };
</script>

<div class="formularioProducto">
  
  <div class="btnCerrar">
    <i
      class="bi bi-x-circle-fill icon"
      on:keypress={restablecer_valores}
      on:click={restablecer_valores}
    ></i>
  </div>
  <h1>Ingrese el producto</h1>
  <form action="">
    <div class="containerFormularioPartes">
      <div class="formularioIzq">
        <Input
          variable={"nombre"}
          mensaje={"Nombre del producto"}
          directorio={$formProducto}
        />
        <Input
          variable={"categoria"}
          mensaje={"Categoria"}
          directorio={$formProducto}
        />
        <Input
          variable={"sub_categoria"}
          mensaje={"Sub. Categoria"}
          directorio={$formProducto}
        />
      </div>
      <div class="formularioDer">
        <Input
          variable={"cantidad"}
          mensaje={"Cantidad"}
          directorio={$formProducto}
        />
        <Input
          variable={"precio"}
          mensaje={"Precio"}
          directorio={$formProducto}
        />
      </div>
    </div>
    <InputTextArea
      variable={"descripcion"}
      mensaje={"Describe la información del producto"}
      directorio={$formProducto}
    />
  </form>
  {#if $actualizar_crear_direccion}
    <div class="btnProducto">
      <button class="buttonLogin" on:click={cargarImagenes}
        >Cargar imagenes</button
      >
      <button class="buttonLogin" on:click={actualizar_productos}
        >Actualizar producto</button
      >
    </div>
  {:else}
    <div class="btnProducto">
      <button class="buttonLogin" on:click={cargarImagenes}
        >Cargar imagenes</button
      >
      <button class="buttonLogin" on:click={agregar_Producto}
        >Agregar producto</button
      >
    </div>
  {/if}
</div>

<style>
  .formularioProducto {
    background-color: white;
    width: 50%;
    height: 650px;
    padding: 30px 20px;
  }
  .btnCerrar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    position: static;
    font-size: 20px;
  }
  .icon {
    transition: ease-in-out 0.1s;
  }
  .icon:hover {
    cursor: pointer;
    color: red;
  }

  .containerFormularioPartes {
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
  .formularioIzq {
    margin-right: 30px;
  }
  .formularioDer {
    margin-left: 30px;
  }
  .btnProducto {
    position: inherit;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 20px;
  }
  .buttonLogin {
    padding: 10px;
    margin: 20px;
    border: 0;
    color: white;
    width: 200px;
    height: 50px;
    font-size: 15px;
    background-color: #000000;
  }
  .buttonLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>
