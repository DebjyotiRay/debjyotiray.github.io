/**
 * Utility Functions
 */

/**
 * Create a safe ID from a string
 */
export function sanitizeId(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

/**
 * Generate hover effect JavaScript for image transitions
 */
export function createHoverEffect(id) {
    return `
    <script type="text/javascript">
      function ${id}_start() {
        document.getElementById('${id}_image').style.opacity = "1";
      }
      function ${id}_stop() {
        document.getElementById('${id}_image').style.opacity = "0";
      }
      ${id}_stop()
    </script>
  `;
}

/**
 * Escape HTML to prevent XSS (for user-generated content)
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Create a link element
 */
export function createLink(link) {
    return `<a href="${link.url}">${link.text}</a>`;
}

/**
 * Create multiple links separated by slashes
 */
export function createLinks(links) {
    return links.map(createLink).join(' / ');
}
