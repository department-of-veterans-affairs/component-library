import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-omb-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-omb-info exp-date="12/31/2077"></va-omb-info>');

    const element = await page.find('va-omb-info');
    expect(element).toEqualHtml(`
      <va-omb-info class="hydrated" exp-date="12/31/2077">
        <mock:shadow-root>
          <div>
            Expiration date:
            <strong>
              12/31/2077
            </strong>
          </div>
          <div>
            <va-button class="hydrated" secondary></va-button>
          </div>
          <va-modal class="hydrated" large>
            <slot></slot>
            <div>
              <p>
                <strong>
                  Privacy Act Notice:
                </strong>
                The VA will not disclose information collected on this form to any source other than what has been authorized under the Privacy Act of 1974 or title 38, Code of Federal Regulations, section 1.576 for routine uses (e.g., the VA sends educational forms or letters with a veteran’s identifying information to the Veteran’s school or training establishment to (1) assist the veteran in the completion of claims forms or (2) for the VA to obtain further information as may be necessary from the school for VA to properly process the Veteran’s education claim or to monitor his or her progress during training) as identified in the VA system of records, 58VA21/22/28, Compensation, Pension, Education, and Vocational Rehabilitation and Employment Records - VA, and published in the Federal Register. Your obligation to respond is required to obtain or retainbenefits. Giving us your SSN account information is voluntary. Refusal to provide your SSN by itself will not result in the denial of benefits. The VA will not deny an individual benefits for refusing to provide his or her SSN unless the disclosure of the SSN is required by a Federal Statute of law enacted before January 1, 1975, and still in effect. The requested information is considered relevant and necessary to determine the maximum benefits under the law. While you do not have to respond, VA cannot process your claim for education assistance unless the information is furnished as required by existing law (38 U.S.C. 3471). The responses you submit are considered confidential (38 U.S.C. 5701). Any information provided by applicants, recipients, and others may be subject to verification through computer matching programs with other agencies.
              </p>
            </div>
          </va-modal>
        </mock:shadow-root>
      </va-omb-info>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-omb-info exp-date="12/31/2077"></va-omb-info>');

    await axeCheck(page);
  });

  it('displays respondent burden when given a value for res-burden', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-omb-info exp-date="12/31/2077" res-burden="120"></va-omb-info>',
    );
    const divElements = await page.findAll(`va-omb-info >>> div`);
    let resBurden;
    divElements.map(div => {
      if (div.innerText.includes('Respondent burden: 120 minutes'))
        resBurden = div;
    });

    expect(resBurden).toBeTruthy();
  });

  it('displays omb number when given a value for omb-number', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-omb-info exp-date="12/31/2077" res-burden="120" omb-number="12-3456"></va-omb-info>',
    );
    const divElements = await page.findAll(`va-omb-info >>> div`);
    let ombNumber;
    divElements.map(div => {
      if (div.innerText.includes('OMB Control #: 12-3456')) ombNumber = div;
    });

    expect(ombNumber).toBeTruthy();
  });
});
