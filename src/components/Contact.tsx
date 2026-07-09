import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, CheckCircle, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Primary attempt using configured API URL
      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
      };

      const doPost = async (url: string) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'cors',
        });
        return res;
      };

      // Try configured API first, then fallback to same-origin path
      let response = null;
      const primary = `${API_URL.replace(/\/$/, '')}/api/contact/submit`;
      try {
        response = await doPost(primary);
      } catch (errPrimary) {
        console.warn('Primary contact post failed:', errPrimary);
      }

      if (!response || !response.ok) {
        // fallback: try same-origin relative path (useful when front-end and backend are proxied together)
        try {
          response = await doPost('/api/contact/submit');
        } catch (errFallback) {
          console.error('Fallback contact post failed:', errFallback);
          throw errFallback;
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Failed to send message (status ${response.status})`);
      }

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-mono-50 dark:bg-mono-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 contact-grid-bg" />
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-mono-200/30 to-transparent dark:from-mono-800/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-mono-400 dark:text-mono-500 mb-3">
            Contact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-mono-900 dark:text-mono-50 mb-4">
            Get in touch
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-mono-500 dark:text-mono-400 mb-12 max-w-lg"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something exciting.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Email */}
            <motion.a
              href="mailto:muhammednayeem703@gmail.com"
              whileHover={{ x: 5 }}
              className="group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 hover:border-mono-400 dark:hover:border-mono-600 transition-all duration-300 hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
              >
                <Mail size={20} className="text-mono-600 dark:text-mono-400" />
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-mono-400 dark:text-mono-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-mono-700 dark:text-mono-300 group-hover:text-mono-900 dark:group-hover:text-mono-50 transition-colors">
                  muhammednayeem703@gmail.com
                </p>
              </div>
              <ArrowRight size={16} className="text-mono-300 dark:text-mono-600 group-hover:text-mono-500 dark:group-hover:text-mono-400 group-hover:translate-x-1 transition-all" />
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+919844858429"
              whileHover={{ x: 5 }}
              className="group flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 hover:border-mono-400 dark:hover:border-mono-600 transition-all duration-300 hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-mono-200 to-mono-300 dark:from-mono-800 dark:to-mono-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
              >
                <Phone size={20} className="text-mono-600 dark:text-mono-400" />
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-mono-400 dark:text-mono-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-mono-700 dark:text-mono-300 group-hover:text-mono-900 dark:group-hover:text-mono-50 transition-colors">
                  +91 98448 58429
                </p>
              </div>
              <ArrowRight size={16} className="text-mono-300 dark:text-mono-600 group-hover:text-mono-500 dark:group-hover:text-mono-400 group-hover:translate-x-1 transition-all" />
            </motion.a>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 text-mono-400 dark:text-mono-500 px-5"
            >
              <MapPin size={16} />
              <span className="text-sm">Bengaluru, India</span>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </motion.div>
              )}

              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-xs font-semibold text-mono-500 dark:text-mono-400 mb-2 uppercase tracking-wider"
                  >
                    {field} {field !== 'phone' && <span className="text-red-500">*</span>}
                  </label>
                  <motion.div
                    className="relative"
                    animate={{ scale: focused === field ? 1.01 : 1 }}
                  >
                    <input
                      id={field}
                      type={field === 'email' ? 'email' : 'text'}
                      required={field !== 'phone'}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      disabled={loading}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 text-mono-900 dark:text-mono-100 text-sm focus:outline-none focus:ring-2 focus:ring-mono-400/50 dark:focus:ring-mono-600/50 focus:border-mono-400 dark:focus:border-mono-600 transition-all placeholder:text-mono-300 dark:placeholder:text-mono-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                    />
                    {focused === field && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-xl pointer-events-none input-focus-ring"
                      />
                    )}
                  </motion.div>
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-mono-500 dark:text-mono-400 mb-2 uppercase tracking-wider"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <motion.div
                  className="relative"
                  animate={{ scale: focused === 'message' ? 1.01 : 1 }}
                >
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    disabled={loading}
                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 text-mono-900 dark:text-mono-100 text-sm focus:outline-none focus:ring-2 focus:ring-mono-400/50 dark:focus:ring-mono-600/50 focus:border-mono-400 dark:focus:border-mono-600 transition-all resize-none placeholder:text-mono-300 dark:placeholder:text-mono-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your message..."
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={submitted || loading}
                whileHover={{ scale: submitted || loading ? 1 : 1.02 }}
                whileTap={{ scale: submitted || loading ? 1 : 0.98 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 text-sm font-semibold rounded-xl overflow-hidden disabled:opacity-60 transition-all"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-mono-800 to-mono-700 dark:from-mono-100 dark:to-mono-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="relative z-10"
                    >
                      <Send size={18} />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : submitted ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <CheckCircle size={18} />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Message Sent!
                    </motion.span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-0.5 transition-transform relative z-10" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
