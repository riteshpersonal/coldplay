import React, { useState } from 'react';
import { User, Music, Ticket, CreditCard, PartyPopper } from 'lucide-react';

const RetroButton = ({ children, onClick, className = '' }) => (
  <button 
    className={`px-6 py-3 bg-black 
    text-white font-['Pixel'] text-sm rounded-lg shadow-lg transform transition 
    hover:scale-105 active:scale-95 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ColdplayLotteryApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    email: '',
    age: '',
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, whatsapp, address, email, age } = formData;

    if (name.trim() && whatsapp.trim() && address.trim() && email.trim() && age.trim() && parseInt(age) >= 18) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setRegistrationComplete(true);
        } else {
          const error = await response.json();
          alert(`Registration failed: ${error.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Check console for details.');
      }
    } else {
      alert('Please fill all fields correctly. Must be 18 or older.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#FFD700] via-[#FF6B6B] to-[#4ECDC4] 
      p-4 font-['Pixel']"
    >
      <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-4 flex flex-col items-center">
          <img 
            src="/api/placeholder/50/50" 
            alt="House8up Logo" 
            className="w-12 h-12 mb-2 rounded-full"
          />
          <span className="text-[#4ECDC4] text-sm">
            Sponsored by House8up.com
          </span>
        </div>
        
        {!registrationComplete ? (
          <div className="bg-[#FFF6E0] p-8 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-[#333] text-center">
              Coldplay Lottery
            </h2>
            <div className="space-y-4">
              {/* Input fields */}
              {['name', 'whatsapp', 'address', 'email', 'age'].map((field, index) => (
                <div key={index} className="relative">
                  <input 
                    type={field === 'age' ? 'number' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#4ECDC4] rounded-lg font-['Pixel'] text-sm"
                    required 
                  />
                </div>
              ))}
              <RetroButton onClick={handleSubmit} className="w-full mt-4">
                Submit
              </RetroButton>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#333]">
              You're In the Draw! 🎉
            </h2>
            <p className="text-lg text-[#555]">
              Thanks, {formData.name}! You're now entered into the Coldplay Lottery!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColdplayLotteryApp;
