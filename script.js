document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
    const copyIpBtn = document.getElementById("copy-ip-btn");
    const ipText = document.getElementById("ip-text").textContent;
    const toast = document.getElementById("copy-toast");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const navbar = document.querySelector(".navbar-container");
    const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
    const sections = document.querySelectorAll("section");
    // --- Copy IP to Clipboard ---
    if (copyIpBtn) {
        copyIpBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(ipText).then(() => {
                // Show toast
                toast.classList.add("show");
                
                // Change button text temporarily
                const originalContent = copyIpBtn.innerHTML;
                copyIpBtn.innerHTML = `<i class="fa-solid fa-check"></i> Kopyalandı`;
                copyIpBtn.style.background = "#10b981";
                copyIpBtn.style.borderColor = "#10b981";
                setTimeout(() => {
                    toast.classList.remove("show");
                    copyIpBtn.innerHTML = originalContent;
                    copyIpBtn.style.background = "";
                    copyIpBtn.style.borderColor = "";
                }, 2500);
            }).catch(err => {
                console.error("IP kopyalanamadı: ", err);
            });
        });
    }
    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            mobileNav.classList.toggle("open");
        });
    }
    // --- Close Mobile Nav on link click ---
    const mobileLinks = document.querySelectorAll(".mobile-nav-item");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("open");
            mobileNav.classList.remove("open");
        });
    });
    // --- Navbar Scroll Effect ---
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "12px 40px";
            navbar.style.background = "rgba(6, 5, 8, 0.9)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            navbar.style.padding = "20px 40px";
            navbar.style.background = "rgba(10, 8, 15, 0.75)";
            navbar.style.boxShadow = "none";
        }
        // Active Link Highlight on Scroll
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });
    // --- Live Server Stats Simulation ---
    const playerCountEl = document.getElementById("player-count");
    const pingRateEl = document.getElementById("ping-rate");
    
    // Simulate player count and ping to make the site feel alive and dynamic
    function updateLiveStats() {
        // Mock players online (e.g. 42 to 48 players online out of 150 max)
        const basePlayers = 42;
        const randomModifier = Math.floor(Math.random() * 7); // 0 to 6
        const currentPlayers = basePlayers + randomModifier;
        if (playerCountEl) {
            playerCountEl.innerHTML = `${currentPlayers} <span style="color: var(--color-text-muted); font-size: 20px;">/ 150</span>`;
        }
        // Mock ping (e.g. 21ms to 27ms)
        const basePing = 21;
        const randomPingModifier = Math.floor(Math.random() * 7);
        const currentPing = basePing + randomPingModifier;
        if (pingRateEl) {
            pingRateEl.textContent = `${currentPing} ms`;
        }
    }
    // Initial load
    updateLiveStats();
    // Update every 4 seconds
    setInterval(updateLiveStats, 4000);
    // --- Play Button Click Interaction ---
    const playButtons = [document.getElementById("nav-btn-join"), document.getElementById("mobile-btn-join"), document.getElementById("direct-play-btn")];
    playButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener("click", (e) => {
                // If it's a direct play btn, let it use its href, otherwise scroll to hero & flash IP
                if (btn.id !== "direct-play-btn") {
                    e.preventDefault();
                    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
                    
                    // Flash connection widget to draw attention
                    const connectWidget = document.querySelector(".connect-widget");
                    connectWidget.style.borderColor = "var(--accent-red)";
                    connectWidget.style.boxShadow = "0 0 30px var(--accent-red-glow)";
                    
                    setTimeout(() => {
                        connectWidget.style.borderColor = "";
                        connectWidget.style.boxShadow = "";
                    }, 1500);
                }
            });
        }
    });
});
