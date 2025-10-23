document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeButton = document.querySelector('.close-button');
    const messageInput = document.querySelector('.chatbot-input input');
    const sendButton = document.querySelector('.chatbot-input button');
    const messagesContainer = document.querySelector('.chatbot-messages');

    // Gemini API configuration
    const GEMINI_API_KEY = 'AIzaSyByaDDNjECaIvN0npzz62N-Ptb9gyyUhCw';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    // Chat history for context
    let chatHistory = [];
    
    // Current order state
    let currentOrder = {
        items: [],
        total: 0,
        status: null
    };

    // Product database with multiple categories and price ranges
    const productDatabase = {
        'mobile': {
            'budget': [
                {
                    name: 'Redmi 12',
                    price: '₹9,999',
                    features: '6.79" FHD+ Display, 5000mAh Battery, 50MP Dual Camera'
                },
                {
                    name: 'Realme C55',
                    price: '₹10,999',
                    features: '6.72" FHD+ Display, 5000mAh Battery, 64MP Dual Camera'
                }
            ],
            'mid_range': [
                {
                    name: 'Samsung Galaxy M34',
                    price: '₹18,999',
                    features: '6.6" FHD+ Display, 6000mAh Battery, 50MP Triple Camera'
                },
                {
                    name: 'Redmi Note 12',
                    price: '₹17,999',
                    features: '6.67" AMOLED Display, 5000mAh Battery, 48MP Triple Camera'
                }
            ],
            'premium': [
                {
                    name: 'Samsung Galaxy S23',
                    price: '₹74,999',
                    features: '6.1" Dynamic AMOLED, 3900mAh Battery, 50MP Triple Camera'
                },
                {
                    name: 'iPhone 14',
                    price: '₹79,900',
                    features: '6.1" Super Retina XDR, 3240mAh Battery, 12MP Dual Camera'
                }
            ]
        },
        'laptop': {
            'budget': [
                {
                    name: 'Lenovo IdeaPad Slim 3',
                    price: '₹34,990',
                    features: '15.6" FHD Display, AMD Ryzen 5, 8GB RAM, 512GB SSD'
                },
                {
                    name: 'HP Laptop 15s',
                    price: '₹39,990',
                    features: '15.6" FHD Display, Intel Core i3, 8GB RAM, 256GB SSD'
                }
            ],
            'mid_range': [
                {
                    name: 'Dell Inspiron 15',
                    price: '₹54,990',
                    features: '15.6" FHD Display, Intel Core i5, 16GB RAM, 512GB SSD'
                },
                {
                    name: 'ASUS VivoBook 15',
                    price: '₹59,990',
                    features: '15.6" FHD Display, AMD Ryzen 7, 16GB RAM, 512GB SSD'
                }
            ],
            'premium': [
                {
                    name: 'MacBook Air M2',
                    price: '₹1,14,900',
                    features: '13.6" Liquid Retina Display, M2 Chip, 8GB RAM, 256GB SSD'
                },
                {
                    name: 'Dell XPS 13',
                    price: '₹1,29,990',
                    features: '13.4" 4K Display, Intel Core i7, 16GB RAM, 512GB SSD'
                }
            ]
        },
        'tablet': {
            'budget': [
                {
                    name: 'Samsung Galaxy Tab A8',
                    price: '₹15,999',
                    features: '10.5" Display, 4GB RAM, 64GB Storage, 7040mAh Battery'
                },
                {
                    name: 'Lenovo Tab M10',
                    price: '₹12,999',
                    features: '10.1" Display, 4GB RAM, 64GB Storage, 5000mAh Battery'
                }
            ],
            'premium': [
                {
                    name: 'iPad Air',
                    price: '₹59,900',
                    features: '10.9" Liquid Retina Display, A14 Bionic, 64GB Storage'
                },
                {
                    name: 'Samsung Galaxy Tab S9',
                    price: '₹69,999',
                    features: '11" Dynamic AMOLED, Snapdragon 8 Gen 2, 8GB RAM'
                }
            ]
        }
    };

    // Enhanced fallback responses with order-related queries
    const fallbackResponses = {
        'hello': 'Hello! Welcome to our Electronic Store. I can help you browse products, place orders, and track your purchases. What would you like to do?',
        'hi': 'Hi there! I\'m your AI shopping assistant. I can help you:\n- Browse products\n- Place orders\n- Track orders\n- Get product recommendations\nWhat would you like to do?',
        'help': 'I can help you with:\n- Product recommendations\n- Placing orders\n- Order tracking\n- Price comparisons\n- Payment methods\n- Shipping information\n- Return policy\n- Warranty details\n\nJust tell me what you\'re looking for!',
        'order': 'I can help you place an order. Please tell me what product you\'re interested in, or I can recommend products based on your preferences.',
        'cart': 'I can help you with your shopping cart. Would you like to:\n- View cart\n- Add items\n- Remove items\n- Proceed to checkout',
        'default': 'I understand you\'re asking about something specific. Could you please provide more details? I\'m here to help with:\n- Product information\n- Placing orders\n- Order status\n- Technical support'
    };

    // Typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot-message', 'typing-indicator');
        typingElement.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingElement;
    }

    function removeTypingIndicator(element) {
        if (element) {
            element.remove();
        }
    }

    function toggleChat() {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
        if (chatbotWindow.style.display === 'flex') {
            messageInput.focus();
        }
    }

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Handle multi-line messages
        if (message.includes('\n')) {
            message = message.split('\n').map(line => `<p>${line}</p>`).join('');
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add to chat history
        chatHistory.push({
            role: isUser ? 'user' : 'assistant',
            content: message
        });
    }

    function getPriceRange(price, category) {
        if (category === 'mobile') {
            if (price <= 15000) return 'budget';
            if (price <= 30000) return 'mid_range';
            return 'premium';
        } else if (category === 'laptop') {
            if (price <= 40000) return 'budget';
            if (price <= 70000) return 'mid_range';
            return 'premium';
        } else if (category === 'tablet') {
            if (price <= 20000) return 'budget';
            return 'premium';
        }
        return 'budget';
    }

    function formatProductRecommendation(products, priceRange, category) {
        let response = `Here are some great ${category} options in the ${priceRange.replace('_', ' ')} range:\n\n`;
        products.forEach((product, index) => {
            response += `${index + 1}. ${product.name}\n`;
            response += `   Price: ${product.price}\n`;
            response += `   Features: ${product.features}\n\n`;
        });
        response += 'Would you like to know more about any of these products?';
        return response;
    }

    function extractPriceFromMessage(message) {
        const priceMatch = message.match(/\d+/);
        return priceMatch ? parseInt(priceMatch[0]) : null;
    }

    function detectProductCategory(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('mobile') || lowerMessage.includes('phone')) return 'mobile';
        if (lowerMessage.includes('laptop') || lowerMessage.includes('notebook')) return 'laptop';
        if (lowerMessage.includes('tablet') || lowerMessage.includes('ipad')) return 'tablet';
        return null;
    }

    // Order processing functions
    function addToOrder(product) {
        currentOrder.items.push(product);
        currentOrder.total += parseInt(product.price.replace(/[^0-9]/g, ''));
        return `Added ${product.name} to your order. Your current total is ₹${currentOrder.total}. Would you like to add anything else or proceed to checkout?`;
    }

    function processCheckout() {
        if (currentOrder.items.length === 0) {
            return "Your cart is empty. Would you like to browse our products?";
        }
        
        let orderSummary = "Here's your order summary:\n\n";
        currentOrder.items.forEach((item, index) => {
            orderSummary += `${index + 1}. ${item.name} - ${item.price}\n`;
        });
        orderSummary += `\nTotal: ₹${currentOrder.total}\n\nWould you like to proceed to checkout?`;
        
        currentOrder.status = 'pending_checkout';
        return orderSummary;
    }

    function handleOrderIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for order-related keywords
        if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('order')) {
            const category = detectProductCategory(message);
            if (category) {
                const price = extractPriceFromMessage(message);
                if (price) {
                    const priceRange = getPriceRange(price, category);
                    const products = productDatabase[category][priceRange];
                    return formatProductOrderRecommendation(products, priceRange, category);
                }
                return `I can help you order a ${category}. What's your budget range?`;
            }
        }

        // Handle cart and checkout intents
        if (lowerMessage.includes('cart')) {
            return processCheckout();
        }
        if (lowerMessage.includes('checkout')) {
            if (currentOrder.items.length > 0) {
                window.location.href = 'adress.html';
                return "Redirecting you to the checkout page...";
            }
            return "Your cart is empty. Would you like to browse our products?";
        }

        return null;
    }

    function formatProductOrderRecommendation(products, priceRange, category) {
        let response = `Here are some ${category} options in the ${priceRange.replace('_', ' ')} range:\n\n`;
        products.forEach((product, index) => {
            response += `${index + 1}. ${product.name}\n`;
            response += `   Price: ${product.price}\n`;
            response += `   Features: ${product.features}\n\n`;
        });
        response += 'To order, just say "I want to buy [product name]" or ask me about specific features!';
        return response;
    }

    // Enhanced message handling
    async function getGeminiResponse(message) {
        try {
            // First check for order-related intents
            const orderResponse = handleOrderIntent(message);
            if (orderResponse) {
                return orderResponse;
            }

            // Check for product recommendation requests
            const category = detectProductCategory(message);
            if (category) {
                const price = extractPriceFromMessage(message);
                if (price) {
                    const priceRange = getPriceRange(price, category);
                    return formatProductOrderRecommendation(productDatabase[category][priceRange], priceRange, category);
                } else {
                    return `I can help you find the perfect ${category}. Please specify your budget (e.g., "Show me ${category}s under 20000" or "What are the best ${category}s around 50000?")`;
                }
            }

            // Handle specific product orders
            for (const category in productDatabase) {
                for (const range in productDatabase[category]) {
                    const products = productDatabase[category][range];
                    const productMatch = products.find(p => 
                        message.toLowerCase().includes(p.name.toLowerCase())
                    );
                    if (productMatch) {
                        return addToOrder(productMatch);
                    }
                }
            }

            // If no specific intents matched, use Gemini API for general responses
            const context = chatHistory.slice(-5).map(msg => 
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\n');

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an AI shopping assistant for an electronic store. Previous conversation context:\n${context}\n\nUser's new message: ${message}\n\nPlease provide a helpful and concise response that maintains context and is relevant to the electronic store.`
                        }]
                    }]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }
            throw new Error('Invalid response format');
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return getFallbackResponse(message);
        }
    }

    function getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        for (const [key, value] of Object.entries(fallbackResponses)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }
        return fallbackResponses.default;
    }

    async function handleUserMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            try {
                // Get response from Gemini API
                const response = await getGeminiResponse(message);
                removeTypingIndicator(typingIndicator);
                addMessage(response);
            } catch (error) {
                console.error('Error handling message:', error);
                removeTypingIndicator(typingIndicator);
                addMessage('I apologize, but I\'m having trouble processing your request right now. Please try again later.');
            }
        }
    }

    // Clear chat history when window is closed
    function clearChatHistory() {
        chatHistory = [];
        messagesContainer.innerHTML = '';
        addMessage('Hello! Welcome to our Electronic Store. I\'m your AI shopping assistant powered by Gemini. How can I help you today?');
    }

    // Event listeners
    chatbotButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', () => {
        toggleChat();
        clearChatHistory();
    });
    sendButton.addEventListener('click', handleUserMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Add initial greeting with ordering capability highlight
    setTimeout(() => {
        addMessage('Hello! Welcome to our Electronic Store. I\'m your AI shopping assistant. I can help you browse products, place orders, and get personalized recommendations. How can I assist you today?');
    }, 500);
}); 