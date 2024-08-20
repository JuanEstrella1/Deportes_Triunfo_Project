<script>
  //import de herramientas
  import {favoritos} from "../Apis/storage"
  import {actualizar_Documento} from "../Apis/apis"
      
  // variables
  export let producto_favorito
  export let usuario
  /* let obj = {
    id: "6hX81N7ebn9Fbj4IJDV0",
    nombre: "Guayo Profesional Caucho Golty Top Speed",
    precio: "156.900",
    categoria: "futbol",
    sub_categoria: "balon",
    cantidad: "12",
    imagenes:
      "https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/productos%2Fguayo-profesional-caucho-top-speed-blanco1.png?alt=media&token=e04e18b7-744f-4878-81da-ca81dce66d7c",
  }; */

console.log(producto_favorito.id)

// funcion para eliminar una direccion
const eliminarFavorito = async (id) => {
    
    // actualizacion de la informacion almacenada en el local storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(usuario.key));

    //eliminacion del objeto
    const filteredArray = data.favoritos.filter((obj) => obj.id !== id); // Filter out the object

    // Actualizacion de datos
    data.favoritos = filteredArray
    $favoritos = data.favoritos

    // conversion de datos
    const dataActualizada = JSON.stringify(data);

    // Actualizacion de datos completos
    localStorage.setItem(usuario.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento("usuarios",{favoritos:data.favoritos},data.id)
    console.log(filteredArray)
};


</script>

<div class="containerCard">
  <div class="btnCerrar"><i class="bi bi-x-circle-fill icon" on:keypress={eliminarFavorito(producto_favorito.id)} on:click={eliminarFavorito(producto_favorito.id)}></i></div>
  <div class="contenido">
    <div class="containerImg"><img src={producto_favorito.imagenes[0]} alt={producto_favorito.nombre} /></div>
    <div class="containerInformacion">
      <h6 class="titulo">{producto_favorito.nombre}</h6>
      <p>$ {producto_favorito.precio}</p>
    </div>
    <div class="btnVerProducto">
      <a class="btnInformacion" href="/producto/{producto_favorito.id}">Ver producto</a>
    </div>
  </div>
</div>

<style>
  .containerCard {
    width: 80%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.738);
    padding: 15px;
  }
  .contenido{
    display: flex;
  }
  .btnCerrar{
    width: auto;
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    transition: ease-in-out .1s;
  }
  
  .icon:hover{ 
    color: red;
    cursor: pointer;
  }
  .containerImg, .containerInformacion, .btnVerProducto{
    flex: 1;
  }
  .containerImg{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    width: 90%;
  }
  .btnVerProducto{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .btnInformacion {
    text-align: center;
    padding: 10px;
    border: 0;
    color: white;
    width: 250px;
    font-size: 15px;
    background-color: #000000;
    text-decoration: none;
  }
  .btnInformacion:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }
</style>
