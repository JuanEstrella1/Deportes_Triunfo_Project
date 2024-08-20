<script>
  //import de las herramientas
  import {ventana_Modal_pago_rapido, ventana_modal_login,mensajeBanner} from "../../Apis/storage.js"

  //import de los componentes
  import SliderCards from "../../secciones/sliderCards.svelte";
  import ModalCompras from "../../Components/pagos_rapidos.svelte"
  import ModalLogin from "../../Components/loginModal.svelte"
  



</script>

<section class="contenido">
  <div id="carouselExampleFade" class="carousel slide carousel-fade slider">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2Fbanner-1-1920-x450-1536x360.jpg?alt=media&token=bad866e0-9181-4051-bb2e-73c3a6fab90c" class="d-block w-100" alt="Banner 1">
      </div>
      <div class="carousel-item">
        <img src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2FBanner-Articulos-gym-1920-x-450.jpg?alt=media&token=146a6f42-79f5-4577-bd74-47e9162de9e0" class="d-block w-100" alt="Banner 2">
      </div>
      <div class="carousel-item">
        <img src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2FBanner-Futbol-1920-x-450-.jpg?alt=media&token=c125537b-1c01-4f9f-ad88-81efba61ed0c" class="d-block w-100" alt="Banner 3">
      </div>
      <div class="carousel-item">
        <img src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/banners%2F221-arqueros_Mesa-de-trabajo-1.jpg?alt=media&token=c485722f-d95e-4eb0-a049-899c82d25c59" class="d-block w-100" alt="Banner 4">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <h1>Nuestros productos</h1>
  <!-- <Card/> -->
<SliderCards categoria={"futbol"} subCategoria={"guayos"}/>
<br>
<SliderCards categoria={"futbol"} subCategoria={"balon"}/>
<br>
<SliderCards categoria={"natacion"} subCategoria={"gafas"}/>
<br>
<SliderCards categoria={"natacion"} subCategoria={"bañador"}/>
{#if $ventana_Modal_pago_rapido}
  <ModalCompras/>
{/if}
{#if $ventana_modal_login}
  <ModalLogin/>
{/if}
</section>




<style>
  .contenido{
    background-color: #f5f5f5;
    padding: 20px 0;
  }
  .slider{
    margin-bottom: 20px;
  }
  h1{
    text-align: center;
  }
</style>



