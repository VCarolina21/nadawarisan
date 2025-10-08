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

function handleToggleFavorite(el, alatData) {
    const isNowFavorite = toggleFavorite(alatData);
    el.classList.toggle('active', isNowFavorite);
    el.textContent = isNowFavorite ? '★' : '☆';
}

// -------------------- DYNAMIC REGION RENDERING --------------------

function renderAlatMusik(region, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (typeof alatmusik === 'undefined' || !Array.isArray(alatmusik)) return;

    const filteredAlatMusik = alatmusik.filter(alat => {
        const asalLowerCase = alat.asal.toLowerCase();
        const regionLowerCase = region.toLowerCase();

        if (regionLowerCase === 'nt') {
            return asalLowerCase.includes('nusa tenggara') || asalLowerCase.includes('ntt');
        }
        
        return asalLowerCase.includes(regionLowerCase);
    });

    filteredAlatMusik.forEach(alat => {
        const deskripsiPenuh = alat.deskripsi;
        const deskripsiSingkat = deskripsiPenuh.substring(0, 150) + '...';

        const isFavOnLoad = isFavorite(alat);
        const favIconContent = isFavOnLoad ? '★' : '☆';
        const favIconClass = isFavOnLoad ? 'fav-icon active' : 'fav-icon';

        const card = document.createElement('div');
        card.className = 'bingkaigambar';
        card.dataset.nama = alat.nama;
        card.dataset.asal = alat.asal; 
        
        card.innerHTML = `
            <img src="../${alat.gambar}" alt="${alat.nama}">
            <div class="ketgambar">
                <h3>${alat.nama}</h3>
                <h4>Asal: ${alat.asal}</h4>
                <p class="deskripsi-text">${deskripsiPenuh}</p>
                <button class="toggle-btn">Lihat selengkapnya</button>
            </div>
            <div class="${favIconClass}">${favIconContent}</div>
        `;
        
        const star = card.querySelector('.fav-icon');
        star.onclick = function() { 
            handleToggleFavorite(star, alat); 
        };

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

// -------------------- DOMContentLoaded MAIN LOGIC --------------------

document.addEventListener('DOMContentLoaded', () => {

    renderAlatMusik('Maluku', 'daftar-maluku');
    renderAlatMusik('Papua', 'daftar-papua');
    renderAlatMusik('NT', 'daftar-nt'); 
    renderAlatMusik('Sulawesi', 'daftar-sulawesi');

});

// -------------------- TOMBOL KE ATAS (Kode Asli Anda) --------------------

const tombolKeAtas = document.getElementById("keatas");
if (tombolKeAtas) {
    tombolKeAtas.addEventListener("click", function () {
        document.getElementById("beranda").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}