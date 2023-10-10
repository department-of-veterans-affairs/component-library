import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';

import Modal from './Modal.jsx';

describe('<Modal/>', () => {
  it('should render', () => {
    const tree = mount(
      <Modal id="modal" title="Modal title" visible onClose={() => {}}>
        Modal contents
      </Modal>,
    );
    expect(tree.text()).to.contain('Modal contents');
    tree.unmount();
  });

  it('should have an <h1> as the heading', () => {
    const tree = mount(
      <Modal title="Modal title" visible onClose={() => {}}>
        Some content
      </Modal>,
    );

    expect(tree.find('h1').text()).to.equal('Modal title');
    tree.unmount();
  });

  describe('event listeners', () => {
    const checkForListener = (callsArray, listenerName) => {
      return callsArray.filter(call => {
        return call.firstArg === listenerName;
      });
    };

    let tree;
    before(() => {
      sinon.spy(global.document, 'addEventListener');
      sinon.spy(global.document, 'removeEventListener');
    });

    after(() => {
      global.document.addEventListener.restore();
      global.document.removeEventListener.restore();
    });

    it('should set up a keydown and a click listener', () => {
      tree = mount(
        <Modal
          id="modal"
          title="Modal title"
          visible
          clickToClose
          onClose={() => {}}
        >
          Modal contents
        </Modal>,
      );

      const callsArray = global.document.addEventListener.getCalls();
      expect(checkForListener(callsArray, 'keydown').length).to.be.at.least(1);
      expect(checkForListener(callsArray, 'click').length).to.be.at.least(1);
    });

    it('should tear down keydown and click listeners when the modal is closed', () => {
      tree.unmount();
      const callsArray = global.document.removeEventListener.getCalls();
      expect(checkForListener(callsArray, 'keydown').length).to.be.at.least(1);
      expect(checkForListener(callsArray, 'click').length).to.be.at.least(1);
    });
  });

  it.skip('should pass aXe check', () => {
    return axeCheck(
      <Modal id="modal" title="aXe Check" visible onClose={() => {}} />,
    );
  });

  describe('programmatic focus', () => {
    // see this issue comment for some enzyme/jsdom concerns to be aware of
    // when testing focus:
    // https://github.com/enzymejs/enzyme/issues/2337#issuecomment-609071803
    let tree;
    let root;

    before(() => {
      root = document.createElement('div');
      global.document.body.appendChild(root);
    });

    after(() => {
      tree && tree.unmount();
      global.document.body.removeChild(root);
    });

    it('should open with focus assigned to the close button', () => {
      const tree = mount(
        <Modal id="modal" title="Programmatic focus" visible onClose={() => {}}>
          <button id="first-button">First button</button>
          <button id="second-button">Second button</button>
        </Modal>,
        { attachTo: root },
      );

      expect(global.document.activeElement.className).to.equal(
        'va-modal-close',
      );
      tree.unmount();
    });

    it('should open with focus assigned to the first button when the close button is turned off', () => {
      const tree = mount(
        <Modal
          id="modal"
          title="Programmatic focus"
          visible
          hideCloseButton
          onClose={() => {}}
        >
          <button id="first-button">First button</button>
          <button id="second-button">Second button</button>
        </Modal>,
        { attachTo: root },
      );

      expect(global.document.activeElement.id).to.equal('first-button');
      tree.unmount();
    });

    it('should start on the first element matching initialFocusSelector if specified', () => {
      const tree = mount(
        <Modal
          id="modal"
          title="My modal"
          visible
          hideCloseButton
          onClose={() => {}}
          initialFocusSelector="#second-button"
        >
          <button id="first-button">First button</button>
          <button id="second-button">Second button</button>
        </Modal>,
        { attachTo: root },
      );

      expect(global.document.activeElement.id).to.equal('second-button');
      tree.unmount();
    });

    it('should include the title in the close button aria label if given', () => {
      const tree = mount(
        <Modal id="modal" title="Programmatic focus" visible onClose={() => {}}>
          <button id="first-button">First button</button>
          <button id="second-button">Second button</button>
        </Modal>,
        { attachTo: root },
      );

      expect(global.document.activeElement.ariaLabel).to.equal(
        'close Programmatic focus modal',
      );
      tree.unmount();
    });

    it('should not include the title in the close button aria label when not given', () => {
      const tree = mount(
        <Modal id="modal" visible onClose={() => {}}>
          <button id="first-button">First button</button>
          <button id="second-button">Second button</button>
        </Modal>,
        { attachTo: root },
      );

      expect(global.document.activeElement.ariaLabel).to.equal(
        'close modal',
      );
      tree.unmount();
    });
  });

  describe('analytics event', function () {
    it('should be triggered when modal is visible', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = mount(
        <Modal id="modal" visible={true} clickToClose onClose={() => {}}>
          Modal contents
        </Modal>,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'Modal',
            action: 'show',
            details: {
              status: undefined,
              title: undefined,
              primaryButtonText: undefined,
              secondaryButtonText: undefined,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });

    it('should include title when present', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = mount(
        <Modal
          id="modal"
          visible={true}
          title="My modal title"
          clickToClose
          onClose={() => {}}
        >
          Modal contents
        </Modal>,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'Modal',
            action: 'show',
            details: {
              status: undefined,
              title: 'My modal title',
              primaryButtonText: undefined,
              secondaryButtonText: undefined,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });
  });
});
