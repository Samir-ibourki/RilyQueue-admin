import { Phone, Lock, ShieldCheck, Globe, LifeBuoy, AlertCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRequestOtp, useVerifyOtp } from "../hooks/useLogin";

const Login = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0); 

  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();

  // handle the cooldown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    requestOtpMutation.mutate(
      { phone },
      {
        onSuccess: () => {
          setStep("otp");
          setTimer(60);
        },
      }
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ phone, otp });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* header */}
      <header className="w-full py-5 px-8 flex justify-between items-center bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            RiLyQueue
          </span>
        </div>
        <div className="hidden md:block text-sm font-medium text-gray-500 italic">
          "Vendre du temps, gagner la vie"
        </div>
      </header>

      {/* main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 gap-6">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl text-blue-600 font-bold mb-2 tracking-tight">
            RiLyQueue
          </h1>
          <p className="text-gray-500 text-xl font-medium">Portail Admin</p>
        </div>

        <form
          onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp}
          className="bg-white p-8 rounded-2xl shadow-xl w-[90%] lg:w-96 space-y-6 border border-gray-100"
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-center">
            Connexion Admin
          </h2>

          {/* Error Message Display */}
          {(requestOtpMutation.isError || verifyOtpMutation.isError) && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm animate-pulse">
              <AlertCircle size={18} />
              <span>
                {requestOtpMutation.isError 
                  ? "Erreur lors de l'envoi du code. Réessayez." 
                  : "Code OTP invalide ou expiré."}
              </span>
            </div>
          )}

          {step === "phone" ? (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-600">
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+212 6XX XXX XXX"
                  required
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-600">
                  Code OTP
                </label>
                {timer > 0 && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {timer}s
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  placeholder="Saisir le code"
                  required
                  maxLength={6}
                  className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center tracking-[0.2em] font-bold"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={requestOtpMutation.isPending || verifyOtpMutation.isPending || (step === "phone" && timer > 0)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition active:scale-[0.98] disabled:bg-blue-300 shadow-md shadow-blue-100"
          >
            {step === "phone"
              ? timer > 0 
                ? `Renvoyer dans ${timer}s`
                : requestOtpMutation.isPending ? "envoi..." : "envoyer le code OTP"
              : verifyOtpMutation.isPending ? "verification..." : "verifier le code OTP"}
          </button>

          {step === "otp" && (
            <div className="flex flex-col gap-3 text-center">
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Modifier le numéro de téléphone
              </button>
              
              {timer === 0 && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-gray-500 text-xs hover:text-blue-600 transition underline underline-offset-4"
                >
                  Renvoyer un nouveau code
                </button>
              )}
            </div>
          )}
        </form>
      </main>

      {/* footer */}
      <footer className="w-full py-6 px-8 bg-white border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-400 font-medium">
          © 2026 RiLyQueue Maroc. Tous droits réservés.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition font-semibold">
            <ShieldCheck size={14} /> Confidentialité
          </a>
          <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition font-semibold">
            <Globe size={14} /> Conditions
          </a>
          <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition font-semibold">
            <LifeBuoy size={14} /> Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
