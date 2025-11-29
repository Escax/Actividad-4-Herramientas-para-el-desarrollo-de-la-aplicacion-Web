  document.addEventListener('DOMContentLoaded', () => {
      const toggler = document.getElementById('navToggler');
      const mobileMenu = document.getElementById('mobileMenu');
      const navLinks = document.querySelectorAll('[data-scroll-to]');

      function setMenuOpen(open) {
        mobileMenu.classList.toggle('open', open);
        toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.body.style.overflow = open ? 'hidden' : '';
      }

      toggler?.addEventListener('click', () => setMenuOpen(!mobileMenu.classList.contains('open')));

      // smooth scroll
      navLinks.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-scroll-to');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
      }));

      // close on escape / outside click
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenuOpen(false); });
      document.addEventListener('click', (e) => { if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !toggler.contains(e.target)) setMenuOpen(false); });

      // intersection observer to highlight active link
      const sections = document.querySelectorAll('#inicio,#servicios,#horarios,#contacto');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = document.querySelector('[data-scroll-to="'+id+'"]');
          if (!link) return;
          if (entry.isIntersecting) {
            document.querySelectorAll('[data-scroll-to]').forEach(el => el.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 });

      sections.forEach(s => obs.observe(s));
    sections.forEach(s => obs.observe(s));
  });
