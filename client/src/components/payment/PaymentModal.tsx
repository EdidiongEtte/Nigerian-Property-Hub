import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  amount: number;
  type: 'subscription' | 'boost' | 'verification';
  onSuccess?: () => void;
}

export function PaymentModal({ open, onOpenChange, planName, amount, type, onSuccess }: PaymentModalProps) {
  const [method, setMethod] = useState<'paystack' | 'flutterwave'>('paystack');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setProcessing(false);
      onOpenChange(false);
      toast({
        title: "Payment Successful",
        description: `Your payment for ${planName} was successful.`,
        duration: 3000,
      });
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const getIcon = () => {
    switch (type) {
      case 'boost': return <Zap className="h-6 w-6 text-yellow-500" />;
      case 'verification': return <ShieldCheck className="h-6 w-6 text-primary" />;
      default: return <CreditCard className="h-6 w-6 text-slate-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-0">
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div>
            <DialogTitle className="text-xl font-bold font-heading">Complete Payment</DialogTitle>
            <DialogDescription className="text-slate-600">
              {planName}
            </DialogDescription>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-end border-b border-slate-100 pb-6">
            <span className="text-muted-foreground font-medium">Total Amount to Pay</span>
            <span className="text-3xl font-heading font-bold text-foreground">
              ₦{new Intl.NumberFormat('en-NG').format(amount)}
            </span>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Payment Provider</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('paystack')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  method === 'paystack' 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-slate-200 hover:border-primary/50 text-slate-600'
                }`}
              >
                <div className="font-bold tracking-tight text-lg">Paystack</div>
              </button>
              
              <button
                type="button"
                onClick={() => setMethod('flutterwave')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  method === 'flutterwave' 
                    ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' 
                    : 'border-slate-200 hover:border-orange-500/50 text-slate-600'
                }`}
              >
                <div className="font-bold tracking-tight text-lg">Flutterwave</div>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 flex items-start gap-3 border border-slate-100">
            <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
            <p>Payments are secure and encrypted. We do not store your card details on our servers.</p>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 bg-white">
          <Button 
            className="w-full h-14 text-lg font-bold shadow-md rounded-xl"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              `Pay ₦${new Intl.NumberFormat('en-NG').format(amount)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
