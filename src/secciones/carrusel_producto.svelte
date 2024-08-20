<script>
    //variables auxiliares
    export let imagenes
    console.log(imagenes)
</script>

<div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      {#each imagenes.slice(1) as imagen,index}
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="{index + 1}" aria-label="Slide {index+2}"></button>
      {/each}
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src={imagenes[0]} class="d-block w-100" alt="Imagen_Producto">
      </div>
      {#each imagenes.slice(1) as imagen}
      <div class="carousel-item">
        <img src={imagen} class="d-block w-100" alt="Imagen_producto">
      </div>
      {/each}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <style>
    .carousel-indicators{
        background-color: rgba(0, 0, 0, 0.289);
    }
    .carousel-control-next-icon,.carousel-control-prev-icon{
        background-color: rgba(0, 0, 0, 0.189);
    }
  </style>