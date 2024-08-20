<script>
    //import de componentes
    import AnexarTarjeta from "./anexarTarjeta.svelte"

    //variables auxiliares
    export let tarjeta
    export let imagen
</script>

<div class="container">
    <input type="radio" name="metodo" id="miCheckbox2" value="{tarjeta.id}"/>
    <div>
        <img src={imagen} alt="Tarjeta {tarjeta.modo}" />
        <label for="miCheckbox">Propietario: {tarjeta.propietario}</label>
        <p>Número. xxxx - xxxx - xxxx - {tarjeta.numero_de_tarjeta.slice(-4)}</p>
    </div>
    </div> 

<style>
        .container {
        display: flex;
        padding: 10px;
        margin: 10px 0;
        width: 100%;
        
    }
    #miCheckbox2 {
        margin-right: 10px;
    }
    img {
    width: 5%;
    height: auto;
    margin: 10px;
  }
</style>
