<script>
  //import de herramientas
  import {
    ventana_descripcion_producto,
    producto_pedido,
  } from "../Apis/storage";
  
  //variables auxiliares
  const formatter = new Intl.NumberFormat("es-ES");

  //funcion para cerrar ventana
  const cerrarVentana = () => {
    $ventana_descripcion_producto = false;
  };

  //funcion para mostrar la fecha de compra
  const fecha_pedido = (fecha) => {
    // Obtener la fecha actual
    const fechaActual = new Date(fecha);

    // Sumar 10 días a la fecha actual
    fechaActual.setDate(fechaActual.getDate());

    // Formatear la fecha para mostrarla como un string (opcional)
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaFormateada = fechaActual.toLocaleDateString("es-ES", opciones);

    // Devolver la fecha
    return fechaFormateada;
  };
  function timestampToDate(timestamp) {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );

    return fecha_pedido(date);
  }

  // FUncion para el final total
  const finalTotal = (carrito) =>{
    let valorFinal = 0;
    let numero = 0
    console.log(carrito)

    // iteración para el valor final
    for (let i = 0; i < carrito.length; i++) {
       numero = ((carrito[i].cantidad) * ((parseFloat(carrito[i].precio.replace(/\./g, '')))))
       valorFinal = valorFinal + numero
       console.log(valorFinal)
    }
    return formatter.format(valorFinal);
  }
</script>

{#if $ventana_descripcion_producto}
  <section class="containerGeneral">
    <div class="contenido">
      <div class="titulo">
        <h5>Pedido Nro. {$producto_pedido[0].referencia_pedido}</h5>
        <i
          class="bi bi-x-lg icon"
          on:keypress={cerrarVentana}
          on:click={cerrarVentana}
        ></i>
      </div>
      <div class="cuerpo">
        <div class="cuerpo_titulos">
          <h6>Información cliente</h6>
          <p><b>Nombre del cliente: </b>{$producto_pedido[0].nombre_cliente}</p>
          <p>
            <b>Documento del cliente: </b>{$producto_pedido[0].documento_cliente}
          </p>
          <p>
            <b>Fecha de la compra: </b>{timestampToDate(
              $producto_pedido[0].fecha_compra
            )}
          </p>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imágen</th>
                    <th scope="col">Nombre de producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Vlr. unidad</th>
                    <th scope="col">Vlr. Final</th>
                </tr>
            </thead>
            <tbody>
                {#each $producto_pedido[0].carrito as producto,index }
                <tr>
                    <th scope="col">{index+1}</th>
                    <td class="tdImagen"><img src="{producto.imagen}" alt="Imágen producto"></td>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>$ {producto.precio}</td>
                    <td>$ {formatter.format((parseFloat(producto.precio.replace(/\./g, '')))*parseInt(producto.cantidad))}</td>
                </tr>
                {/each}
            </tbody>
        </table>
        <div class="final">
            <h5>Total: ${finalTotal($producto_pedido[0].carrito)}</h5>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .containerGeneral {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.416);
    width: 100%;
    min-height: 100%;
    max-height: auto;
    display: flex;
    justify-content: center;
    padding: 20px;
    top: 0;
    z-index: 9999;
  }
  .contenido {
    background-color: white;
    width: 75%;
    padding: 30px 50px;
    height: fit-content;
  }
  .titulo {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.396);
  }
  h6{
    font-size: 25px;
  }
  .icon {
    color: black;
  }
  .icon:hover {
    cursor: pointer;
  }
  .cuerpo_titulos{
    line-height: .5;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.396);
  }
  .tdImagen{
    width: 100px;
  }
  img{
    width: 80%;
  }
  .final{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
