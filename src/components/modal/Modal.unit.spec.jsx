import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import { expect } from "chai";
import { axeCheck } from "../../helpers/test-helpers";

import Modal from "./Modal.jsx";

describe("<Modal/>", () => {
  it("should render", () => {
    const tree = mount(
      <Modal id="modal" title="Modal title" visible onClose={() => {}}>
        Modal contents
      </Modal>
    );
    expect(tree.text()).to.contain("Modal contents");
    tree.unmount();
  });

  it("should setup event listeners and tear them down", () => {
    sinon.spy(global.document, "addEventListener");
    sinon.spy(global.document, "removeEventListener");

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
      </Modal>
    );

    expect(global.document.addEventListener.callCount).to.be.equal(
      totalListeners
    );

    tree.unmount();
    expect(global.document.removeEventListener.callCount).to.be.equal(
      totalListeners
    );

    global.document.addEventListener.restore();
    global.document.removeEventListener.restore();
  });

  it("should pass aXe check", () => {
    return axeCheck(
      <Modal id="modal" title="Modal title" visible onClose={() => {}} />
    );
  });
});
