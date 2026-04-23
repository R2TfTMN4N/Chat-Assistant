# Chat Assistants Application - Navigation Table

**Project:** Chat Assistants - AI Customer Support Platform  
**Version:** 0.5  
**Last Updated:** December 26, 2025

---

## Main Screen

### Left Menu

| # | Link Label | Link to | Description |
|---|------------|---------|-------------|
| **Actor: Admin** |
| 1 | Dashboard | Link to "/" route | Main dashboard overview showing organization summary |
| 2 | Conversations | Link to "/conversations" view | View all customer support conversations with status filters (unresolved, escalated, resolved) |
| 3 | Conversation Detail | Link to "/conversations/[conversationId]" view | View detailed conversation thread with message history, contact info, and chat interface |
| 4 | Knowledge Base | Link to "/files" view (Premium) | Upload and manage knowledge base documents (PDF, Word, Text) for AI agent training |
| 5 | Widget Customization | Link to "/customization" view (Premium) | Configure widget appearance, greeting message, and suggested questions |
| 6 | Integrations | Link to "/integrations" view | View and copy embed code (HTML, JavaScript, React, Next.js) for widget integration |
| 7 | Voice Assistant | Link to "/plugins/vapi" view (Premium) | Configure VAPI voice assistant with phone numbers and assistant selection |
| 8 | Plans & Billing | Link to "/billing" view | View current subscription status, upgrade to Pro plan, or manage billing |
| **Actor: Team Member** |
| 9 | Conversations | Link to "/conversations" view | View all customer support conversations (same as Admin with limited permissions) |
| 10 | Conversation Detail | Link to "/conversations/[conversationId]" view | View and respond to customer messages, escalate or resolve conversations |
| **Actor: Customer** |
| 11 | Chat Widget | Link to Widget app "/?organizationId={id}" | Embedded chat interface for customers to interact with AI assistant |
| 12 | Contact Form | Widget screen: WidgetContactScreen | Enter name and email to create contact session (24-hour expiry) |
| 13 | Auth Screen | Widget screen: WidgetAuthScreen | Authentication screen for returning customers |
| 14 | Selection Screen | Widget screen: WidgetSelectionScreen | Choose between text chat or voice call options |
| 15 | Chat Screen | Widget screen: WidgetChatScreen | Text-based conversation interface with AI agent and human support |
| 16 | Voice Screen | Widget screen: WidgetVoiceScreen | VAPI voice call interface with connection status and transcript |
| 17 | Inbox Screen | Widget screen: WidgetInboxScreen | View conversation history and past messages |

---

## Authentication & Authorization

| # | Link Label | Link to | Description |
|---|------------|---------|-------------|
| 18 | Sign In | Link to "/sign-in" route | Clerk-powered authentication for Admin/Team Member |
| 19 | Sign Up | Link to "/sign-up" route | Create new account with Clerk authentication |
| 20 | Organization Selection | Link to "/org-selection" route | Select or create organization after sign-in |
| 21 | User Profile | Clerk UserButton component | View and edit personal information, change password |

---

## Key Features by Actor

### Admin Only Features
- Create/manage organization
- Invite/remove team members
- Upload knowledge base documents (Premium)
- Configure widget customization (Premium)
- Configure VAPI voice assistant (Premium)
- View embed code and copy organization ID
- Manage subscription and billing
- Full access to all conversations

### Team Member Features
- View all organization conversations
- Respond to customer messages
- Update conversation status (escalate/resolve)
- **Cannot** chat when conversation status is "unresolved" (AI handling)
- Limited access compared to Admin

### Customer Features
- Create contact session with name/email
- Start new conversations
- Send text messages to AI agent
- Make voice calls (if VAPI enabled)
- View conversation history in current session
- Receive AI-powered responses from knowledge base
- Select from suggested questions
- Get escalated to human support when needed

---

## Premium Features (Pro Plan Required)

The following features require an active Pro subscription:

| Feature | Route | Component | Description |
|---------|-------|-----------|-------------|
| Knowledge Base | /files | FilesView | Upload documents (PDF, DOC, TXT) for AI training |
| Widget Customization | /customization | CustomizationView | Configure greeting message, suggested questions, theme |
| Voice Assistant | /plugins/vapi | VapiView | Configure VAPI integration with phone numbers and assistants |

**Free Plan Limitations:**
- No document uploads
- No widget customization
- No voice assistant
- AI agent responses disabled (manual support only)

---

## Conversation Status Flow

| Status | Description | Chat Enabled | Who Responds |
|--------|-------------|--------------|--------------|
| Unresolved | Initial state when conversation created | ❌ No (Admin/Team blocked) | AI Agent only |
| Escalated | Manually escalated by clicking "Unresolved" button | ✅ Yes | Admin/Team Member |
| Resolved | Conversation closed | ❌ No (Chat disabled) | None |

**Status Transition Rules:**
- New conversations start as "unresolved"
- Admin/Team can escalate "unresolved" → "escalated" to take over
- Admin/Team can resolve conversations from any status
- Customer cannot change status

---

## Technical Routes

### Web App (Admin/Team Dashboard)
```
/                                    → Dashboard home
/conversations                       → Conversations list
/conversations/[conversationId]      → Conversation detail
/files                              → Knowledge base (Premium)
/customization                       → Widget settings (Premium)
/integrations                        → Embed code
/plugins/vapi                        → Voice assistant (Premium)
/billing                            → Subscription management
/sign-in/[[...sign-in]]             → Sign in
/sign-up/[[...sign-up]]             → Sign up
/org-selection/[[...org-selection]] → Organization picker
```

### Widget App (Customer Interface)
```
/?organizationId={id}               → Widget main view
  ↳ WidgetContactScreen             → Contact info entry
  ↳ WidgetAuthScreen                → Returning user auth
  ↳ WidgetSelectionScreen           → Choose chat/voice
  ↳ WidgetChatScreen                → Text chat interface
  ↳ WidgetVoiceScreen               → VAPI voice call
  ↳ WidgetInboxScreen               → Message history
  ↳ WidgetLoadingScreen             → Loading state
  ↳ WidgetErrorScreen               → Error state
```

---

## Sidebar Navigation Structure

### Customer Support Section
- **Conversations** (InboxIcon) → `/conversations`
- **Knowledge Base** (LibraryIcon) → `/files` (Premium)

### Configurations Section
- **Widget Customization** (PaletteIcon) → `/customization` (Premium)
- **Integrations** (LayoutDashboardIcon) → `/integrations`
- **Voice Assistant** (MicIcon) → `/plugins/vapi` (Premium)

### Account Section
- **Plans & Billing** (CreditCardIcon) → `/billing`

### Header Components
- Organization Switcher (Clerk component)

### Footer Components
- User Button (Clerk component with profile/sign out)

---

## Database Schema Overview

### Main Tables
1. **users** - Admin and Team Member accounts (Clerk-managed)
2. **organizations** - Organization/company entities
3. **subscriptions** - Billing and subscription status
4. **contacts** - Customer contact sessions (24-hour expiry)
5. **conversations** - Support conversation threads
6. **messages** - Chat message records
7. **documents** - Knowledge base files with processing status
8. **plugins** - Third-party integrations (e.g., VAPI)
9. **widgetSettings** - Customization configuration

### Key Relationships
- Organizations → Subscriptions (1:1)
- Organizations → Users (1:N via Clerk)
- Organizations → Contacts (1:N)
- Contacts → Conversations (1:N)
- Conversations → Messages (1:N)
- Organizations → Documents (1:N)
- Organizations → Plugins (1:N)
- Organizations → WidgetSettings (1:1)

---

## Component Architecture

### Packages Structure
```
packages/
  ├── backend/          → Convex backend (mutations, queries, actions)
  ├── ui/               → Shared UI components (shadcn/ui)
  ├── eslint-config/    → ESLint configurations
  └── typescript-config/ → TypeScript configurations
```

### Apps Structure
```
apps/
  ├── web/              → Admin/Team dashboard (Next.js)
  │   ├── app/          → Next.js App Router
  │   └── modules/      → Feature modules
  │       ├── auth/
  │       ├── billing/
  │       ├── customization/
  │       ├── dashboard/
  │       ├── integrations/
  │       └── plugins/
  ├── widget/           → Customer chat widget (Next.js)
  │   └── modules/widget/
  └── embed/            → Widget embed script (Vite)
```

---

## External Integrations

| Integration | Purpose | Configuration |
|-------------|---------|---------------|
| Clerk | Authentication & user management | Automatic with API keys |
| Convex | Backend database & real-time sync | @workspace/backend package |
| VAPI | Voice assistant for phone calls | Configured in /plugins/vapi |
| AWS Secrets Manager | Secure plugin credential storage | Via Convex actions |
| OpenAI | AI agent text generation | Integrated with Convex agent |
| Pinecone | Vector database for knowledge base | RAG implementation |

---

**Notes:**
- Routes marked with (Premium) require active Pro subscription
- All `/conversations` access requires Admin or Team Member role
- Customer access requires valid contact session (24-hour expiry)
- Widget embedding requires valid organization ID
- Subscription status checked on backend for AI responses
