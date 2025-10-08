const FAVORITES_KEY = 'favorites'; 

function renderFavorites() {
    const container = document.getElementById('favorit-container');
    const pesanKosong = document.getElementById('pesan-kosong');
    
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    
    const validFavorites = favorites.filter(alat => alat.uniqueKey && alat.nama && alat.gambar);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites));

    container.innerHTML = ''; 

    if (validFavorites.length === 0) {
        pesanKosong.style.display = 'block';
        container.style.display = 'none';
    } else {
        pesanKosong.style.display = 'none';
        container.style.display = 'flex'; 

        validFavorites.forEach(alat => {
            const deskripsiSingkat = alat.deskripsi.length > 200 
                                     ? alat.deskripsi.substring(0, 200) + '...'
                                     : alat.deskripsi;
                                     
            const kartuDiv = document.createElement('div');
            kartuDiv.className = 'kartu-favorit';

            kartuDiv.innerHTML = `
                <img src="${alat.gambar}" alt="${alat.nama}">
                <div class="info-favorit">
                    <h3>${alat.nama}</h3>
                    <h4>Asal: ${alat.asal}</h4>
                    <p>${deskripsiSingkat}</p>
                    <button class="btn-unfavorite" data-nama="${alat.nama}" data-asal="${alat.asal}">Hapus dari Favorit</button> 
                </div>
            `;
            container.appendChild(kartuDiv);
        });
        
        setupUnfavoriteButtons(container);
    }
}

function setupUnfavoriteButtons(container) {
    container.querySelectorAll('.btn-unfavorite').forEach(button => {
        button.addEventListener('click', (e) => {
            const namaToRemove = e.target.dataset.nama;
            const asalToRemove = e.target.dataset.asal;
            
            const alatToRemove = { nama: namaToRemove, asal: asalToRemove };
            
            toggleFavorite(alatToRemove); 
            
            renderFavorites(); 
        });
    });
}

document.addEventListener('DOMContentLoaded', renderFavorites);