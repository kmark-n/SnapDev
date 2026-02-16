# Todo List App

A simple, browser‑based Todo List application that lets users add, edit, delete, and complete tasks. The app demonstrates clean, vanilla JavaScript, HTML, and CSS with no external dependencies, and it persists data in the browser’s `localStorage`.

---

## Tech Stack & Key Features

| Category | Details |
|----------|---------|
| **Languages** | HTML5, CSS3, JavaScript (ES6) |
| **Frameworks/Libraries** | None – pure vanilla JavaScript |
| **Responsive Design** | Works on desktop, tablet, and mobile browsers |
| **Task Management** | Add, edit, delete, toggle completion |
| **Filtering** | View All / Active / Completed tasks |
| **Persistence** | Saves tasks to `localStorage` under the key `todo-tasks` |
| **Accessibility** | Keyboard shortcuts for adding and navigating tasks |

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```
2. **Open the application**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari, …). No server, build step, or package manager is required.
   - You can also drag the file into a browser window.

> The project consists of only three core files, so there is no additional setup needed.

---

## Usage

### Adding a Task
- Type a task description into the input field at the top.
- Press **Enter** or click the **Add** button.

### Editing a Task
- Click the **Edit** (pencil) icon next to a task.
- The task text becomes editable; modify it and press **Enter** or click **Save**.

### Deleting a Task
- Click the **Delete** (trash) icon next to the task you wish to remove.

### Completing a Task
- Click the checkbox (or the task text) to toggle its completed state. Completed tasks are shown with a strikethrough style.

### Filtering Tasks
- Use the **All**, **Active**, and **Completed** buttons at the bottom to filter the visible list.

---

## Persistence

All tasks are stored in the browser’s `localStorage` under the key `"todo-tasks"`. The app automatically loads saved tasks on page load, so your list persists across page reloads and browser sessions.

---

## Responsive Design

The layout adapts to various screen sizes using a flexible grid and media queries. Below are placeholder images; replace them with actual screenshots of the app on different devices.

```
[Desktop view screenshot]
[Tablet view screenshot]
[Mobile view screenshot]
```

---

## Contribution Guide

1. **Fork** the repository.
2. **Clone** your fork locally.
3. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes, ensuring the existing functionality remains intact.
5. **Commit** with a clear message and **push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request** against the `main` branch of the original repository.
7. Your PR will be reviewed, and once approved, it will be merged.

---

## License

[Insert License Here – e.g., MIT License]

---

**File References**
- `index.html` – Markup for the UI.
- `styles.css` – Styling and responsive layout.
- `app.js` – Core JavaScript handling task operations, UI interactions, and persistence.
