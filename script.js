function updateClock() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('day').textContent = days[now.getDay()];
    document.getElementById('date').textContent = now.getDate();
    document.getElementById('month').textContent = months[now.getMonth()];
    document.getElementById('year').textContent = now.getFullYear();
    
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0') + ' ' + ampm;
    
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
}

// Call updateClock every second
setInterval(updateClock, 1000);

// Initial call to display the time immediately
updateClock();

const hospitals = [
    {
        name: "AIIMS",
        location: "Delhi",
        contact: "+91-11-26864851",
        doctors: ["Dr. Amit Gupta", "Dr. Neha Verma", "Dr. Rahul Sharma", "Dr. Priya Patel"],
        services: ["Cancer", "Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
        image: "AIIMS.jpeg"
    },
    {
        name: "Bara Hindu Rao Hospital",
        location: "Delhi",
        contact: "+91-11-23919738",
        services: ["Gynecology", "Urology", "Dermatology", "ENT"],
        image: "hindurao.jpg"
    },
    {
        name: "Deen Dayal Upadhyaya",
        location: "Delhi",
        contact: "+91-11-25400336",
        services: ["Gastroenterology", "Pulmonology", "Nephrology", "Psychiatry"],
        image: "deen.avif"
    },
    {
        name: "Ganga Ram Hospital, Pusa Road",
        location: "Delhi",
        contact: "+91-11-25712389",
        services: ["Oncology", "Cardiology", "Neurosurgery", "Plastic Surgery", "Rheumatology"],
        image: "gangaram.jpg"
    },
    {
        name: "Maharaja Agrasan, Punjabi Bagh",
        location: "Delhi",
        contact: "+91-11-25121645",
        services: ["Pediatrics", "Obstetrics", "Orthopedics", "Dentistry"],
        image: "maharaja.png"
    },
    {
        name: "Zed Hospital Ltd.",
        location: "Delhi",
        contact: "+91-11-22053805",
        services: ["Emergency Care", "Internal Medicine", "Radiology", "Physiotherapy"],
        image: "zed.webp"
    }
];

// Function to create a hospital card
function createHospitalCard(hospital) {
    return `
        <div class="hospital-card">
            <div class="hospital-image">
                <img src="${hospital.image}" alt="${hospital.name}">
            </div>
            <div class="hospital-info">
                <h2 class="hospital-name">${hospital.name}</h2>
                <p class="hospital-details">
                    <span class="location">${hospital.location}</span> | 
                    <span class="contact">${hospital.contact}</span>
                </p>
                <div class="hospital-services">
                    ${hospital.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Function to display all hospitals
function displayAllHospitals() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = hospitals.map(hospital => createHospitalCard(hospital)).join('');
}

// Function to search hospitals
function searchHospitals() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    if (searchInput.trim() === '') {
        displayAllHospitals();
        return;
    }

    const filteredHospitals = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchInput) ||
        hospital.location.toLowerCase().includes(searchInput) ||
        hospital.services.some(service => service.toLowerCase().includes(searchInput))
    );

    if (filteredHospitals.length === 0) {
        resultsContainer.innerHTML = '<p>No hospitals found matching your search.</p>';
    } else {
        resultsContainer.innerHTML = filteredHospitals.map(hospital => createHospitalCard(hospital)).join('');
    }
}

// Display all hospitals when the page loads
window.onload = displayAllHospitals;

// Add event listener for the search input
document.getElementById('search-input').addEventListener('input', searchHospitals);
