/**
 * Tab Manager Module
 * Handles tab switching, URL hash management, and keyboard navigation
 */

let currentTab = 'experience';

/**
 * Switch to a specific tab
 */
export function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}-tab`);

    if (selectedButton && selectedContent) {
        selectedButton.classList.add('active');
        selectedContent.classList.add('active');
        currentTab = tabName;

        // Update URL hash
        window.location.hash = tabName;
    }
}

/**
 * Initialize tab navigation
 */
export function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // Handle keyboard navigation
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
                switchTab(tabButtons[nextIndex].dataset.tab);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[prevIndex].focus();
                switchTab(tabButtons[prevIndex].dataset.tab);
            }
        });
    });

    // Handle URL hash on page load
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`${hash}-tab`)) {
        switchTab(hash);
    } else {
        switchTab('experience'); // Default to experience tab
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(`${hash}-tab`)) {
            switchTab(hash);
        }
    });
}

/**
 * Get current active tab
 */
export function getCurrentTab() {
    return currentTab;
}
