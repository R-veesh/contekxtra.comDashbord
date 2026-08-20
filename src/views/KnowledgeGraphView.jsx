import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import {
  Search,
  RotateCw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Sliders,
  Layers,
  Activity,
  Info,
  ExternalLink,
  Sparkles,
  Zap,
  Filter,
  RefreshCw,
  X
} from 'lucide-react';

// ==========================================
// KNOWLEDGE GRAPH DATASET
// ==========================================
const CLUSTERS = {
  AI_CORE: { id: 'AI_CORE', name: 'Neural & AI Core', color: '#60A5FA', glow: '#3B82F6' },
  VECTOR_DB: { id: 'VECTOR_DB', name: 'Vector & Embeddings', color: '#34D399', glow: '#10B981' },
  ENTERPRISE_DATA: { id: 'ENTERPRISE_DATA', name: 'Enterprise Sources', color: '#FBBF24', glow: '#F59E0B' },
  GOVERNANCE: { id: 'GOVERNANCE', name: 'Security & Compliance', color: '#F87171', glow: '#EF4444' },
  PIPELINES: { id: 'PIPELINES', name: 'Semantic Pipelines', color: '#A78BFA', glow: '#8B5CF6' },
  ENTITIES: { id: 'ENTITIES', name: 'Knowledge Entities', color: '#38BDF8', glow: '#0EA5E9' }
};

const RAW_NODES = [
  // AI Core Cluster (Dominant & Central)
  { id: 'DNN', label: 'DNN', type: 'hub', cluster: 'AI_CORE', size: 14, desc: 'Deep Neural Network primary inference engine for semantic intent detection', confidence: 99.2, records: '4.8M ops/sec' },
  { id: 'BAYESM', label: 'BAYESM', type: 'hub', cluster: 'AI_CORE', size: 12, desc: 'Bayesian belief network for probabilistic relation scoring', confidence: 97.8, records: '1.2M nodes' },
  { id: 'DBPR', label: 'DBPR', type: 'hub', cluster: 'AI_CORE', size: 13, desc: 'Dense Bi-directional Passage Ranking & Context Matching model', confidence: 98.6, records: '820K passages' },
  { id: 'BPR+', label: 'BPR+', type: 'node', cluster: 'AI_CORE', size: 9, desc: 'Bayesian Personalized Ranking multi-source retriever', confidence: 95.4, records: '340K queries' },
  { id: 'VRMMAX', label: 'VRMMAX', type: 'node', cluster: 'AI_CORE', size: 9, desc: 'Vector Relevance Maximization model', confidence: 94.1, records: '510K vectors' },
  { id: 'RELU', label: 'RELU', type: 'node', cluster: 'AI_CORE', size: 8, desc: 'Non-linear semantic activation & gatekeeper filter', confidence: 99.0, records: '8.9M firings' },
  { id: 'TRANSFORMER_V4', label: 'TRANSFORMER_V4', type: 'node', cluster: 'AI_CORE', size: 10, desc: 'Multi-head contextual attention layer for cross-document reasoning', confidence: 98.1, records: '2.1M tokens' },
  { id: 'RAG_SYNTH', label: 'RAG_SYNTH', type: 'hub', cluster: 'AI_CORE', size: 12, desc: 'Retrieval-Augmented Generation context aggregator & summarizer', confidence: 97.4, records: '128K responses' },
  { id: 'SS_DL', label: 'SS-DL', type: 'node', cluster: 'AI_CORE', size: 8, desc: 'Self-Supervised Deep Learning ontology classifier', confidence: 93.7, records: '750K pairs' },
  { id: 'POINTRANK', label: 'POINTRANK', type: 'node', cluster: 'AI_CORE', size: 8, desc: 'Pointwise cross-entropy document relevance estimator', confidence: 91.5, records: '420K docs' },

  // Vector & Embeddings
  { id: 'VECTOR_HUB', label: 'VECTOR_HUB', type: 'hub', cluster: 'VECTOR_DB', size: 13, desc: 'Central HNSW vector index hosting 1536-dim enterprise embeddings', confidence: 99.8, records: '14.2M vectors' },
  { id: 'PINECONE_DENSE', label: 'PINECONE_DENSE', type: 'node', cluster: 'VECTOR_DB', size: 9, desc: 'Real-time dense similarity search namespace', confidence: 98.4, records: '6.2M vectors' },
  { id: 'MILVUS_CLUSTER', label: 'MILVUS_CLUSTER', type: 'node', cluster: 'VECTOR_DB', size: 9, desc: 'Distributed billion-scale vector index partition', confidence: 96.9, records: '5.1M vectors' },
  { id: 'HYBRID_BM25', label: 'HYBRID_BM25', type: 'node', cluster: 'VECTOR_DB', size: 8, desc: 'Sparse lexical keyword matcher blended with vector scores', confidence: 95.0, records: '3.4M records' },
  { id: 'EMBED_ROBERTA', label: 'EMBED_ROBERTA', type: 'node', cluster: 'VECTOR_DB', size: 9, desc: 'Enterprise fine-tuned RoBERTa-large embedding generator', confidence: 97.2, records: '980K docs' },
  { id: 'ANN_GRAPH', label: 'ANN_GRAPH', type: 'node', cluster: 'VECTOR_DB', size: 8, desc: 'Approximate Nearest Neighbor navigation graph', confidence: 96.0, records: '1.8M edges' },

  // Enterprise Sources Cluster
  { id: 'CONFLUENCE_ENG', label: 'Confluence Eng', type: 'hub', cluster: 'ENTERPRISE_DATA', size: 11, desc: 'Confluence Engineering space with architecture RFCs and specs', confidence: 96.5, records: '18,204 docs' },
  { id: 'SNOWFLAKE_DWH', label: 'Snowflake DWH', type: 'hub', cluster: 'ENTERPRISE_DATA', size: 12, desc: 'Enterprise analytics data warehouse with transaction schemas', confidence: 99.1, records: '412 tables' },
  { id: 'SHAREPOINT_FIN', label: 'SharePoint Legal', type: 'node', cluster: 'ENTERPRISE_DATA', size: 9, desc: 'SharePoint Finance & Legal contracts repository', confidence: 95.8, records: '6,880 files' },
  { id: 'SALESFORCE_CRM', label: 'Salesforce CRM', type: 'node', cluster: 'ENTERPRISE_DATA', size: 10, desc: 'Customer accounts, opportunities and interactions database', confidence: 98.2, records: '92,110 recs' },
  { id: 'ZENDESK_KB', label: 'Zendesk KB', type: 'node', cluster: 'ENTERPRISE_DATA', size: 8, desc: 'Customer Support knowledge base and resolved incident tickets', confidence: 94.7, records: '3,014 articles' },
  { id: 'GOOGLE_DRIVE', label: 'G-Drive Research', type: 'node', cluster: 'ENTERPRISE_DATA', size: 9, desc: 'Research team documents, market analysis, competitor PDFs', confidence: 92.4, records: '9,442 files' },
  { id: 'GITHUB_REPOS', label: 'GitHub Repos', type: 'node', cluster: 'ENTERPRISE_DATA', size: 8, desc: 'Source code repositories, pull requests, API interfaces', confidence: 97.6, records: '340 repos' },
  { id: 'NOTION_WIKI', label: 'Notion Wiki', type: 'node', cluster: 'ENTERPRISE_DATA', size: 7, desc: 'Product roadmaps, internal onboarding and standard SOPs', confidence: 91.0, records: '1,420 pages' },

  // Governance & Security Cluster
  { id: 'COMPLIANCE_CORE', label: 'COMPLIANCE_CORE', type: 'hub', cluster: 'GOVERNANCE', size: 12, desc: 'Context-level data governance, RBAC enforcement & audit rules', confidence: 99.9, records: '100% policy match' },
  { id: 'GDPR_SCRUBBER', label: 'GDPR_SCRUBBER', type: 'node', cluster: 'GOVERNANCE', size: 8, desc: 'PII detection and automated redaction before context indexing', confidence: 99.4, records: '0 PII leaks' },
  { id: 'RBAC_MATRIX', label: 'RBAC_MATRIX', type: 'node', cluster: 'GOVERNANCE', size: 9, desc: 'Multi-tenant role-based access control permission validator', confidence: 99.7, records: '2,400 roles' },
  { id: 'SOC2_VAULT', label: 'SOC2_VAULT', type: 'node', cluster: 'GOVERNANCE', size: 8, desc: 'Cryptographic audit ledger for all retrieval operations', confidence: 100.0, records: '10.4M logs' },
  { id: 'RETENTION_RULE', label: 'DATA_RETENTION', type: 'node', cluster: 'GOVERNANCE', size: 8, desc: 'Automated 7-year document lifespan enforcement engine', confidence: 98.9, records: '38 policies' },

  // Semantic Pipelines Cluster
  { id: 'CONTEXT_ENGINE', label: 'CONTEXT ENGINE', type: 'hub', cluster: 'PIPELINES', size: 16, desc: 'Central orchestration engine linking user queries to enterprise truth', confidence: 99.8, records: 'Active Orchestrator' },
  { id: 'ONTOLOGY_HUB', label: 'ONTOLOGY_HUB', type: 'hub', cluster: 'PIPELINES', size: 11, desc: 'Domain taxonomy graph mapping cross-department entities', confidence: 96.8, records: '48,000 concepts' },
  { id: 'FEDERATED_QUERY', label: 'FEDERATED_QUERY', type: 'node', cluster: 'PIPELINES', size: 9, desc: 'Multi-source distributed search execution planner', confidence: 97.1, records: '142 shards' },
  { id: 'LIVE_STREAM_SYNC', label: 'STREAM_SYNC', type: 'node', cluster: 'PIPELINES', size: 8, desc: 'Kafka-driven event stream keeping vector graphs in sync', confidence: 99.3, records: '<120ms lag' },
  { id: 'QUERY_REWRITER', label: 'QUERY_REWRITER', type: 'node', cluster: 'PIPELINES', size: 8, desc: 'HyDE hypothetical document expansion and query disambiguation', confidence: 95.9, records: '98K rewrites' },

  // Knowledge Entities Cluster
  { id: 'Q3_VENDOR_TERMS', label: 'Q3 Vendor Terms', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'Vendor liability, SLA warranties and Q3 updated contract schedules', confidence: 96.0, records: 'Contract #4102' },
  { id: 'APAC_REVENUE', label: 'APAC Revenue Q2', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'Q2 APAC gross recurring revenue breakdown by territory', confidence: 98.5, records: '$42.8M verified' },
  { id: 'RETENTION_POLICY', label: 'Data Retention Doc', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'Enterprise data retention guideline owned by Governance', confidence: 94.2, records: 'Gov-Doc-88' },
  { id: 'PRICING_MODEL', label: 'Competitor Pricing', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'Tiered enterprise seat pricing analysis vs market peers', confidence: 89.4, records: 'G-Drive PDF' },
  { id: 'INCIDENT_P1', label: 'P1 Incident Cluster', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'High-severity service degradation reports in EMEA cluster', confidence: 96.2, records: '8 tickets' },
  { id: 'CUSTOMER_360', label: 'Customer 360 Index', type: 'node', cluster: 'ENTITIES', size: 8, desc: 'Unified CRM and billing record profile for Enterprise tier', confidence: 97.9, records: '8,400 accounts' },
  { id: 'AUTH_TOKENS', label: 'OAuth Identity Hub', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'SSO Okta and SAML credential session manager', confidence: 99.8, records: '14K sessions' },
  { id: 'SCHEMA_REGISTRY', label: 'Schema Registry', type: 'node', cluster: 'ENTITIES', size: 7, desc: 'Protobuf & Avro enterprise message contracts', confidence: 99.1, records: '1,200 schemas' },

  // Secondary & Micro Nodes for High-Density Constellation Effect (like reference images)
  { id: 'X_CONV', label: 'X-CONV', type: 'leaf', cluster: 'AI_CORE', size: 5, desc: 'Cross-convolutional feature extractor', confidence: 91.0, records: 'Tensor node' },
  { id: 'BMS', label: 'BMS', type: 'leaf', cluster: 'AI_CORE', size: 6, desc: 'Bidirectional Match Score evaluator', confidence: 92.4, records: 'Sub-layer' },
  { id: 'MSK05', label: 'MSK-05', type: 'leaf', cluster: 'AI_CORE', size: 5, desc: 'Masked token attention weight gate', confidence: 89.7, records: 'Layer 5' },
  { id: 'TAU_TRN', label: 'TAU-TRN', type: 'leaf', cluster: 'AI_CORE', size: 5, desc: 'Temperature calibrated softmax normalizer', confidence: 94.0, records: 'Kernel' },
  { id: 'G2_NB', label: 'G2-NB', type: 'leaf', cluster: 'VECTOR_DB', size: 5, desc: 'Graph 2nd-order neighborhood walker', confidence: 90.2, records: 'Graph node' },
  { id: 'COGO475', label: 'COGO475', type: 'leaf', cluster: 'VECTOR_DB', size: 5, desc: 'Contextual co-occurrence matrix node', confidence: 88.6, records: 'Matrix entry' },
  { id: 'PELL07', label: 'PELL07', type: 'leaf', cluster: 'ENTERPRISE_DATA', size: 5, desc: 'Partitioned entity lineage lookup', confidence: 93.1, records: 'Lineage log' },
  { id: 'DOMEN07', label: 'DOMEN07', type: 'leaf', cluster: 'GOVERNANCE', size: 5, desc: 'Domain entitlement verification unit', confidence: 97.0, records: 'Sec audit' },
  { id: 'ADAPT70481', label: 'ADAPT-70481', type: 'leaf', cluster: 'PIPELINES', size: 5, desc: 'Adaptive batch scheduler pipeline node', confidence: 95.2, records: 'Stream edge' },
  { id: 'K_GRAPH_V2', label: 'KG_V2', type: 'leaf', cluster: 'PIPELINES', size: 6, desc: 'Knowledge graph version 2 delta index', confidence: 96.8, records: 'Delta log' },
  { id: 'SOPG', label: 'SOPG', type: 'leaf', cluster: 'ENTITIES', size: 5, desc: 'Standard Operating Procedure Guidelines', confidence: 92.0, records: 'Wiki node' },
  { id: 'AG4', label: 'AG4', type: 'leaf', cluster: 'ENTITIES', size: 5, desc: 'Aggregated analytics gateway unit 4', confidence: 94.5, records: 'Telemetry' },
  { id: 'VRK4', label: 'VRK4', type: 'leaf', cluster: 'AI_CORE', size: 5, desc: 'Variant ranking kernel module', confidence: 90.8, records: 'Kernel 4' },
  { id: 'QOPL', label: 'QOPL', type: 'leaf', cluster: 'VECTOR_DB', size: 5, desc: 'Quantized oblique projection layer', confidence: 91.9, records: 'Quantizer' },
  { id: 'BRP_X', label: 'BRP-X', type: 'leaf', cluster: 'AI_CORE', size: 6, desc: 'Branching ranking processor', confidence: 93.2, records: 'Branch node' },
  { id: 'LEX_77', label: 'LEX-77', type: 'leaf', cluster: 'VECTOR_DB', size: 5, desc: 'Lexical frequency inverted posting list', confidence: 89.9, records: 'Posting' },
  { id: 'SEC_KV', label: 'SEC_KV', type: 'leaf', cluster: 'GOVERNANCE', size: 6, desc: 'Encrypted key-value authorization store', confidence: 99.5, records: 'Vault shard' },
  { id: 'PIPE_88', label: 'PIPE-88', type: 'leaf', cluster: 'PIPELINES', size: 5, desc: 'Async worker dispatch channel', confidence: 97.4, records: 'Worker 88' }
];

const RAW_LINKS = [
  // Context Engine Core Links (Primary Nexus)
  { source: 'CONTEXT_ENGINE', target: 'DNN', value: 3.5 },
  { source: 'CONTEXT_ENGINE', target: 'DBPR', value: 3.2 },
  { source: 'CONTEXT_ENGINE', target: 'BAYESM', value: 2.8 },
  { source: 'CONTEXT_ENGINE', target: 'VECTOR_HUB', value: 4.0 },
  { source: 'CONTEXT_ENGINE', target: 'ONTOLOGY_HUB', value: 3.0 },
  { source: 'CONTEXT_ENGINE', target: 'COMPLIANCE_CORE', value: 3.5 },
  { source: 'CONTEXT_ENGINE', target: 'FEDERATED_QUERY', value: 2.8 },
  { source: 'CONTEXT_ENGINE', target: 'RAG_SYNTH', value: 3.8 },

  // AI Core Internal Constellation
  { source: 'DNN', target: 'BAYESM', value: 2.2 },
  { source: 'DNN', target: 'DBPR', value: 2.5 },
  { source: 'DNN', target: 'BPR+', value: 2.0 },
  { source: 'DNN', target: 'RELU', value: 1.8 },
  { source: 'DNN', target: 'VRMMAX', value: 2.1 },
  { source: 'DNN', target: 'TRANSFORMER_V4', value: 2.6 },
  { source: 'DBPR', target: 'BPR+', value: 2.4 },
  { source: 'DBPR', target: 'SS_DL', value: 1.9 },
  { source: 'DBPR', target: 'POINTRANK', value: 1.7 },
  { source: 'BAYESM', target: 'BMS', value: 1.5 },
  { source: 'BAYESM', target: 'VRK4', value: 1.4 },
  { source: 'VRMMAX', target: 'RELU', value: 1.5 },
  { source: 'TRANSFORMER_V4', target: 'RAG_SYNTH', value: 2.8 },
  { source: 'RAG_SYNTH', target: 'QUERY_REWRITER', value: 2.2 },
  { source: 'SS_DL', target: 'X_CONV', value: 1.3 },
  { source: 'POINTRANK', target: 'MSK05', value: 1.2 },
  { source: 'RELU', target: 'TAU_TRN', value: 1.3 },
  { source: 'BPR+', target: 'BRP_X', value: 1.4 },

  // Vector DB Mesh
  { source: 'VECTOR_HUB', target: 'PINECONE_DENSE', value: 2.7 },
  { source: 'VECTOR_HUB', target: 'MILVUS_CLUSTER', value: 2.5 },
  { source: 'VECTOR_HUB', target: 'HYBRID_BM25', value: 2.3 },
  { source: 'VECTOR_HUB', target: 'EMBED_ROBERTA', value: 3.0 },
  { source: 'VECTOR_HUB', target: 'ANN_GRAPH', value: 2.2 },
  { source: 'PINECONE_DENSE', target: 'EMBED_ROBERTA', value: 2.0 },
  { source: 'MILVUS_CLUSTER', target: 'QOPL', value: 1.4 },
  { source: 'HYBRID_BM25', target: 'LEX_77', value: 1.5 },
  { source: 'ANN_GRAPH', target: 'G2_NB', value: 1.3 },
  { source: 'EMBED_ROBERTA', target: 'TRANSFORMER_V4', value: 2.4 },
  { source: 'ANN_GRAPH', target: 'COGO475', value: 1.2 },

  // Enterprise Sources Connections
  { source: 'CONFLUENCE_ENG', target: 'VECTOR_HUB', value: 2.5 },
  { source: 'CONFLUENCE_ENG', target: 'RETENTION_POLICY', value: 2.0 },
  { source: 'CONFLUENCE_ENG', target: 'GITHUB_REPOS', value: 1.8 },
  { source: 'SNOWFLAKE_DWH', target: 'APAC_REVENUE', value: 2.8 },
  { source: 'SNOWFLAKE_DWH', target: 'FEDERATED_QUERY', value: 2.6 },
  { source: 'SNOWFLAKE_DWH', target: 'CUSTOMER_360', value: 2.4 },
  { source: 'SHAREPOINT_FIN', target: 'Q3_VENDOR_TERMS', value: 3.0 },
  { source: 'SHAREPOINT_FIN', target: 'COMPLIANCE_CORE', value: 2.2 },
  { source: 'SALESFORCE_CRM', target: 'CUSTOMER_360', value: 3.1 },
  { source: 'SALESFORCE_CRM', target: 'APAC_REVENUE', value: 2.1 },
  { source: 'ZENDESK_KB', target: 'INCIDENT_P1', value: 2.9 },
  { source: 'ZENDESK_KB', target: 'DBPR', value: 2.0 },
  { source: 'GOOGLE_DRIVE', target: 'PRICING_MODEL', value: 2.6 },
  { source: 'NOTION_WIKI', target: 'SOPG', value: 1.5 },
  { source: 'GITHUB_REPOS', target: 'SCHEMA_REGISTRY', value: 2.0 },
  { source: 'CONFLUENCE_ENG', target: 'PELL07', value: 1.3 },

  // Governance & Security Links
  { source: 'COMPLIANCE_CORE', target: 'GDPR_SCRUBBER', value: 2.8 },
  { source: 'COMPLIANCE_CORE', target: 'RBAC_MATRIX', value: 3.0 },
  { source: 'COMPLIANCE_CORE', target: 'SOC2_VAULT', value: 2.5 },
  { source: 'COMPLIANCE_CORE', target: 'RETENTION_RULE', value: 2.4 },
  { source: 'RBAC_MATRIX', target: 'AUTH_TOKENS', value: 2.7 },
  { source: 'RBAC_MATRIX', target: 'SALESFORCE_CRM', value: 2.0 },
  { source: 'GDPR_SCRUBBER', target: 'CUSTOMER_360', value: 2.2 },
  { source: 'COMPLIANCE_CORE', target: 'DOMEN07', value: 1.4 },
  { source: 'SOC2_VAULT', target: 'SEC_KV', value: 1.6 },

  // Semantic Pipelines & Cross-Bridge Links
  { source: 'ONTOLOGY_HUB', target: 'CUSTOMER_360', value: 2.4 },
  { source: 'ONTOLOGY_HUB', target: 'Q3_VENDOR_TERMS', value: 2.2 },
  { source: 'ONTOLOGY_HUB', target: 'APAC_REVENUE', value: 2.0 },
  { source: 'ONTOLOGY_HUB', target: 'SS_DL', value: 2.5 },
  { source: 'FEDERATED_QUERY', target: 'QUERY_REWRITER', value: 2.5 },
  { source: 'FEDERATED_QUERY', target: 'PINECONE_DENSE', value: 2.2 },
  { source: 'LIVE_STREAM_SYNC', target: 'VECTOR_HUB', value: 2.8 },
  { source: 'LIVE_STREAM_SYNC', target: 'SNOWFLAKE_DWH', value: 2.4 },
  { source: 'LIVE_STREAM_SYNC', target: 'ADAPT70481', value: 1.4 },
  { source: 'QUERY_REWRITER', target: 'HYBRID_BM25', value: 2.1 },
  { source: 'ONTOLOGY_HUB', target: 'K_GRAPH_V2', value: 1.8 },
  { source: 'FEDERATED_QUERY', target: 'PIPE_88', value: 1.4 },
  { source: 'CUSTOMER_360', target: 'AG4', value: 1.3 }
];

// Helper to create circular particle texture
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(200, 235, 255, 0.8)');
  grad.addColorStop(0.6, 'rgba(100, 180, 255, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Helper to create text sprite with high crispness and optional glow background
function createTextSprite(text, color = '#FFFFFF', isHub = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = isHub ? 28 : 20;
  ctx.font = `${isHub ? 'bold' : '500'} ${fontSize}px "Space Grotesk", "IBM Plex Mono", sans-serif`;

  const textMetrics = ctx.measureText(text);
  const paddingX = isHub ? 16 : 10;
  const paddingY = isHub ? 8 : 6;
  const width = Math.ceil(textMetrics.width + paddingX * 2);
  const height = Math.ceil(fontSize + paddingY * 2);

  canvas.width = width * 2;
  canvas.height = height * 2;
  ctx.scale(2, 2);

  // Background pill for contrast against dense links
  ctx.fillStyle = 'rgba(7, 10, 17, 0.75)';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 4);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = isHub ? color : 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text with subtle glow
  ctx.font = `${isHub ? 'bold' : '500'} ${fontSize}px "Space Grotesk", "IBM Plex Mono", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = isHub ? 6 : 2;
  ctx.fillText(text, paddingX, height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: isHub ? 0.95 : 0.75
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  const scaleFactor = isHub ? 0.12 : 0.08;
  sprite.scale.set(width * scaleFactor, height * scaleFactor, 1);
  return sprite;
}

export default function KnowledgeGraphView() {
  const mountRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeClusterFilter, setActiveClusterFilter] = useState('ALL');
  const [viewPreset, setViewPreset] = useState('CONSTELLATION'); // CONSTELLATION | SPHERICAL | NEURAL | GALAXY
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showPulseEnergy, setShowPulseEnergy] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reticlePos, setReticlePos] = useState(null); // Screen space 2D { x, y }
  const [stats] = useState({
    nodes: RAW_NODES.length,
    links: RAW_LINKS.length,
    entropy: '0.042 nats',
    liveLatency: '14ms',
    activeQueries: 342
  });

  // Three.js internal state refs
  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    nodeMeshes: [],
    labelSprites: [],
    lineSegments: null,
    pulseParticles: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(-9999, -9999),
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    sphericalCoords: { radius: 240, theta: Math.PI / 4, phi: Math.PI / 3 },
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    cameraTargetPos: null,
    animationFrameId: null,
    nodeDataMap: new Map(),
    linkList: []
  });

  // Calculate 3D positions according to preset layout
  const calculatedPositions = useMemo(() => {
    const posMap = new Map();
    const clusterCentres = {
      AI_CORE: new THREE.Vector3(0, 15, 0),
      VECTOR_DB: new THREE.Vector3(-65, -20, 35),
      ENTERPRISE_DATA: new THREE.Vector3(70, -25, -40),
      GOVERNANCE: new THREE.Vector3(45, 45, 50),
      PIPELINES: new THREE.Vector3(-55, 30, -50),
      ENTITIES: new THREE.Vector3(15, -60, 20)
    };

    RAW_NODES.forEach((node, index) => {
      let vec = new THREE.Vector3();
      const centre = clusterCentres[node.cluster] || new THREE.Vector3(0, 0, 0);

      if (viewPreset === 'CONSTELLATION') {
        // Organic dense constellation clustered around hubs
        if (node.id === 'CONTEXT_ENGINE') {
          vec.set(0, 0, 0);
        } else if (node.type === 'hub') {
          const phi = (index / RAW_NODES.length) * Math.PI * 2;
          const r = 45 + (index % 3) * 15;
          vec.set(
            centre.x + Math.cos(phi) * r * 0.5,
            centre.y + (Math.sin(phi * 2) * 20),
            centre.z + Math.sin(phi) * r * 0.5
          );
        } else {
          // Spread satellite nodes around their cluster centre with organic jitter
          const u = Math.random() * 2 - 1;
          const theta = Math.random() * Math.PI * 2;
          const r = 20 + Math.random() * 35;
          vec.set(
            centre.x + Math.sqrt(1 - u * u) * Math.cos(theta) * r,
            centre.y + u * r * 0.8,
            centre.z + Math.sqrt(1 - u * u) * Math.sin(theta) * r
          );
        }
      } else if (viewPreset === 'SPHERICAL') {
        // Nested spherical cybernetic shell
        const phi = Math.acos(-1 + (2 * index) / RAW_NODES.length);
        const theta = Math.sqrt(RAW_NODES.length * Math.PI) * phi;
        const radius = node.type === 'hub' ? 55 : 85 + (index % 4) * 10;
        vec.set(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
      } else if (viewPreset === 'NEURAL') {
        // Double helix / layer lattice
        const t = (index / RAW_NODES.length) * Math.PI * 6;
        const r = 50;
        const y = ((index / RAW_NODES.length) - 0.5) * 140;
        const helixArm = index % 2 === 0 ? 1 : -1;
        vec.set(
          Math.cos(t) * r * helixArm + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 10,
          Math.sin(t) * r * helixArm + (Math.random() - 0.5) * 20
        );
      } else {
        // GALAXY spiral disk
        const angle = index * 0.35;
        const dist = 15 + index * 2.2;
        vec.set(
          Math.cos(angle) * dist,
          (Math.random() - 0.5) * (30 - dist * 0.15),
          Math.sin(angle) * dist
        );
      }

      posMap.set(node.id, vec);
    });

    return posMap;
  }, [viewPreset]);

  // Main Three.js Scene Setup and Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070B);
    scene.fog = new THREE.FogExp2(0x05070B, 0.0018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 60, 260);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    sceneState.current.scene = scene;
    sceneState.current.camera = camera;
    sceneState.current.renderer = renderer;

    // 2. Ambient Lighting & Glow Lights
    const ambientLight = new THREE.AmbientLight(0x223344, 1.2);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(0x60A5FA, 2.5, 300);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    const goldLight = new THREE.PointLight(0xF59E0B, 2.0, 300);
    goldLight.position.set(60, 40, 60);
    scene.add(goldLight);

    // 3. Cosmic Starfield / Nebula Background Particles
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 300 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const isWarm = Math.random() > 0.65;
      starColors[i * 3] = isWarm ? 0.9 : 0.4;
      starColors[i * 3 + 1] = isWarm ? 0.7 : 0.7;
      starColors[i * 3 + 2] = isWarm ? 0.4 : 1.0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      map: createParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Create 3D Nodes & Text Sprites
    const nodeMeshes = [];
    const labelSprites = [];
    const nodeMap = new Map();
    const particleTex = createParticleTexture();

    RAW_NODES.forEach((node) => {
      const pos = calculatedPositions.get(node.id) || new THREE.Vector3();
      const clusterInfo = CLUSTERS[node.cluster] || CLUSTERS.AI_CORE;

      // Group holding node sphere + halo + label
      const group = new THREE.Group();
      group.position.copy(pos);
      group.userData = { node };

      // Core luminous sphere
      const sphereGeo = new THREE.SphereGeometry(node.type === 'hub' ? 3.8 : 2.2, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(clusterInfo.color),
        wireframe: false
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphereMesh);

      // Outer glowing halo sprite
      const haloMat = new THREE.SpriteMaterial({
        map: particleTex,
        color: new THREE.Color(clusterInfo.glow),
        transparent: true,
        opacity: node.type === 'hub' ? 0.85 : 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const haloSprite = new THREE.Sprite(haloMat);
      const haloScale = node.type === 'hub' ? 18 : 10;
      haloSprite.scale.set(haloScale, haloScale, 1);
      group.add(haloSprite);

      // 3D Billboard text label
      const isHub = node.type === 'hub';
      const label = createTextSprite(node.label, isHub ? clusterInfo.color : '#CBD5E1', isHub);
      label.position.set(0, (node.type === 'hub' ? 5.5 : 3.8), 0);
      group.add(label);

      scene.add(group);
      nodeMeshes.push(group);
      labelSprites.push(label);
      nodeMap.set(node.id, { node, group, haloSprite, sphereMesh, label });
    });

    sceneState.current.nodeMeshes = nodeMeshes;
    sceneState.current.labelSprites = labelSprites;
    sceneState.current.nodeDataMap = nodeMap;

    // 5. Create Dynamic 3D Links / Filaments
    const linkPositions = [];
    const linkColors = [];
    const validLinks = [];

    RAW_LINKS.forEach((link) => {
      const srcNode = nodeMap.get(link.source);
      const tgtNode = nodeMap.get(link.target);
      if (srcNode && tgtNode) {
        validLinks.push({ source: link.source, target: link.target, srcNode, tgtNode, value: link.value });
        const p1 = srcNode.group.position;
        const p2 = tgtNode.group.position;

        linkPositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

        // Gradient line colors
        const c1 = new THREE.Color(CLUSTERS[srcNode.node.cluster]?.color || '#60A5FA');
        const c2 = new THREE.Color(CLUSTERS[tgtNode.node.cluster]?.color || '#FBBF24');
        linkColors.push(c1.r * 0.6, c1.g * 0.6, c1.b * 0.6);
        linkColors.push(c2.r * 0.6, c2.g * 0.6, c2.b * 0.6);
      }
    });

    sceneState.current.linkList = validLinks;

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(linkColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);
    sceneState.current.lineSegments = lineSegments;

    // 6. Traveling Energy Pulse Particles along links
    const pulseCount = validLinks.length * 2;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(pulseCount * 3);
    const pulseCol = new Float32Array(pulseCount * 3);
    const pulseProgress = new Float32Array(pulseCount);
    const pulseSpeeds = new Float32Array(pulseCount);
    const pulseLinkIdx = new Int32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      const lIdx = i % validLinks.length;
      pulseLinkIdx[i] = lIdx;
      pulseProgress[i] = Math.random();
      pulseSpeeds[i] = 0.003 + Math.random() * 0.005;

      const link = validLinks[lIdx];
      const col = new THREE.Color(CLUSTERS[link.srcNode.node.cluster]?.glow || '#60A5FA');
      pulseCol[i * 3] = col.r;
      pulseCol[i * 3 + 1] = col.g;
      pulseCol[i * 3 + 2] = col.b;
    }

    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
    pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseCol, 3));

    const pulseMat = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pulseParticles = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulseParticles);
    sceneState.current.pulseParticles = pulseParticles;

    // 7. Mouse & Orbit Interaction Handlers
    let isMouseDown = false;
    let isRightClick = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spherical = { radius: 240, theta: Math.PI / 4, phi: Math.PI / 3 };
    let currentLookAt = new THREE.Vector3(0, 0, 0);

    const updateCameraFromSpherical = () => {
      spherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, spherical.phi));
      spherical.radius = Math.max(40, Math.min(700, spherical.radius));

      camera.position.x = currentLookAt.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = currentLookAt.y + spherical.radius * Math.cos(spherical.phi);
      camera.position.z = currentLookAt.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(currentLookAt);
    };

    updateCameraFromSpherical();

    const onMouseDown = (e) => {
      isMouseDown = true;
      isRightClick = e.button === 2 || e.ctrlKey;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      sceneState.current.mouse.set(mouseX, mouseY);

      if (isMouseDown) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        if (isRightClick) {
          // Pan camera
          const panSpeed = spherical.radius * 0.0015;
          const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
          const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
          currentLookAt.addScaledVector(right, -deltaX * panSpeed);
          currentLookAt.addScaledVector(up, deltaY * panSpeed);
        } else {
          // Rotate camera orbit
          spherical.theta -= deltaX * 0.006;
          spherical.phi -= deltaY * 0.006;
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
        updateCameraFromSpherical();
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      spherical.radius += e.deltaY * 0.15;
      updateCameraFromSpherical();
    };

    const onContextMenu = (e) => {
      e.preventDefault();
    };

    // Node Click Raycasting
    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      sceneState.current.raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = sceneState.current.raycaster.intersectObjects(
        nodeMeshes.map(g => g.children[0])
      );

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedNode = clickedMesh.parent.userData.node;
        setSelectedNode(clickedNode);

        // Smoothly animate lookAt target to focused node
        currentLookAt.copy(clickedMesh.parent.position);
        updateCameraFromSpherical();
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('contextmenu', onContextMenu);
    container.addEventListener('click', onClick);

    // 8. Animation & Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      sceneState.current.animationFrameId = requestAnimationFrame(animate);
      clock.getDelta();
      const time = clock.getElapsedTime();

      // Auto-rotation when enabled and user not interacting
      if (isAutoRotating && !isMouseDown) {
        spherical.theta += 0.0018;
        updateCameraFromSpherical();
      }

      // Starfield subtle slow drift
      starField.rotation.y = time * 0.012;
      starField.rotation.x = time * 0.006;

      // Pulse Energy Particles animation along links
      if (showPulseEnergy) {
        const positions = pulseGeo.attributes.position.array;
        for (let i = 0; i < pulseCount; i++) {
          pulseProgress[i] = (pulseProgress[i] + pulseSpeeds[i]) % 1;
          const lIdx = pulseLinkIdx[i];
          const link = validLinks[lIdx];
          if (link) {
            const p1 = link.srcNode.group.position;
            const p2 = link.tgtNode.group.position;
            const prog = pulseProgress[i];

            positions[i * 3] = p1.x + (p2.x - p1.x) * prog;
            positions[i * 3 + 1] = p1.y + (p2.y - p1.y) * prog;
            positions[i * 3 + 2] = p1.z + (p2.z - p1.z) * prog;
          }
        }
        pulseGeo.attributes.position.needsUpdate = true;
        pulseParticles.visible = true;
      } else {
        pulseParticles.visible = false;
      }

      // Hover Raycasting for dynamic highlights
      if (!isMouseDown) {
        sceneState.current.raycaster.setFromCamera(sceneState.current.mouse, camera);
        const intersects = sceneState.current.raycaster.intersectObjects(
          nodeMeshes.map(g => g.children[0])
        );

        if (intersects.length > 0) {
          const hoveredObj = intersects[0].object.parent.userData.node;
          setHoveredNode(hoveredObj);
        } else {
          setHoveredNode(null);
        }
      }

      // Compute 2D Screen Position of Focused Node for HUD Reticle (matching Image 2)
      const targetNodeForReticle = selectedNode || hoveredNode;
      if (targetNodeForReticle) {
        const targetGroup = nodeMap.get(targetNodeForReticle.id)?.group;
        if (targetGroup) {
          const v = targetGroup.position.clone();
          v.project(camera);
          const isBehind = v.z > 1;
          if (!isBehind) {
            const x = (v.x * 0.5 + 0.5) * container.clientWidth;
            const y = (-(v.y * 0.5) + 0.5) * container.clientHeight;
            setReticlePos({ x, y, label: targetNodeForReticle.label, cluster: targetNodeForReticle.cluster });
          } else {
            setReticlePos(null);
          }
        }
      } else {
        setReticlePos(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(sceneState.current.animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('contextmenu', onContextMenu);
      container.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [calculatedPositions, isAutoRotating, showPulseEnergy, selectedNode, hoveredNode]);

  // Update Node/Edge Opacity & Highlighting based on Selection or Cluster Filter
  useEffect(() => {
    const { nodeDataMap, lineSegments } = sceneState.current;
    if (!nodeDataMap || nodeDataMap.size === 0) return;

    const activeNode = selectedNode || hoveredNode;
    const connectedNodeIds = new Set();

    if (activeNode) {
      connectedNodeIds.add(activeNode.id);
      RAW_LINKS.forEach(l => {
        if (l.source === activeNode.id) connectedNodeIds.add(l.target);
        if (l.target === activeNode.id) connectedNodeIds.add(l.source);
      });
    }

    nodeDataMap.forEach(({ node, group, haloSprite, label }) => {
      const matchesFilter = activeClusterFilter === 'ALL' || node.cluster === activeClusterFilter;
      const isConnected = !activeNode || connectedNodeIds.has(node.id);
      const isSelf = activeNode && activeNode.id === node.id;

      if (!matchesFilter) {
        group.visible = false;
      } else {
        group.visible = true;
        if (activeNode) {
          if (isSelf) {
            haloSprite.scale.set(24, 24, 1);
            haloSprite.material.opacity = 1.0;
            label.material.opacity = 1.0;
          } else if (isConnected) {
            haloSprite.scale.set(node.type === 'hub' ? 18 : 11, node.type === 'hub' ? 18 : 11, 1);
            haloSprite.material.opacity = 0.85;
            label.material.opacity = 0.9;
          } else {
            haloSprite.material.opacity = 0.12;
            label.material.opacity = 0.15;
          }
        } else {
          haloSprite.scale.set(node.type === 'hub' ? 18 : 10, node.type === 'hub' ? 18 : 10, 1);
          haloSprite.material.opacity = node.type === 'hub' ? 0.85 : 0.55;
          label.material.opacity = node.type === 'hub' ? 0.95 : 0.75;
        }
      }
    });

    if (lineSegments) {
      lineSegments.material.opacity = activeNode ? 0.65 : 0.35;
    }
  }, [selectedNode, hoveredNode, activeClusterFilter]);

  // Fly Camera to Node when selected via Search
  const handleFlyToNode = useCallback((node) => {
    setSelectedNode(node);
    const nodeObj = sceneState.current.nodeDataMap.get(node.id);
    if (nodeObj && sceneState.current.camera) {
      const pos = nodeObj.group.position;
      sceneState.current.currentLookAt = pos.clone();
    }
  }, []);

  // Filtered search results for autocomplete
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return RAW_NODES.filter(n =>
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [searchQuery]);

  // Connected neighbors of selected node
  const activeNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    const neighborMap = [];
    RAW_LINKS.forEach(l => {
      if (l.source === selectedNode.id) {
        const target = RAW_NODES.find(n => n.id === l.target);
        if (target) neighborMap.push({ node: target, dir: 'outbound', val: l.value });
      } else if (l.target === selectedNode.id) {
        const source = RAW_NODES.find(n => n.id === l.source);
        if (source) neighborMap.push({ node: source, dir: 'inbound', val: l.value });
      }
    });
    return neighborMap;
  }, [selectedNode]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (sceneState.current.camera) {
      sceneState.current.sphericalCoords = { radius: 240, theta: Math.PI / 4, phi: Math.PI / 3 };
      sceneState.current.targetLookAt.set(0, 0, 0);
      sceneState.current.camera.position.set(0, 60, 260);
      sceneState.current.camera.lookAt(0, 0, 0);
      setSelectedNode(null);
    }
  };

  return (
    <div className={`kg-container ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* 1. TOP HEADER & HUD BAR */}
      <div className="kg-header">
        <div className="kg-title-wrap">
          <div className="kg-badge">
            <Sparkles size={13} className="text-amber-400" />
            <span>3D KNOWLEDGE SPHERE</span>
          </div>
          <h2>Enterprise Neural Graph</h2>
          <span className="kg-sub">Constellation of cross-platform context relationships and semantic pathways</span>
        </div>

        {/* Global HUD Metrics */}
        <div className="kg-stats-pill">
          <div className="stat-unit">
            <span className="label">ENTITIES</span>
            <span className="val text-blue-400">{stats.nodes}</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-unit">
            <span className="label">SYNAPSES</span>
            <span className="val text-emerald-400">{stats.links}</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-unit">
            <span className="label">ENTROPY</span>
            <span className="val text-purple-400">{stats.entropy}</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-unit">
            <span className="label">LATENCY</span>
            <span className="val text-amber-400">{stats.liveLatency}</span>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS STRIP (SEARCH, FILTERS & VIEW PRESETS) */}
      <div className="kg-control-bar">
        {/* Search Input with Floating Autocomplete */}
        <div className="kg-search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Find entity (e.g. DNN, DBPR, Confluence, Vector Hub)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              <X size={13} />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="kg-search-results">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="search-item"
                  onClick={() => {
                    handleFlyToNode(item);
                    setSearchQuery('');
                  }}
                >
                  <div className="item-color" style={{ background: CLUSTERS[item.cluster]?.color }} />
                  <div className="item-info">
                    <div className="item-label">{item.label}</div>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                  <span className="item-cluster">{item.cluster}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cluster Filter Tabs */}
        <div className="kg-filter-chips">
          <button
            className={`filter-chip ${activeClusterFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveClusterFilter('ALL')}
          >
            All Clusters
          </button>
          {Object.values(CLUSTERS).map((cl) => (
            <button
              key={cl.id}
              className={`filter-chip ${activeClusterFilter === cl.id ? 'active' : ''}`}
              style={{ '--chip-color': cl.color }}
              onClick={() => setActiveClusterFilter(cl.id)}
            >
              <span className="chip-dot" style={{ background: cl.color }} />
              {cl.name}
            </button>
          ))}
        </div>

        {/* Layout Presets */}
        <div className="kg-preset-group">
          <span className="preset-label">Layout:</span>
          {['CONSTELLATION', 'SPHERICAL', 'NEURAL', 'GALAXY'].map((p) => (
            <button
              key={p}
              className={`preset-btn ${viewPreset === p ? 'active' : ''}`}
              onClick={() => setViewPreset(p)}
            >
              {p.charAt(0) + p.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN 3D WEBGL VIEWPORT & HUD OVERLAYS */}
      <div className="kg-viewport-wrap">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="kg-canvas-layer" />

        {/* 3D Targeting Reticle HUD (matching Reference Image 2) */}
        {reticlePos && (
          <div
            className="kg-targeting-reticle"
            style={{
              left: `${reticlePos.x}px`,
              top: `${reticlePos.y}px`
            }}
          >
            <div className="reticle-outer-ring" />
            <div className="reticle-radar-spin" />
            <div className="reticle-crosshair" />
            <div className="reticle-label">
              <span className="tag">TARGET LOCKED</span>
              <span className="name">{reticlePos.label}</span>
            </div>
          </div>
        )}

        {/* Floating Quick Action Dock */}
        <div className="kg-action-dock">
          <button
            className={`dock-btn ${isAutoRotating ? 'active' : ''}`}
            title={isAutoRotating ? 'Pause Auto-Rotate' : 'Start Auto-Rotate'}
            onClick={() => setIsAutoRotating(!isAutoRotating)}
          >
            {isAutoRotating ? <Pause size={15} /> : <Play size={15} />}
            <span>Auto Orbit</span>
          </button>

          <button
            className={`dock-btn ${showPulseEnergy ? 'active' : ''}`}
            title="Toggle Synapse Pulse"
            onClick={() => setShowPulseEnergy(!showPulseEnergy)}
          >
            <Zap size={15} className={showPulseEnergy ? 'text-amber-400' : ''} />
            <span>Synapse Pulses</span>
          </button>

          <button className="dock-btn" title="Reset Camera" onClick={handleResetCamera}>
            <RotateCw size={15} />
            <span>Reset View</span>
          </button>

          <button
            className="dock-btn"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>

        {/* Interaction Guide Helper Pill */}
        <div className="kg-helper-pill">
          <span>Left-Drag: 360° Rotate</span>
          <span className="bullet">·</span>
          <span>Right-Drag: Pan</span>
          <span className="bullet">·</span>
          <span>Scroll: Zoom</span>
          <span className="bullet">·</span>
          <span>Click Node: Focus &amp; Target</span>
        </div>

        {/* 4. SLIDE-OUT NODE DETAILS INSPECTOR */}
        {selectedNode && (
          <div className="kg-inspector-card">
            <div className="inspector-head">
              <div className="node-badge" style={{ background: `${CLUSTERS[selectedNode.cluster]?.color}22`, color: CLUSTERS[selectedNode.cluster]?.color, borderColor: CLUSTERS[selectedNode.cluster]?.color }}>
                {selectedNode.type.toUpperCase()}
              </div>
              <button className="close-btn" onClick={() => setSelectedNode(null)}>
                <X size={14} />
              </button>
            </div>

            <div className="inspector-body">
              <h3 className="node-name">{selectedNode.label}</h3>
              <p className="node-desc">{selectedNode.desc}</p>

              {/* Metrics Grid */}
              <div className="node-metrics-grid">
                <div className="metric-box">
                  <span className="label">CONFIDENCE</span>
                  <span className="val text-emerald-400">{selectedNode.confidence}%</span>
                </div>
                <div className="metric-box">
                  <span className="label">CLUSTER</span>
                  <span className="val" style={{ color: CLUSTERS[selectedNode.cluster]?.color }}>{CLUSTERS[selectedNode.cluster]?.name}</span>
                </div>
                <div className="metric-box full">
                  <span className="label">ACTIVE VOLUME / SPECS</span>
                  <span className="val">{selectedNode.records}</span>
                </div>
              </div>

              {/* Connected Relationships List */}
              <div className="inspector-section">
                <div className="section-title">
                  <span>Connected Synapses ({activeNeighbors.length})</span>
                </div>
                <div className="neighbor-list">
                  {activeNeighbors.map((nb, idx) => (
                    <div
                      key={idx}
                      className="neighbor-chip"
                      onClick={() => handleFlyToNode(nb.node)}
                    >
                      <div className="dot" style={{ background: CLUSTERS[nb.node.cluster]?.color }} />
                      <span className="chip-name">{nb.node.label}</span>
                      <span className="chip-dir">{nb.dir === 'outbound' ? '→' : '←'}</span>
                      <span className="chip-score">{nb.val.toFixed(1)}x</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="inspector-actions">
                <button
                  className="btn-primary"
                  onClick={() => {
                    alert(`Initiated deep context scan on entity: ${selectedNode.label}`);
                  }}
                >
                  <Activity size={13} />
                  <span>Deep Semantic Query</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
