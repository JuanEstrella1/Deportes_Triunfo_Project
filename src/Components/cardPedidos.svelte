<script>
  //variables auxiliares
  export let pedido;
  console.log(pedido);

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

  //funcion para mostrar la fecha de entrega
</script>

<section class="contenedorPedido">
  <div class="navbarPedido">
    <div class="informacion">
      <p><b>Pedido id: </b> {pedido.referencia_pedido}</p>
      <p><b>Comprado el </b> {fecha_pedido(pedido.fecha_compra)}</p>
      <p><b>Total:</b> ${pedido.total}</p>
    </div>
    <div class="btnPedido">
      <button class="btnVerPedido">Ver pedido</button>
    </div>
  </div>
  <div class="contenedorCards">
    {#each pedido.carrito as producto}
      <div class="cardProducto">
        <div class="contenido">
          <img src={producto.imagen} alt={producto.nombre} />
          <p class="titulo">{producto.nombre}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .contenedorPedido {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgba(0, 0, 0, 0.268);
    margin: 25px 0;
    border-radius: 10px;
    font-family: "Raleway", sans-serif;
  }
  .navbarPedido {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
    background-color: #f5f5f5;
    align-items: center;
  }
  .informacion {
    display: flex;
  }
  .informacion > p {
    margin: 0 5px;
    
  }
  .btnVerPedido{
    padding: 10px;
    border: 0;
    color: white;
    width: 150px;
    font-size: 15px;
    background-color: #000000;
  }
  .btnVerPedido:hover{
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
  .contenedorCards {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  .cardProducto {
    width: 30%;
    height: fit-content;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.297);
    margin: 10px 5px;
  }
  .contenido {
    display: flex;
    align-items: center;
  }
  img {
    width: 30%;
    height: auto;
  }
  .titulo {
    margin-left: 30px;
    font-size: 15px;
    line-height: 1.2em; /* Ajusta el valor según tu fuente y diseño */
    height: 2.4em; /* El doble de line-height para dos líneas */
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
