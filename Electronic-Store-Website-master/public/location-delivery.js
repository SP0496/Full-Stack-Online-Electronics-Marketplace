// Initialize map
let map = L.map('map').setView([20.5937, 78.9629], 5); // Default to India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Store coordinates
let userLocation = null;
let storeLocation = { lat: 20.5937, lng: 78.9629 }; // Example store location

// Weather API configuration
const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your API key

// Enhanced delivery zones configuration with more detailed pricing
const deliveryZones = {
    standard: { 
        radius: 5, 
        baseFee: 0,
        perKmFee: 0,
        time: '1-2 hours',
        description: 'Free delivery for nearby locations'
    },
    extended: { 
        radius: 10, 
        baseFee: 50,
        perKmFee: 10,
        time: '2-3 hours',
        description: 'Affordable delivery for medium distances'
    },
    premium: { 
        radius: 15, 
        baseFee: 100,
        perKmFee: 15,
        time: '3-4 hours',
        description: 'Premium delivery for longer distances'
    },
    express: {
        radius: 20,
        baseFee: 200,
        perKmFee: 20,
        time: '1 hour',
        description: 'Fastest delivery option'
    }
};

// Delivery speed multipliers
const deliverySpeedMultipliers = {
    standard: 1.0,    // Normal speed
    express: 1.5,     // 50% faster
    priority: 2.0     // Double speed
};

// Local offers based on weather conditions with realistic mock data
const weatherOffers = {
    sunny: [
        { 
            title: 'Summer Electronics Special', 
            description: 'Beat the heat with our cooling electronics', 
            discount: '20%',
            shop: 'Cool Tech Store',
            products: [
                {
                    name: 'Samsung 1.5 Ton Inverter AC',
                    price: '₹35,000',
                    features: '5 Star Rating, Inverter Technology, Anti-Viral Filter, Smart Control',
                    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ar18nv3hlwrnna/gallery/in-air-conditioner-ar18nv3hlwrnna-537803476'
                },
                {
                    name: 'Crompton 75L Air Cooler',
                    price: '₹12,000',
                    features: '4 Way Air Deflection, Honeycomb Pads, Remote Control, 75L Tank',
                    image: 'https://images.crompton.co.in/air-coolers/75l-air-cooler-1.jpg'
                },
                {
                    name: 'Havells 48" Ceiling Fan',
                    price: '₹3,500',
                    features: 'Energy Efficient, Silent Operation, 5 Blades, Remote Control',
                    image: 'https://images.havells.com/havells-india/products/fans/ceiling-fans/enticer-art-48-inch-ceiling-fan-1.jpg'
                }
            ]
        },
        { 
            title: 'Smart Home Bundle', 
            description: 'Get 15% off on smart home devices', 
            discount: '15%',
            shop: 'Smart Living Hub',
            products: [
                {
                    name: 'Google Nest Mini',
                    price: '₹4,500',
                    features: 'Voice Control, Smart Home Integration, High Quality Sound',
                    image: 'https://lh3.googleusercontent.com/proxy/1234567890'
                },
                {
                    name: 'Philips Smart Bulb Set',
                    price: '₹2,500',
                    features: '16 Million Colors, Voice Control, Energy Efficient',
                    image: 'https://images.philips.com/is/image/PhilipsConsumer/1234567890'
                }
            ]
        }
    ],
    rainy: [
        { 
            title: 'Rainy Day Electronics', 
            description: 'Stay dry with our waterproof gadgets', 
            discount: '25%',
            shop: 'Waterproof Tech',
            products: [
                {
                    name: 'Sony Waterproof Speaker',
                    price: '₹8,000',
                    features: 'IPX7 Waterproof, 20hr Battery, Bluetooth 5.0',
                    image: 'https://images.sony.com/is/image/sony/1234567890'
                },
                {
                    name: 'JBL Waterproof Earbuds',
                    price: '₹6,000',
                    features: 'IPX5 Waterproof, Active Noise Cancellation, 24hr Battery',
                    image: 'https://images.jbl.com/is/image/JBL/1234567890'
                }
            ]
        },
        { 
            title: 'Indoor Entertainment', 
            description: 'Perfect for rainy days at home', 
            discount: '30%',
            shop: 'Home Entertainment Store',
            products: [
                {
                    name: 'Samsung 55" QLED TV',
                    price: '₹85,000',
                    features: '4K Resolution, HDR, Smart TV, Gaming Mode',
                    image: 'https://images.samsung.com/is/image/samsung/1234567890'
                },
                {
                    name: 'Sony PlayStation 5',
                    price: '₹45,000',
                    features: '4K Gaming, 825GB SSD, DualSense Controller',
                    image: 'https://images.sony.com/is/image/sony/1234567890'
                }
            ]
        }
    ],
    cloudy: [
        { 
            title: 'Cloudy Day Deals', 
            description: 'Great deals on all electronics', 
            discount: '20%',
            shop: 'All Seasons Electronics',
            products: [
                {
                    name: 'MacBook Air M2',
                    price: '₹1,14,900',
                    features: 'M2 Chip, 8GB RAM, 256GB SSD, 13.6" Display',
                    image: 'https://store.storeimages.cdn-apple.com/1234567890'
                },
                {
                    name: 'iPhone 14 Pro',
                    price: '₹1,29,900',
                    features: 'A16 Bionic, 48MP Camera, Dynamic Island, 5G',
                    image: 'https://store.storeimages.cdn-apple.com/1234567890'
                }
            ]
        },
        { 
            title: 'Comfort Tech Special', 
            description: 'Make your home more comfortable', 
            discount: '25%',
            shop: 'Home Comfort Tech',
            products: [
                {
                    name: 'Dyson Pure Cool Air Purifier',
                    price: '₹45,000',
                    features: 'HEPA Filter, Air Quality Sensor, 360° Filtration',
                    image: 'https://images.dyson.com/is/image/Dyson/1234567890'
                },
                {
                    name: 'Philips Smart Air Fryer',
                    price: '₹12,000',
                    features: 'Digital Display, 5 Presets, 4.1L Capacity',
                    image: 'https://images.philips.com/is/image/PhilipsConsumer/1234567890'
                }
            ]
        }
    ]
};

// Enhanced local shops database with more categories and visual elements
const localShops = {
    'Cool Tech Store': {
        location: { lat: 20.5937, lng: 78.9629 },
        category: 'electronics',
        rating: 4.5,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '123 Tech Park, Main Road',
        features: ['Free Installation', 'Extended Warranty', 'Tech Support'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Buy 2 Get 1 Free', 'Student Discount'],
        logo: 'https://example.com/cooltech-logo.png',
        photos: [
            'https://example.com/cooltech-store1.jpg',
            'https://example.com/cooltech-store2.jpg'
        ],
        reviews: [
            { user: 'John D.', rating: 5, comment: 'Great service and products!' },
            { user: 'Sarah M.', rating: 4, comment: 'Good prices and helpful staff' }
        ],
        services: ['Repair', 'Installation', 'Consultation']
    },
    'Smart Living Hub': {
        location: { lat: 20.5938, lng: 78.9630 },
        category: 'smart_home',
        rating: 4.3,
        distance: 0,
        openingHours: '9:00 AM - 8:00 PM',
        address: '456 Smart City, Tech Avenue',
        features: ['Smart Home Setup', '24/7 Support', 'Demo Available'],
        paymentMethods: ['Card', 'UPI', 'EMI'],
        specialOffers: ['First Purchase 20% Off'],
        logo: 'https://example.com/smarthub-logo.png',
        photos: [
            'https://example.com/smarthub-store1.jpg',
            'https://example.com/smarthub-store2.jpg'
        ],
        reviews: [
            { user: 'Mike R.', rating: 4, comment: 'Amazing smart home solutions' },
            { user: 'Lisa K.', rating: 5, comment: 'Professional setup team' }
        ],
        services: ['Smart Home Setup', 'Integration', 'Training']
    },
    'Waterproof Tech': {
        location: { lat: 20.5936, lng: 78.9628 },
        category: 'waterproof',
        rating: 4.7,
        distance: 0,
        openingHours: '10:30 AM - 9:30 PM',
        address: '789 Waterproof Zone, Tech Street',
        features: ['Waterproof Testing', 'Lifetime Warranty', 'Expert Advice'],
        paymentMethods: ['Cash', 'Card', 'UPI'],
        specialOffers: ['Monsoon Special']
    },
    'Home Entertainment Store': {
        location: { lat: 20.5939, lng: 78.9631 },
        category: 'entertainment',
        rating: 4.4,
        distance: 0,
        openingHours: '11:00 AM - 10:00 PM',
        address: '321 Entertainment Plaza, Tech Road',
        features: ['Home Theater Setup', 'Gaming Zone', 'Movie Screenings'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Bundle Deals']
    },
    'All Seasons Electronics': {
        location: { lat: 20.5935, lng: 78.9627 },
        category: 'electronics',
        rating: 4.6,
        distance: 0,
        openingHours: '9:30 AM - 8:30 PM',
        address: '654 All Seasons Mall, Tech Boulevard',
        features: ['Seasonal Deals', 'Price Match', 'Trade-in'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Seasonal Discounts']
    },
    'Home Comfort Tech': {
        location: { lat: 20.5940, lng: 78.9632 },
        category: 'comfort',
        rating: 4.2,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '987 Comfort Zone, Tech Lane',
        features: ['Comfort Consultation', 'Installation', 'Maintenance'],
        paymentMethods: ['Cash', 'Card', 'UPI'],
        specialOffers: ['Comfort Package Deals']
    },
    'Gaming Paradise': {
        location: { lat: 20.5941, lng: 78.9633 },
        category: 'gaming',
        rating: 4.8,
        distance: 0,
        openingHours: '11:00 AM - 11:00 PM',
        address: '147 Gaming Street, Tech Park',
        features: ['Gaming Setup', 'Tournaments', 'Gaming Cafe'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Gaming Bundle Deals']
    },
    'Audio World': {
        location: { lat: 20.5942, lng: 78.9634 },
        category: 'audio',
        rating: 4.5,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '258 Audio Avenue, Tech City',
        features: ['Sound Testing', 'Custom Setup', 'Audio Consultation'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Premium Audio Deals']
    },
    'Camera Corner': {
        location: { lat: 20.5943, lng: 78.9635 },
        category: 'camera',
        rating: 4.6,
        distance: 0,
        openingHours: '9:00 AM - 8:00 PM',
        address: '369 Camera Street, Tech Road',
        features: ['Camera Testing', 'Photography Classes', 'Rental Service'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Photography Package Deals']
    },
    'Mobile Mania': {
        location: { lat: 20.5944, lng: 78.9636 },
        category: 'mobile',
        rating: 4.4,
        distance: 0,
        openingHours: '10:30 AM - 9:30 PM',
        address: '741 Mobile Mall, Tech Boulevard',
        features: ['Mobile Repair', 'Accessories', 'Trade-in'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Mobile Bundle Deals']
    },
    'Laptop Land': {
        location: { lat: 20.5945, lng: 78.9637 },
        category: 'laptop',
        rating: 4.7,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '852 Laptop Lane, Tech City',
        features: ['Custom Configuration', 'Software Setup', 'Data Transfer'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Student Laptop Deals']
    },
    'Smart Watch World': {
        location: { lat: 20.5946, lng: 78.9638 },
        category: 'wearables',
        rating: 4.3,
        distance: 0,
        openingHours: '11:00 AM - 10:00 PM',
        address: '963 Watch Way, Tech Park',
        features: ['Health Monitoring', 'Fitness Tracking', 'Smart Setup'],
        paymentMethods: ['Cash', 'Card', 'UPI'],
        specialOffers: ['Fitness Bundle Deals']
    },
    'VR Experience Center': {
        location: { lat: 20.5947, lng: 78.9639 },
        category: 'vr',
        rating: 4.9,
        distance: 0,
        openingHours: '11:00 AM - 10:00 PM',
        address: '159 VR Street, Tech Park',
        features: ['VR Gaming', 'VR Training', 'VR Events'],
        paymentMethods: ['Cash', 'Card', 'UPI'],
        specialOffers: ['Group VR Sessions'],
        logo: 'https://example.com/vrcenter-logo.png',
        photos: [
            'https://example.com/vrcenter-store1.jpg',
            'https://example.com/vrcenter-store2.jpg'
        ],
        reviews: [
            { user: 'Alex P.', rating: 5, comment: 'Best VR experience ever!' },
            { user: 'Emma S.', rating: 5, comment: 'Great for team building' }
        ],
        services: ['VR Gaming', 'VR Training', 'VR Events']
    },
    'Drone Tech': {
        location: { lat: 20.5948, lng: 78.9640 },
        category: 'drones',
        rating: 4.7,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '357 Drone Way, Tech City',
        features: ['Drone Training', 'Aerial Photography', 'Drone Repair'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Drone Photography Package'],
        logo: 'https://example.com/dronetech-logo.png',
        photos: [
            'https://example.com/dronetech-store1.jpg',
            'https://example.com/dronetech-store2.jpg'
        ],
        reviews: [
            { user: 'Tom B.', rating: 5, comment: 'Expert drone training' },
            { user: 'Rachel L.', rating: 4, comment: 'Great aerial shots' }
        ],
        services: ['Drone Training', 'Aerial Photography', 'Repair']
    },
    'Robot World': {
        location: { lat: 20.5949, lng: 78.9641 },
        category: 'robotics',
        rating: 4.8,
        distance: 0,
        openingHours: '9:00 AM - 8:00 PM',
        address: '753 Robot Road, Tech Park',
        features: ['Robot Assembly', 'Programming Classes', 'Robot Repair'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Robotics Workshop'],
        logo: 'https://example.com/robotworld-logo.png',
        photos: [
            'https://example.com/robotworld-store1.jpg',
            'https://example.com/robotworld-store2.jpg'
        ],
        reviews: [
            { user: 'David K.', rating: 5, comment: 'Amazing robotics classes' },
            { user: 'Sophie M.', rating: 4, comment: 'Great for kids' }
        ],
        services: ['Robot Assembly', 'Programming', 'Repair']
    },
    'AI Tech Hub': {
        location: { lat: 20.5950, lng: 78.9642 },
        category: 'ai',
        rating: 4.9,
        distance: 0,
        openingHours: '10:00 AM - 9:00 PM',
        address: '951 AI Street, Tech Park',
        features: ['AI Training', 'Machine Learning', 'Data Analysis'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['AI Workshop', 'Data Science Course'],
        logo: 'https://example.com/aitech-logo.png',
        photos: [
            'https://example.com/aitech-store1.jpg',
            'https://example.com/aitech-store2.jpg'
        ],
        reviews: [
            { user: 'James W.', rating: 5, comment: 'Cutting-edge AI solutions' },
            { user: 'Maria L.', rating: 5, comment: 'Excellent training programs' }
        ],
        services: ['AI Training', 'ML Development', 'Data Analysis'],
        socialMedia: {
            facebook: 'https://facebook.com/aitech',
            twitter: 'https://twitter.com/aitech',
            instagram: 'https://instagram.com/aitech'
        }
    },
    'Green Tech Store': {
        location: { lat: 20.5951, lng: 78.9643 },
        category: 'green_tech',
        rating: 4.7,
        distance: 0,
        openingHours: '9:00 AM - 8:00 PM',
        address: '357 Green Way, Tech City',
        features: ['Solar Products', 'Energy Efficient', 'Eco-Friendly'],
        paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
        specialOffers: ['Solar Package Deals'],
        logo: 'https://example.com/greentech-logo.png',
        photos: [
            'https://example.com/greentech-store1.jpg',
            'https://example.com/greentech-store2.jpg'
        ],
        reviews: [
            { user: 'Eco L.', rating: 5, comment: 'Great eco-friendly products' },
            { user: 'Green M.', rating: 4, comment: 'Sustainable solutions' }
        ],
        services: ['Solar Installation', 'Energy Audit', 'Green Consulting'],
        socialMedia: {
            facebook: 'https://facebook.com/greentech',
            twitter: 'https://twitter.com/greentech',
            instagram: 'https://instagram.com/greentech'
        }
    },
    '3D Print Lab': {
        location: { lat: 20.5952, lng: 78.9644 },
        category: '3d_printing',
        rating: 4.8,
        distance: 0,
        openingHours: '10:30 AM - 9:30 PM',
        address: '753 Print Street, Tech Park',
        features: ['3D Printing', 'Design Service', 'Prototyping'],
        paymentMethods: ['Cash', 'Card', 'UPI'],
        specialOffers: ['Design & Print Package'],
        logo: 'https://example.com/3dprint-logo.png',
        photos: [
            'https://example.com/3dprint-store1.jpg',
            'https://example.com/3dprint-store2.jpg'
        ],
        reviews: [
            { user: 'Design P.', rating: 5, comment: 'Amazing 3D printing service' },
            { user: 'Maker S.', rating: 5, comment: 'Great for prototyping' }
        ],
        services: ['3D Printing', 'Design Service', 'Prototyping'],
        socialMedia: {
            facebook: 'https://facebook.com/3dprint',
            twitter: 'https://twitter.com/3dprint',
            instagram: 'https://instagram.com/3dprint'
        }
    }
};

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

// Function to show basic mock offers
function showBasicMockOffers() {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) {
        console.error('Offers container not found');
        return;
    }
    
    offersContainer.innerHTML = '';

    // Basic mock offers
    const mockOffers = [
        {
            title: 'Tech Store Special',
            description: 'Great deals on electronics',
            discount: '20%',
            shop: 'Tech Store',
            rating: 4.5,
            openingHours: '10:00 AM - 9:00 PM',
            address: '123 Tech Street, City',
            features: ['Free Installation', 'Extended Warranty', 'Tech Support'],
            services: ['Repair', 'Installation', 'Consultation'],
            paymentMethods: ['Cash', 'Card', 'UPI', 'EMI'],
            specialOffers: ['Student Discount', 'Bundle Deals'],
            products: [
                {
                    name: 'Smartphone',
                    price: '₹15,000',
                    features: 'Latest Model, 128GB Storage',
                    image: 'https://example.com/phone.jpg',
                    details: {
                        brand: 'TechBrand',
                        model: 'X-100',
                        color: 'Black',
                        warranty: '1 Year',
                        specifications: [
                            '6.5 inch Display',
                            '8GB RAM',
                            '128GB Storage',
                            '48MP Camera',
                            '5000mAh Battery'
                        ]
                    }
                }
            ]
        },
        {
            title: 'Digital Hub Offer',
            description: 'Amazing deals on gadgets',
            discount: '15%',
            shop: 'Digital Hub',
            rating: 4.3,
            openingHours: '9:00 AM - 8:00 PM',
            address: '456 Digital Avenue, City',
            features: ['Smart Home Setup', '24/7 Support', 'Demo Available'],
            services: ['Smart Home Setup', 'Integration', 'Training'],
            paymentMethods: ['Card', 'UPI', 'EMI'],
            specialOffers: ['First Purchase 20% Off'],
            products: [
                {
                    name: 'Laptop',
                    price: '₹45,000',
                    features: 'Intel i5, 8GB RAM',
                    image: 'https://example.com/laptop.jpg',
                    details: {
                        brand: 'TechPro',
                        model: 'L-200',
                        color: 'Silver',
                        warranty: '2 Years',
                        specifications: [
                            '15.6 inch Display',
                            'Intel i5 Processor',
                            '8GB RAM',
                            '512GB SSD',
                            'Windows 11'
                        ]
                    }
                }
            ]
        },
        {
            title: 'Smart World Deals',
            description: 'Best prices on smart devices',
            discount: '25%',
            shop: 'Smart World',
            rating: 4.7,
            openingHours: '10:30 AM - 9:30 PM',
            address: '789 Smart Road, City',
            features: ['Smart Setup', 'Tech Support', 'Warranty'],
            services: ['Setup', 'Support', 'Repair'],
            paymentMethods: ['Cash', 'Card', 'UPI'],
            specialOffers: ['Smart Home Package'],
            products: [
                {
                    name: 'Smart Watch',
                    price: '₹5,000',
                    features: 'Fitness Tracking, Notifications',
                    image: 'https://example.com/watch.jpg',
                    details: {
                        brand: 'SmartFit',
                        model: 'W-300',
                        color: 'Blue',
                        warranty: '1 Year',
                        specifications: [
                            '1.4 inch Display',
                            'Heart Rate Monitor',
                            'Sleep Tracking',
                            'Water Resistant',
                            '7 Days Battery'
                        ]
                    }
                }
            ]
        }
    ];

    // Display the offers
    mockOffers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        
        offerCard.innerHTML = `
            <div class="shop-header">
                <h3>${offer.title}</h3>
                <div class="shop-rating">${offer.rating} ⭐</div>
            </div>
            <p>${offer.description}</p>
            <p class="discount">Discount: ${offer.discount}</p>
            <div class="shop-info">
                <p class="shop-name">Shop: ${offer.shop}</p>
                <p class="shop-hours">Hours: ${offer.openingHours}</p>
                <p class="shop-address">Address: ${offer.address}</p>
                <div class="shop-features">
                    <h4>Features:</h4>
                    <ul>
                        ${offer.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="shop-services">
                    <h4>Services:</h4>
                    <ul>
                        ${offer.services.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
                <div class="payment-methods">
                    <h4>Payment Methods:</h4>
                    <p>${offer.paymentMethods.join(', ')}</p>
                </div>
                <div class="special-offers">
                    <h4>Special Offers:</h4>
                    <p>${offer.specialOffers.join(', ')}</p>
                </div>
            </div>
            <button class="view-products-btn" data-offer='${JSON.stringify(offer)}'>View Products</button>
        `;
        offersContainer.appendChild(offerCard);

        // Add click event to view products
        const viewBtn = offerCard.querySelector('.view-products-btn');
        viewBtn.addEventListener('click', () => {
            console.log('View Products clicked for:', offer);
            showProductDetails(offer);
        });
    });
}

// Function to show product details
function showProductDetails(offer) {
    console.log('Showing product details for:', offer);
    
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="shop-header">
                <h2>${offer.shop}</h2>
                <p class="shop-rating">${offer.rating} ⭐</p>
            </div>
            <div class="products-grid">
                ${offer.products.map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <p class="features">${product.features}</p>
                        <div class="product-details">
                            <h4>Specifications:</h4>
                            <ul>
                                ${product.details.specifications.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                            <p><strong>Brand:</strong> ${product.details.brand}</p>
                            <p><strong>Model:</strong> ${product.details.model}</p>
                            <p><strong>Color:</strong> ${product.details.color}</p>
                            <p><strong>Warranty:</strong> ${product.details.warranty}</p>
                        </div>
                        <button class="add-to-cart-btn" data-product='${JSON.stringify(product)}'>Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .close-modal {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 24px;
            cursor: pointer;
        }

        .shop-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .product-card {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .product-card img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
        }

        .product-card h3 {
            margin: 10px 0;
            color: #2196f3;
        }

        .product-card .price {
            color: #e91e63;
            font-weight: bold;
            margin: 5px 0;
        }

        .product-card .features {
            color: #666;
            margin: 5px 0;
        }

        .product-details {
            margin: 15px 0;
            text-align: left;
        }

        .product-details ul {
            list-style-type: none;
            padding: 0;
        }

        .product-details li {
            padding: 5px 0;
            border-bottom: 1px solid #eee;
        }

        .add-to-cart-btn {
            background-color: #2196f3;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }

        .add-to-cart-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });

    // Add to cart functionality
    const addToCartBtns = modal.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = JSON.parse(btn.dataset.product);
            addToCart(product);
            modal.remove();
            style.remove();
        });
    });
}

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

// Get weather information
async function getWeatherInfo() {
    if (!userLocation) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();

        // Update weather display
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weather-description').textContent = data.weather[0].description;

        // Update weather icon
        const weatherIcon = document.querySelector('#weather-display i');
        weatherIcon.className = getWeatherIcon(data.weather[0].main);

        // Update local offers based on weather
        updateLocalOffers(data.weather[0].main.toLowerCase());
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Get weather icon class
function getWeatherIcon(weather) {
    switch (weather.toLowerCase()) {
        case 'clear': return 'fas fa-sun';
        case 'clouds': return 'fas fa-cloud';
        case 'rain': return 'fas fa-cloud-rain';
        case 'snow': return 'fas fa-snowflake';
        default: return 'fas fa-cloud-sun';
    }
}

// Update delivery zone information with enhanced pricing
function updateDeliveryZone() {
    if (!userLocation) return;

    const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        storeLocation.lat,
        storeLocation.lng
    );

    // Determine zone based on distance
    let zone = 'express';
    if (distance <= 5) zone = 'standard';
    else if (distance <= 10) zone = 'extended';
    else if (distance <= 15) zone = 'premium';

    // Calculate delivery fee based on distance
    const zoneConfig = deliveryZones[zone];
    const baseDeliveryFee = calculateDeliveryFee(distance, zoneConfig);

    // Update zone display with enhanced information
    document.querySelectorAll('.zone').forEach(el => {
        el.style.opacity = '0.5';
    });
    const currentZone = document.querySelector(`.zone.${zone}`);
    currentZone.style.opacity = '1';
    
    // Update zone information with detailed pricing
    currentZone.innerHTML = `
        <h3>${zone.charAt(0).toUpperCase() + zone.slice(1)} Zone (${distance.toFixed(1)} km)</h3>
        <p>${zoneConfig.description}</p>
        <p>Delivery Time: ${zoneConfig.time}</p>
        <div class="pricing-details">
            <p>Base Fee: ₹${zoneConfig.baseFee}</p>
            <p>Per Km Fee: ₹${zoneConfig.perKmFee}</p>
            <p>Distance: ${distance.toFixed(1)} km</p>
            <p class="total-fee">Total Delivery Fee: ₹${baseDeliveryFee}</p>
        </div>
        <div class="delivery-options">
            <div class="option">
                <input type="radio" name="delivery-speed" value="standard" checked>
                <label>Standard (${zoneConfig.time})</label>
            </div>
            <div class="option">
                <input type="radio" name="delivery-speed" value="express">
                <label>Express (${calculateExpressTime(zoneConfig.time)})</label>
            </div>
            <div class="option">
                <input type="radio" name="delivery-speed" value="priority">
                <label>Priority (${calculatePriorityTime(zoneConfig.time)})</label>
            </div>
        </div>
    `;

    // Add event listeners for delivery speed options
    const speedOptions = currentZone.querySelectorAll('input[name="delivery-speed"]');
    speedOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const speed = e.target.value;
            const multiplier = deliverySpeedMultipliers[speed];
            const adjustedFee = baseDeliveryFee * multiplier;
            updateDeliveryFeeDisplay(adjustedFee, speed);
        });
    });

    // Update local offers with enhanced pricing
    updateLocalOffersWithDistance(distance, baseDeliveryFee);
}

// Calculate express delivery time
function calculateExpressTime(baseTime) {
    const [min, max] = baseTime.split('-').map(t => parseInt(t));
    return `${Math.ceil(min * 0.5)}-${Math.ceil(max * 0.5)} hours`;
}

// Calculate priority delivery time
function calculatePriorityTime(baseTime) {
    const [min, max] = baseTime.split('-').map(t => parseInt(t));
    return `${Math.ceil(min * 0.25)}-${Math.ceil(max * 0.25)} hours`;
}

// Update delivery fee display
function updateDeliveryFeeDisplay(fee, speed) {
    const feeDisplay = document.querySelector('.total-fee');
    if (feeDisplay) {
        feeDisplay.innerHTML = `
            <p>Total Delivery Fee: ₹${fee}</p>
            <small>${speed.charAt(0).toUpperCase() + speed.slice(1)} Delivery</small>
        `;
    }
}

// Calculate delivery fee based on distance and zone
function calculateDeliveryFee(distance, zoneConfig) {
    return zoneConfig.baseFee + (distance * zoneConfig.perKmFee);
}

// Update local offers with distance-based pricing and location filtering
function updateLocalOffersWithDistance(distance, baseDeliveryFee) {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) {
        console.error('Offers container not found');
        return;
    }
    
    offersContainer.innerHTML = '';

    // Get current weather or use default
    const weatherDisplay = document.getElementById('weather-description');
    const weather = weatherDisplay ? weatherDisplay.textContent.toLowerCase() : 'cloudy';
    
    // Map weather conditions to offer categories
    let weatherCategory = 'cloudy';
    if (weather.includes('sun') || weather.includes('clear')) {
        weatherCategory = 'sunny';
    } else if (weather.includes('rain') || weather.includes('drizzle')) {
        weatherCategory = 'rainy';
    }

    // Create mock offers for each mock shop
    const mockOffers = [];
    Object.entries(localShops).forEach(([shopName, shop]) => {
        if (shopName.startsWith('Mock Shop') && shop.distance <= 15) {
            const mockOffer = {
                title: `${shopName} Special Offer`,
                description: `Great deals at ${shopName}`,
                discount: '20%',
                shop: shopName,
                products: [
                    {
                        name: 'Special Product',
                        price: '₹5,000',
                        features: 'Premium Quality, Best in Class',
                        image: 'https://example.com/product.jpg'
                    }
                ]
            };
            mockOffers.push(mockOffer);
        }
    });

    // Combine weather-based offers with mock offers
    const allOffers = [...weatherOffers[weatherCategory] || [], ...mockOffers];

    // Update shop distances
    if (userLocation) {
        Object.keys(localShops).forEach(shopName => {
            const shop = localShops[shopName];
            shop.distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                shop.location.lat,
                shop.location.lng
            );
        });
    }

    // Filter and sort offers based on distance
    const filteredOffers = allOffers.filter(offer => {
        const shop = localShops[offer.shop];
        return shop && shop.distance <= 15; // Show shops within 15km
    }).sort((a, b) => {
        return localShops[a.shop].distance - localShops[b.shop].distance;
    });

    if (filteredOffers.length === 0) {
        offersContainer.innerHTML = `
            <div class="no-offers">
                <h3>No local offers available in your area</h3>
                <p>Please check back later or try a different location</p>
            </div>
        `;
        return;
    }

    // Display the offers
    filteredOffers.forEach(offer => {
        const shop = localShops[offer.shop];
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card';
        
        // Calculate prices for different delivery speeds
        const productPrice = parseInt(offer.products[0].price.replace(/[^0-9]/g, ''));
        const standardTotal = productPrice + baseDeliveryFee;
        const expressTotal = productPrice + (baseDeliveryFee * deliverySpeedMultipliers.express);
        const priorityTotal = productPrice + (baseDeliveryFee * deliverySpeedMultipliers.priority);
        
        offerCard.innerHTML = `
            <div class="shop-header">
                <img src="${shop.logo}" alt="${shop.name} Logo" class="shop-logo">
                <h3>${offer.title}</h3>
                <div class="shop-social">
                    ${shop.socialMedia ? `
                        <a href="${shop.socialMedia.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="${shop.socialMedia.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="${shop.socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    ` : ''}
                </div>
            </div>
            <div class="shop-gallery">
                ${shop.photos.map(photo => `
                    <img src="${photo}" alt="${shop.name} Store" class="shop-photo">
                `).join('')}
            </div>
            <p>${offer.description}</p>
            <p class="discount">Discount: ${offer.discount}</p>
            <div class="shop-info">
                <p class="shop-name">Shop: ${offer.shop}</p>
                <p class="shop-distance">Distance: ${shop.distance.toFixed(1)} km</p>
                <p class="shop-rating">Rating: ${shop.rating} ⭐</p>
                <p class="shop-hours">Hours: ${shop.openingHours}</p>
                <p class="shop-address">Address: ${shop.address}</p>
                <div class="shop-features">
                    <h4>Features:</h4>
                    <ul>
                        ${shop.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="shop-services">
                    <h4>Services:</h4>
                    <ul>
                        ${shop.services.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
                <div class="payment-methods">
                    <h4>Payment Methods:</h4>
                    <p>${shop.paymentMethods.join(', ')}</p>
                </div>
                <div class="special-offers">
                    <h4>Special Offers:</h4>
                    <p>${shop.specialOffers.join(', ')}</p>
                </div>
                <div class="shop-reviews">
                    <h4>Recent Reviews:</h4>
                    ${shop.reviews.map(review => `
                        <div class="review">
                            <p class="review-user">${review.user}</p>
                            <p class="review-rating">${review.rating} ⭐</p>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="delivery-info">
                <div class="delivery-options">
                    <div class="option">
                        <input type="radio" name="delivery-speed-${offer.shop}" value="standard" checked>
                        <label>Standard: ₹${baseDeliveryFee}</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="delivery-speed-${offer.shop}" value="express">
                        <label>Express: ₹${baseDeliveryFee * deliverySpeedMultipliers.express}</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="delivery-speed-${offer.shop}" value="priority">
                        <label>Priority: ₹${baseDeliveryFee * deliverySpeedMultipliers.priority}</label>
                    </div>
                </div>
                <p class="total-price">Total with Standard Delivery: ₹${standardTotal}</p>
            </div>
            <button class="view-products-btn" data-shop="${offer.shop}">View Products</button>
        `;
        offersContainer.appendChild(offerCard);

        // Add click event to view products
        const viewBtn = offerCard.querySelector('.view-products-btn');
        viewBtn.addEventListener('click', () => showProductDetails(offer, shop.distance, baseDeliveryFee));
    });
}

// Modify showProductDetails to include distance-based pricing
function showProductDetails(offer, distance, baseDeliveryFee) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${offer.shop} - Products</h2>
            <div class="delivery-info">
                <p>Distance from store: ${distance.toFixed(1)} km</p>
                <p>Delivery Fee: ₹${baseDeliveryFee}</p>
            </div>
            <div class="products-grid">
                ${offer.products.map(product => {
                    const productPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
                    const totalPrice = productPrice + baseDeliveryFee;
                    return `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price}</p>
                            <p class="features">${product.features}</p>
                            <p class="delivery-fee">Delivery Fee: ₹${baseDeliveryFee}</p>
                            <p class="total-price">Total with Delivery: ₹${totalPrice}</p>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .close-modal {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 24px;
            cursor: pointer;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .product-card {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .product-card img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
        }

        .product-card h3 {
            margin: 10px 0;
            color: #2196f3;
        }

        .product-card .price {
            color: #e91e63;
            font-weight: bold;
            margin: 5px 0;
        }

        .product-card .features {
            color: #666;
            margin: 5px 0;
        }

        .add-to-cart-btn {
            background-color: #2196f3;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }

        .add-to-cart-btn:hover {
            background-color: #1976d2;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });

    // Update add to cart functionality to include delivery fee
    const addToCartBtns = modal.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src,
                features: productCard.querySelector('.features').textContent,
                deliveryFee: baseDeliveryFee,
                distance: distance.toFixed(1)
            };
            addToCart(product);
            modal.remove();
            style.remove();
        });
    });
}

// Cart functionality
let cart = [];
let deliveryFee = 0;

// Cart UI elements
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total-amount');
const cartCount = document.querySelector('.cart-count');
const closeCart = document.querySelector('.close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Toggle cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to cart functionality
function addToCart(product) {
    cart.push(product);
    updateCartUI();
    cartSidebar.classList.add('active');
}

// Update cart UI to show delivery information
function updateCartUI() {
    cartItems.innerHTML = '';
    let total = 0;
    let totalDeliveryFee = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price}</div>
                <div class="cart-item-delivery">
                    <small>Distance: ${item.distance} km</small>
                    <small>Delivery Fee: ₹${item.deliveryFee}</small>
                </div>
            </div>
            <div class="remove-item" data-index="${index}">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItems.appendChild(cartItem);

        // Add remove functionality
        const removeBtn = cartItem.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCartUI();
        });

        // Add to totals
        total += parseInt(item.price.replace(/[^0-9]/g, ''));
        totalDeliveryFee += item.deliveryFee;
    });

    // Update cart count
    cartCount.textContent = cart.length;

    // Update total with delivery fee
    cartTotal.textContent = `₹${total + totalDeliveryFee}`;
}

// Delivery option change handler
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        updateDeliveryFee(e.target.value);
        updateCartUI();
    });
});

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    const deliveryTime = getDeliveryTime(deliveryOption);
    
    // Store cart and delivery info in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('deliveryOption', deliveryOption);
    sessionStorage.setItem('deliveryTime', deliveryTime);
    sessionStorage.setItem('deliveryFee', deliveryFee);

    // Redirect to checkout page
    window.location.href = 'adress.html';
});

// Get delivery time based on option
function getDeliveryTime(option) {
    switch (option) {
        case 'standard':
            return '1-2 hours';
        case 'express':
            return '30-45 minutes';
        case 'scheduled':
            return 'Scheduled time';
        default:
            return '1-2 hours';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add click event to detect location button
    document.getElementById('detect-location').addEventListener('click', () => {
        document.getElementById('current-address').textContent = 'Detecting your location...';
    });

    // Initialize with default weather (cloudy) if location not detected
    const defaultWeather = 'cloudy';
    updateLocalOffersWithDistance(5, 0); // Default distance and fee
}); 