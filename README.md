<p align="center">
  <img src="public/Taskforge-New-Logo.svg" alt="TaskForge logo" width="110"/>
</p>

<h1 align="center">TaskForge Desktop</h1>

<p align="center">
  <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite"/></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B1F26" alt="React"/></a>
  <a href="https://tauri.app"><img src="https://img.shields.io/badge/Tauri-2-24C6DC?logo=tauri&logoColor=white" alt="Tauri"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"/></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/Bun-latest-000000?logo=bun&logoColor=white" alt="Bun"/></a>
  <a href="https://github.com/css-modules/css-modules"><img src="https://img.shields.io/badge/CSS%20Modules-styled-1572B6?logo=css3&logoColor=white" alt="CSS Modules"/></a>
</p>

The native desktop app for TaskForge — the same task and organization management UI as the web client, built with Vite + React 19 and React Router, packaged as a lightweight Windows/macOS/Linux application with Tauri 2. Ships the full project dashboard: Kanban board, progress header, timeline, velocity and distribution analytics, and a live activity feed.

**🖥️ There is no server runtime in this app — the UI is a static Vite bundle served inside a Tauri webview, talking to the TaskForge backend API over HTTP/WebSocket (see `.env.example`).**

## Features

- **Authentication System**: Secure login/registration with JWT token management
- **Organization Management**: Create, manage, and invite team members to organizations
- **Dashboard**: Central hub for viewing and managing tasks and team information
- **Project Mission Control**: per-project dashboard with a progress header, Gantt-style
  timeline, weekly velocity chart, priority distribution donut and a live activity feed
- **Kanban Board**: real-time drag-and-drop board with multi-assignee avatar clusters,
  colored labels, due dates and per-card progress pills
- **Project Import/Export**: portable JSON project templates with a preview-before-import flow
- **Real-time UI Updates**: Powered by React Query for efficient server state management
- **Custom Design System**: Glassmorphism dark theme with pure CSS and CSS Modules
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **API Integration**: Seamless connection to Django backend API

## Tech Stack

- **Framework**: [Vite 8](https://vite.dev) + [React Router](https://reactrouter.com) (HashRouter)
- **Desktop**: [Tauri 2](https://tauri.app) - Native desktop app framework
- **Backend**: [Rust](https://www.rust-lang.org) (Tauri backend)
- **Runtime**: [Bun](https://bun.sh)
- **Language**: JavaScript (ES2024) + Rust
- **Charts**: `recharts` - Dashboard analytics (velocity & distribution)
- **Styling**: Pure CSS with CSS Modules + Custom Design System
- **State Management**: 
  - `zustand` - Client/auth state
  - `@tanstack/react-query` - Server state & API caching
- **Forms & Validation**:
  - `react-hook-form` - Form state management
  - `@hookform/resolvers` - Form validation integration
  - `zod` - Schema validation
- **Theme**: `next-themes` - Light/dark theme support
- **Dev Tools**: ESLint 9

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.0+ (or Node.js 20+)
- A running instance of the TaskForge Django backend

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd taskforge-frontend
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure environment variables:**

   Update `.env` in the project root with your configuration:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_WS_URL=ws://localhost:8000
   ```
   Production values live in `.env.production` and are used by `bun run build`.

4. **Start the development server:**
   ```bash
   bun run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Desktop App (Tauri)

This branch includes a **Tauri desktop application** setup for running TaskForge as a native desktop app on Windows, macOS, and Linux.

### Tauri Quick Start

#### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (Required for Tauri)
- [Bun](https://bun.sh) v1.0+ (or Node.js 20+)
- Platform-specific requirements:
  - **Windows**: Visual Studio Build Tools 2019+ or Visual Studio Community with C++ workload
  - **macOS**: Xcode and Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: `libwebkit2gtk-4.1-dev`, `build-essential`, `curl`, `wget`, `openssl`, `libssl-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`

#### Development

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Run in development mode:**
   ```bash
   bun run tauri dev
   ```
   This will:
   - Start the Vite development server on `http://localhost:5173`
   - Launch the Tauri desktop window pointing to the dev server
   - Hot-reload enabled for both frontend and backend changes

3. **DevTools:**
   - In the Tauri window, press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (macOS) to open developer tools

#### Building for Production

Build the desktop app for your platform:

```bash
# Build for current platform
bun run tauri build

```

**Output locations:**
- **Windows**: `src-tauri/target/release/bundle/msi/` or `.exe`
- **macOS**: `src-tauri/target/release/bundle/dmg/` or `.app`
- **Linux**: `src-tauri/target/release/bundle/deb/`, `.rpm`, or AppImage

#### Available Tauri Scripts

```bash
# Development mode (Rust + Vite hot reload + Desktop window)
bun run tauri dev

# Production build
bun run tauri build

# Build only the frontend (used internally by Tauri)
bun run build

# Run the Vite dev server only
bun run dev
```

### Tauri Project Structure

```
src-tauri/
├── src/
│   ├── main.rs              # Tauri app entry point
│   └── lib.rs               # Rust library code
├── Cargo.toml               # Rust dependencies
├── tauri.conf.json          # Tauri configuration
├── build.rs                 # Build script
├── capabilities/            # Security capabilities
│   └── default.json         # Default capability set
└── icons/                   # App icons for all platforms
```

### Configuration

**`src-tauri/tauri.conf.json`** contains Tauri settings:

- **`build`**: Build & dev commands
  - `beforeDevCommand`: Runs `bun run dev` before starting Tauri dev
  - `beforeBuildCommand`: Runs `bun run build` before production build
  - `frontendDist`: Points to `../dist` (Vite build output)
  - `devUrl`: Points to `http://localhost:5173` (Vite dev server)

- **`app`**: Window configuration
  - Window size: 1200x900
  - Resizable and non-fullscreen by default
  - CSP set to null for local development

- **`bundle`**: Distribution settings
  - Identifier: `com.taskforge.app`
  - Bundled for all platforms by default
  - App icons included for all platforms

### Communicating Between Frontend and Rust Backend

You can invoke Rust commands from the frontend using the Tauri API:

**Rust side** (`src-tauri/src/main.rs`):
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

**Frontend side** (React component):
```javascript
import { invoke } from '@tauri-apps/api/core';

async function greet() {
  const response = await invoke('greet', { name: 'TaskForge' });
  console.log(response);
}
```

### Platform-Specific Features

- **File I/O**: Access local file system for saving/loading project files
- **Native Notifications**: Send desktop notifications for task updates
- **System Integration**: Register app with OS for opening file types
- **Tray Integration**: Add app to system tray for quick access

### Debugging

1. **Console logs in Tauri window**: Press `Ctrl+Shift+I` to open DevTools
2. **Rust logs**: Check terminal output where you ran `bun run dev`
3. **Common issues**:
   - **Port 5173 in use**: Kill the process or change `devUrl` in `tauri.conf.json` and the port in `vite.config.js`
   - **Build fails**: Ensure Rust is installed with `rustc --version`
   - **Icon issues**: Regenerate icons in `src-tauri/icons/` if needed

### Updating Tauri

To update Tauri to the latest version:

```bash
bun update @tauri-apps/cli @tauri-apps/api
```

Then update Rust:
```bash
rustup update
```

### Troubleshooting

#### Windows Build Issues
Ensure Visual Studio Build Tools are installed:
```powershell
# Install via winget
winget install -e --id Microsoft.VisualStudio.Community
```

#### macOS Code Signing (for distribution)
For App Store or outside distribution, you'll need to sign the app. Configure in `src-tauri/tauri.conf.json` or use Xcode.

#### Linux Permissions
On Linux, you may need to make the binary executable:
```bash
chmod +x src-tauri/target/release/taskforge-frontend
```

### Resources

- [Tauri Documentation](https://tauri.app)
- [Tauri API Reference](https://docs.rs/tauri)
- [Tauri Community](https://discord.gg/tauri)

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.jsx               # Root layout
│   ├── page.jsx                 # Home page
│   ├── globals.css              # Global styles & CSS variables
│   ├── (auth)/                  # Auth route group
│   │   ├── login/
│   │   └── register/
│   └── (dashboard)/             # Dashboard route group
│       ├── page.jsx             # Dashboard home
│       └── orgs/[slug]/         # Organization detail page
│
├── components/                   # Reusable React components
│   ├── auth/                    # Authentication forms
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── QueryProvider.jsx
│   ├── orgs/                    # Organization components
│   │   ├── OrgCard.jsx
│   │   ├── MemberTable.jsx
│   │   └── InviteModal.jsx
│   └── ui/                      # Reusable UI components
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       └── Avatar.jsx
│
├── lib/                         # Utilities and helpers
│   ├── api/                     # API client functions
│   │   ├── client.js           # Axios instance with auth
│   │   ├── auth.js             # Auth API endpoints
│   │   └── orgs.js             # Organization API endpoints
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js          # Auth hook
│   │   └── useOrgs.js          # Organizations hook
│   ├── store/                   # Zustand stores
│   │   └── authStore.js        # Authentication state
│   └── types/                   # Type definitions
│
└── public/                       # Static assets
```

## Architecture & Design Decisions

### State Management Architecture

We maintain a strict separation between **auth state** and **server state**:

- **Zustand (`authStore.js`)**: Manages client-side authentication state
  - User profile information
  - JWT tokens
  - Authentication status
  - Persisted to `localStorage` via middleware

- **TanStack Query**: Manages all server state
  - Organization data
  - Task information
  - Automatic caching & invalidation
  - Real-time synchronization

### Authentication Flow

1. User logs in via the login form
2. Backend returns JWT token
3. Token is stored in Zustand store with persistence
4. Token automatically included in all API requests via `client.js`
5. Route protection handled by middleware checking `taskforge_authenticated` cookie

### Token Storage Strategy

**Local Storage** (not `httpOnly` cookies) is used for:
- **Pros**: Simpler local development, easier debugging, portfolio-friendly
- **Cons**: Vulnerable to XSS attacks in production

In production, consider migrating to `httpOnly` cookies with CSRF protection.

### Styling Approach

We use **pure CSS with CSS Modules** instead of Tailwind CSS for:
- **Total aesthetic control** over the glassmorphism dark theme
- **CSS Custom Properties** (`globals.css`) for centralized design tokens
- **Scoped styling** via `*.module.css` files preventing class conflicts
- **Smaller bundle size** compared to utility-first frameworks

## Development

### Available Commands

**For Web Development (Browser Only):**
```bash
# Start Vite development server with hot reload
bun run dev

# Build the frontend for production
bun run build

# Preview the production build locally
bun run preview
```

**For Desktop App Development (Tauri + Browser):**
```bash
# Start Tauri development mode (includes Vite dev server and desktop window)
bun run tauri dev

# Build desktop app for current platform
bun run tauri build
```

**Other:**
```bash
# Run ESLint
bun run lint
```

### Development Workflow

1. Create a new branch for your feature
2. Make changes to components/pages
3. Test locally at `http://localhost:5173`
4. Ensure linting passes: `bun run lint`
5. Commit and push changes

### Adding New Pages

1. Create a new folder in `src/app/(dashboard)` or `src/app/(auth)`
2. Add a `page.jsx` file:
   ```jsx
   export default function PageName() {
     return (
       <div>
         {/* Your content */}
       </div>
     );
   }
   ```

### Adding New Components

1. Create a component in `src/components/[category]/ComponentName.jsx`
2. Create a corresponding style file `ComponentName.module.css`
3. Export from the component directory if needed

### API Integration

All API calls should use the client from `src/lib/api/client.js`:

```javascript
import client from '@/lib/api/client';

export async function getOrganizations() {
  const { data } = await client.get('/api/orgs/');
  return data;
}
```

The client automatically:
- Attaches JWT authentication headers
- Handles base URL configuration
- Includes request/response interceptors

## Building & Deployment

### Build for Production

```bash
bun run build
```

This creates an optimized production build in the `dist` directory.

### Environment Variables for Production

Update `.env.production` with production values:
```env
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com
```

## API Documentation

The frontend communicates with a Django REST API. Key endpoints:

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### Organizations
- `GET /api/orgs/` - List user's organizations
- `POST /api/orgs/` - Create new organization
- `GET /api/orgs/{slug}/` - Get organization details
- `PUT /api/orgs/{slug}/` - Update organization
- `DELETE /api/orgs/{slug}/` - Delete organization
- `POST /api/orgs/{slug}/invite/` - Invite member to organization

### Tasks
- `GET /api/tasks/` - List tasks
- `POST /api/tasks/` - Create task
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

For complete API documentation, see the [TaskForge Backend](https://github.com/taskforge/backend) repository.

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or specify a different port
bun run dev -- --port 5174
```

### API Connection Issues

1. Ensure Django backend is running on `http://localhost:8000`
2. Check `VITE_API_URL` in `.env`
3. Verify CORS settings in Django backend
4. Check browser console for network errors

### Clear Cached Data

```bash
# Clear the build output
rm -rf dist

# Clear Zustand store (browser dev tools)
# Open DevTools → Application → Local Storage → Remove taskforge entries
```

## Performance Optimization

- **Code Splitting**: Next.js automatically code-splits routes
- **Image Optimization**: Use `next/image` for images
- **CSS-in-JS**: CSS Modules prevent unused styles from being shipped
- **Query Caching**: React Query caches API responses automatically

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the TaskForge SaaS application. See the main repository for license details.

## Support

For issues, questions, or suggestions:
1. Check existing [GitHub Issues](https://github.com/taskforge/frontend/issues)
2. Create a new issue with detailed information
3. Include screenshots or error logs when applicable

## Related Projects

- [TaskForge Backend](https://github.com/Abdullah-Masood-05/taskforge-backend.git) - Django REST API
