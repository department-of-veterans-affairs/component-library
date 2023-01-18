import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, StoryDocs } from './wc-helpers';

const otpDocs = getWebComponentDocs('va-on-this-page');

export default {
  title: 'Components/On this page',
  id: 'components/va-on-this-page',
  parameters: {
    componentSubtitle: 'va-on-this-page web component',
    docs: {
      page: () => <StoryDocs data={otpDocs} />,
    },
  },
};

const articleJSX = (
  <article>
    <va-on-this-page></va-on-this-page>
    <h2 id="if-im-a-veteran">
      If I’m a Veteran, can I get VR&amp;E benefits and services?
    </h2>
    <p>
      You may be eligible for VR&amp;E benefits and services if you’re a
      Veteran, and you meet all of the requirements listed below.
    </p>
    <p>
      <strong>All of these must be true. You:</strong>
    </p>
    <ul>
      <li>
        Didn’t receive a dishonorable discharge, <strong>and</strong>
      </li>
      <li>
        Have a service-connected disability rating of at least 10% from VA,
        <strong>and</strong>
      </li>
      <li>
        <a href="#">Apply for VR&amp;E services</a>
      </li>
    </ul>
    <h2 id="telephone-contacts">Telephone Contacts</h2>
    <p>Here is a table of phone numbers</p>
    <h2 id="some-additional-info">Some additional information</h2>
    <p>Placeholder for additional content.</p>
    <ol>
      <li>Alpha</li>
      <li>Beta</li>
      <li>Gamma</li>
    </ol>
  </article>
);

const Template = () => {
  return articleJSX;
};

const I18nTemplate = args => {
  const { headline, level, ...rest } = args;
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main')?.setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>

      {articleJSX}
    </div>
  );
};

export const Default = Template.bind(null);

export const Internationalization = I18nTemplate.bind(null);
