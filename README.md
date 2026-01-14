# Task Management Dashboard

A modern, responsive Personal Task Management Dashboard built with React. This application allows users to efficiently manage their daily to-do tasks with features for adding, editing, completing, and deleting tasks, along with visual statistics.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Task+Management+Dashboard)

## 🎯 Real-World Use Case

This application is designed for individuals who need a simple yet effective way to:
- **Organize daily tasks** with clear titles, descriptions, and due dates
- **Track progress** through visual statistics and completion rates
- **Prioritize work** by identifying pending and overdue tasks
- **Stay motivated** by marking tasks as completed and seeing progress

Whether you're a student managing assignments, a professional tracking work items, or anyone looking to boost productivity, this dashboard provides an intuitive interface for task management.

## ✨ Features

### 1. Add New Task
Create tasks with comprehensive details:
- **Title** (required): Brief task name (3-100 characters)
- **Description** (optional): Detailed task information (up to 500 characters)
- **Due Date** (required): Target completion date

**Implementation**: The `TaskForm` component handles form validation and submission. Tasks are stored in React state with unique UUIDs generated using the `uuid` library.

### 2. Edit Existing Task
Modify any task's details at any time:
- Update title, description, or due date
- Form pre-fills with existing task data
- Validation ensures data integrity

**Implementation**: Clicking the edit button opens the `Modal` component with `TaskForm` in edit mode. The form is populated with the selected task's data, and updates are applied to the state on submission.

### 3. Mark Task as Completed/Pending
Toggle task status with a single click:
- Visual checkbox indicates completion status
- Completed tasks show strikethrough styling
- Status badge updates in real-time

**Implementation**: The `handleToggleComplete` function in `App.js` updates the task's `completed` property. The `TaskList` component applies conditional CSS classes based on status.

### 4. Delete Task
Remove tasks from the list:
- Permanent deletion with one click
- Statistics update immediately
- Empty state shown when all tasks deleted

**Implementation**: The `handleDeleteTask` function filters the task from the state array. Dashboard statistics recalculate automatically through React's reactive state management.

### 5. Dashboard Statistics & Charts
Visual overview of task status:
- **Total Tasks**: Count of all tasks
- **Completed Tasks**: Number of finished tasks (green indicator)
- **Pending Tasks**: Number of remaining tasks (orange indicator)
- **Completion Rate**: Percentage progress bar
- **Doughnut Chart**: Visual task distribution using Chart.js

**Implementation**: The `Dashboard` component uses `useMemo` to calculate statistics from the tasks array. Charts are rendered using `react-chartjs-2` with `Chart.js` for data visualization.

## 🎨 Design Specifications

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Blue | `#4A90E2` | Main accent, buttons, links |
| Primary Dark | `#357ABD` | Hover states, gradients |
| Light Blue | `#E8F4FD` | Background highlights |
| White | `#FFFFFF` | Primary background |
| Light Gray | `#F5F7FA` | Secondary background |
| Dark Gray | `#333333` | Primary text |
| Success Green | `#4CAF50` | Completed tasks |
| Warning Orange | `#FF9800` | Pending tasks |
| Danger Red | `#F44336` | Overdue, delete actions |

### Typography
- **Font Family**: Inter (Google Fonts)
- **Base Size**: 16px
- **Line Height**: 1.6
- **Weights Used**: 300, 400, 500, 600, 700

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

### Layout
- **Mobile First**: Responsive design starting from 320px
- **Breakpoints**: 480px, 768px, 1024px, 1400px
- **Grid Layout**: CSS Grid for main layout, Flexbox for components

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 14.0 or higher
- **npm**: Version 6.0 or higher (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd task-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Using start.bat (Recommended for Windows)
Simply double-click the `start.bat` file or run:
```bash
start.bat
```

This script will:
1. Check for Node.js installation
2. Install dependencies if needed
3. Create the logs directory
4. Start the development server
5. Open your default browser to `http://localhost:3000`

#### Option 2: Using npm directly
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Automated Tests

### Using run_tests.bat (Windows)
Double-click `run_tests.bat` or run:
```bash
run_tests.bat
```

This will:
1. Check for dependencies
2. Create the logs directory if needed
3. Run all automated tests
4. Save results to `logs/test_run.log`

### Using npm directly
```bash
# Run tests and save to log file
npm test -- --testPathPattern=test/auto_test.js --verbose 2>&1 | tee logs/test_run.log

# Or run tests interactively
npm test
```

### Test Coverage

The test suite (`test/auto_test.js`) covers all 5 main features:

| Feature | Tests | Coverage |
|---------|-------|----------|
| Add Task | 7 tests | Normal + edge cases (validation) |
| Edit Task | 4 tests | Title, description, preservation |
| Toggle Complete | 3 tests | Complete, pending, stats update |
| Delete Task | 3 tests | Delete, stats update, empty state |
| Dashboard | 5 tests | Stats display, calculations, chart |
| Filters | 3 tests | All, pending, completed filters |
| UI/UX | 3 tests | Component rendering |

**Total: 28+ test cases** covering normal inputs and edge cases.

### Test Log Location
After running tests, check `logs/test_run.log` for detailed results including:
- Timestamp of test run
- Pass/fail status for each test
- Error details for any failures
- Summary statistics

## 📁 Project Structure

```
task-management-dashboard/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Dashboard.js    # Statistics & charts component
│   │   ├── Dashboard.css   # Dashboard styles
│   │   ├── Header.js       # App header with add button
│   │   ├── Header.css      # Header styles
│   │   ├── Modal.js        # Reusable modal component
│   │   ├── Modal.css       # Modal styles
│   │   ├── TaskForm.js     # Add/Edit form component
│   │   ├── TaskForm.css    # Form styles
│   │   ├── TaskList.js     # Task list with filters
│   │   └── TaskList.css    # Task list styles
│   ├── App.js              # Main application component
│   ├── App.css             # App layout styles
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles & variables
│   └── setupTests.js       # Jest configuration
├── test/
│   └── auto_test.js        # Automated test suite
├── logs/
│   └── test_run.log        # Test execution log (auto-generated)
├── package.json            # Project dependencies
├── start.bat               # Windows startup script
├── run_tests.bat           # Windows test runner script
└── README.md               # This documentation
```

## 🔧 Dependencies

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM rendering |
| react-scripts | 5.0.1 | Build tooling |
| chart.js | ^4.4.1 | Chart library |
| react-chartjs-2 | ^5.2.0 | React Chart.js wrapper |
| uuid | ^9.0.0 | Unique ID generation |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @testing-library/react | ^14.1.0 | React testing utilities |
| @testing-library/jest-dom | ^6.1.5 | DOM matchers |
| @testing-library/user-event | ^14.5.1 | User interaction simulation |
| jest | ^29.7.0 | Testing framework |
| jest-environment-jsdom | ^29.7.0 | DOM environment for tests |

## 📱 Responsive Design

The application is fully responsive and tested on:
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1400px+

### Mobile Optimizations
- Collapsible navigation
- Touch-friendly button sizes (min 44px)
- Bottom sheet modal on small screens
- Simplified stats layout

## ⌨️ Accessibility

- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Focus management** in modals
- **High contrast** color combinations
- **Screen reader** compatible structure

## 🐛 Troubleshooting

### Common Issues

**"Node.js is not installed"**
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

**"npm install fails"**
- Check your internet connection
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and try again

**"Tests fail to run"**
- Ensure dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 14+)

**"Browser doesn't open automatically"**
- Manually navigate to `http://localhost:3000`
- Check if another application is using port 3000

## 📄 License

This project is created for demonstration and educational purposes.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Chart.js](https://www.chartjs.org/) - Data Visualization
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) - Typography
- [React Testing Library](https://testing-library.com/react) - Testing Utilities
