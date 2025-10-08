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

// -------------------- FAVOURITE HANDLER FUNCTION --------------------

function goToFavorites() {
    window.location.href = "../html/favorit.html";
}

// -------------------- DYNAMIC REGION RENDERING --------------------

// [PERUBAHAN]: Menambahkan parameter sortType untuk pengurutan
function renderAlatMusik(region, containerId, sortType = 'default') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // [PENTING]: Bersihkan kontainer sebelum render ulang (diperlukan untuk sorting)
    container.innerHTML = ''; 
    
    if (typeof alatmusik === 'undefined' || !Array.isArray(alatmusik)) return;

    let filteredAlatMusik = alatmusik.filter(alat => {
        const asalLowerCase = alat.asal.toLowerCase();
        const regionLowerCase = region.toLowerCase();

        if (regionLowerCase === 'nt') {
            return asalLowerCase.includes('nusa tenggara') || asalLowerCase.includes('ntt');
        }
        
        return asalLowerCase.includes(regionLowerCase);
    });
    
    // [LOGIKA FILTER ABJAD TAMBAHAN]
    if (filteredAlatMusik.length > 1) {
      switch (sortType) {
        case 'nama-asc':
          filteredAlatMusik.sort((a, b) => a.nama.localeCompare(b.nama)); // A-Z
          break;
        case 'nama-desc':
          filteredAlatMusik.sort((a, b) => b.nama.localeCompare(a.nama)); // Z-A
          break;
        case 'default':
        default:
          break;
      }
    }

    filteredAlatMusik.forEach(alat => {
        const deskripsiPenuh = alat.deskripsi;
        const deskripsiSingkat = alat.deskripsi.length > 150 
                                     ? alat.deskripsi.substring(0, 150) + '...'
                                     : alat.deskripsi;

        const card = document.createElement('div');
        card.className = 'bingkaigambar';
        card.dataset.nama = alat.nama;
        card.dataset.asal = alat.asal; 
        
        card.innerHTML = `
            <img src="${alat.gambar}" alt="${alat.nama}">
            <div class="ketgambar">
                <h3>${alat.nama}</h3>
                <h4>Asal: ${alat.asal}</h4>
                <p class="deskripsi-text">${deskripsiPenuh}</p>
                <button class="toggle-btn">Lihat selengkapnya</button>
            </div>
        `;
        
        const star = document.createElement('div');
        // Asumsi: isFavorite() dan handleToggleFavorite() didefinisikan di tempat lain
        const isFav = isFavorite(alat); 
        
        star.className = isFav ? 'fav-icon active' : 'fav-icon';
        star.textContent = isFav ? '★' : '☆';
        
        star.onclick = function() {
            handleToggleFavorite(star, alat); 
        };
        
        card.appendChild(star);

        const btn = card.querySelector(".toggle-btn");
        const deskripsi = card.querySelector(".deskripsi-text");

        if (deskripsiPenuh.length > 150) {
            deskripsi.textContent = deskripsiSingkat;
            btn.textContent = "Lihat selengkapnya";
        } else {
            btn.style.display = 'none';
        }
        
        btn.addEventListener("click", () => {
            deskripsi.classList.toggle("aktif"); 
            
            if (deskripsi.classList.contains("aktif")) {
                deskripsi.textContent = deskripsiPenuh;
                btn.textContent = "Tutup deskripsi";
            } else {
                deskripsi.textContent = deskripsiSingkat;
                btn.textContent = "Lihat selengkapnya";
            }
        });

        container.appendChild(card);
    });
}

// -------------------- SORT HELPER FUNCTION (TAMBAHAN BARU) --------------------

// Fungsi ini memanggil renderAlatMusik untuk setiap region dengan tipe pengurutan yang dipilih.
function applySort(sortType) {
    renderAlatMusik('Maluku', 'daftar-maluku', sortType);
    renderAlatMusik('Papua', 'daftar-papua', sortType);
    renderAlatMusik('NT', 'daftar-nt', sortType); 
    renderAlatMusik('Sulawesi', 'daftar-sulawesi', sortType);
}

// -------------------- DOMContentLoaded MAIN LOGIC (FINAL & CORRECT) --------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Panggil render awal (dengan urutan default)
    applySort('default'); 

    // 2. Event Listener untuk dropdown sort di index.html (TAMBAHAN FILTER)
    const sortSelectHome = document.getElementById('sort-select-home');
    if (sortSelectHome) {
        sortSelectHome.addEventListener('change', (e) => {
            applySort(e.target.value); // Menerapkan pengurutan saat pilihan berubah
        });
    }

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
});