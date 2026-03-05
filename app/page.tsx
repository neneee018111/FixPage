"use client";

import { FormEvent, useMemo, useState } from "react";

type Locale = "ko" | "en";

type LocalizedText = Record<Locale, string>;

type ServiceOption = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
};

const serviceOptions: ServiceOption[] = [
  {
    id: "landing",
    name: { ko: "원페이지 랜딩", en: "One-Page Landing" },
    description: {
      ko: "브랜드 소개, 핵심 서비스, CTA 중심의 단일 페이지",
      en: "A single-page layout focused on brand intro, core services, and CTA",
    },
    price: 350000,
  },
  {
    id: "multi",
    name: { ko: "다중 페이지 구성", en: "Multi-Page Website" },
    description: {
      ko: "메인, 소개, 서비스, 문의 등 4~6개 페이지 확장",
      en: "Extended structure with 4-6 pages like home, about, service, and contact",
    },
    price: 700000,
  },
  {
    id: "copy",
    name: { ko: "카피라이팅 정리", en: "Copywriting Refinement" },
    description: {
      ko: "문구 다듬기와 섹션 구조 재정리",
      en: "Polished messaging and clearer section structure",
    },
    price: 150000,
  },
  {
    id: "seo",
    name: { ko: "기본 SEO 세팅", en: "Basic SEO Setup" },
    description: {
      ko: "메타 태그, 검색 노출 기본 구조 반영",
      en: "Meta tags and essential search visibility structure",
    },
    price: 120000,
  },
  {
    id: "form",
    name: { ko: "문의 폼 연결", en: "Inquiry Form Integration" },
    description: {
      ko: "이메일 수신까지 가능한 문의 흐름 구성",
      en: "Inquiry flow connected to actual email delivery",
    },
    price: 100000,
  },
  {
    id: "maintain",
    name: { ko: "월 유지보수", en: "Monthly Maintenance" },
    description: {
      ko: "배포 후 수정 대응과 운영 지원",
      en: "Post-launch edits and operational support",
    },
    price: 90000,
  },
];

const currencyKR = new Intl.NumberFormat("ko-KR");
const currencyEN = new Intl.NumberFormat("en-US");

const copy: Record<Locale, Record<string, string>> = {
  ko: {
    navServices: "서비스",
    navQuote: "견적 계산",
    navInquiry: "문의",
    heroLabel: "웹페이지 외주 랜딩",
    heroTitle: "디자인은 명확하게, 견적은 투명하게.",
    heroDescription:
      "토스식으로 신뢰감 있는 화면에서 고객이 직접 옵션을 고르고 예상 비용을 확인한 뒤 바로 문의까지 연결합니다.",
    heroPrimary: "견적 바로 계산",
    heroSecondary: "문의 남기기",
    estimateNow: "현재 예상 견적",
    selectedCountSuffix: "개 옵션 선택됨",
    responseSpeed: "응답 속도",
    responseSpeedValue: "평균 24시간 이내",
    baseIncluded: "기본 포함",
    baseIncludedValue: "반응형",
    introTitleA: "내 비즈니스에 맞는 웹사이트를",
    introTitleB: "한 페이지에서 쉽고 빠르게 준비하세요.",
    feature1Eyebrow: "홈 · 소개",
    feature1Title: "브랜드 첫인상을 정리한 메인 구조",
    feature1Description: "정보 우선순위를 맞춰 전환율 중심의 섹션 구성을 제공합니다.",
    feature2Eyebrow: "서비스 상세",
    feature2Title: "고객이 이해하기 쉬운 설명 흐름",
    feature2Description: "복잡한 내용을 짧고 명확한 문장과 시각 요소로 풀어냅니다.",
    feature3Eyebrow: "문의 전환",
    feature3Title: "클릭 한 번으로 상담 연결",
    feature3Description: "랜딩 하단에서 바로 문의를 보내고, 서버로 안전하게 수집합니다.",
    step1: "STEP 1",
    step1Title: "원하는 제작 옵션 선택",
    step2: "STEP 2",
    step2Title: "예상 견적 확인",
    step3: "STEP 3",
    step3Title: "문의 내용 보내기",
    noSelected: "선택된 서비스가 없습니다.",
    totalLabel: "예상 합계",
    summaryCaption: "실제 견적은 일정, 페이지 수, 자료 준비 상태에 따라 조정됩니다.",
    labelName: "이름",
    labelEmail: "이메일",
    labelPhone: "연락처",
    labelBusiness: "업종 또는 서비스",
    labelDetails: "요청사항",
    phName: "홍길동",
    phEmail: "hello@example.com",
    phPhone: "010-1234-5678",
    phBusiness: "카페, 병원, 개인 브랜드 등",
    phDetails: "원하는 분위기, 참고 사이트, 필요한 일정 등을 적어주세요.",
    submitting: "전송 중...",
    submit: "문의 보내기",
    sendFailed: "문의 전송에 실패했습니다.",
    sendSuccess: "문의가 접수되었습니다. 데모 환경에서는 서버 로그로 확인할 수 있습니다.",
    unknownError: "알 수 없는 오류가 발생했습니다.",
    currencySuffix: "원",
  },
  en: {
    navServices: "Services",
    navQuote: "Quote",
    navInquiry: "Contact",
    heroLabel: "Web Outsourcing Landing",
    heroTitle: "Clear design, transparent pricing.",
    heroDescription:
      "In a trust-first layout, visitors choose options, understand estimated cost, and send an inquiry in one flow.",
    heroPrimary: "Calculate Quote",
    heroSecondary: "Send Inquiry",
    estimateNow: "Current Estimate",
    selectedCountSuffix: "options selected",
    responseSpeed: "Response Time",
    responseSpeedValue: "Within 24 hours on average",
    baseIncluded: "Included",
    baseIncludedValue: "Responsive",
    introTitleA: "Build a website that fits your business",
    introTitleB: "quickly and clearly on one page.",
    feature1Eyebrow: "Home · Intro",
    feature1Title: "A focused structure for first impressions",
    feature1Description: "Sections are organized by information priority for better conversion.",
    feature2Eyebrow: "Service Detail",
    feature2Title: "A flow customers can instantly understand",
    feature2Description: "Complex ideas are translated into clear messaging and visual blocks.",
    feature3Eyebrow: "Inquiry Conversion",
    feature3Title: "Connect to consultation in one click",
    feature3Description: "Send inquiries directly from the landing page and collect them safely.",
    step1: "STEP 1",
    step1Title: "Choose Your Build Options",
    step2: "STEP 2",
    step2Title: "Check Estimated Quote",
    step3: "STEP 3",
    step3Title: "Send Your Inquiry",
    noSelected: "No services selected.",
    totalLabel: "Estimated Total",
    summaryCaption: "Final quote may vary based on timeline, page count, and material readiness.",
    labelName: "Name",
    labelEmail: "Email",
    labelPhone: "Phone",
    labelBusiness: "Business or Service",
    labelDetails: "Request Details",
    phName: "John Doe",
    phEmail: "hello@example.com",
    phPhone: "+82-10-1234-5678",
    phBusiness: "Cafe, clinic, personal brand, etc.",
    phDetails: "Share desired tone, reference sites, and timeline.",
    submitting: "Sending...",
    submit: "Send Inquiry",
    sendFailed: "Failed to send inquiry.",
    sendSuccess: "Your inquiry has been submitted. In this demo, check server logs for details.",
    unknownError: "An unknown error occurred.",
    currencySuffix: "KRW",
  },
};

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["landing"]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    details: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = copy[locale];

  const formatPrice = (value: number) => {
    if (locale === "en") {
      return `${t.currencySuffix} ${currencyEN.format(value)}`;
    }
    return `${currencyKR.format(value)}${t.currencySuffix}`;
  };

  const selectedServices = useMemo(
    () => serviceOptions.filter((option) => selectedOptions.includes(option.id)),
    [selectedOptions],
  );

  const total = selectedServices.reduce((sum, option) => sum + option.price, 0);

  const toggleOption = (id: string) => {
    setSelectedOptions((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          selectedServices,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error(t.sendFailed);
      }

      setStatus(t.sendSuccess);
      setFormState({
        name: "",
        email: "",
        phone: "",
        business: "",
        details: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : t.unknownError;
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="landing">
      <header className="topbar shell">
        <a className="brand" href="#top">
          <span className="brand-dot" aria-hidden>
            f
          </span>
          <strong>FixPage</strong>
        </a>
        <div className="top-controls">
          <nav className="top-nav" aria-label={locale === "ko" ? "주요 섹션" : "Main sections"}>
            <a href="#services">{t.navServices}</a>
            <a href="#quote">{t.navQuote}</a>
            <a href="#inquiry">{t.navInquiry}</a>
          </nav>
          <div className="lang-switch" role="group" aria-label="Language switch">
            <button
              type="button"
              className={`lang-btn${locale === "ko" ? " active" : ""}`}
              onClick={() => setLocale("ko")}
            >
              KOR
            </button>
            <span>|</span>
            <button
              type="button"
              className={`lang-btn${locale === "en" ? " active" : ""}`}
              onClick={() => setLocale("en")}
            >
              ENG
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="hero shell reveal">
        <div className="hero-copy">
          <p className="section-label">{t.heroLabel}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDescription}</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#quote">
              {t.heroPrimary}
            </a>
            <a className="ghost-btn" href="#inquiry">
              {t.heroSecondary}
            </a>
          </div>
        </div>
        <div className="hero-stack" aria-hidden>
          <article className="floating-card card-main">
            <p>{t.estimateNow}</p>
            <strong>{formatPrice(total)}</strong>
            <span>
              {selectedServices.length} {t.selectedCountSuffix}
            </span>
          </article>
          <article className="floating-card card-sub">
            <p>{t.responseSpeed}</p>
            <strong>{t.responseSpeedValue}</strong>
          </article>
          <article className="floating-card card-sub">
            <p>{t.baseIncluded}</p>
            <strong>{t.baseIncludedValue}</strong>
          </article>
        </div>
      </section>

      <section className="intro shell reveal">
        <h2>
          {t.introTitleA}
          <br />
          {t.introTitleB}
        </h2>
      </section>

      <section id="services" className="feature-grid shell reveal">
        <article className="feature-card">
          <p className="feature-eyebrow">{t.feature1Eyebrow}</p>
          <h3>{t.feature1Title}</h3>
          <p>{t.feature1Description}</p>
        </article>
        <article className="feature-card">
          <p className="feature-eyebrow">{t.feature2Eyebrow}</p>
          <h3>{t.feature2Title}</h3>
          <p>{t.feature2Description}</p>
        </article>
        <article className="feature-card">
          <p className="feature-eyebrow">{t.feature3Eyebrow}</p>
          <h3>{t.feature3Title}</h3>
          <p>{t.feature3Description}</p>
        </article>
      </section>

      <section id="quote" className="quote-area shell reveal">
        <div className="panel">
          <div className="panel-heading">
            <p className="section-label">{t.step1}</p>
            <h2>{t.step1Title}</h2>
          </div>
          <div className="options">
            {serviceOptions.map((option) => {
              const selected = selectedOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`option-card${selected ? " selected" : ""}`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div>
                    <strong>{option.name[locale]}</strong>
                    <p>{option.description[locale]}</p>
                  </div>
                  <span>{formatPrice(option.price)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="panel summary-panel">
          <div className="panel-heading">
            <p className="section-label">{t.step2}</p>
            <h2>{t.step2Title}</h2>
          </div>
          <ul className="summary-list">
            {selectedServices.length === 0 ? (
              <li>{t.noSelected}</li>
            ) : (
              selectedServices.map((service) => (
                <li key={service.id}>
                  <span>{service.name[locale]}</span>
                  <strong>{formatPrice(service.price)}</strong>
                </li>
              ))
            )}
          </ul>
          <div className="summary-total">
            <span>{t.totalLabel}</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <p className="summary-caption">{t.summaryCaption}</p>
        </aside>
      </section>

      <section id="inquiry" className="panel shell form-panel reveal">
        <div className="panel-heading">
          <p className="section-label">{t.step3}</p>
          <h2>{t.step3Title}</h2>
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label>
            {t.labelName}
            <input
              required
              value={formState.name}
              onChange={(event) => setFormState({ ...formState, name: event.target.value })}
              placeholder={t.phName}
            />
          </label>
          <label>
            {t.labelEmail}
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) => setFormState({ ...formState, email: event.target.value })}
              placeholder={t.phEmail}
            />
          </label>
          <label>
            {t.labelPhone}
            <input
              value={formState.phone}
              onChange={(event) => setFormState({ ...formState, phone: event.target.value })}
              placeholder={t.phPhone}
            />
          </label>
          <label>
            {t.labelBusiness}
            <input
              value={formState.business}
              onChange={(event) => setFormState({ ...formState, business: event.target.value })}
              placeholder={t.phBusiness}
            />
          </label>
          <label className="full-width">
            {t.labelDetails}
            <textarea
              required
              rows={5}
              value={formState.details}
              onChange={(event) => setFormState({ ...formState, details: event.target.value })}
              placeholder={t.phDetails}
            />
          </label>
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.submitting : t.submit}
            </button>
            <p>{status}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
