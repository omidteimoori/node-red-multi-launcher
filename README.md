# Multi-Instance Node-RED Launcher

---

### Additions in This Project

This project includes:
- Cross-platform support with `mac_start_all.command` (macOS), `windows_start_all.bat` (Windows), and `linux_start_all.sh` (Linux)
- Automated generation of 10 independent Node-RED instances by default
- A user-friendly launcher experience via double-click files
- A cross-platform reset script to clear every instance back to a clean state
- A minimal structure containing only the files needed to run the launcher

This project allows you to run **10 isolated instances** of Node-RED on a single computer, each with its own port and configuration. It's fully cross-platform and portable and works on **macOS, Windows, and Linux**.

Each instance:
- Runs independently (ports 1990 to 1999)
- Has its own `userDir` and flow file
- Can be launched via double-click (no terminal knowledge needed)

---

## Quick Start

1. Clone the project:
   ```bash
   git clone https://github.com/omidteimoori/node-red-multi-launcher.git
   ```
2. Go into the project folder:
   ```bash
   cd node-red-multi-launcher
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set the maximum number of instances in `Multi-launcher/generate-instances.js` by changing `INSTANCE_COUNT` if you do not want the default of `10`.
5. Apply that change and generate the instance settings:
   ```bash
   npm run generate
   ```
6. Use the launcher for your operating system from the `Multi-launcher/` folder.

---

## How to Use

### macOS

1. After cloning and installing dependencies, set `INSTANCE_COUNT` in `Multi-launcher/generate-instances.js` if you want a number other than the default `10`
2. Run:
   ```bash
   npm run generate
   ```
   This applies your chosen instance count and generates the settings and folders. By default it creates 10 instances (`instance_0` to `instance_9`) on ports `1990` to `1999`.
3. **Double-click** `Multi-launcher/mac_start_all.command`
   If double-click does not work, run it from Terminal using the full path to the launcher, for example:
   ```bash
   /absolute/path/to/node-red-multi-launcher/Multi-launcher/mac_start_all.command
   ```
4. Open your browser and go to:
   - http://localhost:1990
   - ...
   - http://localhost:1999
5. To stop all running instances:
   ```bash
   pkill node-red
   ```
   Closing the Terminal window does not stop the detached Node-RED processes.

---

### Windows

1. After cloning and installing dependencies, set `INSTANCE_COUNT` in `Multi-launcher/generate-instances.js` if you want a number other than the default `10`
2. Run:
   ```bash
   npm run generate
   ```
   This applies your chosen instance count and generates the settings and folders. By default it creates 10 instances (`instance_0` to `instance_9`) on ports `1990` to `1999`.
3. **Double-click** `Multi-launcher/windows_start_all.bat`
4. Open your browser and go to:
   - http://localhost:1990
   - ...
   - http://localhost:1999
5. To stop all running instances:
   - Close each `Node-RED <n>` Command Prompt window that opened from the launcher, or run:
   ```bat
   taskkill /F /FI "WINDOWTITLE eq Node-RED *"
   ```

---

### Linux

1. After cloning and installing dependencies, set `INSTANCE_COUNT` in `Multi-launcher/generate-instances.js` if you want a number other than the default `10`
2. Run:
   ```bash
   npm run generate
   ```
   This applies your chosen instance count and generates the settings and folders. By default it creates 10 instances (`instance_0` to `instance_9`) on ports `1990` to `1999`.
3. Run:
   ```bash
   chmod +x Multi-launcher/linux_start_all.sh
   ./Multi-launcher/linux_start_all.sh
   ```
4. Open your browser and go to:
   - http://localhost:1990
   - ...
   - http://localhost:1999
5. To stop all running instances:
   ```bash
   pkill node-red
   ```
   Closing the terminal that launched the script does not stop the detached Node-RED processes.

---

## Stop All Instances

- macOS:
  ```bash
  pkill -f 'node_modules/node-red/red.js'
  ```
- Windows:
  ```bat
  taskkill /F /FI "WINDOWTITLE eq Node-RED *"
  ```
- Linux:
  ```bash
  pkill -f 'node_modules/node-red/red.js'
  ```

## Reset All Instances

If you want to reset everything after stopping Node-RED, use one of the reset launchers in `Multi-launcher/reset/`:

- Windows: double-click `Multi-launcher/reset/windows_reset_all.bat`
- macOS: double-click `Multi-launcher/reset/mac_reset_all.command`
- Linux: run `Multi-launcher/reset/linux_reset_all.sh` directly, or double-click it if your desktop is configured to run executable scripts

```bash
npm run reset
```

After the reset completes, set `INSTANCE_COUNT` again if needed, then run `npm run generate` before starting Node-RED again.

---

## Folder Structure

```
nodered-multi/
├── node_modules/                 ← Local Node-RED install
├── userDir/                      ← Data folders for each instance (instance_0 to instance_9)
├── Multi-launcher/              ← Custom multi-instance launcher files
│   ├── settings/                 ← Auto-generated settings files for each instance
│   ├── linux_start_all.sh        ← Linux launcher
│   ├── mac_start_all.command     ← Double-click entry point for macOS users
│   ├── windows_start_all.bat     ← Double-click entry point for Windows users
│   ├── generate-instances.js     ← Script to generate userDir/settings structure
│   └── reset/
│       ├── linux_reset_all.sh    ← Linux reset launcher
│       ├── mac_reset_all.command ← macOS reset launcher
│       ├── reset_instances.js    ← Cross-platform reset script
│       └── windows_reset_all.bat ← Windows reset launcher
├── package.json                  ← Project dependencies
├── package-lock.json             ← Exact dependency versions
├── .gitignore                    ← Files to ignore in Git (macOS, logs, etc.)
└── LICENSE                       ← MIT License from original base project
```

---

## Based On

This project is based on
**[TotallyInformation's alternate-node-red-installer](https://github.com/TotallyInformation/alternate-node-red-installer)**.

The original project and core upstream work were created by **Julian Knight (Totally Information)**.
This multi-instance launcher keeps that attribution and remains distributed under the MIT License.

---

## Licensing

This project is licensed under the [MIT License](LICENSE).

Original upstream copyright:
- Julian Knight

Additional multi-instance launcher, cross-platform launcher, and reset workflow changes:
- Omid Teimoori

---

## Requirements

- Node.js 25.9.0
- npm 11.12.1
- macOS, Windows, or Linux

---

## Contact

Created by Omid Teimoori  
[Website](https://omidteimoori.com/) | [GitHub](https://github.com/OmidTeimoori) | [LinkedIn](https://linkedin.com/in/omidteimoori)

Repository: https://github.com/omidteimoori/node-red-multi-launcher
