export default {
  title: 'Deprecated/Link - Action',
  id: 'components/action-link',
};

export const Primary = {
  render: () => (
    <a className="vads-c-action-link--green" href="#">
      Call to action lorem ipsum dolor sit amet this is a very long link to
      observe the wrapping behavior
    </a>
  ),
  name: 'Primary',
};

export const Secondary = {
  render: () => (
    <a className="vads-c-action-link--blue" href="#">
      Call to action
    </a>
  ),
  name: 'Secondary',
};

export const Reverse = {
  render: () => (
    <div
      className="usa-background-dark"
      style={{
        padding: '10px 0 20px',
      }}
    >
      <a className="vads-c-action-link--white" href="#">
        Call to action
      </a>
    </div>
  ),

  name: 'Reverse',
};
