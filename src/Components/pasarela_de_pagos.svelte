<script>
  //import de herramientas
  import { ventana_pasarela_de_pago, formCarrito,direccionSeleccionada,carrito,contador, precioTotal, } from "../Apis/storage";
  import { idGenerator, agregar_documento, actualizar_Documento } from "../Apis/apis";

  //import de componentes
  import Input from "./input.svelte";
  import SeleccionarDireccion from "./seleccionar_direccion.svelte";
  import SeleccionarTarjeta from "./seleccion_tarjeta.svelte";
  import AnexarTarjeta from "./anexarTarjeta.svelte";
  import { navigate } from "svelte-routing";
  

  //Variables auxiliares
  export let usuario;
  $: usuario
  let imagenes = [
    "https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2F1.png?alt=media&token=be1b778b-0e1e-4afc-af54-05ba4e4c9e98",
    "https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2F2.png?alt=media&token=4a087dd4-7370-4b55-adb0-19e93b40b55b",
  ];

  //designacion de valores para los inputs
  $formCarrito.nombre = usuario.nombre;
  $formCarrito.apellido = usuario.apellido;
  $formCarrito.telefono = usuario.telefono;
  $formCarrito.documento_de_identidad = usuario.documento_de_identidad;
  usuario.carrito = $carrito

  //funcion para cerrar la ventana de pagos
  const cerrar_ventana = () => {
    $ventana_pasarela_de_pago = false;
  };


  //funcion para finalizar compra
  const finales_venta = async() => {

    // definicion de la referencia del pedido
    const referencia_pedido = idGenerator();

    // Obtencion de la informacion de la direccion seleccionada
    let direccionEnvio = usuario.direcciones.filter(direccion=> direccion.id === $direccionSeleccionada);
    console.log(direccionEnvio)

    // definicion de los productos individualizados
    let nuevo_carrito = $carrito.map((elemento) => {
      return {
        nombre: elemento.nombre,
        imagen: elemento.imagenes[0],
        cantidad: elemento.cantidadCompra,
        precio: elemento.precio,
      };
    });

    // definicion objeto de la persona
    let obj_persona = {
      carrito: nuevo_carrito,
      referencia_pedido:referencia_pedido,
      fecha_compra:new Date(),
      total: $precioTotal
    };

    // definicion objeto para administrador
    let obj_admin = {
      carrito: nuevo_carrito,
      referencia_pedido:referencia_pedido,
      nombre_cliente: usuario.nombre +" "+ usuario.apellido,
      documento_cliente: usuario.documento_de_identidad,
      telefono_cliente:usuario.telefono,
      direccion_de_envio: direccionEnvio == [] ? usuario.direccion[0] : direccionEnvio,
      fecha_compra: new Date(),
      total: $precioTotal
    }

        // actualizacion de la informacion almacenada en el local storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(usuario.key));

    // Actualizacion de datos
    data.pedidos = [...data.pedidos, obj_persona];
    data.carrito = []
    $carrito = []
    /* $direcciones = data.direcciones; */

    // conversion de datos
    const dataActualizada = JSON.stringify(data);

    // Actualizacion de datos completos
    localStorage.setItem(usuario.key, dataActualizada);

    await agregar_documento("pedidos",obj_admin).then(()=>{
      actualizar_Documento("usuarios",{pedidos:data.pedidos},usuario.id)
      actualizar_Documento("usuarios",{carrito:data.carrito},usuario.id)
      $ventana_pasarela_de_pago=false
      $contador = 0
      navigate('/perfil_usuario/pedidos')
    })


  };

  

</script>

<section class="contenedor">
  <div class="contenido_pasarela">
    <div class="btnClose">
      <i
        class="bi bi-x-lg icon"
        on:keypress={cerrar_ventana}
        on:click={cerrar_ventana}
      ></i>
    </div>
    <div class="titulo">Pasos finales</div>
    <div class="pasosFinales">
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              1. Datos personales
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
          >
            <div class="accordion-body inputPerfil">
              <Input
                variable={"nombre"}
                mensaje={"Nombre"}
                directorio={$formCarrito}
              />
              <Input
                variable={"apellido"}
                mensaje={"Apellido"}
                directorio={$formCarrito}
              />
              <Input
                variable={"documento_de_identidad"}
                mensaje={"Doc. identidad"}
                directorio={$formCarrito}
              />
              <Input
                variable={"telefono"}
                mensaje={"Telefóno"}
                directorio={$formCarrito}
              />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              2. Dirección de envio
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse"
          >
            <div class="accordion-body">
              <form id="miFormulario">
                {#each usuario.direcciones as direccion}
                  <SeleccionarDireccion {direccion} />
                {/each}
              </form>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              3. Método de pago
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            class="accordion-collapse collapse"
          >
            <div class="accordion-body metodos">
              {#each usuario.metodos_de_pago as metodo, index}
                <div class="containerMetodo tarjetas">
                  {#if metodo.estado}
                    <SeleccionarTarjeta
                      tarjeta={metodo}
                      imagen={imagenes[index]}
                    />
                  {:else}
                    <div class="btnAgregarTarjeta">
                      <img src={imagenes[index]} alt="Tarjeta {metodo.modo}" />
                      <AnexarTarjeta
                        nombre_tarjeta={metodo.modo}
                        propietario={usuario}
                      />
                    </div>
                  {/if}
                </div>
              {/each}

              <!-- <div class="containerMetodo">
                {#if usuario.metodos_de_pago.tarjeta_debito.estado}
                  <p>Tarjeta de Debito</p>
                {/if}
                <div class="btnAgregarTarjeta">
                  <img src="" alt="Tarjeta debito" />
                  <SeleccionarTarjeta
                    tarjeta={usuario.metodos_de_pago.tarjeta_debito}
                    nombre={"Debito"}
                    {usuario}
                  />
                </div>
              </div> -->
              <div class="containerMetodo">
                <input type="radio" name="metodo" />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2F3.png?alt=media&token=cbe3d6c1-6d74-43d8-8e20-a4d7dcfeba3f"
                  alt="Efecty"
                />
                <p>Efecty</p>
              </div>
              <div class="containerMetodo">
                <input type="radio" name="metodo" />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2F4.png?alt=media&token=996f1da0-e506-4222-9051-7b2afd3b37e9"
                  alt="PSE"
                />
                <p>PSE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contenedorBtnComprar">
      <button class="btnInformacion" on:click={finales_venta}>Finalizar compra</button>
    </div>
  </div>
</section>

<style>
  .contenedor {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100%;
    max-height: auto;
    display: flex;
    justify-content: center;
    padding: 60px;
    background-color: rgba(0, 0, 0, 0.537);
  }
  .contenido_pasarela {
    width: 50%;
    background-color: white;
    padding: 15px;
  }
  .btnClose {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .icon {
    font-size: 20px;
  }
  .icon:hover {
    cursor: pointer;
    color: red;
    transition: ease-in-out 0.5s;
  }
  .titulo {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 7;
    font-style: normal;
    font-size: 30px;
    border-bottom: 1px solid black;
  }
  .contenedorBtnComprar {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
  .accordion-body {
    display: flex;
    flex-wrap: wrap;
  }
  .metodos {
    display: flex;
    flex-direction: column;
  }
  #miFormulario {
    width: 100%;
  }
  .containerMetodo {
    margin: 10px 0;
    padding: 15px;
    background-color: #f0f0f0;
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.822);
  }
  /*   .tarjetas{
    flex-direction: column;
  } */
  .containerMetodo > p {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  img {
    width: 5%;
    height: auto;
    margin: 10px;
  }
  .btnAgregarTarjeta {
    display: flex;
    align-items: center;
  }

  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@607&display=swap");
</style>
