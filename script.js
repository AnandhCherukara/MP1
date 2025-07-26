// Sample nursery data
const nurseries = [
    {
        id: 1,
        name: "Green Thumb Nursery",
        location: "123 Garden Street, Downtown",
        phone: "+1 (555) 123-4567",
        specialties: ["Indoor Plants", "Succulents", "Flowers"],
        rating: 4.8,
        reviews: 127,
        category: "indoor",
        description: "Specializing in indoor plants and home gardening solutions."
    },
    {
        id: 2,
        name: "Sunshine Garden Center",
        location: "456 Bloom Avenue, Riverside",
        phone: "+1 (555) 234-5678",
        specialties: ["Outdoor Plants", "Trees", "Landscaping"],
        rating: 4.6,
        reviews: 89,
        category: "outdoor",
        description: "Your destination for outdoor plants and landscaping needs."
    },
    {
        id: 3,
        name: "Desert Rose Nursery",
        location: "789 Cactus Lane, Westside",
        phone: "+1 (555) 345-6789",
        specialties: ["Succulents", "Cacti", "Drought-resistant"],
        rating: 4.9,
        reviews: 156,
        category: "succulents",
        description: "Experts in drought-resistant plants and desert gardening."
    },
    {
        id: 4,
        name: "Bloom & Blossom",
        location: "321 Petal Street, Midtown",
        phone: "+1 (555) 456-7890",
        specialties: ["Flowers", "Wedding Arrangements", "Seasonal"],
        rating: 4.7,
        reviews: 203,
        category: "flowers",
        description: "Beautiful flowers for all occasions and seasons."
    },
    {
        id: 5,
        name: "Urban Jungle",
        location: "654 Leaf Boulevard, Uptown",
        phone: "+1 (555) 567-8901",
        specialties: ["Indoor Plants", "Air-purifying", "Low-maintenance"],
        rating: 4.5,
        reviews: 78,
        category: "indoor",
        description: "Transform your space into an urban jungle with our plants."
    },
    {
        id: 6,
        name: "Heritage Gardens",
        location: "987 Oak Street, Eastside",
        phone: "+1 (555) 678-9012",
        specialties: ["Outdoor Plants", "Native Species", "Organic"],
        rating: 4.8,
        reviews: 134,
        category: "outdoor",
        description: "Preserving local flora with native and organic plants."
    }
];

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const nurseriesGrid = document.getElementById('nurseries-grid');
const locationSearch = document.getElementById('location-search');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        filterNurseries(filter);
    });
});

// Filter nurseries based on category
function filterNurseries(category) {
    let filteredNurseries;
    
    if (category === 'all') {
        filteredNurseries = nurseries;
    } else {
        filteredNurseries = nurseries.filter(nursery => 
            nursery.category === category
        );
    }
    
    renderNurseries(filteredNurseries);
}

// Render nursery cards
function renderNurseries(nurseriesToRender) {
    nurseriesGrid.innerHTML = '';
    
    nurseriesToRender.forEach(nursery => {
        const nurseryCard = createNurseryCard(nursery);
        nurseriesGrid.appendChild(nurseryCard);
    });
    
    // Add entrance animation
    const cards = nurseriesGrid.querySelectorAll('.nursery-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create nursery card element
function createNurseryCard(nursery) {
    const card = document.createElement('div');
    card.className = 'nursery-card';
    card.setAttribute('data-category', nursery.category);
    
    // Generate star rating
    const stars = generateStarRating(nursery.rating);
    
    // Generate specialty tags
    const specialtyTags = nursery.specialties.map(specialty => 
        `<span class="specialty-tag">${specialty}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="nursery-image">
            <i class="fas fa-seedling"></i>
        </div>
        <div class="nursery-content">
            <h3 class="nursery-title">${nursery.name}</h3>
            <div class="nursery-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${nursery.location}</span>
            </div>
            <div class="nursery-specialties">
                ${specialtyTags}
            </div>
            <div class="nursery-rating">
                <div class="stars">${stars}</div>
                <span>${nursery.rating} (${nursery.reviews} reviews)</span>
            </div>
            <div class="nursery-contact">
                <button class="contact-btn call-btn" onclick="callNursery('${nursery.phone}')">
                    <i class="fas fa-phone"></i>
                    Call
                </button>
                <button class="contact-btn visit-btn" onclick="visitNursery(${nursery.id})">
                    <i class="fas fa-map-marker-alt"></i>
                    Visit
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Search functionality
function searchNurseries() {
    const location = locationSearch.value.trim().toLowerCase();
    
    if (!location) {
        alert('Please enter a location to search');
        return;
    }
    
    // Filter nurseries by location
    const filteredNurseries = nurseries.filter(nursery => 
        nursery.location.toLowerCase().includes(location)
    );
    
    if (filteredNurseries.length === 0) {
        nurseriesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666; margin-bottom: 1rem;">No nurseries found</h3>
                <p style="color: #999;">Try searching for a different location or browse all nurseries.</p>
                <button onclick="showAllNurseries()" style="margin-top: 1rem; padding: 0.8rem 1.5rem; background: #4CAF50; color: white; border: none; border-radius: 25px; cursor: pointer;">
                    Show All Nurseries
                </button>
            </div>
        `;
    } else {
        renderNurseries(filteredNurseries);
    }
    
    // Scroll to nurseries section
    document.getElementById('nurseries').scrollIntoView({
        behavior: 'smooth'
    });
}

// Show all nurseries
function showAllNurseries() {
    renderNurseries(nurseries);
    // Reset filter buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active'); // Activate "All" button
}

// Call nursery function
function callNursery(phone) {
    window.open(`tel:${phone}`, '_self');
}

// Visit nursery function
function visitNursery(nurseryId) {
    const nursery = nurseries.find(n => n.id === nurseryId);
    if (nursery) {
        // In a real app, this would open Google Maps or similar
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nursery.location)}`;
        window.open(mapsUrl, '_blank');
    }
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Search on Enter key
locationSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchNurseries();
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with all nurseries
    renderNurseries(nurseries);
    
    // Set up animations for sections
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent form submission on page reload
window.addEventListener('beforeunload', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
});

// Utility function to debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search function
const debouncedSearch = debounce((query) => {
    if (query.length > 2) {
        const filteredNurseries = nurseries.filter(nursery => 
            nursery.name.toLowerCase().includes(query.toLowerCase()) ||
            nursery.location.toLowerCase().includes(query.toLowerCase()) ||
            nursery.specialties.some(specialty => 
                specialty.toLowerCase().includes(query.toLowerCase())
            )
        );
        renderNurseries(filteredNurseries);
    } else if (query.length === 0) {
        renderNurseries(nurseries);
    }
}, 300);

// Real-time search as user types
locationSearch.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - close mobile menu
        navMenu.classList.remove('active');
    }
}

// Performance optimization - lazy load images if any are added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}