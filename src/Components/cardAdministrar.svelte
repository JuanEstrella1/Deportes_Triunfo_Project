<script>
  //import de herramientas
  import {
    actualizar_crear_direccion,
    cardProducto,
    formProducto,
    ventana_agregar_producto,
    form_producto_editar,
    mensajeBanner,
    alert_completado,
  } from "../Apis/storage";
  import { eliminar_Documento, leer_Colecciones } from "../Apis/apis";
  import { element } from "svelte/internal";

  // Definicion de variables
  export let producto;
  $: imagenes = producto.imagenes[0];

  // funcion para abrir la ventana de actualizar producto
  const actualizarCampos = () => {
    // activar boton actualizar
    $actualizar_crear_direccion = true;
    $ventana_agregar_producto = true;

    // definicion de contenido en las variables
    $formProducto.cantidad = producto.cantidad;
    $formProducto.categoria = producto.categoria;
    $formProducto.descripcion = producto.descripcion;
    $formProducto.imagenes = producto.imagenes;
    $formProducto.nombre = producto.nombre;
    $formProducto.precio = producto.precio;
    $formProducto.sub_categoria = producto.sub_categoria;

    $form_producto_editar = { ...$formProducto, id: producto.id };
  };

  // funcion para eliminar una direccion
  const eliminarDireccion = async () => {
    let confirmacion = confirm("Esta seguro de eliminar este Producto");

    if (confirmacion) {
      console.log($cardProducto);
      //actualizacion en la base de datos
      eliminar_Documento("productos", producto.id).then(async () => {
        $cardProducto = [...$cardProducto.filter(element => element.id !== producto.id)]
        $alert_completado = true;
        $mensajeBanner = "Producto eliminado con exito" 
        setTimeout(function() {
        $alert_completado = false
        location.reload();
    },3000)
      });
    } else {
      console.log("El producto no ha sido eliminado");
    }
  };
</script>

<div class="card">
  <div class="btnClose">
    <i
      class="bi bi-x-circle-fill icon"
      on:keypress={eliminarDireccion}
      on:click={eliminarDireccion}
    ></i>
  </div>

  <img src={imagenes} class="card-img-top" alt="Imagenes del producto " />
  <div class="card-body">
    <h5 class="card-title">{producto.nombre}</h5>
    <p class="card-text">$ {producto.precio}</p>
    <p><b>Disponibles:</b> {producto.cantidad} und(s).</p>
  </div>
  <div class="accionesBtn">
    <button class="btnLogin" on:click={actualizarCampos}>Editar</button>
  </div>
</div>

<style>
  .btnClose {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: absolute;
    top: -10px;
    left: 10px;
  }
  .icon {
    font-size: 20px;
  }
  .icon:hover {
    cursor: pointer;
    color: red;
    transition: ease-in-out 0.5s;
  }
  .card-title {
    width: 80%;
    font-size: 15px;
    line-height: 1.2em; /* Ajusta el valor según tu fuente y diseño */
    height: 2.4em; /* El doble de line-height para dos líneas */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-body {
    height: auto;
  }
  img {
    width: 100%;
    height: auto;
  }
  .accionesBtn {
    display: flex;
  }
  .btnLogin {
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    font-size: 15px;
    background-color: #000000;
  }
  .btnLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>
