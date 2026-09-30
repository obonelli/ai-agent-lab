# Oscar Bonelli — AI Agent Lab

Demo pública de agentes de IA empresariales construida con **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4**, pensada para desplegarse directamente en **Vercel**.

Incluye tres demos interactivas:

- **Sales Agent**: intención, CRM, catálogo/precio, reglas comerciales y seguimiento.
- **Document Agent**: ingestión de documento, extracción, validación contra OC, reglas y revisión humana.
- **Operations Agent**: consulta de pedido, tracking, SLA, incidencia y aprobación antes de comunicar al cliente.

## Qué demuestra

No es un chatbot estático. La UI muestra explícitamente el patrón de un agente empresarial:

1. Entiende la solicitud.
2. Decide qué herramientas necesita.
3. Consulta sistemas.
4. Aplica reglas del negocio.
5. Ejecuta acciones permitidas.
6. Escala a una persona cuando corresponde.
7. Deja trazabilidad de lo ocurrido.

Los datos del demo son ficticios y no se conectan a sistemas reales.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Modo mock (recomendado para la demo pública)

No requiere ninguna API key. Es el comportamiento por defecto.

```env
AGENT_DEMO_MODE=mock
```

Este modo evita costos y permite que cualquier persona pruebe el sitio sin consumir tokens.

## Modo Groq opcional (Free Plan)

El backend soporta una capa opcional de narración con Groq usando su API compatible con OpenAI. Las herramientas siguen siendo determinísticas/simuladas; el modelo redacta la respuesta usando únicamente la evidencia generada por las herramientas.

```env
AGENT_DEMO_MODE=groq
GROQ_API_KEY=gsk_...
GROQ_MODEL=openai/gpt-oss-120b
```

La API key se usa **solo del lado servidor** en `src/app/api/demo-agent/route.ts`. No uses `NEXT_PUBLIC_GROQ_API_KEY`.

Si Groq falla, falta la key o se alcanza el límite gratuito, la demo vuelve automáticamente a la respuesta determinística.

## Desplegar en Vercel

1. Sube este proyecto a GitHub.
2. En Vercel elige **Add New → Project**.
3. Importa el repositorio.
4. Framework preset: **Next.js**.
5. No necesitas variables de entorno para `mock`.
6. Deploy.

Si quieres usar Groq, agrega `AGENT_DEMO_MODE`, `GROQ_API_KEY` y `GROQ_MODEL` en **Project Settings → Environment Variables** y vuelve a desplegar.

## Dónde conectar sistemas reales

La simulación está centralizada en:

```text
src/lib/agents/demo-tools.ts
```

Para producción, cada bloque `crm.lookup`, `orders.lookup`, `erp.purchase_order`, etc. puede convertirse en un adapter real que llame APIs internas, bases de datos o servicios externos.

El endpoint de orquestación está en:

```text
src/app/api/demo-agent/route.ts
```

## Seguridad para una versión real

Antes de conectar acciones reales agrega como mínimo:

- autenticación y autorización;
- allowlist de herramientas por rol;
- validación estricta de parámetros;
- idempotencia en acciones mutables;
- aprobación humana para acciones sensibles;
- rate limiting;
- auditoría de tool calls;
- protección de secretos server-side;
- límites de costos/tokens;
- manejo de PII y retención de datos según el caso de uso.

## Estructura

```text
src/
  app/
    api/demo-agent/route.ts
    demo/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    brand.tsx
    theme-toggle.tsx
  lib/agents/
    catalog.ts
    demo-tools.ts
```
