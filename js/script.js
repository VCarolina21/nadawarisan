// -------------------- NAVBAR HIDE ON SCROLL --------------------

let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }
  lastScrollY = window.scrollY;
});

// -------------------- FAVOURITE FUNCTION --------------------

function goToFavorites() {
  window.location.href = "../html/favorit.html";
}

function toggleFavorite(el, alat) {
  el.classList.toggle('active');
  const isFav = el.classList.contains('active');
  el.textContent = isFav ? '★' : '☆';

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bingkaigambar').forEach(imgBox => {
    if (!imgBox.querySelector('.fav-icon')) {
      const star = document.createElement('div');
      star.className = 'fav-icon';
      star.textContent = '☆';
      star.onclick = function() { toggleFavorite(star); };
      imgBox.appendChild(star);
    }
  });
});

// -------------------- TOGGLE DESKRIPSI --------------------

document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const deskripsi = btn.previousElementSibling;
    deskripsi.classList.toggle("aktif");
    btn.textContent = deskripsi.classList.contains("aktif")
      ? "Tutup deskripsi"
      : "Lihat selengkapnya";
  });
});

// -------------------- TOMBOL KE ATAS --------------------

const tombolKeAtas = document.getElementById("keatas");
if (tombolKeAtas) {
  tombolKeAtas.addEventListener("click", function () {
    document.getElementById("beranda").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// -------------------- FORM HUBUNGI --------------------

const box = document.querySelector(".box");
const form = document.querySelector(".form-hubungi");

if (box && form) {
  box.addEventListener("click", () => {
    box.classList.toggle("active");
  });

  form.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}