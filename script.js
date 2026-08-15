// File containing all scripts required for page functionality. Might split the script into multiple modules later.

// List of scripts used
// --------------------
// (0) Global variables used in multiple scripts
// (1) Script to handle the text content, attributes, tags, and colors of project image placeholders
// (2) Script to handle sort method button functionality
// (3) Script to handle highlighting the project card for the latest project

// (0) Global variables used in multiple scripts

const projectCardsContainer = document.querySelector('#my-work > .section-body');
const projectCards = Array.from(projectCardsContainer.querySelectorAll('.project-card'));

// (1) Script to handle the text content, attributes, tags, and colors of project image placeholders

// The following colors have been picked from the three design files
const projectImagePlaceholderColors = [ 
  '#9e1c1c',
  '#7c75ca',
  '#5e8f4d',
  '#c363b4',
  '#d88f39',
  '#4ba2d2',
  '#ca7599',
  '#4692d9',
]

const inProgressProjectImagePlaceholderText = [
  'Coming soon',
  'Stay tuned',
]

let unusedColors = [...projectImagePlaceholderColors];
let lastUsedColorName = null;

const randomProjectImagePlaceholderColor = () => {
  const randomColorIndex = Math.floor(Math.random() * unusedColors.length);
  const randomColor = unusedColors[randomColorIndex];

  return Object.freeze({ colorName: randomColor, colorIndex: randomColorIndex });
}

const createProjectCardTag = (textContent = ``, classList = [], attributes = {}) => {
  const tag = document.createElement('span');
  tag.textContent = textContent;

  tag.classList.add(...classList);

  for (const [attributeName, attributeValue] of Object.entries(attributes))
    tag.setAttribute(attributeName, attributeValue);

  return tag;
}

const appendProjectCardTag = (projectCard, projectTag) => {
  projectCard.appendChild(projectTag.cloneNode(true));
}

const inProgressTag = createProjectCardTag(
  'In progress',
  [ 'top-left-tag' ],
  { 'aria-label': 'This project is still in progress.' }
);

const latestTag = createProjectCardTag(
  'Latest',
  [ 'top-left-tag' ],
  { 'id': 'latest-project-tag', 'aria-label': 'This is my latest project.' }
);

let wasLatestProjectFound = false;

const randomInProgressProjectImagePlaceholderText = () => {
  const randomTextIndex = Math.floor(Math.random() * inProgressProjectImagePlaceholderText.length);

  return inProgressProjectImagePlaceholderText[randomTextIndex];
}

projectCards.forEach(card => {
  const projectImagePlaceholder = card.querySelector('.project-image-container');

  const isProjectTagged = 'tag' in card.dataset;

  let [isProjectInProgress, isProjectLatest] = [false, false];

  if (isProjectTagged) {
    isProjectInProgress = (card.dataset.tag === 'in-progress');
    isProjectLatest = wasLatestProjectFound ? false : (card.dataset.tag === 'latest');

    if (isProjectLatest)
      wasLatestProjectFound = true;
  }

  if (projectImagePlaceholder.children.length === 0) {
      projectImagePlaceholder.innerHTML =
      `
      <span class="project-image-placeholder-text">
          ${isProjectInProgress ? randomInProgressProjectImagePlaceholderText() : `Screenshot of project`}
      </span>
      `

      // Announce the non-presence of a screenshot to prevent confusion when an alternative text is expected and not announced.
      projectImagePlaceholder.setAttribute('aria-label', "No screenshot currently present");
  }

  if (isProjectTagged) {
    const projectCardHeader = card.querySelector('.project-title-and-links');

    if (isProjectInProgress)
      appendProjectCardTag(card, inProgressTag);
    else if (isProjectLatest) {
      appendProjectCardTag(card, latestTag);
      card.setAttribute('id', 'latest-project');
    }
  }

  let usedColor = null;

  // Applies a random color from the color pool that has not been applied before, or applies a random color from the color pool if all have been used before, not allowing the use of the same color two or more times in a row.
  do {
      if (unusedColors.length === 0)
          unusedColors = [...projectImagePlaceholderColors];

      usedColor = randomProjectImagePlaceholderColor();
  } while (usedColor.colorName === lastUsedColorName);

  unusedColors.splice(usedColor.colorIndex, 1)

  projectImagePlaceholder.style.backgroundColor = usedColor.colorName;
  lastUsedColorName = usedColor.colorName;
});

// (2) Script to handle sort method button functionality

const sortMethodButton = document.querySelector('#sort-button');
const sortMethod = document.querySelector('#sort-method');

const changeSortMethodButtonCaption = () => {
  const sortMethodButtonCaptionWords = sortMethodButton.textContent.split(" ");
  const lastWordIndex = sortMethodButtonCaptionWords.length - 1;

  let lastWord = sortMethodButtonCaptionWords.at(-1);
  lastWord = (lastWord === "earliest") ? "latest" : "earliest";
  sortMethod.textContent = (lastWord === "earliest") ? "latest" : "earliest";

  sortMethodButtonCaptionWords[lastWordIndex] = lastWord;

  sortMethodButton.textContent = sortMethodButtonCaptionWords.join(" ");
}

sortMethodButton.addEventListener('click', () => {
  projectCards.reverse();

  projectCardsContainer.replaceChildren(...projectCards);

  changeSortMethodButtonCaption();
});

// (3) Script to handle highlighting the project card for the latest project

const isElementInView = (element) => {
  const elementRectangle = element.getBoundingClientRect();

  return (elementRectangle.top >= 0);
}

const showProjectCardFrame = (projectCard) => {
  projectCard.style.setProperty('--highlight-text-opacity', '1');
  projectCard.style.setProperty('--highlight-border-opacity', '1');

  projectCard.style.setProperty('--highlight-transition-timing-function', 'ease-in');
}

const showProjectCardFrameHandler = () => {
  const latestProjectCard = document.querySelector('#latest-project');
  const isLatestProjectCardInView = isElementInView(latestProjectCard);

  if (isLatestProjectCardInView) {
      showProjectCardFrame(latestProjectCard);

      // Prevent the highlight from occurring more than once per page load.
      window.removeEventListener('scroll', showProjectCardFrameHandler);

      window.setTimeout(() => latestProjectCard.style.setProperty('--highlight-border-opacity', '0'), 1000);
  }
}

window.addEventListener('scroll', showProjectCardFrameHandler);
