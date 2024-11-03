export const teamData = [
  {
    name: "Sarah Bennett",
    role: "Product Owner",
    lastVote: 8,
    avatarIndex: 22,
    voted: false,
  },
  {
    name: "John Lee",
    role: "Scrum Master",
    lastVote: 5,
    avatarIndex: 24,
    voted: true,
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Developer",
    lastVote: 21,
    avatarIndex: 27,
    voted: false,
  },
  {
    name: "David Nguten",
    role: "Frontend Developer",
    lastVote: 13,
    avatarIndex: 29,
    voted: true,
  },
  {
    name: "Michael Chen",
    role: "Backend Developer",
    lastVote: 5,
    avatarIndex: 15,
    voted: true,
  },
  {
    name: "Alicia Patel",
    role: "UX/UI Designer",
    lastVote: 34,
    avatarIndex: 16,
    voted: false,
  },
  {
    name: "Mark Johnson",
    role: "QA Engineer",
    lastVote: 8,
    avatarIndex: 21,
    voted: true,
  },
  {
    name: "Laura Kim",
    role: "Business Analyst",
    lastVote: 8,
    avatarIndex: 28,
    voted: false,
  },
  {
    name: "Rachel Torres",
    role: "DevOps Engineer",
    lastVote: 13,
    avatarIndex: 14,
    voted: true,
  },
  {
    name: "Paul Wilson",
    role: "Data Scientist",
    lastVote: 5,
    avatarIndex: 20,
    voted: false,
  },
];

export const userStories = [
  {
    id: 1,
    title: "View Account Balance on Dashboard", // Updated title
    estimate: 0,
    content: `<p><strong>As a</strong> user, <strong>I want</strong> to view my current account balance <strong>so that</strong> I can keep track of my finances.</p>

  <h3>Description</h3>
  <p>
    The user should be able to easily locate and view their current account balance on the main dashboard. This balance should be displayed in a clear, easy-to-read format and update in real-time to reflect the latest transactions.
  </p>

  <h3>Current State</h3>
  <p>
    Currently, users must navigate to the "Account Details" page to see their balance, and the balance does not update until the page is refreshed manually.
  </p>

  <h3>Target State</h3>
  <p>
    The balance should be visible on the main dashboard immediately after logging in, and it should update in real-time to reflect any changes from recent transactions.
  </p>

  <h3>Acceptance Criteria</h3>
  <ul>
    <li><strong>Balance Visibility:</strong> The current account balance should be visible on the main dashboard after logging in.</li>
    <li><strong>Real-Time Updates:</strong> The displayed balance should automatically update within 5 seconds of any transaction.</li>
    <li><strong>Formatting:</strong> The balance should be formatted with commas for thousands, and always display two decimal places (e.g., $1,234.56).</li>
    <li><strong>Error Handling:</strong> If there is an issue retrieving the balance, an error message should display with a retry option.</li>
  </ul>`,
  },
  {
    id: 2,
    title: "Add New Transaction Feature",
    estimate: 0,
    content: `<p><strong>As a</strong> user, <strong>I want</strong> to add new transactions <strong>so that</strong> I can track my expenses and income accurately.</p>

  <h3>Description</h3>
  <p>
    The user should be able to add a new transaction (expense or income) by entering details such as amount, date, and category. This will help them keep an accurate record of their finances.
  </p>

  <h3>Current State</h3>
  <p>
    Users currently have no way to manually add transactions, which limits the functionality of the application for financial tracking.
  </p>

  <h3>Target State</h3>
  <p>
    Users should be able to add a new transaction with a form that accepts the amount, date, category, and a note. The transaction list should update immediately.
  </p>

  <h3>Acceptance Criteria</h3>
  <ul>
    <li><strong>Transaction Form:</strong> The user can access a form to add a new transaction, with fields for amount, date, category, and note.</li>
    <li><strong>Instant Update:</strong> Upon submission, the transaction list updates immediately to show the new entry.</li>
    <li><strong>Validation:</strong> Amount and date fields are required; category defaults to "Uncategorized" if left blank.</li>
  </ul>`,
  },
  {
    id: 3,
    title: "Export Financial Report",
    estimate: 0,
    content: `<p><strong>As a</strong> user, <strong>I want</strong> to export my financial transactions <strong>so that</strong> I can analyze my spending in external tools like Excel or Google Sheets.</p>

  <h3>Description</h3>
  <p>
    Users should be able to export their transactions as a CSV file, enabling them to review and analyze their spending and income data in external applications.
  </p>

  <h3>Current State</h3>
  <p>
    There is currently no functionality for users to export their financial data, making it challenging to perform detailed analysis outside the application.
  </p>

  <h3>Target State</h3>
  <p>
    Users can export a CSV file containing all transaction data, with columns for date, category, amount, and notes.
  </p>

  <h3>Acceptance Criteria</h3>
  <ul>
    <li><strong>Export Option:</strong> An "Export to CSV" button is available on the transaction page.</li>
    <li><strong>CSV Format:</strong> The CSV file includes columns for date, category, amount, and notes.</li>
    <li><strong>Success Notification:</strong> After export, a notification confirms the CSV file download.</li>
  </ul>`,
  },
];
