export type IntakePayload = {
  website_url: string;
  instagram_url?: string;
  business_type: string;
  primary_goal: string;
  channels: string[];
  current_tools: string; // server expects string; join on client if array UI
  budget: string;
  phone?: string;
  email: string;
  consent: boolean;
  hp_token?: string;
  meta?: Record<string, any>;
};

export type AgentRec = {
  name: string;
  why: string;
  tools: string[];
  complexity: "low" | "medium" | "high";
  est_time: string;
  kpis: string[];
};

export type Analysis = {
  summary: string;
  agents: AgentRec[];
  next_actions: string[];
};

export type AgentResponse = {
  ok: boolean;
  analysis?: Analysis;
  session?: { id: string };
  message?: string;
  fields?: Record<string, string>;
};

export type ChatMessagePayload = {
  session_id: string;
  message: string;
  hp_token?: string;
};



