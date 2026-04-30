export default async function handler(req, res) {
  try {
    const targetUrl = "https://flexhp.kr/pages/chat/adWG807lhUNVI5nZFb1iPw6MjstmfxLq";

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let html = await response.text();

    // =========================
    // ✅ 1. base 태그 추가
    // =========================
    const baseTag = `<base href="https://flexhp.kr/">`;

    html = html.replace("<head>", `<head>${baseTag}`);

    // =========================
    // ✅ 2. CSS 삽입
    // =========================
    const customCSS = `
    <style>
      .chat-list li p { margin: 0 !important; }

      .chat-list {
        display: flex;
        flex-direction: column;
        gap: 4px !important;
      }

      .chat-list li { margin: 0 !important; }

      .nickname { margin: 0 0 2px 0 !important; }

      .txt {
        margin: 0 !important;
        white-space: pre-wrap !important;
        line-height: 1.2 !important;
        word-break: break-word !important;
      }

      .chat-list-area {
        padding: 0 !important;
      }

      body {
        margin: 0 !important;
        overflow: hidden !important;
      }
    </style>
    `;

    // head 닫히기 전에 삽입
    html = html.replace("</head>", `${customCSS}</head>`);

    // =========================
    // ✅ 3. 캐싱 방지 (추가 권장)
    // =========================
    res.setHeader("Cache-Control", "no-store");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);

  } catch (err) {
    res.status(500).send("Error fetching chat overlay");
  }
}