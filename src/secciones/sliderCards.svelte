<script>
  import Card from "../Components/card.svelte";
  import { onMount } from "svelte";

  import { buscar_documentos } from "../Apis/apis";
  // definicion de variables
  let productos = [];
  let subProductos = [];
  let variable = false;
  let varaible_categoria
  let variable_subCategoria

  // variables para props
  export let categoria;
  export let subCategoria;

  onMount(async () => {
    productos = await buscar_documentos("productos", "categoria", categoria);
    subProductos = productos.filter(
      (producto) => producto.sub_categoria == subCategoria
    );
    varaible_categoria = productos[0].categoria.replace(/^./, str => str.toUpperCase());
    variable_subCategoria = subProductos[0].sub_categoria.replace(/^./, str => str.toUpperCase())
    console.log(variable_subCategoria);
  });
   //variables auxiliares
   let variable_timer = false

setTimeout((() => variable_timer = true),1500)
</script>

{#if variable_timer}
  <div class="container">
  <h3> {varaible_categoria} > {variable_subCategoria}</h3>
  <div class="containerCards">
    {#each subProductos.slice(0, 5) as subProducto}
      <Card productos={subProducto} />
    {/each}
  </div>
</div>
{/if}



<style>
  .container{
    width: 100%;
  }
  .containerCards {
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: center;
  }
</style>
