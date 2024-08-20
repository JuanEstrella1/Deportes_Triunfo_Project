<script>
  import { onMount } from "svelte";

  // importacion de herramientas
  import {
    ventana_Modal_pago_rapido,
    producto_compra,
    contador,
  } from "../Apis/storage";
  import { keyLocalStorage, actualizar_Documento } from "../Apis/apis";
  import { navigate } from "svelte-routing";

  // variables
  export let cantidadCompra = 1;
  let usuarioActivo = [];
  let variable_mensaje_compra = false;

  // funciones para aumentar y reducir el contador de cantidad
  const aumentar = () => {
    if (
      cantidadCompra > 20 ||
      cantidadCompra > parseInt($producto_compra.cantidad)
    ) {
      variable_mensaje_compra = true;
    } else {
      cantidadCompra += 1;
    }
  };
  const reducir = () => {
    if (cantidadCompra >= 1) {
      cantidadCompra -= 1;
      if (
        cantidadCompra <= 20 ||
        cantidadCompra < parseInt($producto_compra.cantidad)
      ) {
        variable_mensaje_compra = false;
      }
    }
  };

  // funcion para agregar a carrito
  const agregar_carrito = async () => {
    //obtencion de datos locales
    const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

      let index = data.carrito.findIndex(
        (element) => element.id === $producto_compra.id
      );
       if (index === -1) {
        // Actualizacion de datos
        data.carrito = [
          ...data.carrito,
          { ...$producto_compra, cantidadCompra: cantidadCompra },
        ];

        // conversion de datos
        const dataActualizada = JSON.stringify(data);
        $contador = data.carrito.length;
        // Actualizacion de datos completos
        localStorage.setItem(usuarioActivo.key, dataActualizada);

        //actualizacion en la base de datos
        actualizar_Documento("usuarios", { carrito: data.carrito }, data.id);
      
    } 
  };

  //funcion para ir al carro despues de cargar datos
  const rutaCarrito = () => {
    agregar_carrito().then(() => {
      navigate("/carrito");
      location.reload();
    });
  };

  // funcion para cerrar ventana modal
  const cerrarVentanaModal = () => {
    $ventana_Modal_pago_rapido = false;
    agregar_carrito();
    $producto_compra = {};
  };

  onMount(async () => {
    await keyLocalStorage().then((key) => {
      usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
      console.log(usuarioActivo);
    });
  });
</script>

<section class="containerGeneral">
  <div class="contenido">
    <div class="informacionInicial">
      <div class="parte1">
        <i class="bi bi-check-circle icon"></i>
        <p>Lo que llevas en tu carro</p>
      </div>
      <div class="parte2">
        <i
          class="bi bi-x-lg icon"
          on:keypress={cerrarVentanaModal}
          on:click={cerrarVentanaModal}
        ></i>
      </div>
    </div>

    <div class="contenidoInforProducto">
      <div class="containerImg">
        <img src={$producto_compra.imagenes[0]} alt={$producto_compra.nombre} />
      </div>
      <div class="containerInformacion">
        <p class="titulo">{$producto_compra.nombre}</p>
        <p>$ {$producto_compra.precio}</p>
      </div>
      <div class="cantidades">
        <div class="cantidadesCompra">
          <button class="buttonContador" on:click={reducir}>-</button>
          <input
            type="text"
            class="inputCantidad"
            bind:value={cantidadCompra}
            on:blur={() => {
              if (
                cantidadCompra > 20 ||
                cantidadCompra >= parseInt($producto_compra.cantidad)
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
          <p class="disponibles">
            {$producto_compra.cantidad} unds. disponibles
          </p>
        {/if}
        <br />
      </div>
    </div>

    <div class="btnAcciones">
      <button class="btnCerraVentana" on:click={cerrarVentanaModal}
        >Seguir comprando</button
      >
      <button class="btnInformacion" href="/carrito" on:click={rutaCarrito}
        >Ir al carro</button
      >
    </div>
  </div>
</section>

<style>
  /* Contenedores principales del contenido*/
  .containerGeneral {
    background-color: rgba(0, 0, 0, 0.326);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
  }
  .contenido {
    background-color: white;
    width: 50%;
    padding: 20px;
  }
  /* Titulos principales de guia*/
  .informacionInicial {
    display: flex;
    height: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.721);
  }
  .parte1 {
    display: flex;
    flex: 2;
    font-size: 25px;
  }
  .bi-check-circle {
    color: greenyellow;
    font-size: 30px;
    margin: 0 10px;
  }

  .parte2 {
    flex: 1;
    padding-right: 15px;
    width: auto;
    font-size: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .bi-x-lg:hover {
    cursor: pointer;
  }
  /* Seccion de informacion de la compra*/
  .contenidoInforProducto {
    width: 90%;
    display: flex;
    height: 250px;
    margin-top: 15px;
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
    padding-right: 10px;
    /*margin-top: 15px; 
    line-height: 0.3; */
    flex: 3;
  }
  /* Seccion de cantidades*/
  .cantidades {
    display: flex;
    flex-direction: column;
  }
  .cantidadesCompra {
    display: flex;
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
  .disponibles {
    font-size: 10px;
    text-align: center;
    opacity: 0.8;
  }
  .mensajeError {
    color: #c42e26;
    font-size: 10px;
  }
  /* Seccion de botones finales*/
  .btnAcciones {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
  }
  .btnCerraVentana {
    margin: 0 15px;
    border: 0;
    background-color: white;
    text-decoration: underline;
    color: black;
  }
  .btnCerraVentana:hover {
    cursor: pointer;
    color: blue;
  }
  .btnInformacion {
    text-align: center;
    padding: 10px;
    border: 0;
    color: white;
    width: 200px;
    font-size: 15px;
    background-color: #000000;
    text-decoration: none;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>
