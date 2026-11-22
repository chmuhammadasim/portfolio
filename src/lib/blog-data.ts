import { BLOG_EXTENSIONS } from "./blog-extensions";
import { SITE_URL } from "./site-data";

export type BlogCategory = "cyber" | "ai" | "os";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  tags: string[];
  icon: string;
  authorName: string;
  authorUrl: string;
};

export const categoryInfo: Record<BlogCategory, {
  label: string;
  color: string;
  border: string;
  bg: string;
  icon: string;
  description: string;
}> = {
  cyber: {
    label: "Cybersecurity",
    color: "text-accent",
    border: "border-border",
    bg: "bg-accent-soft",
    icon: "🛡️",
    description: "Notes on penetration testing, malware analysis, exploit development, and defensive security operations.",
  },
  ai: {
    label: "AI / Machine Learning",
    color: "text-accent",
    border: "border-border",
    bg: "bg-accent-soft",
    icon: "🤖",
    description: "Exploring transformers, neural networks, deep learning frameworks, and AI security research.",
  },
  os: {
    label: "Operating Systems",
    color: "text-accent",
    border: "border-border",
    bg: "bg-accent-soft",
    icon: "⚙️",
    description: "Kernel development, embedded systems, OS internals, and low-level systems programming.",
  },
};

const baseBlogPosts: BlogPost[] = [
  {
    id: "linux-kernel-exploitation-guide",
    slug: "linux-kernel-exploitation-guide",
    title: "Linux Kernel Exploitation: Concepts, Mitigations & Defensive Research",
    seoTitle: "Linux Kernel Exploitation Guide",
    excerpt: "Understand kernel memory layout, vulnerability classes, exploitation primitives, and the mitigations defenders rely on in modern Linux kernels.",
    content: `Linux kernel exploitation remains one of the most challenging and rewarding areas of cybersecurity research. This guide covers the essential theory and practical techniques needed to understand and exploit kernel vulnerabilities.

## Key Topics Covered

- **Understanding kernel memory layout** and virtual address spaces in x86_64
- **Common vulnerability classes**: Use-After-Free, Heap Overflow, Race Conditions, and Double-Free
- **SMEP/SMAP/KPTI bypass techniques** in modern Linux kernels (5.x and 6.x)
- **Practical exploitation** with ret2dir and physmap sprays
- **Building a privilege escalation exploit chain** from CVE analysis to root shell
- **Kernel debugging** with QEMU + GDB and writing kernel fuzzers with syzkaller

## Lab Setup

We'll set up a complete kernel exploitation environment using QEMU with a custom-compiled kernel, buildroot for a minimal filesystem, and GDB with the kgdb plugin for source-level kernel debugging.

## Exploit Development Workflow

1. **Vulnerability Discovery**: Analyzing CVEs, patch diffing, and fuzzing with syzkaller
2. **Trigger Analysis**: Reproducing the crash and understanding the root cause
3. **Exploit Primitive**: Converting the bug into a read/write primitive
4. **Privilege Escalation**: Overwriting cred structures or modprobe_path
5. **Stabilization**: Post-exploitation cleanup to prevent kernel panic

> ⚠️ This content is for educational and defensive research purposes only.`,
    category: "cyber",
    date: "2025-12-28",
    readTime: "18 min",
    tags: ["Linux Kernel", "Exploitation", "Privilege Escalation", "C", "Rootkits"],
    icon: "🐧",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "building-llm-from-scratch",
    slug: "building-llm-from-scratch",
    title: "Building a Transformer-Based LLM from Scratch in Python",
    seoTitle: "Building an LLM From Scratch",
    excerpt: "Step-by-step implementation of a transformer architecture, attention mechanisms, and training a small language model on custom datasets.",
    content: `Building a language model from scratch is the best way to truly understand how modern AI works. This comprehensive guide walks through every component of a transformer-based LLM.

## What You'll Build

- **Tokenization**: Byte-Pair Encoding (BPE) from scratch in pure Python
- **Multi-Head Self-Attention** mechanism with causal masking for autoregressive generation
- **Positional encodings**: both sinusoidal and learned embeddings
- **Feed-forward networks** with GELU activations and residual connections
- **Training loop** with gradient accumulation, mixed precision, and learning rate scheduling
- **Inference optimization**: KV-caching and speculative decoding techniques

## Architecture Overview

The transformer architecture follows the "Attention Is All You Need" paper with modern improvements including pre-layer normalization, RoPE (Rotary Position Embeddings), and FlashAttention-compatible patterns.

## Training Pipeline

We'll train on a curated dataset combining WikiText-103, a subset of The Pile, and custom technical documentation, using a single GPU with gradient accumulation to simulate larger batch sizes.

The reference implementation is described piece by piece; the focus is on the design decisions rather than a packaged notebook.`,
    category: "ai",
    date: "2025-11-15",
    readTime: "22 min",
    tags: ["Transformers", "LLMs", "PyTorch", "Attention", "Deep Learning"],
    icon: "🤖",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "reverse-engineering-malware",
    slug: "reverse-engineering-malware",
    title: "Reverse Engineering Modern Malware: Tools, Techniques & Case Studies",
    seoTitle: "Reverse Engineering Malware",
    excerpt: "A practical approach to analyzing and reversing modern malware samples using Ghidra, x64dbg, and dynamic analysis sandboxes.",
    content: `Modern malware employs sophisticated evasion techniques that require a methodical approach to reverse engineering. This guide covers both static and dynamic analysis workflows used by professional malware analysts.

## Lab Setup

- **FlareVM** on Windows 10 for dynamic analysis
- **REMnux** Linux distribution for network simulation
- **Ghidra** for static analysis and decompilation
- **x64dbg + ScyllaHide** for user-mode debugging
- **Wireshark + INetSim** for network traffic analysis

## Analysis Workflow

1. **Triage**: File identification, hashing, and initial YARA scanning
2. **Static Analysis**: PE headers, imports/exports, strings, entropy, and packer detection
3. **Dynamic Analysis**: Process Monitor, API call tracing, and registry monitoring
4. **Debugging**: Unpacking obfuscated payloads with x64dbg
5. **Decompilation**: Recovering control flow with Ghidra's advanced features
6. **Case Study**: Full walkthrough of analyzing an Emotet loader variant

> ⚠️ Warning: This content is for educational and defensive purposes only. Always analyze malware in isolated environments.`,
    category: "cyber",
    date: "2025-10-02",
    readTime: "25 min",
    tags: ["Malware Analysis", "Reverse Engineering", "Ghidra", "x64dbg", "IDA Pro"],
    icon: "🦠",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "rust-operating-system-from-scratch",
    slug: "rust-operating-system-from-scratch",
    title: "Writing a Microkernel OS in Rust: Memory Management & Scheduling",
    seoTitle: "Writing a Microkernel OS in Rust",
    excerpt: "Building a minimal microkernel operating system from scratch in Rust, covering bootloading, memory paging, and preemptive multitasking.",
    content: `Writing an operating system in Rust combines the language's safety guarantees with the raw power of bare-metal programming. This series documents building a microkernel from the bootloader up.

## Implementation Phases

1. **Freestanding Rust**: no_std, custom target specification, and bootable image creation
2. **VGA Text Mode & Serial**: Early debugging output without a display driver
3. **x86_64 Paging**: Identity mapping, recursive page tables, and kernel heap allocation
4. **Interrupt Handling**: IDT setup, PIC/APIC configuration, and syscall interface design
5. **Preemptive Multitasking**: An async/await executor for cooperative and preemptive scheduling
6. **Userspace Processes**: ELF binary loading, ring 3 transitions, and system calls

All code is not published as a single repository. The series is structured as incremental milestones; each phase should be accompanied by unit tests and a QEMU-based smoke test in your own implementation.`,
    category: "os",
    date: "2025-09-10",
    readTime: "30 min",
    tags: ["Rust", "OS Development", "Microkernel", "Memory Management", "Scheduling"],
    icon: "⚙️",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "cybersecurity-threat-hunting-siem",
    slug: "cybersecurity-threat-hunting-siem",
    title: "Threat Hunting at Scale: Building an Open-Source SIEM Pipeline",
    seoTitle: "Threat Hunting With an Open-Source SIEM",
    excerpt: "Designing and deploying a scalable threat hunting pipeline using Elasticsearch, Logstash, Kafka, and custom Sigma rules for real-time detection.",
    content: `Building an in-house Security Information and Event Management (SIEM) system gives you complete control over your detection engineering pipeline.

## Pipeline Architecture

- **Log Ingestion**: Filebeat agents with Kafka for high-throughput buffering and backpressure handling
- **Processing**: Logstash pipelines for parsing (grok, dissect), enrichment (GeoIP, threat intel), and normalization (ECS schema)
- **Storage**: Elasticsearch cluster tuned for security workloads with ILM policies and rollover indices
- **Detection**: Sigma rule engine converting rules to Elasticsearch queries with scheduled batch jobs
- **Visualization**: Kibana dashboards for SOC analysts including MITRE ATT&CK heatmaps and timeline analysis
- **Alerting**: ElastAlert2 with webhook integration to SOAR platforms for automated response

A reference stack can be assembled from Docker Compose and Terraform; size it from your own EPS measurements rather than a published benchmark.`,
    category: "cyber",
    date: "2025-08-20",
    readTime: "20 min",
    tags: ["SIEM", "Threat Hunting", "Elasticsearch", "Sigma Rules", "SOC"],
    icon: "🔍",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "neural-network-fuzzing",
    slug: "neural-network-fuzzing",
    title: "AI-Powered Fuzzing: Using Neural Networks to Find Zero-Day Vulnerabilities",
    seoTitle: "Neural Network Fuzzing for Zero-Days",
    excerpt: "How deep reinforcement learning and generative models can be used to automate fuzzing and discover previously unknown software vulnerabilities.",
    content: `Neural network-guided fuzzing represents the cutting edge of automated vulnerability discovery. This article explores how deep learning can dramatically improve fuzzing efficiency.

## The Problem with Traditional Fuzzing

Coverage-guided fuzzers like AFL++ and libFuzzer rely on simple mutations and edge coverage feedback. While effective, they struggle with complex input formats and deep program states.

## Neural Approaches

- **Generative Models**: Training GANs and VAEs on valid input corpora to generate structure-aware mutations
- **Reinforcement Learning**: Using coverage as a reward signal to train mutation policies
- **Gradient-Guided Fuzzing**: Computing gradients through the target to directly optimize for rare branches
- **Sequence Models**: LSTM and Transformer models to learn input grammar implicitly

## Case Study: Fuzzing a PDF Parser

A useful experiment is to compare a coverage-guided baseline with a structure-aware mutator on the same target. Measure unique crashes, time-to-first-crash, corpus growth, and triage effort over a fixed window. A result is only meaningful if the baseline and the experimental pipeline share the same sanitizer, time budget, and target build.`,
    category: "ai",
    date: "2025-07-05",
    readTime: "16 min",
    tags: ["Fuzzing", "Neural Networks", "Zero-Day", "Security", "Reinforcement Learning"],
    icon: "🧠",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "docker-container-security-hardening",
    slug: "docker-container-security-hardening",
    title: "Container Security Hardening: Beyond the Basics of Docker & Kubernetes",
    seoTitle: "Docker & Kubernetes Security Hardening",
    excerpt: "Advanced container security practices including seccomp profiles, AppArmor, rootless containers, and runtime security monitoring with Falco.",
    content: `Container security goes far beyond scanning images for CVEs. This guide covers defense-in-depth for containerized workloads.

## Security Layers

- **Image Security**: Minimal base images (distroless), multi-stage builds, SBOM generation with Syft
- **Runtime Security**: Custom seccomp profiles, AppArmor/SELinux policies, capabilities dropping
- **Rootless Containers**: Running Docker and Kubernetes entirely without root privileges
- **Network Policies**: Zero-trust networking with Cilium and eBPF-based enforcement
- **Runtime Monitoring**: Falco rules for detecting suspicious syscalls, file access patterns, and network anomalies
- **Supply Chain**: Cosign for image signing, Sigstore for provenance attestation, and Kyverno for policy enforcement`,
    category: "cyber",
    date: "2025-06-12",
    readTime: "14 min",
    tags: ["Docker", "Kubernetes", "Container Security", "AppArmor", "Falco"],
    icon: "🐳",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "building-custom-deep-learning-framework",
    slug: "building-custom-deep-learning-framework",
    title: "Designing a Deep Learning Framework: Autograd, Tensors & GPU Acceleration",
    seoTitle: "Designing a Deep Learning Framework",
    excerpt: "Understanding the internals of deep learning frameworks by building one from scratch with automatic differentiation, tensor operations, and CUDA support.",
    content: `Building your own deep learning framework is the ultimate way to understand how PyTorch and TensorFlow work internally.

## Framework Components

- **Tensor Library**: N-dimensional array operations with broadcasting, indexing, and stride-based memory layout
- **Autograd Engine**: Reverse-mode automatic differentiation with a dynamic computation graph and gradient checkpointing
- **NN Modules**: Sequential, Linear, Conv2d, BatchNorm, Dropout — implementing forward and backward passes
- **Optimizers**: SGD with momentum, Adam, AdamW, and learning rate schedulers (cosine, one-cycle)
- **CUDA Backend**: Writing custom CUDA kernels with cuBLAS and cuDNN integration
- **Data Pipeline**: Dataset and DataLoader abstractions with prefetching and multiprocessing`,
    category: "ai",
    date: "2025-05-18",
    readTime: "28 min",
    tags: ["Deep Learning", "CUDA", "Autograd", "GPU Computing", "Python"],
    icon: "🔗",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "uefi-bootkit-development",
    slug: "uefi-bootkit-development",
    title: "UEFI Bootkit Development: Persistence Below the Operating System",
    seoTitle: "UEFI Bootkit Development",
    excerpt: "Exploring UEFI firmware internals, secure boot bypass techniques, and developing proof-of-concept bootkits for defensive research.",
    content: `Understanding UEFI bootkits is essential for both offensive and defensive security professionals. This research-oriented guide explores firmware-level persistence mechanisms.

## UEFI Architecture Refresher

The Unified Extensible Firmware Interface (UEFI) is a sophisticated operating system that runs before your OS boots. Understanding its driver model, protocol interfaces, and boot flow is critical.

## Key Areas

- **DXE Driver Development**: Writing UEFI drivers in C with EDK II
- **Boot Chain Analysis**: From SEC → PEI → DXE → BDS → TSL → RT phases
- **Secure Boot Internals**: How Secure Boot validates binaries and common bypass techniques
- **SPI Flash Programming**: Reading and writing firmware storage
- **Defensive Strategies**: Boot Guard, Intel TXT, and measured boot with TPM

> ⚠️ This is for security research only. Unauthorized firmware modification is illegal.`,
    category: "cyber",
    date: "2025-04-22",
    readTime: "20 min",
    tags: ["UEFI", "Bootkit", "Firmware", "Secure Boot", "Low-Level"],
    icon: "💾",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "cloud-native-security-architecture",
    slug: "cloud-native-security-architecture",
    title: "Zero-Trust Architecture for Cloud-Native Applications on AWS & Azure",
    seoTitle: "Zero-Trust Cloud-Native Security",
    excerpt: "Implementing zero-trust security principles in cloud-native environments with service mesh, identity-aware proxies, and policy-as-code.",
    content: `Zero-trust is not a product — it's an architectural paradigm. This article covers practical implementation across AWS and Azure.

## Zero-Trust Principles

- **Never Trust, Always Verify**: Every request is authenticated and authorized regardless of origin
- **Least Privilege**: Fine-grained IAM with just-in-time access and temporary credentials
- **Microsegmentation**: Network policies at the pod/container level, not just VPC/subnet
- **Continuous Validation**: Certificate-based workload identity with short-lived SPIFFE identities

## Implementation Stack

- **Service Mesh**: Istio/Envoy for mTLS, request authentication, and authorization policies
- **Identity-Aware Proxy**: OAuth2/OIDC with device posture assessment
- **Policy-as-Code**: Open Policy Agent (OPA) and Kyverno for Kubernetes-native policy enforcement
- **Secrets Management**: HashiCorp Vault with dynamic secrets and auto-rotation`,
    category: "cyber",
    date: "2025-03-08",
    readTime: "17 min",
    tags: ["Zero-Trust", "Cloud Security", "AWS", "Azure", "Service Mesh"],
    icon: "☁️",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "kernel-driver-development-linux",
    slug: "kernel-driver-development-linux",
    title: "Linux Kernel Driver Development: From Hello World to PCIe Drivers",
    seoTitle: "Linux Kernel Driver Development",
    excerpt: "Complete guide to Linux kernel module programming, covering character devices, PCIe drivers, DMA, and kernel debugging techniques.",
    content: `Writing Linux kernel drivers is the gateway to understanding how hardware and software interact at the lowest level.

## Learning Path

- **Hello World Module**: Building, loading, and debugging your first kernel module
- **Character Device Drivers**: Implementing open/read/write/ioctl operations with proper synchronization
- **PCIe Driver Development**: Enumerating PCI devices, mapping BARs, and handling MSI-X interrupts
- **DMA Engine**: Setting up scatter-gather DMA transfers with the kernel's DMA API
- **Kernel Debugging**: KGDB, ftrace, perf events, and dynamic debugging with dyndbg
- **Testing**: KUnit for kernel unit tests and QEMU-based hardware emulation`,
    category: "os",
    date: "2025-02-14",
    readTime: "26 min",
    tags: ["Linux Kernel", "Drivers", "PCIe", "DMA", "Kernel Debugging"],
    icon: "🖥️",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "graph-neural-networks-cybersecurity",
    slug: "graph-neural-networks-cybersecurity",
    title: "Graph Neural Networks for Network Intrusion Detection",
    seoTitle: "Graph Neural Networks for Security",
    excerpt: "Applying GNNs to network traffic data for anomaly detection, lateral movement identification, and real-time intrusion prevention.",
    content: `Network traffic is inherently relational — devices communicate in graph patterns. Graph Neural Networks (GNNs) are naturally suited to model these relationships for security analysis.

## Why GNNs for Network Security?

Traditional ML approaches treat network flows as independent samples, missing the rich structural information in communication patterns. GNNs capture:
- **Node features**: Device behavior profiles, open ports, OS fingerprints
- **Edge features**: Protocol, byte count, connection duration, TLS fingerprints
- **Graph structure**: Network topology, community detection, centrality measures

## Implementation

A realistic evaluation compares GNN performance with a strong tabular baseline on time-based splits. Report precision at the alert volume your SOC can actually triage, not only AUC.`,
    category: "ai",
    date: "2025-01-25",
    readTime: "15 min",
    tags: ["GNN", "Intrusion Detection", "Network Security", "Anomaly Detection", "PyG"],
    icon: "📊",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "embedded-linux-security-iot",
    slug: "embedded-linux-security-iot",
    title: "Securing Embedded Linux Devices: IoT Firmware Hardening Guide",
    seoTitle: "Embedded Linux & IoT Security",
    excerpt: "Practical security hardening for embedded Linux systems including secure boot, filesystem encryption, and runtime integrity verification.",
    content: `Embedded Linux powers billions of IoT devices — many of which ship with woefully inadequate security. This guide covers practical hardening.

## Hardening Checklist

- **Secure Boot Chain**: U-Boot verified boot → signed FIT images → dm-verity for rootfs integrity
- **Filesystem Encryption**: dm-crypt/LUKS2 for data-at-rest protection on eMMC/SD
- **Mandatory Access Control**: SELinux policies for process isolation and least privilege
- **Read-Only Rootfs**: OverlayFS for runtime writes with factory reset capability
- **Runtime Integrity**: IMA/EVM for file integrity measurement and appraisal
- **Update Mechanism**: A/B update scheme with rollback protection and signed OTA artifacts`,
    category: "os",
    date: "2024-12-10",
    readTime: "19 min",
    tags: ["Embedded Linux", "IoT", "Firmware", "Secure Boot", "Yocto"],
    icon: "📟",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "adversarial-machine-learning",
    slug: "adversarial-machine-learning",
    title: "Adversarial Machine Learning: Attacking and Defending Neural Networks",
    seoTitle: "Adversarial Machine Learning",
    excerpt: "Exploring adversarial attacks on ML models including FGSM, PGD, and data poisoning, with practical defense strategies and robust training.",
    content: `As ML models are deployed in security-critical applications, understanding their vulnerabilities to adversarial manipulation is essential.

## Attack Taxonomy

- **Evasion Attacks**: FGSM, PGD, C&W, and AutoAttack — crafting imperceptible perturbations to fool classifiers
- **Poisoning Attacks**: Backdoor injection via data poisoning and model poisoning during federated learning
- **Model Extraction**: Stealing model architecture and parameters through black-box query access
- **Inference Attacks**: Membership inference and attribute inference for privacy violations

## Defense Strategies

- **Adversarial Training**: Augmenting training data with adversarial examples (PGD-AT, TRADES)
- **Certified Robustness**: Randomized smoothing for provable L2 robustness guarantees
- **Detection**: Feature squeezing, MagNet, and spectral signature analysis
- **Differential Privacy**: DP-SGD to protect against membership inference`,
    category: "ai",
    date: "2024-11-20",
    readTime: "21 min",
    tags: ["Adversarial ML", "FGSM", "Robust Training", "Security", "Deep Learning"],
    icon: "⚔️",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
  {
    id: "post-quantum-cryptography-implementation",
    slug: "post-quantum-cryptography-implementation",
    title: "Post-Quantum Cryptography: Implementing Kyber and Dilithium in Practice",
    seoTitle: "Post-Quantum Cryptography in Practice",
    excerpt: "A developer's guide to implementing NIST-standardized post-quantum cryptographic algorithms for real-world applications.",
    content: `With NIST's standardization of post-quantum cryptographic algorithms, it's time to start implementing quantum-resistant cryptography in production systems.

## The NIST PQC Standards

- **CRYSTALS-Kyber** (ML-KEM): Lattice-based key encapsulation mechanism for key exchange
- **CRYSTALS-Dilithium** (ML-DSA): Lattice-based digital signature algorithm
- **SPHINCS+** (SLH-DSA): Stateless hash-based signature for long-term security
- **FALCON**: Compact lattice-based signatures for bandwidth-constrained applications

## Implementation Guide

Using liboqs and the OpenQuantumSafe provider for OpenSSL, we'll implement a TLS 1.3 connection with hybrid key exchange (ECDH + Kyber), benchmark performance across different security levels, and discuss migration strategies from RSA/ECC.

## Hybrid Approach

We advocate for hybrid schemes that combine classical and post-quantum algorithms, ensuring security against both classical and quantum adversaries during the transition period.`,
    category: "cyber",
    date: "2024-10-05",
    readTime: "23 min",
    tags: ["Post-Quantum", "Cryptography", "Kyber", "Dilithium", "NIST"],
    icon: "🔐",
    authorName: "Muhammad Asim Chattha",
    authorUrl: SITE_URL,
  },
];

/**
 * Append the extended sections and derive read time from the actual
 * word count so the UI and BlogPosting schema stay honest.
 */
export const blogPosts: BlogPost[] = baseBlogPosts.map((post) => {
  const extension = BLOG_EXTENSIONS[post.slug] ?? "";
  const content = `${post.content}\n\n${extension}`.trim();
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 220));
  return { ...post, content, readTime: `${minutes} min` };
});

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagCounts: Record<string, number> = {};
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}