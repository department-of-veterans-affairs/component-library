export default {
  title: 'Components/Sidenav',
  id: 'components/sidenav',
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none'
      }
    }
  }
};

export const Default = {
  render: () => (
    <div>
      <div>
        <button
          type="button"
          className="va-btn-sidebarnav-trigger"
          aria-controls="va-detailpage-sidebar"
        >
          <span>
            <b>More in this section</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="444.819"
              height="444.819"
              viewBox="0 0 444.819 444.819"
            >
              <path
                fill="#ffffff"
                d="M352.025 196.712L165.885 10.848C159.028 3.615 150.468 0 140.185 0s-18.84 3.62-25.696 10.848l-21.7 21.416c-7.045 7.043-10.567 15.604-10.567 25.692 0 9.897 3.52 18.56 10.566 25.98L231.544 222.41 92.785 361.168c-7.04 7.043-10.563 15.604-10.563 25.693 0 9.9 3.52 18.566 10.564 25.98l21.7 21.417c7.043 7.043 15.612 10.564 25.697 10.564 10.09 0 18.656-3.52 25.697-10.564L352.025 248.39c7.046-7.423 10.57-16.084 10.57-25.98.002-10.09-3.524-18.655-10.57-25.698z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="vads-grid-container large-screen:vads-u-padding-x--0 vads-u-padding-y--2">
        <div className="vads-row vads-u-margin-x--neg2p5">
          <div className="vads-col--12 vads-u-padding-x--2p5 medium-screen:vads-col--4 large-screen:vads-col--3">
            <nav
              className="va-sidebarnav vads-u-width--full"
              id="va-detailpage-sidebar"
            >
              <div>
                <button
                  type="button"
                  aria-label="Close this menu"
                  className="va-btn-close-icon va-sidebarnav-close"
                ></button>
                <div className="left-side-nav-title">
                  <h4>Section title</h4>
                </div>
                <ul className="usa-accordion">
                  <li>
                    <button
                      className="usa-accordion-button"
                      aria-expanded="false"
                      aria-controls="a1"
                    >
                      Nav section
                    </button>
                    <div
                      id="a1"
                      className="usa-accordion-content"
                      aria-hidden="true"
                    >
                      <ul className="usa-sidenav-list">
                        <li>
                          <a href="#">Link</a>
                        </li>
                        <li>
                          <a href="#">Link</a>
                        </li>
                        <li>
                          <a href="#">Link</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      className="usa-accordion-button"
                      aria-expanded="true"
                      aria-controls="a2"
                    >
                      Second nav section
                    </button>
                    <div
                      id="a2"
                      className="usa-accordion-content"
                      aria-hidden="false"
                    >
                      <ul className="usa-sidenav-list">
                        <li>
                          <a href="#">Link</a>
                        </li>
                        <li className="active-level">
                          <a className="usa-current" href="#">
                            Current section
                          </a>
                        </li>
                        <li>
                          <a href="#">Link</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      className="usa-accordion-button"
                      aria-expanded="false"
                      aria-controls="a3"
                    >
                      Third nav section
                    </button>
                    <div
                      id="a3"
                      className="usa-accordion-content"
                      aria-hidden="true"
                    >
                      <ul className="usa-sidenav-list">
                        <li>
                          <a href="#">Link</a>
                        </li>
                        <li>
                          <a href="#">Link</a>
                        </li>
                        <li>
                          <a href="#">Link</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--8 large-screen:vads-l-col--9">
            <div style={{ opacity: 0.5 }}>
              <h1 className="vads-u-margin-top--0">Page content would appear here.</h1>
              <p className="va-introtext">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum
                mauris at laoreet dictum.
              </p>
              <p>
                Mauris ultrices pellentesque lobortis. Ut sed libero vitae orci
                maximus molestie et id justo. Donec feugiat elit sed pretium
                condimentum. Sed in cursus dui, eget sodales nisl. In hac
                habitasse platea dictumst. Fusce eu lacus in purus sodales
                ullamcorper scelerisque in massa. Duis venenatis, orci nec lacinia
                dictum, nisl eros lobortis sapien, vel pharetra nisi nulla quis
                tortor.{' '}
              </p>
              <p>
                Mauris ultrices pellentesque lobortis. Ut sed libero vitae orci
                maximus molestie et id justo. Donec feugiat elit sed pretium
                condimentum. Sed in cursus dui, eget sodales nisl. In hac
                habitasse platea dictumst. Fusce eu lacus in purus sodales
                ullamcorper scelerisque in massa. Duis venenatis, orci nec lacinia
                dictum, nisl eros lobortis sapien, vel pharetra nisi nulla quis
                tortor.{' '}
              </p>
              <p>
                Mauris ultrices pellentesque lobortis. Ut sed libero vitae orci
                maximus molestie et id justo. Donec feugiat elit sed pretium
                condimentum. Sed in cursus dui, eget sodales nisl. In hac
                habitasse platea dictumst. Fusce eu lacus in purus sodales
                ullamcorper scelerisque in massa. Duis venenatis, orci nec lacinia
                dictum, nisl eros lobortis sapien, vel pharetra nisi nulla quis
                tortor.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  name: 'Default',
};
