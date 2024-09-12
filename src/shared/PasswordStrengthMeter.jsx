import { Check, X } from "lucide-react";
import "./PasswordStrengthMeter.css";

const PasswordCriteria = ({ password = "" }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="criteria-container">
      {criteria.map((item) => (
        <div key={item.label} className="criteria-item">
          {item.met ? (
            <Check className="icon-met" />
          ) : (
            <X className="icon-not-met" />
          )}
          <span className={item.met ? "text-met" : "text-not-met"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password = "" }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
   
    <div className="password-strength-meter">
      <div className="password-strength-header">
        <span className="password-strength-text">Password strength</span>
        <span className="password-strength-text">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="password-strength-bars">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`password-strength-bar ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};
export default PasswordStrengthMeter;
