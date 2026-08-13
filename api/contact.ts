/* ==========================================================
   IVANKAY.ORG
   CONTACT API
   Vercel Serverless Function + Resend
   ========================================================== */

type ContactRequest = {
  name?: unknown;
  organization?: unknown;
  email?: unknown;
  message?: unknown;
  source?: unknown;
};


function cleanString(
  value: unknown,
  maxLength: number,
): string {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, maxLength);

}


function escapeHtml(
  value: string,
): string {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function isValidEmail(
  value: string,
): boolean {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );

}


export default async function handler(
  request: any,
  response: any,
) {

  if (request.method !== "POST") {

    response.setHeader(
      "Allow",
      "POST",
    );

    return response
      .status(405)
      .json({
        error: "Method not allowed.",
      });

  }


  const resendApiKey =
    process.env.RESEND_API_KEY;


  if (!resendApiKey) {

    console.error(
      "RESEND_API_KEY is not configured.",
    );

    return response
      .status(500)
      .json({
        error: "Email service is not configured.",
      });

  }


  const body =
    (request.body ?? {}) as ContactRequest;


  const name =
    cleanString(
      body.name,
      120,
    );

  const organization =
    cleanString(
      body.organization,
      160,
    );

  const email =
    cleanString(
      body.email,
      254,
    );

  const message =
    cleanString(
      body.message,
      5000,
    );

  const source =
    cleanString(
      body.source,
      100,
    ) || "ivankay.org";


  if (
    !name ||
    !organization ||
    !email ||
    !message
  ) {

    return response
      .status(400)
      .json({
        error: "All fields are required.",
      });

  }


  if (!isValidEmail(email)) {

    return response
      .status(400)
      .json({
        error: "Please enter a valid email address.",
      });

  }


  const safeName =
    escapeHtml(name);

  const safeOrganization =
    escapeHtml(organization);

  const safeEmail =
    escapeHtml(email);

  const safeMessage =
    escapeHtml(message)
      .replaceAll(
        "\n",
        "<br />",
      );

  const safeSource =
    escapeHtml(source);


  const resendResponse =
    await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${resendApiKey}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          from:
            "Ivan Kay Website <inquiry@onetimelabs.net>",

          to: [
            "inquiry@onetimelabs.net",
          ],

          reply_to:
            email,

          subject:
            `[ivankay.org] New nonprofit inquiry — ${organization}`,

          html: `
            <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#17231e;">
              <h2 style="margin-bottom:20px;">
                New ivankay.org inquiry
              </h2>

              <p>
                <strong>Name:</strong><br />
                ${safeName}
              </p>

              <p>
                <strong>Organization:</strong><br />
                ${safeOrganization}
              </p>

              <p>
                <strong>Email:</strong><br />
                ${safeEmail}
              </p>

              <p>
                <strong>What's getting in their way?</strong>
              </p>

              <div style="padding:16px;background:#f5f7f5;border-left:4px solid #1f6b4f;">
                ${safeMessage}
              </div>

              <p style="margin-top:24px;font-size:12px;color:#6b756f;">
                Source: ${safeSource}
              </p>
            </div>
          `,

          text:
            [
              "New ivankay.org inquiry",
              "",
              `Name: ${name}`,
              `Organization: ${organization}`,
              `Email: ${email}`,
              "",
              "What's getting in their way?",
              message,
              "",
              `Source: ${source}`,
            ].join("\\n"),
        }),
      },
    );


  if (!resendResponse.ok) {

    const resendError =
      await resendResponse.text();

    console.error(
      "Resend error:",
      resendError,
    );

    return response
      .status(502)
      .json({
        error: "Unable to send message.",
      });

  }


  return response
    .status(200)
    .json({
      success: true,
    });

}