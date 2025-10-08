const FAVORITES_KEY = 'favorites'; 

console.log('Favorites loaded!');

function renderFavorites() {
    const container = document.getElementById('favorit-container');
    const pesanKosong = document.getElementById('pesan-kosong');
    
    // Pastikan kunci yang digunakan sama dengan yang di alatmusik.js
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    if (!container || !pesanKosong) {
        console.warn('Elemen container atau pesan-kosong favorit tidak ditemukan di halaman.');
        return;
    }
    
    const validFavorites = favorites.filter(alat => alat.uniqueKey && alat.nama && alat.gambar);
    // Simpan kembali data yang sudah divalidasi
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites));

    container.innerHTML = ''; 

    if (validFavorites.length === 0) {
        pesanKosong.style.display = 'block';
        container.style.display = 'none';
    } else {
        pesanKosong.style.display = 'none';
        
        container.style.display = 'grid'; 

        validFavorites.forEach(alat => {
            const deskripsiTampilan = alat.deskripsi || "Deskripsi tidak tersedia.";
                                     
            const kartuDiv = document.createElement('div');
            kartuDiv.className = 'kartu-favorit';

            kartuDiv.innerHTML = `
                <img src="${alat.gambar}" alt="${alat.nama}">
                
                <div class="info-favorit">
                    <h3>${alat.nama}</h3>
                    <h4>Asal: ${alat.asal}</h4>
                    <p>${deskripsiTampilan}</p>
                </div>
                
                <div class="fav-icon-favorit active" data-key="${alat.uniqueKey}">★</div> 
            `;
            container.appendChild(kartuDiv);
        });
        
        // Atur event listener untuk ikon bintang
        setupFavoriteIcons(container);
    }
}

function setupFavoriteIcons(container) {
    container.querySelectorAll('.fav-icon-favorit').forEach(starIcon => {
        starIcon.addEventListener('click', (e) => {
            // Ambil uniqueKey dari atribut data-key pada elemen bintang
            const keyToRemove = e.target.dataset.key;
            
            // PANGGIL FUNGSI UNTUK MENGHAPUS DARI LOCAL STORAGE
            if (keyToRemove && typeof toggleFavoriteByKey === 'function') {
                 // Fungsi ini harus tersedia saat di-klik (dari alatmusik.js)
                 toggleFavoriteByKey(keyToRemove); 
            }
            
            // Render ulang untuk memperbarui tampilan
            renderFavorites(); 
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Dipanggil saat DOM siap, setelah alatmusik.js dimuat
    renderFavorites();
});