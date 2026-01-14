# 📋 Task Management Dashboard

A modern, feature-rich Personal Task Management Dashboard for organizing and tracking your daily to-do tasks with an intuitive user interface and comprehensive functionality.

## 🎯 Real-World Use Case

This application is designed for individuals who need to manage their daily tasks efficiently. Whether you're a professional managing work projects, a student organizing assignments, or anyone who wants to keep track of their to-do list, this dashboard provides a clean, visual way to:

- Track all your tasks in one place
- Monitor your progress with visual statistics
- Organize tasks by due dates
- Maintain a clear overview of completed vs. pending work
- Access your tasks from any device (data persists in browser)

## ✨ Features

This Task Management Dashboard implements **5 core features**:

### Feature 1: Add New Task
**Implementation:** 
- Users can click the "Add New Task" button to open a form
- The form includes three required fields:
  - **Title**: Short name for the task
  - **Description**: Detailed description of what needs to be done
  - **Due Date**: Calendar date picker for when the task is due
- Form validation ensures all fields are filled before submission
- Tasks are automatically assigned a unique ID and creation timestamp
- New tasks are saved to browser's localStorage for persistence

**Location in code:** `src/components/TaskForm.js` and `src/App.js` (addTask function)

### Feature 2: Edit Existing Task
**Implementation:**
- Each task card has an "Edit" button (✏️)
- Clicking edit opens the same form as "Add New Task" but pre-populated with existing data
- Users can modify the title, description, or due date
- Changes are saved when clicking "Update Task"
- Cancel button allows users to abort editing without saving changes
- Updated tasks maintain their ID and completion status

**Location in code:** `src/components/TaskForm.js` and `src/App.js` (updateTask function)

### Feature 3: Mark Task as Completed/Pending
**Implementation:**
- Each task card has a checkbox next to the title
- Clicking the checkbox toggles the task between completed and pending states
- Completed tasks show visual indicators:
  - Strikethrough text on the title
  - Green "✓ Completed" badge
  - Slightly transparent appearance
- Dashboard statistics update in real-time
- Toggle works both ways (completed → pending and pending → completed)

**Location in code:** `src/components/TaskList.js` and `src/App.js` (toggleComplete function)

### Feature 4: Delete Task
**Implementation:**
- Each task card has a "Delete" button (🗑️)
- Clicking delete shows a confirmation dialog to prevent accidental deletion
- Confirming removes the task permanently from the list
- Dashboard statistics are automatically updated
- Can delete multiple tasks sequentially
- Deletion is immediate and cannot be undone

**Location in code:** `src/components/TaskList.js` and `src/App.js` (deleteTask function)

### Feature 5: Visual Dashboard with Statistics
**Implementation:**
- Dashboard displays three key metrics in colorful cards:
  - **Total Tasks**: Count of all tasks
  - **Completed Tasks**: Count of finished tasks
  - **Pending Tasks**: Count of remaining tasks
- Visual progress bar showing completion percentage
- Bar chart comparing completed vs. pending tasks
- All statistics update automatically when tasks are added, edited, completed, or deleted
- Color-coded for easy interpretation:
  - Blue for total tasks
  - Green for completed tasks
  - Orange for pending tasks

**Location in code:** `src/components/Dashboard.js`

## 🎨 Design Highlights

### Color Scheme
- **Primary Colors**: Light Blue (#4A90E2) and White (#FFFFFF)
- **Accent Colors**: 
  - Success Green (#4CAF50) for completed items
  - Warning Orange (#FF9800) for pending items
  - Error Red (#F44336) for overdue/delete actions

### Typography
- **Font Family**: 'Inter' - A modern, highly readable sans-serif font
- **Font Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- Clear hierarchy with varying sizes for headings and body text

### Layout & Spacing
- **Spacing System**: Based on 8px increments (8px, 16px, 24px, 32px, 40px)
- **Border Radius**: 12px for cards, 8px for buttons (modern, friendly feel)
- **Shadows**: Soft box-shadows for depth without being overwhelming
- **Responsive**: Adapts to mobile, tablet, and desktop screen sizes

### Visual Elements
- Gradient backgrounds for header and buttons
- Smooth transitions and hover effects
- Card-based layout with clean borders
- Icon integration (emojis) for visual appeal
- Progress bars with animated width transitions

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd task-management-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages including React, Webpack, Babel, and testing libraries.

## 📱 How to Run the Application

### Using the Startup Script (Recommended)

**Windows:**
Simply double-click the `start.bat` file or run from command line:
```bash
start.bat
```

The script will:
1. Check if dependencies are installed (installs them if needed)
2. Start the development server
3. Automatically open your default browser to `http://localhost:3000`

**Keep the terminal window open while using the application.**

### Manual Start

Alternatively, you can start manually:
```bash
npm start
```

The application will be available at: **http://localhost:3000**

### Stopping the Application

Press `Ctrl+C` in the terminal window where the application is running, then confirm with `Y`.

## 🧪 Running Automated Tests

### Run All Tests

From the project directory, execute:
```bash
npm test
```

### What the Tests Cover

The automated test suite (`test/auto_test.js`) includes **20+ comprehensive test cases** covering:

1. **Feature 1 Tests (Add Task)**:
   - Add task with valid inputs
   - Form validation for empty fields
   - Adding multiple tasks

2. **Feature 2 Tests (Edit Task)**:
   - Edit all task fields
   - Cancel edit operation

3. **Feature 3 Tests (Toggle Completion)**:
   - Mark task as completed
   - Toggle between completed and pending states

4. **Feature 4 Tests (Delete Task)**:
   - Delete a task
   - Cancel delete operation
   - Delete multiple tasks

5. **Feature 5 Tests (Dashboard)**:
   - Verify statistics accuracy
   - Calculate completion percentage
   - Handle empty state

6. **Integration Tests**:
   - LocalStorage persistence
   - Complex workflow scenarios

### Test Output

Test results are written to: **`logs/test_run.log`**

The log file contains:
- Timestamp for each test
- Step-by-step execution details
- Pass/fail status for each test case
- Clear, self-explanatory messages

Example log output:
```
[2026-01-14T12:00:00.000Z] ========================================
[2026-01-14T12:00:00.000Z] Task Management Dashboard - Test Suite
[2026-01-14T12:00:00.000Z] ========================================
[2026-01-14T12:00:00.000Z] Starting automated tests...
[2026-01-14T12:00:01.000Z] 
[2026-01-14T12:00:01.000Z] --- New Test Case ---
[2026-01-14T12:00:01.000Z] TEST 1.1: Add new task with valid inputs
[2026-01-14T12:00:01.000Z]   ✓ Clicked "Add New Task" button
[2026-01-14T12:00:01.000Z]   ✓ Filled in task details: Title, Description, Due Date
[2026-01-14T12:00:01.000Z]   ✓ Submitted the form
[2026-01-14T12:00:01.000Z]   ✓ Task successfully added to the list
[2026-01-14T12:00:01.000Z]   ✓ Dashboard statistics updated correctly
[2026-01-14T12:00:01.000Z]   ✅ TEST PASSED: Task added successfully
```

## 📁 Project Structure

```
task-management-dashboard/
│
├── public/
│   └── index.html              # HTML template
│
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Main application component
│   ├── App.css                 # Global styles
│   │
│   └── components/
│       ├── Dashboard.js        # Feature 5: Statistics dashboard
│       ├── TaskForm.js         # Features 1 & 2: Add/Edit form
│       └── TaskList.js         # Features 3 & 4: Task display & actions
│
├── test/
│   ├── auto_test.js            # Automated test suite
│   ├── setupTests.js           # Test configuration
│   └── __mocks__/
│       └── styleMock.js        # CSS mock for tests
│
├── logs/
│   └── test_run.log            # Test execution logs (auto-generated)
│
├── package.json                # Project dependencies and scripts
├── webpack.config.js           # Webpack configuration
├── start.bat                   # Windows startup script
└── README.md                   # This file
```

## 🔧 Technologies Used

- **React 18.2**: Modern UI library with hooks
- **Webpack 5**: Module bundler and dev server
- **Babel**: JavaScript transpiler for JSX and modern JS
- **Jest**: Testing framework
- **React Testing Library**: React component testing utilities
- **CSS3**: Modern styling with flexbox, grid, and animations

## 💾 Data Persistence

Tasks are stored in the browser's **localStorage**, which means:
- ✅ Tasks persist across page refreshes
- ✅ No server or database required
- ✅ Works offline
- ⚠️ Data is stored per browser (not synced across devices)
- ⚠️ Clearing browser data will delete tasks

## 🎯 Usage Tips

1. **Adding Tasks**: Be descriptive in your task titles and descriptions for better organization
2. **Due Dates**: Tasks past their due date will show an "Overdue" badge
3. **Completion Progress**: Watch the progress bar fill as you complete tasks
4. **Editing**: You can edit any field of a task at any time
5. **Organization**: Completed tasks automatically move to the bottom of the list

## 🐛 Troubleshooting

### Application won't start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again
- Check if port 3000 is already in use

### Tests failing
- Make sure all dependencies are installed: `npm install`
- Check that `logs` directory has write permissions
- Run tests one at a time if needed

### Styles not loading
- Clear browser cache and reload
- Check browser console for errors (F12)

## 📝 Notes

- This is a single-page application (SPA) built with React
- No backend server is required - everything runs in the browser
- Modern browsers (Chrome, Firefox, Safari, Edge) are recommended
- Mobile-responsive design works on phones and tablets

## 🎓 Learning Resources

If you want to understand or modify the code:
- **React Docs**: https://react.dev
- **Jest Testing**: https://jestjs.io
- **CSS Grid & Flexbox**: https://css-tricks.com

## 📄 License

MIT License - Feel free to use and modify as needed.

---

**Enjoy managing your tasks! 🎉**
