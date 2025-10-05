import { generateAgentMetaFromContent } from "@/lib/seo/pageMeta";
import agentContent from "@/lib/content/agent";
import AgentPageClient from "./AgentPageClient";

export const metadata = generateAgentMetaFromContent(agentContent);

export default function AgentPage() {
  return <AgentPageClient />;
}
