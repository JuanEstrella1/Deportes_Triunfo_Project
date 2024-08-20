<script>
  //import herramientas
  import { ventana_modal_login, ruta_protegida,ventana_agregar_tarjeta, modo_de_pago } from "../../Apis/storage";
import {keyLocalStorage, actualizar_Documento} from "../../Apis/apis"

  //import componentes
  import MenuUsuario from "../../Components/menuPerfil.svelte";
  import ModalLogin from "../../Components/loginModal.svelte";
  import Vacio from "../../secciones/listadoVacio.svelte"
  import ModalAgregarTarjeta from "../../secciones/modal_agregar_tarjeta.svelte";

  //variables auxiliares
  let usuarioActivo = [];
  /* let seleccion=""; */
  let debito;
  let credito;
  let num_debito = 0;
  let num_credito = 0;
  $: estado_debito= "hola debito";
  $: estado_credito ="adios credito";

  //funcion para eliminar una tarjeta
  const eliminar_tarjeta = (modo) =>{
    let eliminar = confirm("¿Esta seguro de querer eliminar este método de pago?")

    let obj = {estado:false,modo:modo} 
    let arr = usuarioActivo.metodos_de_pago.filter(x => x.modo !== modo);

    if (eliminar) {
        // Actualizacion de datos
    console.log(usuarioActivo);
    usuarioActivo.metodos_de_pago = [...arr,{estado:false,modo:modo}]
    console.log(usuarioActivo);

    modo === "debito"
    ? estado_debito = false
    : estado_credito = false;


    // conversion de datos
    const dataActualizada = JSON.stringify(usuarioActivo);

    // Actualizacion de datos completos
    localStorage.setItem(usuarioActivo.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento(
      "usuarios",
      { metodos_de_pago: usuarioActivo.metodos_de_pago },
      usuarioActivo.id
    );
    }

  }

   //Función para abrir ventana modal
  const abrirModal = (modo) =>{
    $ventana_agregar_tarjeta = true;
    $modo_de_pago = modo

  }; 

  (async()=>{
    
    await keyLocalStorage().then((key) => {
      usuarioActivo = {...JSON.parse(localStorage.getItem(key)),key:key};
      $ruta_protegida = true
      debito = usuarioActivo.metodos_de_pago.filter(x => x.modo === "debito")
      credito = usuarioActivo.metodos_de_pago.filter(x => x.modo === "credito")
      debito[0].estado == false
      ? num_debito = 0
      : num_debito = "xxxx-xxxx-xxxx-"+debito[0].numero_de_tarjeta.slice(-4)
      credito[0].estado == false
      ? num_credito = 0
      : num_credito = "xxxx-xxxx-xxxx-"+credito[0].numero_de_tarjeta.slice(-4)
      estado_credito = credito[0].estado
      estado_debito = debito[0].estado
 

    })
    .catch(() => {
      $ruta_protegida = false
    })
    
  })();
</script>
{#if $ruta_protegida}
<ModalAgregarTarjeta usuario = {usuarioActivo}/>
<div class="containerPerfil">
  <MenuUsuario usuario = {usuarioActivo}/>
  <div class="containerComponent">
    <h1>Métodos de pago</h1>
    <div class="pagosContainer">
      <div class="titulo">
        <h5>Tarjeta de Credito</h5>
        {#if estado_credito}
          <i class="bi bi-x-lg" on:keypress={()=>{eliminar_tarjeta("credito")}} on:click={()=>{eliminar_tarjeta("credito")}}></i>
        {/if}
      </div>
      {#if estado_credito === true}
      <div class="contenidoTarjeta">
        <div class="parte1">
          <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled bind:value={credito[0].propietario} style="width: 100%;">
          <label for="floatingInputDisabled">Propietario Tarjeta</label>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled value={num_credito} style="width: 100%;">
          <label for="floatingInputDisabled">Número de tarjeta</label>
        </div>
        </div>
        <div class="parte2">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled bind:value={credito[0].fecha_de_vencimiento} style="width: 100%; ">
            <label for="floatingInputDisabled">Fecha de vencimiento</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled value="xxx" style="width: 100%;">
            <label for="floatingInputDisabled">Cvv</label>
          </div>
        </div>
        
      </div>
      {:else}  
      <Vacio imagen = {"https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FEmpty-wallet.svg?alt=media&token=a7380681-5eaa-4598-8c5f-dd5c752d7bfe"} 
      mensaje = {"No tienes registrada una tarjeta de credito"}
      />
      <button class="btnMetodo" on:click={()=>abrirModal("credito")}> Agregar método</button>
      {/if}
      
    </div>
    <div class="pagosContainer">
      <div class="titulo">
        <h5>Tarjeta de Debito</h5>
        {#if estado_debito}
          <i class="bi bi-x-lg" on:keypress={()=>{eliminar_tarjeta("debito")}} on:click={()=>{eliminar_tarjeta("debito")}}></i>
        {/if}
        
      </div>
      
      {#if estado_debito === true}
      <div class="contenidoTarjeta">
        <div class="parte1">
          <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled bind:value={debito[0].propietario} style="width: 100%;">
          <label for="floatingInputDisabled">Propietario Tarjeta</label>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled bind:value={num_debito} style="width: 100%;">
          <label for="floatingInputDisabled">Número de tarjeta</label>
        </div>
        </div>
        <div class="parte2">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled bind:value={debito[0].fecha_de_vencimiento} style="width: 100%; ">
            <label for="floatingInputDisabled">Fecha de vencimiento</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com" disabled value="xxx" style="width: 100%;">
            <label for="floatingInputDisabled">Cvv</label>
          </div>
        </div>
        
      </div>
      
      {:else}  
      <Vacio imagen = {"https://firebasestorage.googleapis.com/v0/b/deportes-triunfo.appspot.com/o/ilustraciones%2FEmpty-wallet.svg?alt=media&token=a7380681-5eaa-4598-8c5f-dd5c752d7bfe"} 
      mensaje = {"No tienes registrada una tarjeta de debito"}
      />
      <button class="btnMetodo" on:click={()=>abrirModal("debito")}> Agregar método</button>
      {/if}
      
    </div>
  </div>
</div>
{:else}
<div class="contenidoUnlogin">
  <button class="btnLogin" on:click={()=>$ventana_modal_login = true}>Iniciar Sesión</button>
</div>
<ModalLogin/>
{/if}


<style>
    /* Estilos para las pagosContainer con perfil no logueado*/
    .contenidoUnlogin{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  .btnLogin{  
    padding: 10px;
    border: 0;
    color: white;
    width: 300px;
    border-radius: 20px;
    font-size: 20px;
    background-color: #000000;
  }
  .btnLogin:hover {
    background-color: #c42e26;
    transition: ease-in-out 0.5s;
  }


  /* Estilos para las pagosContainer con perfil logueado*/
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
    height: fit-content;
    padding: 30px;
  }
  h1,h5{
    font-family: "Raleway", sans-serif;
  }
  .pagosContainer {
    display: flex;
    flex-direction: column;
    height: fit-content;
    border-bottom: 1px solid rgba(0, 0, 0, 0.493);
    padding: 15px 0;
  }
  .titulo{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }
  
  .contenidoTarjeta{
    width: 60%;
    height: 250px;
    
  }
  .parte1{
    padding-left: 20px;
  }
  .parte2{
    display: flex;
    justify-content: space-around;
  }
  .btnMetodo {
    background-color: white;
    border-color: rgba(0, 0, 0, 0.493);
    padding: 20px;
    width: 100%;
    color: rgba(0, 0, 0, 0.493);
  }
  .bi-x-lg:hover{
    cursor: pointer;
  }
</style>
