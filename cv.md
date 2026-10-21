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

Golang, Model Context Protocol (MCP), Agent Skills, AI coding agents (Claude Code, Codex), Docker, Kubernetes, Helm, k3s, Bare-metal Kubernetes (Scaleway, Hetzner), Amazon Web Services (AWS), Google Cloud, AWS Lambda, AWS S3, Microservices, MQTT, Apache Kafka, OAuth 2.1 / OIDC / PKCE, WebAuthn / passkeys, SpiceDB / OPA, Docker BuildKit, REST APIs, CI/CD, GitLab CI, Linux, Linux containers, Yocto / Embedded Linux, Bash, Zig, JavaScript, TypeScript, Node.js, React, React Native, Vue.js, Ruby, Ruby on Rails, ActiveRecord / ORMs, PHP, PostgreSQL, SQL, MongoDB, MySQL, Nginx, TDD

## Professional Experience

### Senior Software Engineer — Pantacor

March 2019 – Present · pantacor.com - Go / Kubernetes / MongoDB / AWS S3 / MQTT / Kafka / OAuth 2.1 / MCP / React / Zig

- Architected and built Pantacor's remote build platform from the ground up — builder service, distributed runners, API and MCP tools (Go, MongoDB, Docker BuildKit). Customers turn a container image or Git repository (Dockerfile, Yocto, Buildroot) into signed, multi-arch device packages and flashable images, with encrypted secrets, OEM signing identities and usage quotas.
- Made the platform AI-native: designed the Pantacor Hub MCP server (34 tools) with its own OAuth 2.1 authorization server, and the pantavisor-apps Agent Skill that lets AI assistants (Claude Code, claude.ai, OpenCode, Codex) take an app from idea to running on a device — build, sign, image and deploy — with human approval before every change.
- Architected and built Pantacor Fleet almost single-handedly since 2020, the release and fleet-management platform one customer runs 15,000+ Linux devices on (Go/React): channels with rule-based device assignment, phased rollouts in waves with label targeting, time windows and automatic halt on error thresholds, device-acceptance push modes, and a deployment engine that merges each device's state with conflict handling, cancellation and backoff. Designed its multi-tenant fine-grained authorization (SpiceDB, OPA), audit log, webhooks and OAuth/PKCE access, and wrote its CLI (fleetcli) from scratch.
- Top individual contributor to the Pantahub core API and owner of its security architecture: two-factor auth with passkeys, OAuth/PKCE and Entra ID single sign-on, TLS device onboarding, certificate revocation, and a power-loss-safe device secret rotation protocol. Also built MQTT push-based OTA updates, remote commands, live logs and web SSH.
- Lead the hosted platform's infrastructure on bare-metal Kubernetes clusters at Scaleway and Hetzner (Helm, Kafka, monitoring, backups), with object storage on AWS S3, and built its event-driven webhooks service (Kafka, HMAC-signed delivery).
- Partner with the engineering teams of large enterprise manufacturers to design and integrate over-the-air update and fleet-management solutions into their products and release pipelines.
- Also core maintainer of the web dashboard (React, 760+ commits), pvr (Go CLI), pvflasher (Go image flasher), pantavisor-mocker (Zig device simulator) and container-ci, the CI template used by 12+ container-app projects.

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

2015 – 2016 · retiqueta.com - Ruby on Rails / Ionic / Docker / Kubernetes

- Built the Ionic mobile app and Ruby on Rails API (ActiveRecord models and migrations) for a second-hand fashion marketplace, running on Docker and Kubernetes (Google Container Engine) with CI and end-to-end tests.

### Technical Lead (from Software Developer) — Escuelaweb

2008 – 2015 · escuelaweb.net - PHP / Ruby on Rails / PostgreSQL / AWS S3 / JavaScript

- Grew from developer to Technical Lead, owning all systems, infrastructure (including object storage on AWS S3) and integrations for an online learning platform with live video classes.
- Designed the platform's PostgreSQL schemas and evolved them with ActiveRecord migrations in Ruby on Rails.
- Delivered PHP, Ruby on Rails and WordPress projects, including lapatilla.com, a high-traffic news site; mentored engineers who went on to international careers.

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
