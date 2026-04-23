# 2.2.2. Domain Objects Description

| # | Object Name | Object Description | Applies To |
|---|-------------|-------------------|------------|
| 1 | Organization | A business tenant that owns the chat assistant system. Managed by Clerk. | Web |
| 2 | Subscription | Tracks the payment status of an organization. Enables or disables AI agent responses. | Web |
| 3 | TeamMember | Staff members or agents who manage conversations and settings in the admin dashboard. | Web |
| 4 | WidgetSettings | Configuration for the chat widget appearance and behavior (greeting message, suggestions, voice settings). | Web |
| 5 | Plugin | Third-party service integrations (e.g., VAPI for voice calls). | Web |
| 6 | Secret | Encrypted API credentials for plugins, stored in AWS Secrets Manager. | Web |
| 7 | Customer | End users who chat with the AI assistant through the widget. | Widget |
| 8 | ContactSession | Temporary session that authenticates a customer in the widget. Expires after 24 hours. | Widget |
| 9 | Conversation | A complete support session between a customer and the AI agent. Has status: unresolved, escalated, or resolved. | Both |
| 10 | Message | Individual chat messages exchanged between customer and AI agent. | Both |
| 11 | KnowledgeDocument | Company documentation or FAQs uploaded to help the AI agent answer questions accurately. | Web |
| 12 | EmbeddingVector | Vectorized chunks of knowledge documents for semantic search. | Web |
| 13 | Thread | AI conversation thread that stores message history and context for the support agent. | Both |
| 14 | User | Basic user record for tracking agents or staff (currently minimal implementation). | Web |

---

**Business Requirements:** AI Customer Support App, Version 0.5  
**Prepared by:** Development Team  
**Last modified:** December 20, 2025
