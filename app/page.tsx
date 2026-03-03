"use client";

import { FormEvent, useMemo, useState } from "react";

type ServiceOption = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const serviceOptions: ServiceOption[] = [
  {
    id: "landing",
    name: "원페이지 랜딩",
    description: "브랜드 소개, 핵심 서비스, CTA 중심의 단일 페이지",
    price: 350000,
  },
  {
    id: "multi",
    name: "다중 페이지 구성",
    description: "메인, 소개, 서비스, 문의 등 4~6개 페이지 확장",
    price: 700000,
  },
  {
    id: "copy",
    name: "카피라이팅 정리",
    description: "문구 다듬기와 섹션 구조 재정리",
    price: 150000,
  },
  {
    id: "seo",
    name: "기본 SEO 세팅",
    description: "메타 태그, 검색 노출 기본 구조 반영",
    price: 120000,
  },
  {
    id: "form",
    name: "문의 폼 연결",
    description: "이메일 수신까지 가능한 문의 흐름 구성",
    price: 100000,
  },
  {
    id: "maintain",
    name: "월 유지보수",
    description: "배포 후 수정 대응과 운영 지원",
    price: 90000,
  },
];

const currency = new Intl.NumberFormat("ko-KR");

export default function HomePage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["landing", "form"]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    details: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        throw new Error("문의 전송에 실패했습니다.");
      }

      setStatus("문의가 접수되었습니다. 데모 환경에서는 서버 로그로 확인할 수 있습니다.");
      setFormState({
        name: "",
        email: "",
        phone: "",
        business: "",
        details: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">FixPage</p>
          <h1>웹 개발 외주 견적을 먼저 계산하고 바로 문의까지 연결합니다.</h1>
          <p className="hero-text">
            숨고나 크몽에 올리기 전에, 고객이 직접 옵션을 고르고 예상 비용을 이해할 수 있는
            실전형 소개 페이지입니다.
          </p>
        </div>
        <div className="hero-note">
          <span>기본 추천</span>
          <strong>Next.js + 문의 API + Vercel 배포</strong>
          <p>처음에는 이 페이지를 포트폴리오 겸 영업용 랜딩으로 사용하면 됩니다.</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <p className="section-label">STEP 1</p>
            <h2>원하는 제작 옵션 선택</h2>
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
                    <strong>{option.name}</strong>
                    <p>{option.description}</p>
                  </div>
                  <span>{currency.format(option.price)}원</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="panel summary-panel">
          <div className="panel-heading">
            <p className="section-label">STEP 2</p>
            <h2>예상 견적 확인</h2>
          </div>
          <ul className="summary-list">
            {selectedServices.length === 0 ? (
              <li>선택된 서비스가 없습니다.</li>
            ) : (
              selectedServices.map((service) => (
                <li key={service.id}>
                  <span>{service.name}</span>
                  <strong>{currency.format(service.price)}원</strong>
                </li>
              ))
            )}
          </ul>
          <div className="summary-total">
            <span>예상 합계</span>
            <strong>{currency.format(total)}원</strong>
          </div>
          <p className="summary-caption">
            실제 견적은 일정, 페이지 수, 자료 준비 상태에 따라 조정됩니다.
          </p>
        </aside>
      </section>

      <section className="panel form-panel">
        <div className="panel-heading">
          <p className="section-label">STEP 3</p>
          <h2>문의 내용 보내기</h2>
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label>
            이름
            <input
              required
              value={formState.name}
              onChange={(event) => setFormState({ ...formState, name: event.target.value })}
              placeholder="홍길동"
            />
          </label>
          <label>
            이메일
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) => setFormState({ ...formState, email: event.target.value })}
              placeholder="hello@example.com"
            />
          </label>
          <label>
            연락처
            <input
              value={formState.phone}
              onChange={(event) => setFormState({ ...formState, phone: event.target.value })}
              placeholder="010-1234-5678"
            />
          </label>
          <label>
            업종 또는 서비스
            <input
              value={formState.business}
              onChange={(event) => setFormState({ ...formState, business: event.target.value })}
              placeholder="카페, 병원, 개인 브랜드 등"
            />
          </label>
          <label className="full-width">
            요청사항
            <textarea
              required
              rows={5}
              value={formState.details}
              onChange={(event) => setFormState({ ...formState, details: event.target.value })}
              placeholder="원하는 분위기, 참고 사이트, 필요한 일정 등을 적어주세요."
            />
          </label>
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "전송 중..." : "문의 보내기"}
            </button>
            <p>{status}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
