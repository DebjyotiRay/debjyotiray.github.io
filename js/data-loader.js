/**
 * Data Loader Module
 * Handles fetching and caching of all JSON data files
 */

const cache = {};

/**
 * Generic fetch function with caching
 */
async function fetchData(url) {
    if (cache[url]) {
        return cache[url];
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const data = await response.json();
        cache[url] = data;
        return data;
    } catch (error) {
        console.error(`Error loading data from ${url}:`, error);
        return null;
    }
}

/**
 * Load education data
 */
export async function loadEducation() {
    return fetchData('data/education.json');
}

/**
 * Load experience data
 */
export async function loadExperience() {
    return fetchData('data/experience.json');
}

/**
 * Load publications data
 */
export async function loadPublications() {
    return fetchData('data/publications.json');
}

/**
 * Load open source contributions data
 */
export async function loadOpenSource() {
    return fetchData('data/opensource.json');
}

/**
 * Load projects data
 */
export async function loadProjects() {
    return fetchData('data/projects.json');
}

/**
 * Load achievements data
 */
export async function loadAchievements() {
    return fetchData('data/achievements.json');
}

/**
 * Load all data at once
 */
export async function loadAllData() {
    const [education, experience, publications, opensource, projects, achievements] = await Promise.all([
        loadEducation(),
        loadExperience(),
        loadPublications(),
        loadOpenSource(),
        loadProjects(),
        loadAchievements()
    ]);

    return {
        education,
        experience,
        publications,
        opensource,
        projects,
        achievements
    };
}
