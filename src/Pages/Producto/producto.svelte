<script>
  // importacion de componentes
  import SliderCards from "../../secciones/sliderCards.svelte";
  import ModalCompras from "../../Components/pagos_rapidos.svelte";
  import ModalLogin from "../../Components/loginModal.svelte"

  // importacion de herramientas
  import { getAuth } from "firebase/auth";
  import {
    leer_documento,
    actualizar_Documento,
    keyLocalStorage,
  } from "../../Apis/apis";
  import {
    ventana_Modal_pago_rapido,
    producto_compra,
    variable_favoritos,
    ventana_modal_login,
    contador
  } from "../../Apis/storage";
  import { onMount } from "svelte";

  //import de componentes
  import CarruselProducto from "../../secciones/carrusel_producto.svelte";

  // creacion de variables
  let cantidadCompra = 1;
  let producto = {};
  let imagenes = [];
  let usuarioActivo = [];
  let pathname;
  let variable = false;
  let variable_mensaje_compra = false;
  let productoFavoritoTrue =[]
  $: intento = $variable_favoritos
  export let params;
  console.log(params);



  // funciones para aumentar y reducir el contador de cantidad
  const aumentar = () => {
    if (cantidadCompra > 20 || cantidadCompra >= parseInt(producto.cantidad)) {
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
        cantidadCompra < parseInt(producto.cantidad)
      ) {
        variable_mensaje_compra = false;
      }
    }
  };

  // funcion para agregar a favoritos
  const agregar_favoritos = async () => {
    if (usuarioActivo.favoritos.length > 0) {
      /* 
      usuarioActivo.favoritos = [...usuarioActivo.favoritos,producto] */
      /* actualizar_Documento("usuarios",{favoritos:[...usuarioActivo.favoritos,producto]},usuarioActivo.id) */
      const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

      // Actualizacion de datos
      data.favoritos = [...data.favoritos, producto];

      // conversion de datos
      const dataActualizada = JSON.stringify(data);

      // Actualizacion de datos completos
      localStorage.setItem(usuarioActivo.key, dataActualizada);

      //actualizacion en la base de datos
      actualizar_Documento("usuarios", { favoritos: data.favoritos }, data.id);
    } else {
      usuarioActivo.favoritos = [producto];
      const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

      // Actualizacion de datos
      data.favoritos = [...data.favoritos, producto];
      intento = data.favoritos

      // conversion de datos
      const dataActualizada = JSON.stringify(data);

      // Actualizacion de datos completos
      localStorage.setItem(usuarioActivo.key, dataActualizada);

      //actualizacion en la base de datos
      actualizar_Documento("usuarios", { favoritos: data.favoritos }, data.id);
    }
    $variable_favoritos = true;
  };

  //funcion para eliminar de favoritos
  const eliminar_favorito =() =>{
    // obtencion de data del localStorage
    const data = JSON.parse(localStorage.getItem(usuarioActivo.key));

    // actualizacion del array
    let favoritos = data.favoritos.filter(favorito => favorito.id !== producto.id);
    data.favoritos = favoritos
    $variable_favoritos = false

    //conversion de datos
    const dataActualizada = JSON.stringify(data);

    //actualizacion de datos en el local Storage
    localStorage.setItem(usuarioActivo.key, dataActualizada)

    //actualizacion en la base de datos
    actualizar_Documento("usuarios",{favoritos:data.favoritos},data.id)

  }

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

  //funcion para abrir modal
  const abrirModal = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      $ventana_Modal_pago_rapido = true;
      $producto_compra = producto;
      agregar_carrito();
    }else{
      $ventana_modal_login = true;
    }
    
  };

   //variables auxiliares
   let variable_timer = false

setTimeout((() => variable_timer = true),1500);

  (async()=>{
    await keyLocalStorage().then((key) => {
      usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
    });
    

    // Encontrar si el producto ya se encuentra en la lista de favoritos
    const index = usuarioActivo.favoritos.findIndex((obj) => obj.id === producto.id);
    index !== -1
    ? $variable_favoritos = true
    : $variable_favoritos =false;

    productoFavoritoTrue = usuarioActivo.favoritos.filter(
      (favorito) => favorito.id == producto.id
    );
    console.log(index)
  })();
  onMount(async()=>{
    // individualizacion del id para busqueda especifica
    pathname = window.location.pathname.split("/")[2];

    // Busqueda del producto especifico en la base de datos
    producto = await leer_documento("productos", pathname);

    imagenes = producto.imagenes;

    // definicion de variable para los sliders
    variable = true;
  })

</script>
{#if variable_timer}

<section class="containerPrincipal">
  <div class="containerContenido">
    <div class="containerImgProducto">
      <CarruselProducto imagenes={imagenes}/>
      <!-- <img src={imagenes[0]} alt="" /> -->
    </div>
    <div class="containerInformacionProducto">
      <div class="btnFavoritos">
        {#if intento}
          <span class="material-symbols-outlined favorito"
          on:click={eliminar_favorito}
          on:keypress={eliminar_favorito}
          > heart_minus </span>
        {:else}
          <span
            class="material-symbols-outlined icon"
            on:click={agregar_favoritos}
            on:keypress={agregar_favoritos}
          >
            heart_plus
          </span>
        {/if}
      </div>
      <br />
      <h3 class="titulo">{producto.nombre}</h3>
      <label for="">{producto.categoria} > {producto.sub_categoria}</label>
      <br />
      <p class="precio">${producto.precio}</p>
      <br />
      <label for="">{producto.cantidad} unds. restantes</label>
      <br />
      <div class="cantidadesCompra">
        <button class="buttonContador" on:click={reducir}>-</button>
        <input
          type="text"
          class="inputCantidad"
          bind:value={cantidadCompra}
          on:blur={() => {
            if (
              cantidadCompra > 20 ||
              cantidadCompra >= parseInt(producto.cantidad)
            ) {
              variable_mensaje_compra = true;
            }
          }}
        />
        <button class="buttonContador" on:click={aumentar}>+</button>
      </div>
      {#if variable_mensaje_compra}
        <p class="mensajeError">
          El número solicitado a superado las cantidades disponibles o
          permitidas
        </p>
      {/if}
      <br />
      <div class="btnAcciones">
        <button class="buttonLogin" on:click={abrirModal}
          >Agregar al carrito</button
        >
      </div>
    </div>
  </div>
</section>
{/if}
<div class="containerPrincipal">
  {#if variable}
    <SliderCards
      categoria={producto.categoria}
      subCategoria={producto.sub_categoria}
    />
  {/if}
</div>
{#if $ventana_Modal_pago_rapido}
  <ModalCompras {cantidadCompra} />
{/if}
<ModalLogin />



<style>
  /* Contenedor general*/
  .containerPrincipal {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    width: 100%;
    padding: 20px;
  }

  /* Contenedor del producto total*/
  .containerContenido {
    background-color: white;
    display: flex;
    width: 80%;
  }

  /* Contenedor de la imagen del producto*/
  .containerImgProducto {
    width: 50%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(128, 128, 128, 0.392);
  }

  /* Contenedor dela informacion del producto */
  .containerInformacionProducto {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
  }
  .btnFavoritos {
    width: auto;
    display: flex;
    justify-content: flex-end;
  }
  .titulo {
    font-size: 30px;
  }
  .precio {
    font-size: 30px;
  }
  /* Estilos de los botones y el input de la cantidad*/
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
  .mensajeError {
    color: #c42e26;
    font-size: 10px;
  }
  .buttonContador:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .buttonLogin {
    padding: 20px;
    margin-top: 20px;
    border: 0;
    color: white;
    width: 250px;
    font-size: 20px;
    background-color: #000000;
  }
  .buttonLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .icon {
    font-size: 35px;
  }
  .icon:hover {
    cursor: pointer;
    color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .favorito {
    font-size: 35px;
    color: #c42e26;
  }
  .favorito:hover{
    color: #000000;
    transition: ease-in-out 0.5s;
    cursor: pointer;
  }
</style>
