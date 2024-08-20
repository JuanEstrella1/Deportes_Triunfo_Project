<script>
  import {Router, Link, Route} from 'svelte-routing';

  //////////////////// Imports de los componentes y páginas a usarse ///////////////////
  import SingUp from "./Pages/Sesion/registro.svelte";
  import Inicio from "./Pages/Inicio/inicio.svelte";
  import Categorias from "./Pages/Categorias/categorias.svelte";
  import Login from "./Pages/Sesion/Login/login.svelte";
  import Producto from "./Pages/Producto/producto.svelte";
  import Carrito from "./Pages/Carrito/carrito.svelte";
  import Error404 from "./Pages/404/page404.svelte";
  import Navbar from "./Components/navBar.svelte"
  import Restablecer_contraseña from "./Pages/retablecer_contraseña.svelte"
  import Footer from './Components/footer.svelte';

  /////////// sub-páginas
  import Perfil_Informacion from "./Pages/Perfil/perfil_usuario.svelte"
  import Configuracion from "./Pages/Perfil/configuracionCuenta.svelte"
  import Pagos from "./Pages/Perfil/pagos.svelte"
  import Devoluciones from "./Pages/Perfil/devoluciones.svelte"
  import Direcciones from "./Pages/Perfil/direcciones.svelte"
  import Pedidos from "./Pages/Perfil/pedidos.svelte"
  import Favoritos from "./Pages/Perfil/favoritos.svelte"
  import Administrar from "./Pages/Perfil/administrar.svelte"
  import CentralPedidos from "./Pages/Perfil/central_pedidos.svelte";



  
  


</script>



<Navbar/>

<Router >
  
	<Route path ='/' component = {Inicio}/>
 	<Route path ='/catalogo/:categoria/' component = {Categorias}/>
   <Route path ='/catalogo/' component = {Categorias}/>
  <Route path ='/login' component = {Login}/>
  <Route path ='/registro' component = {SingUp}/>
  <Route path ='/producto/:id' component = {Producto}/>
  <Route path ='/restablecer_contrasena' component = {Restablecer_contraseña}/>
  <Route path ='/carrito' component = {Carrito}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/informacion_personal' component = {Perfil_Informacion}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/configuracion' component = {Configuracion}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/pedidos' component = {Pedidos}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/metodos_de_pago' component = {Pagos}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/direcciones' component = {Direcciones}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/devoluciones' component = {Devoluciones}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/lista_de_deseos' component = {Favoritos}/> <!-- Protegida -->
  <Route path ='/perfil_usuario/administrar_productos' component = {Administrar}/> <!-- Protegida / Administrativa -->
  <Route path ='/central_pedidos' component = {CentralPedidos}/> <!-- Protegida / Administrativa -->
  <Route path ='*' component = {Error404}/>
</Router> 

<Footer/>
