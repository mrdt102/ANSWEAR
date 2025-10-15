#!/usr/bin/env bash
set -euo pipefail

echo "[*] Checking Compose endpoints..."
curl -fsS http://localhost:8080/health | grep -q "OK"
curl -fsS http://localhost:8080/ | grep -qi "welcome"
curl -fsS http://localhost:8080/api/messages >/dev/null

echo "OK: Compose app is responding."
