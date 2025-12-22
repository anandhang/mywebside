/**
 * Ananth Portfolio Scripts
 * Handles theme, animations, interactivity.
 */

/* --- Config --- */
const config = {
  themeStorageKey: 'ananth_portfolio_theme',
  animationDuration: 700,
  animationStagger: 80,
};

/* --- Initialize --- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initHeroAnimation();
  initCodeTabs();
  initTiltEffect();
  setCopyrightYear();
});

/* --- Theme Support --- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem(config.themeStorageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'light' || (!storedTheme && !prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(config.themeStorageKey, newTheme);
  });
}

/* --- Navigation --- */
function initNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Sticky Highlight
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isExpanded ? 'none' : 'flex';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
    });
  });
}

/* --- Hero Animation --- */
function initHeroAnimation() {
  const edges = document.querySelectorAll('.edge');
  const nodes = document.querySelectorAll('.node');

  // Fade in nodes
  nodes.forEach((node, index) => {
    setTimeout(() => {
      node.style.transition = 'opacity 0.5s ease';
      node.style.opacity = '1';
    }, index * 200 + 100);
  });

  // Draw edges
  setTimeout(() => {
    edges.forEach((edge, index) => {
      setTimeout(() => {
        edge.style.strokeDashoffset = '0';
      }, index * config.animationStagger);
    });
  }, 1000); // Start drawing after nodes appear
}

/* --- Code Tabs & Copy --- */
function initCodeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.code-panel');
  const copyBtn = document.getElementById('copy-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Switch active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Switch panel
      const target = btn.dataset.target; // 'playwright' or 'toon'
      panels.forEach(panel => {
        if (panel.id === `code-${target}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Copy functionality
  copyBtn.addEventListener('click', () => {
    const activePanel = document.querySelector('.code-panel:not(.hidden)');
    const codeText = activePanel.textContent;
    
    navigator.clipboard.writeText(codeText).then(() => {
        // Visual feedback could go here (e.g., change icon temporarily)
        const originalTitle = copyBtn.getAttribute('title');
        copyBtn.setAttribute('title', 'Copied!');
        setTimeout(() => copyBtn.setAttribute('title', originalTitle), 2000);
    });
  });
}

/* --- 3D Tilt Effect --- */
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card');

  if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on touch devices

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* --- Footer Year --- */
function setCopyrightYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
