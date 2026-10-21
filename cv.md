# Sergio Alejandro Marin Zambrano (Sergio Marin)

**Senior Software Engineer | Solution Architecture, Distributed Systems & Cloud Orchestration | MCP & AI Workflow Automation**

Santiago, Chile · Remote

sergio.alejandro.mz@gmail.com · linkedin.com/in/highercomve · github.com/highercomve · gitlab.com/highercomve · medium.com/@highercomve · twitter.com/highercomve

Web version: https://highercomve.github.io/

## Professional Summary

Senior software engineer with 18 years turning complex distributed systems into reliable products, from Linux edge devices to Kubernetes clouds. Top individual contributor to Pantacor's open-source over-the-air update platform, used in production by large manufacturers whose engineering teams I work with directly.

Most recently I architected and built Pantacor's remote build platform — builder, runners, API and MCP server — so AI assistants can take an app from source code to a signed image running on a device. I learn fast and ship what I learn, and I'm looking to bring that to teams building AI infrastructure and workflow automation.

## Highlights

- **Build platform, from the ground up** — architected the builder service, runners, API and MCP tools that turn source code into signed, multi-arch device images
- **AI workflow automation** — MCP server with 34 tools and its own OAuth 2.1 authorization server, plus an Agent Skill that lets AI assistants build and deploy device apps
- **15,000+ devices** — one customer fleet runs on Pantacor Fleet, which I architected and have built almost single-handedly since 2020
- **2,500+ commits** across the Pantacor platform since 2019 — API, Fleet, web UI, CLI and hosted infrastructure
- **Security architecture** — passkeys and 2FA, OAuth 2.1 / SSO, TLS device onboarding, certificate revocation and device secret rotation
- **Enterprise customers** — technical partner to the engineering teams of large manufacturers, from solution design to production

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

Golang, Python, Rust, Model Context Protocol (MCP), Agent Skills, AI coding agents (Claude Code, Codex), llama.cpp / whisper.cpp, RAG / vector search, LLM evals / prompt engineering, OpenAI-compatible APIs, Docker, Kubernetes, Helm, k3s, Bare-metal Kubernetes (Scaleway, Hetzner), Amazon Web Services (AWS), Google Cloud, AWS Lambda, AWS S3, Microservices, MQTT, Apache Kafka, Kafka Connect / Debezium (CDC), Transactional outbox, OAuth 2.1 / OIDC / PKCE, WebAuthn / passkeys, SpiceDB / OPA, X.509 PKI / code signing, TPM 2.0, gosec / govulncheck, On-call / incident response, OpenTelemetry, Prometheus, Grafana, Elasticsearch / Kibana / Fluentd (EFK), Stripe, Docker BuildKit, REST APIs, OpenAPI / Swagger, CI/CD, GitLab CI, Linux, Linux containers, Yocto / Embedded Linux, Buildroot, kas, Cross-compilation (Docker Buildx, QEMU, musl), D-Bus, ConnMan / NetworkManager, Bluetooth LE (BlueZ), WireGuard / Tailscale, Bash, Zig, JavaScript, TypeScript, Node.js, React, React Native, Kotlin, Vue.js, Ruby, Ruby on Rails, ActiveRecord / ORMs, PHP, PostgreSQL, SQL, MongoDB, MySQL, Nginx, TDD, Playwright, Testcontainers

## Professional Experience

### Senior Software Engineer — Pantacor

March 2019 – Present · pantacor.com - Go / Kubernetes / MongoDB / AWS S3 / MQTT / Kafka / OAuth 2.1 / MCP / OpenTelemetry / Stripe / React / Zig / Python

- Architected and built Pantacor's remote build platform from the ground up: a multi-tenant build service (Go, MongoDB) with atomic job claims, heartbeat recovery and sandboxed, resource-limited Docker BuildKit runners. Customers turn a container image or Git repository (Dockerfile, Yocto/kas, Buildroot) into signed packages and flashable images for 5 CPU architectures, with encrypted secrets and usage quotas, from the API, pvr, the web UI or a GitHub Action client written in Python.
- Made the platform AI-native: designed the Pantacor Hub MCP server (34 tools, Streamable HTTP) with its own OAuth 2.1 authorization server (Dynamic Client Registration, PKCE, RFC 8414/8707) so claude.ai and Claude Code connect directly, and the pantavisor-apps Agent Skill that lets AI assistants (Claude Code, OpenCode, Codex) build, sign and deploy device apps, with human approval before every change.
- Architected and built Pantacor Fleet almost single-handedly since 2020 (900+ of ~950 commits), the release and fleet-management platform one customer runs 15,000+ Linux devices on (Go/React): rule-based channels, phased rollouts with label targeting and automatic halt on error thresholds, and a deployment engine that merges each device's state with conflict handling. It runs on a lease-based worker engine on MongoDB, syncs through signed webhook events instead of polling, authorizes in three layers (JWT, OPA, SpiceDB/Zanzibar-style ReBAC) and is traced end to end with OpenTelemetry; documented in OpenAPI (108 operations). Wrote its CLI (fleetcli) from scratch.
- Top individual contributor to the Pantahub core API (600+ commits) and owner of its security architecture: two-factor auth with passkeys, OAuth/PKCE and Entra ID single sign-on, TPM-based device identity, TLS onboarding and certificate revocation (CRLs), a Hub-operated certificate authority for OEM code-signing identities (CSR-only enrollment, key rotation and revocation) and AES-GCM envelope-encrypted secrets; designed a power-loss-safe device secret rotation protocol. Fixed the findings of a 2026 security review, made gosec/govulncheck gates block CI, and migrated the API to a new HTTP framework behind golden contract tests. Also built MQTT push-based OTA updates, remote commands, live logs and web SSH.
- Lead the hosted platform's infrastructure on bare-metal Kubernetes clusters at Scaleway and Hetzner (Helm, Kafka, backups), with object storage on AWS S3, and am always on call for it: incident response and production support, from devices that stop taking updates to production bugs, through to the fix. Built its observability stack: Prometheus, Grafana, OpenTelemetry/Jaeger, Elastic APM and Elasticsearch/Fluentd/Kibana. Built the event-driven webhooks service as an at-least-once, idempotent pipeline on Kafka Connect/Debezium change data capture, with a transactional outbox, dead-letter queue, replay and HMAC-signed delivery.
- Built Pantacor's subscription billing service on Stripe (Go, MongoDB, OpenTelemetry): subscriptions with upgrades, downgrades and prorations, invoices and Stripe webhooks, plus the billing UI.
- Partner with the engineering teams of large enterprise manufacturers to design and integrate over-the-air update and fleet-management solutions into their products and release pipelines.
- Also core maintainer of the web dashboard (React 19, Vite; 800+ commits; cut the entry bundle by two thirds), pvr (Go CLI, 500+ commits: binary delta updates, reproducible exports, BLE Wi-Fi provisioning), pvflasher (Go/Fyne image flasher, 2.7x faster than the balenaEtcher engine with full read-back verification), pvwificonnect (Wi-Fi onboarding over D-Bus with ConnMan/NetworkManager, captive portal and BLE Improv), pantavisor-mocker (Zig fleet simulator) and container-ci, whose multi-arch pvpkg.json package format I created and 12+ projects use.

### Founder & Engineer — forEach developer

Ongoing · foreachdeveloper.com - open-source studio - Zig / Rust / Python / TypeScript / llama.cpp / whisper.cpp / MCP

- Built Oriel, an open-source Zig framework for desktop and mobile apps (Linux, Windows, macOS, Android) with built-in local AI: llama.cpp, whisper.cpp, Kokoro TTS and sqlite-vec. 63 releases.
- Shipped GhostReel (Rust, React): local video search and AI-assisted editing with Whisper transcription, vision-language keyframe descriptions and hybrid full-text + vector search, a tool-calling editing agent with an LLM-as-judge and replay evals, and a 19-tool MCP server. CUDA, Vulkan, Metal and MLX builds; 29 releases.
- Shipped GhostPen: offline AI writing, dictation, live captions and meeting transcription with speaker diarization. Inference runs in an isolated helper process; moving it from Rust/Tauri to Zig cut idle memory by 55%. 28 releases.
- Built highllama (Python): a local LLM serving stack with MoE offload, a contamination-free coding benchmark (pass@1 across 8 languages), and a gateway that runs local-model sub-agents under Claude Code and Codex.
- Work with an agentic engineering workflow (Claude Code, Codex): architect, implementer and multi-model review agents.

### Technical Lead — uBiome

October 2018 – January 2019 · ubiome.com - Product Team - Vue.js / CI / A/B testing

- Led the migration of 5 production applications from Meteor to Vue.js.
- Cut application load time from 30 seconds to 5 seconds after leading a performance review.
- Built the shared component libraries, configuration, TDD workflow, CI, performance tracking and A/B testing that let the front-end team ship faster.

### Senior Software Engineer — uBiome

June 2017 – October 2018 · ubiome.com - Product Team - Node.js / Vue.js / PostgreSQL

- Built the patient and doctor applications — from ordering a kit to viewing results and reports — with Node.js, Vue.js and PostgreSQL.
- Established a TDD culture: ran internal training, set up the CI test pipeline (Drone) and gated merges on passing tests.

### Senior Software Engineer — Payfully

June 2016 – May 2017 · payfully.co - Node.js / AWS Lambda / React / React Native

- First engineer hired after the CTO: built the AWS Lambda/Node.js microservices platform and the React web, React Native and admin apps, and onboarded every new developer.

### Software Developer — Retiqueta

2015 – 2016 · retiqueta.com - Ruby on Rails / MySQL / Ionic / Docker / Kubernetes

- Built the Ionic mobile app and Ruby on Rails API (MySQL, ActiveRecord models and migrations) for a second-hand fashion marketplace, running on Docker and Kubernetes (Google Container Engine) with CI and end-to-end tests.

### Technical Lead (from Software Developer) — Escuelaweb

2008 – 2015 · escuelaweb.net - PHP / Ruby on Rails / PostgreSQL / MySQL / AWS S3 / JavaScript

- Grew from developer to Technical Lead, owning all systems, infrastructure (including object storage on AWS S3) and integrations for an online learning platform with live video classes.
- Designed the platform's PostgreSQL schemas and evolved them with ActiveRecord migrations in Ruby on Rails.
- Delivered PHP, Ruby on Rails and WordPress projects on MySQL for consulting clients, including lapatilla.com, a high-traffic news site; mentored engineers who went on to international careers.

### Instructor (Ruby, HTML / CSS / JavaScript) — Escuelaweb

2009 – 2015 · escuelaweb.net - Ruby on Rails / Sinatra / HTML5 / CSS3 / JavaScript

- Taught web development for 6 years: Ruby on Rails and Sinatra APIs, and modern front-end (HTML5, CSS3, preprocessors, AngularJS, jQuery).

## Education

**Telecommunications Engineer**

Universidad Católica Andrés Bello — 2009

## Languages

- **English**: written (advanced), verbal (advanced)
- **Spanish**: native

## Talks

- **Noders JS** — Santiago, Chile (January 2019). React Hooks.
- **La Plata JS** — La Plata, Argentina (December 2018). The current state of web components in the browser and how we can use them today. [slides](http://slides.com/highercomve/web-components)
