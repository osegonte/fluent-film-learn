// Google Analytics 4 Setup
// Add this to your frontend index.html

/*
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
*/

// Track custom events in your React components
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
};

// Example usage:
// trackEvent('lesson_completed', {
//   lesson_id: 'lesson-123',
//   movie_title: 'Finding Nemo',
//   score: 85
// });
