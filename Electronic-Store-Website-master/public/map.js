// Initialize map
let map = L.map('map').setView([20.5937, 78.9629], 5); // Default to India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Store coordinates
let userLocation = null;
let storeLocation = { lat: 20.5937, lng: 78.9629 }; // Example store location

// Detect user's location
document.getElementById('detect-location').addEventListener('click', () => {
    // Show loading state
    document.getElementById('current-address').textContent = 'Detecting your location...';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Update user location
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Update address display
                document.getElementById('current-address').textContent = `Location detected: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`;
                
                // Update map with user location
                updateMap();
                
                // Show basic mock offers
                showBasicMockOffers();
            },
            (error) => {
                console.error('Error getting location:', error);
                // If location detection fails, use a default location
                userLocation = {
                    lat: 20.5937,
                    lng: 78.9629
                };
                
                // Update address display
                document.getElementById('current-address').textContent = 'Using default location';
                
                // Update map with default location
                updateMap();
                
                // Show basic mock offers
                showBasicMockOffers();
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Update map with user location
function updateMap() {
    if (userLocation) {
        // Set map view to user location
        map.setView([userLocation.lat, userLocation.lng], 13);
        
        // Clear existing markers
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add user location marker
        L.marker([userLocation.lat, userLocation.lng])
            .addTo(map)
            .bindPopup('Your Location')
            .openPopup();

        // Add store location marker
        L.marker([storeLocation.lat, storeLocation.lng])
            .addTo(map)
            .bindPopup('Main Store Location');

        // Add local shop markers
        Object.entries(localShops).forEach(([shopName, shop]) => {
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                shop.location.lat,
                shop.location.lng
            );
            
            if (distance <= 15) { // Only show shops within 15km
                L.marker([shop.location.lat, shop.location.lng])
                    .addTo(map)
                    .bindPopup(`
                        <div class="map-popup">
                            <strong>${shopName}</strong><br>
                            Distance: ${distance.toFixed(1)} km<br>
                            Rating: ${shop.rating} ⭐<br>
                            Hours: ${shop.openingHours}<br>
                            Address: ${shop.address}<br>
                            Features: ${shop.features.join(', ')}<br>
                            Services: ${shop.services.join(', ')}<br>
                            Payment: ${shop.paymentMethods.join(', ')}<br>
                            Offers: ${shop.specialOffers.join(', ')}
                        </div>
                    `);
            }
        });

        // Draw delivery zones
        drawDeliveryZones();
    }
}

// Draw delivery zones on map
function drawDeliveryZones() {
    // Clear existing circles
    map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });

    // Draw new circles
    Object.entries(deliveryZones).forEach(([zone, config]) => {
        L.circle([storeLocation.lat, storeLocation.lng], {
            radius: config.radius * 1000, // Convert km to meters
            color: getZoneColor(zone),
            fillColor: getZoneColor(zone),
            fillOpacity: 0.1
        }).addTo(map);
    });
}

// Get zone color based on type
function getZoneColor(zone) {
    switch (zone) {
        case 'standard': return '#2196f3';
        case 'extended': return '#ff9800';
        case 'premium': return '#e91e63';
        case 'express': return '#4caf50';
        default: return '#000';
    }
}

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

// Convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI/180);
} 