# Multi-Instance Node-RED Launcher

---

### 🔧 Additions in This Project

This fork adds:
- Cross-platform support with `start-all.command` (macOS) and `start-all.bat` (Windows)
- Automated generation of 10 independent Node-RED instances
- A user-friendly launcher experience via double-click files
- Simplified structure for easy distribution or classroom use

This project allows you to run **10 isolated instances** of Node-RED on a single computer, each with its own port and configuration. It's fully cross-platform and portable — works on **macOS and Windows**.

Each instance:
- Runs independently (ports 1880 to 1889)
- Has its own `userDir` and flow file
- Can be launched via double-click (no terminal knowledge needed)

---

## 🚀 How to Use

### macOS

1. Run `npm install` from the project root
2. **(Optional)** If you want to regenerate settings and folders:
   ```bash
   node Multi-launcher/generate-instances.js
   ```
3. **Double-click** `Multi-launcher/start-all.command`
4. Open your browser and go to:
   - http://localhost:1880
   - ...
   - http://localhost:1889


---

### Windows

1. Run `npm install` from the root folder
2. **(Optional)** If you want to regenerate settings and folders:
   ```bash
   node Multi-launcher/generate-instances.js
   ```
3. **Double-click** `Multi-launcher/start-all.bat`
4. Open your browser and go to:
   - http://localhost:1880
   - ...
   - http://localhost:1889

---

## 🧱 Folder Structure

```
nodered-multi/
├── node_modules/                 ← Local Node-RED install
├── userDir/                      ← Data folders for each instance (instance_0 to instance_9)
├── Multi-launcher/              ← Custom multi-instance launcher files
│   ├── settings/                 ← Auto-generated settings files for each instance
│   ├── internal-launch.sh        ← Helper script for macOS (called by .command)
│   ├── start-all.command         ← Double-click entry point for macOS users
│   ├── start-all.bat             ← Double-click entry point for Windows users
│   ├── generate-instances.js     ← Script to generate userDir/settings structure
│   └── README.md                 ← Docs for this launcher system
├── package.json                  ← Project dependencies
├── package-lock.json             ← Exact dependency versions
├── .gitignore                    ← Files to ignore in Git (macOS, logs, etc.)
└── LICENSE                       ← MIT License from original base project
```

---

## 🛠 Based On

This setup is based on  
**[TotallyInformation’s alternate-node-red-installer](https://github.com/TotallyInformation/alternate-node-red-installer)** — a flexible, local installer for Node-RED.

---

## 🪪 Licensing

This project is licensed under the [MIT License](LICENSE), originally created by TotallyInformation.

Additional scripts and launcher automation for running 10 parallel Node-RED instances were added by Omid Teimoori. These are also shared under the MIT License.

---

## 📦 Requirements

- Node.js 18 or 20 (installed globally)
- macOS or Windows

---

## 📧 Contact

Created by Omid Teimoori  
[GitHub](https://github.com/OmidTeimoori) | [LinkedIn](https://linkedin.com/in/omidteimoori)