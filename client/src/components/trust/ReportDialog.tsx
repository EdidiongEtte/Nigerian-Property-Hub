import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
}

export function ReportDialog({ open, onOpenChange, propertyTitle }: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      setReason("");
      setDetails("");
      
      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep NaijaHomes safe. Our team will review this listing shortly.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <Flag className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-heading font-bold text-red-600">Report Listing</DialogTitle>
          </div>
          <DialogDescription>
            Help us maintain a safe community. Why are you reporting <span className="font-semibold text-slate-800">"{propertyTitle}"</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start gap-3 my-4">
          <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
          <p className="text-sm text-orange-800">
            Reports are strictly confidential. The agent or landlord will not know who reported them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="font-semibold">Reason for reporting</Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger id="reason" className="h-12 border-slate-300">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scam">Suspected Scam / Fraud</SelectItem>
                <SelectItem value="unavailable">Property is no longer available</SelectItem>
                <SelectItem value="fake_photos">Photos are fake or stolen</SelectItem>
                <SelectItem value="wrong_price">Price is incorrect or misleading</SelectItem>
                <SelectItem value="unresponsive">Agent is unresponsive or rude</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="font-semibold">Additional details (Optional)</Label>
            <Textarea 
              id="details" 
              placeholder="Please provide any other information that can help our trust & safety team..." 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px] border-slate-300 resize-none"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto h-11 border-slate-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive"
              disabled={!reason || submitting}
              className="w-full sm:w-auto h-11 font-bold bg-red-600 hover:bg-red-700"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
