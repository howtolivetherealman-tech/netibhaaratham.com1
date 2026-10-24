'use client';

import React, { useState } from 'react';
import {
  X,
  Eye,
  MapPin,
  Share2,
  ExternalLink,
  Megaphone,
  MessageSquare,
  Smartphone,
  Download,
  CheckCircle2,
  Video
} from 'lucide-react';
import {
  NewsArticle,
  PortalState,
  SubmitPrivateAdInput,
  AdScope,
  AdFormat,
  PRIVATE_AD_CATEGORIES
} from '@/lib/news-engine';
import { SupportedLanguage, TRANSLATIONS } from '@/lib/translations';

interface ArticleReaderModalProps {
  article: NewsArticle;
  lang: SupportedLanguage;
  onClose: () => void;
  onOpenMandalPage: (stateName: string, districtName: string, mandalName: string) => void;
}

export function ArticleReaderModal({
  article,
  lang,
  onClose,
  onOpenMandalPage
}: ArticleReaderModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={article.title[lang]}
    >
      <div className="relative w-full max-w-3xl rounded-xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="text-xs text-stone-600 flex items-center gap-2">
            <span className="font-bold text-red-900">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.mandal}</span>
            <span aria-hidden="true">·</span>
            <span>{article.district}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Article Reader"
            className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 lg:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 leading-snug">
            {article.title[lang]}
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 border-b border-stone-200 pb-4">
            <div>
              <span className="font-semibold text-stone-800">{article.authorName}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-mono font-bold text-red-900 tabular-nums">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString('en-IN')} Views
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMandalPage(article.state, article.district, article.mandal);
                }}
                className="inline-flex items-center gap-1 font-bold text-stone-800 hover:text-red-800 underline"
              >
                <MapPin className="w-3.5 h-3.5 text-red-800" />
                {article.mandal} మండల పేజీ చూడండి
              </button>
            </div>
          </div>

          <img
            src={article.imageUrl}
            alt={article.title[lang]}
            referrerPolicy="no-referrer"
            className="w-full h-72 object-cover rounded-lg border border-stone-200 bg-stone-900"
          />

          <p className="text-base font-semibold text-stone-800 leading-relaxed">
            {article.summary[lang]}
          </p>

          <p className="text-base text-stone-700 leading-relaxed whitespace-pre-line">
            {article.content[lang]}
          </p>

          {article.youtubeUrl && (
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">
                నేటి భారతం వీడియో అప్‌డేట్స్ (YouTube Channel):
              </span>
              <a
                href={article.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-800 px-4 py-2 text-xs font-bold text-white hover:bg-red-900 transition-colors"
              >
                <Video className="w-4 h-4" />
                Watch on YouTube
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SubmitPrivateAdModalProps {
  portalState: PortalState;
  onClose: () => void;
  onSubmitAd: (input: SubmitPrivateAdInput) => Promise<void>;
}

export function SubmitPrivateAdModal({
  portalState,
  onClose,
  onSubmitAd
}: SubmitPrivateAdModalProps) {
  const statesList = Object.keys(portalState.locations);
  const [title, setTitle] = useState('');
  const [matter, setMatter] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/ad-kanchipuram-silks.svg');
  const [category, setCategory] = useState<string>(PRIVATE_AD_CATEGORIES[0]);
  const [adFormat, setAdFormat] = useState<AdFormat>('banner');
  const [scope, setScope] = useState<AdScope>('mandal');
  const [stateName, setStateName] = useState(statesList[0] || 'Telangana (తెలంగాణ)');
  const districts = Object.keys(portalState.locations[stateName] || {});
  const [districtName, setDistrictName] = useState(districts[0] || '');
  const mandals =
    (portalState.locations[stateName] && portalState.locations[stateName][districtName]) || [];
  const [mandalName, setMandalName] = useState(mandals[0] || '');
  const [advertiserName, setAdvertiserName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitAd({
      title,
      matter,
      imageUrl,
      category,
      adFormat,
      scope,
      state: stateName,
      district: districtName,
      mandal: mandalName,
      advertiserName,
      contactPhone
    });
    setSubmittedMsg(
      'మీ ప్రైవేట్ ప్రకటన (బ్యానర్ / క్లాసిఫైడ్ ఫోటో + మేటర్) నమోదు చేయబడింది! అడ్మిన్ ఆమోదం (Admin Approval) వచ్చిన వెంటనే వెబ్‌సైట్‌లో కనిపిస్తుంది.'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Submit Private Advertisement"
    >
      <div className="relative w-full max-w-2xl rounded-xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">
              ప్రైవేట్ యాడ్ బుకింగ్ (బ్యానర్ యాడ్ / క్లాసిఫైడ్ యాడ్ · అన్ని కేటగిరీలు)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Private Ad Modal"
            className="rounded-lg p-1 text-stone-300 hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          {submittedMsg ? (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="text-sm font-bold text-stone-900">{submittedMsg}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-red-800 px-6 py-2.5 text-xs font-bold text-white"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    యాడ్ రకం · Ad Format *
                  </label>
                  <select
                    value={adFormat}
                    onChange={(e) => setAdFormat(e.target.value as AdFormat)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs font-bold text-stone-900 bg-amber-50/60"
                  >
                    <option value="banner">బ్యానర్ యాడ్ (Banner Ad)</option>
                    <option value="classified">క్లాసిఫైడ్ యాడ్ (Classified Ad)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    కేటగిరీ · All Private Ad Categories *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900"
                  >
                    {PRIVATE_AD_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ప్రకటన శీర్షిక · Ad Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ఉదా: శ్రీ లక్ష్మీ సిల్క్స్ పండుగ ఆఫర్ / DTCP ఓపెన్ ప్లాట్లు అమ్మకానికి"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ప్రకటన వివరాలు · Advertisement Matter *
                </label>
                <textarea
                  rows={3}
                  required
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="ప్రకటన పూర్తి వివరాలు, ఆఫర్లు, చిరునామా రాయండి..."
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900"
                />
              </div>

              {/* Ad Image Upload + Preview */}
              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  ప్రకటన ఫోటో / బ్యానర్ అప్‌లోడ్ (Ad Image + Matter 둘ూ కనిపిస్తాయి) *
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-xs text-stone-600 file:mr-2 file:rounded file:border-0 file:bg-red-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                  />
                  <img
                    src={imageUrl}
                    alt="Ad Banner Preview"
                    referrerPolicy="no-referrer"
                    className="w-28 h-16 rounded object-cover border border-stone-300"
                  />
                </div>
              </div>

              {/* Location & Scope Targeting */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Ad Level</label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value as AdScope)}
                    className="w-full rounded-lg border border-stone-300 px-2.5 py-2 text-xs text-stone-900"
                  >
                    <option value="home">హోమ్ పేజీ వారీగా (Home Page Wise)</option>
                    <option value="state">రాష్ట్ర స్థాయి (State Wise)</option>
                    <option value="district">జిల్లా స్థాయి (District Wise)</option>
                    <option value="mandal">మండల స్థాయి (Mandal Wise)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">State</label>
                  <select
                    value={stateName}
                    onChange={(e) => {
                      const st = e.target.value;
                      setStateName(st);
                      const d0 = Object.keys(portalState.locations[st] || {})[0] || '';
                      setDistrictName(d0);
                      const m0 =
                        (portalState.locations[st] && portalState.locations[st][d0]?.[0]) || '';
                      setMandalName(m0);
                    }}
                    className="w-full rounded-lg border border-stone-300 px-2.5 py-2 text-xs text-stone-900"
                  >
                    {statesList.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">District</label>
                  <select
                    value={districtName}
                    onChange={(e) => {
                      const dt = e.target.value;
                      setDistrictName(dt);
                      const m0 =
                        (portalState.locations[stateName] &&
                          portalState.locations[stateName][dt]?.[0]) ||
                        '';
                      setMandalName(m0);
                    }}
                    className="w-full rounded-lg border border-stone-300 px-2.5 py-2 text-xs text-stone-900"
                  >
                    {districts.map((dt) => (
                      <option key={dt} value={dt}>
                        {dt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Mandal</label>
                  <select
                    value={mandalName}
                    onChange={(e) => setMandalName(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-2.5 py-2 text-xs text-stone-900"
                  >
                    {mandals.map((mn) => (
                      <option key={mn} value={mn}>
                        {mn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ప్రకటనదారు పేరు · Advertiser Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={advertiserName}
                    onChange={(e) => setAdvertiserName(e.target.value)}
                    placeholder="Business / Owner Name"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    సంప్రదించవలసిన నెంబర్ · Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="98480 XXXXX"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-xs font-mono tabular-nums text-stone-900"
                  />
                </div>
              </div>

              <p className="text-xs text-stone-500">
                * నిబంధన: ప్రైవేట్ యాడ్స్ అడ్మిన్ అప్రూవల్ అయిన తర్వాతే వెబ్‌సైట్ మరియు యాప్‌లో ప్రదర్శించబడతాయి.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-800 px-5 py-2 text-xs font-bold text-white hover:bg-red-900 transition-colors"
                >
                  Submit Private Ad for Admin Approval
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface PlayStoreAppModalProps {
  logoUrl: string;
  isInstallable: boolean;
  onTriggerInstall: () => void;
  onClose: () => void;
}

export function PlayStoreAppModal({
  logoUrl,
  isInstallable,
  onTriggerInstall,
  onClose
}: PlayStoreAppModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Neti Bharatam Mobile App and Google Play Store"
    >
      <div className="w-full max-w-lg rounded-xl bg-white border border-stone-200 shadow-2xl overflow-hidden">
        <div className="bg-red-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl || '/icon.svg'}
              alt="Neti Bharatam App Icon"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl bg-white p-1"
            />
            <div>
              <h3 className="text-lg font-bold">నేటి భారతం మొబైల్ యాప్ · Play Store &amp; PWA</h3>
              <p className="text-xs text-red-100">Android · iOS · Instant Mobile App Experience</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Mobile App Modal"
            className="rounded-lg p-1 text-white hover:bg-white/15"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-stone-700">
          <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 space-y-2">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-red-800" />
              1. తక్షణ మొబైల్ యాప్ ఇన్‌స్టాలేషన్ (Direct Mobile App / PWA)
            </h4>
            <p>
              నేటి భారతం వెబ్‌సైట్ పూర్తి స్థాయి <strong>Progressive Web App (PWA)</strong> టెక్నాలజీతో రూపొందించబడింది. మీ ఫోన్ హోమ్ స్క్రీన్‌పై యాప్‌లాగా ఇన్‌స్టాల్ చేసుకుని నోటిఫికేషన్లు పొందవచ్చు.
            </p>
            {isInstallable ? (
              <button
                type="button"
                onClick={onTriggerInstall}
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-red-800 px-4 py-2 text-xs font-bold text-white hover:bg-red-900"
              >
                <Download className="w-4 h-4" />
                Install నేటి భారతం App Now
              </button>
            ) : (
              <p className="text-emerald-800 font-semibold">
                ✓ Chrome / Safari మెనూలో &quot;Add to Home Screen / Install App&quot; ద్వారా 1-క్లిక్‌తో ఇన్‌స్టాల్ చేసుకోండి.
              </p>
            )}
          </div>

          <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 space-y-2">
            <h4 className="text-sm font-bold text-stone-900">
              2. Google Play Store (Android TWA / AAB Ready)
            </h4>
            <p>
              ఈ యాప్ యొక్క <code>/manifest.webmanifest</code>, <code>192x192</code> మరియు{' '}
              <code>512x512</code> maskable ఐకాన్లు Google Play Store (Trusted Web Activity / PWABuilder) ప్రమాణాలకు అనుగుణంగా సిద్ధంగా ఉన్నాయి.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-stone-900 px-5 py-2 text-xs font-bold text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HostingerExportModalProps {
  onClose: () => void;
}

export function HostingerExportModal({ onClose }: HostingerExportModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Hostinger Upload Files Download Center"
    >
      <div className="w-full max-w-3xl rounded-xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-8">
        <div className="bg-stone-900 px-6 py-5 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
              HOSTINGER DEPLOYMENT PACKAGE · BUG-FREE EXPORT FILES
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-0.5">
              Hostinger లో అప్‌లోడ్ చేయడానికి సిద్ధంగా ఉన్న ఫైల్స్ (1-Click Download)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Hostinger Files Modal"
            className="rounded-lg p-1.5 text-stone-300 hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-stone-700 max-h-[82vh] overflow-y-auto">
          {/* Primary Recommended: Full ZIP Package */}
          <div className="rounded-xl bg-amber-50 border-2 border-amber-400 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block rounded bg-stone-900 px-2.5 py-0.5 text-[10px] font-mono font-extrabold text-amber-300 uppercase">
                RECOMMENDED · ALL-IN-ONE ZIP BUNDLE FOR PUBLIC_HTML
              </span>
              <h4 className="text-base font-extrabold text-stone-900">
                1. పూర్తి Hostinger ZIP ప్యాకేజీ (neti-bharatam-hostinger-public_html.zip)
              </h4>
              <p className="text-xs text-stone-700">
                ఇందులో <code>index.html</code>, <code>.htaccess</code>, <code>server.js</code>,{' '}
                <code>HOSTINGER_UPLOAD_GUIDE.txt</code> మరియు <code>Database JSON</code> అన్నీ కలిపి ఉంటాయి. Hostinger <strong>public_html</strong> లో అప్‌లోడ్ చేసి <strong>Extract</strong> చేస్తే చాలు!
              </p>
            </div>
            <a
              href="/api/hostinger-export?format=zip"
              download="neti-bharatam-hostinger-public_html.zip"
              className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-5 py-3 text-xs font-extrabold text-white hover:bg-red-900 transition-colors shrink-0 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Full .ZIP File
            </a>
          </div>

          {/* Individual Files Grid */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-3">
              లేదా విడివిడిగా ఫైల్స్ డౌన్‌లోడ్ చేసుకోండి (Individual Hostinger Files):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <a
                href="/api/hostinger-export?format=public_html"
                download="index.html"
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 hover:bg-stone-100 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-red-800 uppercase">
                    MAIN WEBSITE FILE
                  </span>
                  <div className="text-sm font-bold text-stone-900">index.html</div>
                  <p className="text-[11px] text-stone-600">
                    నేటి భారతం బ్యానర్, లోగో, వార్తలు, క్లాసిఫైడ్స్, రిపోర్టర్ &amp; అడ్మిన్ ప్యానెల్‌తో పూర్తి ఫైల్
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-red-800">
                  <Download className="w-3.5 h-3.5" />
                  Download index.html
                </span>
              </a>

              <a
                href="/api/hostinger-export?format=htaccess"
                download=".htaccess"
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 hover:bg-stone-100 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-red-800 uppercase">
                    APACHE ROUTING &amp; UTF-8
                  </span>
                  <div className="text-sm font-bold text-stone-900">.htaccess</div>
                  <p className="text-[11px] text-stone-600">
                    Hostinger public_html రౌటింగ్ మరియు తెలుగు/హిందీ UTF-8 ఫాంట్ కాన్ఫిగరేషన్
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-red-800">
                  <Download className="w-3.5 h-3.5" />
                  Download .htaccess
                </span>
              </a>

              <a
                href="/api/hostinger-export?format=nodejs_server"
                download="server.js"
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 hover:bg-stone-100 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">
                    NODE.JS WEB APP
                  </span>
                  <div className="text-sm font-bold text-stone-900">server.js</div>
                  <p className="text-[11px] text-stone-600">
                    Hostinger VPS / Cloud Node.js హోస్టింగ్ కోసం ప్రొడక్షన్ సర్వర్ ఫైల్
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-emerald-800">
                  <Download className="w-3.5 h-3.5" />
                  Download server.js
                </span>
              </a>

              <a
                href="/api/hostinger-export?format=deploy_guide"
                download="HOSTINGER_UPLOAD_GUIDE.txt"
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 hover:bg-stone-100 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-600 uppercase">
                    STEP-BY-STEP INSTRUCTIONS
                  </span>
                  <div className="text-sm font-bold text-stone-900">HOSTINGER_UPLOAD_GUIDE.txt</div>
                  <p className="text-[11px] text-stone-600">
                    Hostinger hPanel &rarr; File Manager లో అప్‌లోడ్ చేసే విధానం (తెలుగు &amp; ఇంగ్లీష్)
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-stone-900">
                  <Download className="w-3.5 h-3.5" />
                  Download Guide (.TXT)
                </span>
              </a>

              <a
                href="/api/hostinger-export?format=database_json"
                download="neti-bharatam-database-backup.json"
                className="rounded-xl border border-stone-200 bg-stone-50 p-4 hover:bg-stone-100 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-600 uppercase">
                    DATABASE BACKUP
                  </span>
                  <div className="text-sm font-bold text-stone-900">Database Backup (.JSON)</div>
                  <p className="text-[11px] text-stone-600">
                    వార్తలు, రిపోర్టర్లు, ప్రైవేట్ యాడ్స్ &amp; సెట్టింగ్స్ పూర్తి డేటాబేస్ బ్యాకప్
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-stone-900">
                  <Download className="w-3.5 h-3.5" />
                  Download Database (.JSON)
                </span>
              </a>
            </div>
          </div>

          {/* Quick Steps */}
          <div className="rounded-xl bg-stone-900 text-stone-200 p-4 space-y-1.5">
            <div className="font-bold text-amber-400">
              Hostinger లో అప్‌లోడ్ చేసే విధానం (3 సులభమైన స్టెప్స్):
            </div>
            <div>
              <strong>Step 1:</strong> పైనున్న <strong>&quot;Download Full .ZIP File&quot;</strong> (లేదా <code>index.html</code> + <code>.htaccess</code>) డౌన్‌లోడ్ చేసుకోండి.
            </div>
            <div>
              <strong>Step 2:</strong> మీ Hostinger <strong>hPanel &rarr; Files &rarr; File Manager &rarr; public_html</strong> ఫోల్డర్ ఓపెన్ చేసి పాత <code>default.php</code> తొలగించండి.
            </div>
            <div>
              <strong>Step 3:</strong> <code>neti-bharatam-hostinger-public_html.zip</code> అప్‌లోడ్ చేసి <strong>Extract</strong> చేయండి (లేదా <code>index.html</code> మరియు <code>.htaccess</code> అప్‌లోడ్ చేయండి). మీ వెబ్‌సైట్ వెంటనే లైవ్ అవుతుంది!
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-stone-900 px-5 py-2 text-xs font-bold text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
