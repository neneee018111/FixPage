# FixPage

Next.js 기반의 웹개발 외주용 MVP입니다. 고객이 옵션을 고르고 예상 견적을 확인한 뒤 바로 문의를 보낼 수 있게 구성했습니다.

## Included

- 서비스 옵션 선택형 견적 계산기
- 예상 합계 요약 패널
- 문의 폼
- `app/api/inquiry` API 라우트

## Run

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 확인할 수 있습니다.

## Next step

- `app/api/inquiry/route.ts`를 `Resend` 또는 다른 메일 서비스와 연결
- 옵션별 가격과 문구를 실제 판매 패키지 기준으로 조정
- Vercel에 배포
