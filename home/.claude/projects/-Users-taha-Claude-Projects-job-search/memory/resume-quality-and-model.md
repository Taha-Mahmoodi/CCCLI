---
name: resume-quality-and-model
description: How to generate good tailored resumes — the elite prompt + which DeepSeek model is reliable in n8n
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4d667e24-5770-4862-b946-1a05b9fb92f5
---

Said requires the tailored resumes to be complete and professionally formatted — NOT short/"toddler" output. They MUST keep his full real background: Intel semiconductor experience, ALL four languages (English fluent, Persian/Dari native, Turkish B2, Pashto B1), every degree, and awards (TEKNOFEST Gold Medal, Afghanistan National Chess Champion). Tailor by reordering/emphasizing + keyword-mirroring, never by deleting experience.

**Why:** Earlier prompt produced sparse resumes missing Intel and languages. The fix was the PROMPT, not the model.

**How to apply:** Use the "elite executive resume writer" prompt (6 numbered rules; header + PROFESSIONAL SUMMARY, CORE SKILLS, EXPERIENCE, EDUCATION, LANGUAGES, RECOGNITION; 500-600 words plain text). It now lives in the engine `gci2bjyAWlDeGonJ` "Tailor Resume" node and the regen workflow `jf9ZNK8PtWDugd7u`.

**Model reliability (UPDATED 2026-06-11):** `deepseek-reasoner` IS usable in n8n — but NOT via the chainLlm/LangChain node (long connections get `read ECONNRESET` and one failure kills the whole node). Use the **HTTP Request node** instead: POST https://api.deepseek.com/chat/completions, Authorization header, retryOnFail maxTries 3, onError continueRegularOutput, timeout 240000. Reasoner supports response_format json_object; ~38s/call; n8n fires items concurrently (83 calls completed in ~70s). ~5% of reasoner responses are malformed JSON → the workflow needs a parse-failure retry loop (IF ok → Merge; failed → rebuild body → second HTTP call → re-parse → Merge append).

**Design architecture (v2, final):** model writes CONTENT ONLY as strict JSON (schema: name/contact/summary/skills/experience/education/languages/recognition); a deterministic pure-JS renderer in a Code node builds a styled .docx (own zip+OOXML writer, local file `docxRenderer.js` in the project dir, adversarially tested). NATIVE Google Doc trick (user requires native, not .docx): googleDocs node creates an empty native Doc, then googleDrive node `file:update` with `changeFileContent: true` pushes the docx bytes into it — Drive CONVERTS to native Docs format in place, full styling preserved. (Direct upload with metadata mimeType=google-doc fails with 400; n8n MCP cannot attach Google creds to raw HTTP nodes, so Docs batchUpdate styling is unreachable; googleDocs node inserts plain text only.) Workflow: "Regenerate Resumes v2" `dbR4ksaxs5uUHqCM`. Per-resume page breaks, contents page, one file for all resumes — links written to Jobs sheet. 83/83 success with the retry loop (2026-06-11).

**Content rules that matter:** Intel + AI experience mandatory in every resume; other roles ordered by job relevance (3-4 bullets top, 1-2 low); STRICT no-invented-numbers rule WITH explicit forbidden examples (reasoner fabricated "80% effort reduction" twice until negative examples were added).
