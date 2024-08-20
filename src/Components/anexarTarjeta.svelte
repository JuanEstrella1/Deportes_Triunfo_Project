<script>
  //import de herramientas
  import { formTarjetas, ventana_pasarela_de_pago,modo_de_pago } from "../Apis/storage";
  import { actualizar_Documento } from "../Apis/apis";

  //Variables auxiliares
  export let nombre_tarjeta;
  export let propietario;
  let mes = "";
  let año = "";
  let nombre = nombre_tarjeta.replace(/^./, str => str.toUpperCase())

 

  // funcion para guardar una tarjeta
  const crearMetodoDePago = () => {
    // definicion del nuevo objeto
    let obj = {
      estado: true,
      propietario: $formTarjetas.propietario,
      numero_de_tarjeta: $formTarjetas.numero_de_tarjeta,
      cvv: $formTarjetas.cvv,
      fecha_de_vencimiento: mes + "/" + año,
      modo:$modo_de_pago
    };

    // actualizacion de el local Storage

    // Obtencion de los datos almacenados en el local storage
    const data = JSON.parse(localStorage.getItem(propietario.key));

    // individualización de los datos

    let posicion = propietario.metodos_de_pago.findIndex((element) => element.modo === $modo_de_pago);

    // Actualizacion de datos    
    if (!propietario.metodos_de_pago[posicion].estado) {
      data.metodos_de_pago[posicion] = obj
    }

    /* $direcciones = data.direcciones; */
    console.log(data.metodos_de_pago);

    // conversion de datos
    const dataActualizada = JSON.stringify(data);

      // Actualizacion de datos completos
    localStorage.setItem(propietario.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento(
      "usuarios",
      { metodos_de_pago: data.metodos_de_pago},
      propietario.id
    ).then(() => {
        console.log("Guardado exitoso");
      }); 

    /* $variableBooleana = false; */
    restablecer_valores()
  };


  //funcion para restablecer valores

  const restablecer_valores = () => {
    $formTarjetas.propietario = "";
    $formTarjetas.numero_de_tarjeta = "";
    $formTarjetas.fecha_de_vencimiento = "";
    $formTarjetas.cvv = "";
  };
</script>

<button
  class="btnAgregarTarjeta"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasWithBothOptions"
  aria-controls="offcanvasWithBothOptions"
  on:click={()=>$modo_de_pago = nombre_tarjeta}
  >Agregar tarjeta de {nombre_tarjeta}</button
>

<div
  class="offcanvas offcanvas-start"
  data-bs-scroll="true"
  tabindex="-1"
  id="offcanvasWithBothOptions"
  aria-labelledby="offcanvasWithBothOptionsLabel"
>
  <div class="offcanvas-header" style="padding: 15px;">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
      Agregar tarjeta de {$modo_de_pago}
    </h5>
   
    
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body">
    <div class="containerBody">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          bind:value={$formTarjetas.propietario}
        />
        <label for="floatingPassword">Titular de la tarjeta</label>
        <p class="texto">*Nombre del titular que aparece en la tarjeta</p>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
          bind:value={$formTarjetas.numero_de_tarjeta}
          
          minlength="16"
          maxlength="16"
        />
        <label for="floatingPassword">Número de tarjeta</label>
        <p class="texto">
          *Número que aparece en la parte frontal de la tarjeta
        </p>
      </div>

      <div class="fechaVencimiento">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="number"
            placeholder="Contraseña"
            bind:value={$formTarjetas.cvv}
            maxlength="3"
          />
          <label for="floatingPassword">CVV</label>
          <p class="texto">*Código de seguridad</p>
        </div>
        <div class="ContainerFechaVencimiento">
          <div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="number"
                placeholder="Contraseña"
                bind:value={mes}
                maxlength="2"
              />
              <label for="floatingPassword">Mes</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="number"
                placeholder="Contraseña"
                bind:value={año}
                maxlength="2"
              />
              <label for="floatingPassword">Año</label>
            </div>
          </div>
          <p class="texto">*Fecha de vencimiento</p>
        </div>
      </div>
      <div class="btnAgregar">
        <button
          class="btnInformacion"
          on:click={crearMetodoDePago}
          data-bs-dismiss="offcanvas"
          aria-label="Close">Guardar tarjeta</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .btnAgregarTarjeta {
    width: 600px;
    padding: 15px;
    color: black;
    border: 0;
    text-align: left;
  }
  .offcanvas-body {
    height: auto;
    display: flex;
    align-items: flex-start;
  }
  .containerBody {
    display: flex;
    flex-wrap: wrap;
  }
  .form-control {
    width: 300px;
  }
  #number {
    width: 100px;
  }
  .fechaVencimiento {
    display: flex;
    justify-content: space-between;
  }
  .ContainerFechaVencimiento {
    margin-left: 10px;
  }
  .ContainerFechaVencimiento > div {
    display: flex;
  }
  .texto {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.645);
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
