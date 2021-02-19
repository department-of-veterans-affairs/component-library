import { AxePuppeteer } from '@axe-core/puppeteer';

const ignoredDefaults = ['document-title', 'html-has-lang'];

export async function axeCheck(page: any, additionalIgnored: string[] = []) {
  const ignoredRules = [...ignoredDefaults, ...additionalIgnored];
  const results = await new AxePuppeteer(page).disableRules(ignoredRules).analyze();

  const appropriateSeverity = results.violations.filter(violation => ['serious', 'critical'].includes(violation.impact));

  expect(appropriateSeverity).toEqual([]);
}
