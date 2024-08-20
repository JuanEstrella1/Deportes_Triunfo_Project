<script>
  //import de herramientas
  import { pedidos, ruta_protegida, producto_pedido,ventana_descripcion_producto } from "../../Apis/storage";
  import {
    keyLocalStorage,
    leer_Colecciones,
  } from "../../Apis/apis";
  import { navigate } from "svelte-routing";

  //impor de componentes
  import DescripcionPedido from "../../secciones/ventana_productos_central.svelte"
  

  //variables auxiliares
  $: pedidosReactivos = $pedidos;
  let usuarioActivo = [];
  let valor = ""

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
  // Funcion para filtrar por id del pedido
  const filtrarID = (valor) =>{
    const index = $pedidos.findIndex(x=> x.id === valor)
    if (index !== -1) {
      pedidosReactivos = [$pedidos[index]]
      console.log(pedidosReactivos)
    } else {
      pedidosReactivos = $pedidos
      console.log(pedidosReactivos)
    }
    
  }
  //funcion para abrir ventana de producto pedido
  const abrir_ventana_pedido = (id) =>{
    $ventana_descripcion_producto = true; 
    $producto_pedido = $pedidos.filter(x=> x.id === id)
    console.log($producto_pedido)
  };

  (async () => {
    await keyLocalStorage()
      .then(async (key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        if (usuarioActivo.telefono === "admin") {
          $ruta_protegida = true;
          $pedidos = await leer_Colecciones("pedidos");
        }else{
          navigate("/")
        }
      })
      .catch(() => {
        $ruta_protegida = false;
      });
  })();
</script>

{#if $ruta_protegida}
<DescripcionPedido/>
  <section class="containerPrincipal">
    <div class="containerTitulo">
      <h1>Administrar Pedidos</h1>
    </div>
    <div class="containerFiltro">
      <div class="containerInput">
        <input type="text" placeholder="Burcar por Id de pedido" bind:value={valor}/>
        <i class="bi bi-search icon" on:keypress={filtrarID(valor)} on:click={filtrarID(valor)}></i>
      </div>
      <div class="containerSelect">
        <h5>Filtrar por</h5>
        <select name="selectFecha" id="selectFecha" class="selectTiempo">
          <option selected value="">Selecciona...</option>
          <option value="1">Últimos 30 días</option>
          <option value="3"> Últimos 3 meses</option>
          <option value="6">Últimos 6 meses</option>
          <option value="12">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
    <div class="containerTabla">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id producto</th>
            <th scope="col">Referencia interna</th>
            <th scope="col">Cliente</th>
            <th scope="col">Doc. cliente</th>
            <th scope="col">Fecha de compra</th>
            <th scope="col">Total</th>
            <th scope="col">Descripción pedido</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>

        <tbody class="table-group-divider">
          {#each pedidosReactivos as pedido}
            <tr>
              <td>{pedido.id}</td>
              <td>{pedido.referencia_pedido}</td>
              <td>{pedido.nombre_cliente}</td>
              <td>{pedido.documento_cliente}</td>
              <td>{timestampToDate(pedido.fecha_compra)}</td>
              <td>{pedido.nombre_cliente}</td>
              <td class="tdIcon"><i class="bi bi-card-checklist" on:keypress={()=>abrir_ventana_pedido(pedido.id)} on:click={()=>abrir_ventana_pedido(pedido.id)}></i></td>
              <td
                ><select name="selectEstado" id="selectEstado">
                  <option selected value="">Selecciona...</option>
                  <option value="entregado">Entregado</option>
                  <option value="pendiente">Pendiente</option>
                </select></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{/if}


<style>
  /* Estilos para las direcciones con perfil logueado*/
  .containerPrincipal {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
  }
  .containerTitulo {
    width: 90%;
    background-color: White;
    padding: 20px;
    margin: 15px 0;
    font-family: "Raleway", sans-serif;
  }
  .containerFiltro {
    background-color: white;
    width: 90%;
    padding: 20px;
    margin: 15px 0;
    font-family: "Raleway", sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  input {
    padding: 15px;
    font-size: 20px;
    width: 400px;
    opacity: 0.8;
  }
  .icon {
    position: relative;
    right: 50px;
    top: 5px;
    font-size: 30px;
    opacity: 0.8;
  }
  h5 {
    font-size: 15px;
  }
  .selectTiempo {
    width: 300px;
    font-size: 15px;
    padding: 20px;
  }
  .containerTabla {
    background-color: white;
    width: 90%;
    padding: 20px;
  }
  .tdIcon {
    display: flex;
    justify-content: center;
  }
  table {
    font-size: 15px;
  }
  th {
    font-family: "Raleway", sans-serif;
  }
  td,
  th {
    text-align: center;
  }
  .icon:hover{
    cursor: pointer;
  }
  .bi:hover{
    cursor: pointer;
  }
</style>
