import { writable } from "svelte/store";

// Variable booleana
export const variableBooleana = writable(false);
export const actualizar_crear_direccion = writable(false);
export const ventana_Modal_pago_rapido = writable(false);
export const variable_favoritos = writable(false);
export const ruta_protegida = writable(false);
export const ventana_modal_login = writable(false);
export const ventana_agregar_producto = writable(false);
export const ventana_pasarela_de_pago = writable(false);
export const alert_completado = writable(false);
export const ventana_agregar_tarjeta = writable(false);
export const ventana_descripcion_producto = writable(false);

// Variables auxiliares
export const storage = writable("");
export const contador = writable(0);
export const nombreNavbar = writable("");
export const modo_de_pago = writable("");
export const mensajeBanner = writable("");
export const precioTotal = writable(0);
export const variable_admin = writable("");
export const direccionSeleccionada = writable([]);
export const imagenesTemporales = writable([]);
export const sliderProducto = writable([]);
export const producto_compra = writable({});
export const producto_pedido = writable([]);
export const direcciones = writable([]);
export const favoritos = writable([]);
export const carrito = writable([]);
export const pedidos = writable([]);
export const catalogo = writable([]);
export const cardProducto = writable([]);
export const form_producto_editar = writable({});
export const usuario_logueado = writable({});

// Variables para el formulario de direcciones
export const formDirecciones = writable({
  id: "",
  receptor: "",
  contacto_receptor: "",
  departamento: "",
  ciudad: "",
  barrio: "",
  tipo_de_calle: "",
  primera_numeracion: "",
  segunda_numeracion: "",
  tercera_numeracion: "",
  apartamento: "",
  codigo_postal: "",
  descripcion: "",
});

// Variables para el formulario de producto
export const formProducto = writable({
  id: "",
  cantidad: "",
  categoria: "",
  descripcion: "",
  imagenes: [],
  nombre: "",
  precio: "",
  sub_categoria: "",
});

// Variables para el formulario de perfil de usuario
export const formCarrito = writable({
  nombre:"",
  apellido:"",
  telefono:"",
  documento_de_identidad:""
})

// Variables para el formulario de tarjetas
export const formTarjetas = writable({
  propietario:"",
  numero_de_tarjeta:"",
  cvv:"",
  fecha_de_vencimiento:""
})

// Variables para el formulario de registro

// Variables para el formulario de login
export const formLogin = writable({
  correo: "",
  contraseña: "",
});

// Objeto de categorias y subcategorias
export const categorias = writable([
  {
    nombre: "Futbol",
    valor: "futbol",
    contenido: [
      { nombre: "Guayos", valor: "guayos" },
      { nombre: "Balones", valor: "balon" },
    ],
  },
  {
    nombre: "Natacion",
    valor: "natacion",
    contenido: [
      { nombre: "Gafas", valor: "gafas" },
      { nombre: "Trajes de baño", valor: "bañador" },
    ],
  },
]);
