---
title: "Biomedical NLP API"
description: "A FastAPI service exposing Hugging Face Transformers models for biomedical NLP tasks including NER, relation extraction, and clinical text classification."
status: "active"
featured: true
date: 2026-03-01
tags: ["NLP", "Biomedical", "API"]
tech: ["Python", "FastAPI", "Hugging Face", "Transformers", "Docker"]
github: "https://github.com/jimmyphuocle/biomedical-nlp-api"
---

## Overview

A production-style REST API that wraps biomedical NLP models from Hugging Face for use in downstream applications. Built as a portfolio project to demonstrate end-to-end ML engineering skills: model serving, API design, containerization, and deployment.

## Motivation

Biomedical NLP models are often shared as research artifacts (model weights on Hugging Face Hub, inference scripts in notebooks) but rarely as deployable services. This project bridges that gap by providing a clean REST interface for common biomedical NLP tasks, with proper request validation, error handling, and OpenAPI documentation.

## Status

Currently in active development. The API skeleton is in place; next steps are adding additional model endpoints, writing integration tests, and deploying to a hosted environment for live demos.
