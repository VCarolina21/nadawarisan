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

// -------------------- SEARCH FUNCTION --------------------

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  const filtered = alatmusik.filter(item =>
    item.nama.toLowerCase().includes(query) ||
    item.asal.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = "<div>Tidak ditemukan.</div>";
  } else {
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.nama} (${item.asal})`;
      div.onclick = () => {
        alert(`${item.nama}\n\n${item.deskripsi}`);
        searchResults.style.display = "none";
      };
      searchResults.appendChild(div);
    });
  }

  searchResults.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!searchResults.contains(e.target) && e.target !== searchInput) {
    searchResults.style.display = "none";
  }
});

// -------------------- FAVOURITE FUNCTION --------------------

function goToFavorites() {
  window.location.href = "favorit.html";
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