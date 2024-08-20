<script>
  //import herramientas
  import {
    ventana_modal_login,
    ruta_protegida,
    cardProducto,
    ventana_agregar_producto,
    actualizar_crear_direccion,
    categorias,
    mensajeBanner,

    alert_completado

  } from "../../Apis/storage";
  import { keyLocalStorage, leer_Colecciones } from "../../Apis/apis";
  import { navigate } from "svelte-routing";

  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import CardAdministrar from "../../Components/cardAdministrar.svelte";
  import SubirProducto from "../../secciones/seccionProducto.svelte";
  import Banners from "../../Components/banners.svelte";

  let usuarioActivo = [];
  let telefono = "admin";
  let productos = [];
  let elecciones2 = []
  $: productosReactivo = $cardProducto;
  $: seleccionReactiva = elecciones2

  //funcion para cambiar las opciones
  const handleChange = (e) => {
    $categorias.forEach(categoria => {
      if (categoria.valor === e.target.value) {
        elecciones2 = categoria.contenido
      }else{
        seleccionReactiva = []
      }
        
    })
    console.log(elecciones2)
  }

  //funcion para abrir la modal de agregar producto
  const abrirVentanaModal = () => {
    $ventana_agregar_producto = true;
    $actualizar_crear_direccion = false;
  };

  // funcion para filtrar los objetos
  const filtrarProductos = () => {
    // Obtencion valores select categoria
    const selectCategoria = document.querySelector(".selectCategoria");
    const selectSubcategoria = document.querySelector(".selectSubcategoria");
    const categoria = selectCategoria.value;
    const subcategoria = selectSubcategoria.value;

    //variable para el arreglo
    let arr = [];
    if (categoria === "") {
      productosReactivo = productos
    } else {
      $cardProducto.forEach((producto) => {
        if (categoria !== "" && subcategoria !== "") {
          producto.categoria === categoria &&
            producto.sub_categoria === subcategoria &&
            arr.push(producto);
        } else if (categoria !== "") {
          producto.categoria === categoria && arr.push(producto);
        }
      });
      $cardProducto = arr
      productosReactivo = $cardProducto;
    }
    
  };
  

  (async () => {
    await keyLocalStorage()
      .then(async (key) => {
        usuarioActivo = { ...JSON.parse(localStorage.getItem(key)), key: key };
        $ruta_protegida = true;
        /*  if(usuarioActivo.telefono !== "admin"){ navigate("/")} */
        productos = await leer_Colecciones("productos");
        $cardProducto = productos;
      })
      .catch(() => {
        $ruta_protegida = false;
      });
  })();
</script>

{#if $ruta_protegida}
<Banners mensaje={$mensajeBanner} />
  <div class="containerPerfil">
    <MenuUsuario usuario={usuarioActivo} />
    <div class="containerComponent">
      
      <h1>Administrar productos</h1>
      <p>Filtro de productos</p>
      <div class="filtroAgregar">
        <div class="filtro">
          <div class="col-sm-3">
            <label class="visually-hidden" for="specificSizeSelect"
              >Preference</label
            >
            <p>Categoria:</p>
            <select class="form-select selectCategoria" id="specificSizeSelect" on:change={handleChange}>
              <option selected value="">Selecciona...</option>
              {#each $categorias as eleccion }
                <option value="{eleccion.valor}">{eleccion.nombre}</option>
              {/each}
            </select>
          </div>
          <div class="col-sm-3">
            <label class="visually-hidden" for="specificSizeSelect"
              >Preference</label>
            <p>Subcategoria:</p>
            <select
              class="form-select selectSubcategoria"
              id="specificSizeSelect"
            >
              <option selected value="">Selecciona...</option>
              {#each seleccionReactiva as seleccion}
                <option value="{seleccion.valor}">{seleccion.nombre}</option>
              {/each}
            </select>
          </div>
          <div class="contenedor_btnFiltro">
            <button id="btnFiltro" on:click={filtrarProductos}>Filtrar</button>
          </div>
        </div>

        <button class="btnLogin" on:click={abrirVentanaModal}
          >Agregar producto</button
        >
      </div>
      <div class="contenedorCards">
        {#each productosReactivo as producto}
          <div key={producto.id} class="card">
            <CardAdministrar {producto} />
          </div>
        {/each}
      </div>
    </div>
  </div>
  {#if $ventana_agregar_producto}
    <SubirProducto />
  {/if}
{:else}
  <div class="contenidoUnlogin">
    <button class="btnLogin" on:click={() => ($ventana_modal_login = true)}
      >Iniciar Sesión</button
    >
  </div>
  <ModalLogin />
{/if}

<style>
  /* Estilos para las direcciones con perfil no logueado*/
  .contenidoUnlogin {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  .btnLogin {
    padding: 10px;
    border: 0;
    color: white;
    width: 200px;
    border-radius: 20px;
    font-size: 15px;
    background-color: #000000;
  }
  .btnLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }

  /* Estilos para las direcciones con perfil logueado*/
  .containerPerfil {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    justify-content: center;
    padding: 30px;
  }
  .containerComponent {
    background-color: white;
    width: 900px;
    padding: 30px;
  }
  .filtroAgregar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15px;
  }
  .filtro {
    display: flex;
    width: 100%;
  }
  .contenedor_btnFiltro {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .col-sm-3 {
    margin: 0 10px;
  }
  #btnFiltro {
    padding: 10px;
    border: 0;
    color: white;
    background-color: #000000;
    border-radius: 20px;
    font-size: 15px;
    width: 100px;
  }
  #btnFiltro:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }

  .contenedorCards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
  .card {
    margin: 10px; /* 
    height: auto; */
    width: 20%;
  }
</style>
