/**
 * Agent Architect types and interfaces
 */

export interface Session {
  id: string;
  intake: IntakeData;
  createdAt: string;
  lastActivity: string;
}

export interface IntakeData {
  website_url?: string;
  instagram_url?: string;
  business_type: string;
  primary_goal: string;
  channels: string[];
  current_tools: string;
  budget: string;
  phone: string;
  email: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AgentReply {
  reply: string;
  blocks: AgentBlocks;
}

export interface AgentBlocks {
  summary: string;
  recommendations: Recommendation[];
  ideas: Idea[];
  plan_7d: DayPlan[];
  tips?: string[];
}

export interface Recommendation {
  title: string;
  goal: string;
  recipe: string;
  tools: string[];
  est_time: string;
  impact: "L" | "M" | "H";
}

export interface Idea {
  title: string;
  revenue_model: string;
  first_step: string;
  target_channels: string[];
}

export interface DayPlan {
  day: number;
  tasks: string[];
  success_criteria: string;
}

export interface NewSessionRequest {
  website_url?: string;
  instagram_url?: string;
  business_type: string;
  primary_goal: string;
  channels: string[];
  current_tools: string;
  budget: string;
  phone: string;
  email: string;
  consent: boolean;
  hp_token: string;
  utm?: Record<string, string>;
}

export interface ChatMessageRequest {
  session_id: string;
  message: string;
  hp_token: string;
  utm?: Record<string, string>;
}

export interface NewSessionResponse {
  ok: boolean;
  session_id?: string;
  message?: string;
  error?: string;
}

export interface ChatMessageResponse {
  ok: boolean;
  reply?: string;
  blocks?: AgentBlocks;
  session_id?: string;
  error?: string;
}
