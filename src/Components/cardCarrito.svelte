<script>
  //import de herramientas 
  import {carrito, contador,precioTotal} from "../Apis/storage"
  import {actualizar_Documento} from "../Apis/apis"
    // variables
    export let producto
    export let usuario
    let variable_mensaje_compra = false
    const formatter = new Intl.NumberFormat("es-ES");

      // funciones para aumentar y reducir el contador de cantidad
  const aumentar = () => {
    if (producto.cantidadCompra > 20 || producto.cantidadCompra >= parseInt(producto.cantidad)) {
      variable_mensaje_compra = true;
    } else {
      producto.cantidadCompra += 1;
    }
  };
  const reducir = () => {
    if (producto.cantidadCompra >= 1) {
      producto.cantidadCompra -= 1;
      if (
        producto.cantidadCompra <= 20 ||
        producto.cantidadCompra < parseInt(producto.cantidad)
      ) {
        variable_mensaje_compra = false;
      }
    }
  };

    // funcion para eliminar una direccion
    const eliminarCarrito = async (id) => {
    
    // actualizacion de la informacion almacenada en el local storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(usuario.key));

    //eliminacion del objeto
    const filteredArray = data.carrito.filter((obj) => obj.id !== id); // Filter out the object

    // Actualizacion de datos
    data.carrito = filteredArray
    $carrito = data.carrito
    $contador = data.carrito.length
    let numero = 0
    console.log(parseFloat($precioTotal.replace(/\./g, '')));
    numero = (parseFloat($precioTotal.replace(/\./g, ''))) - ((parseFloat(producto.precio)*1000) * producto.cantidadCompra);
    /* $precioTotal = $precioTotal = formatter.format(numero); */
    $precioTotal = formatter.format(numero);

    // conversion de datos
    const dataActualizada = JSON.stringify(data);

    // Actualizacion de datos completos
    localStorage.setItem(usuario.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento("usuarios",{carrito:data.carrito},data.id) 
};
</script>
<div class="contenidoInforProducto">
    <div class="containerImg">
      <img src={producto.imagenes[0]} alt={producto.nombre} />
    </div>
    <div class="containerInformacion">
      <p class="titulo">{producto.nombre}</p>
      <p>$ {producto.precio}</p>
    </div>
    <div class="cantidades">
      <div class="cantidadesCompra">
        <button class="buttonContador" on:click={reducir}>-</button>
        <input
          type="text"
          class="inputCantidad"
          bind:value={producto.cantidadCompra}
          on:blur={() => {
            if (
              producto.cantidadCompra > 20 ||
              producto.cantidadCompra >= parseInt(producto.cantidad)
            ) {
              variable_mensaje_compra = true;
            }
          }}
        />
        <button class="buttonContador" on:click={aumentar}>+</button>
      </div>
      {#if variable_mensaje_compra}
        <p class="mensajeError">
          El número solicitado a superado <br /> las cantidades disponibles o permitidas
        </p>
      {:else}
      <p class="disponibles">{producto.cantidad} unds. disponibles</p>
      {/if}
      <br />
    </div>
    <div class="btnBorrar">
        <i class="bi bi-trash3 icon" on:keypress={eliminarCarrito(producto.id)} on:click={eliminarCarrito(producto.id)}></i>
    </div>
  </div>
  
  <style>

    /* Seccion de informacion de la compra*/
    .contenidoInforProducto {
      width: 90%;
      display: flex;
      margin-top: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.738);
    }
    .containerImg {
      display: flex;
      justify-content: center;
      flex: 1;
      height: 100px;
    }
    img {
      width: auto;
    }
    .containerInformacion {
      width: 90%;
      flex: 3;
    }
    /* Seccion de cantidades*/
    .cantidades{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 30px;
      width: 200px;
    }
    .cantidadesCompra {
      display: flex;
      align-items: center;
      height: 35px;
    }
    .inputCantidad {
      width: 50px;
      border: 1px solid white;
      display: flex;
      text-align: center;
    }
    .buttonContador {
      border: 0;
      color: white;
      width: 30px;
      font-size: 15px;
      background-color: #000000;
    }
    .disponibles{
      font-size: 10px;
      text-align: center;
      opacity: 0.8;
    }
    .mensajeError {
      color: #c42e26;
      font-size: 10px;
      text-align: center;
    }
    .btnBorrar{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;

    }
    .icon{
        font-size: 25px;
    }
    .icon:hover{
        cursor: pointer;
        color: #c42e26;
        transition: ease-in-out 0.5s;
    }

  </style>
  