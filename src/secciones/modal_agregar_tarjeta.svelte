<script>
  //import de herramientas
  import { ventana_agregar_tarjeta, formTarjetas,modo_de_pago } from "../Apis/storage";
  import {actualizar_Documento} from "../Apis/apis"

  //variables auxiliares
  export let usuario
  let mes = "";
  let año = "";

  //funcion para cerrar ventanaModal
  const cerrarModal = () =>{
    $ventana_agregar_tarjeta = false
    console.log("hola")
  }
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

    // individualización de los datos

    let posicion = usuario.metodos_de_pago.findIndex((element) => element.modo === $modo_de_pago);

    // Actualizacion de datos    
    if (!usuario.metodos_de_pago[posicion].estado) {
      usuario.metodos_de_pago[posicion] = obj
    }

    // conversion de datos
    const dataActualizada = JSON.stringify(usuario);

      // Actualizacion de datos completos
    localStorage.setItem(usuario.key, dataActualizada);

    //actualizacion en la base de datos
    actualizar_Documento(
      "usuarios",
      { metodos_de_pago: usuario.metodos_de_pago},
      usuario.id
    ).then(() => {
        console.log("Guardado exitoso");
        $ventana_agregar_tarjeta = false
        location.reload();
      }); 

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

{#if $ventana_agregar_tarjeta}
  <section class="containerGeneral">
    <div class="contenido">
      <div class="titulo">
        <h3>Agregar tarjeta</h3>
        <i class="bi bi-x-lg icon" on:keypress={cerrarModal} on:click={cerrarModal}></i>
      </div>
      <div class="cuerpo">
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
  </section>
{/if}

<style>
  .containerGeneral {
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.326);
    top: 0;
    padding: 20px;
  }
  .contenido {
    width: 30%;
    background-color: white;
    padding: 20px;
    height: fit-content;
  }
  .titulo {
    display: flex;
    justify-content: space-between;
  }
  .containerBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
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
  .icon:hover{
    cursor: pointer;
  }
</style>
