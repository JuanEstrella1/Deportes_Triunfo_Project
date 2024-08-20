<script>
  import {
    formDirecciones,
    storage,
    imagenesTemporales,
  } from "../Apis/storage";

  let btnSlider = false;
  let contador = false;
  let files = [];

  ///////////////// funcion momentanea para visializar imagenes /////////////////
  const handleImageUpload = (event) => {
    // Configuraciones iniciales, cambio y obtencion de valores
    contador = true;
    files = event.target.files;
    $imagenesTemporales = event.target.files;

    // Definicion de los elementos del DOM
    let divContainerImg = document.querySelector(".carousel-inner");
    let divContainerCarrusel = document.querySelector(".carrusel");

    if (files.length > 4) {
      alert("Número máximo de imagenes permitidas superado");
      files = [];
    } else {
      // Iteracion de los archivos de imagen
      for (let i = 0; i < files.length; i++) {
        if (files[i] && files[i].type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // Creacion de imagen para producto
            const divImg = document.createElement("img");
            divImg.classList.add("carousel-item");
            divImg.src = event.target.result;
            divImg.alt = files[i].name;
            i === 0 && divImg.classList.add("active");

            // Asignacion de los elementos al div padre
            divContainerImg.appendChild(divImg);

            // Creacion imagen del carrusel inferior
            const divImgCarrusel = document.createElement("img");
            divImgCarrusel.classList.add("carrusel-img");
            divImgCarrusel.src = event.target.result;
            divImgCarrusel.alt = files[i].name;

            //Designacion de atributos unicos para el priumer parametro
            i === 0 && divImgCarrusel.classList.add("active");
            i === 0 && divImgCarrusel.setAttribute("aria-current", "true");

            // Designacion de atributos unicos
            divImgCarrusel.setAttribute("type", "button");
            divImgCarrusel.setAttribute("data-bs-target", "#carouselExampleCaptions");
            divImgCarrusel.setAttribute("data-bs-slide-to", `${i}`);
            divImgCarrusel.setAttribute("aria-label", `Slide ${i + 1}`);

            // Asignacion de los elementos al div padre
            divContainerCarrusel.appendChild(divImgCarrusel);
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
  };
</script>

<div class="containerSlider">
  {#if files.length == 0}
    <div class="containerInputImg">
      <label for="image" class="intento">
        <input
          type="file"
          id="image"
          name="image"
          style="display: none;"
          multiple
          on:change={(event) => handleImageUpload(event)}
        />
        <span class="btnInput"><!-- Seleccionar archivo -->
          <i class="bi bi-plus-lg"></i></span>
      </label>
      <p>Seleccione max. 4 imagenes</p>
    </div>
  {/if}

  <div id="carouselExampleCaptions" class="carousel slide"><!-- 
    <div class="carousel-indicators"></div> -->
    <div class="carousel-inner"></div>
    <div class="carrusel"></div>
    {#if files.length > 0}
      <div class="containerArrows">
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          style="padding: 20px;"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          style="padding: 20px;"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .containerSlider {
    width: 40%;
    height: auto;
  }
  .containerInputImg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    height: 100.4%;
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-weight: 607;
    font-style: normal;
    font-size: 15px;

  }
  i{
    font-size: 50px;
    margin-top: 5px;
  }
  .btnInput{
    width: 100px;
    height: auto;
    padding: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.303);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.5s ease;
  }
  .btnInput:hover{
    background-color: #f5f5f5;
    cursor: pointer;
  }
   p{
    color: rgba(0, 0, 0, 0.486);
  }
  
  .carousel-inner {
    width: 100%;
    height: 550px;
    margin-right: 20px;
  }

  .carousel-indicators {
    background-color: rgba(0, 0, 0, 0.382);
  }

  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    background-color: black;
    border-radius: 20px;
    padding: 10px;
  }

  .carrusel {
    position: inherit;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
  }
  .carrusel-img {
    max-width: 200px;
    margin: 0 15px;
  }

  
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@607&display=swap");
</style>
