// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  
  if (theme === 'light') {
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light';
  } else {
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Dark';
  }
}
// Toggle Experience Card Accordion
function toggleExperience(card) {
  // Close other cards
  const allCards = document.querySelectorAll('.experience-card');
  allCards.forEach(c => {
    if (c !== card && c.classList.contains('active')) {
      c.classList.remove('active');
    }
  });
  
  // Toggle current card
  card.classList.toggle('active');
}

// Cursor Glow Effect
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.opacity = '1';
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 400) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth Scroll for Navigation Links
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

// ============================================
// CONTACT FORM HANDLING - USING FORMSPREE
// ============================================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formStatus.innerHTML = '';
    formStatus.className = 'form-status';
    
    // Get form data
    const formData = new FormData(contactForm);
    
    try {
      // Send to Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        // Error from server
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      // Error
      formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again or email me directly.';
      formStatus.className = 'form-status error';
      console.error('Form error:', error);
    } finally {
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.innerHTML = '';
        formStatus.className = 'form-status';
      }, 5000);
    }
  });
}
// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();