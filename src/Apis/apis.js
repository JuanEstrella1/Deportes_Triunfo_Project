// Configuración incial para la conexión entre la base de datos y el programa

/////////// Importaciones de los componenentes que se necesiten de firebase ///////////////////////
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore/lite";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

/////////// fin de las importaciones ///////////////

export const firebaseConfig = {
  apiKey: "AIzaSyBK09MlRkII37Fg5uHd72qbTHqeCTc9Eok",
  authDomain: "deportes-triunfo.firebaseapp.com",
  projectId: "deportes-triunfo",
  storageBucket: "deportes-triunfo.appspot.com",
  messagingSenderId: "107215268075",
  appId: "1:107215268075:web:e3064a82b95b263a89f6ae",
  measurementId: "G-WNVB88XT2Z",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage();

//////////// Fin de la configuracion inicial para la conexión ///////////

//////////// Configuración de lectura para las coleciones ///////////////

/////////////////////////////////////////// Apis para la base de datos de los usuarios ////////////////////////////////////////////////

// funcion para llamar toda la coleccion
export const leer_Colecciones = async (coleccion) => {
  try {
    // Fetch all documents from the "usuarios" collection
    const querySnapshot = await getDocs(collection(db, coleccion));

    // Extract data from each document and store in an array
    const coleccionArray = querySnapshot.docs.map((doc) => doc.data());
    const id_Arrays = querySnapshot.docs.map((doc) => doc.id);
    const coleccionCompleta = coleccionArray.map((obj, index) => {
      return { ...obj, id: id_Arrays[index] };
    });

    // Return the array of usuarios data
    return coleccionCompleta;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return []; // Return an empty array in case of error
  }
};

// funcion para leer varios documentos de una coleccion segun un parametro

export const leer_documentos_especificos = async (
  coleccion,
  parametro,
  valor
) => {
  let coleccionCompleta = [];
  try {
    // Busqueda de los documentos en la base de datos
    const q = query(collection(db, coleccion), where(parametro, "==", valor));

    // Obtencion de los datos
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // grabado de datos en variable
      coleccionCompleta.push({ ...doc.data(), id: doc.id });
    });
    return coleccionCompleta;
  } catch (error) {
    console.error("No es posible acceder a los documentos");
  }
};

// funcion para traer solo un documento
export const leer_documento = async (coleccion, id) => {
  let coleccionCompleta;
  try {
    // llamado a los documentos de la coleccion
    const docRef = doc(db, coleccion, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      coleccionCompleta = { ...docSnap.data(), id };
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // Return the array of usuarios data
    return coleccionCompleta;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return []; // Return an empty array in case of error
  }
};

//funcion para leer documento y devolverlos ordenadamente
export const colecciones_ordenadas = async (coleccion, parametro) => {
  try {
    let array = [];
    const q = query(coleccion, orderBy(parametro));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push({ id: doc.id, ...doc.data() });
    });
    return array;
  } catch (error) {
    console.error(`Error fetching ${coleccion}:`, error);
  }
};

/// funcion para llamados personalizados con parametro definidos

export const buscar_documentos = async (coleccion, parametro, valor) => {
  // parametro se refiere al nombre de la propiedad que se desea igualar. Ej. parametro:valor -> categoria: "futbol"
  let array = [];
  try {
    // aplicacion de las condiciones
    const q = query(collection(db, coleccion), where(parametro, "==", valor));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push({ id: doc.id, ...doc.data() });
    });
    return array;
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

///////////// Api para la creacion de documentos con base a la coleccion que invoca la funcion /////////////////

export const agregar_documento = async (coleccion, obj) => {
  try {
    const docRef = await addDoc(collection(db, coleccion), obj);
    console.log("Document written with ID: ", docRef.id);
    console.log(obj);
    console.log(`${coleccion} Creado`);
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

///////////// Api para la actualizacion de los campos necesarios de distintos documentos /////////////////

/// Funcion para actualizar todo el documento
export async function actualizar_Documento(coleccion, obj, id) {
  try {
    const docRef = doc(db, coleccion, id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, obj);
    console.log("Campo actualizado: " + obj);
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

/// Funcion para actualizar datos especificos
export async function actualizar_Usuario(coleccion, obj, id) {
  try {
    const docRef = doc(db, coleccion, id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, obj);
    console.log("Campo(s) actualizado(s): " + obj);
  } catch (error) {
    console.error("Error: " + error.message);
  }
}

///////////// Api la eliminacion de un documento  /////////////////

export async function eliminar_Documento(coleccion, id) {
  try {
    await deleteDoc(doc(db, coleccion, id));
    console.log("Campo eliminado: " + id);
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

///////////// Api para la autenticacion de los usuarios /////////////////

export const autenticacionUsuarios = async (coleccion, obj) => {
  return createUserWithEmailAndPassword(auth, obj.correo, obj.contraseña)
    .then(async (userCredential) => {
      const user = userCredential.user;
      return sendEmailVerification(auth.currentUser).then(() =>
        agregar_documento(coleccion, obj)
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log("Error: " + errorCode + " - " + errorMessage);
      // Puedes lanzar una excepción personalizada aquí si lo deseas:
      throw new Error("Error durante la autenticación: " + errorMessage);
    });
};

///////////// Api para el inicio de sesión de los usuarios /////////////////

export const inicioSesion = async (obj) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      obj.correo,
      obj.contraseña
    );

    // Optionally, access user information here (e.g., uid)
    const uid = userCredential.user.uid;
    const correo = userCredential.user.email;
      // Llamado de funcion para encontrar el que hizo el login
      await busquedaUsuarioSimple(correo, obj.contraseña).then((user) => {
        guardarDataLocalStorage(uid, user);
      });

      // Attach onAuthStateChanged listener for future state changes (optional)
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          console.log("Usuario deslogueó o hubo un error de autenticación");
        }
      });

      return true; // Return true upon successful sign-in
    
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error al iniciar sesión:", errorCode, errorMessage);

    return false; // Return false upon sign-in error
  }
};

///////////// Api para el cierre de sesión de los usuarios /////////////////

export const CerrarSesion = () => {
  auth
    .signOut()
    .then(async () => {
      await keyLocalStorage().then((key) => {
        eliminarDataLocalStorage(key);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
// funcion para hacer el cambio de contraseña
export const actualizar_contraseña = (password) => {
  const user = auth.currentUser;
  updatePassword(user, password)
    .then()
    .catch((error) => {
      console.error(error);
    });
};

// funcion para restablecer contraseña
export const restablecer_contraseña = (correo) => {
  sendPasswordResetEmail(auth, correo)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

///////////// Api para cargar imagenes /////////////////

export const subirImagnes = (name, url) => {
  //Creacion de referencia para guardar la imagen
  const storageRef = ref(storage, `productos/${name}`);
  // Funcion para cargar la imagen en storage firebase
  uploadString(storageRef, url, "data_url")
    .then((snapshot) => {
      console.log("Uploaded a base64 string!");
    })
    .catch((error) => console.log(error.message));
};

///////////// Api para obtener links de las imagenes /////////////////

export const obtenerUrlImagnes = async (files) => {
  console.log("OObtener");
  let arrayUrl = [];
  for (const file of files) {
    // Funcion para obtener la url la imagen en storage firebase
    await getDownloadURL(ref(storage, `productos/${file.name}`))
      .then((url) => {
        arrayUrl.push(url);
      })
      .catch((error) => console.log(error.message));
  }
  return arrayUrl;
};

////////////////////// Funcion para la verificacion de la contraseña y sus reglas /////////////////////

export const validarContraseña = (contraseña) => {
  // conocer si tiene una minuscula
  const hasLowerCase = /[a-z]/.test(contraseña);
  // conocer si tiene una mayuscula
  const hasUpperCase = /[A-Z]/.test(contraseña);
  // Conocer si tiene un numero
  const hasNumber = /\d/.test(contraseña);
  // Conocer si cumple con el mínimo de 6 caracteres
  const minLength = contraseña.length >= 6;

  return hasLowerCase && hasUpperCase && hasNumber && minLength;
};

////////////////////// Funcion para el almacenamiento de la informacion en localStorage /////////////////////

// Function para guardar la data en el almacenamiento local
export const guardarDataLocalStorage = (key, data) => {
  try {
    // Convert data to JSON string if it's not already a string
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }

    // Save data to local storage
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error al guardar la informacion: ${error}`);
  }
};

// Funcion para recuperar la informacion del localStorage
export const obtenerDataLocalStorage = async (key) => {
  try {
    // Retrieve data from local storage
    const dataString = localStorage.getItem(key);

    // Check if data exists
    if (dataString !== null) {
      // Parse JSON string if necessary
      if (dataString.startsWith("{") || dataString.startsWith("[")) {
        return JSON.parse(dataString);
      } else {
        return dataString;
      }
    } else {
      console.log(`Data not found in local storage for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving data from local storage: ${error}`);
    return null;
  }
};

// Función para actualizar la informacion del localStorage
export const actualizarLocalStorage = async (key, campo) => {
  //Obtenemos la informacion del local
  const data = JSON.parse(localStorage.getItem("user"));

  // Actualizamos los campos necesarios
};

// Funcion para la eliminacion de la data local
export const eliminarDataLocalStorage = async (key) => {
  try {
    localStorage.removeItem(key);
    console.log("Informacion eliminada con exito");
  } catch (error) {
    console.error(`Error removing data from local storage: ${error}`);
  }
};

////////////////////// Funcion para obtener la llave del almacenamiento de la informacion en localStorage /////////////////////
export const keyLocalStorage = async () => {
  const user = await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });

  if (user) {
    return user.uid;
  } else {
    // Handle user not logged in scenario (e.g., redirect to login)
  }
};

////////////////////// Funcion Informacion usuario loggeado /////////////////////

export const usuarioLoggeado = async () => {
  let key = "";
  let usuarioActivo = [];
  await keyLocalStorage().then((userId) => {
    if (userId) {
      key = userId;
      console.log("User ID retrieved:", userId);
      // Use the userId for further actions
    } else {
      console.error("Failed to get user ID");
    }
  });
  console.log(key);

  //Lectura de la base de datos
  usuarioActivo = await obtenerDataLocalStorage(key);
  console.log(usuarioActivo.correo);
  return usuarioActivo;
};

///////////////////////////// Funciones de busqueda de informacion en base de datos ////////////////////////////

// Funcion para la busqueda de usuario sencilla

export const busquedaUsuarioSimple = async (email, contraseña) => {
  // Declaracion de variable que guarda los  datos
  let informacionUsuarioActivo = {};
  // Busqueda del campo en la coleccion
  const q = query(collection(db, "usuarios"), where("correo", "==", email));
  // Obtencion del documento en la coleccion
  const querySnapshot = await getDocs(q);
  const coleccionArray = querySnapshot.docs.map((doc) => {
    informacionUsuarioActivo = doc.data();
    informacionUsuarioActivo.id = doc.id;
    informacionUsuarioActivo.contraseña = contraseña;
  });
  return informacionUsuarioActivo;
  // Invocacion de la funcion que guarda los datos en el localStorage
  /* guardarDataLocalStorage(key, informacionUsuarioActivo); */
};

///// funcion para la generacion automatica de ids
export const idGenerator = () => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    id += caracteres[indiceAleatorio];
  }
  return id;
};

///////////////////////////// Funciones para la creacion de documentos en subcolecciones ////////////////////////////

// Funcion para la creacion de documentos en la subcoleccion direcciones

export const crearDireccionEnvio = (obj) => {};
