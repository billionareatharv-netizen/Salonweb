import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Users, DollarSign, Calendar, TrendingUp, Bell, Search, Settings, ArrowLeft } from 'lucide-react';
import { Booking, User } from '../types';

interface DashboardProps {
    bookings: Booking[];
    users: User[];
}

const data = [
  { name: 'Mon', revenue: 4000, visits: 24 },
  { name: 'Tue', revenue: 3000, visits: 18 },
  { name: 'Wed', revenue: 2000, visits: 12 },
  { name: 'Thu', revenue: 2780, visits: 20 },
  { name: 'Fri', revenue: 8890, visits: 45 },
  { name: 'Sat', revenue: 12390, visits: 60 },
  { name: 'Sun', revenue: 9490, visits: 50 },
];

const Dashboard: React.FC<DashboardProps> = ({ bookings, users }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Calculate stats based on real bookings + demo base data
  const baseRevenue = 42500;
  const newRevenue = bookings.reduce((acc, curr) => acc + curr.price, 0);
  const totalRevenue = baseRevenue + newRevenue;
  
  const baseAppointments = 148;
  const totalAppointments = baseAppointments + bookings.length;

  const baseUsers = 1240;
  const totalUsers = baseUsers + users.length;

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col md:flex-row text-gray-200 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-luxury-dark border-r border-white/5 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-2xl font-serif font-bold tracking-tighter text-white">Lumière<span className="text-gold-500">.</span></h1>
          <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Owner Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {['Overview', 'Bookings', 'Customers', 'Staff', 'Financials', 'Marketing'].map((item, i) => (
            <button 
                key={item} 
                onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center transition-colors ${activeTab === item ? 'bg-gold-500 text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="mr-3">
                {i === 0 ? <TrendingUp size={18}/> : <div className="w-[18px]"/>}
              </span>
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=68" alt="Owner" className="w-10 h-10 rounded-full border border-gold-500/50"/>
                <div>
                    <p className="text-sm font-bold text-white">Sarah Connor</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black/50">
        {/* Header */}
        <header className="bg-luxury-dark border-b border-white/5 p-4 md:p-6 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-4">
             <div className="md:hidden">
                 <h1 className="text-xl font-serif font-bold tracking-tighter text-white">Lumière<span className="text-gold-500">.</span></h1>
             </div>
             <h2 className="text-xl font-bold hidden md:block text-white">{activeTab}</h2>
             <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-500/20 rounded-full text-xs font-bold">Live Shop Open</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input type="text" placeholder="Search booking..." className="pl-10 pr-4 py-2 border border-white/10 rounded-full text-sm bg-black/20 text-white focus:outline-none focus:ring-1 focus:ring-gold-500" />
            </div>
            <button className="p-2 relative text-gray-400 hover:text-white">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          
          {activeTab === 'Overview' && (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, trend: '+12.5%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Appointments', value: totalAppointments.toString(), trend: `+${bookings.length} new`, icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Total Clients', value: totalUsers.toLocaleString(), trend: `+${users.length} new`, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Avg. Wait', value: '12m', trend: '-2.4%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    ].map((stat, i) => (
                    <div key={i} className="bg-luxury-dark p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <span className="text-xs font-bold bg-green-900/20 text-green-400 px-2 py-1 rounded-full border border-green-500/20">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1 text-white">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-luxury-dark p-6 rounded-2xl border border-white/5 lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6 text-white">Revenue Analytics</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EAB308" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(value) => `₹${value}`} />
                            <Tooltip contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: '1px solid #333', color: '#fff' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    </div>

                    <div className="bg-luxury-dark p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold mb-6 text-white">Peak Hours</h3>
                    <div className="space-y-4">
                        {[
                            { time: "5 PM - 7 PM", val: 95 },
                            { time: "12 PM - 2 PM", val: 75 },
                            { time: "10 AM - 12 PM", val: 40 },
                            { time: "2 PM - 4 PM", val: 30 },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-300">{item.time}</span>
                                    <span className="text-gray-500">{item.val}% Capacity</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2">
                                    <div className="bg-gold-500 h-2 rounded-full" style={{width: `${item.val}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-purple-900/10 rounded-xl border border-purple-500/20">
                        <h4 className="font-bold text-sm mb-2 text-purple-400">AI Insight ⚡</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Fridays are showing 20% higher traffic than last month. Suggest adding one more stylist shift between 4 PM and 8 PM.
                        </p>
                    </div>
                    </div>
                </div>
            </>
          )}

          {/* Recent Bookings Table (Shown in Overview and Bookings tab) */}
           <div className="bg-luxury-dark rounded-2xl border border-white/5 overflow-hidden">
             <div className="p-6 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-white">Appointments</h3>
                 <button className="text-sm text-gold-500 font-bold hover:text-white" onClick={() => setActiveTab('Bookings')}>View All</button>
             </div>
             <table className="w-full text-left border-collapse">
                 <thead className="bg-white/5 text-xs uppercase text-gray-400">
                     <tr>
                         <th className="p-4 font-medium">Customer</th>
                         <th className="p-4 font-medium">Service</th>
                         <th className="p-4 font-medium">Stylist</th>
                         <th className="p-4 font-medium">Status</th>
                         <th className="p-4 font-medium text-right">Amount</th>
                     </tr>
                 </thead>
                 <tbody className="text-sm">
                     {bookings.length === 0 && (
                         <tr>
                             <td colSpan={5} className="p-8 text-center text-gray-500">No recent bookings. Go to customer view and book one!</td>
                         </tr>
                     )}
                     {/* New Bookings First */}
                     {bookings.map((booking) => (
                         <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in">
                             <td className="p-4 font-medium text-white">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center text-xs font-bold">NEW</div>
                                    {booking.customerName}
                                </div>
                             </td>
                             <td className="p-4 text-gray-400">{booking.serviceName}</td>
                             <td className="p-4">
                                 <div className="flex items-center gap-2">
                                     <span className="text-gray-300">{booking.stylistName}</span>
                                 </div>
                             </td>
                             <td className="p-4">
                                 <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/20">{booking.status}</span>
                             </td>
                             <td className="p-4 text-right font-medium text-white">₹{booking.price}</td>
                         </tr>
                     ))}
                     {/* Static Mock Data */}
                     {[1,2,3,4].map((_, i) => (
                         <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                             <td className="p-4 font-medium text-gray-300">Alice Freeman</td>
                             <td className="p-4 text-gray-500">Hair Spa & Cut</td>
                             <td className="p-4">
                                 <div className="flex items-center gap-2">
                                     <img src={`https://i.pravatar.cc/150?img=${20+i}`} className="w-6 h-6 rounded-full grayscale" alt=""/>
                                     <span className="text-gray-500">Jessica</span>
                                 </div>
                             </td>
                             <td className="p-4">
                                 <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-900/20 text-green-600 border border-green-900/30">Confirmed</span>
                             </td>
                             <td className="p-4 text-right font-medium text-gray-400">₹2,400</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
           </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;