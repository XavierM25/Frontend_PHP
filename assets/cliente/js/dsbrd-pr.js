const allVideos = document.querySelectorAll("video");
const sidebar = document.querySelector(".left-section");
const sidebarItems = document.querySelectorAll(".sidebar .item");

// Play/Pause video on mouse enter/leave
allVideos.forEach((video) => {
  video.addEventListener("mouseover", () => {
    if (video.readyState >= 2) {
      // Verificar si el video está listo para reproducirse
      video.play().catch((error) => {
        console.warn("No se pudo reproducir el video:", error);
      });
    }
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
  });

  // Manejar errores de carga de video
  video.addEventListener("error", (e) => {
    console.warn("Error al cargar el video:", video.src);
    video.style.display = "none"; // Ocultar el video si hay error
  });
});

// Handle sidebar item click
sidebarItems.forEach((sideItem) => {
  sideItem.addEventListener("click", () => {
    sidebarItems.forEach((item) => {
      item.classList.remove("active");
    });
    sideItem.classList.add("active");
  });
});

// Move sidebar on small devices scroll
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 992) {
    if (this.scroll > 20) {
      sidebar.style.paddingTop = "20px";
    } else {
      sidebar.style.paddingTop = "70px";
    }
  }
});

//LOGOUT
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.querySelector("#logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();

      fetch("http://localhost/frontend_php/api/proxy/logout", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/frontend_php/auth/login/login.php";
          } else {
            console.warn("Error al cerrar sesión:", response.statusText);
          }
        })
        .catch((error) => console.warn("Error en fetch:", error));
    });
  }
});
