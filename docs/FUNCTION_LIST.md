# FUNCTION LIST - CHAT ASSISTANT APPLICATION

**Project Name:** Chat Assistant  
**Implementer:** Development Team  
**Last Modified:** December 20, 2025

---

## **ENVIRONMENT IMPLEMENTATION**

| Stt                                     | Main Function           | Sub-function                        | Web | Mobile | Admin | Customer |
| --------------------------------------- | ----------------------- | ----------------------------------- | --- | ------ | ----- | -------- |
| **1. AUTHENTICATION & USER MANAGEMENT** |
| 1                                       |                         | Sign In                             | x   |        | x     |          |
| 2                                       |                         | Sign Up                             | x   |        | x     |          |
| 3                                       |                         | Change Password                     | x   |        | x     |          |
| 4                                       |                         | Edit Personal Information           | x   |        | x     |          |
| 5                                       |                         | View User Profile                   | x   |        | x     |          |
| **2. ORGANIZATION MANAGEMENT**          |
| 6                                       | Organization Management | Create Organization                 | x   |        | x     |          |
| 7                                       |                         | View Organizations                  | x   |        | x     |          |
| 8                                       |                         | Switch Organization                 | x   |        | x     |          |
| 9                                       |                         | Validate Organization               | x   |        | x     |          |
| 10                                      | Team Member Management  | Invite Team Member                  | x   |        | x     |          |
| 11                                      |                         | View Team Members                   | x   |        | x     |          |
| 12                                      |                         | Remove Team Member                  | x   |        | x     |          |
| 13                                      |                         | Update Member Role                  | x   |        | x     |          |
| **3. SUBSCRIPTION MANAGEMENT**          |
| 14                                      | Subscription Management | View Subscription Status            | x   |        | x     |          |
| 15                                      |                         | Upgrade Subscription Plan           | x   |        | x     |          |
| 16                                      |                         | Cancel Subscription                 | x   |        | x     |          |
| 17                                      |                         | Check Subscription Validity         | x   |        | x     |          |
| **4. WIDGET CONFIGURATION**             |
| 18                                      | Widget Settings         | View Widget Settings                | x   |        | x     |          |
| 19                                      |                         | Update Greeting Message             | x   |        | x     |          |
| 20                                      |                         | Configure Suggested Questions       | x   |        | x     |          |
| 21                                      |                         | Configure VAPI Settings             | x   |        | x     |          |
| 22                                      |                         | Update Widget Theme                 | x   |        | x     |          |
| **5. WIDGET EMBEDDING & INTEGRATION**   |
| 23                                      | Widget Code Integration | View Organization ID                | x   |        | x     |          |
| 24                                      |                         | Copy Organization ID                | x   |        | x     |          |
| 25                                      |                         | View HTML Embed Code                | x   |        | x     |          |
| 26                                      |                         | Copy HTML Embed Code                | x   |        | x     |          |
| 27                                      |                         | View JavaScript Embed Code          | x   |        | x     |          |
| 28                                      |                         | Copy JavaScript Embed Code          | x   |        | x     |          |
| 29                                      |                         | View React Embed Code               | x   |        | x     |          |
| 30                                      |                         | Copy React Embed Code               | x   |        | x     |          |
| 31                                      |                         | View Next.js Embed Code             | x   |        | x     |          |
| 32                                      |                         | Copy Next.js Embed Code             | x   |        | x     |          |
| 33                                      | Plugin Management       | View Connected Plugins              | x   |        | x     |          |
| 34                                      |                         | Add VAPI Plugin                     | x   |        | x     |          |
| 35                                      |                         | Remove Plugin                       | x   |        | x     |          |
| 36                                      |                         | Update Plugin Credentials           | x   |        | x     |          |
| 37                                      |                         | Get VAPI Phone Numbers              | x   |        | x     |          |
| 38                                      |                         | Get VAPI Assistants                 | x   |        | x     |          |
| 39                                      | Secret Management       | Store Plugin Secret                 | x   |        | x     |          |
| 40                                      |                         | Retrieve Plugin Secret              | x   |        | x     |          |
| 41                                      |                         | Update Plugin Secret                | x   |        | x     |          |
| 42                                      |                         | Delete Plugin Secret                | x   |        | x     |          |
| **6. KNOWLEDGE BASE MANAGEMENT**        |
| 43                                      | Knowledge Documents     | Upload Document                     | x   |        | x     |          |
| 44                                      |                         | View Documents List                 | x   |        | x     |          |
| 45                                      |                         | Delete Document                     | x   |        | x     |          |
| 46                                      |                         | Re-process Failed Document          | x   |        | x     |          |
| 47                                      |                         | Generate Storage URL                | x   |        | x     |          |
| 48                                      |                         | Extract Text Content                | x   |        | x     |          |
| 49                                      | RAG (Retrieval)         | Search Knowledge Base               | x   |        | x     |          |
| 50                                      |                         | Create Vector Namespace             | x   |        | x     |          |
| 51                                      |                         | Add Embeddings                      | x   |        | x     |          |
| 52                                      |                         | Query Similar Documents             | x   |        | x     |          |
| **7. CONVERSATION MANAGEMENT**          |
| 53                                      | Conversation Operations | View All Conversations              | x   |        | x     |          |
| 54                                      |                         | View Conversation Details           | x   |        | x     |          |
| 55                                      |                         | Create Conversation                 | x   |        | x     | x        |
| 56                                      |                         | Update Conversation Status          | x   |        | x     |          |
| 57                                      |                         | Escalate Conversation               | x   |        | x     |          |
| 58                                      |                         | Resolve Conversation                | x   |        | x     |          |
| 59                                      |                         | Filter Conversations by Status      | x   |        | x     |          |
| 60                                      |                         | Search Conversations                | x   |        | x     |          |
| 61                                      |                         | Get Conversation by Thread ID       | x   |        | x     |          |
| **8. MESSAGE MANAGEMENT**               |
| 62                                      | Message Operations      | Send Message (Customer)             | x   | x      |       | x        |
| 63                                      |                         | Send Message (Admin/Team)           | x   |        | x     |          |
| 64                                      |                         | View Message History                | x   | x      | x     | x        |
| 65                                      |                         | Generate AI Response                | x   | x      |       | x        |
| 66                                      |                         | Add System Message                  | x   |        | x     |          |
| 67                                      |                         | Commit Message to Thread            | x   | x      | x     | x        |
| **9. CONTACT SESSION MANAGEMENT**       |
| 68                                      | Contact Session         | Create Contact Session              | x   | x      |       | x        |
| 69                                      |                         | Validate Contact Session            | x   | x      |       | x        |
| 70                                      |                         | Refresh Session Expiry              | x   | x      |       | x        |
| 71                                      |                         | Get Session Details                 | x   | x      |       | x        |
| 72                                      |                         | Cleanup Expired Sessions            | x   |        |       |          |
| **10. AI AGENT & TOOLS**                |
| 73                                      | AI Support Agent        | Generate Text Response              | x   | x      |       | x        |
| 74                                      |                         | Fetch Prompt Context                | x   | x      |       | x        |
| 75                                      |                         | Create Thread                       | x   | x      |       | x        |
| 76                                      |                         | List Threads                        | x   | x      | x     | x        |
| 77                                      |                         | List Messages                       | x   | x      | x     | x        |
| 78                                      | AI Tools                | Search Knowledge Base Tool          | x   | x      |       | x        |
| 79                                      |                         | Escalate Conversation Tool          | x   | x      |       | x        |
| 80                                      |                         | Resolve Conversation Tool           | x   | x      | x     |          |
| **11. CUSTOMER WIDGET EXPERIENCE**      |
| 81                                      | Widget Interface        | Display Greeting Message            | x   | x      |       | x        |
| 82                                      |                         | Display Suggested Questions         | x   | x      |       | x        |
| 83                                      |                         | Start Chat Session                  | x   | x      |       | x        |
| 84                                      |                         | Send Chat Message                   | x   | x      |       | x        |
| 85                                      |                         | Receive AI/Human Response           | x   | x      |       | x        |
| 86                                      |                         | View Chat History                   | x   | x      |       | x        |
| 87                                      |                         | Make Voice Call (VAPI)              | x   | x      |       | x        |
| 88                                      |                         | Display Chat Status                 | x   | x      |       | x        |
| **12. REPORTING & ANALYTICS**           |
| 89                                      | Conversation Analytics  | View Conversation Statistics        | x   |        | x     |          |
| 90                                      |                         | Export Conversation Report          | x   |        | x     |          |
| 91                                      |                         | View Resolution Metrics             | x   |        | x     |          |
| 92                                      |                         | View Response Time Analytics        | x   |        | x     |          |
| 93                                      | AI Performance          | View AI Response Rate               | x   |        | x     |          |
| 94                                      |                         | View Escalation Rate                | x   |        | x     |          |
| 95                                      |                         | View Common Unanswered Questions    | x   |        | x     |          |
| 96                                      | Team Performance        | View Member Activity                | x   |        | x     |          |
| 97                                      |                         | View Response Time by Member        | x   |        | x     |          |
| 98                                      |                         | View Active Conversations by Member | x   |        | x     |          |
| **13. SYSTEM ADMINISTRATION**           |
| 99                                      | System Operations       | View System Logs                    | x   |        | x     |          |
| 100                                     |                         | Monitor API Usage                   | x   |        | x     |          |
| 101                                     |                         | Check Health Status                 | x   |        | x     |          |
| 102                                     |                         | Cleanup Expired Data                | x   |        |       |          |
| 103                                     | HTTP Endpoints          | API Key Validation                  | x   |        |       |          |
| 104                                     |                         | Webhook Handler                     | x   |        |       |          |
| 105                                     |                         | File Upload Endpoint                | x   |        | x     |          |
| **14. PLAYGROUND & TESTING**            |
| 106                                     | Playground API          | Validate API Key                    | x   |        | x     |          |
| 107                                     |                         | List Available Agents               | x   |        | x     |          |
| 108                                     |                         | List Users                          | x   |        | x     |          |
| 109                                     |                         | Generate Test Text                  | x   |        | x     |          |
| 110                                     |                         | Fetch Test Context                  | x   |        | x     |          |

---

## **FUNCTION CATEGORIES SUMMARY**

1. **Authentication & User Management**: 5 functions
2. **Organization Management**: 8 functions
3. **Subscription Management**: 4 functions
4. **Widget Configuration**: 5 functions
5. **Widget Embedding & Integration**: 20 functions (10 embed code snippets + 10 plugin management)
6. **Knowledge Base Management**: 10 functions
7. **Conversation Management**: 9 functions
8. **Message Management**: 6 functions
9. **Contact Session Management**: 5 functions
10. **AI Agent & Tools**: 8 functions
11. **Customer Widget Experience**: 8 functions
12. **Reporting & Analytics**: 10 functions
13. **System Administration**: 7 functions
14. **Playground & Testing**: 5 functions

**Total Functions: 110**

---

## **ACCESS CONTROL SUMMARY**

| User Type       | Function Count | Access Level                                                          |
| --------------- | -------------- | --------------------------------------------------------------------- |
| **Admin**       | 85 functions   | Full access to all management, configuration, and monitoring features |
| **Team Member** | 35 functions   | Access to conversation management, messaging, and basic reporting     |
| **Customer**    | 15 functions   | Limited to widget interaction, chat, and viewing own conversations    |
| **System**      | 10 functions   | Automated background processes and API endpoints                      |

---

## **TECHNOLOGY STACK**

- **Backend Framework**: Convex (Serverless)
- **Authentication**: Clerk
- **AI Agent**: @convex-dev/agent
- **Vector Database**: RAG (Retrieval-Augmented Generation)
- **File Storage**: Convex Storage
- **Secret Management**: AWS Secrets Manager
- **Voice Integration**: VAPI
- **Frontend**: Next.js, React
- **Real-time Communication**: Convex Real-time Subscriptions

---

## **API STRUCTURE**

### **Public API** (Accessible from client)

- `public/contactSessions` - Customer session management
- `public/conversations` - Conversation operations
- `public/messages` - Message operations
- `public/organizations` - Organization validation
- `public/secrets` - Secret management
- `public/widgetSettings` - Widget configuration

### **Private API** (Admin/Team access only)

- `private/contactSessions` - Advanced session operations
- `private/conversations` - Admin conversation management
- `private/files` - Knowledge base file management
- `private/messages` - Admin message operations
- `private/plugins` - Plugin management
- `private/secrets` - Secret CRUD operations
- `private/vapi` - VAPI integration
- `private/widgetSettings` - Widget settings management

### **Internal API** (System use only)

- `system/contactSessions` - Internal session operations
- `system/conversations` - Internal conversation operations
- `system/plugins` - Internal plugin operations
- `system/secrets` - Internal secret operations
- `system/subscriptions` - Internal subscription operations
- `system/ai/agents/supportAgent` - AI agent core
- `system/ai/tools/*` - AI tool functions
- `system/ai/rag` - RAG search operations

---

## **NOTES**

1. All functions implement proper authentication and authorization checks
2. Clerk handles user and organization management externally
3. Contact sessions expire after 24 hours for security
4. AI responses depend on active subscription status
5. Knowledge base uses vector embeddings for semantic search
6. VAPI integration enables voice call functionality
7. Real-time updates powered by Convex subscriptions
8. All file uploads are validated and scanned
9. Secrets are encrypted and stored in AWS Secrets Manager
10. Conversation status flow: unresolved → escalated → resolved

---

**Document Version:** 1.0  
**Business Requirements:** AI Customer Support App  
**Prepared by:** Development Team
