document.addEventListener("DOMContentLoaded", () => {
    const parkingMap = document.getElementById('parking-map');
    const totalEl = document.getElementById('total-espacios');
    const disponiblesEl = document.getElementById('espacios-disponibles');
    const ocupadosEl = document.getElementById('espacios-ocupados');
    const porcentajeEl = document.getElementById('porcentaje-ocupacion');

    const spotsData = [];

    // 1. Generador automático de lugares basado en la imagen real
    // La imagen tiene 4 columnas diagonales principales
    const columns = [
        { startX: 18, startY: 42, endX: 42, endY: 88, count: 22 }, // Columna 1 (izquierda)
        { startX: 33, startY: 33, endX: 57, endY: 79, count: 22 }, // Columna 2
        { startX: 49, startY: 23, endX: 73, endY: 69, count: 22 }, // Columna 3
        { startX: 64, startY: 14, endX: 88, endY: 60, count: 22 }  // Columna 4 (derecha)
    ];

    // Calculamos la posición exacta de cada cajón (88 en total)
    columns.forEach(col => {
        for (let i = 0; i < col.count; i++) {
            // Interpolación matemática para distribuir los cajones en línea recta
            const currentX = col.startX + ((col.endX - col.startX) / (col.count - 1)) * i;
            const currentY = col.startY + ((col.endY - col.startY) / (col.count - 1)) * i;

            spotsData.push({ top: `${currentY}%`, left: `${currentX}%` });
        }
    });

    let totalSpots = spotsData.length; // Será 88

    // 2. Inicializar el estacionamiento
    function initParking() {
        spotsData.forEach(spot => {
            const spotDiv = document.createElement('div');
            spotDiv.classList.add('parking-spot');
            
            // Asignar estado inicial aleatorio (50% probabilidad de estar ocupado)
            const isOccupied = Math.random() > 0.5;
            spotDiv.classList.add(isOccupied ? 'occupied' : 'available');

            // Posicionar sobre la imagen
            spotDiv.style.top = spot.top;
            spotDiv.style.left = spot.left;

            // 3. Interacción manual
            spotDiv.addEventListener('click', () => {
                if (spotDiv.classList.contains('available')) {
                    spotDiv.classList.replace('available', 'occupied');
                } else {
                    spotDiv.classList.replace('occupied', 'available');
                }
                updateDashboard();
            });

            parkingMap.appendChild(spotDiv);
        });
        updateDashboard();
    }

    // 4. Actualizar los números del Dashboard
    function updateDashboard() {
        const occupiedSpots = document.querySelectorAll('.parking-spot.occupied').length;
        const availableSpots = totalSpots - occupiedSpots;
        const percentage = ((occupiedSpots / totalSpots) * 100).toFixed(0);

        totalEl.textContent = totalSpots;
        disponiblesEl.textContent = availableSpots;
        ocupadosEl.textContent = occupiedSpots;
        porcentajeEl.textContent = `${percentage}%`;
    }

    // 5. Simulación IoT de alto volumen: Cambio automático cada 2 segundos
    function simulateIoT() {
        setInterval(() => {
            const spots = document.querySelectorAll('.parking-spot');
            if (spots.length === 0) return;

            // Elegimos entre 1 y 3 cajones al azar para simular más movimiento
            const changes = Math.floor(Math.random() * 3) + 1; 

            for(let i=0; i < changes; i++) {
                const randomIndex = Math.floor(Math.random() * spots.length);
                const randomSpot = spots[randomIndex];

                if (randomSpot.classList.contains('available')) {
                    randomSpot.classList.replace('available', 'occupied');
                } else {
                    randomSpot.classList.replace('occupied', 'available');
                }
            }

            updateDashboard();
        }, 2000); // 2000 milisegundos = 2 segundos
    }

    initParking();
    simulateIoT();
});