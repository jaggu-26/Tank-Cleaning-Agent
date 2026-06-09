import React, { useState, useRef, useCallback } from 'react';
import './EmailModal.scss';

// ─── Recipient chip ───────────────────────────────────────────────────────────
const RecipientChip = ({ name, email, invalid, onRemove }) => (
  <span className={`gs-chip${invalid ? ' gs-chip--error' : ''}`}>
    {invalid
      ? <span className="gs-chip__warn" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#dc2625">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1" fill="white"/>
          </svg>
        </span>
      : <span className="gs-chip__avatar" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </span>
    }
    <span className="gs-chip__label">{name || email}</span>
    <button className="gs-chip__close" onClick={onRemove} type="button" aria-label={`Remove ${name || email}`}>×</button>
  </span>
);

// ─── Recipient field row ──────────────────────────────────────────────────────
const RecipientField = ({ label, recipients, onAdd, onRemove, inputRef, showError, ariaLabel }) => (
  <div className={`gs-email-field${showError ? ' gs-email-field--error' : ''}`}>
    <span className="gs-email-field__label">{label}</span>
    <div className="gs-email-chips">
      {recipients.map((r, i) => (
        <RecipientChip key={i} {...r} onRemove={() => onRemove(i)} />
      ))}
      <input
        ref={inputRef}
        type="text"
        className="gs-email-chip-input"
        placeholder=""
        aria-label={ariaLabel || `Add ${label} recipient`}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); onAdd(e.target.value); e.target.value = ''; }
          if (e.key === 'Backspace' && !e.target.value && recipients.length) onRemove(recipients.length - 1);
        }}
        onBlur={e => { if (e.target.value) { onAdd(e.target.value); e.target.value = ''; } }}
      />
    </div>
  </div>
);

// ─── Rich-text toolbar ────────────────────────────────────────────────────────
const TOOLBAR = [
  { cmd: 'bold',          icon: 'B',  title: 'Bold',          style: { fontWeight: 700 } },
  { cmd: 'italic',        icon: 'I',  title: 'Italic',        style: { fontStyle: 'italic' } },
  { cmd: 'underline',     icon: 'U',  title: 'Underline',     style: { textDecoration: 'underline' } },
  { cmd: 'strikeThrough', icon: 'S',  title: 'Strikethrough', style: { textDecoration: 'line-through' } },
  { sep: true },
  { cmd: 'createLink',    icon: '🔗', title: 'Link',          link: true },
  { cmd: 'insertOrderedList',   icon: '≡', title: 'Ordered list'   },
  { cmd: 'insertUnorderedList', icon: '≣', title: 'Unordered list' },
  { cmd: 'justifyLeft',   icon: '⇤', title: 'Align left'  },
  { cmd: 'formatBlock',   icon: '<>', title: 'Code block', arg: 'pre' },
  { sep: true },
];

const Toolbar = ({ onAttach }) => {
  const execCmd = useCallback((cmd, arg) => {
    if (cmd === 'createLink') {
      const url = prompt('Enter URL:', 'https://');
      if (url) document.execCommand('createLink', false, url);
    } else {
      document.execCommand(cmd, false, arg || null);
    }
  }, []);

  return (
    <div className="gs-email-toolbar" role="toolbar" aria-label="Text formatting">
      {TOOLBAR.map((t, i) =>
        t.sep
          ? <span key={i} className="gs-email-toolbar__sep" />
          : <button key={i} type="button" className="gs-email-toolbar__btn"
              title={t.title} onMouseDown={e => { e.preventDefault(); execCmd(t.cmd, t.arg); }}
              aria-label={t.title}>
              <span style={t.style}>{t.icon}</span>
            </button>
      )}
      <button type="button" className="gs-email-toolbar__btn" title="Attach file"
        onClick={onAttach} aria-label="Attach file">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
      </button>
    </div>
  );
};

// ─── Attachment chip ──────────────────────────────────────────────────────────
const AttachChip = ({ name, onRemove }) => (
  <span className="gs-attach-chip">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
    <span className="gs-attach-chip__name">{name}</span>
    <button type="button" onClick={onRemove} aria-label={`Remove ${name}`}>×</button>
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// EmailModal — Compose Email
//
// Props:
//   open             boolean
//   onClose          () => void
//   onSend           ({ to, cc, bcc, subject, body, attachments }) => void
//   initialTo        RecipientChip[] — pre-populated To
//   initialSubject   string
//
// Figma: 8240-5699 (recipient header) · 8240-5813 (full compose)
//        9638-3297 (toolbar) · 9638-3168 (input)
// ─────────────────────────────────────────────────────────────────────────────
export const EmailModal = ({ open, onClose, onSend, initialTo = [], initialSubject = '' }) => {
  const [to,      setTo]      = useState(initialTo);
  const [cc,      setCc]      = useState([]);
  const [bcc,     setBcc]     = useState([]);
  const [showCc,  setShowCc]  = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [subject, setSubject] = useState(initialSubject);
  const [attachments, setAttachments] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [error,   setError]   = useState('');

  const bodyRef    = useRef(null);
  const fileRef    = useRef(null);

  const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const makeRecipient = raw => {
    const email = raw.trim().replace(/,$/, '');
    return email ? { name: email, email, invalid: !isValidEmail(email) } : null;
  };

  const addTo  = v => { const r = makeRecipient(v); if (r) setTo(p => [...p, r]); };
  const addCc  = v => { const r = makeRecipient(v); if (r) setCc(p => [...p, r]); };
  const addBcc = v => { const r = makeRecipient(v); if (r) setBcc(p => [...p, r]); };

  const handleFiles = useCallback(files => {
    setAttachments(p => [...p, ...Array.from(files)]);
    setDragging(false);
  }, []);

  const handleSend = () => {
    const hasInvalid = [...to, ...cc, ...bcc].some(r => r.invalid);
    if (hasInvalid) { setError('Email cannot be sent. Please check the validation error and retry.'); return; }
    if (!to.length) { setError('Please add at least one recipient.'); return; }
    setError('');
    onSend?.({ to, cc, bcc, subject, body: bodyRef.current?.innerHTML, attachments });
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="gs-email-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="gs-email-modal" role="dialog" aria-modal="true" aria-label="Compose Email">
        {/* Header */}
        <div className="gs-email-modal__header">
          <span className="gs-email-modal__title">Compose Email</span>
          <button className="gs-email-modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Recipient section */}
        <div className="gs-email-recipients">
          <div className="gs-email-to-row">
            <RecipientField label="To" recipients={to} onAdd={addTo} onRemove={i => setTo(p => p.filter((_, j) => j !== i))}
              showError={to.some(r => r.invalid)} />
            <div className="gs-email-field-actions">
              {!showCc  && <button type="button" className="gs-email-toggle-btn" onClick={() => setShowCc(true)}>+ Cc</button>}
              {!showBcc && <button type="button" className="gs-email-toggle-btn" onClick={() => setShowBcc(true)}>+ Bcc</button>}
            </div>
          </div>
          {showCc && (
            <RecipientField label="cc" recipients={cc} onAdd={addCc} onRemove={i => setCc(p => p.filter((_, j) => j !== i))}
              showError={cc.some(r => r.invalid)} />
          )}
          {showBcc && (
            <RecipientField label="Bcc" recipients={bcc} onAdd={addBcc} onRemove={i => setBcc(p => p.filter((_, j) => j !== i))}
              showError={bcc.some(r => r.invalid)} />
          )}
          <div className="gs-email-subject">
            <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)}
              aria-label="Email subject" />
          </div>
        </div>

        {/* Toolbar */}
        <Toolbar onAttach={() => fileRef.current?.click()} />
        <input ref={fileRef} type="file" multiple className="gs-email-file-input"
          onChange={e => handleFiles(e.target.files)} />

        {/* Body / drag-drop */}
        <div className="gs-email-body-wrap"
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
          {dragging
            ? <div className="gs-email-drop">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Drop file(s) here…</span>
              </div>
            : <div ref={bodyRef} className="gs-email-body" contentEditable suppressContentEditableWarning
                data-placeholder="Write your message…" role="textbox" aria-multiline="true" aria-label="Email body" />
          }
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="gs-email-attachments">
            {attachments.map((f, i) => (
              <AttachChip key={i} name={f.name} onRemove={() => setAttachments(p => p.filter((_, j) => j !== i))} />
            ))}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="gs-email-error-banner" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1" fill="white"/>
            </svg>
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="gs-email-modal__footer">
          <button type="button" className="gs-email-btn gs-email-btn--cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="gs-email-btn gs-email-btn--send" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
