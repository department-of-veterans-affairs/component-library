import ReactHtmlParser from 'react-html-parser';

export default {
  title: 'Components/CollapsiblePanel (deprecated)/Static markup',
};

const content = `<li>
    <button class="usa-accordion-button"
      aria-expanded="true"
      aria-controls="a1">
      First Amendment
    </button>
    <div id="a1" class="usa-accordion-content">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </div>
  </li><li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a2">
      Second Amendment
    </button>
    <div id="a2" class="usa-accordion-content">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </div>
  </li><li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a3">
      Third Amendment
    </button>
    <div id="a3" class="usa-accordion-content">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </div>
  </li><li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a4">
      Fourth Amendment
    </button>
    <div id="a4" class="usa-accordion-content">
      The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.
    </div>
  </li><li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a5">
      Fifth Amendment
    </button>
    <div id="a5" class="usa-accordion-content">
      No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.
    </div>
  </li> `;

const borderlessMarkup = `<ul class="usa-accordion">${content}</ul>`;
const borderedMarkup = `<ul class="usa-accordion-bordered">${content}</ul>`;
const multiselectMarkup = `<ul class="usa-accordion" data-multiselectable="true">${content}</ul>`;

export const Borderless = () => ReactHtmlParser(borderlessMarkup);
export const Bordered = () => ReactHtmlParser(borderedMarkup);
export const Multiselect = () => ReactHtmlParser(multiselectMarkup);
