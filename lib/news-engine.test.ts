import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialPortalState,
  verifyAdminLogin,
  registerReporter,
  approveReporter,
  updateReporterPassword,
  setReporterBlockStatus,
  publishReporterNews,
  submitPrivateAd,
  approvePrivateAd,
  filterPublicPrivateAds,
  filterPublicNews,
  incrementArticleViews,
  addLocationHierarchyNode,
  updateSiteConfig,
  updateNewsArticle,
  deleteNewsArticle,
  deletePrivateAd,
  addYoutubeUpdate,
  OFFICIAL_YOUTUBE_CHANNEL,
  OFFICIAL_BANNER_IMAGE
} from './news-engine';

test('Admin credentials strictly validate Admin / Bchakriraju1992@', () => {
  assert.equal(verifyAdminLogin('Admin', 'Bchakriraju1992@'), true);
  assert.equal(verifyAdminLogin('Admin ', 'Bchakriraju1992@'), true);
  assert.equal(verifyAdminLogin('admin', 'Bchakriraju1992@'), false);
  assert.equal(verifyAdminLogin('Admin', 'wrongpass'), false);
});

test('Reporter registration, Admin password change, and Admin block/unblock reporter work end-to-end', () => {
  const state0 = createInitialPortalState();

  const { nextState: state1, reporter } = registerReporter(state0, {
    fullName: 'Chakri Raju',
    mobile: '9988776655',
    username: 'chakri_siddipet',
    password: 'SecretPassword1!',
    state: 'Telangana (తెలంగాణ)',
    district: 'Siddipet (సిద్దిపేట)',
    mandal: 'Gajwel (గజ్వేల్)',
    aadhaarNumber: '4512 8890 1234',
    aadhaarDocumentUrl: '/images/sample-aadhaar-card.svg',
    photoUrl: '/images/reporter-avatar-1.svg'
  });

  assert.equal(reporter.status, 'pending');
  assert.equal(reporter.idCardGenerated, false);

  // Admin changes reporter password
  const { nextState: statePwd, reporter: pwdUpdatedRep } = updateReporterPassword(
    state1,
    reporter.id,
    'NewAdminSetPass@99'
  );
  assert.equal(pwdUpdatedRep.passwordHash, 'NewAdminSetPass@99');

  // Approve reporter via Admin
  const { nextState: state2, reporter: approvedRep } = approveReporter(statePwd, reporter.id);
  assert.equal(approvedRep.status, 'approved');
  assert.equal(approvedRep.idCardGenerated, true);

  // Admin blocks the reporter -> blocked reporter cannot publish news
  const { nextState: stateBlocked, reporter: blockedRep } = setReporterBlockStatus(
    state2,
    reporter.id,
    true
  );
  assert.equal(blockedRep.status, 'blocked');
  assert.throws(() => {
    publishReporterNews(stateBlocked, reporter.id, {
      titleTe: 'గజ్వేల్ మండల వార్త',
      summaryTe: 'సారాంశం',
      contentTe: 'పూర్తి వివరాలు',
      category: 'మండల వార్తలు',
      imageUrl: '/images/mandal-praja-parishad.svg'
    });
  }, /blocked by Admin/);

  // Admin unblocks the reporter -> reporter can publish Mandal-locked news
  const { nextState: stateUnblocked, reporter: unblockedRep } = setReporterBlockStatus(
    stateBlocked,
    reporter.id,
    false
  );
  assert.equal(unblockedRep.status, 'approved');

  const { nextState: state3, article } = publishReporterNews(stateUnblocked, unblockedRep.id, {
    titleTe: 'గజ్వేల్ మండలంలో నూతన డిజిటల్ లైబ్రరీ ప్రారంభం',
    summaryTe: 'విద్యార్థులకు ఉచిత కంప్యూటర్ శిక్షణ',
    contentTe: 'గజ్వేల్ మండల కేంద్రంలో నూతన డిజిటల్ లైబ్రరీని ప్రారంభించారు.',
    category: 'మండల వార్తలు',
    imageUrl: '/images/mandal-praja-parishad.svg',
    attemptedMandalOverride: 'Secunderabad (సికింద్రాబాద్)'
  });

  assert.equal(article.state, 'Telangana (తెలంగాణ)');
  assert.equal(article.district, 'Siddipet (సిద్దిపేట)');
  assert.equal(article.mandal, 'Gajwel (గజ్వేల్)');

  const gajwelNews = filterPublicNews(state3, { mandal: 'Gajwel (గజ్వేల్)' });
  assert.equal(gajwelNews.length, 1);
});

test('Private Ads support all 10 categories, Banner & Classified formats, and Home/State/District/Mandal scopes', () => {
  const state0 = createInitialPortalState();

  // Verify initial seed includes both Banner Ads ('banner') and Classified Ads ('classified')
  const initialBannerAds = filterPublicPrivateAds(state0, { adFormat: 'banner' });
  const initialClassifiedAds = filterPublicPrivateAds(state0, { adFormat: 'classified' });
  assert.equal(initialBannerAds.length, 4);
  assert.equal(initialClassifiedAds.length, 3);

  // Verify initial seed includes Home Page Wise ('home'), State Wise ('state'), District Wise ('district'), Mandal Wise ('mandal')
  assert.equal(filterPublicPrivateAds(state0, { scope: 'home' }).length, 2);
  assert.equal(filterPublicPrivateAds(state0, { scope: 'state' }).length, 1);
  assert.equal(filterPublicPrivateAds(state0, { scope: 'district' }).length, 2);
  assert.equal(filterPublicPrivateAds(state0, { scope: 'mandal' }).length, 2);

  const { nextState: state1, ad } = submitPrivateAd(state0, {
    title: 'గజ్వేల్ సూపర్ మార్కెట్ ప్రారంభోత్సవం',
    matter: 'అన్ని నిత్యావసర సరుకులపై 20% తగ్గింపు',
    imageUrl: '/images/ad-kanchipuram-silks.svg',
    category: 'వ్యాపార & వాణిజ్య ప్రకటనలు (Business, Showrooms & Offers)',
    adFormat: 'classified',
    scope: 'mandal',
    state: 'Telangana (తెలంగాణ)',
    district: 'Siddipet (సిద్దిపేట)',
    mandal: 'Gajwel (గజ్వేల్)',
    advertiserName: 'Gajwel Super Mart',
    contactPhone: '9123456780'
  });

  assert.equal(ad.status, 'pending');
  assert.equal(ad.adFormat, 'classified');
  assert.equal(filterPublicPrivateAds(state1, { scope: 'mandal', mandal: 'Gajwel (గజ్వేల్)' }).length, 0);

  const { nextState: state2 } = approvePrivateAd(state1, ad.id);
  const afterApproval = filterPublicPrivateAds(state2, {
    scope: 'mandal',
    mandal: 'Gajwel (గజ్వేల్)',
    adFormat: 'classified'
  });
  assert.equal(afterApproval.length, 1);
  assert.equal(afterApproval[0].title, 'గజ్వేల్ సూపర్ మార్కెట్ ప్రారంభోత్సవం');
});

test('View counter increments deterministically and Admin can add new Districts & Mandals', () => {
  const state0 = createInitialPortalState();
  const targetArticle = state0.articles[0];
  const initialViews = targetArticle.views;

  const { nextState: state1, views } = incrementArticleViews(state0, targetArticle.id);
  assert.equal(views, initialViews + 1);
  assert.equal(state1.articles[0].views, initialViews + 1);

  const state2 = addLocationHierarchyNode(
    state1,
    'Telangana (తెలంగాణ)',
    'Mulugu (ములుగు)',
    'Venkatapuram (వెంకటాపురం)'
  );
  assert.equal(
    state2.locations['Telangana (తెలంగాణ)']['Mulugu (ములుగు)'].includes('Venkatapuram (వెంకటాపురం)'),
    true
  );

  assert.equal(state2.adsenseConfig.showOnHomepage, false);
  assert.equal(state2.officialYoutubeChannel, OFFICIAL_YOUTUBE_CHANNEL);
});

test('Official Banner Image and Full Website CMS settings (Logo, Banner, Masthead, Article/Ad CRUD) work from Admin', () => {
  const state0 = createInitialPortalState();
  assert.equal(state0.bannerUrl, OFFICIAL_BANNER_IMAGE);
  assert.equal(state0.siteConfig.bannerUrl, OFFICIAL_BANNER_IMAGE);
  assert.equal(state0.siteConfig.showBannerImage, true);

  const state1 = updateSiteConfig(state0, {
    bannerUrl: '/custom-banner.jpg',
    logoUrl: '/custom-logo.png',
    mastheadHeading: 'నేటి భారతం స్పెషల్ ఎడిషన్',
    contactPhone: '+91 90000 11111'
  });
  assert.equal(state1.bannerUrl, '/custom-banner.jpg');
  assert.equal(state1.logoUrl, '/custom-logo.png');
  assert.equal(state1.siteConfig.mastheadHeading, 'నేటి భారతం స్పెషల్ ఎడిషన్');
  assert.equal(state1.siteConfig.contactPhone, '+91 90000 11111');

  const firstArtId = state1.articles[0].id;
  const state2 = updateNewsArticle(state1, firstArtId, {
    titleTe: 'అడ్మిన్ ఎడిట్ చేసిన శీర్షిక'
  });
  assert.equal(state2.articles[0].title.te, 'అడ్మిన్ ఎడిట్ చేసిన శీర్షిక');

  const state3 = deleteNewsArticle(state2, firstArtId);
  assert.equal(state3.articles.length, state2.articles.length - 1);

  const firstAdId = state3.privateAds[0].id;
  const state4 = deletePrivateAd(state3, firstAdId);
  assert.equal(state4.privateAds.length, state3.privateAds.length - 1);

  const state5 = addYoutubeUpdate(state4, {
    titleTe: 'నేటి భారతం స్పెషల్ లైవ్ బులెటిన్',
    locationTag: 'Hyderabad Live'
  });
  assert.equal(state5.youtubeUpdates[0].title.te, 'నేటి భారతం స్పెషల్ లైవ్ బులెటిన్');
});
