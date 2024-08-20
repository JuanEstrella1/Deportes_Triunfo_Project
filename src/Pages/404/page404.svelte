<script>

  import { navigate } from "svelte-routing";

</script>
<section class="containerGeneral">
    <div class="contenido">
        <img src="https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2F404.svg?alt=media&token=203f9b81-4287-4f00-ae4a-4f6520816807" alt="Error 404">
        <p>Lo sentimos, no hemos encontrado la pagina que buscas.</p>
        <button class="btnInformacion" on:click={()=>navigate("/")}>Volver al inicio</button>
    </div>
</section>
<style>
    .containerGeneral{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding: 50px 20px;
        display: flex;
        justify-content: center;
    }
    .contenido{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
    }
    img{
        width: 35%;
    }
    p{
        margin: 20px 0;
        font-family: "Raleway", sans-serif;
        font-size: 30px;
    }
    .btnInformacion {
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>