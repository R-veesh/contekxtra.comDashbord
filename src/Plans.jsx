import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const initialPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$999",
    period: "/month",
    description: "Perfect for departmental knowledge teams.",
    features: [
      "Up to 5 data sources",
      "100,000 queries per month",
      "Standard semantic retrieval",
      "Email support",
    ],
    highlight: false,
    status: "Active"
  },
  {
    id: "professional",
    name: "Professional",
    price: "$3,499",
    period: "/month",
    description: "For organizations scaling context intelligence.",
    features: [
      "Up to 25 data sources",
      "Unlimited queries",
      "Advanced Knowledge Graph mapping",
      "Priority 24/7 support",
    ],
    highlight: true,
    status: "Active"
  }
];

export default function Plans() {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleSave = (planData) => {
    if (editingPlan && plans.some(p => p.id === planData.id)) {
      setPlans(plans.map(p => p.id === planData.id ? planData : p));
    } else {
      setPlans([...plans, { ...planData, id: planData.name.toLowerCase().replace(/\s+/g, '-') }]);
    }
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">Pricing Plans</h2>
          <p className="text-[var(--color-ink-soft)] mt-1">Manage the subscription plans displayed on the main website.</p>
        </div>
        <button 
          onClick={() => { setEditingPlan(null); setIsModalOpen(true); }}
          className="bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent)]/90 px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition"
        >
          <Plus size={16} /> Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-[var(--color-canvas-alt)] border ${plan.highlight ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'} rounded-xl p-6 relative flex flex-col group`}
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleEdit(plan)}
                className="p-1.5 bg-[var(--color-canvas)] border border-[var(--color-border)] rounded hover:text-[var(--color-accent)] transition text-[var(--color-ink-soft)]"
                title="Edit Plan"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={() => handleDelete(plan.id)}
                className="p-1.5 bg-[var(--color-canvas)] border border-[var(--color-border)] rounded hover:text-red-400 transition text-[var(--color-ink-soft)]"
                title="Delete Plan"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <span className="text-xs font-medium px-2 py-1 bg-[var(--color-border)] rounded-full text-[var(--color-ink-soft)]">
                {plan.status}
              </span>
            </div>
            
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
              <span className="text-[var(--color-ink-soft)]">{plan.period}</span>
            </div>
            
            <p className="text-[var(--color-ink-soft)] text-sm mb-6 pb-6 border-b border-[var(--color-border)]">
              {plan.description}
            </p>
            
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[var(--color-ink-soft)]">
                  <Check size={16} className="text-[var(--color-accent)] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <PlanModal 
          plan={editingPlan} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
}

function PlanModal({ plan, onClose, onSave }) {
  const [formData, setFormData] = useState(
    plan || {
      name: "",
      price: "",
      period: "/month",
      description: "",
      features: ["", "", ""],
      highlight: false,
      status: "Active"
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFeatures = formData.features.filter(f => f.trim() !== "");
    onSave({ ...formData, features: cleanFeatures });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-canvas-alt)] border border-[var(--color-border)] rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold">{plan ? 'Edit Plan' : 'Create New Plan'}</h2>
          <button onClick={onClose} className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-ink-soft)]">Plan Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Professional"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-ink-soft)]">Status</label>
              <select 
                className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-ink-soft)]">Price</label>
              <input 
                required
                type="text" 
                className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="e.g. $3,499"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-ink-soft)]">Billing Period</label>
              <input 
                type="text" 
                className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
                value={formData.period}
                onChange={e => setFormData({...formData, period: e.target.value})}
                placeholder="e.g. /month"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--color-ink-soft)]">Description</label>
            <textarea 
              required
              rows="2"
              className="w-full bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Short description for the pricing card"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[var(--color-ink-soft)]">Features List</label>
              <button 
                type="button" 
                onClick={addFeature}
                className="text-xs text-[var(--color-accent)] hover:underline"
              >
                + Add feature
              </button>
            </div>
            {formData.features.map((feature, idx) => (
              <div key={idx} className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] transition"
                  value={feature}
                  onChange={e => handleFeatureChange(idx, e.target.value)}
                  placeholder={`Feature ${idx + 1}`}
                />
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                checked={formData.highlight}
                onChange={e => setFormData({...formData, highlight: e.target.checked})}
              />
              <span className="text-sm text-[var(--color-ink)]">Highlight this plan (e.g. "Most Popular")</span>
            </label>
          </div>
        </form>
        
        <div className="p-6 border-t border-[var(--color-border)] flex justify-end gap-3 bg-[var(--color-canvas-alt)]">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-border)] transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm font-medium bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent)]/90 transition"
          >
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
}
