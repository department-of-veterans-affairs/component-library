import './App.css';
import { 
  VaButton, 
  VaAlert, 
  VaHeaderMinimal, 
  VaMinimalFooter, 
  VaLink,
  VaBreadcrumbs 
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const App = () => {
  return (
    <div className="App">
      <div className="vads-u-background-color--primary-darker">
        <VaHeaderMinimal
          header="Authorization To Disclose Personal Information To A Third Party"
        />
      </div>
      <div>
        <main className="vads-u-padding-bottom--3">
        <div className="vads-grid-container vads-u-padding--0">
          <div className="vads-grid-row">
            <div className="vads-grid-col-12">
              <VaBreadcrumbs
                breadcrumbList={[
                  {
                    href: '#one',
                    label: 'VA.gov home'
                  },
                  {
                    href: '#two',
                    label: 'Level two'
                  },
                  {
                    href: '#three',
                    label: 'Level three'
                  }
                ]}
                label="Breadcrumb"
              />
            </div>

            <div className="vads-grid-col-12 desktop-lg:vads-grid-col-4 vads-u-padding-right--2">
              <h2 className="vads-u-margin-bottom--6 vads-u-margin-top--0">About</h2>
              <p>This is an example of using the VA Design System component library with React, Vite, and TypeScript.</p>
            </div>

            <div className="vads-grid-col-12 desktop-lg:vads-grid-col-8">

            <h1 className="vads-u-margin-bottom--6 vads-u-margin-top--0">VA Component Library Examples</h1>

                <div className="vads-grid-container vads-u-padding--0">
                  <div className="vads-grid-row">
                    <div className="vads-grid-col site-grid-example">
                      <VaButton text="Default" />
                    </div>
                    <div className="vads-grid-col site-grid-example">
                      <VaButton text="Primary" primary-alternate />
                    </div>
                    <div className="vads-grid-col site-grid-example">
                      <VaButton text="Secondary" secondary />
                    </div>
                    <div className="vads-grid-col site-grid-example">
                      <VaButton text="Continue" continue />
                    </div>
                  </div>
                </div>

              <div className="va-h-ruled--stars vads-u-margin-bottom--3" />
              
              <VaAlert
                status="info"
                visible
              >
                <h2
                  id="track-your-status-on-mobile"
                  slot="headline"
                >
                  Track your claim or appeal on your mobile device
                </h2>
                <p className="vads-u-margin-y--0">
                  Lorem ipsum dolor sit amet{' '}
                  <VaLink
                    href="javascript:void(0);"
                    text="consectetur adipiscing"
                  />
                  {' '}elit sed do eiusmod.
              </p>
              </VaAlert>
              <br />
              <VaAlert
                close-btn-aria-label="Close notification"
                status="success"
                visible
              >
                <h2 slot="headline">
                  Thank you for accepting the Terms and Conditions for using VA.gov health tools
                </h2>
                <p className="vads-u-margin-y--0">
                  You can now access health tools on VA.gov.
                </p>
              </VaAlert>
              <br />
              <VaAlert
                close-btn-aria-label="Close notification"
                status="error"
                visible
              >
                <h2 slot="headline">
                Sorry, we couldn't find any eligible issues
                </h2>
                <p className="vads-u-margin-y--0">
                  If you’d like to add an issue for review, select "Add a new issue" to get started.
                </p>
              </VaAlert>
            </div>
          </div>
        </div>
        </main>
        <VaMinimalFooter />
      </div>
    </div>
  );
};

export default App;