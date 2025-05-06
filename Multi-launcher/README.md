# Multi-Instance Node-RED Launcher

---

## 🧾 Project Background

This launcher setup is built on top of  
[TotallyInformation’s alternate-node-red-installer](https://github.com/TotallyInformation/alternate-node-red-installer).

That project provides a local, flexible Node-RED installer without needing global packages or elevated permissions.

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

1. **Double-click** `start-all.command`
2. It will launch all 10 instances in the background
3. Open your browser and go to:
   - http://localhost:1880
   - http://localhost:1881  
   - ...
   - http://localhost:1889

> ⚠️ Requires [Node.js](https://nodejs.org/) installed

---

### Windows

1. **Double-click** `start-all.bat`
2. Ten Command Prompt windows will open (one per instance)
3. Access the dashboards in your browser:
   - http://localhost:1880
   - ...
   - http://localhost:1889

---

## 🧱 Folder Structure

```
nodered-multi/
├── node_modules/              ← Local Node-RED install
├── userDir/                   ← Data for each instance
├── settings/                  ← Custom settings files
├── internal-launch.sh         ← Helper script for macOS
├── start-all.command          ← Double-click entry point for macOS
├── start-all.bat              ← Double-click entry point for Windows
├── generate-instances.js      ← Generates settings and folders
├── package.json
└── README.md
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

## 🔒 Tip

To stop all running instances:
- macOS/Linux: `pkill -f node-red`
- Windows: Close the Command Prompt windows manually

---

## 📧 Contact

Created by Omid Teimoori  
[GitHub](https://github.com/OmidTeimoori) | [LinkedIn](https://linkedin.com/in/omidteimoori)
