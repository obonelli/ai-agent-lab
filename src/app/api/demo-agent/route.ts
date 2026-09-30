import OpenAI from "openai";
import { z } from "zod";

import type { AgentKey } from "@/lib/agents/catalog";
import { runDemoTools } from "@/lib/agents/demo-tools";

export const runtime = "nodejs";
export const maxDuration = 30;

const RequestSchema = z.object({
  agent: z.enum(["sales", "documents", "operations"]),
  input: z.string().trim().min(2).max(1200),
  context: z
    .object({
      fileName: z.string().trim().max(180).optional(),
    })
    .optional(),
});

async function narrateWithGroq(
  agent: AgentKey,
  input: string,
  run: ReturnType<typeof runDemoTools>,
) {
  const groqEnabled =
    process.env.AGENT_DEMO_MODE === "groq" &&
    Boolean(process.env.GROQ_API_KEY);

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

  console.log("────────────────────────────────────");
  console.log("🤖 AI Agent Lab");
  console.log("Mode:", process.env.AGENT_DEMO_MODE || "not configured");
  console.log("Groq key configured:", Boolean(process.env.GROQ_API_KEY));
  console.log("Model:", model);

  if (!groqEnabled) {
    console.log("🟡 Using deterministic MOCK fallback");
    console.log("────────────────────────────────────");

    return {
      run,
      provider: "mock" as const,
      model: null,
    };
  }

  try {
    console.log("🚀 Calling Groq...");

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model,
      temperature: 0.2,
      max_tokens: 350,
      messages: [
        {
          role: "system",
          content:
            "Eres la capa de conversación de una demo pública de agentes empresariales. Responde en español claro, breve y profesional. No inventes herramientas, datos ni acciones: usa exclusivamente la evidencia del JSON recibido. No afirmes que una acción real ocurrió si la evidencia indica que es simulada. Devuelve solo la respuesta final al usuario, sin markdown.",
        },
        {
          role: "user",
          content: `Agente: ${agent}\nPetición: ${input}\nEvidencia simulada: ${JSON.stringify(run)}`,
        },
      ],
    });

    const answer = response.choices[0]?.message?.content?.trim();

    console.log("✅ GROQ RESPONSE RECEIVED");
    console.log("Model:", response.model);
    console.log("Response ID:", response.id);
    console.log("Tokens:", {
      prompt: response.usage?.prompt_tokens,
      completion: response.usage?.completion_tokens,
      total: response.usage?.total_tokens,
    });
    console.log("Answer:", answer);
    console.log("────────────────────────────────────");

    if (!answer) {
      console.log("⚠️ Groq returned an empty answer. Using fallback.");

      return {
        run,
        provider: "mock" as const,
        model: null,
      };
    }

    return {
      run: {
        ...run,
        answer,
      },
      provider: "groq" as const,
      model: response.model || model,
    };
  } catch (error) {
    console.error("❌ Groq narration failed");
    console.error(error);
    console.log("🟡 Using deterministic MOCK fallback");
    console.log("────────────────────────────────────");

    return {
      run,
      provider: "mock" as const,
      model: null,
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          error: "Solicitud inválida",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { agent, input, context } = parsed.data;

    console.log("");
    console.log("====================================");
    console.log("🧠 EXECUTING AGENT");
    console.log("Agent:", agent);
    console.log("Input:", input);
    console.log("====================================");

    const deterministicRun = runDemoTools(agent, input, context);

    const result = await narrateWithGroq(
      agent,
      input,
      deterministicRun,
    );

    console.log(
      result.provider === "groq"
        ? "🟢 FINAL PROVIDER: GROQ"
        : "🟡 FINAL PROVIDER: MOCK",
    );

    return Response.json({
      ok: true,
      run: result.run,
      meta: {
        provider: result.provider,
        model: result.model,
      },
    });
  } catch (error) {
    console.error("Demo agent error", error);

    return Response.json(
      {
        ok: false,
        error: "No fue posible ejecutar la demo.",
      },
      { status: 500 },
    );
  }
}