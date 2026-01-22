const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];


window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();


class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;

        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        const isDark = document.body.classList.contains('dark_theme');
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(74, 144, 226, ${this.opacity})`;

        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.shadowColor = isDark ? "white" : "#05203e";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function init() {
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();


const checkboxInput = document.getElementById('checkbox');
checkboxInput.addEventListener('click', toggleTheme);


function toggleTheme() {
    document.body.classList.toggle("dark_theme");

    const isDark = document.body.classList.contains("dark_theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");
}


window.onload = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.getElementById("checkbox").checked = true;
    }
};


const calculateBTN = document.querySelector('ripple_btn');
checkboxInput.addEventListener('click', calculateAge);


function calculateAge(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);


    const birthDateValue = document.getElementById("dateInput").value;
    const result = document.getElementById("result");

    if (!birthDateValue) {
        result.innerHTML = "Select your birthday!";
        return;
    }

    const birthDate = new Date(birthDateValue);
    const today = new Date();


    let year = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    let day = today.getDate() - birthDate.getDate();

    if (day < 0) {
        month--;
        day += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (month < 0) {
        year--;
        month += 12;
    }

    result.classList.remove('animate_result');
    void result.offsetWidth;
    result.classList.add('animate_result');

    result.innerHTML = `You are <br><span class="result-highlight">${year}y ${month}m ${day}d</span><br> old`;
}



