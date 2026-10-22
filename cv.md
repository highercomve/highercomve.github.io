# Sergio Alejandro Marin Zambrano (Sergio Marin)

**Senior Software Engineer | Solution Architecture, Distributed Systems & Cloud Orchestration | MCP & AI Workflow Automation**

Santiago, Chile · Remote

sergio.alejandro.mz@gmail.com · linkedin.com/in/highercomve · github.com/highercomve · gitlab.com/highercomve · medium.com/@highercomve · twitter.com/highercomve

Web version: https://highercomve.github.io/

## Professional Summary

Senior software engineer with 18 years turning complex distributed systems into reliable products, from Linux edge devices to Kubernetes clouds. Top individual contributor to Pantacor's open-source over-the-air update platform, used in production by large manufacturers whose engineering teams I work with directly. Earlier, as Technical Lead, I led product and frontend teams of 6 to 8 at uBiome and Escuelaweb.

Most recently I architected and built Pantacor's remote build platform — builder, runners, API and MCP server — so AI assistants can take an app from source code to a signed image running on a device. I also run the platform in production: I'm always on call, and I built its observability (Prometheus, Grafana, OpenTelemetry), Stripe billing and code-signing PKI. On my own time I ship local-AI apps in Zig, Rust and Python with llama.cpp, whisper.cpp, RAG and LLM evals. I'm looking to bring that to teams building AI infrastructure and workflow automation.

## Highlights

- **Build platform, from the ground up** — builder service, sandboxed runners, API and MCP tools that turn source code into signed, multi-arch device images
- **AI workflow automation** — MCP server (34 tools) with its own OAuth 2.1 authorization server, plus an Agent Skill that lets AI assistants build and deploy device apps
- **15,000+ devices** — one customer fleet runs on Pantacor Fleet, which I architected and have built almost single-handedly since 2020
- **3,500+ commits** across the Pantacor platform since 2019, and always on call for it in production

## Core Competencies

- Distributed Systems & Edge Compute
- Cloud Architecture & Orchestration
- Solution Architecture & Customer Integration
- MCP Servers & AI Agent Tooling
- Workflow Automation & CI/CD Pipelines
- Frontend & Backend Engineering
- DevOps & Continuous Integration
- Technical Leadership & Mentorship

## Technical Skills

Go (Golang), Python, Rust, Zig, TypeScript / JavaScript, Node.js, Model Context Protocol (MCP), Agent Skills, AI coding agents (Claude Code, Codex), llama.cpp / whisper.cpp, RAG / vector search, LLM evals / prompt engineering, OpenAI-compatible APIs, Docker / Docker BuildKit, Kubernetes / Helm / k3s, Bare-metal Kubernetes (Scaleway, Hetzner), Amazon Web Services (AWS Lambda, AWS S3), Google Cloud, Microservices / REST APIs, OpenAPI / Swagger, MQTT, Apache Kafka / Kafka Connect / Debezium (CDC), Transactional outbox, OAuth 2.1 / OIDC / PKCE, WebAuthn / passkeys, SpiceDB / OPA, X.509 PKI / code signing / TPM 2.0, On-call / incident response, OpenTelemetry / Prometheus / Grafana, Elasticsearch / Kibana / Fluentd (EFK), Stripe, CI/CD / GitLab CI, gosec / govulncheck, Linux / Linux containers, Yocto / Buildroot / kas / Embedded Linux, Cross-compilation (Docker Buildx, QEMU, musl), D-Bus / ConnMan / NetworkManager, Bluetooth LE (BlueZ), WireGuard / Tailscale, Bash, React / React Native / Vue.js, Kotlin, Ruby / Ruby on Rails / ActiveRecord / ORMs, PHP, PostgreSQL / MySQL / SQL, MongoDB, Nginx, TDD / Playwright / Testcontainers

## Professional Experience

### Senior Software Engineer — Pantacor

March 2019 – Present · pantacor.com - Go / Kubernetes / MongoDB / Kafka / MQTT / OAuth 2.1 / MCP / OpenTelemetry / React / Python

- Architected and built Pantacor's multi-tenant remote build platform (Go, MongoDB) on the platform's bare-metal Kubernetes, with runners on dedicated build hosts: atomic job claims, heartbeat recovery and sandboxed Docker BuildKit builds turn container images and Git repositories (Dockerfile, Yocto/kas, Buildroot) into signed images for 5 CPU architectures, with a GitHub Action client written in Python.
- Made the platform AI-native: built the Pantacor Hub MCP server on the official MCP Go SDK (34 tools plus prompts, Streamable HTTP, 63 tests) with its own OAuth 2.1 authorization server (Dynamic Client Registration, PKCE) for any AI agent: Claude, ChatGPT, Codex, OpenCode and more, and the pantavisor-apps Agent Skill that lets AI assistants build and deploy device apps with human approval.
- Architected and built Pantacor Fleet almost single-handedly since 2020 (900+ of ~950 commits), the fleet-management platform used by several companies, including Mycroft AI, the largest running 15,000+ Linux devices on it (Go/React): phased rollouts with automatic halt on error thresholds, a state-merging deployment engine on a lease-based MongoDB worker engine, event-driven webhook sync, three-layer authorization (JWT, OPA, SpiceDB/Zanzibar-style ReBAC), OpenTelemetry tracing, an OpenAPI spec (108 operations) and its CLI.
- Top individual contributor to the Pantahub core API (600+ commits) and owner of its security architecture: passkeys and 2FA, OAuth/PKCE and Entra ID SSO, TPM device identity and certificate revocation (CRLs), a certificate authority for OEM code signing, AES-GCM encrypted secrets and gosec/govulncheck CI gates; designed a power-loss-safe device secret rotation protocol. Also built MQTT push OTA updates and web SSH.
- Lead the hosted platform's bare-metal Kubernetes infrastructure (Scaleway, Hetzner; Helm, Kafka, AWS S3), always on call for it. Built its observability stack (Prometheus, Grafana, OpenTelemetry/Jaeger, EFK) and its webhooks service: an at-least-once, idempotent pipeline on Kafka Connect/Debezium CDC with a transactional outbox, dead-letter queue, replay and HMAC-signed delivery.
- Built the subscription billing service on Stripe (Go, MongoDB): prorations, invoices, webhooks and the billing UI.
- Led a 12-person cross-company team (2 at Pantacor, 8 at the customer, 2 at its manufacturing partner) integrating a large global manufacturer onto Pantacor Fleet, 15,000+ devices shipped worldwide in its first product generation: a dedicated cluster, coordinated OTA updates across the two computers in each device, and user-accepted updates.
- Core maintainer of the web dashboard (React 19, Vite; 800+ commits), pvr (Go CLI, 500+ commits), pvflasher (2.7x faster than the balenaEtcher engine), pvwificonnect (D-Bus, BLE), pantavisor-mocker (Zig) and container-ci (used by 12+ projects).

### Founder & Engineer — forEach developer

Ongoing · foreachdeveloper.com - open-source studio, built with AI coding agents (Claude Code, Codex) - Zig / Rust / Python / TypeScript / llama.cpp / whisper.cpp / MCP

- Built Oriel, an open-source Zig framework for desktop and mobile apps with built-in local AI (llama.cpp, whisper.cpp, Kokoro TTS, sqlite-vec); 63 releases.
- Shipped GhostReel (Rust): local video search and AI editing with Whisper, vision-language models, hybrid full-text + vector search, an LLM-as-judge with replay evals and a 19-tool MCP server; 29 releases.
- Shipped GhostPen (offline AI writing, dictation and meeting transcription; 28 releases) and highllama (Python): local LLM serving with a contamination-free coding benchmark (pass@1 across 8 languages).

### Technical Lead (from Senior Software Engineer) — uBiome

June 2017 – January 2019 · ubiome.com - Product Engineering - Node.js / Vue.js / PostgreSQL / PHI / CI / A/B testing

- Led the 8-person frontend team for the customer product: patient and doctor apps with test results and reports, and the checkout, all handling Protected Health Information (PHI).
- Drove the company-wide Vue.js component library (internal npm), used by all 6 frontend teams of 4–10 engineers.
- Migrated 5 production apps from Meteor to Vue.js (load time 30 s to 5 s); set up TDD, CI (Drone) and A/B testing.

### Senior Software Engineer — Payfully

June 2016 – May 2017 · payfully.co - Node.js / AWS Lambda / React / React Native

- First engineer after the CTO: built the AWS Lambda/Node.js microservices platform and the React web, React Native and admin apps; onboarded every new developer.

### Software Developer — Retiqueta

2015 – 2016 · retiqueta.com - Ruby on Rails / MySQL / Ionic / Docker / Kubernetes

- Built the Ionic mobile app and Ruby on Rails API (MySQL) for a second-hand fashion marketplace, on Docker and Kubernetes (Google Container Engine) with CI and end-to-end tests.

### Technical Lead & Instructor (from Software Developer) — Escuelaweb

2008 – 2015 · escuelaweb.net - Ruby on Rails / PHP / PostgreSQL / MySQL / WebRTC / AWS S3 / JavaScript

- Grew from developer to Technical Lead; led a 6-person team (2 designers, 4 developers) that built the learning platform from scratch for 3,500+ students: reservations, instructor payments, PDF certificates, recorded classes, assignments and exams (Ruby on Rails, AWS S3).
- Built live classes on WebRTC in 2014 (chat, note-taking, file sharing); designed its PostgreSQL schemas and migrations.
- Delivered PHP, Rails and WordPress projects for consulting clients, including the high-traffic news site lapatilla.com; taught web development for 6 years and mentored engineers into international careers.

## Education

**Telecommunications Engineer**

Universidad Católica Andrés Bello — 2009

## Languages

- **English**: advanced (written and verbal) · **Spanish**: native

## Talks

- **Open Source Summit North America (Linux Foundation)** — Austin, TX (June 2022). Hands-on workshops.
- **Noders JS** — Santiago, Chile (2019): React Hooks · **La Plata JS** — Argentina (2018): web components [slides](http://slides.com/highercomve/web-components)
