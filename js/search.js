function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displaySearchResults() {
    const query = getQueryParameter('query');
    const resultsList = document.getElementById('resultsList');
    const queryDisplay = document.getElementById('queryDisplay');
    
    resultsList.innerHTML = '';
    
    queryDisplay.textContent = query ? `"${query}"` : "Tidak ada kata kunci";

    if (!query) {
        resultsList.innerHTML = '<p class="no-results">Masukkan kata kunci pencarian dari halaman Beranda.</p>';
        return;
    }

    if (typeof alatmusik === 'undefined' || !Array.isArray(alatmusik)) {
        resultsList.innerHTML = '<p class="no-results">Error: Data alat musik tidak tersedia.</p>';
        return;
    }
    
    const lowerCaseQuery = query.toLowerCase();

    const filteredResults = alatmusik.filter(alat => 
        alat.nama.toLowerCase().includes(lowerCaseQuery) ||
        alat.asal.toLowerCase().includes(lowerCaseQuery) ||
        alat.deskripsi.toLowerCase().includes(lowerCaseQuery)
    );

    if (filteredResults.length === 0) {
        resultsList.innerHTML = `<p class="no-results">Maaf, tidak ditemukan hasil untuk kata kunci **"${query}"**.</p>`;
    } else {
        filteredResults.forEach(alat => {
            const card = document.createElement('div');
            card.className = 'result-card';
            
            card.innerHTML = `
                <img src="../${alat.gambar}" alt="${alat.nama}">
                <div class="result-info">
                    <h2>${alat.nama}</h2>
                    <p><strong>Asal:</strong> ${alat.asal}</p>
                    <p>${alat.deskripsi}</p>
                </div>
            `;
            resultsList.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', displaySearchResults);