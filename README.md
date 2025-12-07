# HR Workflow Designer

A visual workflow designer for HR processes, built with Next.js and React Flow. This tool allows users to create, edit, and simulate HR workflows using a drag-and-drop interface.

## Features

- **Visual Workflow Editor:** Drag and drop nodes to design HR workflows.
- **Node Types:**
  - **Start Node:** Entry point of the workflow.
  - **Task Node:** Manual task with assignee and description.
  - **Approval Node:** Approval step with approver role and auto-approve settings.
  - **Automated Node:** Automated action (integration, script, etc.).
  - **End Node:** Marks the end of the workflow.
- **Sidebar:** Palette of node types for easy workflow construction.
- **Node Form Panel:** Edit properties of selected nodes.
- **Simulation Panel:** Simulate the workflow to see the sequence of steps and detect unreachable nodes.
- **Modern UI:** Clean, responsive design using CSS and React Flow styles.

## Tech Stack

- **Frontend:** React, Next.js (App Router), TypeScript, React Flow
- **Backend:** Next.js API routes for workflow simulation

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Main app entry, layout, and page components
- `src/components/` — UI components (Sidebar, Canvas, NodeFormPanel, SandboxPanel, node types)
- `src/hooks/` — Custom React hooks for workflow state management
- `src/utils/` — Utility functions (serialization, types)
- `pages/api/` — API routes for workflow simulation and automations
- `styles/` — Global and component styles

## Simulation API

- **Endpoint:** `/api/simulate`
- **Description:** Accepts a workflow graph (nodes and edges) and returns the sequence of execution steps using a breadth-first traversal. Warns if any nodes are unreachable.

## Usage

1. Use the sidebar to drag nodes onto the canvas.
2. Connect nodes to define the workflow.
3. Click a node to edit its properties in the form panel.
4. Use the simulation panel to test the workflow logic.