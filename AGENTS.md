# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Structure (Non-Obvious Only)

- **NOT a monorepo**: Each `topics/` subdirectory is COMPLETELY INDEPENDENT Spring Boot app
- **Different packages**: `com.uitc` (transaction-monitor) vs `com.krtc` (journey-analysis, station-system) - intentional separation
- **Root is NOT the app**: HTML/CSS/JS in root are workshop landing page, NOT the Spring Boot apps
- **Intentionally incomplete**: Missing features marked "待實作" are BY DESIGN for workshop exercises

## Build Commands (Critical)

```bash
# Maven wrapper MUST run from project directory, NOT root
cd topics/transaction-monitor  # or journey-analysis, station-system
./mvnw spring-boot:run
```

## Non-Standard Patterns

- **Different H2 databases**: transaction-monitor uses `uitc_db`, others use `krtc_db` (check application.yml)
- **Static resources location**: `src/main/resources/static/` not `src/main/webapp/` (Spring Boot default)
- **No migrations**: Uses `data.sql` that runs on startup (H2 in-memory only)

## Critical Gotchas

- All apps use port 8080 - cannot run simultaneously
- Lombok required - compilation fails without IDE plugin
- No code sharing between projects - copy-paste if needed (workshop design)