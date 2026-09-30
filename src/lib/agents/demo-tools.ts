import type { AgentKey } from "./catalog";

export type AgentStep = {
  tool: string;
  title: string;
  detail: string;
  status: "success" | "warning";
  payload?: Record<string, string | number | boolean>;
};

export type AgentMetric = {
  label: string;
  value: string;
};

export type AgentRun = {
  agent: AgentKey;
  headline: string;
  answer: string;
  steps: AgentStep[];
  metrics: AgentMetric[];
  artifacts?: Array<{
    label: string;
    value: string;
  }>;
  demoNotice: string;
};

type RunContext = {
  fileName?: string;
};

function salesRun(input: string): AgentRun {
  const rush = /urgent|this month|today|tomorrow/i.test(input);
  const quantityMatch = input.match(/\b(\d{1,3})\b/);
  const quantity = quantityMatch ? Number(quantityMatch[1]) : 12;
  const unitPrice = 18950;
  const subtotal = quantity * unitPrice;

  return {
    agent: "sales",
    headline: "Prospect qualified and next step ready",
    answer:
      `I detected strong purchase intent. I prepared a demo quote for ${quantity} devices for ${new Intl.NumberFormat("en-US", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(subtotal)} before VAT, validated simulated availability, and prepared a follow-up for the sales executive. ${rush ? "The requested delivery date requires logistics confirmation before committing to it." : "The delivery window fits within the demo commercial SLA."}`,
    steps: [
      {
        tool: "intent.classify",
        title: "Understood the intent",
        detail: "Detected a B2B quote request, quantity, delivery window, and payment terms.",
        status: "success",
      },
      {
        tool: "crm.lookup",
        title: "Checked CRM",
        detail: "Found a demo account with commercial history and an active contact.",
        status: "success",
        payload: { account: "Clínica Nova", owner: "B2B Sales" },
      },
      {
        tool: "catalog.quote",
        title: "Checked catalog and pricing",
        detail: `${quantity} units available in the simulated catalog at $18,950 MXN each.`,
        status: "success",
      },
      {
        tool: "policy.credit_terms",
        title: "Validated commercial policy",
        detail: "30-day payment terms are allowed subject to credit limit approval.",
        status: "warning",
      },
      {
        tool: "crm.next_action",
        title: "Prepared follow-up",
        detail: "Quote registered and follow-up task created for the sales executive.",
        status: "success",
      },
    ],
    metrics: [
      { label: "Lead score", value: rush ? "92/100" : "86/100" },
      { label: "Simulated time", value: "7.4 s" },
      { label: "Actions", value: "5" },
    ],
    artifacts: [
      { label: "Quote", value: `Q-${String(4281 + quantity)}` },
      { label: "Next step", value: "Sales call" },
    ],
    demoNotice: "CRM, pricing, inventory, and actions are simulated data for demonstration purposes.",
  };
}

function documentsRun(input: string, context: RunContext): AgentRun {
  const fileName = context.fileName || "north_supplier_invoice.pdf";

  return {
    agent: "documents",
    headline: "Document extracted and validated against rules",
    answer:
      "The demo invoice is consistent across RFC, UUID, subtotal, and VAT. The total matches the purchase order, but the receipt date falls outside the configured tolerance, so the agent does not post it automatically and routes it for human review.",
    steps: [
      {
        tool: "document.ingest",
        title: "Received the document",
        detail: `${fileName} passed basic file type and size validations.`,
        status: "success",
      },
      {
        tool: "document.extract",
        title: "Extracted key fields",
        detail: "RFC, UUID, PO, subtotal, VAT, total, and issue date were structured.",
        status: "success",
      },
      {
        tool: "erp.purchase_order",
        title: "Checked the purchase order",
        detail: "PO 45001923 found; amount is within tolerance.",
        status: "success",
      },
      {
        tool: "rules.three_way_match",
        title: "Applied business rules",
        detail: "Amounts match. The receipt date exceeds the 3-day tolerance.",
        status: "warning",
      },
      {
        tool: "workflow.route",
        title: "Routed the exception",
        detail: "Case sent for human review with evidence and a prefilled reason.",
        status: "success",
      },
    ],
    metrics: [
      { label: "Extracted fields", value: "8/8" },
      { label: "Confidence", value: "97%" },
      { label: "Rules", value: "6" },
    ],
    artifacts: [
      { label: "RFC", value: "PNO920415KT7" },
      { label: "UUID", value: "A91F…7C20" },
      { label: "Purchase order", value: "45001923" },
      { label: "Total", value: "$184,320 MXN" },
    ],
    demoNotice: `The contents of ${fileName} are not sent to a real ERP; the extraction and validation shown are simulated.`,
  };
}

function operationsRun(input: string): AgentRun {
  const orderMatch = input.match(/\b\d{4,8}\b/);
  const order = orderMatch?.[0] ?? "54291";

  return {
    agent: "operations",
    headline: "Exception detected and contained before escalation",
    answer:
      `Order ${order} appears to be in transit and is 18 hours behind the demo SLA. I opened a simulated incident, prepared the customer message, and left the case ready for operations to decide whether compensation should be authorized. No sensitive action was executed without human approval.`,
    steps: [
      {
        tool: "orders.lookup",
        title: "Checked the order",
        detail: `Order ${order} found: IN TRANSIT.`,
        status: "success",
      },
      {
        tool: "carrier.track",
        title: "Checked the carrier",
        detail: "Latest event: regional distribution center, 11 hours ago.",
        status: "success",
      },
      {
        tool: "sla.evaluate",
        title: "Evaluated the SLA",
        detail: "Estimated delivery is 18 hours beyond the commitment.",
        status: "warning",
      },
      {
        tool: "tickets.create",
        title: "Created incident",
        detail: "INC-8821 created with medium priority and attached evidence.",
        status: "success",
      },
      {
        tool: "customer.message",
        title: "Prepared communication",
        detail: "Message drafted and pending approval before being sent.",
        status: "success",
      },
    ],
    metrics: [
      { label: "SLA deviation", value: "+18 h" },
      { label: "Systems", value: "4" },
      { label: "Escalation", value: "Human" },
    ],
    artifacts: [
      { label: "Incident", value: "INC-8821" },
      { label: "Status", value: "Pending approval" },
    ],
    demoNotice: "Orders, tracking, incidents, and messages are simulated to demonstrate agent orchestration.",
  };
}

export function runDemoTools(
  agent: AgentKey,
  input: string,
  context: RunContext = {},
): AgentRun {
  if (agent === "sales") return salesRun(input);
  if (agent === "documents") return documentsRun(input, context);
  return operationsRun(input);
}