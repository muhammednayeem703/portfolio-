import { useEffect, useState } from 'react';
import {
  LogIn,
  LogOut,
  Mail,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw,
  Eye,
  X,
  Send,
} from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  read: number;
  replied: number;
}

export default function Admin() {
  const [credentials, setCredentials] = useState(() => {
    return localStorage.getItem('adminCredentials') || '';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Contact[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<Contact | null>(null);

  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    const encoded = btoa(`${username}:${password}`);

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid username or password.');
      }

      localStorage.setItem('adminCredentials', encoded);
      setCredentials(encoded);

      const data = await response.json();
      setStats(data.data);

      await loadMessages(encoded);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (auth = credentials) => {
    try {
      setMessageLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/messages`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load messages');
      }

      setMessages(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load messages.'
      );
    } finally {
      setMessageLoading(false);
    }
  };

  const loadStats = async (auth = credentials) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setStats(data.data);
      }
    } catch {
      setError('Failed to load statistics.');
    }
  };

  const openMessage = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/messages/${id}`,
        {
          headers: authHeaders,
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSelectedMessage(data.data);

      await loadMessages();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to open message.'
      );
    }
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/messages/${id}`,
        {
          method: 'DELETE',
          headers: authHeaders,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setSelectedMessage(null);

      await loadMessages();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete message.'
      );
    }
  };

  const sendReply = async () => {
    if (!selectedMessage || !reply.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}/api/admin/messages/${selectedMessage._id}/reply`,
        {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            reply,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reply.');
      }

      setSelectedMessage(data.data);
      setReply('');

      await loadMessages();
      await loadStats();

      alert(data.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send reply.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminCredentials');
    setCredentials('');
    setStats(null);
    setMessages([]);
    setSelectedMessage(null);
  };

  useEffect(() => {
    if (!credentials) return;

    loadStats();
    loadMessages();
  }, [credentials]);

  // LOGIN SCREEN
  if (!credentials) {
    return (
      <div className="min-h-screen bg-white dark:bg-mono-950 flex items-center justify-center px-6">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 flex items-center justify-center mb-5">
              <LogIn size={28} />
            </div>

            <h1 className="text-3xl font-bold text-mono-900 dark:text-mono-50">
              Admin Login
            </h1>

            <p className="text-sm text-mono-500 dark:text-mono-400 mt-2">
              Portfolio Management Dashboard
            </p>
          </div>

          <form
            onSubmit={login}
            className="p-8 rounded-2xl bg-mono-50 dark:bg-mono-900 border border-mono-200 dark:border-mono-800"
          >
            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mono-500 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 outline-none focus:ring-2 focus:ring-mono-400"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-mono-500 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-mono-950 border border-mono-200 dark:border-mono-800 outline-none focus:ring-2 focus:ring-mono-400"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 font-semibold disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-xs text-mono-400 mt-5">
            <a href="/" className="hover:underline">
              ← Back to portfolio
            </a>
          </p>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-white dark:bg-mono-950 text-mono-900 dark:text-mono-50">

      {/* Header */}
      <header className="border-b border-mono-200 dark:border-mono-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Nayeem Admin Dashboard
            </h1>
            <p className="text-xs text-mono-500 mt-1">
              Portfolio messages and database management
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                loadStats();
                loadMessages();
              }}
              className="p-3 rounded-xl border border-mono-200 dark:border-mono-800 hover:bg-mono-100 dark:hover:bg-mono-900"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 text-sm font-semibold"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <StatCard
            title="Total Messages"
            value={stats?.total ?? 0}
            icon={<MessageSquare size={20} />}
          />

          <StatCard
            title="New"
            value={stats?.new ?? 0}
            icon={<Clock size={20} />}
          />

          <StatCard
            title="Read"
            value={stats?.read ?? 0}
            icon={<Eye size={20} />}
          />

          <StatCard
            title="Replied"
            value={stats?.replied ?? 0}
            icon={<CheckCircle size={20} />}
          />

        </div>

        {/* Messages */}
        <div className="rounded-2xl border border-mono-200 dark:border-mono-800 overflow-hidden">

          <div className="px-6 py-5 border-b border-mono-200 dark:border-mono-800 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Contact Messages
              </h2>
              <p className="text-xs text-mono-500 mt-1">
                Messages submitted through your portfolio
              </p>
            </div>

            <Mail size={20} className="text-mono-400" />
          </div>

          {messageLoading ? (
            <div className="p-12 text-center text-mono-500">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center text-mono-500">
              No messages found.
            </div>
          ) : (
            <div className="divide-y divide-mono-200 dark:divide-mono-800">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="p-5 hover:bg-mono-50 dark:hover:bg-mono-900 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <button
                      onClick={() => openMessage(message._id)}
                      className="text-left flex-1"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">
                          {message.name}
                        </h3>

                        <StatusBadge status={message.status} />
                      </div>

                      <p className="text-sm text-mono-500">
                        {message.email}
                      </p>

                      <p className="text-sm text-mono-500 mt-2 line-clamp-1">
                        {message.message}
                      </p>

                      <p className="text-xs text-mono-400 mt-2">
                        {new Date(
                          message.createdAt
                        ).toLocaleString()}
                      </p>
                    </button>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openMessage(message._id)
                        }
                        className="p-2 rounded-lg border border-mono-200 dark:border-mono-800 hover:bg-mono-100 dark:hover:bg-mono-800"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          deleteMessage(message._id)
                        }
                        className="p-2 rounded-lg border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Message modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-mono-950 rounded-2xl border border-mono-200 dark:border-mono-800">

            <div className="p-6 border-b border-mono-200 dark:border-mono-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedMessage.name}
                </h2>

                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-sm text-mono-500 hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>

              <button
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="p-2 rounded-lg hover:bg-mono-100 dark:hover:bg-mono-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">

              <div className="flex items-center gap-3 mb-5">
                <StatusBadge
                  status={selectedMessage.status}
                />

                <span className="text-xs text-mono-400">
                  {new Date(
                    selectedMessage.createdAt
                  ).toLocaleString()}
                </span>
              </div>

              <div className="p-5 rounded-xl bg-mono-50 dark:bg-mono-900 mb-6">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-mono-500 mb-2">
                  Reply to {selectedMessage.name}
                </label>

                <textarea
                  value={reply}
                  onChange={(e) =>
                    setReply(e.target.value)
                  }
                  rows={5}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-mono-900 border border-mono-200 dark:border-mono-800 outline-none focus:ring-2 focus:ring-mono-400 resize-none"
                />

                <button
                  onClick={sendReply}
                  disabled={loading || !reply.trim()}
                  className="mt-3 flex items-center gap-2 px-5 py-3 rounded-xl bg-mono-900 dark:bg-mono-50 text-white dark:text-mono-900 text-sm font-semibold disabled:opacity-50"
                >
                  <Send size={16} />
                  {loading ? 'Sending...' : 'Send Reply'}
                </button>
              </div>

              <button
                onClick={() =>
                  deleteMessage(selectedMessage._id)
                }
                className="mt-6 flex items-center gap-2 text-sm text-red-500 hover:underline"
              >
                <Trash2 size={16} />
                Delete this message
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl border border-mono-200 dark:border-mono-800 bg-mono-50 dark:bg-mono-900">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-mono-500">
          {title}
        </p>

        <div className="text-mono-400">
          {icon}
        </div>
      </div>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Contact['status'];
}) {
  const styles = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
    read: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400',
    replied:
      'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}
