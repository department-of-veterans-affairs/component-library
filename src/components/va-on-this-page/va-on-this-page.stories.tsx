import { html } from 'lit-html';

export default {
  title: 'Components/OnThisPage',
  component: 'va-on-this-page',
};

const Template = () => html`
  <article>
    <va-on-this-page></va-on-this-page>
    <h2 id="if-im-a-veteran">
      If I’m a Veteran, can I get VR&amp;E benefits and services?
    </h2>
    <p>
      You may be eligible for VR&amp;E benefits and services if you’re a
      Veteran, and you meet all of the requirements listed below.
    </p>
    <p><strong>All of these must be true. You:</strong></p>
    <ul>
      <li>Didn’t receive a dishonorable discharge, <strong>and</strong></li>
      <li>
        Have a service-connected disability rating of at least 10% from VA,
        <strong>and</strong>
      </li>
      <li><a href="#">Apply for VR&amp;E services</a></li>
    </ul>
    <h2 id="telephone-contacts">Telephone Contacts</h2>
    <p>Here is a table of phone numbers</p>
    <h2 id="some-additional-info">Some additional information</h2>
    <p>
      Don't forget about me! I'm here even though I'm at the bottom of the page
    </p>
  </article>
`;

export const Default = Template.bind({});
