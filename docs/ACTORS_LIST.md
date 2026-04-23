# DANH SÁCH TÁC NHÂN - CHAT ASSISTANT

**Tên dự án:** Chat Assistant (AI Customer Support)  
**Người thực hiện:** Development Team  
**Lần sửa đổi:** December 20, 2025

---

| Stt | Tên tác nhân | Vị trí làm việc             | Mức truy cập | Độ quan trọng | Ghi chú                                                                                                                                                                                          |
| --- | ------------ | --------------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Admin        | Manager (Quản lý tổ chức)   | Thường xuyên | Cao           | Chủ sở hữu tổ chức, có toàn quyền quản lý: cấu hình widget, quản lý team members, upload knowledge documents, quản lý plugins, xem tất cả conversations, quản lý subscription, giám sát hệ thống |
| 2   | TeamMember   | Nhân viên hỗ trợ khách hàng | Thường xuyên | Cao           | Nhân viên trong tổ chức, xử lý customer conversations, trả lời tin nhắn, theo dõi trạng thái hội thoại, hỗ trợ khi AI chuyển giao (escalate)                                                     |
| 3   | Customer     | Khách hàng cuối             | Thường xuyên | Cao           | Người dùng cuối tương tác với AI assistant qua chat widget, gửi tin nhắn, nhận phản hồi từ AI hoặc nhân viên, tạo contact session (24h)                                                          |
| 4   | System       | Hệ thống tự động            | Liên tục     | Trung bình    | Background processes: dọn dẹp expired sessions, validate organization, quản lý API endpoints, xử lý webhooks                                                                                     |

---

## **MÔ TẢ CHI TIẾT TÁC NHÂN**

### **1. Admin (Quản lý)**

- **Vai trò chính**: Chủ sở hữu và quản lý tổ chức
- **Quyền truy cập**:
  - Full access (95 chức năng)
  - Quản lý Clerk organization
  - Quản lý subscription & billing
  - Cấu hình widget (greeting, suggestions, theme)
  - Quản lý integrations & plugins
  - Upload/delete knowledge documents
  - Mời/xóa team members
  - Xem tất cả conversations & analytics
  - Trả lời customer messages
- **Công cụ sử dụng**: Web Dashboard (Next.js app)
- **Authentication**: Clerk (JWT tokens)

### **2. TeamMember (Nhân viên hỗ trợ)**

- **Vai trò chính**: Hỗ trợ khách hàng
- **Quyền truy cập**:
  - Limited access (35 chức năng)
  - Xem conversations được assign
  - Trả lời customer messages
  - Cập nhật conversation status
  - Xem team performance metrics
  - Không có quyền: quản lý org, billing, widget config, plugins
- **Công cụ sử dụng**: Web Dashboard
- **Authentication**: Clerk (JWT tokens)

### **3. Customer (Khách hàng)**

- **Vai trò chính**: Người dùng cuối
- **Quyền truy cập**:
  - Limited access (15 chức năng)
  - Tạo contact session (name + email)
  - Gửi/nhận messages
  - Xem chat history (trong session)
  - Click suggested questions
  - Thực hiện voice calls (nếu enabled)
- **Công cụ sử dụng**: Chat Widget (iframe embedded in website)
- **Authentication**: Temporary Contact Session (24h expiry)

### **4. System (Hệ thống)**

- **Vai trò chính**: Automated processes
- **Quyền truy cập**:
  - Internal access (10 chức năng)
  - Cleanup expired contact sessions (cron job)
  - Validate organization with Clerk API
  - Manage API key validation
  - Handle webhooks
  - Background file processing
- **Công cụ sử dụng**: Convex internal functions
- **Authentication**: Internal system calls

---

## **PHÂN CẤP QUYỀN HẠN**

```
Admin (Cao nhất)
  ├─ Full system access
  ├─ Manage organization
  ├─ Manage team members
  ├─ Configure all settings
  └─ View all data

TeamMember (Trung bình)
  ├─ View assigned conversations
  ├─ Reply to customers
  ├─ Update conversation status
  └─ Limited reports access

Customer (Thấp)
  ├─ Create contact session
  ├─ Send/receive messages
  └─ View own chat history

System (Background)
  ├─ Automated tasks
  └─ Internal operations
```

---

## **TƯƠNG TÁC GIỮA CÁC TÁC NHÂN**

| Từ → Đến       | Admin              | TeamMember                         | Customer                           | System           |
| -------------- | ------------------ | ---------------------------------- | ---------------------------------- | ---------------- |
| **Admin**      | -                  | Assign conversations, manage roles | View conversations, no direct chat | Configure system |
| **TeamMember** | Report to          | Collaborate                        | Reply to messages                  | Use system       |
| **Customer**   | No interaction     | Receive replies                    | -                                  | Create sessions  |
| **System**     | Send notifications | Send notifications                 | Validate sessions                  | -                |

---

## **KỊCH BẢN SỬ DỤNG ĐIỂN HÌNH**

### **Kịch bản 1: Admin setup hệ thống**

1. Admin đăng nhập qua Clerk
2. Tạo organization
3. Cấu hình widget (greeting, suggestions)
4. Upload knowledge documents
5. Cấu hình VAPI plugin (voice calls)
6. Copy integration code snippet
7. Mời team members
8. Deploy widget vào website

### **Kịch bản 2: Customer tương tác**

1. Customer vào website có widget
2. Click nút chat
3. Nhập name + email (tạo contact session)
4. Gửi câu hỏi
5. AI trả lời tự động (sử dụng knowledge base)
6. Nếu AI không trả lời được → escalate to TeamMember
7. TeamMember nhận notification và trả lời
8. Conversation được mark "resolved"

### **Kịch bản 3: TeamMember xử lý hội thoại**

1. TeamMember đăng nhập dashboard
2. Xem danh sách conversations (filter: escalated/unresolved)
3. Click vào conversation cần xử lý
4. Đọc lịch sử chat
5. Trả lời customer
6. Mark conversation "resolved"

### **Kịch bản 4: System tự động**

1. Cron job chạy mỗi giờ
2. Tìm contact sessions hết hạn (> 24h)
3. Cleanup expired sessions
4. Gửi notification cho Admin về stats
5. Validate organizations với Clerk

---

## **CÔNG NGHỆ & TOOLS**

| Tác nhân   | Platform        | Authentication  | Database Access    |
| ---------- | --------------- | --------------- | ------------------ |
| Admin      | Web (Next.js)   | Clerk JWT       | Full (Convex)      |
| TeamMember | Web (Next.js)   | Clerk JWT       | Limited (Convex)   |
| Customer   | Widget (Iframe) | Contact Session | Read-only own data |
| System     | Server (Convex) | Internal        | Full               |

---

## **DANH SÁCH CÂU HỎI THU THẬP YÊU CẦU**

| STT | Câu hỏi cấp 1                                                        | Câu hỏi cấp 2                                    | Câu hỏi cấp 3                                             | Câu trả lời của Client                                                                                                                                                | Ghi chú                                      |
| --- | -------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | Ứng dụng được xây dựng hướng đến nhóm người sử dụng cuối cụ thể nào? | Tập trung kỹ năng cụ thể nào?                    |                                                           | Doanh nghiệp có website cần hỗ trợ khách hàng tự động 24/7 qua AI chatbot. Khách hàng cuối là người dùng internet truy cập website                                    |                                              |
| 2   | Quy trình, hình thức vận hành như thế nào?                           |                                                  |                                                           | Admin tạo organization → Cấu hình widget → Upload knowledge base → Nhúng widget vào website → Khách hàng chat → AI trả lời tự động hoặc chuyển sang TeamMember        |                                              |
| 3   | Khách hàng sẽ sử dụng tác vụ hệ thống như thế nào?                   | Giao diện cần trực quan ra sao?                  | Có cần đơn giản hóa thao tác mua hàng không?              | Có 3 giao diện: (1) Admin Dashboard - quản lý toàn diện, (2) Chat Widget - đơn giản cho khách, (3) TeamMember Dashboard - xem conversations                           | Widget cần tối giản, không phức tạp          |
| 4   | Người quản trị cần quản lý những dữ liệu gì?                         | Sắp phẩm, đơn hàng, khách hàng?                  | Có cần phân loại sản phẩm theo thương hiệu không?         | Quản lý: Organizations, Team Members, Conversations, Messages, Knowledge Documents, Widget Configuration, Subscriptions, Integrations, Plugins (VAPI)                 |                                              |
| 5   | Các báo cáo nào là cần thiết cho người quản trị?                     | Báo cáo doanh thu theo ngày/tháng/năm?           | Có cần báo cáo lãi kho, xu hướng sản phẩm bán chạy không? | Báo cáo: Total conversations, Response time, Resolution rate, Customer satisfaction, AI vs Human responses, Peak hours, Most asked questions, Team performance        | Dashboard analytics với charts               |
| 6   | Các hình thức thanh toán được hỗ trợ là gì?                          | Thanh toán COD, chuyển khoản, ví điện tử?        | Có tích hợp cổng thanh toán nội địa không?                | Subscription billing qua Stripe: Monthly/Yearly plans, Trial period, Auto-renewal, Invoice history                                                                    | Chỉ subscription, không phải per-transaction |
| 7   | Hệ thống có cần phân quyền người dùng không?                         | Bao gồm những vai trò nào?                       | Mỗi vai trò có quyền truy cập đến chức năng nào?          | 4 roles: Admin (full access), TeamMember (limited), Customer (public), System (internal). Permission-based access control                                             | Dùng Clerk organizations                     |
| 8   | Có yêu cầu tích hợp với hệ thống bên ngoài nào không?                | Hệ thống vận chuyển?                             | Có cần đồng bộ đơn hàng với đơn vị giao hàng không?       | Tích hợp: (1) Clerk Auth, (2) VAPI voice calls, (3) AWS Secrets Manager, (4) Stripe billing, (5) Widget embedding vào third-party websites                            |                                              |
| 9   | Tần suất cập nhật sản phẩm và giá bán là gì?                         | Hàng ngày, hàng tuần?                            | Có cần công cụ hỗ trợ nhập liệu hàng loạt không?          | Knowledge base update: Admin upload PDF/DOCX documents anytime → AI re-index → New answers available immediately                                                      | Real-time updates                            |
| 10  | Trong trường hợp, có kế hoạch mở rộng thêm chức năng gì không?       | Trinh năng gợi ý sản phẩm, tích điểm khách hàng? | Có cưu tiên phát triển ứng dụng di động không?            | Roadmap: (1) Multi-language support, (2) Voice calls improvement, (3) Analytics advanced, (4) CRM integration, (5) Mobile widget optimization                         |                                              |
| 11  | Có chức năng notification không?                                     |                                                  |                                                           | Yes: (1) Email notifications cho Admin/TeamMember khi có escalation, (2) In-app notifications, (3) Real-time updates qua Convex subscriptions                         |                                              |
| 12  | AI Agent cần hiểu thông tin gì?                                      | Kiến thức về sản phẩm/dịch vụ?                   | Cần training AI như thế nào?                              | AI sử dụng RAG (Retrieval-Augmented Generation): Vector search trong knowledge documents → Generate answer. Admin chỉ cần upload documents, không cần training manual | @convex-dev/agent                            |
| 13  | Widget cần responsive trên thiết bị nào?                             | Desktop, tablet, mobile?                         | Hỗ trợ trình duyệt nào?                                   | Responsive cho tất cả: Desktop, tablet, mobile. Hỗ trợ: Chrome, Firefox, Safari, Edge (modern browsers)                                                               | CSS media queries                            |
| 14  | Session management như thế nào?                                      | Thời gian timeout?                               | Lưu lịch sử chat bao lâu?                                 | Customer contact session: 24h expiry. Chat history: Permanent storage cho Admin/TeamMember, Customer chỉ xem trong session                                            |                                              |
| 15  | Security requirements?                                               | HTTPS required?                                  | Data encryption?                                          | Yes: (1) HTTPS only, (2) JWT authentication, (3) API key validation, (4) AWS Secrets for credentials, (5) Clerk security, (6) CORS configured                         |                                              |
| 16  | Widget customization options?                                        | Colors, position, greeting?                      | Branding?                                                 | Admin có thể customize: (1) Primary color, (2) Greeting message, (3) Suggested questions, (4) Widget position (bottom-right/left), (5) FAB icon                       | Real-time preview                            |
| 17  | Escalation workflow?                                                 | Khi nào chuyển từ AI sang human?                 | Notification cho TeamMember?                              | AI không trả lời được (confidence < 70%) → Automatic escalate → Notification to TeamMember → Human takes over conversation                                            |                                              |
| 18  | Multi-organization support?                                          | Một admin có thể quản lý nhiều orgs?             | Billing riêng biệt?                                       | Yes: Clerk organizations. Một user có thể thuộc nhiều orgs. Mỗi org có: Riêng widget, knowledge base, subscription, billing, team members                             |                                              |
| 19  | Performance requirements?                                            | Response time mong đợi?                          | Concurrent users?                                         | AI response: < 3 seconds. Page load: < 2 seconds. Support: 1000+ concurrent widget sessions per org. Convex real-time updates                                         |                                              |
| 20  | Deployment & hosting?                                                | Cloud platform nào?                              | Auto-scaling?                                             | Vercel (Next.js), Convex (backend), Clerk (auth). Auto-scaling included. No server management needed                                                                  | Serverless architecture                      |

---

**Document Version:** 1.0  
**Business Requirements:** AI Customer Support App  
**Prepared by:** Development Team
