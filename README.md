# HR Workflow Automation

## Description

This project is a Next.js application designed for building and simulating HR workflow automations. The architecture is modular and component-driven, with the following structure:

- **Frontend (Next.js, React, TypeScript):**
   - `src/components/`: Contains reusable UI components, including workflow nodes (Start, End, Task, Approval, Automated) and panels for user interaction.
   - `src/app/`: Main application entry, global styles, and layout.
   - `src/hooks/`: Custom React hooks for managing workflow state and logic.
   - `src/utils/`: Utility functions for serialization and type definitions.
- **API Routes:**
   - `pages/api/automations.ts`: Handles automation-related backend logic.
   - `pages/api/simulate.ts`: Handles workflow simulation requests.
- **Styling:**
   - Uses CSS modules and global styles for consistent theming.

## How to Run

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).

## Design Decisions

- **Component-based Node System:** Each workflow node (Start, End, Task, Approval, Automated) is a separate React component, making it easy to extend and maintain.
- **TypeScript:** Ensures type safety and better developer experience.
- **Next.js API Routes:** Used for backend logic, keeping the project full-stack within a single codebase.
- **Custom Hooks:** Encapsulate workflow logic and state management for reusability.
- **Separation of Concerns:** UI, logic, and data serialization are separated for clarity and scalability.

## What Was Completed

- Core workflow builder UI with draggable nodes and connections.
- Node types for Start, End, Task, Approval, and Automated steps.
- Panels for node configuration and workflow simulation.
- API endpoints for automation and simulation logic.
- Basic styling and layout.

## What Could Be Added with More Time

- Persistent storage (e.g., database integration) for saving and loading workflows.
- Advanced simulation features (e.g., step-by-step execution, error handling).
- More node types (e.g., conditional branches, parallel tasks).
- Enhanced UI/UX (animations, better error messages, mobile responsiveness).
- Documentation for API endpoints.
