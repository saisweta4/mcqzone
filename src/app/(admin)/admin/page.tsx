"use client";

import { 
  Shield, Globe, ExternalLink, Save, UserPlus, Edit2, Trash2, 
  History, UploadCloud, ImageIcon, Smartphone, CheckCircle2, ShieldCheck
} from "lucide-react";

const adminUsers = [
  { name: "Priyanka Mohanty", email: "p.mohanty@prep.gov.in", role: "Admin", status: "Active", activity: "2 hours ago", img: "https://ui-avatars.com/api/?name=Priyanka+Mohanty" },
  { name: "Sanjay Biswal", email: "s.biswal@prep.gov.in", role: "Moderator", status: "Active", activity: "Yesterday", img: "https://ui-avatars.com/api/?name=Sanjay+Biswal" },
  { name: "Deepak Raut", email: "d.raut@prep.gov.in", role: "Admin", status: "Inactive", activity: "5 days ago", img: "https://ui-avatars.com/api/?name=Deepak+Raut" },
  { name: "Meera Jena", email: "m.jena@prep.gov.in", role: "Admin", status: "Active", activity: "15 mins ago", img: "https://ui-avatars.com/api/?name=Meera+Jena" },
  { name: "Rashmi Samal", email: "r.samal@prep.gov.in", role: "Moderator", status: "Active", activity: "3 hours ago", img: "https://ui-avatars.com/api/?name=Rashmi+Samal" },
];

export default function SettingsManagement() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-10">
      
      {/* Header Section */}
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Management</h1>
          <p className="text-sm text-gray-500 mt-1">Configure platform branding, security, and manage your administrative team.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-4 h-4" />
            View Live Site
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-blue-700 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Admin Team Management */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 text-primary rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Team Management</h2>
            <p className="text-xs text-gray-500">Control access levels and manage administrative accounts for the platform.</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          {/* Current User Card */}
          <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="https://ui-avatars.com/api/?name=Arun+Kumar+Dash&background=1e3a8a&color=fff" alt="User" className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">Arun Kumar Dash</h3>
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Super Admin</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> arun.dash@odisha.gov.in</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="flex items-center gap-1.5 text-gray-700 font-medium"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Two-Factor Enabled</p>
                    <p className="flex items-center gap-1.5 text-gray-400"><History className="w-3.5 h-3.5" /> Last login: Today at 08:47 AM</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Edit Profile
            </button>
          </div>

          {/* Admin List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-gray-700">Platform Administrators <span className="text-gray-400 font-normal ml-1">A total of 6 users have administrative access.</span></p>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                <UserPlus className="w-4 h-4" /> Add New Admin
              </button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50/50 border-b uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3">Administrator</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Activity</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-700">
                  {adminUsers.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-3 flex items-center gap-3">
                        <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-[11px] text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[11px] font-semibold border uppercase tracking-wide">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-xs">{user.activity}</td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-3 text-gray-400">
                          <button className="hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                          <button className="hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 py-2">
              View access audit logs <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Website & Platform Branding */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 text-primary rounded-lg">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Website & Platform Branding</h2>
            <p className="text-xs text-gray-500">Manage your platform's public identity, visual assets, and support channels.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form Fields Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">General Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Website Name</label>
                    <input type="text" defaultValue="Odisha Government Exam Portal" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Official Support Email</label>
                    <input type="email" defaultValue="support@odishaprep.gov.in" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Platform Tagline</label>
                  <input type="text" defaultValue="Empowering Odisha's Aspirants for a Brighter Future." className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Copyright Text</label>
                  <input type="text" defaultValue="© 2026 Odisha Government Exam Platform. All rights reserved." className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Support & Social Links</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Helpdesk URL</label>
                    <input type="url" defaultValue="https://help.odishaprep.gov.in" className="w-full px-3 py-2 border rounded-md text-sm text-primary outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Terms of Service URL</label>
                    <input type="url" defaultValue="https://prep.gov.in/terms" className="w-full px-3 py-2 border rounded-md text-sm text-primary outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Headquarters Address</label>
                  <textarea rows={2} defaultValue="Secretariat Building, Bhubaneswar, Odisha 751001" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Branding/Uploads Column */}
          <div className="bg-white border rounded-lg p-6 shadow-sm h-fit">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Brand Identity</h3>
            <p className="text-[11px] text-gray-500 mb-6 leading-relaxed">Primary logo and favicon used across the platform.</p>
            
            <div className="space-y-6">
              {/* Main Logo Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Main Logo</label>
                <div className="flex gap-4">
                  <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 text-center h-36">
                    <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs font-medium text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-gray-400 mt-1">PNG or SVG, Max 2MB. Recommended: 500x150px</p>
                  </div>
                  <div className="w-20 h-20 border rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>

              {/* Mobile App Splash */}
              <div className="pt-6 border-t">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Mobile App Splash</label>
                <div className="flex gap-4">
                  <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 text-center h-48">
                    <Smartphone className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs font-medium text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-gray-400 mt-1">Format: aspect ratio 16:9. Max 5MB, JPG.</p>
                  </div>
                  <div className="w-20 h-32 border rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center shadow-sm shrink-0 overflow-hidden relative">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-2">
                       <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}