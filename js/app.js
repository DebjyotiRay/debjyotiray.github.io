/**
 * Main Application Entry Point
 * Orchestrates data loading, rendering, and initialization
 */

import { loadAllData } from './data-loader.js';
import {
    renderEducationCard,
    renderExperienceCard,
    renderPublicationCard,
    renderCurrentResearchCard,
    renderOpenSourceCard,
    renderProjectCard,
    renderHackathonCard,
    renderResearchSummitCard,
    renderSectionHeader
} from './components.js';
import { initTabNavigation } from './tab-manager.js';

/**
 * Render all sections with loaded data
 */
function renderAllSections(data) {
    // Render Education
    const educationContainer = document.getElementById('education-content');
    if (educationContainer && data.education) {
        educationContainer.innerHTML = data.education.map(renderEducationCard).join('');
    }

    // Render Experience
    const experienceContainer = document.getElementById('experience-content');
    if (experienceContainer && data.experience) {
        experienceContainer.innerHTML = data.experience.map(renderExperienceCard).join('');
    }

    // Render Publications
    const publicationsContainer = document.getElementById('publications-content');
    if (publicationsContainer && data.publications) {
        publicationsContainer.innerHTML = data.publications.published.map(renderPublicationCard).join('');
    }

    // Render Current Research
    const currentResearchContainer = document.getElementById('current-research-content');
    if (currentResearchContainer && data.publications) {
        currentResearchContainer.innerHTML = data.publications.currentResearch.map(renderCurrentResearchCard).join('');
    }

    // Render Open Source
    const opensourceContainer = document.getElementById('opensource-content');
    if (opensourceContainer && data.opensource) {
        opensourceContainer.innerHTML = data.opensource.map(renderOpenSourceCard).join('');
    }

    // Render Hackathons
    const hackathonsContainer = document.getElementById('hackathons-content');
    if (hackathonsContainer && data.projects) {
        hackathonsContainer.innerHTML = data.projects.hackathons.map(renderProjectCard).join('');
    }

    // Render Research Summits
    const summitsContainer = document.getElementById('summits-content');
    if (summitsContainer && data.achievements) {
        summitsContainer.innerHTML = data.achievements.researchSummits.map(renderResearchSummitCard).join('');
    }

    // Render Exams
    const examsContainer = document.getElementById('exams-content');
    if (examsContainer && data.achievements) {
        const exams = data.achievements.exams;
        examsContainer.innerHTML = `
      <p>
        <strong>JEE MAINS 2022:</strong> ${exams.jee_mains}
        <br>
        <strong>WBJEE 2022:</strong> ${exams.wbjee}
        <br>
        <strong>JEE ADVANCED 2022:</strong> ${exams.jee_advanced}
        <br>
        <strong>KVPY SA 2021:</strong> ${exams.kvpy}
      </p>
    `;
    }
}

/**
 * Show loading state
 */
function showLoading() {
    const containers = [
        'education-content',
        'experience-content',
        'publications-content',
        'current-research-content',
        'opensource-content',
        'projects-content',
        'hackathons-content',
        'summits-content',
        'exams-content'
    ];

    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:20px;">Loading...</td></tr>';
        }
    });
}

/**
 * Show error state
 */
function showError(error) {
    console.error('Error loading data:', error);
    const containers = [
        'education-content',
        'experience-content',
        'publications-content',
        'current-research-content',
        'opensource-content',
        'projects-content',
        'hackathons-content',
        'summits-content',
        'exams-content'
    ];

    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = '<tr><td colspan="2" style="text-align:center;padding:20px;color:red;">Error loading content. Please refresh the page.</td></tr>';
        }
    });
}

/**
 * Initialize the application
 */
async function init() {
    try {
        // Show loading state
        showLoading();

        // Load all data
        const data = await loadAllData();

        // Render all sections
        renderAllSections(data);

        // Initialize tab navigation
        initTabNavigation();

        console.log('Application initialized successfully');
    } catch (error) {
        showError(error);
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
