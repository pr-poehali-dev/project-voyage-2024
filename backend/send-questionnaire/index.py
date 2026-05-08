import os
import json
import urllib.request

TELEGRAM_CHAT_ID = "1013290919"


def handler(event: dict, context) -> dict:
    """Получает данные анкеты и отправляет их в Telegram"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body", "{}"))

    name = body.get("name", "—")
    phone = body.get("phone", "—")
    region = body.get("region", "—")
    employment_status = body.get("employmentStatus", "—")
    last_job_date = body.get("lastJobDate", "—")
    reason = body.get("reason", "—")
    has_documents = body.get("hasDocuments", "—")
    benefits = body.get("benefits", [])
    comment = body.get("comment", "")

    benefits_str = ", ".join(benefits) if benefits else "—"

    text = (
        "📋 <b>Новая анкета с сайта</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"📍 <b>Регион:</b> {region}\n\n"
        f"💼 <b>Ситуация:</b> {employment_status}\n"
        f"📅 <b>Последнее место работы:</b> {last_job_date}\n"
        f"❓ <b>Причина увольнения:</b> {reason}\n\n"
        f"📁 <b>Документы:</b> {has_documents}\n"
        f"🆘 <b>Нужна помощь:</b> {benefits_str}\n"
    )

    if comment:
        text += f"\n💬 <b>Комментарий:</b> {comment}"

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"

    payload = json.dumps({
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    urllib.request.urlopen(req)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
