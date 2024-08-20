<script>
  //import de herramientas
  import { onMount } from "svelte";
  import {
    leer_Colecciones,
    leer_documentos_especificos,
  } from "../../Apis/apis.js";
  import {
    ventana_Modal_pago_rapido,
    catalogo,
    categorias,
  } from "../../Apis/storage.js";

  //import de componentes
  import Card from "../../Components/card.svelte";
  import ModalCompras from "../../Components/pagos_rapidos.svelte";
  import { element } from "svelte/internal";

  //////////////// Declaracion de variables ////////////////
  let db_colecciones = [];
  let subCategorias = [];
  $: catalogoReactivo = $catalogo;
  let pathname;
  let titulo;
  let variable_timer = false;

  // funcion para crear filtro de productos
  const filtro = (categoria, subcategoria = "") => {
    let nuevo_catalogo = [];
    if (subcategoria === "") {
      nuevo_catalogo = $catalogo.filter(
        (element) => element.categoria === categoria
      );
      catalogoReactivo = nuevo_catalogo;
    } else {
      nuevo_catalogo = $catalogo.filter(
        (element) => element.sub_categoria === subcategoria
      );
      catalogoReactivo = nuevo_catalogo;
      console.log("hola", nuevo_catalogo);
    }
  };
  //Timmer para los productos
  setTimeout(() => (variable_timer = true), 1000);

  onMount(async () => {
    //Lectura de la base de datos
    pathname = window.location.pathname.split("/")[2];
    console.log(pathname);
    if (pathname === undefined) {
      $catalogo = await leer_Colecciones("productos");
    } else {
      $catalogo = await leer_documentos_especificos(
        "productos",
        "categoria",
        pathname
      );
      titulo = pathname.replace(/^./, (str) => str.toUpperCase());
      subCategorias = $categorias.filter((c) => c.valor === pathname);
      subCategorias = subCategorias[0].contenido;
      console.log(subCategorias);
    }
  });
</script>

{#if variable_timer}
  <section class="contenedorGeneral">
    <div class="contenido">
      <aside class="aside">
        {#if pathname === undefined}
          <div class="contenidoAside">
            <h3
              class="titulo"
              on:keypress={() => (catalogoReactivo = $catalogo)}
              on:click={() => (catalogoReactivo = $catalogo)}
            >
              Todas las categorias
            </h3>
            <div class="categorias">
              {#each $categorias as categoria}
                <ul>
                  <h5
                    class="btnCategorias"
                    on:keypress={filtro(categoria.valor)}
                    on:click={filtro(categoria.valor)}
                  >
                    {categoria.nombre}
                  </h5>
                  {#each categoria.contenido as subcategoria}
                    <div class="subCategoria">
                      <p
                        class="btnSubcategorias"
                        on:keypress={filtro(
                          categoria.nombre,
                          subcategoria.valor
                        )}
                        on:click={filtro(categoria.nombre, subcategoria.valor)}
                      >
                        {subcategoria.nombre}
                      </p>
                    </div>
                  {/each}
                </ul>
              {/each}
            </div>
          </div>
        {:else}
          <div class="contenidoAside">
            <h3
              class="titulo"
              on:keypress={() => (catalogoReactivo = $catalogo)}
              on:click={() => (catalogoReactivo = $catalogo)}
            >
              {titulo}
            </h3>
            <div class="categorias">
              {#each subCategorias as categoria}
                <ul>
                  <h5
                    class="btnPathname"
                    on:keypress={filtro(pathname, categoria.valor)}
                    on:click={filtro(pathname, categoria.valor)}
                  >
                    {categoria.nombre}
                  </h5>
                </ul>
              {/each}
            </div>
          </div>
        {/if}

        <div class="divSubcategorias"></div>
      </aside>
      <div class="contenidoProductos">
        <div class="productos">
          {#each catalogoReactivo as producto}
            <Card productos={producto} />
          {/each}
        </div>
      </div>
    </div>
    {#if $ventana_Modal_pago_rapido}
      <ModalCompras />
    {/if}
  </section>
{/if}

<style>
  .contenedorGeneral {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    padding: 30px;
    background-color: #f5f5f5;
  }
  .contenido {
    width: 100%;
    height: auto;
    display: flex;
  }
  .aside {
    background-color: white;
    padding: 25px;
    height: fit-content;
    margin-right: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .titulo {
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  }
  .categorias {
    padding: 10px;
    height: fit-content;
  }
  h5 {
    font-size: 25px;
  }
  .subCategoria {
    padding: 0 10px;
  }
  p {
    font-size: 20px;
    transition: ease-in-out 0.5s;
  }
  .btnPathname {
    font-size: 20px;
  }
  p:hover,
  h5:hover,
  h3:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .contenidoProductos {
    flex: 3;
    background-color: white;
  }
  .productos {
    display: flex;
    flex-wrap: wrap;
  }
  h3,
  h5,
  p {
    font-family: "Raleway", sans-serif;
  }
</style>
