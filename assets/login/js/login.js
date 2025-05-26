const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// login.js
document.getElementById("log-sign-in").addEventListener("click", function (e) {
  e.preventDefault();

  var username = document.getElementById("user-login").value;
  var password = document.getElementById("pass-login").value;

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    alert("Por favor, complete todos los campos");
    return;
  }

  console.log("Enviando datos de login:", { username, password });

  // Mostrar indicador de carga
  const loginButton = document.getElementById("log-sign-in");
  const originalText = loginButton.textContent;
  loginButton.textContent = "Iniciando sesión...";
  loginButton.disabled = true;

  // Usar la URL del proxy
  fetch("http://localhost/frontend_php/api/proxy/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: username,
      contraseña: password,
    }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      return response.text().then((text) => {
        console.log("Raw response:", text);
        try {
          if (!text) {
            throw new Error("Empty response from server");
          }
          return JSON.parse(text);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          throw new Error("Invalid JSON response from server: " + text);
        }
      });
    })
    .then((data) => {
      console.log("Parsed response data:", data);
      if (data.status) {
        console.log("Login exitoso, guardando datos");

        // Guardar en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol_id", data.rol_id);

        if (data.rol_id === 1) {
          console.log("Redirigiendo a página de cliente");
          window.location.href = "/frontend_php/Cliente/index.php";
        } else if (data.rol_id === 2) {
          console.log("Redirigiendo a página de administrador");
          alert(
            "Estás intentando iniciar sesión como administrador. ¿Quieres iniciar sesión como Administrador?"
          );
          window.location.href = "/frontend_php/auth/login_admin/index.php";
        }
      } else {
        console.log("Login fallido:", data.message);
        alert(data.message || "Error al iniciar sesión");
      }
    })
    .catch((error) => {
      console.error("Error completo:", error);
      alert("Error al iniciar sesión: " + error.message);
    })
    .finally(() => {
      // Restaurar el botón
      loginButton.textContent = originalText;
      loginButton.disabled = false;
    });
});

// GOOGLE - Solo ejecutar si el elemento existe
const googleIcon = document.getElementById("google-icon");
if (googleIcon) {
  googleIcon.addEventListener("click", function (event) {
    event.preventDefault();

    fetch("http://localhost/frontend_php/api/proxy/google-auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
}

// Mostrar contraseña event
function mostrarContrasena(idPassword, idIcon) {
  let inputPassword = document.getElementById(idPassword);
  let icon = document.getElementById(idIcon);

  if (inputPassword.type === "password" && icon.classList.contains("fa-eye")) {
    inputPassword.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    inputPassword.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
