"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  LogOut,
  Trash2,
  Download,
  CheckCircle,
  Clock,
  MessageSquare,
  AlertCircle,
  FileText,
  Mail,
  User,
  Plus
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch session and leads data
  useEffect(() => {
    const initDashboard = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (!sessionData.authenticated) {
          router.push("/admin/login");
          return;
        }

        setAdminUser(sessionData.user);

        const leadsRes = await fetch("/api/leads");
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData.leads || []);
        } else {
          setError("Failed to fetch leads records.");
        }
      } catch (err) {
        setError("Error loading system metrics.");
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads(prev =>
          prev.map(lead => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;

    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ["Date", "Name", "Email", "Company", "Project Type", "Budget", "Status", "Message"];
    const rows = leads.map(l => [
      new Date(l.createdAt).toLocaleDateString(),
      l.name,
      l.email,
      l.company,
      l.projectType,
      l.budget,
      l.status,
      l.message.replace(/"/g, '""'), // escape quotes
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aetheric_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const contactedLeads = leads.filter(l => l.status === "contacted").length;
  const activeProjects = leads.filter(l => l.status === "in_progress").length;

  const calculatePipelineValue = () => {
    return leads.reduce((acc, lead) => {
      // Crude parsing of budget ranges: e.g. "$50,000 - $100,000" or "$100,000+"
      const text = lead.budget.replace(/[^0-9]/g, "");
      let val = 0;
      if (lead.budget.includes("100,000+")) val = 100000;
      else if (text.length >= 10) val = parseInt(text.slice(0, 5)) || 50000; // middle approximation
      else val = parseInt(text) || 10000;

      // Only count active, contacted, or new leads in pipeline value
      if (lead.status !== "closed") return acc + val;
      return acc;
    }, 0);
  };

  const filteredLeads = statusFilter === "all" ? leads : leads.filter(l => l.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#05060A]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">Loading Console...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#05060A] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Management Center</span>
            </h1>
            <p className="font-sans text-sm text-gray-400 mt-2">
              Welcome back, <span className="text-cyan-400 font-semibold">{adminUser?.name}</span>. Review incoming pipelines.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/25 px-5 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-300 hover:text-red-400 hover:scale-[1.01]"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>

        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 flex items-center space-x-6 border-white/10 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Total Inbound</span>
              <h3 className="text-3xl font-display font-extrabold mt-1">{totalLeads}</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 flex items-center space-x-6 border-white/10 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center text-yellow-400">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Awaiting Contact</span>
              <h3 className="text-3xl font-display font-extrabold mt-1">{newLeads}</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 flex items-center space-x-6 border-white/10 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">In Development</span>
              <h3 className="text-3xl font-display font-extrabold mt-1">{activeProjects}</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 flex items-center space-x-6 border-white/10 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Est. Pipeline Value</span>
              <h3 className="text-3xl font-display font-extrabold mt-1">
                ${calculatePipelineValue().toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Lead Management Block */}
        <div className="glass-panel border-white/10 shadow-xl overflow-hidden">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 gap-4 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h2 className="font-display text-xl font-bold">Client Leads Pipeline</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0b0d19] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-sans outline-none focus:border-cyan-500 text-gray-300"
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed / Won</option>
              </select>

              {/* Export */}
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-sans font-medium transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-[#0b0d19]/40">
                  <th className="py-4 px-6">Received</th>
                  <th className="py-4 px-6">Client Info</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6">Scope Briefing</th>
                  <th className="py-4 px-6">Pipeline Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 font-sans text-sm">
                      No matching lead records found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                      {/* Date */}
                      <td className="py-5 px-6 font-mono text-xs text-gray-400 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      {/* Client info */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col space-y-1">
                          <span className="font-display font-semibold text-sm flex items-center space-x-1.5 text-white">
                            <User className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{lead.name}</span>
                          </span>
                          <span className="font-sans text-xs text-gray-400 flex items-center space-x-1.5">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </span>
                          <span className="font-sans text-[10px] font-bold text-cyan-400 uppercase">
                            {lead.company}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-5 px-6 font-sans text-sm font-medium text-gray-300">
                        {lead.projectType}
                      </td>

                      {/* Budget */}
                      <td className="py-5 px-6 font-sans text-sm font-semibold text-cyan-400 whitespace-nowrap">
                        {lead.budget}
                      </td>

                      {/* Message scope */}
                      <td className="py-5 px-6 max-w-xs md:max-w-md lg:max-w-lg">
                        <p className="font-sans text-xs text-gray-400 leading-relaxed truncate hover:text-white hover:whitespace-normal cursor-pointer transition-all duration-300">
                          {lead.message}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`bg-[#0b0d19] border rounded-lg px-2.5 py-1 text-xs font-semibold font-sans outline-none cursor-pointer transition-all ${
                            lead.status === "new"
                              ? "border-yellow-500/30 text-yellow-400"
                              : lead.status === "contacted"
                              ? "border-blue-500/30 text-blue-400"
                              : lead.status === "in_progress"
                              ? "border-cyan-500/30 text-cyan-400"
                              : "border-green-500/30 text-green-400"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="closed">Closed / Won</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/25 hover:bg-red-500/10 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all duration-300 mx-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Admin Section: Content items preview list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 border-white/10">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <span>Registered Portfolio</span>
            </h3>
            <p className="text-sm text-gray-400 font-sans mb-6">
              Manage visible case studies. Populate new files via database migrations or seed scripts.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <span>Project BioGlow: AI Drug Discovery</span>
                <span className="text-purple-400 font-bold uppercase">AI/ML</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <span>NovaFlow: Logistical Dispatch</span>
                <span className="text-purple-400 font-bold uppercase">AI Auto</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <span>StellarSaaS: Workspace Analytics</span>
                <span className="text-purple-400 font-bold uppercase">Full-Stack</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 border-white/10">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Customer Testimonials</span>
            </h3>
            <p className="text-sm text-gray-400 font-sans mb-6">
              Seeded quotes showing on the public slides widget.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 flex flex-col space-y-1">
                <span className="font-semibold text-white">Sarah Jenkins (Vortex FinTech)</span>
                <span className="text-gray-500 italic">&quot;Boosted execution efficiency by 32%.&quot;</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 flex flex-col space-y-1">
                <span className="font-semibold text-white">David Chen (BioCompute Labs)</span>
                <span className="text-gray-500 italic">&quot;Spectacular. Fluid glassmorphic visuals...&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
