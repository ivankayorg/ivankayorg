import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Database,
  HeartHandshake,
  Mail,
  Menu,
  Repeat2,
  Sheet,
  Wrench,
  X,
} from "lucide-react";

import "./App.css";

/* ==========================================================
   IVANKAY.ORG
   Technology for Nonprofits
   ========================================================== */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(
  event: React.SubmitEvent<HTMLFormElement>,
) {
    event.preventDefault();

    setSending(true);
    setSent(false);
    setFormError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      source: "ivankay.org",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      form.reset();
      setSent(true);
    } catch {
      setFormError(
        "I couldn't send that message. Please try again in a moment."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="site">
      {/* ====================================================
          HEADER 001
          ==================================================== */}
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-name">Ivan Kay</span>
          <span className="brand-role">Founder of OneTime Labs</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? "site-nav open" : "site-nav"}>
          <a href="#help" onClick={closeMenu}>How I Can Help</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>How It Works</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let's Talk
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ==================================================
            HERO 002
            ================================================== */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Technology help for nonprofits · Founder, OneTime Labs</p>

              <h1>Technology shouldn't get in the way of your mission.</h1>

              <p className="hero-lead">
                I help nonprofits fix frustrating technology problems,
                simplify everyday work, and build tools that fit the way
                their organization actually works.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Tell me what's not working
                  <ArrowRight size={17} />
                </a>

                <a className="button button-secondary" href="#help">
                  See how I can help
                </a>
              </div>

              <p className="hero-note">
                You don't need to know what technology you need.
                Tell me what problem you're trying to solve.
              </p>
            </div>

            <div className="hero-panel">
              <p className="hero-panel-label">Sound familiar?</p>

              <div className="problem-list">
                <div><Check size={16} /><span>"We're entering the same information three times."</span></div>
                <div><Check size={16} /><span>"Nobody knows which spreadsheet is current."</span></div>
                <div><Check size={16} /><span>"Our software doesn't work the way we work."</span></div>
                <div><Check size={16} /><span>"We're paying too much for something we barely use."</span></div>
                <div><Check size={16} /><span>"We know this process could be easier."</span></div>
              </div>

              <div className="hero-panel-footer">
                That's where I come in.
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            HELP 003
            ================================================== */}
        <section className="section" id="help">
          <div className="section-heading">
            <p className="eyebrow">How I can help</p>
            <h2>Start with the problem, not the technology.</h2>
            <p>
              You shouldn't have to speak "IT" to get something fixed.
              Show me what's slowing your team down and we'll figure out
              a practical way to make it better.
            </p>
          </div>

          <div className="help-grid">
            <article className="help-card">
              <div className="help-icon"><Repeat2 size={21} /></div>
              <h3>We're doing too much by hand.</h3>
              <p>
                Repetitive emails, copying information, weekly reports,
                and other busywork can often be simplified or handled
                automatically.
              </p>
            </article>

            <article className="help-card">
              <div className="help-icon"><Sheet size={21} /></div>
              <h3>Our information is a mess.</h3>
              <p>
                I can help clean up duplicate records, inconsistent
                spreadsheets, contact lists, and information that's
                become difficult to trust.
              </p>
            </article>

            <article className="help-card">
              <div className="help-icon"><Wrench size={21} /></div>
              <h3>Our software doesn't fit.</h3>
              <p>
                Sometimes the answer isn't another expensive subscription.
                A small tool built around your actual process may be simpler
                and easier to use.
              </p>
            </article>

            <article className="help-card">
              <div className="help-icon"><Database size={21} /></div>
              <h3>Our systems don't work together.</h3>
              <p>
                If your staff spends time moving the same information
                between different programs, I can help make that process
                easier and more reliable.
              </p>
            </article>
          </div>
        </section>

        {/* ==================================================
            PHILOSOPHY 004
            ================================================== */}
        <section className="plain-language">
          <div className="plain-language-inner">
            <p className="eyebrow eyebrow-light">No technology lesson required</p>
            <blockquote>
              "Tell me what's driving your team crazy.
              Figuring out the technology is my job."
            </blockquote>
            <p>
              You know your organization. You know the work.
              You know where things are frustrating. That's enough to start.
            </p>
          </div>
        </section>

        {/* ==================================================
            ABOUT 005
            ================================================== */}
        <section className="section about-section" id="about">
          <div className="about-copy">
            <p className="eyebrow">About Ivan</p>
            <h2>
              Years of solving technology problems - without making people
              feel like they need a computer science degree.
            </h2>
            <p>
              I've spent my career working with technology in large
              organizations, where I've seen both what technology can
              accomplish and how unnecessarily complicated it can become.
            </p>
            <p>
              I want to bring that experience to nonprofits in a more
              practical way: understand the problem, find the simplest useful
              solution, and build something people can actually use.
            </p>
          </div>

          <aside className="about-card">
            <HeartHandshake size={27} />
            <h3>Professional work for nonprofit organizations.</h3>
            <p>
              This is paid technology work, with an understanding that
              nonprofit budgets and priorities are different from those
              of large corporations.
            </p>
            <p>
              We'll talk about scope and cost before work begins.
              No surprise enterprise-sized bill at the end.
            </p>
          </aside>
        </section>

        {/* ==================================================
            ONETIME LABS 006
            ================================================== */}
        <section className="section onetime-section">
          <div className="onetime-card">
            <div className="onetime-icon">
              <Building2 size={25} />
            </div>

            <div className="onetime-copy">
              <p className="eyebrow">Built by Ivan</p>
              <h2>Founder of OneTime Labs.</h2>
              <p>
                OneTime Labs is where I build practical software around a
                simple idea: technology should solve a problem without
                becoming another problem to manage.
              </p>
              <p>
                That same approach is what I bring to nonprofit work:
                understand what your organization actually needs, keep the
                solution practical, and don't sell you technology just
                because I can.
              </p>
            </div>

            <a
              className="button button-secondary onetime-link"
              href="https://onetimelabs.net"
              target="_blank"
              rel="noreferrer"
            >
              Visit OneTime Labs
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* ==================================================
            PROCESS 007
            ================================================== */}
        <section className="process-section" id="work">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>Keep it simple.</h2>
          </div>

          <div className="process-grid">
            <article>
              <span>01</span>
              <h3>Tell me the problem.</h3>
              <p>
                Show me the process, spreadsheet, software, or task that's
                causing headaches.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>We figure out what would help.</h3>
              <p>
                I'll explain the options in normal language and recommend
                the simplest approach that makes sense.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>I build or fix it.</h3>
              <p>
                You'll know what I'm doing, what it will cost, and what the
                finished result is supposed to accomplish.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Your team gets back to work.</h3>
              <p>
                The goal isn't more technology. The goal is less friction
                between your people and the work that matters.
              </p>
            </article>
          </div>
        </section>

        {/* ==================================================
            CONTACT 008
            ================================================== */}
        <section className="contact-section" id="contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light">Let's talk</p>
              <h2>What's getting in your way?</h2>
              <p>
                You don't need a project plan or technical terminology.
                Tell me what's frustrating your team and we'll start there.
              </p>

              <div className="contact-routing">
                <Mail size={18} />
                <span>
                  Messages from this form are sent to the OneTime Labs
                  inquiry desk.
                </span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  <span>Organization</span>
                  <input
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                <span>What's getting in your way?</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell me what's frustrating your team, what you're doing by hand, or what you wish worked better."
                />
              </label>

              {formError && (
                <p className="contact-form-error" role="alert">
                  {formError}
                </p>
              )}

              {sent && (
                <p className="contact-form-success" role="status">
                  Message sent. I'll get back to you as soon as I can.
                </p>
              )}

              <button
                className="button button-contact"
                type="submit"
                disabled={sending}
              >
                <Mail size={18} />
                {sending ? "Sending..." : "Send message"}
              </button>

              <p className="contact-form-note">
                Your message will be delivered to inquiry@onetimelabs.net.
              </p>
            </form>
          </div>
        </section>

      </main>

      {/* ====================================================
          FOOTER 008
          ==================================================== */}
      <footer className="site-footer">
        <div>
          <strong>Ivan Kay</strong>
          <span>Technology for Nonprofits · Founder, OneTime Labs</span>
        </div>

        <p>
          Practical technology help for organizations doing work that matters.
        </p>

        <span>© {new Date().getFullYear()} Ivan Kay</span>
      </footer>
    </div>
  );
}

export default App;