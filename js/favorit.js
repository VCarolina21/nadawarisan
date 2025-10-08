document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('favorit-container');
    const pesanKosong = document.getElementById('pesan-kosong');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const validFavorites = favorites.filter(alat => alat.nama !== undefined && alat.gambar !== undefined);
            
    localStorage.setItem('favorites', JSON.stringify(validFavorites));

    if (validFavorites.length === 0) {
        pesanKosong.style.display = 'block';
        container.style.display = 'none';
    } else {
        pesanKosong.style.display = 'none';
        validFavorites.forEach(alat => {
            const kartuDiv = document.createElement('div');
            kartuDiv.className = 'kartu-favorit';
            kartuDiv.innerHTML = `
                <img src="${alat.gambar}" alt="${alat.nama}">
                <div class="info-favorit">
                <h3>${alat.nama}</h3>
                <h4>Asal: ${alat.asal}</h4>
                <p>${alat.deskripsi}</p>
                </div>
                `;
                container.appendChild(kartuDiv);
            });
        }
    });