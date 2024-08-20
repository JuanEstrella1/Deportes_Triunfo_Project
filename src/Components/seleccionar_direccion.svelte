<script>
  // import de herramientas
  import { direccionSeleccionada } from "../Apis/storage";

  //variables auxiliares
  export let direccion;
  let designacion = direccion.tipo_de_calle.replace(/^./, (str) =>
    str.toUpperCase()
  );
  addEventListener("change", ()=>{
    const radios = document.querySelectorAll("#miCheckbox");
    for (const radio of radios) {
      if (radio.checked) {
        $direccionSeleccionada = radio.value;
      }
    }
  })
</script>

<div class="container">
  <input
    type="radio"
    name="opcion"
    id="miCheckbox"
    value={direccion.id}
  />
  <div>
    <label for="miCheckbox">Receptor: {direccion.receptor}</label>
    <p>
      {designacion}
      {direccion.primera_numeracion} Nro. {direccion.segunda_numeracion} - {direccion.tercera_numeracion}.
      Barrio: {direccion.barrio} / {direccion.ciudad} - {direccion.departamento}
    </p>
  </div>
</div>

<style>
  .container {
    display: flex;
    padding: 10px;
    margin: 10px 0;
    background-color: #f5f5f5;
    width: 100%;
  }
  #miCheckbox {
    margin-right: 10px;
  }
</style>
