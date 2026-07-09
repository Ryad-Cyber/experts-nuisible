import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  location?: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, phone, email, service, location, message } = body as Record<string, unknown>;

  const phoneOk = isNonEmptyString(phone);
  const emailStr = typeof email === "string" ? email.trim() : "";

  // Reject a malformed email if one was provided.
  if (emailStr.length > 0 && !isValidEmail(emailStr)) return null;

  // The only requirement: at least one contact method (phone or a valid email).
  const emailOk = emailStr.length > 0;
  if (!phoneOk && !emailOk) return null;

  return {
    name: optionalString(name),
    phone: optionalString(phone),
    email: emailOk ? emailStr : undefined,
    service: optionalString(service),
    location: optionalString(location),
    message: optionalString(message),
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
      { error: "Merci de renseigner au moins un moyen de contact : téléphone ou e-mail." },
      { status: 400 }
    );
  }

  const serviceText = payload.service ? serviceLabel(payload.service) : "non renseigné";

  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Experts Nuisible <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: payload.service
      ? `Nouvelle demande de devis — ${serviceText}`
      : "Nouvelle demande de devis",
    text: [
      `Nom : ${payload.name || "non renseigné"}`,
      `Téléphone : ${payload.phone || "non renseigné"}`,
      `Email : ${payload.email || "non renseigné"}`,
      `Type de nuisible : ${serviceText}`,
      `Zone concernée : ${payload.location || "non renseignée"}`,
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
