/**
 * Component Rendering Module
 * Reusable functions to render different types of cards and sections
 */

import { sanitizeId, createHoverEffect, createLinks } from './utils.js';

/**
 * Render education card
 */
export function renderEducationCard(edu) {
  return `
    <tr>
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${edu.image}" width="160">
      </td>
      <td style="padding:8px;width:80%;vertical-align:middle">
        <span class="papertitle">${edu.degree}</span>
        <br>
        <a href="${edu.institutionUrl}">${edu.institution}</a>
        <br>
        ${edu.dates}
        <br>
        GPA: ${edu.gpa}
      </td>
    </tr>
  `;
}

/**
 * Render experience card with hover effect
 */
export function renderExperienceCard(exp) {
  const id = exp.id || sanitizeId(exp.company);

  return `
    <tr onmouseout="${id}_stop()" onmouseover="${id}_start()">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <div class="one">
          <div class="two" id='${id}_image'>
            <img src='${exp.image}' width="160">
          </div>
          <img src='${exp.image}' width="160">
        </div>
        ${createHoverEffect(id)}
      </td>
      <td style="padding:8px;width:80%;vertical-align:middle">
        <span class="papertitle">${exp.role}</span>
        <br>
        <a href="${exp.companyUrl}">${exp.company}</a> | ${exp.location}
        <br>
        ${exp.dates}
        <br>
        ${exp.additionalInfo ? exp.additionalInfo + '<br>' : ''}
        <p>
          ${exp.bullets.map(bullet => `• ${bullet}<br>`).join('\n          ')}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render publication card
 */
export function renderPublicationCard(pub) {
  const bgColor = pub.highlighted ? '#fcfcf2' : '#ffffff';
  const titleHtml = pub.url
    ? `<a href="${pub.url}"><span class="papertitle">${pub.title}</span></a>`
    : `<span class="papertitle">${pub.title}</span>`;

  return `
    <tr style="background-color: ${bgColor}; border-radius: 10px;">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${pub.image}" width="160">
      </td>
      <td style="padding:16px;width:80%;vertical-align:middle">
        ${titleHtml}
        <br>
        ${pub.authors}
        <br>
        ${pub.venue}
        <br>
        ${pub.links ? createLinks(pub.links) : ''}
        <br><br>
        <p>
          ${pub.description}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render current research card
 */
export function renderCurrentResearchCard(research) {
  return `
    <tr style="background-color: #fcfcf2; border-radius: 10px;">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${research.image}" width="160">
      </td>
      <td style="padding:16px;width:80%;vertical-align:middle">
        <span class="papertitle">${research.title}</span>
        <br>
        ${research.location} | ${research.dates}
        <br><br>
        <p>
          ${research.bullets.map(bullet => `• ${bullet}<br>`).join('\n          ')}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render open source contribution card
 */
export function renderOpenSourceCard(os) {
  const bgColor = os.highlighted ? '#ffffd0' : '#fcfcf2';

  let contentHtml = '';

  if (os.keyContributions) {
    // Detailed format for highlighted projects
    contentHtml = `
      <a href="${os.projectUrl}">
        <span class="papertitle">${os.project}</span>
      </a>
      <br>
      ${os.role} | ${os.dates}
      <br><br>
      <p>
        ${os.description}
        <br><br>
        <strong>Key Contributions:</strong>
        <br>
        ${os.keyContributions.map(contrib => `• ${contrib}<br>`).join('\n        ')}
        <br>
        ${os.footer ? os.footer + '<br>' : ''}
        ${os.links ? createLinks(os.links) : ''}
      </p>
    `;
  } else {
    // Simple format for regular contributions
    contentHtml = `
      <a href="${os.projectUrl}">
        <span class="papertitle">${os.project}</span>
      </a>
      <br><br>
      <p>
        ${os.description}
        <br>
        ${os.bullets.map(bullet => `• ${bullet}<br>`).join('\n        ')}
        ${os.links ? createLinks(os.links) : ''}
      </p>
    `;
  }

  return `
    <tr style="background-color: ${bgColor}; border-radius: 10px;">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${os.image}" width="160">
      </td>
      <td style="padding:16px;width:80%;vertical-align:middle">
        ${contentHtml}
      </td>
    </tr>
  `;
}

/**
 * Render project card with hover effect
 */
export function renderProjectCard(project) {
  const id = project.id || sanitizeId(project.title);
  const bgColor = project.highlighted ? '#ffffd0' : '#ffffff';

  return `
    <tr onmouseout="${id}_stop()" onmouseover="${id}_start()" ${project.highlighted ? 'bgcolor="#ffffd0"' : ''}>
      <td style="padding:16px;width:20%;vertical-align:middle">
        <div class="one">
          <div class="two" id='${id}_image'>
            <img src='${project.image}' width="160">
          </div>
          <img src='${project.image}' width="160">
        </div>
        ${createHoverEffect(id)}
      </td>
      <td style="padding:8px;width:80%;vertical-align:middle">
        ${project.url ? `<a href="${project.url}">` : ''}
          <span class="papertitle">${project.title}</span>
        ${project.url ? '</a>' : ''}
        <br>
        ${project.rank ? `<strong>${project.rank}</strong><br>` : ''}
        ${project.subtitle ? `${project.subtitle}<br>` : ''}
        ${project.date}
        <br>
        <p>
          ${project.bullets.map(bullet => `• ${bullet}<br>`).join('\n          ')}
          ${project.links ? createLinks(project.links) : ''}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render hackathon card
 */
export function renderHackathonCard(hackathon) {
  return `
    <tr style="background-color: #fcfcf2; border-radius: 10px;">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${hackathon.image}" width="160">
      </td>
      <td style="padding:16px;width:80%;vertical-align:middle">
        ${hackathon.url ? `<a href="${hackathon.url}">` : ''}
          <span class="papertitle">${hackathon.title}</span>
        ${hackathon.url ? '</a>' : ''}
        <br>
        ${hackathon.subtitle}
        <br><br>
        <p>
          ${hackathon.bullets.map(bullet => `• ${bullet}<br>`).join('\n          ')}
          ${hackathon.links ? createLinks(hackathon.links) : ''}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render research summit card
 */
export function renderResearchSummitCard(summit) {
  return `
    <tr style="background-color: #fcfcf2; border-radius: 10px;">
      <td style="padding:16px;width:20%;vertical-align:middle">
        <img src="${summit.image}" width="160">
      </td>
      <td style="padding:16px;width:80%;vertical-align:middle">
        <span class="papertitle">${summit.title}</span>
        <br>
        ${summit.subtitle}
        <br>
        ${summit.links ? createLinks(summit.links) : ''}
        <br><br>
        <p>
          ${summit.bullets.map(bullet => `• ${bullet}<br>`).join('\n          ')}
        </p>
      </td>
    </tr>
  `;
}

/**
 * Render section header
 */
export function renderSectionHeader(title, description = '') {
  return `
    <table style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
      <tbody>
        <tr>
          <td style="padding:16px;width:100%;vertical-align:middle">
            <h2>${title}</h2>
            ${description ? `<p>${description}</p>` : ''}
          </td>
        </tr>
      </tbody>
    </table>
  `;
}
