---
title: "BreakHis: Hybrid CNN Classification of Breast Cancer Histopathology"
description: "Graduate coursework project combining pre-trained CNN feature extractors with classical ML classifiers for benign/malignant classification on the BreakHis histopathology dataset. Achieved 92.08% accuracy, exceeding published benchmarks."
status: completed
featured: false
date: 2025-12-01
tags: ["Computer Vision", "Medical Imaging", "Deep Learning", "Hybrid Architectures"]
tech: ["PyTorch", "scikit-learn", "DenseNet201", "ResNet50", "SLURM", "Athena HPC"]
github: "https://github.com/jimmyphuocle/breakhis-image-analysis"
---

## Overview

Final project for CMSC 630 (Image Analysis), Fall 2025 at VCU. The task
was binary classification — benign vs. malignant — on the
[BreakHis](https://www.kaggle.com/datasets/ambarish/breakhis)
histopathological image dataset, with a specific requirement to explore
*hybrid* architectures rather than training a CNN end-to-end.

The hybrid setup: freeze a pre-trained ImageNet CNN and use it purely as
a fixed feature extractor, then train a classical classifier (SVM, MLP,
KNN) on top of the extracted features. This decouples representation
learning from classification, which is useful when you have a modest
dataset (BreakHis has ~7,900 images) and want to leverage what large
CNNs already learned about visual hierarchy without overfitting on the
target task.

## Pipeline

Histopathology slides → preprocess to 224×224 → feature extraction via
DenseNet201 (1920-d) or ResNet50 (2048-d) → classification via MLP,
SVM (RBF kernel), or KNN → benign/malignant prediction.

Nine (feature extractor × classifier × magnification) configurations
evaluated across 40X and 100X magnifications, with patient-aware
train/test splits to prevent data leakage.

## Results

Best configuration: **DenseNet201 + SVM at 40X — 92.08% accuracy, F1
0.920, AUC-ROC 0.977.** This exceeds the 92% benchmark from Bardou et
al. (2018), the reference baseline for the assignment.

Three observations worth the effort of running the full comparison
matrix rather than just tuning one model:

- **DenseNet201 beat ResNet50 by 8–11% across every classifier.** The
  dense-connectivity pattern appears to preserve finer-grained
  histological features that convolutional strides in ResNet collapse.
- **40X magnification outperformed 100X by 1–2% for the strong
  classifiers.** Counter to intuition — at higher magnification, the
  field of view narrows and broader tissue architecture (which carries
  the benign/malignant signal) is lost.
- **KNN lagged everywhere.** The curse of dimensionality bites hard on
  1920-d and 2048-d feature vectors; the neighborhood structure in that
  space isn't meaningful for classification.

## Infrastructure

Ran on VCU's Athena HPC cluster (SLURM-managed, GPU-H100). The full
pipeline — 2 feature extractors × 3 classifiers × 2 magnifications ×
cross-validation folds — fits comfortably within a single GPU job.
Feature extraction is the bottleneck; once extracted and cached,
classifier training runs in seconds.

## What I'd do differently

Two choices in hindsight:

- **Data augmentation was intentionally excluded** because the
  assignment emphasized architecture comparison, not squeezing out the
  last points of accuracy. For a production version, horizontal flips
  and small rotations (preserving the benign/malignant signal) would
  likely push accuracy past 93%.
- **Stain normalization was handled at preprocessing time** rather than
  as a learned component. Recent work (e.g., StainGAN) integrates
  normalization into the model itself, which could reduce variance from
  the three different hospital sources in BreakHis.

Neither would change the main finding — DenseNet201 features are the
right substrate for this problem — but both are natural next steps.
