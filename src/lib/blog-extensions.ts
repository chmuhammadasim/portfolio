/**
 * Extended body sections for the blog. Each entry is appended to the
 * article's existing content. Read time is derived from the final word
 * count in blog-data.ts, so it always matches the published text.
 */
export const BLOG_EXTENSIONS: Record<string, string> = {
  "linux-kernel-exploitation-guide": `
## Kernel Memory Layout in Practice

A modern x86_64 Linux kernel splits the virtual address space into a user half and a kernel half. The direct map gives the kernel a linear view of physical memory, vmalloc provides virtually contiguous allocations for large buffers, and the SLUB allocator serves most small kernel objects from per-CPU caches. KASLR randomizes the physical and virtual base, but the direct map and many heap objects still have predictable relationships.

That predictability is why heap grooming matters. A use-after-free or double-free is only a starting point; the exploit has to place a controlled object in the freed slot and keep it alive across the vulnerable operation. Objects such as message queues, pipe buffers, and network structures are attractive because user space can influence their contents and lifetime.

## From Bug to Primitive

The exploitation workflow is usually described as bug → primitive → escalation. The bug might be a race, an out-of-bounds write, or a reference-count error. The primitive might be a constrained write, an arbitrary free, or an information leak. The escalation step turns that primitive into control over a security-relevant structure such as credentials, a function pointer, or a kernel configuration path.

Modern kernels make each step harder. SMEP and SMAP prevent the kernel from executing or accessing user pages directly. KPTI separates user and kernel page tables, so a meltdown-style read is no longer a shortcut. Control-flow integrity, hardened usercopy, and allocator randomization reduce the reliability of classic techniques. The practical lesson is that exploit research is now a study of mitigations as much as bugs.

## A Defensive Reading of the Same Material

For defenders, the same primitives suggest concrete controls: keep kernels patched, minimize exposed attack surface, enable KASAN and hardened allocators in test environments, and monitor for unusual privilege transitions. Kernel configuration is part of the security boundary, not an afterthought.

Fuzzing with syzkaller and diffing security patches are the highest-leverage research habits. A patch diff often reveals the exact invariant that was violated, which is more useful than staring at a crash log. Build a reproducible lab with QEMU, a pinned kernel, and a snapshot before every experiment.

## Ethics and Scope

Kernel exploitation research belongs in authorized environments: your own lab, a sanctioned CTF, or a coordinated disclosure program. The goal of this guide is to make the mechanics legible so that defenders can reason about them — not to provide a ready-made weapon. If you find a bug in a production kernel, follow the vendor's disclosure process and give them time to ship a fix.
`,

  "building-llm-from-scratch": `
## Tokenizer Design Tradeoffs

The tokenizer quietly determines what the model can learn. A byte-level BPE vocabulary handles arbitrary input without unknown tokens, but spends capacity on byte sequences that carry little meaning. A larger vocabulary shortens sequences and lowers attention cost, at the price of a bigger embedding table and more parameters to train.

Practical tokenizers need a byte fallback, explicit special tokens, and a stable vocabulary across training and inference. Padding and truncation policies belong in the same design document. If the tokenizer changes after training, every checkpoint becomes incompatible — version it like an API.

## Attention at Scale

Self-attention projects each token into query, key, and value vectors. The causal mask prevents a position from attending to the future, which is what makes next-token prediction well-defined. Multi-head attention lets different heads specialize in different relationships, while grouped-query attention reduces the size of the key-value cache at inference time.

Memory is usually the limiting factor, not raw FLOPs. The KV cache grows with sequence length, batch size, layers, and head dimension. Serving a long-context model means budgeting that cache explicitly and deciding when to evict, quantize, or page it. FlashAttention-style kernels help by reducing memory traffic, but they do not change the underlying arithmetic.

## Training Dynamics

A small transformer trains reliably with AdamW, a warmup period, cosine decay, gradient clipping, and mixed precision. The harder parts are data quality and evaluation. Deduplicate the corpus, hold out a clean validation set, and track perplexity alongside task-specific metrics. A falling training loss with a rising validation loss is a data or regularization problem, not a reason to train longer.

Checkpoint frequently and record the exact tokenizer, data mixture, and hyperparameters. Reproducibility is easier to preserve than to reconstruct.

## Evaluation and Failure Modes

Perplexity measures how well the model predicts the next token; it does not measure whether the model is useful or safe. Add human evaluation for instruction following, hallucination, and refusal behavior. Test contamination by checking whether evaluation examples appear in the training corpus.

At inference time, quantization and speculative decoding change the latency/quality tradeoff. Measure both on the same prompts before shipping. A model that is impressive in a notebook but cannot hold a stable context window is not ready for a product.
`,

  "reverse-engineering-malware": `
## Building a Safe Analysis Lab

Malware analysis starts with containment. Use an isolated hypervisor, a host-only or simulated network, and snapshots that can be discarded after every run. Fake internet services such as INetSim can satisfy domain lookups and HTTP beacons without letting the sample reach a real command-and-control server. Never analyze an unknown binary on a machine that holds credentials or connects to production.

Record the hash, file type, architecture, and first-seen context before executing anything. A short triage note written at the start saves hours later.

## Static and Dynamic Triage

Static triage looks at headers, imports, sections, strings, entropy, and packer signatures. High entropy in a writable section often suggests compression or encryption. Unusual imports can point to process injection, persistence, or credential access. Dynamic triage observes the sample: process tree, file writes, registry changes, network connections, and loaded modules.

The two views should agree. If static analysis suggests a Windows service but dynamic analysis shows only a short-lived process, the sample may be packed, delayed, or environment-aware.

## Unpacking and Code Recovery

Packed samples need an unpacking strategy: run until the original entry point, dump the mapped image, rebuild imports, and fix section permissions. Anti-analysis checks may inspect the debugger, timing, parent process, or virtualization artifacts. Work incrementally and keep a log of each hypothesis.

Control-flow recovery is easier when you identify the runtime and libraries first. Recovering strings and API call sites often reveals the sample's purpose before full decompilation is necessary.

## Reporting and Detection Engineering

A useful report connects indicators to behavior. Hashes and domains are perishable; tactics, techniques, and procedures are durable. Map observed behavior to a framework such as MITRE ATT&CK, then write detection rules that target the behavior rather than a single hash. Validate rules against benign software to estimate false positives.

Share indicators with the defenders who need them, and handle samples as evidence. Chain of custody and clear timestamps matter if the analysis supports an incident response or legal process.
`,

  "rust-operating-system-from-scratch": `
## Bootstrapping Without libc

A Rust kernel starts with no standard library. You define a panic handler, a global allocator, and the entry point that the bootloader jumps to. The bootloader hands over a memory map and a framebuffer; the kernel must build its own page tables and switch to a higher-half virtual address layout before it can safely use Rust abstractions.

Keeping the early boot path small is a feature. Every line before paging is enabled runs with minimal isolation and no allocator.

## Paging and Memory Protection

Page tables are the kernel's primary isolation mechanism. A higher-half kernel separates kernel and user mappings; per-process page tables add another boundary. Mark read-only data as read-only, enforce W^X for executable mappings, and use the NX bit wherever possible. Guard pages turn stack overflows into immediate faults instead of silent corruption.

The allocator is security-relevant. A simple bump allocator is fine for early boot, but a real system needs free lists, alignment guarantees, and eventually per-CPU caches. Test it with deliberate exhaustion and fragmentation.

## Scheduling and Interrupts

A timer interrupt drives preemption. The scheduler saves the current context, chooses a runnable thread, and restores the next context. On SMP systems, per-CPU run queues and IPIs add complexity. Start with a single CPU and a cooperative scheduler, then add preemption and locking once the basic context switch is reliable.

Interrupt handlers should do the minimum necessary and defer the rest to a work queue. Long handlers increase latency and complicate locking.

## What to Build Next

After boot, paging, and scheduling, add syscalls, a virtual filesystem, and a user-space test program. Write tests that run inside QEMU and assert on serial output. A kernel that boots is a demo; a kernel with repeatable tests is a project.
`,

  "cybersecurity-threat-hunting-siem": `
## Log Sources and Normalization

A SIEM is only as good as its inputs. Endpoint telemetry, authentication logs, DNS queries, proxy events, cloud audit trails, and network flow records each answer different questions. Normalize field names early — a shared schema such as ECS makes correlation and detection authoring far easier than a pile of vendor-specific indexes.

Enrichment adds context: asset ownership, user identity, geolocation, threat intelligence, and known-good baselines. Keep enrichment reproducible and versioned; a detection that depends on a silent lookup service is brittle.

## Detection as Code

Treat detections like software. Store them in version control, review changes, and test them against both malicious and benign samples. Sigma rules are portable across backends; translate them into the query language your SIEM actually runs. Record the rule's intent, data dependencies, and known false positives next to the logic.

A detection without a test is a guess. A detection without an owner is abandoned.

## Pipeline Architecture

A typical open-source stack uses Kafka or a similar buffer for ingestion, a parser/enrichment stage, and Elasticsearch or OpenSearch for search. Retention is a cost decision: hot data for investigation, warm data for hunting, cold object storage for compliance. Sample or aggregate high-volume sources when full fidelity is not required.

Monitor the pipeline itself. Gaps in ingestion look exactly like quiet networks, which is the worst failure mode for a detection system.

## Hunting Workflow

Threat hunting begins with a hypothesis, not a query. For example: "An attacker using valid credentials would create a new service on a server that has never hosted one." Translate the hypothesis into data requirements, query the data, triage the results, and record the outcome. A hunt that finds nothing is still useful if it proves the coverage exists.

Feed successful hunts back into detection engineering so the next occurrence is caught automatically. The loop between hunting and detection is where a SIEM becomes an operating capability.
`,

  "neural-network-fuzzing": `
## Fuzzing Fundamentals

Coverage-guided fuzzing mutates inputs and keeps those that reach new code paths. The corpus is the fuzzer's memory; the mutator is its exploration strategy; the sanitizer is its safety net. Most real bugs are found by a small number of high-quality seeds and a long, stable run.

Instrumentation quality matters more than raw execution speed. A fuzzer that cannot see the parser's internal branches will spend its budget on shallow mutations.

## Where Machine Learning Helps

ML is most useful at the edges of the fuzzing loop: selecting seeds that look structurally promising, learning mutation patterns from valid inputs, prioritizing crashes, and deduplicating reports. A model can also help triage whether a crash is likely to be a security issue versus an assertion failure.

It is less useful as a replacement for coverage feedback. A neural model that predicts "interesting" bytes without a coverage signal tends to collapse toward the training distribution.

## Training a Useful Model

Define the prediction target precisely. If the goal is seed selection, train on features such as coverage novelty, execution time, and crash proximity. If the goal is crash triage, label by root cause rather than by stack trace alone. Handle class imbalance explicitly; crashes are rare.

Evaluate on a held-out target, not the target used for training. Report both discovery rate and time-to-first-crash so the comparison to a coverage-guided baseline is honest.

## Operationalizing the Loop

The strongest systems are hybrid: ML proposes, coverage-guided fuzzing verifies, and humans review. Keep the fuzzer's corpus and crash artifacts reproducible. Respect disclosure timelines and never test software you do not own or have permission to assess.

The goal is not to remove the human from the loop; it is to spend human attention on the crashes that matter.
`,

  "docker-container-security-hardening": `
## Threat Model

Container security spans the image, the registry, the runtime, the orchestrator, and the supply chain. A container is not a security boundary by itself; it is a process with namespaces and cgroups. The relevant questions are what the container can reach, what it can do if compromised, and how you would detect that.

Start with a data-flow diagram: build system to registry, registry to cluster, cluster to secrets, and workload to external services. Most incidents cross one of those arrows.

## Build Hardening

Use minimal base images, multi-stage builds, and a non-root user. Pin image digests, generate an SBOM, and sign images so the deployer can verify provenance. Scan dependencies and the OS package layer, but treat scan results as a prioritization input rather than a gate that blocks every release.

Do not bake secrets into layers. Build args and layer history are not a secret store.

## Runtime Hardening

Drop Linux capabilities you do not need, enable a seccomp profile, use a read-only root filesystem, and mount only the paths the process actually writes. User namespaces and rootless runtimes reduce the impact of an escape. Network policies should default to deny and allow explicit flows.

Resource limits are security controls too: a compromised container should not be able to exhaust the node.

## The Kubernetes Layer

Kubernetes adds identity and policy surfaces. Use RBAC with least privilege, Pod Security Standards, admission control, and namespaced service accounts. Avoid mounting service-account tokens into pods that do not need them. Encrypt secrets at rest and restrict who can read them.

Audit logs and runtime detection close the loop. A hardened cluster that cannot tell you when a pod starts a shell is only half-finished.
`,

  "building-custom-deep-learning-framework": `
## Tensor and Autograd Design

A minimal framework needs a tensor type, a computation graph, and a reverse-mode autograd pass. Each operation records its inputs and a backward function. During the backward pass, gradients flow from the loss back to the leaves, accumulating where branches merge.

Broadcasting is the subtle part. The forward pass expands shapes; the backward pass must sum over the broadcast dimensions. Most autograd bugs are shape bugs in disguise.

## Performance

Naive eager execution is a good correctness baseline but a poor performance story. Memory layout, kernel fusion, and asynchronous device execution determine real throughput. A useful middle step is to batch small operations and keep data on the device between steps.

Mixed precision reduces memory traffic, but it changes numerical behavior. Test with gradient checks and compare against a float32 reference before trusting a speedup.

## Testing

Gradient checking compares analytical gradients to finite differences on small inputs. Shape tests verify that every operation preserves the expected contract. Numerical parity tests compare your kernels against a trusted implementation on random inputs.

Write tests for failure cases: non-contiguous tensors, zero-sized dimensions, broadcasting, and device transfers. These are where frameworks usually break.

## When Not to Build

PyTorch, JAX, and TensorFlow have years of kernel and distributed-training work behind them. Build your own framework to learn, to prototype a specific abstraction, or to control a deployment constraint — not because you expect to outperform the ecosystem on general workloads.

The most valuable output is often the test suite and the mental model, not the framework itself.
`,

  "uefi-bootkit-development": `
## UEFI Boot Flow

UEFI firmware runs through SEC, PEI, DXE, and BDS phases before handing control to the operating system. DXE drivers provide services and can persist in firmware volumes or on the EFI System Partition. Understanding the phase boundaries is essential: a component that runs before the OS loader has enormous influence over what the OS can trust.

Secure Boot verifies signatures along the boot chain. It raises the cost of persistence but does not make firmware immutable; configuration, revocation, and physical access still matter.

## Persistence Mechanisms

Firmware persistence can live in SPI flash, option ROMs, NVRAM variables, or the ESP. Each location has different update, revocation, and detection properties. A defensible analysis asks not only "can this persist?" but "who can update it, who can see it, and how would an incident responder remove it?"

Treat bootkit research as authorized hardware research. Use a dedicated machine, document the firmware version, and keep a recovery path.

## Defensive Controls

Enable Secure Boot with a curated key set, measure boot components into a TPM, and use remote attestation where the threat model justifies it. Monitor firmware integrity and configuration drift. Restrict who can modify boot order and ESP contents.

Firmware updates need signed, verifiable delivery and a rollback story. A bootkit that survives an OS reinstall is a reminder that the boot chain is part of the attack surface.

## Research Ethics

Bootkit development sits close to the line between defensive research and abuse. Work on hardware you own, disclose responsibly, and avoid publishing persistence techniques that are not paired with detection or remediation guidance. The defender's goal is a boot chain that can be measured, verified, and recovered.
`,

  "cloud-native-security-architecture": `
## Identity as the Perimeter

In a cloud-native system, the network perimeter is porous and identity is the durable boundary. Human users, workloads, and CI jobs all need scoped credentials. OIDC federation, workload identity, and short-lived tokens reduce the blast radius of a leaked secret.

Least privilege is an operating practice, not a one-time policy. Review role bindings regularly, remove unused permissions, and log every privileged action.

## Segmentation and Policy

Network policies, security groups, and service mesh authorization all express "who may talk to whom." Default-deny is the right baseline. mTLS gives you workload authentication and encrypted transport, but it does not replace authorization logic inside the service.

Segment by trust and function, not just by namespace. A shared database should not be reachable from every pod simply because they share a cluster.

## Supply Chain

Sign images, generate SBOMs, and verify provenance at admission time. Pin dependencies and builder images. Treat the CI system as production infrastructure: it holds credentials and can publish artifacts, so it deserves the same scrutiny as the runtime.

A reproducible build is a security property. If you cannot rebuild an artifact from source, you cannot fully reason about what is deployed.

## Observability and Response

Collect control-plane audit logs, workload logs, network flow data, and traces. Correlate them by workload identity so an alert points to a deployable unit, not a random pod IP. Keep an incident runbook that covers credential rotation, isolation, and evidence preservation.

Cloud-native security is a continuous loop: identity, policy, supply chain, and detection. The architecture is only as strong as the weakest loop.
`,

  "kernel-driver-development-linux": `
## Module Lifecycle

A Linux kernel module has an init function, an exit function, and a license declaration. Device drivers register with a bus subsystem during init and unregister during exit. The probe path runs when a matching device appears; the remove path must release every resource the probe acquired.

Error handling in probe is the most common source of driver bugs. Use goto-based cleanup labels, keep the order of acquisition and release mirrored, and test the failure path deliberately.

## Memory and Concurrency

Kernel memory comes from kmalloc, vmalloc, or DMA-coherent allocations depending on size and hardware constraints. Sleeping is not allowed in atomic context, so the allocation flags must match the calling context. Spinlocks protect short critical sections; mutexes can sleep and are appropriate for paths that may block.

DMA adds its own rules: map and unmap buffers correctly, respect alignment and coherency requirements, and never assume the device sees CPU cache state without the right synchronization.

## A PCIe Example

A PCIe driver reads the device's BARs, enables bus mastering, requests an interrupt, and registers a character device or a subsystem interface. MSI/MSI-X interrupts reduce sharing and improve latency. The probe function should validate the device ID and revision before touching registers.

Keep hardware access behind small helpers so the logic can be reviewed and, where possible, tested with a fake device.

## Debugging

dmesg, ftrace, perf, and dynamic debug are the first tools to reach for. KASAN catches use-after-free and out-of-bounds access in test kernels; lockdep catches locking-order mistakes. QEMU with a virtual device is often faster than debugging on real hardware.

Write a test module that exercises the probe/remove path and the error paths. A driver that only works on the happy path is a liability.
`,

  "graph-neural-networks-cybersecurity": `
## Graph Construction

A graph model is only as meaningful as its nodes and edges. In security, nodes might be users, hosts, processes, IPs, or domains. Edges might represent authentication, network flow, process ancestry, or domain resolution. Time is a first-class property: an edge that existed last week may not exist now.

Define the prediction task before building the graph. Node classification, link prediction, and graph-level anomaly detection require different features and different evaluation splits.

## Message Passing

Graph convolutional networks aggregate neighbor features; graph attention networks learn which neighbors matter. Both are inductive in principle, but performance depends on how well the graph structure generalizes to unseen nodes.

Heterogeneous graphs — multiple node and edge types — need type-aware message passing. Collapsing everything into one node type often destroys the signal.

## Evaluation

Security graphs are imbalanced and temporal. A random train/test split leaks future information into the past. Use time-based splits, report precision at a realistic alert budget, and measure performance on rare classes separately.

Beware of label leakage through graph structure. If the label is correlated with a neighbor's label, the model may learn the graph rather than the behavior.

## Deployment

Latency budgets, graph freshness, and explainability determine whether a model is usable. An analyst needs to know why an entity was flagged, not just a score. Store the subgraph and feature attributions alongside the alert.

Monitor for distribution drift. Attackers adapt, and a model trained on last quarter's graph may be confidently wrong about this quarter's.
`,

  "embedded-linux-security-iot": `
## Firmware Analysis

Firmware analysis begins with extraction. Identify the update format, unpack the filesystem, and look for hard-coded credentials, private keys, debug interfaces, and unnecessary services. Compare the running firmware version with the vendor's published advisories.

A reproducible extraction pipeline makes it possible to diff firmware versions and spot silent changes. Keep hashes and extraction notes.

## Hardening

Enable secure boot, verify the root filesystem with dm-verity, mount it read-only, and disable unused services. Remove debug shells and default accounts. Run services as unprivileged users with the minimum capabilities they need.

The kernel configuration is part of the attack surface. Disable unused filesystems, protocols, and modules.

## Update Security

OTA updates must be signed and verified on the device. Use A/B partitions with rollback protection so a failed update does not brick the device. Protect the signing keys; a compromised update key compromises the entire fleet.

Design for offline and low-bandwidth devices: resumable downloads, staged rollouts, and a clear recovery path.

## Field Operations

Key management, logging, and incident response continue after deployment. Rotate device credentials, collect security events, and provide a way to remotely isolate a compromised device without losing forensic evidence.

Embedded security is a lifecycle problem. The device you ship is the device someone will attack five years from now; plan for updates before you ship.
`,

  "adversarial-machine-learning": `
## Threat Models

Adversarial ML is not one attack. Evasion changes an input at inference time; poisoning corrupts training data; extraction steals model behavior; inference attacks recover properties of the training set. Each has a different attacker capability and a different mitigation.

Write the threat model explicitly: what can the attacker change, what access do they have, and what is the cost of a successful attack?

## Attack Intuition

Gradient-based evasion methods perturb an input in the direction that most increases the loss. Transferability — perturbations crafted on one model affecting another — is what makes black-box attacks practical. Perturbation budgets constrain how visible the change is.

Defenses that rely on obscurity tend to fail once the attacker can query the model. Evaluate against adaptive attacks, not only the ones you designed the defense for.

## Defenses

Adversarial training improves robustness against known attack families but is expensive and can reduce clean accuracy. Input validation, randomized smoothing, ensembles, and anomaly detection each help in specific settings. None is a universal solution.

Measure robustness with a clear attack budget and report both clean and robust accuracy. A defense that only works on a weak attack is not evidence of security.

## Limits and Evaluation

The arms race is real. Treat adversarial robustness as a risk-reduction exercise, not a binary guarantee. Red-team the model with the same rigor as the rest of the system, and connect ML findings to product impact.

Document assumptions and failure modes so downstream teams know what the model is and is not trusted to do.
`,

  "post-quantum-cryptography-implementation": `
## Why PQC Now

“Harvest now, decrypt later” makes post-quantum migration urgent even before large-scale quantum computers exist. An adversary can record encrypted traffic today and decrypt it when the capability arrives. Long-lived secrets — identity keys, firmware signing keys, health and financial records — are the highest priority.

NIST standardized ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for signatures, with additional schemes for specific use cases. The standards are the starting point; implementation and migration are the hard parts.

## Lattice Assumptions and Sizes

ML-KEM and ML-DSA rely on the hardness of module-lattice problems. Keys and ciphertexts are larger than their elliptic-curve counterparts, which affects TLS handshakes, certificate sizes, and embedded devices. Measure the impact on your protocol before committing to a parameter set.

Hybrid modes combine a classical and a post-quantum primitive so that the connection remains secure if either one holds. This is the pragmatic default during the transition.

## Implementation Pitfalls

Constant-time code, unbiased randomness, and correct domain separation are non-negotiable. Side channels and faulty random number generation have broken otherwise sound constructions. Use a well-reviewed library; do not implement the primitives from scratch for production.

Test against published vectors and run interoperability tests between independent implementations. A scheme that only talks to itself is not ready.

## Migration Plan

Inventory cryptography across services, clients, firmware, and third-party dependencies. Prioritize long-lived secrets and externally exposed endpoints. Add crypto agility so algorithms can be swapped without a rewrite. Run hybrid pilots, measure latency and packet sizes, and document rollback.

Migration is a multi-year program. Start with discovery and agility now; the cost of waiting compounds.
`,
};
