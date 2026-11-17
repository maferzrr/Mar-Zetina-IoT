document.addEventListener("DOMContentLoaded", () => {
    const parkingMap = document.getElementById('parking-map');
    const totalEl = document.getElementById('total-espacios');
    const disponiblesEl = document.getElementById('espacios-disponibles');
    const ocupadosEl = document.getElementById('espacios-ocupados');
    const porcentajeEl = document.getElementById('porcentaje-ocupacion');

    const spotsData = [];

    const columns = [
        { startX: 18, startY: 42, endX: 42, endY: 88, count: 22 },
        { startX: 33, startY: 33, endX: 57, endY: 79, count: 22 }, 
        { startX: 49, startY: 23, endX: 73, endY: 69, count: 22 },
        { startX: 64, startY: 14, endX: 88, endY: 60, count: 22 }  
    ];

    columns.forEach(col => {
        for (let i = 0; i < col.count; i++) {

            const currentX = col.startX + ((col.endX - col.startX) / (col.count - 1)) * i;
            const currentY = col.startY + ((col.endY - col.startY) / (col.count - 1)) * i;

            spotsData.push({ top: `${currentY}%`, left: `${currentX}%` });
        }
    });

    let totalSpots = spotsData.length; 

    function initParking() {
        spotsData.forEach(spot => {
            const spotDiv = document.createElement('div');
            spotDiv.classList.add('parking-spot');
            
      
            const isOccupied = Math.random() > 0.5;
            spotDiv.classList.add(isOccupied ? 'occupied' : 'available');


            spotDiv.style.top = spot.top;
            spotDiv.style.left = spot.left;

       
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

  
    function updateDashboard() {
        const occupiedSpots = document.querySelectorAll('.parking-spot.occupied').length;
        const availableSpots = totalSpots - occupiedSpots;
        const percentage = ((occupiedSpots / totalSpots) * 100).toFixed(0);

        totalEl.textContent = totalSpots;
        disponiblesEl.textContent = availableSpots;
        ocupadosEl.textContent = occupiedSpots;
        porcentajeEl.textContent = `${percentage}%`;
    }

    function simulateIoT() {
        setInterval(() => {
            const spots = document.querySelectorAll('.parking-spot');
            if (spots.length === 0) return;


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
        }, 2000); 
    }

    initParking();
    simulateIoT();
});