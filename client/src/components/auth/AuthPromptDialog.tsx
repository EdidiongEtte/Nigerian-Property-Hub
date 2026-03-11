import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Heart, UserPlus, LogIn } from "lucide-react";

interface AuthPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthPromptDialog({ open, onOpenChange }: AuthPromptDialogProps) {
  const [, setLocation] = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl text-center p-6 sm:p-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Heart className="h-8 w-8 text-primary fill-primary/20" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center">Save your favourites</DialogTitle>
          <DialogDescription className="text-center text-base mt-2 text-slate-600">
            Create an account to save properties you love and access them anywhere.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={() => { onOpenChange(false); setLocation('/signup'); }} 
            className="h-12 font-bold text-base shadow-sm rounded-xl"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create an Account
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { onOpenChange(false); setLocation('/login'); }} 
            className="h-12 font-bold text-base rounded-xl border-slate-200 hover:bg-slate-50"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
