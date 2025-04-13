// Data Media Sosial
const socialMediaData = [
    {
        id: "instagram",
        icon: "fab fa-instagram",
        title: "Instagram",
        description: "Follow kami untuk update visual dan cerita sehari-hari",
        url: "https://instagram.com/kyanazee7",
        color: "#E1306C"
    },
    {
        id: "tiktok",
        icon: "fab fa-tiktok",
        title: "TikTok",
        description: "Nikmati konten video pendek dan menghibur kami",
        url: "https://tiktok.com/@kyanazee",
        color: "#000000"
    },
    {
        id: "whatsapp",
        icon: "fab fa-whatsapp",
        title: "WhatsApp",
        description: "Hubungi kami langsung melalui WhatsApp",
        url: "https://wa.me/6285119358103",
        color: "#25D366"
    },
    {
        id: "discord",
        icon: "fab fa-discord",
        title: "Discord",
        description: "Bergabunglah dengan komunitas Discord kami",
        url: "https://discord.gg/link-invite-anda",
        color: "#5865F2"
    },
    {
        id: "youtube",
        icon: "fab fa-youtube",
        title: "YouTube",
        description: "Tonton video dan subscribe channel kami",
        url: "https://youtube.com/@kyanazee?si=LWK24HyRFPvww_NO",
        color: "#FF0000"
    }
];

// Data Video YouTube
const youtubeVideos = [
    { id: "kode_video_1", title: "Video Pertama" },
    { id: "kode_video_2", title: "Video Kedua" },
    { id: "kode_video_3", title: "Video Ketiga" },
]

// Data Instagram Feed (gunakan gambar placeholder atau API Instagram)
const instagramPosts = [
    { image: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Instagram+1", url: "#" },
    { image: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Instagram+2", url: "#" },
    { image: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Instagram+3", url: "#" },
    { image: "https://via.placeholder.com/300/FFFF00/000000?text=Instagram+4", url: "#" },
    { image: "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Instagram+5", url: "#" },
    { image: "https://via.placeholder.com/300/00FFFF/000000?text=Instagram+6", url: "#" }
];

// Variabel Global
let currentVideoIndex = 0;

// Fungsi untuk memuat kartu media sosial
function loadSocialCards() {
    const socialLinksContainer = document.getElementById('social-links');
    
    socialMediaData.forEach(social => {
        const card = document.createElement('div');
        card.className = `social-card ${social.id}`;
        card.innerHTML = `
            <i class="${social.icon}" style="color: ${social.color}"></i>
            <h2>${social.title}</h2>
            <p>${social.description}</p>
            <a href="${social.url}" target="_blank" class="btn">Kunjungi ${social.title}</a>
        `;
        socialLinksContainer.appendChild(card);
    });
}

// Fungsi untuk memuat video YouTube
function loadYouTubeVideo(index) {
    const videoContainer = document.getElementById('youtube-embed');
    const video = youtubeVideos[index];
    
    videoContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

// Fungsi untuk memuat Instagram feed
function loadInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    
    instagramPosts.forEach(post => {
        const item = document.createElement('a');
        item.className = 'instagram-item';
        item.href = post.url;
        item.target = '_blank';
        item.innerHTML = `<img src="${post.image}" alt="Instagram Post">`;
        instagramContainer.appendChild(item);
    });
}

// Fungsi untuk memuat footer links
function loadFooterLinks() {
    const footerLinksContainer = document.querySelector('.footer-links');
    
    socialMediaData.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.innerHTML = `<i class="${social.icon}"></i>`;
        footerLinksContainer.appendChild(link);
    });
}

// Fungsi untuk toggle tema gelap/terang
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Cek preferensi tema dari localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Fungsi untuk navigasi video
function setupVideoNavigation() {
    const prevBtn = document.getElementById('prev-video');
    const nextBtn = document.getElementById('next-video');
    
    prevBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex - 1 + youtubeVideos.length) % youtubeVideos.length;
        loadYouTubeVideo(currentVideoIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % youtubeVideos.length;
        loadYouTubeVideo(currentVideoIndex);
    });
}

// Fungsi untuk mengupdate tahun di footer
function updateYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadSocialCards();
    loadYouTubeVideo(currentVideoIndex);
    loadInstagramFeed();
    loadFooterLinks();
    setupThemeToggle();
    setupVideoNavigation();
    updateYear();
    
    // Animasi scroll halus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});