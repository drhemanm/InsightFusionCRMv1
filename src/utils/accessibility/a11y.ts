export const a11yImprovements = {
  // Add ARIA labels
  addAriaLabels: (element: HTMLElement) => {
    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (!input.getAttribute('aria-label')) {
        input.setAttribute('aria-label', input.getAttribute('placeholder') || '');
      }
    });
  },

  // Ensure keyboard navigation
  enableKeyboardNav: (element: HTMLElement) => {
    const clickables = element.querySelectorAll('button, a, [role="button"]');
    clickables.forEach(el => {
      if (!el.getAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
    });
  },

  // Add screen reader announcements
  announce: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 3000);
  }
};