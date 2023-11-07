let user = JSON.parse(localStorage.getItem("usuario"));
console.log(user);

// INPUTS:
const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const userMail = document.getElementById("userEmail");
const avatarImg = document.getElementById("avatarImg");
const userTelefono = document.getElementById("userTelefono");
const userPais = document.getElementById("userPais");
const userCiudad = document.getElementById("userCiudad");
const botonGuardar = document.getElementById("botonGuardar");

document.addEventListener("DOMContentLoaded", async () => {
  // PUNTO 3 DEL ENTREGABLE:
  primerNombre.value = user.primerNombre
    ? user.primerNombre
    : primerNombre.value;
  segundoNombre.value = user.segundoNombre
    ? user.segundoNombre
    : segundoNombre.value;
  primerApellido.value = user.primerApellido
    ? user.primerApellido
    : primerApellido.value;
  segundoApellido.value = user.segundoApellido.value
    ? user.segundoApellido
    : segundoApellido.value;
  userMail.value = user.mail ? user.mail : userMail.value;
  userTelefono.value = user.telefono ? user.telefono : userTelefono.value;
  userPais.value = user.pais ? user.pais : userPais.value;
  userCiudad.value = user.ciudad ? user.ciudad : userCiudad.value;

  botonGuardar.addEventListener("click", async () => {
    const primerNombreValue = primerNombre.value;
    const segundoNombreValue = segundoNombre.value;
    const primerApellidoValue = primerApellido.value;
    const segundoApellidoValue = segundoApellido.value;
    const userMailValue = userMail.value;
    const avatarImgValue = avatarImg.value;
    const userTelefonoValue = userTelefono.value;
    const userPaisValue = userPais.value;
    const userCiudadValue = userCiudad.value;
    

    let user = {
      avatarImg: avatarImgValue,
      mail: userMailValue,
      primerApellido: primerApellidoValue,
      primerNombre: primerNombreValue,
      segundoApellido: segundoApellidoValue,
      segundoNombre: segundoNombreValue,
      userCiudad: userCiudadValue,
      userPais: userPaisValue,
      userTelefono: userTelefonoValue,
    };

    localStorage.setItem("usuario", JSON.stringify(user))

    const mensaje = document.getElementById("mensaje");
    mensaje.classList.add("text-success", "text-center", "fw-bold", "mb-5");
    mensaje.innerText = "INFORMACIÓN ACTUALIZADA"

    setTimeout(() => {
        mensaje.classList.remove("text-success", "text-center", "fw-bold", "mb-5")
        mensaje.innerText = ""
    }, 5000)
  });
});

// Obtén el elemento de entrada de archivo
const avatarInput = document.getElementById("avatarImg");

// Obtén el elemento de imagen para mostrar la imagen seleccionada
const profileImage = document.getElementById("profileImage");

// Agrega un evento change al elemento de entrada de archivo
avatarInput.addEventListener("change", function () {
  const file = avatarInput.files[0]; // Obtiene el primer archivo seleccionado

  if (file) {
    // Si se seleccionó un archivo
    const reader = new FileReader();

    reader.onload = function (e) {
      // Cuando se carga la imagen, establece la fuente de la imagen de perfil
      profileImage.src = e.target.result;

      // Guarda la imagen en el localStorage
      localStorage.setItem("avatarImage", e.target.result);
    };

    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Recupera la imagen del localStorage
  const avatarImage = localStorage.getItem("avatarImage");

  // Verifica si hay una imagen en el localStorage
  if (avatarImage) {
    // Establece la imagen de perfil
    profileImage.src = avatarImage;
  }
});


 
// Obtén la lista de países desde la API de Restcountries
async function obtenerPaises() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    // Llena el select de países con las opciones obtenidas
    data.forEach((pais) => {
      const option = document.createElement('option');
      option.value = pais.name.common;
      option.textContent = pais.name.common;
      userPais.appendChild(option);
    });
  } catch (error) {
    console.error('Error al obtener la lista de países', error);
  }
}

// Escucha el cambio en el select de países
userPais.addEventListener('change', () => {
  const selectedCountry = userPais.value;

  if (selectedCountry) {
    // Limpia el select de ciudades
    userCiudad.innerHTML = '<option value="">Selecciona tu ciudad</option>';

    // Aquí puedes definir un conjunto de datos de ciudades estático
    const ciudadesPorPais = {
      'País 1': ['Ciudad 1A', 'Ciudad 1B', 'Ciudad 1C'],
      'País 2': ['Ciudad 2A', 'Ciudad 2B', 'Ciudad 2C'],
      // Agrega más países y ciudades según sea necesario
    };

    const ciudades = ciudadesPorPais[selectedCountry] || [];

    // Llena el select de ciudades con las ciudades correspondientes al país seleccionado
    ciudades.forEach((ciudad) => {
      const option = document.createElement('option');
      option.value = ciudad;
      option.textContent = ciudad;
      userCiudad.appendChild(option);
    });
  } else {
    // Si no se selecciona un país, limpia el select de ciudades
    userCiudad.innerHTML = '<option value="">Selecciona tu ciudad</option>';
  }
});

// Llama a la función para cargar la lista de países al cargar la página
obtenerPaises();



