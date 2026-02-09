window.addEventListener("DOMContentLoaded", () => {
  // ------------------ Modal / Pages / Music ------------------
  const openBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");
  const pages = document.querySelectorAll(".page");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const bgMusic = document.getElementById("bgMusic");
  const intro = document.getElementById("intro");

  let currentPage = 0;

  // --- Modal open button ---
  openBtn?.addEventListener("click", () => {
    modal.classList.add("visible");
    currentPage = 0;
    updatePages();

    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 1.0;
      bgMusic.loop = true;
      bgMusic.play().catch(err => console.log("Play blocked:", err));
    }
  });

  // --- Close modal ---
  closeBtn.onclick = () => {
    modal.classList.remove("visible");
    if (currentPage === pages.length - 1) showFinalButton();
  };

  window.onclick = e => { if (e.target === modal) modal.classList.remove("visible"); };

  // --- Page navigation ---
  function updatePages() {
    pages.forEach((page, i) => {
      page.classList.toggle("active", i === currentPage);
      page.scrollTop = 0;
    });
    prevBtn.style.display = currentPage === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentPage === pages.length - 1 ? "none" : "inline-block";
  }

  prevBtn.onclick = () => { if (currentPage > 0) { currentPage--; updatePages(); } };
  nextBtn.onclick = () => { if (currentPage < pages.length - 1) { currentPage++; updatePages(); } };

  // --- Intro fadeout ---
  if (intro) {
    setTimeout(() => {
      intro.style.transition = "opacity 1.5s ease, transform 1.5s ease";
      intro.style.opacity = 0;
      intro.style.transform = "scale(1.05)";
      setTimeout(() => intro.remove(), 1500);
    }, 3000);
  }

  // -------------------- Floating Coquette Emoji Wallpaper --------------------
  const canvas = document.getElementById("emojiCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojis = ["💖","🌸","🌷","✨","💞"];
    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 24 + Math.random() * 12;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.twinkle = Math.random();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angleSpeed;
        this.twinkle += 0.02;
        if(this.twinkle > 1) this.twinkle = 0;
        this.opacity = 0.7 + Math.sin(this.twinkle * Math.PI) * 0.3;
        if(this.x > canvas.width) this.x = 0;
        if(this.x < 0) this.x = canvas.width;
        if(this.y > canvas.height) this.y = 0;
        if(this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // -------------------- Final Landing Button --------------------
  function showFinalButton() {
    const centerWrapper = document.querySelector(".center-wrapper");
    if (!centerWrapper) return;

    const oldBtn = document.getElementById("openModalBtn");
    if (oldBtn) oldBtn.remove();

    const finalBtn = document.createElement("button");
    finalBtn.id = "finalBtn";
    finalBtn.innerText = "🌸 See the flowers 🌸";
    finalBtn.style.background = "linear-gradient(135deg,#ffb6d5,#ffcce6)";
    finalBtn.style.border = "2px solid #ff8fc7";
    finalBtn.style.borderRadius = "30px";
    finalBtn.style.fontSize = "20px";
    finalBtn.style.padding = "14px 36px";
    finalBtn.style.color = "#fff";
    finalBtn.style.cursor = "pointer";
    finalBtn.style.fontFamily = "Georgia, serif";
    finalBtn.style.transition = "all 0.4s ease, box-shadow 0.6s ease";
    finalBtn.onmouseover = () => finalBtn.style.boxShadow = "0 0 25px #ff8fc7, 0 0 50px #ffb6d5";
    finalBtn.onmouseout = () => finalBtn.style.boxShadow = "0 6px 15px rgba(255,143,199,0.4)";

    centerWrapper.appendChild(finalBtn);

    finalBtn.onclick = () => showFinalPage();
  }

  // -------------------- Final Page with Flowers, Text, and Home --------------------
  function showFinalPage() {
    const centerWrapper = document.querySelector(".center-wrapper");
    if (!centerWrapper) return;

    centerWrapper.innerHTML = "";

    const flowerContainer = document.createElement("div");
    flowerContainer.id = "flowerContainer";
    flowerContainer.style.display = "flex";
    flowerContainer.style.flexDirection = "column";
    flowerContainer.style.justifyContent = "flex-start";
    flowerContainer.style.alignItems = "center";
    flowerContainer.style.width = "100%";
    flowerContainer.style.position = "relative";
    flowerContainer.style.overflowY = "auto";
    flowerContainer.style.maxHeight = "100vh";
    flowerContainer.style.scrollBehavior = "smooth";
    flowerContainer.style.padding = "20px 0";

    const flowerImg = document.createElement("img");
    flowerImg.src = "flowers.png";
    flowerImg.style.maxWidth = "90%";
    flowerImg.style.maxHeight = "60vh";
    flowerImg.style.height = "auto";
    flowerImg.style.borderRadius = "20px";
    flowerImg.style.boxShadow = "0 10px 30px rgba(255,143,199,0.4)";
    flowerImg.style.transition = "transform 0.5s ease";
    flowerImg.onmouseover = () => flowerImg.style.transform = "scale(1.05)";
    flowerImg.onmouseout = () => flowerImg.style.transform = "scale(1)";
    flowerContainer.appendChild(flowerImg);

    const flowerText = document.createElement("div");
    flowerText.id = "flowerText";
    flowerText.innerHTML = `
      To my Dearest Mariel,<br>
      I know its only digital, but i hope this brings a smile to your face. I love you, Mariel. Always and forever.<br>
      Yours truly,<br>
      Rain. ♡
    `;
    flowerText.style.fontFamily = '"Parisienne", cursive';
    flowerText.style.fontSize = "26px";
    flowerText.style.lineHeight = "1.9";
    flowerText.style.color = "#b0306f";
    flowerText.style.textAlign = "center";
    flowerText.style.maxWidth = "600px";
    flowerText.style.margin = "20px 16px 40px 16px";
    flowerContainer.appendChild(flowerText);

    const homeBtn = document.createElement("button");
    homeBtn.innerText = "🏠 Home";
    homeBtn.style.background = "linear-gradient(135deg,#ffb6d5,#ffcce6)";
    homeBtn.style.border = "2px solid #ff8fc7";
    homeBtn.style.borderRadius = "30px";
    homeBtn.style.fontSize = "18px";
    homeBtn.style.padding = "12px 30px";
    homeBtn.style.color = "#fff";
    homeBtn.style.cursor = "pointer";
    homeBtn.style.fontFamily = "Georgia, serif";
    homeBtn.style.transition = "all 0.4s ease, box-shadow 0.6s ease";
    homeBtn.style.marginBottom = "40px";
    homeBtn.onmouseover = () => homeBtn.style.boxShadow = "0 0 25px #ff8fc7, 0 0 50px #ffb6d5";
    homeBtn.onmouseout = () => homeBtn.style.boxShadow = "0 6px 15px rgba(255,143,199,0.4)";
    homeBtn.onclick = () => resetLanding(true);

    flowerContainer.appendChild(homeBtn);
    centerWrapper.appendChild(flowerContainer);

    flowerContainer.scrollTop = 0;
  }

  // -------------------- Reset Landing --------------------
  function resetLanding(smooth = false) {
    const centerWrapper = document.querySelector(".center-wrapper");
    if (!centerWrapper) return;

    if(smooth){
      centerWrapper.style.transition = "opacity 0.5s ease";
      centerWrapper.style.opacity = "0";
      setTimeout(() => {
        centerWrapper.innerHTML = `
          <h1>Hi Mariel!</h1>
          <button id="openModalBtn">Click me ♡</button>
        `;
        centerWrapper.style.opacity = "1";
        attachModalListener();
      }, 500);
    } else {
      centerWrapper.innerHTML = `
        <h1>Hi Mariel!</h1>
        <button id="openModalBtn">Click me ♡</button>
      `;
      attachModalListener();
    }
  }

  // -------------------- Reattach modal listener --------------------
  function attachModalListener() {
    const newOpenBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("modal"); // fixed scoping
    newOpenBtn?.addEventListener("click", () => {
      modal.classList.add("visible");
      currentPage = 0;
      updatePages();
      if (bgMusic && bgMusic.paused) {
        bgMusic.volume = 1.0;
        bgMusic.loop = true;
        bgMusic.play().catch(err => console.log("Play blocked:", err));
      }
    });
  }
});