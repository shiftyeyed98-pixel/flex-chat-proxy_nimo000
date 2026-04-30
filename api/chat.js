export default async function handler(req, res) {
  try {
    const targetUrl = "https://flexhp.kr/pages/chat/adWG807lhUNVI5nZFb1iPw6MjstmfxLq";

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let html = await response.text();

    // 🔥 여기서 CSS 강제 삽입
    const customCSS = `
    <style>
      /* ===== 내부 margin 제거 ===== */
      .chat-list li p {
        margin: 0 !important;
      }

      /* ===== 세트 간 간격 ===== */
      .chat-list {
        display: flex;
        flex-direction: column;
        gap: 4px !important;
      }

      .chat-list li {
        margin: 0 !important;
      }

      /* ===== 닉네임 / 채팅 ===== */
      .nickname {
        margin: 0 0 2px 0 !important;
      }

      .txt {
        margin: 0 !important;
        white-space: pre-wrap !important;
        line-height: 1.2 !important;
        word-break: break-word !important;
      }

      /* ===== 불필요 패딩 제거 ===== */
      .chat-list-area {
        padding: 0 !important;
      }

      body {
        margin: 0 !important;
        overflow: hidden !important;
      }
    </style>
    `;

    // </head> 앞에 CSS 삽입
    html = html.replace("</head>", `${customCSS}</head>`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);

  } catch (err) {
    res.status(500).send("Error fetching chat overlay");
  }
}