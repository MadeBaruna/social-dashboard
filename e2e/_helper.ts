import { ClientFunction } from 'testcafe';

export const currentPageUrl = ClientFunction(() => window.location.href);
