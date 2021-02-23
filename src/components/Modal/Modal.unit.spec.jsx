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

  it('should setup event listeners and tear them down', () => {
    sinon.spy(global.document, 'addEventListener');
    sinon.spy(global.document, 'removeEventListener');

    const totalListeners = 3;
    const tree = mount(
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

    expect(global.document.addEventListener.callCount).to.be.equal(
      totalListeners,
    );

    tree.unmount();
    expect(global.document.removeEventListener.callCount).to.be.equal(
      totalListeners,
    );

    global.document.addEventListener.restore();
    global.document.removeEventListener.restore();
  });

  it('should pass aXe check', () => {
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

    it('should start on the first focusable element by default', () => {
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
  });

  describe('analytics event', function () {
    it('should be triggered when modal is visible', () => {
      const handleAnalyticsEvent = e => {
        expect(e.detail).to.eql({
          componentName: 'Modal',
          action: 'show',
          details: {
            status: undefined,
            title: undefined,
            primaryButtonText: undefined,
            secondaryButtonText: undefined,
          },
        });
      };

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = mount(
        <Modal id="modal" visible={true} clickToClose onClose={() => {}}>
          Modal contents
        </Modal>,
      );

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });

    it('should include title when present', () => {
      const handleAnalyticsEvent = e => {
        expect(e.detail).to.eql({
          componentName: 'Modal',
          action: 'show',
          details: {
            status: undefined,
            title: 'My modal title',
            primaryButtonText: undefined,
            secondaryButtonText: undefined,
          },
        });
      };

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

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });
  });
});
