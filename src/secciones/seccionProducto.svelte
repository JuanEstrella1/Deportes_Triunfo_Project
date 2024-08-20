<script>
  //import de herramientas
  import { mensajeBanner  } from "../Apis/storage";

  //import de componentes
  import FormularioProducto from "../Components/formularioProducto.svelte";
  import Slider from "../Components/sliderProducto.svelte";
  import Banners from "../Components/banners.svelte";
</script>


  <div class="containerProductos">
  <!-- <Banners mensaje={$mensajeBanner} /> -->
  <Slider />
  <FormularioProducto/>
</div>

<style>


  .containerProductos {
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.24);
    position: fixed;
    height: 100%;
    width: 100%;
   top: 0;
    padding: 60px 55px;
  }
</style>
