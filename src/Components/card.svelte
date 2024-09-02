<script>
  // importacion de herramientas
  import { getAuth } from "firebase/auth";
  import {ventana_Modal_pago_rapido,producto_compra,ventana_modal_login} from "../Apis/storage"

  //importacion de componentes
  import ModalCompras from "../Components/pagos_rapidos.svelte"
  import ModalLogin from "../Components/loginModal.svelte"



  //variables
  export let productos;
  let imagenes = [];
  const auth = getAuth();
  const user = auth.currentUser;

  $: imagenes = productos.imagenes;
  // funcion para abrir ventana modal
  const abrirModal = () =>{
    if (user) {
      $ventana_Modal_pago_rapido = true;
      $producto_compra = productos
    }else{
      $ventana_modal_login = true
    }
    
  } 

</script>

  <div class="card" style="width: 15rem;">
<a href="/producto/{productos.id}">    
  <img src={imagenes[0]} class="card-img-top" alt="Imagenes del producto " />
  <div class="card-body">
    <h5 class="card-title">{productos.nombre}</h5>
    <p class="card-text">$ {productos.precio}</p>
  </div>
</a>  
  <button on:click={abrirModal} class="buttonLogin">Agregar al carrito</button>
</div>




<style>
  a{
    text-decoration: none;
    color: black;
  }

  .card {
    margin: 10px;
    height: auto;
  }
  
 
  .card-title {
    width: 80%;
    font-size: 15px;
    text-overflow: ellipsis;
  }
  .card-body{
    height: 150px;
  }
  img {
    width: 100%;
    height: auto;
  }
  .buttonLogin {
    text-decoration: none;
    border: 0;
    padding: 15px;
    color: white;
    width: 100%;
    height: 50px;
    font-size: 15px;
    transition: ease-in-out 0.5s;
    background-color: #000000;
  }
  .buttonLogin:hover {
    background-color: #c42e26;
    
  }
</style>
