<script>
  //import de componentes
  import ProductoCarrito from "../../Components/cardCarrito.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import PasarelaDePagos from "../../Components/pasarela_de_pagos.svelte";

  //import de herramientas
  import {
    carrito,
    ruta_protegida,
    ventana_modal_login,
    ventana_pasarela_de_pago,
    precioTotal,
  } from "../../Apis/storage";
  import { keyLocalStorage } from "../../Apis/apis";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  // variables auxiliares
  let usuarioActivo = [];
  $: valorFinal = $precioTotal;
  let total = 0;
  $: carritoReactivo = $carrito;
  let cantidad = 0;
  const formatter = new Intl.NumberFormat("es-ES");

  /*   let obj = {
    id: "6hX81N7ebn9Fbj4IJDV0",
    nombre: "Guayo Profesional Caucho Golty Top Speed",
    precio: "156.900",
    categoria: "futbol",
    sub_categoria: "balon",
    cantidad: "12",
    imagenes:
      "https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/productos%2Fguayo-profesional-caucho-top-speed-blanco1.png?alt=media&token=e04e18b7-744f-4878-81da-ca81dce66d7c",
  }; */

  //funcion para convertir los string en numeros
  const conversor_numeros = (numero, cantidad) => {
    let valorFinal = parseFloat(numero) * 1000 * cantidad;
    const numeroFormateado = formatter.format(valorFinal);
    return numeroFormateado;
  };

  //llamado a los datos
  onMount(async () => {
    await keyLocalStorage()
      .then((key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        $carrito = usuarioActivo.carrito;

        //Obtencion de los valores finales
        for (let i = 0; i < $carrito.length; i++) {
          let precio = $carrito[i].precio.replace(".", "");
          total = parseFloat(precio) * $carrito[i].cantidadCompra + total;
          $precioTotal = total;
          console.log(total);
        }
        cantidad = usuarioActivo.cantidadCompra;
        $precioTotal = formatter.format($precioTotal);
        $ruta_protegida = true;
      })
      .catch((error) => {
        $ruta_protegida = false;
      });
  });
</script>

{#if $ruta_protegida}
  <div class="contenedorGeneral">
    <div class="contenido">
      {#if carritoReactivo.length > 0}
        <h1 class="titulo">Carro ({carritoReactivo.length} productos)</h1>
      {:else}
        <h1 class="titulo">Carro</h1>
      {/if}

      {#if carritoReactivo.length > 0}
        {#each carritoReactivo as carrito}
          <div class="intento">
            <ProductoCarrito producto={carrito} usuario={usuarioActivo} />
          </div>
        {/each}
      {:else}
        <div class="mensaje">
          <div class="contenedorImg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FShopping.svg?alt=media&token=602dc686-e400-4573-a818-7a6856117ceb"
              alt="Imagen"
            />
          </div>
          <div class="texto">
            <h5>No has agregado ningún producto al carrito</h5>
          </div>
        </div>
      {/if}
    </div>
    <div class="informacionPago">
      <div>
        <h1 class="titulo">Resumen de la orden</h1>
      </div>
      <div class="contenidoFactura">
        <p>Productos ({carritoReactivo.length})</p>
        <p>${valorFinal}</p>
      </div>
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Descripción de los productos
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              {#each carritoReactivo as producto}
                <div class="contenidoDescripcion">
                  <p id="nombreProducto">{producto.nombre}</p>
                  <p id="precioProducto">
                    $ {conversor_numeros(
                      producto.precio,
                      producto.cantidadCompra
                    )}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="acciones">
        <button
          class="btnInformacion"
          on:click={() => ($ventana_pasarela_de_pago = true)}
          >Continuar compra</button
        >
      </div>
    </div>
  </div>
  {#if $ventana_pasarela_de_pago}
    <PasarelaDePagos usuario={usuarioActivo} />
  {/if}
{:else}
  <div class="contenedor">
    <div class="contenido2">
      <div class="mensaje">
        <div class="contenedorImg">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/Empty-cart.svg?alt=media&token=cc01bf5a-f161-452e-9698-a871def742e7"
            alt="Imagen"
          />
        </div>
        <div class="texto">
          <h5>Tu Carro está vacío</h5>
          <p>
            Inicia sesión para ver los productos que <br /> habias guardado en tu
            carro
          </p>
        </div>
      </div>
      <div class="btnInicioSesion">
        <button
          class="btnInformacion"
          on:click={() => ($ventana_modal_login = true)}>Iniciar sesión</button
        >
      </div>
      <div class="registro">
        <p>¿No tienes una cuenta?</p>
        <a href="/registro">Regístrate</a>
      </div>
    </div>
  </div>
  <ModalLogin />
{/if}

<style>
  /* Estilos para sesion no logueada*/
  .contenedor {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
  }
  .contenido2 {
    background-color: white;
    width: 85%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 20px 0;
  }
  .mensaje {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
  }
  .contenedorImg {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .contenedorImg > img {
    width: 60%;
  }
  .texto {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 15px;
  }
  .btnInicioSesion {
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .btnInformacion {
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }

  .registro {
    width: 50%;
    display: flex;
    justify-content: center;
    font-size: 15px;
  }
  .registro > p {
    opacity: 0.8;
    margin-right: 10px;
  }
  .registro > a {
    color: black;
  }
  .registro > a:hover {
    color: blue;
  }

  /* Estilos para el carrito sin contenido*/

  .mensaje {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .contenedorImg {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .contenedorImg > img {
    width: 50%;
  }
  .texto {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Designacion del tipo de letra*/
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 7;
    font-style: normal;
  }
  h5 {
    font-size: 25px;
  }

  /* Estilos para el carrito con contenido*/
  .contenedorGeneral {
    padding: 50px 80px;
    display: flex;
    background-color: #f5f5f5;
  }
  .contenido {
    background-color: white;
    border-radius: 15px;
    flex: 2;
    padding: 30px;
    display: flex;
    flex-direction: column;
  }
  .contenido > .intento {
    display: flex;
    justify-content: center;
  }
  .informacionPago {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    flex: 1;
    margin: 0 15px;
    height: 100%;
  }
  .titulo {
    /* font-size: 35px; */
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 7;
    font-style: normal;
    font-size: 30px;
    border-bottom: 1px solid black;
  }
  .contenidoFactura {
    padding: 10px 15px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
  }
  .contenidoDescripcion {
    display: flex;
  }
  #nombreProducto {
    width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
  }
  .acciones {
    margin: 10px 0;
    border-top: 1px solid black;
    padding: 15px 0;
    display: flex;
    justify-content: center;
  }

  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@607&display=swap");
</style>
