import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, phone, email, service, message } = body as Record<string, unknown>;

  if (!isNonEmptyString(name) || !isNonEmptyString(phone) || !isNonEmptyString(service)) {
    return null;
  }
  if (typeof email === "string" && email.length > 0 && !isValidEmail(email)) {
    return null;
  }

  return {
    name: name.trim(),
    phone: phone.trim(),
    email: typeof email === "string" ? email.trim() : undefined,
    service: service.trim(),
    message: typeof message === "string" ? message.trim() : undefined,
  };
}

function serviceLabel(serviceId: string): string {
  if (serviceId === "autre") return "Autre";
  return services.find((s) => s.id === serviceId)?.title ?? serviceId;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas configuré." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Merci de renseigner votre nom, votre téléphone et le type de nuisible." },
      { status: 400 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Experts Nuisible <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: `Nouvelle demande de devis — ${serviceLabel(payload.service)}`,
    text: [
      `Nom : ${payload.name}`,
      `Téléphone : ${payload.phone}`,
      `Email : ${payload.email || "non renseigné"}`,
      `Type de nuisible : ${serviceLabel(payload.service)}`,
      "",
      "Message :",
      payload.message || "(aucun message)",
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Merci de réessayer ou d'appeler directement." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
