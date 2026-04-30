export default async function handler(req, res) {
  try {
    const targetUrl = "https://flexhp.kr/pages/chat/adWG807lhUNVI5nZFb1iPw6MjstmfxLq";

    // =========================
    // 1. Flex 채팅 HTML 가져오기 (Referer 포함)
    // =========================
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://flexhp.kr/"
      },
    });

    let html = await response.text();

    // =========================
    // ✅ [1] 경로 보정 (JS/CSS 깨짐 방지)
    // =========================
    // 깊은 경로 먼저
    html = html.replace(/src="\.\.\/\.\.\//g, 'src="https://flexhp.kr/');
    html = html.replace(/href="\.\.\/\.\.\//g, 'href="https://flexhp.kr/');

    // 그 다음 1단계
    html = html.replace(/src="\.\.\//g, 'src="https://flexhp.kr/');
    html = html.replace(/href="\.\.\//g, 'href="https://flexhp.kr/');

    // 🔥 win_chat.js 보정 (필수)
    html = html.replace(
      'src="https://flexhp.kr/win_chat.js',
      'src="https://flexhp.kr/pages/chat/win_chat.js'
    );

    // =========================
    // 2. 커스텀 CSS
    // =========================
    const customCSS = `
    <style>
      /* 내부 margin 제거 */
      .chat-list li p {
        margin: 0 !important;
      }

      /* 세트 간 간격 (gap 방식) */
      .chat-list {
        display: flex;
        flex-direction: column;
        gap: 4px !important;
      }

      .chat-list li {
        margin: 0 !important;
      }

      /* 닉네임 / 채팅 간격 */
      .nickname {
        margin: 0 0 2px 0 !important;
      }

      .txt {
        margin: 0 !important;
        white-space: pre-wrap !important;
        line-height: 1.2 !important;
        word-break: break-word !important;
      }

      /* 불필요 패딩 제거 */
      .chat-list-area {
        padding: 0 !important;
      }

      /* 전체 레이아웃 안정화 */
      body {
        margin: 0 !important;
        overflow: hidden !important;
      }
    </style>
    `;

    // =========================
    // 4. CSS 삽입
    // =========================
    if (html.includes("</head>")) {
      html = html.replace("</head>", `${customCSS}</head>`);
    } else {
      html = customCSS + html;
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // 👉 iframe / 외부 실행 허용
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *");

    // 👉 캐싱 방지 (실시간 채팅 필수)
    res.setHeader("Cache-Control", "no-store");

    res.status(200).send(html);

  } catch (err) {
    res.status(500).send("Error fetching chat overlay");
  }
}