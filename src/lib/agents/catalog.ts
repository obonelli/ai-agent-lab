export type AgentKey = "sales" | "documents" | "operations";

export type AgentDefinition = {
  key: AgentKey;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  outcome: string;
  icon: string;
  preset: string;
  promptLabel: string;
};

export const AGENTS: AgentDefinition[] = [
  {
    key: "sales",
    name: "Sales Agent",
    shortName: "Sales",
    eyebrow: "CRM · WhatsApp · Follow-up",
    description:
      "Qualifies prospects, checks commercial information, suggests the next step, and keeps the CRM updated.",
    outcome: "Faster response times without losing human follow-up.",
    icon: "↗",
    preset:
      "I want a quote for 20 devices for a clinic. I need delivery this month and 30-day payment terms.",
    promptLabel: "Simulate a message from a prospect",
  },
  {
    key: "documents",
    name: "Document Agent",
    shortName: "Documents",
    eyebrow: "PDF · XML · Rules · ERP",
    description:
      "Extracts data, cross-checks documents against business rules, and separates automated actions from cases that require review.",
    outcome: "Less manual data entry and fewer errors in document-based processes.",
    icon: "⌁",
    preset:
      "Analyze the invoice from Proveedora Norte and validate the total, RFC, UUID, and purchase order.",
    promptLabel: "Describe the document that should be reviewed",
  },
  {
    key: "operations",
    name: "Operations Agent",
    shortName: "Operations",
    eyebrow: "Orders · SLA · Incidents",
    description:
      "Checks internal systems, detects exceptions, and executes allowed actions before escalating to a person.",
    outcome: "Faster and more traceable operations without hiding exceptions.",
    icon: "⚙",
    preset:
      "Where is order 54291? If it is delayed, create an incident and prepare a notification for the customer.",
    promptLabel: "Ask for an operational action",
  },
];

export function getAgent(key: AgentKey) {
  const agent = AGENTS.find((item) => item.key === key);
  if (!agent) throw new Error(`Unknown agent: ${key}`);
  return agent;
}